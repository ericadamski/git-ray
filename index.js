const make = require('./src/git/make');

module.exports = {
  clone: make('clone'),
  pull: make('pull'),
  checkout: make('checkout'),
  remote: make('remote'),
  fetch: make('fetch'),
};
