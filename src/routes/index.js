const { Router } = require('express')
const usersRoutes = require('./users.routes')
const movieNotesRoutes = require('./movienotes.routes')
const movieTagRoutes = require('./movietags.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/notes', movieNotesRoutes)
routes.use('/tags', movieTagRoutes)

module.exports = routes
