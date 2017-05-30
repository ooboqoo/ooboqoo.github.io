https://www.manning.com/books/secrets-of-the-javascript-ninja

## 1. 进入忍者的世界

### 1.1 JavaScript 库

库的基本目标：简单易用，产生最少的开销，并能兼容所有浏览器。一个 JS 库的组成可以分为如下三个方面：

  * JavaScript 语言的高级使用
  * 跨浏览器代码的精心构建
  * 当前能够聚众合一的最佳实践应用

### 1.3 跨浏览器注意事项

指定解决这些浏览器问题的综合性策略并熟悉不同浏览器之间的区别和缺陷，和精通 JavaScript 本身同等重要。
不同浏览器的市场份额和支持成本的变化是很迅速的，须密切关注 http://gs.statcounter.com 这样的网站。

### 1.4 测试和性能分析


## 2. 利用测试和调试武装自己

### 2.1 调试代码

2.1.1 日志记录，现代浏览器中都支持 console.log() 方法在控制台中输出记录日志。

2.1.2 断点，能在特定的代码上暂停脚本的执行。这使得我们可以在该断点处，随意查看任意代码的状态。

### 2.2 测试用例生成

良好测试的特性：可重复性、简单性、独立性。

两个主要测试类型：解构型测试 和 构建型测试。

### 2.3 测试框架


## 3. 函数是根基

JavaScript 是一门函数式语言（functional language）编写代码的水平就取决于对这一点的认知。

最重要的是，在 JavaScript 中，函数是 first-class object，也就是说，可以将其视为其他任意类型的对象。就像普通的
JavaScript 数据类型，函数可以被任意变量进行引用，或声明成对象字面量，甚至可以将其作为函数的参数进行传递。

> 注：Functional 还可以翻译为 "功能性"，每个函数都设计为实现某个功能，用 "功能式编程" 来理解 "函数式编程" 可能更直观些，另外一个相关的名词是 "无状态"

### 3.1 函数的独特之处

函数和函数式概念在 JS 中如此重要的原因之一是，函数是代码执行的主要模块化单元。

函数是头等对象，除了可以像其他对象一样使用外，函数还有一个特殊的功能，它们可以被调用（invoked）。

### 3.2 函数声明

```text
函数声明：　function 函数名称 (参数:可选) { 函数体 } 
函数表达式：function 函数名称(可选) (参数:可选) { 函数体 }
```

作用域和函数：在JavaScript中，作用域是由 function 进行声明的，而不是代码块。

### 3.3 函数调用

函数调用的方式对其函数内部的代码是如何执行的，有着巨大的影响，尤其是在 this 参数的创建中。

#### 3.3.1 从参数到函数形参

如果实参与形参数量不等，JavaScript 不会抛出错误，而是会进行如下处理：

  * 如果实参多于形参，超出的参数将无法分配形参名，但在函数内部可以通过 arguments 调取
  * 如果实参少于形参，没有对应实参的形参会赋值为 undefined

除了实参，所有的函数调用都还会传递两个隐式参数：arguments 和 this

  * arguments 是传递给函数的所有参数的一个集合，该集合有一个length属性，它是一个类数组结构。
  * Java 中的this 依赖于函数的声明，而JavaScript 中的this 则依赖于函数的调用方式。

#### 3.3.2 作为函数进行调用

“函数作为函数”进行调用，其实是“函数作为方法”进行调用的一个特例，因为 window 是所有未成为对象方法的函数的所有者。

在设定“函数始终是作为方法调用的”的前提下，确定 this 值将变得异常简单：this 始终指向拥有该方法的对象，除非显式更换。

#### 3.3.3 作为方法进行调用

当一个函数被赋值给对象的一个属性，并使用引用该函数的这个属性进行调用时，那么函数就是作为该对象的一个方法进行调用的。

#### 3.3.4 作为构造器进行调用

当函数做为构造器调用时，将会如下特殊行为：

  * 创建一个新对象
  * 传递给构造器的对象是 this 参数，从而成为构造器的函数上下文
  * 如果没有显式的返回值，返回新创建的对象

#### 3.3.5 使用 apply() 和 call() 方法进行调用

跟正常调用函数比，apply 和 call 其实就是将原本隐式传递的 this 改为显式传递了。

### 3.4 总结

