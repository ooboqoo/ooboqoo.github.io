# Node.js API 摘要

https://nodejs.org/en/docs/


## Globals 全局对象

|||
|-------------------|------------------------------------------------------------------------------------------------
| global            | 全局命名空间对象，相当于浏览器中的 `window`。注：模块内顶层变量只在模块内有效
| module            | 对当前模块的引用，其中最为重要的 `modlue.exports` 定义了模块输出
| exports           | 指向 `module.exports` 的快捷方式，如更改 `exports` 指向，会导致与 `module.exports` 脱钩
| require()         | 用于引入模块
| require.resolve() | 返回模块的完整文件路径，不加载模块
| require.main      | 指向入口模块
| require.cache     | 模块在引入时会缓存到该对象。通过删除该对象的键值，下次调用 `require` 时会重新加载相应模块
| process           | 进程对象
| console           | 控制台
| Buffer            | 类，提供数据缓存相关功能
| __dirname         | [String] 当前执行脚本所在目录的目录名
| __filename        | [String] 当前所执行代码文件的完整绝对路径
|                   | `setTimeout(cb, ms)` `clearTimeout(t)` `setInterval(cb, ms)` `clearInterval(t)` `setImmediate(cb)`

```js
const refm = require('./testmodule.js');  // refm: requireExportedFromModule
console.log('require === refm: ', require === refm);         // false
console.log('resolve: ', require.resolve === refm.resolve);  // false
console.log('main: ', require.main === refm.main);           // true
console.log('cache: ', require.cache === refm.cache);        // true
// 结论：每个模块实例拥有独立的 require 变量，所有模块的 require.main 和 require.cache 的引用是相同的。 
```


## Process 进程

`process` 对象是一个全局对象，可以在任何地方访问到它。它是 `EventEmitter` 的一个实例。

|||
|--------------------|---------------------------------------------------------------------------------
| process.argv       | 一个包含命令行参数的数组，`garv[0]` 为 `process.execPath` 即 `node.exe` 的完整路径
| process.env        | 读取环境变量，这个对象是可写的，但是更改仅限于当前进程，不会实际写入系统配置文件
| process.argv0      | the original value of argv[0] passed when Node.js starts，正常都为 `'node'`
| process.cwd()      | 返回当前目录 string
| process.config     | 默认为编译 Node 时的配置，此对象可读写，可扩展或完整替换来存放自定义配置信息
| process.stdin      | 标准输入
| process.stdout     | 标准输出
| process.versions   | 包含 Node 和相关依赖的版本信息
| process.nextTick(cb[,...args]) | `setTimeout(fn, 0)` 类似，但执行时间更靠前，具体参看文档
| process.chdir(dir) | 切换工作目录


## Modules 模块

|||
|-------------|--------------------
| __dirname   | 
| __filename  | 
| exports     | 
| module      |
| require()   |

|||
|-------------------------------------|--------------------------------------------------------
| require.main                        | 指向入口模块 which file is run directly from Node.js
| require.cache                       |
| require.resolve(request[, options]) | 
| require.resolve.paths(request)      | 

|||
|--------------------|---------------
| module.children    | [Array] The module objects required by this one
| module.exports     | 
| module.filename    | [String] The fully resolved filename to the module
| module.id          | [String] The identifier for the module. Typically this is the fully resolved filename or '.'
| module.loaded      | [Boolean] Whether or not the module is done loading, or is in the process of loading
| module.parent      | [Object] The module that first required this one
| module.paths       | 
| module.require(id) | 

```js
require.main === module  // 判断一个文件是否是被直接执行
```


## Events 事件

|||
|-------------------------|-------------------------------
| Event: 'newListener'    | 添加新 listener 时触发该事件
| Event: 'removeListener' | 移除 listener 时触发该事件

