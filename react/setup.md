# 搭建开发环境

### 起步

```bash
$ mkdir react-web
$ cd react-web
$ npm init
```

### package.json

```





```

### Babel 配置

https://babeljs.io/docs/setup/#installation

```bash
$ yarn add --dev babel-core babel-preset-env babel-preset-react babel-preset-flow
```

* babel-preset-react 让 Babel 支持 JSX 以及其他 React 语法；
* babel-preset-env (替代原来用的 babel-preset-es2015) 提供了对新版本 JavaScript 特性的支持。

配置：可通过单独建立 `.babelrc` 配置文件或在 `package.json` 中加入以下字段配置

```
"babel": {
  "presets": [ "env", "react", "flow" ]
},
```

#### 配置说明

Babel is a compiler. At a high level, it has 3 stages that it runs code in: parsing, transforming, and generation.

Now, out of the box Babel doesn’t do anything. It basically acts like `const babel = code => code`.

You will need to add some plugins for Babel to do anything (they affect the 2nd stage, transformation).

Don’t want to assemble your own set of plugins? No problem! Presets are sharable `.babelrc` configs or simply an array of babel plugins.

Official Presets -- We’ve assembled some for common environments:

env -- babel-preset-env replaces es2015, es2016, es2017, latest
es2015  
es2016  
es2017  
latest (deprecated in favor of env)  
react  
flow

Many other community maintained presets are available on npm!

### Webpack 配置

```bash
$ yarn add --dev webpack webpack-dev-server extract-text-webpack-plugin
$ yarn add --dev babel-loader node-sass sass-loader css-loader source-map-loader
```

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "dist/bundle.js",
        path: __dirname
    },

    devtool: "source-map",

    devServer: {
      historyApiFallback: true,
      stats: {chunks: false,}
    },

    resolve: {
        extensions: [".js"]
    },

    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            {test: /\.scss$/, use: ExtractTextPlugin.extract({use: ['css-loader', 'sass-loader']})}
        ],
    },

    plugins: [
        new ExtractTextPlugin('dist/style.css')
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
```


### ESLint 配置

```bash
$ npm i -g eslint babel-eslint eslint-plugin-babel eslint-plugin-react
```

然后在 `package.json` 文件中添加 eslintConfig 配置(或单独建立 .eslintrc 配置文件)：

```
{
  "eslintConfig": {
    "parser": "babel-eslint",
    "plugins": [
      "babel",
      "react"
    ],
    "env": {
      "browser": true,  // 允许直接使用 document localStorage 等
      "node": true,
      "jest": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "rules": {
      "quotes": ["error", "single"]
    }
  }
}
```

### Flow 配置

```bash
$ npm i -g flow-bin
$ flow init  # 初始化配置
```

在 `.flowconfig` 配置文件中添加以下内容：

```
[ignore]
  .*/node_modules/.*
[include]
  node_modules/react
  node_modules/react-dom
[libs]
[options]
```

### VS Code 配置

安装编辑器插件 `ESLint` 和 `Flow Language Support`

添加工作区配置项

```
  "javascript.validate.enable": false,  // 关闭默认的检测，让 flow 上
  "flow.runOnEdit": false               // 不关闭实时检测，实在是影响性能
```

### 测试

```bash
$ npm i -g jest-cli
$ npm i --save-dev babel-jest
```

接下来，更新 `package.json`

```
{
 "eslintConfig": {
    "env": {
      "browser": true,
      "jest": true
    }
  }
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "scriptPreprocessor": "node_modules/babel-jest",
    "testFileExtensions": ["es6", "js"],
    "moduleFileExtensions": ["js", "json", "es6"]
    "unmockedModulePathPatterns": [
      "node_modules/react",
      "node_modules/react-dom",
      "node_modules/react-addons-test-utils",
      "node_modules/fbjs"
    ]
  }
}
```

```bash
$ jest testname.js      # 或
$ npm test testname.js
```

Jest 会在名为 `__tests__` 的文件夹中寻找测试用例，因此我们在 `js/__tests__` 目录中编写测试。
