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


