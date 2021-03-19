# 面试题库 - JS

https://juejin.im/post/5c9c3989e51d454e3a3902b6?utm_source=gold_browser_extension

能考的基本 https://github.com/Chalarangelo/30-seconds-of-code 这里都有。这里只是把一些常考的知识点梳理出来，并添加了一些应试知识点。


### 实现 `new` 操作符

分析: 就是考察对 `new` 操作符背后的原理(即实际都做了些什么工作)的理解。

```js
function $new (Class) {
    var res = {
      __proto__: Class.prototype;
    };
    var ret = Class.apply(res, Array.prototype.slice.call(arguments, 1));
    return ret || res;
}
var me = $new(Persion, 'gavin');
// equals to
var me = new Persion('gavin');
```


### 深拷贝

```js
JSON.parse(JSON.stringify(obj));
```

```js

```

### 实现防抖和节流函数

```js
function debounce (func, ms) => { /* 30-seconds-of-code */ }
function throttle (func, wait, context) => { /* 30-seconds-of-code */ }
```

### input 搜索如何防抖，如何处理中文

切换中文输入法时首先会触发 `compositionstart`，然后没打一个拼音字母都会触发 `compositionupdate`，最后填入中文时触发 `compositionend`。



### 实现 EventHub

```js
class MyEventEmitter {
  constructor () {
    this._events = {}
  }

  on (type, handler) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    if (typeof handler === 'function') {
      this._events[type].push(handler)
    }
  }

  once (type, handler) {
    const fn = (...args) => {
      this.off(type, fn)
      handler(...args)
    }
    this.on(type, fn)
  }

  off (type, handler) {
    if (!this._events[type]) return
    const position = this._events[type].indexOf(handler)
    if (position !== -1) {
      this._events[type].splice(position, 1)
    }
    if (this._events[type].length === 0) {
      delete this._events[type]
    }
  }

  emit (type, ...args) {
    if (!this._events[type]) return
    for (let handler of this._events[type]) {
      handler(...args)
    }
  }
}
```

### 实现 Promise

```js
class Promise {
  static resolve () {

  }

  static reject () {

  }

  static all () {

  }

  static race () {

  }

  constructor (resolve, reject) {

  }

  then() {

  }

  catch () {

  }

  finally () {

  }
}
```

```js
class Promise {
  /** 返回第一个成功的，全部失败为失败 */
  static any (iterable) {
    let errCount = 0
    return new Promise(resolve, reject) {
      for (let it of iterable) {
        it
          .then(data => resolve(data))
          .catch(err => {
            errCount++
            if (errCount === iterable.length) reject(err)
          })
      }
    }
  }
}
```


## 正则

### 将 `"get-element-by-id"` 形式的字符串转换成小驼峰形式的字符串 `"getElementById"`

```js
str.replace(/-(\w)/g, (_, p) => p.toUpperCase())
```

### 校验手机号

```js
/^1[34578]\d{9}$/.test(phoneNumber)
```

### 解析 url 参数

分析: 这题用正则不合适, 但使用场景还是比较常见的。

```js
// 指定 key 不存在就返回空字符串, 没有提供 key 就返回完整的参数对象
function getUrlParam (key) {
  const query = {}
  location.search.substr(1).split('&').forEach(str => {
    const [key, value] = str.split('=')
    if (key) { query[key] = value }
  })
  return key ? query[key] || '' : query
}
```

### 贪婪量词与惰性量词

匹配过程及效率分析 https://blog.csdn.net/lxcnn/article/details/4756030

贪婪量词先判断整个字符串是不是一个匹配。如果没有发现匹配，它去掉最后字符串中的最后一个字符，并再次尝试匹配判断。

惰性量词先判断字符串中的第一个字母是不是一个匹配。如果仅仅这一个字符还不够，就读入下一个字符再次尝试匹配。

```js
str = "aa<div>test1</div>bb<div>test2</div>cc"
/<div>.*<\/div>/.exec(str)   // <div>test1</div>bb<div>test2</div>
/<div>.*?<\/div>/.exec(str)  // <div>test1</div>
```

### 如何优化正则表达式性能

* 减少回溯
* 更快失败
* 惰性模式转换为贪婪模式

```js
// 这两个正则看是效果差不多，但性能上有质的区别
/"[^"]*"@/
/".*"@/
```

### ES2018 RegExp 增强

https://github.com/tc39/proposals/blob/master/finished-proposals.md  
https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/


### 其他

```js
// 考察对 parseInt 参数的掌握情况
['10', '10', '10', '10'].map(parseInt)  // [10, NaN, 2, 3, 4]

// 考察数组默认的排序逻辑
[3, 15, 8, 29, 102, 22].sort()  // [102, 15, 22, 29, 3, 8]

// 花式创建数组，考察对数组实质的理解
var arr = {2: 2, 3: 3, length: 4, __proto__: Array.prototype}


```

```js
var a = {}, b = {key: 123}, c = {key: 456};
a[b] = 'b';  // b 不是 string 也不是 Symbol 就会转成 string
a[c] = 'c';  // 同 a['[object Object]']
console.log(a[b]);  // 'c'
```


`a.b.c.d` 和 `a['b']['c']['d']` 哪个性能更高？前者

ES6 代码转成 ES5 代码的思路：将 ES6 的代码转换为 AST 语法树，然后再将 ES6 AST 转为 ES5 AST，再将 AST 转为代码

#### 为什么 for 会比 forEach 性能高

for 循环没有任何额外的函数调用栈和上下文。forEach 函数签名是 `array.forEach(function(currentValue, index, arr), thisValue)`，执行时有诸多参数和上下文，这里可能拖慢性能。




## 其他

### array.sort() 使用的默认比较函数实现

```js
/* sort 默认的比较函数实现 */
function compare (a, b) {
  a = String(a);
  b = String(b);
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i++) {
    if (a[i] != b[i]) {
      return a.charCodeAt(i) - b.charCodeAt(i);  // 如果字符串直接相减，不是数字时就是 NaN
    }
  }
  return a.length - b.length;  // 比较时，值为 -1 a 在前，值为 1 则 b 在前
}
```

