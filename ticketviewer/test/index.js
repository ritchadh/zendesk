var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");

var mod = require('../routes/index.js');

describe('http tests', function(){

  it('Rendering the first page', function(done){
    http.get('http://localhost:3000', function(res) {
      assert.equal(200, res.statusCode);
      done();
    })
  });

  it('Rendering the single ticket error page', function(done){
    http.get('http://localhost:3000/singleticket', function(res) {
      assert.equal(404, res.statusCode);
      done();
    })
  });

  it('Checking for the user input', function(done){
    var val = 1;
    http.get('http://localhost:3000/singleticket/'+val, function(res) {
      assert.equal(200, res.statusCode);
      done();
    })
  });

});
