# React


下面帮你整理一份前端面试中 React 最常见、最核心的面试题 + 简短高质量回答，按知识模块分类，适合快速准备面试。

⸻

✅ React 常见面试题（含简短回答）

⸻

一、React 核心概念

1. React 的核心理念是什么？

React 基于：
	•	声明式 UI：只描述“界面应该是什么样”，不关心如何操作 DOM。
	•	组件化：UI 拆分为可复用的组件。
	•	单向数据流：数据从父到子，减少状态复杂度。

⸻

2. Virtual DOM 是什么？为什么比直接操作 DOM 快？
	•	Virtual DOM 是 React 在内存中的 DOM 描述。
	•	更新时 React 通过 Diff 算法 找出最小变更，再去更新真实 DOM。

优势：
	•	批量更新、最小更新 → 性能更好。
	•	保证 UI 更新可预测、更好调试。

⸻

3. React 组件有哪些类型？
	•	函数组件（Function Component）：推荐使用，轻量，能用 hooks。
	•	类组件（Class Component）：旧写法，有生命周期方法。

现代开发推荐全部使用函数组件 + hooks。

⸻

二、Hooks 相关

4. useState 是如何工作的？
	•	组件每次渲染都会重新执行函数；
	•	React 根据“调用顺序”给每次 render 分配对应的 state；
	•	调用 setState 会触发组件重新渲染。

⸻

5. useEffect 的执行时机？
	•	不加依赖：每次 render 后都会执行（类似 componentDidMount + componentDidUpdate）。
	•	依赖为空 []：只在首次渲染后执行（componentDidMount）。
	•	依赖数组含变量：当依赖变化时执行。

清理函数 会在：
	•	下次 effect 执行前
	•	或组件卸载时执行（componentWillUnmount）

⸻

6. 为什么不能在条件语句中使用 hooks？

hooks 必须保持调用顺序一致。
条件中使用会导致下一次 render 顺序变化 → React 无法匹配对应的 state slot → 报错。

⸻

7. useMemo 和 useCallback 区别？
	•	useMemo：缓存计算结果
const value = useMemo(() => expensive(), [dep])
	•	useCallback：缓存函数
const fn = useCallback(() => doSomething(), [dep])

核心点：useCallback = useMemo(fn)，只是便于阅读。

⸻

8. useRef 的用途？
	•	获取 DOM
	•	存放跨 render 不变的变量
	•	保存上一次值
	•	避免某些情况下重新渲染（ref 改变不会触发 render）

⸻

三、渲染机制 与 性能优化

9. React 什么时候会重新渲染？

当满足以下任意条件：
	1.	父组件重新渲染
	2.	state 变化
	3.	context 变化
	4.	props 变化

实际 DOM 是否更新，要看 Diff 结果。

⸻

10. React 性能优化的方法？
	•	React.memo 避免子组件无意义重渲染
	•	useMemo / useCallback
	•	列表中正确使用 key（避免 index）
	•	减少组件层级，拆分组件
	•	使用 Suspense + lazy 分包
	•	虚拟滚动（react-window / tanstack-virtual）

⸻

四、状态管理

11. Context 会导致什么性能问题？

Context 更新会导致所有使用该 context 的子组件重渲染。

为减少重渲染：
	•	拆分 context
	•	使用 use-context-selector
	•	使用 Zustand、Jotai 等更精细的状态管理

⸻

12. Redux 和 Zustand 的区别？

对比	Redux	Zustand
思想	单一 store	多 store，模块化
使用	reducers / actions	就是函数，天然 hooks
复杂度	高	低
性能	需要手工优化	默认 fine-grained 订阅，性能更好


⸻

五、React Router

13. React Router 的工作原理？

核心是基于 history API 监听 URL 变化（pushState / replaceState），然后匹配对应的组件。

⸻

六、生命周期（类组件）

14. 类组件的生命周期？

挂载：
	•	constructor
	•	componentDidMount

更新：
	•	shouldComponentUpdate
	•	render
	•	componentDidUpdate

卸载：
	•	componentWillUnmount

现代面试偏向“用 hooks 描述生命周期”：

类组件生命周期	对应 Hook
componentDidMount	useEffect(() => {…}, [])
componentDidUpdate	useEffect(() => {…})
componentWillUnmount	useEffect 返回 cleanup


⸻

七、Diff 算法

15. React Diff 核心规则？
	1.	不同类型节点 → 直接替换整个节点
	2.	相同类型 → 只更新需要变化的属性
	3.	列表 diff 使用 key 提高性能

⸻

