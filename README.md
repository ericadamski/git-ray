# git-ray

💻🔫 - A nodejs library to call git commands written with RxJS

## Install

`yarn add git-ray`

or

`npm install git-ray`

## Usage

### As Observable

Currently Supported Commands:

- `git-clone`
- `git-checkout`
- `git-remote`

All commands will have a function signature pattern like:

> See [child_process](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html) docs for spawn options and ChildProcess class definition.

```typescript
function gitCommand(
  arg: String, // a string argument to pass as the main param to git
  params: String[], // git command options
  nodeSpawnOptions: Object = { cwd: process.cwd() } // child_process.spawn options
): Observable<ChildProcess>;
```

```javascript
const { clone } = require('git-ray');

clone('git@github.com:ericadamski/git-ray.git', {
  cwd: '/tmp', // where to run clone
}).subscribe({
  next(process) {
    console.log(`running: ${process.pid}`);
  },
  complete() {
    console.log('Done `git clone`.');
  },
});
```

Currently, given the supported commands, the arguments are parsed as follows:

```javascript
const { clone } = require('git-ray');

// This function invocation...
clone('repo', ['--depth', '1']).subscribe({
  next(process) {
    /* some code */
  },
});

// Will produce this cli call
// $> git clone --depth 1 repo
```

Which will be a problem for commands like `git-remote`. Which would look like:

```javascript
const { remote } = require('git-ray');

// This function invocation...
remote('add', ['origin', 'link']).subscribe(/* code */);

// Will produce this cli call
// $> git remote origin link add
// which is invalid.

// Calling ...
remote('link', ['add', 'origin']).subscribe(/* code */);
// Will produce the desired
// $> git remote add origin link
```

The parsing logic can change going forward when either:

- The commands become less intuitive
- It becomes a road block to implementing another git command
