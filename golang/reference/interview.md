# 面试题


算法解题思路

1. 初始判断（边界情况）
2. 开头逻辑
3. 迭代逻辑
4. 结束逻辑




## 基础

### init 函数 与 main 函数

main 函数
* 不能带参数
* 不能定义返回值
* 所在的包必须为 main 包
* 可以使用 flag 包来获取和解析命令行参数

init 函数
* 可以定义若干个
* 不能被其他函数调用

### 常量无法寻址

常量不同于变量的在运行期分配内存，常量通常会被编译器在预处理阶段直接展开，作为指令数据使用，所以常量无法寻址。

```go
const i = 100
var j = 123

func main() {
	fmt.Println(&j, j)
	fmt.Println(&i, i)  // invalid operation: cannot take address of i
}
```

### 变量只声明不使用

如果存在未使用(重新分配一个新值不算被使用过)的变量代码将编译失败。但 全局变量 和 函数的参数 未使用可以正常编译。

另，常量只声明不使用能正常编译（但编辑器会报黄色）。

```go
var gvar int     // OK

func main() {
	var one int    // one declared and not used
	two := 2       // two declared and not used
	var three int  // three declared and not used
	three = 3

	func(unused string) {  // OK
		fmt.Println("Unused arg. No compile error")
	}("what?")
}
```

### 变量子作用域内先使用再声明

JS 会报错，Go 不会报错，运行正常。

```js
const a = 5;
function foo() {
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  const a = 10;
  console.log(a);
}
```

```go
var a int = 5
func foo() {
	println(a) // 5
	a := 10
	println(a) // 10
}
```

### 多重赋值

多重赋值分为两个步骤，有先后顺序：计算等号左边的索引表达式和取址表达式，接着计算等号右边的表达式；最后赋值

```go
func main() {
  i := 1
  s := []string{"A", "B", "C"}
  i, s[i-1] = 2, "Z"
  fmt.Printf("s: %v \n", s) // s: [Z B C]
}
```

### `nil` 不是关键字

```go
func main() {
	nil := 123
	fmt.Println(nil)  // 123
}
```

### `_` 是个特殊的存在

可以占位但不会进行取值操作

```go
// panic: runtime error: invalid memory address or nil pointer dereference
for k, v := range (*[3]int)(nil) {
  println(k, v)
}

for k, _ := range (*[3]int)(nil) { // 这里的循环可以正常进行
  println(k, _)  // cannot use _ as value or type
}
```

### `String()`

如果类型实现 String() 方法，当格式化输出时会自动使用 String() 方法。上面这段代码是在该类型的 String() 方法内使用格式化输出，导致递归调用，最后抛错。

```go
type ConfigOne struct{ Daemon string }

func (c *ConfigOne) String() string {
  return fmt.Sprintf("%v", c) // 编辑器黄色警告 causes recursive (*ConfigOne).String method call
}

func main() {
  c := ConfigOne{}
  fmt.Println(c) // 正常运行，会调用系统的 String() 方法，而不是这里的指针方法
  c.String()     // 这个会自动转为 (&c).String()，运行时递归调用报错
}
```


## 简单类型

### 数字字面量

```go
func main() {
  fmt.Println(10, 010, 001, 0x10) // 10 8 1 16  0开头是8进制，0x开头是16进制
}
```

### `-` 取负

对于 `int8` 类型来说，对 `i = 0` `i = -128` 时 `i == -i`，重点记 `-128 == --128`

取负内存操作步骤（对 正数、负数 都一样）
1. 按位取反
2. 加1

求负数的内存表示
1. 求相应正数内存表示
2. 按位取反
3. 加1

负数根据内存表示求数
1. 减1
2. 按位取反拿到正数值
3. 加负号

```txt
0 1111111    127
0 0000001      1
0 0000000      0
1 1111111     -1
1 0000000   -128
```

### 自增和自减

`i++` 和 `i--` 在 Go 语言中是 *语句*，不是表达式，因此不能赋值给另外的变量。此外不存在 `++i` 和 `--i`。


