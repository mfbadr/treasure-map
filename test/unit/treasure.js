/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-hunt-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {name:['Pearls'], difficulty:['1'], loc:['Paris, France', '22', '-7'], hints:['a','b'], order:['1'], tags:['a, b, c']},
          t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('Pearls');
      expect(t.difficulty).to.equal(1);
      expect(t.loc).to.be.an('object');
      expect(t.photos).to.have.length(0);
      expect(t.hints).to.have.length(2);
      console.log(t.hints);
      expect(t.tags).to.have.length(3);
      expect(t.order).to.equal(1);
      console.log(t);
    });
  });

  describe('.query', function(){
    it('should get all people', function(done){
      Treasure.query({},{},function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should return one treasure', function(done){
      Treasure.findById('000000000000000000000001', function(t){
        expect(t.name).to.equal('Diamonds');
        done();
      });
    });
  });
  describe('.found', function(){
    it('should find a treasure and make it found', function(done){
      Treasure.found('000000000000000000000001', function(){
        Treasure.findById('000000000000000000000001', function(t){
          expect(t.isFound).to.be.true;
          done();
        });
      });
    });
  });
  describe('#save', function(){
    it('should save a treasure to the db', function(done){
      var o = {name:['Pearls'], difficulty:['1'], loc:[{lat:-22, lng:33, name:'Paris, France'}], hints:['a','b'], order:['1'], tags:['a, b, c']},
          t = new Treasure(o);
      t.save(function(){
        Treasure.query({},{},function(err, treasures){
          expect(treasures).to.have.length(4);
          done();
        });
      });
    });
  });
});

