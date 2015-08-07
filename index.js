/*!
 * minimist-methods <https://github.com/jonschlinkert/minimist-methods>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var VisitArgs = require('visit-args').VisitArgs;
var forward = require('forward-object');


function toMethods(app) {
  if (typeof app === 'string') {
    return toMethods.namespace.apply(toMethods, arguments);
  }

  return function(minimist) {
    var methods = new VisitArgs();

    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      methods.visit(app, argv, {toBoolean: true});
      return argv;
    }

    forward(proxy, minimist);
    return proxy;
  }
};

toMethods.namespace = function(name, app) {
  return function(minimist) {
    var methods = new VisitArgs();
    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      methods.visit(app, argv[name], {toBoolean: true});
      return argv;
    }

    forward(proxy, minimist);
    proxy[name] = methods
    return proxy;
  }
};

/**
 * Expose `toMethods`
 */

module.exports = toMethods;
