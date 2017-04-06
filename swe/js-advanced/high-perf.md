# 高性能 JavaScript

## 1. 加载和执行

https://stevesouders.com/

### JS 的阻塞特性

JS 的阻塞特性：当浏览器遇到 `<script>` 标签时，当前 HTML 页面无从获知 JS 是否会修改页面内容，因此浏览器会停止处理页面，在 js 代码执行后才继续解析和渲染页面。

~~由于脚本会阻塞页面其他资源的下载~~，因此推荐将所有 `<script>` 标签尽可能放到 `<body>` 标签的底部，以尽量减少对整个页面下载的影响。

### 小结

* 将所有 `<script>` 标签放到 `</body>` 之前，这能确保在脚本执行前页面已经完成渲染
* 有多种无阻塞下载 js 的方法：
    1. 使用 `defer` `async` 属性
    2. 动态创建 `<script>` 元素
        1. 通过 src 属性下载代码
        2. 通过 XHR 对象下载好代码后，再注入页面

HTML5 规范中引入了 `defer` `async` 属性用于异步加载脚本，避免在下载过程中出现阻塞。两者区别在于执行时机，`async` 是加载完成后自动执行，而 `defer` 需要等待页面完成后执行。

动态创建脚本，就是通过 js 代码创建新的 `<script>` 标签来加载 js 文件。这种技术的重点在于：无论何时启动下载，文件的下载和执行过程不会阻塞页面其他进程。在 `defer` `async` 没有得到普遍支持时，这种方式具有跨浏览器兼容和易用的特点，但现今已经没有使用的必要了。

### 试验

```html
<!DOCTYPE html>
<html>
<head>
  <title>JS 加载影响试验</title>
</head>
<body>
  img1: <img src="img1.jpg" />
  <script src="js1.js"></script>    // 测试时在服务器端设置 8s 延时
  <script src="js2.js"></script>    // 测试时在服务器端设置 4s 延时
  img2: <img src="img2.jpg" />
</body>
</html>
```

```js
// js1.js
function sleep(ms) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < ms) { }
}
console.log('js1 begin to execute.');
sleep(2000);
console.log('js1 finished after 2s');

// js2.js
console.log('js2 begin to execute.');
```

2017/3/12 Chrome v56 实测情况：
1. 首次加载，img1 js1 js2 img2 同时下载；img2 在 js 执行完成后才渲染 (下载不阻塞，加载阻塞)
2. 刷新，img1 js1 js2 同时下载，img2 在 js 执行完成后才开始下载      (下载、加载都阻塞)
3. 虽然 js1 下载完成时间更晚，但会优先执行
4. 给 `<script>` 添加 `async` 属性后，不管是首次加载还是刷新，都是同时下载，然后 img2 渲染，js2 执行，最后 js1 执行

### 最终方案

其实上面讲到的解决方案，目前业界都没有普遍使用，因为下载本身已经是非阻塞的了，而执行，因为引入的脚本往往有前后依赖关系，所以也不便于使用 `async`，目前业界最普遍的用法是：

```html
<body>
  <!-- 主体文档内容 -->
  <script src="js1.js"></script>  <!-- 须优先加载的 js 文件 -->
  <script src="js2.js"></script>  <!-- 对 js1 文件有依赖的其他 js 文件 -->
</body>
```


## 2. 数据存取

JavaScript 有四种基本的数据存取位置：字面量、本地变量、数组元素、对象成员。

访问字面量和局部变量的速度最快，访问数组元素和对象成员相对较慢。

很深的作用域链、原型链、对象成员多层嵌套 等都会明显影响性能。

可以通过把多次引用的对象成员、数组元素、跨域变量保存为本地变量来加快访问速度。

对于像 Chrome 这些进行过优化的现代浏览器，可能性能影响并不是很明显。

### 理解作用域

每个函数( Function 对象的一个实例) 都有一个内部属性 `[[Scope]]`，包含了一个函数被创建的作用域中的对象的集合，这个集合被称为函数的作用域链，它决定哪些数据能被函数访问。

