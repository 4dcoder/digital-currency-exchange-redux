'use strict';
var config = require('./webpack.config');
var webpack = require('webpack');
var stripLoader = require('strip-loader');

//Configure strip-loader to remove all occurrences of console.log
var loader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: stripLoader.loader('console.log', 'debug')
};

//Get a handle the base config's modules array
config.modules = config.modules || [];

//Push our strip loader on the the modules array
config.module.loaders.push(loader);

config.devtool = false;

config.plugins.push(...[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      EXCHANGE_RATES_API_URL: JSON.stringify('http://localhost:3000/api/v1/exchangeRates'),
      REPORTS_CURRENCIES_API_URL: JSON.stringify('http://localhost:3000/api/v1/reports/currencies')
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({comments: false})
]);
module.exports = config;