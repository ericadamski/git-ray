const git = require('./git.js');

// istanbul ignore next
function nthLast(n, a) {
  if (!n || n < 1) return;
  if (!a || !Array.isArray(a) || a.length < 1) return;

  return a[Math.max(a.length - n, 0)];
}

// istanbul ignore next
function last(a) {
  return nthLast(1, a);
}

module.exports = function makeGitCommand(cmd) {
  const fn = function(...args) {
    const hasArgs = args.length > 0;

    const l = last(args);
    const ndl = nthLast(2, args);

    const p = Array.isArray(l) ? l : Array.isArray(ndl) ? ndl : [];
    const o = typeof l === 'object' && !Array.isArray(l) ? l : {};

    return git(
      cmd,
      p.concat(args.splice(0, Math.max(0, args.length - args.indexOf(l)))),
      o
    );
  };

  fn.name = cmd;

  return fn;
};
