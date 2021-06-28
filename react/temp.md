# React 源码解读


非常纯粹的框架，只有 setState 没有双向绑定，没有

hydrate 调和



### 什么是 Fiber

每一个 ReactElement 对应一个 Fiber 对象
记录节点的各种状态：ClassComponent 实例本身不记录状态，是由 Fiber 对象负责的，这也使得 Hooks 的实现成为可能
串联整个应用形成树结构


### Update 和 UpdateQueue

Update 对象用于记录组件状态的改变

存放于 UpdateQueue 中，单向链表形式存在

多个 Update 可以同时存在，如一个事件中我们连续调用了3次update，那么就会产生3个Update对象


UpdateQueue 会记录一个 baseState，然后通过运行每一个 Update 获得一个新的 state



## 常见问题排查技巧

查找问题时，先到 develop 或 master 上看下有没有问题。

https://fb.me/setstate-in-render 问题，大概率是因为没有包 `useEffect(fn, [deps])` 导致的非必要 update 造成的。







