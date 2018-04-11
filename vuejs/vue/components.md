# 组件

组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 `is` 特性进行了扩展的原生 HTML 元素。

所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象(除了一些根级特有的选项)并提供相同的生命周期钩子。

## 使用组件

### 全局注册

```js
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
});
```

### 局部注册

```js
var Child = {
  template: '<div>A custom component!</div>'
};
new Vue({
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```

### DOM 解析限制

当使用 DOM 作为模板时 (例如，使用 el 选项来把 Vue 实例挂载到一个已有内容的元素上)，你会受到 HTML 本身的一些限制，因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。尤其要注意，像 ul、ol、table、select 这样的元素里允许包含的元素有限制，而另一些像 option 这样的元素只能出现在某些特定元素的内部。

```html
<table>
  <my-row>...</my-row>  // 自定义组件 my-row 会被当作无效的内容
  <tr is="my-row">      // 变通的方案是使用特殊的 is 特性
</table>
```

应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：
  * `<script type="text/x-template">`
  * JS 内联模板字符串
  * .vue 组件

### data 必须是函数

构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：`data` 必须是函数。如果是一个对象，则会导致组件各实例之间共享同一个对象。如果误写成对象，那么 Vue 会停止运行，并在控制台发出警告。

### 组件组合

组件设计初衷就是要配合使用的，最常见的就是形成父子组件的关系。它们之间必然需要相互通信：父组件可能要给子组件下发数据，子组件则可能要将它内部发生的事情告知父组件。然而，通过一个良好定义的接口来尽可能将父子组件解耦也是很重要的。这保证了每个组件的代码可以在相对隔离的环境中书写和理解，从而提高了其可维护性和复用性。

在 Vue 中，父子组件的关系可以总结为 **prop 向下传递，事件向上传递**。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。


## Prop

### 使用 Prop 传递数据

组件实例的**作用域是孤立的**。这意味着不能(也不该)在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 prop 才能下发到子组件中。子组件要显式地用 props 选项声明它预期的数据。

```js
Vue.component('child', {
  props: ['message'],
  template: '<span>{{ message }}</span>'
});
```

#### camelCase vs kebab-case

HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)，如果你使用字符串模板，则没有这些限制。

### 动态 Prop

与绑定到任何普通的 HTML 特性相类似，我们可以用 `v-bind` 来动态地将 `prop` 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件。

如果你想把一个对象的所有属性作为 `prop` 进行传递，可以使用不带任何参数的 `v-bind` (即用 `v-bind` 而不是 `v-bind:prop-name`)。

```html
<todo-item v-bind="{text: 'Learn Vue', isComplete: false}"></todo-item>
// 等价于
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

### 字面量语法 vs 动态语法

```html
<comp some-prop="1"></comp>         <!-- 传递了一个字符串 "1" -->
<comp v-bind:some-prop="1"></comp>  <!-- 传递真正的数值，引号内的内容是作为 JS 表达式来对待的 -->
```

### 单向数据流

Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。

每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你**不该**在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。

注意，如果 prop 是一个对象或数组，因为传递的是引用地址，在子组件内部改变它会影响父组件的状态。

### Prop 验证

要指定验证规则，需要用**对象的形式**来定义 prop，而不能用字符串数组。

注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。

```js
Vue.component('my-comp', {
  propA: null,  // null 即 any
  propB: [String, Number],  // 允许为多种类型
  propC: { type: String, required: true }  // 必传参数
  propD: { type: Number, default: 100 }    // 带默认值
  propE: { type: Object, default: () => ({message: 'hello'})}  // 数组/对象的默认值应当由一个工厂函数返回
  propF: { validator: value => value > 10 }  // 自定义验证函数
});
```


## 非 Prop 特性

所谓非 prop 特性，就是指它可以直接传入组件，而不需要定义相应的 prop。

尽管为组件定义明确的 prop 是推荐的传参方式，组件的作者却并不总能预见到组件被使用的场景。所以，组件可以接收任意传入的特性，这些特性都**会被添加到组件的根元素上**。

对于多数特性来说，传递给组件的值会覆盖组件本身设定的值。即例如传递 `type="large"` 将会覆盖 `type="date"` 且有可能破坏该组件！所幸我们对待 `class` 和 `style` 特性会更聪明一些，这两个特性的值都会做合并 (merge) 操作。


## 自定义事件

### 使用 `v-on` 绑定自定义事件
每个 Vue 实例都实现了事件接口，即：
  * 使用 `$on(eventName)` 监听事件
  * 使用 `$emit(eventName, optionalPayload)` 触发事件

Vue 的事件系统与浏览器的 EventTarget API 有所不同。尽管它们运行起来类似，但是 `$on` 和 `$emit` 并不是 `addEventListener` 和 `dispatchEvent` 的别名。

另外，父组件可以在使用子组件的地方直接用 `v-on` 来监听子组件触发的事件。

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```

