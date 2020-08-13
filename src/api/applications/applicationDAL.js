const Application = require('./applicationModel')
const logger = require('../../loaders/logger')
const axios = require('axios').default

async function fetchAppsByCategory (category) {
  const apps = await Application.find({ category }, 'name avgAge')
  logger.debug('fetchAppsByCategory', apps)
  return apps
}

async function fetchThirdPartyNumbers () {
  const url = 'https://www.random.org/integers'
  const params = {
    num: 1,
    min: 1,
    max: 5,
    col: 1,
    base: 10,
    format: 'plain',
    rnd: 'new'
  }
  try {
    const res = await axios.get(url, { params })
    logger.debug('3rd party numbers', res.data)
    return res.data
  } catch (error) {
    logger.error('Error fetching random numbers from extarnal API', error)
    throw error
  }
}

module.exports = {
  fetchAppsByCategory,
  fetchThirdPartyNumbers
}
