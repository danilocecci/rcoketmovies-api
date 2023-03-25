const knex = require('../database/knex')
const ErrorAlert = require('../utils/ErrorAlert')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const user = await knex('users').where({ id: user_id }).first()

    if (!user) {
      throw new ErrorAlert(
        'Only authenticated users can change their avatar!',
        401
      )
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.savefile(avatarFilename)
    user.avatar = filename

    await knex('users').update(user).where({ id: user_id })

    return response.json(user)
  }
}

module.exports = UserAvatarController
