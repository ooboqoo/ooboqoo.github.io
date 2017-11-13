<style>#md em { color:#666; } td:first-child{ color:red; }</style>

# Web API

## XMLHttpRequest

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

|||
|---------------------------|-----------------------------
| XMLHttpRequest            | contructor, IE7+支持
|||
| xhr.onreadystatechange | 注册 `readyState` 更新时的回调函数
| xhr.readyState         | 请求过程状态码 { 0 -> UNSENT, 1 -> OPENED, 2 -> HEADERS_RECEIVED, 3 -> LOADING, 4 -> DONE }
| xhr.response           | 格式根据 `responseType` 设定不同而不同，可能是 ArrayBuffer、Blob、Document、JS对象 或 DOMString
| xhr.responseText       | 返回内容的文本形式
| xhr.responseType       | `""` `"arraybuffer"` `blob` `document` `json` `text` IE10+支持
| xhr.responseURL        | 相应对应的完整 URL，不含片段部分
| xhr.responseXML        | 类型为 text/html text/xml application/xml 时可通过此属性读取解析后内容
| xhr.status             | 未发送或出错为 0, 否则为服务器返回状态码, 如 200
| xhr.statusText         | 状态说明，如 `"OK"`
| xhr.timeout            | 自定义请求超时毫秒数
| xhr.upload             | 上传文件时读取上传进度 IE10+支持文件上传
| xhr.withCredentials    | 设置跨域请求 IE10+支持，IE8+用 XDomainRequest 代替 XMLHttpRequest
|||
| xhr.open()                   | `XMLHttpRequest.open(method, url[, async, user, password])`
| xhr.abort()                  | |
| xhr.overrideMimeType(_type_) | 如服务器不能正确返回 `Conten-Type` 头，可设置强制覆盖，如 `('text/xml')`
| xhr.setRequestHeader(_h, v_) | `XMLHttpRequest.setRequestHeader(header, value)`
| xhr.send(_body_)             | 参数形式 `"foo=bar&lorem=ipsum"` `new Blob()` `{form:'data'}` `document`, 参数对 GET HEAD 无效
| xhr.getAllResponseHeaders()  | |
| xhr.getResponseHeader(_name_)| ||

```js
function showHint(str) {
    var xmlhttp;
    if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }
    else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }    // code for IE6, IE5
    xmlhttp.open("GET", "gethint.php?q=" + str, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
            { document.getElementById("txtHint").innerHTML = xmlhttp.responseText; }
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