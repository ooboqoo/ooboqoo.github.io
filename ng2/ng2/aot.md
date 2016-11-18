# 预编译 AoT

这个烹饪指南描述如何通过在构建过程中进行预编译（ Ahead of Time - AoT ）来从根本上提升性能。

## 即时编译 JiT

Angular 应用主要包含组件和它们的 HTML 模板。在浏览器可以渲染应用之前，组件和模板必须要被 Angular 编译器转换为可以执行的 JavaScript。

你可以在浏览器中使用即时编译器 （ Just-in-Time - JiT ）在运行期间，也就是在应用加载时编译该应用。这是本文档中展示过的标准开发方式，它很不错，但是有自己的缺点。

JiT 编译导致运行期间的性能损耗。由于需要在浏览器中的这个编译过程，视图需要花更长时间才能渲染出来。由于应用包含了 Angular 编译器以及大量实际上并不需要的库代码，所以文件体积更大，相应地传输及加载也更慢。

编译可以揭露一些组件模板绑定错误。JiT 编译在运行时才揭露它们，有点太晚了。

预编译（ AoT ）通过在构建时编译，在早期截获模板错误，提高应用性能。

## 预编译 vs 即时编译

事实上只有一个 Angular 编译器，AoT 和 JiT 之间的差别仅仅在于编译的时机和所用的工具。使用 AoT，编译器仅仅使用一组库在构建期间运行一次；使用 JiT，编译器在每个用户的每次运行期间都要用不同的库运行一次。

为什么需要 AoT 编译？

#### 渲染得更快

使用 AoT，浏览器下载预编译版本的应用程序。浏览器直接加载运行代码，就可以立即渲染该应用，而不用等应用完成首次编译。

#### 需要的异步请求更少

编译器把外部 html 模板和 css 样式表内联到了该应用的 JavaScript 中。消除了用来下载那些源文件的 Ajax 请求。

#### 需要下载的 Angular 框架体积更小

如果应用已经编译过了，自然不需要再下载 Angular 编译器了。该编译器差不多占了 Angular 自身体积的一半儿，所以，省略它可以显著减小应用的体积。

#### 提早检测模板错误

AoT 编译器在构建过程中检测和报告模板绑定错误，避免用户遇到这些错误。

#### 更安全

AoT 编译远在 HTML 模版和组件被服务到客户端之前，将它们编译到 JavaScript 文件。没有模版可以阅读，没有高风险客户端 HTML 或 JavaScript 可利用，所以注入攻击的机会较少。

## 用 AoT 进行编译

### 为离线编译做准备

本烹饪书以 “快速起步” 作为起始点。只要单独对 app.component 文件的类文件和 html 文件做少量修改就可以了。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'  // 这里必须用相对地址，而且上面也不能加 moduleId: module.id
})
export class AppComponent {  }
```

用下列命令安装少量新的 npm 依赖：

```bash
$ npm install @angular/compiler-cli @angular/platform-server --save
```

你要用 @angular/compiler-cli 包中提供的 ngc 编译器来代替 TypeScript 编译器（ tsc ）。ngc 是一个 tsc 的高仿替代品，它们的配置方式几乎完全一样。

ngc 需要自己的带有 AoT 专用设置的 tsconfig.json。可以在原配置文件基础上新建一份 tsconfig-aot.json

```ts
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",          // 设置为 es2015 才能在后面进行 摇树优化
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  "files": [
    "app/app.module.ts",
    "app/main.ts"
  ],

  // ngc 新增内容
  "angularCompilerOptions": {
   "genDir": "aot",           // 告诉编译器把编译结果保存在新的 aot 目录下
   "skipMetadataEmit" : true  // 阻止编译器为编译后的应用生成元数据文件。编译输出的 ts 文件不需要保留元数据
 }
}
```

### 编译该应用

在命令行中执行下列命令，借助刚安装好的 ngc 编译器来启动 AoT 编译：

```bash
$ node_modules/.bin/ngc -p tsconfig-aot.json
```

ngc 希望 -p 选项指向一个 tsconfig.json 文件，或者一个包含 tsconfig.json 文件的目录。

在 ngc 完成时，会在 aot 目录下看到一组 NgFactory 文件（该目录是在 tsconfig-aot.json 的 genDir 属性中指定的）。

这些工厂文件对于编译后的应用是必要的。每个组件工厂都可以在运行时创建一个组件的实例，其中带有一个原始的类文件和一个用 JavaScript 表示的组件模板。注意，原始的组件类依然是由所生成的这个工厂进行内部引用的。

如果你好奇，可以打开 aot/app.component.ngfactory.ts 来看看原始 Angular 模板语法被编译成 TypeScript 时的中间结果。

JiT 编译器在内存中同样会生成这一堆 NgFactory，但它们大部分是不可见的。AoT 编译器则会生成在单独的物理文件中。

> 不要编辑这些 NgFactory！重新编译时会替换这些文件，你做的所有修改都会丢失。

## 引导

AoT 也改变了应用的引导方式。

```ts
// app/main.ts (JiT) 原有引导方式
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);

