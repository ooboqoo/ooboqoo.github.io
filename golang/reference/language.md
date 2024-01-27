# Language Specification

https://go.dev/ref/spec


## Lexical elements

### 文档摘要

Comments

Tokens
  * There are four classes: identifiers, keywords, operators and punctuation, and literals.
  * a newline or end of file may trigger the insertion of a semicolon.

Semicolons

Identifiers
* The first character in an identifier must be a letter.

Keywords

Operators and punctuation

Integer literals
* An optional prefix sets a non-decimal base: `0b` or `0B` for binary, `0`, `0o`, or `0O` for octal, and `0x` or `0X` for hexadecimal.
* For readability, an underscore character `_` may appear after a base prefix or between successive digits

Floating-point literals
* A decimal floating-point literal consists of an *integer part* (decimal digits), a decimal point, a *fractional part* (decimal digits), and an *exponent part* (e or E followed by an optional sign and decimal digits).
* A hexadecimal floating-point literal consists of ...

Imaginary literals 虚数

Rune literals

String literals
* There are two forms: raw string literals and interpreted string literals.

### Keywords

```go
break        default        func         interface    select
case         defer          go           map          struct
chan         else           goto         package      switch
const        fallthrough    if           range        type
continue     for            import       return       var
```

整理后

```go
package    import
func       return    defer
const      var
if         else
switch     case      default      fallthrough    break¹
for        range     continue     break²         goto
type       struct    interface    map
go         chan      select       case²          default²
```

### Operators and punctuation

```go
+    &     +=    &=     &&    ==    !=    (    )
-    |     -=    |=     ||    <     <=    [    ]
*    ^     *=    ^=     <-    >     >=    {    }
/    <<    /=    <<=    ++    =     :=    ,    ;
%    >>    %=    >>=    --    !     ...   .    :
     &^          &^=
```

整理后

```go
算术运算符  +    -    *    /    %    ++   --
关系运算符  ==   !=   <    <=   >    >=
逻辑运算符  &&   ||   !
位运算符    |    &    <<   >>   ^    &^
赋值运算符  +=   -=   *=   /=   %=
          |=   &=   <<=  >>=  ^=   &^=
           =   :=
其他运算符  &    *    .    <-   ...  ,    ^
           ;   :
          ( )   [ ]  { }
```

#### Operator precedence

https://www.tutorialspoint.com/go/go_operators_precedence.htm 貌似错误不少

Category       | Operator                          | Associativity
---------------|-----------------------------------|---------------
Postfix        | `()` `[]` `.`                     | Left to right
Unary          | `+` `-` `!` `^` `*` `&`           | Right to left
Multiplicative | `*` `/` `%`                       | Left to right
Additive       | `+` `-`                           | Left to right
Shift          | `<<` `>>`                         | Left to right
Relational     | `<` `<=` `>` `>=`                 | Left to right
Equality       | `==` `!=`                         | Left to right
Bitwise AND    | `&`                               | Left to right
Bitwise XOR    | `^`                               | Left to right
Bitwise OR     | `\|`                              | Left to right
Logical AND    | `&&`                              | Left to right
Logical OR     | `\|\|`                            | Left to right
Assignment     | `=` `+=` `-=` `*=` `/=` `%=` `>=` `<=` `&=` `^=` `\|=` | Right to left
Comma          | `,`                               | Left to right

Unary operators have the highest precedence. As the `++` and `--` operators *form statements, not expressions*, they fall outside the operator hierarchy. As a consequence, statement `*p++` is the same as `(*p)++`.

```
+x
23 + 3*x[i]
x <= f()
^a >> b
f() || g()
x == y+1 && <-chanInt > 0
```

#### Arithmetic operators

```
+    sum                    integers, floats, complex values, strings
-    difference             integers, floats, complex values
*    product                integers, floats, complex values
/    quotient               integers, floats, complex values
%    remainder              integers

&    bitwise AND            integers    1100 & 1010 = 1000   // 1 见 1 为 1，其余为 0
|    bitwise OR             integers    1100 | 1010 = 1110   // 两数 1 相叠加（见 1 为 1）
^    bitwise XOR            integers    1100 ^ 1010 = 0110   // 两数不同 为 1
&^   bit clear (AND NOT)    integers    1100 &^ 1010 = 0100  // 1 见 0 为 1，其余为 0

<<   left shift             integer << integer >= 0    不考虑符号 00001100 << 4 = 11000000
>>   right shift            integer >> integer >= 0    符号位不动
```

