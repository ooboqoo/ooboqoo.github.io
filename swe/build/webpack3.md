# Webpack3

不错的参考书 https://survivejs.com/webpack/optimizing/tree-shaking/

## 什么是 Webpack ？

Webpack 是一个强力的模块打包器。所谓 包 (bundle) 就是一个 JavaScript 文件，它把一堆 资源 (assets) 合并在一起，以便它们可以在同一个文件请求中发回给客户端。包中可以包含 JavaScript CSS HTML 以及很多其它类型的文件。

Webpack 会遍历你应用中的所有源码，查找 `import` 语句，构建出依赖图谱，并产出一个(或多个)包。通过“加载器(loaders)”插件，Webpack 可以对各种非 JavaScript 文件进行预处理和最小化(Minify)，比如 TypeScript、SASS 和 LESS 文件等。

我们通过一个 JavaScript 配置文件 webpack.config.js 来决定 Webpack 做什么以及如何做。

### 入口与输出

我们给 Webpack 提供一个或多个 **入口** 文件，来让它查找与合并那些从这些入口点发散出去的依赖。

然后它把这些文件 **输出** 到当前配置所指定的包文件中。

```js
entry: { app: 'src/app.ts' },
output: { filename: 'app.js' }
```

#### 多重包

我们可能不会希望把所有东西打进一个巨型包，而更喜欢把多变的应用代码从相对稳定的第三方提供商模块中分离出来。

```js
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},

output: {
  filename: '[name].js'  // [name] 是一个 Webpack 的占位符，它将被替换为入口点的名字
}
```

Webpack 会构造出两个独立的依赖图谱，并产出两个包文件：一个叫做 app.js，它只包含我们的应用代码；另一个叫做 vendor.js，它包含所有的提供商依赖。(两个包相同的依赖部分，将使用一个 CommonsChunkPlugin 插件来实现分离。)

```js
// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
```

### 加载器 (Loader)

Webpack 可以打包任何类型的文件：JavaScript、TypeScript、CSS、SASS、LESS、图片、HTML 以及字体文件等等。Webpack 本身并不知道该如何处理这些非 JavaScript 文件。我们要通过加载器来告诉它如何把这些文件处理成 JavaScript 文件。

在这里，我们为 TypeScript 和 CSS 文件配置了加载器。

```js
loaders: [
  { test: /\.ts$/,  loaders: 'ts' },
  { test: /\.css$/, loaders: 'style!css' }  // ! 用于串联加载器，会从右到左逐个应用
]
```

### 插件

Webpack 有一条构建流水线，它被划分成多个经过精心定义的阶段 (phase)。我们可以把插件(比如 uglify 代码最小化插件)挂到流水线上：

```js
plugins: [
  new webpack.optimize.UglifyJsPlugin()
]
```

## 配置 Webpack

经过简短的培训之后，我们准备为 Angular 应用构建一份自己的 Webpack 配置了。把下列文件添加到根目录下：

package.json typings.json tsconfig.json webpack.config.js karma.conf.js config/helpers.js

### 公共配置

我们可以为开发、产品和测试环境定义分别各自的配置文件。但三者总会有一些公共配置。于是我们把那些公共的配置收集到一个名叫 webpack.common.js 的独立文件中。

