# JavaScript 数据结构与算法

[学习 JavaScript 数据结构与算法](https://www.packtpub.com/application-development/learning-javascript-data-structures-and-algorithms)   
[前端常见算法的JS实现](http://www.qdfuns.com/notes/36539/24a66634ecba54ab3d8f7407168754f2.html) 

## 排序算法

### 冒泡排序

```js
function bubbleSort(arr){
  var i = j = 0;
  for(i=1;i<arr.length;i++){
    for(j=0;j<=arr.length-i;j++){
      var temp = 0;
      if(arr[j]>arr[j+1]){
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}
```

### 选择排序


### 插入排序


### 归并排序


### 快速排序


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

### 二路归并

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



## 搜索算法

### 顺序搜索


### 二分搜索


## 字符串操作



## 算法补充

### 递归


### 动态规划


### 贪心算法


### 大 O 表示法

