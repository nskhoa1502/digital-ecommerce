const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db.connect");
const initRoutes = require("./routes");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8888;
dbConnect();
initRoutes(app);

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
