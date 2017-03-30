# let const var 的联系和区别

## ES5 中的 var 和 function

### 没有块级作用域

ES5 中只有全局作用域 和 用函数分隔的局部作用域，没有块级作用域。

### 全局变量

所有在函数外面声明的变量都处于全局作用域中。每一个在函数外部声明或者定义的变量都是一个全局对象，所以这个变量可以在任何地方被使用。

如果一个变量第一次初始化/声明的时候没有使用var关键字，那么他自动加入到全局作用域中。

### 变量提升

```js
var name = "Gavin";
showName ();  // function 定义的函数会提升到头部，所以这里可以正常使用
function showName () {
  console.log ("First Name: " + name);  // 输出 First Name: undefined，因为存在变量提升，所以值为 undefined
  var name = "Ford";
  console.log ("Last Name: " + name);   // 输出 Last Name: Ford
}
```

上面 showName() 实际执行时相当于：

```js
function showName () {
  var name;
  console.log ("First Name: " + name);
  name = "Ford";
  console.log ("Last Name: " + name);
}
```

## ES5 中的严格模式  [##](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

## let 命令

`let` 声明的变量只在代码块内有效。

有了 let 命令，for 循环的计数器就可以和其他语言一样随时用随时定义了。

### 不存在变量提升

let 不像 var 那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

### 暂时性死区

只要块级作用域内存在 let 命令，它所声明的变量就绑定到其所在作用域，不再受外部的影响。在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

“暂时性死区”也意味着 typeof 不再是一个百分之百安全的操作。如果变量不存在，typeof 还是和以前一样返回 undefined，但是在暂时性死区内引用变量，就会报错。

ES6规定暂时性死区和不存在变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

### 块级作用域

ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。let 实际上为 JavaScript 新增了块级作用域。

### 块级作用域与函数声明

ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。浏览器没有遵守这个规定，还是支持在块级作用域之中声明函数，不过，“严格模式”下还是会报错。

ES6引入了块级作用域，明确允许在块级作用域之中声明函数，该函数的作用域仅限于块级作用域之内。

考虑到不同浏览器实现差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

## const 命令

const 命令与 let 命令的唯一区别就是，const 定义的是常量，声明常量时必须同时初始化，后续无法更改。

ES5只有 `var` `function` 这两种声明变量的方法，ES6 添加了 `let` `const` `import` `class` 命令，所以，ES6一共有6种声明变量的方法。

## 全局对象的属性

ES5之中，全局对象的属性与全局变量是等价的，未声明的全局变量，自动成为全局对象window的属性，这被认为是JavaScript语言最大的设计败笔之一。

ES6为了改变这一点，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。

## 总结

正常情况下，应始终使用 `let` 和 `const` 来替代 `var`

# Destructuring for Easier Data Access

## 数组的解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```js
var [bar, foo] = [1];    // bar 1, foo: undefined
let [x, y] = [1, 2, 3];  // x: 1,   y: 2
let [a, [b], d] = [1, [2, 3], 4];  // a: 1, b: 2, d: 4
```

如果等号的右边不是可遍历的结构，那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
```

上面的表达式都会报错，因为等号右边的值转为对象以后不具备Iterator接口。

解构赋值允许指定默认值：

```js
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
let [x = 1, y = x] = [2];    // x=2，y=2
```

## 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
var { bar, foo } = { foo: "aaa", bar: "bbb" };  // foo: "aaa", bar: "bbb"
var { baz } = { foo: "aaa", bar: "bbb" };       // baz: undefined
var { foo: baz } = { foo: "aaa", bar: "bbb" };  // baz: "aaa"
```

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
var { foo: baz } = { foo: "aaa", bar: "bbb" };  // baz: "aaa", foo: error: foo is not defined
```

## 字符串的解构

```js
const [a, b, ...c] = 'hello';  // a: "h", b: "e", c: ["l", "l", "o"]
let {length : len} = 'hello';  // len: 5
```

## 函数参数的解构赋值

```js
function add([x, y]){ return x + y; }
add([1, 2]);  // 3
```

## 注意点及难点

圆括号 模式 代码块 赋值语句

##### 圆括号

```js
let node = { type: "Identifier", name: "foo" }, type = "Literal", name = 5;
({ type, name } = node);  // 如果没有圆括号，报错
```

利用解构对现有变量进行赋值，此时需要套上圆括号，告诉解析器这是表达式而非代码块。

##### 模式

```js
var node = { loc: { start: { line: 1, column: 5 } } };
var        { loc: { start: { line               } } } = node;
// line:  1
// loc:   error: loc is undefined
// start: error: start is undefined
```

上面代码中，只有 line 是变量，loc和 start 都是模式，不会被赋值。

##### 当采用解构赋值来声明变量时，必须立即初始化。

```js
let node = { type: "Identifier", name: "foo" };
let { type, name } = node;
// 如果没有同时初始化，就会报错，如下
let { type, name };  // syntax error!
```

##### 只要是期望出现一个值的地方，都能放置解构表达式

A destructuring assignment expression evaluates to the right side of the expression (after the =). That means you can use a destructuring assignment expression anywhere a value is expected. For instance, passing a value to a function:

```js
let node = {
        type: "Identifier",
        name: "foo"
    },
    type = "Literal",
    name = 5;

function outputInfo(value) {
    console.log(value === node);        // true
}

outputInfo({ type, name } = node);
console.log(type);      // "Identifier"
console.log(name);      // "foo"
```

## 解构赋值的具体用法

##### 交换变量的值

```js
[x, y] = [y, x];
```

##### 从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象
function example() {
  return { foo: 1, bar: 2 };
}
var { foo, bar } = example();
```

##### 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

##### 提取 JSON 数据

```js
var jsonData = { id: 42, status: "OK", data: [867, 5309] };
let { id, status, data: number } = jsonData;
console.log(id, status, number);  // 42, "OK", [867, 5309]
```

##### 函数参数的默认值

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo';` 这样的语句。

##### 遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
for (let [key] of map) { }     // 获取键名
for (let [,value] of map) { }  // 获取键值
```

##### 输入模块的指定方法

加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## Summary

Destructuring makes working with objects and arrays in JavaScript easier. Using the familiar object literal and array literal syntax, you can pick data structures apart to get at just the information you’re interested in. Object patterns allow you to extract data from objects while array patterns let you extract data from arrays.

Both object and array destructuring can specify default values for any property or item that is undefined and both throw errors when the right side of an assignment evaluates to null or undefined. You can also navigate deeply nested data structures with object and array destructuring, descending to any arbitrary depth.

Destructuring declarations use var, let, or const to create variables and must always have an initializer. Destructuring assignments are used in place of other assignments and allow you to destructure into object properties and already-existing variables.

Destructured parameters use the destructuring syntax to make “options” objects more transparent when used as function parameters. The actual data you’re interested in can be listed out along with other named parameters. Destructured parameters can be array patterns, object patterns, or a mixture, and you can use all of the features of destructuring.

