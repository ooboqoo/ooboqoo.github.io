# Go 语言入门教程

Go 语言最主要的特性：

* 自动垃圾回收
* 更丰富的内置类型
* 函数多返回值
* 错误处理
* 匿名函数和闭包
* 类型和接口
* 并发编程
* 反射
* 语言交互性

Go 语言实现了开发效率与执行效率的完美结合，让你写 JavaScript 代码（效率）一样编写C代码（性能）。

<image src="https://www.topgoer.com/static/home/2.jpg" width="505" />


## 语言结构

```go
// 必须在源文件中非注释的第一行指明这个文件属于哪个包
// 每个应用程序都包含一个名为 main 的包
package main

import "fmt"

// 每一个可执行程序都必须包含一个 main 函数
// 一般来说都是启动后第一个执行的函数（如果有 init 函数则先执行 init 函数）
func main() {
  fmt.Println("Hello, World")
}
```

### 注释

* 单行注释 `// ...` 是最常见的注释形式
* 多行注释 `/* ... */` 也叫块注释，一般用于 包的文档描述 或 注释成块的代码片段


## 包

以包为基本单位的代码组织方式

* *文件夹相对路径 == 包路径*，不同文件夹下的源文件无法共用一个包名，因为文件夹路径不一样
* *包名 == 文件夹名*，按照约定 <sup>注1</sup>，包名与导入路径(import path)的最后一个元素一致，如 `math/rand` 的包名就是 `rand`
* *没有文件的概念*，同一个包的内容可以随意分布在不同 **源文件** 内，编译器不关心。

注1：包名可以跟文件夹名不一样，编译不会报错，但容易引起误解，所以一般都是同名的。

#### 包 Packages

Go 应用由 **包** 组成，并从 `main` 包的 `main` 方法开始执行。

```golang
import (
  // Go 标准包
  "fmt"

  // 第三方包
  "github.com/spf13/pflag"

  // 匿名包
  _ "github.com/jinzhu/gorm/dialects/mysql"

   // 内部包
  "github.com/marmotedu/iam/internal/apiserver"
)
```

#### 导入 Imports

```golang
// 导入多个包时推荐这种写法
import (
  "fmt"
  "math/rand"
)

// 当然这样写也是允许的
import "fmt"
import "math/rand"
```

```golang
// 几种特殊的 import 用法
import (
  .     "fmt"       // no name, import in scope  
  File  "io/ioutil" // rename ioutil to File
  _     "net"       // net will not be available, but init() inside net package will be executed
)
```

```go
// 支持一个依赖的多个大版本并存
```

#### 导出 Exported names

首字母大写的都会导出，外部可见，首字母小写的不导出。 如 `Pizza` 是 exported name, 而 `pizza` 则是 unexported name。


## 函数

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

返回值可被命名，它们会被视作 定义在函数顶部的变量。

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

#### 代码块

*全域代码块 > 包代码块 > 函数代码块 > 语句、子语句代码块 > 空代码块*

在 Go 语言中，*代码块一般就是一个由花括号括起来的区域，里面可以包含表达式和语句*。Go 语言本身以及我们编写的代码共同形成了一个非常大的代码块，也叫 **全域代码块**。

这主要体现在，只要是公开的全局变量，都可以被任何代码所使用。相对小一些的代码块是代码包，一个代码包可以包含许多子代码包，所以这样的代码块也可以很大。

接下来，每个包也都是一个代码块，每个函数也是一个代码块，每个 if语句、for语句、switch语句 和 select语句 都是一个代码块。甚至，switch 或 select语句 中的 case子句 也都是独立的代码块。

走个极端，我就在 main函数 中写一对紧挨着的花括号算不算一个代码块？当然也算，这甚至还有个名词，叫 **空代码块**。

注：Go 中花括号除了可以表示代码块，还可以表示数据结构，如 interface struct 中的使用，以及赋值时的使用场景。

#### 作用域

一个程序实体的作用域总是会被限制在某个代码块中，而这个作用域最大的用处，就是对程序实体的访问权限的控制。

对“高内聚，低耦合”这种程序设计思想的实践，恰恰可以从这里开始。

