let cache = require('../services/cache');

class ReportController {
  list(req, res) {
    cache.getAllCurrencies().then((result) => {
      res.json(result);
    });
  }
}
module.exports = new ReportController();