# 搭建开发环境

### 起步

```
npm install -g create-react-app
create-react-app demo-app
cd demo-app
```

### package.json

```





```

### Babel 配置

```bash
npm install --save-dev babel-preset-react babel-preset-es2015
```

• babel-preset-react ，让 Babel 支持 JSX 以及其他 React 语法；
• babel-preset-es2015 ，提供了对新版本 JavaScript 特性的支持。

可通过单独建立 `.babelrc` 配置文件或在 `package.json` 中加入以下字段配置 Babel

```
"babel": {
  "presets": [
    "es2015",
    "react"
  ]
},
```

### ESLint 配置

```bash
$ npm i -g eslint babel-eslint eslint-plugin-react eslint-plugin-babel
```

然后在 `package.json` 文件中添加 eslintConfig 配置：

```
{
  "eslintConfig": {
    "parser": "babel-eslint",
    "plugins": [
      "babel",
      "react"
    ],
    "extends": "eslint:recommended",
    "env": {
      "browser": true  // 运行直接使用 document localStorage 等
    },
    "rules": {
      "react/jsx-uses-react": 1  // 避免报错 "React" is defined but never used
    }
  }
}
```

### Flow 配置

```bash
$ npm install -g flow-bin
$ flow init  # 初始化配置
```

在 `.flowconfig` 配置文件中添加以下内容：

```
[ignore]
  .*/react/node_modules/.*
[include]
  node_modules/react
  node_modules/react-dom
  node_modules/classnames
[libs]
[options]
```

### VS Code 配置


### 测试

```bash
$ npm i -g jest-cli
$ npm i --save-dev babel-jest react-addons-test-utils
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
