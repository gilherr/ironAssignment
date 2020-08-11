const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  name: String,
  avgAge: Number,
  category: String
})

module.exports = mongoose.model('Application', applicationSchema)
