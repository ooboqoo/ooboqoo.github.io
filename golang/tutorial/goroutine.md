# 并发编程

https://www.topgoer.com/并发编程/


* 并发：多线程程序在单个核上运行，多个线程交替占用CPU时间
* 并行：多线程程序在多个核上运行，在同一个时间点多线程同时运行

## 协程

### 概念

协程 goroutine 是由 Go runtime 管理的轻量级线程。使用协程非常简单，只需要在调用函数的时候在前面加上 `go` 关键字，就可以为函数创建一个协程。*一个协程必定对应一个函数*，可以创建多个协程去执行相同的函数。

```golang
go f(x, y, z)  // f, x, y, z 的求值发生在当前协程，而 f 的执行发生在新的协程中
```

启动单个 goroutine

```go
func hello() {
    fmt.Println("Hello Goroutine!")
}
func main() {
    go hello()
    fmt.Println("main goroutine done!")
    // 以上程序运行，只会打印 "main goroutine done!" 而不会打印 "Hello Goroutine!"
    // 因为当 main 结束的时候，所有在 main 中启动的 goroutine 会一并结束
    // 所以最简单粗暴的方式，就是用 time.Sleep 让 main 等一等 hello 执行
    // time.Sleep(time.Second)
}
```

启动多个协程 （借助 `sync.WaitGroup` 来实现协程的同步）

```go
var wg sync.WaitGroup

func hello(i int) {
  defer wg.Done()       // 协程结束计数器 -1
  fmt.Printf("%d ", i)
}

func main() {
  for i := 0; i < 10; i++ {
    wg.Add(1)          // 启动一个协程计数器 +1，即 wg.state.v += 1
    go hello(i)
  }
  wg.Wait()            // 等待所有登记的协程都结束
}

// Output: 9 7 0 1 5 2 8 4 3 6    注：每次输出的顺序不固定
```

### 高效

操作系统线程一般都有固定的栈内存（通常为 *2MB*），一个协程的栈在其生命周期开始时只有很小的栈（典型情况下 *2KB*），且可以按需增大和缩小（可达 *1GB*）。所以在 Go 语言中一次创建 *十万左右* 的协程也是可以的。

GPM 是 Go 运行时 (runtime) 层面的实现，是 Go 自己实现的一套调度系统。...


### 并发安全

协程间共享相同的地址空间，因此在访问共享的内存时必须进行同步。`sync` 包提供了这种能力，不过应用开发中信道更为常用。

互斥锁示例

```go
import (
  "fmt"
  "sync"
)

type Counter struct {
  value int
  mu    sync.Mutex
}

func (c *Counter) Increment() {
  c.mu.Lock()
  defer c.mu.Unlock()
  c.value++
}

func (c *Counter) GetValue() int {
  c.mu.Lock()
  defer c.mu.Unlock()
  return c.value
}

func main() {
  counter := Counter{}

  var wg sync.WaitGroup
  wg.Add(10)

  for i := 0; i < 10; i++ {
    go func() {
      defer wg.Done()
      counter.Increment()
    }()
  }

  wg.Wait()

  fmt.Println("Counter value:", counter.GetValue())
}
```

信道示例

```go
import (
  "fmt"
  "sync"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
  defer wg.Done()
  for j := range jobs {
    fmt.Printf("Worker %d started job %d\n", id, j)
    // Simulating some work
    result := j * 2
    fmt.Printf("Worker %d finished job %d, result: %d\n", id, j, result)
    results <- result
  }
}

func main() {
  const numJobs = 5
  numWorkers := 3

  jobs := make(chan int, numJobs)
  results := make(chan int, numJobs)
  var wg sync.WaitGroup

  // Launching the workers
  for i := 1; i <= numWorkers; i++ {
    wg.Add(1)
    go worker(i, jobs, results, &wg)
  }

  // Sending jobs to the workers
  for j := 1; j <= numJobs; j++ {
    jobs <- j
  }
  close(jobs)

  // Collecting results from the workers
  wg.Wait()
  close(results)

  // Printing the results
  for res := range results {  // `range`: 对于未关闭的信道，只要不死锁，range 就会一直阻塞等待新数据
    fmt.Println("Result:", res)
  }
}
```

### runtime 包

