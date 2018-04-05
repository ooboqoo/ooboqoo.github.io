# 浏览器原理解析

https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/


## 概述

### 浏览器加载过程

- 在接收到用户输入的网址后，浏览器会开启一个线程来处理这个请求
- 调用浏览器引擎中的对应方法，如 WebView 中的 loadUrl 方法，分析并加载这个 URL
- 通过 DNS 解析获取网址对应的 IP
- 进行 HTTP 协议会话，向服务器发送报文(含 Cookie userAgent 等信息)
- 服务器开始处理请求，PHP Java 等后端应用根据路由找到对应的处理逻辑，这期间可能会读取服务器缓存或查询数据库
- 服务器处理请求并返回响应报文
- 浏览器开始下载 HTML 文档(报头状态码为200) 或者读取本地缓存(缓存有效或报头状态码为304)
- 浏览器根据下载接收到的 HTML 解析结构建立 DOM 文档树，并下载外部资源、设置缓存等
- 根据 DOM 树生成呈现树，结合 CSS 规则进行布局和绘制
- JS 操作 DOM、读取浏览器缓存、执行事件绑定等

注1：JS 代码会阻塞浏览器引擎的解析过程  
注2：渲染引擎在解析 HTML 时，会根据当前已有资源实时刷新显示(第一时间呈现)

```html
<!DOCTYPE html>
<html>
<head>
  <style>div { color:red; }</style>
  <title>样式在加载中多次刷新</title>
</head>
<body>
  <div>line1</div>
  <script>debugger;</script>
  <div>line2</div>
  <style>div { color:green; }</style>
  <script>debugger;</script>
  <div>line3</div>
  <style>div { color:blue; }</style>
</body>
</html>
```

### 资源请求与加载阶段

> Chrome DevTools > Network > Timing 可看到用户访问网站发送资源请求的全过程

```txt
Resource Scheduling   资源调度阶段
  Queueing   排队

Connection Start   建立连接阶段
  Stalled   等待
  Proxy negotiation   代理协商
  DNS Lookup   DNS 查询
  Initial connection   初始连接 - TCP 握手 和 协商 SSL (下面的 SSL 时间包含在这部分时间内)
  SSL   SSL 握手

Request/Response   请求/响应阶段
  ServiceWorker Preparation   (如果有 ServiceWorker 则由其负责资源响应)
  Request to ServiceWorker
  Request sent   发送请求
  Waiting (TTFB)   等待初始响应
  Content Download   完成数据接收
```

Timing breakdown phases explained

* __Queueing__ - The browser queues requests when:
  * There are higher priority requests, 如图片请求就可能会被推迟下载.
  * There are already **6** TCP connections open for this origin. Applies to HTTP/1.0 and HTTP/1.1 only.
  * The browser is briefly allocating space in the disk cache
* __Stalled__ - The request could be stalled for any of the reasons described in Queueing.
* __DNS Lookup__ - The browser is resolving the request's IP address.
* __Proxy negotiation  __ - The browser is negotiating the request with a proxy server.
* __Request sent__ The request is being sent.
* __ServiceWorker Preparation__ The browser is starting up the service worker.
* __Request to ServiceWorker__ The request is being sent to the service worker.
* __Waiting (TTFB)__ The browser is waiting for the first byte of a response. TTFB stands for Time To First Byte. This timing includes 1 round trip of latency and the time the server took to prepare the response.
* __Content Download__. The browser is receiving the response.
* __Receiving Push__. The browser is receiving data for this response via HTTP/2 Server Push.
* __Reading Push__. The browser is reading the local data previously received.

为了实现网站的快速响应，首先需要考虑的就是减少资源访问及加载阶段所消耗的时间。使用 HTTP 1.0/1.1 协议时，每个域同时最多只能有 6 个 TCP 连接，因此可通过**划分子域**的方式，将多个资源分布在不同子域上用来减少请求队列的等待时间。然后，划分子域并不是一劳永逸的方式，多个子域意味着更多的 DNS 查询时间。通常把域名拆分为 3 到 5 个比较合适。

如果能够使用 **CDN 服务**来托管静态资源，对网站的性能提升更大。

