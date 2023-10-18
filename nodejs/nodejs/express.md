# Express 文档


```js
    "body-parser": "^1.14.2",
    "express": "^4.13.3",
    "multer": "^1.1.0",
    "node-xlsx": "^0.6.0"
```

```js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## req

* req.url          - req.url is not a native Express property, it is inherited from Node’s http module.
* req.originalUrl  - it retains the original URL, allowing to rewrite req.url freely for internal routing purposes.
* req.baseUrl      - The URL path on which a router instance was mounted.
* app.mountPath    - returns the matched path pattern(s).
* req.path         - 基于 req.url 的 getter。When called from a middleware, the mount point is not included.

```js
app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
  console.dir(req.originalUrl) // '/admin/new?sort=desc'
  console.dir(req.baseUrl) // '/admin'
  console.dir(req.path) // '/new'
  next()
})
```


## Router

路由是根据 req.url 来匹配的，在中间件中修改 `req.url` 可影响路由匹配

subApp VS Router
* subApp
* Router - A Router is like a mini express app. It contains no views or settings but does provide the typical routing APIs (.use, .get, .param, .route).

```js
// routes/people.js
var people = express.Router();
people.use(function(req, res, next) {});
people.get('/', function(req, res, next) {});
module.exports.people = people;

// app.js
app.use('/people', require('./routes/people').people);
```


