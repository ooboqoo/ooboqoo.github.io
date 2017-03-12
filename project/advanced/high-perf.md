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
