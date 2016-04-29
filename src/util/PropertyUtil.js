var fs = require('fs'),
    appNconf = require('nconf');

var applicationPropertyPath = './resources/properties/application.properties';
var envPropertyPath = './resources/properties/environment.properties';
var errorPropertyPath = './resources/properties/error.properties';

appNconf.file(applicationPropertyPath);
appNconf.file('environment', envPropertyPath);
appNconf.file('error', errorPropertyPath);

exports.getApplicationProperty = function (key) {
    return appNconf.get(key);
}

exports.getEnvironmentProperty = function (key) {
    var env;
    if (process.env.ENV) {
        env = process.env.ENV;
    } else {
        env = 'LOCAL';
    }

    return appNconf.get(key + '_' + env);
}

exports.getErrorProperty = function (key) {
    return appNconf.get(key);
}