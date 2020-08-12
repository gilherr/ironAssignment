const router = require('express').Router()
const validator = require('./applicationValidatior')
const logger = require('../../loaders/logger')

router.get('/relevantApplication', async (req, res) => {
  const { error, value: validInput } = validator.relevantAppQuerySchema.validate(req.query)

  if (error) {
    logger.error(error)
    res.status(400).json({ msg: 'Bad query params', err: error.stack })
  } else {
    res.status(200).json({ msg: 'input is valid' })
  }
})

module.exports = router
