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

## 调试

https://nodejs.org/api/debugger.html

NodeJS 开发监视用 nodemon 实际部署用 PM2：

```bash
$ npm i -g nodemon
$ tsc -w                 # 如果是 TypeScript 项目，则开启自动编译
$ nodemon dist/app.js    # app.js 文件有更新会自动重启
```

通过添加 `--inspect` 选项以支持 chrome 调试，可以同时在 Chrome 界面完成前后端调试。

Chrome 安装一个 NIM - Node Inspector Manager，可以自动检测 node 实例并开启调试窗口，很方便。

```bash
$ node --inspect app.js       # 
$ node --inspect=9229 app.js  # 指定端口
$ node --inspect-brk app.js   # 启动并立即暂停在首行
```

一个 TypeScript 项目的具体调试步骤：

```bash
$ tsc -w                                 # 开启自动编译
$ nodemon -w dist --inspect dist/app.js  # 开启自动重启
  # 到 Chrome 界面，NIM 会自动打开调试窗口开始调试
```

### node.js 的作用域系统
在 JavaScript 中，是以函数作为作用域划分的基础的，而 Node 在此基础上加了一层“模块作用域”。
完全可以把“模块”看做是一个“闭包”，而 module.exports 就是模块提供给外部访问的接口，相当于在闭包内 return 了一个对象。

### Node 里的 this
全局环境的 this 指向 global；模块内的 this 指向 exports。

### exports 与 module.exports 的联系和区别
exports 指向 module.exports。
注意，如果将一个引用类型直接赋值给 exports，将切断 exports 与 module.exports 之间的联系, 如果要保持这种联系，使用 module.exports = exports = oneObject
如果你创建了一个既有 exports 又有 module.exports 的模块，exports 将被忽略，因为模块只返回 module.exports

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

