# Vuex

https://vuex.vuejs.org/zh-cn/

组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，我们最终达成了 Flux 架构。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具。


因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！


## 核心概念

### State

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。

单状态树和模块化并不冲突，后面我们会讨论如何将状态和状态变更事件分布到各个子模块中。

从 `store` 实例中读取状态最简单的方法就是在计算属性中返回某个状态。

我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键。

mapState 函数返回的是一个对象，借助对象展开运算符，可以方便地将改对象合并入 `computed` 对象。

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。

```js
import { mapState } from 'vuex'

export default {
  computed: {
    // 从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
    count () {
      return this.$store.state.count
    },
    // mapState - 标准写法，传递一个配置对象，配合对象展开运算符可简化写法
    ...mapState({
      count: state => state.count,
    }),
    // mapState - 当映射的计算属性的名称与 state 的子节点名称相同时，也可以传一个字符串数组
    ...mapState([
      'count',
    ]),
  }
}
```

### Getter

如果有多个组件需要用到一个属性，但该属性并不直接存在 state 中，需要进行一些计算才能获得，此时 Vuex 中也提供了类似 `computed` 的 `getters` 属性应用处理这类情况。

```js
const store = new Vuex.Store({
  state: {
    todos: { id: 1, done: true }, { id: 2, done: false }, ]
  },
  getters: {
    doneTodos: state => state.todos.filter(todo => todo.done),
    doneTodosCount: (state, getters) => getters.doneTodos.length,  // 可接受第二个参数 getters
    getTodoById: state => id => state.todos.find(todo => todo.id === id),  // 除了返回值，还可以返回函数
  }
})
```

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

跟 `mapState` 类似，Getter 提供了一个 `mapGetters` 辅助函数来简化使用。

```js
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['doneTodosCount', 'anotherGetter', ]),
  }
}
```

### Mutation

更改 Vuex 的 `store` 中的状态的唯一方法是提交 `mutation`。Vuex 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。

你可以向 `store.commit` 传入额外的参数，即 `mutation` 的 **载荷 (payload)**。使用 `mapMutations` 辅助函数可简化写法。

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment (state, payload) => state.count += payload.amount,
  }
})
```

```js
methods: {
  someMethod () {
    this.$store.commit('increment', {amount: 10})
    // 还可以使用对象风格的提交方式，这种用法，整个对象都会作为载荷传给 mutation 函数
    this.$store.commit({type: 'increment', amount: 10})
    },
    ...mapMutations([
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
}

```

#### Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

* 最好提前在你的 store 中初始化好所有所需属性。
* 当需要在对象上添加新属性时，你应该
  * 使用 `Vue.set(obj, 'newProp', 123)`, 或者
  * 以新对象替换老对象。`state.obj = { ...state.obj, newProp: 123 }`

#### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。在需要多人协作的大型项目中，这会很有帮助。

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'
const store = new Vuex.Store({
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

### Action

在 Mutation 中混合异步调用会导致你的程序很难调试，所以 Mutation 必须是同步函数。Action 则用来处理异步操作。

Action 类似于 Mutation，不同在于：
  * Action 提交的是 Mutation，而不是直接变更状态。
  * Action 可以包含任意异步操作。

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment (state) => state.count++,
  },
  actions: {
    increment1 (context) => context.commit('increment'),
    increment2 ({ commit }) => commit('increment'),  // 实践中，经常用到 参数解构 来简化代码
  }
})
```

Action 通过 `store.dispatch` 方法触发：

```js
import { mapActions } from 'vuex'
export default {
  methods: {
    someMethod () {
      this.$store.dispatch('incrementAsync', {amount: 10})
      // 以对象形式分发
      this.$store.dispatch({type: 'incrementAsync', amount: 10})
    },
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
  }
}
```

来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

#### 组合 Action


### Module

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```


## 项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
  * 应用层级的状态应该集中到单个 store 对象中。
  * 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
  * 异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```txt
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```


## 严格模式

开启严格模式，仅需在创建 `store` 的时候传入 `strict: true`：

```js
const store = new Vuex.Store({
  // ...
  strict: true
});
```

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

特别注意：不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更，显然这将带来性能损失。

类似于插件，我们可以让构建工具来处理这种情况：

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```


## 表单处理

当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 `v-model` 会比较棘手：用“Vuex 的思维”去解决这个问题的方法是：给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 action:

```html
<input :value="message" @input="updateMessage">
```
```js
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

