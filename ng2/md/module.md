# Module

历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如Ruby的`require`、Python的`import`，甚至就连CSS都有`@import`，但是JavaScript任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面 CommonJS 代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6模块不是对象，而是通过`export`命令显式指定输出的代码，输入时也采用静态命令的形式。上面代码的实质是从`fs`模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。当然，这也导致了没法引用ES6模块本身，因为它不是对象。

由于ES6模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者`navigator`对象的属性。
- 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。

浏览器使用ES6模块的语法如下。

```html
<script type="module" src="foo.js"></script>
```

Node的默认模块格式是CommonJS，目前还没决定怎么支持ES6模块。

### 严格模式

ES6的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。


## export命令

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

### `export` 的几种写法

```js
// 直接输出法，采用这种方法，对于语句出现的位置没有限定，但必须位于模块顶层
export var firstName = 'Michael';                  // 输出变量
export function multiply(x, y) { return x * y; };  // 输出函数
export class Rectangle {                           // 输出类
  constructor(length, width) { this.length = length; this.width = width; }
}

// 在尾部统一输出，推荐这种方式，可以在脚本尾部，一眼看清楚输出了哪些变量
export {firstName, multiply as add, Rectangle};  // 输出时可以使用 as 关键字重命名
```

总结：要么在变量定义时，在前面加 `export` 关键字；如果不是同时进行，后续再输出时，必须用 `{}` 包裹。


### 注意点

#### 接口名与变量的一一对应

`export`命令规定的是对外的接口，单独声明接口时，接口名必须用 `{}` 包裹。接口名必须与模块内部的变量建立一一对应关系。

```js
// 错误的输出方式，因为没有提供对外的接口
export 1;                  // 报错，不能输出固定值
var m = 1; export m;       // 报错，这种写法效果同上行
function f() {} export f;  // 报错，接口名要用 {} 包裹
// 正确的输出方式
export var m = 1;       // 写法一，这其实是一种简写方法，其实默认声明了一个 {m} 接口名
var m = 1; export {m};  // 写法二，接口名 m 与变量 m 一一对应
```

#### 动态绑定

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);  // 500 毫秒后从外部访问模块 foo 接口得到的值是 "baz"
```

这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新。

#### 命令必须位于模块顶层

最后，`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。

如果处于块级作用域内，就会报错，`import` 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo();
```


## import命令

使用`export`命令定义了模块的对外接口以后，其他JS文件就可以通过`import`命令加载这个模块（文件）。

```javascript
import {firstName, add as multiply, Rectangle} from './profile';  // 常规写法
import 'lodash';  // 如果只需要执行模块而不需要导入接口，就可以这样写

```

`import`命令导入接口名时，同样需要 `{}` 包裹，导入时的接口名必须与模块内的接口名对应。

导入接口时可以使用 `as` 关键字重命名接口名。

注意，`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

注意，所有 `import` 进来的接口名（bindings），都只读，但不可重新赋值，接口名本质上保存的值是一个指向 module 相应接口的“链接信息”，如果赋值，就会破坏这个 binding，这样理解“只读”特性应该简单些。

```js
foo();  // 代码不会报错，因为`import`的执行早于`foo`的调用
import { foo } from 'my_module';
```

> **`import` 时引入文件的写法**
> 1. Make sure to include `/`, `./`, or `../` at the beginning of the file you're importing
> 2. 是否带文件扩展名，带扩展名，typescript 报错，不带扩展名，traceur 报错，所以还是带扩展名

### 先输入后输出同一个模块

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。

```javascript
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;
```

上面代码中，`export`和`import`语句可以结合在一起，写成一行。但是从可读性考虑，不建议采用这种写法。

### 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

```js
// circle.js
export function area(radius) { return Math.PI * radius * radius; }
export function circumference(radius) { return 2 * Math.PI * radius; }
```

```js
import { area, circumference } from './circle';  // 方式一 常规加载
import * as circle from './circle';              // 方式二 整体加载，包含下文的 default
console.log('圆面积：' + circle.area(4));
```

## export default命令

