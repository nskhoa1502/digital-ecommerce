const errorHandler = (err, req, res, next) => {
  // console.log("Error:", err);
  const status = err.status || 500;
  let message = err.message || "Something went wrong";
  const stack = err.stack || "";

  //   console.log(status);
  if (status === 404) {
    message = `Route ${req.originalUrl} not found!`;
  }

  return res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: stack,
  });
};

module.exports = errorHandler;
