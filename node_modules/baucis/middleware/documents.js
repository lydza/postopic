var url = require('url');

var middleware = module.exports = {
  lastModified: function (request, response, next) {
    var lastModifiedPath = request.app.get('lastModified');
    var documents = request.baucis.documents;
    if (!lastModifiedPath) return next();
    if (typeof documents === 'number') return next();
    if (!documents) return next();

    var modifiedDates = [].concat(documents).map(function (doc) {
      return doc[lastModifiedPath];
    });

    // Validate
    // TODO allow/convert Timestamp, Number, ISODate
    modifiedDates.forEach(function (modified) {
      if (modified instanceof Date) return;
      else next(new Error('lastModified path was not a date'));
    });

    // Find the latest date
    var lastModified = Math.max.apply(null, modifiedDates);

    // Stringify to RFC 822, updated by RFC 1123 e.g. Sun, 06 Nov 1994 08:49:37 GMT
    response.set('Last-Modified', (new Date(lastModified)).toUTCString());

    next();
  },
  send: function (request, response, next) {
    var ids;
    var documents = request.baucis.documents;

    // 404 if document(s) not found or 0 documents removed/counted
    if (!documents) return response.send(404);

    if (request.baucis.noBody) {
      return response.send();
    }

    // If it's a document count (e.g. the result of a DELETE), send it back and short-circuit
    if (typeof documents === 'number') {
      return response.json(documents);
    }

    // If count mode is set, send the length, or send 1 for single document
    if (request.baucis.count) {
      if (Array.isArray(documents)) return response.send(documents.length);
      else return response.json(1);
    }

    // Otherwise, set the location and send JSON document(s)
    if (!Array.isArray(documents)) {
      request.baucis.location = url.resolve(request.app.get('basePath'), documents.id);
    }
    else if (documents.length === 1) {
      request.baucis.location = url.resolve(request.app.get('basePath'), documents[0].id);
    }
    else {
      ids = documents.map(function (doc) { return doc.id });
      request.baucis.location = request.app.get('basePath') + '?conditions={ _id: { $in: [' + ids.join() + '] } }';
    }

    response.json(documents);
  }
};
