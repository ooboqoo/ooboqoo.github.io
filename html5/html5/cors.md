# CORS 跨域

https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Expose-Headers  
https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

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

### 跨域发送 cookie 的问题

在 ajax 跨域请求中，默认不会发送站点 cookie，如果需要发送 cookie，需要在请求头中添加 `withCredentials: true`

另外，2016/12/22 碰到 `set-cookie` 不工作的问题，但通过 postman 调用却正常，没有搞懂问题出在哪里。

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

### 后续试验项目

在处理跨域 POST 请求前，浏览器会先发出 OPTIONS 请求，现在工作环境中 `Access-Control-Expose-Headers:Authorization` 和 `setcookie` 都在 POST 请求中发送，不知道这会不会有影响。

