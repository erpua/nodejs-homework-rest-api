const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
<<<<<<< HEAD
const upload = require('../../../helpers/upload')
=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131

const {
  validateLoginUser,
  validateSubscription,
  validationCreateUser,
} = require('./validation')

router.post('/register', validationCreateUser, ctrl.register)
router.post('/login', validateLoginUser, ctrl.login)
router.post('/logout', guard, ctrl.logout)
<<<<<<< HEAD

router.get('/current', guard, ctrl.current)
router.patch('/', guard, validateSubscription, ctrl.updateSubscription)
router.patch('/avatars', guard, upload.single('avatar'), ctrl.avatars)

module.exports = router
=======
router.get('/current', guard, ctrl.current)
router.patch('/', guard, validateSubscription, ctrl.updateSubscription)

module.exports = router
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
