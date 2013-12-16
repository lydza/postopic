var middleware = module.exports = {
  stream: function (request, response, next) {
    var firstWasProcessed = false;

    request.baucis.stream.resume();

    response.set('Content-Type', 'application/json');
    response.write('[');

    request.baucis.stream.on('error', next);
    request.baucis.stream.on('data', function (doc) {
      if (firstWasProcessed) response.write(',');
      response.write(JSON.stringify(doc.toJSON()));
      firstWasProcessed = true;
    });
    request.baucis.stream.on('close', function () {
      response.write(']');
      response.send();
    });
  }
}
