const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const verifyAccessToken = async (req, res, next) => {
  try {
    // Bearer accesstoken
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) throw createError(401, "Invalid access token");
        // console.log(decodedToken);
        req.user = decodedToken;
        next();
      });
    } else throw createError(401, "Require authentication!");
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyAccessToken };
