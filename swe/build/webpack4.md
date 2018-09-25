# Webpack 4


## V4 新变化

https://webpack.js.org/migrate/4/

### 改进

* 可以零配置运行
* 打包速度比之前提高了 90%
* Tree shaking ES6
* RuntimeChunk / SplitChunks(CommonsChunkPlugin 被废弃) 很好用

### 变更

* CLI 抽离成单独的包 `webpack-cli`
* 添加了新的配置项 `mode`，可以通过更改设置值为 "production" "development" 来调整打包行为 (走向零配置的重要参数)
* 插件变化 (具体见下方详述)
* `import()` 加载 CommonJS 模块时，需要通过 `default` 属性读取 `module.exports` 内容
* 加载 JSON 不再需要配 `json-loader`，虽然最终还是用的 json-loader

```patch
  plugins: [
+    生产模式下不必再配置以下插件(默认已配)
-    new NoEmitOnErrorsPlugin(),
-    new ModuleConcatenationPlugin(),
-    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
-    new UglifyJsPlugin()

+    开发模式下不必再配置以下插件(默认已配)
-    new NamedModulesPlugin()
  ],
```

### 未来 Webpack 5

* CSS 成为原生模块
* HTML 成为原生模块
* URL/FILE 成为原生模块
* 再也不需要 extract-text-webpack-plugin
* 也不需要 css-loader file-loader url-loader 了
* 将直接支持 CSS Code Splitting
* 支持 HTML entry


## Optimization

https://webpack.js.org/configuration/optimization/

webpack4 新增了 `mode` 字段后，能根据此字段进行预置优化，当然，仍然可对优化项进行配置。

### minimize

https://webpack.js.org/plugins/uglifyjs-webpack-plugin/

```js
optimization: {
  minimize: false  // 生产模式下默认 true
}
```

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  optimization: {
    minimizer: [   // 自定义细节设置
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
}
```

### splitChunks

代码切分。生产模式会默认配置代码切分，遵循以下规则
  * 新的 chunk 是被共同依赖的，或是从 node_modules 中来的
  * 新的 chunk 大于 30kb
  * 在按需加载的时候，最大的并行下载 chunk 数量应该要小于等于 5
  * 在首屏加载的时候，最小的并行下载 chunk 数量要小于等于 3

```js
optimization: {
  splitChunks: {
    name: true,
    cacheGroups: {  // 划分打包内容
      lodash: {
        test: /lodash/,
        chunks: 'all'
      }
    }
  }
}
```

### runtimeChunk

独立提取 webpack 代码




