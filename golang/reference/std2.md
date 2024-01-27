# Standard library Part 2

https://pkg.go.dev/std


### sync

#### `WaitGroup`

在业务代码中常用 `WaitGroup` 和 `Once` 来实现并发任务的同步。

`sync.WaitGroup` 内部维护着一个计数器，计数器的值可以增加和减少。当我们需要启动 delta 个并发任务时，就将计数器值增加 delta `Add(delta)`。每个任务完成时通过调用 `Done()` 将计数器减1。通过调用 `Wait()` 来等待并发任务执行完，当计数器值为 0 时，表示所有并发任务已经完成。

```go
// A WaitGroup waits for a collection of goroutines to finish.
type WaitGroup struct {
  state atomic.Uint64 // high 32 bits are counter, low 32 bits are waiter count.
}
// 计数器+delta
func (wg *WaitGroup) Add(delta int)
// wg.Add(-1)
func (wg *WaitGroup) Done()
// Wait blocks until the WaitGroup counter is zero.
func (wg *WaitGroup) Wait()
```

```go
var wg sync.WaitGroup

func hello() {
	defer wg.Done()
	fmt.Println("hello")
	time.Sleep(time.Second)
}

func main() {
	wg.Add(2)
	go hello()
	go hello()
	wg.Wait()  // 这里会阻塞后续逻辑，等全部并发任务完成后才继续往下执行
	fmt.Println("world")
}

// Output: hello\nhello\nworld
```

另外，很多场景下我们需要确保某些操作在高并发的场景下只执行一次，例如只加载一次配置文件、只关闭一次通道等。`sync.Once` 就是针对这种应用场景的。

```go
// 内部包含一个互斥锁和一个布尔值，互斥锁保证布尔值和数据的安全，而布尔值用来记录初始化是否完成。
// 这样设计就能保证初始化操作的时候是并发安全的并且初始化操作也不会被执行多次。
type Once struct {
	done uint32
	m    Mutex
}
func (o *Once) Do(f func()) {
	if atomic.LoadUint32(&o.done) == 0 {
		o.doSlow(f)
	}
}
```

```go
var icons map[string]image.Image

var loadIconsOnce sync.Once

func loadIcons() {
    icons = map[string]image.Image{
        "left":  loadIcon("left.png"),
        "up":    loadIcon("up.png"),
        "right": loadIcon("right.png"),
        "down":  loadIcon("down.png"),
    }
}

// Icon 是并发安全的
func Icon(name string) image.Image {
    loadIconsOnce.Do(loadIcons)
    return icons[name]
}
```

#### `Mutex` & `RWMutex`

Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

* sync.Mutex 互斥锁
* sync.RWMutex 读写锁，适合读多写少的场景
	- rwlock.Lock() 加 **写锁**，其他协程获取读锁和写锁都会被阻塞
	- rwlock.RLock() 加 **读锁**，其他协程可正常获取读锁，但获取写锁时阻塞

使用互斥锁能够保证同一时间只有一个协程使用资源，多个协程同时等待一个锁时，唤醒哪个是随机的。

```go
// A Mutex is a mutual exclusion lock.
// The zero value for a Mutex is an unlocked mutex.
// A Mutex must not be copied after first use. 复制了就不是同一把锁了，运行不报错但逻辑不符合预期
type Mutex struct {
	state int32
}

// If the lock is already in use, the calling goroutine blocks until the mutex is available.
func (m *Mutex) Lock()

// It is a run-time error if m is not locked on entry to Unlock.
//
// A locked Mutex is not associated with a particular goroutine.
// It is allowed for one goroutine to lock a Mutex and then arrange for another goroutine to unlock it.
func (m *Mutex) Unlock()
```

```go
// The lock can be held by an arbitrary number of readers or a single writer.
// A RWMutex must not be copied after first use. 复制了就不是同一把锁了，运行不报错但逻辑不符合预期
type RWMutex struct {
	w           Mutex        // held if there are pending writers
	writerSem   uint32       // semaphore for writers to wait for completing readers
	readerSem   uint32       // semaphore for readers to wait for completing writers
	readerCount atomic.Int32 // number of pending readers
	readerWait  atomic.Int32 // number of departing readers
}
func (rw *RWMutex) Lock()
func (rw *RWMutex) Unlock()
func (rw *RWMutex) RLock()
func (rw *RWMutex) RUnlock()
```

