const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../../logs/log.json') })
  ]
});

module.exports = logger;
