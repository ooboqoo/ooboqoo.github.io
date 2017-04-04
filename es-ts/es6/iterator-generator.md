# Iterator &amp; Generator &amp; async

## Iterator 和 for...of 循环

遍历器 Iterator 是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作(即依次处理该数据结构的所有成员)。Iterator 的作用有三个：
  * 一是为各种数据结构，提供一个统一的、简便的访问接口；
  * 二是使得数据结构的成员能够按某种次序排列；
  * 三是 ES6 创造了一种新的遍历命令 `for...of` 循环，Iterator 接口主要供 `for...of` 消费。

如果使用 TypeScript 的写法，遍历器接口 Iterable、指针对象 Iterator 和 next 方法返回值的规格可以描述如下。

```ts
interface Iterable { [Symbol.iterator](): Iterator; }
interface Iterator { next(value?: any): IterationResult; }
interface IterationResult { value: any; done: boolean; }
```

```js
let a = [1,2,3,4];
    b = a[Symbol.iterator]();
b.next();                     // {value: 1, done: false}
```

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 `for...of` 循环。当使用 `for...of` 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是 "可遍历的" iterable。

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是 "可遍历的" iterable。

```js
for (let item of [1, 2, 3]) {
  console.log(item);  // 依次输出 1 2 3 
}
```


## Generator 函数

### 协程

传统的编程语言，早有异步编程的解决方案(其实是多任务的解决方案)，其中有一种叫做 "协程" coroutine，意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下。
  * 第一步，协程A开始执行。
  * 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
  * 第三步，（一段时间后）协程B交还执行权。
  * 第四步，协程A恢复执行。

上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权，即暂停执行。

整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。

```js
function* gen(x) {
  let y = yield x + 2;
  return y;
}

const g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

### 数据交换和错误处理

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

Generator 通过 `next` 方法返回值的 `value` 属性向外输出数据；通过 `next` 方法的参数接收外部输入。

```js
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next()  // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```js
function* gen(x){
  try { var y = yield x + 2; }
  catch (e) { console.log(e); }
  return y;
}

var g = gen(1); g.next(); g.throw('出错了');            // 输出："出错了"
var g = gen(1); g.next(); g.next(); g.throw('出错了');  // 此错误就不会被捕捉
```

### 流程管理

虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();
result.value.then(data => g.next(data.json()));
```

co 模块是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。

```js
var fs = require('fs');
var co = require('co');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

## async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

```js
const fs = require('fs');

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) { reject(error); }
      resolve(data);
    });
  });
}

async function asyncReadFile() {
  const f1 = await readFile('/etc/fstab'),
        f2 = await readFile('/etc/shells');
  console.log(f1.toString(), f2.toString());
};

const result = asyncReadFile();
result.then(() => console.log('执行完成'));
```

一比较就会发现，async 函数就是将 Generator 函数的星号 * 替换成async，将 yield 替换成 await，仅此而已。

async函数对 Generator 函数的改进，体现在以下四点:
  * 内置执行器
  * 更好的语义: async 和 await，比起 * 和 yield，语义更清楚
  * 更广的适用性: co 模块约定，yield 后面只能是 Thunk 函数或 Promise 对象，而 await 后面可以是 Promise 对象和原始值
  * 返回值是 Promise，这比 Generator 函数的返回值是 Iterator 对象方便多了

进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。
