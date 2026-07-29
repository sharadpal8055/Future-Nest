export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
};