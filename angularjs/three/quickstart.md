# 快速起步

http://www.jb51.net/article/92350.htm

### TypeScript 项目中使用插件

Three.js 提供有 @types/three 来对 ts 项目进行支持，但实际使用时，可能还少不了一些其他附件代码。

Three.js 项目下 samples 目录提供了大量 js 文档，即是示例，其实同时也在很大程度上充当了 **插件** 的角色。
这么多的 js 文件，却没有 .d.ts 文件来提供类型定义支持，但这还不是最糟糕的，这些插件都需要依赖全局的 `THREE` 属性，这会把问题搞得很复杂：

1. Three.js 采用的是 umd 模块规范，也就是说，在模块化项目中引入 three.js 并不会向 `window` 添加 `THREE` 属性
2. samples 下的 js 文件依赖全局的 `THREE` 属性

如果直接使用 js 格式的插件，那么，在 `index.html` 文件中单独引入 three.js 是必须的，另外还需要再建个 .d.ts 文档大概添加下相关插件定义以避免 ts 报错。如果觉得这么做不妥，那么更规范的方法是，把要用的 js 文件转换成 ts 文件，但转换一个插件差不多需要小半天时间。