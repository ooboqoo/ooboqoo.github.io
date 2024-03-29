# TypeScript 配置

浏览器不能直接执行 ts 文件，得先用 tsc 编译器转译 (transpile) 成 JS 代码，这项工作需要进行一定的配置。

## tsconfig.json - 编译器配置

```js
{
  "compilerOptions": {
    "target": "ES5",
    "module": "ES2015",           // 这里还是采用了 node 的模块方案
    "moduleResolution": "Node",     // 查找模块采用的策略，Classic 或 Node
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,


    "strict": true,  // 这个已经包含下面两项了
    "noImplicitAny": true,
    "strictNullChecks": true,

    "suppressImplicitAnyIndexErrors": true  // 当 noImplicitAny 为 true 时，不报 implicit index errors

  },
  "exclude": [ "node_modules" ]
}
```

> 详细编译选项介绍：https://www.typescriptlang.org/docs/handbook/compiler-options.html

### tsconfig.json 说明

如果一个目录下存在一个 tsconfig.json 文件，那么它意味着这个目录是 TypeScript 项目的根目录。

tsconfig.json 文件中指定了用来编译这个项目的根文件和编译选项。

不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，如未找到则继续逐级向上搜索直至失败。

#### `files` `include` `exclude` 选项

* 优先级：files > exclude > include
* 如果没有指定 files 和 include 其中任何一项，则默认包含项目内所有 TypeScript 文档 (.ts / .d.ts / .tsx)
* 如果指定了 files 和 / 或 include，则其他未指定文档不会被编译，但所有被待编译文件所引用的文件都会被编译
* 如果指定了 exclude，则会被用于过滤 include 指定的项目，但 files 中指定的项目不受影响
* exclude 默认包含 node_modules, bower_components, jspm_packages 及 outDir 配置项中指定的目录
* 当命令行上指定了输入文件时，tsconfig.json 文件中的相关设置会被忽略


## 类型声明文件管理

> 从 TS2.0 开始，不再需要 typings 工具，而是直接使用  npm 包管理工具，也就是说，声明文件会以  npm 包的形式提供

* TS 需要类型声明文件来理解各个库专有的特性和语法，如果找不到需要的 .d.ts 文件，tsc 编译器就会报错；
* 另外一个附加功能是，很多编辑器可以通过读取声明文件中的 JSDoc 注释，来给开发者提供一些实时文档信息。

很多 JavaScript 库，如 jQuery Jasmine Angular 等，会通过新的特性和语法来扩展 JavaScript 环境。而 TypeScript 编译器并不能原生的识别它们。我们需要使用 TypeScript 类型定义文件 .d.ts 文件来告诉编译器要加载的库的类型定义。

很多库在自己的 npm 包中都包含了它们的类型定义文件，TypeScript 编译器和编辑器都能找到它们，Angular 库就是这样的。遗憾的是，很多如 jQuery、Jasmine 和 Lodash 等库都没有在它们自己的 npm 包中包含 .d.ts 文件。幸运的是，它们的作者或社区中的贡献者已经为这些库创建了独立的 .d.ts 文件。

### lib.d.ts

TypeScript 自身带有一个特殊的声明文件 lib.d.ts，该文件包含了 JavaScript 运行库和 DOM 的各种常用 JavaScript 环境声明。

基于--target，TypeScript 会自动添加额外的环境声明，当然我们还可以自己调整配置：

```js
"lib": ["ES2015", "DOM"]
```

### 安装类型定义文件

使用不带声明文件的库之前，我们需要安装配套的 .d.ts 文件：

```bash
$ npm install @types/node --save-dev
$ npm install @types/jasmine --save-dev
```



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

// @ts-nocheck
console.log('上面这一行放文件顶部，ts 就不会检查这个文件')
```

