# HTTP 协议

https://developer.mozilla.org/en-US/docs/Web/HTTP 有时间这里的内容过一遍

## HTTP: The Protocol Every Web Developer Must Know

http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-
know-part-1--net-31177

## W3C 文档

HTTP1.1: https://www.w3.org/Protocols/rfc2616/rfc2616.html

HTTP/2: https://tools.ietf.org/html/rfc7540

### 官方文档的一个翻译项目

https://quafoo.gitbooks.io/http2-rfc7540-zh-cn-en/content/chapter1/index.html

## 分析工具

### 使用 Wireshark 抓TCP http包

### Chrome

### html里的charset无效

抓包搞试验的时候，发现html里的charset设置并没有什么卵用，html head 里面的内容也不会进入 http
报文头部，而charset以报文头部（apache设置）的为准。

## HTTP 服务器

### apache lighttpd nginx

建议方案：  
Apache 后台服务器（主要处理php及一些功能请求 如：中文url）  
Nginx 前端服务器（利用它占用系统资源少得优势来处理静态页面大量请求）  
Lighttpd 图片服务器  
总体来说，随着nginx功能得完善将使他成为今后web server得主流。

http://www.blogjava.net/daniel-tu/archive/2008/12/29/248883.html
