const joi = require('joi')

const installedAppsBodySchema = joi.object().keys({
  age: joi.number().integer().greater(0).less(120).required(),
  installedApp: joi.string().trim().required()
})

module.exports = {
  installedAppsBodySchema
}
