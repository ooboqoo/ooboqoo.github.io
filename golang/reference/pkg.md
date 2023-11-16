# Awesome packages

https://awesome-repos.ecp.plus/go.html


## 能力扩展

### 数据结构扩展

https://github.com/emirpasic/gods Implementation of various data structures and algorithms in Go.

```go
package main

import (
    dll "github.com/emirpasic/gods/lists/doublylinkedlist"
    "github.com/emirpasic/gods/utils"
)

func main() {
    list := dll.New()
    list.Add("a")                         // ["a"]
    list.Add("c", "b")                    // ["a","c","b"]
    list.Sort(utils.StringComparator)     // ["a","b","c"]
    _, _ = list.Get(0)                    // "a",true
    _, _ = list.Get(100)                  // nil,false
    _ = list.Contains("a", "b", "c")      // true
    _ = list.Contains("a", "b", "c", "d") // false
    list.Swap(0, 1)                       // ["b","a",c"]
    list.Remove(2)                        // ["b","a"]
    list.Remove(1)                        // ["b"]
    list.Remove(0)                        // []
    list.Remove(0)                        // [] (ignored)
    _ = list.Empty()                      // true
    _ = list.Size()                       // 0
    list.Add("a")                         // ["a"]
    list.Clear()                          // []
    list.Insert(0, "b")                   // ["b"]
    list.Insert(0, "a")                   // ["a","b"]
}
```

### 时间 now

https://github.com/jinzhu/now z金柱大佬出品了 `gorm` `copier` `now` 等流行库

```go
t, err := now.Parse("1999-12-12 12:20")    // 1999-12-12 12:20:00, nil
t, err := now.Parse("12:20")               // 2013-11-18 12:20:00, nil

now.BeginningOfWeek()          // 2013-11-17 00:00:00 Sun
now.Monday("17:44")       // 2013-11-18 17:44:00 Mon
```

### go-funk

https://github.com/thoas/go-funk Golang 版 Lodash。貌似用的人较少，使用之前须再调研下。

```go
funk.Contains([]string{"foo", "bar"}, "bar") // true
funk.IndexOf([]string{"foo", "bar"}, "gilles") // -1

funk.ToSet  // Transforms an array or a slice to a set (a map with zero-size values)
funk.ToMap  // Transforms a slice or an array of structs to a map based on a pivot field
funk.Map    // Manipulates an iteratee (map, slice) and transforms it to another type

funk.Get    // Retrieves the value at path of struct(s) or map(s)
funk.Set    // Set value at a path of a struct
funk.Prune  // Copy a struct with only selected fields

funk.Keys(map[string]int{"one": 1, "two": 2}) // []string{"one", "two"} (iteration order is not guaranteed)
funk.Values(map[string]int{"one": 1, "two": 2}) // []int{1, 2} (iteration order is not guaranteed)

funk.ForEach([]int{1, 2, 3, 4}, func(x int) { fmt.Println(x) })
funk.Filter([]int{1, 2, 3, 4}, func(x int) bool { return x%2 == 0 }) // []int{2, 4}
funk.Find    // Finds an element in a slice based on a predicate
funk.Reduce  // Reduces an iteratee based on an accumulator function or operation rune for numbers
funk.FlattenDeep([][]int{[]int{1, 2}, []int{3, 4}}) // []int{1, 2, 3, 4}
funk.Uniq([]int{0, 1, 1, 2, 3, 0, 0, 12}) // []int{0, 1, 2, 3, 12}
```

### 日志 zerolog

https://github.com/rs/zerolog Zero Allocation JSON logger

```go
package main
import (
    "github.com/rs/zerolog"
    "github.com/rs/zerolog/log"
)
func main() {
    // UNIX Time is faster and smaller than most timestamps
    zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
    log.Print("hello world")
}
// Output: {"level":"info","time":1676735114,"message":"hello world"}
```

To log a human-friendly, colorized output, use `zerolog.ConsoleWriter`:

```go
log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339})
log.Info().Str("foo", "bar").Msg("Hello world")
// Output: 2023-02-18T23:48:31+08:00 INF Hello world foo=bar
```


## Utils

### 读配置

https://github.com/spf13/viper

支持多种格式，实时更新配置内容

### 类型转换

https://github.com/spf13/cast

```go
var eight any = 8
cast.ToInt(eight)  // 8
cast.ToInt("8")    // 8
cast.ToInt("str")  // 0

x, err = cast.ToIntE("str")
fmt.Println(y)    // 0
fmt.Println(err)  // unable to cast "str" of type string to int64
```

