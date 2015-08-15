/*!
 * minimist-methods <https://github.com/jonschlinkert/minimist-methods>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var VisitArgs = require('visit-args').VisitArgs;

function toMethods(app) {
  if (typeof app === 'string') {
    return toMethods.namespace.apply(toMethods, arguments);
  }
  var visitArgs = new VisitArgs();
  return function (cli) {
    return function (argv, next) {
      visitArgs.visit((app || {}), argv, {toBoolean: true});
      next(null, argv);
    };
  };
}

toMethods.namespace = function namespace(name, app) {
  if (typeof name !== 'string') {
    throw new TypeError('expected `name` to be a string.');
  }
  return function (cli) {
    cli[name] = new VisitArgs();
    return function (argv, next) {
      cli[name].visit((app || {}), argv[name], {toBoolean: true});
      next(null, argv);
    };
  };
};

/**
 * Expose `toMethods`
 */

module.exports = toMethods;
