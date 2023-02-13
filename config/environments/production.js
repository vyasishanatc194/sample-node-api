
module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 4000,
  timezone: process.env.TIMEZONE,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  authSecret: process.env.SECRET,
  expirationTime: process.env.TOKEN_EXPIRATION_TIME,
  authSession: {
    session: false
  },
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sendGridSenderID: process.env.SENDER_ID,
  sendGridOtpTemplate: process.env.SENDGRID_SEND_OTP,
  enableSendGrid: true ? process.env.ENABLE_SENDGRID === 'true' : false,
  clientHost: process.env.CLIENT_HOST,
  passwordResetExpirationTime: parseInt(process.env.PASSWORD_RESET_EXPIRATION_TIME),
  passwordChangeUseCase: process.env.PASSWORD_CHANGE_USE_CASE,
  PageSize: parseInt(process.env.PAGE_SIZE),
}
