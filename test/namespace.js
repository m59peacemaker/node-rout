var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test('namespace works', function(t) {
  t.plan(1);
  var router = new Router();
  var subRouter = new Router();
  subRouter.get('/:foo/:bar', function(req, res, next, params) {
    t.deepEqual(params, {foo: 'c', bar: 'd'});
  });
  router.get(router.namespace('/ick/:ick', subRouter));
  router.get('/a/b/c/d', t.fail.bind(null, "subRouter was not used"));
  router(req('/a/b/c/d'));
});

test('sub router can be used in multiple namespaces', function(t) {
  t.plan(2);
  var router = Router();

  var subRouter = Router();
  subRouter.get('/bar', t.pass);

  router.all(router.namespace('/foo', subRouter));
  router.all(router.namespace('/qux', subRouter));

  router(req('/foo/bar'));
  router(req('/qux/bar'));
});

test('sub router can be used with and without namespace at the same time', function(t) {
  t.plan(2);
  var router = Router();
  var subRouter = Router();
  subRouter.get('/bar', t.pass);
  router.all(router.namespace('/foo', subRouter));
  router.all(subRouter);
  router(req('/foo/bar'));
  router(req('/bar'));
});
