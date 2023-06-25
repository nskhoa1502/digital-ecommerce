const Blog = require("../models/blog.model");
const createError = require("../utils/createError");

const createNewBlog = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    if (!title || !description || !category)
      throw createError(400, "Missing inputs");
    const response = await Blog.create(req.body);

    return res.status(200).json({
      success: true,
      response,
      message: response
        ? "Create new blog successfully"
        : "Create new blog fialed",
    });
  } catch (error) {
    next(error);
  }
};
const updateBlog = async (req, res, next) => {
  const { bid } = req.params;
  try {
    if (Object.keys(req.body).length === 0)
      throw createError(400, "Missing inputs");

    const response = await Blog.findByIdAndUpdate(bid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      response,
      message: response
        ? `Update blog ${response.title} successfully`
        : "Update blog fialed",
    });
  } catch (error) {
    next(error);
  }
};
const getBlogs = async (req, res, next) => {
  try {
    const response = await Blog.find();

    return res.status(200).json({
      success: true,
      response,
      message: response ? `get all blogs successfully` : "get all blogs fialed",
    });
  } catch (error) {
    next(error);
  }
};

// LIKE and DISLIKE POST
/**
 * I. LIKE
 *    1. Check user already dislike post => Remove dislike
 *    2. Check if user already like post => Remove like
 *    3. If user haven't like => add uid to like
 *
 * II. DISLIKE: reverse from like
 */

const likeBlog = async (req, res, next) => {
  const { _id } = req.user;
  const { bid } = req.params;

  try {
    if (!bid) throw createError(400, "Missing inputs");
    const blog = await Blog.findById(bid);

    const alreadyDisliked = blog?.dislikes?.find(
      (uid) => uid.toString() === _id
    );
    if (alreadyDisliked) {
      await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: {
            dislikes: _id,
          },
        },
        { new: true }
      );
    }

    const alreadyLiked = blog?.likes.find((uid) => uid.toString() === _id);
    if (alreadyLiked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: _id },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        response,
        message: "Remove like successfully",
      });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        { $push: { likes: _id } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        response,
        message: "Like successfuly",
      });
    }
  } catch (error) {
    next(error);
  }
};

const dislikeBlog = async (req, res, next) => {
  const { _id } = req.user;
  const { bid } = req.params;

  try {
    if (!bid) throw createError(400, "Missing inputs");
    const blog = await Blog.findById(bid);

    const alreadyLiked = blog?.likes?.find((uid) => uid.toString() === _id);
    if (alreadyLiked) {
      await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: {
            likes: _id,
          },
        },
        { new: true }
      );
    }

    const alreadyDisliked = blog?.dislikes.find(
      (uid) => uid.toString() === _id
    );
    if (alreadyDisliked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { dislikes: _id },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        response,
        message: "Remove dislike successfully",
      });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        { $push: { dislikes: _id } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        response,
        message: "Dislike successfuly",
      });
    }
  } catch (error) {
    next(error);
  }
};

const excludedFields = " -refreshToken -password -role -createdAt -updatedAt";
const includedFields = "firstname lastname";
const getBlog = async (req, res, next) => {
  const { bid } = req.params;
  try {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $inc: { numberViews: 1 },
      },
      { new: true }
    )
      .populate("likes", includedFields)
      .populate("dislikes", includedFields);

    return res.status(200).json({
      success: true,
      response,
      message: "get blog successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const { bid } = req.params;
  try {
    const response = await Blog.findByIdAndDelete(bid);
    return res.status(200).json({
      success: true,
      response,
      message: response ? "Delete blog successfully" : "Delete blog failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteBlog,
  getBlog,
  getBlogs,
  createNewBlog,
  updateBlog,
  likeBlog,
  dislikeBlog,
};
