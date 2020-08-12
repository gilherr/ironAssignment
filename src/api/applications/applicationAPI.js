const router = require('express').Router()
const { findRelevantApps } = require('./applicationService')
const validator = require('./applicationValidatior')
const logger = require('../../loaders/logger')

router.get('/relevantApplication', async (req, res) => {
  const { error, value: validInput } = validator.relevantAppQuerySchema.validate(req.query)

  if (error) {
    logger.error(error)
    res.status(400).json({ msg: 'Bad query params', err: error.stack })
  } else {
    const relevantApps = await findRelevantApps(validInput)
    res.status(200).json({ apps: relevantApps })
  }
})

module.exports = router
