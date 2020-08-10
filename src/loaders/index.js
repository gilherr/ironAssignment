const logger = require('./logger')
const express = require('./express')

async function mainLoader (expressApp) {
  express(expressApp)
  logger.info('Express loaded')
};

module.exports = mainLoader