In computing, the *modulo operation* returns the *remainder* or signed remainder of a *division*. In Go and JavaScript `%` is the remainder 余数 NOT the modulus 模数 operator. 余数 和 模数 在正数时结果是一样的，但碰到负数时结果不一样。

`^` 作为一元运算符时为 *bitwise NOT*，如 `^y` 对 y 按位取反。`x &^ y` 即 `x & ^y`，对 y 按位取反后再跟 x 进行 AND 操作。The `^` symbol is used as a unary operator to perform bitwise complement of an integer. The C equivalent of the Go expression `x &^ y` is just `x & ~y`. That is literally "x AND (bitwise NOT of y)".


## Constants

There are boolean constants, rune constants, integer constants, floating-point constants, complex constants, and string constants. Rune, integer, floating-point, and complex constants are collectively called numeric constants.

```go
func main() {
  a := [...]int{1, 2, 3}
  const l = len(a)
  println(l)  // 3
}
```

### `iota`

iota 是一个古希腊字母，在 Go 中表示常量计数器

```go
// Iota is a useful concept for creating incrementing constants in Go
// use the `iota` identifier to tell the Go compiler you want the first value to start at 0
// and then increment by 1 for each following constant
const (
  a = iota  // 0
  b         // 1
  c         // 2
)

const (
  a1 = iota // 0   // 又一个 const 出现, iota 初始化为 0
  a2 = iota // 1   // const 新增一行, iota 加1
  a3 = 6    // 6   // 自定义一个常量
  a4        // 6   // 不赋值就和上一行相同
  a5 = iota // 4   // const 已经新增了 4行, 所以这里是 4
  a6        // 5   // 上一行是 iota 继续走 iota 相关逻辑
)
```


## Variables


## Types

https://www.tutorialspoint.com/go/go_data_types.htm

```go
// 布尔型
bool

// 数字类型
int   int8   int16    int32    int64
uint  uint8  uint16   uint32   uint64
byte  rune   uintptr

float32    float64
complex64  complex128

// 字符串类型
string

// 派生类型 Derived types
Array types        ValueType
Structure types    ValueType

Pointer types      ReferenceType
Slice types        ReferenceType
Map types          ReferenceType
Channel Types      ReferenceType
Function types     ReferenceType
Interface types    ReferenceType
```

Basic Go Types

|||
|-----------|------------------
| `bool`    | `true` `false`
| `string`  | `"Hello World"`
| `int`     |  `0` `-100` `999`
| `float64` | `10.01` `-0.003`

```go
name := "gavin"
name = "foo"

func foo() string {
  return "foo"
}
```

String literals 字符串字面量 https://go.dev/ref/spec#String_literals

* 解释型字符串字面量 interpreted string literals `""`：支持转义，但不能跨行
* 原生字符串字面量 raw string literals ` `` `：支持多跨行，不支持转义序列，可包含除反引号外的任何字符。多用于书写多行消息、HTML以及正则表达式

```
string_lit             = raw_string_lit | interpreted_string_lit .
raw_string_lit         = "`" { unicode_char | newline } "`" .
interpreted_string_lit = `"` { unicode_value | byte_value } `"` .
```

```go
`abc`                // same as "abc"
`\n
\n`                  // same as "\\n\n\\n"
"\n"
"\""                 // same as `"`
```

```go
str := "hello大美"

// 遍历字符串（"大美"能正常打印，但 index 会跳，分别为 5 和 8）
for index, c := range str {
  fmt.Printf("%c %d\n", c, index)
}

// 访问字符串的字节（"大美"会变成乱码）
for i := 0; i < len(str); i++ {
  fmt.Printf("%c %v\n", str[i], str[i])
}
```

rune

```go
var char = '1'
fmt.Printf("%T", char) // 输出 "int32"，即 rune 类型
```

Array: Fixed lenght list of things

Slice: An array that can grow or shrink. Every element in a slice must be of same type


```go
for index, product := range products {
  fmt.Println(product)
}
```

### Struct types

A struct is *a sequence of* named elements, called fields, each of which has a name and a type. Field names may be specified explicitly (IdentifierList) or implicitly (EmbeddedField). Within a struct, non-blank field names must be unique.

A field declaration may be followed by an optional string literal **tag**，Tag 由一对或几对键值对组成，通过空格来分隔键值。

```go
package main

