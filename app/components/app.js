import React, {Component, PropTypes as T} from 'react';
import {render} from 'react-dom';
import {Container} from 'flux/utils';
import ExchangeStore from '../stores/exchange_store';
import ReportStore from '../stores/report_store';
import Exchange from './exchange';
import ExchangeResult from './exchange_result';
import ExchangeReport from './exchange_report';
import ExchangeActions from '../actions/exchange_actions';
import ReportActions from '../actions/report_actions';

class App extends Component {

  constructor() {
    super(...arguments);
  }

  _handleConvert(options) {
    ExchangeActions.exchange(options);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.exchangeResult !== this.state.exchangeResult) {
      ReportActions.getAllCurrencies();
    }
  }

  render() {
    return (
      <div>
        <Exchange onConvert={this._handleConvert.bind(this)}/>
        <ExchangeResult result={this.state.exchangeResult}/>
        <ExchangeReport currencies={this.state.currenciesReport}/>
      </div>
    );
  }
}

App.propTypes = {
  children: T.object,
};

App.getStores = () => ([
  ExchangeStore,
  ReportStore
]);

/*eslint no-unused-vars: 0*/
App.calculateState = (prevState) => {
  return {
    exchangeResult: ExchangeStore.getState(),
    currenciesReport: ReportStore.getState()
  };
};

export default Container.create(App);


