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

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status   
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

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
300 Multiple Choices
301 Moved Permanently  // 可能会将其他请求转为 GET
302 Found              // 临时跳转，SEO 会忽略
303 See Other          // 临时跳转，且将 Method 改为 GET (Typically you don't want users to resend PUT, POST ... requests)
304 Not Modified       // 304 时 XMLHttpRequest.responseText 仍然可以读到内容
305 Use Proxy          [Deprecated]
306 Unused
307 Temporary Redirect // 307 与 302 之间的区别在于，307 会保证请求 Method 和 Body 都不变
                       // 302 的话一些老的客户端可能会改成 GET 请求，没 307 靠谱
308 Permanent Redirect // 301 + Method and body not changed

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
416 Requested Range Not Satisfiable
417 Expectation Failed
421 There are too many connections from your internet address
422 Unprocessable Entity
423 Locked
424 Failed Dependency
425 Unordered Collection
426 Upgrade Required
449 Retry With
451 Unavailable For Legal Reasons

500 Internal Server Error
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


## 请求头

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

### 综合

| 头部                      | 类型  | 分类            | 值示例或格式
|--------------------------|-------|----------------|-----------
| `Host`                   | `req` | RequestContext | \<host\>:\<port\>
| `Referer`                | `req` | RequestContext | \<url\>
| `Referrer-Policy`        | `res` | RequestContext | no-referrer
| `User-Agent`             | `req` | RequestContext | curl/8.1.2
| `From`                   | `req` | RequestContext | webmaster\@example.org
||||
| `Date`                   | `req` `res` | Other           | Tue, 03 Jul 2012 04:40:59 GMT
| `Server`                 | `res`       | ResponseContext | nginx/1.14.0 (Ubuntu)
| `Server-Timing`          | `res`       | Other           | db;dur=53, app;dur=47.2
| `Allow`                  | `res`       | ResponseContext | GET, POST, HEAD
| `Location`               | `res`       | Redirect        | \<url\>
| `Link`                   | `res`       | Other           | \<url\>
| `SourceMap`              | `res`       | Other           | \<url\>
||||
| `Transfer-Encoding`      | `req` `res` `payload` | TransferCoding | gzip, chunked
| `TE`                     | `req`                 | TransferCoding | trailers, deflate;q=0.5
| `Trailer`                | `req` `res` `payload` | TransferCoding | Expires
||||
| `Cookie`              | `req` | Cookie | name=value; name2=value2; name3=value3
| `Set-Cookie`          | `res` | Cookie | cookie1=value1; Secure; HttpOnly


```txt
Host:   // Request header，所有 HTTP1.1 的请求都必须带上这个头，同一台服务器上部署多个服务时，依赖 Host 来区分服务
Referer:   // 直接输入网址没这个头，谷歌搜索跳转会带谷歌的网址

Referrer-Policy: no-referrer  // Response header，也可在 HTML 中指定
  <meta name="referrer" content="origin" />
  <a href="http://example.com" referrerpolicy="origin">…</a>
```

```txt
Trailer: Expires  // Response header  指定在内容传输结束后添加的（动态生成的）请求头内容  // trailing 尾随
TE
```

```txt
Location  // 3xx 跳转用这个指明地址

Allow: GET, POST, HEAD  // 405 必须返回这个头

From: webmaster@example.org  // Request header 如果你在写一个爬虫，就有必要带上你的邮箱，必要时服务方可通过电邮联系你
```


```http
https://www.fastly.com/blog/best-practices-using-vary-header Response header

Link:
</g-static/fonts/subsetting/inter-var.woff2>; rel=preload; as=font; crossorigin; nopush, <https://user-data.mutinycdn.com>; rel=preconnect, <https://client.mutinycdn.com>; rel=preconnect, <https://client-registry.mutinycdn.com>; rel=preconnect, <https://www.googletagmanager.com>; rel=preconnect
```


### Content Negotiation

| 头部                      | 类型              | 分类               | 值示例或格式
|--------------------------|------------------|--------------------|-----------
| `Accept`                 | `req`            | ContentNegotiation | text/html, application/xml;q=0.9
| `Accept-Encoding`        | `req`            | ContentNegotiation | deflate, gzip;q=1.0, *;q=0.5
| `Accept-Language`        | `req`            | ContentNegotiation | zh-CN, zh;q=0.9, en;q=0.7
| `Content-Type`           | `representation` | BodyInfo           | multipart/form-data; boundary=xxx
| `X-Content-Type-Options` | `res`            | ResponseContext    | nosniff
| `Content-Encoding`       | `representation` | BodyInfo           | br
| `Content-Length`         | `req` `res` `payload` | BodyInfo      | \<length\>
| `Content-Location`       | `representation`      | BodyInfo            | \<url\>
| `Content-Disposition`    | `req` `res` `payload` | Download, Multipart | attachment; filename="xxx.jpg"

