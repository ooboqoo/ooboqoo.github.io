# Require.js

## Require.js 的用法

### 一、为什么要用 require.js？

最早的时候，所有 JS 代码都写在一个文件里面，只要加载这一个文件就够了。后来，代码越来越多，一个文件不够了，必须分成多个文件，依次加载。下面的网页代码，相信很多人都见过。
```html
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<script src="4.js"></script>
```

这段代码依次加载多个 js 文件。这样的写法有很大的缺点。首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次，由于 js 文件之间存在依赖关系，因此必须严格保证加载顺序(比如上例的 1.js 要在 2.js 的前面)，依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

require.js 的诞生，就是为了解决这两个问题：
　
1. 实现 js 文件的异步加载，避免网页失去响应；
2. 管理模块之间的依赖性，便于代码的编写和维护。

### 二、require.js 的加载

使用 require.js 的第一步，是先去官方网站下载最新版本。下载后，假定把它放在 js 子目录下面，就可以加载了。

```html
<script src="js/require.js"></script>
```

有人可能会想到，加载这个文件，也可能造成网页失去响应。解决办法有两个，一是把它放到页面底部加载，另一个是写成下面这样：

```html
<script src="js/require.js" defer async="true" ></script>
// async 属性表明这个文件需要异步加载，避免网页失去响应。IE 不支持这个属性，只支持 defer，所以把 defer 也写上。
```

加载 require.js 以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是 main.js，也放在 js 目录下面。那么，只需要写成下面这样就行了：

```html
<script src="js/require.js" data-main="js/main"></script>
// data-main 属性的作用是，指定网页程序的主模块。在上例中，就是 js 目录下面的 main.js，这个文件会第一个被 require.js 加载。由于 require.js 默认的文件后缀名是 js，所以可以把 main.js 简写成 main。
```

### 三、模块的加载

上一节最后的示例中，主模块的依赖模块是 `['jquery', 'underscore', 'backbone']`。默认情况下，require.js 假定这三个模块与 main.js 在同一个目录，文件名分别为 jquery.js，underscore.js 和 backbone.js，然后自动加载。
使用 `require.config()` 方法，我们可以对模块的加载行为进行自定义。`require.config()` 就写在主模块 main.js 的头部。参数就是一个对象，这个对象的 `paths` 属性指定各个模块的加载路径。

```js
require.config({
  paths: {
    "jquery":     "jquery.min",
    "underscore": "underscore.min",
    "backbone":   "backbone.min"
  }
});
```

上面的代码给出了三个模块的文件名，路径默认与 main.js 在同一个目录(js子目录)。如果这些模块在其他目录，比如 js/lib 目录，则有两种写法。一种是逐一指定路径。另一种则是直接改变基目录 baseUrl。

```js
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery":     "jquery.min",
    "underscore": "underscore.min",
    "backbone":   "backbone.min"
  }
});
```

如果某个模块在另一台主机上，也可以直接指定它的网址，比如：

```js
require.config({
  paths: {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
  }
});
```

### 四、加载非规范的模块

理论上，require.js 加载的模块，必须是按照 AMD 规范、用 `define()` 函数定义的模块。但是实际上，虽然已经有一部分流行的函数库，如jQuery 符合 AMD 规范，更多的库并不符合。那么，require.js 是否能够加载非规范的模块呢？回答是可以的。

这样的模块在用 `require()` 加载之前，要先用 `require.config()` 方法，定义它们的一些特征。
举例来说，underscore 和 backbone 这两个库，都没有采用 AMD 规范编写。如果要加载它们的话，必须先定义它们的特征。

```js
require.config({
  shim: {
    'underscore':{ exports: '_' },
    'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' }
  }
});
```

`require.config()` 接受一个配置对象，这个对象除了有前面说过的 `paths` 属性之外，还有一个 `shim` 属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。比如，jQuery的插件可以这样定义：

```js
shim: {
  'jquery.scroll': { deps: ['jquery'], exports: 'jQuery.fn.scroll' }
}
```

### 五、require.js插件

require.js 还提供一系列插件，实现一些特定的功能。

domready 插件，可以让回调函数在页面DOM结构加载完成后再运行。

```js
require(['domready!'], function (doc){
  // called once the DOM is ready
});
```

text 和 image 插件，则是允许 require.js 加载文本和图片文件。 

类似的插件还有 json 和 mdown，用于加载 json 文件和 markdown 文件。

### 六、优化工具

require.js 要求，每个模块是一个单独的 js 文件。这样的话，如果加载多个模块，就会发出多次 HTTP 请求，会影响网页的加载速度。因此，require.js 提供了一个优化工具，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少 HTTP 请求数。

## 范例讲解

`index.html`

```html
<!doctype html>
<html>
  <head>
    <script data-main="main" src="lib/require.js"></script>
  </head>
  <body>
    <h1>Require.js 练习</h1>
  </body>
</html>
```

`main.js`

```js
require.config({
  shim: {
    m5: {exports: 'm55'}  // 作用就是把全局变量 window.m55 定义成模块输出内容
  }
});

require(['./m5', './m1', './m2'], function(m1, m2) {  // m1.js 先下载，但执行顺序不定，先到先执行 
  console.log(m1 === window.m1);  // 证明在不同模块内部声明相同依赖时，只会返回一个结果，行为同 CommonJS 规范
  console.log(m1, m2);            // Object {name: "m1", count: 11} undefined
  console.log(m5 === window.m55, m5);
  debugger;
});
```

`m1.js`

```js
define([], function() {
  console.log('m1 loaded');
  return {name: 'm1', count: 1};
});
```

`m2.js`

```js
define(['./m1'], function(m1) {
  console.log('m2 loaded');
  window.m1 = m1;
  m1.count += 10;
});
```

`m5.js`

```js
window.m55 = {name: 'm5'};
// module.exports = {name: 'm5'}
  // 这种写法会报错，所以 require.js 的 shim 并没有去兼容 CommonJS 模块，只是转换全局变量而已
```

## AngularJS & ACE

https://coderwall.com/p/edwd4g/angular-using-requirejs-amd

AngularJS 没有遵循 AMD 模块化规范，因此使用 RequireJS 加载 AngularJS 时需要一些额外的配置。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <style>
      .ng-cloak {display: none; }
      #ace { position: relative; width: 500px; height: 400px; border: 1px solid #ccc; }
    </style>
</head>

<body ng-controller="myCtrl" class="ng-cloak">
    <div id="ace" ng-click="log()">SELECT * from my_table;</div>
    <script src="vendor/require.js" data-main="main"></script>
</body>
</html>
```

`main.js`

```js
requirejs.config({
    shim: {
        angular: {exports: 'angular'},
        ace: {exports: "ace"},
        language_tools: {deps: ['ace']}
    },
    paths: {
        'angular': 'vendor/angular',
        'ace': 'vendor/ace/src/ace',
        'language_tools': 'vendor/ace/src/ext-language_tools'
    }
});

requirejs(['angular', './editor.js'], function (angular, editor) {
    var app = angular.module('editor', []);

    app.controller('myCtrl', function ($scope) {
        $scope.log = function () { console.log(editor.getValue()); };
    });

    angular.bootstrap(document.body, ['editor']);
});
```

`editor.js`

```js
define(['ace', 'language_tools'], function(ace) {
    var editor = ace.edit('ace');
    editor.setTheme('ace/theme/sqlserver');
    editor.getSession().setMode("ace/mode/sql");
    console.log(editor);
    return editor;
});
```
