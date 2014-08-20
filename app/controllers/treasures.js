'use strict';

var mp = require('multiparty'),
    Treasure = require('../models/treasure');

exports.index = function(req, res){
  res.render('treasure/index');
};

exports.init = function(req, res){
  res.render('treasure/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    console.log(fields);
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};
