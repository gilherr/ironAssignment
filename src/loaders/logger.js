const { createLogger, format, transports } = require('winston')
const expressWinston = require('express-winston')
const config = require('../config')
const { consoleFormat } = require('winston-console-format')

const logger = createLogger({
  level: config.logs.level,
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/default.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    handleExceptions: true,
    format: format.combine(
      format.colorize({ all: true }),
      format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ['timestamp', 'service'],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 80,
          compact: Infinity
        }
      })
    )
  }))
}

logger.expressWinston = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  expressFormat: true,
  colorize: true
})

module.exports = logger
