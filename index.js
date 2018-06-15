const make = require('./src/git/make');

module.exports = {
  clone: make('clone'),
  checkout: make('checkout'),
  remote: make('remote'),
  fetch: make('fetch'),
};
