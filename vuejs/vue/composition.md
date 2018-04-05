# 可复用性&amp;组合

## 混入




## 自定义指令

在 Vue2.0 中，代码复用和抽象的主要形式是组件。但有时你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  inserted: function (el) { el.focus(); }
})
```

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```js
directives: {
  focus: {
    inserted: function (el) { el.focus(); }
  }
}
```

然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：

```html
<input v-focus>
```


## 渲染函数 &amp; JSX


## 插件

### 开发插件

### 使用插件

> [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了来自社区贡献的数以千计的插件和库。


## 过滤器

可以在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value, arg1, arg2) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

你也可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

使用过滤器

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

<!-- 过滤器串连 -->
{{ message | filterA | filterB }}

<!-- 过滤器是 JavaScript 函数，因此可以接收参数 -->
{{ message | filterA('arg1', arg2) }}
```

