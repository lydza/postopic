var middleware = module.exports = {
  exec: function (request, response, next) {
    request.baucis.query.exec(function (error, documents) {
      if (error) return next(error);
      request.baucis.documents = documents;
      next();
    });
  },
  stream: function (request, response, next) {
    request.baucis.stream = request.baucis.query.stream();
    request.baucis.stream.resume();

    next();
  },
  count: function (request, response, next) {
    var lastModifiedPath = request.app.get('lastModified');

    request.baucis.count = true;

    if (lastModifiedPath) {
      request.baucis.query.select('-_id ' + lastModifiedPath);
      request.baucis.query.exec(function (error, documents) {
        if (error) return next(error);
        request.baucis.documents = documents;
        next();
      });
    }
    else {
      request.baucis.query.count(function (error, count) {
        if (error) return next(error);
        request.baucis.documents = count;
        next();
      });
    }
  }
};
