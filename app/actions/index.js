import ExchangeAPI from '../apis/exchange_api'
import ReportAPI from '../apis/report_api'

export const SELECT_BITCOIN_AMOUNT = 'SELECT_BITCOIN_AMOUNT'
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES'
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES'

export const REQUEST_EXCHANGE_REPORTS = 'REQUEST_EXCHANGE_REPORTS'
export const RECEIVE_EXCHANGE_REPORTS = 'RECEIVE_EXCHANGE_REPORTS'

export const selectBitCoin = amount => ({
  type: SELECT_BITCOIN_AMOUNT,
  amount
})

const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES
})


const receiveExchangeRates = (currencies) => ({
  type: RECEIVE_EXCHANGE_RATES,
  currencies,
  receivedAt: Date.now()
})

export const fetchExchangeRates = () => dispatch => {
  dispatch(requestExchangeRates())
  return ExchangeAPI.fetchExchangeRates().then(currencies => {
    dispatch(receiveExchangeRates(currencies))
  })
}

const requestExchangeReports = () => ({
  type: REQUEST_EXCHANGE_REPORTS
})


const receiveExchangeReports = (currencies) => ({
  type: RECEIVE_EXCHANGE_REPORTS,
  currencies,
  receivedAt: Date.now()
})

export const fetchExchangeReports = () => dispatch => {
  dispatch(requestExchangeReports())
  return ReportAPI.fetchAllCurrencies().then(currencies => {
    dispatch(receiveExchangeReports(currencies))
  })
}