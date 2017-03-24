import Constants from '../constants'
import template from 'j140'

let ExchangeApi = {
  fetchExchangeRates() {
    let headerOptions = Object.assign({}, Constants.HEADER_OPTIONS)
    const url = template.render(process.env.EXCHANGE_RATES_API_URL)
    return fetch(url, headerOptions).then((response) => {
      return response.json()
    })
  }
}

export default ExchangeApi
