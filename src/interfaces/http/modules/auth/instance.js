const container = require('src/container') // we have to get the DI
const { tokenPost } = require('src/app/token')
const { post, put } = require('src/app/user')
const serializer = container.resolve('serializer');
module.exports = () => {
  const { repository: {
    userRepository, bureauRepository
  }, sendGrid, config, logger, jwt } = container.cradle
  const tokenPostUseCase = tokenPost({
    userRepository,
    webToken: jwt, config,
    logger, serializer
  })
  const postUseCase = post({ userRepository, sendGrid, config, logger, webToken: jwt, serializer, bureauRepository })
  const putUseCase = put({ userRepository, logger, serializer })

  return {
    tokenPostUseCase,
    postUseCase,
    putUseCase
  }
}
