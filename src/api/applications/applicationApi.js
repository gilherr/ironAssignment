const router = require('express').Router()

router.get('/relevantApplication', async (req, res) => {
  /* Magic */
  res.status(200).json({ msg: 'hello world' })
})

module.exports = router
