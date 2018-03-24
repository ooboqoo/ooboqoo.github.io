# Koa Quick Start

视频教程：http://knowthen.com/category/node-js/

```bash
$ mkdir koa-demo && cd koa-demo  # 创建项目文件夹
$ npm init                       # 初始化项目
$ npm install koa --save         # 安装 koa
$ vim server.js                  # 开始编写应用代码
```

编写第一个 Hello World 程序：

```js
var koa = require('koa');
var app = koa();

app.use(function *() {
  this.response.body = "Hello Koajs";  // 提供了更加便利的 this.body 指向 this.response.body
})

app.listen(3300);
```

开启服务并打开浏览器查看运行结果：

```bash
$ node server.js
```

然后将代码更新到 Koa2 的写法(注意本教程不用 Koa2，只是写法向 Koa2 例子靠齐)：

```js
let Koa = require('koa');
let app = new Koa();

app.use(function *() {
  this.body = "Hello Koajs";
})

app.listen(3300);
```

熟悉 request 对象，并编写简单的路由功能：

```js
let Koa = require('koa');
let app = new Koa();

app.use(function *() {
  console.log(this.request);  // 查看并了解 request 对象，具体参考官网 API
  let url = this.request.url;
  switch (url) {
    case '/':
      this.body = 'Hello Koajs!';
      break;
    case '/date':
      this.body = new Date();
      break;
    default:
      this.status = 404;
      this.body = 'Sorry friend, I don\'t know what you want.';
  }
})

app.listen(3300);
```

编写中间件

```js
let Koa = require('koa');
let app = new Koa();

// 中间件返回一个 Generator 函数，最佳实践是，中间件都接收参数供用户定义中间件行为
let requestTime = function(headerName) {
  return function *(next) {
    let start = new Date();
    yield next;
    let end = new Date();
    let ms = end - start;
    this.set(headerName, ms + 'ms');
  }
}

// 当存在多个 app.use 时，顺序很重要，直接影响中间件执行层级
app.use(requestTime('Response-time'));

app.use(function *(next) {
  this.body = 'Hello Koajs!';
})

app.listen(3300);
```

引入 kao-router 中间件

```bash
$ npm install koa-router --save
```

```js
let app = require('koa')();
let router = require('koa-router')();

router.get('/', function *(next) {
  this.body = 'Hello from Koajs using the router middleware.';
});

router.get('/date', function *(next) {
  this.body = new Date();
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3300);
```
