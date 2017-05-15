# JavaScript Patterns

在软件开发中，模式是指一个通用问题的解决方案。

## 基本技巧

* 编写可维护代码
* 尽量少用全局变量
* 单 `var` 模式
* for 循环
* for-in 循环也被称为 "枚举"，用来遍历非数组对象。不推荐用于数组，另外要注意过滤原型链上属性。
* 不要修改内置原型，修改内置对象原型是一个增强功能的强大方法，但这会严重影响可维护性。
* switch 模式
* 避免使用隐式类型转换，比较语句使用 `===` `!==` 操作符
* 避免使用 `eval()`，会带来安全隐患，并可能影响当前执行环境。如无法避免，那么用 `new Function()` 比 `eval()` 会好点，不会引入额外变量。另外，`setInterval()` `setTimeout()`  也存在类似隐患。
* 不要省略 `parseInt(str, radix)` 的数值约定，碰到 0 开头的字符，因为规范变更原因存在歧义。
* 编码约定，确定编码约定往往会引发激烈讨论，但确定并一致遵循约定比约定内容本身更为重要。
* 命名约定
* 编写注释
* 编写 API 文档，通过 JSDoc 自动生成文档。
* 编写可读性强的代码
* 同行互查(代码评审)可以使得审查人和代码编写者可以交换和共享知识。
* 在正式发布时精简代码，利用工具精简脚本可以大大缩小代码体积，加速页面载入速度(提升页面性能)。
* 运行 JSLint

#### 全局变量

不使用 `var` 创建的隐含全局变量可以通过 `delete` 操作符删除，这表明隐含全局变量严格来讲不是真正的变量，而是全局对象的属性。属性可以通过 `delete` 操作符删除，但变量不可以。

#### for 循环

```js
for (var i = 0; i < myarray.length; i++) { }                   // 改进前
for (var i = 0, length = myarray.length; i < length; i++) { }  // 改进后
for (var i = myarray.length; i--;) { }                         // 更进一步(细微优化)，最小变量 + 减轻计算
  // 注：for 结构的 3个语句都是可选的，但 2个 `;` 不可省略
```

改进前每次循环都要访问数组的长度，这样会使代码变慢，特别，当 myarray 不是数组而是 DOM 集合时(每次都要实时去查询一遍 DOM 树，而这是极其耗费性能的)。

改进后需要注意的是，当 for 循环内部会改变 `length` 数值的话，需要在循环内部更新 `length` 的值。 

#### parseInt

```js
parseInt(021, 8)   // 15，系统会先将 021 转换成 17，然后再进行 parseInt(17, 8)
parseInt(21, 8)     // 17
parseInt('45', 2)  // NaN
parseInt(4.7 * 1e22, 10);       // Very large number becomes 4
parseInt(0.00000000000434, 10); // Very small number becomes 4
parseInt === Number.parseInt    // true
```

## 字面量和构造函数

避免使用构造函数，使用字面量更为直观，还有就是没有作用域解析(如 `new Object()` 时需要逐层向上查找 `Object` 函数)。

 Built-in constructors (avoid)   | Literals and primitives (prefer)
 ------------------------------- | ---------------------------------
 `var o = new Object();`         | `var o = {};`
 `var a = new Array();`          | `var a = [];`
 `var r = new RegExp('\\w','g')` | `var r = /\w/g;`
 `var s = new String('str')`     | `var s = 'str';`
 `var n = new Number();`         | `var n = 0;`
 `var b = new Boolean();`        | `var b = false;`
 `throw new Error('oops')`       | <s>`throw {name: 'Error', message: 'oops'}`</s>

[注] `new String('str')` 和 `String('str')` 的返回值是不一样的，前者为对象，后者为原始值

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

使用 `instanceof Array` 来检查是否是数组，但某些老版 IE 工作不正常，ES5 增加了 `Array.isArray()` 来判定是否数组。

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
greet.smile;  // undefined
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

函数都是对象，这表示它们可以作为参数传递给其他函数，其他函数内部再调用此函数，这就是回调 callback。

注意项：
  * 函数作为参数传递时是不带括号的，括号表示立即执行。
  * 使用回调函数需要注意其内部的 `this`，特别地，将对象的方法作为回调函数传递时，原先的 `this` 指向会丢失，需要通过 `call()` `allpy()` `bind()` 等来恢复 `this` 值。

应用：
  * 异步事件监听器：多数浏览器编程都是事件驱动的，回调模式支持程序以异步方式运行。
  * `setTimeout()` `setInterval()` 方法也支持接收并执行回调函数。
  * 各种库的代码应该尽可能地通用和可复用，回调可以帮助实现这种通用化。

#### 函数作为返回值

闭包就需要用到。

#### 配置对象

