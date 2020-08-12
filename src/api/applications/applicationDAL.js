const Application = require('./applicationModel')
const logger = require('../../loaders/logger')

async function fetchAppsByCategory (category) {
  const apps = await Application.find({ category }, 'name avgAge')
  logger.debug('fetchAppsByCategory', apps)
  return apps
}

module.exports = {
  fetchAppsByCategory
}
