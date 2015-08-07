
var visit = require('collection-visit');

function App(cache) {
  this.cache = cache || {};
}

App.prototype.set = function(key, value) {
  this.cache[key] = value;
  return this;
};

App.prototype.get = function(key) {
  return this.cache[key];
};

App.prototype.del = function(key) {
  delete this.cache[key];
  return key;
};

App.prototype.has = function(key) {
  return this.cache.hasOwnProperty(key);
};

App.prototype.visit = function(method, val) {
  visit(this, method, val);
  return this;
};

/**
 * Expose `App`
 */

module.exports = App;
