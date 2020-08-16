const logger = require('../../../loaders/logger')

function bronzeRanker (apps) {
  logger.info('bronzeRanker: start', { apps: apps.map(app => app.name) })
  const NUM_APPS_TO_RECOMMEND = 2
  const recommendedApps = []
  const randomIndexes = new Set()

  if (apps.length <= NUM_APPS_TO_RECOMMEND) {
    return apps
  }

  while (randomIndexes.size < NUM_APPS_TO_RECOMMEND) {
    randomIndexes.add(Math.floor(Math.random() * apps.length))
  }

  for (const randIdx of randomIndexes) {
    recommendedApps.push(apps[randIdx])
  }

  return recommendedApps
}

module.exports = bronzeRanker