```go
// yields the processor, allowing other goroutines to run
// 轮到我了，但我还不满足执行的条件，所以告诉调度器“下一位先来”
runtime.Gosched()
// terminates the goroutine that calls it
runtime.Goexit()
```


## `sync` 同步

https://pkg.go.dev/sync

Package `sync` provides basic synchronization primitives such as mutual exclusion locks. Other than the `Once` and `WaitGroup` types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

Values containing the types defined in this package should not be copied.

### 并发管理 `WaitGroup` & `Once`

略，见 std2 笔记

### 互斥锁 `Mutex` & `RWMutex`

略，见 std2 笔记

* sync.Mutex 互斥锁
* sync.RWMutex 读写锁，适合读多写少的场景
  - rwlock.Lock() 加 **写锁**，其他协程获取读锁和写锁都会被阻塞
  - rwlock.RLock() 加 **读锁**，其他协程可正常获取读锁，但获取写锁时阻塞

### 并发安全 `Map`

略，见 std2 笔记



## 信道

> 不通过共享内存来通信，用通信来共享内存 https://go.dev/blog/codelab-share

信道 channel 是用来传递数据（带有类型）的一个管道（即，也是一种数据结构）。

信道默认不带缓冲区，发送和接收操作在另一端准备好前会 *阻塞*。这使得协程可以在没有 显式的锁 或 竞态变量 的情况下进行同步。

* `ch := make(chan int)`: 不带缓冲区，不发生额外的数据拷贝；读在写之前发生
  - `receiveOnlyChan := make(chan<- int)` 操作符 `<-` 用于指定信道方向(发送或接收)，如未指定则为双向通道
* `ch := make(chan int, n)`: 带缓冲区，发生数据拷贝；写在读之前发生

```golang
func main() {
  ch := make(chan int)    // 创建一个不带 buffer，元素类型为 int 的信道
  wg := sync.WaitGroup{}
  wg.Add(1)
  go func() {
    defer wg.Done()
    for {
      v, ok := <-ch       // 从 ch 接收值并赋予 v
      if !ok {            // 第二个参数用于判断信道是否关闭
        break
      }
      fmt.Println(v)
    }
  }()
  ch <- 5                 // 发送数据至信道 ch
  ch <- 6
  ch <- 7
  close(ch)               // 关闭信道
  wg.Wait()  // 如果没有这个 wait，多数情况下只能打印 5 6，协程基本来不及打印 7 就退出了
}
```

Channels 是引用类型，可直接传递而不会发生「值拷贝」

```go
func main() {
  c := make(chan int)
  b := c  // 可以看到 b c 是同一个地址，直接传递就行。作为对比，Mutex 是 struct，会发生复制，要取指针再传
  fmt.Printf("ptr of c %p \n", c)
  fmt.Printf("ptr of b %p \n", b)
}
```

应用示例：监听到指令才退出程序

```go
func main() {
  c := make(chan os.Signal, 1)
  signal.Notify(c, syscall.SIGTERM, syscall.SIGINT, syscall.SIGQUIT, syscall.SIGHUP, syscall.SIGABRT)
  <-c
  print("quit")
}
```

#### 信道缓冲区

信道可以带缓冲区，将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道。

仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。如果通道不带缓冲，发送方会阻塞直到接收方从通道中接收了值。

带缓冲区的信道允许发送端的数据发送和接收端的数据获取处于 *异步* 状态。

```golang
func main() {
  ch := make(chan int, 2)  // 使用 make 创建信道
  ch <- 1
  ch <- 2
  // ch <- 3         // fatal error: all goroutines are asleep - deadlock!
  fmt.Println(<-ch)
  fmt.Println(<-ch)
}
```

#### 关闭信道 close

发送者可通过 `close` 关闭一个信道来表示没有需要发送的值了。

* 只有 *发送者* 才能关闭信道
* 向一个已经关闭的信道发送数据会报错
* 接收者可以通过为接收表达式分配 *第二个参数* 来测试信道是否被关闭
* 信道与文件不同，通常情况下无需关闭，只有在需要确切地告诉接收者关闭时（如终止一个 range 循环）才要关闭

