# 数据结构

## 数组 Array

数组存储一系列同一数据类型的值。在 JS 中也可以在数组中保存不同类型的值，但我们还是要遵守最佳实践，别这么做(大多数语言都没这能力)。

在 JS 中，数组可以动态增长，而在 C 和 Java 等语言中，数组的大小是不可修改的。

```js
// 新建数组
var array = new Array();
var array = []

// 添加和删除元素
numbers.[numbers.length] = 10;
numbers.push(10);  // unshift() pop() shift() splice() 等方法略过
```

数组各操作方法性能对比：

```js
// 新建长度为 1K 的数值，并赋初始值
runTest('递增赋值', getArray1);    // 8.383 ms
runTest('递增赋值new', getArray);  // 3.604 ms，知道长度的话，先 new Array(length) 新建再赋值
runTest('递减赋值', getArray3);    // 5.307 ms
runTest('递减赋值new', getArray4); // 3.886 ms，递增、递减赋值基本没差别
runTest('push赋值', getArray5);    // 7.260 ms

// 对长度为 1k 的数值进行操作
runTest('增项 - push', push);        //  11.379 ms
runTest('增项 - unshift', unshift);  // 326.857 ms，性能跟 push 比完全不是一个数量级
runTest('增项 - fakeUnshift1', fakeUnshift1);  // 4424 ms，虽然 unshift 慢，但比循环移值快多了
runTest('增项 - fakeUnshift2', fakeUnshift2);  // 3981 ms，虽然 unshift 慢，比 concat 性能还是能高出 10 倍
runTest('减项 - pop', pop);          //  9.188 ms
runTest('减项 - shift', shift);      // 150.808 ms
```

### 二维和多维数组

JS 只支持一维数组，并不支持矩阵，但是我们可以数组套数组，实现矩阵或任一多维数组。

```js
// 创建二维数组
matrix[0] = [0, 1, 2,  3,  4,  5,  6];
matrix[1] = [7, 8, 9, 10, 11, 12, 13];

// 打印二维数组 - 有简单的方法，这里主要为了演示遍历过程
function printMatrix(matrix) {
  for (let i = 0, length = matrix.length; i < length; i++) {
    for (let j = 0, length = matrix[i].length; j < length; j++) {
      console.log(matrix[i][j]);
    }
  }
}
```

### 数组方法参考

JS 中的数组，相比其他语言中的数组要强大很多，提供了很多好用的方法。在本书接下来的章节里，编写数据结构和算法时会大量用到这些方法。

##### 数组合并

##### 迭代器函数

##### 搜索和排序

##### 输出数组为字符串


## 栈 Stack

我们可以在数组的任意位置上删除和添加元素，然后，有时我们还需要一种在添加或删除元素是有更多控制的数据结构。栈和队列是两种类似于数组，但在添加和删除元素时更为可控的数据结构。

栈是一种遵从后进后出 LIFO 原则的有序集合。

栈也被用在编程语言的编译器和内存中保存变量、方法调用等。

```js
// 数据结构定义
class Stack {
  constructor() {
    this._items = Array.from(arguments);
  }

  get size() { return this._items.length; }
  set size(number) { this._items.length = number; }

  push(element) { return this._items.push(element); }
  pop() { return this._items.pop(); }
  peek() { return this._items[this._items.length - 1]; }
  isEmpty() { return this._items.length === 0; }
  clear() { this._items.length = 0; }
  print() { console.log(this._items); }
}

// 应用示例 - 十进制转换为二进制 n = 8; n.toString(2);
function divideBy2(decNumber) {
  let remStack = new Stack(), binaryString = '';
  while (decNumber > 0) {
    remStack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }
  while(!remStack.isEmpty()) {
    binaryString += remStack.pop();
  }
  return binaryString;
}
```


## 队列 Queue

队列与栈非常相似，但它遵循的是先进先出 FIFO 原则。队列在尾部添加新元素，并从顶部移除元素。

```js
// 普通队列
class Queue {
  constructor() {
    this._items = Array.from(arguments);
  }

  get size() { return this._items.length; }
  set size(number) { this._items.length = number; }

  enqueue(element) { return this._items.push(element); }
  dequeue() { return this._items.shift(); }
  front() { return this._items[0]; }
  isEmpty() { return this._items.length === 0; }
  clear() { this._items.length = 0; }
  print() { console.log(this._items); }
}

// 优先队列
class PriorityQueue {
  constructor() {
    this._items = Array.from(arguments);
  }

  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    if (!this._items.length) { return this._items.push(queueElement); }
    for (let i = this._items.length; i--;) {
      if (queueElement.priority < this._items[i].priority) {
        return this._items.push(queueElement);
      }
    }
    return this._items.unshift(queueElement);
  }

  // 其他方法略
}
class QueueElement {
  constructor(element, priority) {
    [this.element, this.priority] = arguments;
  }
}

// 循环队列 - 击鼓传花游戏
function hotPotato(nameList, num) {
  const queue = new Queue(...nameList);
  while (queue.size > 1) {
    for (let i = num; i--;) {
      queue.enqueue(queue.dequeue());
    }
    console.log(queue.dequeue() + ' 被淘汰。');
  }
  return queue.dequeue();
}

let names = ['John', 'Jack', 'Camila', 'Carl'];
    winner = hotPotato(names, 7);
console.log('胜利者 ', winner);
```


