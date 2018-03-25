# 移动 Web 前端

## 认识移动端开发

### 移动 Web 与 HTML5

* 语义化 - 赋予网页更好的意义和结构
* 本地存储 - 更短的启动时间，甚至离线使用
* 设备兼容 - 提供了非常丰富的 API，便于优化
* 连接特性 - SSE 和 WebSocket 使得连接工作效率更高，特别是在实时聊天和网页游戏方面，大大提高了用户体验
* 多媒体 - 网页标签自身支持音视频的播放，打破了对 Flash 的依赖，提升了开发效率和用户体验
* 图形特效 - 提供了 Canvas WebGL 等图形和三维功能，使普通网页也能呈现出惊人效果

移动端开发和PC端开发有着很大差别，相当一部分 HTML5 特性在移动设备上能有更大的施展空间。

* 视口控制 Viewport
* 媒体查询 @media
* 音视频播放 Audio/Video

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

### 移动 Web 与原生应用的优劣势比较

移动 Web 的优势
* 跨平台 - 只依赖浏览器，与平台无关
* 开发成本低 - 只要一个开发团队即可应对多个平台
* 更容易迭代 - 不需要用户主动安装更新就可以实现产品的升级迭代

移动 Web 的劣势
* 功能有限 - 很多硬件设备独特功能无法使用
* 操作体验欠佳 - 用户的操作并非由系统直接接收并响应，加上浏览器质量参差不齐，操作体验势必有所下降
* 无法离线使用 - 即使提供了离线功能，首次访问时还是要在线下载
* 很难被发现 - Web APP 不具备在商店展示的条件

原生应用的优势
* 功能完善 - 几乎具备设备所有功能的访问权限，可以满足用户的各种需求
* 体验更好 - 速度更快，性能高
* 可离线使用 - 所有程序代码和静态资源都在安装时已经就位
* 发现机会高 - 无论是第一次下载(从应用商店)，还是再一次使用(从图标打开)，原生应用的机会都远大于 Web 应用

原生应用的劣势
* 开发成本高 - 每个系统都需要维护一套代码，开发和维护成本都高
* 迭代不可控 - 首先更新上线需要应用商店的审核，其次用户何时升级也是完全不受控制的
* 内容限制 - 各应用商店都有自己的规范条例

鉴于 Web 应用和原生应用各自的优劣势，已经有越来越多的 APP 开始走向混合开发的模式，即原生和 Web 同时存在。原生部分为用户提供更好的使用体验，Web 部分可以实现更为快速的迭代更新。

### 移动 Web 开发技能树

```txt
浏览器
  |- 浏览器兼容
  |- HTTP协议
  |- 性能，如资源加载性能、页面渲染性能
  \- 安全，如 XSS CSRF

库/框架
  |- JavaScript库：jQueryMobile Zepto
  |- UI库：BootStrap
  |- 渲染模板
  |- MVVM框架：React Vue.js Angular
  |- 数据可视化 D3 ECharts
  \- Node.js

工程化
  |- 模块化标准 AMD CMD CommonJS UMD
  |- 包管理器 NPM Yarn
  |- 构建工具 Gulp Webpack Rollup
  \- CI/CD

移动前言技术
  |- Hybrid Cordova
  |- ReactNative Weex
  |- 微信小程序
  \- PWA 快应用
```

### 技术拐点与未来趋势

* 2005年前，网页比较简陋，没有太多交互。后端工程师使用后端模板完成页面渲染，使用的是后端 Web 框架。
* 2005年，谷歌开始大量使用 AJAX 技术
* 2012年，Hybrid 技术开始被大规模使用。

随着智能手机的普及，PC业务慢慢向移动端转移，移动端 APP 开始大面积兴起，业务版本的快速迭代，也使得原生移动的开发方式的缺点暴露得越来越明显。为了解决这些问题，2012年，Hybrid 技术开始被大规模使用。为了让 Hybrid APP 能够接近 Native APP 的视觉和交互体验，对 Web 开发者的能力要求也达到了一个新的高度。

看完 Web 前端的前世今生，可以发现，Web 前端的定位是希望能够扩展到所有的跟表现层相关的领域，解决人机交互的问题。


## HTML5

### 新的语义

