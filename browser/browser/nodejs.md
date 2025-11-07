# Node.js

https://2ality.com/2022/09/nodejs-overview.html


The Node.js platform

![](https://2ality.com/2022/09/nodejs-overview/nodejs-architecture.svg)


## Event loop

By default, Node.js executes all JavaScript in a single thread, the *main thread*. The main thread continuously runs the *event loop* – a loop that executes chunks of JavaScript. Each chunk is a callback and can be considered a cooperatively scheduled task. The first task contains the code (coming from a module or standard input) that we start Node.js with. Other tasks are usually added later, due to:
* Code manually adding tasks
* I/O (input or output) with the file system, with network sockets, etc.
* Etc.

A first approximation of the event loop looks like this:

![](https://2ality.com/2022/09/nodejs-overview/simplified-event-loop.svg)

That is, the main thread runs code similar to:

```js
while (true) { // event loop
  const task = taskQueue.dequeue(); // blocks
  task();
}
```

Why is this loop called event loop? Many tasks are added in response to events, e.g. ones sent by the operating system when input data is ready to be processed.

How are callbacks added to the task queue? These are common possibilities:

* JavaScript code can add tasks to the queue so that they are executed later.
* When an event emitter (a source of events) fires an event, the invocations of the event listeners are added to the task queue.
* Callback-based asynchronous operations in the Node.js API follow this pattern:
	* We ask for something and give Node.js a callback function with which it can report the result to us.
	* Eventually, the operation runs either in the main thread or in an external thread (more on that later).
	* When it is done, an invocation of the callback is added to the task queue.

### Running to completion makes code simpler

An important rule for how Node.js runs JavaScript code is: Each task finishes (“runs to completion”) before other tasks run.

Running to completion means that task lifetimes don’t overlap and we don’t have to worry about shared data being changed in the background. That simplifies Node.js code.

```js
// server.mjs
import * as http from 'node:http';

let requestCount = 1;              // 不存在并发访问问题
const server = http.createServer(
  (_req, res) => { // (A)
    res.writeHead(200);
    res.end('This is request number ' + requestCount); // (B)
    requestCount++; // (C)
  }
);
server.listen(8080);
```

### Why does Node.js code run in a single thread?

That has two benefits:

* As we have already seen, *sharing data between tasks is simpler if there is only a single thread*.
* In traditional multi-threaded code, an operation that takes longer to complete blocks the current thread until the operation is finished. Examples of such operations are reading a file or processing HTTP requests. Performing many of these operations is expensive because we have to create a new thread each time. With an event loop, the per-operation cost is lower, especially if each operation doesn’t do much. That’s why *event-loop-based web servers can handle higher loads than thread-based ones*.

### The real event loop has multiple phases

The real event loop has multiple task queues from which it reads in multiple phases (you can check out some of the JavaScript code in the GitHub repository [nodejs/node](https://github.com/nodejs/node/blob/main/lib/internal/process/task_queues.js)).

* Phase *timers* invokes timed tasks that were added to its queue by:
	- `setTimeout(task, delay=1)` runs the callback task after delay milliseconds.
	- `setInterval(task, delay=1)` runs the callback task repeatedly, with pauses lasting delay milliseconds.
* Phase *poll* retrieves and processes I/O events and runs I/O-related tasks from its queue.
* Phase *check* (the “immediate phase”) executes tasks scheduled via:
	- `setImmediate(task)` runs the callback task as soon as possible (“immediately” after phase “poll”).

*Each phase runs until its queue is empty or until a maximum number of tasks was processed*. Except for “poll”, each phase waits until its next turn before it processes tasks that were added during its run. 除 "pool "外，每个阶段都要等到下一轮才会处理运行期间添加的任务。

### Next-tick tasks and microtasks

After each invoked task, a “sub-loop” runs that consists of two phases:

* Next-tick tasks, as enqueued via `process.nextTick()`.
* Microtasks, as enqueued via `queueMicrotask()`, Promise reactions, etc.

This sub-loop runs until both queues are empty. Tasks added during its run, are processed immediately – the sub-loop does not wait until its next turn.

### Comparing different ways of directly scheduling tasks

We can use the following functions and methods to add callbacks to one of the task queues:

* Timed tasks (phase “timers”)
	- `setTimeout()` (web standard)
	- `setInterval()` (web standard)
* Untimed tasks (phase “check”)
	- `setImmediate()` (Node.js-specific)
* Tasks that run immediately after the current task:
	- `process.nextTick()` (Node.js-specific)
	- `queueMicrotask()`: (web standard)

```js
// Next-tick tasks and microtasks vs. normal tasks
function enqueueTasks() {
  Promise.resolve().then(() => console.log('Promise reaction 1'));
  queueMicrotask(() => console.log('queueMicrotask 1'));
  process.nextTick(() => console.log('nextTick 1'));
  setImmediate(() => console.log('setImmediate 1')); // (A)
  setTimeout(() => console.log('setTimeout 1'), 0);

  queueMicrotask(() => console.log('queueMicrotask 2'));
  Promise.resolve().then(() => console.log('Promise reaction 2'));
  process.nextTick(() => console.log('nextTick 2'));
  setImmediate(() => console.log('setImmediate 2')); // (B)
  setTimeout(() => console.log('setTimeout 2'), 0);
}

// We use setImmediate() to avoid a pecularity of ESM modules: They are executed in microtasks, which means that if we enqueue microtasks at the top level of an ESM module, they run before next-tick tasks. As we’ll see next, that’s different in most other contexts.
setImmediate(enqueueTasks);

// nextTick 1           // current "check" phase - process.nextTick()
// nextTick 2
// Promise reaction 1   // current "check" phase - promise
// queueMicrotask 1     // current "check" phase - queueMicrotask()
// queueMicrotask 2
// Promise reaction 2   // promise 和 queueMicrotask 处于同一阶段，按添加的先后顺序执行
// setTimeout 1         // next "timer" phase
// setTimeout 2
// setImmediate 1       // next "check" phase
// setImmediate 2
```

```js
// Enqueuing next-tick tasks and microtasks during their phases
setImmediate(() => {
  setImmediate(() => console.log('setImmediate 1'));
  setTimeout(() => console.log('setTimeout 1'), 0);

  process.nextTick(() => {
    console.log('nextTick 1');
    process.nextTick(() => console.log('nextTick 2'));
  });

  queueMicrotask(() => {
    console.log('queueMicrotask 1');
    queueMicrotask(() => console.log('queueMicrotask 2'));
    process.nextTick(() => console.log('nextTick 3'));
  });
});

// nextTick 1
// nextTick 2
// queueMicrotask 1
// queueMicrotask 2        // queueMicrotask2 在 nextTick3 先执行，因为当前处于 Microtasks 阶段
// nextTick 3
// setTimeout 1
// setImmediate 1
```

```js
// Starving out event loop phases
import { readFile } from 'node:fs/promises';

function timers() {
  // OK
  setTimeout(() => timers(), 0);
}
function immediate() {
  // OK
  setImmediate(() => immediate());
}

function nextTick() {
  // starves I/O
  process.nextTick(() => nextTick());
}

function microtasks() {
  // starves I/O
  queueMicrotask(() => microtasks());
}

console.log('AFTER'); // always logged
// 这里执行 timers() immediate() 能输出下方文件内容
// 这里执行 nextTick() microtasks() 会卡死，下方文件内容一直没有机会输出
console.log(await readFile('./play.js', 'utf-8'));
```

```js
// 面试真题
async function async1() {  // 注意转成 Promise 后的版本形态，再答题
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('settimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```