```golang
package main

import "fmt"

var block = "package"

func main() {
  block := "function"
  {
    block := "inner"
    fmt.Printf("The block is %s.\n", block)  // inner
  }
  fmt.Printf("The block is %s.\n", block)    // function
}
```


## 变量

#### 变量 Variables

`var` 语句用于声明一个变量列表。`var` 语句可出现在 包或函数级别。

```golang
var c, python, java bool
var i, j = 1, 2  // 声明变量并立即赋值时，类型声明可省略

func main() {
  var i int  // 等同于 `var i int = 0` 或 `i := 0`
  fmt.Println(i, c, python, java)  // 输出 0 false false false
}
```

#### 短变量声明 Short variable declarations

在函数中，简洁赋值语句 `:=` 可替换原 `var` 声明。但不支持在函数外使用。

```golang
func main() {
  var i, j int = 1, 2
  k := 3
  c, python, java := true, false, "no!"

  fmt.Println(i, j, k, c, python, java)
}
```

```go
var i int = 0  // 这种场景有以下三种简写形式
var i int      // 省掉 零值
var i = 0      // 省掉 默认类型
i := 0         // 省掉 var
```

#### 值类型和引用类型

值类型赋值给另外一个变量时会进行值拷贝。  
引用类型赋值给另外一个变量时传递的是内存地址（即，拷贝的是指针的值）。

注意：*函数直接传参（即，没传指针）都是值拷贝*

#### 基本类型 Basic types

`int`, `uint` 和 `uintptr` 在 32 位系统上通常为 32 位，在 64 位系统上则为 64 位。

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

本例展示了几种类型的变量。同导入语句一样，变量声明也可以“分组”成一个语法块。

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

```
// golang
string(97)     // "a"
// javascript
String(97)     // "97"
```

#### 类型断言

A type assertion provides access to an interface value's underlying concrete value.

```go
t: = i.(T)      // If `i` does not hold a `T`, the statement will trigger a panic

t, ok := i.(T)  // If not, `ok` will be false and `t` will be the zero value of type T, no panic occurs.
```

```go
func main() {
  var i any = "hello"

  s := i.(string)
  fmt.Println(s)

  s, ok := i.(string)
  fmt.Println(s, ok)

  f, ok := i.(float64)
  fmt.Println(f, ok)

  f = i.(float64) // panic
  fmt.Println(f)
}
```

#### 类型推断 Type inference

在声明一个变量而不指定其类型时（即，使用不带类型的 `:=` 语法或 `var =` 表达式语法），变量的类型由右值推导得出。

在声明变量且赋值时，可利用 Go 语言自身的类型推断能力，省掉变量的类型声明。类型推断是一种编程语言在编译期自动解析表达式类型的能力。

Go 语言的类型推断可以明显提升程序的灵活性，使得代码重构变得更加容易，同时又不会给代码的维护带来额外负担（实际上，它恰恰可以避免散弹式的代码修改），更不会损失程序的运行效率。

#### 常量 Constants

常量使用 `const` 声明。

常量中的数据类型只可以是布尔型、数字型（整数型、浮点型和复数）和字符串型。(注意与 JS 中的 `const` 作区分)

```golang
const (
  Big = 1 << 100     // Create a huge number by shifting a 1 bit left 100 places
  Small = Big >> 99  // Shift it right again 99 places, so we end up with 1<<1, or 2
)
```

##### iota

第九个希腊字母，在 Go 中为一个特殊常量，可简单理解为 `const` 语句块中的行索引。

```go
// 定义枚举值
const (
    a = iota + 1  // 1
    b             // 2
    c
)
```

#### 变量的重声明

变量重声明就是对已经声明过的变量再次声明。变量重声明的前提条件有
* 变量的类型不能变，类型在变量初始化时就已经确定了
* 变量的重声明只能发生在某一个代码块中。如果代码块中的变量跟外层的变量重名，那不叫重声明
* 变量的重声明只有在使用短变量声明时才会发生，否者无法通过编译
* 被“声明并赋值”的变量必须是多个，并且其中至少有一个是新变量

变量重声明其实算是一个语法糖（或者叫便利措施）。它允许我们在使用短变量声明时不用理会被赋值的多个变量中是否包含旧变量。

