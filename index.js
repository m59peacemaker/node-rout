var makeRouter = require('./lib/make-router');
var namespace = require('./lib/namespace');
var vhost = require('./lib/vhost');

module.exports = function(cacher, parser) {
  var router = makeRouter.apply(null, arguments);
  router.vhost = vhost.apply(null, arguments);
  router.namespace = namespace;
  return router;
};


