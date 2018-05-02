# Babel

https://babeljs.io/docs/usage/api/

## Guide

### Quick Guide

https://babeljs.io/docs/plugins/transform-es2015-block-scoping/

#### 安装并使用 CLI

```bash
$ mkdir babel && cd babel
$ npm init -y
$ npm i -D babel-cli
```

input.js

```js
const a = 123;
```

```bash
$ npx babel input.js  # 输出 const a = 123;
```

我们发现代码没有进行转译，babel-core 不会做任何转译，这个工作需要配置 plugin 来执行。

#### 配置并使用 plugin

```bash
$ npm i -D babel-plugin-transform-es2015-block-scoping
$ npx babel --plugins transform-es2015-block-scoping input.js  # 成功输出 var a = 123;
```

#### 添加配置文件并转译目录

添加配置文件 .babelrc

```json
{
  "plugins": ["transform-es2015-block-scoping"]
}
```

```bash
$ npx babel src -d lib  # 将 src 目录下所有文件进行转译并输出到 lib 目录
```

#### 转译其他语法

每个功能项都有特定的 plugin 来负责处理转译工作，如果要逐项配置，过于麻烦，Bebel 为我们提供了组合套餐 preset。

```bash
$ npm i -D babel-preset-env
```

```json
{
  "presets": ["env"]
}
```

至此一个初步可用的 Babel 工作环境就搭建完毕了。

更多 CLI 用法请执行 `npx babel --help` 或查看[在线文档](https://babeljs.io/docs/usage/cli/)。

### Preset

https://github.com/babel/babel/tree/master/packages/babel-preset-env

Babel 通过 syntax transformers 来提供对最新 JS 语法的支持。

每一项语法都有一个 plugin 来负责转换，如果要逐项配置，过于麻烦，Babel 提供了几个常用的套餐：`babel-preset-es2015` `babel-preset-es2016` `babel-preset-es2017`。

但是将所有 ES6+ 语法都转译回 ES5 这种用法还是存在问题的，于是又有了 `babel-preset-env`，可以根据提供的 target 来智能判断需要转译哪些功能。

```bash
$ npm install --save-dev babel-preset-env
```

```json
{
  "presets": [
    // 配置项写法: 不带参 string 带参 [preset, options]
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

### Polyfill

Babel 只转译语法，对新的全局变量以及对原有对象的扩展方法，如 `Promise` `String.padStart`，等都没做处理，如有用到，需要提前引入垫片处理。Babel 提供了打包好的解决方案 [babel-polyfill](https://babeljs.io/docs/usage/polyfill)，其使用了 [core-js](https://github.com/zloirock/core-js) 和 [regenerator](https://facebook.github.io/regenerator/)。

```bash
$ npm install --save-dev babel-polyfill
```

### JSX

```bash
$ npm install --save-dev babel-preset-react
```

### Pluggable

可以自己写 plugin 和 preset。


## API

```ts
export function transform(code: string, opts?: TransformOptions): BabelFileResult;
export function transformFile(filename: string, opts: TransformOptions, callback: (err, result) => void): void;
export function transformFileSync(filename: string, opts?: TransformOptions): BabelFileResult;
export function transformFromAst(ast: Node, code?: string, opts?: TransformOptions): BabelFileResult;

export interface BabelFileResult {
  ast?: Node;
  code?: string;
  map?: object;
}
```

```ts
export interface TransformOptions {
  ast?: boolean; // =true, include the AST in the returned object
  auxiliaryCommentAfter?: string; /** Attach a comment after all non-user injected code. */
  auxiliaryCommentBefore?: string; /** Attach a comment before all non-user injected code. */
  babelrc?: boolean; // =true, specify whether or not to use `.babelrc` and `.babelignore` files
  code?: boolean; // =true, enable code generation
  comments?: boolean; // =true, write comments to generated output
  compact?: boolean | "auto";
  env?: object;
  extends?: string;
  filename?: string; // ="unknown"
  filenameRelative?: string;  /** Filename relative to `sourceRoot`. */
  generatorOpts?: GeneratorOptions; // ={}
  getModuleId?(moduleName: string): string;
  highlightCode?: boolean; // =true
  ignore?: string[];
  inputSourceMap?: object;
  minified?: boolean; // =false
  moduleId?: string;
  moduleIds?: boolean;
  moduleRoot?: string;
  only?: string | RegExp | Array<string | RegExp>;
  parserOpts?: BabylonOptions;
  plugins?: any[];
  presets?: any[];
  retainLines?: boolean; // =false
  resolveModuleSource?(source: string, filename: string): string;
  shouldPrintComment?(comment: string): boolean;
  sourceFileName?: string;
  sourceMaps?: boolean | "inline" | "both";
  sourceMapTarget?: string;
  sourceRoot?: string;
  sourceType?: "script" | "module"; // ="module"
  wrapPluginVisitorMethod?(pluginAlias: string, visitorType: 'enter' | 'exit', callback: (path: NodePath, state: any) => void): (path: NodePath, state: any) => void ;
}
```

```ts
// A babel plugin is a simple function which must return an object matching the following interface.
export interface PluginObj<S = {}> {
  name?: string;
  manipulateOptions?(opts: any, parserOpts: any): void;
  pre?(this: S, state: any): void;
  visitor: Visitor<S>;
  post?(this: S, state: any): void;
  inherits?: any;
}
```


## .babelrc

```bash
$ npm install babel-preset-env --save-dev
```

```json
{
  "presets": ["env"]
}
```

### 分环境区别配置

```bash
export BABEL_ENV=production     # Unix
set BABEL_ENV=production        # WIn
cross-env BABEL_ENV=production  # 借助 cross-env 配置环境变量
```

```json
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
```

```js
// env 取值过程
env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
```


## Webpack

https://github.com/babel/babel-loader

```bash
# webpack 4.x | babel-loader 8.x | babel 7.x
$ npm install "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env webpack
# webpack 4.x | babel-loader 7.x | babel 6.x
$ npm install babel-loader babel-core babel-preset-env webpack
```

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', { targets: { browsers: ['chrome 59'] }}],
          plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        }
      }
    }
  ]
}
```


## Caveats

### Polyfill

Bebel 只转换语法，对于新的方法，并不会做转换，这时需要配合 babel-polyfill 使用。

### Classes

因为 ES5 中的一些限制，像 `Data` `Array` `DOM` 这些内置类无法被继承，所以也不支持转换。

### IE

静态属性的继承，转译时使用到了 `__proto__`，但这在 IE<=10 环境下是不支持的。
