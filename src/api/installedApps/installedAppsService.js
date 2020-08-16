const { findAppByName } = require('./installedAppsDAL')
const logger = require('../../loaders/logger')
const dal = require('./installedAppsDAL')

async function fetchInstalledApp (appName) {
  const app = await findAppByName(appName)
  if (!app) {
    logger.warn('fetchInstalledApp: App not found', { name: appName })
  }
  return app
}

function calcAndSendNewAvgAge (app, newAge) {
  app.avgAge = calcNewAvg(app, newAge)
  app.installCount = app.installCount + 1
  dal.updateAvgAge(app)
  logger.info('calcAndSendNewAvgAge: async update sent', { appName: app.name, newAvgAge: app.avgAge })
}

function calcNewAvg ({ avgAge, installCount }, newAge) {
  const oldAgeSum = installCount * avgAge
  const newAvg = (oldAgeSum + newAge) / (installCount + 1)
  return newAvg
}

module.exports = {
  fetchInstalledApp,
  calcAndSendNewAvgAge
}
