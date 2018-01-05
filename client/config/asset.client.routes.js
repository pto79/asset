'use strict';

// Setting up route
angular.module('asset').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('asset', {
        abstract: true,
        url: '/asset',
        template: '<ui-view/>'
      })
      .state('asset.equity', {
        url: '',
        templateUrl: 'modules/asset/client/views/asset-equity.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('asset.estate', {
	url: '',
	templateUrl: 'modules/asset/client/views/asset-estate.client.view.html',
	data: {
	  roles: ['user', 'admin']
	}
      });	
  }
]);
