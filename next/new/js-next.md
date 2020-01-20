# JS Next

https://github.com/tc39/proposals


## ES2016

* [Array.prototype.includes()](https://github.com/tc39/Array.prototype.includes)
* [Exponentiation operator](https://github.com/tc39/proposal-exponentiation-operator)

```js
[1, 2, 3].includes(2) // true
'abc'.includes('ab')  // true

2 ** 4  // 16
```


## ES2017

* [Object.values() / Object.entries()](https://github.com/tc39/proposal-object-values-entries)
* [String.prototype.{padStart, padEnd}()](https://github.com/tc39/proposal-string-pad-start-end)
* [Object.getOwnPropertyDescriptors()](https://github.com/tc39/proposal-object-getownpropertydescriptors)
* [Trailing commas in function parameter lists and calls](https://github.com/tc39/proposal-trailing-function-commas)
* [Async functions](https://github.com/tc39/ecmascript-asyncawait)
* [Shared memory and atomics](https://github.com/tc39/ecmascript_sharedmem)

```js
'abc'.padStart(10, 123456)  // 1234561abc

// Object.getOwnPropertyDescriptors 的应用
const shallowClone = (object) => Object.create(
  Object.getPrototypeOf(object),
  Object.getOwnPropertyDescriptors(object)
);
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);

// Async functions
// todo
```

### Shared memory and atomics

https://exploringjs.com/es2016-es2017/ch_shared-array-buffer.html

通过在进程间共享内存传递数据，随着进程数递增，提效明显。

https://github.com/rauschma/shared-array-buffer-demo

_index.html_

```html
<!doctype html>
<title>SharedArrayBuffer demo</title>

<div id="output"></div>
<a href="" id="unlock">Unlock</a>
<script src="lock.js"></script>
<script src="main.js"></script>
```

_main.js_

```js
const worker = new Worker('worker.js')

worker.addEventListener('message', (event) => {
  document.getElementById('output').textContent = event.data
})

// Set up the shared memory
const sharedBuffer = new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

// Set up the lock
Lock.initialize(sharedArray, 0)
const lock = new Lock(sharedArray, 0)
lock.lock()

worker.postMessage({sharedBuffer})
document.getElementById('unlock').addEventListener('click', event => {
  lock.unlock()
})
```

_worker.js_

```js
importScripts('lock.js')

self.addEventListener('message', (event) => {
  const {sharedBuffer} = event.data
  const lock = new Lock(new Int32Array(sharedBuffer), 0)

  self.postMessage('Waiting for lock...')
  lock.lock()
  self.postMessage('Unlocked')
})
```

_lock.js_

```js
const UNLOCKED = 0;
const LOCKED_NO_WAITERS = 1;
const LOCKED_POSSIBLE_WAITERS = 2;

// Number of shared Int32 locations needed by the lock.
const NUMINTS = 1;

// Atomics 相关操作 ...
class Lock {
  static initialize() {}
  constructor() {}
  lock() {}
  unlock() {}
  toString() {}
}
```



## ES2018

* [Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread)
* [Promise.prototype.finally()](https://github.com/tc39/proposal-promise-finally)
* [Asynchronous Iteration](https://github.com/tc39/proposal-async-iteration)
* [Lifting template literal restriction](https://github.com/tc39/proposal-template-literal-revision)
* [s (dotAll) flag for regular expressions](https://github.com/tc39/proposal-regexp-dotall-flag)
* [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups)
* [RegExp Lookbehind Assertions](https://github.com/tc39/proposal-regexp-lookbehind)
* [RegExp Unicode Property Escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes)

```js
// todo
```


## ES2019

* [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)
* [JSON superset](https://github.com/tc39/proposal-json-superset)
* [Symbol.prototype.description](https://github.com/tc39/proposal-Symbol-description)
* [Function.prototype.toString() revision](https://github.com/tc39/Function-prototype-toString-revision)
* [Object.fromEntries()](https://github.com/tc39/proposal-object-from-entries)
* [Well-formed JSON.stringify()](https://github.com/tc39/proposal-well-formed-stringify)
* [String.prototype.{trimStart,trimEnd}()](https://github.com/tc39/proposal-string-left-right-trim)
* [Array.prototype.{flat,flatMap}()](https://github.com/tc39/proposal-flatMap)

```js
// todo
```


## ES2020

* [String.prototype.matchAll()](https://github.com/tc39/String.prototype.matchAll)
* [import()](https://github.com/tc39/proposal-dynamic-import)
* [BigInt](https://github.com/tc39/proposal-bigint)
* [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled)
* [globalThis](https://github.com/tc39/proposal-global)
* [for-in mechanics](https://github.com/tc39/proposal-for-in-order)
* [Optional Chaining](https://github.com/tc39/proposal-optional-chaining)
* [Nullish coalescing Operator](https://github.com/tc39/proposal-nullish-coalescing)

```js
// todo
```


## ES.Next





