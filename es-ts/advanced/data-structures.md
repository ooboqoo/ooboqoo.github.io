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

### 数组与链表

https://segmentfault.com/q/1010000007104568

C 和 Java 中的数组大小是固定的，且只能有一种类型，因此可以通过下标计算出内存地址，进行直接寻址。C++/C# 中数组可以变长其实是重新申请一块内存，把旧数组给复制过去了。

对于链表，因为本身就不是连续的空间，所以可以直接插入，但是查找需要遍历，虽有多种树结构来减小查找复杂度，但都是有副作用的，比如普通链表利于遍历但不利于指定查找，哈希表利于指定查找不利于遍历。

综上，数组利于查找，链表利于插入是对的。

但是此数组非彼数组，php，js 等脚本语言的数组并非传统意义的数组，他们都是用链表模拟的，所以要看具体语言实现。

----

具体到 Chrome，初始化变量时 Array(999999) 与 Array(9) 的内存消耗还是有明显差别的，且 pop 与 shift 的执行效率差距也很大，所以也不能简单认为是链表，底层实现估计是传统数组结合哈希表实现的。

----

作为一种基本的数据结构，数组通常是连续分布的空间，直接通过索引存取数据速度非常快，因为只需要算内存地址就找到了。但这确实是静态语言，像 C/C++/C#/Java 之类的实现。动态语言，解释性的语言，其实现就不一定是用数组了，可能是用链表，也可能是用哈希表，或者其它。

JavaScript 中的实现我没去研究过，估计 ECMAScript-262 里也不会对实现的具体的要求。不过 JavaScript 引擎众多，实现也有可能各不相同。我个人认为，对 JavaScript 的网页端来说，性能其实不那么重要，一般一个网页上多用个几十毫秒，少用个几十毫秒是感觉不出来的。不过对于服务端来说，性能累积效应就需要考虑了，但也不是说觉得哪里性能不好就去优化，而是要先感觉，再实测，确实是性能瓶颈，再去优化


## 栈 Stack

我们可以在数组的任意位置上删除和添加元素，然后，有时我们还需要一种在添加或删除元素时有更多控制的数据结构。栈和队列是两种类似于数组，但在添加和删除元素时更为可控的数据结构。

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

### 双向链表 Doubly LinkedList

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

### 循环链表 Circular LinkedList

循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。  
循环链表与链表之间唯一的区别在于，最后一个元素的 next 指向链表的第一个元素。  
双向循环链表的第一个元素的 prev 指向最后一个元素，而最后一个元素的 next 指向第一个元素。

## 集合 Set

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


## 字典和散列表 Map &AMP; HashMap

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

### 术语

一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个节点)以及零个或多个子节点。

位于树顶部的节点叫根节点。树中的每个元素都叫节点，节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点。没有子元素的节点称为外部节点或叶节点。

一个节点可以有祖先和后代。

子树由节点和它的后代构成。

节点的一个属性是深度，节点的深度取决于它的祖先节点的数量。

树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级，根节点在第0层，它的子节点在第1层，以此类推。

### 二叉树和二叉搜索树

二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。

二叉搜索树 BST 是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大(或相等)的值。

不同于以前的称呼，我们开始称节点为键，键是树相关的术语中对节点的称呼。

### 树的遍历

中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。中序遍历的一种应用就是对树进行排序操作。

先序遍历是以优先于后代节点的顺序访问每个节点。先序遍历的一种应用是打印一个结构化的文档。

后序遍历先访问节点的后代节点，再访问节点本身。后续遍历的一种应用是计算一个目录中所有文件所占空间的大小。

### 搜索树中的值

#### 搜索最小值和最大值

#### 搜索一个特定的值

#### 移除一个节点

### 更多二叉树知识

BST 存在一个问题：取决与你添加的节点数，树的一条边可能会非常深(有很多层)，而其他分支却只有几层。

AVL 树是一种自平衡二叉搜索树，任何一个节点左右两侧子树的高度之差最多为1。

红黑树是另外一种特殊的二叉树，这种树可以进行高效的中序遍历。

此外堆积树也值得学习。

