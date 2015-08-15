var plugins = require('minimist-plugins');
var app = require('./app');

var cli = plugins(require('minimist'))
  .use(require('minimist-events')())
  .use(require('minimist-expand'))
  .use(require('..')(app))


cli.on('option', function (key, val) {
  console.log('option', key, val);
});

cli.on('set', function (key, val) {
  console.log('set', key, val);
});

cli.on('get', function (val) {
  console.log('get', val);
});

cli.on('del', function (val) {
  console.log('del', val);
});

cli.on('_', function (val) {
  cli.emit('task', val);
});

var args = process.argv.slice(2);
if (!args.length) {
  args =  ['--set=a:b', '--set=c:d', '--get=a', '--del=a', '--set=e:f+g:h+i:j'];
}

cli.parse(args, {alias: {s: 'set'}}, function (err, argv) {
  console.log(argv);
  console.log(app.cache);
});