HTML5 提供的新特性，使得开发者能够在 HTML 层面处理各种类型的输入、验证、自动聚焦等功能。但有些可惜的是，各浏览器对一些展现样式有不同的实现，如果要统一风格，依旧需要采用传统的方式。

### 访问你的设备

#### 定位当前地理位置

Geolocation API 通过 `navigator.geolocation` 全局对象进行访问。

IE9+ 支持，出于安全考虑，部分最新的浏览器只允许通过 HTTPS 协议使用 Geolocation API。

初次访问时，浏览器会询问用户是否允许共享位置，用户允许后获得 Geolocation API 使用权限。

```js
if (!navigator.geolocation) {
    alert('您的浏览器不支持 Geolocation!');
} else {
    navigator.geolocation.getCurrentPosition(
        function success(position) { alert(JSON.stringify(position)); },
        function fail(error) { alert(error.code + error.message); },
        {enableHighAccuracy: false, timeout: 9000, maximumAge: 90000}
    );
}
```

#### 调用摄像头

HTML5 的 getUserMedia API 提供了访问用户媒体设备的能力，基于该特性，开发者可以在不依赖任何浏览器插件的条件下访问视频和音频等设备。

起初的版本为 `navigator.getUserMedia`，目前已废除，改用 `navigator.mediaDevices.getUserMedia`。

```js
if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia
        || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    // 调用用户媒体设备
} else {
    alert('您的浏览器不支持访问用户媒体设备！');
}
```

#### 方向和运动传感器

```js
window.addEventListener('deviceorientation', orientationHandler, true);
window.addEventListener('devicemotion', motionHandler, false);
```

手机摇一摇示例代码：

```js
var SHAK_SPEED_THRESHOLD = 150;  // 摇动阈值
var lastTime = 0;  // 上次变化的时间
var x = y = z = lastX = lastY = lastZ = 0;  // 位置变量初始化
function motionHandler(evt) {
    var acceleration = evt.accelerationIncludingGravity;
    var curTime = Date.now();
    var diffTime, speed;
    if ((diffTime = curTime - lastTime) > 120) {
        lastTime = curTime;
        x = acceleration.x; y = acceleration.y; z = acceleration.z;
        speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
        if (speed > SHAK_SPEED_THRESHOLD) {
            alert('你摇动了手机');
        }
        lastX = x; lastY = y; lastZ = z;
    }
}
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', motionHandler, false);
} else {
    alert('您的设备不支持位置感应');
}
```

### 离线存储

#### 离线应用

在 Service Worker 提出之前，HTML5 通过 Application Cache 控制缓存，不过有一些局限性，已经不被 W3C 推荐使用。

HTML5 离线功能包含离线资源缓存、在线状态监测、本地数据存储等方面的内容。

#### Service Worker

https://www.w3.org/TR/service-workers/

Service Worker 主要提供4类功能：后台消息传递、网络代理、离线缓存、消息推送。

Service Worker 是一段运行在浏览器后台进程的脚本，独立于当前页面，并且不会直接参与 DOM 操作，但可以通过 `postMessage` 与页面通信。

#### LocalStorage 和 SessionStorage

在 HTML5 之前，Web 应用程序通用的数据储存方案一般通过 Cookie 实现，不过有如下弊端：
  * 大小受限，标准浏览器下单个 Cookie 允许的大小是 4KB
  * 消耗性能，当前域下的所有 HTTP 请求都会携带这些 Cookie 数据

为了解决这些问题，HTML5 提供了两种在客户端存储数据的新方法：LocalStorage 和 SessionStorage。

HTML5 的本地存储为每个网站分配的空间大小是 5MB。

LocalStorage 和 SessionStorage 的区别是，前者会一直存储在本地，而后者则存活在当前页面(不同tab页间也不共享)的生命周期中，一旦页面关闭，储存的数据也自动消失。

#### IndexedDB

IndexedDB 是一个事务型数据库系统，同时也是一个基于 JavaScript 的面向对象的数据库系统。

与 LocalStorage 不同的是，IndexedDB 可以存储大量结构化的数据，并且使用基于索引的高效 API 检索。

IndexedDB 所有 API 操作均为异步模式，虽然规范定义了同步版本，但没有浏览器进行实现。

