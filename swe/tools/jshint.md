# JSHint

## 配置 Configuration

有三种配置途径：

* 命令行通过 `--config` 标记配置;
* 使用配置文件 `.jshintrc`，JSHint 会在当前目录查找，找不到会逐级向上查找此文件;
* 将配置信息插入到项目配置文件 `package.json` 下的  `jshintConfig` 属性内.

配置文件采用 JSON 格式。

```js
{
  "undef": true,
  "unused": true,
  "predef": [ "MY_GLOBAL" ],    // 这种全局变量设定方式貌似 deprecated 了，不同环境下 jshint 行为不一致
  "globals": {"window": true, "angular": true }  // 用这种方式替换一切工作正常
}
```

### 内嵌配置 Inline configuration

除了在配置文件中设置配置外，你还可以在代码文件中嵌入配置，针对文件进行设置。

配置信息置于注释内，以 `jshint` `globals` 开头，项目间以 `,` 分隔。

```js
/* jshint undef: true, unused: true */
/* globals MY_GLOBAL */
// jshint ignore:line
```

可以使用单行或多行注释。设置是跟函数作用域相匹配的，在一个函数内的设置不会影响其他函数。

## 指令 Directives

JSHint 支持以下配置指令：

#### jshint

用于设置 JSHint 配置项。

```js
/* jshint strict: true */
```

#### jslint

用于设置 JSHint-compatible JSLint 选项。

```js
/* jslint vars: true */
```

#### globals

设置 JSHint 全局变量，与 `undef` 配置项联合使用。

```js
/* globals MY_LIB: false */
```

在变量前加 `-` 表示禁用该全局变量。

```js
/* globals -BAD_LIB */
```

#### exported

表示导出的全局变量，与 `unused` 配置项联合使用。

```js
/* exported EXPORTED_LIB */
```

#### ignore

设置检查时跳过特定代码块。

```js
// Code here will be linted with JSHint.
/* jshint ignore:start */
// Code here will be ignored by JSHint.
/* jshint ignore:end */
```

在 `ignore:start` 与 `ignore:end` 之间的代码会被忽略，另外还可以使用尾注释忽略单行代码：

```js
ignoreThis(); // jshint ignore:line
```

## 选项 Options

JSHint 有两类设置项：enforcing 和 relaxing，前者使检查更严格，而后者则使检查更宽松。

### 加严项 Enforcing options
<style>td:first-child { color: red; } </style>

当将这些选项设置为 true 时，将产生更多警告。

Property | Description
-------- | -----------
bitwise  | 禁用位运算符，& 很可能是 && 漏写了一个 &
curly    | 必须使用花括号，JS 默认单语句的条件或循环可以省略大括号
eqeqeq   | 强制使用全等，禁用 == 或 !=
esversion| 指定 ES 版本，可选值 3 5 6，替换原 es3 es5 配置项
forin    | 要求在 for 循环中过滤继承项，obj.hasOwnProperty()
freeze   | 禁止覆盖原生对象原型，如 Array Date 等
funcscope| 使用函数作用域而不用块作用域，会忽略此类警告：使用在控制块内定义的变量
futurehostile | 使用未来版本中使用的关键字(identifiers)时给出警告
globals  | true：全局变量可读写 false：全局变量只读；在内嵌配置中用于指定 全局变量 名单
iterator | 使用 `__iterator__` 属性时会给出警告，因为没有浏览器实现该属性
latedef  | 禁止在变量声明之前使用变量
maxcomplexity | 设置允许的最大圈复杂度
maxdepth | 设置最深的嵌套层级
maxerr   | 设置最大的报错数量，超出就不用继续向下检查，默认 50
maxparams| 允许的最大参数数量
maxstatements | 单个函数中的最大语句数量
noarg    | 禁用 `arguments.caller` 和 `arguments.callee`。使用这些项目使得很多优化无法实现。
nocomma  | 禁用 `,` 运算符
nonbsp   | 输入了强制占位空格时会给出警告
nonew    | 避免将构造函数作为普通函数使用的用法
predef   | 以数组的形式设定全局/环境变量，加 `-` 用于去除变量设定，另，该项无法在内嵌设置中使用
quotmark | 关于使用引号风格的选择，将在下一大版本中移除，true 统一引号使用 single 只能用单引号 double 只能用双引号
shadow   | 允许覆盖/重定义 outer scope 变量
singleGroups  | 禁用非必要的 `()`，滥用反而导致理解困难，如 delete(obj.attr);
strict   | 设定严格模式 "global" 要求设置全局声明 "implied" 默认为启用 false 关闭提醒 true 要求设置函数级声明
undef    | 所有变量都不必须声明，全局变量用 globals 声明
unused   | 对声明了但没有使用的变量给出警告
varstmt  | 禁止使用 `var` 声明变量

