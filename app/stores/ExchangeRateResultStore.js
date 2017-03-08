import AppDispatcher from '../../shared/AppDispatcher';
import {ReduceStore} from 'flux/utils';
import Constants from '../../shared/Constants';

class ExchangeRateResultStore extends ReduceStore {
  getInitialState() {
    return {quotes: [], count: 0};
  }

  reduce(state, action) {
    switch (action.type) {
      case Constants.FETCH_ADMIN_QUOTES_SUCCESS:
        return action.payload.response;
      default:
        return state;
    }
  }
}

export default new ExchangeRateResultStore(AppDispatcher);