可以用不同的方法进行函数调用，不同的调用机制决定了函数上下文的不同。(这里对 `this` 的总结是最简洁明了的）

  * 作为普通函数进行调用时，其上下文是全局对象（window）
  * 作为方法进行调用时，其上下文是拥有该方法的对象
  * 作为构造器进行调用时，其上下文是一个新分配的对象
  * 通过函数的 apply()、call() 或 bind()方法进行调用时，上下文可以设置成任意值


## 4. 挥舞函数

### 4.1 匿名函数

有强类型和面向对象语言开发背景的开发人员可能会认为，函数和方法在使用之前必须要事先进行定义并命名，然后才能使用。然而在函数式语言中，函数经常在需要的时候才定义，然后用完就抛弃。

函数式编程专注于：少，通常无副作用、将函数作为程序代码的基础构建块。在web程序开发中，函数式编程风格是我们所要做事情的重要核心。

匿名函数让我们可以创建更小的执行单元。


### 4.2 递归

4.2.1 普通命名函数中的递归: 函数递归的两个条件：引用自身，并且有终止条件。

4.2.2 方法中的递归 及 引用的丢失问题

```js
var ninja = {
  chirp: function(n){ return n>1 ? ninja.chirp(n-1)+"-chirp" : "chirp"; }
};
var samurai = { chirp: ninja.chirp };
ninja = {};
samurai.chirp(3);  // 出错，引用丢失，可以通过修改 ninja.chirp 为 this.chirp 规避
```

4.2.4 内联命名函数：声明一个函数字面量时，这些函数加了名字就不再是匿名函数了，我们可以称它们为内联函数（inline function），内联函数可以解决这些函数在递归引用方面的问题（可以说，这种方式比使用this更清晰）。

4.2.5 callee 属性：arguments 有一个 callee 属性引用的是当前所执行的函数，该属性可以作为一个可靠的方法引用函数自身。ES5 严格模式下会报错，并且已经不推荐使用，所以尽量不要用。

### 4.3 将函数视为对象

和其他对象一样，我们可以给函数添加属性，从而实现特定的目的。

#### 4.3.1 函数存储

在函数属性中保存其他函数，以便稍后进行引用或调用。事件回调管理是最明显的例子（具体见13章）。

#### 4.3.2 自记忆函数

通过函数的属性保存前面的执行结果，可以显著提高性能。

* 缓存记忆昂贵的计算结果
* 缓存记忆 DOM 元素


### 4.4 可变长度的参数列表

#### 4.4.1 使用 apply() 支持可变参数

```js
function smallest(array){
  return Math.min.apply(Math, array);  // 任何 this 都可以，用 Math 是让代码看起来更整洁
} // Math.min 不支持传入数组，通过 apply 巧妙地解决了这个缺陷
```

#### 4.4.2 函数重载

通过检查 arguments 对象，可以轻松实现函数重载功能。jQuery UI 广泛使用了函数重载。

##### 将 arguments 转换成真正的数组

```js
Array.prototype.slice.call(arguments,1)  // arguments不是真正的数组，所以没有数组方法，
```
##### 函数的 length 属性

对于一个函数，在参数方面，我们可以确定两件事情：

  * 通过其 length 属性，可以知道声明了多少命名参数。（形参：parameter）
  * 通过 arguments.length，可以知道在调用时传入了多少参数。（实参：argument）

##### 利用参数个数进行函数重载

当然，我们可以简单地使用 if-else 或 switch 语句实现函数重载，但这里我们有更好的方法。

```js
function addMethod(object, name, fn) {
  var old = object[name];  // 保存原有的函数，如果调用的参数不匹配就调用原函数
  object[name] = function(){
    if (fn.length === arguments.length) return fn.apply(this, arguments);
    else if (typeof old === 'function') return old.apply(this, arguments);
  };
} // 这里的核心是采用了闭包的技术，每个匿名函数都配有 fn 和 old值，从而可以一层层查找匹配函数
addMethod(ninja, 'laugh', function() { /* do something */ });
addMethod(ninja, 'laugh', function(a,b) { /* do something */ });
```


## 5. 闭包

5.1 闭包是如何工作的：闭包不仅包含函数声明，还包含了函数声明的那一刻该作用域中所用到的变量和函数。闭包创建了一个 "安全气泡"，保留了函数执行所需要的所有资源。

5.2 使用闭包: 私有变量

5.3 绑定函数上下文: 函数的 bind() 方法的潜在目的是通过函数和闭包控制后续执行的上下文。

5.4 偏应用函数：可以通过预先传入一些参数生成一个偏应用函数。这种在一个函数中首先填充几个参数（然后再返回一个新函数）的技术称为柯里化（currying）

5.5 函数重写：通过重写，我们可以在用户毫无感知的情况下，重新修改一个函数的内部行为。

5.6 即时函数(立即执行函数)


## 6. 原型与面向对象

### 6.1 实例化和原型

所有的内置对象，比如 Array，包括其原型，我们都可以按照自己的意愿来扩展它。但需要记住的重点是，在原始对象上引入新的属性或方法，与在全局作用域内声明一个变量一样危险，因为原生对象的原型只有一个实例，所以有发生命名冲突的重大可能性。

在现代浏览器中，所有 DOM 元素都继承于 HTMLElement 构造器，通过访问 HTMLElement 的原型，浏览器可以为我们提供扩展任意 HTML 节点的能力。需要注意的是，尽管浏览器暴露了其构造器和原型，但不可以直接通过其构造器实例化新 HTML 元素。

### 6.2 疑难陷阱

6.2.1 扩展对象：我们也许会犯的极其严重的错误就是去扩展原生 Object.prototype。其原因是，在扩展该原型时，所有的对象都会接收这些额外的属性。

6.2.2 扩展数字：除了 Object，对其他原生对象的原型进行扩展相对来说比较安全，但是另外一个有问题的原生对象是 Number。

```js
Number.prototype.add = function(num){ return this + num; };
console.log((5).add(3))
console.log(5.add(3))    // 这个无法通过语法解释，因为点号被看成小数点了
```

6.2.4 实例化问题：函数有两种用途：作为 "普通" 的函数和作为构造器。调用构造器时新手很容易忘记new操作符，这将导致意想不到的结果。

### 6.3 编写类风格的代码


## 7. 正则表达式

有两种方法可以创建正则表达式：通过正则表达式字面量，或者通过构造 RegExp 对象的实例。

```js
var pattern1 = /test/i  // 正则字面量是用正斜杠进行界定的
var pattern2 = new RegExp("test","i")  // 传入的是字符串
```

在开发过程中，如果正则是已知的，则优先选择字面量语法，而构造器方式则是用于运行时，通过动态构建字符串来构建正则表达式。

### 7.1 为什么正则表达式很牛

### 7.2 正则表达式进阶

反向引用（后向引用）：`/^([dtn])a\1/` 它和 `/^[dtn]a[dtn]/` 不一样

### 7.3 编译正则表达式

正则表达式是一个多阶段处理过程，其中两个重要阶段是编译和执行。通过对稍后要用的正则表达式进行预定义（因此也预编译），我们可以获得一些明显的速度提升。

```js
function findClassInElements(className, type) {
  var elems = document.getElementsByTagName(type || "*");
  var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var results = [];
  for (var i = 0, length = elems.length; i &lt; length; i++)
    if (regex.test(elems[i].className)) results.push(elems[i]);
  return results;
}
assert(findClassInElements("ninja", "div").length == 2,
             "The right amount fo div ninjas was found.");
```

### 7.4 捕获匹配的片段

```js
var html = "&lt;div class='test'&gt;&lt;b&gt;Hello&lt;/b&gt; &lt;i&gt;world!&lt;/i&gt;&lt;/div&gt;";
var results = html.match(/&lt;(\/?)(\w+)([^&gt;]*?)&gt;/); // 简单捕获，返回单个匹配的相关数组
var all = html.match(/&lt;(\/?)(\w+)([^&gt;]*?)&gt;/g);    // 全局匹配，返回的包含全部匹配的数组

var pattern = /((?:ninja-)+)sword/;  // 通过在开始括号后添加 ?: 取消捕获
```

### 7.5 利用函数进行替换

String 对象的 replace() 方法是一个强大且灵活的方法，其最强大的特性是可以接受一个函数作为替换值。

```js
// 将中横线字符串转换成驼峰拼写法
function upper(all,letter) { return letter.toUpperCase(); }  //letter 中保存的是捕获组内容
assert("border-bottom-width".replace(/-(\w)/g,upper) == "borderBottomWidth",
    "Camel cased a hyphenated string.");
```

```js
//代码清单7.10 压缩查询字符串的技术，另一种巧妙地使用函数操作，而非实际地替换
```

### 7.6 利用正则表达式解决常见问题

修剪字符串
```js
function trim(str) {
  return (str||"").replace(/^\s+|\s+$/g, "");
}  // 最常用的一种方式，另外还有2种方案 P165
```

匹配换行符
```js
方案1(最佳方案)：/[\S\s]*/ 
方案2： /(?:.|\s)*/
```

Unicode
```js
/[\u0080-\uFFFF]+/  // 匹配代码在128（十六进制为0x80）以上的字符，中文编码范围\u4E00-\u9FA5
```

转义字符


## 8. 驯服线程和定时器

定时器并不是 JavaScript 的一项内置功能，而是由浏览器提供的。

如果能在复杂应用程序中正确应用定时器的话，就会给开发人员带来非常多的好处。

定时器提供了一种让一段代码在一定毫秒之后，再异步执行的能力。

JavaScript 是单线程执行的，定时器提供了一种跳出这种限制的方法。

提示：HTML5 Web worker 将会对定时器作出很多改变，但目前浏览器支持还不好。

### 8.1 定时器和线程是如何工作的

#### 8.1.1 设置和清除定时器

| 方法          | 格式
|---------------|---------------------------
| setTimeout    | id=setTimeout(fn,delay)
| clearTimeout  | clearTimeout(id)
| setInterval   | id=setInterval(fn,delay)
| clearInterval | clearInterval(id)

#### 8.1.2 执行线程中的定时器执行

JavaScript 引擎是单线程执行，异步事件必须要排队等待才能执行。

同一个 interval 处理程序的多个实例不能同时进行排队，如果已经有一个 interval 回调的实例在排队了，那么后续的调用将被废弃。

#### 8.1.3 timeout 与 interval 之间的区别

interval 定时器会按指定时间间隔触发一次，而 timeout 需在执行之后重新设定定时器。

```js
setTimeout(function repeatMe() { /* Some long block of code... */ setTimeout(repeatMe, 10); }, 10);
setInterval(function() { /* Some long block of code... */ }, 10);
```

### 8.2 定时器延迟的最小化及其可靠性

### 8.3 处理昂贵的计算过程

JavaScript 的单线程本质可能是 JavaScript 复杂应用程序开发中的最大“陷阱”。在 JavaScript 执行繁忙的时候，浏览器中的用户交
互会减缓，甚至反应迟钝，最坏的情况是直接挂掉。因此，如果要保持界面有良好的响应能力，减少运行时间超过几百毫秒的复杂操作，将其控制在可管理状态是非常必要的。

通过将运算分成多个小操作，并设定定时器依次调用，从而使浏览器在执行间隙有机会处理用户响应。

该技术显示了，使用定时器解决浏览器环境的单线程限制是多么容易的事情，而且还提供了很好的用户体验。

### 8.4 中央定时器控制

同时创建大量的定时器，将会给管理和执行效率带来很大的干扰，减少同时使用定时器的数量，将大大有助于解决这种问题，这就是为什么所有现代动画引擎都使用一种称为中央
定时器控制的技术（central timer control）。

在多个定时器中使用中央定时器控制，可以带来很大的威力和灵活性。

  * 每个页面在同一时间只需要运行一个定时器
  * 可以根据需要暂停和恢复定时器
  * 删除回调函数的过程变得简单

```js
//在原例子上有改动，调试正常
var timers = {
  timerID: 0,
  timers: [],
  add: function(fn) { this.timers.push(fn); },
  start: function() {
    if (this.timerID) return; //保证只有一个中央定时器在执行
    (function runNext() {
      if (timers.timers.length = 0) return;
      for (var i = 0; i &lt; timers.timers.length; i++) {
        if (timers.timers[i]() === false){ timers.timers.splice(i,1); i--;}
      }
      timers.timerID = setTimeout(runNext, 0);
    })();
  },
  stop: function(){ clearTimeout(this.timerID); this.timerID = 0; }
};
```

### 8.5 异步测试

```js
(function() {  // 向 window 添加了 test pause resume 三个方法
  var queue = [], paused = false;
  this.test = function(fn) { queue.push(fn); runTest(); };
  this.pause = function() { paused = true; };
  this.resume = function() { paused = false; setTimeout(runTest, 1); };
  function runTest() {
    if (!paused && queue.length) { queue.shift()(); if (!paused) resume(); }
  }
})();
test(function() {
  pause();  // 这里按了暂停后，如果没有下行的resume()，那么后续测试将无法继续
  setTimeout(function(){assert(true, "First test completed"); resume(); }, 100);
});
test(function() {
  pause();  // 暂停测试队列，进入异步任务
  /* 异步任务开始 */
  /* 异步任务结束 */
  resume();  // 异步任务完成后重启测试队列
});
```
