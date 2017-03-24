import React, {Component, PropTypes as T} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Exchange from '../components/exchange'
import ExchangeResult from '../components/exchange_result'
import {selectBitCoin, fetchExchangeRates} from '../actions'

class App extends Component {

  constructor() {
    super(...arguments)
  }

  _handleConvert(amount) {
    this.props.dispatch(selectBitCoin(amount))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBitcoin !== this.props.selectedBitcoin) {
      const {dispatch} = nextProps
      dispatch(fetchExchangeRates())
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // if (nextState.exchangeResult !== this.state.exchangeResult) {
    //   ReportActions.getAllCurrencies()
    // }
  }

  render() {
    const {selectedBitcoin, currencies, isFetching} = this.props
    return (
      <div>
        <Exchange onConvert={this._handleConvert.bind(this)}/>
        <ExchangeResult result={{amount: selectedBitcoin, currencies}}/>
        {/*<ExchangeReport currencies={currencies}/>*/}
      </div>
    )
  }
}

App.propTypes = {
  children: T.object,
  dispatch: T.func.isRequired,
  selectedBitcoin: T.number,
  isFetching: T.bool,
  currencies: T.array,
}

const mapStateToProps = state => {
  const {selectedBitcoin, exchangeRates} = state
  const {isFetching, currencies}=exchangeRates

  return {
    selectedBitcoin,
    isFetching,
    currencies
  }
}

export default connect(mapStateToProps)(App)




