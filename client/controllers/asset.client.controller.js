'use strict';

// Articles controller
angular.module('asset').controller('AssetController', ['$scope', '$rootScope', '$stateParams', '$location', 'Authentication', 'Asset', 'HDB', '$http', 'Stock', 'Private',
  function ($scope, $rootScope, $stateParams, $location, Authentication, Asset, HDB, $http, Stock, Private) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (asset) {
      $scope.error = null;
      var equity = {};
      var estate = {};
      var estate2 = {};
      equity.symbol = this.symbol;
      equity.amount = this.amount;
      estate.street = this.street;
      estate.block = this.block;
      estate.flat = this.flat;
      estate.storey = this.storey;
      estate2.street = this.street2;
      estate2.project = this.project;
      estate2.level = this.level;
      estate2.area = this.area;
      console.log(estate2);

      asset = new Asset({
        equity: equity,
        estate: estate,
        estate2: estate2
      });

      // Redirect after save
      asset.$save(function (response) {
        console.log(response);
        $scope.assets = Asset.query();

        // Clear form fields
        $scope.symbol = '';
        $scope.amount = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (asset) {
      if (asset) {
        asset.$remove();

        for (var i in $scope.assets) {
          if ($scope.assets[i] === asset) {
            $scope.assets.splice(i, 1);
          }
        }
      } else {
        $scope.asset.$remove(function () {
          $location.path('asset');
        });
      }
    };

    // Update existing Article
    $scope.update = function (asset) {
      $scope.error = null;
      console.log(asset);
      var asset = asset;

      asset.$update(function () {
        $location.path('asset');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.assets = Asset.query();
      console.log($scope.authentication.user);
      console.log($scope.assets);
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.asset = Asset.get({
        assetId: $stateParams.assetId
      });
    };
  
    $scope.rate = 1;
    $scope.doCalculate = function() {
      var url = '';//'http://finance.yahoo.com/d/quotes.csv?s=';
      var symbol = '';
      var temp;
      for (var i=0; i<$scope.assets.length; i++) {
        temp = $scope.assets[i].equity;
        console.log(temp);
        if(temp !== undefined) {
        symbol = temp.symbol;              
        url = url + '+' + symbol;
        }
      }
      url = url + '&f=np';
      console.log(url);
      
        Stock.query({ stockId: url }).$promise.then(function (data) {
        //data = JSON.stringify(data);//data.toString();
        console.log(data);
        var j = 0;
        for (i=0; i<$scope.assets.length; i++) {
          //var name = '';
          //name = data[i].symbo;//data.substr(1,data.indexOf('\",')-1);
          if($scope.assets[i].equity !== undefined) {
            $scope.assets[i].equity.name = data[j].symbol;              
            $scope.assets[i].equity.price = data[j].price;
            j++;
          }
          //var price = '';
          //price = data[i].price;//data.substr(data.indexOf('\",')+2,data.indexOf('\n')-data.indexOf('\",')-2);          
          //$scope.assets[i].equity.price = price;
          //data = data.substr(data.indexOf('\n')+1,data.length-data.indexOf('\n')-1);
        }
        console.log($scope.assets);
        var value = 0;
        for (i=0; i<$scope.assets.length; i++) {
          if(($scope.assets[i].equity !== undefined) && ($scope.assets[i].user._id === $scope.authentication.user._id))
            value = value + parseFloat($scope.assets[i].equity.price) * parseInt($scope.assets[i].equity.amount) * $scope.rate;
        }
        alert('The value of your equity is: USD' + value);

      });
    };

    $scope.doList = function() {
      $scope.hdb = HDB.query();
      console.log($scope.hdb);
    };

    $scope.doEstimate = function(asset) {
      console.log(asset.estate);
      var flat_type;
      var storey_range;

      switch (asset.estate.flat) {
	case 1:
		flat_type = '2 ROOM';
		break;
	case 2:
		flat_type = '3 ROOM';
		break;
	case 3:
		flat_type = '4 ROOM';
		break;
	case 4:
		flat_type = '5 ROOM';
		break;
	case 5:
		flat_type = 'EXECUTIVE';
		break;
	}

      switch (asset.estate.storey) {
	case 1:
		storey_range = '01 TO 03';
		break;
	case 2:
		storey_range = '04 TO 06';
		break;
	case 3:
		storey_range = '07 TO 09';
		break;
	case 4:
		storey_range = '10 TO 12';
		break;
	case 5:
		storey_range = '13 TO 15';
		break;
	case 6:
		storey_range = '16 TO 18';
		break;
	case 7:
		storey_range = '19 TO 21';
		break;
	case 8:
		storey_range = '22 TO 24';
		break;
	case 9:
		storey_range = '25 TO 27';
		break;
	case 10:
		storey_range = '28 TO 30';
		break;
	case 11:
		storey_range = '31 TO 33';
		break;
	case 12:
		storey_range = '34 TO 36';
		break;
	case 13:
		storey_range = '37 TO 39';
		break;
	case 14:
		storey_range = '40 TO 42';
		break;
	case 15:
		storey_range = '43 TO 45';
		break;
	case 16:
		storey_range = '46 TO 48';
		break;
	case 17:
		storey_range = '49 TO 51';
		break;
	}

        //$http.get('modules/asset/client/controllers/resale-flat-prices.json').then(function (response) {
        //$http.get('localhost:3000/api/hdb').then(function (response) {
        //HDB.query().$promise.then(function (response) {
        var temp = asset.estate.street.toUpperCase();
        HDB.query({ hdbId: temp }).$promise.then(function (response) {
          response.data = response;
          //console.log(response);
          $scope.hdb = [];
	  var i,j;
	  var d = new Date();

	for(j=0; j>-6; j--) {

	  var nowMonth = d.getFullYear() + '-' + ('0' + (d.getMonth()+j)).slice(-2);
          if(d.getMonth()+j <= 0) {
            nowMonth = (d.getFullYear()-1) + '-' + ('0' + (12+d.getMonth()+j)).slice(-2);
          }           
	  console.log(nowMonth);
	  for(i=0; i<response.data.length; i++) {
	    if((response.data[i]['block'] === asset.estate.block) 
		&& (response.data[i]['street_name'] === asset.estate.street.toUpperCase()) 
		&& (response.data[i]['flat_type'] === flat_type)  
		&& (response.data[i]['storey_range'] === storey_range)
		&& (response.data[i]['month'].localeCompare(nowMonth) === 0)
		) {
		$scope.hdb.push(response.data[i]);
                //console.log('found all same');
		}
	    else if((response.data[i]['block'] === asset.estate.block) 
		&& (response.data[i]['street_name'] === asset.estate.street.toUpperCase()) 
		&& (response.data[i]['flat_type'] === flat_type)  
		//&& (response.data[i]['storey_range'] === storey_range)
		&& (response.data[i]['month'].localeCompare(nowMonth) === 0)
		) {
		$scope.hdb.push(response.data[i]);
                //console.log('found same block');
		}
	    else if( (response.data[i]['street_name'] === asset.estate.street.toUpperCase()) 
	        //&& (response.data[i]['block'] === asset.estate.block) 
		&& (response.data[i]['flat_type'] === flat_type)  
		&& (response.data[i]['storey_range'] === storey_range)
		&& (response.data[i]['month'].localeCompare(nowMonth) === 0)
		) {
		$scope.hdb.push(response.data[i]);
                //console.log('found same storey');
		}
	  }
	//if($scope.hdb.length > 0) { break; }
	}
      console.log($scope.hdb);
      }); 
    };

    //$scope.hdb = $rootScope.test;

//$http.get('modules/asset/client/controllers/resale-flat-prices.json').then(function (response1) {
//$rootScope.test = response1.data;
// $scope.hdb = response1.data;
//});    
/*
    document.addEventListener("DOMContentLoaded", init, false);

    function init() {
	console.log("trig");
       //timer.start(function(elapsed){
           var elt = document.getElementById("demo");
           elt.innerText = "yes";

           //updateAngularModel(elapsed);
       //})
    }
*/
function level_no(level_name)
{
  var no;
  switch (level_name) {
    case '01 to 05':
      no = 1;
      break;
    case '06 to 10':
      no = 2;
      break;
    case '11 to 15':
      no = 3;
      break;
    case '16 to 20':
      no = 4;
      break;
    case '21 to 25':
      no = 5;
      break;
    case '26 to 30':
      no = 6;
      break;
    case '31 to 35':
      no = 7;
      break;
    case '36 to 40':
      no = 8;
      break;
    case '41 to 45':
      no = 9;
      break;
    case '46 to 50':
      no = 10;
      break;
  }
  return no;
}

var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $scope.doEstimate2 = function(asset) {
      console.log(asset.estate2);
      var flat_type;
      var storey_range;

      switch (asset.estate2.level) {
	case 1:
		storey_range = '01 to 05';
		break;
	case 2:
		storey_range = '06 to 10';
		break;
	case 3:
		storey_range = '11 to 15';
		break;
	case 4:
		storey_range = '16 to 20';
		break;
	case 5:
		storey_range = '21 to 25';
		break;
	case 6:
		storey_range = '26 to 30';
		break;
	case 7:
		storey_range = '31 to 35';
		break;
	case 8:
		storey_range = '36 to 40';
		break;
	case 9:
		storey_range = '41 to 45';
		break;
	case 10:
		storey_range = '46 to 50';
		break;
        }

        var temp = asset.estate2.street.toUpperCase();
        Private.query({ privateId: temp }).$promise.then(function (response) {
          response.data = response;
          console.log(response);
          $scope.hdb = [];
	  var i,j,k,no,size1,size2;
	  var d = new Date();
          var search_priority = 0;
          var search_period = 6;

	for(j=0; j>-search_period; j--) {
	  var nowMonth = d.getFullYear() + '-' + ('0' + (d.getMonth()+j)).slice(-2);
          if(d.getMonth()+j <= 0) {
            nowMonth = (d.getFullYear()-1) + '-' + ('0' + (12+d.getMonth()+j)).slice(-2);
          }           
	  console.log(nowMonth);
	  for(i=0; i<response.data.length; i++) {
            for(k=0; k<12; k++){ 
              if(month_name[k] === response.data[i]['Date of Sale'].slice(0,3))
                response.data[i]['Date of Sale'] = response.data[i]['Date of Sale'].slice(4) + '-' + ('0' + (k+1)).slice(-2) ;
            }
	    if((response.data[i]['Street Name'] === asset.estate2.street.toUpperCase()) 
		&& (response.data[i]['Project Name'] === asset.estate2.project.toUpperCase()) 
		&& (response.data[i]['Floor Level'] === storey_range)
		&& (response.data[i]['Date of Sale'].localeCompare(nowMonth) === 0)
                && (search_priority === 0)
                && (response.data[i]['Area (Sqft)'] === asset.estate2.area)
		) {
		  $scope.hdb.push(response.data[i]);
                //console.log('found all same');
		}
	    if((response.data[i]['Street Name'] === asset.estate2.street.toUpperCase()) 
		&& (response.data[i]['Project Name'] === asset.estate2.project.toUpperCase()) 
		&& (response.data[i]['Floor Level'] === storey_range)
		&& (response.data[i]['Date of Sale'].localeCompare(nowMonth) === 0)
                && (search_priority === 2)
                && ((response.data[i]['Area (Sqft)'] >= size1) || (response.data[i]['Area (Sqft)'] <= size2))
		) {
		  $scope.hdb.push(response.data[i]);
                //console.log('found same level');
		}
	    if((response.data[i]['Street Name'] === asset.estate2.street.toUpperCase()) 
		&& (response.data[i]['Project Name'] === asset.estate2.project.toUpperCase()) 
		&& ((level_no(response.data[i]['Floor Level']) === (asset.estate2.level+no)) || (level_no(response.data[i]['Floor Level']) === (asset.estate2.level-no)))
		&& (response.data[i]['Date of Sale'].localeCompare(nowMonth) === 0)
                && (search_priority === 1)
                && ((response.data[i]['Area (Sqft)'] >= size1) && (response.data[i]['Area (Sqft)'] <= size2))
		) {
		  $scope.hdb.push(response.data[i]);
                //console.log('found same project');
		}
	    if((response.data[i]['Street Name'] === asset.estate2.street.toUpperCase()) 
		&& (response.data[i]['Project Name'] === asset.estate2.project.toUpperCase()) 
		//&& (response.data[i]['Floor Level'] === storey_range)
		&& (response.data[i]['Date of Sale'].localeCompare(nowMonth) === 0)
                && (search_priority === 3)
                //&& (response.data[i]['Area (Sqft)'] === asset.estate2.area)
		) {
		  $scope.hdb.push(response.data[i]);
                //console.log('found same project');
		}
	  }
          if((j === (1-search_period)) && ($scope.hdb.length === 0) && (search_priority === 0)) {
            j = 1;
            no = 0;
            size1 = asset.estate2.area;
            size2 = size1;  
            search_priority = 1;
            console.log('change to priority 1');
          }
          else if((j === (1-search_period)) && ($scope.hdb.length === 0) && (search_priority === 1)) {
            if(no < 10) {
              j =1;
              no++; 
              console.log('priority 1 with other floor');
            }
            else if(size1 === asset.estate2.area) { 
              j = 1;
              size1 = asset.estate2.area * 0.85;
              size2 = asset.estate2.area * 1.15;
              no = 0;
              //console.log(size);
              //search_priority = 2;
              console.log('priority 1 with +/-%15 size');
            }
            else if(size1 === (asset.estate2.area * 0.85)) { 
              j = 1;
              size1 = asset.estate2.area * 0.7;
              size2 = asset.estate2.area * 1.3;
              no = 0;
              console.log('priority 1 with +/-30% size');
            }
            else if(search_period === 6){
              j = 1;
              search_period = 12;
              search_priority = 0;              
              console.log('change back to priority 0 with new period');
            }
          } 
          else if((j === (1-search_period)) && ($scope.hdb.length === 0) && (search_priority === 2)) {
            j = 1;
            search_priority = 3;
            console.log('change to priority 3');
          } 
          else if((j === (1-search_period)) && ($scope.hdb.length === 0) && (search_priority === 3)) {
            if(search_period === 6) {
              j = 1;
              search_period = 12;
              search_priority = 0;
              console.log('change back to priority 0 with new period');
            } 
          }
	}

      console.log($scope.hdb);
     });
    };

  }
]);
