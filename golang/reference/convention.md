# Effective Go

<style>del { text-decoration-color: #6669; }</style>

Go 语言实战: 编写可维护 Go 语言代码建议 https://github.com/llitfkitfk/go-best-practice


## 高效Go代码

* 减少对象创建，减少堆内存分配
* sync.Pool
* sync/atomic

* 处理错误的时候避免代码多层嵌套
* 避免重复命名以及代码逻辑
* 重要代码写在前面
* 对代码进行有效注释
* 命名在能够表意的前提下尽量短
* 一个lib包分成多个源代码文件
* lib包要支持 go get 操作
* 编写方法时尽量抽象，考虑可测试性
* 保存独立lib包自身实现的独立性，不要互相依赖
* 不要在方法内使用隐式的并发
* 使用 channel 来管理协程
* 避免协程泄漏
* 启动协程代价很低，但不可滥用，协程的终止要心里有数
* 少用全局变量
* 可以多尝试使用数组
* 减少 []byte 和 string 之间的转换
* 多考虑使用 context 控制并发
* 频繁对象申请和销毁需要考虑复用
* 锁比 channel 高效，前提是需要合理使用







## 代码风格

### 命名规范

#### package

package 的命名应该遵循如下原则：
- 只由 *小写* 字母组成。不包含大写字母和下划线等字符。
- *简短* 并包含一定的上下文信息。例如 `time`、`list`、`http` 等。
- 不能是含义模糊的常用名，或者与标准库同名。例如不能使用 ~`util`~ 或者 ~`strings`~。
- 包名能够作为 *路径* 的 base name，在一些必要的时候，需要把不同功能拆分为子包。例如应该使用 `encoding/base64` 而不是 ~`encoding_base64`~ 或者 ~`encodingbase64`~。

以下规则按照先后顺序尽量满足：
- 不使用常用变量名作为包名。例如使用 `bufio` 而不是 ~`buf`~。
- 使用 *单数* 而不是复数。例如使用 `encoding` 而不是 ~`encodings`~。
- 谨慎地使用缩写。例如使用 `fmt` 在不破坏上下文的情况下比 `format` 更加简短，以及一些需要用多个单词表达上下文的命名可以使用缩写，例如使用 `strconv` 而不是 ~`stringconversion`~。

#### function

Function 的命名应该遵循如下原则：
- 对于可导出的函数使用 `MixedCaps`，对于内部使用的函数使用 `mixedCaps`。
- 函数名不携带包名的上下文信息。例如使用 `http.Server` 而不是 ~`http.HTTPServer`~，因为包名和函数名总是成对出现的。
- 函数名尽量简短：
  - 当名为 `foo` 的包某个函数返回类型 `Foo` 时，往往可以省略类型信息而不导致歧义。例如使用 `time.Now()` 以及 `time.Parse()`，两者返回的都是 `time.Time` 类型。
  - 当名为 `foo` 的包某个函数返回类型 `T` 时（`T` 并不是 `Foo`），可以在函数名中加入类型信息。例如使用 `time.ParseDuration()` 返回的是 `time.Duration` 类型。
  - 当名为 `foo` 的包某个函数返回类型 `Foo`，且 `Foo` 是其所有方法的入口时，可以使用 `New()` 来命名而不导致歧义。例如使用 `list.New()` 返回的是 `*list.List` 类型。

#### function with struct receiver

Function with struct receiver 的命名应该遵循如下原则：
- 未导出字段的 `getter` 中不加入 `Get` 前缀。例如某个名为 `Foo` 的 struct 含有未导出的字段 `bar`，其 `setter` 为 `SetBar`，但其 `getter` 应该为 `Bar` 而不是 ~`GetBar`~。

#### receiver

Receiver 的命名应该遵循如下原则：
- 不要使用面向对象编程中的常用名。例如不要使用 `self`、`this`、`me` 等。
- 一般使用 1 到 2 个字母的缩写代表其原来的类型。例如类型为 `Client`，可以使用 `c`、`cl` 等。
- 在每个此类型的方法中使用统一的缩写。

#### interface

Interface 的命名应该遵循如下原则：
- 对于只有一个方法的 interface，通常将其命名为方法名加上 `er`。例如 `Reader` 和 `Writer`。
- interface 的方法不要占用一些惯用名，除非此方法具有同样的作用。例如 `Read`、`Write`、`Flush`、`String`、`ServeHTTP`。

#### variable

Variable 的命名应该遵循如下原则：
- 对于可导出的变量使用 `MixedCaps`，对于内部使用的变量使用 `mixedCaps`。
- 缩略词全大写，但当其位于变量开头且不需要导出时，使用全小写。例如使用 `ServeHTTP` 而不是 ~`ServeHttp`~，以及使用 `XMLHTTPRequest` 或者 `xmlHTTPRequest`。
- 简洁胜于冗长。例如在循环中，使用 `i` 代替 `sliceIndex`。
- 变量距离其被使用的地方越远，则需要携带越多的上下文信息。例如全局变量在其名字中需要更多的上下文信息，使得在不同地方可以轻易辨认出其含义。



## 其他

【问】据说 time.Now 很吃资源（在某些系统下会使用系统调用）  
答1：每个请求获取几万次再考虑这个问题吧  
答2：实在担心你可以学习 [idgenerator](https://code.dance.org/gopkg/idgenerator/blob/master/utils/time.go#L20) 的做法（使用缓存）  
答3：*反射 递归 深拷贝* 五毒俱全，少写一个unmarshal，你一年的 time.Now 指标都出来了  


