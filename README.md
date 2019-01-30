# Promise each concurrency [![Build Status](https://travis-ci.org/leahciMic/promise-each-concurrency?branch=master)](https://travis-ci.org/leahciMic/promise-each-concurrency)

> Process an iterable of promises with concurrency

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm i promise-each-concurrency

# Or with Yarn
yarn add promise-each-concurrency
```

## Usage

```js
import promiseEach from `promise-each-concurrency`;

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

## Contributing

See [the contribute file](CONTRIBUTING.md)!

PRs accepted.

## License

[MIT © Michael Leaney](LICENSE)
