var pathMatch = require('path-match')();

module.exports = require('../../').bind(null, function(pattern) {
  return new pathMatch(pattern);
}, function(cached, url) {
  return cached(url);
});
