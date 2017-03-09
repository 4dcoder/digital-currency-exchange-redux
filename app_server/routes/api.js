let express = require('express');
let apiRoutes = express.Router();
let logger = require('../utils/logger');
var exchangeController = require('../api_controllers/exchange_rates');
var reportController = require('../api_controllers/report');

apiRoutes.get('/v1/exchangeRates', exchangeController.list);
apiRoutes.get('/v1/reports/currencies', reportController.currencies);

module.exports = apiRoutes;