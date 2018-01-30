# Immutable JS

https://github.com/camsong/blog/issues/3

* 解决了变更检测的效率问题：一旦创建就不能更改，无需做深比较
* 解决了深拷贝的痛点：通过结构共享有效减少内存和性能损耗


## 概述

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改都会返回一个新的 Immutable 对象。

Immutable 实现的原理是持久化数据结构 Persistent Data Structure，也就是使用旧数据创建新数据时，要保证旧数据可用且不变。同时为了避免深拷贝带来的性能损耗，Immutable 使用了结构共享 Structural Sharing，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。


当我们发生一个 set 操作的时候，Immutable.js 会只 clone 它的父级别以上的部分，其他保持不变，这样大家可以共享同样的部分，可以大大提高性能。

熟悉 React 的都应该知道 React 是一个 UI = f(states) 的框架，为了解决更新的问题，React 使用了 virtual dom 来实现高效的 dom 更新。但是有一个问题，当 state 更新时，如果数据没变，你也会去 diff，这就产生了浪费。

目前流行的 Immutable 库有两个：


## Immutable.js

https://facebook.github.io/immutable-js/

它内部实现了一套完整的 Persistent Data Structure，还有很多易用的数据类型。像 `Collection` `List` `Map` `Set` `Record` `Seq`。有非常全面的 `map` `filter` `groupBy` `reduce` `find` 函数式操作方法。同时 API 也尽量与 `Object` 或 `Array` 类似。

其中有 3 种最重要的数据结构说明一下：
* `Map`：键值对集合，对应于 Object，ES6 也有专门的 Map 对象
* `List`：有序可重复的列表，对应于 Array
* `Set`：无序且不可重复的列表

## seamless-immutable

https://github.com/rtfeldman/seamless-immutable

与 Immutable.js 学院派的风格不同，seamless-immutable 并没有实现完整的 Persistent Data Structure，而是使用 `Object.defineProperty`（因此只能在 IE9+ 使用）扩展了 JavaScript 的 Array 和 Object 对象来实现，只支持 Array 和 Object 两种数据类型，API 基于与 Array 和 Object 操持不变。代码库非常小，压缩后下载只有 2K。而 Immutable.js 压缩后下载有 16K。


