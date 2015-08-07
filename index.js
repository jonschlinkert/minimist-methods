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
    var cli = new VisitArgs();
    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      cli.visit(app, argv, {toBoolean: true});
      return argv;
    }

    forward(proxy, minimist);
    for (var key in cli) {
      var val = cli[key];

      if (typeof val === 'function') {
        proxy[key] = (function (v) {
          return function () {
            return v.apply(cli, arguments);
          }
        }(val));
      } else {
        proxy[key] = val;
      }
    }
    return proxy;
  }
  return visitor;
}

toMethods.namespace = function(name, app, mm) {
  if (typeof mm === 'function') {
    return visitor(mm);
  }

  function visitor(minimist) {
    var cli = new VisitArgs();
    function proxy() {
      var argv = minimist.apply(minimist, arguments);
      cli.visit(app, argv[name], {toBoolean: true});
      return argv;
    }
    forward(proxy, minimist);
    proxy[name] = cli;
    return proxy;
  }

  return visitor;
};

/**
 * Expose `toMethods`
 */

module.exports = toMethods;
