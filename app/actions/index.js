import ExchangeAPI from '../apis/exchange_api'

export const SELECT_BITCOIN_AMOUNT = 'SELECT_BITCOIN_AMOUNT'
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES'
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES'

export const selectBitCoin = amount => ({
  type: SELECT_BITCOIN_AMOUNT,
  amount
})

export const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES
})

export const receiveExchangeRates = (currencies) => ({
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

