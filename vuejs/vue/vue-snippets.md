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

