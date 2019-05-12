# 面试题库 - JS

https://juejin.im/post/5c9c3989e51d454e3a3902b6?utm_source=gold_browser_extension

能考的基本 https://github.com/Chalarangelo/30-seconds-of-code 这里都有。这里只是把一些常考的知识点梳理出来，并添加了一些应试知识点。


### 实现 `new` 操作符

分析: 就是考察对 `new` 操作符背后的原理(即实际都做了写什么工作)的理解。

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

### 实现 EventHub

```js

```

### 实现 Promise

```js


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

