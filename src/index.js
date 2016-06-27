export default async function promiseEach(iterable, fn, {concurrency = Math.infinity, progress = () => {}}) {
  const nextItem = (function* next() {
    for (let x of iterable) {
      yield x;
    }
  })();

  function processNItems(n) {
    const promises = [];

    for (let i = 0; i < n; i++) {
      const next = nextItem.next();
      if (next.done) { break; }
      promises.push(fn(next.value));
    }

    return Promise.all(promises);
  }

  while (true) {
    const items = await processNItems(concurrency);
    if (items.length) { progress(items); }
    if (items.length < concurrency) { break; }
  }
}
