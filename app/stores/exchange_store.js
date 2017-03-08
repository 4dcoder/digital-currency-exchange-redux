import AppDispatcher from '../app_dispatcher';
import {ReduceStore} from 'flux/utils';
import Constants from '../constants';

class ExchangeStore extends ReduceStore {
  getInitialState() {
    return {};
  }

  reduce(state, action) {
    switch (action.type) {
      case Constants.FETCH_EXCHANGE_RATES_SUCCESS:
        return action.payload.response;
      default:
        return state;
    }
  }
}

export default new ExchangeStore(AppDispatcher);