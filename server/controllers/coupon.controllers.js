const Coupon = require("../models/coupon.model");
const createError = require("../utils/createError");

const createCoupon = async (req, res, next) => {
  const { name, discount, expiry } = req.body;
  //   console.log(req.body);
  try {
    if (!name || !discount || !expiry) throw createError(400, "Missing inputs");
    const response = await Coupon.create({
      ...req.body,
      expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response ? "Create coupon successfully" : "Create coupon failed",
    });
  } catch (error) {
    next(error);
  }
};

const getCoupons = async (req, res, next) => {
  try {
    const response = await Coupon.find().select("-createdAt -updatedAt");
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "get all coupon successfully"
        : "get all coupon failed",
    });
  } catch (error) {
    next(error);
  }
};
const updateCoupon = async (req, res, next) => {
  const { cid } = req.params;
  try {
    if (Object.keys(req.body).length === 0)
      throw createError(400, "Missing inputs");
      if(req.body.expiry) req.body.expiry = Date.now() = +req.body.expiry*24*60*60*1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response ? "Update coupon successfully" : "Update coupon failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteCoupon = async (req, res, next) => {
  const { cid } = req.params;
  try {
    const response = await Coupon.findByIdAndDelete(cid);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Delete coupon ${response?.name} successfully`
        : "Delete coupon failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getCoupons,
};
