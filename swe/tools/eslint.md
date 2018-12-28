# ESLint

http://eslint.org/

> *ESLint VS TSLint VS Prettier*
> * ESLint 检查 js 文件的代码分格（可自动修复 Formatting rules 但无法修复 Code-quality rules）
> * TSLint 检查 ts 文件的代码风格
> * Prettier 自动格式化代码（只处理 Formatting rules 但不负责 Code-quality rules）

## 工具使用

```bash
$ npm i -g eslint                # 全局安装方便使用命令行
$ npm install eslint --save-dev  # 本地安装便于多人协作

$ eslint --init   # 创建配置文件
$ eslint --fix somefolder/*.js   # 自动修复不符合项
```

## 规则配置

### 流行的标准规范

* [Google](https://github.com/google/styleguide) - 谷歌
* [Airbnb](https://github.com/airbnb/javascript) - 爱彼迎的，非常流行
* [Standard](https://github.com/standard/standard) - 该风格规范要求完全遵循其规定，认为代码清晰性和社区约定的重要性要高于个人的编码风格。

### 配置文件

.eslintrc.js

```js
// 通过逐项选择生成的配置文件(略有调整)
module.exports = {
  "env": {"es6": true, "node": true},
  "extends": "eslint:recommended",
  "parserOptions": {"sourceType": "module"},
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
};

// 选择流行的 Standard 生成的配置文件
module.exports = {
  "extends": "standard"
};

// 全局变量也是常见配置项
module.exports = {
  "globals": {
    "$": true,   // 可修改的全局变量
    "_": false,  // 不可修改的全局变量
  }
};
```

一份简单的 react 开发配置文件

```json
{
  "parser": "babel-eslint",
  "plugins": ["babel", "react"],
  "env": {"browser": true, "jest": true},
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "rules": {
    "react/prop-types": 0,
    "quotes": ["warn", "single"],
    "no-debugger": "warn"
  }
}
```

### 相关说明

错误等级分三类：
  * `"off"` or `0` - turn the rule off
  * `"warn"` or `1` - turn the rule on as a warning (doesn’t affect exit code)
  * `"error"` or `2` - turn the rule on as an error (exit code will be 1)

ESLint 支持多种配置文件格式：`.eslintrc.js` `.eslintrc.yaml` `.eslintrc.yml` `.eslintrc.json` `package.json`

ESLint 读取配置文件时，跟 CSS 很类似，会逐层往上查找配置，然后将所有配置聚合后给出代码提示。


## 详细配置说明

https://eslint.org/docs/user-guide/configuring

### 临时更改某些规则

```js
/* eslint quotes: ["error", "double"], curly: 2 */
```
