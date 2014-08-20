'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.loc        = o.loc;
  this.name       = o.name;
  this.photos     = [];
  this.hints      = makeArray(o.hints);
  this.tags       = o.tags.split(',').map(function(t){return t.trim();});
  this.order      = o.order * 1;
  this.difficulty = o.difficulty * 1;
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
  Treasure.findById(id, function(t){
    t.isFound = true;
    Treasure.collection.save(t, cb);
  });
};

module.exports = Treasure;

//HELPER
function makeArray(o){
  var keys = Object.keys(o),
     array = [];

  for (var i = 1; i <= keys.length; i++){
    array.push(o[i]);
  }
  return array;
}
