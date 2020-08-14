const router = require('express').Router()
const applications = require('./applications')
const installedApps = require('./installedApps')

router.use('/appService', applications.API)
router.use('/appService', installedApps.API)

router.get('/status', async (req, res) => {
  res.status(200).json({ msg: 'health ok' })
})

module.exports = router
