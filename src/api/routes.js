const router = require('express').Router()
const applications = require('./applications')

router.use('/appService', applications.api)

router.get('/status', async (req, res) => {
  res.status(200).json({ msg: 'health ok' })
})

module.exports = router
