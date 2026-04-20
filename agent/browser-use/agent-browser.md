# Agent Browser

* https://github.com/vercel-labs/agent-browser
* https://github.com/browser-use/browser-use


## Accessibility Tree 无障碍树

### 获取 AX Tree

#### Chrome DevTools 查看

Elements 面板下 Accessibility 子面板开启「Enable full-page accessibility tree」选项，然后右上角会出个小人按钮，点了就能从 「DOM Tree View」切换到「AX Tree View」了。

#### Playwright

```ts
const client = await page.context().newCDPSession(page);
const axTree = await client.send('Accessibility.getFullAXTree');
console.log(JSON.stringify(axTree, null, 2));
```

```py
client = await page.context.new_cdp_session(page)
ax_tree = await client.send("Accessibility.getFullAXTree")
print(ax_tree)

# 提取可交互节点
clickables = [
    node for node in ax_tree["nodes"]
    if node.get("role", {}).get("value") in ["button", "link"]
]
```

### AX Tree 在哪些场景可能失效

* 全 div 页面，如 `<div onclick="submit()">Submit</div>`，AX Tree 可能识别错误
* 没有 label，如 `<input type="text">`，AI / screen reader 都废了
* 滥用 `aria`，如 `<div role="button" role="link">`，冲突 → 不可预测


## 从 DOM 到 AX Tree

### 早期：基于 DOM + 可视定位

早期很多类似 browser automation + LLM agent 的方案（包括 browser-use 初期思路），核心是：

* 用 Playwright / Puppeteer
* 通过 DOM 查询元素（CSS selector / XPath）
* 获取 bounding box
* 在页面上画框（highlight overlay）
* 再截图给模型

典型流程：

DOM → 找元素 → 获取位置 → 注入高亮层 → 截图 → 给 LLM

👉 这个阶段的特点：

* ✅ 可解释性强（人类也能看懂）
* ✅ 高亮容易做（直接用 DOM + CSS）
* ❌ 语义弱（模型要自己猜哪个按钮是干嘛的）

DOM 有几个致命问题：

1. 结构噪音极大：class 随机，层级很深，语义不清晰
2. 不可见元素很多
3. 无法直接表达“这是按钮/这是输入框”。DOM 只是结构，不是语义。

### 后期演进：基于 Accessibility Tree（AX Tree）

关键变化来了：改用 Accessibility Tree（无障碍树）也就是 CDP 的 `Accessibility.getFullAXTree`

#### AX Tree 是什么？

浏览器为屏幕阅读器生成的“语义树”：
* 基于语义
* 经过计算（role / name / ignored）
* 会过滤 hidden / irrelevant nodes

| DOM       | AX Tree    |
|-----------|------------|
| `<div>`   | role: button
| `<input>` | role: textbox
| 文本       | name / label

辟如 DOM：`<div class="btn">Submit</div>` 对应 AX Tree：`role: button, name: "Submit"`，对 LLM 来说，这就是天然结构化语义。

| 特性     | DOM              | AX Tree (AOM)     |
|----------|-----------------|-------------------|
| 噪声     | 很多             | 很少              |
| 语义     | 弱               | 强                |
| 稳定性   | 低（class变）     | 高（role稳定）     |
| AI理解   | 差               | 强                |

#### AX Tree 的优势

* token 大幅下降（通常 ↓70%）
* 语义更稳定（不像 DOM 随便变）
* 更接近“人类理解页面”

#### 为什么换 AX Tree 后“高亮消失了”

1. AX Tree 没有坐标（或不稳定）
2. AX Node → DOM Node 映射困难
3. 设计哲学变了（更偏 LLM-native）


## browser-use CHANGELOG

v0.3 删除 langchain 依赖
v0.6 2025-08-20 移除 Playwright 依赖
v0.7 2025-09-08 支持跨域 iframe

### 从 DOM 切换到 AX Tree 的关键时间线

1. d5f624c4 — 2025-07-08：Add accessibility tree filtering algorithm with demo and tests
    * 由 mamagnus00 co-authored，添加了 browser_use/dom/accessibility/ 目录，包含 AX Tree 过滤算法的原型和测试。这是探索性质的——证明 AX Tree 可以用于元素发现。
2. 8a2eda18 — 2025-07-09：wip, started migrating to pure cdp
	* 这是核心迁移 commit，由 Gregor Žunič (gregpr07) 提交。
	* 删除了 1381 行的 index.js DOM 遍历脚本
	* 将 DomService 从 Playwright page.evaluate() 改为 CDP 直连
	* 引入 Accessibility.getFullAXTree() + DOMSnapshot.captureSnapshot() + DOM.getDocument() 三路并行抓取
	* 干掉了 clickable_element_processor/ 和 history_tree_processor/ 子模块
	* 净删减 2450 行 → 新增 210 行（-2240 行）
3. 61035077 — 2025-07-13：Iframe work in progress — 扩展 AX Tree 抓取到跨 iframe 场景
4. b67341e1 — 2025-07-14：10x speedup for big pages — 优化 AX+Snapshot 并行 timing

架构变化总结

|         | 迁移前                                 | 迁移后
|---------|---------------------------------------|--------------
| 数据源	  | JS 注入 → page.evaluate(buildDomTree)  | CDP DOMSnapshot + DOM.getDocument + Accessibility.getFullAXTree
| 元素发现 | JS 遍历 DOM，判断 isVisible/isClickable | DOMSnapshot 提供布局+样式，AX Tree 提供语义角色、名称、状态
| iframe  | Playwright page.frames 逐帧注入         | CDP getFullAXTree(frameId=...) 按 frame 拉取
| 依赖     | Playwright JS runtime                 | cdp-use (typed CDP wrapper)

迁移前，DomService 通过 Playwright 注入一个 1381 行的 JS 脚本 (browser_use/dom/dom_tree/index.js) 到页面中，用 page.evaluate() 在浏览器内遍历 DOM 树，提取元素属性、可见性、坐标等信息。没有任何 Accessibility Tree 的参与。

本质上是从 "在 JS 运行时里自己算可见性和交互性" 转向 "让 Chrome 的 Accessibility 引擎告诉你哪些元素是什么角色、当前状态是什么"——信息密度更高，对 LLM 更友好，且不需要在页面里跑一大坨 JS。




