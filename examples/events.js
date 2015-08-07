var app = require('./app');

// turtles...
var minimist = require('minimist');
var expand = require('minimist-expand')(minimist);
var events = require('minimist-events')(expand);
var cli = require('..')(app, events);

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

// cli.on('*', function (key, value) {
//   console.log(key, value);
// });

var args = process.argv.slice(2);

cli(args.length ? args : ['--set=a:b', '--set=c:d', '--get=a', '--del=a', '--set=e:f+g:h+i:j'], {
  alias: {s: 'set'}
});

console.log(app.cache);
