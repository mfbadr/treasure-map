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
      var o = {name:'Pearls', difficulty:'1', loc:{lat:-22, lng:33, name:'Paris, France'}, hints:{1:'a',2:'b'}, order:'1', tags:'a, b, c'},
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
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Treasure.all(function(err, people){
        expect(people).to.have.length(3);
        done();
      });
    });
  });
});

