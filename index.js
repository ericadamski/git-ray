const make = require('./src/git/make');

module.exports = {
  clone: make('clone'),
  checkout: make('checkout'),
};
