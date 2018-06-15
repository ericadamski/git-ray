const { clone, checkout } = require('./index.js');

clone('git@github.com:ericadamski/commit-with.git', {
  cwd: '/tmp', // where to run clone
  // stdio: 'inherit', // turn this on to see the output of the command
}).subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log('Done.');
  },
});

checkout('master').subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log('Done.');
  },
});
