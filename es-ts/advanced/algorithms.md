# JavaScript 常用算法

https://www.packtpub.com/application-development/learning-javascript-data-structures-and-algorithms

## 排序算法

### 冒泡排序

冒泡算法是排序算法中最简单的，同时也是最差的一个，所以并不推荐在实战中使用。

```js
function bubbleSort(arr) {
  for (let i = arr.length; i--;) {                    // 首次 i 赋值为 3，但经过判端立即变为 2 了
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // 利用 ES6 的解构赋值写法
      }
    }
  }
}
```

排序过程演示：

```text
[3, 2, 1]  // i = 2, j = 0
[2, 3, 1]  // i = 2, j = 1
[2, 1, 3]  // i = 1, j = 0
[1, 2, 3]
```


### 选择排序

选择排序算法是一种选址比较排序算法。大致思路是，找到数据结构中的最小值并将其放置在第一位，接着找第二最小值...

选择排序的复杂度也是 O(n<sup>2</sup>)，和冒泡排序一样，包含有嵌套的循环，这导致了二次方的复杂度。

```js
// 此代码小换了下思路，改为找最大值
function selectionSort(arr) {
  for (let i = arr.length, index; i--;) {  // index 用于记录最大值的位置
    index = i;
    for (let j = i; j--;) {
      if (arr[index] < arr[j]) { index = j; }
    }
    if (i !== index) {
      [arr[i], arr[index]] = [arr[index], arr[i]];
    }
  }
}
```


### 插入排序

插入排序，首先假定第一项已经排序了，接着，它和第二项进行比较，从而决定第二项是待在原地还是插入到第一项之前。接着第三项跟第一项、第二项比较以决定第三项的位置...

```js
function insertionSort(arr) {
  for (let i = 1, length = arr.length, j, temp; i < length; i++) {
    j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}

// splice() 方式，耗时比前一种方式增加 10 倍
function insertionSort2(arr) {
  for (let i = 1, length = arr.length, item; i < length; i++ ) {
    if (arr[i] >= arr[i - 1]) { continue; }
    item = arr.splice(i, 1)[0];
    for (let j = i + 1; j--;) {
      if (arr[j -1] <= item) {
        arr.splice(j, 0, item);
        item = undefined;
        break;
      }
    }
    if (item) { arr.unshift(item); }
  }
}
```


### 归并排序

前三个排序算法性能都不行，归并排序是第一个可以被实际使用的排序算法(实测 JS 实现的归并排序还不如插入排序，应该是 JS 的数组操作拖后腿了)，其复杂度为 O(nlog(n))。

归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，直到每个小数组只包含一个元素，接着再将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。(详见P137图解)

> `Array.prototype.sort()` 方法，Firefox 使用归并排序作为其实现方式，而 Chrome 则使用了一个快速排序法的变体。

```js
function mergeSort(arr) {
  return mergeSortRec(arr);

  function mergeSortRec(arr) {
    const length = arr.length;
    if (length === 1) { return arr }
    const mid = Math.floor(length / 2),
          left = arr.slice(0, mid),
          right = arr.slice(mid, length);
    return merge(mergeSortRec(left), mergeSortRec(right))
  }

  function merge(left, right) {
    let result = [], il = 0, ir = 0, ll = left.length, lr = right.length;
    while (il < ll && ir < lr) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while(left[il]){ result.push(left[il++]); }
      // 改为 if (il < ll) { result = result.concat(left.slice(il)); } 
      // 这种写法，看起来操作少了，结果耗时增加 50%, 应该是新建数组太耗费资源，而 push 则很高效
    while(right[ir]){ result.push(right[ir++]); }
    return result;
  }
}
```


### 快速排序

快速排序也许是最常用的排序算法了。它的复杂度为 O(nlog(n)), 且它的性能通常比其他的复杂度相同的排序算法要好。
和归并排序一样，快速排序也使用分治的方法，但它没有像归并排序那样将它们分割开。

