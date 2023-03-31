const knex = require('../database/knex')

class UserRepository {
  async findByEmail(email) {
    const userExists = await knex('users').where({ email }).first() 
    return userExists
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({
      name,
      email,
      password
    })
    
    return { id: userId }
  }
}

module.exports = UserRepository