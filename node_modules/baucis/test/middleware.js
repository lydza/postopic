var expect = require('expect.js');
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var baucis = require('..');

var fixtures = require('./fixtures');

describe('Middleware', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it('should prevent resource from being loaded when querystring is set', function (done) {
    var options = {
      url : 'http://localhost:8012/api/v1/vegetables/' + vegetables[0]._id,
      qs  : { block: true },
      json: true
    };
    request.get(options, function (error, response, body) {
      if (error) return done(error);
      expect(response.statusCode).to.be(401);
      done();
    });
  });

  it('should allow resource to be loaded when querystring is not set', function (done) {
    var options = {
      url : 'http://localhost:8012/api/v1/vegetables/' + vegetables[0]._id,
      qs  : { block: false },
      json: true
    };

    request.get(options, function (error, response, body) {
      if (error) return done(error);

      expect(response.statusCode).to.be(200);
      expect(body).to.have.property('name', 'Turnip');

      done();
    });
  });

});
