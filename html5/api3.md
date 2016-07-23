# HTML5 APIs - XMLHttpRequest / Geolocation / Web Workers

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

出于安全方面的考虑，浏览器不允许跨域调用外部资源。具体什么情况下算同源，什么情况下算跨域，具体如下：

* 同一级域名 + 同子域名 + 同协议 + 同端口：同源
* 以上任意一个不同：跨域
* 域名和域名对应ip：跨域

同源策略到底有多重要：ATM机上被人安装了读卡器而导致资金失窃的新闻听过吧，然后想象下网银什么的...

#### 2. CORS 规范 Cross-Origin Resource Sharing

W3C 的 CORS 规范通过在 HTTP headers 中加入相应字段来指示浏览器对跨域请求的控制。下面逐步分析 CORS 的工作过程：

1. 用户代码发起了一个跨域请求(first domain 向 second domain 发起请求)
2. 浏览器发送请求，如果是跨域请求，就会在请求头中加入了 Origin 字段来声明请求域名(first domain)
3. 服务器发回响应，响应头中包含了 Access-Control-Allow-Origin 字段，指示允许访问的域名
4. 如果请求域名不在允许域名范围之内，或者响应头根本就没包含 Access-Control-Allow-Origin 字段，那么浏览器就会报错。

注：支持 CORS 规范的服务器可以通过检查 Origin 字段来决定响应内容；不支持该规范的服务器返回的响应头中不包含  Access-Control-Allow-Origin 字段，也就等于默认拒绝了请求。

##### 服务器端设置
只要设置 Http Header 允许跨域名请求即可，如下是 php 单页面的设置方法，也可以通过配置服务器自动发送。

```php
<?php
if (preg_match('/localhost|github.io/i', $_SERVER['HTTP_ORIGIN'])){
  header("Access-Control-Allow-Origin: *");
  // 发送内容
};
```

#### 3. 后台服务器代理

首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。

#### 4. JSONP 传输协议
from http://kb.cnblogs.com/page/139725/

JSON(JavaScript Object Notation) 和 JSONP(JSON with Padding)虽然只有一个字母的差别，但其实他们根本不是一回事儿：JSON 是一种数据交换格式，而 JSONP 是一种依靠开发人员的聪明才智创造出的一种非官方跨域数据交互协议。

##### 实现原理
Ajax 直接请求普通文件存在跨域无权限访问的问题，但 Web 页面上调用 js 文件时则不受是否跨域的影响（不仅如此，凡是拥有 src 属性的标签都拥有跨域的能力，比如&lt;script&gt;、&lt;img&gt;、&lt;iframe&gt;），正式利用这一点，产生了一种非正式的传输协议，人们把它称作 JSONP。

##### 具体实现

该协议的一个要点就是允许用户传递一个 callback 参数给服务端，然后服务端返回数据时会将这个 callback 参数作为函数名来包裹住 JSON 数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

```js
var flightHandler = function(data){
  alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
};
// 提供 jsonp 服务的 url 地址（不管是什么类型的地址，最终生成的返回值都是一段 javascript 代码）
var url = "http://flightQuery.com/jsonp/flightResult.php?code=CA1998&callback=flightHandler";
// 创建script标签，设置其属性
var script = document.createElement('script');
script.setAttribute('src', url);
// 把script标签加入head，此时调用开始
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

HTML5 中新引进了window.postMessage 方法以实现框架间的信息沟通，没有跨域限制。   
实测 Chrome 还是会阻止消息，而 IE 正常 2016/7/23.

##### ~~通过 window.name 在不同框架间交互（经试验此方法已过时失效）~~

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

### 简介
随着 Ajax 和 Web 2.0 应用程序的出现，终端用户被快速响应的 web 应用程序宠坏了。要让 web 应用程序响应得更快，瓶颈一定要解决。瓶颈包括 JavaScript 和后台 I/O 庞大的计算量，这需要从主 UI 显示流程中移除，交给 Web Workers 处理。

Web Workers 规范提供不依赖任何用户界面脚本在后台运行脚本的能力。长期运行脚本不会被响应单击或其他用户交互的脚本中断。Web Workers 允许执行长期任务，同时也不影响页面响应。

Web Workers 出现之前，JavaScript 是现代 web 应用程序的核心。JavaScript 和 DOM 本质上都是单线程的，即使您的计算机有 4 个内核，在进行长期计算时，也只有一个内核比较繁忙。

Web Workers 打破了传统 JavaScript 的单线程模式，引入了多线程编程模式。一个 worker 是一个独立的线程。有多个任务需要处理的 web 应用程序不再需要逐个处理任务。反之，应用程序可以将任务分配给不同的 workers。

### Browser Support

Web Workers: Chrome 4.0; IE 10.0; Firefox 3.5; Safari 4.0; Opera 11.5

### Check Web Worker Support

```js
if (typeof(Worker) !== 'undefined') {  // 或者使用 Modernizr 判断：if (Modernizr.webworkers)
    // Some code.....
} else {
    // Sorry! No Web Worker support..
}
```

### Create a Web Worker File

### Create a Web Worker Object

### Terminate a Web Worker

### Web Workers and the DOM