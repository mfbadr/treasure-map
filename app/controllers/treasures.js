'use strict';

var mp = require('multiparty'),
    linkBuilder = require('../helpers/link-builder'),
    Treasure = require('../models/treasure');

exports.index = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    //console.log(treasures);
    res.render('treasure/index', {treasures:treasures, linkBuilder:linkBuilder, query:req.query});
  });
};

exports.init = function(req, res){
  Treasure.collection.count(function(err, order){
    order++;
    res.render('treasure/init', {order:order});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    //console.log(fields);
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.view = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasure/view', {treasure:treasure});
  });
};

exports.found = function(req, res){
  Treasure.found(req.params.id, function(){
    res.redirect('/treasures');
  });
};
