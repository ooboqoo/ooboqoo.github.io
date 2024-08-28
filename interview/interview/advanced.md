# 面试题库-前端进阶


### 宏任务与微任务

||||
-------|--------------------------------|--------------
 宏任务 | I/O                            |
 宏任务 | setTimeout                     |
 宏任务 | setInterval                    |
 宏任务 | setImmediate                   | nodejs only
 宏任务 | requestAnimationFrame          | browser only
|||
 微任务 | Promise.then / cache / finally |
 微任务 | process.nextTick               | nodejs only
 微任务 | MutationObserver               | browser only


```js
console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
new Promise((resolve, reject) => {
  console.log(4)
  resolve()
}).then(data => {
  console.log(5)
  setTimeout(() => console.log(6), 0)
})

// 输出 1 4 3 5 2 6
```




