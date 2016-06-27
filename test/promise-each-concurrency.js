import promiseEach from '../src/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('promise-each-concurrency', () => {
  it('should process all items', (done) => {
    const iterator = sinon.spy(() => new Promise(resolve => resolve()));

    const progress = sinon.spy((completedItems) => {
      expect(completedItems.length).to.equal(3);
      expect(iterator.callCount).to.equal(3);
    });

    promiseEach([1, 2, 3], iterator, { progress }).then(done, done);
  });

  it('should obey concurrency limit', (done) => {
    const iterator = sinon.spy(() => new Promise(resolve => resolve()));

    const progress = sinon.spy((completedItems) => {
      expect(completedItems.length).to.equal(1);
      expect(progress.callCount).to.equal(iterator.callCount);
    });

    promiseEach([1, 2, 3], iterator, { concurrency: 1, progress }).then(done, done);
  });
});
