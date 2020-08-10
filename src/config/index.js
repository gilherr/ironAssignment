const db = require('./db')

const common = {
  port: parseInt(process.env.PORT, 10),
  logs: { level: process.env.LOG_LEVEL || 'debug' }
}

module.exports = Object.assign({}, common, db)
