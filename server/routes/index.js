const userRouter = require("./user.routes");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use("/", (req, res) => {
    res.send("Server on");
  });
};

module.exports = initRoutes;
