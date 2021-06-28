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

Original Value | to Number | to String         | to Boolean
---------------|-----------|-------------------|-------------
false          | 0         | "false"           | false
true           | 1         | "true"            | true
0              | 0         | "0"               | false
1              | 1         | "1"               | true
"0"            | 0         | "0"               | true
"000"          | 0         | "000"             | true
"1"            | 1         | "1"               | true
NaN            | NaN       | "NaN"             | false
Infinity       | Infinity  | "Infinity"        | true
-Infinity      | -Infinity | "-Infinity"       | true
""             | 0         | ""                | false
"20"           | 20        | "20"              | true
"twenty"       | NaN       | "twenty"          | true
[]             | 0         | ""                | true
[20]           | 20        | "20"              | true
[10,20]        | NaN       | "10,20"           | true
["twenty"]     | NaN       | "twenty"          | true
["ten","twen"] | NaN       | "ten,twen"        | true 
function(){  } | NaN       | "function(){  }"  | true
{}             | NaN       | "[object Object]" | true
null           | 0         | "null"            | false
undefined      | *NaN*     | "undefined"       | false

### 隐式转换

`==` 和 `!=` 两个操作符会先将被操作对象转换成同一类型后再进行全等比较。  
`<` `<=` `>` `>=` 这四个操作符则会先将被操作对象转换成原始值类型，然后再转换成相同类型进行比较。

类型转换遵循以下规则：
  * *null undefined 在比较时不会作转换*。数值运算时 null 转 0，undefined 转 NaN。本文运算转字面量对应字符串。
  * *Boolean 转 Number*，false 为 +0，true 为 1。
  * String 跟 Number 比较，*String 转 Number*，链接操作则是 Number 转 String。
  * Object 跟原始值类型比较，会调用 valueOf() 或 toString() 方法(先 valueOf 后 toString; 先自身定义的后原型链上的)。  
  另外，Object 转原始值类型时，如果确切知道需要的是 String 类型，则 toString() 方法优先于 valueOf()。

`+` 加号的处理  https://262.ecma-international.org/5.1/#sec-11.6
  * 只有一个操作数时为 _一元加法运算符_ ，相当于 Number()
  * 只要有一边为 string 就作为 _链接操作符_
  * 其他时候为 _加法运算符_

```js
// https://jsisweird.com/

true + false      // 0    析 https://262.ecma-international.org/5.1/#sec-11.6
[,,,].length      // 3
[1,2,3]+[4,5,6]   // "1,2,34,5,6"
0.2 + 0.3 === 0.3 // false
10,2              // 2
+!![]             // 1     析 Boolean([]) -> true
true == 'true'    // false 析 https://262.ecma-international.org/11.0/#sec-abstract-equality-comparison
010 - 03          // 5
'' - - ''         // 0     析  +0 - -0
0/0               // NaN   析  0/0 NaN   1/0 Infinity
true++            // SyntaxError  析  1++ SyntaxError   'x'++ SyntaxError   undefined++ NaN
undefined + false // NaN
+0 === -0         // true  析  Object.is(0, -0) false
```

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

1 + 2 + 3 + '4' === '64'  // 这个例子挺有用的，知道 JS 的内部执行逻辑的话就好理解
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


## 3.4.5.3 转换成字符串

`boolean` `number` `string` 这三种简单类型的有趣之处在于它们是伪对象，这意味着它们实际上具有属性和方法。如：

```js
var sColor = "red";
alert(sColor.length); // 输出 "3"，字符串拥有 length 属性
```

总而言之，数值、布尔值、对象和字符串值（没错，每个字符串也都有一个 toString()方法，该方法返回字符串的一个副本）都有 toString() 方法。但 `null` 和 `undefined` 值没有这个方法。

多数情况下，调用 toString() 方法不必传递参数，但是 Number 类型的 toString() 方法可以传递一个参数：输出数值的基数。HTML 采用十六进制表示每种颜色，在 HTML 中处理数字时这种功能非常有用。

