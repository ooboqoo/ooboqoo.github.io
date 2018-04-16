# Node.js


## 开发调试

https://nodejs.org/en/docs/guides/debugging-getting-started/

### 自动重启

NodeJS 开发监视用 nodemon 实际部署用 PM2：

```bash
$ npm i -g nodemon
$ nodemon dist/app.js    # app.js 文件有更新会自动重启
```

### 开启调试

通过添加 `--inspect` 选项以支持 chrome 调试，可以同时在 Chrome 界面完成前后端调试。

```bash
$ node --inspect app.js
$ node --inspect=9229 app.js  # 指定端口
$ node --inspect-brk app.js   # 启动并立即暂停在首行
```

### 调试客户端

#### Chrome

最简单的方法是，打开 `chrome://inspect` 进行调试，但配合 nodemon 使用时，进程重启后要重连比较麻烦。

还可以安装一个 NIM - Node Inspector Manager，可以自动检测 node 实例并开启调试窗口，很方便。

#### VS Code

在调试面板，点击设置图标以打开 `.vscode/launch.json` 进行配置。

```json
// 这个配置挺好用，改好文件，下断点，再 F5 开启调试
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Current File",
      "program": "${file}",
      "cwd": "${cwd}"
    }
  ]
}
```

### TypeScript 项目

一个 TypeScript 项目的具体调试步骤：

```bash
$ tsc -w                                 # 开启自动编译
$ nodemon -w dist --inspect dist/app.js  # 开启自动重启
```

### 性能分析

https://nodejs.org/en/docs/guides/simple-profiling/

```bash
$ node --prof app.js                                                   # 记录日志
$ node --prof-process <isolate-0xnnnnnnnnnnnn-v8>.log > processed.txt  # 生成报告
```


## 核心概念


