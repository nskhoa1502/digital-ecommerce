const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role: role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRET, {
    expiresIn: "8d",
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};