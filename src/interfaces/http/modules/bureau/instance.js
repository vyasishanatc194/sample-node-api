
const container = require('src/container') // we have to get the DI
const { get, post, put, remove } = require('src/app/bureau')
const serializer = container.resolve('serializer');

module.exports = () => {
  const { repository: {
    bureauRepository, userRepository
  }, config, logger, sendGrid } = container.cradle

  const getUseCase = get({ bureauRepository, config })
  const postUseCase = post({ bureauRepository, userRepository, config, logger, sendGrid, serializer })
  const putUseCase = put({ bureauRepository, serializer })
  const deleteUseCase = remove({ bureauRepository, serializer, config })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
