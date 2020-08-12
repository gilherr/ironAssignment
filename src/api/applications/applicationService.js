const logger = require('../../loaders/logger')

function findRelevantApps (userMeta) {
  logger.debug('in findRelevantApps', userMeta)
  return userMeta
}

module.exports = {
  findRelevantApps
}
