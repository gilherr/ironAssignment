describe('Application API', () => {
  it('', () => {
  })
})

describe('Application Service', () => {
  it('', () => {
  })
})

describe('Application Validator', () => {
  let schema

  beforeEach(() => {
    schema = require('./applicationValidatior').relevantAppQuerySchema
  })

  it('should accept a valid customer object', () => {
    const customer = { age: 30, category: 'social', customerType: 'bronze' }
    const { error, value } = schema.validate(customer)
    expect(error).toBeFalsy()
    expect(value).toBeTruthy()
  })

  it('should reject a customer with bad params', () => {
    const customer = { age: 30.3, category: 'social', customerType: 'bronze' }
    const { error } = schema.validate(customer)
    expect(error).toBeTruthy()
  })

  it('should reject an invalid customer object', () => {
    const customer = { customerType: null }
    const { error } = schema.validate(customer)
    expect(error).toBeTruthy()
  })
})
