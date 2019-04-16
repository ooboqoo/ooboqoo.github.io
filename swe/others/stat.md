# 页面日志采集

[阿里巴巴日志采集体系之浏览器的页面日志采集](https://dt.alibaba.com/page6.htm?acm=lb-zebra-227580-1867803.1003.4.1605791&scm=1003.4.lb-zebra-227580-1867803.OTHER_14921219432750_1605791)


## 总体设计

http://www.woshipm.com/pmd/1794000.html

### 埋点方式

http://www.woshipm.com/pmd/751876.html

1. 手动埋点
2. 半自动埋点
3. 全自动埋点

### 方案设计

1. 错误信息搜集(自动+手动)
2. 用户信息搜集
    2.1. 点击行为(半自动 + 手动)
    2.2. 页面跳转(手动)


## logger 模块

```js
function log (msg) {
  if (MODE !== 'production') {
    console.log('[Logger in DEV mode]\n', msg)
  } else {
    // todo
  }
}
```


## 错误上报

```js
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
window.addEventListener('error', function (err) {
  log('[Error] ' + JSON.stringify({message: error.message, stack: error.stack}))
})

// https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection
window.addEventListener('unhandledrejection', function (exp) {
  // todo
})

Vue.config.errorHandler = function (err, vm, info) {
  // todo
}
```

```js
// 测试错误信息转换
function testit () {
  const foo = () => {
    console.log(dsfsdfdsfdsffd)
  }
  const bar = () => {
    return foo()
  }
  try {
    bar()
  } catch (error) {
    return JSON.stringify({message: error.message, stack: error.stack})
  }
}
```


## 埋点

### 利用 HTML 半自动埋点

```html
<button data-stat="prop1:any;prop2:any">上报信息</button>

<script>
  window.addEventListener('click', function (evt) {
    const elem = evt.target
    if (elem.dataset && elem.dataset.stat) {
      // 上报埋点信息
      const msg = {action: 'click'}
      Object.assign(msg, transStatMessage(elem.dataset.stat))
      log(msg)
    }
  })

  function transStatMessage (str) {
    if (!str) { return }
    const msg = {}
    str.split(';').forEach(entry => {
      entry = it.split(':').map( it => it.trim())
      if (entry.length === 2) {
        msg[entry[0]] = entry[1]
      }
    })
    return msg
  }
</script>
```

### 利用 JS 手动埋点

```js

```

### 利用 CSS 手动埋点

https://github.com/jbtronics/CrookedStyleSheets/blob/master/README.md

除了使用JS代码追踪用户，现在有人提出还可以使用CSS。@ruanyf 觉得这种方法更优雅，代码量更少，用户还没法禁掉。

```css
#link2:active::after {
  content: url("track.php?action=link2_clicked");
}
```


## 数据上传

### 页面关闭前统一返回数据

http://www.ruanyifeng.com/blog/2019/04/user-tracking.html

#### AJAX

数据发回服务器的常见做法是，将收集好的用户数据，放在 `unload` 事件里面，用 AJAX 请求发回服务器。但是，异步 AJAX 在 unload 事件里面不一定能成功，因为网页已经处于卸载中，浏览器可能发送，也可能不发送。有几种解决的方案：
  * 改成同步 AJAX 请求。这种方法最大的问题在于，浏览器逐步将不允许在主线程上面，使用同步 AJAX。
  * unload 事件里面，必须有一些很耗时的同步操作。这样就能留出足够的时间，保证异步 AJAX 能够发送成功。
  * setTimeout 延迟页面卸载以保证异步请求发送成功。

#### 反弹追踪

所谓"反弹追踪"，就是网页跳转时，先跳到一个或多个中间网址，以便收集信息，然后再跳转到原来的目标网址。谷歌和百度现在都是这样做，点击搜索结果时，会反弹多次，才跳到目标网址。

```html
<a id="target" href="https://baidu.com">click</a>
<script>
  const theLink = document.getElementById('target');
  theLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/jump?url=' + 
      encodeURIComponent(theLink.getAttribute('href'));
  });
</script>
```

#### Beacon API

上面这些做法，都会延缓网页卸载，严重影响用户体验。

为了解决网页卸载时，异步请求无法成功的问题，浏览器特别实现了一个 Beacon API，允许异步请求脱离当前主线程，放到浏览器进程里面发出，这样可以保证一定能发出。

```js
window.addEventListener('unload', function (event) {
  navigator.sendBeacon('/log', 'foo=bar')
})
```

上面代码中，navigator.sendBeacon()方法可以保证，异步请求一定会发出。第一个参数是请求的网址，第二个参数是发送的数据。