使用`import`命令的时候，用户需要知道所要加载的确切接口名，否则无法加载。   
为了给用户提供方便，就要用到`export default`命令，为模块指定默认输出。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。

需要注意的是，这时`import`命令后面，不使用大括号。（跟 export 与变量声明写在一起一样，其实都是一种特殊状态下的简写形式。）

```javascript
// 默认写法
export default function(num1, num2) { return num1 + num2; }           // 连写必须用匿名函数，否则冲突
function add(num1, num2) { return num1 + num2; } export default add;  // 分开写的方式
import xxx from 'modules';  // 不使用大括号

// 采用接口的常规写法，揭示了 default 的实质
export { add as default };
import { default as xxx } from 'modules';

// 错误用法
export default var a = 1;  // 接口名是 default 还是 a？冲突

// 在一条import语句中，同时输入默认方法和其他变量
import customName, { otherMethod } from './export-default';            // 写法一
import {default as customName, otherMethod } from './export-default';  // 写法二

// 用法示例
export default 42;            // 输出默认值
export default class { ... }  // 输出默认类，这样写不能有类名
import $ from 'jquery';  // 有了`export default`命令，输入模块时就非常直观
```

## 模块的继承

模块之间也可以继承。

假设有一个`circleplus`模块，继承了`circle`模块。

```js
// circleplus.js
export * from 'circle';                             // 输出`circle`模块的所有属性和方法
export var e = 2.71828182846;                       // 输出自定义的`e`变量
export default function(x) { return Math.exp(x); }  // 输出自定义默认方法
```

> **`export *`命令到底含不含 default**  
> Nicholas 的说法是含 default，所以不能再重复定义 default   
> 阮一峰的说法是，会忽略 default，故需要重新定义   
> 用 traceur 试验的结果是，含 default，不能重复定义 default。但 app 读不到 default   
> 结论：应该是含 default 的，但实现有 bug，需要再确认。
> ```js
> // modulechild.js
> export default function(){};
> // module.js
> export * from "./modulechild.js";  // 如果在这里再 export default 又会报错--重复定义
> // app.js
> import foo form "./module.js"  // undefined
> ```

也可以将`circle`的属性或方法，改名后再输出。

```js
export { area as circleArea } from 'circle';
```

加载上面模块的写法如下。

```javascript
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

## ES6模块加载的实质

ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件`lib.js`的例子。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量`counter`和改写这个变量的内部方法`incCounter`。然后，在`main.js`里面加载这个模块。

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，`lib.js`模块加载以后，它的内部变化就影响不到输出的`mod.counter`了。这是因为`mod.counter`是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中，输出的`counter`属性实际上是一个取值器函数。现在再执行`main.js`，就可以正确读取内部变量`counter`的变动了。

```bash
$ node main.js
3
4
```

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令`import`时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，`import`输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

还是举上面的例子。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明，ES6模块输入的变量`counter`是活的，完全反应其所在模块`lib.js`内部的变化。

再举一个出现在`export`一节中的例子。

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中，`m1.js`的变量`foo`，在刚加载时等于`bar`，过了500毫秒，又变为等于`baz`。

让我们看看，`m2.js`能否正确读取这个变化。

```bash
$ babel-node m2.js

bar
baz
```

上面代码表明，ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

由于ES6输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```javascript
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中，`main.js`从`lib.js`输入变量`obj`，可以对`obj`添加属性，但是重新赋值就会报错。因为变量`obj`指向的地址是只读的，不能重新赋值，这就好比`main.js`创造了一个名为`obj`的const变量。

最后，`export`通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

```javascript
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```

上面的脚本`mod.js`，输出的是一个`C`的实例。不同的脚本加载这个模块，得到的都是同一个实例。

```javascript
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';
```

现在执行`main.js`，输出的是1。

```bash
$ babel-node main.js
1
```

这就证明了`x.js`和`y.js`加载的都是`C`的同一个实例。

## 循环加载

“循环加载”（circular dependency）指的是，`a`脚本的执行依赖`b`脚本，而`b`脚本的执行又依赖`a`脚本。

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现`a`依赖`b`，`b`依赖`c`，`c`又依赖`a`这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。

