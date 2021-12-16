# Go 入门教程 A Tour of Go


## 包、变量和函数 Packages, variables, and functions

### 包

#### 包 Packages

Go 应用 由 **包** 组成，并从 main 包的 main 方法开始执行。

*包是代码的最小组织单位，没有文件的概念*，同一个包的内容可以随意分布在不同源文件内。

按照约定，包名与导入路径 import path 的最后一个元素一致，如 `math/rand` 的包名就是 `rand`。

#### 导入 Imports

```golang
import "fmt"

// 导入多个包时推荐这种写法
import (
  "fmt"
  "math/rand"
)

// 当然这样写也是允许的
import "fmt"
import "math/rand"
```

#### 导出 Exported names

首字母大写的都会导出，外部可见，首字母小写的不导出。 如 `Pizza` 是 exported name, 而 `pizza` 则是 unexported name。

### 函数

#### 函数 Functions

```golang
func add(x int, y int) int {
  return x + y
}
```

当多个参数类型相同时，前面的类型声明可省略，保留最后一个即可。如 `x int, y int` 可写成 `x, y int`。


```golang
func add(x, y int) int {
  return x + y
}
```

#### 多个返回值 Multiple results

一个函数可返回多个结果：

```golang
func swap(x, y string) (string, string) {
  return y, x
}

func main() {
  a, b := swap("hello", "world")
  fmt.Println(a, b)
}
```

#### 命名返回值 Named return values

返回值可被命名，它们会被视作定义在函数顶部的变量。

没有参数的 return 语句返回已命名的返回值。

```golang
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return           // 同 return x, y
}

func main() {
  fmt.Println(split(17))  // 输出 7 10
}
```

### 变量

#### 变量 Variables

`var` 语句用于声明一个变量列表。`var` 语句可出现在包或函数级别。

```golang
var c, python, java bool
var i, j = 1, 2  // 声明变量并立即赋值时，类型声明可省略

func main() {
  var i int
  fmt.Println(i, c, python, java)  // 输出 0 false false false
}
```

#### 短变量声明 Short variable declarations

在函数中，简洁赋值语句 `:=` 可替换原 `var` 声明。函数外无法使用，老实用 `var` `func` 等。

```golang
func main() {
  var i, j int = 1, 2
  k := 3
  c, python, java := true, false, "no!"

  fmt.Println(i, j, k, c, python, java)
}
```

#### 基本类型 Basic types

int, uint 和 uintptr 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。

当你需要一个整数值时应使用 `int` 类型，除非你有特殊的理由使用固定大小或无符号的整数类型。

类型推导会使用 `int` `float64` `complex128`

```golang
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 别名

rune // int32 别名, 表示一个 Unicode 码点 (code point)

float32 float64

complex64 complex128
```

本例展示了几种类型的变量。 同导入语句一样，变量声明也可以“分组”成一个语法块。

```golang
package main

import (
  "fmt"
  "math/cmplx"
)

var (
  ToBe   bool       = false
  MaxInt uint64     = 1<<64 - 1
  z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
  fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)     // Type: bool Value: false
  fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt) // Type: uint64 Value: 18446744073709551615
  fmt.Printf("Type: %T Value: %v\n", z, z)           // Type: complex128 Value: (2+3i)
}
```

#### 零值 Zero values

未赋初始值的变量都会获得对应的 zero value

* `0` for numeric types
* `false` for the boolean type
* `""` (the empty string) for strings

#### 类型转换 Type conversions

The expression `T(v)` converts the value `v` to the type `T`.

Go 不像 C，所有类型转换必须显式转换。

```golang
i := 42
f := float64(i)
var f2 float64 = i  // 报错，必须显式转换类型
u := uint(f)
```

#### 类型推导 Type inference

在声明一个变量而不指定其类型时（即使用不带类型的 `:=` 语法或 `var =` 表达式语法），变量的类型由右值推导得出。

#### 常量 Constants

常量只能使用 `const` 声明，无法使用 `:=` 简写语法。

```golang
const (
  Big = 1 << 100     // Create a huge number by shifting a 1 bit left 100 places
  Small = Big >> 99  // Shift it right again 99 places, so we end up with 1<<1, or 2
)
```

