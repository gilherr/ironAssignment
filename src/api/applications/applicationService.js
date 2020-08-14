const logger = require('../../loaders/logger')
const rankerFactory = require('./rankers')
const dal = require('./applicationDAL')

async function findRelevantApps (customer) {
  const apps = await fetchAppsByCategory(customer.category)
  const ranker = rankerFactory(customer.customerType)
  const rankedApps = ranker(apps, customer)

  return rankedApps
}

async function fetchAppsByCategory (category) {
  const apps = await dal.fetchAppsByCategory(category)
  return apps
}

module.exports = {
  findRelevantApps
}
