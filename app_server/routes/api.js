let express = require('express');
let apiRoutes = express.Router();
let logger = require('../utils/logger');
var exchangeController = require('../api_controllers/exchange');

apiRoutes.get('/v1/exchanges', exchangeController.list);

module.exports = apiRoutes;