function errorHandler(error, req, res, next) {
  // eslint-disable-next-line no-console
  console.error("Server Error:", error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
