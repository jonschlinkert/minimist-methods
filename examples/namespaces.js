var App = require('./app').App;
var app = new App();
var one = new App();
var two = new App();

var visit = require('collection-visit');
var minimist = require('minimist');
var methods = require('..');

var cli = require('minimist-plugins')(minimist)
  .use(require('minimist-expand'))
  .use(require('minimist-events'))
  .use(methods(app))
  .use(methods('one', one))
  .use(methods('two', two))

// set
cli.on('set', console.log.bind(console, '[set]'));
cli.one.on('set', console.log.bind(console, '[one.set]'));
cli.two.on('set', console.log.bind(console, '[two.set]'));

// get
cli.on('get', console.log.bind(console, '[get]'));
cli.one.on('get', console.log.bind(console, '[one.get]'));
cli.two.on('get', console.log.bind(console, '[two.get]'));

cli.on('end', function () {
  console.log(app.cache)
});

var args = process.argv.slice(2);
var argv = cli(args.length ? args : [
  '--set=w:x,y,z',
  '--one.set=a:b|c:d|e:f',
  '--two.set=g.h.i.j:k',
  '--get=w',
  '--one.get=a',
  '--two.get=g',
]);

console.log(argv);
console.log(app);
console.log(one);
console.log(two);