```go
var (
	x      int64
	wg     sync.WaitGroup
	lock   sync.Mutex
	rwlock sync.RWMutex
)

func write() {
	defer wg.Done()
	rwlock.Lock()                     // 加写锁
	x = x + 1
	time.Sleep(10 * time.Millisecond) // 假设读操作耗时10毫秒
	rwlock.Unlock()                   // 解写锁
}

func read() {
	defer wg.Done()
	rwlock.RLock()                    // 加读锁
	time.Sleep(10 * time.Millisecond) // 假设读操作耗时1毫秒
	rwlock.RUnlock()                  // 解读锁
}

func main() {
	start := time.Now()
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go write()
	}
	wg.Wait()
	writeEnd := time.Now()
	fmt.Println("写一千次耗时 ", writeEnd.Sub(start))

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go read()
	}
	wg.Wait()
	readEnd := time.Now()
	fmt.Println("读一千次耗时 ", readEnd.Sub(writeEnd))
}

// Output:
// 写一千次耗时  10.75054236s
// 读一千次耗时  11.36648ms
```

#### `Map`

Go 内置的 map 不是并发安全的，当大量协程同时修改一个 map 时就可能会出现报错: "fatal error: concurrent map writes"。
`sync.Map` 则是一个开箱即用的并发安全版 map，开箱即用即无需初始化就能用，而内置的 map 需要初始化后才能使用。

```go
var m = sync.Map{}

func main() {
  wg := sync.WaitGroup{}
  for i := 0; i < 20; i++ {
    wg.Add(1)
    go func(n int) {
      defer wg.Done()
      key := strconv.Itoa(n)
      m.Store(key, n)
      value, _ := m.Load(key)
      fmt.Printf("k=:%v,v:=%v\n", key, value)
    }(i)
  }
  wg.Wait()
}
```

#### `sync/atomic`

代码中的加锁操作因为涉及内核态的上下文切换会比较耗时。针对基本数据类型我们还可以使用原子操作来保证并发安全，因为原子操作是Go语言提供的方法，在用户态就可以完成，因此性能比加锁操作更好。

```go
func LoadInt32(addr int32) (val int32)
func StoreInt32(addr *int32, val int32)
func AddInt32(addr *int32, delta int32) (new int32)
func SwapInt32(addr *int32, new int32) (old int32)
func CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)
```

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

var x int64
var l sync.Mutex
var wg sync.WaitGroup

// 普通版加函数
func add() {
	x++ // 等价于上面的操作
	wg.Done()
}

// 互斥锁版加函数
func mutexAdd() {
	l.Lock()
	x++
	l.Unlock()
	wg.Done()
}

// 原子操作版加函数
func atomicAdd() {
	atomic.AddInt64(&x, 1)
	wg.Done()
}

func test(title string, fn func()) {
	x = 0
	start := time.Now()
	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go fn()
	}
	wg.Wait()
	end := time.Now()
	fmt.Println(title, x, end.Sub(start))
}

func main() {
	test("普通版\t\t", add)        // 普通版add函数：不是并发安全的（计算结果不符合预期）
	test("加锁版\t\t", mutexAdd)   // 加锁版add函数：是并发安全的，但是加锁性能开销大
	test("原子操作版\t", atomicAdd) // 原子操作版add函数：是并发安全，性能优于加锁版
}

// Output:
// 普通版     9530 3.665309ms
// 加锁版     10000 2.329634ms
// 原子操作版  10000 1.958157ms
```

### flag

flag包 实现了命令行参数的解析

```go
func main() {
    // 定义命令行参数方式1
    var name string
    var age int
    flag.StringVar(&name, "name", "张三", "姓名")
    flag.IntVar(&age, "age", 18, "年龄")

    // 解析命令行参数
    flag.Parse()

    fmt.Println(name, age)
    fmt.Println(flag.Args())   // 命令行参数后的其他参数
    fmt.Println(flag.NArg())   // 命令行参数后的其他参数个数
    fmt.Println(flag.NFlag())  // 使用的命令行参数个数
}

