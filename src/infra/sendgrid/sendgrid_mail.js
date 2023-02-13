const sgMail = require('@sendgrid/mail');

module.exports = ({ config, logger }) => ({
    sendMail: (msg) => {
        msg.from = config.sendGridSenderID
        msg.templateId = config.sendGridOtpTemplate
        msg.from = config.sendGridSenderID
        sgMail.setApiKey(config.sendGridApiKey)
        if (config.enableSendGrid) {
            sgMail
                .send(msg)
                .then(() => {
                    logger.info(`Mail sent successfully for otp to ${msg.to}`)
                })
                .catch(error => {
                    logger.info(error)
                });
        } else {
            logger.info(`new otp is logged by ${msg.to}`)
            console.log(msg);
        }

    }
})