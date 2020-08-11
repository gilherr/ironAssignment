module.exports = {
  mongodb: {
    url: process.env.MONGO_CONNECTION_STRING,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE
  }
}
