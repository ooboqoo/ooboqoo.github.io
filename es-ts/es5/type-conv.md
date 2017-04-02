# JavaScript 类型转换

> 类型转换属于 JS 语言的糟粕部分，能不用尽量避免

JS 的变量是松散类型的，可以存储 JS 支持的任何数据类型，其变量的类型可以在运行时被动态改变。  
实际编程中，我们建议不要频繁改变变量的类型，因为这对调试没有好处。  
正因为 JS 中变量类型具有动态性，在程序实际执行的过程中就需要用到类型转换的概念。  
类型转换可以分为隐式转换和显式转换，所谓隐式转换即程序在运行时进行的自动转换，显式转换则是人为的对类型进行强制转换。

```js
// 变量的动态性
var n = 10;
n = "Hello World!";
n = {};
```


### `typeof` 操作符

你可以使用 typeof 操作符来查看 JavaScript 变量的数据类型。

| Type                                                    | Result
|---------------------------------------------------------|--------------------------
| Undefined                                               | "undefined"
| Null                                                    | **"object"**
| Boolean                                                 | "boolean"
| Number                                                  | "number"
| String                                                  | "string"
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

### 显式转换

利用 Number() String() Boolean() 可实现显式转换。

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
  * null undefined 在比较时不会作转换。数值运算时 null 转 0，undefined 转 NaN。本文运算转字面量对应字符串。
  * Boolean 转成 Number，false 为 +0，true 为 1。
  * String 跟 Number 比较，String 转 Number，链接操作则是 Number 转 String。
  * Object 跟原始值类型比较，会调用 valueOf() 或 toString() 方法(先 valueOf 后 toString; 先自身定义的后原型链上的)。  
    另外，Object 转原始值类型时，如果确切知道需要的是 String 类型，则 toString() 方法优先于 valueOf()。

```js
// 详见 http://www.ecma-international.org/ecma-262/5.1/#sec-8.12.8
let conv = {valueOf() { return '123'; }, toString() { return '456'; }};
conv + 1 === '1231'
conv - 1 === 122
alert(conv);         // '456'
conv = {toString() { return '456'; }};
conv + 1 === '4561'
conv - 1 === 455
conv = {valueOf() { return 123; }, toString() { return '456'; }};
conv + 1 = 124

let d = new Date();
1 + d === "1Fri Mar 31 2017 15:38:47 GMT+0800 (中国标准时间)"  // 调用 d.toString()
1 - d === -1490945927920                                       // 调用 d.valueOf()

{}  + '0' === 0                   // 第一个 {} 被认为是 代码块，差点搞晕
'0' + {}  === '0[object Object]'  // 换个顺序，这会就正常了
{} - '0' === -0
'0' - {} === NaN

1 + 2 + 3 + '4' === '64'  // 这个例子挺有用的
```

### `==` `!=` 中的表现

```js
null == undefined

null  != 0
false == 0

[] == 0
'' == 0
({}) == '[object Object]' 
```
