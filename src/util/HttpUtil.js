var Client = require('node-rest-client').Client;
var restClient = new Client();

exports.handleRestCall = function (restURL, inputData, callback) {
    var isCallBacked = false;
    var args = {
        data: inputData,
        headers: { "Content-Type": "application/json" },
        requestConfig: {
            timeout: 10000, //request timeout in milliseconds 
            noDelay: true, //Enable/disable the Nagle algorithm 
            keepAlive: true, //Enable/disable keep-alive functionalityidle socket. 
            keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent 
        },
        responseConfig: {
            timeout: 10000 //response timeout 
        }
    };
    
    var restRequest = restClient.post(restURL, args, 
    function (data, response) {
        //console.log("Rest Response for URL: " + restURL + JSON.stringify(data));
        logger.info("Rest Response for URL: " + restURL + JSON.stringify(data))
        if (!isCallBacked) {
            isCallBacked = true;
            
            if (data.isSuccess) {
                callback(data, null);
            } else {
                callback(data, data.error);
            }
            
        }
    });
    
    restRequest.on('requestTimeout', 
    function (req) {
        logger.debug('request has expired');
        req.abort();
        if (!isCallBacked) {
            isCallBacked = true;
            callback(null, 'Request has expired');
        }
    });
    
    restRequest.on('responseTimeout', 
    function (res) {
        logger.debug('response has expired');
        if (!isCallBacked) {
            isCallBacked = true;
            callback(null, 'Response has expired');
        }
    });
    
    //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
    restRequest.on('error', 
    function (err) {
        logger.error('request error', err);
        if (!isCallBacked) {
            isCallBacked = true;
            callback(null, 'Error From B2M App Server');
        }
    });
}

exports.sendErrorResponse = function(res, errorCode) {
    var response = {};
    response.isSuccess = false;
    response.error = propertyUtil.getErrorProperty(errorCode);
    res.json(response);
}

exports.sendExceptionResponse = function (res, errorMessage) {
    var response = {};
    response.isSuccess = false;
    if (errorMessage && errorMessage.message) {
        response.error = errorMessage.message;
    } else {
        response.error = errorMessage;
    }
    res.json(response);
}

exports.sendSuccessResponse = function (res, data) {
    var response = {};
    response.isSuccess = true;
    response.serviceData = data;
    res.json(response);
}