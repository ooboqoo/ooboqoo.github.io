# Standard library Part 1

https://pkg.go.dev/std



### fmt

```go
func Printf(format string, a ...any) (n int, err error)  格式化字符串并输出到 stdout
func Sprintf(format string, a ...any) string             格式化字符串
```
```go
fmt.Sscanf("12 34 567 ", "%s%d", &s, &i)  // s="12" i=34
```

#### Printing Verbs

```txt
%v 值
%T  类型
```

```go
fmt.Printf("%[1]T %[1]v", 3)  // int 3
```

The default format for `%v` is:
```go
%t  布尔值  bool
%s  字符串  string
%d  整数    int
%g  浮点数  float32 complex64
%p  指针    chan uintptr
```

`%p`
  - [Pointer] base 16 notation, with leading 0x
  - [Slice] address of 0th element in base 16 notation, with leading 0x

`%q`
  - [String] a double-quoted string safely escaped with Go syntax
  - [Intege] a single-quoted character literal safely escaped with Go syntax

`%x` `%X`
  - [Integer] base 16, `%x` with lower-case letters for a-f, `%X` with upper-case letters for A-F
  - [String] base 16, two characters per byte
  - [Float] hexadecimal notation, e.g. -0x1.23abcp+20 -0X1.23ABCP+20

For compound objects, the elements are printed using these rules, recursively, laid out like this:
```txt
struct:             {field0 field1 ...}                {John 23}
array, slice:       [elem0 elem1 ...]                  {1 2 3}
maps:               map[key1:value1 key2:value2 ...]   map[one:1 two:2]
pointer to above:   &{}, &[], &map[]                   &{Jhon 23} &[1 2 3] &map[one:1 two:2]
```

附注

`%t`: When scanning input, `fmt.Scanf` had to deal somehow with any string you pass it. It can read values `true` and `false` correctly, and that's its main purpose. When it doesn't see neither `true`, nor `false` in the input, it goes another way: it takes only first character and returns `true` if it is `'t'` or `false` if it is anything else, i.g. not-'t'. Note, that the rest of the input is still available for scanning with other options.

`%g`: `%e` for large exponents, `%f` otherwise. `g` 应该是直接取字母表 e f 后面就是 g


### strings

Package `strings` implements simple functions to manipulate UTF-8 encoded strings.

```go
func TrimSuffix(s, suffix string) string // TrimSuffix("12oxo", "xo") => "12o"
func TrimRight(s, cutset string) string // cutset 即 []rune, 故 TrimRight("12oxo", "xo") => "12"
func TrimSpace(s string) string
```


### strconv

Package `strconv` implements conversions to and from string representations of basic data types.

```go
func FormatInt(i int64, base int) string
func ParseInt(s string, base int, bitSize int) (i int64, err error)
```


### bytes

Package `bytes` implements functions for the manipulation of byte slices.

It sees widespread use in encoding, decoding, hashing, comparing, concatenating bytes.

```go
var buf bytes.Buffer
err = tmpl.Execute(&buf, sweaters) // text/template
```


### os (文件操作、环境 等)

Package `os` provides a platform-independent interface to operating system functionality. Features not generally available appear in the system-specific package `syscall`.

```go
// 新建文件并写入
func main() {
  file, err := os.OpenFile("./temp.txt", os.O_WRONLY|o
    s.O_CREATE, 0666)
  if err != nil {
    fmt.Println("文件打开失败", err)
  }
  // 及时关闭file句柄
  defer file.Close()

  // 使用带缓存的 *Writer
  writer := bufio.NewWriter(file)
  for i := 0; i < 5; i++ {
    writer.WriteString("hello\n")
  }
  writer.Flush()
}

// 追加文件内容
file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_APPEND, 0666)
```

```go
func main() {
  file, err := os.OpenFile("./temp.txt", os.O_RDWR|os.O_APPEND, 0666)
  if err != nil {
    fmt.Println("文件打开失败", err)
  }
  // 及时关闭file句柄
  defer file.Close()

  // 读文件
  reader := bufio.NewReader(file)
  for {
    str, err := reader.ReadString('\n')
    if err == io.EOF {
      break
    }
    fmt.Print(str)
  }

  // 追加文件 。。。
}
```


### time

```go
func main() {
  fmt.Println(time.Now().Format(time.DateTime))
  fmt.Println(time.Now().Unix())  // s 秒, 10位, eg 1689765768
  fmt.Println(time.Now().UnixMilli())  // millisecond 毫秒, 13位, eg 1689765768812
}
```

