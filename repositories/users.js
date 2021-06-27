const User = require('../model/user')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (body) => {
  const user = new User(body)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
<<<<<<< HEAD

=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
const updateSubscription = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })
}

<<<<<<< HEAD
const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
}

=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
module.exports = {
  findById,
  findByEmail,
  updateToken,
  create,
  updateSubscription,
<<<<<<< HEAD
  updateAvatar,
=======
>>>>>>> 58c58bcb754cf78325d5b405c542c3067b163131
}