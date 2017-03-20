# Promise

承诺 就是……好吧，它就是一个承诺——在有了结果时，它承诺会回调我们。我们请求一个异步服务去做点什么，然后给它一个回调函数。它会去做 (无论用哪种方式)，一旦完成，它就会调用我们的回调函数，并通过参数把工作成果或者错误信息传给我们。

### 错误处理

```js
// func1 中虽然未对 Promise 进行错误处，但最终在 func2 中进行了处理，整个流程不会报错。
func1() {
    return getJSON('http://path/to/api').then(res => res.json());
}

func2() {
    this.func1().catch(error => this.handleError(error));
}
```


### Promise 异步递归卡死 Chrome 进程

https://www.web-tinker.com/article/20716.html

其实 Chrome 里的死循环并不可怕，因为它已经被浏览器预料，造成的影响是很有限的，而普通的无穷递归也并不可怕，因为它也被浏览器预料，会抛出堆栈满的错误。

setTimeout 之类的慢异步产生的无穷递归不会卡住任何东西，所以我们以前经常将它们用于动画（虽然现在有requestAnimationFrame了）。但同样是异步，Promise 就比这几位凶多了。如果 Promise 异步产生了无穷递归，它会卡死整个浏览器（所有 Chrome 进程）。

2017/03/20 试了下，过个几十秒直接内存不够。所以下方示例加了数量限制：

```js
let i, now;
i = 0; now = Date.now();
(function callee(){
  if (i++ > 1000000) return console.log(Date.now() - now);
  Promise.resolve().then(callee);
})();  // 耗时 5.5s

i = 0; now = Date.now();
(function callee() {
  if (i++ > 1000000) return console.log(Date.now() - now);
  callee();
})()  // i=7845 处 Chrome 报错 Uncaught RangeError: Maximum call stack size exceeded
```

### 异步函数按顺序执行

https://www.zhihu.com/question/39711453/answer/91885082

异步函数按顺序执行是老问题了，有各种各样的方法，Callback 就跳过不说了。

- Promise: 使用Promise.resolve将返回值变成Promise，之后就可以chain promise.then了。
- Event Emitter: 将每个函数封装成 EventEmitter，在函数执行完成时 emit 事件，之后将每个函数的on('end') 设成数组里的下一个函数
- Co + Generator: Co 是能将 Generator 转变成 async await 形式的库。主要使用 generator 的 yield 和 next 进行 Control Flow。
- Async Await: 这也是最简单最推荐的，ES7 的 Async Await 能让异步函数使用的像同步函数一样。

```js
let i, restPromise;
function promise() {
  if (++i < 2 || i > 999997) { console.log(i); }
  return Promise.resolve();
}
i = 0;
resPromise = promise();
while (i++ < 1000000 ) {
  restPromise = resPromise.then(promise);
}
i = 0;
console.log('output: ');

// 执行过程
// 1. 1
// 2. 内存瞬间上升(此时只会增加调用堆栈，promise 并不会执行)
// 3. output:
// 4. 1
// 5. 999998
// 6. 999999
```

采用 co + Generator 的好处是，不会增加调用堆栈：

```js
let i = 0;

function * gen() {
  while (i < 8000001) {
    if (i % 800000 === 0) console.log(Math.floor(i / 800000) + '0 %');
    yield i++;
  }
}

// co 的简化版本
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    gen = gen.apply(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      return Promise.resolve(ret.value).then(onFulfilled, onRejected);
    }
  });
}

co(gen);
```


### JavaScript支持的最大递归调用次数分析  

https://www.teakki.com/p/57dfb872d3a7507f975ec73c

你对JavaScript引擎能进行多少次递归调用好奇吗？

多少次递归调用

下面的函数可以让你找到答案： （灵感来自Ben Alman的 gist）

```js
function computeMaxCallStackSize() {
    try {
        return 1 + computeMaxCallStackSize();
    } catch (e) {
        // Call stack overflow
        return 1;
    }
}
```

三个结果：

Node.js: 11034
Firefox: 50994
Chrome: 10402

这些数字代表什么？Aleph先生指出，在V8中，递归调用的数量取决于两个量：堆栈的大小和堆栈帧（保存参数的局部变量）的大小。你可以通过在  computeMaxCallStackSize() 添加局部变量进行验证 － 它会返回低位值。

在ECMAScript 6中的尾部调用（Tail call）优化

ES6 有尾部调用优化 ：如果一个函数中的最后一步也是一个函数调用，它会被“跳”过，而不是通过子函数调用。这就意味着在ES6（严格模式）下，你只要稍微改一下computeMaxCallStackSize函数，它就可以永远执行下去。

```js
function computeMaxCallStackSize(size) {
    size = size || 1;
    return computeMaxCallStackSize(size + 1);
}
```