```js
function quickSort(arr) {
  if (arr.length === 1) { return; }
  quick(arr, 0, arr.length - 1);

  function quick(arr, left, right) {
    const index = partition(arr, left, right);  // 分组后，0 到 index-1 的值都比 index 到 length-1 的值小
    if (left < index - 1) { quick(arr, left, index -1); }
    if (index < right) { quick(arr, index, right); }
  }

  // 分组操作，完成后左边组中的值都比右边组中的值小
  function partition(arr, left, right) {
    const pivot = arr[Math.floor((left + right) / 2)];  // 选择主元，可随机选
    while (left <= right) {
      while (arr[left] < pivot) { left++; }
      while (arr[right] > pivot) { right--; }
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
    return left; 
  }
}
```


## 搜索算法

### 顺序搜索

顺序或线性搜索是最基本的搜索算法，将每一个数据结构中的元素逐个取出进行比较，因此也是最低效的一种搜索算法。

```js
function sequentialSearch(arr, item) {
  for (let i = arr.length; i--;) {
    if (arr[i] === item) { return i; }
  }
  return -1;
}
```


### 二分搜索

二分搜索算法的原理与猜数字游戏类似，每次对比都能知道是高了还是低了。

二分搜索要求被搜索的数据结构已排序。二分搜索本身的效率是极高的，但对于搜索未排序的数据结构，影响性能的就是排序过程了。

```js
function binarySearch(arr, item) {
  let low = 0,
      heigh = arr.length - 1,
      mid, element;
  arr.sort();
  while (low <= heigh) {
    mid = Math.floor((low + heigh) / 2);
    element = arr[mid];
    if (element < item) { low = mid + 1; }
    else if (element > item) { heigh = mid -1; }
    else { return mid; }
  }
  return -1;
}
```


## 算法性能实测

```js
runTest('生成随机数组', getRandomArray);                               //    14 ms
runTest('冒泡排序', function() { bubbleSort(getRandomArray()); });     // 23442 ms
runTest('选择排序', function() { selectionSort(getRandomArray()); });  //  1689 ms
runTest('插入排序', function() { insertionSort(getRandomArray()); });  //   286 ms
runTest('归并排序', function() { mergeSort(getRandomArray()); });      //   444 ms
runTest('快速排序', function() { quickSort(getRandomArray()); });      //   364 ms
runTest('二叉树排序', function() { BSTSort(getRandomArray()); });      //   234 ms
runTest('.sort()', function() { getRandomArray().sort(); });           //   238 ms

// 15次 以下用顺序搜索直接搜，15次 以上先排序后二分搜索
runTest('顺序搜索', function() { sequentialSearch(getRandomArray(), 500) })  //  14 ms
runTest('二分搜索', function() { binarySearch(getRandomArray(), 500) })      // 240 ms

// 测试工具函数
function runTest(title, fn, times = 1000) {
  console.time(title);
  while (times--) { fn(); }
  console.timeEnd(title);
}
```


## 算法补充

### 递归

递归是一种解决问题的方法，它解决问题的各个小部分，直到解决最初的大问题。通常涉及函数调用自身。

递归函数都必须要有边界条件，即一个不再递归调用的条件(停止点)，以防止无限递归。

```js
// 直接调用
function recursiveFunction() {
  recursiveFunction();
}

// 间接调用
function recursiveFunction1() {
  recursiveFunction2();
}
function recursiveFunction2() {
  recursiveFunction1();
}
```

#### 调用栈大小的限制

如果忘记加上停止递归调用的条件，递归也不会无限地执行下去，浏览器能够检测到并抛出栈溢出错误(stack overflow error)。

ES6 有尾调用优化(tail call optimization)。如果函数内最后一个操作是调用函数，会通过 "跳转指令 jump" 而不是 "子程序调用 subroutine call" 来控制，也就是说，尾调用的递归会一直执行下去。

```js
let i = 0;
try {
  (function fn() { if(i++ > 999998) { throw new Error() }; fn(); })();
} catch(e) {                          // RangeError: Maximum call stack size exceeded
  console.log(e.toString(), '\n', i); // 20903 (NodeJS - V8)
}
```

