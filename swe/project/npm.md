# npm & Yarn & pnpm


npm                                       | Yarn
----------------------------------------- | -------------------------------------
`npm install`                             | `yarn install`
 (N/A)                                    | `yarn install --no-lockfile`
 (N/A)                                    | `yarn install --pure-lockfile`
 ||
`npm install [package]`                   | `yarn add [package / package@version / package@tag]`
`npm install --save-dev [package]`        | `yarn add [package] [--dev / -D]`
 (N/A)                                    | `yarn add [package] [--peer / -P]`
`npm install --save-optional [package]`   | `yarn add [package] [--optional/-O]`
`npm install --save-exact [package]`      | `yarn add [package] [--exact/-E]`
 (N/A)                                    | `yarn add [package] [--tilde/-T]`
 ||
`npm uninstall [package]`                 | (N/A)
`npm uninstall --save [package]`          | `yarn remove [package]`
`npm uninstall --save-dev [package]`      | `yarn remove [package]`
`npm uninstall --save-optional [package]` | `yarn remove [package]`
||
`npm install --global [package]`          | `yarn global add [package]`
||
`npm update [package]`                    | `yarn upgrade [package]`
||
`npm list`                                | `yarn list`
`npm outdated`                            | `yarn outdated`
`npm info <package>`                      | `yarn info <package>`
`npm bin`                                 | `yarn bin`
`npm cache clean`                         | `yarn cache clean`
||
`npx <package>`                           | `yarn <package>`

注：`yarn script-name` 相当于 `yarn run script-name`，`yarn` 相当于 `yarn install`


## pnpm

https://pnpm.io

安装

```bash
brew install pnpm
alias p=pnpm
```

管理依赖 Manage dependencies

```bash
# 添加依赖
pnpm add xxx@latest
  # -D --save-dev       Save to devDependencies
  # -O --save-optional  Save to optionalDependencies
  # -g --global         Install package globally

# 升级依赖
pnpm update / up / upgrade

# 删除依赖
pnpm remove / rm / uninstall / un
```

检查依赖 Review dependencies

```bash
pnpm list / ls
pnpm outdated
pnpm why
```

运行脚本 Run scripts

```bash
pnpm run / run-script
  # run 可省略 all scripts get aliased in as pnpm commands
pnpm [-r] exec xxx       Execute a shell command in scope of a project.
  # exec 可省略 optional when the command is not in conflict with a builtin pnpm command
pnpm dlx                 跟 npx 类似
  # Fetches a package without installing, and runs whatever default command binary it exposes
```

其他

```bash
pnpm info xxx  # 像 `npm home` 这些命令 pnpm 就不具备，所以还得配合 npm 使用
```

### Monorepo

https://pnpm.io/workspaces




## npm

```bash
$ npm install -g npm  # 更新 npm 自身
$ npm -v              # 查看 npm 版本
$ npm root -g         # 查看全局 node_modules 文件夹位置

# 查看软件包信息
$ npm view primeng versions | grep 2.0. # 查看软件包的版本信息
    # aliases: info, show, v
$ npm info vue versions  # 只查看 versions 详细信息
$ npm ls <pkg>  # 查看安装的软件包信息

# 软件包安装 - 不同方式安装
$ npm install --registry http://registry.cnpmjs.org angular-cli  # 单次指定源安装
$ npm install git+https://github.com/<repo-owner>/<repo>.git[#branch]
$ npm install git+ssh://git@github.com/<repo-owner>/<repo>.git[#branch]
$ npm install git://github.com/<repo-owner>/<repo>.git[#branch]

$ npm install               # 安装所有依赖包
$ npm install --production  # 只安装产品依赖
$ npm uninstall --save lodash  # 卸载软件包并从 package.json 中移除

# 软件包更新
$ npm list --depth=0        # 列出安装的软件包, 注意与 `git clone depth 1` 区分
$ npm outdated              # 列出过时的包
$ npm update                # 更新本地软件包
$ npm update --save-dev && npm update --save  # 更新本地包并将最新版本信息写入到 package.json
$ npm update --save-dev     # 仅更新 devDependencies 包并相应更新 package.json
$ npm update --save         # 更新 dependencies 和 devDependencies 包并更新 package.json
    # 如果没有先 --save-dev 就执行这条命令，会更新 devDependencies 下的包，然后版本信息会写到 dependencies 下

# 配置管理
$ npm config ls -l  # 查看所有设置项(含默认设置)
$ npm config get registry  # 查看源设置
$ npm config set registry https://registry.npm.taobao.org/  # 设置淘宝源
$ npm config set registry https://registry.npmjs.org/       # 还原默认源
$ npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ # 解决天朝 node-sass 安装报错
$ npm config set package-lock false  # 去掉烦人的 package-lock.json，也可单项目配置 package.json 中加 `"lock": false`
$ npm config set cache /e/npm-cache --global  # 这个文件日积月累会很大，不放 C 盘

# 缓存管理
$ npm cache clean  # 手动清理缓存

# 设置代理
$ npm config set proxy http://127.0.0.1:1080  # 通过代理安装
$ npm config delete proxy  # 删除代理，恢复直连模式

# 其他常用命令
$ npm home vue    # 打开项目主页
$ npm repo react  # 打开项目代码仓库
$ npm bugs react  # 打开项目 Issues 页

# CI 常用
$ npm ci    # 5.7提供，CI 中一般使用 `npm ci` 来替代 `npm install`
```

