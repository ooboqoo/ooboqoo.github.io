# 跨域问题汇总

http://www.html5rocks.com/en/tutorials/cors/  
https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS  
http://www.ruanyifeng.com/blog/2016/04/cors.html  
https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Expose-Headers  
https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies  


## 与服务器通讯

### 什么是跨域

页面安全主要是基于同源策略实施的。*同源策略* 会隔离不同源的 *DOM操作、页面数据、网络请求*，进而实现 Web 页面安全。

跨域的具体认定如下：

* 同一级域名 + 同子域名 + 同协议 + 同端口：同源
* 以上任意一个不同：跨域
* 域名和域名对应ip：跨域

### CORS 规范

W3C 的 CORS 规范(Cross-Origin Resource Sharing)通过在 HTTP headers 中加入相应字段来指示浏览器对跨域请求的控制。下面逐步分析 CORS 的工作过程：

1. 用户代码发起了一个跨域请求(domainA 向 domainB 发起请求)
2. 浏览器发送请求，如果是跨域请求，就会在请求头中加入 `Origin` 字段来声明请求域名(domainA)
3. 服务器发回响应，响应头中包含了 `Access-Control-Allow-Origin` 字段，指示允许访问的域名
4. 如果请求域名不在允许域名范围之内，或者响应头根本就没包含 `Access-Control-Allow-Origin` 字段，那么浏览器就会报错。

注：支持 CORS 规范的服务器可以通过检查 `Origin` 字段来决定响应内容；不支持该规范的服务器返回的响应头中不包含  `Access-Control-Allow-Origin` 字段，也就等于默认拒绝了请求。

#### 简单请求 与 非简单请求

浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求。如果不能同时满足就属于非简单请求。浏览器对这两种请求的处理是不一样的。

* 请求方法是以下三种方法之一：`HEAD` `GET` `POST`
* HTTP 的头信息不超出以下几种字段：`Accept` `Accept-Language` `Content-Language` `Last-Event-ID`
`Content-Type`(只限于三个值 `application/x-www-form-urlencoded` `multipart/form-data` `text/plain`)

对于简单请求，浏览器直接发出 CORS 请求，具体来说就是在头信息中增加一个 `Origin` 字段。

#### 非简单请求通信过程

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或者 `Content-Type: application/json`。

##### 发送预检请求

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求(preflight) `OPTIONS`。

```txt
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com                         # 请求域名
Access-Control-Request-Method: PUT                 # 请求会用到的方法
Access-Control-Request-Headers: X-Custom-Header    # 请求会额外发送的头信息字段
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

##### 响应预检请求

服务器收到"预检"请求以后，检查了 `Origin` `Access-Control-Request-Method` `Access-Control-Request-Headers` 字段后，确认允许跨源请求，就可以做出回应。

```txt
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com    # 关键字段，表示允许跨域访问，该字段也可以设为星号
Access-Control-Allow-Methods: GET, POST, PUT       # 表明服务器支持的所有跨域请求的方法
Access-Control-Allow-Headers: X-Custom-Header      # 标明服务器支持的所有头信息字段，不限于预检请求的字段
Access-Control-Allow-Credentials: true             # 
Access-Control-Max-Age: 1728000                    # 允许缓存20天，在此期间不用发出另一条预检请求
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

##### 实际请求

一旦服务器通过了预检请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 `Origin` 头信息字段。服务器的回应，也都会有一个 `Access-Control-Allow-Origin` 头信息字段。

```text
// 允许客户端访问额外头部字段
// 即，除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 外的字段
header('Access-Control-Expose-Headers: 允许访问的头部字段列表')
```

#### 发送 Cookie

跨域请求默认不会发送站点 cookie，如果需要发送 cookie，服务器和客户端要做如下配置。

```txt
服务端
header('Access-Control-Allow-Origin: 此处不能设为星号，必须指定明确的、与请求网页一致的域名')
header('Access-Control-Allow-Credentials: true')

客户端
xhr.withCredentials = true
```

php 设置 cookie 的格式：

```php
setcookie("TestCookie", $value);
```

