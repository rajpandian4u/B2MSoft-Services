var httpUtil = require('../util/HttpUtil');

exports.testApi = function (req, res) {
    var ids = req.params.ids;

    if (!ids) {
        httpUtil.sendErrorResponse(res, 'VE_TS_0001');
        return;
    }

    logger.info('B2M Test Log');
    var returnData = {
        testDetails: 'Return Value, ' + ids
    };
    httpUtil.sendSuccessResponse(res, returnData);
}