// $ go run main.go -name gavin a b c -foo
// gavin 18
// [a b c -foo]
// 4
// 1
```


### net/http

server 端

```go
func indexHandler(w http.ResponseWriter, r *http.Request) {
	// 随机出现慢响应
	number := rand.Intn(2)
	if number == 0 {
		time.Sleep(time.Second * 2) // 耗时2秒的慢响应
		fmt.Fprintf(w, "slow response")
		return
	}
	fmt.Fprint(w, "quick response")
}

func main() {
	http.HandleFunc("/", indexHandler)
	fmt.Printf("server listen on 8000\n")
	err := http.ListenAndServe("127.0.0.1:8000", nil)
	if err != nil {
		panic(err)
	}
}
```

```go
import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	resp, err := http.Get("http://127.0.0.1:8000")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	fmt.Println(resp.Status)
	fmt.Println(resp.Header)

	buf := make([]byte, 1024)
	for {
		n, err := resp.Body.Read(buf)
		if err != nil && err != io.EOF {
			fmt.Println(err)
			return
		} else {
			fmt.Println(string(buf[:n]))
			break
		}
	}
}

```

#### context

Incoming requests to a server should create a Context, and outgoing calls to servers should accept a Context.



### text/template

```go
type Inventory struct {Material string; Count uint}
sweaters := Inventory{"wool", 17}
tmpl, err := template.New("test").Parse("{{.Count}} items are made of {{.Material}}")
if err != nil { panic(err) }
err = tmpl.Execute(os.Stdout, sweaters)  // prints "17 items are made of wool"
if err != nil { panic(err) }
```

### html/template


### sort

Package sort provides primitives for sorting slices and user-defined collections.

```go
func Ints(x []int)  // sorts a slice of ints in increasing order
func Reverse(data Interface) Interface  // returns the reverse order for data
// SearchInts searches for x in a sorted slice of ints and returns the index as specified by Search.
// The return value is the index to insert x if x is not present. The slice must be sorted in ascending order.
func SearchInts(a []int, x int) int
func (x StringSlice) Swap(i, j int)
```


### container

container/heap  -- 提供了一些操作堆的工具函数

A heap is a tree with the property that each node is the minimum-valued node in its subtree.

A heap is a common way to implement a priority queue.

```go
type Interface interface {
	sort.Interface
	Push(x any) // add x as element Len()
	Pop() any   // remove and return element Len() - 1.
}
```

数组、队列、栈 底层都是数组，这里的 堆 的底层也是数组，然后基于树的概念管理数组（每个操作基本都会涉及到重新排序）

container/list -- a doubly linked list

```go
// Element is an element of a linked list.
type Element struct {
	// Next and previous pointers in the doubly-linked list of elements.
	// To simplify the implementation, internally a list l is implemented
	// as a ring, such that &l.root is both the next element of the last
	// list element (l.Back()) and the previous element of the first list
	// element (l.Front()).
	next, prev *Element

	// The list to which this element belongs.
	list *List

	// The value stored with this element.
	Value any
}

// List represents a doubly linked list.
// The zero value for List is an empty list ready to use.
type List struct {
	root Element // sentinel list element, only &root, root.prev, and root.next are used
	len  int     // current list length excluding (this) sentinel element
}
```

container/ring -- a circular list

```go
// A Ring is an element of a circular list, or ring.
// Rings do not have a beginning or end; a pointer to any ring element
// serves as reference to the entire ring. Empty rings are represented
// as nil Ring pointers. The zero value for a Ring is a one-element
// ring with a nil Value.
type Ring struct {
	next, prev *Ring
	Value      any // for use by client; untouched by this library
}
```

### unsafe

```go
// get the size of int on your machine
func main() {
	size := unsafe.Sizeof(int(0))
	fmt.Printf("Size of int: %d bytes\n", size)
}
```
