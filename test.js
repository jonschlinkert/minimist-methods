'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');

var minimist = require('minimist');
var plugins = require('minimist-plugins');
var expand = require('minimist-expand');
var app = require('./examples/app');
var methods = require('./');
var cli;

describe('methods', function () {
  beforeEach(function () {
    cli = plugins(minimist)
      .use(expand)
      .use(methods())
  })

  it('should emit the key of a command line option:', function (done) {
    cli.on('set', function (key, val) {
      assert.equal(key, 'w');
    });
    cli.parse(['--set=w:x,y,z'], function (err, argv) {
      assert(argv.set);
      done();
    });
  });

  it('should emit the value of a command line option:', function (done) {
    cli.on('set', function (key, val) {
      assert.deepEqual(val, ['x', 'y', 'z']);
    });
    cli.parse(['--set=w:x,y,z'], function (err, argv) {
      assert(argv.set);
      done();
    });
  });

  it('should emit:', function (done) {
    cli.on('set', function (key, val) {
      assert.deepEqual(val, ['x', 'y', 'z']);
    });
    cli.on('get', function (key, val) {
      assert.equal(key, 'w');
    });
    cli.parse(['--set=w:x,y,z', '--get=w'], function (err, argv) {
      assert(argv.set);
      done();
    });
  });
});
