const Joi = require('joi')
<<<<<<< HEAD
=======
const mongoose = require('mongoose')
>>>>>>> 928050f4263b68721f04ab87139def7bcff63a5e

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
<<<<<<< HEAD
  phone: Joi.number().integer().required(),
  isFavourite: Joi.boolean().required(),
=======
  phone: Joi.string().min(9).max(15).required(),
  favorite: Joi.boolean().optional(),
>>>>>>> 928050f4263b68721f04ab87139def7bcff63a5e
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
<<<<<<< HEAD
  phone: Joi.number().integer(),
  isFavourite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'isFavourite')

const schemaUpdateFavourite = Joi.object({
  isFavourite: Joi.boolean().required(),
=======
  phone: Joi.string().min(9).max(15),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favourite')

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
>>>>>>> 928050f4263b68721f04ab87139def7bcff63a5e
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

>>>>>>> 928050f4263b68721f04ab87139def7bcff63a5e
module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
  validationUpdateStatus: (req, res, next) => {
<<<<<<< HEAD
    return validate(schemaUpdateFavourite, req.body, next)
=======
    return validate(schemaUpdateFavorite, req.body, next)
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: 'Invalid ObjectId' })
    }
    next()
>>>>>>> 928050f4263b68721f04ab87139def7bcff63a5e
  },
}