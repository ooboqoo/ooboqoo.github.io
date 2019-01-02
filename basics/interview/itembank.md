# 前端题库

## HTML



## CSS

https://github.com/yoowinsu/blog/issues/10

用过哪些伪类，一个 `:` 和 两个 `::` 的区别？


## JS

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

**HTTP 协议**


## 实战

**跨域问题**


**调微信支付接口的步骤**





