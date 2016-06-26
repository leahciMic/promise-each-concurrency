export default async function promiseEach(iterable, fn, {concurrency = Math.infinity}) {
  const nextItem = (function* next() {
    for (let x of iterable) {
      yield x;
    }
  })();

  async function processNItems(n) {
    const promises = [];

    for (let i = 0; i < n; i++) {
      const next = nextItem.next();
      if (next.done) { break; }
      promises.push(fn(next.value));
    }

    return await Promise.all(promises);
  }

  while (true) {
    const items = await processNItems(concurrency);
    if (items.length < concurrency) {
      break;
    }
  }
}
