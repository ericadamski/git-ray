const mockProcess = {};

jest.mock('../utils/spawn.js', () =>
  jest.fn().mockImplementation(() => mockOf(mockProcess))
);

const { Observable, of: mockOf } = require('rxjs');
const spawn = require('../utils/spawn.js');
const git = require('../git');

describe('.git', () => {
  const cmd = 'clone';
  const repo = 'git@github.com/ericadamski/git-ray.git';

  beforeEach(() => {
    spawn.mockClear();
  });

  it('should throw an error if no command is given or it is NOT a string', () => {
    expect(() => git()).toThrowErrorMatchingSnapshot();
    expect(() => git([])).toThrowErrorMatchingSnapshot();
    expect(() => git({})).toThrowErrorMatchingSnapshot();
    expect(() => git(123)).toThrowErrorMatchingSnapshot();
    expect(() => git(null)).toThrowErrorMatchingSnapshot();
    expect(() => git(true)).toThrowErrorMatchingSnapshot();
    expect(() => git(undefined)).toThrowErrorMatchingSnapshot();
  });

  it('should return an observable', () => {
    expect(git(cmd)).toBeInstanceOf(Observable);
  });

  it('should call spawn with params', () => {
    return git(cmd)
      .toPromise()
      .then(() => {
        expect(spawn).toHaveBeenCalledTimes(1);
        expect(spawn).toHaveBeenCalledWith('git', [cmd], {
          cwd: process.cwd(),
        });
      });
  });

  it('should accept extra params', () => {
    const params = ['--depth', '1', '--branch', 'feature/new-branch', repo];

    return git(cmd, params)
      .toPromise()
      .then(() => {
        expect(spawn).toHaveBeenCalledTimes(1);
        expect(spawn).toHaveBeenCalledWith('git', [cmd, ...params], {
          cwd: process.cwd(),
        });
      });
  });

  it('should accept options', () => {
    const options = { stdio: 'ignore' };

    return git(cmd, options)
      .toPromise()
      .then(() => {
        expect(spawn).toHaveBeenCalledTimes(1);
        expect(spawn).toHaveBeenCalledWith(
          'git',
          [cmd],
          Object.assign(
            {
              cwd: process.cwd(),
            },
            options
          )
        );
      });
  });

  it('should accept options and params', () => {
    const params = ['--depth', '1', '--branch', 'feature/new-branch', repo];
    const options = { stdio: 'ignore', cwd: '/tmp' };

    return git(cmd, params, options)
      .toPromise()
      .then(() => {
        expect(spawn).toHaveBeenCalledTimes(1);
        expect(spawn).toHaveBeenCalledWith('git', [cmd, ...params], options);
      });
  });
});
