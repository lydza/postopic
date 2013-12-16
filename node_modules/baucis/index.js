// Dependencies
// ------------
var express = require('express');
var mongoose = require('mongoose');
var lingo = require('lingo');
var url = require('url');

var exec = require('./middleware/exec');
var headers = require('./middleware/headers');
var configure = require('./middleware/configure');
var query = require('./middleware/query');
var send = require('./middleware/send');
var validation = require('./middleware/validation');
var documents = require('./middleware/documents');

// Module Definition
// -----------------
var app = express();
var baucis = module.exports = function (options) {
  options || (options = {});

  Object.keys(options).forEach(function (key) {
    app.set(key, options[key]);
  });

  return app;
};

// Public Methods
// --------------
baucis.rest = function (options) {
  if (!options.singular) throw new Error('Must provide the Mongoose schema name');

  var controller = express();
  var basePathOption = options.basePath ? options.basePath.replace(/\/?$/, '/') : '/';
  var basePath = url.resolve('/', basePathOption);
  var basePathWithId = url.resolve(basePath, ':id');
  var basePathWithOptionalId = url.resolve(basePath, ':id?');

  controller.set('model', mongoose.model(options.singular));
  controller.set('plural', options.plural || lingo.en.pluralize(options.singular));
  controller.set('findBy', options.findBy || '_id');

  controller.set('basePath', basePath);
  controller.set('basePathWithId', basePathWithId);
  controller.set('basePathWithOptionalId', basePathWithOptionalId);

  Object.keys(options).forEach(function (key) {
    controller.set(key, options[key]);
  });

  controller.use(express.json());

  // Initialize baucis state
  controller.all(basePathWithOptionalId, function (request, response, next) {
    request.baucis = {};
    next();
  });

  // Allow/Accept headers
  controller.all(basePathWithId, headers.allow);
  controller.all(basePathWithId, headers.accept);
  controller.all(basePath, headers.allow);
  controller.all(basePath, headers.accept);

  if (options.configure) options.configure(controller);

  // Set Link header if desired
  if (options.relations === true) {
    controller.head(basePathWithId, headers.link);
    controller.get(basePathWithId, headers.link);
    controller.post(basePathWithId, headers.link);
    controller.put(basePathWithId, headers.link);

    controller.head(basePath, headers.linkCollection);
    controller.get(basePath, headers.linkCollection);
    controller.post(basePath, headers.linkCollection);
    controller.put(basePath, headers.linkCollection);
  }

  // Add all pre-query middleware
  if (options.all) controller.all(basePathWithOptionalId, options.all);
  if (options.head) controller.head(basePathWithOptionalId, options.head);
  if (options.get) controller.get(basePathWithOptionalId, options.get);
  if (options.post) controller.post(basePathWithOptionalId, options.post);
  if (options.put) controller.put(basePathWithOptionalId, options.put);
  if (options.del) controller.del(basePathWithOptionalId, options.del);

  // Add routes for singular documents
  if (options.head !== false) controller.head(basePathWithId, query.head, configure.controller, configure.query, exec.count, documents.lastModified, documents.send);
  if (options.get  !== false) controller.get(basePathWithId, query.get, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);
  if (options.post !== false) controller.post(basePathWithId, query.post, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);
  if (options.put  !== false) controller.put(basePathWithId, query.put, configure.controller, configure.query,             documents.lastModified, documents.send);
  if (options.del  !== false) controller.del(basePathWithId, query.del, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);

  // Add routes for collections of documents
  if (options.head !== false) controller.head(basePath, configure.conditions, query.headCollection, configure.controller, configure.query, exec.count, documents.lastModified, documents.send);
  if (options.get  !== false) controller.get(basePath, configure.conditions, query.getCollection, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);
  if (options.post !== false) controller.post(basePath,                      query.postCollection,                                                  documents.lastModified, documents.send);
  if (options.put  !== false) controller.put(basePath,                       query.putCollection, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);
  if (options.del  !== false) controller.del(basePath, configure.conditions, query.delCollection, configure.controller, configure.query, exec.exec, documents.lastModified, documents.send);

  // Publish unless told not to
  if (options.publish !== false) app.use(url.resolve('/', controller.get('plural')), controller);

  return controller;
};
