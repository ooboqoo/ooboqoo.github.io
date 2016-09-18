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

