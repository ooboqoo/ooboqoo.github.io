# HTTP


## HTTP

```ts
http.METHODS
http.STATUS_CODES
http.globalAgent

http.createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) => void): Server
http.get(options: string | RequestOptions | URL, callback?: (res: IncomingMessage) => void): ClientRequest
http.request(options: string | RequestOptions | URL, callback?: (res: IncomingMessage) => void): ClientRequest
```

```js
const http = require('http')
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})
server.listen(3000, '127.0.0.1', () => console.log(`Server running at http://...`))
```

### http.Agent

```js
new Agent([options])

agent.sockets
agent.maxSockets
agent.freeSockets
agent.maxFreeSockets
agent.requests

agent.createConnection(options[, callback])
agent.keepSocketAlive(socket)
agent.reuseSocket(socket, request)
agent.destroy()
agent.getName(options)
```

### http.Server

Event: 'checkContinue'
Event: 'checkExpectation'
Event: 'clientError'
Event: 'close'
Event: 'connect'
Event: 'connection'
Event: 'request'
Event: 'upgrade'

```ts
server.listening: boolean
server.maxHeadersCount = 2000
server.timeout = 120000
server.keepAliveTimeout = 5000

server.setTimeout(msecs?: number, callback?: () => void): Server // 指定超时时间和超时处理函数
server.listen(port?: number, hostname?: string, listeningListener?: Function): Server // +8 overloads
server.close([callback])
```

### http.ClientRequest

Event: 'abort'
Event: 'connect'
Event: 'continue'
Event: 'response'
Event: 'socket'
Event: 'timeout'
Event: 'upgrade'

```js
request.aborted
request.connection
request.socket

request.abort()
request.write(chunk[, encoding][, callback])
request.end([data[, encoding]][, callback])
request.flushHeaders()
request.getHeader(name)
request.removeHeader(name)
request.setHeader(name, value)
request.setNoDelay([noDelay])
request.setSocketKeepAlive([enable][, initialDelay])
request.setTimeout(timeout[, callback])
```

### http.ServerResponse

Event: 'close'
Event: 'finish'

```js
response.connection
response.finished
response.headersSent
response.sendDate
response.socket
response.statusCode
response.statusMessage

response.addTrailers(headers)
response.end([data][, encoding][, callback])
response.getHeader(name)
response.getHeaderNames()
response.getHeaders()
response.hasHeader(name)
response.removeHeader(name)
response.setHeader(name, value)
response.setTimeout(msecs[, callback])
response.write(chunk[, encoding][, callback])
response.writeContinue()
response.writeHead(statusCode[, statusMessage][, headers])
```

### http.IncomingMessage

Event: 'aborted'
Event: 'close'

```ts
message.url: string
message.method: string
message.headers: Object  // key 会统一转成 lower-cased 的形式，值不动
message.rawHeaders: string[]
message.trailers: Object      // 这个是啥？
message.rawTrailers: string[]
message.socket: net.Socket
message.statusCode: number
message.statusMessage: string
message.httpVersion: string

message.destroy([error])
message.setTimeout(msecs, callback)
```

Duplicates in raw headers are handled in the following ways, depending on the header name:
  * 这些 header 的重复项会被忽略：age, authorization, content-length, content-type, etag, expires, from, host, if-modified-since, if-unmodified-since, last-modified, location, max-forwards, proxy-authorization, referer, retry-after, user-agent
  * `set-cookie` 始终是一个数组，所以各项会合并到一个数组
  * 其他 header 会使用 `,` 连接


## HTTP/2


## HTTPS


## Net 网络


## DNS 域名服务


## Domain 域


## TLS/SSL 安全传输层





<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>

<script>
  // typescript 高亮增强
  var methodReg = /\.(\w+)\(/g;
  var classReg = /(\s)([A-Z]\w+)/g;

  var ts = document.querySelectorAll('.lang-ts');
  ts.forEach(function (frag) {
    var text = frag.innerHTML;
    text = text.replace(methodReg, '.<span style="color: #900;">$1</span>(')
               .replace(classReg, '$1<span style="color: #090;">$2</span>');
    frag.innerHTML = text;
  });
</script>
