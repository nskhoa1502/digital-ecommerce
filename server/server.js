const express = require("express");
require("dotenv").config();

const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Server on");
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
