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
<input v-model.number="age" type="number">  <!-- `number` 修饰符自动将输入转为数值类型 -->
<input v-model.trim="msg">                  <!-- `trim` 修饰符自动过滤输入的首尾空白字符 -->

<!-- v-model 原理 -->
<input :value="val" @input="val = $event.target.value">
<my-comp :value="val" @input="val = $event"></my-comp>

<!-- 条件渲染 -->
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div> <!-- 必须是紧跟在 v-if 后才生效 -->
<div v-else> Not A/B </div>

<!-- 循环 -->
<li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li> <!-- 始终指定 key 是最佳实践 -->
<div v-for="(val, key, index) in object"></div>

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

### 修饰符

```html
<!-- 事件处理 / 事件修饰符 -->
<a    @click.stop="doThis"></a>          <!-- 阻止单击事件继续传播 -->
<form @submit.prevent="onSubmit"></form> <!-- 阻止浏览器默认行为 -->
<a    @click.stop.prevent="doThat"></a>  <!-- 修饰符可以串联 -->
<form @submit.prevent></form>            <!-- 只有修饰符 -->
<div  @click.capture="doThis">...</div>  <!-- 添加事件监听器时使用事件捕获模式 -->
<div  @click.self="doThat">...</div>     <!-- 只在 event.target 是当前元素自身时触发处理函数 -->

<a v-on:click.once="doThis"></a>              <!-- 点击事件将只会触发一次 -->
<div v-on:scroll.passive="onScroll">...</div> <!-- 先执行浏览器默认行为，可有效提升移动端的性能 -->

<!-- 事件处理 / 按键修饰符 -->
<input v-on:keyup.13="submit">  <!-- 只有在 `keyCode` 是 13 时调用 -->
<!--
Vue 为最常用的按键提供了别名：
  `enter` `tab` `delete`(含退格和删除) `esc` `space` `up` `down` `left` `right`
自定义按键别名：`Vue.config.keyCodes.f1 = 112`
2.5.0 新增用法，直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 kebab-case 来作为修饰符：
-->
<input @keyup.page-down="onPageDown">

<!-- 事件处理 / 系统修饰键 -->
<!--
  按键修饰符 .ctrl .alt .shift .meta
  .exact(2.5.0)
  鼠标按钮修饰符 .left .right .middle
-->
<input @keyup.alt.67="clear">                      <!-- Alt + C -->
<div @click.ctrl="doSomething">Do something</div>  <!-- Ctrl + Click -->
<button @click.ctrl.exact="onCtrlClick">A</button> <!-- 有且只有 Ctrl 被按下的时候才触发 -->

<!-- 自定义事件 (父子组件双向绑定，语法糖) -->
<text-document :title.sync="doc.title"></text-document>  <!-- 绑定值 -->
<text-document v-bind.sync="doc"></text-document>        <!-- 绑定对象(多个值) -->

<!-- 表单输入绑定 -->
<input v-model.lazy="msg" >                 <!-- 在 change 时而非 input 时更新 -->
<input v-model.number="age" type="number">  <!-- 自动将用户输入值转为数值类型 -->
<input v-model.trim="msg">                  <!-- 自动过滤输入的首尾空白字符 -->
```


## 选项

### 数据

### DOM

### 生命周期钩子

```js
export default {
  beforeCreate () { },// 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  created () { },     // 在实例创建完成后被立即调用。挂载阶段还没开始，`$el` 属性目前不可见
  beforeMount () { }, // 在挂载开始之前被调用，相关的 render 函数首次被调用
  mounted () { },     // `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。
                      // 注意此时并不确保子组件也一起被挂载。如果希望等到整个视图都渲染完毕，可以用 `$nextTick`
  beforeUpdate () { },// 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有 DOM
  Update () { },      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
                      // 注意此时并不确保子组件也一起被重绘。如果希望等到整个视图都重绘完毕，可以用 `$nextTick`
  // <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
  activated () { },    // keep-alive 组件激活时调用
  deactivated () { },  // keep-alive 组件停用时调用
  beforeDestroy () { },// 实例销毁之前调用。在这一步，实例仍然完全可用
  destroyed () { }     // Vue 实例销毁后调用
}
```

### 资源

### 组合

### 其他


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

声明式路由

```html
<router-link to="home">Home</router-link>    <!-- `router.push('/home')` -->
<router-link :to="'home'">Home</router-link>
<router-link :to="{path: 'home'}">Home</router-link>
<router-link :to="{name: 'user', params: {userId: 123}}" tag="li">User</router-link>
<router-link :to="{path: 'register', query: {plan: 'private'}}">Register</router-link>

<!--
  replace  调用 `router.replace()` 而非 `router.push()`
  append   基于当前路径(基路径)跳转
  tag      默认会渲染成 a 标签，可通过此属性更换 `<router-link to="/foo" tag="li">foo</router-link>`
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

编程式路由

```js
router.push(location, onComplete?, onAbort?)
router.replace(location, onComplete?, onAbort?)
router.go(n)
router.back()
router.forward()
```


## axios





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
