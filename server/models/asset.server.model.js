'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AssetSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  equity: {
    symbol: {
      type: String
    },
    amount: {
      type: Number
    }
  },
  estate: {
    street: {
      type: String
    },
    block: {
      type: Number
    },
    flat: {
      type: Number
    },
    storey: {
      type: Number
    }
  },
  estate2: {
    street: {
      type: String
    },
    project: {
      type: String
    },
    level: {
      type: Number
    },
    area: {
      type: Number
    }
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

var HDBSchema = new Schema({
  month: {
    type: String
  },
  town: {
    type: String
  },
  flat_type: {
    type: String
  },
  block: {
    type: Number
  },
  street_name: {
    type: String
  },
  storey_range: {
    type: String
  },
  floor_area_sqm: {
    type: Number
  },
  flat_model: {
    type: String
  },
  lease_commence_date: {
    type: Number
  },
  resale_price: {
    type: Number
  }
});

var PrivateSchema = new Schema({
  SN: {
    type: Number
  },
  ProjectName: {
    type: String
  },
  StreetName: {
    type: String
  },
  Type: {
    type: String
  },
  PostalDistrict: {
    type: Number
  },
  MarketSegment: {
    type: String
  },
  Tenure: {
    type: String
  },
  TypeofSale: {
    type: String
  },
  NoofUnits: {
    type: Number
  },
  Price: {
    type: Number
  },
  NettPrice: {
    type: String
  },
  Area: {
    type: Number
  },
  TypeofArea: {
    type: String
  },
  FloorLevel: {
    type: String
  },
  UnitPrice: {
    type: Number
  },
  DateofSale: {
    type: String
  }

});

mongoose.model('Asset', AssetSchema);
mongoose.model('HDB', HDBSchema);
mongoose.model('Private', PrivateSchema);
