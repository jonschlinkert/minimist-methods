
var MapArgs = require('../');
var App = require('./app');
var app = new App();
var args = new MapArgs();
var expand = require('minimist-expand');
var argv = require('minimist')([
  '--set=a.b.c.d:e',
  '--set=c:d',
  '--get=a',
  '--set=e:f+g:h+i:j',
  '--del=g',
  '--del=e',
  '--del=a',
  'a',
  'b'
]);

argv = expand(argv);

args.on('set', function (key, val) {
  console.log('set', val.cache);
});

args.on('get', function (key, val) {
  console.log('get', key, val);
});

args.on('del', function (key, val) {
  console.log('deleted', val || key);
});

// var argv = [
//   {set: {a: 'b'}},
//   {set: {c: 'd'}},
//   {del: 'c'},
//   {set: {d: {e: {f: 'g'}}}},
//   {get: 'd'},
//   {del: 'd'},
//   {get: 'd'},
// ];


args.toMethods(app, argv);
console.log(app)

