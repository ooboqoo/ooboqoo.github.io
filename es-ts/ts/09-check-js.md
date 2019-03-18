# JavaScript 文件类型检查

https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76

```js
/** @type {number} */
var x

class C {
  constructor() {
    /** @type {number | undefined} */
    this.prop = undefined
    /** @type {number | undefined} */
    this.count
  }
}

/** @type {{a: number}} */
var obj = { a: 1 }

/** @param {...number} args */
function sum(/* numbers */) { }

/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
}

```

类型定义及跨文件复用

_aa.js_

```js
/**
 * 服务端下发的音视频服务配置信息
 * @typedef {Object<string, any>} Config
 * @property {string} key  某KEY
 * @property {number} id   某ID
 */
```

_bb.js_

```js
/**
 * @typedef {import('aa').Config} Config
 */

/** @param {Config} config */
function foo (config) { }
```


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

```js
/** @type {Window} */
var win

/** @type {PromiseLike<string>} */
var promisedString

/** @type {HTMLElement} */
var myElement = document.querySelector(selector)

/** @type {string | boolean} */
var sb

/** @type {number[]} */
var arr

/** @type {Object.<string, any>}  specify object using standard JSDoc syntax*/
var obj1
/** @type {{[x: string]: any}}  specify object using Typescript syntax*/
var obj2
/** @type {{a: string, b: number}}  specify object literal types*/
var obj3

/** @type {Function} */
var fn1
/** @type {function(string, boolean): number}  Closure syntax */
var fn2
/** @type {(s: string, b: boolean) => number}  Typescript syntax */
var sfn3

// Casts ===========================================================

/** @type {number | string} */
var numberOrString = Math.random() < 0.5 ? "hello" : 100
var typeAssertedNumber = /** @type {number} */ (numberOrString)

// Import types ====================================================
'This syntax is Typescript-specific and differs from the JSDoc standard'

/** @param p { import("./a").Pet } */
function walk(p) { }

/** @typedef Pet { import("./a").Pet } */
/** @type {Pet} */
var myPet

/** @type {typeof import("./a").x }  直接导入一个变量的类型*/
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

### 类型检查报错解决

文档：[Type Checking and Quick Fixes for JavaScript Files](https://code.visualstudio.com/docs/languages/javascript#_type-checking-and-quick-fixes-for-javascript-files) / 
[Global Variables and Type Checking](https://code.visualstudio.com/docs/languages/javascript#_global-variables-and-type-checking)

只要安装 `@types` 下的包就不会再有报错，如果只是个别全局变量啥的，可以在项目根目录添加以下两个文件解决：

```js
// jsconfig.json
{
    "compilerOptions": { },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

```js
// global.d.ts
declare var anyGlobalVar: any;
declare interface Window {
    FileReader: any
}

// 方案2, 模块写法，前一种无效可试试这种方案，但官方文档用的第一种
declare global {
    var define;
    var require;
    var angular;
    var $;
    interface Window {  // vscode有提示只有在模块内才支持对 Window 的扩展
        urlParams: any;
    }
}
export {}
```