```js
const root = Symbol('root');

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() { this[root] = null; }

  // 插入节点
  insert(key) {
    const newNode = new Node(key);
    if (this[root] === null) { this[root] = newNode; }
    else { insertNode(this[root], newNode); }
    return this;

    function insertNode(node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) { node.left = newNode; }
        else { insertNode(node.left, newNode); }
      } else {
        if (node.right === null) { node.right = newNode; }
        else { insertNode(node.right, newNode); }
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callback) {
    inOrderTraverseNode(this[root], callback);

    function inOrderTraverseNode(node, callback) {
      if (node === null) { return; }
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    preOrderTraverseNode(this[root], callback);

    function preOrderTraverseNode(node, callback) {
      if (node === null) { return; }
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }

  // 后序遍历
  postOrderTraverse(callback) {
    postOrderTraverseNode(this[root], callback);

    function postOrderTraverseNode(node, callback) {
      if (node === null) { return; }
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 查找最小值
  min() {
    if (!this[root]) { return null; }
    let node = this[root];
    while (node && node.left !== null) { node = node.left; }
    return node.key;
  }

  // 查找最大值
  max() {
    if (!this[root]) { return null; }
    let node = this[root];
    while (node && node.right !== null) { node = node.right; }
    return node.key;
  }

  // 搜索特定值
  search(key) {
    return searchNode(this[root], key);

    function searchNode(node, key) {
      if (node === null) { return false; }
      if (key < node.key) { return searchNode(node.left, key); }
      else if (key > node.key) { return searchNode(node.right, key) }
      else { return true; }
    }
  }

  // 删除特定值
  delete(key) {
    this[root] = deleteNode(this[root], key);

    function deleteNode(node, key) {
      if (node === null) { return null; }
      if (key < node.key) { node.left = deleteNode(node.left, key); return node; }
      else if (key > node.key) { node.right = deleteNode(node.right, key); return node; }

      // key === node.key && 节点为外节点
      if (node.left === null && node.right === null) { return node = null; }
      // key === node.key && 节点只有一个子节点
      if (node.left === null) { return node = node.right; }
      if (node.right === null) { return node = node.left; }
      // key === node.key && 节点有两个子节点
      let aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }

    function findMinNode(node){
      while (node.left !== null) { node = node.left; }
      return node;
    }
  }
}

let tree = new BinarySearchTree(), result = [];
for (let i of [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]) { tree.insert(i); }
tree.inOrderTraverse(key => result.push(key));
console.log('inOrderTraverse', result); result = [];
tree.preOrderTraverse(key => result.push(key));
console.log('preOrderTraverse', result); result = [];
tree.postOrderTraverse(key => result.push(key));
console.log('postOrderTraverse', result); result = [];
console.log('min ', tree.min());
console.log('max ', tree.max());
console.log('search ', tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log('search ', tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');
tree.delete(14);
tree.inOrderTraverse(key => result.push(key));
console.log('delete 14 & inOrderTraverse', result); result = [];
tree.delete(1)
tree.inOrderTraverse(key => result.push(key));
console.log('delete 1 & inOrderTraverse', result); result = [];
```


## 图

### 术语

图是网络结构的抽象模型。图是一组由边连接的节点(或顶点)。学习图是重要的，因为任何二元关系都可以用图来表示。

一个图 G=(V,E) 由以下元素组成：V 一组顶点；E 一组边，连接 V 中的顶点。

由一条边连接在一起的顶点称为相邻顶点。

一个顶点的度是其相邻顶点的数量。

路径是一串连续的顶点，简单路径要求不包含重复的顶点。

如果图中不存在环，则称该图是无环的。

如果图中每两个顶点间都存在路径，则该图是连通的。

图可以是无向的(边没有方向) 或是有向的(有向图)。

如果图中两个顶点间在双向上都存在路径，则这两个点是强连通的，如果图中所有顶点都是强连通的，则该图是强连通的。

图还可以是未加权的或是加权的。

### 图的表示

#### 邻接矩阵

图最常见的实现是邻接矩阵(图见 P113)。每个节点都和一个整数相关联，该整数将作为数组的索引。

不是强连通的图(稀疏图)如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们浪费了计算机储存空间来表示根本不存在的边。邻接矩阵表示法不够好的另一个理由是，图中顶点的数量可能会改变，而2维数组不太灵活。

#### 邻接表

我们也可以使用一种叫做邻接表的动态数据结构来表示图(图见 P113)。邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。我们可以用列表(数组)、链表，甚至是散列表或是字典来表示相邻顶点列表。

尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用。

#### 关联矩阵

我们还可以用关联矩阵来表示图。在关联矩阵中，矩阵的行表示顶点，列表示边。

关联矩阵通常用于边的数量比顶点多的情况下，一节省空间和内存。

### 创建图类

### 图的遍历

和树数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历：广度优先搜索 Breadth-First Search, BFS 和深度优先搜索 Depth-First Search, DFS。图的遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。

广度优先和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。

| 算法 | 数据结构 | 描述
|------|----------|---------------------------------------------------------------------
| 深度优先 | 栈   | 通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
| 广度优先 | 队列 | 通过将顶点存入队列中，最先入队列的顶点先被探索

