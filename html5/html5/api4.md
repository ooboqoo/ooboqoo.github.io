# Geolocation / Web Workers / History

## HTML Geolocation

> 这功能实际使用没鸟用，国内还是得用百度的服务

地理定位功能实际上是非常简单的。说到底，主要就是 navigator.geolocation 对象的三个方法： getCurrentPosition() 、 watchPosition() 和 clearWatch() 。

要取得访客的位置，可以调用 getCurrentPosition() 方法。当然，查找位置不会立即返回结果，浏览器也不想锁定页面等待位置数据。所以， getCurrentPosition() 方法是异步的，它会立即执行，但不会阻塞其他代码。完成地理定位后，它会触发另一段代码来处理返回的结果。

navigator.geolocation.getCurrentPosition(success[, error[, options]])   
navigator.geolocation.watchPosition(success[, error[, options]]);   
navigator.geolocation.clearWatch(id);

数据结构：

```js
function sucess(Position {
  coords: { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed }, timestamp
  }) { /* some code if sucess */ }
function error(PositionError {code, message}) { /* some code if error */ }
// code: 1 PERMISSION_DENIED | 2 POSITION_UNAVAILABLE | 3 TIMEOUT
PositionOptions{ enableHighAccuracy: Boolean, timeout: milliseconds, maximumAge }
```

应用示例：

```js
var id, target, options;
function success(pos) {
  var crd = pos.coords;
  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('恭喜你已到达目的地');
    navigator.geolocation.clearWatch(id);  // 停止监控
  }
}
function error(err) { console.warn('ERROR(' + err.code + '): ' + err.message); }
target = {latitude: 0, longitude: 0};
options = { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 };
id = navigator.geolocation.watchPosition(success, errir, options);  // 开始监控位置变化
```

## 百度地图 API

