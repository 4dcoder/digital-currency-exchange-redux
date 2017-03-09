var logger = require('../utils/logger');
var environment = require('../utils/environment');
var redis = require('redis');
var client = redis.createClient(environment.getRedisURL());

var redisError;
client.on("error", function(err) {
  logger.error("redis error ", err);
  redisError = err;
});
client.on("connect", function() {
  logger.debug("redis connected ");
  redisError = null;
});

const getReportField = function(date) {
  return `${date.toString()}`;
}

const hashKey = 'exchangeRates';

class Cache {
  constructor() {
  }

  setCurrencies(date, currencies) {
    const reportField = getReportField(date);
    client.hset(hashKey, reportField, JSON.stringify(currencies));
    logger.debug('redis hset ', `${hashKey} ${reportField} ${currencies}`);
  }

  getAllCurrencies() {
    return new Promise(function(resolve, reject) {
      if (redisError) {
        reject(redisError)
      }
      else {
        client.hgetall(hashKey, function(err, reply) {
          if (err) {
            reject(err);
          }
          else {
            if (reply) {
              let keys = Object.keys(reply)
              let dateCurrencies = keys.map((key) => {
                return {
                  date: new Date(key),
                  currencies: JSON.parse(reply[key])
                }
              });
              resolve(dateCurrencies);
            }
            else {
              resolve({});
            }
          }
        });
      }
    });
  }
}

module.exports = new Cache();