```txt
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8
Accept-Encoding: deflate, gzip;q=1.0, *;q=0.5
Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5  // 响应时在 `<html lang="de">` 中用 lang 字段

Content-Type: text/html; charset=utf-8
  Content-Type: multipart/form-data; boundary=something  // 请求时的形态
Content-Encoding: deflate, gzip  // 标明内容先用 deflate 算法压，后再用 gzip 压了
Content-Length: <length>

Content-Location: <url>  // 区别于跳转用的 `Location` 头，用于指明资源地址

Content-Disposition: attachment; filename="filename.jpg"  // 下载时标明是附件
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg" // 在 multipart/form-data 请求中说明每个字段情况
```


### 连接/代理

| 头部                         | 类型         | 分类                  | 值示例或格式
|-----------------------------|-------------|-----------------------|-----------
| `Connection`                | `req` `res` | Connection            | Keep-Alive
| `Keep-Alive`                | `req` `res` | Connection            | timeout=5, max=1000
| `Upgrade-Insecure-Requests` | `req`       | Connection            | 1
| `Retry-After`               | `res`       | Connection, Other     | \<http-date\> 或 \<delay-seconds\>
| `Upgrade`                   | `req` `res` | Connection, Other     | HTTP/2.0
| `Strict-Transport-Security` HSTS | `res`       | Connection            | max-age=\<expire-time\>; includeSubDomains
| `Forwarded`                 | `req`       | Proxy                 | for=192.0.2.60;proto=http
| `X-Forwarded-For`           | `req`       | Proxy                 | \<client\>, \<proxy1\>, \<proxy2\>
| `X-Forwarded-Host`          | `req`       | Proxy                 | id42.example-cdn.com
| `X-Forwarded-Proto`         | `req`       | Proxy                 | \<protocol\>
| `Via`                       | `res` `req` | Proxy                 | cache14.l2cn3130, cache10.cn6167
||||
| `Expect`              | `req` | Control | 100-continue
| `Max-Forwards`        | `req` | Control | \<integer\>
||||
| `Proxy-Authenticate`        | `res`       | Proxy, Authentication | 
| `Proxy-Authorization`       | `req`       | Proxy, Authentication | 
| `WWW-Authenticate`          | `res`       | Authentication        | 
| `Authorization`             | `req`       | Authentication        | Basic dWVub3NlbjpwYXNzd29yZA==


```txt
Authorization: <auth-scheme> <authorization-parameters>
WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"  // 401 时必须同时返回这个头，告诉客户端，服务端支持哪些鉴权方式
```

```txt
Upgrade-Insecure-Requests: 1  // Request header 告诉服务端，客户端支持切换到 HTTPS 连接

Retry-After
  * 503 429 标明等多久后才可以重试
  * 301 标明等多久后再跳转

Connection: upgrade
Upgrade: protocol_name[/protocol_version]  // 仅 HTTP1.1 有效

Max-Forwards  // TRACE 请求专用
```



### 分片上传/下载

| 头部                   | 类型              | 分类  | 值示例或格式
|-----------------------|------------------|-------|-----------
| `Accept-Ranges`       | `res`            | Range | \<range-unit\>
| `If-Range`            | `req`            | Range | \<etag\>
| `Range`               | `req`            | Range | bytes=200-1000, 2000-6576, 19000-
| `Content-Range`       | `res` `payload`  | Range | bytes 200-1000/67589

分片下载示例

```http
GET /example.jpg HTTP/1.1
Host: example.com
If-Range: Sat, 25 Sep 2023 12:00:00 GMT
Range: bytes=500-999
```

```http
HTTP/1.1 206 Partial Content
Content-Type: image/jpeg
Content-Length: 500
Content-Range: bytes 500-999/2000

[Partial content of example.jpg, starting from byte 500]
```

### 缓存/条件请求

| 头部                   | 类型         | 分类                  | 值示例或格式
|-----------------------|-------------|-----------------------|-----------
| `Cache-Control`       | `req` `res` | Caching               | no-cache
| `If-Match`            | `req`       | Conditionals          | "82e22293907ce725faf67773957acd12"
| `If-Unmodified-Since` | `req`       | Conditionals          | Sat, 29 Oct 1994 19:43:31 GMT
| `If-None-Match`       | `req`       | Conditionals, Caching | W/"xyzzy"
| `If-Modified-Since`   | `req`       | Conditionals, Caching | Sat, 29 Oct 1994 19:43:31 GMT
| `ETag`                | `res`       | Conditionals, Caching | "82e22293907ce725faf67773957acd12"
| `Last-Modified`       | `res`       | Conditionals, Caching | Thu, 18 Jan 2018 01:08:12 GMT
| `Expires`             | `res`       | Caching               | Thu, 18 Jan 2018 01:08:12 GMT
| `Vary`                | `res`       | Conditionals, Caching | Accept-Encoding
| `Clear-Site-Data`     | `res`       | Caching               | "cache", "cookies"
| `Age`                 | `res`       | Caching, Proxy        | \<delta-seconds\>

