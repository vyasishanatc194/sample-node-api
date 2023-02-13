/**
  * function for getter user.
  */
module.exports = ({ userRepository, logger }) => {
  // code for getting all the items
  const update = ({ Id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = User(body)
        await userRepository.update(user, {
          where: { Id }
        })
        logger.info(`User ${user.Id} is updated.`)
        resolve(user)
      } catch (error) {
        logger.error(error)
        reject(error)
      }
    })
  }
  return {
    update
  }
}