cookie 与 session：

可以通过 cookie 来实现 session 功能，具体就是设置一个只包含键值对的 cookie，不要配置失效时间，这是该实现的关键：

```php
setcookie("SessionID", $id);  // 不加过期时间，cookie 就不会保存到硬盘，只存在于内存中，浏览器重启就丢失
```

JS 可以通过 `navigator.cookieEnabled` 来确认浏览器是否开启 cookie，如果没有开启，那么就应该采用备用手段实现 session。

### JSONP 传输协议

> JSONP 只支持 GET 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

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

### 后台服务器代理

通过后台服务器代理请求跨站内容，前端就不存在跨域问题了。首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。



## 页面间通讯

### 同主域下的子域间的交互

不同域的框架之间是不能进行 JS 交互操作的，但如果是在主域下的不同子域，可以通过声明将自己提升到主域，从而实现交互。

```js
// 不同子域，如 a.e.com b.e.com 等都通过声明升级到 e.com 就可以实现交互
document.domain = 'e.com';  // 要进行交互操作的框架都要设置，这样就同源了
```

同源 iframe 与宿主页面之间互访

```js
// parent.html <iframe src="inner.html" name="inner"></frame>
window.inner.innerFunction();
// inner.html
parent.outerFunction();
```

加餐

```js
// 获取 iframe 的 window 的不同方式
window.frames          // 页面自己的 window
window.frames[0]       // 第一个 iframe 的 window
window.frame['first']  // <iframe name="first"> 的 window
document.querySelector('iframe').contentWindow  // 第一个 iframe 的 window

// iframe 里获取宿主 window 的不同方式
window.parent
window.top
```

### window.postMessage 方法

HTML5 中新引进了 `postMessage()` 方法以实现框架间的信息沟通，没有跨域限制。

```js
// 在页面 A 中向页面 B 发送消息
// 获取 pageB 的方式可能是 `pageB = window.open(...)`  `opener`  `parent`  `frames[0]` 等方式
pageB.postMessage(message, targetOrigin, [transfer]);
    // messsage 可以是原始类型或对象，如果是对象，系统会自动序列化
    // targetOrigin 指定目的窗口的 origin，可用 *，但出于安全考虑，建议指定具体 origin，并在消息接收端进行检查

// 页面 B 中添加监听
window.addEventListener('message', (evt) => {
    if (evt.origin !== 'http://example.com') return;
    // ...
})
```


## 待整理

### Angular2 Http Response missing header key/values

2016/12/23 尝试读取服务器返回头部中的 `Authorization` 字段时，实际只能读到 `Content-Type`，其他字段都没有。

问题分析：在默认情况下 CORS 只返回6个简单的头部：`Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` and `Pragma`.

That's why you see the full set when using a REST client such as Postman, yet when calling from your Angular client, you'll only see the set limited by CORS.

To solve this, you'll need to add an Access-Control-Expose-Headers header along the following lines:

```php
header("Access-Control-Expose-Headers:*");  // * 不起作用
header("Access-Control-Expose-Headers: Authorization, Access-Control-Allow-Origin");  // 正常工作
  // 2015/12/22 实际工作环境，设置了还是不行，但自己搭的试验服务器跑通，跟后面的 cookie 问题一样无解

// 测试用的头部代码
<?php
header("Access-Control-Allow-Headers:Authorization, Content-Type, Accept, Cache-Control");
header("Access-Control-Allow-Methods:POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Expose-Headers:*");
header("Access-Control-Max-Age:3600");
header("Authorization:sdfjdffjaiierirgrg");
header("Cache-Control:no-cache, no-store, max-age=0, must-revalidate");
header("Content-Type:application/json;charset=UTF-8");
header("Date:Fri, 13 May 2016 13:53:27 GMT");
header("Expires:0");
header("Pragma:no-cache");
header("Server:Apache-Coyote/1.1");
header("Transfer-Encoding:chunked");
header("X-Content-Type-Options:nosniff");
header("X-Frame-Options:DENY");
header("X-XSS-Protection:1; mode=block");
```
