# Nuxt.js

https://nuxtjs.org/guide

## 安装



## 项目目录结构

```txt
assets  资源目录，用于组织未编译的静态资源如 SASS JS
components  组件目录，用于组织应用的 Vue 组件，Nuxt.js 不会扩展增强该目录下组件
layouts  布局目录，Nuxt.js保留目录，用于组织应用的布局组件
middleware  中间件目录，用于存放应用的中间件
pages  页面目录，Nuxt.js保留目录，用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。
plugins  插件目录，用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
static  静态文件目录，Nuxt.js保留目录，服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下
store  Store目录，Nuxt.js保留目录，用于组织应用的 Vuex 状态树 文件
nuxt.config.js 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。
package.json 文件用于描述应用的依赖关系和对外暴露的脚本接口
```

别名: `~` `@` 指向 src 目录; `~~` `@@` 指向根目录。


## 配置


