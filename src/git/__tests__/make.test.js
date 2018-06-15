jest.mock('../git.js');

const git = require('../git.js');
const make = require('../make.js');

describe('.make', () => {
  const cmd = 'clone';

  beforeEach(() => {
    git.mockClear();
  });

  it('should return a function', () => {
    expect(make(cmd)).toBeInstanceOf(Function);
  });

  it('should call git with a full set of args correctly', () => {
    const options = { stdio: 'inherit' };
    const params = ['--depth', '1'];
    const repo = 'git@github.com/ericadamski/git-ray.git';

    make(cmd)(repo, params, options);

    expect(git).toHaveBeenCalledTimes(1);
    expect(git).toHaveBeenCalledWith(cmd, [...params, repo], options);
  });

  it('should call git with only params correctly', () => {
    const params = ['--depth', '1'];
    const repo = 'git@github.com/ericadamski/git-ray.git';

    make(cmd)(repo, params);

    expect(git).toHaveBeenCalledTimes(1);
    expect(git).toHaveBeenCalledWith(cmd, [...params, repo], {});
  });

  it('should call git with only options correctly', () => {
    const options = { stdio: 'inherit' };
    const repo = 'git@github.com/ericadamski/git-ray.git';

    make(cmd)(repo, options);

    expect(git).toHaveBeenCalledTimes(1);
    expect(git).toHaveBeenCalledWith(cmd, [repo], options);
  });

  it('should call git correctly', () => {
    const repo = 'git@github.com/ericadamski/git-ray.git';

    make(cmd)(repo);

    expect(git).toHaveBeenCalledTimes(1);
    expect(git).toHaveBeenCalledWith(cmd, [repo], {});
  });
});
