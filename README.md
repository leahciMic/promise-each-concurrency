# promise-each-concurrency
[![Build Status](https://travis-ci.org/leahciMic/promise-each-concurrency.svg?branch=master)](https://travis-ci.org/leahciMic/promise-each-concurrency)
[![Code Climate](https://codeclimate.com/github/leahciMic/promise-each-concurrency/badges/gpa.svg)](https://codeclimate.com/github/leahciMic/promise-each-concurrency)
[![Test Coverage](https://codeclimate.com/github/leahciMic/promise-each-concurrency/badges/coverage.svg)](https://codeclimate.com/github/leahciMic/promise-each-concurrency/coverage)
[![Issue Count](https://codeclimate.com/github/leahciMic/promise-each-concurrency/badges/issue_count.svg)](https://codeclimate.com/github/leahciMic/promise-each-concurrency)
[![Dependency Status](https://www.versioneye.com/user/projects/5770e219671894003644917f/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5770e219671894003644917f)

Pretty much Bluebird's Promise.each with a concurrency option, and support iterators without enumerating them first.

## Usage

```js
const promiseEach = require('promise-each-concurrency');
// or import promiseEach from 'promise-each-concurrency';

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

```js
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


## Changelog

* 1.1.0
  - Export correctly for ES5 CommonJS exports