配置对象模式 configuration object pattern 是一种提供更整洁的 API 的方法。

当函数参数变得很长时，用户很难记住参数的顺序，所以更好的办法是使用一个参数对象来代替所有参数。

#### 柯里化 Curry

调用 invoke 函数实际上就是将一个参数集合应用 apply 到一个函数中。那么有没有办法只传递部分参数，而不是所有参数？

当发现正在调用同一个函数，并且传递的参数绝大多数都是相同的，那么该函数可能是用于柯里化的一个很好的候选参数。可以通过将一个函数集合部分应用 partially apply 到函数中，从而动态创建一个新函数，这个新函数将会保存重复的参数(因此不必每次都传递这些参数)，并且还会预填充原始函数所期望的完整参数列表。

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

当使用初始化时分支的时候，可以在脚本初始化加载时一次性探测出浏览器特征，并在整个页面生命周期内重定义函数运行方式。

```js
if (特征检测) { foo = function() { }; }
else {         foo = function () { }; }
```


### 性能类模式

#### 函数属性 -- 备忘模式

函数是对象，因此它们还拥有自己的属性和方法。可以在任何时候将自定义的属性添加到你的函数中。自定义属性的其中一个用例是缓存函数结果。

#### 函数内部修改函数定义

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

### 类式继承

```js
function Parent(name) { this.name = name; }
Parent.prototype.getName = function() { return this.name; }
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype.__proto__ = Parent.prototype;
Child.prototype.getAge = function () { return this.age; }
```

### 复制属性和方法

浅复制 shallow copy 碰到引用类型的值，只会简单复制指针，修改复制的属性可能会影响源属性。  
深度复制 deep copy 在复制时会做检查，如果碰到对象，不会简单地复制指针，而是递归去复制其属性。

当复制方法时，特别需要注意的是 `this` 的指向，可能需要借助 `call()` `apply()` 或 `bind()` 来进行调整。

### 混入

混入 mix-in 并不是复制一个完整的对象，而是从多个对象中复制出任意的成员并将这些成员组合成一个新的对象。


## 设计模式

### 单例模式

单例 singleton 模式的思想在于保证一个特定类仅有一个实例。这意味着当您第二次使用同一个类创建新对象的时候，应该得到与第一次所创建对象完全相同的对象。

我们这里展示两种实现的方式：添加一个构造函数的静态属性 instance 来缓存实例；将实例包装在闭包中。静态属性的方式的缺点是，instance 对外部是可见的，而闭包方式的缺点是，如果想向 Universe.prototype 添加方法的话，会发现添加是无效的。


```js
// 通过构造函数静态属性实现
function Universe() {
  if (typeof Universe.instance === 'object') { return Universe.instance; }
  /* ... 一些正常的初始化工作 */
  Universe.instance = this;  // 缓存
  return this;
}

// 通过闭包实现
function Universe() {
  var instance = this;
  /* ... 一些正常的初始化工作 */
  Universe = function () { return instance; }
}
```

### 工厂模式

工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。

```js
function createCar(color, doors) {
  var tempCar = new Object;
  tempCar.color = color;
  tempCar.doors = doors;
  tempCar.showColor = function() { alert(this.color); };
  return tempCar;
}
```

### 迭代器模式

提供一个 API 来遍历或操纵复杂的自定义数据结构。

在迭代器模式中，对象需要提供一个 next() 方法。依次调用 next() 方法必须返回下一个连续元素。

### 装饰者模式

在装饰者模式中，可以在运行时动态添加附加功能到对象中。

装饰者模式的一个比较方便的特征在于其预期行为的可定制和可配置特性。可以从仅具有一些基本功能的普通对象开始，然后从可用装饰资源池中选择需要用于增强普通对象的那些功能，并且按照顺序进行装饰，尤其是当装饰顺序很重要的时候。

### 策略模式

在选择最佳策略以处理特定任务的时候仍然保持相同的接口。

策略模式支持您在运行时选择算法。代码的客户端可以使用同一个接口来工作，但是它却根据客户正在试图执行的上下文，从多个算法中选择用于处理特定任务的算法。

```js
// 配置保单验证策略，validator 的其他行为始终保持不变，只要根据实际应用场景配置验证方法就行
validator.config = {
  firstName: 'isNonEmpty',
  age: 'isNumber',
  userName: 'isAlphaNum'
}
```

### 外表模式

外表 facade 模式是一种简单的模式，它为对象提供了一个可供选择的接口。这是一个非常好的设计实践，可保持方法的简洁性并且不会使它们处理过多的工作。

通过把常用方法包装到一个新方法中，从而提供一个更为便利的 API。

简单说，就是重新搞一个新 API，将一些没必要公开的东西隐藏起来，更新或升级对外部都是透明的。

### 代理模式

