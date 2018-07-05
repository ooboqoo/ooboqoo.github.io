# Vue Snippets

```html
<!-- 动态确定元素类型 -->
<component :is="href ? 'a' : 'span'" :href="href"></component>
```