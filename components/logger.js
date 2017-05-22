var loggerOpts = {
    logDirectory:'./logs',
    fileNamePattern:'<DATE>.log',
    level: process.env.LOG_LEVEL
};

// create a log manager
var manager = require('simple-node-logger').createLogManager(loggerOpts);
manager.createConsoleAppender();

module.exports = manager.createLogger;