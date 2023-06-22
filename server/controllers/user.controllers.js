const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const createError = require("../utils/createError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helper/generateToken");

const register = async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    if (!email || !password || !firstname || !lastname) {
      throw createError(400, "Missing inputs");
    }

    const user = await User.findOne({ email: email });

    // Check existing user
    if (user) throw createError(400, "User has existed");

    const newUser = await User.create(req.body);

    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Register successfully"
        : "Register failed, something went wrong",
    });
  } catch (err) {
    next(err);
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
    const response = await User.findOne({ email: email });
    if (response && response.isCorrectPassword(password)) {
      const { password, role, ...userData } = response.toObject();

      // Generate accesstoken
      const accessToken = generateAccessToken(response._id, role);

      // Generate refreshToken and update it in database
      const refreshToken = generateRefreshToken(response._id);
      await User.findByIdAndUpdate(
        response._id,
        { refreshToken: refreshToken },
        { new: true }
      );

      // Store refreshToken into cookie
      res.cookie("refreshToken", refreshToken, {
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
      "-refreshToken -password -role"
    );
    // Send response
    return res.status(200).json({
      success: true,
      result: response,
      message: "get current user successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register, getCurrentUser };
