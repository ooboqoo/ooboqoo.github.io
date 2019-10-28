# 面试题库 - 框架原理


### 中间件实现

中间件的实现非常简单，下面的 compose 就是一摸一样抄的 Redux 的源码。

```js
function compose(...fns) {
  if (fns.length === 0) return a => a
  if (fns.length === 1) return fns[0]
  return fns.reduce((f1, f2) => (...args) => f1(f2(...args)))
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

### XMLHttpRequest 封装

axios 是前端发起请求的最优方案

```js
axios.request = function (config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status < 299) {
        resolve(xhr.response)
      } else {
        reject({code: xhr.status, message: xhr.statusText})
      }
    }
  })
}
```







