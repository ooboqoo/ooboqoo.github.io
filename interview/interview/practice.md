# 面试题库 - 项目实战


## 性能调优

下面总结一份前端面试中常见的性能优化题目，附带高频提问方式 + 简短参考回答点。这些基本能覆盖 80% 面试官会问的内容。

⸻

🧩 一、浏览器渲染与页面性能

1. 浏览器渲染流程（Critical Rendering Path）？

考点： DOM → CSSOM → Render Tree → Layout → Paint → Composite
回答要点：
	•	JS 会阻塞 DOM 构建
	•	CSS 会阻塞 Render Tree
	•	关键渲染路径越短越好（减少 CSS/JS、减少重排重绘）

⸻

2. 什么是 Reflow（回流）和 Repaint（重绘）？如何减少？

回答要点：
	•	Reflow： 影响布局（最贵）
	•	Repaint： 影响外观
	•	避免频繁读取/写入 layout 属性（offsetHeight 等）
	•	使用 class 一次性变更样式
	•	使用 BFC、position: absolute、transform 避免影响周围

⸻

3. 你如何监控和定位页面卡顿？

来源：DevTools 面试常问
回答要点：
	•	Performance Panel → record
	•	FPS 低于 60
	•	找长任务（>50ms）
	•	使用 PerformanceObserver 监控 long task
	•	使用 Lighthouse 自动分析

⸻

🧩 二、JS 性能优化

4. 如何减少主线程压力？

回答要点：
	•	Web Workers
	•	OffscreenCanvas
	•	requestIdleCallback
	•	避免大 JSON parse（分块处理）

⸻

5. 事件节流与防抖（throttle、debounce）？什么时候用？

回答要点：
	•	debounce：停止输入后执行（搜索框）
	•	throttle：固定时间间隔执行（滚动事件）

⸻

6. 大数据列表渲染如何优化？

100% 高频题
回答要点：
	•	虚拟列表（react-window / react-virtual）
	•	懒加载
	•	分片渲染（requestIdleCallback, setTimeout 0）

⸻

7. 前端如何做大对象深拷贝且高性能？

可能问：为什么 JSON.parse(JSON.stringify()) 不可靠？
回答要点：
	•	不支持 function、symbol、循环引用
	•	可用结构化克隆（structuredClone）
	•	或使用 MessageChannel 方式

大对象深拷贝为什么会慢？主要开销来自：
1. 递归遍历：层级深、对象大时，递归会爆栈或造成大量函数调用。
2. 类型处理：常规实现需要判断几十种类型（对象、数组、Map、Set、Date、RegExp…）。
3. 循环引用处理：需要 WeakMap 做引用关系缓存。
4. 属性枚举成本：大量 key 时，性能会线性甚至超线性下降。

所以：深拷贝本质是 昂贵操作，优化目标是避免重复做 + 使用底层高效实现。


高性能深拷贝方案对比（从快到慢）

| 方法 | 性能 | 支持类型 | 是否安全 | 适用场景 |
|------|------|----------|----------|----------|
| `structuredClone()` (浏览器内置) | ⭐⭐⭐⭐⭐ 最快 | 全类型, 含 Map/Set/Blob/File 等 | 安全 | 前端最推荐 (Chrome 98+) |
| `JSON.parse(JSON.stringify())` | ⭐⭐⭐ | 仅基本类型 | 不支持函数/Map/Set... | 简单对象, 大多数场景够用 |
| `第三方库 lodash.cloneDeep` | ⭐⭐ | 几乎全类型 | 安全 | 大对象但兼容性要求大 |
| `手写递归` | ⭐ | 可自定义 | 稍慢且维护复杂 | 教学用, 不推荐生产 |


前端最佳方案：structuredClone（最快）
* 性能极强（C++ 实现，不是 JS）
* 支持循环引用
* 支持完整类型体系（Map、Set、ArrayBuffer、Date…）
* 注意：不拷贝函数（大部分场景这不是问题）


⸻

🧩 三、React/Vue 框架级性能优化

8. React 组件重渲染优化？

回答要点：
* memo, useMemo, useCallback
* 拆分组件，保证 props 稳定
* 虚拟列表
* 避免 context 大范围重渲染
* 使用 useSyncExternalStore（Zustand）