### 图像效果

HTML5 引入了 Canvas 和 SVG 标签为浏览器提供了更加丰富的图形渲染功能，而 WebGL 用于在任何兼容的 Web 浏览器中呈现交互式 3D 和 2D 图形。

### 不一样的通信

#### postMessage

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

为了用户信息安全，浏览器有同源限制，HTML5 的新功能 postMessage 在一定程度上兼顾了安全和灵活性，实现跨源之间的消息传递。

这个功能常常可以用在微博信息的同步或者协同办公系统的消息同步中。

#### XMLHttpRequest Level2

Level2 相较于老版本 Level1 做出了大幅的改进，主要包括以下几点

```js
// 设置 HTTP 请求的超时时间
xhr.timeout = 3000;
xhr.ontimeout = function (event) { alert('请求超时'); }
// 使用 FormData 对象管理表单数据
var formData = new FormData();
formData.append('username', '张三');
formData.append('id', 123456);
xhr.send(formData);
// 用于文件上传
var formData = new FormData();
for (var i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
}
// 获取服务器端二进制数据
var xhr = new XMLHttpRequest();
xhr.open('GET', 'path/to/image.png');
xhr.responseType = 'blob';  // 表示服务器传回的是二进制对象
// 获得数据传输的进度
xhr.onprogress = updateProgress;         // 下载进度
xhr.upload.onprogress = updateProgress;  // 上传进度
function updateProgress(event) {
    if (event.lengthComputable) var percentComplete = event.loaded / event.total;
}
// 跨域请求
if (xhr.withCredentials === undefined) {
    console.log('浏览器不支持 HTML5 XMLHttpRequest Level 2 的跨域请求');
}
```

#### Server Sent Event

在通常情况下，客户端主动向服务端查询数据，并把数据显示到客户端界面。但有些情况下，也需要服务端主动向客户端发送数据，并更新客户端信息。传统的做法是客户端向服务端发送轮询请求，一点有新的数据，马上更新，这种做法消耗性能并且时效性差。HTML5 中提供了 Server Sent Event 来处理这件事情。其具有以下优点：
  * 轻量，相对简单
  * 单向传送数据(服务端下发)
  * 基于 HTTP 协议
  * 默认支持断线重连
  * 自定义发送数据类型

```js
var source = new EventSource('demo_sse.php');
source.onmessage = function (event) {
    document.getElementById('result').innerHTML += event.data + '<br>';
}
```

具体前后端示例代码见 P69

#### WebSocket

WebSocket 是 HTML5 新增的协议，基于 TCP 连接进行全双工通信，及允许数据在两个方向上同时传输。

WebSocket 可以替代 AJAX 技术，并且功能比 AJAX 更加强大，可以使用 WebSocket 开发即时聊天、互动游戏、股票信息等应用。

```js
var socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open',    event => socket.send('Hello Server!'));
socket.addEventListener('message', event => console.log(event.data));
socket.addEventListener('error',   event => console.log(event.data));
socket.addEventListener('close',   event => console.log(event.data));
```

#### WebRTC

WebRTC 全称 Web Real-Time Communication，即 Web 实时通信，能够为浏览器和移动网页应用提供实时的语音或者视频通话功能。

WebRTC 现今依然成为 Web 端最为重要的多媒体通信解决方案，可以不依赖浏览器插件(如 Flash)实现基于浏览器建立音视频和数据传输，为 Web 开发者提供了丰富多彩的实时多媒体功能。实时通信的背后是一系列的复杂技术，包含音视频采集、编解码、网络传输等，但是有了 WebRTC 之后，开发者只需要关注几个简单的 JS API 即可。WebRTC 目前虽未普及到所有的浏览器中，但是已经被应用在很多项目和产品上了。

WebRTC 包含以下几个主要的 API
  * MediaDevices 提供了查询和访问媒体输入设备的方法
  * RTCPeerConnection 提供建立点和点之间连接的方法，并维护和监听连接
  * RTCDataChannel 可用于点和点之间双向传输任意数据的网络通道

### 其他常用特性

#### History API 与单页应用

#### Drag 和 Drop

#### 利用 Web Workers 加速应用计算

#### 利用 Performance API 分析性能














