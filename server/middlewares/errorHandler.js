const errorHandler = (err, req, res, next) => {
  // console.log("Error:", err);
  const status = err.status || 500;
  let message = err.message || "Something went wrong";
  const stack = err.stack || "";

  return res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: stack,
  });
};

module.exports = errorHandler;
