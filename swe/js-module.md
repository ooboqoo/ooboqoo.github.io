# JavaScript 模块化

> 诚然，浏览器端采用异步模块加载看起来很合乎情理，但实际上，因为模块依赖是分步解析的，而且碎片化的模块需要多次HTTP请求，结果事与愿违--网页反应其实更慢了。现在真正使用的，都是在部署前使用构建工具将模块打包在一起，所以也就没有同步异步之分了，在这个前提下，AMD已经没有市场了，CommonJS 在写法上，在前后端通用上都完爆 AMD。
> 
> 对于ES6模块，暂时还无法实施，但写法更加清晰，方便，如果采用 TypeScript 或 Babel 那么将ES6作为书写格式是最佳选择。
> 
> UMD，为了兼容 CommonJS 和 AMD 提出的解决方案，就是加了几句判断语句，因此写法上就比较挫，如果不是库提供者，或者刻意追求兼容性，那么完全没有必要把问题复杂化，直接 CommonJS 就行。想必，也就是在一个比较短的时间内的过渡方案。当然，如果选择 UMD，在使用构建工具或编译器的情况下，其实也就是改个配置参数的事情。
> 
> 本文对JS各种模块规范做了介绍，并介绍了常见的模块加载器/打包器。对 CommonJS ES6 Webpack SystemJS 只做了简单的介绍，因为这些需要另外仔细学习。

**参考文章**

