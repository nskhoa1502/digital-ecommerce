const User = require("../models/user.model");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniqid");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helper/generateToken");

// const register = async (req, res, next) => {
//   const { email, password, firstname, lastname, mobile } = req.body;
//   try {
//     if (!email || !password || !firstname || !lastname) {
//       throw createError(400, "Missing inputs");
//     }

//     const user = await User.findOne({ email: email });
//     // console.log("hello world");

//     // Check existing user
//     if (user) throw createError(400, "User has existed");

//     const newUser = await User.create(req.body);

//     return res.status(200).json({
//       success: newUser ? true : false,
//       message: newUser
//         ? `Register successfully`
//         : "Register failed, something went wrong",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const register = async (req, res, next) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  // console.log(mobile);
  console.log(req.body);
  try {
    if (!email || !password || !firstname || !lastname) {
      throw createError(400, "Missing inputs");
    }

    const user = await User.findOne({ email: email });
    // console.log("hello world");

    // Check existing user
    if (user) throw createError(400, "User has existed");
    const token = makeToken();
    res.cookie(
      "dataregister",
      { ...req.body, token },
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }
    );
    const html = `
    <div>
    <h1>Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký của bạn.</h1>
    <p>Link sẽ hết hạn trong 15 phút kể từ lúc gởi mail.</p>
    <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>
    </div>
    `;

    await sendMail({ email, html, subject: "Hoàn tất đăng ký Digital World" });
    return res.status(200).json({
      success: true,
      message: "Please check your email to activate account",
    });
  } catch (error) {
    next(error);
  }
};

const finalRegister = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    // console.log(cookie.dataregister);

    const { token } = req.params;
    // console.log(cookie?.dataregister);
    // console.log(token);
    // res.status(200).json({
    //   success: true,
    //   cookie,
    //   token,
    // });
    if (!cookie || cookie?.dataregister?.token !== token) {
      return res
        .clearCookie("dataregister")
        .redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    }
    const newUser = await User.create({
      email: cookie?.dataregister?.email,
      password: cookie?.dataregister?.password,
      mobile: cookie?.dataregister?.mobile,
      firstname: cookie?.dataregister?.firstname,
      lastname: cookie?.dataregister?.lastname,
    });

    if (newUser)
      return res
        .clearCookie("dataregister")
        .redirect(`${process.env.CLIENT_URL}/finalregister/success`);
    else
      return res
        .clearCookie("dataregister")
        .redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
  } catch (error) {
    next(error);
  }
};

// Refresh Token -> Send new accessToken
// Access Token -> Authentication

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw createError(400, "Missing inputs");
    }

    // Find user in database
    const response = await User.findOne({ email: email }).select(
      "-refreshToken"
    );
    if (response && response.isCorrectPassword(password)) {
      const { password, role, ...userData } = response.toObject();

      // Generate accesstoken
      const accessToken = generateAccessToken(response._id, role);

      // Generate refreshToken and update it in database
      const newRefreshToken = generateRefreshToken(response._id);
      await User.findByIdAndUpdate(
        response._id,
        { refreshToken: newRefreshToken },
        { new: true }
      );

      // Store refreshToken into cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Send response
      return res.status(200).json({
        success: true,
        userData: userData,
        accessToken: accessToken,
        message: "Login successfully",
      });
    } else {
      throw createError(400, "Invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (!_id) {
      throw createError(400, "Invalid user");
    }

    // Find user in database
    const response = await User.findById({ _id }).select(
      "-refreshToken -password -role -passwordChangedAt -isBlocked"
    );
    // Send response
    return res.status(200).json({
      success: response ? true : false,
      result: response,
      message: "get current user successfully",
    });
  } catch (err) {
    next(err);
  }
};

