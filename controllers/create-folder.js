const fs = require('fs/promises')

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}
<<<<<<< HEAD
=======

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}
<<<<<<< HEAD
=======

>>>>>>> db49ac2ca6e2153442d8e82a5d4bd28555549de1
module.exports = createFolderIsNotExist