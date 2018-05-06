# Webpack 指南

https://webpack.js.org/guides/  


## Getting Started

```bash
$ mkdir webpack-demo && cd webpack-demo
$ npm init -y
$ npm install --save-dev webpack webpack-cli  # 推荐安装到项目目录下
$ npm run build  # 在创建以下文件后运行 webpack 打包
```

dist/index.html

```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
 </html>
```

src/index.js

```js
import _ from 'lodash'
function component () {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  return element
}
document.body.appendChild(component())
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

package.json

```json
{
  "scripts": {
    "build": "webpack"
  },
}
```


## 代码分割

分离业务代码 和 第三方依赖
分离业务代码 和 业务公共代码 和 第三方依赖
分离首次加载 和 访问后加载的代码

有三种常用的代码分离方法：
  * 入口起点：使用 entry 配置手动地分离代码。
  * 防止重复：使用 SplitChunksPlugin (sucessor of CommonsChunkPlugin) 去重和分离 chunk。
  * 动态导入：通过模块的内联函数调用来分离代码。



## 懒加载

`import` 命令、`import()`、`require()` 的区别：
  * 引擎处理 `import` 语句 是在编译时，即静态加载
  * Node.js 的 `require()` 是运行时加载模块，同步加载
  * `import()` 也是动态加载，但采用异步加载方式

`import()` 与 `require.ensure()` 的区别：前者加载即执行，后者只加载不执行。

注：`require.ensure()` 是 webpack 特有的，已经被 `import()` 取代。

```js
import('./subPageA').then(subPageA => { /* */ }).catch(error => )
require.ensure('./subPageA', function () {
  var subPageA = require('./subPageA')  // 这里才会实际执行代码
})
```


## Tree Shaking




