var config = require('../config');
var loggerOpts = {
    logDirectory:'./logs',
    fileNamePattern:'<DATE>.log',
    level: config.log.level
};

// create a log manager
var manager = require('simple-node-logger').createLogManager(loggerOpts);
manager.createConsoleAppender();

module.exports = manager.createLogger;