[Node.js v6.x.x Documentation（官方文档）](https://nodejs.org/dist/latest-v6.x/docs/api/index.html)
- - -
node.js 里所有的模块是独立的，不需要命名空间隔离。

模块的分类：

- 核心模块：启动时自动加载；
- 文件模块：require()
- 第三方模块：require()

模块的流程：

创建模块 teacher.js  
导出模块：exports.add = function(){ }  
加载模块：var teacher = require('./teacher') // .js 可以省略  
使用模块：teacher.add('Scott')



一个文件就是一个模块，一个文件无法包含多个模块。

```js
console.log(123)

// 开启调试，实际看到的代码如下，也就是说 Node.js 会自动将我们的代码用一个函数包裹起来
(function (exports, require, module, __filename, __dirname) {
console.log(123)
});
```



### 事件循环

https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#header-timers

事件循环允许 Node.js 执行非阻塞 I/O 操作。尽管 JS 是单线程的，但实际的 I/O 操作由系统负责，而流行的内核都是多线程的。

下面是一张简化的事件循环示意图：

```txt
┌─>      timers       // 执行 setTimeout() 和 setInterval() 回调
|          |
│     I/O callbacks   // 执行除了关闭回调、定时器回调、setImmediate 回调之外几乎所有的回调
|          |
│     idle, prepare   // only used internally
|          |
│         poll  \  <───  incoming: connections, data, etc.
|          |     \--- // 轮询阶段，获取新的 I/O 事件
│        check        // 执行 setImmediate() 回调
|          |
└──  close callbacks  // 如 socket.on('close', ...)
```

每个阶段 phase 都有一个 FIFO 队列，当循环进入某个阶段时，会依次执行队列里的回调，直到执行完毕或者超出执行次数限制，就进入下一阶段。

每次事件循环，Node.js 都会检查它是否正在等待任何异步I/O或定时器，如果没有就会清理并退出。

#### 定时器阶段  timers

执行 `setTimeout()` 和 `setInterval()` 回调

#### I/O 回调阶段  I/O callbacks

本阶段处理 I/O 异常错误？？

#### 轮询阶段  poll

除了其他几个特定阶段的回调之外，任何异步方法完成时，都会将其回调加到 poll 队列。

The poll phase has two main functions:
  * Executing scripts for timers whose threshold has elapsed, then
  * Processing events in the poll queue.

#### 检查阶段  check

执行 `setImmediate()` 回调

#### 关闭事件回调阶段  close callbacks

本阶段处理各种 `close` 事件回调

#### setImmediate() vs setTimeout(fn, 0)

如果在入口模块同时注册，谁先执行是不确定的，但如果放到 I/O 回调里，那么可以确定 `setImmediate()` 会优先执行。

#### process.nextTick()

使用 `process.nextTick()` 可能带来潜在的风险，如非必要，推荐使用 `setImmediate()`。


## 禁止阻塞事件循环

Node has two types of threads: one Event Loop and k Workers. The Event Loop is responsible for JavaScript callbacks and non-blocking I/O, and a Worker executes tasks corresponding to C++ code that completes an asynchronous request, including blocking I/O and CPU-intensive work. Both types of threads work on no more than one activity at a time. If any callback or task takes a long time, the thread running it becomes blocked. If your application makes blocking callbacks or tasks, this can lead to degraded throughput (clients/second) at best, and complete denial of service at worst.

To write a high-throughput, more DoS-proof web server, you must ensure that on benign and on malicious input, neither your Event Loop nor your Workers will block.






### node.js 的作用域系统

在 JavaScript 中，是以函数作为作用域划分的基础的，而 Node 在此基础上加了一层“模块作用域”。
完全可以把“模块”看做是一个“闭包”，而 module.exports 就是模块提供给外部访问的接口，相当于在闭包内 return 了一个对象。

### Node 里的 this

全局环境的 this 指向 global；模块内的 this 指向 exports？？。

### exports 与 module.exports 的联系和区别

`exports` 指向 `module.exports`。

注意：如果将一个引用类型直接赋值给 `exports`，将切断其与 `module.exports` 之间的联系, 最终 `exports` 内容会被忽略。

```js
// 可以简单认为系统在所有模块前添加了一行
let exports = module.exports
```


### require 时发生了什么

被 require 的模块会执行一遍，最终返回一个 module.exports 对象。
require 是 Node 中少数几个同步 I/O 操作之一，所有同步调用都会阻塞 Node。

### require 模块时没有指明路径时的系统查找模块的步骤

是否核心模块 -> 当前目录下的 node_modules 目录 -> 父目录(...逐级向上直至根目录)下的 node_modules 目录 -> NODE_PATH 指定的目录

### 引用模块时可以是目录

如果模块是目录，在模块目录中定义模块的文件必须被命名为index.js，当然，也可以通过 package.json 文件修改 main 键来更改这一默认动作。

目前非常流行的一些 NPM 模块有：摘自 http://blog.jobbole.com/53736/

* express – Express.js,是一个简洁而灵活的 node.js Web应用框架, 并且已经是现在大多数 Node.js * 应用的标准框架，你已经可以在很多 Node.js 的书籍中看到它了。
* connect – Connect 是一个 Node.js 的 HTTP 服务拓展框架，提供一个高性能的“插件”集合，以中间件闻名，是 Express * 的基础部分之一。
* socket.io 和 sockjs – 目前服务端最流行的两个 websocket 组件。
* Jade – 流行的模板引擎之一，并且是 Express.js 的默认模板引擎。其灵感来源于 HAML。
* mongo 和 mongojs – 封装了 MongoDB 的的各种 API，不过笔者平常工作用的是 mongoose 也很推荐。
* redis – Redis 的客户端函数库.
* coffee-script – CoffeeScript 编译器，允许开发者使用 Coffee 来编写他们的 Node.js 程序。
* underscore (lodash, lazy) – 最流行的 JavaScript 工具库 , 用于 Node.js * 的封装包，以及两个采取略有不同的实现方法来获得更好性能的同行。
* forever – 可能是用来确保 node 脚本持续运行的最流行的工具。


<script>ooboqoo.contentsRegExp = /H[123]/;</script>
