# 面试题库 - 项目实战

### 静态资源隔离

将静态文件放在主域名下，请求静态文件时都会带上 cookie 数据，浪费流浪、增加服务器对请求头的解析压力，导致整体请求时延增大。

### AJAX 解决浏览器缓存问题

```js
url += `refresh=${Date.now()}`
xhr.setRequestHeader('If-Modified-Since', '0')
xhr.setRequestHeader('Cache-Control', 'no-cache')
```

### 跨域

[/browser/#!web/cors.md](/browser/#!web/cors.md)

### 异步加载 JS 方法

(1) defer，只支持IE
(2) async：
(3) 创建script，插入到DOM中，加载完毕后callBack

### 优化指南

对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

### 优化之 DOMContentLoaded

首屏渲染

js 加载优化

样式加载优化
https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
如果 CSS 文件较大，您便需要确定和内嵌用于呈现首屏内容的 CSS，并暂缓加载其余样式，直到首屏内容显示出来为止。
内嵌较小 CSS 文件的示例
请勿内嵌较大数据 URI
请勿内嵌 CSS 属性






