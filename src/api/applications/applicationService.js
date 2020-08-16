const logger = require('../../loaders/logger')
const rankerFactory = require('./rankers')
const fetchAppsFilteredBy = require('./fetchers')

async function findRelevantApps (customer) {
  const apps = await fetchAppsFilteredBy('category', customer.category)
  const ranker = rankerFactory(customer.customerType)
  const rankedApps = await ranker(apps, customer)

  logger.info(
    'findRelevantApps: done ranking',
    { returningApps: rankedApps.map(app => app.name) })

  return rankedApps
}

module.exports = {
  findRelevantApps
}
