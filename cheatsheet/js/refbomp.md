<style>#md em { color:#666; } td:first-child{ color:red; }</style>

# Web API


## XMLHttpRequest

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

||
-----------------------|-----------------------------
XMLHttpRequest         | contructor, IE7+支持
|
xhr.onreadystatechange | 注册 `readyState` 更新时的回调函数
xhr.readyState         | 请求过程状态码 { 0 -> UNSENT, 1 -> OPENED, 2 -> HEADERS_RECEIVED, 3 -> LOADING, 4 -> DONE }
xhr.response           | 格式根据 `responseType` 设定不同而不同，可能是 ArrayBuffer、Blob、Document、JS对象 或 DOMString
xhr.responseText       | 返回内容的文本形式
xhr.responseType       | `""` `"arraybuffer"` `blob` `document` `json` `text` IE10+支持
xhr.responseURL        | 相应对应的完整 URL，不含片段部分
xhr.responseXML        | 类型为 text/html text/xml application/xml 时可通过此属性读取解析后内容
xhr.status             | 未发送或出错为 0, 否则为服务器返回状态码, 如 200
xhr.statusText         | 状态说明，如 `"OK"`
xhr.timeout            | 自定义请求超时毫秒数
xhr.upload             | 上传文件时读取上传进度 IE10+支持文件上传
xhr.withCredentials    | 设置跨域请求 IE10+支持，IE8+用 XDomainRequest 代替 XMLHttpRequest
|
xhr.open()                   | `XMLHttpRequest.open(method, url[, async, user, password])`
xhr.abort()                  |
xhr.overrideMimeType(_type_) | 如服务器不能正确返回 `Conten-Type` 头，可设置强制覆盖，如 `('text/xml')`
xhr.setRequestHeader(_h, v_) | `XMLHttpRequest.setRequestHeader(header, value)`
xhr.send(_body_)             | 参数形式 `"foo=bar&lorem=ipsum"` `new Blob()` `{form:'data'}` `document`, 参数对 GET HEAD 无效
xhr.getAllResponseHeaders()  |
xhr.getResponseHeader(_name_)|

```js
function showHint(str) {
  var xmlhttp
  if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest() }
  else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP") }    // code for IE6, IE5
  xmlhttp.open("GET", "gethint.php?q=" + str, true);
  xmlhttp.send()
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById("txtHint").innerHTML = xmlhttp.responseText
    }
  }
}
```

### FormData

https://xhr.spec.whatwg.org/#dom-formdata

```
typedef (File or USVString) FormDataEntryValue;

[Constructor(optional HTMLFormElement form), Exposed=(Window,Worker)]
interface FormData {
  void append(USVString name, USVString value);
  void append(USVString name, Blob blobValue, optional USVString filename);
  void delete(USVString name);
  FormDataEntryValue? get(USVString name);
  sequence<FormDataEntryValue> getAll(USVString name);
  boolean has(USVString name);
  void set(USVString name, USVString value);
  void set(USVString name, Blob blobValue, optional USVString filename);
  iterable<USVString, FormDataEntryValue>;
};
```

```js
// Ajax 实现文件上传，IE10+ 支持，IE9 需借助 iframe + multipart/form-data 实现(此实现无法获取上传进度)
var formData = new FormData();
formData.append("myFile", document.getElementById("myFileField").files[0]);

var xhr = new XMLHttpRequest();
xhr.open("POST", "myServletUrl");
xhr.send(formData);
```

```html
<input type="file" id="myFileField" name="myFile" />
```


## WebSocket

