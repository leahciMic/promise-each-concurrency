# promise-each-concurrency

Pretty much Bluebird's Promise.each with a concurrency option, and support iterators without enumerating them first.

## Usage

```js

const promiseEach = require('promise-each-concurrency');

promiseEach(
  [1, 2, 3],
  function(x) {
    return new Promise(function(resolve) {
      setTimeout(resolve.bind(undefined, x), 1000);
    })
  },
  {
    concurrency: 1
  }
);
```

Will produce:
```
1
2
3
```

With a 1 second pause between each line.

## API

```
promiseEach(
  Iterable<any> input,
  function(any item) iterator,
  options
) -> Promise
```

### Options

| Name        | Default       | Description                                            |
|-------------|---------------|--------------------------------------------------------|
| concurrency | Math.infinity | how many items to process at once, default is no limit |


## Todo

* Finish tests.
* Travis
* Readme badges
