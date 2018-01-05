'use strict';

// Configuring the Articles module
angular.module('asset').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Asset',
      state: 'asset',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'asset', {
      title: 'Equity',
      state: 'asset.equity',
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'asset', {
      title: 'Real estate',
      state: 'asset.estate',
      roles: ['user']
    });
  }
]);
