# Jest

https://facebook.github.io/jest/docs/tutorial-react.html


## @testing-library/react

[@testing-library/react](https://github.com/testing-library/react-testing-library) provides light utility functions on top of `react-dom` and `react-dom/test-utils`, in a way that encourages better testing practices.

### 基本配置

https://github.com/jestjs/jest/tree/main/examples/react-testing-library


```bash
$ pnpm add react react-dom
$ pnpm add -D jest jest-environment-jsdom @babel/preset-env @babel/preset-react @testing-library/react
```

babel.config.js

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
};
```

jest.config.js

```js
module.exports = {
  testEnvironment: 'jsdom'
};
```

### 支持 tsx

```bash
$ pnpm add -D @babel/preset-typescript
```

babel.config.js

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ],
};
```



## 环境搭建

```bash
$ npm i -g jest
$ npm i --save-dev babel-jest react-test-renderer enzyme
  # babel-jest - 让你可以使用 ES6 风格编写测试
  # react-test-renderer - 渲染器，enzyme 需要调用
  # enzyme - Airbnb 出的测试工具，React 官方推荐
  # react-addons-test-utils - React15.5 以下版本还需要安装这个包
```

修改 package.json

```json
{
    "scripts": {
        "test": "jest"
    },
    "eslintConfig": {
        "env": {
            "browser": true,
            "jest": true
        }
    },
    "jest": {  // 这里其实都不用配置了，开箱即用(这些内容已经在默认配置里了)
        "scriptPreprocessor": "node_modules/babel-jest",
        "unmockedModulePathPatterns": [
            "node_modules/react",
            "node_modules/react-dom",
            "node_modules/react-addons-test-utils",
            "node_modules/fbjs"
        ]
    }
  }
}
```

运行测试

```bash
$ jest testname.js      # 测试单个文件，不用输入路径，jest 会自己去搜索(搜索方式见默认配置)
$ npm test testname.js
$ jest --coverage       # 生成代码覆盖率报告
```

### 问题处理

#### vscode-typescript2.3 js 类型检测报错

```
$ npm i --save-dev @types/jest @types/node  # 装了重启 vscode 就能认得 describe it require 等关键字了
```

#### 导入样式文件报错

https://facebook.github.io/jest/docs/webpack.html

`package.json` 添加以下配置：

```json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/path/to/styleMock.js"
    }
  }
}
```

`styleMock.js`

```js
module.exports = {};
```


## 首个测试

Jest 是基于流行的测试框架 Jasmine 构建的，而 Jasmine 的 API 命名比较口语化，简洁易懂。

Jest 搜索测试用例策略(`__tests__` 文件夹下 `js` `jsx` 文件 或 任意文件夹下 `.test.js` `.spec.js` 文件)：

```
testMatch [array<string>]
available in Jest 19.0.0+
(default: [ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ])
```

```js
describe('A suite', () => {
  it('is a spec', () => {
    expect(1).toBe(1);
  });
});
```

## 测试 React 项目

https://facebook.github.io/jest/docs/tutorial-react.html