### log

log包 提供了一些格式化输出的方法。本包也提供了一个预定义的“标准” logger，可以通过调用函数 Print系列(Print|Printf|Println）、Fatal系列（Fatal|Fatalf|Fatalln）、和Panic系列（Panic|Panicf|Panicln）来使用。

logger 会打印每条日志信息的日期、时间，默认输出到系统的标准错误。Fatal系列函数 会在写入日志信息后调用 os.Exit(1)。Panic系列函数 会在写入日志信息后 panic。

内置的 log 库功能有限，例如无法满足记录不同级别日志的情况，实际项目中我们可以根据需要选择使用 logrus zap 等第三方日志库。

```go
import (
  "fmt"
  "log"
  "os"
)

// 通常会将 logger 的配置写到 init 函数中
func init() {
  logFile, err := os.OpenFile("./xx.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
  if err != nil {
    fmt.Println("open log file failed, err:", err)
    return
  }
  log.SetOutput(logFile)
}

func main() {
  log.Println("这是一条很普通的日志。")
  // 配置日志输出选项，不同开关使用 int 上的不同 bit
  log.SetFlags(log.Llongfile | log.Lmicroseconds)
  log.Printf("这是一条%s日志。\n", "很普通的")
  // 配置日志前缀
  log.SetPrefix("[bff] ")
  log.Fatalln("这是一条很普通的日志。")
}
```



### encoding/json

```go
// Marshal returns the JSON encoding of v.
func Marshal(v any) ([]byte, error)
// Unmarshal parses the JSON-encoded data and stores the result in the value pointed to by v. If v is nil or not a pointer, Unmarshal returns an InvalidUnmarshalError.
func Unmarshal(data []byte, v any) error
```

```go
import (
  "encoding/json"
  "fmt"
)

type Person struct {
  Name string `json:"name"` // field tag 更多用法见 https://pkg.go.dev/encoding/json#Marshal
}

func main() {
  raw := `{"name": "John", "age": 12}`
  var p Person
  json.Unmarshal([]byte(raw), &p) // 解包
  fmt.Println(p) // {John}
}
```

```go
func main() {
  a := make([]string, 2)
  a[0] = "John"
  a[1] = "Sam"
  j, err := json.Marshal(a) // 打包
  if err != nil {
    fmt.Printf("Error: %s", err.Error())
  } else {
    fmt.Println(string(j)) // ["John","Sam"]
  }
}
```


### reflect

Package `reflect` implements *run-time reflection*, allowing a program to manipulate objects with arbitrary types. The typical use is to take a value with static type `any` and extract its dynamic type information by calling `TypeOf`, which returns a Type.

中文 *反射* 好像不够具象，理解成 *影子* 是不是更合适，能看到(调用) run-time 但不能触碰(修改) run-time？

```go
// TypeOf returns the reflection Type that represents the dynamic type of i
func TypeOf(i any) Type
func DeepEqual(x, y any) bool
```

```go
type Type interface {
  // Kind returns the specific kind of this type
  Kind() Kind
}

// A Kind represents the specific kind of type that a Type represents.
// The zero Kind is not a valid kind.
type Kind uint
const (
  Invalid Kind = iota
  Bool
  Int
  Int8
  Int16
  Int32
  Int64
  Uint
  Uint8
  Uint16
  Uint32
  Uint64
  Uintptr
  Float32
  Float64
  Complex64
  Complex128
  Array
  Chan
  Func
  Interface
  Map
  Pointer
  Slice
  String
  Struct
  UnsafePointer
)
// String returns the name of k
func (k Kind) String() string
```

```go
type StructField struct {
  // Name is the field name.
  Name string

  // PkgPath is the package path that qualifies a lower case (unexported)
  // field name. It is empty for upper case (exported) field names.
  // See https://golang.org/ref/spec#Uniqueness_of_identifiers
  PkgPath string

  Type      Type      // field type
  Tag       StructTag // field tag string
  Offset    uintptr   // offset within struct, in bytes
  Index     []int     // index sequence for Type.FieldByIndex
  Anonymous bool      // is an embedded field
}
```

示例

```go
package main

import (
  "fmt"
  "reflect"
)

func main() {
  type S struct {
    F string `species:"gopher" color:"blue"`
  }

  s := S{}
  st := reflect.TypeOf(s)
  field := st.Field(0)
  fmt.Println(field.Tag.Get("color"), field.Tag.Get("species"))
}
```
