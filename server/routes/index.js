const errorHandler = require("../middlewares/errorHandler");
const userRouter = require("./user.routes");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  // Error handling
  app.use(errorHandler);

  app.use("/", (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found!` });
  });
};

module.exports = initRoutes;
