/*!
 * minimist-methods <https://github.com/jonschlinkert/minimist-methods>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var VisitArgs = require('visit-args').VisitArgs;
var forward = require('forward-object');

function toMethods(app, mm) {
  if (typeof app === 'string') {
    return toMethods.namespace.apply(toMethods, arguments);
  }

  if (typeof mm === 'function') {
    return visitor(mm);
  }

  function visitor(minimist) {
    var methods = new VisitArgs();
    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      methods.visit(app, argv, {toBoolean: true});
      return argv;
    }
    forward(proxy, minimist);
    return proxy;
  }

  return visitor;
}

toMethods.namespace = function(name, app, mm) {
  if (typeof mm === 'function') {
    return visitor(mm);
  }

  function visitor(minimist) {
    var methods = new VisitArgs();
    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      methods.visit(app, argv[name], {toBoolean: true});
      return argv;
    }
    forward(proxy, minimist);
    proxy[name] = methods;
    return proxy;
  }

  return visitor;
};

/**
 * Expose `toMethods`
 */

module.exports = toMethods;
