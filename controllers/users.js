const Users = require('../repositories/users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
<<<<<<< HEAD
const EmailService = require('../services/email')
const { CreateSenderNodemailer } = require('../services/email-sender')
=======

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
require('dotenv').config()

const UploadService = require('../services/cloud-upload')

<<<<<<< HEAD
=======
require('dotenv').config()

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is already used',
      })
    }

<<<<<<< HEAD
    const { id, email, subscription, avatar, verifyToken } = await Users.create(
      req.body
    )
    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderNodemailer()
      )
      await emailService.sendVerifyEmail(verifyToken, email)
    } catch (error) {
      console.log(error)
    }
=======

    const { id, email, subscription, avatar } = await Users.create(req.body)

    const { id, email, subscription } = await Users.create(req.body)

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'You registered successfully',
      user: { id, email, subscription, avatar },
<<<<<<< HEAD
=======
      user: { id, email, subscription },
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const isValidPassword = await user?.isValidPassword(req.body.password)
<<<<<<< HEAD
    console.log(user.isVerified)
    if (!user || !isValidPassword || !user.isVerified) {
=======
    if (!user || !isValidPassword) {
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid login or password',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)

<<<<<<< HEAD
    const { email, subscription } = user

=======

    const { email, subscription } = user

    const {
      _doc: { email, subscription },
    } = user


>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { token, user: { email, subscription } },
      message: 'You have logged in',
<<<<<<< HEAD
=======
      token,
      message: 'You have logged in',
      user: { email, subscription },
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }

    const { email, subscription } = req.user

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user.id
    const updatedSubscription = await Users.updateSubscription(id, req.body)

    if (!updatedSubscription) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      })
    }
    const { email, subscription } = updatedSubscription
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      message: 'Contact updated',
      payload: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const uploads = new UploadService()
    const { idCloudAvatar, avatarUrl } = await uploads.saveAvatar(
      req.file.path,
      req.user.idCloudAvatar
    )
    await fs.unlink(req.file.path)

    await Users.updateAvatar(id, avatarUrl, idCloudAvatar)
    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    })
  } catch (error) {
    next(error)
  }
}

<<<<<<< HEAD
const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.token)
    if (user) {
      await Users.updateVerifyToken(user.id, true, null)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Success!' },
      })
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Verification token isn`t valid',
    })
  } catch (error) {
    next(error)
  }
}

const repeatEmailVerification = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      const { email, isVerified, verifyToken } = user
      if (!isVerified) {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderNodemailer()
        )
        await emailService.sendVerifyEmail(verifyToken, email)
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          message: 'Resubmitted verification',
        })
      }
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email has been verified',
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User not found',
    })
  } catch (error) {
    next(error)
  }
}
=======
>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
<<<<<<< HEAD
  avatars,
  repeatEmailVerification,
  verify,
=======

  avatars,

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
}