const Joi = require('joi')
const { UserPlans } = require('../../../helpers/constants')
const subscriptionOptions = Object.values(UserPlans)

const schemaCreateUser = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
<<<<<<< HEAD
    tlds: { allow: ['com', 'net', 'ua'] },
=======
    tlds: { allow: ['com', 'net'] },
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
  }),
  password: Joi.string().min(8).max(15).required(),
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .optional(),
})

const schemaLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    })
  }
}
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
module.exports = {
  validationCreateUser: (req, res, next) => {
    return validate(schemaCreateUser, req.body, next)
  },

  validateLoginUser: (req, res, next) => {
    return validate(schemaLoginUser, req.body, next)
  },
<<<<<<< HEAD

  validateSubscription: (req, res, next) => {
    return validate(schemaUpdateSubscription, req.body, next)
  },

}
=======
  validateSubscription: (req, res, next) => {
    return validate(schemaUpdateSubscription, req.body, next)
  },
<<<<<<< HEAD
}
=======
}
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
