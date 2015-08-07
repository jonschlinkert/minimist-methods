var minimist = require('minimist');
var expand = require('minimist-expand')(minimist);
var app = require('./app');
var cli = require('..')(app, expand);

cli.on('set', function () {
  console.log(arguments)
})

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