import (
  "encoding/json"
  "fmt"
)

type Person struct {
  Name string `json:"name"`
  Age int     `json:"age"`
  Addr string `json:"addr,omitempty"`
}

func main() {
  jack := Person{Name: "Jack", Age: 33}
  data, err := json.Marshal(jack)
  if err != nil {
    panic(err)
  }
  fmt.Printf("%s\n", data)
}
```

### Value Type vs Reference Type

Value Types:
* Boolean Type: `bool`
* Numeric Types: int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, float32, float64, complex64, complex128
* String Type: `string`
* Struct Types: User-defined structs where the fields are value types or other structs

Reference Types:
* Slices: `[]T` (e.g., `[]int`, `[]string`, etc.)
* Maps: `map[K]V` (e.g., `map[string]int`, `map[int]bool`, etc.)
* Channels: `chan T` (e.g., `chan int`, `chan string`, etc.)
* Pointers: `*T` (e.g., `*int`, `*string`, etc.)
* Functions: `func(args)` returnType (e.g., `func(int) bool`, `func(string) int`, etc.)
* Interfaces: User-defined interfaces or built-in interfaces (e.g., `io.Reader`, error, etc.)

It's important to note that *arrays in Go are value types*, but they are less commonly used compared to slices. Also, *interface values themselves are reference types, but* the underlying values they hold can be either value types or reference types.

Understanding the distinction between these types is crucial for proper memory management and understanding how data is shared between variables.

### Type assertions

For an expression x of interface type and a type T, the primary expression

```go
x.(T)
```

```go
// 先转成 any 再判断
any(x).(T)
// 如
value, ok := any(input).(int)
```


## Properties of types and values

Underlying types

Core types

### Type indentity

A **named type** is always different from any other type. Otherwise, two types are identical if their underlying type literals are structurally equivalent

### Assignability

A value x of type V is assignable to a variable of type T ("x is assignable to T") if one of the following conditions applies:

* V and T are identical.
* V and T have identical underlying types but are not type parameters and *at least one of V or T is not a named type*.
* V and T are channel types with identical element types, V is a bidirectional channel, and at least one of V or T is not a named type.
* T is an interface type, but not a type parameter, and x implements T.
* x is the predeclared identifier nil and T is a pointer, function, slice, map, channel, or interface type, but not a type parameter.
* x is an untyped constant representable by a value of type T.

### Representability

### Method sets

* The method set of a defined type `T` consists of all methods declared with receiver type `T`.
* The method set of *a pointer to a defined type* `T` (where `T` is neither a pointer nor an interface) is the set of all methods declared with receiver `*T` or `T`.
* The method set of an interface type is the intersection of the method sets of each type in the interface's type set (the resulting method set is usually just the set of declared methods in the interface).


## Blocks

```txt
Block = "{" StatementList "}" .
StatementList = { Statement ";" } .
```

In addition to explicit blocks in the source code, there are implicit blocks:

* The universe block encompasses all Go source text.
* Each package has a package block containing all Go source text for that package.
* Each file has a file block containing all Go source text in that file.
* Each `if`, `for`, and `switch` statement is considered to be in its own implicit block.
* Each clause in a `switch` or `select` statement acts as an implicit block.


## Declarations and scope

### Label scopes

Labels are declared by **labeled statements** and are used in the `break`, `continue`, and `goto` statements. It is illegal to define a label that is never used. In contrast to other identifiers, labels are not block scoped and do not conflict with identifiers that are not labels. The scope of a label is the body of the function in which it is declared and excludes the body of any nested function.

### Blank identifier

The blank identifier is represented by the underscore character `_`. It serves as an anonymous placeholder instead of a regular (non-blank) identifier and has special meaning in declarations, as an operand, and in assignment statements.

### Predeclared identifiers

```txt
Types:
  any bool byte comparable
  complex64 complex128 error float32 float64
  int int8 int16 int32 int64 rune string
  uint uint8 uint16 uint32 uint64 uintptr

Constants:
  true false iota