我们这里将使用广度优先搜索实现求解最短路径问题。如果要计算加权图中的最短路径(如城市和城市之间的最短路径)，广度优先未必合适。_Dijkstra's算法_ 解决了单元最短路径问题；_Bellman-Ford算法_ 解决了边权值为负的单源最短路径问题；_A*搜索算法_ 解决了求仅一对顶点间的最短路径问题；_Floyd-Warshall算法_ 解决了求所有顶点对间的最短路径问题。

我们使用广度优先实现了有向无环图 DAG 的拓扑排序 topsort 问题。

```js
const vertices = Symbol('vertices'),
      adjList = Symbol('adjList');

class Graph {
  constructor() {
    this[vertices] = [];      // 存储所有顶点的名字
    this[adjList] = new Map;  // 存储连接表
  }

  // 添加顶点
  addVertex(v) {
    this[vertices].push(v);
    this[adjList].set(v, []);
    return this;
  }

  // 添加边
  addEdge(v, w) {
    this[adjList].get(v).push(w);
    this[adjList].get(w).push(v);
    return this;
  }

  // 广度优先搜索
  bfs(v, callback) {
    let color = {},  // 记录顶点遍历过程 0 - 未访问 1 - 已访问待探索 2 - 已探索
        queue = [];  // 这里图代码的简单，直接用数组，不再定义队列数据结构
    this[vertices].forEach(v => color[v] = 0);
    queue.push(v);
    while(queue.length !== 0) {
      const u = queue.shift(),
            neighbors = this[adjList].get(u);
      color[u] = 1;
      for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === 0) { color[w] = 1; queue.push(w); }
      }
      color[u] = 2;
      if (callback) { callback(u); }
    }
  }

  // 广度优先搜索 - 改进版
  BFS(v, callback) {
    let color = {},  // 记录顶点遍历过程 0 - 未访问 1 - 已访问待探索 2 - 已探索
        queue = [],  // 这里图代码的简单，直接用数组，不再定义队列数据结构
        d = {},      // 记录顶点v到其他顶点之间的距离
        pred = {};   // 记录前溯点
    this[vertices].forEach(v => { color[v] = 0; d[v] = 0; pred[v] = null; });
    queue.push(v);

    while (queue.length !== 0) {
      const u = queue.shift(),
            neighbors = this[adjList].get(u);
      color[u] = 1;
      for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === 0) { color[w] = 1; d[w] = d[u] + 1; pred[w] = u; queue.push(w); }
      }
      color[u] = 2;
      if (callback) { callback(u); }
    }
    return {distances: d, predecessors: pred};
  }

  // 深度优先搜索，不需要指定顶点
  dfs(callback) {
    let color= {},  // 记录顶点遍历过程 0 - 未访问 1 - 已访问待探索 2 - 已探索
        dfsVisit = _dfsVisit.bind(this);
    this[vertices].forEach(v => color[v] = 0);
    for (let i = 0, length = this[vertices].length; i < length; i++) {
      if (color[this[vertices][i]] === 0) { dfsVisit(this[vertices][i], callback); }
    }

    function _dfsVisit(u, callback) {
      const neighbors = this[adjList].get(u);
      color[u] = 1;
      if (callback) { callback(u); }
      for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === 0) { dfsVisit(w, callback); }
      }
      color[u] = 2;
    }
  }

  // 用于控制台输出
  toString() {
    let result = '';
    for (let v of this[vertices]) { result += v + ' -> ' + this[adjList].get(v) + '\n'; }
    return result;
  }

  // 利用广度优先求最短路径清单
  getRoutes(v) {
    let {distances, predecessors: pred} = this.BFS(v), result = '';
    for (let key in distances) {
      if (!pred[key]) { continue; }
      let temp = [];
      while (key) { temp.push(key); key = pred[key]; }
      result += temp.reverse().join(' - ') + '\n';
    }
    return result;
  }

  // 利用深度优先对有向无环图进行拓扑排序
  topsort() { } // 暂略
}

let graph = new Graph;
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B').addEdge('A', 'C').addEdge('A', 'D')
     .addEdge('B', 'E').addEdge('B', 'F')
     .addEdge('C', 'D').addEdge('C', 'G')
     .addEdge('D', 'G').addEdge('D', 'H')
     .addEdge('E', 'I')
     .addEdge('F', 'G');
console.log('Graph data: \n' + graph.toString());
console.log('bfs traverse:');
graph.bfs('A', v => console.log('Visited ', v));
console.log('dfs traverse:');
graph.dfs(v => console.log('Visited ', v))
console.log('Shortest path from B:\n' + graph.getRoutes('B'));
```