### `npm install` 详解

> `npm i` 对已安装包的处理原则：只要本地已经安装有符合要求的版本，就不更新。即，每次运行命令会先检查所有软件包版本，如果不符合要求就会重新安装符合要求的最新软件包，如果符合，就不会再安装一遍，即使存在更新版本的符合要求的软件包。

如果项目依赖特定版本，`npm i` 时会更新到相应版本，但如果操作过 `npm publish -f` 覆盖版本内容，`npm i` 不会去更新。

如果已经安装了 1.1.1，且带 `^` 依赖，如果有 1.1.2，`npm i` 时并不会更新

手动 `npm i <pkg>@<tag>` 时，即使使用过 `npm publish -f` 覆盖版本内容，也会重新安装



## Yarn

```bash
# 更换淘宝源
$ yarn confit get registry
$ yarn config set registry 'https://registry.npm.taobao.org'

# yarn create
$ yarn create react-app my-app --typescript
# 等效于
$ yarn global add create-react-app
$ create-react-app my-app --typescript
```



## 版本规范

Semantic versioning is a standard that a lot of projects use to communicate what kinds of changes are in this release. It's important to communicate what kinds of changes are in a release because sometimes those changes will break the code that depends on the package.

Angular versioning will then follow the MAJOR.MINOR.PATCH scheme as described by [semver](http://semver.org/spec/v2.0.0.html):

the *MAJOR* version gets incremented when incompatible API changes are made to stable APIs,   
the *MINOR* version gets incremented when backwards-compatible functionality are added,   
the *PATCH* version gets incremented when backwards-compatible bug are fixed.

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

**解决进度条显示 bug**

https://www.zhihu.com/question/54238202/answer/150468100

```bash
CHCP 65001   # 修改代码页编码改为 utf-8
```

### 安装

```bash
# macOS 下升级 yarn
$ brew upgrade yarn
```

推荐下载安装包安装，据说会自动设置 Path。我 `npm install yarn` 后费好大劲才找到 global 地址 `%USERPROFILE%\AppData\Local\Yarn\config\global\node_modules\.bin` 然后还得手动去设置 `PATH` 变量(设置完不用重启系统，重启终端即可)。



## npm 发包指南

```bash
$ npm publish  # 推送新版到仓库，version 取自 package.json 中的 version 字段
$ npm publish --tag dev  # 推送版本并添加 tag，如果 tag 已存在会更新到当前版本

# npm version [<newversion> | major | minor | patch | prerelease | ...]
# 更新版本号, npm version = 改 package.json + git commit + git tag, 但不会自动 push 和 publish
$ npm version patch  # 更新补丁版本号，package.json 中 version 的补丁版本号会递增
$ npm version patch -m "Upgrade to %s for reasons"  # 可自动递增版本
$ npm version 0.1.5 -m "Fixed a bug in X"           # 也可直接指定一个版本号

$ npm dist-tag add <pkg-name>@<version> <tag-name>  # 给已发布的版本添加 tag，该操作直接修改 registry

# npm unpublish [<@scope>/]<pkg>[@<version>]
$ npm unpublish <package-name> -f  # 从仓库删除整个包，在私有仓库这么干是OK的
```

https://www.jianshu.com/p/01df21c71407

> 发布和更新包要保证上传地址和下载地址是同一个仓库地址

写好的包往哪儿发，主要就两个地方：npm 仓库 和 公司内部搭建的私有仓库。

往哪个仓库发布包也叫做设置上传/发布地址。这个过程记录在 _package.json_ 文件中。

```js
{
  "publishConfig": {
    "registry": "http://npm.example.com"
  }
}
```

在 npm 官网注册账号获取 账户名 密码 和 邮箱，如果是私有仓库，让管理员直接给你账号信息。

发布包前，需要先登录，当然每次登陆比较麻烦，可以直接在 _.npmrc_ 文件中配好。

```bash
$ npm login
```

_.npmrc_

```txt
_auth="YWRtaW46YWRtaW4xMjM="   # 通过转 账户:密码 为 base64 得到 `btoa('admin:admin123')`
email=xxxx@qq.com
registry=http://npm.example.com
```

通过以上步骤，就可以发包了。这个过程可能是遇到问题最多的地方，如果失败了，检查下 _.npmrc_ 文件，看下 `registry` 设置跟自己要发布的目标仓库是否一致。

```bash
$ npm publish
```

更新包和发布包操作步骤类似，唯一的区别是要修改下 _package.json_ 中的 `version` 字段。

```bash
$ npm unpublish <pkgname>  # 撤销发布，需要在24小时内完成操作
$ npm deprecate <pkgname>  # 更好的一个做法，是声明遗弃
```

### .npmignore

使用 _.npmignore_ 文件，可在发包时屏蔽一些文件，但只要存在这个文件，原先 _.gitignore_ 的文件会被打包(如果没有 _.npmignore_ 文件时，_.gitignore_ 声明的文件是不会被打包的)，所以这个文件还是存在一定隐患的。最好的方法是采用白名单方式，即，在 _package.json_ 文件中通过 `files` 字段来显示声明发包时需要包含的文件。

```json
{
  "name": "my-pkg-name",
  "main": "./lib/index.js",
  "files": [
    "/lib"
  ]
}
```



## npm 私有仓库搭建

https://verdaccio.org/