```js
var iNum = 10;
alert(iNum.toString(2)); // 输出 "1010"
alert(iNum.toString(8)); // 输出 "12"
alert(iNum.toString(16)); // 输出 "A"
```

## 3.4.5.4 转换成数字

parseInt() 和 parseFloat() 专门用于把字符串转换成数值。

前者把值转换成整数，后者把值转换成浮点数。只有对 String 类型调用这些方法，它们才能正确运行；对其他类型返回的都是 NaN。

### parseInt()

+ 它会忽略字符串前面的空格，直到找到第一个非空格字符
+ 如果第一个字符不是数字字符或者负号，返回 NaN，也就是说，parseInt("") 返回 NaN，而 Number("")会返回 0
+ 小数点不会被当做数字字符
+ parseInt() 能够识别出各种整数格式（十进制、八进制*和十六进制）（ES5 下不再支持识别八进制值，将忽略前导 0 ）

parseInt() 方法还有基模式，基是由 parseInt() 方法的第二个参数指定的:

```js
var iNum1 = parseInt("10", 2); // 返回 2
var iNum2 = parseInt("10", 8); // 返回 8
var iNum3 = parseInt("10", 10); // 返回 10
```

建议：为避免错误的解析，建议无论在什么情况下都明确指定基数，多数情况下，该参数为 10

### parseFloat()

parseFloat() 方法与 parseInt() 方法的处理方式相似，从位置 0 开始查看每个字符，直到找到第一个非有效的字符为止，然后把该字符之前的字符串转换成数值。

* 第一个出现的小数点是有效字符。如果有两个小数点，第二个小数点将被看作无效的。
* parseFloat() _只解析十进制数值_，因此他没有基模式，同时也会忽略任何前导 0
* 如果字符串包含的是一个可解析为整数的数（没有小数点或小数点后都是0），将返回整数

```js
var fNum2 = parseFloat("0xA"); // 返回 0            只解析十进制数
var fNum4 = parseFloat("11.22.33"); // 返回 11.22   忽略第二个小数点
var fNum1 = parseFloat("red"); // 返回 NaN
```

## 强制类型转换

ECMAScript 中可用的 3 种强制类型转换如下：

* Boolean(value) - 把给定的值转换成 Boolean 值；
* Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；
* String(value) - 把给定的值转换成字符串；

### Boolean() 函数

当要转换的值是至少有一个字符的字符串、非 0 数字或对象时，Boolean() 函数将返回 true。如果该值是空字符串、数字 0、undefined 或
null，它将返回 false。

### Number() 函数

Number) 函数的强制类型转换与 parseInt() 和 parseFloat() 方法的处理方式相似，只是它 _转换的是整个值_ ，而不是部分值，如转换"1.2.3" 将返回 NaN，因为整个字符串值不能转换成数字。

|||
----------|----------------------------
Boolean   | true 转换为 1；false转换为 0
Number    | 简单的传入和返回
Null      | 返回 0
Undefined | 返回 NaN
String    | 下面单独说明
Object    | 调用对象的 valueof() 方法，然后依照前面的规则转换返回的值

字符串的转换逻辑
* 只包含有效的十六进制格式，例如0xf，则转换成等同的十进制整数
* 只包含数字（包括带正负号的情况），则将其转换为十进制数值（前导0会被忽略）
* 只包含有效的浮点格式，如1.3，则将其转换为对应的浮点数值（前导0会被忽略）
* 包含除上述格式之外的字符，则返回 NaN

注：一元操作符 + 的操作与 Number() 函数相同。  
注：由于 Number() 函数在转换字符串时比较复杂而且不够合理，所以应该优先使用 parseInt() parseFloat()

### String() 函数

最后一种强制类型转换方法 String() 是最简单的，因为它可把任何值转换成字符串。

强制转换 与 toString() 方法的唯一不同之处在于，可以转换 null 和 undefined 而不引发错误。

```js
var s1 = String(null); // "null"
var s2 = null.toString(); // 会引发错误
```
