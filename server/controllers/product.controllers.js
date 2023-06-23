const Product = require("../models/product.model.js");
const slugify = require("slugify");
const createError = require("../utils/createError.js");

const createProduct = async (req, res, next) => {
  try {
    // if (Object.keys(req.body).length === 0)
    //   throw createError(400, "Missing inputs");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);

    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Fail to create new product",
      message: newProduct
        ? `${newProduct?.title} created successfully`
        : "Create product failed",
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const { pid } = req.params;

  try {
    if (!pid) throw createError(404, "No product with this id");
    const product = await Product.findById(pid);

    return res.status(200).json({
      success: true,
      response: product,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      response: products,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { pid } = req.params;
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: updatedProduct ? true : false,
      response: updatedProduct,
      message: updatedProduct
        ? "Product has been updated"
        : "Update product failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(pid);

    return res.status(200).json({
      success: deletedProduct ? true : false,
      response: deletedProduct,
      message: deletedProduct
        ? "Product has been deleted"
        : "Delete product failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getProducts,
};
