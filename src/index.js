export default async function promiseEach(iterable, fn, {
  concurrency = Infinity,
  progress = () => {},
}) {
  const nextItem = (function* next() {
    for (const x of iterable) {
      yield x;
    }
  }());

  function processNItems(n) {
    const promises = [];
    for (let i = 0; i < n; i++) {
      const next = nextItem.next();
      if (next.done) { break; }
      promises.push(fn(next.value));
    }

    return Promise.all(promises);
  }

  while (true) { // eslint-disable-line no-constant-condition
    const items = await processNItems(concurrency);
    if (items.length) { progress(items); }
    if (items.length < concurrency) { break; }
  }
}
