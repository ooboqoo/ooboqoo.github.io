# 可复用性&amp;组合

## 混入

### 基础

```js
// 定义一个混入对象
var myMixin = {
  created: function () { this.hello() },
  methods: {
    hello () { console.log('hello from mixin!') }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。

比如，数据对象在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先。

同名钩子函数将混合为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

```js
var mixin = {
  created () {console.log('混入对象的钩子被调用') }  // 先执行
}
new Vue({
  mixins: [mixin],
  created () { console.log('组件钩子被调用') }       // 后执行
})
```

### 全局混入

一旦使用全局混入对象，将会影响到 所有 之后创建的 Vue 实例。

```js
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) { console.log(myOption) }
  }
})
new Vue({myOption: 'hello!'})  // => "hello!"
```

### 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}
// 对于大多数对象选项，可以使用 methods 的合并策略：
Vue.config.optionMergeStrategies.myOption = strategies.methods
```


## 自定义指令

在 Vue2.0 中，代码复用和抽象的主要形式是组件。但有时你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

```js
// 注册一个全局自定义指令 `v-demo`
Vue.directive('demo', {
  bind (el, binding, vnode) { },
  inserted (el, binding, vnode) { },
  update (el, binding, vnode, oldVnode) { },
  componentUpdated (el, binding, vnode, oldVnode) {
    let {name, value,oldValue, expression, arg, modifiers} = binding
  },
  unbind: function (el, binding, vnode) { }
})

// 如果想注册局部指令，组件中也接受一个 `directives` 的选项：
directives: {
  demo: {
    inserted: function (el) { el.focus(); }
  }
}
```

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

* `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
* `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
* `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
* `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
* `unbind`：只调用一次，指令与元素解绑时调用。

### 钩子函数参数

指令钩子函数会被传入以下参数：

* `el`：指令所绑定的元素，可以用来直接操作 DOM 。
* `binding`：一个对象，包含以下属性：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
* `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
* `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

注意：除了 `el` 之外，其它参数都应该是只读的，切勿修改。如果需要在钩子之间共享数据，建议通过元素的 `dataset` 来进行。

### 函数简写

在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color, binding.value.text)
})
```


## 渲染函数 &amp; JSX


### JSX

将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 `h` 失去作用，在应用中会触发报错。



## 插件

### 开发插件

插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：
  * 添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
  * 添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)
  * 通过全局 mixin 方法添加一些组件选项，如: [vue-router](https://github.com/vuejs/vue-router)
  * 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
  * 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

Vue.js 的插件应当有一个公开方法 `install`，这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  Vue.myGlobalMethod = function () { }     // 1. 添加全局方法或属性
  Vue.directive('my-directive', { })       // 2. 添加全局资源
  Vue.mixin({created: function () { }, })  // 3. 注入组件
  Vue.prototype.$myMethod = function (methodOptions) { }  // 4. 添加实例方法
}
```

### 使用插件

通过全局方法 Vue.use() 使用插件：

```js
Vue.use(MyPlugin, {someOption: 'someValue'})  // 调用 `MyPlugin.install(Vue)`
```

`Vue.use` 会自动阻止多次注册相同插件，届时只会注册一次该插件。

> [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了来自社区贡献的数以千计的插件和库。


## 过滤器

可以在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value, arg1, arg2) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

你也可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

使用过滤器

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

<!-- 过滤器串连 -->
{{ message | filterA | filterB }}

<!-- 过滤器是 JavaScript 函数，因此可以接收参数 -->
{{ message | filterA('arg1', arg2) }}
```

