/**
 * All the rest services in B2M application is configured here
 * Created by Rajesh Pandian
 */

var b2mTestService = require('./B2MTestService'),
    apiData = {
        V1: {
            TEST_API:{
                NAME: 'TEST API',
                DESC: 'Pings B2M Application API',
                PARAMETERS: 'test',
                PARAMETERS_DESC: 'test - Test Data',
                TYPE: 'GET',
                SECURITY: 'None',
                OPERATION: b2mTestService.testApi
            }
        }
    };

exports.apiData = apiData;
