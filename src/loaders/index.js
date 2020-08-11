const logger = require('./logger')
const express = require('./express')
const mongooseLoader = require('./mongoose')

async function topLoader (expressApp) {
  express(expressApp)
  logger.info('Express loaded')

  await mongooseLoader()
  logger.info('Mongoose loaded')
};

module.exports = topLoader
