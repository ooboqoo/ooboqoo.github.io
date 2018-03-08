# XMLHttpRequest / Fecth / SSE / WebSocket


## XMLHttpRequest

```js
function showHint(str) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'gethint.php?q=' + str, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById('txtHint').innerHTML = xmlhttp.responseText;
        }
    }
}
```

### 跨域解决方案

相关文章：   
http://www.html5rocks.com/en/tutorials/cors/   
https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

#### 1. 什么是跨域

出于安全方面的考虑，浏览器不允许跨域调用外部资源。跨域的具体定义如下：

* 同一级域名 + 同子域名 + 同协议 + 同端口：同源
* 以上任意一个不同：跨域
* 域名和域名对应ip：跨域

同源策略到底有多重要：ATM 机上被人安装了读卡器而导致资金失窃的新闻听过吧，然后想象下网银什么的...

#### 2. CORS 规范 Cross-Origin Resource Sharing

W3C 的 CORS 规范通过在 HTTP headers 中加入相应字段来指示浏览器对跨域请求的控制。下面逐步分析 CORS 的工作过程：

1. 用户代码发起了一个跨域请求(domainA 向 domainB 发起请求)
2. 浏览器发送请求，如果是跨域请求，就会在请求头中加入了 `Origin` 字段来声明请求域名(domainA)
3. 服务器发回响应，响应头中包含了 `Access-Control-Allow-Origin` 字段，指示允许访问的域名
4. 如果请求域名不在允许域名范围之内，或者响应头根本就没包含 `Access-Control-Allow-Origin` 字段，那么浏览器就会报错。

注：支持 CORS 规范的服务器可以通过检查 `Origin` 字段来决定响应内容；不支持该规范的服务器返回的响应头中不包含  `Access-Control-Allow-Origin` 字段，也就等于默认拒绝了请求。

##### 服务器端设置

只要设置 Http Header 允许跨域名请求即可，如下是 php 单页面的设置方法，也可以通过配置服务器自动发送。

```php
<?php
if (preg_match('/localhost|github.io/i', $_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    // 发送响应内容
};
```

#### 3. 后台服务器代理

首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。

#### 4. JSONP 传输协议

http://kb.cnblogs.com/page/139725/

JSON(JavaScript Object Notation) 和 JSONP(JSON with Padding) 虽然只有一个字母的差别，但其实他们根本不是一回事儿：JSON 是一种数据交换格式，而 JSONP 是一种依靠开发人员的聪明才智创造出的一种非官方跨域数据交互协议。

##### 实现原理

Ajax 直接请求普通文件存在跨域无权限访问的问题，但 Web 页面上调用 js 文件时则不受是否跨域的影响(不仅如此，凡是拥有 `src` 属性的标签都拥有跨域的能力，比如 `<script>` `<img>` `<iframe>`)，正是利用这点，产生了一种非正式的传输协议，人们把它称作 JSONP。

##### 具体实现

该协议的一个要点就是允许用户传递一个 callback 参数给服务端，然后服务端返回数据时会将这个 callback 参数作为函数名来包裹住 JSON 数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

```js
var flightHandler = function(data){
    alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
};
// 提供 jsonp 服务的 url 地址（不管是什么类型的地址，最终生成的返回值都是一段 js 代码）
var url = "http://flightQuery.com/jsonp/flightResult.php?code=CA1998&callback=flightHandler";
// 创建 script 标签，设置其属性
var script = document.createElement('script');
script.setAttribute('src', url);
// 把 script 标签加入 head，此时调用开始
document.getElementsByTagName('head')[0].appendChild(script);
```

```php
<?php
// 注意，这里不能加入 Origin 检查，因为这种使用方式浏览器不会发送 Origin
header("content-type:application/x-javascript; charset=UTF-8");
echo $_REQUEST["callback"] . '({price: free, tickets: 14});';
```

#### 5. 框架间的交互

##### 同主域下的子域间的交互

不同域的框架之间是不能进行 JS 交互操作的，但如果是在主域下的不同子域，可以通过声明将自己提升到主域，从而实现交互。

```js
// 不同子域，如 a.e.com b.e.com 等都通过声明升级到 e.com 就可以实现交互
document.domain = 'e.com';  // 要进行交互操作的框架都要设置，这样就同源了
```

