import React, {Component, PropTypes as T} from 'react';
import {render} from 'react-dom';

class ExchangeReport extends Component {

  constructor() {
    super(...arguments);
  }

  render() {
    let {currencies} = this.props;
    return (
      <div>
        <span>Report goes here</span>
        <br/>
        {JSON.stringify(currencies, null, 2)}
      </div>
    );
  }
}

ExchangeReport.propTypes = {
  children: T.object,
  currencies: T.array
};

ExchangeReport.defaultProps = {
  currencies: []
};

export default ExchangeReport;
