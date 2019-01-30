export default async (iterable, iterator, { concurrency = 10 } = {}) => {
  if (concurrency === Infinity) {
    throw new Error('concurrency must be a finite number');
  }
  const nextItem = (function* next() {
    for (const x of iterable) {
      yield x;
    }
  })();

  async function startThread(threadID) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const next = nextItem.next();
      if (next.done) {
        return;
      }
      await iterator(next.value, threadID);
    }
  }

  await Promise.all([...new Array(concurrency)].map((_, x) => x).map(x => startThread(x)));
};
