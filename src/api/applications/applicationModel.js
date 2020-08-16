const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  name: String,
  avgAge: Number,
  category: String,
  installCount: Number
})

module.exports = mongoose.model('Application', applicationSchema)
