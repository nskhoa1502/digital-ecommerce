const BlogCategory = require("../models/blogCategory.model");

const createBlogCategory = async (req, res, next) => {
  try {
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Create blog category successfully"
        : "Create blog category failed",
    });
  } catch (error) {
    next(error);
  }
};

const getBlogCategories = async (req, res, next) => {
  try {
    const response = await BlogCategory.find().select("title _id");
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "get all blog category successfully"
        : "get all blog category failed",
    });
  } catch (error) {
    next(error);
  }
};
const updateBlogCategory = async (req, res, next) => {
  const { bcid } = req.params;
  try {
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Update blog category successfully"
        : "Update blog category failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteBlogCategory = async (req, res, next) => {
  const { bcid } = req.params;
  try {
    const response = await BlogCategory.findByIdAndDelete(bcid);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Delete blog category ${response?.title} successfully`
        : "Delete blog category failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateBlogCategory,
  deleteBlogCategory,
  createBlogCategory,
  getBlogCategories,
};
