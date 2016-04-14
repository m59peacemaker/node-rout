module.exports = function(cacher, parser) {
  return function(pattern, handler) {
    var cached = cacher(pattern);
    return function(req, res, next, params, data) {
      var params = parser(cached, req.headers.host);
      if (!params) { return next(); }
      handler(req, res, next, params, data);
    };
  };
};
