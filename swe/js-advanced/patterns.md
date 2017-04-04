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
* 不要修改内置原型
* switch 模式
* 避免使用隐式类型转换，比较语句使用 `===` `!==` 操作符
* 避免使用 `eval()`，会带来安全隐患，并可能影响当前执行环境。如无法避免，那么用 `new Function()` 比 `eval()` 会好点，不会引入额外变量。另外，`setInterval()` `setTimeout()`  也存在类似隐患。
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

### API 类模式

#### 回调模式

函数都是对象，这表示它们可以作为参数传递给其他函数。然后在其他函数内部调用此函数，那么这就是回调 callback。

注意项：
  * 函数作为参数传递时是不带括号的，括号表示立即执行。
  * 使用回调函数需要注意其内部的 `this`，特别将对象的方法作为回调函数时，原先的 `this` 指向会丢失，需要通过 `call()` `allpy()` `bind()` 等来恢复 `this` 值。

应用：
  * 异步事件监听器：多数浏览器编程都是事件驱动的，回调模式支持程序以异步方式运行
  * `setTimeout()` `setInterval()` 方法也会接受并执行回调函数
  * 各种库的代码应该尽可能地通用和可复用，回调可以帮助实现这种通用化

#### 函数作为返回值

闭包就需要用到。


#### 配置对象

配置对象模式 configuration object pattern 是一种提供更整洁的 API 的方法。

当函数参数变得很长时，用户很难记住参数的顺序，所以更好的办法是使用一个参数对象来代替所有参数。

#### 柯里化 Curry

调用 invoke 函数实际上就是将一个参数集合应用 apply 到一个函数中。那么有没有办法只传递部分参数，而不是所有参数？

当发现正在调用同一个函数，并且传递的参数绝大多数都是相同的，那么该函数可能是用于柯里化的一个很好的候选参数。可以通过将一个函数集合部分应用 partially apply 到函数中，从而动态创建一个新函数，这个新函数将会保存重复的参数(因此不必每次都传递这些参数)，并且还会使用预填充原始函数所期望的完整参数列表。

```js
function curry(fn) {
  var slice = Array.prototype.slice,
      storedArgs = slice.call(arguments, 1);
  return function() {
    var newArgs = slice.call(arguments),
        args = stroedArgs.concat(newArgs);
    return fn.apply(null, args);
  }
}
```


### 初始化类模式

#### 立即执行函数

即时函数模式 Immediate Function pattern 是一种可以支持在定义函数后立即执行该函数的语法。

这种模式本质上只是一个函数表达式(无论是命名的还是匿名的)。

即时函数的最大好处是，不用担心全局空间被临时变量所污染。

即时函数也被称为 自调用 self-invoking 或 自执行 self-executing 函数。

```js
(function () { /* do something */ })();
```

#### 即时对象初始化

即时对象初始化 immediate object initialization 模式是另一种保护全局作用域不受污染的方法。这种模式使用带有 init() 方法的对象，该方法在创建对象后将会立即执行。

这种模式跟立即执行函数比，涉及了更多的语法特性，但会使整个初始化过程更显结构化。

这种模式的缺点在于，绝大多数压缩工具 minifier 为保证压缩安全性，不会对这些代码进行压缩优化。

```js
({prop: value, init() { }, ... }).init();
```

#### 初始化时分支

初始化时分支 init-time branching，也称为加载时分支 load-time branching 是一种优化模式。当知道某个条件在整个程序生命周期内都不会发生改变的时候，仅对该条件测试一次是很有意义的。浏览器嗅探就是一个典型例子。

当使用初始化时分支的时候，可以在脚本初始化加载时一次性探测出浏览器特征，此时可以在整个页面生命周期内重定义函数运行方式。

```js
if (特征检测) { foo = function() { }; }
else {          foo = function () { }; }
```


### 性能类模式

### 函数属性 -- 备忘模式

函数是对象，因此它们还拥有自己的属性和方法。可以在任何时候将自定义的属性添加到你的函数中。自定义属性的其中一个用例是缓存函数结果。

### 函数内部修改函数定义

