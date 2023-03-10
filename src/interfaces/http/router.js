const statusMonitor = require('express-status-monitor')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const compression = require('compression')

const { Router } = require('express')
const { partialRight } = require('ramda')

const controller = require('./utils/create_controller')
const httpLogger = require('./middlewares/http_logger')
const errorHandler = require('./middlewares/error_handler')

module.exports = ({ config, logger, database }) => {
  const router = Router()

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(httpLogger(logger))
  }

  const apiRouter = Router()
  apiRouter
    .use(cors({
      origin: [
        'http://localhost:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(cookieParser())

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  // For  use of swagger only
  apiRouter.use('/', controller('index'))
  apiRouter.use('/', controller('auth').router)
  apiRouter.use('/user', controller('user').router)
  apiRouter.use('/bureau', controller('bureau').router)

  router.use(`/api/${config.version}`, apiRouter)
  router.use(partialRight(errorHandler, [logger, config]))

  return router
}
