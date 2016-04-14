var test = require('tape');
var Router = require('./common/Router');
var pathMatchRouter = require('./common/pathMatchRouter');
var req = require('./common/req');

['get', 'post', 'put', 'patch', 'delete', 'options', 'all'].forEach(function(method) {
  test('Method: "'+method+'" handles simple request', function(t) {
    t.plan(1);
    var router = new Router();
    router[method]('/foo', function() {
      t.pass();
    });
    router(req('/foo', method.toUpperCase()));
  });
});

test('receives params', function(t) {
  t.plan(1);
  var router = new Router();
  router.get('/foo/:bar/stuff=:baz', function(req, res, next, params) {
    t.deepEqual(params, {bar: '123', baz: 'abc'});
  });
  router(req('/foo/123/stuff=abc'));
});

test('persists data across handlers', function(t) {
  t.plan(1);
  var router = new Router();
  router.get('/foo', function(req, res, next, params, data) {
    data.foo = 123;
    next();
  });
  router.get('/*', function(req, res, next, params, data) {
    t.equal(data.foo, 123);
  });
  router(req('/foo'));
});

test('does not persists data across requests', function(t) {
  t.plan(2);
  var router = new Router();
  router.get('/foo', function(req, res, next, params, data) {
    t.false(data.foo);
    data.foo = 123;
  });
  router(req('/foo'));
  router(req('/foo'));
});

test('works with path-match parser', function(t) {
  t.plan(2);
  var router = new pathMatchRouter();
  router.get('/foo/:bar', function(req, res, next, params) {
    t.equal(params.bar, '123');
  });
  router.all('/qux', function(req, res, next, params) {
    t.equal(typeof params, 'object');
  });
  router(req('/foo/123'));
  router(req('/qux'));
});
