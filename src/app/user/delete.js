/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const remove = ({ Id }) => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.update({
          isDeleted: 1
        }, {
          where: { Id }
        })
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
