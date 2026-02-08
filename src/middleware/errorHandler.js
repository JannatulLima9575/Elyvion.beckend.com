export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function notFound(req, res, next) {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.originalUrl} not found` });
}