|||
|----------------------------------|--------------------------------------
| EventEmitter.defaultMaxListeners | 默认为 `10`，可修改以影响所有 emitter 行为
| emitter.setMaxListeners(n)       | 修改单个 emitter 的 listener 数量限制，优先级高于默认值
| emitter.getMaxListeners()        | 获取当前 emitter 的 listener 数量限制设定
|||
| emitter.eventNames()            | 返回包含已注册监听的事件名称列表
| emitter.listeners(eventName)    | Returns a copy of the array of listeners for the event named eventName
| emitter.rawListeners(eventName) | including any wrappers (such as those created by `.once`)
| emitter.listenerCount(eventName)| 返回特定事件的监听器数量

|||
|------------------------------------------|--------------------------------------
| emitter.on(eventName, listener)          | 添加事件的 listener，同一个 listener 可重复添加并重复执行
| emitter.addListener(eventName, listener) | emitter.on 的别名
| emitter.prependListener(eventName, listener)     | 将 listener 插入到数组前面，即 unshift listener
| emitter.once(eventName, listener)                | 注册的 listener 只会被执行一次
| emitter.prependOnceListener(eventName, listener) | 只执行一次 + 前插入
|||
| emitter.removeListener(eventName, listener) | 移除 listener，当一个 listener 被重复注册时移除也要重复相同次数，移除项不影响当前 listener 的执行，即移除还没执行的 listener 这次还是会执行
| emitter.removeAllListeners([eventName])     | 移除([某事件的])全部监听器

|||
|------------------------------------|--------------------------------------
| emitter.emit(eventName[, ...args]) | 根据 listener 注册顺序同步逐项调用，有 listener 返回 true 无则返回 false

注：所有添加、删除 listener 的方法都返回 `EventEmitter` 以支持链式操作。  
注：最佳实践，始终注册 `'error'` 事件的监听器，否则会导致 Node.js 应错误而退出。

```js
const EventEmitter = require('events')  // EventEmitter === EventEmitter.EventEmitter  // true
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter()
myEmitter.on('event', () => console.log('an event occurred!'))
myEmitter.emit('event')
```


## Errors 异常



## Path 路径

本模块包含一套用于处理和转换文件路径的工具集。几乎所有的方法只做字符串变换，不会调用文件系统检查路径是否有效。

|||
|-----------------------------|------------------------------------------
| path.basename(path[, ext])  | 返回路径的最后部分
| path.dirname(path)          | 返回目录（即去掉最后部分）
| path.extname(path)          | 返回文件扩展名（带`.`）
| path.resolve([path[, ...]]) | 根据提供的多个路径或路径片段计算最终**绝对路径**
| path.normalize(path)        | 规范化路径字符串，主要用于去掉 `..` `.` 并规范 `\` `/`
| path.format(pathObject)     | 根据提供的 obj 输出格式化后的路径字符串
| path.parse(path)            | 根据提供的路径字符串返回解析后的 obj
| path.join([path[, ...]])    | 连接路径片段
| path.isAbsolute(path)       | 判断是否是绝对路径
| path.relative(from, to)     | 计算两个给定路径间的相对路径

```js
path.basename('C:\\temp\\myfile.html');  // On POSIX returns 'C:\temp\myfile.html'
                                         // On Windows returns 'myfile.html'
path.win32.basename('C:\\temp\\myfile.html');  // returns 'myfile.html'
path.posix.basename('/tmp/myfile.html');       // returns 'myfile.html'

path.basename('/foo/bar/quux.html')           // returns 'quux.html'
path.basename('/foo/bar/quux.html', '.html')  // returns 'quux'
path.dirname('/foo/bar/quux/')                // returns '/foo/bar'
path.join('/foo', 'bar', 'baz/asdf', '..')    // returns '/foo/bar/baz'         或 '\\foo\\bar\\baz'
path.normalize('/foo/bar//baz/asdf/quux/..')  // returns '/foo/bar/baz/asdf'    或 '\\foo\\bar\\baz\\asdf'
path.normalize('C:\\temp\\\\foo\\bar\\..\\'); // returns 'C:\\temp\\\\foo\\bar\\..\\' 或 'C:\\temp\\foo\\'
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
                                              // returns '../../impl/bbb' 或 '..\\..\\impl\\bbb'
