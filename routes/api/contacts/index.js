const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatus,
  validateMongoId,
} = require('./validation')

router.use((req, res, next) => {
<<<<<<< HEAD
=======
  console.log(req.url)
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
  next()
})

router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationCreateContact, ctrl.create)

router
  .get('/:contactId', guard, validateMongoId, ctrl.getById)
  .delete('/:contactId', guard, validateMongoId, ctrl.remove)
  .put(
    '/:contactId',
    guard,
    validateMongoId,
    validationUpdateContact,
    ctrl.update
  )

router.patch('/:contactId/favorite', guard, validationUpdateStatus, ctrl.update)

<<<<<<< HEAD
module.exports = router
=======
module.exports = router
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
