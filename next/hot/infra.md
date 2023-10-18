# 前端基建

架构师：系统架构（像升级版的运维） + 应用架构（领域化思想）。前端工程化架构就是指工具怎么用，应该是最简单的。


## 微前端

微前端
* 框架 - 用 20% 的代码解决 80% 的场景
* 小组研究学习+产出

微前端
调试时，使用线上主应用，要调试的模块通过 service worker 控制加载本地模块



## 脚手架

### Modern.js

https://modernjs.dev/

以后去字节面试的童鞋注意了，不仅要会用modernjs，而且要知道它的原理，并且会手写一个简单的modernjs


### Rust 化

ESLint https://github.com/eslint/eslint/discussions/16557

#### Rome

https://github.com/rome/tools

Rome is a formatter, linter, bundler, and more for JavaScript, TypeScript, JSON, HTML, Markdown, and CSS.

Rome is designed to replace Babel, ESLint, webpack, Prettier, Jest, and others.

Rome 是 Babel 和 Yarn 的作者 Sebastian McKenzie 拿到风投后，成立 Rome Tools 公司主推的一站式前端工程化解决方案。能做起来肯定是好事，但一是开发资源不一定够，二是大公司不一定会用。

### Turborepo & Turbopack

https://turbo.build/repo  
https://turbo.build/pack  





## 代码规范与效率

### 中文拼写检查


### jscodeshift

教程：https://medium.com/@andrew_levine/writing-your-very-first-codemod-with-jscodeshift-7a24c4ede31b  
Awesome List：https://github.com/rajasegar/awesome-codemods  

codemod 经历了3个阶段

* 最初是简单的字符串替换技术
* 后来到复杂的正则表达式
* 再到现在的使用 抽象语法树AST 来遍历多种语言的源代码，这使得 codemod 更加安全、强大、容易和快速

如何快速编写一个 codemod

1. 借助 [ast-finder](https://rajasegar.github.io/ast-finder/) 自动生成查询语句
2. 借助 [ast-builder](https://rajasegar.github.io/ast-builder/) 自动生成构建语句
3. 借助 [astexplorer.net](https://astexplorer.net/) 实时查看AST和转换结果
4. [jsodeshift](https://github.com/facebook/jscodeshift) CLI 可以帮我们批量处理文件


## BFF








