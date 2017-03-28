# 数据结构

## 数组

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

|||
|----------|-------------------------------------------
| `concat` | 连接 2个或更多数组，并返回这个新建的数组

#### 数组合并

#### 迭代器函数

#### 搜索和排序

#### 输出数组为字符串


## 栈


## 队列


## 链表


## 集合


## 字典和散列表


## 树


## 图