```js
// config/webpack.common.js

// Webpack 是一个基于 NodeJS 的工具，所以它的配置文件就是一个 JavaScript 的 CommonJS 模块文件，
// 它像常规写法一样以 require 语句开始。
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');          // 自动更新 index.html
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // 
var helpers           = require('./helpers');

module.exports = {
  // 定义入口文件
  entry: {                              // 把应用拆成三个包：
    'polyfills': './src/polyfills.ts',  // 在大多数现代浏览器中运行 Angular 程序时需要的标准填充物
    'vendor': './src/vendor.ts',        // 需要的提供商文件： Angular、Lodash、bootstrap.css ……
    'app': './src/main.ts'              // 我们的应用代码
  },

  // 大多数 import 语句完全不会去引用扩展名。所以我们要告诉 Webpack 如何通过查找匹配的文件来解析模块文件的加载请求：
  // 一个明确的扩展名 ( 通过一个空白的扩展名字符串 '' 标记出来 ) 
  // 或者 .js 扩展名(标准的 JS文件和预编译过的 TS文件)，或者 .ts 扩展名。
  // 我们以后还可能会添加 .css 和 .html ——如果希望 Webpack 也用无扩展名的方式去解析那些扩展名的话。
  resolve: { extensions: ['', '.js', '.ts'] },

  // 指定加载器
  module: {
    loaders: [
      {
        test: /\.ts$/, // 
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
          // awesome-typescript-loader: 把 TS 代码转译成 ES5 的加载器，它会调用 tsconfig.json 文件
          // angular2-template-loader: 用于加载 Angular 组件的模板和样式，会改成 template: require() 的形式
      },
      {
        test: /\.html$/,
        loader: 'html'  // 为组件模板准备的加载器
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'  // 图片和字体文件也能被打包
      },
      {
        test: /\.css$/,  // 匹配应用级样式
        exclude: helpers.root('src', 'app'),  // 排除 /src/app 目录下的 .css文件，那里放的是组件局部样式
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },     // ExtractTextPlugin( 后面会讲到 ) 使用 style 和 css 加载器来处理这些文件
      {
        test: /\.css$/,  // 匹配组件局部样式 (就是在组件元数据的 styleUrls 属性中指定的那些)
        include: helpers.root('src', 'app'),
        loader: 'raw'    // 通过 raw 加载器把它们加载成字符串
      }
    ]
  },

  plugins: [
    // 我们希望 app.js 包中只包含应用代码，而 vendor.js 包中只包含提供商代码。
    // 应用代码中 import 了提供商代码。Webpack 还没有智能到自动把提供商代码排除在 app.js 包之外。
    // CommonsChunkPlugin 插件能完成此工作。
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']  // 这里标记出了三个块之间的等级体系： app -> vendor -> polyfills。
        // 当 Webpack 发现 app 与 vendor 有共享依赖时，就把它们从 app 中移除。
        // 在 vendor 和 polyfills 之间有共享依赖时也同样如此 ( 虽然它们没啥可共享的 ) 。
    }),

    // Webpack 生成了一些 js 和 css 文件。 虽然我们可以手动把它们插入到 index.html 中，但那样既枯燥又容易出错。
    // Webpack 可以通过 HtmlWebpackPlugin 自动为我们注入那些 script 和 link 标签
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```

### 环境相关的配置

webpack.common.js 配置做了大部分繁重的工作。通过合并它们特有的配置，我们可以基于 webpack.common 为目标环境创建独立的、环境相关的配置文件。这些文件越小越简单越好。

#### 开发环境配置

```js
// config/webpack.dev.js
var webpackMerge      = require('webpack-merge');  // 用于合并配置
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // 将 css 提取为单独文件
var commonConfig      = require('./webpack.common.js');
var helpers           = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  // HtmlWebpackPlugin( 由 webpack.common.js 引入 ) 插件使用了 publicPath 和 filename 设置，
  // 来向 index.html 中插入适当的 <script> 和 <link> 标签。
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  // 我们这些 CSS 默认情况下会被埋没在 JavaScript 包中。ExtractTextPlugin 会把它们提取成外部 .css 文件，
  // 这样 HtmlWebpackPlugin 插件就会转而把一个 <link> 标签写进 index.html 了。
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  // 开发环境下的构建依赖于 Webpack 的开发服务器
  // 虽然我们告诉 Webpack 把输出包放到 dist 目录，但实际上开发服务器把这些包都放在了内存里，而不会把它们写到硬盘中
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
```

#### 产品环境配置

```js
// config/webpack.prod.js
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: { keep_fnames: true }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': { 'ENV': JSON.stringify(ENV) }
    })
  ]
});
```

我们不会在产品环境下使用开发服务器，而是希望把应用程序及其依赖都部署到一个真实的产品服务器中。这次，输出的包文件就被真的放到 dist 目录下了。

Webpack 生成的文件名中带有“缓存无效哈希 (cache-busting hash) ”。感谢 HtmlWebpackPlugin 插件，当这些哈希值变化时，我们不用去更新 index.html 了。

还有一些额外的插件：