const refreshAccessToken = async (req, res, next) => {
  // Extract cookie from client
  const cookie = req.cookies;
  // const {_id} = req.user

  // If no refresh token in cookie => throw error
  if (!cookie && !cookie.refreshToken)
    throw createError(401, "No refresh token in cookies");

  // Verify refresh token
  jwt.verify(
    cookie.refreshToken,
    process.env.JWT_SECRET,
    async (err, decodedToken) => {
      if (err) return next(createError(401, "Invalid refresh token"));

      // Find User with _id and matched refresh token
      const { _id } = decodedToken;
      const response = await User.findById({
        _id,
        refreshToken: cookie.refreshToken,
      });
      return res.status(200).json({
        success: response ? true : false,
        accessToken: response
          ? generateAccessToken(response._id, response.role)
          : "",
        message: response
          ? "Token has been refreshed"
          : "Refresh token not match",
      });
    }
  );
  try {
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const cookie = req.cookies;
  try {
    // Check if there is refresh token in cookie
    if (!cookie || !cookie.refreshToken) {
      throw createError(401, "No refresh token in cookies");
    }

    // Empty refresh token in database
    const foundUser = await User.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );

    // Empty cookie in client
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: foundUser ? true : false,
      message: foundUser ? "Logout successfully" : "You have logout already",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * RESET PASSWORD:
 * 1/ Client send email
 * 2/ Verify mail in client req -> Send back email + reset link (password change token)
 * 3/ Client check mail -> Click reset link
 * 4/ When click, client will go the api endpoint + password change token
 * 5/ Verify the password token at server
 * 6/ Change password
 */

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) throw createError(400, "Missing Email");

    const user = await User.findOne({ email });
    if (!user) throw createError(401, "User not found");

    // Call createResetPasswordToken method to generate password reset token
    const resetToken = user.createResetPasswordToken();
    await user.save();

    const html = `
  <div>
  <h1>Please click the link below to change your password</h1>
  <p>Link will expire in 15 minutes.</p>
  <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>
  </div>
  `;

    const data = {
      email,
      html,
      subject: "Forgot password",
    };

    const result = await sendMail(data);
    return res.status(200).json({
      success: true,
      message: result.response?.includes("OK")
        ? "An email has been sent to you, please check your inbox."
        : "Something went wrong, please try again",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    if (!password) throw createError(400, "Please enter new password");
    if (!token) throw createError(400, "Missing token");

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) throw createError(401, "Invalid reset token");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: user ? true : false,
      message: user ? "Updated password" : "Fail to update password",
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const response = await User.find().select(
      "-refreshToken -password -passwordChangedAt -role -isBlocked"
    );
    return res.status(200).json({
      success: response ? true : false,
      users: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { _id } = req.query;
  try {
    if (!_id) throw createError(400, "Missing Id");
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
      success: response ? true : false,
      deletedUser: response
        ? `User with email ${response.email} has been deleted`
        : "No user deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (!_id || Object.keys(req.body)?.length === 0)
      throw createError(400, "Missing input");
    const response = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-refreshToken -password -passwordChangedAt -role -isBlocked");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "No fields have been updated",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserByAdmin = async (req, res, next) => {
  const { uid } = req.params;
  try {
    if (!uid || Object.keys(req.body)?.length === 0)
      throw createError(400, "Missing input");
    const response = await User.findByIdAndUpdate(uid, req.body, {
      new: true,
    }).select("-refreshToken -password -passwordChangedAt -role -isBlocked");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "No fields have been updated",
    });
  } catch (error) {
    next(error);
  }
};
const updateUserAddress = async (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);
  try {
    if (!req.body.address) throw createError(400, "Missing address");

    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { address: req.body.address } },
      {
        new: true,
      }
    ).select("-refreshToken -password -passwordChangedAt -role -isBlocked");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "No fields have been updated",
    });
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  try {
    if (!pid || !quantity | !color) throw createError(400, "missing inputs");
    const user = await User.findById(_id).select("cart");

    const existingProduct = user?.cart?.find(
      (item) => item?.product?.toString() === pid && item?.color === color
    );
    console.log(existingProduct);

    if (existingProduct) {
      if (existingProduct.color === color) {
        const response = await User.updateOne(
          {
            cart: {
              $elemMatch: {
                product: existingProduct.product,
                color: existingProduct.color,
              },
            },
          },
          { $set: { ["cart.$.quantity"]: quantity } }
        );
        return res.status(200).json({
          success: true,
          response,
          message: response ? "Update cart successfully" : "Update cart failed",
        });
      } else {
        const response = await User.findByIdAndUpdate(
          _id,
          { $push: { cart: { product: pid, quantity, color } } },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          response,
          message: response ? "Update cart successfully" : "Update cart failed",
        });
      }
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        response,
        message: response ? "Update cart successfully" : "Update cart failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  getCurrentUser,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
  finalRegister,
};
