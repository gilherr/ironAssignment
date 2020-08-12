const logger = require('../../loaders/logger')
const rankerFactory = require('./rankers')

function findRelevantApps (customer) {
  logger.debug('in findRelevantApps', customer)
  const apps = fetchAppsByCategory(customer.category)
  logger.debug('apps', { apps })
  const ranker = rankerFactory(customer.customerType)
  const rankedApps = ranker(apps)
  logger.debug('rankedApps', { rankedApps })
  return rankedApps
}

function fetchAppsByCategory (category) {
  logger.debug('fetchAppsByCategory', { category })
  return []
}

module.exports = {
  findRelevantApps
}
