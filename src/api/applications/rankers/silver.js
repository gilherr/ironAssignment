const { fetchThirdPartyNumbers } = require('../applicationDAL')

async function silverRanker (apps) {
  const NUM_APPS_TO_RECOMMEND = 2
  const requestsForRandNums = []
  const recommendedApps = []
  let randNums

  if (apps.length <= NUM_APPS_TO_RECOMMEND) {
    return apps
  }

  for (let i = 0; i < NUM_APPS_TO_RECOMMEND; i++) {
    requestsForRandNums.push(fetchThirdPartyNumbers())
  }

  try {
    randNums = await Promise.all(requestsForRandNums)
  } catch (error) {
    return apps.slice(0, NUM_APPS_TO_RECOMMEND)
  }

  for (let i = 0; i < NUM_APPS_TO_RECOMMEND; i++) {
    recommendedApps.push(apps[randNums[i]])
  }

  return recommendedApps
}

module.exports = silverRanker
