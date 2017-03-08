import React, {Component, PropTypes as T} from 'react';
import {render} from 'react-dom';

class Exchange extends Component {

  constructor() {
    super(...arguments);
  }

  _handleConvert() {

    let amount = Number.parseFloat(this.bitcoinInput.value);
    if (Number.isNaN(amount)) {
      //quick error handling, not long term solution
      return;
    }
    let convertOptions = {
      amount: amount,
    };
    this.props.onConvert(convertOptions);
  }


  render() {
    return (
      <div>
        <label name="bitcoin">Bitcoin amount: </label>
        <input type='text'
               ref={(ref) => this.bitcoinInput = ref}/>
        <button id="lookup" onClick={this._handleConvert.bind(this)}>Calculate</button>
      </div>
    );
  }
}

Exchange.propTypes = {
  children: T.object,
  onConvert: T.func
};

export default Exchange;
