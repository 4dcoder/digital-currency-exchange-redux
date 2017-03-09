import AppDispatcher from '../app_dispatcher';
import {ReduceStore} from 'flux/utils';
import Constants from '../constants';

class ReportStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case Constants.FETCH_REPORTS_CURRENCIES_SUCCESS:
        // console.log('blah',action.payload.response);
        return action.payload.response;
      default:
        return state;
    }
  }
}

export default new ReportStore(AppDispatcher);