// app/main.ts (AoT) 更改后的引导方式
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';  // 这是运行 ngc 生成的文件
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

确保用 ngc 进行重新编译！

## 摇树优化 Tree Shaking

AoT 编译为接下来通过一个叫做 摇树优化 的过程做好了准备。摇树优化器从上到下遍历依赖图谱，并且 摇掉 用不到的代码，这些代码就像是圣诞树中那些死掉的松针一样。

通过移除源码和库代码中用不到的部分，摇树优化可以大幅缩减应用的下载体积。事实上，在小型应用中大部分的缩减都是因为筛掉了那些没用到的 Angular 特性。

摇树优化和 AoT 编译是单独的步骤。摇树优化不仅针对 JavaScript 代码。AoT 编译会把应用中的大部分都转换成 JavaScript ，这种转换会让应用更容易被“摇树优化”。

### Rollup

这个烹饪宝典中用来示范的摇树优化工具是 Rollup。

Rollup 会通过跟踪 import 和 export 语句来对本应用进行静态分析。它所生成的最终代码 bundle 中会排除那些被导出过但又从未被导入的代码。

Rollup 只能对 ES2015 模块摇树，因为那里有 import 和 export 语句。

通过下列命令安装 Rollup 依赖：

```bash
$ npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-uglify --save-dev
```

接下来，在项目根目录新建一个配置文件（ rollup-config.js ），来告诉 Rollup 如何处理应用。

```js
// rollup-config.js
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'app/main.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: 'node_modules/rxjs/**',
      }),
      uglify()
  ]
}
```

### Rollup 插件

这些可选插件过滤并转换 Rollup 的输入和输出。

Rollup 期望应用的源码使用 ES2015 模块。 但并不是所有外部依赖都发布成了 ES2015 模块。事实上，大多数都不是。它们大多数都发布成了 CommonJS 模块。

可观察对象库 RxJS 是 Angular 所依赖的基础之一，它就是发布成了 ES5 JavaScript 的 CommonJS 模块。幸运的是，有一个 Rollup 插件，它会修改 RxJS，以使用 Rollup 所需的 ESimport 和 export 语句。然后 Rollup 就可以把该应用中用到的那部分 RxJS 代码留在“捆”文件中了。

Rollup 做摇树优化时会大幅减小代码体积。最小化过程则会让它更小。本烹饪宝典依赖于 Rollup 插件 uglify 来最小化并混淆代码。

在生产环境中，我们还应该打开 Web 服务器的 gzip 特性来把代码压缩得更小。

### 运行 Rollup

通过下列命令执行 Rollup 过程：

```
$ node_modules/.bin/rollup -c rollup-config.js
```

## 加载捆文件

加载所生成的应用捆文件，并不需要使用像 SystemJS 这样的模块加载器。移除与 SystemJS 有关的那些脚本吧。

index.html (load bundle)
```html
<body>
  <my-app>Loading...</my-app>
</body>

<script src="dist/build.js"></script>
```

## 应用示例 -- 英雄指南

在本节中，你将在一个更多内容的应用 - 英雄指南 上使用从 AoT 编译和摇树优化学到的知识。

### 开发期使用 JiT, 产品期使用 AoT

目前，AoT 编译和摇树优化对开发来说，占用的时间太多了。这将在未来得到改变。当前的最佳实践是在开发期使用 JiT 编译，然后在发布产品前切换到 AoT 编译。

幸运的是，**如果** 你处理了几个关键不同点，源代码可以在没有任何变化时，采取两种方式的任何一种都能编译。

#### Index.html

JiT 和 AoT 应用的设置和加载非常不一样，以至于它们需要自己单独的 index.html 文件。下面是它们的比较：

```html
略...
```

它们不能在同一个目录。将 AoT 版本放置到 /aot 目录。

JiT 版本依靠 SystemJS 来加载单个模块，并需要 reflect-metadata 垫片。所以它们出现在它的 index.html 中。

AoT 版本用一个单独的脚本来加载整个应用 - aot/dist/build.js。它不需要 SystemJS 和 reflect-metadata 垫片。

#### 相对组件的模板路径

AoT 编译器要求 @Component 外部模板和 CSS 文件的路径是相对组件的。意思是，@Component.templateUrl 的值是一个相对组件类文件 foo.component.html 的路径，不管 foo.component.ts 在项目的哪个目录。

JiT 应用的 URLs 更加灵活，但是为了与 AoT 编译兼容，坚持使用 **相对组件** 路径。

JiT 编译的应用，使用 SystemJS 加载器，相对组件路径必须要设置 @Component.moduleId 属性为 module.id。module 对象在 AoT 编译的应用运行时的值为 undefined。应用将会失败，除非你像这样，在 index.html 中指定一个全局 module 值：

```html
<script>window.module = 'aot';</script> <!-- 设置一个全局 module 是暂时的权宜之计。-->
```
