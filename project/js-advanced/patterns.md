# JavaScript Patterns

## 简介

目录：

* 模式
* JS 基本概念
* ES5
* JSLint
* Console

在软件开发中，模式是指一个通用问题的解决方案。

ES5 增加了严格模式，该模式实际上是从 JS 语言中移除了一些特性，使得程序更为简洁和不易出错。

## 基本技巧

目录

* 编写可维护代码
* 尽量少用全局变量
* for 循环
* for-in 循环
* 不要增加内置的原型
* switch 模式
* 避免使用隐式类型转换，比较语句使用 `===` `!==` 操作符
* 避免使用 `eval()`，会带来安全隐患，并可能影响当前执行环境。必要时可考虑用 `new Function()` 代替。 另外，通过 `setInterval()` `setTimeout()` 和 `function()` 等构造函数来传递参数也有类似隐患。
* 使用 parseInt() 的数值约定，在现代代码中，应该使用 ES6 的 `Number.parseInt()` 避免解析歧义。
* 编码约定，确定编码约定往往会引发激烈讨论，但确定并一致遵循约定比约定内容本身更为重要。
* 命名约定
* 编写注释
* 编写 API 文档，通过 JSDoc 自动生成文档。
* 编写可读性强的代码
* 同行互查(代码评审)可以使得审查人和代码编写者可以交换和共享知识。
* 在正式发布时精简代码，利用工具精简脚本可以大大缩小代码体积，加速页面载入速度(提升页面性能)。
* 运行 JSLint
* 小结

### 尽量少用全局变量

后面我们会研究最小化全局变量的数量的方法，如命名空间模式或自执行立即生效函数。

不使用 `var` 创建的隐含全局变量可以通过 `delete` 操作符删除，这表明隐含全局变量严格来讲不是真正的变量，而是全局对象的属性。属性可以通过 `delete` 操作符删除，但变量不可以。

在 ES5 严格模式中，为没有声明的变量赋值会抛出错误。

### 单 `var` 模式

变量提升：

```js
myname = "global";
function func() {
  console.log(myname);   // undefined 注意不是 global
  var myname = "local";
  console.log(myname);   // local
}
```

实际上 ES 标准中并没有 "提升" 这一说法，实际涉及到执行链和变量查找，只是用 "提升" 来表述比较简洁。

### for 循环

```js
for (var i = 0; i < myarray.length; i++) { }                   // 改进前
for (var i = 0, length = myarray.length; i < length; i++) { }  // 改进后
for (var i = myarray.length; i--;) { }                         // 更进一步(细微优化)，最小变量 + 减轻计算
  // 注：for 结构的 3个语句都是可选的，但 2个 `;` 不可省略
```

这种模式的问题在于每次循环都要访问数组的长度，这样会使代码变慢，特别，当 myarray 不是数组而是 DOM 集合时(每次都要实时去查询一遍 DOM 树，而这是极其耗费性能的)。

改进后需要注意的是，当 for 循环内部会改变 `length` 数值的话，需要在循环内部更新 `length` 的值。 


### for-in 循环

for-in 循环也被称为 "枚举"，用来遍历非数组对象。

当然 for-in 也适用于数组，但是不推荐用于数组，ES5 中专门提供了 `forEach()` 方法。

`hasOwnProperty()` 方法用于过滤原型链上的属性。ES5 中提供的 `keys()` 方法用于获取对象的自有可遍历属性名称。


### 不要修改内置对象原型

修改内置对象原型是一个增强功能的强大方法，但这会严重影响可维护性。


## 字面量和构造函数

避免使用构造函数，因为字面量更为直观，更少字符录入，还有就是没有作用域解析(如 `new Object()` 时需要逐层向上查找 `Object` 函数)。

 Built-in constructors (avoid)   | Literals and primitives (prefer)
 ------------------------------- | ---------------------------------
 `var o = new Object();`         | `var o = {};`
 `var a = new Array();`          | `var a = [];`
 `var r = new RegExp('\\w','g')` | `var r = /\w/g;`
 `var s = new String('str')`     | `var s = 'str';`
 `var n = new Number();`         | `var n = 0;`
 `var b = new Boolean();`        | `var b = false;`
 `throw new Error('oops')`       | <s>`throw {name: 'Error', message: 'oops'}`</s>

### 对象字面量

