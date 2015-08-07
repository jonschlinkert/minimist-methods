
var visit = require('collection-visit');
// var composer =

var app = {
  data: {},
  set: function (key, value) {
    if (typeof key === 'object') {
      visit(app, 'set', key);
    } else {
      app.data[key] = value;
    }
  },
  task: function () {

  }
};


args.toMethods(app, argv);
console.log(app)

