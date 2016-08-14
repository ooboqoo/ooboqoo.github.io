# SystemJS & JSPM

[JavaScript 模块化历程](http://web.jobbole.com/83761/)

## SystemJS 配置

### Configuration Options

配置项告诉 SystemJS 如果正确加载模块。

当 SystemJS 完成加载后，就可以调用 System.config 函数来进行配置，这其实就是在 SystemJS 实例上设置配置属性：`System.config({ prop: 'value' })` 基本等效于 `System.prop = value`

当配置项比较多的时候，更好的方法是将配置过程放到单独的文件中进行。

##### map - 模块别名 / 映射表
map 跟 paths 比较相似，但会在规范化 normalization 阶段优先处理。通过 map 可以实现模块或路径的简写或使用别名。

##### paths - 配置路径
The ES6 Module Loader paths implementation, applied after normalization and supporting subpaths via wildcards.
一般情况下 map 是比 paths 更好的选择，除非 you need strict control over normalized module names.

##### meta - 附加元数据
通过 meta 可以告诉 SystemJS 更多的关于某个模块（或多个模块）的加载指令信息。

```js
meta: {
  'vendor/angular.js': { exports: 'angular', deps: [ 'jquery' ] },
  '/vendor/*': { format: 'global' }  // 访问文档查看更多的配置项
}
```

##### packages - 包配置

packages 提供了一种便利的手段来设定某个特定 path 的 meta 和 map 信息。（路径名即包名）

packages 允许在 path 上下文基础上设定相对路径。

packages 实现了针对特定 path 的配置的封装。

```js
packages: {
  'local/package': {      // [baseURL]/local/package
    main: 'index.js',
    format: 'cjs',
    defaultExtension: 'js',
    map: {
      // use local jquery for all jquery requires in this package
      'jquery': './vendor/local-jquery.js',
      // import '/local/package/custom-import' should route to '/local/package/local/import/file.js'
      './custom-import': './local/import/file.js'
    },
    meta: { 'vendor/*': { 'format': 'global' } }  // sets meta for modules within the package
  }
}
```

##### bundle - 模块捆绑
配合 SystemJS Builder，可以将多个模块打包，引用到包内模块时再动态加载该包。部署阶段将应用拆分为多个子模块时比较有用。

```js
bundles: { bundleA: ['dependencyA', 'dependencyB'] }
```

##### depCache - 依赖缓存
如果模块A依赖模块B，在设置 depCache 之后，引用模块A时，会同时下载模块A和模块B  
如果没有配置该项，那么要等到下载完模块A之后才知道要下载模块B，速度就慢了。

```js
depCache: {
  moduleA: ['moduleB'], // moduleA depends on moduleB
  moduleB: ['moduleC']  // moduleB depends on moduleC
}
```

##### transpiler - 设定 ES6 模块的转译器
用于指定加载 ES6 模块时的转译器，只能三选一 traceur, babel or typescript
##### typescriptOptions
当 System.transpiler 设置为 typescript 时，提供配置参数
##### babelOptions
当 System.transpiler 设置为 babel 时，提供配置参数
##### traceurOptions
当 System.transpiler 设置为 traceur 时，提供配置参数

### 配置文件实例

```html
<script src="node_modules/systemjs/dist/system.src.js"></script>  // 引入 SystemJS
<script src="systemjs.config.js"></script>                        // 通过单独 js 文件进行配置
```

```js
// systemjs.config.js
(function(global) {
  // map 映射表，来告诉 SystemJS 当想要引入某些模块的时候，该到哪里去找
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // 把所有包注册到 SystemJS 中：项目的所有外部依赖，以及自己的应用包 app
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
  };
  // 下面一堆代码，是 NG2 根据不同环境指定具体包名对应的 main 文件
  var ngPackageNames = ['common', 'compiler', 'core', 'forms', 'http', 'platform-browser',
      'platform-browser-dynamic', 'router', 'router-deprecated', 'upgrade', ];
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  ngPackageNames.forEach(setPackageConfig);  // Add package entries for angular packages
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };  // No umd for router yet
  // 最终调用 System.config 进行配置操作
  var config = { map: map, packages: packages };
  System.config(config);
})(this);
```

在“快速起步”中，当应用中的一个 TypeScript 文件有这样的一个导入语句时，SystemJS 就会开始介入。

```js
// app/main.ts (import)
import { AppComponent } from './app.component';
```
```js
// index.html
System.import('app').catch(function(err){ console.error(err); });
```

System.import 调用告诉 SystemJS 引入 main 文件。还会把启动过程中的错误捕获并记录到控制台中。

在接下来的请求中，所有其它模块都会被加载——不管是被 import 语句还是 Angular 自身。
