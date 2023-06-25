const ProductCategory = require("../models/productCategory.model");

const createCategory = async (req, res, next) => {
  try {
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Create product category successfully"
        : "Create product category failed",
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const response = await ProductCategory.find().select("title _id");
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "get all product category successfully"
        : "get all product category failed",
    });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  const { pcid } = req.params;
  try {
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Update product category successfully"
        : "Update product category failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  const { pcid } = req.params;
  try {
    const response = await ProductCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Delete product category ${response?.title} successfully`
        : "Delete product category failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateCategory,
  deleteCategory,
  createCategory,
  getCategories,
};
