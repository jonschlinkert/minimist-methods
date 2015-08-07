var visit = require('collection-visit');
var minimist = require('minimist');
var methods = require('..');

var app = {
  data: {},
  get: function (key) {
    return app.data[key];
  },
  set: function (key, value) {
    if (typeof key === 'object') {
      visit(app, 'set', key);
    } else {
      app.data[key] = value;
    }
    return app;
  }
};

var cli = require('minimist-plugins')(minimist)
  .use(require('minimist-expand'))
  .use(require('minimist-events'))
  .use(methods(app))
  .use(methods('one', app))
  .use(methods('two', app))


cli.on('get', console.log.bind(console, '[get]'));
cli.one.on('set', console.log.bind(console, '[set]'));
cli.one.on('get', console.log.bind(console, '[get]'));


var args = process.argv.slice(2);
var argv = cli(args.length ? args : ['--one.set=a:b', '--one.set=c:d', '--get=a']);
console.log(argv);
