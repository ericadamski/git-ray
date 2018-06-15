const { of, merge, fromEvent } = require('rxjs');
const { takeUntil, concat, tap } = require('rxjs/operators');
const cp = require('child_process');

module.exports = function spawn(cmd, args, options = {}) {
  const p = cp.spawn(cmd, args, options);

  return of(p).pipe(
    concat(
      fromEvent(p, 'error').pipe(
        tap(code => {
          throw new Error(
            `The command '> ${cmd} ${args.join(
              ' '
            )}' with options ${JSON.stringify(
              options
            )} exited with code ${code}.`
          );
        })
      )
    ),
    takeUntil(fromEvent(p, 'exit'))
  );
};
