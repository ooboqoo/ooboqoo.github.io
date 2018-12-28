# Nuxt.js

https://nuxtjs.org/guide

## 安装


### 最小示例项目

```bash
$ mkdir nuxtjs-demo
$ cd nuxtjs-demo
$ vim package.json
$ npm i nuxt
$ vim pages/index.vue
$ npm run dev
```

_package.json_

```json
{
  "name": "nuxtjs-demo",
  "scripts": {
    "dev": "nuxt"
  }
}
```

_pages/index.vue_

```html
<template>
  <h1>Hello world!</h1>
</template>
```


## 项目目录结构

```txt
|- assets      资源目录，用于组织未编译的静态资源如 SASS JS
|- components  组件目录，用于组织应用的 Vue 组件，Nuxt.js 不会扩展增强该目录下组件
|- layouts     布局目录(保留目录)，用于组织应用的布局组件
|- middleware  中间件目录，用于存放应用的中间件
|- pages       页面目录(保留目录)，用于组织应用的路由及视图。
|- plugins     插件目录，用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
|- static      静态文件目录(保留目录)，服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下
|- store       Store目录(保留目录)，用于组织应用的 Vuex 状态树 文件
|- nuxt.config.js 文件用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置。
\- package.json   文件用于描述应用的依赖关系和对外暴露的脚本接口
```

别名: `~` `@` 指向 src 目录; `~~` `@@` 指向根目录。


## 配置



## Vuex 集成

各种用法的试验记录

```txt
store
  |- index.js  // 这个文件是必须的, 里面至少得有 `export const state = () => ({ /* ... */ })`
  |- todos
  |  |- index.js  // 这个文件无效
  |  |- state.js
  |  |- mutations.js
  |  \- actions.js
  |- simpleModule.js  // 文件形式存在的模块名不会自动转换大小写，所以不要用 simple-module.js 这种形式
  |- anotherModule    // 文件夹形式存在的模块名不会自动转换大小写
  |- mutations.js  // 如果存在此文件, 同级 js 文件不再被识别为模块
```

_pages/store.vue_

```html
<template>
  <div>
    <h1>Play Vuex</h1>
    <div>
      <h4>root state</h4>
      state.counter {{ $store.state.counter }}
      <button @click="$store.commit('increment')"> +1 </button>
    </div>
    <div>
      <h4>modules/todos</h4>
      state.todos {{ $store.state.todos }}
    </div>
    <div>
      <h4>modules/simpleModule</h4>
      state.counter {{ $store.state.simpleModule.counter }}
      <button @click="$store.commit('simpleModule/increment')"> +1 </button>
    </div>
    <div>
      <h4>modules/anotherModule</h4>
      state.counter {{ $store.state.anotherModule.counter }}
      <button @click="$store.commit('anotherModule/increment')"> +1 </button>
    </div>
  </div>
</template>
```