注：涉及到代码风格的选项将在下一大版本中移除，因此多数未包含在此表中。

### 放宽项 Relaxing options

当将这些选项设置为 true 时，将屏蔽此类警告。

Property | Description
-------- | -----------
asi      | 允许不用 `;`
boss     | 允许在该出现比较的地方进行赋值，如 `if (a = 10) {}`
debug    | 允许使用 `debugger` 语句
elision  | 告诉 JSHint 代码用的是 ES3 array elision elements, or empty elements，如 [1, , , 4, , , 7]
eqnull   | 允许使用 `== null` 这样可以兼容 null 与 undefined
evil     | 允许使用 `eval`，但这样将使得代码更加脆弱
expr     | 在本该出现赋值或函数调用的地方使用表达式，大多数情况下这可能是输入错误
lastsemic| 允许最后一个语句省略 `;`
loopfunc | 允许在循环中定义函数。循环中定义函数很可能出错，具体见示例1
noyield  | 允许没有 yield 语句的 generator 函数
plusplus | 该选项禁止使用 `++` `--` 这两个一元操作符
proto    | 允许使用 `__proto__` 属性
scripturl| 允许使用 script-targeted URLs，如 `javascript:...`
supernew | 允许使用罕见的 new 结构，如 `new Function() { }` `new Object;`
validthis| 允许在非构造函数内使用 `this`，此项仅适用于在函数内部的内嵌注释
withstmt | 允许使用 with 语句

示例1 - 循环中定义函数很可能出错：
```js
var nums = [];
for (var i = 0; i < 10; i++) {
  nums[i] = function (j) { return i + j; };
}
nums[0](2); // Prints 12 instead of 2
// 解决方案 - 立即执行函数
for (var i = 0; i < 10; i++) {
  (function (i) { nums[i] = function (j) { return i + j; }; }(i));
}
```

### 环境设置 Environments

这些选项告诉 JSHint 环境中的有效全局变量。

Property | Description
-------- | -----------
browser  | 定义浏览器环境，所以 `document` `navigator` `FileReader` 等都是有效的全局变量
devel    | 定义开发环境，`console` `alert` 等就可以愉快地使用了
worker   | 定义 Web Workers 工作环境
module   | 定义 ES6 模块支持
typed    | 定义 ES6 二进制数组支持
nonstandard   | 定义非标准但广泛使用的全局变量，如 `escape` `unescape`
browserify    | 定义 Browserify 环境
node     | 定义 Node.js 运行环境
phantom  | 定义 PhantomJS 运行环境，PhantomJS 是基于 WebKit 的服务器端 JavaScript API，可以用于页面自动化，网络监测，网页截屏，及无界面测试等。
rhino    | 定义 Rhino 运行环境，Rhino 是 JavaScript 的一种基于 Java 的开源实现
couch    | 定义 CouchDB 环境，CouchDB 是一个面向对象的数据库
dojo     | 定义 Dojo Toolkit 环境，Dojo 是一个用 javascript 实现的开源 DHTML 工具包。
jasmine  | Jasmine 测试框架
mocha    | Mocha 测试框架
qunit    | QUnit 测试框架
jquery   | jQuery 框架
mootools | MooTools 框架
prototypejs   | Prototype 框架
yui      | YUI 框架
shelljs  | ShellJS 基于 Node.js 的 Unix shell 实现，用于替代 bash 脚本编程
wsh      | Windows Script Host，微软的代替批处理文件的脚本环境，默认用 JavaScript 语言


