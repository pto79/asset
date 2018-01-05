'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('asset')
.factory('Asset', ['$resource',
  function ($resource) {
    return $resource('api/asset/:assetId', {
      assetId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])
.factory('HDB', ['$resource',
  function ($resource) {
    return $resource('api/hdb/:hdbId', {
      hdbId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])
.factory('Stock', ['$resource',
  function ($resource) {
    return $resource('api/stock/:stockId', {
      stockId: '@_id'
    });
  }
])
.factory('Private', ['$resource',
  function ($resource) {
    return $resource('api/private/:privateId', {
      privateId: '@_id'
    });
  }
]);