path.resolve('/foo/bar', './baz')             // returns '/foo/bar/baz'   或 'D:\\foo\\bar\\baz'
path.resolve('/foo/bar', '/tmp/file/')        // returns '/tmp/file'      或 'D:\\tmp\\file'
```


## URL 网址

```txt
┌──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┐
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
注：合法 url 中不能包含 &lt; &gt; " ` \r \n \t { } | \ ^ ' 以及空格，要用则必须先转义
```

|||
|------------------------------|------------------------------------------
| url.format(urlObj)           | urlObj 可以是 Object 或 String，返回格式化后的 url 字符串。
| url.parse(urlString[, parseQueryString]) | 根据 URL 字符串，返回相应的 Url 对象。
| url.resolve(from, to)        | 解析路径

```js
url.parse('http://user:pass@host.com:8080/p/a/t/h?q1=str1&q2=str2#hash')  // returns:
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',             // 参见 http://www.ruanyifeng.com/blog/2011/03/url_hash.html
  search: '?q1=str1&q2=str2',
  query: 'q1=str1&q2=str2',  // 返回 字符串(默认) 或 经解析后的 query 对象（第二个可选参数设为 true）
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }

url.resolve('/one/two/three', 'four')  // returns '/one/two/four'
url.resolve('http://ex.com/', '/one')  // returns 'http://ex.com/one'
```


## Console 控制台

在 Node 的控制台输出带颜色文字的玩法：

```js
console.info('\x1b[32m%s\x1b[0m', `Listening to http://localhost:${port}`);
// 或借助第三方库
const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));
```

注1：这个仅适用于系统终端，浏览器中要用 `console.log('%c一些信息', 'color: red')`  
注2：具体终端颜色设置方法 http://misc.flogisoft.com/bash/tip_colors_and_formatting


## Utilities 实用工具

|||
|------------------------------|------------------------------------------
| util.promisify(original)     | 将一个异常优先的回调函数转换成 promise 版本的函数
| util.callbackify(original)   | 将 async 异步函数或 promise 版函数转换成异常优先的回调函数
| util.format(format[, ...args])    | 根据第一个参数，返回一个格式化字符串，类似 printf 的格式化输出
| util.inspect(obj[, options])      | 返回一个对象的字符串表现形式, 在代码调试的时候非常有用
| util.deprecate(function, string)  | 包装给定的 function 或类，并标记为废弃的

```js
util.format('%s:%d', 'count', 5, 'ex');  // 'count:5 ex'
```

|||
|------------------|------------------------------------------
| util.TextDecoder | |
| util.TextEncoder | ||

```js
const decoder = new TextDecoder('utf8');
let string = '';
let buffer;
while (buffer = getNextChunkSomehow()) {
  string += decoder.decode(buffer, {stream: true});
}
string += decoder.decode(); // end-of-stream
```


## Child Processes 子进程

child_process是node一个比较重要的模块，通过它可以实现创建多线程，来利用多核CPU。

这个模块提供了四个创建子进程的函数。

spawn、exec、execFile、fork。

spawn是最原始的创建子进程的函数，剩下的三个是对这个函数不同程度的封装。

spawn不支持回调函数。

fork只能执行js文件。例如fork('./child.js');

总结一下：当你想要从子进程返回大量数据时使用spawn，如果只是返回简单的状态信息，那么使用exec。

exec和execFile均支持回调函数。区别就是后者不用启动独立的shell，相对来说更加轻量级。我们拿execFile举例说明（打开存放在固定位置的bat文件，执行文件的命令行）（亲测通过）：

```js
const spawn = require( 'child_process' ).spawnSync;
const ls = spawn( 'ls', [ '-lh', '/usr' ] );

console.log( `stderr: ${ls.stderr.toString()}` );
console.log( `stdout: ${ls.stdout.toString()}` );
```


## Cluster 集群





<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>

<script>
// 定义目录生成级别
ooboqoo.contentsRegExp = /H[12]/;

;(function () {
  var list = document.querySelectorAll("td:first-Child");
  for (var i = 0, length = list.length; i < length; i++) {
    list[i].innerHTML = list[i].innerHTML.replace(/\(/, '(<span style="color: #669">')
                                         .replace(/\)/, '</span>)');
  }
})();
</script>