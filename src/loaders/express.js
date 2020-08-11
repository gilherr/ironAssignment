const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./logger')
const routes = require('../api/routes')

function expressLoader (app) {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

  // Setup middlewares
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(logger.expressWinston)

  // Setup router
  app.use('/', routes)
}

module.exports = expressLoader