### 数据复制

https://github.com/jinzhu/copier 

* Copy from field to field with same name
* Copy from slice to slice
* Copy from struct to slice
* Copy from map to map
* Deep Copy

```go
copier.Copy(&employee, &user)
copier.CopyWithOption(&to, &from, copier.Option{IgnoreEmpty: true, DeepCopy: true})
```





## 序列化

### gjson & sjson

* 读 https://github.com/tidwall/gjson
* 写 https://github.com/tidwall/sjson

提供了非常友好的 API，适合对 JSON 文件低频操作时使用。如果碰到需要深度处理的大文件，用 SJON 不断修改(并生成新的字符串)，性能极差。

### json

* https://pkg.go.dev/encoding/json
* https://transform.tools/json-to-go 根据 JSON 生成类型

将对象转为 struct 时
* 未在 struct 中定义的字段会丢失
* 如果 JSON 文件中没找到字段会赋 zero value

```go
import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"` // field tag 更多用法见 https://pkg.go.dev/encoding/json#Marshal
    age  int    `json:"age"`  // 因为小写开头，encoding/json 包无法读到这个字段，编辑器有黄色提示
}

func main() {
    raw := `{"name": "John", "age": 12, "city": "Shanghai"}`
    var p Person
    json.Unmarshal([]byte(raw), &p) // 解包
    fmt.Println(p)                  // {John 0} age 为空值，没有 city
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

### Protocol Buffers

https://pkg.go.dev/google.golang.org/protobuf



## CLI

### CLI框架 (cobra)

https://github.com/spf13/cobra  
https://cobra.dev/  

```go
import "github.com/spf13/cobra"
```


## 数据库

### Redis ( redigo / go-redis )

https://developer.redis.com/develop/golang/



## 特定应用场景

### UUID (uuid)

https://github.com/google/uuid

```go
import (
	"fmt"
	"github.com/google/uuid"
)
func main() {
	fmt.Println(uuid.New().String())
}
```

### Git (go-git)

https://github.com/go-git/go-git

go-git is a highly extensible git implementation library written in pure Go.

### WebSocket

https://github.com/olahol/melody


### 压缩

* https://facebook.github.io/zstd/
* https://github.com/klauspost/compress/tree/master/zstd#zstd



### Excel (excelize)

https://github.com/qax-os/excelize

```go
package main

import (
    "fmt"
    "github.com/xuri/excelize/v2"
)

func main() {
    f := excelize.NewFile()
    defer func() {
        if err := f.Close(); err != nil {
            fmt.Println(err)
        }
    }()
    // Create a new sheet.
    index, err := f.NewSheet("Sheet2")
    if err != nil {
        fmt.Println(err)
        return
    }
    // Set value of a cell.
    f.SetCellValue("Sheet2", "A2", "Hello world.")
    f.SetCellValue("Sheet1", "B2", 100)
    // Set active sheet of the workbook.
    f.SetActiveSheet(index)
    // Save spreadsheet by the given path.
    if err := f.SaveAs("Book1.xlsx"); err != nil {
        fmt.Println(err)
    }
}
```

### Dependency Injection

* https://github.com/uber-go/fx A dependency injection system for Go.
* https://github.com/uber-go/dig A reflection based dependency injection toolkit for Go.

fx 在 dig 上封装了一层，变成完整框架了。当然要不要上 DI 大家意见不一。


## 开发工具

### 测试 (testify)

https://github.com/stretchr/testify

```go
import (
  "testing"
  "github.com/stretchr/testify/assert"
)

func TestSomething(t *testing.T) {
  assert := assert.New(t)

  // assert equality
  assert.Equal(123, 123, "they should be equal")

  // assert inequality
  assert.NotEqual(123, 456, "they should not be equal")

  // assert for nil (good for errors)
  assert.Nil(object)

  // assert for not nil (good when you expect something)
  if assert.NotNil(object) {
    // now we know that object isn't nil, we are safe to make
    // further assertions without causing any errors
    assert.Equal("Something", object.Value)
  }
}
```

```go
import (
  "testing"
  "github.com/stretchr/testify/mock"
)
// ...
```


### 代码调用关系可视化

https://github.com/ofabry/go-callvis

```bash
$ go install github.com/TrueFurby/go-callvis
$ go-callvis <package-name>  # go.mod 中的 module 名
```



