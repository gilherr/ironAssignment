const router = require('express').Router()
const logger = require('../../loaders/logger')
const validator = require('./installedAppsValidatior')
const { fetchInstalledApp, calcAndSendNewAvgAge } = require('./installedAppsService')

router.post('/installedApps', async (req, res) => {
  const body = validator.installedAppsBodySchema.validate(req.body)

  if (body.error) {
    const errorMessage = body.error.details[0].message
    logger.error('installedApps: validation error', { errorMessage })
    res.status(400).json({ err: `ValidationError: ${errorMessage}` })
    return
  }

  const { installedApp, age } = body.value
  const app = await fetchInstalledApp(installedApp)

  if (app) {
    calcAndSendNewAvgAge(app, age)
    res.status(202).json({ msg: `Update request for [${installedApp}] received` })
  } else {
    res.status(404).json({ err: 'Error: Installed app not found' })
  }
})

module.exports = router
