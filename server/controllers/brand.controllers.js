const Brand = require("../models/brand.model");

const createBrand = async (req, res, next) => {
  try {
    const response = await Brand.create(req.body);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Create brand category successfully"
        : "Create brand category failed",
    });
  } catch (error) {
    next(error);
  }
};

const getBrands = async (req, res, next) => {
  try {
    const response = await Brand.find();
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "get all brands category successfully"
        : "get all brands category failed",
    });
  } catch (error) {
    next(error);
  }
};
const updateBrand = async (req, res, next) => {
  const { brid } = req.params;
  try {
    const response = await Brand.findByIdAndUpdate(brid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      response,
      message: response ? "Update brand successfully" : "Update brand failed",
    });
  } catch (error) {
    next(error);
  }
};
const deleteBrand = async (req, res, next) => {
  const { brid } = req.params;
  try {
    const response = await Brand.findByIdAndDelete(brid);
    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Delete band ${response?.title} successfully`
        : "Delete band failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateBrand,
  deleteBrand,
  createBrand,
  getBrands,
};
