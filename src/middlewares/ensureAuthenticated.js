const { verify } = require('jsonwebtoken')

const ErrorAlert = require('../utils/ErrorAlert')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new ErrorAlert('JWT not founded!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id)
    }

    return next()
  } catch {
    throw new ErrorAlert('Invalid JWT', 401)
  }
}

module.exports = ensureAuthenticated
