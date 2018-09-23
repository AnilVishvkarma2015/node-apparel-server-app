const log = require('log4js').getLogger('application');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        log.error(err);
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        log.error(err.message);
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    log.error(err.message);
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
