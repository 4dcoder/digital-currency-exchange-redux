require('babel-register');
require('babel-polyfill');
require('dotenv').config();
let cluster = require('cluster');

if (cluster.isMaster) {
  let workers = process.env.WEB_CONCURRENCY || 1;

  // Create a worker for each
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
} else {
  let express = require('express');
  let path = require('path');
  let bodyParser = require('body-parser');
  let logger = require('./app_server/utils/logger');
  let api = require('./app_server/routes/api');
  let environment = require('./app_server/utils/environment');
  let app = express();

  const staticDir = `${__dirname}/app/public`;

// =======================
// configuration =========
// =======================

// pretty up the json output in development mode
  if (environment.isDevelopment()) {
    app.set('json spaces', 2);
  }

// view engine setup
  app.set('views', path.join(__dirname, 'app_server', 'views'));
  app.set('view engine', 'jade');


  // log configuration
  app.use(require('morgan')('dev', {stream: logger.stream}));

  // use body parser so we can get info from POST and/or URL parameters
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(express.static(staticDir));

  // setup CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Location');
    res.header('Access-Control-Max-Age', '1728000');
    next();
  });

  // routing configuration
  app.use('/api', api);


  console.log(staticDir);
  app.get('*', function(req, res) {
    res.sendFile(`${staticDir}/index.html`);
  });

  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (environment.isDevelopment()) {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  app.listen(process.env.PORT || 3000);
  logger.debug('Worker %d running!', cluster.worker.id);

}
