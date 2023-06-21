const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const createError = require("../utils/createError");

const register = async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    if (!email || !password || !firstname || !lastname) {
      throw createError(400, "Missing inputs");
    }

    const response = await User.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      response,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
