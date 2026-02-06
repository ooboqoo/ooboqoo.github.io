# JS 编码

## 60 道高频前端手写题

JavaScript 基础与手写（1–20）

1. 手写 deepClone（支持循环引用、Date、RegExp）。 — 用 Map 处理循环引用并按类型特殊处理。
2. 手写 Promise/实现一个简单的 then 链（状态机）。 — 实现三种状态、回调队列和微任务。
3. 手写 Promise.all / Promise.race / Promise.allSettled。 — 把非 Promise 值用 Promise.resolve 包装并统计完成情况。
4. 手写 async/await 的底层实现（用 generator + Promise）。 — 将 generator 结果递归推进成 Promise 链。
5. 手写 myBind / myCall / myApply。 — 处理 this 绑定、参数拼接、构造调用。
6. 实现 debounce（防抖）和 throttle（节流）并解释差别。 — 定时器与时间戳两种实现。
7. 手写 instanceof 和解释原理。 — 顺着 [[Prototype]] 链向上比较。
8. 手写 new 运算符的实现（myNew）。 — 创建对象、设置原型、执行构造函数、返回对象判断。
9. 实现一个 EventEmitter（订阅/发布/once/off）。 — 用对象映射事件到回调数组。
10. 手写 Object.create / Object.assign 的实现。 — 原型链创建与属性遍历拷贝。
11. 实现 flatten（多维数组扁平化，不限深度）。 — 递归或栈/迭代。
12. 实现 compose / pipe （函数组合）。 — reduce/reduceRight 串联函数执行。
13. 手写 Promise 的 finally，并说明其行为。 — 无论成功失败都执行，并传递原值/错误。
14. 实现 memoize（函数记忆化），并处理缓存键问题。 — 基于 Map/JSON/stringify 或 WeakMap。
15. 手写 LRU Cache（双向链表 + HashMap 或 Map 简化实现）。 — 保持插入顺序并淘汰最久未用。
16. 实现 throttle 的 leading/trailing 行为控制。 — 控制首次调用或尾随调用。
17. 实现 once（只执行一次）函数。 — 使用闭包记录执行状态。
18. 手写 Promise 并支持链式错误处理（catch）与 resolve/reject。 — 参考 A+ 规范简化版。
19. 实现 Array.prototype.map/filter/reduce 的 polyfill。 — 遍历索引、处理稀疏数组。
20. 实现 memoized 的深度比较（用于 React 性能优化）。 — 递归比较或浅比较视场景而定。

⸻

算法与数据结构（21–34）

21. 给定字符串，求最长无重复子串（滑动窗口）。 — 双指针 + 哈希表记录上次索引。
22. 两数之和（HashMap）。 — 一次遍历记录补数。
23. 链表反转（迭代 + 递归）。 — 指针重连。
24. 合并两个有序数组（原地/新数组）。 — 双指针。
25. 实现二分查找（迭代与递归）。 — 处理边界和上取/下取。
26. 判断二叉树是否为对称树（递归/迭代）。 — 镜像比较左右子树。
27. 实现快排（原地）。 — 分区与递归。
28. 给定数组求子数组最大和（Kadane）。 — 动态规划（线性）。
29. 括号生成/合法括号判断（回溯）。 — 计数约束或栈校验。
30. 合并区间（先排序）。 — 按起始值排序并合并重叠。
31. 最短路径（Dijkstra 简单版）或拓扑排序（有向无环图）。 — 图遍历常见题。
32. 滑动窗口最大值（双端队列）。 — 保持候选单调队列。
33. 实现 k 个最近最频繁元素（堆/Map+Bucket）。 — 使用小顶堆或桶排序思想。
34. 实现字符串匹配（KMP 简述或简单子串查找）。 — next 数组/前缀函数。

⸻

异步并发与网络（35–42）

35. 实现并发请求限制（比如同时最多 3 个请求）。 — 任务队列 + 活跃计数或 Promise 池。
36. 实现请求重试逻辑（指数退避）。 — 重试计数与延迟策略。
37. 实现带超时的 fetch（超时后取消/reject）。 — 使用 AbortController。
38. 实现 ajax 封装（支持 timeout、headers、方法、拦截器）。 — 基于 fetch 或 XMLHttpRequest。
39. 解释并实现一个简单的 SSE 或 WebSocket 客户端重连策略。 — 心跳 + 指数退避 + 断连检测。
40. 实现文件分片上传（断点续传思路）。 — 切片、hash、状态记录与合并。
41. 实现 rate limiter（令牌桶或漏桶模拟）。 — 控制访问速率与突发。
42. 用 JS 模拟 HTTP 缓存决策（Cache-Control/Etag/If-Modified-Since）。 — 本地缓存校验逻辑。