## 流程控制语句 Flow control statements

#### `for` 循环

Go 只有 `for` 循环，没有 `while` 循环。

`for` 循环没有 `()`。

循环中 init statement 定义的变量只在循环体内可见。

```golang
// 常规用法
func main() {
  sum := 1
  for ; sum < 1000; {  // 初始化语句; 条件表达式; 后置语句
    sum += sum
  }
  fmt.Println(sum)
}

// for 就是 while
func main() {
  sum := 1
  for sum < 1000 {  // 同时省略 初始化语句 和 后置语句 时，`;` 也可以省略
    sum += sum
  }
  fmt.Println(sum)
}

// 无限循环
func main() {
  for {            // 循环条件也可以省，这就成了无限循环
    // ...
  }
}
```

#### `if` 语句

`if` 语句与 `for` 循环类似，表达式外无需小括号 `( )`，而大括号 `{ }` 则是必须的。

同 `for` 一样， `if` 语句可以在条件表达式前执行一个简单的语句。该语句声明的变量作用域仅在 `if` 之内（含 `else` 部分）。

```golang
func main() {
  i := 0
  if i < 10 { i++ } else { i-- }  // 表达式外没有 `( )`
  if j := 5; i < 10 { i += j }    // if 也可以有初始化声明
  fmt.Println(i)
}
```

#### `switch` 语句

Go 只运行选定的 `case`，即自动提供了每个 `case`后面的 `break` 语句。除非以 `fallthrough` 语句结束，否则分支会自动终止。

另外，`switch` 的 `case` 无需为常量，且取值不必为整数。

```golang
func main() {
  fmt.Print("Go runs on ")
  switch os := runtime.GOOS; os {
    case "darwin": fmt.Println("OS X.")
    case "linux": fmt.Println("Linux.")
    default: fmt.Printf("%s.", os)
  }
}

// 利用 switch 简化长 if-then-else 链    // 其他语言也可以借鉴这个写法
func main() {
  t := time.Now()
  switch {  // 相当于 switch true
    case t.Hour() < 12: fmt.Println("Good morning!")
    case t.Hour() < 17: fmt.Println("Good afternoon.")
    default: fmt.Println("Good evening.")
  }
}
```

#### `defer` 语句

推迟调用的函数，参数会立即求值，但直到外层函数返回前该函数都不会被调用。

推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

```golang
func main() {
  defer fmt.Print("world")
  for i := 1; i < 3; i++ { defer fmt.Print(i) }
  fmt.Print("hello")
}
// 输出 hello321world
```


## 复杂类型 More types: structs, slices, and maps

#### 指针 Pointers

指针保存内存地址。与 C 不同，Go 没有指针运算。

类型 `*T` 是指向 `T` 类型值的指针。其零值为 `nil`。

`&` 操作符会生成一个指向其操作数的指针。

```golang
func main() {
  i, j := 42, 2701

  p := &i         // point to i
  *p = 21         // set i through the pointer
  fmt.Println(i)  // see the new value of i

  p = &j         // point to j
  *p = *p / 37   // divide j through the pointer
  fmt.Println(j) // see the new value of j

  var pp *int
  fmt.Println(pp)  // <nil>
  fmt.Println(p)   // 0x416024
}
```

#### 结构体 Structs

一个结构体 `struct` 就是一组字段 field 的集合。A `struct` is a collection of fields.

```golang
type Vertex struct {
  X int
  Y int
}

func main() {
  v := Vertex{1, 2}  // 创建
  v.X = 4            // 访问
  fmt.Println(v.X)

  // 结构体指针 Pointers to structs
  p := &v
  p.X = 1e9  // (*p).X 的简写形式，但数组就得老实写 (*p)[0]
  fmt.Println(v)

  // 结构体字面量 Struct Literals
  var (
    // 直接列出字段的值来新分配一个结构体
    v1 = Vertex{1, 2}  // has type Vertex       {1 2}
    // 使用 `Name:` 语法可以仅列出部分字段，此时字段名的顺序随意
    v2 = Vertex{X: 1}  // Y:0 is implicit       {1 0}
    v3 = Vertex{}      // X:0 and Y:0           {0 0}
    p  = &Vertex{1, 2} // has type *Vertex     &{1 2}
  )
}
```

