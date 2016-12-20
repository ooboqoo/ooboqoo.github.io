# 预编译 AoT

通过在构建过程中进行预编译 (Ahead of Time - AoT) 可以从根本上提升性能。

## 即时编译 JiT

Angular 应用主要包含组件和它们的 HTML 模板。在浏览器可以渲染应用之前，组件和模板必须要被 Angular 编译器转换为可以执行的 JavaScript 代码。

你可以在浏览器中使用即时编译器 (Just-in-Time - JiT) 在运行期间，也就是在应用加载时编译该应用。这是目前的标准开发方式，它很不错，但是有自己的缺点。

* JiT 编译导致运行期间的性能损耗。由于需要在浏览器中进行编译，视图需要更长时间才能渲染出来。
* 由于应用包含了 Angular 编译器以及大量实际上并不需要的库代码，所以文件体积更大，相应地传输及加载也更慢。
* 编译可以揭露一些组件模板绑定错误。JiT 编译在运行时才揭露它们，有点太晚了。

## 预编译 AoT

预编译（ AoT ）通过在构建时编译，在早期截获模板错误，提高应用性能。

事实上只有一个 Angular 编译器，AoT 和 JiT 之间的差别仅仅在于编译的时机和所用的工具。使用 AoT，编译器仅仅使用一组库在构建期间运行一次；使用 JiT，编译器在每个用户的每次运行期间都要用不同的库运行一次。

### AoT 编译具有以下优点：

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

组件模板修改为 webpack 采用的相对路径格式：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'  // 这里必须用相对地址，而且上面也不能加 moduleId: module.id
})
export class AppComponent {  }
```

安装少量新的 npm 依赖：

```bash
$ npm install @angular/compiler-cli @angular/platform-server --save-dev
```

AoT 编译使用 @angular/compiler-cli 包中提供的 `ngc` 编译器来代替 TypeScript 编译器 `tsc`。`ngc` 是一个 `tsc` 的高仿替代品，它们的配置方式几乎完全一样。

`ngc` 需要自己的带有 AoT 专用设置的 tsconfig.json。可以在原配置文件基础上新建一份 `tsconfig-aot.json` ：

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

在命令行中执行下列命令，借助刚安装好的 `ngc` 编译器来启动 AoT 编译：

```bash
$ node_modules/.bin/ngc -p tsconfig-aot.json
```

`ngc` 希望 `-p` 选项指向一个 tsconfig.json 文件，或者一个包含 tsconfig.json 文件的目录。

在 `ngc` 完成时，会在 aot 目录下看到一组 NgFactory 文件（该目录是在 tsconfig-aot.json 的 genDir 属性中指定的）。

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

官网示例采用的摇树优化工具是 Rollup，我没有采用，所以不予展开。

### Webpack

在 package.json 中添加以下代码，`-p` 指令即指示 webpack 对代码进行精简压缩。

> -p shortcut for --optimize-minimize --define process.env.NODE_ENV="production"

```json
  "scripts": {
    "build": "webpack --config=webpack-aot.config.js -p --progress",
  },
```


#### 解决 `webpack -p` UglifyJS 报错

https://github.com/mishoo/UglifyJS2/issues/448

按照下述方法修改 package.json 即可，采用 git 方式安装包好像会报错，但多试几次自己就装上了。

```json
{
  "scripts": {
    "postinstall": "rm -rf node_modules/webpack/node_modules/uglify-js"
  },
  "devDependencies": {
    "uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony"
  }
}
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

## 开发期使用 JiT, 产品期使用 AoT

目前，AoT 编译和摇树优化对开发来说，占用的时间太多了。这将在未来得到改变。当前的最佳实践是在开发期使用 JiT 编译，然后在发布产品前切换到 AoT 编译。

幸运的是，**如果** 你处理了几个关键不同点，源代码可以在没有任何变化时，采取两种方式的任何一种都能编译。
