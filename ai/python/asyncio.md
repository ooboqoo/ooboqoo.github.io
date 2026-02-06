# Asynchronous I/O 协程


asyncio is a library to write *concurrent* code using the *async/await* syntax.

asyncio = Python 的原生异步框架，让你在等待 I/O 时不阻塞，把时间让给别的任务。

```py
import asyncio

async def main():
    print('Hello ...')
    await asyncio.sleep(1)
    print('... World!')

asyncio.run(main())
```







## API

asyncio.sleep()  // 模拟 IO 事件

asyncio.event()

asyncio.as_completed
asyncio.gather
asyncio.to_threads

asyncio.get_event_loop()
asyncio.run_until_complete()
asyncio.wait()



用户级线程

时间片

调度


协程 vs 线程
* 协程的多个 task 之间的代码执行顺序是可预测的。


### 待整理

`__init__.py` 的作用：定义一个包的行为
* 包的初始化
* 管理包接口
  * `__all__` 定义的是，使用 `import *` 时导入哪些东西。
* 包的信息
  * `__version__` `__author__` 等等信息


## 核心概念

### async def

定义一个 **协程函数**（异步函数）

### await

等待一个“异步操作”完成

### 事件循环 Event Loop

asyncio 的核心：调度所有协程的执行。

```py
asyncio.run(main()) # 事件循环会自动创建和关闭
```

### 关键知识点

1. 异步 ≠ 多线程：asyncio 只有一个线程，只是利用等待 I/O 的空档去执行别的任务
2. await 会“让出控制权”：遇到 await，协程暂停，让 event loop 调度别人。
3. CPU 密集型任务不适合 asyncio：如：视频处理、加密 → 用多线程/多进程。


## 常用功能

### 并发执行 `create_task()`

让多个任务同时执行（并发）

```py
import asyncio

async def job(n):
    print(f"start {n}")
    await asyncio.sleep(1)
    print(f"done {n}")

async def main():
    t1 = asyncio.create_task(job(1))
    t2 = asyncio.create_task(job(2))
    await t1
    await t2

asyncio.run(main())

# 输出
start 1
start 2
done 1
done 2
```

### 并发收集结果：`gather()`

```py
results = await asyncio.gather(
    job(1),
    job(2),
    job(3),
)
```

### 异步上下文 `async with`

```py
async with page.expect_popup() as popup_info:
    await page.click("open the popup")
popup = await popup_info.value
```

逻辑解释：
* async with XXX: 会进入一个异步上下文
* Playwright 在上下文里 监听 popup 出现
* 结束后你得到 popup_info.value（未来的 popup 对象）

### 异步迭代 `async for`

```py
async for line in async_file:
	print(line)
```

## async.Lock

* 解决的是：多个协程同时修改共享资源的问题
* 只能在同一个 event loop 内生效

### 基本用法

```py
import asyncio

lock = asyncio.Lock()

async def worker(name):
    async with lock:
        print(f"{name} acquired lock")
        await asyncio.sleep(1)
        print(f"{name} released lock")

async def main():
    await asyncio.gather(
        worker("A"),
        worker("B"),
        worker("C"),
    )

asyncio.run(main())

# 执行效果（串行）
A acquired lock
A released lock
B acquired lock
B released lock
C acquired lock
C released lock
```

`async with lock` 写法的优点
* 自动释放锁（即使抛异常）
* 语义清晰
* 不容易写错

### 原理（手动 acquire / release）

```py
lock = asyncio.Lock()

async def worker():
    await lock.acquire()
    try:
        await asyncio.sleep(1)
    finally:
        lock.release()  # 一定要放 finally
```

### 常见用法

#### 保护共享内存变量

```py
counter = 0
lock = asyncio.Lock()

async def inc():
    global counter
    async with lock:
        tmp = counter  # 如果没有锁，tmp 会导致 counter 被并发写乱。
        await asyncio.sleep(5)
        counter = tmp + 1
```

#### Lock 作为对象属性

这是 async class 的标准写法。

```py
class Cache:
    def __init__(self):
        self._lock = asyncio.Lock()
        self._data = {}

    async def get(self, key):
        async with self._lock:
            return self._data.get(key)
```




## 待整理

https://www.bilibili.com/video/BV1oa411b7c9/?spm_id_from=333.337.search-card.all.click&vd_source=f9e36835843450ab8a4cb669b15342c0

https://docs.python.org/3/library/asyncio.html

asyncio 还是 Python 运行的单进程单线程的程序，并不能提示你的运算速度，它比较适合处理那些需要等待的任务，最典型的就是网络通信。
asyncio 的核心就是 Event Loop

*一个线程下只能跑一个 Event Loop*

EventLoop 开始跑一个 task 之后，必须等 task *让出控制权*之后，才会去寻找下一个可执行 task。有两种情况下会让出控制权
* 碰到 `await` // 当前 task 没有执行完毕，中途让出控制权给 EventLoop
* task 执行完毕



核心概念 coroutine / task

coroutine function `async def` 开头的都叫 coroutine function，定义了一个 coroutine 的过程
coroutine object，调用 coroutine function 会返回一个 coroutine object，它的本质跟生成器函数有点像


evnet loop 的核心是有很多个 task，然后它来决定哪个 task 要运行。


```py
# coroutine_object 和 task 的差别
async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

coroutine1 = say_after(1, 'coroutine1')
coroutine1 = say_after(1, 'coroutine2') # 需要碰到 await 时才开始执行
await coroutine1  # 这个时候 coroutine2 不会开始执行
await coroutine2

task1 = asyncio.create_task(say_after(1, 'task1')) # 创建 task 并注册到 EventLoop
task1 = asyncio.create_task(say_after(1, 'task2')) # task 创建就开始执行
await task1  # 这个时候 task2 已经在同步执行了
await task2
```

`await coroutine_object` 做的事情
* 将 coroutine_object 变成 task
* 把当前协程挂起（暂停执行）
* 把执行权交还给事件循环 (Event Loop)
* Event Loop 执行完新 task 后，判断当前协程又满足继续执行的条件，决定继续执行当前协程
* 回来执行当前协程时，await 会把 coroutine_object 的返回值取出来



有两种方式将 coroutine_object 变成 task
* await
* asyncio.gather




