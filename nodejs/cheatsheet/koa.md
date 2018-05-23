# Koa.js

https://github.com/koajs/koa/blob/master/docs/api/index.md


### Context

|||
|------------------|------------------------
| ctx.req          | Node's `request` object.
| ctx.res          | Node's `response` object. [注1]
| ctx.request      | A Koa `Request` object.
| ctx.response     | A Koa `Response` object.
| ctx.state        | |
| ctx.app          | |
| ctx.respond      | |
|||
| ctx.cookies.get(name, [options]) | |
| ctx.cookies.set(name, value, [options]) | |
| ctx.throw([status], [msg], [properties]) | |
| ctx.assert(value, [status], [msg], [properties]) | ||

注1：Bypassing Koa's response handling is not supported. Avoid using the following node properties: `res.statusCode` `res.writeHead()` `res.write()` `res.end()`

## Request

|||
|------------------|------------------------
| ctx.header /<br>ctx.headers | |
| ctx.method=      | 可改写，对中间件有用
| ctx.url=         | 可改写
| req.URL          | Get WHATWG parsed URL object
| ctx.originalUrl  | |
| ctx.origin       | `http://example.com`
| req.length       | |
| req.type         | |
| req.charset      | |
| req.idempotent   | |
| ctx.href         | `http://example.com/foo/bar?q=1`
| ctx.path=        | |
| ctx.query=       | |
| ctx.querystring= | 不带 `?`
| req.search       | 带 `?`
| ctx.host         | |
| ctx.hostname     | |
| ctx.fresh        | `If-None-Match` / `ETag`, `If-Modified-Since` and `Last-Modified`
| ctx.stale        | |
| ctx.socket       | |
| ctx.protocol     | |
| ctx.secure       | |
| ctx.ip           | |
| ctx.ips          | |
| ctx.subdomains   | |
|||
| ctx.get(field)                  | |
| ctx.is(types...)                | |
| ctx.accepts(types)              | |
| ctx.acceptsEncodings(encodings) | |
| ctx.acceptsCharsets(charsets)   | |
| ctx.acceptsLanguages(langs)     | ||

## Response

|||
|-------------------|--------------------
| res.header / res.headers | |
| ctx.body=         | |
| ctx.status=       | Koa 默认 404，Node 默认 200
| ctx.message=      | 默认会根据 status 进行填充
| ctx.lastModified= | 读取或设置 `Last-Modified`
| ctx.etag=         | |
| ctx.length=       | Koa 会尝试根据 ctx.body 自动设置该值
| ctx.type=         | 读取或设置 `Content-Type`
| res.socket        | |
| ctx.headerSent    | 检查头部信息是否已发送
|||
| ctx.set(field, value) / ctx.set(fields) | |
| ctx.append(field, value)   | |
| ctx.remove(field)          | |
| res.get(field)             | |
| ctx.redirect(url, [alt])   | |
| ctx.attachment([filename]) | 设置 `Content-Disposition` 为 "attachment"
| res.is(types...)           | |
| res.vary(field)            | |
| res.flushHeaders()         | ||

```js
ctx.response.lastModified = new Date();
ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');



```




<style>
td:first-child { color: red; }
.ex { color: green; }
.rw { display: inline-block; float: right; padding: 0 2px; color: #fff;
      background-color: #aaa; border-radius: 6px; font-size: .75em; }
</style>

<script>
  const reg = /\b(req|res)\./
  Array.prototype.forEach.call(document.querySelectorAll('td:first-child'), function (td) {
    const text = td.innerText
    td.innerHTML = text.replace('=', '<span class="rw">+w</span>')
                       .replace(reg, '<span class="ex">$1</span>.')
  })
</script>
