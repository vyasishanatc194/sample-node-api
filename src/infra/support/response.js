const { assoc } = require('ramda')

module.exports = ({ config }) => {
  const defaultResponse = (success = true, message) => {
    return {
      success,
      version: config.version,
      message: message
    }
  }

  const Success = (data, message) => {
    return assoc(
      'data',
      data,
      defaultResponse(true, message)
    )
  }

  const Fail = (data, message) => {
    return assoc(
      'data',
      data,
      defaultResponse(false, message)
    )
  }

  return {
    Success,
    Fail
  }
}
