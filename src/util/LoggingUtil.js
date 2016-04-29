var winston = require('winston');
var fs = require('fs');
var propertyUtil = require('./PropertyUtil.js');
var logLevel = propertyUtil.getEnvironmentProperty('LOG_LEVEL');
var logFile = propertyUtil.getEnvironmentProperty('LOG_FILE');
var logException = propertyUtil.getEnvironmentProperty('LOG_EXCEPTION');
var logSize = propertyUtil.getEnvironmentProperty('LOG_SIZE');

var transports = [];

transports.push(
    new winston.transports.Console({
        level: 'warn',
        colorize: true
    }));

transports.push(
    new winston.transports.File({
        name: 'error-file',
        json: false,
        filename: logFile,
        maxsize: logSize, 
        level: logLevel,
    }));


var logger = new (winston.Logger)({
    transports: transports, 
    
    exceptionHandlers: [
        new winston.transports.File({
            filename: logException,
            json: false
        })
    ],
    
});
module.exports = logger;
