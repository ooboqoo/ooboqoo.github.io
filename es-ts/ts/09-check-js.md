# JavaScript 类型检查

http://usejsdoc.org/index.html  
https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76  
https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler


## VSCode

### 支持的标记

https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript

```
@type
@param or @arg or @argument
@returns or @return
@typedef
@callback
@template
@class or @constructor
@this
@extends or @augments
@enum
```

`@type`

http://usejsdoc.org/tags-type.html

```js
/** @type {Window} */
var win

/** @type {PromiseLike<string>} */
var promisedString

/** @type {HTMLElement} */
var myElement = document.querySelector(selector)

/** @type {string|boolean} */
var sb

/** @type {?number} nullable type */
/** @type {!number} non-nullable type */

/** @type {number[]} */
var arr

/** @type {Object.<string, any>}  specify object using standard JSDoc syntax*/
var obj1
/** @type {Object<string, any>}  specify object using Closure syntax*/
var obj2
/** @type {{[x: string]: any}}  specify object using Typescript syntax*/
var obj3
/** @type {{a: string, b: number}}  specify object literal types*/
var obj4 = {a: 'me', b: 123}

/** @type {Function} */
var fn1
/** @type {function(string, boolean): number}  Closure syntax */
var fn2
/** @type {(s: string, b: boolean) => number}  Typescript syntax */
var sfn3

/**
 * @param {number} [foo]    JSDoc's syntax for optional parameters
 * @param {number} [foo=1]
 * @param {number=} foo     Closure's syntax for optional argument
 */
function (foo) { }

/** @param {...number} num */
function sum (...nums) { return nums.reduce((a, b) => a += b, 0) }

// Casts ===========================================================

/** @type {number|string} */
var numberOrString = Math.random() < 0.5 ? "hello" : 100
var typeAssertedNumber = /** @type {number} */ (numberOrString)

// Import types ====================================================
'This syntax is Typescript-specific and differs from the JSDoc standard'

/** @param {import("./a").Pet} p */
function walk(p) { }

/** @typedef {import("./a").Pet} Pet */
/** @type {Pet} */
var myPet

/** @type {typeof import("./a").x}  直接导入一个变量的类型*/
var x = require("./a").x
```

`@param` and `@returns`

```js
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {PromiseLike<string>} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4){
  // TODO
}
```

`@typedef` `@callback` and `@param`

```js
/**
 * @typedef  {Object} SpecialType  - creates a new type named 'SpecialType'
 * @property {string}   prop1      - a string property of SpecialType
 * @property {number}   prop2      - a number property of SpecialType
 * @property {number=}  prop3      - an optional number property of SpecialType
 * @prop     {number}   [prop4]    - an optional number property of SpecialType
 * @prop     {number}   [prop5=42] - an optional number property of SpecialType with default
 */

/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string}   options.prop1
 * @param {number}   options.prop2
 * @param {number=}  options.prop3
 * @param {number}   [options.prop4]
 * @param {number}   [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}

/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predicate} */
const ok = s => !(s.length % 2);

/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */
```

`@enum`

这个 `@enum` 跟 JS 的 Object 以及 TS 的 enum 都有较大区别:
  * JS 中的对象可随时增删属性，但这里属性是固定的，不可增删
  * TS 中的 enum 是一种单独的类型，而这里只要求各属性的值类型统一即可

```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
}

/** @enum {function(number): number} */
const Math = {
  add1: n => n + 1,
  id: n => -n,
  sub1: n => n - 1,
}

```

## 类型检查报错解决

https://code.visualstudio.com/docs/languages/javascript

### 全局变量

只要安装 `@types` 下的包就不会再有报错，如果只是个别全局变量啥的，可以在项目根目录添加以下两个文件解决：

```js
// jsconfig.json
{
    "compilerOptions": {
      "checkJs": true    // 官方文档说这项是默认添加的，实际没有，花了很多时间才发现这一点
    },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

```js
// globals.d.ts
declare var anyGlobalVar: any;
declare interface Window {
    FileReader: any
}
```

### 特定文件或行

```js
// @ts-ignore
console.log('不会检查这一行')

// @ts-nochek
console.log('上面这一行放文件顶部，ts 就不会检查这个文件')
```