#### 数组 Arrays

类型 `[n]T` 表示拥有 `n` 个 `T` 类型的值的数组。

数组的长度是其类型的一部分，因此 *数组不能改变大小*。切片则为数组元素提供 *动态大小的、灵活的视角*，切片比数组更常用。

切片只是对原数组的一种映射，直接改数组内容或者改切片内容，实际都是改的数组，都是联动的。

```golang
func main() {
  var a [2]string
  a[0] = "Hello"
  a[1] = "World"
  fmt.Println(a)

  // Slices 切片操作
  arr := [6]int{2, 3, 5, 7, 11, 13}
  var s []int = arr[1:4]            // 半开区间，含 1 不含 4
  arr[2] = 55
  fmt.Println(s)  // [3 55 7]
}
```

可以通过「切片字面量 Slice literals」直接新建切片。

```golang
[3]bool{true, true, false}  // 数组字面量，数组类型为 `[n]T` n 是固定死的
[]bool{true, true, false}   // 切片字面量，切片类型为 `[]T` 表明切片是动态的
```

切片时可忽略上下界。如忽略，下界默认为 0，上界则默认为该切片的长度。

```golang
var a [10]int
// 以下几项都是等效的
a[0:10]
a[:10]
a[0:]
a[:]
```

切片拥有 长度 和 容量，可通过表达式 `len(s)` 和 `cap(s)` 来获取。

切片的长度就是它所包含的元素个数。

切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

```golang
func main() {
  s := []int{2, 3, 5, 7, 11, 13}
  s = s[:0]  // Slice the slice to give it zero length
  printSlice(s)  // len=0 cap=6 []
  s = s[:4]  // Extend its length, 只可以往后扩展，不能往前扩展，如 [-1:] 这样不行
  printSlice(s)  // len=4 cap=6 [2 3 5 7]
  s = s[2:]  // Drop its first two values
  printSlice(s)  // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
  fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

切片的零值是 `nil`。nil 切片的长度和容量为 0 且没有底层数组。

```golang
func main() {
  var ns []int
  fmt.Println(ns, len(ns), cap(ns))
  if ns == nil { fmt.Println("nil!") }
}
```

切片可包含任何类型，甚至包括其它的切片。

```golang
// 二维切片
board := [][]string{
  []string{"_", "_", "_"},
  []string{"_", "_", "_"},
  []string{"_", "_", "_"},
}
```

切片可以用内建函数 `make` 来创建，这也是你 *创建动态数组* 的方式。

```golang
func main() {
  a := make([]int, 5)     // len=5 cap=5 [0 0 0 0 0]
  b := make([]int, 0, 5)  // len=0 cap=5 []
  c := b[:2];             // len=2 cap=5 [0 0]
  d := c[2:5];            // len=3 cap=3 [0 0 0]
}
```

内建的 `append` 函数为切片追加新的元素，`append` 的结果是一个包含原切片所有元素加上新添加元素的切片。

当 s 的底层数组太小，不足以容纳所有给定的值时，它就 *会分配一个更大的数组*，返回的切片会指向这个新分配的数组 *所以这里存在行为二分性，应该是一个潜在的坑*。

```golang
var s []int
// 切片会按需增长
s = append(s, 0)       // len=1 cap=1 [0]
// 可以一次性添加多个元素
s = append(s, 1, 2, 3) // len=4 cap=4 [0 1 2 3]
```

```golang
// append 的行为存在二分性，编码时要注意避坑
func main() {
  s := make([]int, 1, 2)
  s1 := append(s, 1)
  s2 := append(s, 2, 3)
  s1[0] = 7
  s2[0] = 8
  fmt.Println(s)   // [7]
  fmt.Println(s1)  // [7 1]
  fmt.Println(s2)  // [8 2 3]
}
```

#### 系列 Range

Go 语言中 `range` 关键字用于 `for` 循环中迭代数组(array)、切片(slice)、通道(channel)或映射(map)的元素。在数组和切片中它返回元素的索引和索引对应的值，在映射中返回 key-value 对。

```golang
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
  fmt.Printf("2**%d = %d\n", i, v)
}
// 可以将下标或值赋予 _ 来忽略它
for _, value := range pow {
  fmt.Print(value)
}

