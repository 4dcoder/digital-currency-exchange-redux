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

const hashKey='exchangeRates';

class Cache {
  constructor() {
  }

  setExchangeRates(date, value) {
    const reportField = getReportField(date);
    client.hset(hashKey, reportField, JSON.stringify([value]));
    logger.debug('redis hset ', `${hashKey} ${reportField} ${value}`);
  }

  getAllRates() {
    return new Promise(function(resolve, reject) {
      if (redisError) {
        reject(redisError)
      }
      else {
        client.hgetAll(hashKey, function(err, reply) {
          if (err) {
            reject(err);
          }
          else {
            if (reply) {
              resolve(JSON.parse(reply));
            }
            else {
              resolve([]);
            }
          }
        });
      }
    });
  }
}

module.exports = new Cache();
