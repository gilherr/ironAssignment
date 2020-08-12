const bronze = require('./bronze')
const silver = require('./silver')
const gold = require('./gold')
const logger = require('../../../loaders/logger')

function rankerFactory (customerType) {
  const rankers = { bronze, silver, gold }
  const validCustomerType = ['bronze', 'silver', 'gold'].includes(customerType)
  let rankingFunction

  if (validCustomerType) {
    rankingFunction = rankers[customerType]
  } else {
    logger.warn(`No ranking function exists for ${customerType} customer type`)
    rankingFunction = (apps) => apps
  }

  return rankingFunction
}

module.exports = rankerFactory