// range 也可以用在 map 的键值对上
kvs := map[string]string{"a": "apple", "b": "banana"}
for k, v := range kvs {
  fmt.Printf("%s -> %s\n", k, v)
}
```

#### 映射 Maps

映射将键映射到值。`make` 函数会返回给定类型的映射，并将其初始化备用。

```golang
type Vertex struct {
  Lat, Long float64
}

// 使用 make 创建
var m map[string]Vertex = make(map[string]Vertex)
m["Bell Labs"] = Vertex{
  40.68433, -74.39967,
}

// 通过映射字面量创建
var m = map[string]Vertex{
  "Bell Labs": Vertex{40.68433, -74.39967},
  "Google": {37.42202, -122.08408},          // 若顶级类型只是一个类型名，可以省略
}
```

修改映射

```golang
// 插入或修改元素
m[key] = elem
// 获取元素
elem = m[key]
// 删除元素
delete(m, key)
// 通过双赋值检测某个键是否存在
elem, exist = m[key]
```

#### 函数值

函数也是值。它们可以像其它值一样传递。

函数可以是一个闭包。闭包是一个函数值，它引用了其函数体之外的变量。该函数可以访问并赋予其引用的变量的值，换句话说，该函数被这些变量“绑定”在一起。

```golang
func add() func(int) int {
  sum := 0
  return func(x int) int {
    sum += x
    return sum
  }
}
```


## 方法和接口 Methods and interfaces


### 方法

方法就是一类带特殊的 **接收者** 参数的函数。

Go 没有类，但可以为结构体类型定义方法，实现类似的功能。

*只能为在同一包内定义的类型的接收者声明方法*。而不能为其它包内定义的类型（包括 int 之类的内建类型）的接收者声明方法。

```golang
type Vertex struct {
  X, Y float64
}

// 定义 Vertex.Abs() 方法
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
  v := Vertex{3, 4}
  fmt.Println(v.Abs())
}
```

#### 指针接收者

**指针接收者** 的方法可以修改接收者指向的值。由于方法经常需要修改它的接收者，**指针接收者** 比 **值接收者** 更常用。

对于方法，不管定义时的接收者是值还是指针，使用时传值或指针都能正常编译。但普通函数没有这个便利，不能混用。

使用指针接收者的原因
* 方法能够修改其接收者指向的值
* 可以避免在每次调用方法时创建副本（复制该值）

```golang

type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {  // 如果去掉这里的 * 则 Scale 只会对 v 的副本进行操作
  v.X = v.X * f
  v.Y = v.Y * f
}

// 对于方法，不管定义时的接收者是值还是指针，使用时传值或指针都能正常编译
func main() {
  v := Vertex{3, 4}
  v.Scale(10)   // 实际被解析为 (&v).Scale(10)
  p := &v
  a := p.Abs()  // 实际被解析为 (*p).Abs()
  fmt.Println(a)
}
```


### 接口

接口类型 是由一组方法签名定义的集合。接口类型的变量可以保存任何实现了这些方法的值。

```golang
type Printable interface {
  Print() string
}
```

#### 隐式实现

类型通过实现一个接口的所有方法来实现该接口，无需显示声明，自然也就不需要 implements 关键字了。

隐式实现从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。


```golang
type Document struct {
  Filename string
}

func (doc *Document) Print() string {
  return doc.Filename
}

func print(p Printable) {
  fmt.Println(p.Print())
}

func main() {
  var doc = Document{"hero"}
  print(&doc)
}
```

#### 接口值

接口值保存了一个具体底层类型的具体值。接口值调用方法时会执行其底层类型的同名方法。

*`nil` 接口值* 既不保存值也不保存具体类型。注意与 *接口值的具体值为 nil* 区分开。

```golang
func (doc *Document) Print() string {
  if doc == nil {
    return "nil"
  }
  return doc.Filename
}

func describe(i interface{}) {
  fmt.Printf("(%v, %T)\n", i, i)
}