16. 为什么列表中不能用 index 作为 key？
	•	index 作为 key → 当数据变化时，React 会错误复用组件
	•	造成：
	•	输入框内容错乱
	•	动画错误
-状态混乱

除非列表完全不会增删，只渲染一次，可以用 index。

⸻

八、并发特性（Concurrent）

17. React 18 引入了什么？
	•	并发渲染（Concurrent Rendering）
	•	自动批处理（Automatic Batching）
	•	useTransition
	•	useDeferredValue
	•	Suspense 改进

⸻

18. useTransition 的用途？

用于把某些更新标记为非紧急更新，让 UI 更流畅。

⸻

九、SSR / Hydration

19. Hydration 是什么？

将服务端生成的 HTML + 客户端 JS 结合，使页面可交互。

如果 hydration 不一致会出现 hydration mismatch warning。

⸻

十、工程化/实践

20. React 为什么需要严格模式 StrictMode？

帮助找到：
	•	不安全生命周期
	•	副作用重复执行
	•	legacy API

不会影响生产环境行为。

⸻

🎯 如需更多内容，我可以继续扩展：
	•	我要不要给你来一份 React 高频 50 题完整版？
	•	或者你想要 适合大厂的“高难版” React 面试题？

## 大厂高难版

下面给你准备一份 真正大厂（字节/腾讯/阿里/Meta）常问的 React 高难版面试题 + 高质量短答，重点考察原理、性能、Concurrent Features、架构思维。

这些题能直接区分“一般前端”和“能进大厂前端”。

⸻

🚀 React 大厂高难版面试题（含简短回答）

⸻

🧵 一、渲染机制 / Scheduler / Fiber

⸻

1. React Fiber 架构的核心目的是什么？

核心：将渲染过程拆分成可中断、可恢复的小任务，实现可控调度。

具体目的：
	•	允许中断（interruptible）
	•	允许恢复（resumable）
	•	有优先级（priority-based）
	•	实现 Concurrent Rendering

⸻

2. Fiber 节点里保存了什么关键数据？
	•	组件对应的类型（tag）
	•	stateNode（实例）
	•	pendingProps / memoizedProps
	•	memoizedState
	•	return / child / sibling
	•	lanes（优先级）
	•	flags（副作用标记）

面试官喜欢追问：memoizedProps / pendingProps 区别？

pendingProps 是即将用于本次更新的 props
memoizedProps 是上一次更新之后缓存的 props

⸻

3. React Scheduler 如何决定优先级？

React 使用 lanes 模型（React 17+）根据事件来源分配优先级。

如：
	•	用户输入事件 → High priority
	•	页面渲染 → Normal priority
	•	transition → Low priority

调度器会使用 MessageChannel（微任务）或 postMessage 来实现 task 交替执行。

⸻

4. 为什么 React 18 的自动批处理能提升性能？它做了什么？

React 18 会自动批处理所有事件触发的 state 更新，而不是只在 React 事件中批处理。

例如网络请求回调、setTimeout 内的 setState 也会被批处理。

结果：
	•	渲染次数减少
	•	commit 变少 → 性能更好

⸻

🪝 二、Hooks 深度机制

⸻

5. React Hooks 是如何通过链表（或数组）保证顺序正确的？

每次 render，React 会按顺序读取 hook 调用，react 当前 fiber 上存有一个 hooks 链表。

执行顺序必须一致，否则：
	•	hook 顺序变化 → React 无法找到对应的 memoizedState → 崩溃。

⸻

6. useEffect 为什么会“异步执行”？它在哪个阶段执行？

useEffect 在 commit 阶段之后异步执行，不会阻塞 UI 渲染。

流程：
	•	render 阶段：创建 fiber
	•	commit 阶段：更新 DOM
	•	effect 阶段：执行 useEffect

⸻

7. useLayoutEffect 与 useEffect 的本质区别？

Hook	执行时机	典型场景
useLayoutEffect	commit 阶段同步执行（DOM 已更新，浏览器绘制前）	读取 DOM 尺寸/同步布局
useEffect	commit 后异步执行	网络请求、订阅

LayoutEffect 会阻塞浏览器绘制 → 注意性能。


useLayoutEffect 适用场景：避免闪烁。因为如果用 useEffect，DOM已经绘制了一版，再计算/修改DOM，会看到闪烁。而 useLayoutEffect 在绘制之前执行，可避免闪烁。


⸻

8. 为什么 useCallback 可能是“假的优化”？

因为 useCallback 本身也需要比较依赖数组，如果依赖变化频繁，那么每次都创建新函数 vs 直接创建新函数差不多。

是否需要 → 关键看子组件是否使用 React.memo。

