/**
  * function for getter user.
  */
module.exports = ({ userRepository, logger }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.getAll({
          attributes: [
            'Id', 'Email', 'Type', 'IsActive', 'CreatedAt', 'UpdatedAt'
          ],
        })
      )
      .catch(error => {
        logger.error(error)
        throw new Error(error)
      })
  }

  const getByID = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.findById(id, {
          attributes: [
            'Id', 'Email', 'Type', 'IsActive', 'CreatedAt', 'UpdatedAt'
          ]
        })
      )
      .catch(error => {
        logger.error(error)
        throw new Error(error)
      })
  }

  return {
    all,
    getByID
  }
}