⸻

浏览器、DOM 与性能（43–50）

43. 实现图片懒加载（IntersectionObserver 与 fallback）。 — 观察进入视口才加载。
44. 手写 virtual DOM diff 的核心思路/伪代码。 — 节点类型、属性、子节点三步比较并打补丁。
45. 解释浏览器事件循环（call stack、microtasks、macrotasks）并写示例验证顺序。 — Promise.then 在 microtask。
46. 实现一个简单的 querySelectorAll（选择器解析简化版）。 — 递归 DOM 树并匹配选择器。
47. 优化长列表渲染（虚拟列表/窗口化实现）。 — 只渲染可见区域 DOM。
48. 实现一个简易的样式隔离（CSS-in-JS 思路或 Shadow DOM）。 — 动态 class 名/Scoped 样式或 ShadowRoot。
49. 页面性能诊断：手写首屏加载优化清单（关键资源、preload、critical CSS、懒加载）。 — 列出关键步骤与理由。
50. 手写 requestIdleCallback 的 polyfill 或模拟方案。 — 用 setTimeout + 时间预算判断。

⸻

React / 框架原理（51–57）

51. 实现 useState 的简化版本（hook 调度与 cursor）。 — 全局存储 + 光标索引。
52. 实现 useEffect 的简化（依赖比较与清理）。 — 保存上次 deps 并执行清理函数。
53. 写一个简易的 setState 批量合并实现（类组件行为）。 — 将更新入队并在同一事件循环批处理。
54. 实现一个最小化的 React-like 渲染器（createElement + render + diff）。 — vnode -> DOM 渲染，支持 props/children。
55. 实现组件的受控/非受控输入切换模式（React）。 — props/value 与 ref 的配合。
56. 实现一个简单的状态管理（类似 Redux 的 createStore）并支持中间件。 — dispatch、subscribe、reducer。
57. 解释 Fiber 的高层思想并手写一个任务分片调度示例。 — 将大任务切成小任务并在空闲时间执行。

⸻

TypeScript / 工程 / 安全（58–60）

58. 写常见的 TypeScript 高级类型题：实现 PartialDeep<T> 或 ReadonlyDeep<T>。 — 递归映射类型。
59. 前端构建优化题：如何把大型 SPA 拆分并实现按需加载（webpack/rollup/动态 import）。 — 路由拆分、chunk 分析、预加载。
60. 常见安全题：如何防止 XSS、CSRF，在前端做哪些防护？ — 内容转义、CSP、SameSite、token 策略。



## JS 基础

### 深拷贝 deepClone

对于业务开发，不要求全部类型，这个轻量版的实现可以处理 90% 的场景。

当前实现处理了：循环引用、Date、RegExp

后续可增强的方向
* 处理更多类型：Set Map ArrayBuffer ...
* 保留原型链：Object.create(Object.getPrototypeOf(obj))
* 处理不可枚举属性 & Symbol 属性
* 更严谨的遍历方式（Reflect.ownKeys + Object.getOwnPropertyDescriptors）

```js
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (let key of obj) {
    clone = deepClone(obj[key], map);
  }
  return clone;
}
```

### Promise.all

```js
fuction myAll(promices) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;                // 注意点：count
    promices.forEach((p, i) => {  // 注意点：i
      p.then(res => {
        result[i] = res;
        if (++count === promices.length) resolve(result);
      }).catch(reject);
    })
  })
}

```

### 防抖 debounce

```js
// 防抖，主要用于用户输入场景
function debounce(fn, delay = 200) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);  // `this` 值
  }
}
```

`this` 值如何确定
* If called as a method: obj.debouncedFn(), then this = obj
* If called standalone: debouncedFn(), then this = undefined (strict mode) or global/window (non-strict)

### 节流 throttle

分时间戳版、定时器版、双保险版（最常考，行为类似 `_.throttle`（这个还带配置 `options = { leading, trailing }`））

* 时间戳版，立即执行，适合场景：滚动、鼠标移动
* 定时器版，在 wait 时间结束才执行，适合场景：resize 结束后再计算布局

```js
// 时间戳版 - 事件开始时立即执行一次，闭包里记录上次执行时间
function throttle() {
  // 双保险版删掉后面的 else
}
```

```js
// 定时器版 - 不会立即执行，在 wait 时间结束时执行
function throttle() {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args)
    }, wait);
  }
}
```

```js
// 双保险版 - 事件开始时立即执行一次，后续事件 wait 尾执行
function throttle(fn, wait = 200) {
  let timer = null;
  let lastTime = 0;
  return function (...args) {
    // 立即执行
    if (Date.now() - lastTime >= wait) {
      lastTime = Date.now();
      fn.apply(this, args);
      // 尾部执行
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        lastTime = Date.now();
        fn.apply(this, args);
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
```