自定义函数 self-defining function 可以更新自身的实现。当您的函数有一些初始工作要做，并且仅需要执行一次，那么这种模式非常有用。

这种模式又被称为 惰性函数定义 lazy function definition，因为该函数直到第一次使用时才被正确地定义。

```js
var scareMe = function () {
  alert('Boo!');
  scareMe = function() { alert('Double boo!'); }
}
```


## 对象创建

在 JS 中我们可以很容易地使用对象字面量或者构造函数创建对象，这里我们越过那些方法以寻求一些额外的对象创建模式。

### 命名空间

命名空间 namespace 有助于减少程序中所需要的全局变量的数量，同时还有助于避免命名冲突或过长的名字前缀。

JS 的语法中并没有内置命名空间，但这种特征是非常容易实现的。

```js
var MYAPP = {};  // 命名空间对象的名称通常采用全部大写形式
MYAPP.someVar = 1;
MYAPP.modules = {};
```

命名空间模式可以有效解决代码中的命名冲突，但也存在一些缺点：
  * 需要输入更多字符，增加代码量
  * 仅有一个全局实例意味着任何部分代码都可以修改该全局实例
  * 长嵌套名字意味着更长(更慢)的属性解析时长

### 私有属性和方法

JS 并没有特殊的语法来表示私有、保护、或公共属性和方法，JS 中所有对象成员都是公有的。

私有属性可以通过在构造函数内定义变量实现，即使用闭包来实现这种功能。

### 模块模式

模块模式 Module Pattern 得到了广泛的应用，因为它提供了结构化的思想并且有助于组织日益增长的代码。

JS 中并没有包 package 的特殊语法，但是模块模式提供了一种创建自包含非耦合 self-contained de-couple 代码片段的有利工具，可以将它视为黑盒功能，并且可以根据您所编写软件的需求添加 替换 或删除这些模块。

模块模式是多种模式的组合：命名空间、即时函数、私有和特权成员、声明依赖。

```js
MYAPP.namespace('MYAPP.util.array');  // 建立一个命名空间
MYAPP.util.array = (function (app, global) {  // 定义模块
  var uobj = app.object,              // 声明外部依赖
      ops = Object.prototype.toString // 私有属性
      inArray = function () { };      // 私有方法
  /* 一次性初始化代码 */              // 此处为可选的一次性初始化过程
  return {                            // 暴露公开的 API
    inArray: inArray
  };
})(MYAPP, this);  // 将全局变量导入到模块中可以加速全局变量解析速度(将全局变量转为局部变量)
```

刚才创建了一个 MYAPP.util.array 的对象，但有时候使用构造函数创建对象更为方便。当然，两者的唯一区别在于包装了模块的即时函数最终会返回一个函数，而不是一个对象。


### 沙箱模式

在命名空间模式中，定义了一个作为空间名的全局变量，而沙箱模式中向全局空间中添加的是一个构造函数，这里我们就用 `Sandbox()` 来表示好了。

```js
new Sandbox(function(global) {  })  // 模块通过回调函数传递给沙箱构造函数
```

### 静态成员

在 JS 中并没有特殊语法来表示静态成员，但是可以通过使用构造函数并向其添加属性这种方式实现。

另外，还可以通过闭包实现私有静态成员的效果。

### 对象常量

JS 中没有常量这个概念，作为一种变通方案，JS 中常见的一种方法是使用命名约定，使那些不应该被修改的变量全部用大写字母突出显示。实际上这个命名约定已经用于内置对象中了，如 `Math.PI` `Number.MAX_VALUE`。

### 链模式

链模式 Chaining Pattern 可以使您能够一个接一个地调用对象的方法，而无需将前一个操作返回的值赋给变量，并且无需将您的调用分割成多行。

链模式可以节省一些输入，使代码更加简洁。另一个优点是，它可以帮助您考虑分割函数，以创建更加简短、具有特定功能的函数，这有助于提高代码的可维护性。

链模式的缺点在于以这种方式编写的代码更加难以调试，你知道在哪一行出现了错误，但这一行执行了太多操作，难以具体定位。


## 代码复用







