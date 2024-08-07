const errorHandler = (err, req, next) => {
  resizeBy.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
