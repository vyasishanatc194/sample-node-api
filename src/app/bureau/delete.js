/**
  * function for getter bureau.
  */
module.exports = ({ bureauRepository, config }) => {
  // code for getting all the items

  const remove = ({ ID }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await bureauRepository.update({
          isActive: 0
        }, {
          where: { ID }
        })
        resolve({ data: {}, message: config.messages.success.bureauDelete })
      } catch (err) {
        logger.error(err)
        const error = config.messages.error.bureauDelete
        reject({ data: {}, error })
      }
    })
  }

  return {
    remove
  }
}