||
-------------------------------|----------------------------------------------------------------
WebSocket(_url_, _protocols=''_) | protocols 可以是字符串，或含字符串的数字，用于自定义子协议类型
|
socket.url        | 只读, property returns the resolved absolute URL
socket.readyState | 只读, `0`=`s.CONNECTING`  `1`=`s.OPEN`  `2`=`s.CLOSING` `3`=`s.CLOSED`
socket.protocol   | 只读, 子协议类型
socket.binaryType | 可写, 发送的二进制数据类型
socket.bufferedAmount | 只读, 待发送数据的 bytes，连接关闭后再调用 send() 这个值不会被重置而是会一直增加
|
socket.onopen     | 注册连接成功时的监听器
socket.onclose    | 注册关闭后的监听器
socket.onerror    | 注册 error 事件监听器
socket.onmessage  | 注册消息处理函数
|
socket.close(_code?_, _reason?_) | 关闭连接，可能抛异常：(`INVALID_ACCESS_ERR` 错误码写错) (`SYNTAX_ERR` 原因写太长)
socket.send(_data_)             | 发送数据，可能抛异常或关闭连接 `send(data: string; ArrayBuffer; Blob)`


注：`send` 方法可能抛异常(`INVALID_STATE_ERR` `SYNTAX_ERR`)或关闭连接: If the data can't be sent (for example, because it needs to be buffered but the buffer is full), the socket is closed automatically.

注：服务器上用 ws 时，在已经关闭的连接上 send 数据，会导致应用退出。在客户端，实际测试，trycatch 不到错误，但控制台会报错。`new WebSocket(wsUri)` `send(data)` 的异常都捕获不到，但 `close()` 的错误能捕获到。  
注：只读属性写了不会报错，只是静默失败。  
注：所有 `on-*` 方法，可以改用 `addEventListener` 添加多个监听器。  

```js
const socket = new WebSocket('ws://localhost:8080')
socket.addEventListener('open', function (event) { socket.send('Hello Server!') })
socket.addEventListener('message', function (event) { console.log('Message from server ', event.data) })
```


## Fetch

最简单的用法

```js
fetch('any/url').then(res => res.json()).catch(err => console.error(err))
```

复杂的应用示例

```js
// Headers ===========================
// has()  get()  set()  append()  delete()    entries()  keys()  values()
const headers = new Headers({
  'Content-Type': 'text/plain',
  'X-My-Custom-Header': 'CustomValue'
})
headers.append('Content-Type', 'text/plain')
headers.append('X-My-Custom-Header', 'CustomValue')

headers.has('Content-Type') // true
headers.get('Content-Type') // "text/plain"
headers.set('Content-Type', 'application/json')

headers.delete('X-My-Custom-Header')

// Request ===========================
// 属性在新建时赋值后就不可更改  method  url  headers  body  credentials  ...
// 
const request = new Request('/some-url', {
  method: 'post',
  headers: {
    'Content-type': 'application:/x-www-form-urlencoded'
  },
  body: 'name=amber&age=18'
})

// Response ==========================
// json()  text()  
fetch(request).then(function(response) {
  /* handle response */
})
```


## Performance

||
--------|-----------------------
p.now() | 返回的毫秒数自页面加载时 performance.timing.navigationStart 开始算起，带小数，比 Date.now() 更精确，主要应用于对时间精度要求高的场景：benchmarking gaming audio video .etc
p.mark(_name_)           | 添加记录点 mark
p.clearMarks(_name?_)    | 清除某个 mark 或(无参时)清除所有 mark
p.measure(_name, startMark, endMark_) | 
p.clearMeasures(_name?_)              | 
p.getEntriesByType(_type_)            | 
p.getEntriesByName(_name, type?_)     | 

```js
// 记录每次 XHR 请求的耗时
var reqCnt = 0;
var myReq = new XMLHttpRequest();
myReq.open('GET', url, true);
myReq.onload = function(e) {
  window.performance.mark('mark_end_xhr');
  reqCnt++;
  window.performance.measure('measure_xhr_' + reqCnt, 'mark_start_xhr', 'mark_end_xhr');
  do_something(e.responseText);
}
window.performance.mark('mark_start_xhr');
myReq.send();

// 输出统计信息
var items = window.performance.getEntriesByType('measure');
for (var i = 0; i < items.length; ++i) {
  var req = items[i];
  console.log('XHR ' + req.name + ' took ' + req.duration + 'ms');
}
```