[阮一峰 - Javascript模块化编程](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)  
[Browserify 与 UMD](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html)  
很棒的对各种模块和工具进行梳理介绍的[视频](https://www.youtube.com/watch?v=U4ja6HeBm6s)(需科学上网)，此处是[源码](https://github.com/curran/screencasts/tree/gh-pages/jsModulesAndBuildTools)

**规范定义**

Node's CommonJS: https://nodejs.org/api/modules.html  
AMD: https://github.com/amdjs/amdjs-api/wiki/AMD  
UMD: https://github.com/umdjs/umd  
ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-modules

**加载器 & 打包工具**

[RequireJS](http://requirejs.org/): AMD 模块首选加载器 + 打包器  
[Browserify](http://browserify.org/): CommonJS 模块首选打包器  
[Webpack](https://webpack.github.io/): 不仅仅关注模块打包，提供的是完整的前端打包方案，更像一套完整的构建工具  
[SystemJS](https://github.com/systemjs/systemjs/): 通用模块加载器 + 打包器，没有webpack成熟，但潜力大

[点击查看各工具的详细比较说明](https://webpack.github.io/docs/comparison.html)

备注：RequireJS 和 Browserify 相对已经过时了，现在流行的是 SystemJS 和 Webpack。  
可以把 Webpack 看做是 Browserify 的升级版，而 SystemJS 对应 RequireJS。  
本文有 Browserify 的相关介绍，而 RequireJS SystemJS Webpack 都分别单独介绍，因为选择好一款加载/打包工具后，需要精通才能发挥其最大的效能。

- - -

## 模块写法的演进

### 一、原始写法

模块就是实现特定功能的一组方法。只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

```js
// module.js
function m1() { /* ... */ }
function m2() { /* ... */ }
```
```html
<script src="module.js"></script>  // 使用
```

上面的函数m1()和m2()，组成一个模块。使用的时候，直接用调用就行了。  
这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

### 二、对象写法

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```js
var module1 = new Object({
  _count : 0,
  m1 : function() { /* ... */ },
  m2 : function() { /* ... */ }
});
```

上面的函数m1()和m2()，都封装在module1对象里。使用的时候，就是调用这个对象的属性。`module1.m1();`  
但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。如，`module1._count = 5;`

### 三、立即执行函数写法

使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。

```js
var module1 = (function(){
  var _count = 0;
  var m1 = function() { /* ... */ };
  var m2 = function() { /* ... */ };
  return { m1 : m1, m2 : m2 };
})();
```

这就是Javascript模块的基本写法。下面，再对这种写法进行加工。

### 四、放大模式
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。

```js
var module1 = (function (mod){
  mod.m3 = function () { /* ... */ };  // 需要注意的是，这里的 m3 已经无法读取 _count
  return mod;
})(module1);
```

上面的代码为 module1 模块添加了一个新方法 m3()，然后返回新的 module1 模块。

### 五、宽放大模式

在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。

```js
var module1 = ( function (mod){
  //...
  return mod;
})(window.module1 || {});
```

与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

### 全局变量模式 

独立性是模块的重要特点，模块内部最好不与外部直接交互。为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

```js
var module1 = (function ($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

这里可以认为是模块的真正起源，我们熟悉的 jQuery 是一个很好的说明这种模式的例子：对自身的代码进行很好的封装，输入一个 window 变量，向 window 添加属性 jQuery 和一个别名 $，并将相关的方法和属性都挂到 jQuery 上面。
```js
// jquery.js 早期的写法
(factory(window){
  // 这里是主体代码
  window.jQuery = window.$ = jQuery;
  return jQuery;
})(window);
```

### CommonJS 模块规范

先想一想，为什么模块很重要？因为有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。
但是，这样做有一个前提，那就是大家必须以同样的方式编写模块。目前，通行的JS模块规范有两种：CommonJS和AMD。

2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。node.js的模块系统，就是参照 CommonJS 规范实现的。

```js
// math.js
exports.add = function(x, y) { return x + y; };

// math.js 更好的写法
function add(x, y) { return x + y; };
module.exports ={ add: add }

// main.js
var math = require('math');
```

### AMD 模块规范

有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。如下例中，第二行 math.add(2, 3)，在第一行 require('math')之后运行，因此必须等 math.js 加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

```js
var math = require('math');
math.add(2, 3);  // 必须等 math 模块加载完才能执行这句命令
```

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。
因此，浏览器端的模块，不能采用"同步加载"，只能采用"异步加载"。这就是AMD规范诞生的背景。

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD也采用 require()语句加载模块，但是不同于CommonJS，它要求两个参数：`require([module], callback);` 
第一个参数 `[module]`，是一个数组，里面的成员就是要加载的模块；第二个参数 `callback`，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：
```js
require(['math'], function (math) {
  math.add(2, 3);
});
```

math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

#### 主模块的写法

主模块，即整个网页的入口代码，所有代码都从这儿开始运行。主模块通过 require()函数加载模块。

下面，我们看一个实际的例子。假定主模块依赖jquery、underscore和backbone这三个模块，main.js就可以这样写：
```js
// main.js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
  // 主模块代码
});
```

需要说明的是：

* 依赖组件和变量的顺序是一一对应的（例如，jquery->$, underscore->_）。
* 我们可以用任意的变量名来表示依赖组件。假如我们把`$`改成`$$`，在函数体里面的所有对jQuery的引用都由`$`变成了`$$`。
* 不能在回调函数外面引用变量`$`和`_`，因为它相对其它代码是独立的。这正是模块化的目的所在！

#### 模块写法

```js
// add.js
define(function() {                  // 模块必须采用特定的define()函数来定义
  return function add(x, y) { return x + y; };
});

// math.js
define(['add'], function (add){      // 如果模块还依赖其他模块，在第一个参数中以数组形式声明
  var subtract = function(x, y) { return x - y; };
  return { add: add, minus: subtract };
});

// main.js
require(['math'], function (math){   // 采用require()语句加载模块, 但格式与CommonJS不同
  alert(math.add(1,1));
});
```

#### 特殊依赖关键字

本规范定义了三种特殊的依赖关键字。如果"require","exports", 或 "module"出现在依赖列表中，参数应该按照CommonJS模块规范自由变量去解析。

依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的形参个数小于3，加载器会选择以函数指定的参数个数调用工厂方法。

### UMD 规范

CommonJS 和 AMD 风格都很流行，人们期望出现一种能同时支持两种风格的“通用”模式，于是通用模块规范（UMD）诞生了。

UMD 即通用模块定义 Universal Module Definition，UMD 兼容 CommonJS 和 AMD 规范，同时还支持老式的“全局”变量规范，所以你将模块以 UMD 格式发布的话，使用 CommonJS 或者 AMD 的用户都能按照他们各自的语法来导入你的模块。但不得不承认，这个模式的写法略难看。

```js
// myModuleName.js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports === 'object') {            // CommonJS
    module.exports = factory(require('jquery'), require('underscore'));
  } else {                                             // 使用全局变量 window.myModuleName
    root.myModuleName = factory(root.jQuery, root._);
  }
}(this, function($, _) {                               // 这里才开始真正编写模块内容
  function a() { };      // 定义私有方法
  function b() { };      // 定义公共方法
  function c() { };      // 定义公共方法
  return { b: b, c: c }  // 输出公共方法
}));
// 注意：必须将 AMD 检测放在第一项，因为 #22 Some AMD build tools expose an exports object.
```

### ES6 模块规范

ES6 模块是面向未来的规范，是官方规范，是未来的王者，通过编译/转译器，现在就可以使用 ES6 规范编写模块，详细介绍略。

```js
// lib.js
export let counter = 3;
export function incCounter() { counter++; }

// lib.js 更标准的写法
let counter = 3;
function incCounter() { counter++; }
export {counter: counter, incCounter: incCounter}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

## Browserify 的用法

Stop worrying and use a build tool. Pick whatever module definition you like. Then transform the modules as you build.
Browserify is a great build tool for this. Through transforms it enables you to consume any module.

Install browserify with: npm install browserify -g

#### CommonJS
Browserify works natively with the CommonJS module definition:
```bash
browserify main.js -o bundle.js    // 将 main.js 及依赖模块打包成 bundle.js
```
```html
<script src="bundle.js"></script>  // 然后直接在页面中加载，只需要这一条，不需要加载器
```

#### AMD
Browserify can consume AMD modules with deamdify:
```bash
npm install deamdify
browserify -t deamdify main.js -o bundle.js
```

#### Global Variables
Browserify can consume globals as well with deglobalify:
```bash
npm install deglobalify
browserify -t deglobalify main.js -o bundle.js
```

#### ES6
What about harmony? Yep! Use es6ify:
```bash
npm install es6ify
browserify -t es6ify main.js -o bundle.js
```

#### BROWSERIFY UNIVERSALLY
You can use multiple transforms in one swoop and have universal module access:
```bash
npm install deamdify es6ify deglobalify
browserify -t deamdify -t es6ify -t deglobalify main.js -o bundle.js
```

## 总结

* 书写格式：采用 TypeScript 按照 ES6 的语法编写模块，哦，不管用什么工具，用 ES6 格式编写是王道。
* 发布格式：将编译器的模块输出格式设为 UMD，但兼容其实没那么完美。Node's CommonJS/ES5 则是另外一个选项。
* 最终用户：作为最终用户其实不用过于关心模块格式，现在流行的模块加载器可以通吃各种格式，推荐将自己编写的模块输出格式设为 CommonJS 格式，最终产品上线前再使用构建工具对模块进行打包。



模块化

* 前端模块管理器： Bower
* 在线编译方案(加载器)： seajs / requirejs
* 预编译方案(打包工具)： browserify / webpack

- - -


### 前端模块管理器简介
http://www.ruanyifeng.com/blog/2014/09/package-management.html
作者： 阮一峰
日期： 2014年9月14日
模块化结构已经成为网站开发的主流。
制作网站的主要工作，不再是自己编写各种功能，而是如何将各种不同的模块组合在一起。

浏览器本身并不提供模块管理的机制，为了调用各个模块，有时不得不在网页中，加入一大堆script标签。这样就使得网页体积臃肿，难以维护，还产生大量的HTTP请求，拖慢显示速度，影响用户体验。
为了解决这个问题，前端的模块管理器（package management）应运而生。它可以轻松管理各种JavaScript脚本的依赖关系，自动加载各个模块，使得网页结构清晰合理。不夸张地说，将来所有的前端JavaScript项目，应该都会采用这种方式开发。
最早也是最有名的前端模块管理器，非RequireJS莫属。它采用AMD格式，异步加载各种模块。具体的用法，可以参考我写的教程。Require.js的问题在于各种参数设置过于繁琐，不容易学习，很难完全掌握。而且，实际应用中，往往还需要在服务器端，将所有模块合并后，再统一加载，这多出了很多工作量。

今天，我介绍另外四种前端模块管理器：Bower，Browserify，Component和Duo。它们各自都有鲜明的特点，很好地弥补了Require.js的缺陷，是前端开发的利器。

### Webpack，Browserify和Gulp三者之间到底是怎样的关系
2016-03-05

怎么解释呢？因为 Gulp 和 browserify / webpack 不是一回事

Gulp应该和Grunt比较，他们的区别我就不说了，说说用处吧。Gulp / Grunt 是一种工具，能够优化前端工作流程。比如自动刷新页面、comb、压缩css、js、编译less等等。简单来说，就是使用Gulp/Grunt，然后配置你需要的插件，就可以把以前需要手工做的事情让它帮你做了。

说到 browserify / webpack ，那还要说到 seajs / requirejs 。这四个都是JS模块化的方案。其中seajs / require 是一种类型，browserify / webpack 是另一种类型。

seajs / require : 是一种在线"编译" 模块的方案，相当于在页面上加载一个 CMD/AMD 解释器。这样浏览器就认识了 define、exports、module 这些东西。也就实现了模块化。

browserify / webpack : 是一个预编译模块的方案，相比于上面 ，这个方案更加智能。没用过browserify，这里以webpack为例。首先，它是预编译的，不需要在浏览器中加载解释器。另外，你在本地直接写JS，不管是 AMD / CMD / ES6 风格的模块化，它都能认识，并且编译成浏览器认识的JS。
这样就知道，Gulp是一个工具，而webpack等等是模块化方案。Gulp也可以配置seajs、requirejs甚至webpack的插件。

不知道这样够清楚了么

### NodeJS 将支持 ES6 模块

https://blog.othree.net/log/2017/01/14/nodejs-es-module/

