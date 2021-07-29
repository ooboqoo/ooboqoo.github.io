# Node.js API 摘要 Part2

## Async hooks

[一文了解AsyncHooks](https://bytedance.feishu.cn/docs/doccnW1He3XzC3ikyRxypFr50Qc)

[async_hooks](https://nodejs.org/api/async_hooks.html) 提供了用于追踪异步资源的API。

### 为什么要追踪异步资源

场景1

问题：我们如何从日志中确认:
1. 哪个 callback 是 a.txt 的哪个是 b.txt 的
2. a.txt 的 callback 先执行还是 a.txt 的先执行

```js
const fs = require('fs');
function callback(err, data) {
  console.log('callback', data);
}
fs.readFile('a.txt', callback);
fs.readFile('b.txt', callback);
```

场景2

异步回调抛出异常，确拿不到完整的调用栈

```js
function main() {
  setTimeout(() => {
    throw new Error('err');
  }, 0)
}
main();

// Error: err
//     at Timeout._onTimeout (/Users/gavin/dev/play.js:3:11)
//     at listOnTimeout (internal/timers.js:557:17)
//     at processTimers (internal/timers.js:500:7)
```








