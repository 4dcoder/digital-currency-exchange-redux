import React, {Component, PropTypes as T} from 'react';
import {render} from 'react-dom';

class ExchangeResult extends Component {

  constructor() {
    super(...arguments);
  }

  _buidCurrencyResults(amount, currencies) {
    return currencies.map((currency) => {
      //error handling needed for empty rates
      return (
        <div key={currency.name}>
          <span>{currency.name} exchange: </span>
          <span>{currency.rates[0].exchange}</span>
          <br/>
          <span>{currency.name} rate: </span>
          <span>{currency.rates[0].bid}</span>
          <br/>
          <span>{currency.name} amount: </span>
          <span>{amount / currency.rates[0].bid}</span>
          <br/><br/>
        </div>
      );
    });
  }

  _buildExchangeResult() {
    let {result} = this.props;

    if (!result.currencies || result.currencies.length < 1) {
      return null;
    }
    let currencyResults = this._buidCurrencyResults(result.amount, result.currencies);
    return (
      <div>
        <br/>
        {currencyResults}
      </div>
    );
  }

  render() {
    let exchangeResultComponent = this._buildExchangeResult();
    return (
      <div>
        {exchangeResultComponent}
      </div>
    );
  }
}

ExchangeResult.propTypes = {
  children: T.object,
  result: T.object
};

ExchangeResult.defaultProps = {
  result: {}
};

export default ExchangeResult;
