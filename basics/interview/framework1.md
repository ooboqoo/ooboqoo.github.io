# 面试题库 - 框架使用


> React: https://github.com/sudheerj/reactjs-interview-questions


https://muyiy.cn/question/frame/1.html


## Vue

#### 数组更新检测

Vue 对数组的 mutaiton method 进行了 hack，所以它们会触发视图更新。

#### React / Vue 列表组件中 `key` 属性的作用

使用 `key`，框架会基于 `key` 的变化重新排列元素的顺序，并且会移除 `key` 不存在的元素。

PS. 对树的 diff 性能的影响等后面再细看。

#### Vue 列表使用事件代理

事件代理的作用主要有2个
* 将事件处理程序代理到父节点，减少内存占用
* 动态生成子节点时能自动绑定事件处理程序到父节点

Vue 不像 React 会做自动事件代理，但 eslint 会要求给 v-for 绑定事件时所有结点都指向同一个事件处理程序。

#### 子组件为何不可以修改父组件传递的 prop，

不能修改是为了保证数据的单向流动，这样可以防止子组件意外改变父级组件的状态，从而导致应用的数据流向难以理解。

在组件 initProps 方法的时候，会对 props 进行 defineReactive 操作，传入的第四个参数是自定义的set函数，该函数会在修改进行判断，如果不是root根组件，并且不是更新子组件，那么说明更新的是props，所以会警告。

```js
// src/core/instance/state.js
function initProps(vm: Component, propsOptions: Object) {
  // ...
}
```

#### Vue 的父组件和子组件的生命周期钩子执行顺序

* 加载渲染过程 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
* 子组件更新过程 父beforeUpdate->子beforeUpdate->子updated->父updated
* 父组件更新过程 父beforeUpdate->父updated
* 销毁过程 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


### Vue Router

#### `$route.query` 与 `$route.params` 的区别和联系

在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。而 `$route.query` 则对应的 URL 中的查询参数。

```
router.push({path: '/user/:id', params: {id: 123}, query: {any: 'all'}});
```


### Vuex

#### 聊聊 Redux 和 Vuex 的设计思想

https://zhuanlan.zhihu.com/p/53599723

每一个 Vuex 里面有一个全局的 Store 包含着应用中的状态 State。一个应用仅包含一个 Store 实例。*State 只放需要在组件中共享的数据*，不要所有状态都往里塞。

Vuex 通过 store 选项注入到整个应用中，这样子组件就能通过 `this.$store.state` 访问到 state 了。

State 改变，View 就会跟着改变，这个改变利用的是 Vue 的响应式机制。

Mutation 只能处理同步事务。

对比 Redux 的中间件，Vuex 加入了 Action 这个东西来处理异步。

Vuex 对 Action 的细节不做规定，只要求拆分同步和异步操作。Vuex 单一状态树并不影响模块化，Vuex 引入了 Module 的概念，每个 Module 有自己的 state、mutation、action、getter。

#### 为什么要区分 Actions 和 Mutations

https://www.zhihu.com/question/48759748/answer/112823337

区分 Actions 和 Mutations 并不是为了解决异步竞态问题，而是为了能用 devtools 追踪状态变化。

事实上在 Vuex 里 Actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛干嘛，只要最后触发 Mutation 就行。处理异步竞态是用户自己的事情。Vuex 真正限制你的只有 “Mutation 必须是同步的” 这一点。

同步的意义在于这样每一个 Mutation 执行完成后都可以对应到一个新的状态，这样 devtools 就可以打一个 snapshot 存下来，然后就可以使用时光旅行了。

#### Vuex 与 双向绑定 的问题

https://vuex.vuejs.org/zh/guide/forms.html

### 优化

#### Vue 渲染大量数据时怎么优化

* 虚拟列表(以前没这个，现在有这个了就不是问题了)
* 分割任务，实现时间切片处理，类似 React Fiber，每次执行记录时间，超过一定执行时间则 setTimeout，一般一个时间片为 16ms
* `Object.freeze()` 冻结对象，不让 Vue 劫持，但缺点是不能响应了

#### 如何优化首页加载速度

首页白屏的原因：单页面应用的 html 是靠 JS 生成的，因为首屏需要加载很大的 JS 文件 (app.js vendor.js)，当网速差的时候会产生一定程度的白屏。

