const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const config = require('config');
const emailTemplate = require('../shared/emailTemplates');
const emailService = require('../shared/emailService');
const Feedback = db.Feedback;

function getById(id) {
    return Feedback.findById(id);
}

function create(feedbackParams) {
    const feedback = new Feedback(feedbackParams);
    return feedback.save()
        .then(feedbackEntity => {
            const mailoptions = {
                to: config.get('emailUser'),
                subject: "Feedback Received!",
                html: emailTemplate.getTemplateForFeedback(feedbackEntity.feedbackUserEmail, feedbackEntity.feedbackUser, feedbackEntity.feedbackMessage)
            };

            return emailService.sendMail(mailoptions)
                .then(emailReponse => {
                    emailReponse.code = 200;
                    emailReponse.message = "Feedback Email Sent Successfully."
                    return emailReponse;
                });
        });
}

function update(id, feedbackParam) {
    return Feedback.findByIdAndUpdate(id, { $set: feedback }, function (err, result) {
        if (err) {
            log.error(err);
        }
        log.info('Updating Feedback record:', result);
    });
}

module.exports = {
    getById,
    create,
    update
};
