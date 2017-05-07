# Jest

https://facebook.github.io/jest/docs/tutorial-react.html

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
$ jest testname.js     # 测试单个文件，不用输入路径，jest 会自己去搜索(搜索方式见默认配置)
$ npm test testname.js
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

Jest 会在名为 __tests__ 的文件夹中寻找测试用例，因此我们在 js/__tests__ 目录中编写测试。

```js
describe('A suite', () => {
  it('is a spec', () => {
    expect(1).toBe(1);
  });
});
```

## 测试 React 项目

https://facebook.github.io/jest/docs/tutorial-react.html