条件请求用法

`If-Match` is most often used with state-changing methods (e.g., POST, PUT, DELETE) to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource (i.e., to prevent the "lost update" problem). 可用于解决并发请求的内容覆盖问题，匹配就继续，否则返回 412

`If-None-Match` is primarily used in conditional GET requests to enable efficient updates of cached information with a minimum amount of transaction overhead. 常用于 GET 请求，如果匹配就返回 304 否则返回 200

缓存控制

```txt
Cache-Control: max-age=604800, stale-if-error=86400  // 可选值在 Request 和 Response 环境下不一样

Etag 分强弱 `"<etag_value>"` 或 `W/"<etag_value>"` If-Match 只比较 强Tag，而缓存场景更多用 弱Tag

Clear-Site-Data: "cache", "cookies", "storage", "executionContexts"  // 这个牛，服务端可清浏览器缓存

If-Range  // 用于恢复下载，如果资源没变化，返回 206+后续内容，如果变了，返回 200+全部内容
```

强缓存

```http
Expires: Sun, 08 Apr 2018 18:11:41 GMT
Cache-Control: max-age=31536000, public
```

协商缓存

```http
# Request Headers
If-Modified-Since: Thu, 28 Jul 2016 03:37:35 GMT
If-None-Match: W/"1e12-1562f942e25"

# Response Headers
Last-Modified: Thu, 28 Jul 2016 03:37:35 GMT
ETag: W/"1e12-1562f942e25"
```

#### `Vary`

https://www.fastly.com/blog/best-practices-using-vary-header

Normally, when a request comes into one of Fastly's caches, only two parts of the request are used to find an object in the cache: *the path (and query string, if present), and the Host header*.

`Vary: Accept-Encoding` Normalization：因为 `Accept-Encoding` 字段值的形式太多了，然而你网站可能就提供 gzip deflate 等数个版本, fastly VCL 支持对缓存行为进行精调：

```nginx
# do this only once per request
if (req.restarts == 0) {
  # normalize Accept-Encoding to reduce vary
  if (req.http.Accept-Encoding) {
    if (req.http.Accept-Encoding ~ "gzip") {
      set req.http.Accept-Encoding = "gzip";
    } elsif (req.http.Accept-Encoding ~ "deflate") {
      set req.http.Accept-Encoding = "deflate";
    } else {
      unset req.http.Accept-Encoding;
    }
  }
}
```

`Vary: User-Agent` fastly VCL 精调：

```nginx
if (req.http.User-Agent ~ "(Mobile|Android|iPhone|iPad)") {
  set req.http.User-Agent = "mobile";
} else {
  set req.http.User-Agent = "desktop";
}
```


### 跨域

| 头部                                | 类型   | 分类 | 值示例或格式
|------------------------------------|-------|------|-----------
| `Access-Control-Request-Method`    | `req` | CORS | GET
| `Access-Control-Request-Headers`   | `req` | CORS | Content-Type, x-requested-with
| `Origin`                           | `req` | CORS | https:\/\/foo.bar.org
||||
| `Access-Control-Allow-Origin`      | `res` | CORS | https:\/\/foo.bar.org
| `Access-Control-Allow-Methods`     | `res` | CORS | POST, GET, OPTIONS
| `Access-Control-Allow-Headers`     | `res` | CORS | Content-Type, x-requested-with
| `Access-Control-Allow-Credentials` | `res` | CORS | true
| `Access-Control-Expose-Headers`    | `res` | CORS | Content-Encoding
| `Access-Control-Max-Age`           | `res` | CORS | 600
| `Timing-Allow-Origin`              | `res` | CORS | \<origin\>[, \<origin\>]*
| `Cross-Origin-Embedder-Policy`     | `res` | Security | require-corp
| `Cross-Origin-Opener-Policy`       | `res` | Security | same-origin
| `Cross-Origin-Resource-Policy`     | `res` | Security | same-origin

```txt
Timing-Allow-Origin: <origin>[, <origin>]*  // 哪些网址的代码可以查看 https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing 信息
```

### 安全

| 头部                                 | 类型   | 分类 | 值示例或格式
|-------------------------------------|-------|------|-----------
| `Content-Security-Policy` CSP       | `res`      | Security
| `Sec-WebSocket-Accept`              | `res`      | Security
| `Sec-Purpose`                       | `fetch`      | Security
| `Sec-Fetch-Site`                    | `fetch` | Security
| `Sec-Fetch-Mode`                    | `fetch` | Security
| `Sec-Fetch-User`                    | `fetch` | Security
| `Sec-Fetch-Dest`                    | `fetch` | Security
| `Service-Worker-Navigation-Preload` | `req` | Security

CSP

```txt
Content-Security-Policy: <policy-directive>; <policy-directive>  // 响应头，
Content-Security-Policy-Report-Only: <policy-directive>; <policy-directive>    // 响应头，
```

```txt
Permissions-Policy
```

