# JavaScript 常用算法

[学习 JavaScript 数据结构与算法](https://www.packtpub.com/application-development/learning-javascript-data-structures-and-algorithms)   
[前端常见算法的JS实现](http://www.qdfuns.com/notes/36539/24a66634ecba54ab3d8f7407168754f2.html) 

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
```

排序小型数组时，插入排序比选择排序的性能要好。


### 归并排序

前三个排序算法性能都不行，归并排序是第一个可以被实际使用的排序算法，其复杂度为 O(nlog<sup>2</sup>)

> `Array.prototype.sort()` 方法，Firefox 使用归并排序作为其实现方式，而 Chrome 则使用了一个快速排序法的变体。

```js
function merge(left, right) {
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    while(left[il]){
        result.push(left[il++]);
  }
    while(right[ir]){
        result.push(right[ir++]);
    }
    return result;
}
```


### 快速排序

```js
function quickSort(arr,l,r){
  if(l < r){
    var i = l, j = r, x = arr[i];
    while(i<j){
      while(i<j && arr[j]>x)
        j--;
      
      if(i<j)
        //这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
        arr[i++] = arr[j];
      
      while(i<j && arr[i]<x)
        i++;
      
      if(i<j)
        //这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
        arr[j--] = arr[i];
    }
    arr[i] = x;
    
    quickSort(arr, l, i-1);
    quickSort(arr, i+1, r);
  }
}
```


## 搜索算法

### 顺序搜索


### 二分搜索


## 字符串操作



## 算法补充

### 递归


### 动态规划


### 贪心算法


### 大 O 表示法

