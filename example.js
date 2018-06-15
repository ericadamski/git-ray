const { clone, checkout, remote } = require('./index.js');

remote('git@github.com:ericadamski/git-ray.git', ['add', 'origin'], {
  stdio: 'inherit',
}).subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log(
      'Done `git remote add origin git@github.com:ericadamski/git-ray.git`.'
    );
  },
});

clone('git@github.com:ericadamski/commit-with.git', {
  cwd: '/tmp', // where to run clone, default is process.cwd()
  // stdio: 'inherit', // turn this on to see the output of the command
}).subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log('Done `git clone`.');
  },
});

checkout('test/branch', ['-b']).subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log('Done `git checkout -b`.');
  },
});
