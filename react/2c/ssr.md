# SSR



## SSR 简介

SSR vs CSR
* 首屏时间
* SEO
* 性能：客户端渲染，React 代码在浏览器上执行，消耗的用户浏览器的资源，而服务端渲染，React 代码在服务器上执行，消耗的是服务器的性能。因为 React 代码是很消耗性能的，如果网站本来就很快了，也没有 SEO 方面的需求的话，就不要做 SSR 了。


主流的单页面应用一般采用 CSR，首屏展示时间 TTFP 比较慢。

CSR 流程
1. 浏览器发送请求
2. 服务器返回 HTML
3. 浏览器发送 bundle.js 请求
4. 服务器返回 bundle.js
5. 浏览器执行 bundle.js 中的 React 代码

SSR 流程
1. 浏览器发送请求
2. 服务器运行 React 代码生成页面
3. 服务器返回页面



## 搭建 SSR 框架

```js
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express()
const MyComponent = (props) => {
  return <div>Hello, SSR!</div>
}

app.get('/ssr', (req, res) => {
  res.send(renderToString(<MyComponent />))
})
```



## 实现同构

同构：一套 React 代码，在服务器执行一次，在客户端再执行一次。服务器端的 React 代码只负责渲染出首屏的静态 HTML 内容，事件绑定是不生效的，后续的行为都由浏览器端的 JS 代码接管后添加。也就是说，即使服务端没正常返回渲染内容，最终用户操作时是不会受影响的。当然，如果服务器端没正常渲染，`ReactDOM.hydrate()` 时还是会报错的，但不会影响界面。

1. 服务器运行 React 代码渲染出 HTML
2. 发送 HTML 给浏览器
3. 浏览器接收到内容展示
4. 浏览器加载 JS 文件
5. JS 中的 React 代码在浏览器端重新执行
6. JS 中的 React 代码接管页面操作

_src/client/index.js_

```js
import React from "react";
import ReactDom from "react-dom";

import Home from "../containers/Home";

// 做同构需要将 原先的 `render()` 方法改为 `hydrate()`
// 另外 hydrate 方法还涉及到数据的脱水和注水
ReactDom.hydrate(<Home />, document.getElementById("root"));
```

_src/server/index.js_

```js
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

import Home from "../containers/Home";

const app = express();
app.use(express.static("public"));

const content = renderToString(<Home />);
app.get("/", (req, res) => {
  res.send(`<title>SSR</title><div id="root">${content}</div><script src="index.js"></script>`);
});

const server = app.listen(3300);
```

_src/containers/Home/index.js_

```js
import React, { useState } from "react";

export default function(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>You Clicked {count} times!</div>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```



## 实现路由机制

客户端路由流程
1. 浏览器加载 HTML
2. 浏览器加载 JS
3. JS 中的 React 代码执行并接管页面操作
4. JS 代码拿到浏览器上的地址
5. JS 代码根据地址生成不同的页面内容

服务器端路由，则是通过 `req.path` 确定返回的HTML内容。具体到实现，浏览器端使用 `BrowserRouter` 而服务器端使用 `StaticRouter`，`BrowserRouter` 会自己去获取浏览器路径，而 `StaticRouter` 需要通过 `location` 属性传入路径，并无太大区别。

最终的效果是，只有在首次加载时会去服务器请求页面，然后后续切换页面都是直接在本地渲染页面。

_src/Routes.js_

```js
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';

export default (
  <>
    <Route path="/" exact component={Home}></Route>
    <Route path="/login" exact component={Login}></Route>
  </>
);
```

_src/client/index.js_

```js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes';

const App = () => <BrowserRouter>{Routes}</BrowserRouter>;

ReactDom.hydrate(<App />, document.getElementById('root'));
```

_src/server/index.js_

```js
import express from 'express';
import { render } from './utils';

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.send(render(req.path));
});

export const server = app.listen(3300);
```

_src/server/utils.js_

```js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { stripIndent } from 'common-tags';

import Routes from '../Routes';

const template = content => {
  return stripIndent`
    <html>
      <title>SSR</title>
      <div id="root">${content}</div>
      <script src="index.js"></script>
    </html>
  `;
};

export const render = path => {
  const content = renderToString(
    <StaticRouter location={path} context={{}}>
      {Routes}
    </StaticRouter>,
  );

  return template(content);
};
```



## 与 Redux 融合




## 中间层




## 细节调优




## 样式

### 最基本的写法

_src/containers/Home/index.js_

```js
import style from './style.css';
export default function Home(props) {
  // server 环境，staticContext 由 StaticRouter 传入
  if (props.staticContext) {
    props.staticContext.css = style._getCss();
  }
  return <div>...</div>;
}
```

_src/server/utils.js_

```js
export const render = (req, context ={}) => {
  return `<html><head><style>${context.css || ''}</style></head></html>`
}
```

### Hooks 用法

这是实际生产用法，具体见 https://github.com/kriasoft/isomorphic-style-loader



## SEO 优化

* `title` `description` 更重要的作用不在于提升 SEO 排名，而在于提升转换率，因为这两者是用户在搜索结果中直接能够看到的
* 遵循 HTML5 语义化有利于搜索引擎理解网页内容，现在搜索引擎都是基于全文来标定页面的
* 内容(原创)、链接(内链+外链)、多媒体(图片)

借助 https://github.com/nfl/react-helmet 来定制每个页面的 TDK  内容。

```js
import { Helmet } from 'react-helmet';
```



## 预渲染技术

https://github.com/prerender/prerender

SSR 过于复杂，且耗费服务器性能，如果只对 SEO 优化有要求，对首屏时间不敏感，则可采用预渲染技术。

外部访问先走到 Nginx 服务器，然后如果发现是爬虫的话，就将请求转给预渲染服务器。这种架构体系是比较推荐的方式。