### 字符串长度

```go
func main() {
	str := "中国123"
	println(len(str))         // 9
	println(len([]rune(str))) // 5
}
```


## 控制结构

### `switch`

```go
func alwaysFalse() bool {
  return false
}

func main() {
  switch alwaysFalse()
  {
  case true:
    println(true)
  case false:
    println(false)
  }
}
// Output: true
```

以上代码格式化后为

```go
switch alwaysFalse(); {  // 同 if，`;` 之前为一个简单语句，之后才为条件表达式，此处为空
case true:
  println(true)
case false:
  println(false)
}
```


## 函数式编程

### 闭包引用反直觉

```go
func main() {
  str := "abc"
  for index, r := range str {
    go func() { println(index, string(r)) }()
  }
  time.Sleep(1 * time.Second)
}

// Output:
// 2 c
// 2 c
// 2 c
```

```go
// 前端习惯的解法
func main() {
	str := "abc"
	for index, r := range str {
		go func(index int, r rune) { println(index, string(r)) }(index, r)
	}
	time.Sleep(1 * time.Second)
}

// 后端习惯的解法
func main() {
	str := "abc"
	for index, r := range str {
		index, r := index, r
		go func() { println(index, string(r)) }()
	}
	time.Sleep(1 * time.Second)
}

// Output:
// 0 a
// 2 c
// 1 b
```

例2

```go
func main() {
	slice := []int{0, 1, 2, 3}
	m := make(map[int]*int)
	for key, val := range slice {
		m[key] = &val  // 迭代变的是 val 对应的地址中存放的值，val 的地址只有一个不会变
	}
	for k, v := range m {
		fmt.Println(k, "->", *v)
	}
}
```

### 函数比较

函数只能和 `nil` 比较，函数不能和函数比较，如果需要判断两个变量是否指向同一个函数，需要用到 `reflect.ValueOf(myFunc).Pointer()`。

### 递归

这个例子中的 f 不是递归

```go
var f = func(i int) {
	print("x")
}

func main() {
	f := func(i int) {
		print(i)
		if i > 0 {
			f(i - 1)  // 这里的 f 指向 main 外的 f
		}           // 因为过程是这样的，先对 func 求值，然后再赋值个左边的 f
	}
	f(10)
}
// Output: 10x
```

递归写法

```go
func factorial(n int) int {
  if n == 0 {
    return 1
  }
  return n * factorial(n-1)
}
```


## 复杂类型

### `append` nil slice

不能对 `nil` 的 map 直接赋值，需要使用 `make()` 初始化。

也无法通过下标访问 `nil` 的 slice，但可以为 `nil` 的 slice `append` 增加元素。

```go
func main() {
  var s1, s2 []int
  s1 = append(s1, 1)   // OK
  s2[0] = 1  // panic: runtime error: index out of range [0] with length 0

  var m map[string]int
  m["one"] = 1         // panic: assignment to entry in nil map
}
```

### 深入理解 slice 的 `append`

```go
func main() {
  a := [3]int{0, 1, 2}
  s := a[1:2]

  s[0] = 11
  s = append(s, 12) // 这个时候底层数组 cap 还够，所以 append 操作直接修改了底层数组
  s = append(s, 13)
  s[0] = 21

  fmt.Println(a) // [0 11 12]  易错点
  fmt.Println(s) // [21 12 13]
}
```


## 类型

### Named Type

我们知道不同类型的值是不能相互赋值的，即使底层类型一样；但如果 *至少有一个不是有名类型* 的话，底层类型相同的变量可以相互赋值。

"x's type V and T have identical underlying types and at least one of V or T is not a named type."

```go
type T int
func F(t T) {}
func main() {
  var q int
  F(q)  // 类型不匹配
}
```

```go
type T []int
func F(t T) {}
func main() {
  var q []int  // 这里的 []int 类型没有命名
  F(q)  // OK
}
```


## 方法与接口

### 寻址