[地图 API 示例](http://developer.baidu.com/map/jsdemo.htm)   
[拾取坐标](http://api.map.baidu.com/lbsapi/getpoint/index.html)

## Web Workers

[whatwg.org](https://html.spec.whatwg.org/multipage/workers.html)

主脚本只负责页面交互，其他耗费资源的计算或者 I/O 交给一个个农民工（workers）去处理，将 JS 从单线程扩展到了多线程。

##### Worker API
```
Constructor: Worker()   
Properties: onerror; onmessage   
Methods: postMessage(); terminate()                   // 以上都是 main thread 能调用的属性和方法
DedicatedWorkerGlobalScope: onmessage; postMessage()  // Worker 内部可调用的属性和方法，注意区分

WorkerGlobalScope  // Worker 代码必须放在独立的文件中，Worker 拥有自己的独立全局作用域
Properties         // Worker 代码无法访问页面全局变量，Worker 与页面之间无法互相访问，只能通过消息沟通
  WorkerGlobalScope.caches
  WorkerGlobalScope.console
  IDBEnvironment.indexedDB
  WorkerGlobalScope.location
  WorkerGlobalScope.navigator
  WorkerGlobalScope.onclose
  WorkerGlobalScope.onerror
  WorkerGlobalScope.onlanguagechange
  WorkerGlobalScope.onoffline
  WorkerGlobalScope.ononline
  WorkerGlobalScope.performance
  WorkerGlobalScope.self
Methods
  WindowBase64.atob()
  WindowBase64.btoa()
  WorkerGlobalScope.close()
  ImageBitmapFactories.createImageBitmap()
  WorkerGlobalScope.dump()
  GlobalFetch.fetch()
  WorkerGlobalScope.importScripts()  // 可以在 Worker 文件中导入外部代码
  WindowTimers.setInterval()         // 定时函数也还能使用
  WindowTimers.setTimeout()
  WindowTimers.clearInterval()
  WindowTimers.clearTimeout()
```

##### 完整示例代码

```js
// 主页面代码
worker = new Worker("lib/worker.js");      // 创建一个新 Worker (同时也启动了一个进程)
worker.onmessage = receivedWorkerMessage;  // 收到 Worker 反馈后的处理函数
worker.onerror = workerError;              // 收到 Worker 报错后的处理函数
worker.postMessage({ arg1: "String", arg2: Number, ... });  // 向 Worker 发送信息(指令)

function receivedWorkerMessage(event) { var message = event.data; /* other code here */}
function workerError(error) { alter(error.message); console.log(error); }
function killWorker() { worker.terminate(); worker = null; }  // 终止进程并释放 worker 对象内存

// worker.js 代码
onmessage = function(event) {  // 在 Worker 内部直接调用属性和方法，没有前缀
  var result = doWork(event.data.arg1, event.data.arg2, ...);
  postMessage( { /* some feedback here */ } );
};
```
备注：上面代码中，调用 worker.terminate() 之后，worker 进程已经被终止，虽然 worker 对象还存在，但已经没有用了，调用 worker.postMessage() 不会再有反应。如需再用，必须新建 Worker 对象并重新指定 onmessage onerror 属性。

### 简介
随着 Ajax 和 Web 2.0 应用程序的出现，终端用户被快速响应的 web 应用程序宠坏了。要让 web 应用程序响应得更快，瓶颈一定要解决。瓶颈包括 JavaScript 和后台 I/O 庞大的计算量，这需要从主 UI 显示流程中移除，交给 Web Workers 处理。

Web Workers 出现之前，JavaScript 是现代 web 应用程序的核心。JavaScript 和 DOM 本质上都是单线程的，即使您的计算机有 4 个内核，在进行长期计算时，也只有一个内核比较繁忙。

Web Workers 打破了传统 JavaScript 的单线程模式，引入了多线程编程模式。一个 worker 是一个独立的线程。有多个任务需要处理的 web 应用程序不再需要逐个处理任务。反之，应用程序可以将任务分配给不同的 workers。

### Web Worker 安全措施

多线程带来的隐患是，两段代码可能会争抢同一处数据，导致混乱。

为避免混乱发生，技术规范不允许你在网页之间或 Web Worker之间共享数据。你可以把数据从网页发送到 Web Worker（或者相反），
JavaScript 会自动复制一份，并发送该副本。这意味着不同的线程不能同时占用相同的内存区域，也不会导致微妙的问题。虽然，这种简化的模型会在一定程度上限制 Web Worker 的能力。

让 Worker 运行的代码都要放在一个单独的文件中。网页与Web Worker 之间通过消息来沟通。

### 利用 Web Worker 的其他方式

示例中每次任务开始，页面都会创建一个新的 Worker 对象，每个 Web Worker 对象独立负责一项任务。而且，每个对象只接收一个消息，然后发回一个消息。恐怕实际开发中的页面不会这么简单。下面我们列出一些可能的情况，让你能够进一步扩展这里的例子，进而满足自己的实际需要。

* 在多个任务中重用 Web Woker。Worker 对象完成既定任务，触发 onMessage 事件处理程序后并不会被销毁。它只会闲置在那儿，等待新的任务。如果你再给它发送新的消息，它会马上进入状态，投入新的工作。
* 创建多个 Web Worker。一个页面并不限于只能创建一个 Worker 对象。
* 在一个 Web Worker 中创建另一个 Web Worker。每个 Web Worker 都可以创建自己的
Web Worker，向它们发送消息，从它们那里接收消息。
* 通过 Web Worker 下载数据。Web Worker 可以使用 XMLHttpRequest 对象取得新页面，或者向 Web 服务发送请求。取得了所需的信息后，它们可以调用 postMessage() 方法，把数据发回页面。
* 利用 Web Worker 执行周期性任务。与普通网页中的脚本一样，Web Worker 可以调用 setTimeout() 或 setInterval() 函数。

### 浏览器兼容

Web Workers: Chrome 4.0; IE 10.0; Firefox 3.5; Safari 4.0; Opera 11.5

```js
if (window.Worker) {
    // 那么为什么不创建一个Web Worker并启动呢？
} else {
    // 采用普通阻塞方案，并警告用户，因为浏览器不支持某些功能，可能会导致页面临时卡顿
    // 还有一种替代方案（有点繁琐）是用 setInterval() 或者 setTimeout() 伪造一个后台任务
}
```

## History

HTML5 添加了会话历史管理功能，作为对 JavaScript 历史对象的扩展。

以前的历史对象只有一个属性（length）和三个简单的方法（back forward go），除非你想要定制后退和前进按钮，否则这些属性和方法没有多大用处。

但是，HTML5 又在此基础上添加了一些功能，从而让你能实现原来想做但很难做到的事情。新功能的核心是 pushState() 方法，通过它可以改变浏览器地址栏中的 URL，同时不会导致页面刷新。这是一项非常贴心的技术，特别适合动态加载新内容，同时无阻滞地更新页面的应用。在这种动态页面中，URL 与页面内容无法一一对应，会出现第一个页面加载了另一个页面的内容后，其 URL 仍然保留在浏览器地址栏中的情况。而此时浏览器的收藏夹功能难以反映实际情况。会话历史管理功能为我们提供了解决这个问题的方案。

### URL 问题

利用 AJAX 动态加载内容，不会刷新页面，不会打断用户的注意力。但类似这样的动态页面也存在一个广为人知的限制，即使页面因为加载了新页面而有所变化，但浏览器地址栏中的 URL 却保持不变。也就是说，同一个 URL 可能对应不同的页面内容，要是添加书签，前进后退，或者分享链接，就会出现问题。

### 以往的解决方案：hashbang URL

为解决这个问题，很多人采用一种向网页 URL 末尾添加信息的方式。几年前，Facebook、Twitter 和 Google 这些大公司为他们实现的一种叫 hashbang 的技术兴奋不已，这种技术也极富争议。所谓 hashbang，就是在 URL 末尾加上 `#!`，然后再附加一些信息。看下面这个例子：

` http://jjtraveltales.com/ChinaSites.html#!/Slide5 `

这种技术的依据是浏览器会把 # 后面的所有信息当成URL的附加部分。如果在修改 URL 时没有使用 # 符号，浏览器会马上向 Web 服务器发送请求，企图下载新的页面。

那怎么实现这个 hashbang 技术呢？首先，要在页面每次加载新幻灯片时改变 URL，在 JavaScript 代码中修改 location.href 属性即可。其次，要在页面首次加载时检测 URL，取得附加信息，然后据以从 Web 服务器动态地获取对应的内容。

但 hashbang 方案被广泛使用也饱受争议，主要有以下不足：URL 复杂化；缺乏灵活性；搜索引擎会将不同的 hashbang URL看做一个页面。

大多数人都认同 hashbang 只是 Web 开发历史中很短的一个阶段，很快就会被 HTML5 会话历史功能取代。

### HTML5 的方案：会话历史

HTML5 的会话历史功能为以上 URL 问题提供了不同的方案。会话历史功能允许开发人员把 URL 改成任何形式，而不必非要使用滑稽的 # 号和 ! 号。比如，对于 ChinaSites.html 页面中的第四张幻灯片，可以把 URL 修改成这样：

` http://jjtraveltales.com/ChinaSites4.html `

在这种情况下，浏览器并不会真的请求名为 ChinaSites4.html 的页面，而是还在当前页面，但加载新的幻灯片，这正是我们想要的结果。

理解了会话历史功能的工作原理后（这是最难的部分），实际使用它就容易多了。事实上，会话历史功能只涉及两个方法和一个事件，都属于 history 对象。

#### window.history.pushState(data, title [, url ] ) 方法

第一个参数可以是任何数据，只要你认为它适合表示页面的当前状态。后续可以利用这个参数来恢复页面。   
第二个参数是页面标题，显示在浏览器标题栏，目前所有浏览器都忽略这个参数，所以直接用 null 就好。   
第三个参数是 URL 部分，只能包含网页名部分，也就是说除了能改网页名，其他部分无法用 pushState 修改。

#### onPopState 事件

pushState() 方法会向浏览器的历史记录中存入一个新状态，而 onPopState 事件则意味着用户返回了某个状态，这也就为处理状态变化提供了机会。

这个事件的事件对象中包含着原来通过 pushState() 方法保存的 data 状态信息。你的工作就是根据这些信息，恢复到网页的适当版本。

```js
window.onpopstate = function(e) {
  if (e.state != null) {
  slideNumber = e.state;  //取得幻灯片编号，就是前面 pushState 的 data，当然也可以从URL中取得但相对麻烦些）
  goToNewSlide();  //从Web服务器请求相应的幻灯片
  }
};
```

#### window.history.replaceState(data, title [, url ] ) 方法

用以修改与当前页面相关的状态信息，且不会向历史记录添加任何记录，用得不多。

#### 方案的不足
这个方案也存在一个大问题。如果你想让会话历史如期工作，那么就必须为每个 URL 都创建一个对应的页面，这是因为访客可能会直接访问这些页面。

如果你是经验丰富的程序员，那可以编写一段服务器端代码，解释 Web 请求，动态完成这一组合过程。但如果你没有那么多经验，则要逐个建立页面。