##### 尾递归要点

http://www.ruanyifeng.com/blog/2015/04/tail-call.html

* 尾调用的概念非常简单，就是指某个函数的 **最后一步操作** 是调用另一个函数。
* 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
* ES6 的尾调用优化只在严格模式下开启，因为正常模式下，函数内部有个变量 `func.caller` 可以跟踪调用栈。

注：V8 尾调用测试没反应，结果一查，V8 默认没有开启(2017-03-27)，见 https://kangax.github.io/compat-table/es6/

```js
function f(x) { return y = g(x); }  // 不是尾调用
function f(x) { return g(x) + 1; }  // 不是尾调用

function f(x) {
  if (x > 0) { return m(x) }       // 是尾调用
  return n(x);                     // 是尾调用
}
```

#### 斐波那契数列

```js
// 非递归方式
function fib(num) {
  let n1 = 1, n2 = 1, n = 1;
  for (let i = 3; i <= num; i++) {
    n = n1 + n2;
    n1 = n2;
    n2 = n;
  }
  return n;
}

// 递归方式
let cache = {};  // 没有缓存，随便输个3位数就不动了
function fibonacci(num) {
  if (cache[num]) { return cache[num]; }
  if (num === 1 || num === 2) { return 1; }
  return cache[num] = fibonacci(num - 1) + fibonacci(num - 2);
}
```

递归并不比普通版本更快，反倒更慢，但要知道，递归更容易理解，并且它所需的代码量更少。


### 动态规划

动态规划 Dynamic Programming, DP 是一种将复杂问题分解成更小的子问题来解决的优化技术。

动态规划和分而治之是不同的方法，分而治之是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题，刚才的斐波那契数列就是一个例子。


### 贪心算法

贪心算法期盼通过每个阶段的局部最优选择，从而达到全局的最优。它不像动态规划那样计算更大的格局。

比起动态规划，贪心算法更简单、更快。然而，它并不总能得到最优答案，但综合执行时间来说，输出了一个可以接受的解。

```js
// 最少硬币找零问题 - 动态规划
let makeChange = (function () {
  let cache = {}, coins = [1, 3, 4];
  coins.forEach(function(item) { cache[item] = [item]; });

  return function makeChange(amount) {
    if (!amount) { return []; }
    if (cache[amount]) { return cache[amount]; }
    let min = [];
    // 拿掉一个硬币后，对比剩下金额的最优解，得出最优解
    for (let i = coins.length, newAmount, newMin; i--;) {
      newAmount = amount - coins[i];
      if (newAmount < 0) { continue; }  // 到这一步，不可能出现 newAmount === 0 的情况
      newMin = makeChange(newAmount);   // 获取 newAmount 的最优解
      if (!min.length || newMin.length < min.length - 1) { // 首个解或有更优解
        min = [coins[i]].concat(newMin);
      }
    }
    return cache[amount] = min;
  }
})();

// 最少硬币找零问题 - 贪心算法
function minCoinChange(amount, coins = [1, 3, 4]) {
  let change = [], total = 0;
  for (i = coins.length; i--;) {
    while (total + coins[i] <= amount) {
      change.push(coins[i]);
      total += coins[i];
    }
  }
  return change;
}

// 正常市面上的币值 1, 2, 5, 10, 20, 50, 100 贪心算法得到的也永远是最优解 
for (let i = 20; i--;) {
  console.log('动态规划', makeChange(i));     // 当 i = 6 时 [3, 3]
  console.log('贪心算法', minCoinChange(i));  // 当 i = 6 时 [4, 1, 1]
}
```


### 大 O 表示法

大 O 表示法用于描述算法的性能和复杂程度。当用大 O 表示法衡量算法的效率时，一般考虑的是 CPU (时间)占用。

