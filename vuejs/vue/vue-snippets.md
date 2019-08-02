# Vue Snippets

```html
<!-- 动态确定元素类型 -->
<component :is="href ? 'a' : 'span'" :href="href"></component>
```

### 监听 props 变化

Vue 中并没有 `componentWillReceiveProps()` 之类的可以对传入属性的变化做出响应的钩子, 而是利用 watch 事项相应功能.

```js
watch: {
  value: {
    handler: function () { /* 处理逻辑 */ },
    immediate: true  // 初始化时也要执行一次
  }
}
```

### 模板中使用临时变量

这算是 hack 的用法，最好还是提取子组件

```html
<div v-for="tmp in [obj[`${row}-${col}`]]">
  <!-- 此处就可以使用 tmp 而非 obj[`${row}-${col}`] -->
</div>
```