Zero value:
  nil

Functions:
  append cap clear close complex copy delete imag len
  make max min new panic print println real recover
```

### Exported identifiers

An identifier may be exported to permit access to it from another package. An identifier is exported if both:

1. the first character of the identifier's name is a Unicode *uppercase letter* (Unicode character category Lu); and
2. the identifier is declared in the package block or it is a field name or method name.

### Type declarations

A defined type may have methods associated with it. It does not inherit any methods bound to the given type

```go
// A Mutex is a data type with two methods, Lock and Unlock.
type Mutex struct         { /* Mutex fields */ }
func (m *Mutex) Lock()    { /* Lock implementation */ }
func (m *Mutex) Unlock()  { /* Unlock implementation */ }

// NewMutex has the same composition as Mutex but its method set is empty.
type NewMutex Mutex
```

### Variable declarations

### Function declarations

A function declaration without type parameters may omit the body. Such a declaration provides the signature for a function implemented outside Go, such as an assembly routine.

```go
func flushICache(begin, end uintptr)  // implemented externally
```
### Method declarations

A method is a function with a receiver. A method declaration binds an identifier, the method name, to a method, and associates the method with the receiver's base type.


## Expression

An expression specifies the computation of a value by applying operators and functions to operands.

### Operators
Operators combine operands into expressions.

```txt
Expression = UnaryExpr | Expression binary_op Expression .
UnaryExpr  = PrimaryExpr | unary_op UnaryExpr .

binary_op  = "||" | "&&" | rel_op | add_op | mul_op .
rel_op     = "==" | "!=" | "<" | "<=" | ">" | ">=" .
add_op     = "+" | "-" | "|" | "^" .
mul_op     = "*" | "/" | "%" | "<<" | ">>" | "&" | "&^" .

unary_op   = "+" | "-" | "!" | "^" | "*" | "&" | "<-" .
```

### Conversions


### Order of evaluation

### Passing arguments to ... parameters

Variadic function 可变函数

```go
func sum(nums ...int) int {
  total := 0
  for _, num := range nums {
    total += num
  }
  return total
}

func main() {
  nums := []int{1, 2, 3, 4}
  total := sum(nums...)  // 跟 JS 不同，Go 的展开符放后面
  fmt.Println(total)
}
```

If the final argument is assignable to a slice type `[]T` and is followed by `...`, it is passed unchanged as the value for a `...T` parameter. In this case *no new slice is created*.

```go
func foo(num ...int) {
  fmt.Printf("%p\n", num)
}

func main() {
  a := []int{5, 6, 7}
  foo(a...)
  fmt.Printf("%p\n", a)
}

// 上面 num 和 a 是同一个地址，所以这块 go 和 JS 还是有不小差异的
// Go 提供的语法糖 `...` 可以将 slice 传进可变函数（可变函数是指针传递），不会创建新的切片
```

```go
// 在参数个数上，也跟 JS 有较大出入

s1 := []int{1,2,3}
s2 := []int{7, 8}
append(s1, 4, 5, 6)  // OK
append(s1, s2...)  // OK
append(s1, 4, 5, 6, s2...)  // Compile error: too many arguments in call to append
                            // have ([]int, number, number, number, []int)
                            // want ([]int, ...int)
```

## Statements

```txt
Statement =
  Declaration | LabeledStmt | SimpleStmt |
  GoStmt | ReturnStmt | BreakStmt | ContinueStmt | GotoStmt |
  FallthroughStmt | Block | IfStmt | SwitchStmt | SelectStmt | ForStmt |
  DeferStmt .

SimpleStmt = EmptyStmt | ExpressionStmt | SendStmt | IncDecStmt | Assignment | ShortVarDecl .
```


## Built-in functions

## Packages

## Program initialization and exection


## Errors


## Run-time panics



## 其他

### directive

`//go:generate` https://go.dev/blog/generate

```go
//go:generate protoc --go_out=. idl/addressbook.proto
```

`//go:embed` https://pkg.go.dev/embed

```go
import _ "embed"

//go:embed hello.txt
var s string
print(s)
```

```go
package server

import "embed"

// content holds our static web server content.
//go:embed image/* template/*
//go:embed html/index.html
var content embed.FS
```



## builtin

https://pkg.go.dev/builtin

