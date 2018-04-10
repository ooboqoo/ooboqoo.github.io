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
$ npm run dev    # 本地开发调试
$ npm run build  # 生成生产版本
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

### 声明式渲染

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

### 组件化应用构建

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。几乎任意类型的应用界面都可以抽象为一个组件树。在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

```html
<ol>
  <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
</ol>
```

一个使用了组件的应用的大概样子是这样的：

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API 与 is 特性。


## Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的。虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个选项对象，使用这些选项来定义你想要的行为。你可以在 API 文档中浏览完整的选项列表。

一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。

### 数据与方法

当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 `data` 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

**后面添加的属性不会触发视图更新**：
只有当实例被创建时 `data` 中存在的属性才是响应式的。如果你添加一个新的属性，那么新属性不会被跟踪。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么仅需要设置一些初始值。

**内置实例属性与方法**：除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都用前缀 `$` 特别标示。

```js
var data  = {
  a: 0
};

var vm = new Vue({
  el: '#app',
  data,
  created() { console.log('a is: ' + this.a) },
});

vm.a === data.a;  // true
vm.b = 'hi';  // 后面添加的属性不会触发视图更新

vm.$data === data;  // => true
vm.$el === document.getElementById('app');  //  true
vm.$watch('a', function (newValue, oldValue) { /* */ });
```

### 声明周期钩子

**不要在选项属性或回调上使用箭头函数**，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数是和父级上下文绑定在一起的，`this` 不会是如你所预期的 Vue 实例。

<details>
<summary>生命周期图示</summary>
![](https://cn.vuejs.org/images/lifecycle.png)
</details>


## 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。


## 计算属性和侦听器

### 计算属性

在模板中放入太多的逻辑会让模板过重且难以维护，对于任何复杂逻辑，你都应当使用计算属性。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      return this.message.split('').reverse().join('');  // `this` 指向 vm 实例
    }
  }
})
```

#### 计算属性缓存 vs 方法

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改变时才会重新求值。相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

```js
computed: {
  now() { return Date.now(); }  // 初始化后不会再更新，注意不要掉坑里
}
```

#### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调，计算属性代码更加简洁，具体见[文档示例](!https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)。

### 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。


## Class 与 Style 绑定

### 绑定类名

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

```html
<!-- 我们可以传给 v-bind:class 一个对象，以动态地切换 class -->
<div v-bind:class="{ active: isActive }"></div>

<!-- v-bind:class 指令也可以与普通的 class 属性共存 -->
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>

<!-- 绑定的数据对象不必内联定义在模板里，可以是属性或计算属性 -->
<div v-bind:class="classObject"></div>  // classObject: {active: true, 'text-danger': false}

<!-- 数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### 绑定内联样式

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名。

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>
<!-- 数组语法可以将多个样式对象应用到同一个元素上 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

**自动添加前缀**：当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。


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