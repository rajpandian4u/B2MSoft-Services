var express = require('express');
var app = express();
require('./b2mAppRoute')(app);

//Global Properties
global.propertyUtil = require('./src/util/PropertyUtil.js');
global.logger = require('./src/util/LoggingUtil.js');

logger.info("web port number: ", propertyUtil.getEnvironmentProperty('WEB_PORT'));
app.listen(propertyUtil.getEnvironmentProperty('WEB_PORT'));