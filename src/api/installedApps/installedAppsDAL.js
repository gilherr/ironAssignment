const { Application } = require('../applications')
const logger = require('../../loaders/logger')

async function findAppByName (name) {
  const filter = { name }
  try {
    return await Application.findOne(filter, 'name avgAge installCount')
  } catch (error) {
    logger.error('fundAppByName: DB error', { error })
    return null
  }
}

async function updateAvgAge (app) {
  const filter = { name: app.name }
  const update = { avgAge: app.avgAge, installCount: app.installCount }
  try {
    await Application.findOneAndUpdate(filter, update)
  } catch (error) {
    logger.error('updateAvgAge: Db error', { error })
  }
}

module.exports = {
  findAppByName,
  updateAvgAge
}
