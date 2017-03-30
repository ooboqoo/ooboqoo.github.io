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

集合是由一组无序且唯一(即不能重复)的项组成的，你可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。

注：ES6 的 Set 类遍历时是有顺序的(按添加顺序)，我们这里实现的是没有顺序的。

```js
class Set {
  constructor() { this._items = {}; }

  get size() { return Object.keys(this._items).length; }

  add(value) { this._items[value] = value; return this; }
  delete(value) {
    if (this.has(value)) { delete this._items[value]; return true; }
    else { return false; }
  }
  has(value) { return this._items.hasOwnProperty(value); }
  clear() { this._items = {}; }
  values() { return Object.keys(this._items); }

  // 开始实现并集、交集、差集、子集 4个功能
  union(otherSet) {
    if (!otherSet instanceof Set) { return false; }
    let unionSet = new Set();
    this.values().forEach((k) => { unionSet.add(k); });
    otherSet.values().forEach((k) => { unionSet.add(k); });
    return unionSet;
  }

  intersection(otherSet) {
    if (!otherSet instanceof Set) { return false; }
    let intersectionSet = new Set();
    this.values().forEach((k) => {
      if (otherSet.has(k)) { intersectionSet.add(k); }
    });
    return intersectionSet;
  }

  difference(otherSet) {
    if (!otherSet instanceof Set) { return false; }
    let differenceSet = new Set();
    this.values().forEach((k) => {
      if (!otherSet.has(k)) { differenceSet.add(k); }
    });
    return differenceSet;
  }

  subset(otherSet) {
    if (this.size > otherSet.size) { return false; }
    for (let k of this.values()) {
      if (!otherSet.has(k)) { return false; }
    }
    return true;
  }
}
```


## 字典和散列表

集合、字典和散列表都可以存储不重复的值。在集合中，我们关注的是值本身，并把它当作主要元素。在字典和散列表中，我们以键值对的形式来存储数据，但两种数据结构的实现方式又略有不同。

### 字典

与 Set 类相似，ES6 同样包含了一个 Map 类实现，即我们所说的字典。

```js
class Dictionary {
  constructor() { this._items = {}; }

  get size() { return this.keys().length; }

  set(key, value) { this._items[key] = value; return this; }
  delete(key) {
    if (this.has(key)) { delete this._items[key]; return true; }
    else { return false; }
  }
  has(key) { return this._items.hasOwnProperty(key); }
  get(key) { return this._items[key]; }
  clear() { this._items = {}; }
  keys() { return Object.keys(this._items); }
  values() { return this.keys().map(k => this._items[k]); }
}
```

http://ryanmorr.com/true-hash-maps-in-javascript/

这篇文章介绍了一个更牛X的方法 `var map = Object.create(null)` 这种方法可以完美摒除 `Object.prototype` 里公共方法带来的副作用，当然在 ES6 里有现成的 Map 类用。

当我们使用字面量新建对象时 `var map = {};` 实际是执行了 `var map = Object.create(Object.prototype);`。

### 散列表

> 不管是从性能还是使用便利性，真心觉得这东西在 JS 里没鸟用，直接使用 `{}` 或者 `Object.create(null)` 反而更好吧。  
> 看到 hashmap.js 通过包装 {} 实现了 ES6 的 "值-值" 存储功能，这对于 ES5 的码农还有点现实意义。

散列算法的作用是尽可能快地在数据结构中找到一个值。普通的数据结构中，我们为了找到一个值，需要遍历整个数据结构来找到它，但如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

在一些编程语言中，还有一种叫做 "散列集合" 的实现，可以通过 集合 + 散列函数 来实现，这里不作介绍。

```js
class HashMap {
  constructor() { this._table = []; }

  put(key, value) {
    const position = this._getHashCode(key);
    this._table[position] = value;
    return this;
  }
  get(key) { return this._table[this._getHashCode(key)]; }
  delete(key) { this._table[this._getHashCode(key)] = undefined; }

  _getHashCode(key) {
    if (!key || key === '' || typeof key === 'number') { return typeof key === 'number' ? key : 0; }
    return key.split('').reduce((acc, key) => acc * 33 + key.charCodeAt(0), 5381) % 1013;
  }
}
```

#### 散列函数

一个好的散列函数通常要做到两点：
  * 均匀 - 值均匀分布在哈希表中
  * 简单 - 以提高地址计算的速度

```js
function djb2HashCode(key) {
  return key.split('').reduce((acc, key) => acc * 33 + key.charCodeAt(0), 5381) % 1013;
}
```

djb2 这个函数是最被社区推荐的散列函数之一。它包括初始化一个 hash 变量，并赋值为一个质数(大多数实现都用5381)，然后迭代参数 key，将 hash 与 33 相乘(用来当做一个魔力数)，并和当前迭代到的字符的 ASCII 码值相加。

最后，我们选一个随机的质数(比我们预计的散列表的大小稍大)来对结果取余数，得出最后的散列值。

#### 处理冲突

不同的键得到相同的散列值是难免的，当不同的键名对应相同的存储位置时，我们称其为冲突。

常用的冲突解决方法有：分离链接、线性探查 和 双散列法。

**分离链接法** 包括为散列表的每一个位置创建一个 "链表"，并将元素存储在里面。它是解决冲突的最简单的方法，但是它在 HashTable 实例之外还需要额外的存储空间。

```js
class ValuePair {
  constructor(key, value) { this.key = key; this.value = value; }
}

class HashMap {
  // ...
  put(key, value) {
    let position = this._getHashCode(key);
    if (this._table[position] === undefined) { this._talbe[position] = new LinkedList(); }
    this._table[position].append(new ValuePair(key, value));
  }
}
```

**线性探查法**: 当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 位置，如果 index+1 位置也被占据了，再继续尝试 index+2 以此类推。

```js
class HashMap {
  // ...
  put(key, value) {
    let position = this._getHashCode(key);
    while (this._table[position] !== undefined) { position++; }
    this._talbe[position] = new ValuePair(key, value);
    return this;
  }
}
```


## 树


## 图
