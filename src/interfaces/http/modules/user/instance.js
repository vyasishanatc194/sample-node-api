
const container = require('src/container') // we have to get the DI
const { get, post, put, remove } = require('src/app/user')
const serializer = container.resolve('serializer');
module.exports = () => {
  const { repository: {
    userRepository, bureauRepository
  }, config, logger } = container.cradle
  const getUseCase = get({ userRepository, logger })
  const postUseCase = post({ userRepository, config, serializer, bureauRepository })
  const putUseCase = put({ userRepository, logger, config, serializer })
  const deleteUseCase = remove({ userRepository, serializer })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase,
  }
}
