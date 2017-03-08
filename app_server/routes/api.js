let express = require('express');
let apiRoutes = express.Router();
let logger = require('../utils/logger');
var exchangeController = require('../api_controllers/exchange_rates');

apiRoutes.get('/v1/exchangeRates', exchangeController.list);

module.exports = apiRoutes;