执行函数时会创建一个称为执行环境/执行上下文 (execution context) 的内部对象。一个执行环境定义了一个函数执行时的环境。函数每次执行时对应的执行环境都是独一无二的，所以多次调用同一个函数就会导致创建多个执行环境。当函数执行完毕，执行环境即被销毁。

每个执行环境都有自己的作用域链，用于解析标识符。当执行环境被创建时，它的作用域链初始化为当前运行函数的 `[[Scope]]` 属性中的对象。这些值按照它们出现在函数中的顺序，被复制到执行环境的作用域链中。最后，会创建被称为 **活动对象 activation object** 的变量对象，包含所有局部变量、命名参数、参数集合 以及 `this`，然后此对象被推入到作用域链的最前端。

在函数执行过程中，每遇到一个变量，都会从作用域链头部(活动对象)开始，逐级搜索同名标识符，正式这个搜索过程影响了性能。

一个标识符所在的位置越深，它的读写速度也就越慢，现代浏览器都对此进行了优化，访问跨作用域的标识符时就没有类似的性能损失。

#### 动态作用域

有两个语句可以在执行时临时改变作用域链：with 语句 和 try-catch 语句。

当 try 代码块中发生错误，执行过程会自动跳转到 catch 子句，然后把异常对象推入一个变量对象并置于作用域的首位。在 catch 代码块内部，函数所有局部变量将会放在第二个作用域链对象中。一旦 catch 子句执行完毕，作用域链就会返回到之前的状态。

无论是 with 语句还是 try-catch 语句中的 catch 子句，或是包含 eval() 的函数，都被认为是动态作用域。动态作用域只存在于代码执行过程中，因此无法通过静态分析检测出来。(导致一些优化无法进行)

### 闭包、作用域和内存

闭包是 JS 最强大的特性之一，它允许函数访问局部作用域之外的数据，然而，使用闭包可能会导致性能问题。

```js
let print = (function closure() {
  let i = 10;
  return function print() { console.log(i); };
})();
let i = 5;
print();  // 输出 10
```

示例中，为了让闭包内的 i 能被访问到，必须创建一个特定的作用域链。当 closure 执行时，一个包含变量 i 及其他数据的活动对象被创建，它成为执行环境作用域链中的第一个对象，而全局对象紧随其后。当闭包 print 被创建时，它的 [[Scope]] 属性被初始化为这些对象。

通常 closure 函数的活动对象会随着执行环境一同销毁，但引入闭包时，由于引用仍然存在于闭包 print 的 [[Scope]] 属性中，因此激活对象无法被销毁。这意味着脚本中的闭包与非闭包函数相比需要更多的内存开销(虽然无关紧要)，另外，老 IE 中设计到 DOM 时可能会存在内存泄漏风险。

当闭包代码执行时，会创建一个执行环境，它的作用域链与属性 [[Scope]] 中所引用的作用域链对象一起被初始化。简单将，闭包定义时所处环境的变量定义要优先于执行环境内的变量定义。这就是使用闭包最需要关注的性能点：在频繁访问跨作用域的标识符时，每次访问都会带来性能损失。

在脚本编程中，最好小心地使用闭包，它同时关系到内存和执行速度。


### 试验

```js
// 简单的性能测试函数，默认执行 1k 次
function runTest(title, fn, times = 1000) {
  console.time(title);
  while (times--) { fn(); }
  console.timeEnd(title);
}
```


## 3 DOM 编程

用脚本进行 DOM 操作的代价很昂贵，它是富 Web 应用中最常见的性能瓶颈。

### DOM 访问与修改

浏览器实现中，DOM 与 JS 是两个独立的模块，两个相互独立的功能只要通过接口彼此连接，就会产生消耗。"过桥费" 是个很形象的比喻。

```js
function innerHTMLLoop() {  // 每一步循环都涉及一次 DOM 读 和一次 DOM 写
  for (let count = 0; count < 15000; count++) { document.getElementById('app').innerHTML += 'a'; }
}
function innerHTMLLoop2() {
  let content = ''
  for (let count = 0; count < 15000; count++) { content += 'a'; }
  document.getElementById('app').innerHTML += content; 
}

function runTest(title, fn, times = 1000) {
  console.time(title);
  while (times--) { fn(); }
  console.timeEnd(title);
}

runTest('innerHTMLLoop', innerHTMLLoop, 1);    // 2202 ms  Chrome59 实测
runTest('innerHTMLLoop2', innerHTMLLoop2, 1);  // 8 ms
```

