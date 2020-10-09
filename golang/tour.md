# A Tour of Go


## Basics

### Packages, variables, and functions

#### Packages

Go 应用 由 包 组成，并从 main 包的 main 方法开始执行。

按照惯例，包名 package name 就是 导入路径 import path 的最后一个元素。如 `math/rand` 的包名就是 `rand`。

#### Imports

```go
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

#### Exported names

首字母大写的名字都会导出，外部可见，首字母小写则不导出。 如 `Pizza` 就是 exported name, 而 `pizza` 则是 unexported name.

#### Functions

当多个参数类型相同时，前面的类型声明可省略，保留最后一个即可。如 `x int, y int` 可写成 `x, y int`。

#### Multiple results

一个函数可返回多个结果：

```go
func swap(x, y string) (string, string) {
  return y, x
}

func main() {
  a, b := swap("hello", "world")
  fmt.Println(a, b)
}
```

#### Named return values

```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}

func main() {
  fmt.Println(split(17))  // 输出 7 10
}
```

#### Variables

```go
var c, python, java bool
var i, j = 1, 2  // 声明变量并立即赋值时，类型声明可省略

func main() {
  var i int
  fmt.Println(i, c, python, java)  // 输出 0 false false false
}
```

#### Short variable declarations

在一个函数体内，`:=` 可替换原 `var` declaration with implicit type. 但在函数体外无法使用，老老实实用 `var` `func` and so on

#### Basic types

Go's basic types are

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32, represents a Unicode code point

float32 float64

complex64 complex128
```

```go
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

#### Zero values

未赋初始值的变量都会获得对应的 zero value：
  * `0` for numeric types
  * `false` for the boolean type
  * `""` (the empty string) for strings

#### Type conversions

The expression `T(v)` converts the value `v` to the type `T`.

Go 不像 C，所有类型转换必须显式转换。

```go
i := 42
f := float64(i)
var f2 float64 = i  // 报错，必须显式转换类型
u := uint(f)
```

#### Type inference

当声明变量并赋初始值时，Go 能够从 值 推测出变量的类型，此时类型声明可省略。

#### Constants

常量只能使用 `const` 声明，无法使用 `:=` 简写语法。

```go
const (
  Big = 1 << 100     // Create a huge number by shifting a 1 bit left 100 places
  Small = Big >> 99  // Shift it right again 99 places, so we end up with 1<<1, or 2
)
```

### Flow control statements

#### `for`

Go 只有 `for` 循环，没有 `while` 循环。Go 的 `for` 循环没有 `()`。循环中 init statement 定义的变量只在循环体内可见。

```go
// 常规用法
func main() {
  sum := 1
  for ; sum < 1000; {  // The init and post statements are optional
    sum += sum
  }
  fmt.Println(sum)
}

// for 就是 while
func main() {
  sum := 1
  for sum < 1000 {  // 这种用法就是其他语言的 while 用法
    sum += sum
  }
  fmt.Println(sum)
}

// 无限循环
func main() {
  for {
  }
}
```

#### `if`

Like `for`, the `if` statement can start with a short statement to execute before the condition.

Variables declared by the statement are only in scope until the end of the `if`.

```go
func main() {
  i := 0
  if i < 10 { i++ } else { i-- }
  if j := 5; i < 10 { i += j }  // if 也可以有初始化声明
  fmt.Println(i)
}
```

#### `switch`

Go's `switch` only runs the selected case, not all the cases that follow. In effect, the `break` statement that is needed at the end of each case in other languages is provided automatically in Go. 

```go
func main() {
  fmt.Print("Go runs on ")
  switch os := runtime.GOOS; os {
    case "darwin": fmt.Println("OS X.")
    case "linux": fmt.Println("Linux.")
    default: fmt.Printf("%s.", os)
  }
}

// 利用 switch 简化长 if-then-else 链
func main() {
  t := time.Now()
  switch {  // 相当于 switch true
    case t.Hour() < 12: fmt.Println("Good morning!")
    case t.Hour() < 17: fmt.Println("Good afternoon.")
    default: fmt.Println("Good evening.")
  }
}
```

#### `defer`

A defer statement defers the execution of a function until the surrounding function returns.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order.

```go
func main() {
  defer fmt.Print("world")
  for i := 1; i < 3; i++ { defer fmt.Print(i) }
  fmt.Print("hello")
}
// 输出 hello321world
```

### More types: structs, slices, and maps

#### Pointers

Go has pointers. A pointer holds the memory address of a value.

The `&` operator generates a pointer to its operand.  
The `*` operator denotes the pointer's underlying value.

The type `*T` is a pointer to a `T` value. Its zero value is `nil`.

```go
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

#### Structs

A `struct` is a collection of fields.

```go
type Vertex struct {
  X int
  Y int
}

func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X)

  // Pointers to structs
  p := &v
  p.X = 1e9  // (*p).X 的简写形式
  fmt.Println(v)

  // Struct Literals
  var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p  = &Vertex{1, 2} // has type *Vertex
  )
}
```

#### Arrays

The type `[n]T` is an array of `n` values of type `T`.

An array has a fixed size. A slice, on the other hand, is a dynamically-sized, flexible view into the elements of an array. In practice, slices are much more common than arrays. A slice does not store any data, it just describes a section of an underlying array. 切片只是对原数组的一种映射，直接改数组内容或者改切片内容，实际都是改的数组，都是联动的。

```go
func main() {
  var a [2]string
  a[0] = "Hello"
  a[1] = "World"
  fmt.Println(a)

  // Slices 切片操作
  primes := [6]int{2, 3, 5, 7, 11, 13}
  var s []int = primes[1:4]
  primes[2] = 55
  fmt.Println(s)  // [3 55 7]
}
```

**Slice literals**

```go
func main() {
  [3]bool{true, true, false}  // This is an array literal
  []bool{true, true, false}   // And this creates a array and then builds a slice that references it
}
```

**Slice defaults**

```go
func main() {
  var a [10]int
  // 以下几项都是等效的
  a[0:10]
  a[:10]
  a[0:]
  a[:]
}
```

**Slice length and capacity**

The length of a slice is the number of elements it contains.

The capacity of a slice is the number of elements in the underlying array, counting from the first element in the slice.

The length and capacity of a slice `s` can be obtained using the expressions `len(s)` and `cap(s)`.

```go
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

**Nil slices**

```go
func main() {
  var ns []int
  fmt.Println(ns, len(ns), cap(ns))
  if ns == nil { fmt.Println("nil!") }
}
```

**Creating a slice with `make`**

Slices can be created with the built-in `make` function; this is how you create dynamically-sized arrays.

The `make` function allocates a zeroed array and returns a slice that refers to that array

```go
func main() {
  a := make([]int, 5); printSlice("a", a)
  b := make([]int, 0, 5); printSlice("b", b)
  c := b[:2]; printSlice("c", c)
  d := c[2:5]; printSlice("d", d)
}
```

**Slices of slices**

Slices can contain any type, including other slices.

```go
board := [][]string{
  []string{"_", "_", "_"},
  []string{"_", "_", "_"},
  []string{"_", "_", "_"},
}
```

**Appending to a slice**

It is common to append new elements to a slice, and so Go provides a built-in append function.

#### Range


## Methods and interfaces


## Concurrency





