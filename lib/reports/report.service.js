const db = require('../shared/dataSource');
const Report = db.Report;
const emailService = require('../shared/emailService');
const emailTemplate = require('../shared/emailTemplates');

function create(reportParams) {
    const report = new Report(reportParams);
    return report.save()
        .then(subscriber => {
            const mailoptions = {
                to: subscriber.subscriberEmail,
                subject: "R-Shop Subscription",
                html: emailTemplate.getTemplateForSubscription()
            };
            return emailService.sendMail(mailoptions)
                .then(emailReponse => {
                    return emailReponse;
                });
        });
}

module.exports = {
    create
};
