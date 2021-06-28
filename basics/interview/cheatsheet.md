# 算法小抄


## JS 应用

节流防抖

```js
// 去抖函数，确保两次调用之间超过特定时长才真正执行
const debounce = (fn, ms = 200, context = window) => {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(context, args), ms);
  };
};

// 节流函数，在某一个时间段内，只执行一次
const throttle = (fn, wait = 200, context = window) => {
  let lastFn, lastTime = Date.now() - wait
  return function (...args) {
    if (Date.now() - lastTime >= wait) {
      fn.apply(context, args)
      lastTime = Date.now()
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function () {
        fn.apply(context, args)
        lastTime = Date.now()
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
```

深拷贝

```js
// 深拷贝，支持对象和数组，性能好。但没处理 null 和新的数据类型(如 Set 等)
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

// 用 reduce 实现
function reduce(arr) {
   return arr.reduce((prev, current)=>{
      return prev.concat(Array.isArray(current) ? reduce(current) : current)
   },[])
}
```

稳定排序

```js
// 两个要点：不改变原数组 + 如果两项一样，保持原有顺序
// 此处一个比较有参考意义的是 “双因子排序” 的用法
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({item, index}))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)  // “双因子排序” 写法
    .map(({item}) => item);
```

中间件

```js
function compose(...middlewares) {
  if (middlewares.length === 0) return next => next
  if (middlewares.length === 1) return middlewares[0]
  return middlewares.reduce((m, middleware) => next => m(middleware(next)))
}

function applyMiddleware (target, ...middlewares) {
  return compose(...middlewares)(target)
}

// 中间件的写法：接收一个被拦截函数，然后再返回一个新函数，这个新函数里包含了对被拦截函数的调用
const middleware1 = next => (...args) => {
  console.log('middleware1 before')
  const result = next(...args)
  console.log('middleware1 after')
  return result
}

const middleware2 = next => (...args) => {
  console.log('middleware2 before')
  const result = next(...args)
  console.log('middleware2 after')
  return result
}

let foo = (...args) => console.log(...args)

foo = applyMiddleware(foo, middleware1, middleware2)

foo(1, 2)

// middleware1 before
// middleware2 before
// 1 2
// middleware2 after
// middleware1 after
```


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
    if (a[mid] == value)               //     如果要将性能优化到极致，还可以写成 `low + ((high - low) >> 1)`
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







