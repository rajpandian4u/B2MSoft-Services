var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    methodOverride = require('method-override'),
    app = express(),
    connectDomain = require('connect-domain');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(connectDomain());

    var b2mTestService = require('./src/service/B2MTestService');
        
    app.use(function (req, res, next) {
        logger.log('Request Received Time:', Date.now());
        next();
    });

    app.post('/b2m/testApi', b2mTestService.testApi);
    
    //Middleware to Handle Application Error
    app.use(errorHandler);

    function errorHandler(err, req, res, next) {
        var httpUtil = require('./util/httpUtil');
        httpUtil.sendErrorResponse(res, 'SE_GL_0001');
        logger.error(err.stack);
    }
    
    setTimeout(function () {
        logger.log('Timeout Set to 500');
    }, 500)
}