结果显而易见，访问 DOM 的次数越多，代码的运行速度越慢。因此，通用的经验法则是：减少访问 DOM 的次数，把运算尽量留在 JS 这一端处理。

#### innerHTML 对比 DOM 方法

在性能方面，非标准但支持良好的 `innerHTML` 属性与类似 `document.creatElement()` 的原生 DOM 方法比较，innerHTML 往往会更快一些，但差别不是很大。如果对性能要求苛刻，推荐使用 innerHTML，对多数日常操作而言，可以根据可读性、稳定性、团队习惯及编码风格来综合决定使用哪种方式。

#### 节点克隆

使用 DOM 方法更新页面内容的另一个途径是克隆已有元素，而不是创建新元素，也就是使用 `element.cloneNode()` 替代 `document.createElement()`。

#### HTML 集合

`document.getElementsByName()` `document.getElementsByClassName()` `document.getElementsByTagName()` 以及 `document.images` `document.links` `document.forms` `document.forms[0].elements` 等方法和属性的返回值为 HTML 集合对象，这是个类似数组的列表。它们并不是真正的数组(没有 push 等方法)，但提供了一个类似数组的 length 属性，并且还能以数字索引的方式访问列表中的元素。

正如 DOM 标准中所定义的，HTML 集以一种 "假定实时态" 实时存在。事实上，集合一直与文档保持这连接，每次你需要更新信息时，都会重复执行查询过程，哪怕是获取集合里的元素个数，这正是低效之源。

很多情况下如果只需要遍历一个相对较小的集合，那么缓存 length 就够了。但由于遍历数组比遍历集合快，因此先将集合拷贝到数组中，那么访问会更快，但是，这额外的拷贝步骤带了的消耗也是需要考虑的。

一般来说，任何类型的 DOM 访问，需要多次访问同一个 DOM 属性或方法时，最好使用一个局部变量缓存此成员，效果也是非常明显。

#### 遍历 DOM

DOM API 提供了多种方法来读取文档结构中的特定部分，你需要选择针对特定操作最高效的 API。

当只需访问元素节点时，使用 `nextElementSibling` 等 API 比使用 `nextSibling` 等 API 然后再自己实现过滤要高效很多。

当需要过滤元素列表时，最新的 `querySelectorAll()` 要比组合调用一堆方法自己过滤要高效很多。`querySelectorAll()` 方法返回的是一个 NodeList--包含匹配节点的类数组对象，这个方法不会返回 HTML 集合，不会对应实时的文档结构。

### 重绘与重排

浏览器下载完页面中的所有组件--HTML标记 JS CSS 图片--之后会解析并生成两个内部数据结构：DOM 树 和 渲染树。

DOM 树表示页面结构；渲染树表示 DOM 节点如何显示。

DOM 树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点(隐藏的DOM元素在渲染树中没有对应的节点)。渲染树中的节点被称为 "帧 frames" 或 "盒 boxes"，理解页面元素为一个具有内边距 padding 外边距 margins 边框 borders 和位置 position 的盒子。一旦 DOM 和渲染树构建完成，浏览器就开始显示(绘制 paint) 页面元素。

当 DOM 的变化影响了元素的几何属性(宽和高)--比如改变边框宽度或给段落增加文字--浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树，这个过程称为 "重排 reflow"。完成重排后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为 "重绘 repaint"。

并不是所有的 DOM 变化都会影响几何属性，例如改变元素的颜色，在这种情况下，只会发生一次重绘(没有重排)。

重绘和重排操作都是代价昂贵的操作，它们会导致 Web 应用程序的 UI 反应迟钝。所以应尽可能减少这类过程的发生。

#### 重排何时发生



#### 渲染树变化的排队与刷新

#### 最小化重绘与重排

#### 缓存布局信息

#### 让元素脱离动画流

#### IE 与 :hover

### 事件委托


