对于JavaScript语言来说，目前最常见的两种模块格式CommonJS和ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。

### CommonJS模块的加载原理

介绍ES6如何处理"循环加载"之前，先介绍目前最流行的CommonJS模块格式的加载原理。

CommonJS的一个模块，就是一个脚本文件。`require`命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```javascript
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

上面代码就是Node内部加载模块后生成的一个对象。该对象的`id`属性是模块名，`exports`属性是模块输出的各个接口，`loaded`属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。

以后需要用到这个模块的时候，就会到`exports`属性上面取值。即使再次执行`require`命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

### CommonJS模块的循环加载

CommonJS模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

让我们来看，Node[官方文档](https://nodejs.org/api/modules.html#modules_cycles)里面的例子。脚本文件`a.js`代码如下。

```javascript
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中，`a.js`脚本先输出一个`done`变量，然后加载另一个脚本文件`b.js`。注意，此时`a.js`代码就停在这里，等待`b.js`执行完毕，再往下执行。

再看`b.js`的代码。

```javascript
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中，`b.js`执行到第二行，就会去加载`a.js`，这时，就发生了“循环加载”。系统会去`a.js`模块对应对象的`exports`属性取值，可是因为`a.js`还没有执行完，从`exports`属性只能取回已经执行的部分，而不是最后的值。

`a.js`已经执行的部分，只有一行。

```javascript
exports.done = false;
```

因此，对于`b.js`来说，它从`a.js`只输入一个变量`done`，值为`false`。

然后，`b.js`接着往下执行，等到全部执行完毕，再把执行权交还给`a.js`。于是，`a.js`接着往下执行，直到执行完毕。我们写一个脚本`main.js`，验证这个过程。

```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行`main.js`，运行结果如下。

```bash
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事。一是，在`b.js`之中，`a.js`没有执行完毕，只执行了第一行。二是，`main.js`执行到第二行时，不会再次执行`b.js`，而是输出缓存的`b.js`的执行结果，即它的第四行。

```javascript
exports.done = true;
```

总之，CommonJS输入的是被输出值的拷贝，不是引用。

另外，由于CommonJS模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。

```javascript
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载，`require('a').foo`的值很可能后面会被改写，改用`require('a')`会更保险一点。

### ES6模块的循环加载

ES6处理“循环加载”与CommonJS有本质的不同。ES6模块是动态引用，如果使用`import`从一个模块加载变量（即`import foo from 'foo'`），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

请看下面这个例子。

```javascript
// a.js如下
import {bar} from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import {foo} from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';
```

上面代码中，`a.js`加载`b.js`，`b.js`又加载`a.js`，构成循环加载。执行`a.js`，结果如下。

```bash
$ babel-node a.js
b.js
undefined
a.js
bar
```

上面代码中，由于`a.js`的第一行是加载`b.js`，所以先执行的是`b.js`。而`b.js`的第一行又是加载`a.js`，这时由于`a.js`已经开始执行了，所以不会重复执行，而是继续往下执行`b.js`，所以第一行输出的是`b.js`。

接着，`b.js`要打印变量`foo`，这时`a.js`还没执行完，取不到`foo`的值，导致打印出来是`undefined`。`b.js`执行完，开始执行`a.js`，这时就一切正常了。

