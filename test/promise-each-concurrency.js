import promiseEach from '../src/index.js';
import { expect } from 'chai';
import sinon from 'sinon';
import defer from 'lodash/defer';

describe('promise-each-concurrency', function() {
  it('should obey concurrency limit', function(done) {
    const iterator = sinon.spy(function() {
      return new Promise(function(resolve) {
        resolve();
      });
    });

    const progress = sinon.spy(function(completedItems) {
      expect(completedItems.length).to.equal(1);
      expect(progress.callCount).to.equal(iterator.callCount);
    });

    promiseEach(
      [1, 2, 3],
      iterator,
      { concurrency: 1, progress: progress }
    ).then(done, done);
  });
});
