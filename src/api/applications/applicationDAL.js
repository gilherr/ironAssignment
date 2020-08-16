const Application = require('./applicationModel')
const logger = require('../../loaders/logger')
const axios = require('axios').default

async function fetchAll () {
  const apps = await Application.find()
  return apps
}

async function fetchAppsByCategory (category) {
  const apps = await Application.find({ category }, 'name avgAge')
  return apps
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
