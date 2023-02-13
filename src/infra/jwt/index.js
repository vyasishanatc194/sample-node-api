const jwt = require('jsonwebtoken')
const {
  compose,
  trim,
  replace,
  partialRight
} = require('ramda')

module.exports = ({ config, logger }) => ({
  signin: (options) => (payload) => {
    const opt = Object.assign({}, options, { expiresIn: config.expirationTime })
    logger.info(`User ${payload.email} generated a new token`)
    return jwt.sign(payload, config.authSecret, opt)
  },
  verify: (options) => (token) => {
    const cleanedToken = token.replace(/JWT|jwt/g, '').replace(' ', '')
    return jwt.verify(cleanedToken, config.authSecret)
  },
  decode: (options) => (token) => {
    const opt = Object.assign({}, { expiresIn: config.expirationTime })
    const decodeToken = compose(
      partialRight(jwt.decode, [opt]),
      trim,
      replace(/JWT|jwt/g, '')
    )

    return decodeToken(token)
  }
})
