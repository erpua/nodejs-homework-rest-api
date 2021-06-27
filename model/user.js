const { Schema, model } = require('mongoose')
<<<<<<< HEAD
const gravatar = require('gravatar')
=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
const { UserPlans } = require('../helpers/constants')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 8

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [UserPlans.START, UserPlans.PRO, UserPlans.BUSINESS],
      default: UserPlans.START,
    },
    token: String,
<<<<<<< HEAD
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
<<<<<<< HEAD

=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User