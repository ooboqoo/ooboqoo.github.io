# Vue.js API


## 模板语法

```html
<!-- 文本插值，不支持在属性中使用 -->
<div id="app">{{ message }}</div>
<span v-once>这个将不会改变: {{ message }}</span>  <!-- 通过 v-once 指令执行一次性地插值 -->

<!-- 原始 HTML -->
<span v-html="rawHtml"></span> <!-- 注意 XSS 攻击，绝不要对用户提供的内容使用插值 -->

<!-- 特性绑定 -->
<span v-bind:title="message">完整写法</span>
<span :title="message">简写</span>

<!-- 表单双向绑定 -->
<input v-model="message">

<!-- 条件与循环 -->
<p v-if="seen">现在你看到我了</p>
<li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li> <!-- 始终指定 key 是最佳实践 -->

<!-- 添加事件监听器 -->
<button v-on:click="someMethod">完整写法</button>
<button @click="someMethod">简写</button>

<button @click="counter += 1">Add 1</button>    <!-- 直接运行 JS 代码 -->
<button @click="greet">Greet</button>           <!-- 直接绑定到一个方法 -->
<button @click="say('what')">Say what</button>  <!-- 在内联 JS 语句中调用方法 -->
<button @click="warn($event)">Submit</button>   <!-- 在内联语句处理器中访问原始的 DOM 事件 -->
```

```html
<!-- 绑定中使用 JS 表达式 -->
<p>{{ number + 1 }}</p>
<p>{{ ok ? 'YES' : 'NO' }}</p>
<p>{{ message.split('').reverse().join('') }}</p>
<div v-bind:id="'list-' + id"></div>

<!-- 指令参数：些指令能够接收一个参数，在指令名称之后以冒号表示 -->
<a v-bind:href="url">...</a>
<a v-on:click="doSomething">...</a>

<!-- 修饰符：用于指出一个指令应该以特殊方式绑定 -->
<form v-on:submit.prevent="onSubmit">...</form>
```


## 实例属性和方法

### 实例属性

```js
vm.$data
vm.$props
vm.$el
vm.$options
vm.$parent
vm.$root
vm.$children
vm.$slots
vm.$scopedSlots
vm.$refs
vm.$isServer
vm.$attrs
vm.$listeners
```

### 实例方法

```js
// 数据
vm.$watch( expOrFn, callback, [options] )
vm.$set()
vm.$delete()

// 事件
vm.$on()
vm.$once()
vm.$off()
vm.$emit()

// 声明周期
vm.$mount([elementOrSelector])  // 手动挂载一个未挂载(实例化时未指定 el 选项)的实例
vm.$forceUpdate() // 迫使 Vue 实例重新渲染。注意它仅影响实例本身和插入插槽内容的子组件
vm.$nextTick()
vm.$destroy()  // 销毁实例
```

示例：

```js
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) { /* 做点什么 */ });
// 函数
vm.$watch(() => this.a + this.b, function (newVal, oldVal) { /* 做点什么 */ });

var unwatch = vm.$watch('a', cb); // 添加观察
unwatch();                        // 之后取消观察
```


## Vue Router

```html
<router-link to="home">Home</router-link>
<router-link :to="'home'">Home</router-link>
<router-link :to="{ path: 'home' }">Home</router-link>
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

<!--
  replace  调用 router.replace() 而非 router.push()
  append   基于当前路径(基路径)跳转
  tag      默认会渲染成 a 标签，可通过此属性更换  <router-link to="/foo" tag="li">foo</router-link>
  exact    匹配激活链接时，必须是完全匹配
  .router-link-active  链接激活时会添加此类，可以通过路由的构造选项 linkActiveClass 来更改类名
  .router-link-exact-active  链接被精确匹配时的类名，可通过 linkExactActiveClass 选项更改
-->

<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```


## Vue Resource

https://github.com/pagekit/vue-resource/blob/develop/docs/api.md

Request

```
{
  // Constructor
  constructor(object: config)

  // Properties
  url (string)
  body (any)
  headers (Headers)
  method (string)
  params (object)
  timeout (number)
  credentials (boolean)
  emulateHTTP (boolean)
  emulateJSON (boolean)
  before (function(Request))
  progress (function(Event))

  // Methods
  getUrl() (string)
  getBody() (any)
  respondWith(any: body, object: config) (Response)
  abort()
}
```

Response

```
{
  // Constructor
  constructor(any: body, object: {string: url, object: headers, number: status, string: statusText})

  // Properties
  url (string)
  body (any)
  headers (Headers)
  ok (boolean)
  status (number)
  statusText (string)

  // Methods
  blob() (Promise)
  text() (Promise)
  json() (Promise)
}
```

Headers

```
{
  // Constructor
  constructor(object: headers)

  // Properties
  map (object)

  // Methods
  has(string: name) (boolean)
  get(string: name) (string)
  getAll() (string[])
  set(string: name, string: value) (void)
  append(string: name, string: value) (void)
  delete(string: name) (void)
  forEach(function: callback, any: thisArg) (void)
}
```


## Vuex

Vuex.Store 构造器

```js
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: Object | Function,
  mutations: { [type: string]: Function },  // (state, payload) => {}
  actions: { [type: string]: Function },    // (context, payload) => {}
  getters: { [key: string]: Function },
  modules: Object,
  plugins: Array<Function>,
  strict: =false,
});
```

Vuex.Store 实例属性/方法

```js
s.state
s.getters
s.commit(type: string, payload?: any, options?: Object)
s.commit(mutation: Object, options?: Object)
s.dispatch(type: string, payload?: any, options?: Object)
s.dispatch(action: Object, options?: Object)
s.replaceState(state: Object)
s.watch(fn: Function, callback: Function, options?: Object): Function
s.subscribe(handler: Function): Function
s.subscribeAction(handler: Function): Function
s.registerModule(path: string | Array<string>, module: Module, options?: Object)
s.unregisterModule(path: string | Array<string>)
s.hotUpdate(newOptions: Object)
```

组件绑定的辅助函数

```js
mapState(namespace?: string, map: Array<string> | Object): Object
mapGetters(namespace?: string, map: Array<string> | Object): Object
mapActions(namespace?: string, map: Array<string> | Object): Object
mapMutations(namespace?: string, map: Array<string> | Object): Object
createNamespacedHelpers(namespace: string): Object
```


## Vue Resource







