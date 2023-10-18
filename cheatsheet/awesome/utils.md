# Awesome Utils

https://juejin.cn/post/6950584088462163982


### 实用工具

* [lodash](https://lodash.com/) 不要滥用，尽量实用 ES 自带方法。[[笔记](/library/#!others/lodash.md)]
* [qs](https://github.com/ljharb/qs) 处理 URL 查询字符串
* [classnames](https://github.com/JedWatson/classnames) 方便 calssName 的拼装
* [numeral](http://numeraljs.com/) 格式化数字
* [cross-env]() 一个运行跨平台设置和使用环境变量的脚本
* [path-to-regexp](https://github.com/pillarjs/path-to-regexp) Turn a path string such as `/user/:name` into a regular expression

```js
import { parse, stringify } from 'qs';

// 将 URL 地址转换为对象
const urlParams = parse(window.location.search);

// 拼装查询字符串
const apiUrl = `/api/user?${sringify({name: '小王', age: 18})}`;
```

```js
import numeral from 'numeral';

// 解析数字
numeral('-76%');  // -0.76

// 格式化
numeral(1000.234).format('$0,0.00');  // '$1,000.23'
```

### 日期

* [Day.js]()

### 文本

* [pinyin-math]() 拼音匹配

### 数据生成

* [uuid]() 生成 UUID
* [Nano ID](https://github.com/ai/nanoid) A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
* [faker.js]() 用于在浏览器及 Node.js 中生成大量假数据
* [Mock.js]() 一个模拟数据生成器

```js
import { v4 } from 'uuid';

v4();  // ...
```

### 进程管理

* [Nodemon]()
* [PM2]()
* [Concurrently]() 同时运行多条命令

```js
// package.json
"scripts": {
  // 时启动前端 webpack 项目和 后端 node 项目
  "start": "concurrently \"webpack-dev-server\" \"nodemon server.js\"",
},
```


### Linters与格式化工具

* [ESLint]()
* [Prettier]()
* [stylelint]()
* [Husky]() 帮助简单直接地实现 git hooks
* [lint-staged](https://github.com/okonet/lint-staged) Run linters against staged git files and don't let 💩 slip into your code base!


```js
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"  // Husky + lint-staged 配合实现提交前检查
    }
  }
}
```

### 测试管理

* [Jest]()




