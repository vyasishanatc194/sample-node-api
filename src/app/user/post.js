/**
 * this file will hold all the get use-case for user domain
 */
const { UserChangePasswordSerializer, UserResetPasswordSerializer, UserForgotPassowordSerializer } = require('src/domain/user')
const { encryptPassword } = require('../../infra/encryption')
const jwt = require('jsonwebtoken')
/**
  * function for getter user.
  */
module.exports = ({ config, userRepository, sendGrid, logger, serializer, bureauRepository }) => {
  // code for post use-case for bureau
  const changePassword = ({ user, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const changePasswordCredentials = await serializer.serialize(body, UserChangePasswordSerializer)
        const changepasswordData = { Password: encryptPassword(changePasswordCredentials.NewPassword) }
        try {
          const userObj = await userRepository.findOne({
            where: {
              Email: user.Email,
            }
          })
          const validatePass = userRepository.validatePassword(userObj.Password)
          if (!validatePass(changePasswordCredentials.OldPassword)) {
            logger.error(`Old password does-not match for user with id ${userObj.ID}`)
            throw new Error('Old password does-not match')
          }
          await userRepository.update(changepasswordData, {
            where: { ID: userObj.ID }
          })
          logger.info(`User with id ${userObj.ID} has changed password.`)
          const message = config.messages.success.changePassword;
          const data = {}
          resolve({ data, message })
        } catch (err) {
          throw new Error(err.message)
        }
      } catch (err) {
        logger.error(err)
        const error = err.message;
        const data = {}
        reject({ data, error })
      }
    })
  }

  const resetPassword = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resetPasswordCredentials = await serializer.serialize(body, UserResetPasswordSerializer);
        const resetPasswordData = { Password: encryptPassword(resetPasswordCredentials.NewPassword) };
        const decoded = jwt.verify(resetPasswordCredentials.Token, config.authSecret);

        if (decoded && decoded.useCase === config.passwordChangeUseCase) {
          try {
            const user = await userRepository.findOne({
              attributes: ['ID', 'Email', 'LegalName', 'Type', 'IsActive', 'CreatedAt', 'UpdatedAt'],
              where: {
                Email: decoded.Email,
              },
            });
            await userRepository.update(resetPasswordData, { where: { ID: user.ID } });
            if (decoded.Type == 'BUREAU') {
              await bureauRepository.update({ Status: 'Active' }, { where: { UserID: user.ID } });
            }
            logger.info(`User with id ${user.Id} has reset password.`);
            resolve({ message: config.messages.success.resetPassword, data: { ...user } });
          } catch (error) {
            logger.error(`${decoded.Email} user doesn't exists.`);
            reject({ data: {}, error: config.messages.error.resetPassword });
          }
        } else {
          reject({ data: {}, error: "Invalid token" });
        }
      } catch (error) {
        logger.error(error);
        reject({ data: {}, error: config.messages.error.resetPassword });
      }
    })
  }

  const generateUrl = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const message = config.messages.success.forgotPassword
        const credentials = await serializer.serialize(body, UserForgotPassowordSerializer)
        try {
          const user = await userRepository.findOne({
            where: {
              Email: credentials.Email,
            }
          })
          const payLoad = {
            Id: user.Id,
            Email: user.Email,
            Type: user.Type,
            useCase: config.passwordChangeUseCase,
            exp: Math.floor(Date.now() / 1000) + 60 * config.passwordResetExpirationTime
          }
          const token = jwt.sign(payLoad, config.authSecret)
          let randomUrl = `${config.clientHost}/reset-password?token=${token}`
          const sendMail = sendGrid.sendMail
          let msg = {
            to: user.Email,
            dynamic_template_data: {
              subject: "Forgot password reset url",
              passwordResetUrl: randomUrl,
              time: config.passwordResetExpirationTime,
              procedure_name: "Reset password"
            },
          };
          sendMail(msg);
          logger.info(`User ${user.Email} got reset password url.`)
          const data = {}
          resolve({ message, data })
        } catch (err) {
          logger.error(`${credentials.Email} user doesn't exists.`)
          reject({ data: {}, error: config.messages.error.forgotPassword })
        }
      } catch (err) {
        logger.error(err)
        reject({ data: {}, error: err.message })
      }
    })
  }
  return {
    generateUrl,
    changePassword,
    resetPassword,
  }
}
