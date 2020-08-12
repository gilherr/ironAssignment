const joi = require('joi')

const relevantAppQuerySchema = joi.object().keys({
  age: joi.number().integer().greater(0).less(120).required(),
  category: joi.string().trim().required(),
  customerType: joi.string().trim().required()
})

module.exports = {
  relevantAppQuerySchema
}
