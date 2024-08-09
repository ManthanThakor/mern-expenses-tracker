const errorHandler = (err, req, res, next) => {
  // Set the response status code, defaulting to 500 if not already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send the error response in JSON format
  res.json({
    message: err.message,
    // Only include stack trace in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