## 链表 LinkedList

数组可能是最常用的数据结构，但这种数据结构有一个缺点：(在大多数语言中)数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素，尽管 JS 原生提供了这些方法，但背后的成本依然很高。

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。

相对于数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。但缺点也是明显的，要想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到所需的元素。

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this._length = 0;   // 链表长度
    this._head = null;  // 链表入口
  }

  get size() { return this._length; }

  append(element) { }               // 在尾部添加新项目
  insert(position, element) { }     // 在列表中间特定位置插入新项
  removeAt(position) { }            // 移除项 - 移除某个位置的项
  remove(element) { }               // 移除项 - 根据值来移除项
  indexOf(element) { }              // 返回元素在链表中的索引，如找不到返回 -1
  toString() { }
  isEmpty() { return this._length === 0; }
  getHead() { return this._head; }

  append(element) {
    let node = new Node(element);
    if (this._head === null) {
      this._head = node;
      return ++this._length;
    }
    let current = this._head;
    while(current.next) { current = current.next; }
    current.next = node;
    return ++this._length;
  }

  insert(position, element) {
    if (position < 0 || position > this._length) { return false; }
    let node = new Node(element), current = this._head, previous, index = 0;
    if (position === 0) {
      node.next = current;
      this._head = node;
    } else {
      while (index++ < position) { previous = current; current = current.next; }
      node.next = current;
      previous.next = node;
    }
    return ++this._length;
  }

  removeAt(position) {
    if (position < 0 || position >= this._length) { return; }
    let current = this._head, previous, index = 0;
    if (position === 0) {
      head = current.next;
    } else {
      while (index++ < position) { previous = current; current = current.next; }
      previous.next = current.next;  // 跳过 current 从而移除它
    }
    this._length--;
    return current.element;
  }

  remove(element) {
    return this.removeAt(this.indexOf(element));
  }

  indexOf(element) {
    let current = this._head, index = 0;
    while (current) {
      if (element === current.element) { return index; }
      index++;
      current = current.next;
    }
    return -1;
  }

  toString() {
    let string = '', current = this._head;
    while (current) {
      string += ',' + current.element;
      current = current.next;
    }
    return string.slice(1);
  }

}
```

### 双向链表

双向链表和普通链表的区别在于，在普通链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。

双向链表提供了两种迭代列表的方法：从头到尾，或者反过来。我们也可以访问一个特定节点的下一个或前一个元素，在单向链表中，如果迭代列表时错过了要找的元素，就只能回到起点重新开始迭代了。

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this._length = 0;   // 链表长度
    this._head = null;  // 链表入口 - 头
    this._tail = null;  // 链表入口 - 尾
  }

  insert(position, element) {
    if (position < 0 || position > this._length) { return false; }
    let node = new Node(element), current = this._head, previous, index = 0;
    if (position === 0) {
      if (!this._head) { this._head = this._tail = node; }
      else { node.next = current; current.prev = this._head = node; }
    } else if (position === this._length) {
      current = this._tail;
      current.next = this._tail = node;
      node.prev = current;
    } else {
      while (index++ < position) { previous = current; current = current.next; }
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    return ++this._length;
  }

  removeAt(position) {
    if (position < 0 || position >= this._length) { return; }
    let current = this._head, previous, index = 0;
    if (position === 0) {
      this._head = current.next;
      if (this._length === 1) { this._tail = null; }
      else { this._head.prev = null; }
    } else if (position === this._length - 1) {
      current = this._tail;
      this._tail = current.prev;
      this._tail.next = null;
    } else {
      while (index++ < position) { previous = current; current = current.next; }
      previous.next = current.next;  // 跳过 current 从而移除它
      current.next.prev = previous;
    }
    this._length--;
    return current.element;
  }

  // 其他方法同 LinkedList，略 ...
}
```

### 循环列表

循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
循环链表与链表之间唯一的区别在于，最后一个元素的 next 指向链表的第一个元素。
双向循环链表的第一个元素的 prev 指向最后一个元素，而最后一个元素的 next 指向第一个元素。

## 集合


## 字典和散列表


## 树


## 图
