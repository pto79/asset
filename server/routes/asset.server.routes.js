'use strict';

/**
 * Module dependencies.
 */
// articlesPolicy = require('../policies/asset.server.policy'),
var asset = require('../controllers/asset.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/asset')//.all(articlesPolicy.isAllowed)
    .get(asset.list)
    .post(asset.create);

  // Single article routes
  app.route('/api/asset/:assetId')//.all(articlesPolicy.isAllowed)
    .get(asset.read)
    .put(asset.update)
    .delete(asset.delete);

  app.route('/api/hdb')
    .get(asset.listPrice);

  app.route('/api/hdb/:hdbId')
    .get(asset.getPrice);

  app.route('/api/stock/:stockId')
    .get(asset.getStock);

  app.route('/api/private')
    .get(asset.listPrivate);

  app.route('/api/private/:privateId')
    .get(asset.getPrivate);

  // Finish by binding the article middleware
  app.param('assetId', asset.assetByID);
  app.param('hdbId', asset.getByStreet);
  app.param('stockId', asset.stockByID);
  app.param('privateId', asset.getByStreet2);
};
