# 编程基础


## 数据结构



## 算法

### 排序算法


### 搜索算法

#### 介绍下深度优先遍历和广度优先遍历，如何实现？

```html
<div class="root">
  <div class="node-1">
    <div class="node-1-1">
      <div class="node-1-1-1"></div>
    </div>
    <div class="node-1-2"></div>
    <div class="node-1-3"></div>
  </div>
  <div class="node-2">
    <div class="node-2-1"></div>
  </div>
  <div class="node-3"></div>
</div>
```

深度优先遍历 DFS 与树的先序遍历比较类似。

广度优先遍历 BFS ...

#### 分别用深度优先和广度优先实现一个拷贝函数

DFS用常规的递归问题不大，需要注意下重复引用的问题，不用递归的话就用栈。


### 算法补充

#### 不用嵌套实现斐波那契数列计算

所有递归调用都有办法改成非递归的形式，递归是由终点往起点求值的过程，而循环是从起点往终点求值的过程。

转换思路：有几个递归表达式就加几个临时变 + 判断条件取反。

```js
// 求斐波那契数列的第 n 个值
function fibonacci(n) {
  if (n < 3) return 1
  let pprev = 1, prev = 1, current = 2
  n -= 2
  while (n--) {
    pprev = prev
    prev = current
    current = pprev + prev
  }
  return current
}
```





## 设计模式

#### 观察者模式和订阅发布模式的区别和各自适用场景

都是某个对象(subject, publisher)改变，使依赖于它的多个对象(observers, subscribers)得到通知。

观察者模式中主体和观察者是互相感知的；发布订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知。

发布-订阅模式是观察者模式的一种变体。发布订阅只是把一部分功能抽象成一个独立的ChangeManager。

在 「多对一」场景下观察者模式更简单，在「多对多」场景下则要用到发布订阅模式。

