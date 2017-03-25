# 高性能 JavaScript

## 1. 加载和执行

https://stevesouders.com/

JS 的阻塞特性：当浏览器遇到 `<script>` 标签时，当前 HTML 页面无从获知 JS 是否会修改页面内容，因此浏览器会停止处理页面，在 js 代码执行后才继续解析和渲染页面。

~~由于脚本会阻塞页面其他资源的下载~~，因此推荐将所有 `<script>` 标签尽可能放到 `<body>` 标签的底部，以尽量减少对整个页面下载的影响。

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

### 总结

* 将所有 `<script>` 标签放到 `</body>` 之前，这能确保在脚本执行前页面已经完成渲染
* 有多种无阻塞下载 js 的方法：
    1. 使用 `defer` `async` 属性
    2. 动态创建 `<script>` 元素

HTML5 规范中引入了 `defer` `async` 属性用于异步加载脚本，避免在下载过程中出现阻塞。两者区别在于执行时机，`async` 是加载完成后自动执行，而 `defer` 需要等待页面完成后执行。

动态创建脚本，就是通过 js 代码创建新的 `<script>` 标签来加载 js 文件。这种技术的重点在于：无论何时启动下载，文件的下载和执行过程不会阻塞页面其他进程。在 `defer` `async` 没有得到普遍支持时，这种方式具有跨浏览器兼容和易用的特点，但现今已经没有使用的必要了。

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

#### 理解作用域

每个函数( Function 对象的一个实例) 都有一个内部属性 `[[Scope]]`，包含了一个函数被创建的作用域中的对象的集合，这个集合被称为函数的作用域链，它决定哪些数据能被函数访问。

执行函数时会创建一个称为执行环境/执行上下文 (execution context) 的内部对象。一个执行环境定义了一个函数执行时的环境。函数每次执行时对应的执行环境都是独一无二的，所以多次调用同一个函数就会导致创建多个执行环境。当函数执行完毕，执行环境即被销毁。

每个执行环境都有自己的作用域链，用于解析标识符。当执行环境被创建时，它的作用域链初始化为当前运行函数的 `[[Scope]]` 属性中的对象。这些值按照它们出现在函数中的顺序，被复制到执行环境的作用域链中。最后，会创建被称为 **活动对象 activation object** 的变量对象，包含所有局部变量、命名参数、参数集合 以及 `this`，然后此对象被推入到作用域链的最前端。

在函数执行过程中，每遇到一个变量，都会从作用域链头部(活动对象)开始，逐级搜索同名标识符。

### 试验

```js
// 简单的性能测试函数，默认执行 8k 次
function test(fn, times = 8000) {
  let start, stop;
  start = new Date().getTime();
  while (times--) { fn(); }
  stop = new Date().getTime();
  return stop - start + ' ms';
}
```


## DOM 编程