本例中的 `X{}` 是不可寻址的，不能直接调用方法。知识点：在方法中，指针类型的接收者必须是合法指针（包括 nil），或能获取实例地址。

```go
type X struct{}

func (x *X) test() {
  println(x)
}
func main() {
  var a *X
  a.test()
  X{}.test()  // cannot call pointer method test on X
}
```

```go
// 注意区分本例中的3个地址，fn1 和 fn2 变量各自的地址，以及 fn1 fn2 共同指向的函数的地址
func main() {
  var fn1 = func() {}
  var fn2 = fn1
  fmt.Printf("%p %p", fn1, fn2)   // 0x104680370 0x104680370      函数存储地址
  fmt.Printf("%p %p", &fn1, &fn2) // 0x14000116018 0x14000116020  fn1 和 fn2 变量地址
}
```

### `nil` 比较

```go
func main() {
  x := any(nil)
  y := (*int)(nil)

  println(y == x)   // false    // 又是强类型语言跟弱类型语言的很大不同之处
  println(x == nil) // true
  println(y == nil) // true
}
```

```go
type Printable interface {
  Print() string
}

type Document struct {
  Filename string
}
func (doc *Document) Print() string { return doc.Filename }

func main() {
  var p Printable
  println(p == nil)   // true

  var doc *Document
  p = doc    // 这里的 p 和 doc 是完全不同的类型，两者的关系跟 切片 和 数组 的关系有点像
  println(doc == nil) // true
  println(p == nil)   // false
}
```

### 基于类型创建类型

当使用 type 声明一个新类型，它不会继承原有类型的方法集。

```go
type User struct {
  Name string
}

func (u *User) SetName(name string) {
  u.Name = name
  fmt.Println(u.Name)
}

type Employee User

func main() {
  employee := new(Employee)
  employee.SetName("Jack")  // 编译错误
}
```


## 并发

### 并发安全

并发读写 *变量* 可能导致结果不符合预期；并发读写 *map* 则会在运行中报错。

```go
func main() {
	count := 0
	for i := 0; i < 1000000; i++ {
		go func() {
			count++
		}()
	}

	// 先输出几行变动的数值
	// 然后停留在（大概） 930000 ~ 980000 之间的某个数值
	println(count)
	println(count)
	println(count)
	println(count)
	println(count)
}

// Output:
// 968740
// 968746
// 968747
// 968747
// 968747
```

### 锁失效

将 Mutex 作为匿名字段时，相关的方法必须使用指针接收者，否则会导致锁机制失效。

```go
import (
	"fmt"
	"sync"
	"time"
)

type data struct {
	sync.Mutex  // 解法2：通过嵌入 *Mutex 来避免复制的问题，但需要初始化
}

func (d data) test(s string) {  // 解法1：这里改成指针接收者 *data
	d.Lock()
	defer d.Unlock()

	for i := 0; i < 5; i++ {
		fmt.Println(s, i)
		time.Sleep(time.Second)
	}
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)
	var d data

	go func() {
		defer wg.Done()
		d.test("read")
	}()

	go func() {
		defer wg.Done()
		d.test("write")
	}()

	wg.Wait()
}
```

### 锁复制

加锁后复制变量，会将锁的状态也复制。

```go
type MyMutex struct {
  count int
  sync.Mutex
}

func main() {
  var mu MyMutex
  mu.Lock()
  var mu1 = mu  // 加锁后复制变量，会将锁的状态也复制
  mu.count++
  mu.Unlock()
  mu1.Lock()    // fatal error  重复加锁，mu1 其实是已经加锁状态
  mu1.count++
  mu1.Unlock()
  fmt.Println(mu.count, mu1.count)
}
```

### sync.WaitGroup

计数归零的 WaitGroup 无法被复用。

```go
func main() {
  var wg sync.WaitGroup
  wg.Add(1)
  go func() {
    fmt.Println("1")
    wg.Done()
    wg.Add(1)  // panic: sync: WaitGroup is reused before previous Wait has returned
  }()
  wg.Wait()
}
```