```golang
var err error
n, err := io.WriteString(os.Stdout, "Hello, everyone!\n")  // err 被重声明并赋值
```

读者评论（异议）

所谓“变量的重声明”容易引发歧义，而且也不容易理解。如果没有为变量分配一块新的内存区域，那么用声明是不恰当的。在《Go 语言圣经》一书中将短声明的这种特性称为赋值。

Go 为短声明语法提供了一个语法糖（或者叫便利措施）：*短变量声明不需要声明所有在左边的变量。如果多个变量在同一个词法块中声明，那么对于这些变量，短声明的行为等同于赋值*。


## 流程控制语句 Flow control statements

### `for` 循环

Go 只有 `for` 循环，没有 `while` 循环。且 `for` 循环没有 `()`。

循环中 init statement 定义的变量只在循环体内可见。

```golang
for i := 0; i < 10; i++ {
  fmt.Print(i)
}
```

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

### `if` 语句

`if` 语句与 `for` 循环类似，表达式外无需小括号 `( )`，而大括号 `{ }` 则是必须的。

同 `for` 一样， `if` 语句可以在条件表达式前执行一个简单的语句。该语句声明的变量作用域仅在 `if` 之内（含 `else` 部分）。

```golang
func main() {
  i := 0
  if i < 10 { i++ } else { i-- }  // 表达式外没有 `( )`（可以有但没必要）
  if j := 5; i < 10 { i += j }    // if 也可以有初始化声明
  fmt.Println(i)
}
```

### `switch` 语句

Go 会自动提供每个 `case` 后面的 `break` 语句，除非以 `fallthrough` 语句结束，否则分支会自动终止。  
另外，`switch` 的 `case` 无须为常量，且取值不必为整数。

```golang
func main() {
  fmt.Print("Go runs on ")
  switch os := runtime.GOOS; os {
  case "darwin": fmt.Println("OS X")
  case "linux": fmt.Println("Linux")
  default: fmt.Printf("%s", os)
  }
}

// 利用 switch 简化长 if-then-else 链    // JS 写法 `switch (true) { case ... }`
func main() {
  t := time.Now()
  switch {  // 相当于 switch true
  case t.Hour() < 12: fmt.Println("Good morning!")
  case t.Hour() < 17: fmt.Println("Good afternoon.")
  default: fmt.Println("Good evening.")
  }
}

// break 和 fallthrough 的用法
switch {
case true:
  fmt.Println("1.1") // 执行
  fallthrough
case false:
  fmt.Println("1.2") // 执行，跟在 fallthrough 后面的case语句始终会执行
  fallthrough
case false:
  fmt.Println("1.3") // 执行
  break
  fallthrough // 无效，因为 break 会终止 switch 语句
case true:
  fmt.Println("1.4") // 不会执行
}

switch {
case true:
  fmt.Println("2.1") // 执行
case true:
  fmt.Println("2.2") // 不会执行
}
```

#### 缩进

为啥 `case` 不用缩进

