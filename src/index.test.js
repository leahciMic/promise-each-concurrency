/* eslint-env jest */
const promiseEach = require('./index');

describe('Promise each concurrency', () => {
  it('should process all items', () => {
    const iterator = jest.fn();

    return promiseEach([1, 2, 3], iterator).then(() => {
      expect(iterator.mock.calls.length).toBe(3);
    });
  });

  it('should obey concurrency limit', () => {
    let started = 0;

    const iterator = jest.fn(() => {
      started += 1;
      expect(started).toBeLessThanOrEqual(2);
      return new Promise(resolve => {
        setTimeout(() => {
          started -= 1;
          resolve();
        }, 10);
      });
    });

    return promiseEach([1, 2, 3, 4, 6], iterator, { concurrency: 2 });
  });

  it('should handle errors gracefully', async () => {
    const waitForFirstIterator = new Promise(resolve => setTimeout(resolve));

    const spy = jest.fn(() => {
      if (spy.mock.calls.length === 1) {
        return waitForFirstIterator;
      }
      return Promise.reject(new Error('foobar'));
    });

    await expect(promiseEach([1, 2], spy, { concurrency: 2 })).rejects.toThrowError('foobar');
  });

  it('should give a fake threadId', () => {
    const iterator = jest.fn((value, threadId) => {
      expect(value).toBe(threadId);
      return Promise.resolve();
    });

    return promiseEach([...new Array(400)].fill().map((x, i) => i % 7), iterator, {
      concurrency: 7
    });
  });
});
