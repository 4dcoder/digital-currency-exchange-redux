let logger = require('../utils/logger');
let Constants = require('../utils/constants');
let RateUtils = require('../utils/rate_utils');
let bitcoinExchangeRate = require('../services/bitcoin_exchange_rate');

class ExchangeController {
  list(req, res) {
    let promise = bitcoinExchangeRate.getCurrentExchangeRates([Constants.CURRENCIES.ETHERIUM, Constants.CURRENCIES.LITECOIN, Constants.CURRENCIES.DASH]);

    promise.then((currencies) => {
      let sortedCurrencies = currencies.map((currency) => {
        RateUtils.sortByLowestBid(currency.rates);
        return currency;
      })
      sortedCurrencies.forEach((currency) => {
        logger.debug(`best price for bitcoin to ${currency.name}`, currency.rates[0]);
      });
      res.json(sortedCurrencies);
    });


  }
}
module.exports = new ExchangeController();