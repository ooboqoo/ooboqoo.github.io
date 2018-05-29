# 风格指南

规则分类
  * A 必要的 - 规避错误
  * B 强烈推荐 - 增强可读性
  * C 推荐 - 将选择和认知成本最小化
  * D 谨慎使用 - 有潜在危险的模式

## 避坑指南

### 事件名应该始终用小写

如 `ontouchcancel` `onloadedmetadata` 不要有大小写，或者分割线 <s>myEvent</s> <s>my-event</s>

> Vue 内置的一些事件使用了 `my-event` `update:foo`的形式，统一下也可以，但绝对不要用驼峰形式的事件名。

```js
Vue.component('child-comp', {
  template: `<button @click="emitEvent">触发事件</button>`,
  methods: { emitEvent () { this.$emit('anyName') } }
})
Vue.component('parent-comp', {
  // `anyname` `any-name` 都不工作，Vue 的提示是错误的
  template: `<child-comp @anyName="eventHandler"></child-comp>`,
  methods: { eventHandler () { alert('works') } }
})
```


## A 必要的

### 组件名应该始终是多个单词的

组件名应该始终是多个单词的，根组件 App 除外。

这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

```js
// Bad
Vue.component('todo', {})
export default {
  name: 'Todo',
}

// Good
TodoItem
```

### 组件的 data 必须是一个函数

当在组件中使用 `data` 属性的时候(除了 `new Vue` 外的任何地方)，它的值必须是返回一个对象的函数。

当 `data` 的值是一个对象时，它会在这个组件的所有实例之间共享。

### Prop 定义应该尽量详细

在你提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。

细致的 prop 定义有两个好处：
  * 它们写明了组件的 API，所以很容易看懂组件的用法；
  * 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。

### 总是用 key 配合 v-for

在组件上总是必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。

### 永远不要把 v-if 和 v-for 同时用在同一个元素上

根据不同情况，使用计算属性或将 `v-if` 提到 `v-for` 外层可以避免一些无谓的计算损耗。

当 Vue 处理指令时，`v-for` 比 `v-if` 具有更高的优先级，所以这个模板：

