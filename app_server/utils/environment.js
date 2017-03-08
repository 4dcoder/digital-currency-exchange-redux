const PRODUCTION_ENVIRONMENT = 'production';
const DEVELOPMENT_ENVIRONMENT = 'development';

class Environment {
  get(key) {
    return process.env[key];
  }

  isProduction() {
    return process.env.NODE_ENV == PRODUCTION_ENVIRONMENT;
  }

  isDevelopment() {
    return process.env.NODE_ENV == DEVELOPMENT_ENVIRONMENT;
  }

  getPoloniexURL() {
    return this.get('POLONIEX_URL');
  }

  getBittrexURL() {
    return this.get('BITTREX_URL');
  }

  getBtceURL() {
    return this.get('BTCE_URL');
  }

  toString() {
    return process.env.NODE_ENV;
  }
}
module.exports = new Environment();
