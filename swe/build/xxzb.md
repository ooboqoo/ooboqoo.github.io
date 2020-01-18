# 学习准备

## JS 模块化

命名空间

```js
var NameSpace = {}
NameSpace.type = NameSpace || {}
NameSpace.type.method = function () { }
```

CommonJS

http://wiki.commonjs.org/wiki/Modules/1.1.1

一个文件为一个模块
通过 `module.exports` 暴露模块接口
通过 `require` 引入模块
同步执行

```js
var EventEmitter = require('events').EventEmitter;
// ...
exports = module.exports = createApplication;
```

AMD/CMD/UMD

https://github.com/amdjs/amdjs-api/wiki/AMD

Async Module Definition
使用 `define` 定义模块
使用 `require` 加载模块
RequireJS
特点：依赖前置，提前执行

```js
define(
  // 模块名
  "alpha",
  // 依赖
  ["require", "exports", "beta"],
  // 模块输出
  function (require, exports, beta) {
    exports.verb = function () {
      return beta.verb();
    }
  }
);
```

```js
define(
  ["a", "b", "c"],
  function (a, b, c) {
    // ...
  }
)
```

Common Module Definition

https://github.com/cmdjs/specification/blob/master/draft/module.md

一个文件为一个模块
使用 `define` 来定义一个模块
使用 `require` 来加载一个模块
SeaJS
特点：尽可能懒执行，即，虽然会提前现在，但代码在用到时才会被执行

```js
define(function (require, exports, module) {
  var $ = require('jquery');
  // 通过 exports 对外提供接口
  exports.doSomething = function () { /*  */ }
  // 或通过 module.exports 提供整个接口
  module.exports = { /* */ }
});
```

Universal Module Definition

通用解决方案
三个步骤
  判断是否支持 AMD
  判断是否支持 CommonJS
  如果都没有，使用全局变量

```js
(function(root, factory){

}(this, function () {

}));
```


ESM

```js
// Default exports and named exports
import theDefault, { named1, named2 } from 'src/mylib'
import theDefault from 'src/mylib'
import { named1, named2 } from 'src/mylib'

// Renaming
import { named1 as newNamed1, named2 } from 'src/mylib'

// Importing the module as an object
import * as mylib from 'src/mylib'

// Only load the module, don't import anthing
import 'src/mylib'
```




## CSS 模块化

CSS 模块化更多的是指设计模式
  * OOCSS - 面向对象的 CSS，包含"结构和设计分离"，"容器和内容分离"这两个设计思想。
  * SMACSS - Base + Layout + Module + State + Theme = SMACSS
  * Atomic CSS - `<div class="mt-10 w-100 h-15"></div>`
  * MCSS - multilayer CSS 将 CSS 分层了
  * AMCSS - 针对属性进行编码 `<div am-size="large" am-disabled></div>`
  * BEM - Block + Element + Modifier
CSS Modules




