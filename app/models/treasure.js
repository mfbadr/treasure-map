'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.loc        = {};
  this.loc.name   = o.loc[0];
  this.loc.lat    = o.loc[1];
  this.loc.lng    = o.loc[2];
  this.name       = o.name[0];
  this.photos     = [];
  this.hints      = o.hints;
  this.tags       = o.tags[0].split(',').map(function(t){return t.trim();});
  this.order      = o.order[0] * 1;
  this.difficulty = o.difficulty[0] * 1;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.query = function(query, sort, cb){
  Treasure.collection.find(query, sort).toArray(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, function(err, obj){
    cb(obj);
  });
};

Treasure.found = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:id}, {$set: {isFound:true}}, cb);
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

module.exports = Treasure;

//HELPER
