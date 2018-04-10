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
