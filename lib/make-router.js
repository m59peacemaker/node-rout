var eachSeries = require('each-series');

module.exports = Router;

function Router(cacher, parser) {
  var routes = [];
  function router(req, res, nextMiddleware) {
    var data = {};
    eachSeries(routes, function(route, idx, next) {
      if (!methodMatches(route.method, req.method)) { return next(); }
      var params = parser(route.cached, req.url);
      // parser returns an object if matched
      if (!params) { return next(); }
      route.handler(req, res, next, params, data);
    }, nextMiddleware);
  }
  router.routes = routes;
  ['get', 'post', 'put', 'patch', 'delete', 'options', 'all'].forEach(function(method) {
    router[method] = function(pattern, handler) {
      if (!handler) {
        handler = pattern;
        pattern = '*';
      }
      routes.push({
        method: method.toUpperCase(),
        pattern: pattern,
        cached: cacher(pattern),
        handler: handler
      });
    };
  });
  return router;
}

function methodMatches(route, req) {
  return route === req || route === 'ALL';
}
