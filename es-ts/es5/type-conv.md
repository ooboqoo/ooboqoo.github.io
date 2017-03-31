# JavaScript 类型转换

> 类型转换属于 JS 语言的糟粕部分，能不用尽量避免

JS 的变量是松散类型的，可以存储 JS 支持的任何数据类型，其变量的类型可以在运行时被动态改变。  
实际编程中，我们建议不要频繁改变变量的类型，因为这对调试没有好处。  
正因为Javascript中变量类型具有动态性，在程序实际执行的过程中就需要用到类型转换的概念。  
类型转换可以分为隐式转换和显式转换，所谓隐式转换即程序在运行时进行的自动转换，显式转换则是人为的对类型进行强制转换。

```js
// 变量的动态性
var n = 10;
n = "Hello World!";
n = {};
```

### JS 数据类型

在 JavaScript 中有(此处表述不是很严谨)：
  * 5 种不同的数据类型：string number boolean object function
  * 3 种对象类型：Object Date Array
  * 2 个不包含任何值的数据类型：null undefined

### `typeof` 操作符

你可以使用 typeof 操作符来查看 JavaScript 变量的数据类型。

| Type      | Result
|-----------|------------------------------------------------------------------------
| Undefined | "undefined"
| Null      | **"object"**
| Boolean   | "boolean"
| Number    | "number"
| String    | "string"
| Symbol (new in ECMAScript 2015)                         | "symbol"
| Function object (implements [[Call]] in ECMA-262 terms) | **"function"**
| Host object (provided by the JS environment)            | Implementation-dependent
| Any other object                                        | "object"

```js
typeof null                   // 返回 object
typeof NaN                    // 返回 number
typeof function() {}          // 返回 function
typeof myCar                  // 返回 undefined (如果 myCar 没有声明)

typeof "John"                 // 返回 string 
typeof 3.14                   // 返回 number
typeof false                  // 返回 boolean
typeof [1,2,3,4]              // 返回 object
typeof {name:'John', age:34}  // 返回 object
typeof new Date()             // 返回 object
```

### `instanceof` 操作符 和 `constructor` 属性

`instanceof` 通过查找原型链来确认是否属于一个类(或其子类)的实例。

而 `constructor` 属性可以用来判断是否是某个类的实例。

```js
class SubArray extends Array { }
let arr = new SubArray();
arr instanceof Array          // true
arr instanceof SubArray       // true
arr.constructor === Array     // false
arr.constructor === SubArray  // true
```


## 类型转换

### 显示转换

| Original Value | to Number | to String         | to Boolean
|----------------|-----------|-------------------|-------------
| false          | 0         | "false"           | false
| true           | 1         | "true"            | true
| 0              | 0         | "0"               | false
| 1              | 1         | "1"               | true
| "0"            | 0         | "0"               | true
| "000"          | 0         | "000"             | true
| "1"            | 1         | "1"               | true
| NaN            | NaN       | "NaN"             | false
| Infinity       | Infinity  | "Infinity"        | true
| -Infinity      | -Infinity | "-Infinity"       | true
| ""             | 0         | ""                | false
| "20"           | 20        | "20"              | true
| "twenty"       | NaN       | "twenty"          | true
| []             | 0         | ""                | true
| [20]           | 20        | "20"              | true
| [10,20]        | NaN       | "10,20"           | true
| ["twenty"]     | NaN       | "twenty"          | true
| ["ten","twen"] | NaN       | "ten,twen"        | true 
| function(){  } | NaN       | "function(){  }"  | true
| {}             | NaN       | "[object Object]" | true
| null           | 0         | "null"            | false
| undefined      | NaN       | "undefined"       | false

### 隐式转换

`==` 和 `!=` 两个操作符会先将被操作对象转换成同一类型后再进行全等比较。  
`<` `<=` `>` `>=` 这四个操作符则会先将被操作对象转换成原始值类型，然后再转换成相同类型进行比较。

类型转换遵循以下规则：
  * Boolean 转成 Number，false 为 +0，true 为 1。
  * String 跟 Number 比，String 转 Number。
  * Object 跟原始值类型比，会调用 valueOf() 或 toString() 方法(先 valueOf 后 toString; 先自身定义的后原型链上的)。

在比较时，`==` `!=` 两个运算符还遵守下列规则：
  * 值 null 和 undefined 相等。
  * 不会对 null 和 undefined 进行类型转换。
  * NaN 跟任何值都不相等，甚至 NaN 都不等于 NaN。
  * 对象跟对象比，不会进行类型转换，如果指向的不是同一个对象，就返回 false。

再补充几条自己总结的：
  * `+` 运算，优先认为是字符串链接操作，Null Undefined Boolean Number(含 NaN) 都能成功转换成 String 类型
  * 与数值进行运算，`null` 为 `0`, `undefined` 为 `NaN`, `false` 为 `0`, `true` 为 `1`, String 类型转为对应 数值或`NaN`

```js
let d = new Date();
1 + d === "1Fri Mar 31 2017 15:38:47 GMT+0800 (中国标准时间)"  // 调用 d.toString()
1 - d === -1490945927920                                       // 调用 d.valueOf()
d + 1 === "Fri Mar 31 2017 15:38:47 GMT+0800 (中国标准时间)1"
d - 1 === 1490945927920

{}  + '0' === 0                   // 第一个 {} 被认为是 代码块，差点搞晕
'0' + {}  === '0[object Object]'  // 换个顺序，这会就正常了
{} - '0' === -0
'0' - {} === NaN
```


```js
null +  1  === 1
null + '1' === 'null1'
null -  1  === -1
null - '1' === -1

undefined +  1  === NaN
undefined + '1' === 'undefined1'
undefined -  1  === -1
undefined - '1' === -1

NaN +  1  === NaN
NaN + '1' === 'NaN1'
NaN - '1' === NaN 

true  + 1   === 2
false + 1   === 1
true  - 1   === 0
false - 1   === -1

true  + '1' === 'true1'
false + '1' === 'false1'
true  - '1' === 0
false - '1' === -1

'1' + 1 === '11'
'1' - 1 === 0

[]     + false  ===    'false'
[1]    + false  ===   '1false'
[1, 2] + false  === '1,2false'

[]     - false === 0
[1]    - false === 1
[1, 2] - false === NaN

{}        + false === 0
null      + false === 0
{age: 32} + false === 0  // 对象行为跟数组不一样

{}  + '0' === 0
'0' + {}  === '0[object Object]'  // 换个顺序就不一样了，坑
{} - '0' === -0
'0' - {} === NaN

{}        - false === -0
null      - false === 0
{age: 32} - false === -0
```

### `==` `!=` 中的表现

```js
null == undefined

null  != 0
false == 0

[] == 0

({}) != 0  // 不加括号报错
({}) != 1
({}) != []
```

```js

let conv = {valueOf() { return '123'; }, toString() { return '456'; }};
conv + 1 === '1231'
conv - 1 === 122
conv = {toString() { return '456'; }};
conv + 1 === '4561'
conv - 1 === 455
conv = {valueOf() { return 123; }, toString() { return '456'; }};
conv + 1 = 124



let d = new Date();
1 + d === "1Fri Mar 31 2017 15:36:16 GMT+0800 (中国标准时间)"
1 - d === -1490945776127

```