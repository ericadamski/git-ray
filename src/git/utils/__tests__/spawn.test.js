const mockProcess = {
  addListener(_, handler) {
    setImmediate(handler);
  },
  removeListener() {},
};

jest.mock('child_process', () => ({
  spawn: jest.fn().mockImplementation(() => mockProcess),
}));

const { Observable } = require('rxjs');
const cp = require('child_process');
const spawn = require('../spawn.js');

describe('.spawn', () => {
  const cmd = 'ls';
  const args = ['-a', '-1'];
  const options = { cwd: '/tmp', stdio: 'inherit' };

  beforeEach(() => {
    cp.spawn.mockClear();
  });

  it('should return an observable', () => {
    expect(spawn()).toBeInstanceOf(Observable);
  });

  it('should call child_process.spawn', () => {
    return spawn(cmd, args, options)
      .toPromise()
      .then(() => {
        expect(cp.spawn).toHaveBeenCalledTimes(1);
        expect(cp.spawn).toHaveBeenCalledWith(cmd, args, options);
      });
  });

  it('should throw an error on an Error Event', () => {
    cp.spawn.mockImplementation(() => ({
      addListener(eventName, handler) {
        eventName === 'error' && handler(128);
      },
      removeListener() {},
    }));

    return spawn(cmd, args, options)
      .toPromise()
      .then(() => fail('this should fail'))
      .catch(e => {
        expect(e).toMatchSnapshot();
      });
  });

  it('should return the process as part of the stream', () => {
    const process = {
      key: 'i am a process',
      addListener(_, handler) {
        setImmediate(handler);
      },
      removeListener() {},
    };

    cp.spawn.mockImplementation(() => process);

    return spawn(cmd, args, options)
      .toPromise()
      .then(p => {
        expect(p).toEqual(process);
      });
  });
});