通过包装一个对象以控制对它的访问，其主要方法是将访问聚集为组或仅当真正必要的时候才执行访问，从而避免高昂的操作开销。

代理模式中，一个对象充当另一个对象的接口。它与外表模式的区别在于，在外表模式中您所拥有的是合并了多个方法调用的便利方法。代理则介于对象的客户端和对象本身之间，并且对该对象的访问进行保护。

这种模式可能看起来像是额外的开销，但是出于性能因素的考虑它却非常有用。代理充当了某个对象的守护对象，并且试图使本体对象做尽可能少的工作。

使用这种模式的其中一个例子是我们可以称为延迟初始化的方法。如果初始化本体对象的开销非常大，而恰好初始化该本体对象以后，很可能重来都不会用到，这时，我们就可以代理模式来进行优化。通过代理替换本体对象的接口，代理接收初始化请求后，以成功初始化作为响应，但实际并不会执行初始化，等待下次实际用到的时候，才进行初始化。

#### 缓存代理

代理可以对一些资源进行缓存，如一些 http 请求资源。

### 中介者模式

当对象互相知道太多信息并且直接通信时，这将会导致产生不良的紧耦合 tight coupling 问题。中介者模式缓解了该问题并促进形成松耦合 loose coupling，而且还有助于提高可维护性。

### 观察者模式

观察者 observer 模式广泛应用于客户端 JS 编程中。所有的浏览器事件(鼠标悬停、按键等事件)是该模式的例子。该模式的另一个别名是 订阅/发布 subscriber/publisher 模式。


## DOM 和浏览器模式

前面章节中我们主要集中关注于核心 JS，而并没有太多关注在浏览器中使用 JS 的模式。

### 关注分离

在网站应用程序开发过程中主要关心如下三个内容：
  * 内容 Content - HTML 文档
  * 外观 Presentation - 指定文档外观的 CSS 样式
  * 行为 Behavior - 处理用户交互和文档各种动态变化的 JS 代码

这三部分尽可能的相互独立，可以改进将应用程序交付给大量各种用户终端的效果。关注分离也体现了了渐进增强的思想。

### DOM 脚本

不同浏览器的 DOM 方法实现并不一致，这也是为什么使用一个好的 JS 类库可以显著加快开发进度。

#### DOM 访问

DOM 访问的代价是昂贵的，它是制约 JS 性能的主要瓶颈。这是因为 DOM 通常是独立于 JS 引擎实现的。

总之，DOM 的访问应该减少到最低，这意味着：
  * 避免在循环中使用 DOM 访问
  * 将 DOM 引用分配给局部变量，并使用这些局部变量
  * 在可能的情况下使用 selector API，其要比其他 DOM 方法自己实现选择要快得多
  * 当在 HTML 容器中重复使用时，缓存重复的次数。
  * 为经常访问的元素增加 id 属性，因为 getElementById 是最简单快键的查找节点的方法

#### 操纵 DOM

除了访问 DOM 元素外，通常还需要修改、删除或者增加 DOM 元素。更新 DOM 会导致浏览器重新绘制屏幕，也会经常导致 reflow，这样会带来巨大的开销。

通常的经验法则是尽量减少更新 DOM，这也就意味着将 DOM 的改变分批处理，并在 "活动" 文档树之外执行这些更新。
  * 当需要创建一个相对较大的子树，应该在子树完全创建之后在将子树添加到 DOM 树中
  * 更新 DOM 现有部分时，先建立一个待修改子树的镜像，在镜像上完成所有修改操作后再替换原来的子树

### 事件

#### 添加多个监听器

使用 addEventListener() 添加多个事件监听器

#### 事件授权

事件授权模式得益于事件起泡，会减少为每个节点附加的事件监听器数量。

### 长期运行脚本

有时候浏览器会提示某个脚本运行了很长时间，是否应该停止该脚本。无论要处理多么复杂的任务，都不希望发生上述事情。

在 JS 中没有线程，但可以用 setTimeout() 来模拟线程，在新版的浏览器中则可以直接使用 web workers

#### setTimeout()

这样做的思想是将一个大任务分解为多个小任务，并为每个小任务设置超时时间为 1 毫秒。这样就可以使得用户接口保持响应，用户体验更好。

#### Web Workers

Web Workers 为浏览器提供了背景线程支持，可以将任务比较繁重的计算放在单独一个文件中。

Web Workers 使用 postMessage() 来与调用者通信，并且调用者订阅 onmessage 事件来接受更新。

### 远程脚本

#### XMLHttpRequest

#### JSONP

#### 框架和图像灯塔

使用框架也是一种处理远程脚本的备选方案，创建一个 iframe 元素，并修改器 src 属性的 URL。

