# Node.js API 摘要

<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>

https://nodejs.org/dist/latest-v7.x/docs/api/globals.html

## Globals 全局对象

|||
|-------------------|------------------------------------------------------------------------------------------------
| global            | 全局命名空间对象，模块内顶层变量只在模块内有效，全局变量需要通过 global 对象添加（读取不影响）
| module            | 对当前模块的引用，其中最为重要的 `modlue.exports` 定义了模块输出
| exports           | 指向 `module.exports` 如果更改 `exports` 本身，会导致与 `module.exports` 的脱钩
| require()         | 用于引入模块
| require.resolve() | 不加载模块，只返回模块的完整文件路径
| require.main      | 指向入口模块
| require.cache     | 模块在引入时会缓存到该对象。通过删除该对象的键值，下次调用require时会重新加载相应模块。
| process           | 进程对象
| console           | 控制台
| Buffer            | 类，提供数据缓存相关功能
| __dirname         | [String] 当前执行脚本所在目录的目录名
| __filename        | [String] 当前所执行代码文件的完整绝对路径
|                   | setTimeout(cb, ms); clearTimeout(t); setInterval(cb, ms); clearInterval(t)

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
| process.argv       | 一个包含命令行参数的数组，garv[0] 为 process.execPath 即 node.exe 的完整路径
| process.argv0      | the original value of argv[0] passed when Node.js starts
| process.config     | 默认为编译 NodeJS 时的配置，此对象可读写，所以扩展或完整替换用来存放自定义配置信息很合适
| process.env        | 读取环境变量，这个对象是可写的，但是更改仅限于当前进程，不会实际写入系统配置文件
| process.stdin      | 标准输入
| process.stdout     | 标准输出
| process.versions   | 包含 NodeJS 和相关依赖的版本信息
| process.nextTick() | `setTimeout(fn, 0)` 类似，但执行时间更靠前，具体参看文档
| process.cwd()      | 返回当前目录 string
| process.chdir(dir) | 切换工作目录


## Path 路径

本模块包含一套用于处理和转换文件路径的工具集。几乎所有的方法只做字符串变换，不会调用文件系统检查路径是否有效。

|||
|-----------------------------|------------------------------------------
| path.basename(path[, ext])  | 返回路径的最后部分
| path.dirname(path)          | 返回目录（即去掉最后部分）
| path.extname(path)          | 返回文件扩展名（带`.`）
| path.format(pathObject)     | 根据提供的 obj 输出格式化后的路径字符串
| path.isAbsolute(path)       | 判断是否是绝对路径
| path.join([path[, ...]])    | 连接路径片段
| path.normalize(path)        | 规范化路径字符串
| path.parse(path)            | 根据提供的路径字符串返回解析后的 obj
| path.relative(from, to)     | 计算两个给定路径间的相对路径
| path.resolve([path[, ...]]) | 根据提供的路径或路径片段计算最终路径

```js
path.basename('C:\\temp\\myfile.html');  // On POSIX returns 'C:\temp\myfile.html'
                                         // On Windows returns 'myfile.html'
path.win32.basename('C:\\temp\\myfile.html');  // returns 'myfile.html'
path.posix.basename('/tmp/myfile.html');       // returns 'myfile.html'

path.basename('/foo/bar/quux.html')           // returns 'quux.html'
path.basename('/foo/bar/quux.html', '.html')  // returns 'quux'
path.dirname('/foo/bar/quux/')                // returns '/foo/bar'
path.join('/foo', 'bar', 'baz/asdf', '..')    // returns '/foo/bar/baz'               或 '\\foo\\bar\\baz'
path.normalize('/foo/bar//baz/asdf/quux/..')  // returns '/foo/bar/baz/asdf'          或 '\\foo\\bar\\baz\\asdf'
path.normalize('C:\\temp\\\\foo\\bar\\..\\'); // returns 'C:\\temp\\\\foo\\bar\\..\\' 或 'C:\\temp\\foo\\'
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
                                              // returns '../../impl/bbb' 或 '..\\..\\impl\\bbb'
path.resolve('/foo/bar', './baz')             // returns '/foo/bar/baz' 或 'D:\\foo\\bar\\baz'
path.resolve('/foo/bar', '/tmp/file/')        // returns '/tmp/file' 或 'D:\\tmp\\file'
```


## URL

```text
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

在 NodeJS 的控制台输出带颜色文字的玩法：

```js
console.info('\x1b[32m%s\x1b[0m', `Listening to http://localhost:${port}`);
```

注1：这个仅适用于系统终端，浏览器中要用 `console.log('%c一些信息', 'color: red')`   
注2：具体终端颜色设置方法 http://misc.flogisoft.com/bash/tip_colors_and_formatting

## Utilities 实用工具

|||
|------------------------------|------------------------------------------
| util.format(format[, ...])   | 根据第一个参数，返回一个格式化字符串，类似 printf 的格式化输出。
| util.inspect(obj[, options]) | 返回一个对象的字符串表现形式, 在代码调试的时候非常有用。

```js
util.format('%s:%d', 'count', 5, 'ex');  // 'count:5 ex'
```
