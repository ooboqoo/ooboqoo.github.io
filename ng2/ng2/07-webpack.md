# Webpack

## 什么是 Webpack ？

Webpack 是一个强力的模块打包器。所谓 包 (bundle) 就是一个 JavaScript 文件，它把一堆 资源 (assets) 合并在一起，以便它们可以在同一个文件请求中发回给客户端。包中可以包含 JavaScript、CSS 样式、HTML 以及很多其它类型的文件。

Webpack 会遍历你应用中的所有源码，查找 `import` 语句，构建出依赖图谱，并产出一个 ( 或多个 ) 包。通过“加载器 (loaders) ”插件，Webpack 可以对各种非 JavaScript 文件进行预处理和最小化 (Minify)，比如 TypeScript、SASS 和 LESS 文件等。

我们通过一个 JavaScript 配置文件 webpack.config.js 来决定 Webpack 做什么以及如何做。

### 入口与输出














## Webpack and Angular2 Starter

https://github.com/AngularClass/angular2-webpack-starter


### 文件结构

```
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
 │   │
 |   ├──index.html           * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts         * our polyfills file
 │   │
 |   ├──vendor.ts            * our vendor file
 │   │
 │   ├──app/                 * WebApp 主目录
 │   │   ├──app.ts           * App.ts: a simple version of our App component components
 │   │   ├──app.spec.ts      * a simple test of components in app.ts
 │   │   └──app.e2e.ts       * a simple end-to-end test for /
 │   │
 │   └──assets/              * 存放静态资源
 │
 ├──tslint.json              * typescript lint config
 ├──typedoc.json             * typescript documentation generator
 ├──tsconfig.json            * config that webpack uses for typescript
 ├──package.json             * what npm uses to manage it's dependencies
 └──webpack.config.js        * webpack main configuration file
 ```