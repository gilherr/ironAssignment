const mongoose = require('mongoose')
const config = require('../config')

module.exports = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  const { host, port, user, password, dbName } = config.mongodb

  const connString = `mongodb://${user}:${password}@${host}:${port}/${dbName}`
  const connection = await mongoose.connect(connString, options)
  mongoose.set('useFindAndModify', false)
  return connection.connection.db
}
