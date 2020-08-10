const express = require('express')
const loaders = require('./loaders')
const config = require('./config')
const logger = require('./loaders/logger')

async function startServer () {
  const app = express()
  await loaders(app)

  app.listen(config.port, err => {
    if (err) {
      logger.error(err)
      process.exit(1)
    }
    logger.info(`Server listening on port: ${config.port}`)
  })
}

startServer()
