const Application = require('./applicationModel')
const logger = require('../../loaders/logger')
const axios = require('axios').default

async function fetchAll () {
  try {
    return await Application.find()
  } catch (error) {
    logger.error('fetchAll: DB error', { error })
    return null
  }
}

async function fetchAppsByCategory (category) {
  try {
    return await Application.find({ category }, 'name avgAge')
  } catch (error) {
    logger.error('fetchAppsByCategory: DB error', { error })
    return null
  }
}

async function fetchThirdPartyNumbers (options) {
  const {
    num = 1,
    min = 1,
    max = 5,
    col = 1,
    base = 10,
    format = 'plain',
    rnd = 'new'
  } = options

  const url = `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`

  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    logger.error('Error fetching random numbers from extarnal API', { error })
    throw error
  }
}

module.exports = {
  fetchAll,
  fetchAppsByCategory,
  fetchThirdPartyNumbers
}
