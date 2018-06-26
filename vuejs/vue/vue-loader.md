# Vue Loader


## webpack 配置

### webpack.config.js

```js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {test: /\.vue$/, loader: 'vue-loader'},
      // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
      {test: /\.js$/, loader: 'babel-loader'},
      // 它会应用到普通的 `.css` 文件以及 `.vue` 文件中的 `<style>` 块
      {test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ]
}
```

### 处理资源路径

Webpack 中资源 URL 转换会遵循如下规则：

* 绝对路径会原样保留，如 /images/foo.png。
* 路径以 `.` 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。
* 路径以 `~` 开头，会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源。
* 路径以 `@` 开头，也会被看作模块依赖。如果给 `@` 配置了 alias，这就很有用了。vue-cli 项目中 `@` 指向 `/src`。

```html
<img src="~some-npm-package/foo.png">
```

#### file-loader 与 url-loader

file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。


## 使用预处理器

Vue Loader 允许你使用其它 webpack loader 处理 Vue 组件的某一部分。它会根据 `lang` 特性以及你 webpack 配置中的规则自动推断出要使用的 loader。

### Sass

sass-loader 支持一个 `data` 选项，这个选项允许你在所有被处理的文件之间共享常见的变量，而不需要显式地导入它们：

```js
{
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        data: `$color: red;`
      }
    }
  ]
}
```


## Scoped CSS

### 混用本地和全局样式

你可以在一个组件中同时使用有 scoped 和非 scoped 样式：

```html
<style>
  /* 全局样式 */
</style>

<style scoped>
  /* 本地样式 */
</style>
```

### 子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个**子组件的根节点会同时**受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 深度作用选择器

使用 `>>>` 来穿透，当使用 Sass 之类预处理器无法正常解析 `>>>` 时也可以用器别名 `/deep/`

```html
<style scoped>
  .a >>> .b { /* */ }
</style>
```

### 动态生成的内容

通过 `v-html` 创建的 DOM 内容不受 scoped 样式影响，但是你仍然可以通过深度作用选择器为他们设置样式。


## CSS Modules

CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。vue-loader 提供了与 CSS Modules 的一流集成，可以作为模拟 scoped CSS 的**替代**方案。

```html
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red { color: red; }
.bold { font-weight: bold; }
</style>
```


## 热重载



## 自定义块


## 单文件组件规范

### 简介

`.vue` 文件是一个自定义的文件类型，用类 HTML 语法描述一个 Vue 组件。每个 `.vue` 文件包含三种类型的顶级语言块 `<template>` `<script>` 和 `<style>`，还允许添加可选的自定义块。

vue-loader 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。

vue-loader 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 `lang` 属性。

### 语言块

#### 模板

每个 `.vue` 文件最多包含一个 `<template>` 块。

内容将被提取并传递给 vue-template-compiler 为字符串，预处理为 JavaScript 渲染函数，并最终注入到从 `<script>` 导出的组件中。

#### 脚本

每个 `.vue` 文件最多包含一个 `<script>` 块。

这个脚本会作为一个 ES Module 来执行。

任何匹配 `.js` 文件 (或通过它的 `lang` 特性指定的扩展名) 的 webpack 规则都将会运用到这个 `<script>` 块的内容中。

#### 样式

一个 `.vue` 文件可以包含多个 `<style>` 标签。

`<style>` 标签可以有 `scoped`(scoped CSS) 或者 `module`(CSS Modules) 属性 以帮助你将样式封装到当前组件。具有不同封装模式的多个 `<style>` 标签可以在同一个组件中混合使用。

任何匹配 `.css` 文件或通过 `lang` 特性指定的扩展名的 webpack 规则都将会运用到这个 `<style>` 块的内容中。

#### 通过 src 导入

如果喜欢把 `.vue` 文件分隔到多个文件中，你可以通过 `src` 属性导入外部文件：

```html
<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.css"></style>
<style src="todomvc-app-css/index.css"></style>
```

需要注意的是 `src` 导入遵循和 webpack 模块请求相同的路径解析规则，这意味着：
  * 相对路径需要以 `./` 开始
  * 你可以从 NPM 依赖中导入资源

### 注释

在语言块中使用该语言块对应的注释语法，顶层注释使用 HTML 注释语法。
