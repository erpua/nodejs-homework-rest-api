const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
<<<<<<< HEAD
const path = require('path')
const { limiterAPI } = require('./helpers/constants')
require('dotenv').config()
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS
=======
const { limiterAPI } = require('./helpers/constants')
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use('/api/', rateLimit(limiterAPI))

=======
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use('/api/', rateLimit(limiterAPI))

>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: err.message,
  })
})

module.exports = app