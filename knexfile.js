const path = require('path')

const configKnex = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool: {
      afterCreate: (connection, callback) =>
        connection.run('PRAGMA foreign_keys = ON', callback)
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      )
    },
    useNullAsDefault: true
  }
}

module.exports = configKnex
