const router = require('express').Router()
const logger = require('../../loaders/logger')

router.post('/installedApps', async (req, res) => {
  logger.debug('installedApps running', { body: req.body })
  res.status(200).json({ msg: 'in installedApps', body: req.body })
})

module.exports = router