func main() {
  var p Printable
  // 接口值为 nil
  describe(p)             // (<nil>, <nil>)
  // print(p)             // 运行时报错

  var doc *Document
  p = doc
  // 接口值的具体值为 nil
  describe(p)             // (<nil>, *main.Document)
  print(p)                // 运行时能正确找到 (*Document).Print 方法
}
```

#### 空接口

指定了零个方法的接口值被称为 **空接口**，空接口可保存任何类型的值。

```golang
interface {}
```

#### 类型断言

```golang
// 断言接口值 i 保存的具体值的类型是 T，并将其底层类型为 T 的值赋给变量 v
// 如果断言能够成立，那么 ok 为 true 否者为 false
// 如果这里没有定义 ok 变量，那么断言失败就会抛错
v, ok := i.(T)
```

```golang
func main() {
  var i interface{} = "hello"

  s := i.(string)
  fmt.Println(s)       // hello

  s, ok := i.(string)
  fmt.Println(s, ok)   // hello true

  f, ok := i.(float64)
  fmt.Println(f, ok)   // 0 false

  f = i.(float64)      // 报错(panic)
  fmt.Println(f)
}
```

类型选择是一种按顺序从几个断言中选择分支的结构。

```golang
switch v := i.(type) {
case T:
    // v 的类型为 T
case S:
    // v 的类型为 S
default:
    // 没有匹配，v 与 i 的类型相同
}
```

```golang
func handleInput(i interface{}) {
  switch v := i.(type) {
  case int:
    fmt.Printf("%v is int\n", v)
  case string:
    fmt.Printf("%q is %v bytes long\n", v, len(v))
  default:
    fmt.Printf("I don't know about type %T!\n", v)
  }
}
```

#### 接口使用示例 `fmt.Stringer` `error` `io.Reader`

`fmt` 包中定义的 `Stringer` 是最普遍的接口之一。fmt 包（还有很多包）都通过此接口来打印值。

```golang
// fmt.Stringer 是一个可以用字符串描述自己的类型
type Stringer interface {
  String() string  // 差不多就是 JS 中的 toString()
}
```

```golang
type Person struct {
  Name string
  Age  int
}

func (p Person) String() string {
  return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
  dent := Person{"Dent", 42}
  fmt.Println(dent)          // Dent (42 years)
}
```

Go 程序使用 error 值来表示错误状态。`error` 类型是一个内建接口。

通常函数会返回一个 error 值，为 nil 时表示成功；非 nil 表示失败。

```golang
type error interface {
  Error() string
}

func main() {
  i, err := strconv.Atoi("42")
  if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
  }
}
```



## 并发 Concurrency

#### 协程

协程 goroutine 是由 Go runtime 管理的轻量级线程。

```golang
go f(x, y, z)  // f, x, y, z 的求值发生在当前协程，而 f 的执行发生在新的协程中
```

协程间共享相同的地址空间，因此在访问共享的内存时必须进行同步。`sync` 包提供了这种能力，不过不常用，因为信道更为好用。

#### 信道

信道是带有类型的管道，你可以通过它用信道操作符 `<-` 来发送或接收值。

```golang
ch <- v    // 将 v 发送至信道 ch
v := <-ch  // 从 ch 接收值并赋予 v
```

默认情况下，发送和接收操作在另一端准备好之前都会 *阻塞*。这使得协程可以在没有显式的锁或竞态变量的情况下进行同步。

信道可以是带缓冲的。将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道。

仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

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

#### `close`

发送者可通过 `close` 关闭一个信道来表示没有需要发送的值了。

* 只有发送者才能关闭信道
* 向一个已经关闭的信道发送数据会报错
* 接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭
* 信道与文件不同，通常情况下无需关闭，只有在需要确切地告诉接收者关闭时（如终止一个 range 循环）才要关闭

循环 `for i := range c` 会不断从信道接收值，直到它被关闭。

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
  for i := range c {
    fmt.Println(i)
  }
}
```

#### `select`

`select` 语句使一个协程等待多个通信操作。select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。

```golang
func fibonacci(c, quit chan int) {
  x, y := 0, 1
  for {
    select {
    case c <- x:
      x, y = y, x+y
    case <-quit:
      fmt.Println("quit")
      return
    }
  }
}

func main() {
  c := make(chan int)
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

