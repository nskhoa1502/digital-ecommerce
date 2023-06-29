const Order = require("../models/order.model");
const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");
const createError = require("../utils/createError");

const createOrder = async (req, res, next) => {
  const { _id } = req.user;
  const { coupon } = req.body;

  try {
    const userCart = await User.findById(_id)
      .select("cart")
      .populate("cart.product", "title price");

    const products = userCart?.cart?.map((item) => ({
      product: item._id,
      color: item.color,
      count: item.quantity,
    }));

    let total = userCart?.cart?.reduce(
      (sum, item) => item.product.price * item.quantity + sum,
      0
    );
    const orderData = { products, total, orderBy: _id };

    if (coupon) {
      const selectedCoupon = await Coupon.findById(coupon);
      total =
        Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) *
          1000 || total;

      orderData.total = total;
      orderData.coupon = coupon;
    }
    const response = await Order.create(orderData);

    return res.status(200).json({
      success: true,
      response,
      // userCart,
    });

    // return res.status(200).json({
    //   success: true,
    //   response,
    //   message: response ? "Create order successfully" : "Create order failed",
    // });
  } catch (error) {
    next(error);
  }
};
const updateOrderStatus = async (req, res, next) => {
  const { oid } = req.params;
  const { status } = req.body;
  console.log(status);
  try {
    const response = await Order.findByIdAndUpdate(
      oid,
      { status },
      { new: true }
    );

    if (!status) throw createError(400, "Missing status");
    return res.status(200).json({
      success: true,
      response,
    });

    // return res.status(200).json({
    //   success: true,
    //   response,
    //   message: response ? "Create order successfully" : "Create order failed",
    // });
  } catch (error) {
    next(error);
  }
};

const getOrdersUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const response = await Order.find({ orderBy: _id });
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `get all order  successfully`
        : "get all order failed",
    });
  } catch (error) {
    next(error);
  }
};
const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const response = await Order.find();
    return res.status(200).json({
      success: true,
      response,
      message: response ? `get all order successfully` : "get all order failed",
    });
  } catch (error) {
    next(error);
  }
};
const getUserOrdersAdmin = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const response = await Order.find({ orderBy: uid });
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `get all order from user successfully`
        : "get all order failed",
    });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  const { bcid } = req.params;
  try {
    const response = await Order.findByIdAndUpdate(bcid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response ? "Update order successfully" : "Update order failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  const { bcid } = req.params;
  try {
    const response = await Order.findByIdAndDelete(bcid);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Delete order ${response?.title} successfully`
        : "Delete order failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateOrder,
  deleteOrder,
  createOrder,
  getOrdersUser,
  updateOrderStatus,
  getAllOrdersAdmin,
  getUserOrdersAdmin,
};
