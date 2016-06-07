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
    return appNconf.get(key);
}

exports.getErrorProperty = function (key) {
    return appNconf.get(key);
}