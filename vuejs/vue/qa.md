# 知识点细节

### `updated` 与 `watch`

The lifecycle hooks around update respond to **changes in the DOM**. Watchers respond to **changes in the data**.

```js
Vue.component('Child', {
  template: '<div class="child">{{ watchAndBind }}{{ bindOnly }}</div>',
  data: function () {
    return {
      watchAndBind: 1,  // updated
      watchOnly: 2,     // watch:watchOnly
      bindOnly: 3,      // watch:watchAndBind \n updated
    }
  },
  watch: {
    watchAndBind () { console.log('watch:watchAndBind') },
    watchOnly () { console.log('watch:watchOnly') },
  },
  updated () { console.log('updated') }
})
new Vue({el: '#app'})
```

### `computed` 与 `watch`

Computed properties have a a very specific purpose: composing new data derived from other data. They are used whenever you have some data and need to transform it, filter it, or otherwise manipulate it before using it in the template.

Computed properties always have to return a value, should not have any side effects, and they have to be synchronous.

So there are quite some situations where computed properties won't help you, for this, you would need a watcher.

### 生命周期

生命周期钩子  | 首次执行 | SSR | 主要用途
--------------|--------- |-----|-------------------
beforeCreate  | 是       | 是  | 改 `vm.$options`
created       | 是       | 是  | AJAX 请求
beforeMount   | 是       | 否  | 
mounted       | 是       | 否  | 改 DOM
beforeupdate  | 否       | 否  | 
updated       | 否       | 否  | 
activated     | ？       | 否  | 
deactivated   | ？       | 否  | 
beforeDestroy | 否       | 否  | 
destroyed     | 否       | 否  | 
errorCaptured | 否       | ？  | 

在 `<keep-alive>` 内 `activated` 会在 `created` 后触发一次，而 `destroyed` 一直不会被触发。

||
-------------|--------------------------------------
beforeCreate | 能访问 `this.$options` 不能访问 `this.$data` `this.$props` 和 computed methods 上的属性和方法
created      | 可用：数据观测，属性和方法的运算，watch/event 事件回调。`$el`=undefined `$ref`={}
beforeMount  | 在挂载开始之前被调用：相关的 render 函数首次被调用。
mounted      | `el` 已被新创建的 `vm.$el`(只读) 替换。
beforeupdate | 发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有 DOM，比如手动移除已添加的事件监听器。
updated      | 虚拟 DOM 重新渲染和打补丁之后调用，组件 DOM 已经更新，可执行依赖于 DOM 的操作

`created` 阶段与 `mounted` 阶段的 AJAX 请求的区别：前者页面视图未出现，如请求信息过多，页面会长时间白屏。

`mounted` 不承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick()`。

`updated` 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 `vm.$nextTick()`。

在大多数情况下，你应该避免在 `updated` 此期间更改状态，可能会陷入死循环。

vue2.0 之后手动调用 `$destroy()` 不会移除 DOM 节点，需要手动移除。

`mixins` 中的生命周期钩子优先于组件的生命周期钩子执行。

<details>
<summary>生命周期图示</summary>
![](https://cn.vuejs.org/images/lifecycle.png)
</details>
