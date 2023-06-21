const errorHandler = require("../middlewares/errorHandler");
const userRouter = require("./user.routes");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  // Error handling
  app.use(errorHandler);

  app.use("/", (req, res) => {
    res.send("Server on");
  });
};

module.exports = initRoutes;
