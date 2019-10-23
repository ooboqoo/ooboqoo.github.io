# 搭建开发环境


## create-react-app

https://create-react-app.dev/

```bash
$ npm i -g create-react-app
$ create-react-app react-demo
$ cd react-demo
$ yarn install
$ yarn start
```

这样一个初始的项目就跑起来了，如果需要更加精细的调整配置项，可以 `yarn eject` 然后再手动修改配置。


## Typescript

https://create-react-app.dev/docs/adding-typescript/

To start a new Create React App project with TypeScript

```bash
$ yarn create react-app my-app --typescript
```

To add TypeScript to a Create React App project

```bash
$ yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

Next, rename any file to be a TypeScript file (e.g. src/index.js to src/index.tsx)

## Babel 配置

https://babeljs.io/docs/setup/#installation

```bash
$ yarn add --dev babel-core babel-preset-env babel-preset-react babel-preset-stage-2 babel-preset-flow
```

* babel-preset-react 让 Babel 支持 JSX 以及其他 React 语法；
* babel-preset-env (替代原来用的 babel-preset-es2015) 提供了对新版本 JavaScript 特性的支持。

配置：可通过单独建立 `.babelrc` 配置文件或在 `package.json` 中加入以下字段配置

```
"babel": {
  "presets": [ "env", "react", "stage-2", "flow" ]
},
```


## Webpack 配置

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


## ESLint 配置

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
