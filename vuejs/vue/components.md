# 组件


## 使用组件




## Prop


### Prop 验证

要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组。

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

组件可以接收任意传入的特性，这些特性都会被添加到组件的根元素上。

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
  data: () => ({
    counter: 0,
  }),
  methods: {
    incrementCounter: function () {
      this.counter += this.counter || 1;
      this.$emit('increment', { value: this.counter });
    }
  },
});

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0,
  },
  methods: {
    incrementTotal: function (payload) {
      this.total += payload.value || 1;
    }
  }
});
```

### 给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 `v-on` 的修饰符 `.native`。

```html
<my-component v-on:click.native="doTheThing"></my-component>
```


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

注：其他注意事项详见文档



