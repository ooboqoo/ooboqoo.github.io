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

.     | bool  | int   | float64  | string | uintptr            | slice           | struct
------|-------|-------|----------|--------|--------------------|-----------------|-----------------------
`%v`  | true  | 8     | 8.0      | abc    | 0x112c300          | [1 8]           | &{Jack}
`%T`  | bool  | int   | float64  | string | \*int              | []int           | \*main.Man
`%#v` | true  | 8     | 8        | "abc"  | (*int)(0x112c300)  | []int{1, 8}     | &main.Man{Name:"Jack"}
`%p`  | -     | -     | -        | -      | 0x112c300          | 0x112c3f0       | 0x1131830
`%q`  | -     | '\b'  | -        | "abc"  | -                  | ['\x01' '\b']   | &{"Jack"}
`%x`  | -     | 8     | 0x1p+03  | 616263 | 0x112c300          | [1 8]           | &{4a61636b}

注：所有标注 `-` 的实际都会输出类似  `%!p(bool=true)` 的内容

#### Printing Verbs

General:

```txt
%v  the value in a default format
    when printing structs, the plus flag (%+v) adds field names
%#v a Go-syntax representation of the value
%T  a Go-syntax representation of the type of the value
%%  a literal percent sign; consumes no value
```

Boolean:

```txt
%t  the word true or false
```

`%t`: When scanning input, `fmt.Scanf` had to deal somehow with any string you pass it. It can read values `true` and `false` correctly, and that's its main purpose. When it doesn't see neither `true`, nor `false` in the input, it goes another way: it takes only first character and returns `true` if it is `'t'` or `false` if it is anything else, i.g. not-'t'. Note, that the rest of the input is still available for scanning with other options.

Integer:

```txt
%b  base 2
%c  the character represented by the corresponding Unicode code point
%d  base 10
%o  base 8
%O  base 8 with 0o prefix
%q  a single-quoted character literal safely escaped with Go syntax.
%x  base 16, with lower-case letters for a-f
%X  base 16, with upper-case letters for A-F
%U  Unicode format: U+1234; same as "U+%04X"
```

Floating-point and complex constituents:

```txt
%b  decimalless scientific notation with exponent a power of two,
    in the manner of strconv.FormatFloat with the 'b' format,
    e.g. -123456p-78
%e  scientific notation, e.g. -1.234456e+78
%E  scientific notation, e.g. -1.234456E+78
%f  decimal point but no exponent, e.g. 123.456
%F  synonym for %f
%g  %e for large exponents, %f otherwise. Precision is discussed below.
%G  %E for large exponents, %F otherwise
%x  hexadecimal notation (with decimal power of two exponent), e.g. -0x1.23abcp+20
%X  upper-case hexadecimal notation, e.g. -0X1.23ABCP+20
```

Width is specified by an optional decimal number immediately preceding the verb.  
Precision is specified after the (optional) width by a period followed by a decimal number.

```txt
%f     default width, default precision
%9f    width 9, default precision
%.2f   default width, precision 2
%9.2f  width 9, precision 2
%9.f   width 9, precision 0
```

Other flags:

```txt
'+' always print a sign for numeric values;
  guarantee ASCII-only output for %q (%+q)
'-' pad with spaces on the right rather than the left (left-justify the field)
'#' alternate format: add leading 0b for binary (%#b), 0 for octal (%#o),
  0x or 0X for hex (%#x or %#X); suppress 0x for %p (%#p);
  for %q, print a raw (backquoted) string if strconv.CanBackquote
  returns true;
  always print a decimal point for %e, %E, %f, %F, %g and %G;
  do not remove trailing zeros for %g and %G;
  write e.g. U+0078 'x' if the character is printable for %U (%#U).
' ' (space) leave a space for elided sign in numbers (% d);
  put spaces between bytes printing strings or slices in hex (% x, % X)
'0' pad with leading zeros rather than spaces;
  for numbers, this moves the padding after the sign;
  ignored for strings, byte slices and byte arrays
```

```go
fmt.Printf("%08b", int8(5))    // 00000101
fmt.Printf("%08b", int8(-5))   // -0000101
fmt.Printf("%+08b\n", int8(5)) // +0000101
```

For compound objects, the elements are printed using these rules, recursively, laid out like this:

```txt
struct:             {field0 field1 ...}                {John 23}
array, slice:       [elem0 elem1 ...]                  [1 2 3]
maps:               map[key1:value1 key2:value2 ...]   map[one:1 two:2]
pointer to above:   &{}, &[], &map[]                   &{Jhon 23} &[1 2 3] &map[one:1 two:2]
```

