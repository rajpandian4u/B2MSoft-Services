/**
 * Description: This Javascript uses Abstract Factory Pattern and delegates the call
 * to the corresponding directory
 * Created by Rajesh Pandian.
 */
'use strict';
var auditRequest = {},
    servicesConfig = require('./ServicesConfig'),
    idsDelimiter = [' ', ','];

exports.delegateServices = function (req, res) {
    var resource = req.params.resource.toUpperCase(),
        version = req.params.version.toUpperCase(),
        ids = req.params.ids? req.params.ids.toUpperCase(): req.params.ids,
        auditKey = version + '-' + resource,
        idsArray;

    if(servicesConfig.apiData[version] 
            && servicesConfig.apiData[version][resource]
            && servicesConfig.apiData[version][resource].OPERATION) {
        if(ids) {
            idsArray = ids.split(new RegExp(idsDelimiter.join('|'), 'g'));
        }
        req.params.ids = idsArray;
        servicesConfig.apiData[version][resource].OPERATION(req, res);
    } else {
        throw ('Illegal Version/Resource Exception: Version/Resource not found for ' + auditKey);
    }
};

exports.getServices = function(req, res) {
    httpUtil.sendSuccessResponse(res, servicesConfig.apiData);
};