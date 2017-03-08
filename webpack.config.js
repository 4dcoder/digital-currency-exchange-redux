'use strict';
var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/app/components/AppEntry.js'],
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

console.log('lets setup some environment variables');
config.plugins.push(...[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      MAP_CONFIG_API_URL: JSON.stringify('http://localhost:3000/v1/config'),
      PRICING_API_URL: JSON.stringify('http://localhost:3000/v1/prices'),
      PRODUCT_API_URL: JSON.stringify('http://localhost:3000/v1/products'),
      CARRIERS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/carriers'),
      HARDWARES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/hardwares'),
      CROSS_CONNECT_SEARCH_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/crossConnectsSearch'),
      CONSTRUCTION_TYPES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/constructionTypes'),
      CONSTRUCTION_VENDORS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/constructionVendors'),
      CLOUD_PRODUCTS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/carriers/#{carrierId}/cloudProducts'),
      CARRIER_NNI_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/carriers/#{carrierId}/carrierNNIs'),
      PHYSICAL_LOCATION_TYPES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/physicalLocationTypes'),
      CIRCUIT_PRODUCTS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/carriers/#{carrierId}/circuitProducts'),
      QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotes'),
      CAVEATS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/caveats'),
      NEW_QUOTE_REQUEST_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quoteRequests'),
      NEW_QUOTE_PACKAGE_REQUEST_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackageRequests'),
      COPY_QUOTE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotes/copyById'),
      DESIGNER_QUOTE_UPDATE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/designerQuotes/#{quoteId}'),
      QUOTE_NOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotes/#{quoteId}/notes'),
      QUOTE_PACKAGE_NOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackages/#{packageId}/notes'),
      GET_QUOTE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotes/#{quoteId}'),
      QUOTE_PACKAGE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackages/#{packageId}'),
      BLENDED_COSTS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackages/#{packageId}/blendedCosts/#{speedId}'),
      QUOTE_PACKAGE_NEW_QUOTE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackages/#{packageId}/quotes'),
      DELETE_QUOTE_IN_PACKAGE_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/quotePackages/#{packageId}/quotes/#{quoteId}'),
      REQUESTER_QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/requesterQuotes'),
      DESIGNER_QUOTES_QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/designerQuotes'),
      APPROVER_QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/approverQuotes'),
      ADMIN_QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v2/#{organizationId}/adminQuotes'),
      REQUESTER_QUOTE_PACKAGES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/requesterQuotePackages'),
      DESIGNER_QUOTE_PACKAGES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/designerQuotePackages'),
      APPROVER_QUOTE_PACKAGES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/approverQuotePackages'),
      ADMIN_QUOTE_PACKAGES_API_URL: JSON.stringify('http://localhost:3000/api/v2/#{organizationId}/adminQuotePackages'),
      DESIGNER_QUOTE_STATUS_QUOTES_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/designerQuoteStatus'),
      APPROVER_QUOTE_STATUS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/approverQuoteStatus'),
      ADMIN_QUOTE_API_STATUS_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/adminQuoteStatus'),
      DESIGNER_QUOTE_PACKAGE_STATUS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/designerQuotePackageStatus'),
      APPROVER_QUOTE_PACKAGE_STATUS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/approverQuotePackageStatus'),
      ADMIN_QUOTE_PACKAGE_STATUS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/adminQuotePackageStatus'),
      MAP_LAYERS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/configurations/mapLayers/#{layerType}'),
      PRICE_CONFIGURATION_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/configurations/price'),
      SPEED_CONFIGURATION_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/configurations/speeds'),
      REPORTS_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/reports'),
      SHARE_QUOTE_INTERNAL_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/shareQuoteInternal'),
      SHARE_QUOTE_EXTERNAL_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/shareQuoteExternal'),
      SHARE_QUOTE_PACKAGE_INTERNAL_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/shareQuotePackageInternal'),
      SHARE_QUOTE_PACKAGE_EXTERNAL_API_URL: JSON.stringify('http://localhost:3000/api/v1/#{organizationId}/shareQuotePackageExternal'),
      SOCKET_HOST: JSON.stringify('http://localhost:3000'),
      GET_REQUESTERS_API_URL: JSON.stringify('http://localhost:3001/api/v1/#{organizationId}/requesters'),
      AUTHENTICATION_API_URL: JSON.stringify('http://localhost:3001/api/v1/#{organizationId}/authenticate'),
      RESET_PASSWORD_URL: JSON.stringify('http://localhost:3001/password_resets/new'),
      EXTEND_SESSION_URL: JSON.stringify('http://localhost:3001/api/v1/extendSession')
    }
  })
]);

module.exports = config;
