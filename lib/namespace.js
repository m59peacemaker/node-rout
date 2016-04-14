module.exports = namespace;

var regex = /\/[^/]+/g;
function namespace(prefix, middleware) {
  var prefixLength = prefix.match(regex).length;
  return function(req, res, next) {
    var subReq = Object.create(req);
    // get groups of /stuff from url and remove leading parts from req.url
    subReq.url = req.url.match(regex).slice(prefixLength).join('');
    middleware(subReq, res, next);
  };
};