* The cases are logically labels, many people put labels at the same indentation level as the block they are in. [&#x260D;](https://stackoverflow.com/questions/4509039/why-the-strange-indentation-on-switch-statements)
* Syntactically, `case` and `default` labels belong in the same category as `goto` labels. Section 6.8.1 of the C11 standard has the following definition: [&#x260D;](https://stackoverflow.com/questions/29023601/can-i-put-code-outside-of-cases-in-a-switch)

```txt
labeled-statement:
        identifier : statement
        case constant-expression : statement
        default : statement
```

实际在 `switch` 和 `case` 之间也是不能插入代码的，JavaScript 和 Golang 都是一样的，会报错。

```go
var x = 1

func main() {
  switch x {
    fmt.Println("init")  // syntax error: unexpected fmt, expecting case or default or }
  case 1:
    fmt.Println("1")
  case 2:
    fmt.Println("2")
  default:
    fmt.Println("default")
  }
}
```

JavaScript 中 label 的用法 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label

```js
foo: {
  console.log('face');
  break foo;
  console.log('this will not be executed');
}
console.log('swap');

// 输出
// "face"
// "swap"
```

### `defer` 语句

推迟调用的函数，参数会立即求值，但直到外层函数返回前该函数都不会被调用。

推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照 *后进先出* 的顺序调用。

注：即使 defer 后面的代码 panic 了，也不会影响 defer 语句的执行。

```golang
func main() {
  defer fmt.Print("world")
  for i := 1; i < 3; i++ { defer fmt.Print(i) }
  fmt.Print("hello")
}
// 输出 hello321world
```


## 复杂类型 More types: structs, slices, and maps

### 指针 Pointers

指针保存内存地址。与 C 不同，Go 没有指针运算。

类型 `*T` 是指向 `T` 类型值的指针。其零值为 `nil`。

`&` 操作符会生成一个指向其操作数的指针。

> Go 语言中比较让人费解的设计：`*ptr` 用在代码中表示 ptr 指针指向的值，而当 `*Person` 作为类型时，表示指向 Person 的指针，同样的 `*xx` 出现在代码中和出现中类型中表示的意义正好要倒一倒。助记：`*` 类比 算术运算符 `-`

```golang
func main() {
  i, j := 42, 27

  var p *int
  fmt.Println(p) // <nil>

  p = &i         // point to i
  fmt.Println(p) // 0xc00018c008

  *p = 21        // set i through the pointer
  fmt.Println(i) // 21

  p = &j         // point to j
  fmt.Println(p) // 0xc00018c010
  *p = *p / 3    // divide j through the pointer
  fmt.Println(j) // 9
  fmt.Println(p) // 0xc00018c010
}
```

### 结构体 Structs

```txt
StructType    = "struct" "{" { FieldDecl ";" } "}" .
FieldDecl     = (IdentifierList Type | EmbeddedField) [ Tag ] .
EmbeddedField = [ "*" ] TypeName [ TypeArgs ] .
Tag           = string_lit .
```

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

示例2

```golang
type person struct {
  firstName string
  lastName  string
  contactInfo        // 这里 contactInfo 的字段名和类型名相同时可以简写
}

type contactInfo struct {
  addr    string
  zipCode int
}

func main() {
  gavin := person{
    firstName: "Gavin",
    lastName:  "Wong",
    contactInfo: contactInfo{  // 注意这里的写法，比 JavaScript 的用法要多个类型
      addr:    "123 Main St",
      zipCode: 12345,
    },
  }
}
```

#### struct tag

A **struct tag** is additional meta data information inserted into struct fields. The meta data can be acquired through *reflection*. Struct tags usually provide instructions on *how a struct field is encoded to or decoded from a format*.

```go
type Person struct {
    FirstName  string `json:"first_name"`
    LastName   string `json:"last_name"`
    MiddleName string `json:"middle_name,omitempty"`
}
```

As mentioned in the documentation of [reflect.StructTag](http://golang.org/pkg/reflect/#StructTag), by convention the value of a tag string is a space-separated list of key:"value" pairs, for example:

```go
type User struct {
    Name string `json:"name" xml:"name"`
}
```

#### embedded field

Go supports embedding of structs and interfaces to express a more seamless composition of types.

An embedding looks like a field without a name.

```go
// Defines a struct named MyMutex which has two fields: count of type int and sync.Mutex.
// The sync.Mutex field is an embedded field,
// which means that the MyMutex struct inherits all the methods of the sync.Mutex struct.
type MyMutex struct {
    count int
    sync.Mutex
}
```

```go
type Base struct {
  num int
}

func (b Base) describe() string {
  return fmt.Sprintf("base with num=%v", b.num)
}

type Container struct {
  Base
  str string
}

func main() {
  co := Container{
    Base: Base{
      num: 1,
    },
    str: "some name",
  }

  // We can access the base’s fields directly on co, e.g. co.num.
  fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)
  // Alternatively, we can spell out the full path using the embedded type name.
  fmt.Println("also num:", co.Base.num)
  fmt.Println("describe:", co.describe())
}
```

### 数组 Arrays

数组：类型确定，长度不可变
值类型：传递参数的时候进行值拷贝
slice：是对底层数组的一段内容的引用。本质：实际数组 (pointer) + 长度 (len) + 最大容量 (cap)
  * 避免在两个变量中修改同一个底层数组





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

内建的 `append` 函数为切片追加新的元素（不是修改现有切片，而是返回修改后的新切片），`append` 的结果是一个包含原切片所有元素加上新添加元素的切片。

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
// append 不是修改原切片而是返回一个 新的切片
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

#### 初始化数组

如果数组长度不确定，可以使用 `...` 代替数组的长度，编译器会根据元素个数自行推断数组的长度：

```go
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

如果设置了数组的长度，我们还可以通过指定下标来初始化元素：

```go
// 将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
```

### 系列 Range

Go 语言中 `range` 关键字用于 `for` 循环中迭代数组(array)、切片(slice)、通道(channel)或映射(map)的元素。在数组和切片中它返回 `(index, value)`，在映射中返回 `(key, value)` 对。

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

### 映射 Maps

```txt
Go   |  JavaScript  |  Ruby  |  Python
Map  |  Object      |  Hash  |  Dict
```

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
elem = m[key]    // 不支持 e.someKey 这种 JavaScript 下的用法，这是由强类型语言性质决定的
// 删除元素
delete(m, key)
// 通过双赋值检测某个键是否存在
elem, exist = m[key]
```

Map VS Struct

* Map
  - All keys must be the same type
  - All values must be the same type
  - Keys are indexed, we can iterate over them
  - Reference Type
  - Use to represent a collenction of related properties
  - Don't need to know all the keys at compile time

* Struct
  - Values can be of different type
  - Keys don't support indexing
  - Value Type
  - You need to know all the different fields at compile time
  - Use to represent a "thing" with a lot of different properties


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
func (v Vertex) Abs() float64 {        // 基于惯例，实例变量一般取类型首字母，如这里的 `v`
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (Vertex) dummy() {  // 如果方法体内无需对结构体进行操作，那么结构体变量名可省略
  fmt.Println("I do nothing with Vertex struct.")
}

func main() {
  v := Vertex{3, 4}
  fmt.Println(v.Abs())
}
```

#### 指针接收者

**指针接收者** 的方法可以修改接收者指向的值。由于方法经常需要修改它的接收者，**指针接收者** 比 **值接收者** 更常用。

对于方法，不管定义时的接收者是值还是指针，*使用时传值或指针都能正常编译*。但普通函数没有这个便利，不能混用。

使用指针接收者的原因
* 方法能够修改其接收者指向的值
* *可以避免在每次调用方法时创建副本*（复制该值）

```golang
type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {  // 如果去掉这里的 * 则 Scale 只会对 v 的副本进行操作
  v.X = v.X * f  // 对于 struct 支持 (*v).X 简写为 v.X，编译时会自动转换
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

#### Pass by Value

定义方法使用 **值接收者** 这种形式时，需要很清楚地知道传的的值属于 **值类型** 还是 **引用类型**，如果是引用类型，那效果跟方法的 **指针接收者** 这种用法是一样的。

* Value Type
  - `int`, `float`, `string`, `bool`, structs, arrarys
  - use pointers to change these things in a function
* Reference Types (传的值本质上是一个 指针)
  - slices, maps, channels, pointers, functions
  - don't worry about pointers with these types

<img src="/golang/images/slice.png" width="360" style="position: absolute; right: 0; margin-top: -180px;" />
<div style="width:0;height:20px;"></div>

```go
func main() {
  m := make(map[string]int)
  m["age"] = 28
  n := m // 复制的是指针
  n["age"] = 29
  fmt.Printf("m ptr: %p, val: %v\n", &m, m)
  fmt.Printf("n ptr: %p, val: %v\n", &n, n)

  type Base struct {
    num int
  }
  b := Base{num: 1}
  c := b // 复制的是值
  c.num = 2
  fmt.Printf("b: %d\n", b)
  fmt.Printf("c: %d\n", c)
}

// Output:
// m ptr: 0xc0000a2018, val: map[age:29]
// n ptr: 0xc0000a2020, val: map[age:29]
// b: {1}
// c: {2}
```

### 接口

> Purpose of Interface: 代码复用

接口类型 是由一组方法签名定义的集合。接口类型的变量可以保存任何实现了这些方法的值。

```golang
type Printable interface {
  Print() string
}
```

```go
package main

import (
  "fmt"
)

type Phone interface {
  call()
}

type NokiaPhone struct {
}
func (nokiaPhone NokiaPhone) call() {
  fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {
}
func (iPhone IPhone) call() {
  fmt.Println("I am iPhone, I can call you!")
}

func main() {
  var phone Phone

  phone = new(NokiaPhone)
  phone.call()

  phone = new(IPhone)
  phone.call()
}
```

#### 隐式实现

注：这一点跟 TypeScript 的鸭式辨型法（duck typing）比较类似

Concrete Type VS Interface Type: 无法基于「接口」创建特定实体，因为 接口 不是 实体类型。

类型通过实现一个接口的所有方法来实现该接口，无需显式声明，自然也就不需要 implements 关键字了。

隐式实现从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。

优缺点
* 优点：少写模板代码
* 缺点：因为是隐式实现，不够直观，且无法得到及时反馈，类型错误需要等到编译时才能看到报错

```golang
package doc

type Document struct {
  Filename string
}

func (doc *Document) Print() string {
  return doc.Filename
}
```

```golang
import . "xxx/doc"

type Printable interface {
  Print() string
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

*`nil` 接口值* 既不保存值也不保存具体类型。注意与 *接口值（类型+值）的值为 nil* 区分开。

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

**类型选择** 是一种按顺序从几个断言中选择分支的结构。

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

```golang
// 动态类型(即实现 TypeScript 的 `x: number | string`
func (x any) {
  switch x.(type) {
    case string:
      //...
    case int:
      //...
  }
}
```

#### Embedded interface

```go
type Reader interface {
  Read(p []byte) (n int, err error)
  Close() error
}

type Writer interface {
  Write(p []byte) (n int, err error)
  Close() error
}

// ReadWriter's methods are Read, Write, and Close.
type ReadWriter interface {
  Reader  // includes methods of Reader in ReadWriter's method set
  Writer  // includes methods of Writer in ReadWriter's method set
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

通常函数会返回一个 error 值，为 `nil` 时表示成功；非 `nil` 表示失败。

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

### 错误处理

```go
package main

import (
  "errors"
  "fmt"
  "math"
)

func Sqrt(value float64) (float64, error) {
  if value < 0 {
    // errors.New(s string)  来返回错误，有点 JS `new Error()` 的意思
    return 0, errors.New("Math: negative number passed to Sqrt")
  }
  return math.Sqrt(value), nil
}
func main() {
  result, err := Sqrt(-1)

  if err != nil {
    fmt.Println(err)
  } else {
    fmt.Println(result)
  }

  result, err = Sqrt(9)

  if err != nil {
    fmt.Println(err)
  } else {
    fmt.Println(result)
  }
}
```


## 性能分析

Profile
* CPU 分析：在 runtime中每隔很短的时间，记录当前正在运行的协程的栈。持续一段时间之后，通常是5~10s。通过分析这段时间记录下来的栈，出现频率比较高的函数占用CPU比较多。
* Mem 分析：内存分析只能分析在堆上申请内存的情况，同CPU类似，也是采用采样的方法，每一定次数的内存申请操作会采样一次。通过分析这些采样的记录可以判断出哪些语句申请内存较多。

Go语言内置了获取程序运行数据的工具，包括以下两个标准库：
* `runtime/pprof` 采集工具型应用运行数据进行分析
* `net/http/pprof` 采集服务型应用运行时数据进行分析

```go
import _ "net/http/pprof"

func main() {
  // 浏览器访问 http://localhost:8888/debug/pprof/ 就可以看到性能分析信息了
  http.ListenAndServe(":8888", nil)
}
```


## 其他

Web服务端模型

```go
for {
  conn, err := l.Accept()
  // ...
  go serve(conn)
}
```

接受一个新的TCP连接，创建一个新的协程用于读写该连接上的数据。标准库net/http, thrift 等都是用的这种服务端模型。
相对于进程和线程，协程更加轻量级，创建和退出一个协程的代价比较小。
但是这种方式在请求处理阻塞的情况下，容易引发“协程爆炸”，进而引发内存占用过多，调度延迟等问题。



