# NPM &amp; Yarn

## NPM

```bash
$ npm install npm -g  # 更新 npm 自身
$ npm -v              # 查看 npm 版本

$ npm list --depth=0        # 列出安装的软件包
$ npm outdated              # 列出过时的包
$ npm update                # 更新本地软件包
$ npm update --save-dev && npm update --save  # 更新本地包并将最新版本信息写入到 package.json
$ npm update --save-dev     # 仅更新 devDependencies 包并相应更新 package.json
$ npm update --save         # 更新 dependencies 和 devDependencies 包并更新 package.json
    # 如果没有先 --save-dev 就执行这条命令，会更新 devDependencies 下的包，然后版本信息会写到 dependencies 下
$ npm install               # 安装所有依赖包
$ npm install --production  # 只安装产品依赖
$ npm uninstall --save lodash  # 卸载软件包并从 package.json 中移除
$ npm view primeng versions | grep 2.0. # 查看软件包的版本信息 aliases: info, show, v

$ npm install --registry http://registry.cnpmjs.org install angular-cli  # 单次指定源安装
$ npm install <githubname>/<githubrepo>[#<commit-ish>]  # 通过 GitHub 仓库安装，例：
$ npm install git+https://github.com/mishoo/UglifyJS2.git#harmony

$ npm config ls -l  # 查看所有设置项(含默认设置)
$ npm config get registry  # 查看源设置
$ npm config set registry https://registry.npm.taobao.org/  # 设置淘宝源
$ npm config set registry https://registry.npmjs.org/       # 还原默认源

# 直接通过 github 地址安装
$ npm install git+https://github.com/<repo-owner>/<repo>.git[#branch]
$ npm install git+ssh://git@github.com/<repo-owner>/<repo>.git[#branch]
$ npm install git://github.com/<repo-owner>/<repo>.git[#branch]

# 设置代理
$ npm config set proxy http://127.0.0.1:1080  # 通过代理安装
$ npm config delete proxy  # 删除代理，恢复直连模式
```


## 版本规范

Semantic versioning is a standard that a lot of projects use to communicate what kinds of changes are in this release. It's important to communicate what kinds of changes are in a release because sometimes those changes will break the code that depends on the package.

