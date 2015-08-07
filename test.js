/*!
 * minimist-methods <https://github.com/jonschlinkert/minimist-methods>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var visit = require('./');

describe('visit', function () {
  it('should:', function () {
    visit('a').should.eql({a: 'b'});
    visit('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      visit();
    }).should.throw('visit expects valid arguments');
  });
});
