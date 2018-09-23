const log4js = require('log4js');
const config = require('config');

function initialize() {
    log4js.configure(config.get('logging'));
}

module.exports.initialize = initialize;
