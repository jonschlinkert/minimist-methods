
var App = require('./app');
var app = new App();
var visit = require('collection-visit');
var minimist = require('minimist');
var expand = require('minimist-expand');
var events = require('minimist-events');
var cli = events(minimist, {postProcess: expand});


cli.on('set', function (val) {
  visit(app, 'set', val);
  console.log('set', val);
});

cli.on('get', function (val) {
  visit(app, 'get', val);
  console.log('get', val);
});

cli.on('del', function (val) {
  visit(app, 'del', val);
  console.log('del', val);
});

cli.on('_', function (val) {
  cli.emit('task', val);
});


// cli.on('*', function (key, value) {
//   console.log(key, value);
// });

cli.parse(process.argv.slice(2), {
  alias: {task: 't'}
});
// cli.parse(['--set=a:b', '--set=c:d', '--get=a', '--del=a', '--set=e:f+g:h+i:j']);

// var argv = [
//   {set: {a: 'b'}},
//   {set: {c: 'd'}},
//   {del: 'c'},
//   {set: {d: {e: {f: 'g'}}}},
//   {get: 'd'},
//   {del: 'd'},
//   {get: 'd'},
// ];

