# Reconciliation

React 提供了一组声明式 API，所以你不用关心每次变更背后的具体变化。但如果能了解一些 diffing 细节的话，可以写出更加高效的程序。

### Motivation

在某个时间点，可以认为 `render()` 方法构建了一棵 React 元素树，然后，当 `state` 或 `props` 更新后，`render()` 方法又构建了一棵新的元素树。此时，React 需要解决 如何高效地将原先树更新到当前树的问题。

对于这个问题，目前有一些通用的算法可以将这种转换的操作步骤最小化，但问题是，这些算法的复杂度为 O(n<sup>3</sup>)，这意味着，当我们显示 1000个元素时，需进行十亿次比较操作，这开销显然太大了。React 通过前置两个假设，实现了复杂度为 O(n) 的探试算法：

* 如果元素的类型不同，则直接整体替换
* 不同 `state` 间，如果一个元素某个子元素的 `key` 属性没有变化，就认为该子元素不需要更新

### The Diffing Algorithm

差异比较从根元素开始，根元素的类型不同，会导致不同的行为。

#### Elements Of Different Types

如果根元素的类型不同，React 会销毁原先的树，并完成构建新的树。

这个过程中，原先树中的元素的 `componentWillUnmount()` 会触发，而新树中的元素则触发 `componentWillMount()` 和 `componentDidMount()`。

#### DOM Elements Of The Same Type

如果 DOM 元素的类型前后相同，React 会保留原有 DOM 节点，检查元素的特性 attributes，并更新修改过的特性值。

#### Component Elements Of The Same Type

自定义组件也跟 DOM 差不多，如果类型没有变，React 会保留原实例，也就是说，元素的 `state` 信息能够得以保留，React 会更新元素的 `props`，同时触发 `componentWillReceiveProps()` 和 `componentWillUpdate()` 钩子。

### Recursing On Children

当递归检查一个 DOM 节点的子元素时，碰到差异项，React 才会去更新，但这里有个细节需要特别注意：

```
// 更新前
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 更新后 - 情况1
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>   // React 只会添加这一项
</ul>

// 更新后 - 情况2
<ul>
  <li>third</li>   // React 检测到这一项不一样，会替换整个列表，这样就会有性能问题
  <li>first</li>
  <li>second</li>
</ul>
```

### Keys

为了解决刚才的问题，React 添加了一个 `key` 特性，这样，不管在什么位置插入，React 都能通过 `key` 来准确判断元素变动了。

每个兄弟元素的 `key` 都要求是唯一的，但只要求跟兄弟元素的不一样就行，不要求全局性地唯一。

```
<ul>
  <li key="third">third</li>   // React 只会新增这一项
  <li key="first">first</li>
  <li key="second">second</li>
</ul>
```

### Tradeoffs

请注意，这里讲的调解算法属于框架实现细节，并且会一直改进。

再回到开头提到的，所有的一切都是基于2个假设的，如果打破这些假设，则可能产生性能问题。
  1. 如果一个元素的类型变了，而其子元素基本没变，那 React 还是会完整替换掉元素。
  2. Keys 须稳定、可预测 且唯一，如果使用不稳定的 keys (如 `Math.random()`)，那基本上每次更新都得完成重建一遍。
