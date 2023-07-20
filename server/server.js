const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db.connect");
const cookieParser = require("cookie-parser");
const initRoutes = require("./routes");
const app = express();
const cors = require("cors");

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8888;
dbConnect();
initRoutes(app);

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
