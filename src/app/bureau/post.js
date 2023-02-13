/**
 * this file will hold all the get use-case for bureau domain
 */
const { BureuCreateSerializer, BureuStatusChangeSerializer } = require('src/domain/bureau')
const jwt = require('jsonwebtoken')
const container = require('src/container')
const users = container.resolve('database').models.users


const { generateRandomString } = require('src/infra/utils/random_string_generator')()

/**
  * function for getter bureau.
  */
module.exports = ({ bureauRepository, userRepository, config, logger, sendGrid, serializer }) => {

  // code for getting all the items
  const create = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const bureau = await serializer.serialize(body, BureuCreateSerializer)
        const userData = {
          Email: bureau.Email,
          Password: generateRandomString(10),
          LegalName: bureau.LegalName,
          Type: "BUREAU"
        }
        delete bureau.Email
        delete bureau.LegalName
        const userObj = await userRepository.create(userData)
        bureau.UserID = userObj.ID
        bureau.Status = "Pending"
        await bureauRepository.create(bureau)
        const data = {}
        const message = config.messages.success.addBureau;
        const payLoad = {
          ID: userObj.ID,
          Email: userObj.Email,
          Type: userObj.Type,
          useCase: config.passwordChangeUseCase,
          exp: Math.floor(Date.now() / 1000) + 60 * config.passwordResetExpirationTime
        }
        const token = jwt.sign(payLoad, config.authSecret)
        let randomUrl = `${config.clientHost}/reset-password?token=${token}`
        const sendMail = sendGrid.sendMail
        let msg = {
          to: userObj.email,
          dynamic_template_data: {
            subject: "Create password url",
            passwordResetUrl: randomUrl,
            time: config.passwordResetExpirationTime,
            procedure_name: "create password"
          },
        };
        sendMail(msg);
        resolve({ data, message })
      } catch (err) {
        logger.error(error)
        const data = {}
        const error = config.messages.error.addBureau
        reject({ data, error })
      }
    })

  }

  const statusChange = ({ body, id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const statusChangeData = await serializer.serialize(body, BureuStatusChangeSerializer)
        const ID = id
        try {
          await bureauRepository.update(statusChangeData, {
            where: { ID }
          })
          resolve({ data: {}, message: config.messages.success.bureauStatusChange })
        } catch (err) {
          logger.error(err)
          reject({ data: {}, error: config.messages.error.bureauStatusChange })
        }
      } catch (err) {
        logger.error(err)
        const data = {}
        const error = err.message
        reject({ data, error })
      }
    })
  }

  const inviteBureau = ({ ID }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const bureau = await bureauRepository.findById(ID, {
          include: [{
            model: users,
            attributes: ['ID', 'Email', 'Type'],
          }],
          attributes: [
            'ID'
          ]
        })
        const payLoad = {
          ID: bureau.user.ID,
          Email: bureau.user.Email,
          Type: bureau.user.Type,
          useCase: config.passwordChangeUseCase,
          exp: Math.floor(Date.now() / 1000) + 60 * config.passwordResetExpirationTime
        }
        const token = jwt.sign(payLoad, config.authSecret)
        let randomUrl = `${config.clientHost}/reset-password?token=${token}`
        const sendMail = sendGrid.sendMail
        let msg = {
          to: bureau.user.Email,
          dynamic_template_data: {
            subject: "Create password url",
            passwordResetUrl: randomUrl,
            time: config.passwordResetExpirationTime,
            procedure_name: "create password"
          },
        };
        sendMail(msg);
        resolve({ data: {}, message: config.messages.success.invitedBureau })
      } catch (err) {
        logger.error(err)
        reject({ data: {}, error: config.messages.error.invitedBureau })
      }
    })
  }

  return {
    create,
    statusChange,
    inviteBureau
  }
}