同源 iframe 与宿主页面之间互访

```js
// parent.html <iframe src="inner.html" name="inner"></frame>
window.inner.funcInner();
// inner.html
parent.funcOuter();
```

##### window.postMessage 方法

HTML5 中新引进了 window.postMessage 方法以实现框架间的信息沟通，没有跨域限制。

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
    // messsage 可以是原始类型或对象，如果是对象，系统会自动序列化
    // targetOrigin 指定目的窗口的 origin，可用 * 但出于安全考虑，建议指定具体 origin，并在消息接收端进行检查
```

实测 Chrome 还是会阻止消息，而 IE 正常，应该是 Chrome 的临时性 bug。[解决方案在这里](https://groups.google.com/a/chromium.org/forum/#!searchin/chromium-discuss/postMessage/chromium-discuss/RhgzRx7Dlu0/AtETniGqAgAJ)

##### ~~通过 window.name 在不同框架间交互（经试验此方法已过时失效）~~


## Fetch API

暂略


## Server-Sent events

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

要使网页与服务器保持长期的联系，可采用轮询，但效率不高，且会给服务器造成无谓的压力，于是有了新方案——服务器发送事件。

顾名思义，轮询就是每隔一定时间(如10s)就向Web服务器请求新数据。为了实现这个操作，可以使用 `setInterval()` 或 `setTimeout()` 函数，每过设定的时间就触发一次代码。轮询是一个合理的方案，但有时候效率不高。因为轮询意味着要向服务器发送请求，要建立新连接，而这样做只是想知道是否有新数据。如果成千上万的用户都这样轮询，无疑会给服务器造成无谓的压力。

另一种方案，服务器发送事件，可以让网页与Web服务器保持连接。服务器任何时候都可以发送消息，而不必频繁断开连接，然后再重新连接并重新运行服务器端脚本(除非你希望如此，因为服务器发送事件也支持轮询)。最关键的是，使用服务器发送事件很简单，大多数Web主机都支持，而且极其稳定可靠。在服务器端，只需要按照一定的格式返回事件流，在客户端中，只需要为一些事件类型绑定监听函数，和处理其他普通的事件没多大区别。

### 消息格式

与使用 XMLHttpRequest 不同，服务器发送事件这个标准不允许随意发送数据，而是必须遵循一个简单但明确的格式。每条消息必须以 data: 开头，然后是实际的消息内容，再加上换行符（PHP等很多编程语言中用 \n\n 表示换行符）。如果要把一条消息分成多行，每行都要跟一个行结束符，用 \n 表示。

除了消息本身之外，Web服务器还可以发送唯一的ID值（使用 id: 前缀）和一个连接超时选项（使用 retry: 前缀）。你的网页一般只关注消息本身，不关心ID和连接超时信息。ID和超时信息是浏览器要使用的。

```txt
id: 495\n
retry: 15000\n
data: {\n
data: "messageType": "statusUpdate",\n
data: "messageData": "Work in Progress"\n
data: }\n\n
```

### 服务器脚本实现

```php
<?php
header("Content-Type: text/event-stream");  // 按服务器端事件标准规定设置MIME类型
header('Cache-Control: no-cache');          // 告诉Web服务器（及代理服务器）关闭缓存
ob_end_clean();                             // 关闭PHP内置的缓冲机制
echo "retry: 120000" . PHP_EOL;             // 告诉浏览器在连接关闭后等待2分钟再重连
do {                                        // 开始不间断的循环
    $currentTime = date("h:i:s", time());   // 取得当前时间
    echo "data: " . $currentTime . PHP_EOL; // 把时间放到消息中发送
    echo PHP_EOL;                           // 常量 PHP_EOL 在表示行结束符 \n
    flush();                                // 立即发送数据，而不是先缓冲起来
    sleep(2);                               // 等两秒钟再创建新消息
} while(true);
?>
```

上例中服务器脚本一直保存运行，但事实上，保持客户端页面一段时间后，HTTP 会话被服务器因超时中断。这时，客户端将在3秒(默认值，可通过 `retry:` 更改)后，再次发出 GET 请求，直到服务端再次中断(这个过程就是轮询)。

### 在网页中处理消息

```js
var source;
var messageLog = document.getElementById("messageLog");
// 启动监听的代码
function startListening() {
    source = new EventSource("http://localhost/ServerEvents.php");
    source.onmessage = receiveMessage;
    messageLog.innerHTML += "<br>" + "Started listening for messages.";
}
// 结束监听的代码
function stopListening() {
    source.close();
    messageLog.innerHTML += "<br>" + "No longer listening for messages.";
}
// 处理接收信息的代码
function receiveMessage(e) {
    messageLog.innerHTML += "<br>" + "New web server time received: " + e.data;
}
```

提示：可以测试是否存在 `window.EventSource` 属性，如果不存在，就要使用后备方案，如轮询(有现成的polyfill)。

注意：网页接收到的消息不会包含前缀 `data:` 和结束的 `\n\n` 符号，只有其中的消息内容。

### 轮询服务器端事件

前面的例子以最简单的方式使用了服务器端事件：页面发送请求，连接保持打开，服务器定时发送信息。在当前连接有问题或者出于其他目的临时终止了通信时，浏览器可能需要重新连接(重新连接也是自动的)。

如果服务器脚本结束了，而且服务器关闭了连接怎么办？即便服务器有意关闭连接，网页仍然会自动重新打开连接(默认等待3s)，再次请求脚本，然后从头开始。

这种机制是可以利用的。比如，假设你写了一个比较短的服务器脚本，只发送一条消息。而此时网页就像在使用轮询，周期性地重新建立连接。唯一的差别就是Web服务器会告诉浏览器再等待多长时间才能检查新数据。在真正使用轮询的网页中，等待时间是在 js 代码中确定的。

服务器可能会在执行某个任务期间就把连接断开。这种情况下，服务器代码需要给每个客户端发送一个ID，以便重新连接时再把这个ID发给服务器。服务器端代码必须负责生成ID、记录每个ID的操作，以及在停止处进行恢复等。


## WebSocket

http://www.ibm.com/developerworks/cn/java/j-lo-WebSocket/

服务器发送事件非常适合从服务器连续不断地接收消息。但整个通信完全是单向的，服务器无法知道浏览器是否响应，也不能进行更复杂的对话。

在 WebSocket 出现之前，如果你想创建一个应用，浏览器与服务器需要正式对话，那你很可能使用 XMLHttpRequest 对象。使用 XMLHttpRequest 对象在很多情况下没有问题，但同样也有很多情况不合适。首先， XMLHttpRequest 不适合快速地来回发送多条消息(如聊天室)。其次，没有办法将一次调用与下一次调用联系起来，每次网页发送请求，服务器都要确定请求来自何方。在这种情况下，要想把一系列请求关联起来，服务器端代码会变得非常复杂。

还有一种方案基于 Flash，AdobeFlash 通过自己的 Socket 实现完成数据交换，再利用 Flash 暴露出相应的接口为 JavaScript 调用，从而达到实时传输目的。此方式比轮询要高效，且因为 Flash 安装率高，应用场景比较广泛，但在移动互联网终端上 Flash 的支持并不好。IOS 系统中没有 Flash 的存在，在 Android 中虽然有 Flash 的支持，但实际的使用效果差强人意。2012 年 Adobe 官方宣布不再支持 Android4.1+ 系统，宣告了 Flash 在移动终端上的死亡。

传统 Web 模式在处理高并发及实时性需求的时候，会遇到难以逾越的瓶颈，我们需要一种高效节能的双向通信机制来保证数据的实时传输。在此背景下，基于 HTML5 规范的、有 Web TCP 之称的 WebSocket 应运而生。使用 WebSocket，浏览器能够保持对Web服务器打开的连接，从而与服务器长时间交换数据。WebSocket 标准让开发人员非常兴奋，而且已经获得多数浏览器的支持，但 IE 到 IE10 之后才支持。

提示：WebSocket 有点繁琐。比如，在支持它的浏览器上运行也会出问题，可能是因为电脑网络设置的限制、防火墙或者杀毒软件。
可以连接 http://websocketstest.com 测试一下 WebSocket 能否工作。

使用 WebSocket 之前，必须理解两点。第一，WebSocket 是一种专用手段，非常适合开发聊天室、大型多人游戏，或者端到端的协作工具。利用它能开发出很多新应用，但恐怕不太适合普通的Web应用(如电商网站)。
第二，WebSocket 方案做起来可能会无比复杂。网页中的 js 代码很简单，可服务器端代码不好写，为此必须熟练掌握编程技能，而且要对多线程和网络模型有深刻理解。

WebSocket 是 HTML5 一种新协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据，但是它和 HTTP 最大不同是：

* WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和 Browser/Client Agent 能主动的向对方发送或接收数据，就像 Socket 一样；
* WebSocket 需要类似 TCP 的客户端和服务器端通过握手连接，连接成功后才能相互通信。

### 服务器

为了使用 WebSocket，需要在服务器上运行一个程序(也叫 WebSocket 服务器)。这个程序负责协调各方通信，而且启动后就会不间断地运行下去。

很多 Web 主机不允许长时间运行程序，如果你使用的是共享主机，那很可能无法创建使用 WebSocket 的网页。就算能启动，Web主机商也会检测它并把它关掉。

多数开发人员都没有利用 Socket 创建过服务器端程序，因为这样做明显代价太大。最简单的办法是安装别人写好的 WebSocket 服务器，然后再设计网页来与之通信。

### 客户端

从网页的角度看，WebSocket 很容易理解，也很容易使用。

```js
var socket;
window.onload = function () {
    connect();
}
function connect() {
    // 创建连接时 URL 以 ws:// 开头，这是 WebSocket 连接的新协议，同时还支持以 wss:// 开头的加密连接
    // WebSocket 连接没有跨域限制
    socket = new WebSocket("ws://localhost/socketServer.php")
    socket.onopen = connectionOpen;
    socket.onmessage = messageReceived;
    socket.onerror = errorOccurred;
    socket.onclose = connectionClosed;
}
function disconnect () {
    socket.close();  // 关闭连接，一旦关闭，就不能再发送消息，除非重新创建 WebSocket 对象
}
```

如你所见，WebSocket 对象惊人地简单。事实上，我们已经介绍完它所有的方法和事件了。使用其他人写好的 WebSocket 服务器并不费事，只要知道发送什么消息，以及服务器会发回什么消息即可。

注意：建立 WebSocket 连接时，后台其实会执行很多处理工作。首先，网页要使用常见的 HTTP 标准与服务器建立联系，然后再把连接“升级”到 WebSocket 连接，以便浏览器与服务器能够双向通信。此时，如果计算机与服务器之间有代理服务器(比如在公司网络中)，可能会遇到问题，代理服务器可能会拒绝请求并断开连接。对于这种问题，可以检测失败的连接(通过 onError 事件)，然后使用腻子脚本来作为后备，这些脚本会使用轮询来模拟 WebSocket 连接。


## 服务侧消息推送方案调研

### 技术调研原因

1. 后期数据量会变大，RestfulAPI 刷新过于频繁会拖累服务器
2. 后台变化能在第一时间展现到前端监控面板

### 参考资源

https://www.zhihu.com/question/24938934/answer/29567191  
https://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource  
https://developer.mozilla.org/en-US/docs/Web/API/EventSource

### 可选的技术方案

* 轮询 - 前端按特定时间间隔向服务器请求
* WebSocket - 基于 TCP 的一个双向通信协议，独立于 HTTP
* SSE 服务器推送事件

| 技术方案  |   浏览器兼容性   |   备注
|-----------|------------------|--------------------------------------------------|
| 轮询      | 全兼容           | 是对长连接的一种模拟实现，优势在于兼容性好       |
| WebSocket | IE10+            | 前端对 IE9 兼容的库多数需要 Node.js 服务器配合   |
| SSE       | IE/Edge 都不支持 | 服务器实现简单，前端对 IE 的兼容也比较简单       |

### 推荐的技术方案

服务器用 SSE
客户端用 SSE + 轮询(fallback)

我们目前的需求，没有要求客户端和服务器实现双向通信，SSE 能够满足需求。另外 SSE 的优势是，前后端实现都相对简单。
