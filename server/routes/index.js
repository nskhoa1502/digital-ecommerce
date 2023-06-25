const errorHandler = require("../middlewares/errorHandler");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const productCategoryRouter = require("./productCategory.routes");
const blogCategoryRouter = require("./blogCategory.routes");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodCategory", productCategoryRouter);
  app.use("/api/blogCategory", blogCategoryRouter);

  // Error handling
  app.use(errorHandler);

  app.use("/", (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found!` });
  });
};

module.exports = initRoutes;
