var httpUtil = require('../util/HttpUtil');

exports.testApi = function (req, res) {
    var testDetails = req.body;

    if (!testDetails.testInput) {
        httpUtil.sendErrorResponse(res, 'VE_TS_0001');
        return;
    }

    logger.info('B2M Test Log');
    var returnData = {
        testDetails: 'Return Value, ' + testDetails.testInput
    };
    httpUtil.sendSuccessResponse(res, returnData);
}