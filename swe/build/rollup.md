# rollup.js

https://rollupjs.org/guide/en

## 构建工具简介

> Use webpack for apps, and Rollup for libraries.

### Grunt

Grunt 是一套前端自动化工具，帮助处理反复重复的任务。一般用于：编译，压缩，合并文件，简单语法检查等。

### Gulp

Gulp 是基于“流”的自动化构建工具，采用代码优于配置的策略，更易于学习和使用。

### Webpack

Webpack 是模块化管理工具和打包工具。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、AMD 模块、ES6 模块、CSS、图片等。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。

Webpack 的定位是模块打包器，而 Gulp/Grunt 属于构建工具。Webpack 可以代替 Gulp/Grunt 的一些功能，但不是一个职能的工具，可以配合使用。

### Rollup

Rollup 是下一代 ES6 模块化工具，它最大的亮点是利用 ES6 模块设计，生成更简洁、更简单的代码。尽可能高效地构建出能够直接被其它 JavaScript 库引用的模块。

基于权衡，Rollup 目前还不支持代码拆分 Code Splitting 和模块的热更新 HMR。

一般而言，
  * 应用使用 Webpack，类库使用 Rollup
  * 需要代码拆分，或者有很多静态资源需要处理，再或者项目需要引入很多 CommonJS 模块依赖时，使用 webpack。
  * 代码库基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 Rollup。

Rollup 与 Webpack 有这不同的用途，因此会共同存在，并相互支持。


## Introduction

### Tree-shaking

In addition to enabling the use of ES6 modules, Rollup also statically analyzes the code you are importing, and will exclude anything that isn't actually used.

Since this approach is based on explicit import and export statements, it is more effective than simply running an automated minifier to detect unused variables in the compiled output code.

### Compatibility

#### Compile to UMD or CommonJS

you can use Rollup to compile to UMD or CommonJS format, and then point to that compiled version with the `main` property in your `package.json` file. If your `package.json` file also has a `module` field, ES6-aware tools like Rollup and webpack 2 will import the ES6 module version directly.

```json
{
  "main": "dist/mylib.cjs.js",
  "module": "dist/mylib.esm.js",
  "browser": "dist/mylib.umd.js",
}
```

#### Loading CommonJS modules

Loading of CommonJS modules and use of Node's module location resolution logic are both implemented as optional plugins, not included by default in the Rollup core. Just `npm install` the [CommonJS](https://github.com/rollup/rollup-plugin-commonjs) and [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) plugins and then enable them using a `rollup.config.js` file and you should be all set.


## Tutorial

```bash
$ npm i rollup -g
$ rollup  # 同 `rollup -h` 打印帮助信息
$ rollup src/main.js -f es
```

```js
// src/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}

// src/foo.js
export default 'hello world!';

```

### Using config files

