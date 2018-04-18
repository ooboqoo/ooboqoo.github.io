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

一旦使用全局混入对象，将会影响到所有之后创建的 Vue 实例。

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

在 Vue2.0 中，代码复用和抽象的主要形式是组件。但有时仍然需要对普通 DOM 元素进行底层操作，这时就会用到自定义指令。

```js
// 注册一个全局自定义指令 `v-demo`
Vue.directive('demo', {
  bind (el, binding, vnode) { },
  inserted (el, binding, vnode) { },
  update (el, binding, vnode, oldVnode) { },
  componentUpdated (el, binding, vnode, oldVnode) {
    let {name, value, oldValue, expression, arg, modifiers} = binding
  },
  unbind: function (el, binding, vnode) { }
})

// 如果想注册局部指令，组件中也接受一个 `directives` 的选项：
directives: {
  demo: {
    inserted: function (el) { el.focus() }
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
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。
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
<div v-demo="{color: 'white', text: 'hello!'}"></div>
```

```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color, binding.value.text)
})
```


## 渲染函数 &amp; JSX

### 基础

Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，使用更底层的 render 函数会更加灵活。

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1"><slot></slot></h1>
  <h2 v-else-if="level === 2"><slot></slot></h2>
</script>
```

```js
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',  // 顺便学下模板缓存用法
  props: {
    level: {type: Number, required: true},
  }
})
```

上面的例子使用 render 函数重写：

```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {type: Number, required: true},
  },
})
```

简单清晰很多，但是需要非常熟悉 Vue 的[实例属性](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)。

### 虚拟 DOM

Vue 通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。

```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

上面 `createElement` 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。我们把这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

### createElement 参数

```js
// @returns {VNode}
createElement(
  // 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数，必要参数。
  'div',  // {String | Object | Function}
  // 一个包含模板相关属性的数据对象，这样，您可以在 template 中使用这些属性。可选参数。
  {  // {Object}
    // (详情见下一节)
  },
  // 子节点 (VNodes)，由 `createElement()` 构建而成，或使用字符串来生成“文本节点”。可选参数。
  [  // {String | Array}
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {someProp: 'foobar'}
    })
  ]
)
```

#### 深入 data 对象

```js
{
  'class': {foo: true, bar: false },  // 和`v-bind:class`一样的 API
  style: {color: 'red', fontSize: '14px'},  // 和`v-bind:style`一样的 API
  attrs: {id: 'foo'},  // 正常的 HTML 特性
  props: {myProp: 'bar'},  // 组件 props
  domProps: {innerHTML: 'baz'},  // DOM 属性
  // 事件监听器基于 `on` 所以不再支持如 `v-on:keyup.enter` 修饰器，需要手动匹配 keyCode。
  on: {click: this.clickHandler},
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {click: this.nativeClickHandler},
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue` 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {bar: true}
    }
  ],
  // Scoped slots in the form of { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

#### 约束

组件树中的所有 VNodes 必须是唯一的。这意味着，下面的 render function 是无效的：

```js
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [myParagraphVNode, myParagraphVNode ])  // 错误-重复的 VNodes
}
```

### 使用 JS 代替模板功能

#### 指令

render 函数更加灵活，但也缺少了模板中的 `v-if` `v-for` `v-model` 等指令，需要自己通过 JS 实现响应的逻辑。

```js
// v-model 实现
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {value: self.value},
    on: {input (event) => self.$emit('input', event.target.value)}
  })
}
```

#### 事件 &amp; 按键修饰符

对于 `.passive` `.capture` 和 `.once`事件修饰符, Vue 提供了相应的前缀可以用于 `on`：

| Modifier(s) | Prefix
|-------------|-----------
| `.passive`  |   `&`
| `.capture`  | `!`
| `.once`     | `~`
| `.capture.once` `.once.capture`  | `~!`

```js
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

对于其他的修饰符，前缀不是很重要，因为你可以在事件处理函数中使用事件方法。

#### 插槽

??


### JSX

如果你写了很多 render 函数，可能会觉得痛苦，于是有了一个 [Babel 插件](https://github.com/vuejs/babel-plugin-transform-vue-jsx)，用于在 Vue 中使用 JSX 语法的原因，它可以让我们回到更接近于模板的语法上。

```js
new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```

将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 `h` 失去作用，在应用中会触发报错。

### 函数式组件

就是类似 React 中 PureComponent 的东西。

```js
Vue.component('my-component', {
  functional: true,
  render: function (createElement, context) { },  // 为了弥补缺少的实例，提供第二个参数作为上下文
  props: {}  // Props 可选
})
```

```html
<template functional></template>
```


### 模板编译

如果你想看看模板的功能是怎样被编译的，可以试试 `Vue.compile`。


## 插件

### 开发插件

插件通常会为 Vue 添加全局功能。插件的范围没有限制，一般有下面几种：
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

通过全局方法 `Vue.use()` 使用插件：

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
{{ message | filterA('arg1', 2) }}  // filterA(message, 'arg1', 2)
```

