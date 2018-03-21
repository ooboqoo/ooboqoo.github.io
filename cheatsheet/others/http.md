# HTTP

https://developer.mozilla.org/en-US/docs/Web/HTTP

## Request Methods (verbs)

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods  

|||
|:---------:|---------------------------------------------------------------------------------------------------------
| `GET`     | requests a representation of the specified resource. Requests using GET should only retrieve data.
| `POST`    | submit an entity to the specified resource, often causing a change in state or side effects on the server
| `PUT`     | replaces all current representations of the target resource with the request payload.
| `PATCH`   | apply partial modifications to a resource.
| `DELETE`  | deletes the specified resource.
||
| `HEAD`    | asks for a response identical to that of a GET request, but without the response body.
| `OPTIONS` | describe the communication options for the target resource.

http://www.restapitutorial.com/lessons/httpmethods.html

| Verb  | CRUD | Entire Collection (e.g. `/customers`) | Specific Item (e.g. `/customers/{id}`)
|-------|------|-------------------------------------|-----------------------------------------------
| `POST` | Create | 201, 'Location' header with link to `/customers/{id}` containing new ID. | 404. 409 if resource already exists.
| `GET`  | Read   | 200, list of customers. Use pagination, sorting and filtering to navigate big lists. | 200, single customer. 404 if ID not found or invalid.
| `PUT`  |  Update/Replace | 404, unless you want to update/replace every resource in the entire collection. | 200 or 204. 404 if ID not found or invalid.
| `PATCH`   | Update/Modify | 404, unless you want to modify the collection itself. | 200 or 204. 404 if ID not found or invalid.
| `DELETE`  | Delete | 404, unless you want to delete the whole collection. | 200. 404 if ID not found or invalid.


## 状态码

https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81   

HTTP 状态码 HTTP Status Code 是用以表示网页服务器 HTTP 响应状态的 3 位数字代码。它由 RFC 2616 规范定义的，并得到 RFC 2518、RFC 2817、RFC 2295、RFC 2774 与 RFC 4918 等规范扩展。

所有状态码的第一个数字代表了响应的五种状态之一。

||||
|-----|----------------|----------------------------------------------------------------------------------
| `1` | 1xx 消息       | 这类状态码代表请求已被接受，需要继续处理。这类响应是临时响应。
| `2` | 2xx 成功       | 这类状态码代表请求已成功被服务器接收、理解、并接受。
| `3` | 3xx 重定向     | 这类状态码代表需要客户端采取进一步的操作才能完成请求。通常，这些状态码用来重定向。
| `4` | 4xx 客户端错误 | 这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。
| `5` | 5xx 服务器错误 | 这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生。

```text
100 Continue
101 Switching Protocols

200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content

300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified       // 304 时 XMLHttpRequest.responseText 仍然可以读到内容
305 Use Proxy
306 Unused
307 Temporary Redirect

400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Request Entity Too Large
414 Request-url Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
421 There are too many connections from your internet address
422 Unprocessable Entity
423 Locked
424 Failed Dependency
425 Unordered Collection
426 Upgrade Required
449 Retry With
451 Unavailable For Legal Reasons

500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
509 Bandwidth Limit Exceeded
510 Not Extended
```


## 常见请求头

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

### 通用首部字段

```txt
Content-Type: application/json;charset=UTF-8
Cache-Control: no-cache
Connection: keep-alive
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

### 请求首部字段

```txt
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Authorization: Basic dWVub3NlbjpwYXNzd29yZA==
Host: console.demo.com                                    # 有多个主机运行在同一IP时用于区分主机，必选
Referer: https://console.demo.com/cs/?region=southchina   # 发起请求的页面
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36
Cookie: SID=Set2; browserCheckResult=A
Max-Forwards: 10

If-Match: "123456"
If-None-Match
If-Modified-Since
If-Unmodified-Since
If-Range
```

### 响应首部字段

```txt
Server: nginx/1.10.2
Content-Encoding: gzip
ETag: "82e22293907ce725faf67773957acd12"
Expires: Thu, 18 Jan 2018 01:08:12 GMT
Location: http://www.usagidesign.jp/sample.html    # 页面重定向
Vary: Accept-Encoding
Transfer-Encoding: chunked

Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 浏览器缓存

#### 强缓存

```txt
Expires: Sun, 08 Apr 2018 18:11:41 GMT
Cache-Control: max-age=31536000, public
```

#### 协商缓存

```txt
# Request Headers
If-Modified-Since: Thu, 28 Jul 2016 03:37:35 GMT
If-None-Match: W/"1e12-1562f942e25"

# Response Headers
Last-Modified: Thu, 28 Jul 2016 03:37:35 GMT
ETag: W/"1e12-1562f942e25"
```