```js
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: () => ({counter: 0}),
  methods: {
    incrementCounter() {
      this.counter += this.counter || 1;
      this.$emit('increment', { value: this.counter });
    }
  },
});

new Vue({
  el: '#counter-event-example',
  data: {total: 0},
  methods: {
    incrementTotal(payload) { this.total += payload.value || 1; }
  }
});
```

### 给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 `v-on` 的修饰符 `.native`。

```html
<my-component v-on:click.native="doTheThing"></my-component>
```

### .sync 修饰符

在一些情况下，我们可能会需要对一个 prop 进行“双向绑定”。事实上，这正是 Vue 1.x 中的`.sync`修饰符所提供的功能。这很方便，但也会导致问题，因为它破坏了单向数据流。在 2.0 中被移除，但在 2.3.0 中有重新引入，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器。

```html
<comp :foo.sync="bar"></comp>
会被扩展为：
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：

```js
this.$emit('update:foo', newValue);
```





### 非父子组件的通信

有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：

```js
var bus = new Vue();
bus.$emit('id-selected', 1);                     // 触发组件 A 中的事件
bus.$on('id-selected', function (id) {/* */ });  // 在组件 B 创建的钩子中监听事件
```

在复杂的情况下，我们应该考虑使用专门的状态管理模式。


## 使用插槽分发内容

插槽即 Angular 的 transclusion，Vue.js 使用特殊的 `<slot>` 元素作为原始内容的插槽。

例如，假定我们有一个 app-layout 组件，它的模板为：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件模板：

```html
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>

  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>

  <p slot="footer">这里有一些联系信息</p>
</app-layout>
```

渲染结果为：

```html
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```

### 编译作用域

```html
<child-component>{{ message }}</child-component>
```

message 应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：
**父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。**

### 单个插槽

除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。

最初在 `<slot>` 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。

```html
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```

### 具名插槽

`<slot>` 元素可以用一个特殊的特性 `name` 来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中有对应 `slot` 特性的元素。

仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃。

### 作用域插槽



## 动态组件

通过使用保留的 `<component>` 元素，并对其 `is` 特性进行动态绑定，你可以在同一个挂载点动态切换多个组件：

```js
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
});
```

```html
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```

也可以直接绑定到组件对象上：

```js
var Home = {
  template: '<p>Welcome home!</p>'
};

var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
});
```

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 `keep-alive` 指令参数：

```html
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```


## 杂项

### 编写可复用组件

在编写组件时，最好考虑好以后是否要进行复用。一次性组件间有紧密的耦合没关系，但是可复用组件应当定义一个清晰的公开接口，同时也不要对其使用的外层数据作出任何假设。

Vue 组件的 API 来自三部分：
  * __Prop__ 允许外部环境传递数据给组件
  * __事件__ 允许从组件内触发外部环境的副作用
  * __插槽__ 允许外部环境将额外的内容组合在组件中

```html
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

### 子组件引用 `ref`

尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 `ref` 为子组件指定一个引用 ID。

```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```js
var parent = new Vue({ el: '#parent' });
var child = parent.$refs.profile;  // 访问子组件实例
```

注1：当 `ref` 和 `v-for` 一起使用时，获取到的引用会是一个数组。  
注2：`$refs` 只在组件渲染完成后才填充，并且是非响应式的。它仅是一个应急方案——应避免在模板或计算属性中使用。

### 异步组件

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了进一步简化，Vue.js 允许将组件定义为一个工厂函数，异步地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {  // 使用 setTimeout 只是为了演示
    // 将组件定义传入 resolve 回调函数
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

工厂函数接收一个 `resolve` 回调，在收到从服务器下载的组件定义时调用。也可以调用 `reject(reason)` 指示加载失败。推荐配合 webpack 的代码分割功能 来使用：

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack 自动将编译后的代码分割成不同的块，这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```

### 组件命名约定





<script>ooboqoo.contentsRegExp = /H[123]/;</script>
