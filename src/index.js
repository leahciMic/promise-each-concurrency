import debug from 'debug';

const log = debug('promise-each-concurrency');

export async function promiseEach(iterable, fn, {
  concurrency = Infinity,
  progress = () => {},
} = {}) {
  const nextItem = (function* next() {
    for (const x of iterable) {
      log('retrieve next value in iterable');
      yield x;
    }
  }());

  function processNItems(n) {
    const promises = [];
    log(`process ${n} items`);
    for (let i = 0; i < n; i++) {
      const next = nextItem.next();
      log('got next item', next.done);
      if (next.done) { break; }
      const retVal = fn(next.value);
      log('got the return value');
      if (!retVal.then) {
        log('does not look like you returned a promise!');
      }
      promises.push(retVal);
    }

    return Promise.all(promises);
  }

  while (true) { // eslint-disable-line no-constant-condition
    log('processing some items');
    const items = await processNItems(concurrency);
    log(`update progress ${items.length}`);
    if (items.length) { progress(items); }
    log('finishing up');
    if (items.length < concurrency) { break; }
  }
}

export default promiseEach;

if (module) {
  module.exports = promiseEach;
}
