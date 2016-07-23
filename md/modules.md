# 前端模块化

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