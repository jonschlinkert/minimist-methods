var Store = require('data-store');
var store = new Store('test-map-args');

var MapArgs = require('..');
var cli = {};
var args = [
  '--set=a.b.c.d:e',
  '--set=c:d',

  '--store.set=a.b.c.d:e',
  '--store.set=c:d',
  // '--get=a',
  // '--set=e:f+g:h+i:j',
  // '--store.bar=a:b',
  '--store.del=force:true',
  // '--del=e',
  // '--del=a',
  // 'a',
  // 'b'
];

// $ assemble foo --set=a:b

var parsed = require('minimist')(args);
var argv = require('minimist-expand')(parsed);

// console.log(argv)
cli.store = new MapArgs();

cli.store.on('del', function (key, val) {
  if (typeof key === 'object' && key.force) {
    console.log(arguments)
    store.del({force: true});
  }
});

cli.store.on('set', function (key, val) {
  console.log('SET:', key, val);
});

cli.store.run(store, argv.store);
console.log(cli.store)

