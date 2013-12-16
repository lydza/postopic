var expect = require('expect.js');
var request = require('request');

var fixtures = require('./fixtures');

describe('DEL singular', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it('should delete the addressed document', function (done) {
    // make sure it's there
    var shitake = vegetables[3];
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables/' + shitake._id,
      json: true
    };

    request.del(options, function (error, response, body) {
      if (error) return done(error);

      var options = {
        url: 'http://localhost:8012/api/v1/vegetables/' + shitake._id,
        json: true
      };

      expect(response).to.have.property('statusCode', 200);
      expect(body).to.be(1); // count of deleted objects

    	request.del(options, function (error, response, body) {
    	  if (error) return done(error);

        expect(response).to.have.property('statusCode', 404);
    	  done();
    	});
    });

  });
});
