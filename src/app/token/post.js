/**
 * this file will hold all the get use-case for user domain
 */
const { TokenSerializer } = require('src/domain/token')
/**
  * function for getter user.
  */
module.exports = ({ userRepository, webToken, logger, serializer, config }) => {

  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await serializer.serialize(body, TokenSerializer)
        const signIn = webToken.signin()
        try {
          const userCredentials = await userRepository.findOne({
            where: {
              Email: credentials.Email,
            }
          })
          const validatePass = userRepository.validatePassword(userCredentials.Password)

          if (!validatePass(credentials.Password)) {
            throw new Error(config.messages.error.login)
          }
          const message = config.messages.success.login;
          try {
            const data = {
              ...userCredentials,
              Token: signIn({
                Id: userCredentials.ID,
                Email: userCredentials.Email
              })
            }
            delete data.Password
            resolve({ data, message })
          } catch (err) {
            throw new Error(err.message)
          }
        } catch (err) {
          throw new Error(config.messages.error.login)
        }
      } catch (err) {
        logger.error(err)
        const error = err.message
        const data = {}
        reject({ data, error })
      }
    })
  }

  return {
    validate
  }
}