⸻

♻️ 三、Reconciliation Diff 高阶

⸻

9. React Diff 什么时候能 O(n) 完成，什么时候变成 O(n^3)？

React 采用两条严重假设（也是优化）：
	1.	不同类型的节点 → 直接卸载 + 重建
	2.	同一层级只横向比较，不会跨层级移动

因此普通 Diff 是 O(n)。

但是如果：
	•	key 不稳定
	•	key 使用 index
	•	涉及大量删除/插入

会引发大量 unmount / mount → 实际成本接近 O(n² 或更高)。

⸻

10. 列表 key 的本质作用？

用于 “稳定映射” 让 React 知道：
	•	哪个旧节点对应哪个新节点
	•	哪些需要移动
	•	哪些要卸载 / 挂载

不是为了提高性能，而是为了保持组件状态一致。

⸻

🌐 四、Suspense / Concurrent Features 高阶

⸻

11. Suspense 是如何实现“等待异步数据”的？

关键依赖 throw promise 技术：

组件在 render 时如果需要数据未准备好，会：

throw promise

React 捕获该 promise → 暂停渲染 → 显示 fallback
数据准备好后 promise resolve → 触发重渲染。

⸻

12. useTransition 是如何保证 UI 不会卡顿的？

核心：更新被标记为 非 urgent。

流程：
	1.	用户输入时立即更新 “紧急 UI”（输入框值）
	2.	延迟更新“非紧急场景 UI”（例如大列表过滤）

React 在 fiber lanes 中为 transition 分配较低优先级 → 让紧急更新先执行。

⸻

13. 为什么 React Router v6 能与 Suspense 自动协作？

因为其 load 函数遇到 promise 会自动 throw，这与 Suspense 的机制天然兼容 → 让路由加载变成可 suspense 的。

⸻

🛠 五、状态管理原理（Redux / Zustand / Context）

⸻

14. Redux 中间件（middleware）是如何实现洋葱模型的？

通过 函数柯里化：

const middleware = store => next => action => { ... }

所有 middlewares 会按顺序包裹 next，形成类似 onion 的调用链。

⸻

15. Zustand 为什么性能优于 Context？

因为：
	•	Zustand “按需订阅”，组件只订阅被选择的 state 片段
	•	Context 更新会导致“所有消费 context 的子树一起更新”

Zustand 使用 proxy + selector → 将更新影响最小化。

⸻

🧩 六、架构与工程

⸻

16. React 为什么提出 Server Components？解决了什么？

解决：
	•	JS bundle 太大（减少客户端 JS）
	•	SEO
	•	数据获取复杂（RSC 允许直接在服务器读取 DB）
	•	组件可以无副作用执行（不会发送 network 请求）

核心：组件分为 client 和 server 两层，由 React 自动混合渲染。

⸻

17. React 为什么要移除 legacy context，而改成新的 context API？

legacy context 存在：
	•	隐式传递，非常难追踪
	•	破坏 shouldComponentUpdate
	•	内部实现与 Fiber 不兼容

新版 context：
	•	显式消费
	•	与 Fiber 一致
	•	性能和类型更可靠

⸻

🧨 七、真正高难（优秀候选人常被问爆）

⸻

18. React 如何解决函数组件每次 render 都重新执行导致的性能问题？

你可以从三个角度回答：
	1.	Hook state 存在 fiber，不在函数里
	2.	React.memo 可以缓存组件
	3.	useCallback / useMemo 可以缓存引用
	4.	Concurrent 模式可以延迟非紧急更新

⸻

19. React 为什么不能用 Proxy 做数据劫持（像 Vue3 一样）？

最常考！几乎所有大厂必问！

答案：
	1.	React 是 pull 模型（渲染时读取）
	2.	Vue 是 push 模型（数据变时主动通知）

React 不需要观察属性变化来触发 UI，而是：
	•	每次 setState -> render，会重新执行组件
	•	组件会读取最新数据

因此不需要 Proxy。

⸻

20. React setState 是同步还是异步？为什么？

React 18 后：
	•	渲染是异步可中断的
	•	setState 本质是同步入队 → 异步渲染

更精确回答：

setState “并不是异步”，只是 React 会延后执行渲染，使其看起来像异步。

⸻

📌 想继续提升吗？

我可以继续给你：

✔ 一份 大厂 React 高难模拟面试题（面试官提问 + 候选人回答）

✔ 一份 React 高频面试 coding 题（手写 fiber、useDebounce、usePrevious 等）

✔ 一份 30 分钟精炼版 React18 原理速学手册

你想要哪一个？