HTTP 是一个无状态的面向连接的协议，即每个 HTTP 请求都是独立的。然而无状态并不代表 HTTP 不能保持 TCP 连接，`Keep-Alive` 正是 HTTP 协议中保持 TCP 连接非常重要的一个属性。在 HTTP1.1 协议中，`Keep-Alive` 默认打开，使得通信双方在完成一次通信后仍然保持一定时长的连接，因此浏览器可以在一个单独的连接上进行多个请求，有效地降低建立 TCP 请求所消耗的时间。

HTTP2.0 协议提供了单个 TCP 连接**多路复用**的能力，极大地提高了 Web 应用的性能。

TTFB 所消耗的时间，更多体现在服务器的处理能力上，通常认为不应超过 200ms。可以设置 CDN 加速以减少客户端到服务器的网络距离，也可以设置服务器缓存并通过文件头设置 `Expires` 或 `Cache-Control` 来控制缓存。在处理访问静态资源的性能优化上，上述方法尤其重要。

### 网页渲染阶段

> Chrome DevTools > Performance 可查看页面渲染过程中各阶段的时间消耗情况

网站响应速度的快慢，不仅限于网站资源加载的速度，网页渲染速度和JS的运行速度同样直接影响着网站的整体性能，这一点在重度交互的网站应用中体现地愈发充分。


## 浏览器组成结构

通常我们认为浏览器主要有七部分组成
  * 用户界面 - 包括地址栏、前进/后退按钮、书签菜单等
  * 浏览器引擎 - 在用户界面和呈现引擎之间传送指令
  * 渲染引擎 - 负责解析并显示请求的内容
  * 网络 - 用于网络调用，比如 HTTP 请求
  * JS 引擎 - 用于解析和执行 JavaScript 代码
  * UI 后端 - 用于绘制基本的窗口小部件，比如组合框和窗口
  * 数据存储 - 持久层，含 Cookie LocalStorage 等

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)

### 主流浏览器引擎

https://en.wikipedia.org/wiki/Comparison_of_web_browser_engines  
https://kangax.github.io/compat-table/es6/

* 常见渲染引擎 Blink/CH(谷歌fork自WebKit)  WebKit/SF  Gecko/FF  EdgeHTML/Edge(微软fork自IE的Trident)
* 常见JS引擎: V8/Ch  SpiderMonkey/FF  JavaScriptCore/SF  Chakra/Edge

页面的绘制，只有一半轮子是 Chrome 自己做的，还有一部分来自于 WebKit，这个 Apple 打造的 Web 渲染器。之所以说是一半轮子来源于 WebKit，是因为 WebKit 本身包含两部分主要内容，一部分是做 HTML 渲染的，另一部分是做 JavaScript 解析的。在 Chrome 中，只有 HTML 的渲染采用了 WebKit 的代码，而在 JavaScript 上，重新搭建了一个NB哄哄的 V8 引擎。目标是，用 WebKit+V8 的强强联手，打造一款上网冲浪的法拉利，从效果来看，还着实做的不错。。。

不过，虽说 Chrome 和 WebKit 都是开源的，并联手工作。但是，Chrome 还是刻意的和 WebKit 保持了距离，为其始乱终弃埋下了伏笔。Chrome 在 WebKit 上封装了一层，称为 WebKit Glue。Glue 层中，大部分类型的结构和接口都和 WebKit 类似，Chrome 中依托 WebKit 的组件，都只是调用 WebKit Glue 层的接口，而不是直接调用 WebKit 中的类型。按照 Chrome 自己文档中的话来说，就是，虽然我们在用 WebKit 实现页面的渲染，但通过这个设计(加一个间接层...)已经从某种程度大大降低了与 WebKit 的耦合，使得可以很容易将 WebKit 换成某个未来可能出现的更好的渲染引擎。。。

### 渲染引擎

渲染引擎在浏览器中主要负责解析 HTML 文档和 CSS 文档，然后将 CSS 应用到 HTML 元素标签上。基本工作流程包含以下步骤：

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/flow.png)

**构建DOM树** 渲染引擎开始解析 HTML 文档，并将各标记逐个转化成 DOM 树上的 DOM 节点。同时也会解析外部 CSS 文件以及样式元素中的样式数据。HTML 中这些带有视觉指令的样式信息将用于创建另一个树结构：呈现树。

**构建呈现树** 呈现树包含多个带有视觉属性(如颜色和尺寸)的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。

