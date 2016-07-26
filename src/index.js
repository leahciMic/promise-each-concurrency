import debug from 'debug';

const log = debug('promise-each-concurrency');

function promiseEach(iterable, iterator, {
  concurrency = Infinity,
} = {}) {
  return new Promise((resolve, reject) => {
    let inFlightItems = 0;
    let aborted = false;

    function onSuccess() {
      log('iterator completed with success');
      inFlightItems--;
      doMore(); // eslint-disable-line no-use-before-define
    }

    function onError(err) {
      log('iterator had error', err);
      aborted = true;
      reject(err);
    }

    const nextItem = (function* next() {
      for (const x of iterable) {
        log('retrieve next value in iterable');
        yield x;
      }
    }());

    function doMore() {
      if (aborted) {
        log('we were aborted, refusing to do more work');
        return;
      }
      while (inFlightItems < concurrency) {
        log('next item in queue');
        const next = nextItem.next();
        if (next.done) {
          log('queue is finished');
          if (inFlightItems === 0) {
            log('everyone is done');
            resolve();
            return;
          }
          break;
        }
        inFlightItems++;
        log('run iterator');
        iterator(next.value).then(onSuccess, onError);
      }
    }

    doMore();
  });
}

export default promiseEach;
