var UrlPattern = require('url-pattern');

module.exports = require('../../').bind(null, function(pattern) {
  return new UrlPattern(pattern);
}, function(cached, url) {
  return cached.match(url);
});
