const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, errors, colorize, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }), 
    json()
  ),
  transports: [
   
    new transports.File({ filename: path.join(__dirname, '../../logs/log.json') }),
    new transports.Console({
      level: 'error',
      format: combine(colorize(), simple())
    })
  ],
});

module.exports = logger;