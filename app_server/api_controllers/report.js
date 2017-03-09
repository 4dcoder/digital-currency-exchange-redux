let cache = require('../services/cache');

class ReportController {
  currencies(req, res) {
    cache.getAllCurrencies().then((result) => {
      res.json(result);
    });
  }
}
module.exports = new ReportController();