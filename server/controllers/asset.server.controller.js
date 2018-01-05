'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Asset = mongoose.model('Asset'),
  HDB = mongoose.model('HDB'),
  Private = mongoose.model('Private'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var http = require('http');
/**
 * Create a article
 */
exports.create = function (req, res) {
  var asset = new Asset(req.body);
  asset.user = req.user;

  asset.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(asset);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.asset);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var asset = req.asset;

  if(req.body.equity !== undefined) {
  asset.equity.symbol = req.body.equity.symbol;
  asset.equity.amount = req.body.equity.amount;
  }
  if(req.body.estate !== undefined) {
  asset.estate.street = req.body.estate.street;
  asset.estate.block = req.body.estate.block;
  asset.estate.flat = req.body.estate.flat;
  asset.estate.storey = req.body.estate.storey;
  }
  if(req.body.estate2 !== undefined) {
  asset.estate2.street = req.body.estate2.street;
  asset.estate2.project = req.body.estate2.project;
  asset.estate2.level = req.body.estate2.level;
  asset.estate2.area = req.body.estate2.area;
  }

  asset.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(asset);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var asset = req.asset;

  asset.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(asset);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Asset.find().sort('-created').populate('user', 'displayName').exec(function (err, assets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(assets);
    }
  });
};

/**
 * Article middleware
 */
exports.assetByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Asset is invalid'
    });
  }

  Asset.findById(id).populate('user', 'displayName').exec(function (err, asset) {
    if (err) {
      return next(err);
    } else if (!asset) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.asset = asset;
    next();
  });
};

exports.getPrice = function (req, res) {
  res.json(req.hdb);
};

//exports.getByStreet = function (req, res, next, street) {
exports.listPrice = function (req, res) {
  HDB.find().exec(function (err, hdb)
  {
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
      //return next(err);
    //} else if (!hdb) {
    //  return res.status(404).send({
    //    message: 'No HDB flat has been found'
    //  });      
    } else {
      res.json(hdb);
    }
    //req.hdb = hdb;
    //next();
  });
};

exports.getByStreet = function (req, res, next, street) {
  req.hdb = street;

  HDB.find( {'street_name': street} ).exec(function (err, hdb)
  {
    if (err) {
      return next(err);
    } else if (!hdb) {
      return res.status(404).send({
        message: 'No HDB flat found'
      });
    }
    req.hdb = hdb;
    next();
  });

    //req.hdb = street;
    //next(); 
};

var option = {
  method: 'GET',
  //headers: {
  //  'Content-Type': 'application/octet-stream'
  //}
};

exports.getStock = function (req, res) {
  res.send(req.stock);
};

//var obj2 = [];

exports.stockByID = function (req, res, next, symbol) {
  option.host = 'http://finance.yahoo.com/d/quotes.csv?s='+symbol;
  //console.log(option);
  http.get({
    host: 'download.finance.yahoo.com',
    path: '/d/quotes.csv?s=' + symbol
  }, function(res) {  
    var output = '';
    console.log(res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      output += chunk;
    });
    res.on('end', function () {
      console.log(output);
      var obj = {};	//JSON.parse(output);
      var obj2 = [];
      var temp = '';
      //onResult(res.statusCode, obj);
      for (var i=0; i<output.length; i++){
        //var obj = {};
        if((output[i] !== '\"') && (output[i] !== '\n'))
          temp += output[i];
        else if ((output[i] === '\"') && (output[i+1] === ',' )) {
          obj.symbol = temp;
          temp = '';
          i++;
        }        
        else if (output[i] === '\n') {
          obj.price = temp;
          obj2.push(obj);
          var obj = {};
          temp = '';
          i++; 
        }  
      }
      console.log(obj);
      req.stock = obj2;
      //console.log(obj);
      next();
    });
  });

  req.on('error', function(err) {    
  });

  //req.end();

};

exports.listPrivate = function (req, res) {
  Private.find().exec(function (err, flat)
  {
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flat);
    }
  });
};

exports.getPrivate = function (req, res) {
  res.json(req.hdb);
};

exports.getByStreet2 = function (req, res, next, street) {
  req.hdb = street;

  Private.find( {'Street Name': street} ).exec(function (err, hdb)
  {
    if (err) {
      return next(err);
    } else if (!hdb) {
      return res.status(404).send({
        message: 'No HDB flat found'
      });
    }
    req.hdb = hdb;
    next();
  });

    //req.hdb = street;
    //next(); 
};