对象中以逗号分隔属性和方法，在最后一个键值对后添加逗号是允许的，但老的 IE 会出错，后来 ES 标准明确允许添加逗号。

当给变量赋值时，不要忘记右大括号后的分号。

不使用 `new Object()` 的另外一个理由是，将数字、字符串、布尔值传递到构造函数中，结果获得了不同类型的对象：

```js
new Object().constructor === Object;
new Object(1).constructor === Number;
new Object('').constructor === String;
new Object(true).constructor === Boolean;
```

当使用构造函数时，必须确保强制使用 `new` 操作符。在 ES3 中，如果忘记使用 `new` 则，构造函数内的 `this` 会指向全局的 `window`。在 ES5 中采取了一些措施来规避此问题，严格模式下，`this` 不会指向全局对象。

### 数组字面量

避开 `new Array()` 的另外一个理由是用于避免构造函数中可能产生的陷阱：

```js
let a = new Array(3);    // 生成 [undefined, undefined, undefined] 而不是 [3]
let b = new Array(3.14); // 报错 RangeError: Invalid array length
```

有时利用 `Array()` 构造函数也有一些灵巧的用法，比如重复字符串：

```js
let str = new Array(256).join(' ');  // 创建一个 255 个空白字符的字符串
```

使用 `instanceof Array` 来检查是否是数组，但在某些老版本 IE 中工作不正常，ES5 增加了 `Array.isArray()` 来判定是否数组。


### JSON

JSON 并没有任何新的知识，它只是一个数组和对象字面量表示方法的组合。

JSON 和对象字面量之间的语法差异在于，JSON 中属性名称需要包裹在引号内，另外 JSON 中最后一条键值对之后也不能带 `,`，还有就是，JSON 不支持注释。

在 JSON 字符串中，不能使用函数或正则表达式字面量。

### 正则表达式字面量

```js
// 创建一个匹配反斜杠的正则，字面量的写法更加简洁
var re = /\\/gm;
var re = new RegExp('\\\\', 'gm');
```

使用 `new RegExp()` 的原因之一在于，某些场景中无法确定模式，只能在运行时求值。

调用 `RegExp()` 带或者不带 `new` 的效果是一样的。

### 基本类型包装器

JS 中的五个基本值类型。除了 null 和 undefined 以外，其他三个都具有基本包装对象。

```js
var primitiveStr = 'str',
    objectiveStr = new String('str');
typeof primitiveStr;  // string
typeof objectiveStr;  // object
```

这3个类型的基本值，也能够调用对应对象的方法，因为在处理瞬间会被临时转换成对象。所以一般情况下没有必要使用对象。通常使用包装对象的原因之一是，您有扩充值以及持久保存状态的需要。

```js
var greet = 'Hello there';
greet.smile = true;
greet.simile;  // undefined
```

### 错误对象

JS 中有一些内置错误构造函数，如 `Error()` `SyntaxError` `TypeError` 等，他们的实例都具有 `name` `message` 这两个属性。

`throw` 用于抛出这些错误对象，当然，也可以抛出任何其他对象，通过 `catch` 语句来捕获这些对象。


## 函数

JS 中函数有两个主要特点使其显得比较特殊。第一个特点在于函数是头等对象 first-class object，第二个特点在于它们可以提供作用域。

在 ES6 之前，JS 不支持块级作用域，仅存在函数作用域。ES5 中，在涉及控制变量作用域的地方，函数是必不可少的工具。

### 基础

#### 术语

函数表达式 function expression  
函数声明 function declaration  

命名函数 named function  
匿名函数 anonymous function  

函数字面量 function literal - 这个术语也比较常用，指的是函数表达式

#### 函数声明和函数表达式在提升时的区别

函数表达式与函数声明最主要的区别在于提升行为 hoisting。所有变量，无论在函数体的何处进行声明，都会在后台被提升到函数顶部。函数声明比较特殊的地方是，函数定义也被提升，所以函数声明之前就可以调用函数，而通过函数表达式定义的函数，需要在赋值后才能调用。

#### 函数名

`name` 属性是 JS 的一个扩展，但在许多环境中得到了广泛应用，特别是调试代码时很有用。ES6 中正式引入了标准。

```js
let foo = function bar() { };
foo.name;  // 'bar'
```

### 回调模式


### 立即执行函数


### 柯里化 Curry



















