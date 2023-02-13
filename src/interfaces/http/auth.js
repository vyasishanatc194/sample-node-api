const Status = require('http-status')
/**
 * middleware to check the if auth vaid
 */
module.exports = ({ config, repository: { userRepository }, jwt, response: { Fail } }) => {
  const tokenAuthenticate = (req, res, next) => {
    let decodedEmail
    try {
      const token = req.headers['authorization']
      const decode = jwt.decode()
      const verify = jwt.verify()
      const decodedTokenData = decode(token)
      if (!decodedTokenData) {
        res.status(Status.BAD_REQUEST).json(
          Fail({}, 'Invalid token'))
      }
      verify(token)
      decodedEmail = decodedTokenData.Email
      const currentTime = Math.round(Date.now() / 1000);
      if (currentTime > decodedTokenData.exp) {
        const error = new Error('Token expired');
        throw error;
      }
    } catch (err) {
      res.status(Status.BAD_REQUEST).json(
        Fail({}, 'Invalid token'))
    }
    userRepository.findOne({
      attributes: [
        'Id', 'Email', 'LegalName', 'Type'
      ],
      where: {
        Email: decodedEmail,
        IsActive: 1
      }
    }).then(data => {
      req.user = data
      next()
    }).catch(error => {
      res.status(Status.BAD_REQUEST).json(
        Fail({}, error))
    })
  }
  return { tokenAuthenticate }
}