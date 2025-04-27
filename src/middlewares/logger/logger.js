const logger = (req, res, next) => {
    const startTime = new Date();
  
    res.on('finish', () => {
      console.log(`[${startTime.toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
  
    next();
  };
  
  logger.error = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ERROR on ${req.method} ${req.originalUrl}`);
    console.error(err.stack || err.message || err);
    next(err); // pass to the main error handler
  };
  
  module.exports = logger;
  