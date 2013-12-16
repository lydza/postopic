var expect = require('expect.js');
var request = require('request');

var fixtures = require('./fixtures');

describe('PUT plural', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
  after(fixtures.vegetable.deinit);

  it('should replace entire collection with given new collection', function (done) {
    return done(); // TODO unimplemented

    var poke = { name: 'Poke' };
    var collards = { name: 'Collard Greens' };
    var mustard = { name: 'Mustard' };

    var options = {
      url: 'http://localhost:8012/api/v1/vegetables',
      json: [ poke, collards, mustard ]
    };
    request.put(options, function (error, response, body) {
      if (error) return done(error);
      expect(response).to.have.property('statusCode', 200);
      expect(body).to.have.property('length', 3); // TODO more...
      done();
    });
  });
});

