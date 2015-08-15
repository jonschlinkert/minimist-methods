var plugins = require('minimist-plugins');
var App = require('./app').App;
var n = require('..');

var cli = plugins(require('minimist'))
  .use(require('minimist-expand'))
  .use(require('minimist-events')())
  .use(n('foo', new App()))
  .use(n('bar', new App()))
  .use(n('baz', new App()))

cli.foo.on('set', function () {
  console.log('[foo] set', arguments);
});

cli.bar.on('set', function () {
  console.log('[bar] set', arguments);
});

cli.baz.on('set', function () {
  console.log('[baz] set', arguments);
});

cli.baz.on('get', function () {
  console.log('[baz] get', arguments);
});

var args = process.argv.slice(2);
if (!args.length) {
  args =  [
    '--foo.set=a:b',
    '--bar.set=c:d',
    '--baz.set=e:f+g:h+i:j',
    '--baz.get=a',
  ];
}

cli.parse(args, function (err, res) {
  console.log(res);
});

