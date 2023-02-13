const User = require('./user')
const Bureau = require('./bureau')
const SourceFile = require('./SourceFile')


module.exports = ({ database, sendGrid }) => {
  const userModel = database.models.users
  const bureauModel = database.models.bureaus
  const sourceFile = database.models.bureaus

  return {
    userRepository: User({ model: userModel }),
    bureauRepository: Bureau({ model: bureauModel }),
    sourceFileRepository: SourceFile({ model: sourceFile }),
    sendGrid: sendGrid
  }
}