Angular versioning will then follow the MAJOR.MINOR.PATCH scheme as described by [semver](http://semver.org/spec/v2.0.0.html):

the MAJOR version gets incremented when incompatible API changes are made to stable APIs,   
the MINOR version gets incremented when backwards-compatible functionality are added,   
the PATCH version gets incremented when backwards-compatible bug are fixed.

#### Semver for publishers

If a project is going to be shared with others, it should start at 1.0.0, though some projects on npm don't follow this rule.

After this, changes should be handled as follows:

Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.1  
New features which don't break existing features: Minor release, increment the middle number, e.g. 1.1.0  
Changes which break backwards compatibility: Major release, increment the first number, e.g. 2.0.0

#### Semver for consumers

As a consumer, you can specify which kinds of updates your app can accept in the package.json file.

If you were starting with a package 1.0.4, this is how you would specify the ranges:

* Patch releases: 1.0 or 1.0.x or ~1.0.4
* Minor releases: 1 or 1.x or ^1.0.4
* Major releases: * or x


## npm 包配置详解

https://docs.npmjs.com/files/package.json

```js
// package.json (dependencies)
{
  "dependencies": {                        // @angular 为命名空间，详见 npm 介绍
    "@angular/common": "2.0.0-rc.4",       // 常用的服务、管道和指令
    "@angular/compiler": "2.0.0-rc.4",     // 模板编译器
    "@angular/core": "2.0.0-rc.4",         // 框架中关键的运行期部件
    "@angular/forms": "0.2.0",             // 表单
    "@angular/http": "2.0.0-rc.4",         // HTTP 客户端
    "@angular/platform-browser": "2.0.0-rc.4",  // 与 DOM 和浏览器相关的每样东西
    "@angular/platform-browser-dynamic": "2.0.0-rc.4",  // 提供一些提供商和 bootstrap 方法
    "@angular/router": "3.0.0-beta.1",          // 组件路由器
    "@angular/upgrade": "2.0.0-rc.4",           // 一组用于升级 Angular 1 应用的工具
    "systemjs": "0.19.27",          // 一个动态的模块加载器，兼容ES6模块规范，其他还有 webpack 等
    "core-js": "^2.4.0",            // 浏览器补丁，提供了 ES6 的很多基础特性，其他还有 es6-shim 等
    "reflect-metadata": "^0.1.3",   // NG2 和 TS 共享的 polyfill，提供 annotation metadata 支持
    "rxjs": "5.0.0-beta.6",         // 一个为 可观察对象 (Observable) 规范 提供的填充库，该规范已经提交给了 TC39 委员会
    "zone.js": "^0.6.12",           // Zone 规范的 polyfill，主要用于检测数据变更，该规范已经提交给了 TC39 委员会
    "angular2-in-memory-web-api": "0.0.14",    // 支持库，在开发阶段模拟一个远端服务器
    "bootstrap": "^3.3.6"                      // 一个广受欢迎的 HTML 和 CSS 框架
  },
  "devDependencies": {
    "concurrently": "^2.0.0",  // 一个用来同时运行多个 npm 命令的工具
    "lite-server": "^2.2.0",   // 一个轻量级、静态的服务器
    "typescript": "^1.8.10",   // TypeScript 语言的服务器，包含了编译器 tsc
    "typings": "^1.0.4"        // 一个“ TypeScript 定义”文件管理器
  }
}
```

### dependencies

该区下有三类包

* 特性 - 特性包为我们的应用程序提供了框架和工具方面的能力。
* 填充 Polyfills - 填充包弥合了不同浏览器上的 JavaScript 实现方面的差异。
* 其它辅助库 - 其它库对本应用提供支持，比如 bootstrap 包提供了 HTML 中的小部件和样式。

### devDependencies

该区的包会帮助我们开发应用程序。它们不用部署到产品环境的应用程序中——虽然这样做也没什么坏处。

### peerDependencies

我们的 package.json 文件中，并没有 peerDependencies 区。 但是 Angular 自己的 package.json 中有， 它对我们的应用程序有重要的影响。它解释了为什么我们要在 package.json 文件中加载这些填充库 polyfill 依赖包，以及为什么我们在自己的应用中会需要它们。

**平级依赖**，就是说某个包用了一个第三方包，该包要求与其协同的其他包都用那个第三方包的同一版本才能正常工作。

当 npm 安装那些在我们的 dependencies 区指定的包时，它会同时安装上在那些包的 dependencies 区所指定的那些包。这个安装过程是递归的。但 npm 不会安装列在 peerDependencies 区的那些包。

幸运的是，npm 会在下列情况下给我们警告：(a) 当任何 平级依赖 缺失时或 (b) 当应用程序或它的任何其他依赖安装了与 平级依赖 不同版本的包时。

这些警告是很关键的保护措施，以避免因为版本不匹配而导致的意外错误。它们让我们可以控制包和版本的解析过程。我们的责任是，把所有 平级依赖 包都列在我们自己的 devDependencies 中。

## 脚本详解

https://docs.npmjs.com/misc/scripts

可以编辑一些 npm 脚本，用来处理常用的开发任务。   
执行大多数 npm 脚本的方式都差不多： npm run 加脚本名，有些命令如 start 不需要 run 关键字。

```js
// package.json (scripts)
{
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "lite": "lite-server",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "typings": "typings"
  }
}
```

### Why npm Scripts?
https://css-tricks.com/why-npm-scripts/

> 主要的意义在于回归到命令行工具本身

我在大约 6个月之前开始使用 npm scripts。在这之前，我用的 Gulp，再早些是 Grunt，他们帮了我大忙，这些自动化工具很大地提升了我的工作效率。但是，我逐渐感觉到我在跟一大堆工具战斗，而不是专注于我的代码。

这些工具都有自己的一套独立语法以及特有的怪癖，这增加了学习和使用成本，更要命的是，这些工具都依赖各种插件，这些插件打包了命令行工具，这又增加了额外的一层抽象，并带来了更多的潜在问题。

如果你觉得现在的工具使用得很好，那么你大可不必将其换掉，只因为 npm scripts 变得流行了而将原先用得很好的工具换掉是没有意义的，因为我们真正所应该关心的是编程本身。如果你已经下定决心来试试 npm script，那么请往下阅读，这里有大量的示例，另外，我还精心准备了一个模板 [npm-build-boilerplate](https://github.com/damonbauer/npm-build-boilerplate) 方便你快速使用。

### npm-scripts

npm supports the "scripts" property of the package.json script, for the following scripts:

* prepublish: Run BEFORE the package is published. (Also run on local npm install without any arguments.)
* publish, postpublish: Run AFTER the package is published.
* preinstall: Run BEFORE the package is installed
* install, postinstall: Run AFTER the package is installed.
* preuninstall, uninstall: Run BEFORE the package is uninstalled.
* postuninstall: Run AFTER the package is uninstalled.
* preversion, version: Run BEFORE bump the package version.
* postversion: Run AFTER bump the package version.
* pretest, test, posttest: Run by the npm test command.
* prestop, stop, poststop: Run by the npm stop command.
* prestart, start, poststart: Run by the npm start command.
* prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.

Additionally, arbitrary scripts can be executed by running npm run-script <pkg> <stage>. Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript).

### npm-run-script

```
npm run-script <command> [-- <args>...]
alias: npm run
```

### 一条语句执行多个命令的写法

#### Linux

1. 通过使用';'分号执行多个命令，如 `#sync;sync;shutdown -h now`
2. 通过判断执行命令，`&&` `||`

#### Windows

* `&` 用来分隔一个命令行中的多个命令。`command1 & command2`
* `&&` 只有在符号 && 前面的命令成功时，才运行符号后面的命令。`command1 && command2`
* `||` 只有在符号 || 前面的命令失败时，才运行符号后面的命令。 `command1 || command2`


## Yarn

```bash
# 初始化项目
$ yarn init

# 添加一个依赖包
$ yarn add [package]@[version]
$ yarn add [package]@[tag]

# 更新依赖包
$ yarn upgrade [package]@[version]

# 删除依赖包
$ yarn remove [package]

# 安装所有依赖
$ yarn
$ yarn install
```

### NPM 及 Yarn 命令

https://yarnpkg.com/en/docs/migrating-from-npm

npm                                       | Yarn
----------------------------------------- | -------------------------------------
`npm install`                             | `yarn install`
 (N/A)                                    | `yarn install --flat`
 (N/A)                                    | `yarn install --har`
 (N/A)                                    | `yarn install --no-lockfile`
 (N/A)                                    | `yarn install --pure-lockfile`
`npm install [package]`                   | (N/A)
`npm install --save [package]`            | `yarn add [package]`
`npm install --save-dev [package]`        | `yarn add [package] [--dev/-D]`
 (N/A)                                    | `yarn add [package] [--peer/-P]`
`npm install --save-optional [package]`   | `yarn add [package] [--optional/-O]`
`npm install --save-exact [package]`      | `yarn add [package] [--exact/-E]`
 (N/A)                                    | `yarn add [package] [--tilde/-T]`
`npm install --global [package]`          | `yarn global add [package]`
`npm rebuild`                             | `yarn install --force`
`npm uninstall [package]`                 | (N/A)
`npm uninstall --save [package]`          | `yarn remove [package]`
`npm uninstall --save-dev [package]`      | `yarn remove [package]`
`npm uninstall --save-optional [package]` | `yarn remove [package]`
`npm cache clean`                         | `yarn cache clean`
`rm -rf node_modules && npm install`      | `yarn upgrade`

推荐下载安装包安装，据说会自动设置 Path。我 `npm install yarn` 后费好大劲才找到 global 地址 `%USERPROFILE%\AppData\Local\Yarn\config\global\node_modules\.bin` 然后还得手动去设置 `PATH` 变量(设置完不用重启系统，重启终端即可)。



