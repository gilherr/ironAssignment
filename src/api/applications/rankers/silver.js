const { fetchThirdPartyNumbers } = require('../applicationDAL')
const logger = require('../../../loaders/logger')

async function silverRanker (apps) {
  logger.info('silverRanker: start', { apps: apps.map(app => app.name) })
  let quantity
  try {
    quantity = await fetchThirdPartyNumbers({ min: 1, max: 5 })
  } catch (error) {
    logger.error('Failed to fetch random number from external source', error)
    return apps.slice(0, 2)
  }
  const randomIndexes = new Set()

  if (apps.length <= quantity) {
    return apps
  }

  // collect $quantity unique indexes
  while (randomIndexes.size < quantity) {
    const randIdx = Math.floor(Math.random() * apps.length)
    randomIndexes.add(randIdx)
  }

  const recommendedApps = Array.from(randomIndexes).map(i => apps[i])

  return recommendedApps
}

module.exports = silverRanker
