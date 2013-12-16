var expect = require('expect.js');
var request = require('request');

var fixtures = require('./fixtures');

describe('PUT singular', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it("should replace the addressed object if it exists", function (done) {
    var radicchio = vegetables[7];
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables/' + radicchio._id,
      json: true
    };
    request.get(options, function (err, response, body) {
      if (err) return done(err);
      expect(response).to.have.property('statusCode', 200);
      expect(body).to.have.property('name', 'Radicchio');

      // put the leek on the server
      var options = {
        url: 'http://localhost:8012/api/v1/vegetables/' + radicchio._id,
        json: {
          name: 'Leek'
        }
      };
      request.put(options, function (err, response, body) {
        if (err) return done(err);
        expect(response).to.have.property('statusCode', 200);

        // check it's not Radicchio
        var options = {
          url: 'http://localhost:8012/api/v1/vegetables/' + radicchio._id,
          json: true
        };
        request.get(options, function (err, response, body) {
          if (err) return done(err);
          expect(response).to.have.property('statusCode', 200);
          expect(body).to.have.property('name', 'Leek');
          done();
        });
      });
    });
  });

  it('should only allow updates', function (done) {
    var id = 'badbadbadbadbadbadbadbad';
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables/' + id,
      json: true
    };
    // First check it's not there
    request.get(options, function (err, response, body) {
      if (err) return done(err);
      expect(response).to.have.property('statusCode', 404);

      // Attempt to update non-existant doc
      var options = {
        url: 'http://localhost:8012/api/v1/vegetables/' + id,
        json: { name: 'Cucumber' }
      };
      request.put(options, function (err, response, body) {
        if (err) return done(err);
        expect(response).to.have.property('statusCode', 500);

        // Make sure it wasn't created
        var options = {
          url: 'http://localhost:8012/api/v1/vegetables/' + id,
          json: true
        };
        request.get(options, function (err, response, body) {
          if (err) return done(err);
          expect(response).to.have.property('statusCode', 404);
          done();
        });
      });
    });
  });

  it('should fire pre save Mongoose middleware', function (done) {
    fixtures.vegetable.preCount = 0;

    var radicchio = vegetables[7];
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables/' + radicchio._id,
      json: { name: 'Radicchio di Treviso' }
    };
    request.put(options, function (error, response, body) {
      if (error) return done(error);

      expect(fixtures.vegetable.preCount).to.be(1);
      done();
    });
  });

});