The items documented here *are not actually in package builtin* but their descriptions here allow godoc to present documentation for the language's special identifiers.

```go
// Constants
true
false

// Variables
nil

// func
func append(slice []Type, elems ...Type) []Type  // append elements to the end of a slice, returns the updated slice
func cap(v Type) int  // the capacity of v, according to its type

func len(v Type) int  // the length of v, according to its type
func make(t Type, size ...IntegerType) Type

func print(args ...Type)
func println(args ...Type)

// type
type ComplexType complex64
type FloatType float32
type IntegerType int         // 「类型再定义」，新定义了一个类型，两个类型的变量无法直接相互赋值或比较
type Type int                // 我们可以说 int 是 Type 的「潜在类型」
type Type1 int
type bool bool
type byte = uint8            // 「别名类型」，两个类型的变量可以直接相互赋值
type complex128 complex128
```

* 知识点-别名类型：别名类型与其源类型只有名称不同，其他都是完全相同的。别名类型主要是为了代码重构而存在的（当类型后续可能要修改时，提前搞一个类型别名，后续更换实际类型就非常方便）。
* 知识点-潜在类型：某个类型在本质上是哪个类型，潜在类型相同的不同类型的值之间可以安全地进行类型转换


```go
/*
  Package builtin provides documentation for Go's predeclared identifiers.
  The items documented here are not actually in package builtin
  but their descriptions here allow godoc to present documentation
  for the language's special identifiers.
*/
package builtin

// bool is the set of boolean values, true and false.
type bool bool

// true and false are the two untyped boolean values.
const (
  true  = 0 == 0 // Untyped bool.
  false = 0 != 0 // Untyped bool.
)

// uint8 is the set of all unsigned 8-bit integers.
// Range: 0 through 255.
type uint8 uint8

// uint16 is the set of all unsigned 16-bit integers.
// Range: 0 through 65535.
type uint16 uint16

// uint32 is the set of all unsigned 32-bit integers.
// Range: 0 through 4294967295.
type uint32 uint32

// uint64 is the set of all unsigned 64-bit integers.
// Range: 0 through 18446744073709551615.
type uint64 uint64

// int8 is the set of all signed 8-bit integers.
// Range: -128 through 127.
type int8 int8

// int16 is the set of all signed 16-bit integers.
// Range: -32768 through 32767.
type int16 int16

// int32 is the set of all signed 32-bit integers.
// Range: -2147483648 through 2147483647.
type int32 int32

// int64 is the set of all signed 64-bit integers.
// Range: -9223372036854775808 through 9223372036854775807.
type int64 int64

// float32 is the set of all IEEE-754 32-bit floating-point numbers.
type float32 float32

// float64 is the set of all IEEE-754 64-bit floating-point numbers.
type float64 float64

// complex64 is the set of all complex numbers with float32 real and
// imaginary parts.
type complex64 complex64

// complex128 is the set of all complex numbers with float64 real and
// imaginary parts.
type complex128 complex128

// string is the set of all strings of 8-bit bytes, conventionally but not
// necessarily representing UTF-8-encoded text. A string may be empty, but
// not nil. Values of string type are immutable.
type string string

// int is a signed integer type that is at least 32 bits in size. It is a
// distinct type, however, and not an alias for, say, int32.
type int int

// uint is an unsigned integer type that is at least 32 bits in size. It is a
// distinct type, however, and not an alias for, say, uint32.
type uint uint

// uintptr is an integer type that is large enough to hold the bit pattern of
// any pointer.
type uintptr uintptr

// byte is an alias for uint8 and is equivalent to uint8 in all ways. It is
// used, by convention, to distinguish byte values from 8-bit unsigned
// integer values.
type byte = uint8

// rune is an alias for int32 and is equivalent to int32 in all ways. It is
// used, by convention, to distinguish character values from integer values.
type rune = int32

// any is an alias for interface{} and is equivalent to interface{} in all ways.
type any = interface{}

// comparable is an interface that is implemented by all comparable types
// (booleans, numbers, strings, pointers, channels, arrays of comparable types,
// structs whose fields are all comparable types).
// The comparable interface may only be used as a type parameter constraint,
// not as the type of a variable.
type comparable interface{ comparable }

// 常量计数器
// iota is a predeclared identifier representing the untyped integer ordinal
// number of the current const specification in a (usually parenthesized)
// const declaration. It is zero-indexed.
const iota = 0 // Untyped int.

// nil is a predeclared identifier representing the zero value for a
// pointer, channel, func, interface, map, or slice type.
var nil Type // Type must be a pointer, channel, func, interface, map, or slice type

// Type is here for the purposes of documentation only. It is a stand-in
// for any Go type, but represents the same type for any given function
// invocation.
type Type int

// Type1 is here for the purposes of documentation only. It is a stand-in
// for any Go type, but represents the same type for any given function
// invocation.
type Type1 int

// IntegerType is here for the purposes of documentation only. It is a stand-in
// for any integer type: int, uint, int8 etc.
type IntegerType int

// FloatType is here for the purposes of documentation only. It is a stand-in
// for either float type: float32 or float64.
type FloatType float32

// ComplexType is here for the purposes of documentation only. It is a
// stand-in for either complex type: complex64 or complex128.
type ComplexType complex64

// The append built-in function appends elements to the end of a slice. If
// it has sufficient capacity, the destination is resliced to accommodate the
// new elements. If it does not, a new underlying array will be allocated.
// Append returns the updated slice. It is therefore necessary to store the
// result of append, often in the variable holding the slice itself:
//  slice = append(slice, elem1, elem2)
//  slice = append(slice, anotherSlice...)
// As a special case, it is legal to append a string to a byte slice, like this:
//  slice = append([]byte("hello "), "world"...)
func append(slice []Type, elems ...Type) []Type

// The copy built-in function copies elements from a source slice into a
// destination slice. (As a special case, it also will copy bytes from a
// string to a slice of bytes.) The source and destination may overlap. Copy
// returns the number of elements copied, which will be the minimum of
// len(src) and len(dst).
func copy(dst, src []Type) int

// The delete built-in function deletes the element with the specified key
// (m[key]) from the map. If m is nil or there is no such element, delete
// is a no-op.
func delete(m map[Type]Type1, key Type)

// The len built-in function returns the length of v, according to its type:
//  Array: the number of elements in v.
//  Pointer to array: the number of elements in *v (even if v is nil).
//  Slice, or map: the number of elements in v; if v is nil, len(v) is zero.
//  String: the number of bytes in v.
//  Channel: the number of elements queued (unread) in the channel buffer;
//           if v is nil, len(v) is zero.
// For some arguments, such as a string literal or a simple array expression, the
// result can be a constant. See the Go language specification's "Length and
// capacity" section for details.
func len(v Type) int

// The cap built-in function returns the capacity of v, according to its type:
//  Array: the number of elements in v (same as len(v)).
//  Pointer to array: the number of elements in *v (same as len(v)).
//  Slice: the maximum length the slice can reach when resliced;
//  if v is nil, cap(v) is zero.
//  Channel: the channel buffer capacity, in units of elements;
//  if v is nil, cap(v) is zero.
// For some arguments, such as a simple array expression, the result can be a
// constant. See the Go language specification's "Length and capacity" section for
// details.
func cap(v Type) int

// The make built-in function allocates and initializes an object of type
// slice, map, or chan (only). Like new, the first argument is a type, not a
// value. Unlike new, make's return type is the same as the type of its
// argument, not a pointer to it. The specification of the result depends on
// the type:
//  Slice: The size specifies the length. The capacity of the slice is
//  equal to its length. A second integer argument may be provided to
//  specify a different capacity; it must be no smaller than the
//  length. For example, make([]int, 0, 10) allocates an underlying array
//  of size 10 and returns a slice of length 0 and capacity 10 that is
//  backed by this underlying array.
//  Map: An empty map is allocated with enough space to hold the
//  specified number of elements. The size may be omitted, in which case
//  a small starting size is allocated.
//  Channel: The channel's buffer is initialized with the specified
//  buffer capacity. If zero, or the size is omitted, the channel is
//  unbuffered.
func make(t Type, size ...IntegerType) Type

// The new built-in function allocates memory. The first argument is a type,
// not a value, and the value returned is a pointer to a newly
// allocated zero value of that type.
func new(Type) *Type

// The max built-in function returns the largest value of a fixed number of
// arguments of [cmp.Ordered] types. There must be at least one argument.
// If T is a floating-point type and any of the arguments are NaNs,
// max will return NaN.
func max[T cmp.Ordered](x T, y ...T) T

// The min built-in function returns the smallest value of a fixed number of
// arguments of [cmp.Ordered] types. There must be at least one argument.
// If T is a floating-point type and any of the arguments are NaNs,
// min will return NaN.
func min[T cmp.Ordered](x T, y ...T) T

// The complex built-in function constructs a complex value from two
// floating-point values. The real and imaginary parts must be of the same
// size, either float32 or float64 (or assignable to them), and the return
// value will be the corresponding complex type (complex64 for float32,
// complex128 for float64).
func complex(r, i FloatType) ComplexType

// The real built-in function returns the real part of the complex number c.
// The return value will be floating point type corresponding to the type of c.
func real(c ComplexType) FloatType

// The imag built-in function returns the imaginary part of the complex
// number c. The return value will be floating point type corresponding to
// the type of c.
func imag(c ComplexType) FloatType

// The clear built-in function clears maps and slices.
// For maps, clear deletes all entries, resulting in an empty map.
// For slices, clear sets all elements up to the length of the slice
// to the zero value of the respective element type. If the argument
// type is a type parameter, the type parameter's type set must
// contain only map or slice types, and clear performs the operation
// implied by the type argument.
func clear[T ~[]Type | ~map[Type]Type1](t T)

// The close built-in function closes a channel, which must be either
// bidirectional or send-only. It should be executed only by the sender,
// never the receiver, and has the effect of shutting down the channel after
// the last sent value is received. After the last value has been received
// from a closed channel c, any receive from c will succeed without
// blocking, returning the zero value for the channel element. The form
//  x, ok := <-c
// will also set ok to false for a closed channel.
func close(c chan<- Type)

// The panic built-in function stops normal execution of the current
// goroutine. When a function F calls panic, normal execution of F stops
// immediately. Any functions whose execution was deferred by F are run in
// the usual way, and then F returns to its caller. To the caller G, the
// invocation of F then behaves like a call to panic, terminating G's
// execution and running any deferred functions. This continues until all
// functions in the executing goroutine have stopped, in reverse order. At
// that point, the program is terminated with a non-zero exit code. This
// termination sequence is called panicking and can be controlled by the
// built-in function recover.
func panic(v any)

// The recover built-in function allows a program to manage behavior of a
// panicking goroutine. Executing a call to recover inside a deferred
// function (but not any function called by it) stops the panicking sequence
// by restoring normal execution and retrieves the error value passed to the
// call of panic. If recover is called outside the deferred function it will
// not stop a panicking sequence. In this case, or when the goroutine is not
// panicking, or if the argument supplied to panic was nil, recover returns
// nil. Thus the return value from recover reports whether the goroutine is
// panicking.
func recover() any

// The print built-in function formats its arguments in an
// implementation-specific way and writes the result to standard error.
// Print is useful for bootstrapping and debugging; it is not guaranteed
// to stay in the language.
func print(args ...Type)

// The println built-in function formats its arguments in an
// implementation-specific way and writes the result to standard error.
// Spaces are always added between arguments and a newline is appended.
// Println is useful for bootstrapping and debugging; it is not guaranteed
// to stay in the language.
func println(args ...Type)

// The error built-in interface type is the conventional interface for
// representing an error condition, with the nil value representing no error.
type error interface {
  Error() string
}
```

`recover()` 使用示例：

```go
func recoverDemo() {
  defer func() {
    if err := recover(); err != nil {
      fmt.Println("Recovered from panic:", err)
    }
  }()

  fmt.Println("Before panic")
  panic("Something went wrong!")
  fmt.Println("After panic")  // This line will not be executed
}

func main() {
  fmt.Println("Start of main()")
  recoverDemo()
  fmt.Println("End of main()")
}
```

recover() 必须在 defer() 函数中直接调用才有效。下面其他几种情况调用都是无效的：直接调用、在 defer 中直接调用 和 defer 调用时多层嵌套。

```go
func main() {
  recover()         // 直接调用，无效
  defer recover()   // 在 defer 中直接调用，无效
  defer func() {
    defer func() {
      recover()    // 多层嵌套内调用，无效
    }()
  }()
  panic(1)
}
```
