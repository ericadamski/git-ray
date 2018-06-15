const spawn = require('./utils/spawn.js');

module.exports = function git(cmd, params = [], options = {}) {
  if (typeof cmd !== 'string')
    throw new Error(`Refusing to run git. Invalid command ${cmd}.`);

  const isParamsOptions = !Array.isArray(params);

  const p = isParamsOptions ? [] : params;
  const o = isParamsOptions ? params : options;

  return spawn('git', [cmd, ...p], Object.assign({ cwd: process.cwd() }, o));
};
