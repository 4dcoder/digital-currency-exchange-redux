import {combineReducers} from 'redux'
import {
  SELECT_BITCOIN_AMOUNT,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  REQUEST_EXCHANGE_REPORTS,
  RECEIVE_EXCHANGE_REPORTS
} from '../actions'

const selectedBitcoin = (state = 0, action) => {
  switch (action.type) {
    case SELECT_BITCOIN_AMOUNT:
      return action.amount
    default:
      return state
  }
}

const exchangeRates = (state = {currencies: []}, action) => {
  switch (action.type) {
    case REQUEST_EXCHANGE_RATES:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_EXCHANGE_RATES:
      return Object.assign({}, state, {isFetching: false, currencies: action.currencies})
    default:
      return state
  }
}

const exchangeReports = (state = {reports: []}, action) => {
  switch (action.type) {
    case REQUEST_EXCHANGE_REPORTS:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_EXCHANGE_REPORTS:
      return Object.assign({}, state, {isFetching: false, currencies: action.currencies})
    default:
      return state
  }
}


const rootReducer = combineReducers({
  exchangeRates,
  selectedBitcoin,
  exchangeReports
})

export default rootReducer
