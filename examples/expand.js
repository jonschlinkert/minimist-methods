var plugins = require('minimist-plugins');
var app = require('./app');

var cli = plugins(require('minimist'))
  .use(require('minimist-expand'))
  .use(require('..')(app))

cli.on('set', function () {
  console.log(arguments)
})

var args = process.argv.slice(2);
if (!args.length) {
  args =  ['--set=w:x,y,z', '--one.set=a:b|c:d|e:f', '--two.set=g.h.i.j:k', '--get=w', '--one.get=a', '--two.get=g'];
}

cli.parse(args, function (err, argv) {
  console.log(argv);
});