```html
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

将会经过如下运算：

```js
this.users.map(function (user) {
  if (user.isActive) {return user.name }
})
```

因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

### 为组件样式设置作用域

对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。

这条规则只和**单文件组件**有关。你不一定要使用 `scoped` 特性。设置作用域也可以通过 CSS Modules，那是一个基于 class 的类似 BEM 的策略，当然你也可以使用其它的库或约定。

不管怎样，对于**组件库**，我们应该更倾向于选用基于 class 的策略而不是 `scoped` 特性。这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。

### 始终为自定义的私有属性使用 $_ 前缀

在插件、混入等扩展中始终为自定义的私有属性使用 `$_` 前缀。并附带一个命名空间以回避和其它作者的冲突(如 `$_yourPluginName_`)。

```js
var myGreatMixin = {
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```


## B 强烈推荐

### 最大化拆分组件以便于查找

只要有能够拼接文件的构建系统，就把每个组件单独分成文件。

当你需要编辑一个组件或查阅一个组件的用法时，可以更快速的找到它。

### 统一组件文件名的大小写格式

单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。

单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

### 基础组件名应该全部以一个特定的前缀开头

应用特定样式和约定的基础组件 (即展示类的、无逻辑的或无状态的组件) 全部以一个特定的前缀开头，比如 `Base`、`App` 或 `V`。

### 单例组件名应该以 The 前缀命名

只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。

这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

### 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

### 组件名应该以高级别的单词开头，以描述性的修饰词结尾

组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

你可能会疑惑：“为什么我们给组件命名时不多遵从自然语言呢？”

因为编辑器通常会按字母顺序组织文件，所以将高级别的单词放前面，组件之间的重要关系一目了然。

你可能想换成多级目录的方式，我们只推荐在非常大型 (如有 100+ 个组件) 的应用下才考虑这么做，因为在多级目录间查找文件也挺不方便，重构时移动文件也更困难。

```txt
// Bad
ClearSearchButton.vue
ExcludeFromSearchInput.vue
LaunchOnStartupCheckbox.vue
RunSearchButton.vue
SearchInput.vue
TermsCheckbox.vue

// Good
SearchButtonClear.vue
SearchButtonRun.vue
SearchInputQuery.vue
SearchInputExcludeGlob.vue
SettingsCheckboxTerms.vue
SettingsCheckboxLaunchOnStartup.vue
```

### 在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的

自闭合组件表示它们不仅没有内容，而且刻意没有内容。而且没有了额外的闭合标签，你的代码也更简洁。

不幸的是，HTML 并不支持自闭合的自定义元素——只有官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

```html
// Bad
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent></MyComponent>
<!-- 在 DOM 模板中 -->
<my-component/>

// Good
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

### 在单文件组件和字符串模板中组件名应该总是大驼峰格式的

对于绝大多数项目来说，在单文件组件和字符串模板中组件名始终用 PascalCase —— 但在 DOM 模板中始终用 kebab-case。

PascalCase 相比 kebab-case 有一些优势：
  * 编辑器可以在模板里自动补全组件名，因为 PascalCase 同样适用于 JavaScript。
  * `<MyComponent>` 视觉上比 `<my-component>` 更能够和单个单词的 HTML 元素区别开来。
  * 如果你在模板中使用任何非 Vue 的自定义元素，比如一个 Web Component，PascalCase 确保了你的 Vue 组件在视觉上仍然是易识别的。

不幸的是，由于 HTML 是大小写不敏感的，在 DOM 模板中必须仍使用 kebab-case。

### JS/JSX 中的组件名应该始终是 PascalCase 的

JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用 Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串。

```js
// Bad
Vue.component('myComponent', {/* */});
import myComponent from './MyComponent.vue';

// Good
Vue.component('MyComponent', {/* */});
Vue.component('my-component', {/* */});
import MyComponent from './MyComponent.vue';
export default {name: 'MyComponent', /* ... */};
```

### 组件名应该倾向于完整单词而不是缩写

编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

### Prop 名在 JS 中用 camelCase 在 HTML 中用 kebab-case

> 监听事件时，大小写必须完全一致，否则捕获不到事件。避免踩坑的最好方式是，事件名始终用小写(跟 DOM 事件命名保持一致)

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

JS 中的 `propName` 对应的 HTML 中的 `prop-name`，而不会对应 `propName` 或 `propname`，后两者在 HTML 中时等效的。

### 多个特性的元素应该分多行撰写

多个特性的元素应该分多行撰写，每个特性一行。

在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。模板和 JSX 值得我们做相同的考虑。

```html
// Bad
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
<MyComponent foo="a" bar="b" baz="c"/>

// Good
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

### 组件模板应该只包含简单的表达式

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。

复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。

### 把复杂计算属性分割为尽可能多的更简单的属性

### 非空 HTML 特性值应该始终带引号

非空 HTML 特性值应该始终带引号 (单引号或双引号，选你 JS 里不用的那个)。

### 指令缩写

指令缩写 (用 `:` 表示 `v-bind:` 和用 `@` 表示 `v-on:`) 应该要么都用要么都不用。


## C 推荐

### 组件/实例的选项的顺序

组件/实例的选项应该有统一的顺序。这是我们推荐的组件选项默认顺序。

* 副作用 (触发组件外的影响) `el`
* 全局感知 (要求组件以外的知识) `name` `parent`
* 组件类型 (更改组件的类型) `functional`
* 模板修改器 (改变模板的编译方式) `delimiters` `comments`
* 模板依赖 (模板内使用的资源) `components` `directives` `filters`
* 组合 (向选项里合并属性) `extends` `mixins`
* 接口 (组件的接口) `inheritAttrs` `model` `props`/`propsData`
* 本地状态 (本地的响应式属性) `data` `computed`
* 事件 (通过响应式事件触发的回调) `watch` 生命周期钩子 (按照它们被调用的顺序)
* 非响应式的属性 (不依赖响应系统的实例属性) `methods`
* 渲染 (组件输出的声明式描述) `template`/`render` `renderError`

### 元素特性的顺序

元素 (包括组件) 的特性应该有统一的顺序。这是我们为组件选项推荐的默认顺序。

* 定义 (提供组件的选项) `is`
* 列表渲染 (创建多个变化的相同元素) `v-for`
* 条件渲染 (元素是否渲染/显示) `v-if` `v-else-if` `v-else` `v-show` `v-cloak`
* 渲染方式 (改变元素的渲染方式) `v-pre` `v-once`
* 全局感知 (需要超越组件的知识) `id`
* 唯一的特性 (需要唯一值的特性) `ref` `key` `slot`
* 双向绑定 (把绑定和事件结合起来) `v-model`
* 其它特性 (所有普通的绑定或未绑定的特性)
* 事件 (组件事件监听器) `v-on`
* 内容 (覆写元素的内容) `v-html` `v-text`

### 组件/实例选项中的空行

你可能想在多个属性之间增加一个空行，特别是在这些选项一屏放不下，需要滚动才能都看到的时候。

当你的组件开始觉得密集或难以阅读时，在多个属性之间添加空行可以让其变得容易。

### 单文件组件的顶级元素的顺序

单文件组件应该总是让 `<script>`、`<template>` 和 `<style>` 标签的顺序保持一致。且 `<style>` 要放在最后，因为另外两个标签至少要有一个。

```html
<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```


## D 谨慎使用

### 在 v-if/v-if-else/v-else 中使用 key

默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现意料之外的副作用。

```html
// 通过 key 阻止复用
<div v-if="error" key="search-status">错误：{{ error }}</div>
<div v-else key="search-results">{{ results }}</div>
// 通过使用不同元素规避复用
<p v-if="error">错误：{{ error }}</p>
<div v-else>{{ results }}</div>
```

### 元素选择器应该避免在 scoped 中出现

在 `scoped` 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的。

为了给样式设置作用域，Vue 会为元素添加一个独一无二的特性，例如 `data-v-f3f3eg9`。然后修改选择器，使得在匹配选择器的元素中，只有带这个特性才会真正生效 (比如 `button[data-v-f3f3eg9]`)。问题在于大量的元素和特性组合的选择器 (比如 `button[data-v-f3f3eg9]`) 会比类和特性组合的选择器 慢，所以应该尽可能选用类选择器。

### 尽量避免隐性的父子组件通信

应该优先通过 prop 和事件进行父子组件之间的通信，而不是 `this.$parent` 或改变 prop。

一个理想的 Vue 应用是 prop 向下传递，事件向上传递的。遵循这一约定会让你的组件更易于理解。然而，在一些边界情况下 prop 的变更或 `this.$parent` 能够简化两个深度耦合的组件。

问题在于，这种做法在很多简单的场景下可能会更方便。但请当心，不要为了一时方便 (少写代码) 而牺牲数据流向的简洁性 (易于理解)。

```js
// Bad
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeTodo () {
      var vm = this
      vm.$parent.todos = vm.$parent.todos.filter(todo => todo.id !== vm.todo.id)
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo"> X </button>
    </span>
  `
})
```

### 优先通过 Vuex 管理全局状态

应该优先通过 Vuex 管理全局状态，而不是通过 `this.$root` 或一个全局事件总线。

通过 `this.$root` 和/或全局事件总线管理状态在很多简单的情况下都是很方便的，但是并不适用于绝大多数的应用。Vuex 提供的不仅是一个管理状态的中心区域，还是组织、追踪和调试状态变更的好工具。
