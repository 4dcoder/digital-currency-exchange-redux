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

  getPoloniexURI() {
    return this.get('POLONIEX_URL');
  }

  getBittrexURI() {
    return this.get('BITTREX_URL');
  }

  getBtceURI() {
    return this.get('BTCE_URL');
  }

  toString() {
    return process.env.NODE_ENV;
  }
}
module.exports = new Environment();
