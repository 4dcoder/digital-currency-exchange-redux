import React, {Component, PropTypes as T} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Exchange from '../components/exchange'
import ExchangeResult from '../components/exchange_result'
import ExchangeReport from '../components/exchange_report'
import {selectBitCoin, fetchExchangeRates, fetchExchangeReports} from '../actions'

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
    const {dispatch} = nextProps
    if (nextProps.currencies !== this.props.currencies) {
      dispatch(fetchExchangeReports())
    }
  }

  render() {
    const {selectedBitcoin, currencies, isFetching, currencyReports} = this.props
    return (
      <div>
        <Exchange onConvert={this._handleConvert.bind(this)}/>
        <ExchangeResult result={{amount: selectedBitcoin, currencies}}/>
        <ExchangeReport currencies={currencyReports}/>
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
  currencyReports: T.array
}

const mapStateToProps = state => {
  const {selectedBitcoin, exchangeRates, exchangeReports} = state
  const {isFetching, currencies}=exchangeRates
  const {currencies : currencyReports}=exchangeReports

  return {
    selectedBitcoin,
    isFetching,
    currencies,
    currencyReports
  }
}

export default connect(mapStateToProps)(App)