The default format for `%v` is:

```txt
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

`%g`: `%e` for large exponents, `%f` otherwise. `g` 应该是直接取字母表 e f 后面就是 g

Explicit argument indexes

```go
fmt.Printf("%[1]T %[1]v", 3)  // int 3
fmt.Sprintf("%[3]*.[2]*[1]f", 12.0, 2, 6)  ==  fmt.Sprintf("%6.2f", 12.0)
```


### strings

Package `strings` implements simple functions to manipulate UTF-8 encoded strings.

```go
func TrimSuffix(s, suffix string) string // TrimSuffix("12oxo", "xo") => "12o"
func TrimRight(s, cutset string) string // cutset 即 []rune, 故 TrimRight("12oxo", "xo") => "12"
func TrimSpace(s string) string

func ToLower(s string) string
func ToUpper(s string) string
func Join(elems []string, sep string) string
func Split(s, sep string) []string

func Index(s, substr string) int  // strings.Index("chicken", "ken") // 4
func LastIndex(s, substr string) int
func Compare(a, b string) int  // 0 if a == b, -1 if a < b, and +1 if a > b
func Contains(s, substr string) bool
func ContainsAny(s, chars string) bool  // strings.ContainsAny("fail", "ui") // true
func ContainsRune(s string, r rune) bool
func Count(s, substr string) int  // strings.Count("cheese", "e") // 3

func HasPrefix(s, prefix string) bool
func HasSuffix(s, suffix string) bool
```


### strconv

Package `strconv` implements conversions to and from string representations of basic data types.

```go
func Atoi(s string) (int, error)
func Itoa(i int) string

func ParseInt(s string, base int, bitSize int) (i int64, err error)
func FormatInt(i int64, base int) string
func ParseBool(str string) (bool, error)  // It accepts 1, t, T, TRUE, true, True, 0, f, F, FALSE, false, False
func FormatBool(b bool) string  // returns "true" or "false"
func ParseFloat(s string, bitSize int) (float64, error)
func FormatFloat(f float64, fmt byte, prec, bitSize int) string // fmt: 'b' 'e' 'E' 'f' 'g' 'G' 'x' 'X'
```

```go
i, err := strconv.Atoi("-42")  // -42 <nil>
s := strconv.Itoa(-42)         // "-42"
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

* type DirEntry
* type File
* type FileInfo
* type FileMode
* type LinkError
* type PathError
* type ProcAttr
* type Process
* type ProcessState
* type Signal
* type SyscallError

```go
// opens the named file for reading
func Open(name string) (*File, error)
// OpenFile is the generalized open call, it opens the named file with specified flag (O_RDONLY etc.)
func OpenFile(name string, flag int, perm FileMode) (*File, error)

// Read reads up to len(b) bytes from the File and stores them in b. It returns the number of bytes read and any error encountered. At end of file, Read returns 0, io.EOF.
func (f *File) Read(b []byte) (n int, err error)
```

```go
// Getenv retrieves the value of the environment variable named by the key.
func Getenv(key string) string

// Exit causes the current program to exit with the given status code. Conventionally, code zero indicates success, non-zero an error. The program terminates immediately; deferred functions are not run. For portability, the status code should be in the range [0, 125].
func Exit(code int)

```

```go
// 新建文件并写入
func main() {
  file, err := os.OpenFile("./temp.txt", os.O_WRONLY|os.O_CREATE, 0666)
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
    panic(err)
  }
  // 及时关闭file句柄
  defer file.Close()

  // 读文件
  reader := bufio.NewReader(file)
  for {
    line, err := reader.ReadString('\n')
    if err != nil {
      break
    }
    fmt.Print(line)  // line 带 '\n' 所以不用 Println
  }

  // 追加文件 。。。
}
```

### bufio

Package bufio implements buffered I/O. It wraps an io.Reader or io.Writer object, creating another object (Reader or Writer) that also implements the interface but provides buffering and some help for textual I/O.

```go
func ScanLines(data []byte, atEOF bool) (advance int, token []byte, err error)
func ScanWords(data []byte, atEOF bool) (advance int, token []byte, err error)

func (b *Reader) ReadBytes(delim byte) ([]byte, error)
func (b *Reader) ReadString(delim byte) (string, error)
```

### time

```go
func main() {
  fmt.Println(time.Now().Format(time.DateTime))  // 2024-01-08 12:30:56
  fmt.Println(time.Now().Unix())  // s 秒, 10位, eg 1689765768
  fmt.Println(time.Now().UnixMilli())  // millisecond 毫秒, 13位, eg 1689765768812
}
```

### math