```js
// 不管参数怎么变，执行时间都相同，复杂度为 O(1)
function increment(num) { return ++num; }

// 顺序搜索函数，最好情况下1次找到，最坏情况须遍历完整数组，复杂度为 O(n)
function (array, item) {
  for (let i = 0; i < array.length; i++) { if (array[i] === item) return i; }
  return -1;
}

// 冒泡排序，排一个大小为 n 的数组，开销是 n**2，复杂度就是 O(n**2)
function bubbleSort(array) { for(;;) { for(;;) { } } }  // 多一层循环，复杂度增加 n 倍，如三层循环为 O(n**3)
```


### 时间复杂度速查表

#### 数据结构

|     数据结构     | 插入(一般情况 / 最差情况) |       删除       |       搜索       |
|------------------|:-------------------------:|:----------------:|:----------------:|
| 数组 / 栈 / 队列 |        O(1) / O(1)        |   O(1) / O(1)    |    O(n) / O(n)   |
| 链表             |        O(1) / O(1)        |   O(1) / O(1)    |    O(n) / O(n)   |
| 双向链表         |        O(1) / O(1)        |   O(1) / O(1)    |    O(n) / O(n)   |
| 散列表           |        O(1) / O(n)        |   O(1) / O(n)    |    O(1) / O(n)   |
| 二分搜索树       |      O(log(n)) / O(n)     | O(log(n)) / O(n) | O(log(n)) / O(n) |

#### 排序算法 

| (数组)排序算法 | 复杂度 - 最好情况 | 复杂度 - 一般    | 复杂度 - 最差情况 |
|:--------------:|:-----------------:|:----------------:|:-----------------:|
|   冒泡排序     |       O(n)        | O(n<sup>2</sup>) | O(n<sup>2</sup>)  |
|   选择排序     | O(n<sup>2</sup>)  | O(n<sup>2</sup>) | O(n<sup>2</sup>)  |
|   插入排序     |       O(n)        | O(n<sup>2</sup>) | O(n<sup>2</sup>)  |
|   归并排序     |    O(nlog(n))     |    O(nlog(n))    |    O(nlog(n))     |
|   快速排序     |    O(nlog(n))     |    O(nlog(n))    | O(n<sup>2</sup>)  |

#### 搜索算法

|       算法       |         数据结构         |    最差情况   |
|------------------|--------------------------|---------------|
| 顺序搜索         | 数组和链表               | O(n)          |
| 二分搜索         | 排好序的数组或二分搜索树 | O(log(n))     |
| 深度优先搜索 DPS | \V\ 为顶点 \E\ 为边的图  | O(\V\ + \E\ ) |
| 广度优先搜索 BFS | \V\ 为顶点 \E\ 为边的图  | O(\V\ + \E\ ) |

##### 附：关于时间复杂度 log 的说明

关于算法的时间复杂度很多都用包含 O(logN) 这样的描述，但是却没有明确说 logN 的底数究竟是多少。

算法中 log 级别的时间复杂度都是由于使用了分治思想，这个底数直接由分治的复杂度决定。如果采用二分法,那么以 2 为底数，三分法以 3 为底数，其他亦然。不过无论底数是什么，log 级别的渐进意义是一样的。也就是说该算法的时间复杂度的增长与处理数据多少的增长的关系是一样的。

我们先考虑 O(logx(n)) 和 O(logy(n))，x!=y，我们看下 n 趋于无穷的情况。求当 n 趋于无穷大时 logx(n)/logy(n)的极限可以发现，极限等于 ln(y)/ln(x)，也就是一个常数。也就是说，在 n 趋于无穷大的时候，这两个东西仅差一个常数。所以从研究算法的角度 log 的底数不重要。

最后，结合上面，我也说一下关于大 O 的定义（算法导论28页的定义），注意把这个定义和高等数学中的极限部分做比较，显然可以发现，这里的定义正是体现了一个极限的思想，假设我们将 n0 取一个非常大的数字，显然，当 n 大于 n0 的时候，我们可以发现任意底数的一个对数函数其实都相差一个常数倍而已。所以书上说写的 O(logN) 已经可以表达所有底数的对数了，就像 O(n^2) 一样。
