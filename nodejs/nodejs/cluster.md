# Node.js 集群

https://www.yuque.com/hpstream/id1e0k/xsu5k1#FEwyd


## 基础概念

### 进程、线程、协程

一个应用程序中至少包含一个进程，一个进程至少包含一个线程。而协程则是特定语言自己实现的一种调度能力。
* 进程是 *资源分配* 的最小单位。操作系统会以进程为单位，分配系统资源（CPU时间片，内存等资源）。保存在硬盘上的程序运行以后，会在内存空间里形成一个独立的内存体，这个内存体有自己独立的地址空间，有自己的堆，上级挂靠单位是操作系统。
* 线程是 *操作系统调度（CPU调度）执行* 的最小单位。
* 协程是一种用户态的轻量级线程，协程的调度完全由用户控制，即，操作系统无感知。

### Node.js 特性

* 一个进程中只有一个线程，即主线程
* 基于事件驱动，异步非阻塞 I/O
* 可用于高并发场景

Node.js 中没有多线程，为了充分利用多核 CPU，只能借助开多个子进程来实现。

基于 Node.js 的单线程特性，需要特别注意以下问题

* 做耗时（耗 CPU）计算的时候，会造成阻塞
* 需要实现进程守护，防止意外退出


## 单线程的缺点

Setp1：主线程因耗时运算阻塞时，所有请求都会被阻塞

```js
// v1_block.js
const http = require('http');
function timeConsumingOperation () {
  const end = Date.now() + 10000;
  while (Date.now() < end) {}
}
http.createServer((req, res) => {
  if (req.url === '/block') {
    timeConsumingOperation();
    res.end('/block done');
  } else {
    res.end('hello v1');
  }
}).listen(3000);

```

```bash
node v1_block
// 然后打开浏览器访问 /block，同时再另外开一个页签访问 /，此时能看到两个页签都在转圈圈
```

Step2：将 CPU 密集运算放到子进程执行，防止主线程被阻塞

```js
// time_consuming.js
;(function timeConsumingOperation () {
  const end = Date.now() + 10000;
  while (Date.now() < end) {}
})();

process.send({ time: new Date().getTime() });
```

```js
// v2_unblock.js
const http = require('http');
const { fork } = require('child_process');
const path = require('path');
http.createServer((req, res) => {
  if (req.url === '/block') {
    const childProcess = fork('time_consuming.js', { cwd: path.resolve(__dirname) });
    childProcess.on('message', msg => res.end('/block ' + msg.time));
    childProcess.on('error', err => res.end('/block ' + err));
  } else {
    res.end('hello v2');
  }
}).listen(3001);
```


## 子进程的使用

见 cheatsheet


## 实现集群



## PM2





