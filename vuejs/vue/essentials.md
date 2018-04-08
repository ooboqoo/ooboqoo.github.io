# 基础


## 安装

Vue 兼容 IE9+

推荐安装浏览器插件 Vue Devtools，便于审查和调试 Vue 应用

直接下载并用 `<script>` 标签引入，Vue 会被注册为一个全局变量。

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js">/*完整版(开发环境)*/</script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js">/*完整版(运行环境)*/</script>
```

在用 Vue 构建大型应用时推荐使用 NPM 安装。

```bash
$ npm install vue
```

Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用。

```bash
$ npm install -g vue-cli
$ vue init webpack my-project  # 创建一个基于 webpack 模板的新项目
$ cd my-project
$ npm run dev
```

### 对不同构建版本的解释

在 NPM 包的 dist/ 目录你将会找到很多不同的 Vue.js 构建版本。

|                           | UMD                | CommonJS              | ES Module
|---------------------------|--------------------|-----------------------|--------------------
| 完整版                    | vue.js             | vue.common.js         | vue.esm.js
| 只包含运行时版            | vue.runtime.js     | vue.runtime.common.js | vue.runtime.esm.js
| 完整版 (生产环境)         | vue.min.js         | -                     | -
| 只包含运行时版 (生产环境) | vue.runtime.min.js | -                     | -

* 完整版：同时包含编译器和运行时的版本。
* 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
* 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。


* UMD：UMD 版本可以通过 script 标签直接用在浏览器中。
* CommonJS：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。
* ES Module：ES module 版本用来配合现代打包工具比如 webpack 2 或 Rollup。


## 介绍



## Vue 实例


## 模板语法



## 计算属性和侦听器


## Class 与 Style 绑定


## 条件渲染


## 列表渲染


## 事件处理


## 表单输入绑定













组件化应用构建

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```




与自定义元素的关系

你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API 与 is 特性。但是，还是有几个关键差别：

Web 组件规范仍然处于草案阶段，并且未被所有浏览器原生实现。相比之下，Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE9 及更高版本) 之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内。

Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成。