// src/middleware/errorLogger.js
const logger = require('./winstonLogger');

const errorLogger = (err, req, res, next) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    endpoint: req.originalUrl,
    method: req.method,
    status: res.statusCode,
    reqBody: req.body,
    queryParameters: req.query,
    pathParameters: req.params,
    errorTrace: err.stack
  };
  logger.error(logEntry);
  next(err);
};

module.exports = errorLogger;
