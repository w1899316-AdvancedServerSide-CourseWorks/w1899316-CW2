// src/middleware/requestLogger.js
const logger = require('./winstonLogger');

const requestLogger = (req, res, next) => {
  const startTime = new Date();

  res.on('finish', () => {
    const logEntry = {
      timestamp: startTime.toISOString(),
      ip: req.ip,
      endpoint: req.originalUrl,
      method: req.method,
      status: res.statusCode,
      reqBody: req.body,
      queryParameters: req.query,
      pathParameters: req.params
    };
    logger.info(logEntry);
    console.log(logEntry);
  });
  
  next();
};

module.exports = requestLogger;
