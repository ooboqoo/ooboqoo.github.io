# Iterator &amp; Generator &amp; async

## Iterator 和 for...of 循环

### 与其他遍历语法的比较

以数组为例，JavaScript提供多种遍历语法。最原始的写法就是for循环。

```javascript
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```

这种写法比较麻烦，因此数组提供内置的forEach方法。

```javascript
myArray.forEach(function (value) {
  console.log(value);
});
```

这种写法的问题在于，无法中途跳出`forEach`循环，break命令或return命令都不能奏效。

`for...in`循环可以遍历数组的键名。

```javascript
for (var index in myArray) {
  console.log(myArray[index]);
}
```

for...in循环有几个缺点。

- 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
- for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，for...in循环会以任意顺序遍历键名。

总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

`for...of`循环相比上面几种做法，有一些显著的优点。

```javascript
for (let value of myArray) {
  console.log(value);
}
```

- 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
- 不同用于forEach方法，它可以与break、continue和return配合使用。
- 提供了遍历所有数据结构的统一操作接口。

下面是一个使用break语句，跳出`for...of`循环的例子。

```javascript
for (var n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```

上面的例子，会输出斐波纳契数列小于等于1000的项。如果当前项大于1000，就会使用break语句跳出`for...of`循环。

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
  * 更广的适用性: co 模块约定，yield 后面只能是 Thunk 函数或 Promise 对象，而 await 后面可以是 Promise 对象和原始值类型
  * 返回值是 Promise，这比 Generator 函数的返回值是 Iterator 对象方便多了

进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。
