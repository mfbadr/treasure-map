'use strict';

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

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

module.exports = Treasure;

//HELPER
//
function makeArray(o){
  var keys = Object.keys(o),
     array = [];

  for (var i = 1; i <= keys.length; i++){
    array.push(o[i]);
  }
  return array;
}
