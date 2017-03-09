import AppDispatcher from '../app_dispatcher';
import ReportsAPI from '../apis/report_api';
import Constants from '../constants';

let ReportActions = {
  getAllCurrencies() {
    return Promise.resolve({}).then(() => {
      AppDispatcher.dispatchAsync(ReportsAPI.fetchAllCurrencies(), {
        request: Constants.FETCH_REPORTS_CURRENCIES,
        success: Constants.FETCH_REPORTS_CURRENCIES_SUCCESS,
        failure: Constants.FETCH_REPORTS_CURRENCIES_ERROR
      });
    });
  }
};

export default ReportActions;