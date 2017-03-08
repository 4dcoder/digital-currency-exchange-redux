var fetch = require('node-fetch');
let environment = require('../utils/environment');
let Constants = require('../utils/constants');
let ArrayUtils = require('../utils/array_utils');
let logger = require('../utils/logger');

class ExchangeRate {
  constructor() {
  }

  getBittrexExchangeRates(toCurrencies) {
    let promises = toCurrencies.map((currency) => {
      let bittrexURI = `${environment.getBittrexURL()}/api/v1.1/public/getticker?market=${Constants.BITTREX_BITCOIN_CURRENCY_MARKET_PLACE[currency]}`;
      return fetch(bittrexURI).then((response) => {
        return response.json().then((json) => {
          return {
            currency: currency, rate: {
              exchange: 'bittrex',
              bid: json.result.Bid,
              ask: json.result.Ask
            }
          };
        })
      });
    });
    return Promise.all(promises).then((resolves) => {
      return resolves;
    });
  }

  getPoloniexExchangeRates(toCurrencies) {
    let poloniexURI = `${environment.getPoloniexURL()}/public?command=returnTicker`;
    return fetch(poloniexURI).then((response) => {
      return response.json().then((json) => {
        let exchangeRates = toCurrencies.map((currency) => {
          let data = json[Constants.POLONIEX_BITCOIN_CURRENCY_MARKET_PLACE[currency]];
          return {
            currency: currency,
            rate: {
              exchange: 'poloniex',
              bid: Number.parseFloat(data.highestBid),
              ask: Number.parseFloat(data.lowestAsk)
            }
          };
        });
        return exchangeRates;
      })
    }).then((exchangeRates) => {
      return exchangeRates;
    });
  }

  getCurrentExchangeRates(toCurrencies) {
    return Promise.all([this.getPoloniexExchangeRates(toCurrencies), this.getBittrexExchangeRates(toCurrencies)]).then((resolves) => {

      let exchangeRates = ArrayUtils.flatten(resolves);
      let consolidatedExchangeRates = {currencies: []};
      exchangeRates.reduce((a, b) => {
        let currency = a.currencies.find((x) => x.name === b.currency);
        if (!currency) {
          currency = {name: b.currency, rates: []};
          a.currencies.push(currency);
        }
        currency.rates.push(b.rate);
        return a;
      }, consolidatedExchangeRates);
      return consolidatedExchangeRates.currencies;
    });
  }

}

module.exports = new ExchangeRate();