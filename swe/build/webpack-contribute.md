# Webpack Contribute


## Writing a Loader

```js
module.exports = {
  module: {
    rules: [
      test: /\.myext$/,
      use: [
        {
          loader: path.resolve('path/to/loader.js'),
          options: {}
        }
      ]
    ]
  }
}
```

```ts
// 最简单的 loader 就是接收一个原始内容的字符串表示，然后返回转换后的字符串
export default function(source: string): string {
  return doAnyTransform(source);
}
```


## Writing a Plugin

Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the webpack low-level internals to hook into them.

```js
class MyExampleWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('the `compilation` object represents a single build of assets:', compilation);

        // Manipulate the build using the plugin API provided by webpack
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
```

[webpack.DefinePlugin 源码](https://github.com/webpack/webpack/blob/master/lib/DefinePlugin.js?source=cc)


## 

Build Your Own Webpack  [视频](https://www.youtube.com/watch?v=Gc9-7PBqOC8) [源码](https://github.com/ronami/minipack)

```js
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const {transformFromAst} = require('babel-core')

let id = 0

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {sourceType: 'module'})
  const dependencies = []

  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })

  const {code} = transformFromAst(ast, null, {presets: ['env']})

  // Return all information about this module.
  return {id: id++, filename, dependencies, code}
}

function createGraph(entry) {
  const mainAsset = createAsset(entry)
  const queue = [mainAsset]

  // 在遍历过程中动态新增的任务都会被遍历到
  for (const asset of queue) {
    // 这个 mapping 如 `{'./message.js': 1}` 记录了本模块的依赖文件所对应的源码位置
    asset.mapping = {}
    const dirname = path.dirname(asset.filename)
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      const child = createAsset(absolutePath)
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }

  // At this point the queue is just an array with every module in the target
  // application: This is how we represent our graph.
  return queue
}

function bundle(graph) {
  let modules = ''

  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`
  })

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = {exports : {}};
        fn(localRequire, module, module.exports);
        return module.exports;
      }

      require(0);
    })({${modules}})
  `

  return result
}

const graph = createGraph('./example/entry.js')
const result = bundle(graph)

console.log(graph)
console.log(result)
```


