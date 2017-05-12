# 浏览器渲染流程

https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/  
http://taligarsiel.com/Projects/howbrowserswork1.htm

### 浏览器加载过程

- 在接收到用户输入的网址后，浏览器会开启一个线程来处理这个请求
- 调用浏览器引擎中的对应方法，如 WebView 中的 loadUrl 方法，分析并加载这个 URL
- 通过 DNS 解析获取网址对应的 IP
- 进行 HTTP 协议会话，向服务器发送报文(含 Cookie userAgent 等信息)
- 服务器开始处理请求，PHP Java 等后端应用根据路由找到对应的处理逻辑，这期间可能会读取服务器缓存或查询数据库
- 服务器处理请求并返回响应报文
- 浏览器开始下载 HTML 文档(报头状态码为200) 或者读取本地缓存(缓存有效或报头状态码为304)
- 浏览器根据下载接收到的 HTML 解析结构建立 DOM 文档树，并下载外部资源、设置缓存等
- 根据 DOM 树生成渲染树，结合 CSS 规则进行布局和绘制
- JS 操作 DOM、读取浏览器缓存、执行时间绑定等

[注1] JS 代码会阻塞浏览器引擎的解析过程  
[注2] 浏览器引擎是逐行往下解析的，此时渲染引擎在另外一个线程上同步工作，会根据当前已有资源实时刷新显示(第一时间呈现)

```html
<!DOCTYPE html>
<html>
<head>
  <style>div {color:red;}</style>
  <title>样式在加载中多次刷新</title>
</head>
<body>
  <div>line1</div>
  <script>debugger;</script>
  <div>line2</div>
  <style>div {color:green;}</style>
  <script>debugger;</script>
  <div>line3</div>
  <style>div {color:blue;}</style>
</body>
</html>
```

### 浏览器组成结构

通常我们认为浏览器主要有七部分组成：用户界面、网络、浏览器引擎、渲染引擎、UI 后端、JS 引擎 和 持久化数据存储。

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)

#### 渲染引擎

渲染引擎在浏览器中主要负责解析 HTML 文档和 CSS 文档，然后将 CSS 应用到 HTML 元素标签上。流程主要包含以下步骤：构建 DOM 树、构建渲染树、布局、绘制。

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/flow.png)

<p style="padding-left:11em; font-weight: 600;">Webkit 渲染流程</p>
![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)

这里我们要关注的是渲染树的布局阶段和绘制阶段。页面生成后，如果页面元素位置发生变化，就要从布局阶段开始重新渲染，也就是页面重排，页面重排一定会进行后续重绘。如果页面只是显示样式改变而布局不变，那么就可以直接绘制。重排的代价是巨大的，所以应尽量避免重排。

Different browsers use different rendering engines: Internet Explorer uses Trident, Firefox uses Gecko, Safari uses WebKit. Chrome and Opera use Blink, a fork of WebKit.

It's important to understand that this is a gradual process. For better user experience, the rendering engine will try to display contents on the screen as soon as possible. It will not wait until all HTML is parsed before starting to build and layout the render tree. Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming from the network.

## 渲染引擎详解

### 主流程

### 解析综述

### HTML 解析

### CSS 解析

### 处理脚本和样式表的顺序

#### 脚本

#### 预解析

WebKit 和 Gecko 都进行了这项优化。在执行脚本时，其他线程会解析文档的其余部分，找出并加载需要通过网络加载的其他资源。通过这种方式，资源可以在并行连接上加载，从而提高总体速度。请注意，预解析器不会修改 DOM 树，而是将这项工作交由主解析器处理；预解析器只会解析外部资源（例如外部脚本、样式表和图片）的引用。

#### 样式表

### 渲染树构建

### 布局

### 绘制

### 动态变化

### 渲染引擎的线程

### CSS2 可视化模型

### 定位

### 分层展示

