# Vuex

https://vuex.vuejs.org/zh-cn/

![](https://vuex.vuejs.org/zh-cn/images/vuex.png)


## 核心概念

### State

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。

单状态树和模块化并不冲突，后面我们会讨论如何将状态和状态变更事件分布到各个子模块中。

从 `store` 实例中读取状态最简单的方法就是在计算属性中返回某个状态。

我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键。

mapState 函数返回的是一个对象，借助对象展开运算符，可以方便地将该对象合并入 `computed` 对象。

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。

```js
import { mapState } from 'vuex'
export default {
  computed: {
    // 从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
    count () {
      return this.$store.state.count
    },
    // mapState - 标准写法，配合对象展开运算符可简化写法
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

如果有多个组件需要用到一个属性，但该属性并不直接存在 `state` 中，需要进行一些计算才能获得，此时 Vuex 中也提供了类似 `computed` 的 `getters` 属性。

```js
const store = new Vuex.Store({
  state: {
    todos: [{ id: 1, done: true }, { id: 2, done: false }, ]
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

更改 Vuex 的 `store` 中的状态的唯一方法是提交 Mutation。Vuex 中的 Mutation 非常类似于事件：每个 Mutation 都有一个字符串的 **事件类型 (type)** 和一个 **回调函数 (handler)**。

你可以向 `store.commit` 传入额外的参数，即 `mutation` 的 **载荷 (payload)**。使用 `mapMutations` 辅助函数可简化写法。

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment: (state, payload) => state.count += payload.amount,
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

既然 Vuex 的 `store` 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 Mutation 也需要与使用 Vue 一样遵守一些注意事项：
  * 最好提前在你的 `store` 中初始化好所有所需属性。
  * 当需要在对象上添加新属性时，你应该
    - 使用 `Vue.set(obj, 'newProp', 123)`, 或者
    - 以新对象替换老对象。`state.obj = {...state.obj, newProp: 123}`

#### 使用常量替代 Mutation 事件类型

使用常量替代 Mutation 事件类型在各种 Flux 实现中是很常见的模式。在需要多人协作的大型项目中，这会很有帮助。

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

在 Mutation 中混合异步调用会导致你的程序很难调试，所以 Mutation 必须是同步函数。因此引入了 Action 来处理异步操作。

Action 类似于 Mutation，不同在于：
  * Action 提交的是 Mutation，而不是直接变更状态。
  * Action 可以包含任意异步操作。

Action 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 Mutation，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment: state => state.count++,
  },
  actions: {
    increment1: context => context.commit('increment'),
    increment2 ({ commit }) => commit('increment'),  // 实践中，经常用到 参数解构 来简化代码
  },
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
      'increment',  // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
  }
}
```

来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 Mutation：

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

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

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

#### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`。

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。

```js
const moduleA = {
  state: {count: 0},
  getters: {
    doubleCount (state) {  // 这里的 state 对象是模块的局部状态
      return state.count * 2
    },
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  mutations: {
    increment: state => state.count++,
  },
  actions: {
    incrementIfOddOnRootSum ({state, commit, rootState}) {
      if ((state.count + rootState.count) % 2 === 1) commit('increment')
    },
  },
}
```

#### 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。

##### 在带命名空间的模块内访问全局内容

```js
modules: {
  foo: {
    namespaced: true,
    getters: {
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter     // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },
    actions: {
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter     // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'
        dispatch('someOtherAction')                       // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
        commit('someMutation')                       // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 handler 中。

```js
foo: {
  namespaced: true,
  actions: {
    someAction: {
      root: true,
      handler (namespacedContext, payload) { ... }  // -> 'someAction'
    }
  }
}
```

##### 带命名空间的绑定函数

```js
new Vue({
  methods: {
    ...mapActions('moduleA', ['fooInModuleA']),
    ...mapActions(['moduleA/barInModuleA']),
    testit () {
      this.fooInModuleA()
      this['moduleA/barInModuleA']()
    }
  }
})
```

#### 模块动态注册

在 store 创建之后，你可以使用 `store.registerModule` 方法注册模块：

```
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

#### 模块重用


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


## 插件

Vuex 的 `store` 接受 `plugins` 选项，这个选项暴露出每次 mutation 的钩子。
Vuex 插件就是一个函数，它接收 store 作为唯一参数：

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}

const store = new Vuex.Store({
  plugins: [myPlugin]
})
```

应用示例：

```js
export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}

const plugin = createWebSocketPlugin(socket)
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
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


## Flux &amp; Redux

https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207

Flux

![](https://cdn-images-1.medium.com/max/800/1*fWBaUg9-_1-V5M2YQBWhWg.png)

Redux

![](https://cdn-images-1.medium.com/max/800/1*Je2mow8mjYLngXreGGlIEg.png)