OP / CH | nil   | 非空    | 空的  | 满了   | 没满  | 关闭
--------|-------|--------|-------|------|-------|----------------
接收     | 阻塞   | 接收值  | 阻塞  | 接收值 | 接收值 | 读完数据后返回零值
发送     | 阻塞   | 发送值  | 发送值 | 阻塞  | 发送值 | panic
关闭     | panic | 成功    | 成功  | 成功  | 成功   | panic

```golang
func fibonacci(n int, c chan int) {
  x, y := 0, 1
  for i := 0; i < n; i++ {
    c <- x
    x, y = y, x+y
  }
  close(c)  // 关闭一个信道来表示没有需要发送的值了
}

func main() {
  c := make(chan int, 10)
  go fibonacci(cap(c), c)
  for i := range c {  // 循环 `for i := range c` 会不断从信道接收值（或阻塞），直到它被关闭
    fmt.Println(i)
  }
}
```

#### 遍历信道 select

https://go.dev/ref/spec#Select_statements

`select` 是信道场景下的 `switch`，用于支持同时响应多个信道。类似于 `switch` 语句，它有一系列 case分支 和 一个可选的 default分支。*每个 case 对应一个通道的通信（接收或发送）过程*。`select` 会一直等待，直到某个 case 的信道 "is ready to proceed"，如果多个信道同时可操作，则随机选择其中一个执行。

```txt
SelectStmt = "select" "{" { CommClause } "}"
CommClause = CommCase ":" StatementList
CommCase   = "case" ( SendStmt | RecvStmt ) | "default"
RecvStmt   = [ ExpressionList "=" | IdentifierList ":=" ] RecvExpr
RecvExpr   = Expression
```

`select` 的执行过程
1. 会对所有 case 按照代码顺序进行评估（SendStmt 中要发送的值会被计算，但 RecvStmt 中的变量赋值不会发生）（即，实际的信道操作不执行，但前置的其他副作用都会发生）
2. if 多个信道可操作 then 随机选择一个执行 elseif 只有一个信道可操作 then 执行之 elseif 存在 default 分支 then 执行之 else 阻塞
3. 如果 case 分支对应的是 RecvStmt，消息将会被接收并进行赋值(如果有赋值操作)
4. 执行 case 对应的 StatementList

```go
func main() {
  c := make(chan int, 1)

  for i := 0; i < 4; i++ {  // 大多数时候都会配合 for 使用，以实现 持续监听+处理
    select {                // 单独使用 select 的话，只进行一次信道操作就结束了
    case d := <-c:
      fmt.Println("<-ch ", d)
    case c <- i:
      fmt.Println("ch<- ", i)
    default:
      fmt.Println("default")
    // case rand.Intn(5) > 2:  // compiler error: select case must be send or receive
    }                          // (possibly with assignment)  SelectCase 专用于信道操作
  }

  fmt.Println("done")
}
// Output:
// ch<-  0
// <-ch  0
// ch<-  2
// <-ch  2
// done

// 改成 `c := make(chan i)` 后 Output
// default
// default
// default
// default
// done

// 然后再去掉 default 分支，直接报错
// fatal error: all goroutines are asleep - deadlock!
```

```golang
func fibonacci(c, quit chan int) {
  x, y := 0, 1
  for {
    select {
    case c <- x:
      x, y = y, x+y
      // 版本2：这里通过 fmt.Println(x) 就能看到 "当多个信道同时 ready 的时候，是随机选择执行的"
    case <-quit:
      fmt.Println("quit")
      return
    }
  }
}

func main() {
  c := make(chan int)        // 版本2，这里加缓冲区 make(chan int 10)
  quit := make(chan int)
  go func() {
    for i := 0; i < 10; i++ {
      fmt.Println(<-c)
    }
    quit <- 0
  }()
  fibonacci(c, quit)
}
```

当 select 中的其它分支都没有准备好时，default 分支就会执行。为了在尝试发送或者接收时不发生阻塞，可使用 default 分支。

```golang
import (
  "fmt"
  "time"
)

func main() {
  tick := time.Tick(100 * time.Millisecond)
  boom := time.After(500 * time.Millisecond)
  for {
    select {
    case <-tick:
      fmt.Println("tick.")
    case <-boom:
      fmt.Println("BOOM!")
      return
    default:
      fmt.Println("    .")
      time.Sleep(50 * time.Millisecond)
    }
  }
}
```

