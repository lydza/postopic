var middleware = module.exports = {
  conditions: function (request, response, next) {
    if (!request.query.conditions) return next();

    request.baucis.conditions = JSON.parse(request.query.conditions);
    next();
  },
  // Apply various options based on controller parameters
  controller: function (request, response, next) {
    if (request.app.get('select')) request.baucis.query.select(request.app.get('select'));
    if (request.app.get('restrict')) request.app.get('restrict')(request.baucis.query, request);
    next();
  },
  // Apply various options based on request query parameters
  query: function (request, response, next) {
    var populate;
    var query = request.baucis.query;

    if (request.query.sort) query.sort(request.query.sort);
    if (request.query.skip) query.skip(request.query.skip);
    if (request.query.limit) query.limit(request.query.limit);
    if (request.query.select) {
      if (request.query.select.indexOf('+') !== -1) {
        return next(new Error('Including fields excluded at schema level (using +) is not permitted'));
      }
      query.select(request.select);
    }
    if (request.query.populate) {
      populate = JSON.parse(request.query.populate);
      if (!Array.isArray(populate)) populate = [ populate ];
      populate.forEach(function (field) {
        // Don't allow selecting +field from client
        if (field.select && field.select.indexOf('+') !== -1) {
          return next(new Error('Including fields excluded at schema level (using +) is not permitted'));
        }
        query.populate(field);
      });
    }

    next();
  }
};
