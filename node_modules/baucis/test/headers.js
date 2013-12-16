var expect = require('expect.js');
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var baucis = require('..');

var fixtures = require('./fixtures');

describe('Headers', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it('should set Last-Modified', function (done) {
    var latestModifiedDate = Math.max.apply(null, vegetables.map(function (vege) {
      return vege.get('lastModified');
    }));
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables',
      json: true
    };
    request.get(options, function (err, response, body) {
      if (err) return done(err);
      expect(response).to.have.property('statusCode', 200);
      done();
    });
  });

  it('should set Last-Modified on save', function (done) {
    var vege = vegetables[0];
    var originalModified = vege.get('lastModified');

    // Wait or else lastModified will still have the same string represntation
    setTimeout(function () {
      var options = {
        url: 'http://localhost:8012/api/v1/vegetables/' + vege._id,
        json: { name: 'Pumpkin' }
      };
      request.put(options, function (err, response, body) {
        if (err) return done(err);
        expect(response).to.have.property('statusCode', 200);
        expect(new Date(response.headers['last-modified'])).to.be.greaterThan(originalModified);
        done();
      });
    }, 1000);
  });

  it('should set ETag', function (done) {
    var latestModifiedDate = Math.max.apply(null, vegetables.map(function (vege) {
      return vege.get('lastModified');
    }));
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables',
      json: true
    };
    request.get(options, function (err, response, body) {
      if (err) return done(err);
      expect(response).to.have.property('statusCode', 200);
      // TODO make sure this is working properly
      expect(response.headers).to.have.property('etag');
      console.log(response.headers)
      done();
    });
  });

});