* 利用 webpack 的 code-split 和 vue-router 做懒加载
* 将单页应用拆分为多页应用，需要修改 webpack 的 entry
* 合理使用 resource hint，即，preload、prefetch、dns-connect 等
* 使用首屏 SSR + 跳转 SPA 方式来优化
* 首屏加 loading 或骨架屏(仅仅是优化体验)
* CDN 雪碧图 gzip 浏览器缓存 等






## React

#### When is `setState()` asynchronous?

https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous

考点：这么大坑你有没有踩过？出的还是相当实用的，有项目经验的应该都懂。

Currently `setState` is asynchronous inside event handlers. This ensures, for example, that if both `Parent` and `Child` call `setState` during a click event, `Child` isn't re-rendered twice. Instead, React flushes the state updates at the end of the browser event. This results in significant performance improvements in larger apps. This is an implementation detail so avoid relying on it directly. In the future versions. React will batch updates by default in more cases.

在 React 的 `setState` 函数实现中，会根据一个变量 `isBatchingUpdates` 判断是直接更新还是放到队列中批量更新。

实际编码时可以认为所有的 `setState` 都会合并到一起批量更新，这样最稳妥。

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。

输出： 0 0 2 3




### react-router

#### `<Link>` 标签和 `<a>` 标签有什么区别



### Redux

redux三大原则

* 单一数据流 整个应用state都被储存在一个store里面 构成一个Object tree
* State是只读的 唯一改变state的方法就是触发action, action是一个用于描述已发生事件的普通对象
* 使用纯函数来执行修改 为了描述action如何改变state tree， 你需要编写reducers

#### reducer 为什么必须是纯函数

reducer 接收旧的 state 和 action，返回新的 state。reducer 的职责不允许有副作用，副作用简单来说就是不确定性，如果 reducer 有副作用，那么返回的 state 就是不确定的，数据更改的状态也就不可回溯了。把 reducer 设计成纯函数，可以实现时间旅行，记录/回放或者热加载。



## 框架原理

#### 响应式原理中 `Object.defineProperty` 有什么缺陷

* `Object.defineProperty` 无法监控到数组下标的变化
* `Object.defineProperty` 只能劫持对象属性，从而需要对对象中的每个属性进行遍历，如果属性值是对象，还需要深度遍历
* `Proxy` 可以劫持整个对象，并返回一个新对象
* `Proxy` 不仅可以代理对象，还可以代理数组
* `Proxy` 还可以动态增加属性

#### 手动实现 Vue 的双向数据绑定

Vue 通过 `defineProperty` 实现数据劫持，getter 收集依赖，setter 派发更新。v-model 实际由 v-bind 和 v-on 两部分组成。

```js
<input id="input"/>

let input = document.getElementById("input");
const data = { value: "" };
Object.defineProperty(data, "value", {
  set: function(val) {
    input.value = val;
  },
  get: function() {
    return input.value;
  }
});
input.onchange = function(e) {
  data.value = e.target.value;
};
```

#### Virtual DOM 真的比操作原生 DOM 快吗

https://www.zhihu.com/question/31809713/answer/53544875

React 的基本思维模式是，每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，最简单的做法是直接重置 `innerHTML`。很多人都没意识到，在一个大型列表所有数据都变了的情况下，重置 `innerHTML` 其实是一个比较高效的操作。真正的问题是，在 “全部重新渲染”的思维模式下，即使只有一行数据变了，它也需要重制整个 `innerHTML`，这时显然就有大量的浪费。

Virtual DOM render + diff 显然比渲染 html 字符串要慢，但它依然是纯 js 层的计算，比起后面的 DOM 操作依然便宜太多了。Virtual DOM 保证了不管你的数据变化多少，每次重绘的性能都可以接受，但你依然可以用类似 in呢让HTML 的思路去写你的应用。

#### diff 时间复杂度从 O(n^3) 优化到 O(n)，时间复杂度又是如何来的

React 只做了同层比较，同级的节点类型不同就认为不同，重新渲染。

React 和 Vue 做的假设是
* 检测 VDOM 的变化只发生在同一层
* 检测 VDOM 的变化依赖于用户指定的 key