使用远程脚本最简单的场景是在只需向服务器发送数据，而无需服务器回应的时候。在这种情形下，可以创建一个新图像，并将其 src 属性设置为服务器上的脚本文件，如下所示

```js
new Image().src = "http://example.org/some/page.php";  // 服务器端推荐返回 204 Not Content
```

这种模式成为图像灯塔 image beacon，这在希望向服务器发送日子数据时是非常有用的。

### 配置 JS

在采用 JS 时，还有一些性能上需要考虑的因素。更为详细的内容，请参阅 "高性能网站" 等书籍。

#### 合并脚本文件

构建快速载入页面的第一条规则就是尽可能少地使用外部组件，因为 HTTP 请求是十分消耗资源的。对于 JS 来说，可以通过合并外部脚本文件来明显提高页面载入速度。

假定网页使用了 jQuery 库和一些 jQuery 插件，每个插件都是一个独立的文件，且文件都十分小 2-3Kb，因而导致 HTTP 开销比实际下载文件的开销大得多。将这些脚本文件合并的方法和简单，只需要创建一个新文件，并将这些脚本文件的内容复制进去就行。

对于文件包最好是使用版本号或者其他内容来命名。

#### 精简和压缩脚本文件

精简脚本文件带来的收益依赖于使用的注释语句和空格的数量，也和具体精简工具有关，通常来说，可以精简大约 50% 的体积。

应该经常维护对脚本文件的压缩，这只需要在服务器配置中启用 gzip 压缩支持就可以实现，这样的配置会立即提高速度。

通常压缩配置会减少 70% 的文件大小。将精简和压缩两种操作相结合，基本能到原体积的 15%。

```text
http {
  gzip  on;
}
```

#### Expires 报头

与通常人们的想法相反，文件并不会在浏览器缓存中保存太久时间。可以通过使用 expires 报头来增加重复访问时，请求的文件依然在缓存中的概率。

此种方法非常适合不经常变动的资源。如果文件变动较频繁，不要使用 Expires 来缓存。

这样做的缺点在于，如果希望修改文件，就需要重命名该文件，如果已经为合并后的文件确定了一个命名约定则影响不大。

```text
server {
    location~.*\.(gif|jpg|jpeg|bmp|png|ico|txt|mp3|mp4|swf) {
      expires  15d;
    }
}
```

##### 使用 CDN

CDN 是内容分发网络 Content Delivery Network 的缩写。CDN 提供付费的主机服务，它允许您将文件副本放置于全球各个数据中心，以便用户可以选择速度最快的服务器进行连接，而您文件代码中的 URL 地址不需要修改。

### 载入策略

#### `<script>` 元素位置

`<script>` 元素的位置，最好是放置于网页的最后，刚好在 `</body>` 标签之前。这样 JS 的加载不会阻塞页面本体的解析。把各个单独的 js 放在 `<head>` 里是最坏的模式。

#### HTTP 块

HTTP 支持所谓的块编码，该技术允许分片发送网页。因此如果有一个很复杂的网页，不需等待服务器完成所有运算工作，就可以提前将一些静态页面报头先发送给用户。

最简单的策略是将 `<head>` 部分内容作为 HTTP 的第一个块，而将网页中其他部分内容作为第二个块。一个简单的改进是将第二块中的 JS 代码移到第一块中，这样做使得浏览器可以在服务器没有准备好第二块的时候就开始下载脚本文件。

#### 使用动态 `<script>` 元素来无阻塞地下载

```js
var script = document.createElement('script');
script.src = 'all_20100126.js';
document.documentElement.firstChild.appendChild(script);
```

#### 延迟加载

在页面载入完成后，载入外部文件的这种技术称为延迟加载。通常将一大段代码切分为两部分是十分有益的：
  * 一部分代码是用于初始化页面并将事件处理器附加到 UI 元素上的。
  * 第二部分代码只在用户交互或者其他条件下才用得上

载入第二部分 JS 代码的方法非常简单，只需要再一次为 head 或 body 添加动态脚本元素。

对于许多应用程序来说，延迟加载的代码部分远远大于立即加载的核心部分，因为很多有趣的操作，如拖放 XHR 和动画等，只在用户触发后发生。

#### 按需加载

加入有些代码并不常用，只在特定情况下才用到，那么可以采用按需加载策略。

可以创建一个 require() 函数或方法，该函数包含需要加载的脚本名称和当附加脚本加载后需要执行的回调函数。

#### 预加载 JS

在延迟加载模式和按需加载模式中，我们延迟加载当前页面需要的脚本。此外，还可以延迟加载当前页面不需要但在后续页面中可能需要的脚本。如此，当用户打开接下来的网页后，所需要的脚本已经预先加载了，进而用户感觉速度会加快了很多。


<script>
ooboqoo.contentsRegExp = /H[123]/;
</script>