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

你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API 与 `is` 特性。


## Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的。虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个选项对象，使用这些选项来定义你想要的行为。你可以在 API 文档中浏览完整的选项列表。

一个 Vue 应用由一个通过 `new Vue()` 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。

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
<div v-bind:class="{active: isActive}"></div>

<!-- v-bind:class 指令也可以与普通的 class 属性共存 -->
<div class="static"
     v-bind:class="{'text-danger': hasError}">  // 不支持自动转换 textDanger 成 text-danger
</div>

<!-- 绑定的数据对象不必内联定义在模板里，可以是属性或计算属性 -->
<div v-bind:class="classObject"></div>  // classObject: {active: true, 'text-danger': false}

<!-- 数组语法 -->
<div v-bind:class="[activeClassObject, errorClassObject]"></div>
<div v-bind:class="[isActive ? activeClassObject : '', errorClassObject]"></div>
<div v-bind:class="[{active: isActive}, errorClassObject]"></div>
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

```html
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else-if="type === 'C'"> C </div>
<div v-else> Not A/B/C </div>
```

注：`v-else`，`v-else-if` 必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后，否则将不会被识别。

### 条件渲染分组

需要用一个 `v-if` 指令控制多个元素时，可借助 `<template>` 元素，最终的渲染结果不包含 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### 元素复用

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

```html
<!-- 切换 loginType 将不会清除用户已经输入的内容 -->
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

### v-show

`v-show` 只是简单地切换元素的 CSS 属性 `display`。另，`v-show` 不支持 `<template>` 元素。


## 列表渲染

### 数组

我们用 v-for 指令根据一组数组的选项列表进行渲染。

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```

### 对象

你也可以用 v-for 通过一个对象的属性来迭代。

```html
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

注：在遍历对象时，是按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

### key

当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用"就地复用"策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。理想的 `key` 值是每项都有的且唯一的 `id`。这个特殊的属性相当于 Vue 1.x 的 `track-by` ，但它的工作方式类似于一个属性，所以你需要用 `v-bind` 来绑定动态值：

```html
<div v-for="item in items" :key="item.id"> <!-- 内容 --> </div>
```

建议尽可能在使用 `v-for` 时提供 `key`，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

注：`key` 是 Vue 识别节点的一个通用机制，并不与 `v-for` 特别关联。

### 数组更新检测

#### 变异方法

`push() pop() shift() unshift() splice() sort() reverse()` 这些变异方法会自动触发视图更新。

#### 替换数组

`filter() concat() slice()` 等这些非变异方法不会更改原数组，总是返回新数组。对于这类情况，可以用新数组替换原数组。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### 无法检测的情况

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
  * 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
  * 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一类问题，可以使用以下两种方式规避：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```js
vm.items.splice(newLength)
```

### 对象变更检测

还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：

```js
var vm = new Vue({
  data: {
    a: 1          // `vm.a` 现在是响应式的
  }
})
vm.b = 2          // `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)`方法向嵌套对象添加响应式属性。

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
});
Vue.set(vm.userProfile, 'age', 27);
vm.$set(vm.userProfile, 'age', 27);  // vm.$set 实例方法只是全局 Vue.set 的别名
```

有时你可能需要为已有对象赋予多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。

```js
// 更改对象地址以触发更新
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
// 错误用法
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 显示过滤/排序

可以创建返回过滤或排序数组的计算属性，在计算属性不适用的情况下 (如在嵌套 v-for 循环中) 你可以使用一个 method 方法。

```html
<li v-for="n in evenNumbers">{{ n }}</li>
<li v-for="n in even(numbers)">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0 )
  }
}
```

### 渲染多个元素

类似于 v-if，你也可以利用带有 v-for 的 `<template>` 渲染多个元素。

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

### v-for with v-if

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。

而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 `<template>`)上。


## 事件处理

### 监听事件

```html
// 绑定到一个方法
<button @click="greet">Greet</button>           <!-- 直接绑定到一个方法 -->

// 内联 JS 语句
<button @click="counter += 1">Add 1</button>    <!-- 直接运行 JS 代码 -->
<button @click="say('what')">Say what</button>  <!-- 在内联 JS 语句中调用方法 -->
<button @click="warn($event)">Submit</button>   <!-- 在内联语句处理器中访问原始的 DOM 事件 -->
```

### 使用修饰符

#### 事件修饰符

事件修饰符 `.stop .prevent .capture .self .once (2.1.4新增) .passive (2.3.0 新增)`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。

##### .passive

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

这个 .passive 修饰符尤其能够提升移动端的性能。

#### 按键修饰符

在监听键盘事件时，我们经常需要检查常见的键值。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```html
<input @keyup.enter="submit">
```

全部的按键别名：`.enter .tab .delete (捕获“删除”和“退格”键) .esc .space .up .down .left .right`

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

##### 自动匹配按键修饰符

你也可直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 kebab-case 来作为修饰符：

```html
<input @keyup.page-down="onPageDown">
```

#### 系统修饰符

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。`.ctrl .alt .shift .meta`

注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。

```html
<input @keyup.alt.67="clear">  <!-- Alt + C -->
<div @click.ctrl="doSomething">Do something</div>  <!-- Ctrl + Click -->
```

2.5.0 新增 `.exact` 修饰符

2.2.0 新增鼠标按钮修饰符 `.left .right .middle`

### 为什么在 HTML 中监听事件?

你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：
  * 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
  * 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
  * 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。


## 表单输入绑定

### 基础用法

你可以用 `v-model` 指令在表单 `<input>` 及 `<textarea>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

```html
<!-- 文本 -->
<input v-model="message" placeholder="edit me">
<!-- 多行文本 -->
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<!-- 单个复选框，绑定到布尔值 -->
<label><input type="checkbox" id="checkbox" v-model="checked">{{ checked }}</label>
<!-- 多个复选框，绑定到同一个数组 -->
<label><input type="checkbox" id="jack" value="Jack" v-model="checkedNames">Jack</label>
<label><input type="checkbox" id="john" value="John" v-model="checkedNames">John</label>
<label><input type="checkbox" id="mike" value="Mike" v-model="checkedNames">Mike</label>
<!-- 单选按钮 -->
<label><input type="radio" id="one" value="One" v-model="picked">One</label>
<label><input type="radio" id="two" value="Two" v-model="picked">Two</label>
<!-- 选择框 -->
<select v-model="selected">
  <option disabled value="">请选择</option>  // 解决 iOS 下初始值无法匹配时无法选择第一项的问题 
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

### 值绑定

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

<!-- 值绑定 -->
<input type="checkbox" v-model="toggle" true-value="myyes" false-value="myno">
<input type="radio" v-model="pick" :value="a">
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

### 修饰符

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
<!-- 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number">
<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg">
```


<script>ooboqoo.contentsRegExp = /H[123]/;</script>
