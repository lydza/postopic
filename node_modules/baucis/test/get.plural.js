var expect = require('expect.js');
var request = require('request');

var fixtures = require('./fixtures');

describe('GET plural', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it("should return 'em all", function (done) {
    var options = {
      url: 'http://localhost:8012/api/v1/vegetables',
      json: true
    };
    request.get(options, function (err, response, body) {
      if (err) return done(err);
      expect(response).to.have.property('statusCode', 200);
      body.forEach( function(doc, i) {
      	var found = vegetables.some( function (vege) {
      	  return vege._id.toString() === doc._id;
      	});
      	expect(found).to.be(true);
      });
      done();
    });
  });
});
