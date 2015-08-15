var plugins = require('minimist-plugins');
var app = require('./app');

var cli = plugins(require('minimist'))
  .use(require('minimist-events')())
  .use(require('..')(app))

cli.on('set', function (key) {
  console.log(key);
  //=> 'b'
});
cli.on('get', function (key) {
  console.log(key);
  //=> 'b'
});

cli.parse(['--set=b', '--get=b'], function (err, argv) {
  console.log(argv);
});