**布局** 就是为每个节点分配一个应出现在屏幕上的确切坐标。

**绘制** 渲染引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。

It's important to understand that this is a **gradual process**. For better user experience, the rendering engine will try to display contents on the screen as soon as possible. It will not wait until all HTML is parsed before starting to build and layout the render tree. Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming from the network.


## 渲染引擎详解

### 主流程

Webkit 渲染流程  
![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)

Gecko 渲染流程  
![](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/image008.jpg)

这里我们要关注的是呈现树的布局阶段和绘制阶段。页面生成后，如果页面元素位置发生变化，就要从布局阶段开始重新渲染，也就是页面重排，页面重排一定会进行后续重绘。如果页面只是显示样式改变而布局不变，那么就可以直接绘制。重排的代价是巨大的，所以应尽量避免重排。

### 解析综述

### HTML 解析

DOM 是文档对象模型 (Document Object Model) 的缩写。它是 HTML 文档的对象表示，同时也是外部内容（例如 JavaScript）与 HTML 元素之间的接口。DOM 树的根节点是 Document 对象。

### CSS 解析

WebKit 使用 Flex 和 Bison 解析器生成器，通过 CSS 语法文件自动创建解析器。

### 处理脚本和样式表的顺序

#### 脚本

网络的模型是同步的。网页作者希望解析器遇到 `<script>` 标记时立即解析并执行脚本。文档的解析将停止，直到脚本执行完毕。如果脚本是外部的，那么解析过程会停止，直到从网络同步抓取资源完成后再继续。此模型已经使用了多年，也在 HTML4 和 HTML5 规范中进行了指定。作者也可以将脚本标注为 `defer`，这样它就不会停止文档解析，而是等到解析结束才执行。HTML5 增加了一个选项 `async`，可将脚本标记为异步，以便由其他线程解析和执行。

#### 预解析

WebKit 和 Gecko 都进行了这项优化。在执行脚本时，其他线程会解析文档的其余部分，找出并加载需要通过网络加载的其他资源。通过这种方式，资源可以在并行连接上加载，从而提高总体速度。请注意，预解析器不会修改 DOM 树，而是将这项工作交由主解析器处理；预解析器只会解析外部资源（例如外部脚本、样式表和图片）的引用。

#### 样式表

另一方面，样式表有着不同的模型。理论上来说，应用样式表不会更改 DOM 树，因此似乎没有必要等待样式表并停止文档解析。但这涉及到一个问题，就是脚本在文档解析阶段会请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复，这样显然会产生很多问题。这看上去是一个非典型案例，但事实上非常普遍。Firefox 在样式表加载和解析的过程中，会禁止所有脚本。而对于 WebKit 而言，仅当脚本尝试访问的样式属性可能受尚未加载的样式表影响时，它才会禁止该脚本。

### 呈现树构建

在 DOM 树构建的同时，浏览器还会构建另一个树结构：呈现树。这是由可视化元素按照其显示顺序而组成的树，也是文档的可视化表示。它的作用是让您按照正确的顺序绘制内容。

#### 呈现树和 DOM 树的关系

呈现树是和 DOM 元素相对应的，但并非一一对应。非可视化的 DOM 元素不会插入呈现树中，例如 head 元素。如果元素的 display 属性值为 none，那么也不会出现在呈现树中（但是 visibility 属性值为 hidden 的元素仍会显示）。
有一些 DOM 元素对应多个可视化对象。它们往往是具有复杂结构的元素，无法用单一的矩形来描述。例如，select 元素有 3 个呈现器：一个用于显示区域，一个用于下拉列表框，还有一个用于按钮。如果由于宽度不够，文本无法在一行中显示而分为多行，那么新的行也会作为新的呈现器而添加。
另一个关于多呈现器的例子是格式无效的 HTML。根据 CSS 规范，inline 元素只能包含 block 元素或 inline 元素中的一种。如果出现了混合内容，则应创建匿名的 block 呈现器，以包裹 inline 元素。

有一些呈现对象对应于 DOM 节点，但在树中所在的位置与 DOM 节点不同。浮动定位和绝对定位的元素就是这样，它们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。

### 布局



### 绘制

### 动态变化

### 渲染引擎的线程

### CSS2 可视化模型

### 定位

### 分层展示

