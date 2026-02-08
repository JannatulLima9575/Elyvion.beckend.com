export function healthCheck(req, res) {
  res.json({
    success: true,
    message: "Backend API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