```go
const (
  E   = 2.71828182845904523536028747135266249775724709369995957496696763 // https://oeis.org/A001113
  Pi  = 3.14159265358979323846264338327950288419716939937510582097494459 // https://oeis.org/A000796
  Phi = 1.61803398874989484820458683436563811772030917980576286213544862 // https://oeis.org/A001622

  Sqrt2   = 1.41421356237309504880168872420969807856967187537694807317667974 // https://oeis.org/A002193
  SqrtE   = 1.64872127070012814684865078781416357165377610071014801157507931 // https://oeis.org/A019774
  SqrtPi  = 1.77245385090551602729816748334114518279754945612238712821380779 // https://oeis.org/A002161
  SqrtPhi = 1.27201964951406896425242246173749149171560804184009624861664038 // https://oeis.org/A139339

  Ln2    = 0.693147180559945309417232121458176568075500134360255254120680009 // https://oeis.org/A002162
  Log2E  = 1 / Ln2
  Ln10   = 2.30258509299404568401799145468436420760110148862877297603332790 // https://oeis.org/A002392
  Log10E = 1 / Ln10
)
```

```go
const (
  MaxFloat32             = 0x1p127 * (1 + (1 - 0x1p-23)) // 3.40282346638528859811704183484516925440e+38
  SmallestNonzeroFloat32 = 0x1p-126 * 0x1p-23            // 1.401298464324817070923729583289916131280e-45

  MaxFloat64             = 0x1p1023 * (1 + (1 - 0x1p-52)) // 1.79769313486231570814527423731704356798070e+308
  SmallestNonzeroFloat64 = 0x1p-1022 * 0x1p-52            // 4.9406564584124654417656879286822137236505980e-324
)
```

```go
const (
  MaxInt    = 1<<(intSize-1) - 1  // MaxInt32 or MaxInt64 depending on intSize.
  MinInt    = -1 << (intSize - 1) // MinInt32 or MinInt64 depending on intSize.
  MaxInt8   = 1<<7 - 1            // 127
  MinInt8   = -1 << 7             // -128
  MaxInt16  = 1<<15 - 1           // 32767
  MinInt16  = -1 << 15            // -32768
  MaxInt32  = 1<<31 - 1           // 2147483647
  MinInt32  = -1 << 31            // -2147483648
  MaxInt64  = 1<<63 - 1           // 9223372036854775807
  MinInt64  = -1 << 63            // -9223372036854775808
  MaxUint   = 1<<intSize - 1      // MaxUint32 or MaxUint64 depending on intSize.
  MaxUint8  = 1<<8 - 1            // 255
  MaxUint16 = 1<<16 - 1           // 65535
  MaxUint32 = 1<<32 - 1           // 4294967295
  MaxUint64 = 1<<64 - 1           // 18446744073709551615
)
```

```go
func Max(x, y float64) float64
func Min(x, y float64) float64
func Ceil(x float64) float64
func Floor(x float64) float64
func Abs(x float64) float64
func Mod(x, y float64) float64

func Pow(x, y float64) float64
func Pow10(n int) float64
func Log(x float64) float64
```

### slices (1.12新增)

A collection of generic functions that operate on slices of any element type.

有了这个库，原先很多使用 `sort` 的场景都要迁移过来。

```go
// reports whether x is sorted in ascending order
func IsSorted[S ~[]E, E cmp.Ordered](x S) bool
func IsSortedFunc[S ~[]E, E any](x S, cmp func(a, b E) int) bool

func Sort[S ~[]E, E cmp.Ordered](x S)
func SortFunc[S ~[]E, E any](x S, cmp func(a, b E) int)

// returns the index of the first occurrence of v in s, or -1 if not present
func Index[S ~[]E, E comparable](s S, v E) int
func IndexFunc[S ~[]E, E any](s S, f func(E) bool) int
func BinarySearch[S ~[]E, E cmp.Ordered](x S, target E) (int, bool)
func BinarySearchFunc[S ~[]E, E, T any](x S, target T, cmp func(E, T) int) (int, bool)
func Contains[S ~[]E, E comparable](s S, v E) bool
func ContainsFunc[S ~[]E, E any](s S, f func(E) bool) bool

// inserts the values v... into s at index i, returning the modified slice
func Insert[S ~[]E, E any](s S, i int, v ...E) S
// removes the elements s[i:j] from s, returning the modified slice
func Delete[S ~[]E, E any](s S, i, j int) S
// replaces the elements s[i:j] by the given v, and returns the modified slice
func Replace[S ~[]E, E any](s S, i, j int, v ...E) S
```


### errors

```go
errors.Is(err, fs.ErrExist)
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