* NoErrorsPlugin - 如果出现任何错误，就终止构建。
* DedupePlugin - 检测完全相同 ( 以及几乎完全相同 ) 的文件，并把它们从输出中移除。
* UglifyJsPlugin - 最小化 (minify) 生成的包。
* ExtractTextPlugin - 把内嵌的 css 抽取成外部文件，并为其文件名添加“缓存无效哈希”。
* DefinePlugin - 用来定义环境变量，以便我们在自己的程序中引用它。

感谢 DefinePlugin 和顶部定义的 ENV 变量，我们就可以像这样启用 Angular 的产品模式了：

```ts
// src.main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') { enableProdMode(); }

platformBrowserDynamic().bootstrapModule(AppModule);
```

#### 测试环境配置

```ts
// config/webpack.test.js
var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  }
}
```

## 文件结构

```txt
angular2-webpack-starter/
 ├──config/                  * our configuration
 |   ├──helpers.js           * helper functions for our configuration files
 |   ├──spec-bundle.js       * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js        * karma config for our unit tests
 |   ├──protractor.conf.js   * protractor config for our end-to-end tests
 │   ├──webpack.dev.js       * our development webpack config
 │   ├──webpack.prod.js      * our production webpack config
 │   └──webpack.test.js      * our testing webpack config
 │
 ├──src/                     * our source files that will be compiled to javascript
 |   ├──main.browser.ts      * our entry file for our browser environment
 |   ├──index.html           * Index.html: where we generate our index page
 |   ├──polyfills.ts         * our polyfills file
 |   ├──vendor.ts            * our vendor file
 │   ├──app/                 * WebApp 主目录
 │   │   ├──app.ts           * App.ts: a simple version of our App component components
 │   │   ├──app.spec.ts      * a simple test of components in app.ts
 │   │   └──app.e2e.ts       * a simple end-to-end test for /
 │   └──assets/              * 存放静态资源
 │
 ├──tslint.json              * typescript lint config
 ├──tsconfig.json            * config that webpack uses for typescript
 ├──package.json             * what npm uses to manage it's dependencies
 └──webpack.config.js        * webpack main configuration file
```


# Loader

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 `require` 来加载任何类型的模块或文件，比如 CoffeeScript、JSX、LESS 或图片。

先来看看 loader 有哪些特性？

- Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
- Loader 可以同步或异步执行。
- Loader 运行在 node.js 环境中，所以可以做任何可能的事情。
- Loader 可以接受参数，以此来传递配置项给 loader。
- Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
- Loader 可以通过 `npm` 发布和安装。
- 除了通过 `package.json` 的 `main` 指定，通常的模块也可以导出一个 loader 来使用。
- Loader 可以访问配置。
- 插件可以让 loader 拥有更多特性。
- Loader 可以分发出附加的任意文件。

Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中自己写 loader 模块。

按照惯例，而非必须，loader 一般以 `xxx-loader` 的方式命名，`xxx` 代表了这个 loader 要做的转换功能，比如 `json-loader`。

在引用 loader 的时候可以使用全名 `json-loader`，或者使用短名 `json`。这个命名规则和搜索优先级顺序在 webpack 的 `resolveLoader.moduleTemplates` api 中定义。

```
Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
```
Loader 可以在 `require()` 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。

接上一节的例子，我们要在页面中引入一个 CSS 文件 style.css，首页将 style.css 也看成是一个模块，然后用 `css-loader` 来读取它，再用 `style-loader` 把它插入到页面中。

```css
/* style.css */
body { background: yellow; }
```

修改 entry.js：

```js
require("!style!css!./style.css") // 载入 style.css
document.write('It works.')
document.write(require('./module.js'))
```

安装 loader：

```bash
npm install css-loader style-loader
```

重新编译打包，刷新页面，就可以看到黄色的页面背景了。

如果每次 `require` CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。

将 entry.js 中的 `require("!style!css!./style.css")` 修改为 `require("./style.css")` ，然后执行：

```bash
$ webpack entry.js bundle.js --module-bind 'css=style!css'

# 有些环境下可能需要使用双引号
$ webpack entry.js bundle.js --module-bind "css=style!css"
```

显然，这两种使用 loader 的方式，效果是一样的。
