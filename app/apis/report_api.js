import Constants from '../constants'
import template from 'j140'

let ReportsApi = {
  fetchAllCurrencies() {
    let headerOptions = Object.assign({}, Constants.HEADER_OPTIONS)
    const url = template.render(process.env.REPORTS_CURRENCIES_API_URL)
    return fetch(url, headerOptions).then((response) => {
      return response.json()
    })
  }
}

export default ReportsApi
