# NPM Script

http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html  阮一峰博客待阅读整理  
https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/  这篇文章更屌

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

* `;` (windows 用 `&`) 用来分隔一个命令行中多个无关联命令。`command1 & command2`
* `&&` 只有在符号 && 前面的命令成功时，才运行符号后面的命令。`command1 && command2`
* `||` 只有在符号 || 前面的命令失败时，才运行符号后面的命令。 `command1 || command2`