⸻

9. Vue 中 computed vs watch 用于性能优化？

回答要点：
	•	computed 有缓存
	•	watch 适合副作用
	•	大计算尽量用 computed 缓存

⸻

10. Diff 算法复杂度？什么情况最慢？

回答要点：
* 核：同层对比、key 优化
* 最慢场景：无 key / 使用 index key / 大量节点移动

⸻

🧩 四、网络性能优化（非常常问）

11. 首屏加载优化方案？

回答要点：
* HTTP/2 / HTTP/3
* 资源压缩（gzip、brotli）
* 图片懒加载（loading=“lazy”）
* CDN 缓存
* 代码分割（dynamic import）
* SSR / SSG / pre-render

⸻

12. 什么是 prefetch、preload？区别？

回答要点：
* preload： 当前页面必须、优先加载
* prefetch： 未来可能用，空闲时加载
* dns-prefetch：提前 DNS 解析
* preconnect：提前 TCP/TLS

⸻

13. 缓存策略（强缓存/协商缓存）？

回答要点：
	•	强缓存：Cache-Control: max-age
	•	协商缓存：ETag / Last-Modified
	•	可组合：immutable、stale-while-revalidate

⸻

14. 如何减少 Webpack/Vite 打包输出体积？

回答要点：
* tree-shaking
* 压缩 terser/esbuild
* 分包
* CDN external
* 代码分割
* 按需加载 UI 库

⸻

🧩 五、图片/资源优化

15. 图片优化方案？

回答要点：
	•	WebP、AVIF
	•	srcset x sizes
	•	lazy load
	•	SVG icon / iconfont
	•	使用 CSS sprite 减少请求（少问了但依旧有效）

⸻

16. 字体优化？

回答要点：
	•	font-display: swap
	•	子集化（subset）
	•	WOFF2

⸻

🧩 六、SSR/边缘计算性能

17. 为什么 SSR 更快？什么时候反而更慢？

回答要点：
	•	SSR 加快首屏（HTML 直接返回）
	•	但服务器压力大
	•	对大量交互的 CSR 更适合
	•	峰值时 SSR 可能更慢

⸻

18. CDN、边缘渲染（edge rendering）作用？

回答要点：
	•	缩短 RTT
	•	动态 SSR 在边缘执行，减少 TTFB
	•	常在 Vercel / Cloudflare Workers 上

⸻

🧩 七、综合性开放题

19. 如何优化一个 5s 才能加载完的页面？给一个 checklist？

（非常常问）
回答结构：网络 → 资源 → JS → 渲染 → 监控
例如：
* 资源压缩、lazy load
* 代码分割
* 缓存策略
* 虚拟列表
* 图片优化
* 长任务切片
* Lighthouse 分析
* 使用 CDN

⸻

20. 你怎么衡量前端性能？关键指标有哪些？

回答要点：
	•	FCP, LCP, CLS, TBT, INP
	•	Web Vitals API
	•	PerformanceObserver
	•	RUM（真实用户监控）

⸻






## 待整理

### 静态资源隔离

将静态文件放在主域名下，请求静态文件时都会带上 cookie 数据，浪费流浪、增加服务器对请求头的解析压力，导致整体请求时延增大。

### AJAX 解决浏览器缓存问题

```js
url += `refresh=${Date.now()}`
xhr.setRequestHeader('If-Modified-Since', '0')
xhr.setRequestHeader('Cache-Control', 'no-cache')
```

### 跨域

[/browser/#!web/cors.md](/browser/#!web/cors.md)

### 异步加载 JS 方法

(1) defer，只支持IE
(2) async：
(3) 创建script，插入到DOM中，加载完毕后callBack

### 优化指南

对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

### 优化之 DOMContentLoaded

首屏渲染

js 加载优化

样式加载优化
https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
如果 CSS 文件较大，您便需要确定和内嵌用于呈现首屏内容的 CSS，并暂缓加载其余样式，直到首屏内容显示出来为止。
内嵌较小 CSS 文件的示例
请勿内嵌较大数据 URI
请勿内嵌 CSS 属性






