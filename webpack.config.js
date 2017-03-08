'use strict';
var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/app/components/app_entry.js'],
  output: {
    path: __dirname + '/app/public',
    filename: 'bundle.js'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    preLoaders: [
      // Javascript
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: './app/public',
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
};

if ('development' === process.env.NODE_ENV) {
  console.log('In development mode, lets setup some environment variables');
  config.plugins.push(...[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        EXCHANGE_RATES_API_URL: JSON.stringify('http://localhost:3000/api/v1/exchangeRates'),
      }
    })
  ]);
}

module.exports = config;