### instanceof

```js
function myInstanceOf(obj, Constructor) {
  let p = Object.getPrototypeOf(obj);
  while (p) {
    if (p === Constructor.prototype) return true;
    p = Object.getPrototypeOf(p);
  }
  return false;
}
```

### 中间件 compose

```js
// ChatGPT 提供，验证 OK
function compose(...fns) {
  return function (next) {
    return fns.reduceRight((n, fn) => fn(n), next);
  }
}
```

```js
function compose(...middlewares) {
  if (middlewares.length === 0) return next => next
  if (middlewares.length === 1) return middlewares[0]
  return middlewares.reduce((m, middleware) => next => m(middleware(next)))
}

function applyMiddleware (target, ...middlewares) {
  return compose(...middlewares)(target)
}

// 中间件的写法：接收一个被拦截函数，然后再返回一个新函数，这个新函数里包含了对被拦截函数的调用
const middleware1 = next => (...args) => {
  console.log('middleware1 before')
  const result = next(...args)
  console.log('middleware1 after')
  return result
}

const middleware2 = next => (...args) => {
  console.log('middleware2 before')
  const result = next(...args)
  console.log('middleware2 after')
  return result
}

let foo = (...args) => console.log(...args)

foo = applyMiddleware(foo, middleware1, middleware2)

foo(1, 2)

// middleware1 before
// middleware2 before
// 1 2
// middleware2 after
// middleware1 after
```

### EventEmitter

```js
class EventEmitter {
  _events = {}

  on(event, fn) {
    this._events[event] = this._events[event] || []
    this._events[event].push(fn)
  }
  off(event, fn) {
    this._events[event] = this._events[event]?.filter((f) => f !== fn) || []
  }
  emit(event, ...args) {
    this._events[event].forEach((fn) => fn(...args))
  }
}
```


## 异步与并发控制

```js
class ConcurrentLimiter {
  running = 0
  queue = []
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent
  }
  execute(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject })
      this._process()
    })
  }
  _process() {
    if (this.running >= this.maxConcurrent || !this.queue.length) return
    const { task, resolve, reject } = this.queue.shift()
    this.running++
    Promise.resolve(task())
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running--
        this._process()
      })
  }
}
```

## DOM & 浏览器相关

### 简化版 querySelectorAll

```js
function $$(selector) {
  return document.querySelectorAll(selector);
}
```

### 懒加载图片 LazyLoad

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const img = e.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```


## 算法

### 稳定排序

```js
// 两个要点：不改变原数组 + 如果两项一样，保持原有顺序
// 此处一个比较有参考意义的是 “双因子排序” 的用法
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({item, index}))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)  // “双因子排序” 写法
    .map(({item}) => item);
```

### 数组扁平化 flatten

```js
function flatten(arr, depth = 1) {
  return arr.reduce(
    (acc, val) => acc.concat(depth > 1 && Array.isArray(val) ? flatten(val, depth - 1) : val),
    []
  )
}
```

### 实现 LRU Cache

这段 LRU 的核心是利用了 ES6 Map 的插入有序性（insertion-ordered），让 Map 天然可以支持 LRU 的队列行为，实现 get/put 的 O(1)。

```js
class LRU {
  constructor(cap) {
    this.cap = cap;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    // 先删再 set，把 key 移到最后面
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.cap) {
      const first = this.map.keys().next().value;
      this.map.delete(first);
    }
  }
}
```


## React

### useDebounce

The useDebounce hook is useful for delaying the execution of functions or state updates until a specified time period has passed without any further changes to the input value.

```js
function useDebounce(value, delay) {
  const [v, setV] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setV(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return v;
}
```

### 简化版 useState

```js
let store = [];
let cursor = 0;

function useState(init) {
  const i = cursor;
  store[i] = store[i] ?? init;
  const set = val => void(store[i] = val);
  cursor++;
  return [store[i], set];
}
```

### 实现简单的虚拟 DOM diff（伪代码）

```js
function diff(oldNode, newNode) {
  if (!oldNode) {
    return { type: 'CREATE', newNode };
  }
  if (!newNode) {
    return { type: 'REMOVE' };
  }
  if (oldNode.type !== newNode.type) {
    return { type: 'REPLACE', newNode };
  }
  // 递归 diff children
}
```



## 网络与缓存

```js
async function fetchWithRetry(url, times = 3) {
  while (times--) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch {}
  }
  throw new Error('Failed after retries');
}
```










