import AppDispatcher from '../app_dispatcher';
import ExchangeAPI from '../apis/exchange_api';
import Constants from '../constants';

let ExchangeActions = {
  exchange(options) {
    let promise = ExchangeAPI.fetchExchangeRates().then((currencies) => {
      return Object.assign({}, options, {currencies});
    });
    AppDispatcher.dispatchAsync(promise, {
      request: Constants.FETCH_EXCHANGE_RATES,
      success: Constants.FETCH_EXCHANGE_RATES_SUCCESS,
      failure: Constants.FETCH_EXCHANGE_RATES_ERROR
    });
  }
};

export default ExchangeActions;