const router = require('express').Router()

router.get('/status', async (req, res) => {
  res.status(200).json({ msg: 'health ok' })
})

module.exports = router
