# Koa2 Quick Start

http://bugless.me/nodejs-heaven-with-koa2-gulp-babel-mongodb-and-async-await/

## npm and dependencies

```bash
npm i koa@next koa-router@next koa-bodyparser@next config --save
    # koa@next – next generation of Koa framework, supports async/await functions
    # koa-router@next – routing with support for Koa 2 and async/await
    # koa-bodyparser@next – parses JSON in requests for us
    # config – there is no API without config, trust me!
```

配置好的 package.json 文件：

```json
{
  "name": "koa-mongo",
  "version": "v0.0.1",
  "description": "Koa2 + MongoDB Playground",
  "main": "index.js",
  "author": "Gavin Wang",
  "license": "MIT",
  "scripts": {
    "start": "node app.js",
    "tsstart": "tsc && node dist/app.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ooboqoo/koa-mongo"
  },
  "dependencies": {
    "config": "^1.24.0",
    "koa": "^2.0.0-alpha.7",
    "koa-bodyparser": "^3.2.0",
    "koa-router": "^7.0.1"
  },
  "devDependencies": {
    "typescript": "2.1.5"
  }
}
```

## Wiring up Koa server with routes

So, let’s dive deep into our app.js (please update entry at your package.json), which would look like this:

```js
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
router.get('/', (ctx) => ctx.body = {hello: 'world'});
app.use(router.routes());

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.port}`);
});
```

Also, you’ll need to create config/default.js at the root of your project with simple export:

```js
module.exports = {
  port: 1234
};
```

Great news, we could run node app.js to launch server and get our beautiful {hello: 'world'} response!

## Async/await transpiling and why we actually need it

Considering significant fact Node.js is hard because of it’s asynchronous nature, that’s where async/await approach comes to the rescue! It tames complexity of callbacks and manipulates promises just as good old synchronous code!

Next thing we want is error handling middleware, but before implementing it, we must understand that latest Node.js version (6.5.0) still doesn’t support async/await functions natively. Node 6 不支持 async await, 需要安装 Node 7, 并开启 `--harmony` 选项。

```js
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const resError = {
      code: 500,
      message: e.message,
      errors: e.errors
    };
    if (e instanceof Error) {
      Object.assign(resError, {stack: e.stack});
    }
    Object.assign(ctx, {body: resError, status: e.status || 500});
  }
};
```

So, here is our first async function, which will help us catch every error and send it to our reponse instead of silently writing to console.
The last step, in app.js let’s write one more endpoint, and it surely would be async:

```js
const handleErrors = require('./middlewares/handle-errors');

app.use(handleErrors);
app.use(bodyParser());

router.get('/error/test', async () => {
  throw Error('Error handling works!');
});
router.get('/', (ctx) => ctx.body = {hello: 'world'});

app.use(router.routes());
```

So now, when we run npm start and type in browser http://localhost:1234/error/test we would get error with detailed stack trace! Victory!


## All the juice of MongoDB with async/await

[TypeScript: Declaring Mongoose Schema + Model](http://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/)

> MongoDB 相关配置另外单独介绍。

```bash
$ npm install mongoose --save
```

