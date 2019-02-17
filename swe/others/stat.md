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


