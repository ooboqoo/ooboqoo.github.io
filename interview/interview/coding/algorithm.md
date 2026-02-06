# 算法面试


## 归并排序

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


## 快速排序

```js
function quickSort(arr) {
  if (arr.length === 1) { return; }
  quick(arr, 0, arr.length - 1);

  function quick(arr, left, right) {
    // 一次分组后，左边组的值 <= arr[index]，右边组的值 >= arr[index]，多个相同 arr[index] 会均分到两边
    const index = partition(arr, left, right);
    if (left < index - 1) { quick(arr, left, index -1); }
    if (index < right) { quick(arr, index, right); }
  }

  // 分组操作，小于 pivot 的值在左，大于 pivot 的值在右，多个 pivot 值会均分到两边
  // 单个 pivot 值正常情况下在左，但如果是最大值就会跑到右边
  function partition(arr, left, right) {
    const pivot = arr[Math.floor((left + right) / 2)];  // 选择主元，可随机选
    while (left <= right) {
      while (arr[left] < pivot) { left++; }
      while (arr[right] > pivot) { right--; }
      if (left <= right) {  // 如改成 < 则 pivot 在右，但无法跳出外层 while 导致死循环
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
    return left; 
  }
}
```


## 二分查找

```c
int bsearch(int *a, int size, int value) {
  int low = 0;
  int high = size - 1;

  while (low <= high) {                // 循环条件是 <= 不能写成 <
    int mid = low + (high - low) / 2;  // 不能写成 `(low + high) / 2`，存在溢出风险
    if (a[mid] == value)               // 如果要将性能优化到极致，还可以写成 `low + (high - low >> 1)`
      return mid;
    else if (a[mid] < value)
      low = mid + 1;
    else
      high = mid - 1;
  }

  return -1;
}
```

```c
// 查找第一个值等于给定值的元素
// 写法1: 过于追求代码的简洁性
int bsearch(int *a, int size, int value) {
  int low = 0, hight = size - 1;
  while (low <= high) {
    int mid = low + ((high - low) >> 1);
    if (a[mid] >= value) high = mid - 1;  // 关键处理步骤
    else low = mid + 1;
  }
  return (low < size && a[low] == value) ? low : -1;
}
```

```c
// 查找第一个大于等于给定值的元素
int bsearch(int *a, int size, int value) {
  int low = 0;
  int high = size - 1;
  while (low <= high) {
    int mid =  low + ((high - low) >> 1);
    if (a[mid] >= value) {
      if ((mid == 0) || (a[mid - 1] < value)) return mid;
      else high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
```







