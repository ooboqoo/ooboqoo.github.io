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

#### [Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread)

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

#### [Promise.prototype.finally()](https://github.com/tc39/proposal-promise-finally)

#### [Asynchronous Iteration](https://github.com/tc39/proposal-async-iteration)

```js
async function* foo() {
  yield 1;
  yield 2;
}

(async function () {
  for await (const num of foo()) {
    console.log(num);
  }
})();
```

#### [Lifting template literal restriction](https://github.com/tc39/proposal-template-literal-revision)

Tags allow you to parse template literals with a function. The first argument of a tag function contains an array of string values. The remaining arguments are related to the expressions.

```js
const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp < 100 ? "youngster" : "centenarian";

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That Mike is a youngster.
```

#### [s (dotAll) flag for regular expressions](https://github.com/tc39/proposal-regexp-dotall-flag)
#### [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups)
#### [RegExp Lookbehind Assertions](https://github.com/tc39/proposal-regexp-lookbehind)
#### [RegExp Unicode Property Escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes)


## ES2019

#### [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)

```js
try {
  // ...
} catch {  // `()` 可省略
  // ...
}
```

#### [JSON superset](https://github.com/tc39/proposal-json-superset)
#### [Symbol.prototype.description](https://github.com/tc39/proposal-Symbol-description)
#### [Function.prototype.toString() revision](https://github.com/tc39/Function-prototype-toString-revision)
#### [Object.fromEntries()](https://github.com/tc39/proposal-object-from-entries)
#### [Well-formed JSON.stringify()](https://github.com/tc39/proposal-well-formed-stringify)
#### [String.prototype.{trimStart,trimEnd}()](https://github.com/tc39/proposal-string-left-right-trim)
#### [Array.prototype.{flat,flatMap}()](https://github.com/tc39/proposal-flatMap)

```js
// todo
```


## ES2020

#### [String.prototype.matchAll()](https://github.com/tc39/String.prototype.matchAll)


#### [import()](https://github.com/tc39/proposal-dynamic-import)

```js
import(`./language-packs/${navigator.language}.js`)
```

#### [BigInt](https://github.com/tc39/proposal-bigint)



#### [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled)

```js
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

#### [globalThis](https://github.com/tc39/proposal-global)

It is difficult to write portable ECMAScript code which accesses the global object. On the web, it is accessible as `window` or `self` or `this` or `frames`; on node.js, it is `global` or `this`;

#### [for-in mechanics](https://github.com/tc39/proposal-for-in-order)



#### [Optional Chaining](https://github.com/tc39/proposal-optional-chaining)

The Optional Chaining operator is spelled `?.`. It may appear in three positions:

```js
obj?.prop       // optional static property access
obj?.[expr]     // optional dynamic property access
func?.(...args) // optional function or method call
```

#### [Nullish coalescing Operator](https://github.com/tc39/proposal-nullish-coalescing)

```js
let val = nullValue ?? 'some other default'
```


## ES2021

#### [String.prototype.replaceAll](https://github.com/tc39/proposal-string-replaceall)


#### [Promise.any](https://github.com/tc39/proposal-promise-any)

```js
try {
  const first = await Promise.any(promises);
  // Any of the promises was fulfilled.
} catch (error) {
  // All of the promises were rejected.
}
```

#### [WeakRefs](https://github.com/tc39/proposal-weakrefs)

#### [Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment)

#### [Numeric separators](https://github.com/tc39/proposal-numeric-separator)


## ES2022

#### [Private Class Fields]()
#### [RegExp Match Indices](https://github.com/tc39/proposal-regexp-match-indices)
#### [Top-level await](https://github.com/tc39/proposal-top-level-await)
#### [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in)

#### [.at()](https://github.com/tc39/proposal-relative-indexing-method)

```js
'abc'.at(-1) === 'c'
```

#### [Accessible Object.prototype.hasOwnProperty](https://github.com/tc39/proposal-accessible-object-hasownproperty)

```js
const person = Object.create({ name: 'Tom' })
person.age = 18;
console.log(Object.hasOwn(person, 'name')); // false
console.log(Object.hasOwn(person, 'age')); // true

// 遇到这种情况 hasOwnProperty 会报错
const p1 = null
console.log(p1.hasOwnProperty('name')); // TypeError: Cannot read properties of null
```


* [Class Static Block](https://github.com/tc39/proposal-class-static-block)
* [Error Cause](https://github.com/tc39/proposal-error-cause)


## ES2023

* [Array find from last](https://github.com/tc39/proposal-array-find-from-last)
* [Hashbang Grammar](https://github.com/tc39/proposal-hashbang)
* [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)
* [Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)


## ES.Next