再看一个稍微复杂的例子（摘自 Dr. Axel Rauschmayer 的[《Exploring ES6》](http://exploringjs.com/es6/ch_modules.html)）。

```javascript
// a.js
import {bar} from './b.js';
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}
foo();

// b.js
import {foo} from './a.js';
export function bar() {
  console.log('bar');
  if (Math.random() > 0.5) {
    foo();
  }
}
```

按照CommonJS规范，上面的代码是没法执行的。`a`先加载`b`，然后`b`又加载`a`，这时`a`还没有任何执行结果，所以输出结果为`null`，即对于`b.js`来说，变量`foo`的值等于`null`，后面的`foo()`就会报错。

但是，ES6可以执行上面的代码。

```bash
$ babel-node a.js
foo
bar
执行完毕

// 执行结果也有可能是
foo
bar
foo
bar
执行完毕
执行完毕
```

上面代码中，`a.js`之所以能够执行，原因就在于ES6加载的变量，都是动态引用其所在的模块。只要引用存在，代码就能执行。

下面，我们详细分析这段代码的运行过程。

```javascript
// a.js

// 这一行建立一个引用，
// 从`b.js`引用`bar`
import {bar} from './b.js';

export function foo() {
  // 执行时第一行输出 foo
  console.log('foo');
  // 到 b.js 执行 bar
  bar();
  console.log('执行完毕');
}
foo();

// b.js

// 建立`a.js`的`foo`引用
import {foo} from './a.js';

export function bar() {
  // 执行时，第二行输出 bar
  console.log('bar');
  // 递归执行 foo，一旦随机数
  // 小于等于0.5，就停止执行
  if (Math.random() > 0.5) {
    foo();
  }
}
```

我们再来看ES6模块加载器[SystemJS](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/circular-references-bindings.md)给出的一个例子。

```javascript
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n != 0 && even(n - 1);
}
```

上面代码中，`even.js`里面的函数`even`有一个参数`n`，只要不等于0，就会减去1，传入加载的`odd()`。`odd.js`也会做类似操作。

运行上面这段代码，结果如下。

```javascript
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17
```

上面代码中，参数`n`从10变为0的过程中，`even()`一共会执行6次，所以变量`counter`等于6。第二次调用`even()`时，参数`n`从20变为0，`even()`一共会执行11次，加上前面的6次，所以变量`counter`等于17。

这个例子要是改写成CommonJS，就根本无法执行，会报错。

```javascript
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function(n) {
  return n != 0 && even(n - 1);
}
```

上面代码中，`even.js`加载`odd.js`，而`odd.js`又去加载`even.js`，形成“循环加载”。这时，执行引擎就会输出`even.js`已经执行的部分（不存在任何结果），所以在`odd.js`之中，变量`even`等于`null`，等到后面调用`even(n-1)`就会报错。

```bash
$ node
> var m = require('./even');
> m.even(10)
TypeError: even is not a function
```

## 跨模块常量

上面说过，`const`声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），可以采用下面的写法。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

## ES6模块的转码

浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。除了Babel可以用来转码之外，还有以下两个方法，也可以用来转码。

### ES6 module transpiler

[ES6 module transpiler](https://github.com/esnext/es6-module-transpiler)是square公司开源的一个转码器，可以将ES6模块转为CommonJS模块或AMD模块的写法，从而在浏览器中使用。

首先，安装这个转玛器。

```bash
$ npm install -g es6-module-transpiler
```

然后，使用`compile-modules convert`命令，将ES6模块文件转码。

```bash
$ compile-modules convert file1.js file2.js
```

`-o`参数可以指定转码后的文件名。

```bash
$ compile-modules convert -o out.js file1.js
```

### SystemJS

另一种解决方法是使用[SystemJS](https://github.com/systemjs/systemjs)。它是一个垫片库（polyfill），可以在浏览器内加载ES6模块、AMD模块和CommonJS模块，将其转为ES5格式。它在后台调用的是Google的Traceur转码器。

使用时，先在网页内载入system.js文件。

```html
<script src="system.js"></script>
```

然后，使用`System.import`方法加载模块文件。

```html
<script>
  System.import('./app');
</script>
```

上面代码中的`./app`，指的是当前目录下的app.js文件。它可以是ES6模块文件，`System.import`会自动将其转码。

需要注意的是，`System.import`使用异步加载，返回一个Promise对象，可以针对这个对象编程。下面是一个模块文件。

```javascript
// app/es6-file.js:

export class q {
  constructor() {
    this.es6 = 'hello';
  }
}
```

然后，在网页内加载这个模块文件。

```html
<script>

System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>
```

上面代码中，`System.import`方法返回的是一个Promise对象，所以可以用then方法指定回调函数。
