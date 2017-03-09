let logger = require('../utils/logger');
let Constants = require('../utils/constants');
let RateUtils = require('../utils/rate_utils');
let bitcoinExchangeRate = require('../services/bitcoin_exchange_rate');
let cache = require('../services/cache');

class ExchangeRatesController {
  list(req, res) {
    let promise = bitcoinExchangeRate.getCurrentExchangeRates([Constants.CURRENCIES.ETHERIUM, Constants.CURRENCIES.LITECOIN, Constants.CURRENCIES.DASH]);

    promise.then((currencies) => {
      let sortedCurrencies = currencies.map((currency) => {
        //ugh destructive sort, not quite functional
        //will leave the map as is until a non destructive sort is implemented
        RateUtils.sortByLowestBid(currency.rates);
        return currency;
      })
      cache.setCurrencies(new Date(), sortedCurrencies);
      sortedCurrencies.forEach((currency) => {
        logger.debug(`all rates for Bitcoin to ${currency.name}`, currency.rates);
      });
      sortedCurrencies.forEach((currency) => {
        logger.debug(`best bid rate for Bitcoin to ${currency.name}`, currency.rates[0]);
      });
      res.json(sortedCurrencies);
    });
  }
}
module.exports = new ExchangeRatesController();