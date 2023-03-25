const knex = require('../database/knex')
const ErrorAlert = require('../utils/ErrorAlert')
const { hash, compareSync } = require('bcryptjs')

class UsersController {
  async create(request, response) {
    const { name, email, password, avatar } = request.body

    const userExists = await knex('users').where({ email }).first()
    const hashedPassword = await hash(password, 8)

    if (userExists) {
      throw new ErrorAlert('This email is already being used!')
    }

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      avatar
    })

    return response.json()
  }

  async update(request, response) {
    const { name, email, newPassword, oldPassword, avatar } = request.body
    const user_id = request.user.id

    const existentUser = await knex('users').where({ id: user_id }).first()
    const checkOldPassword = await knex('users')
      .where({ id: user_id })
      .select('password')
      .first()

    const hashedPassword = await hash(newPassword, 8)

    if (!existentUser) {
      throw new ErrorAlert('Inexistent user!')
    }

    if (!compareSync(oldPassword, checkOldPassword['password'])) {
      throw new ErrorAlert('The old password does not match!')
    }

    if (user_id == existentUser['id']) {
      await knex('users')
        .update({
          name,
          email,
          password: hashedPassword,
          avatar
        })
        .where({ id: user_id })
    } else {
      throw new ErrorAlert("You cannot update this user's info")
    }

    return response.json({ message: "User's info was updated!" })
  }

  async delete(request, response) {
    const { id } = request.params
    const { password } = request.body

    const user = await knex('users').where({ id }).first()

    if (!user) {
      throw new ErrorAlert('This user does not exist!')
    }

    const checkPassword = await compareSync(password, user['password'])

    if (!checkPassword) {
      throw new ErrorAlert('The password does not match!')
    }

    await knex('users').where({ id }).delete()

    return response.json({
      message: `User '${user['name']}' has been deleted!`
    })
  }
}

module.exports = UsersController
