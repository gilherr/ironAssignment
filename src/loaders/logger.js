const { createLogger, format, transports } = require('winston')
const expressWinston = require('express-winston')
const config = require('../config')

const fileFormat = {
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  )
}

const loggerInstance = createLogger({
  level: config.logs.level,
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error', ...fileFormat }),
    new transports.File({ filename: 'logs/combined.log', ...fileFormat })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  loggerInstance.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

loggerInstance.expressWinston = expressWinston.logger({
  winstonInstance: loggerInstance,
  meta: false,
  expressFormat: true,
  colorize: true
})

module.exports = loggerInstance
