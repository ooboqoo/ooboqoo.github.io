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

### 跨域

具体内容在 [/browser/#!web/cors.md](/browser/#!web/cors.md)



## Fetch API

暂略


## Server-Sent events

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

要使网页与服务器保持长期的联系，可采用轮询，但效率不高，且会给服务器造成无谓的压力，于是有了新方案——服务器发送事件。

顾名思义，轮询就是每隔一定时间(如10s)就向Web服务器请求新数据。为了实现这个操作，可以使用 `setInterval()` 或 `setTimeout()` 函数，每过设定的时间就触发一次代码。轮询是一个合理的方案，但有时候效率不高。因为轮询意味着要向服务器发送请求，要建立新连接，而这样做只是想知道是否有新数据。如果成千上万的用户都这样轮询，无疑会给服务器造成无谓的压力。

另一种方案，服务器发送事件，可以让网页与Web服务器保持连接。服务器任何时候都可以发送消息，而不必频繁断开连接，然后再重新连接并重新运行服务器端脚本(除非你希望如此，因为服务器发送事件也支持轮询)。最关键的是，使用服务器发送事件很简单，大多数Web主机都支持，而且极其稳定可靠。在服务器端，只需要按照一定的格式返回事件流，在客户端中，只需要为一些事件类型绑定监听函数，和处理其他普通的事件没多大区别。

### 消息格式

与使用 XMLHttpRequest 不同，服务器发送事件这个标准不允许随意发送数据，而是必须遵循一个简单但明确的格式。每条消息必须以 `data:` 开头，然后是实际的消息内容，再加上换行符(PHP等很多编程语言中用 `\n\n` 表示换行符)。如果要把一条消息分成多行，每行都要跟一个行结束符，用 `\n` 表示。

除了消息本身之外，Web服务器还可以发送唯一的ID值（使用 `id:` 前缀）和一个连接超时选项（使用 `retry:` 前缀）。你的网页一般只关注消息本身，不关心ID和连接超时信息。ID和超时信息是浏览器要使用的。

```txt
id: 495\n
retry: 15000\n
data: {\n
data: "messageType": "statusUpdate",\n
data: "messageData": "Work in Progress"\n
data: }\n\n
```

### 服务器脚本实现

#### PHP

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

#### Node.js

```js
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    var index = './sse.html';  // 默认页面
    var fileName, timer;
    fileName = req.url === '/' ? index : '.' + req.url;
    if (fileName === './stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('retry: 1000\n');
        res.write('data: ' + new Data() + '\n\n');
        timer = setInterval(function () {
            res.write('data: ' + new Data() + '\n\n');
        }, 1000);
        req.connection.addListener('close', funciton () { clearInterval(timer); }, false);
    } else if (fileName === index) {
        // 返回 html
    } else {
        // 报 400 错误
    }
}).listen(8080, '127.0.0.1');
```

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

提示：可以检测是否存在 `window.EventSource` 属性，如果不存在，就要使用后备方案，如轮询(有现成的polyfill)。

注意：网页接收到的消息不会包含前缀 `data:` 和结束的 `\n\n` 符号，只有其中的消息内容。

### 轮询服务器端事件

前面的例子以最简单的方式使用了服务器端事件：页面发送请求，连接保持打开，服务器定时发送信息。在当前连接有问题或者出于其他目的临时终止了通信时，浏览器可能需要重新连接(重新连接也是自动的)。

如果服务器脚本结束了，而且服务器关闭了连接怎么办？即便服务器有意关闭连接，网页仍然会自动重新打开连接(默认等待3s)，再次请求脚本，然后从头开始。

这种机制是可以利用的。比如，假设你写了一个比较短的服务器脚本，只发送一条消息。而此时网页就像在使用轮询，周期性地重新建立连接。唯一的差别就是Web服务器会告诉浏览器再等待多长时间才能检查新数据。在真正使用轮询的网页中，等待时间是在 js 代码中确定的。

服务器可能会在执行某个任务期间就把连接断开。这种情况下，服务器代码需要给每个客户端发送一个ID，以便重新连接时再把这个ID发给服务器。服务器端代码必须负责生成ID、记录每个ID的操作，以及在停止处进行恢复等。


## WebSocket

`ws` 本质上一种计算机网络应用层的协议，用来弥补 `http` 协议在持久通信能力上的不足。

WebSocket 是 HTML5 一种新协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据。

在 WebSocket 出现之前，如果你想创建一个应用，浏览器与服务器需要正式对话，那你很可能使用 XMLHttpRequest 对象。使用 XMLHttpRequest 对象在很多情况下没有问题，但同样也有很多情况不合适。首先， XMLHttpRequest 不适合快速地来回发送多条消息(如聊天室)。其次，没有办法将一次调用与下一次调用联系起来，每次网页发送请求，服务器都要确定请求来自何方。在这种情况下，要想把一系列请求关联起来，服务器端代码会变得非常复杂。

传统 Web 模式在处理高并发及实时性需求的时候，会遇到难以逾越的瓶颈，我们需要一种高效节能的双向通信机制来保证数据的实时传输。在此背景下，基于 HTML5 规范的、有 Web TCP 之称的 WebSocket 应运而生。使用 WebSocket，浏览器能够保持对 Web 服务器打开的连接，从而与服务器长时间交换数据。WebSocket 标准让开发人员非常兴奋，而且已经获得多数浏览器的支持，但 IE 到 IE10 之后才支持。

提示：WebSocket 有点繁琐。比如，在支持它的浏览器上运行也会出问题，可能是因为电脑网络设置的限制、防火墙或者杀毒软件。

### 服务器

为了使用 WebSocket，需要在服务器上运行一个程序(也叫 WebSocket 服务器)。这个程序负责协调各方通信，而且启动后就会不间断地运行下去。

很多 Web 主机不允许长时间运行程序，如果你使用的是共享主机，那很可能无法创建使用 WebSocket 的网页。就算能启动，Web主机商也会检测它并把它关掉。

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

### 其他问题项

#### 会不会丢包或乱序

https://www.zhihu.com/question/53960871/answer/137346451

TCP 负责保证数据准确和完整性，应用层不需要考虑。理论上，如果你发了100个包，第一个没到，后面的先到了，那就都缓存着，API表现为你什么都没收到。要么第一个包重发后尽快到达，要么 buffer 满了傻逼，要么 TCP 自己觉得太久了决定掉线。

TCP 是一个流式设备，是一个虚拟的连接。从 TCP 建立连接开始，到连接正常结束，所有的数据应看成一个整体，它保证的是发送端发送的这个整体和接收端接收的整体是一致的。例如，你整个 TCP 连接存在期间，发送端全部数据是 12345，不论你是怎么发送的，123,45也好，1,234,5也好，对于tcp而言，它保证接收端接收的是12345，不论是1234,5返回也好，12,3,4,5返回也好。而直至TCP断开前，接收端是不知道发送端发送的是多大的数据，怎么发送的，还有多少数据。至于数据的交付方式，则要看各个库的实现，如 lib @vczh Network 里是每 1ms 交付一次，或者收满 1KB 交付一次。

#### WebSocket 与 WebRTC

https://stackoverflow.com/questions/18799364/webrtc-vs-websockets-if-webrtc-can-do-video-audio-and-data-why-do-i-need-web/18825175#18825175

WebRTC 是端对端的，WebSocket 是客户端对服务器的。WebRTC 主要用于端对端的音视频通讯和数据传输。

WebRTC is designed for high-performance, high quality communication of video, audio and arbitrary data.

WebRTC apps need a service via which they can exchange network and media metadata, a process known as signaling. However, once signaling has taken place, video/audio/data is streamed directly between clients, avoiding the performance cost of streaming via an intermediary server.

WebSocket on the other hand is designed for bi-directional communication between client and server. It is possible to stream audio and video over WebSocket (see here for example), but the technology and APIs are not inherently designed for efficient, robust streaming in the way that WebRTC is.

As other replies have said, WebSocket can be used for signaling.


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