rollup.config.js

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  }
};
```

package.json

```json
{
  "scripts": {
    "build": "rm -f dist/*.* && rollup -c",
  },
}
```

### Using plugins

As you build more complex bundles, you'll often need more flexibility – importing modules installed with npm, compiling code with Babel, working with JSON files and so on.

For that, we use plugins, which change the behaviour of Rollup at key points in the bundling process. A list of available plugins is maintained on [the Rollup wiki](https://github.com/rollup/rollup/wiki/Plugins).

For this tutorial, we'll use [rollup-plugin-json](https://github.com/rollup/rollup-plugin-json), which allows Rollup to import data from a JSON file.

```bash
$ npm install --save-dev rollup-plugin-json
```

src/main.js

```js
import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}
```

rollup.config.js

```js
import json from 'rollup-plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [ json() ]
};
```


## CLI

### Configuration files

Rollup configuration files are optional, but they are powerful and convenient and thus recommended.

A config file is an ES6 module that exports a default object with the desired options. Typically, it is called `rollup.config.js` and sits in the root directory of your project.

```js
export default { // can be an array (for multiple inputs)
  // core input options
  input,     // required
  external,
  plugins,

  // advanced input options
  onwarn,
  perf,

  // danger zone
  acorn,
  acornInjectPlugins,
  treeshake,
  context,
  moduleContext,
  
  // experimental
  experimentalCodeSplitting,
  experimentalDynamicImport,

  output: {  // required (can be an array, for multiple outputs)
    // core output options
    format,  // required
    file,
    dir,
    name,
    globals,

    // advanced output options
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,
    extend,

    // danger zone
    exports,
    amd,
    indent,
    strict,
    freeze,
    legacy,
    namespaceToStringTag
  },

  watch: {
    chokidar,
    include,
    exclude,
    clearScreen
  }
};
```

https://github.com/rollup/rollup-starter-lib/blob/master/rollup.config.js

```js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      name: 'howLongUntilLunch',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },
  {
    input: 'src/main.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
```


### Command line flags

```txt
-c, --config                Use this config file (if argument is used but value
                              is unspecified, defaults to rollup.config.js)
-i, --input                 Input (alternative to <entry file>)
-o, --file <output>         Output (if absent, prints to stdout)
-f, --format [es]           Type of output (amd, cjs, es, iife, umd)
-e, --external              Comma-separate list of module IDs to exclude
-g, --globals               Comma-separate list of `module ID:Global` pairs
                              Any module IDs defined here are added to external
-n, --name                  Name for UMD export
-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
-l, --legacy                Support IE8
--amd.id                    ID for AMD module (default is anonymous)
--amd.define                Function to use in place of `define`
--no-strict                 Don't emit a `"use strict";` in the generated modules.
--no-indent                 Don't indent result
--environment <values>      Environment variables passed to config file
--no-conflict               Generate a noConflict method for UMD globals
--no-treeshake              Disable tree-shaking
--intro                     Content to insert at top of bundle (inside wrapper)
--outro                     Content to insert at end of bundle (inside wrapper)
--banner                    Content to insert at top of bundle (outside wrapper)
--footer                    Content to insert at end of bundle (outside wrapper)
--no-interop                Do not include interop block
```


## JS API

Rollup provides a JavaScript API which is usable from Node.js. You will rarely need to use this, and should probably be using the command line API unless you are extending Rollup itself or using it for something esoteric, such as generating bundles programmatically.

### rollup.rollup

```js
const rollup = require('rollup');

const inputOptions = {...};
const outputOptions = {...};

async function build() {
  const bundle = await rollup.rollup(inputOptions);  // create a bundle
  const {code, map} = await bundle.generate(outputOptions);  // generate code and a sourcemap
  await bundle.write(outputOptions);                         // or write the bundle to disk
}

build();
```

### rollup.watch

```js
const rollup = require('rollup');

const watchOptions = {...};
const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
  // event.code can be one of:
  //   START        — the watcher is (re)starting
  //   BUNDLE_START — building an individual bundle
  //   BUNDLE_END   — finished building a bundle
  //   END          — finished building all bundles
  //   ERROR        — encountered an error while bundling
  //   FATAL        — encountered an unrecoverable error
});

// stop watching
watcher.close();
```

```ts
export default function rollup(rawInputOptions: GenericConfigObject): Promise<OutputBundle>;

export interface OutputBundle {
    imports: string[];
    exports: string[];
    modules: ModuleJSON[];
    generate: (outputOptions: OutputOptions) => Promise<{ code: string; map: SourceMap; }>;
    write: (options: OutputOptions) => Promise<void>;
}

export interface InputOptions {
    input: string;
    external?: ExternalOption;
    plugins?: Plugin[];
    onwarn?: WarningHandler;
    cache?: {
        modules: ModuleJSON[];
    };
    acorn?: {};
    treeshake?: boolean | TreeshakingOptions;
    context?: string;
    moduleContext?: string | ((id: string) => string) | {
        [id: string]: string;
    };
    legacy?: boolean;
    watch?: WatcherOptions;
    experimentalDynamicImport?: boolean;
    pureExternalModules?: boolean;
    preferConst?: boolean;
    entry?: string;
    transform?: TransformHook;
    load?: LoadHook;
    resolveId?: ResolveIdHook;
    resolveExternal?: any;
}

export interface OutputOptions {
    file?: string;
    format?: 'amd' | 'cjs' | 'es' | 'es6' | 'iife' | 'umd';
    name?: string;
    globals?: GlobalsOption;
    paths?: Record<string, string> | ((id: string) => string);
    banner?: string;
    footer?: string;
    intro?: string;
    outro?: string;
    sourcemap?: boolean | 'inline';
    sourcemapFile?: string;
    interop?: boolean;
    extend?: boolean;
    exports?: 'default' | 'named' | 'none' | 'auto';
    amd?: {
        id?: string;
        define?: string;
    };
    indent?: boolean;
    strict?: boolean;
    freeze?: boolean;
    legacy?: boolean;
    noConflict?: boolean;
    dest?: string;
    moduleId?: string;
}
```


## Integrating with other tools

https://devhints.io/rollup

### npm packages

```js
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

import pkg from './package.json'

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'mylib', // 指定在非模块使用方式下，本项目导出的全局变量名
      file: pkg.browser,
      format: 'umd',
      globals: { // 指定导入模块对应的全局变量名
        lodash: '_',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      // https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module
      namedExports: {
        'src/foo.cjs.js': [ 'name' ],
      },
    }),
    json(),
  ],
  // 对于声明为外部模块的，rollup 只进行简单的写法转换，不需要用到 resolve 和 commonjs 插件
  external: [
    'lodash',
  ]
}
```

### Peer dependencies

参见 `external` 配置项。

### Babel



### Gulp




