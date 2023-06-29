const Product = require("../models/product.model.js");
const slugify = require("slugify");
const createError = require("../utils/createError.js");
const { query } = require("express");
const { findById } = require("../models/user.model.js");

const createProduct = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0)
      throw createError(400, "Missing inputs");
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
    // 1. BUILD QUERY
    const queries = { ...req.query };
    // console.log(queries);

    // Extract special field from queries object
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((el) => delete queries[el]);

    /**
     * Example: [base_url]/api/product?ratingAverage[gte]=4.7
     * ==> queries = {ratingAverage:[gte: '4.7']}
     * ==> queryString = JSON.stringify(queries)
     * ==> formattedQueries = {ratingAverage: [$gte: '4.7]}
     */
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    // console.log(replacedQuery);
    const formattedQueries = JSON.parse(queryString);
    // console.log(formattedQueries);

    // 2. FILTERING
    if (queries?.title)
      formattedQueries.title = { $regex: queries.title, $options: "i" };

    let queryCommand = Product.find(formattedQueries);

    // 3. SORTING
    /**
     * sort=price,title,quantity ==> price title quantity
     */
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(` `);
      // console.log(sortBy);
      queryCommand = queryCommand.sort(sortBy);
    }

    // 4. FIELDS LIMITING ==> Select which field to return
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      // console.log(req.query.fields);
      // console.log(fields);
      queryCommand = queryCommand.select(fields);
    }

    // 5. PAGINATION requires 2 params
    //  1/ limit: limit the number of object return when api is called
    //  2/ skip: offset in sql

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    queryCommand.then(async (response, err) => {
      if (err) return createError(500, err);
      const counts = await Product.find(formattedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        response,
      });
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

const ratings = async (req, res, next) => {
  console.log("route called");
  const { _id } = req.user;
  console.log(_id);
  const { star, comment, pid } = req.body;
  try {
    if (!star || !pid) throw createError(400, "Missing inputs");

    const ratedProduct = await Product.findById(pid);
    // Check postedBy to see if the user already rated the product
    const isAlreadyRated = ratedProduct?.ratings?.find(
      (item) => item?.postedBy.toString() === _id
    );

    // console.log(isAlreadyRated);
    // console.log("is already rated", isAlreadyRated);
    if (isAlreadyRated) {
      // update star and comment
      const response = await Product.updateOne(
        {
          ratings: { $elemMatch: isAlreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
    } else {
      // add star and comment
      await Product.updateOne({});

      const response = await Product.findByIdAndUpdate(
        pid,
        {
          $push: { ratings: { star, comment, postedBy: _id } },
        },
        { new: true }
      );
      // console.log(response);
    }

    const updatedProduct = await Product.findById(pid);

    const ratingCount = updatedProduct.ratings?.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, currElement) => {
      return sum + +currElement.star;
    }, 0);
    updatedProduct.totalRatings =
      Math.round((sumRatings * 10) / ratingCount) / 10;

    await updatedProduct.save();
    return res.status(200).json({
      success: true,
      response: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const uploadImageProduct = async (req, res, next) => {
  const { pid } = req.params;
  try {
    if (!req.files) throw createError(400, "Missing images");
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { images: { $each: req.files.map((file) => file.path) } },
      },
      { new: true }
    );
    console.log(response);
    return res.status(200).json({
      status: response ? true : false,
      updatedProduct: response ? response : null,
      message: response ? "Upload image success" : "Upload image failed",
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
  ratings,
  uploadImageProduct,
};
