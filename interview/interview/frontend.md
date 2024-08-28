# 面试题库 - 前端基础


## HTML


## CSS

### CSS 盒模型

盒模型基本内容：content + padding + margin

标准模型 / IE模型
  * 标准模型(现代浏览器默认) `box-sizing: content-box;`
  * IE模型(<=IE6默认) `box-sizing: border-box;` IE模型宽高计算 padding+border 而标准模型不计入

JS如何设置、获取盒模型对应的宽和高
  * 内联样式的宽高，`dom.style.width`，返回值示例：`20px`，如果内联样式未定义则返回空字符串
  * 渲染后的计算宽高，`dom.currentStyle.width`，仅 IE 支持
  * 标准的获取渲染后宽高 `window.getComputedStyle(dom).width`，返回值示例：`20px`，IE9+支持
  * 获取相对于视口的位置信息  `dom.getBoundingClientRect().width`，返回值示例 `30`，IE9+支持

边距重叠
  * 父子元素的上下 `margin` 会合并，最终值取大者。左右 `margin` 不会合并。
  * 

BFC 和 IFC

常见的 Formatting Context 有：Block Formatting Context 块级格式化上下文 和 Inline Formatting Context 行内格式化上下文。

创建 BFC 的途径
  * `float` 不为 `none`
  * `positon` 不为 `static` 或 `relative`
  * `display` 设置为 `table` `table-cell`
  * `overflow` 不为 `visible`


### 伪类

https://github.com/yoowinsu/blog/issues/10

用过哪些伪类，一个 `:` 和 两个 `::` 的区别？


### DOM 事件

基本概念：DOM事件的级别

DOM标准定义的级别
  * DOM0 element.onclick=function() { }
  * DOM2 element.addEventListener('click', function() { }, false)
  * DOM3 element.addEventListener()

DOM事件模型

捕获+目标阶段+冒泡

DOM事件流

描述DOM事件捕获的具体流程

window -> document -> html -> body -> ... -> 目标元素 -> ... -> window

Event对象的常见应用

```js
event.preventDefault()
event.stopPropagation()
event.stopImmediatePropagation()
event.currentTarget
event.target
```

自定义事件

```js
var event = new Event('custom');  // 基本用法
event = new CustomEvent(typeArg: string, customEventInit: {detail: any});  // 更多控制
elem.addEventListener('custom', function () {
    console.log('custom');
});
elem.dispatchEvent(event);
```


## JS

### 原型链

```js
// new 运算符的工作原理
function new2(func) {
  var o = Object.create(func.prototype);
  var k = func.call(o);
  return typeof k === 'object' ? k : o;
}
```

### 类型转换

数据类型：`Boolean` `Null` `Undefined` `Number` `String` `Symbol` + `Object`

显式类型转换：
  * `Number()` `undefined` 转成 `NaN`，`null` 转成 `0`，空字符串转成 `0`  // 先调 `valueOf()` 再 `toString()`如果返回原始值就转换，如果都返回符合类型则报错
  * `String()` `undefined` 转成 `'undefined'`，`null` 转成 `'null'`
  * `Boolean()` 为 `false` 的情形 `undefined` `null` `-0` `+0` `NaN` `''`

隐私类型转换：
  * 四则运算
  * 判断语句
  * Native调用

练习示例：`[] + []` `{} + []` `({}) + []` `{} + {}` `true + true` `1 + {a: 1}`

`typeof` 结果：`null` 为 `'object'`

### 基础

```js
var length = 6
function fn () { console.log(this.length) }
var b = {
  length: 3,
  fn: function (fn) { fn(); arguments[0](); fn.call(b, 5) }
}
b.fn(fn, 10)
// 答案：6 2 3  解析：arguments[0]() 这个地方比较难理解些
```

### 数组

**如何判断数组类型**

```js
typeof arr;  // 输出 object，无法跟普通对象进行区分
arr instanceof Array;  // 如果有 iframe 可能失效，因为两个页面的 Array 是不一样的
Object.prototype.toString.call(arr)==='[object Array]';
```

**数组去重**

```js
const uniqueElements = arr => [...new Set(arr)];
```

**数组展开** `flatten(arr, depth = 1)`

```js
const flatten = arr => [].concat(...arr);
```

### 函数

**获取函数的参数列表**

```js
function getParamList(fn) {
  var res = fn.toString()
    .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '') // 
    .match(/\((.*?)\)/);
  if (res && res[1]) {
      return res[1].split(',').map(d => d.trim());
  }
  return [];
}
```

`call(key, ...args)`


## 移动端开发

**怎么做手机浏览器适配**


## 综合

### HTTP协议

HTTP协议的主要特点：简单快速、灵活、无连接、无状态

HTTP报文的组成部分：
  * 请求报文：请求行、请求头、空行、请求体
  * 响应报文：状态行、响应头、空行、响应体

HTTP方法
  * GET 获取资源
  * POST 传输资源
  * PUT 更新资源 - 更新整体记录
  * PATCH 更新资源 - 更新部分内容
  * DELETE 删除资源
  * HEAD 获得报文首部

POST和GET的区别
  * GET在浏览器回退时是无害的，而POST会再次提交请求
  * GET产生的URL地址可以被收藏，而POST不可以
  * GET请求会被浏览器主动缓存，而POST不会，除非手动设置
  * GET请求只能进行url编码，而POST支持多种编码方式
  * GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
  * GET请求在URL中传送的参数是有长度限制的，而POST没有限制
  * 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
  * GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
  * GET参数通过URL传递，POST放在Request body中

HTTP状态码
  * 1xx 指示信息 - 表示请求已接收，继续处理
  * 2xx 成功 - 表示请求已被成功接收
  * 3xx 重定向 - 要完成请求必须进行更进一步操作
  * 4xx 客户端错误 - 请求有语法错误或请求无法实现
  * 5xx 服务器错误 - 服务器未能实现合法的请求

持久连接

HTTP协议采用 "请求-应答" 模式，当使用普通模式，即非 Keep-Alive 模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接(HTTP协议为无连接的协议)。

当使用 Keep-Alive 模式(又称持久连接、连接重用)时，Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后续请求时，Keep-Alive 功能避免了建立或重新建立连接。

HTTP1.1 开始才支持持久连接。

管线化

普通持久连接：请求1->响应1->请求2->响应2->请求3->响应3
管线化：请求1->请求2->请求3->响应1->响应2->响应3

* 管线化机制通过持久连接完成，仅 HTTP/1.1 支持此技术
* 只有 GET 和 HEAD 请求可以进行管线化，POST 则有所限制
* 初次创建连接时不应启动管线机制，因为对方(服务器)不一定支持 HTTP/1.1 版本的协议
* 管线化不会影响响应到来的顺序
* HTTP/1.1要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，最低要求请求不失败即可
* 开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器默认并未开启管线化支持


## 实战

**调微信支付接口的步骤**





