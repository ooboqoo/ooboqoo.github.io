# 深入响应式原理

https://cn.vuejs.org/v2/guide/reactivity.html

## 如何追踪变化

视图和数据变化绑定原理

```html
<div>
  <p>你好，<span id='nickName'></span></p>
  <div id="introduce"></div>
</div>
```

```js
//视图控制器
var userInfo = {};
Object.defineProperty(userInfo, "nickName", {
  get: function () {
    return document.getElementById('nickName').innerHTML;
  },
  set: function (nick) {
    document.getElementById('nickName').innerHTML = nick;
  }
});
Object.defineProperty(userInfo, "introduce", {
  get: function () {
    return document.getElementById('introduce').innerHTML;
  },
  set: function (introduce) {
    document.getElementById('introduce').innerHTML = introduce;
  }
})

userInfo.nickName = "xxx";
userInfo.introduce = "我是xxx，我来自浙江，..."
```

Vue.js 的数据变动

上面例子只是数据和 DOM 节点的绑定，而 Vue.js 更为复杂一点，它在网页 dom 和 accessor 之间会有两层，一层是 Wacher，一层是 Directive，比如以下代码。

```js
var a = { b: 1 }
var vm = new Vue({ 
  data: {
    b: 1,
  }
})
```
把一个普通对象 `{b:1}` 传给 Vue 实例作为它的 `data` 选项，Vue.js 将遍历它的属性，用 `Object.defineProperty` 将它们转为 getter/setter, 如图绿色的部分所示。每次用户更改 `data` 里的数据的时候，比如 `a.b = 1`，setter就会重新通知 Watcher 进行变动，Watcher 再通知 Directive 对 DOM 节点进行更改。


每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。


## 检测变化的注意事项

受现代 JavaScript 的限制，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：

```js
var vm = new Vue({
  data: {
    a: 1      // `vm.a` 是响应的
  }
})
vm.b = 2     // `vm.b` 是非响应的
```

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到**嵌套**的对象上：

```js
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

有时你想向已有对象上添加一些属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```



