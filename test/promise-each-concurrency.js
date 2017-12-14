import promiseEach from '../src/index.js';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import repeatArray from 'repeat-array';

const cjsPromiseEach = require('../src/index.js');

chai.use(chaiAsPromised);

describe('promise-each-concurrency', () => {
  it('should export correctly under es5 cjs', () => {
    expect(cjsPromiseEach).to.be.a('function');
  });

  it('should process all items', () => {
    const iterator = sinon.spy(() => new Promise(resolve => resolve()));

    return promiseEach([1, 2, 3], iterator).then(() => {
      expect(iterator.callCount).to.equal(3);
    });
  });

  it('should obey concurrency limit', () => {
    let started = 0;

    const iterator = sinon.spy(() => {
      started++;
      expect(started).to.be.at.most(2);

      return new Promise((resolve) => {
        setTimeout(() => {
          started--;
          resolve();
        });
      });
    });

    return promiseEach([1, 2, 3, 4, 6], iterator, { concurrency: 2 });
  });

  it('should handle errors gracefully', () => {
    const waitForFirstIterator = new Promise(resolve => setTimeout(resolve));

    const spy = sinon.spy(() => {
      if (spy.callCount === 1) {
        return waitForFirstIterator;
      }
      return Promise.reject('foobar');
    });

    const promise = promiseEach([1, 2], spy, { concurrency: 2 });

    return Promise.all([
      waitForFirstIterator,
      expect(promise).to.be.rejectedWith('foobar'),
    ]);
  });

  it('should give a fake threadId', () => {
    let started = 0;

    const iterator = sinon.spy((value, threadId) => {
      expect(value).to.equal(threadId);
      return Promise.resolve();
    });

    return promiseEach(repeatArray([0, 1], 100), iterator, { concurrency: 2 });
  });
  it('should give a fake threadId', () => {
    let started = 0;

    const iterator = sinon.spy((value, threadId) => {
      expect(value).to.equal(threadId);
      return Promise.resolve();
    });

    return promiseEach(repeatArray([0, 1, 2], 100), iterator, { concurrency: 3 });
  });
  it('should give a fake threadId', () => {
    let started = 0;

    const iterator = sinon.spy((value, threadId) => {
      expect(value).to.equal(threadId);
      return Promise.resolve();
    });

    return promiseEach(repeatArray([0, 1, 2, 3, 4, 5], 100), iterator, { concurrency: 6 });
  });
});
