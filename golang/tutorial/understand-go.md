# Go 语言核心 36讲


本专栏分成3大模块 5个章节
* 基础概念
* 数据类型和语句
* 测试
* 标准库
* 其他

讲述方式：我总会以一道 Go 语言的面试题开始，针对它进行解答，我会告诉你为什么我要关注这道题，这道题的背后隐藏着哪些知识，并且，我会对这部分的内容，进行相关的知识扩展。

### 02 命令源码文件

https://pkg.go.dev/flag

```golang
package main

import (
  "flag"
  "fmt"
)

var foo string
var bar *string
var b *bool

func init() {
  flag.StringVar(&foo, "foo", "fooArg", "help message for flag foo")
  bar = flag.String("bar", "barArg", "help message for flag bar")
  b = flag.Bool("b", false, "help message for flag b")  // 注册参数定义
}

func main() {
  flag.Parse()                                          // 实际解析用户传参
  fmt.Printf("foo=%s\nbar=%s\nb=%t\n", foo, *bar, *b)
}
```

```bash
# 演示命令帮助功能
$ go run ./demo.go --help

# 演示正常使用场景
$ go run ./demo.go -foo=abc --bar=def
```

### 03 库源码文件

包名确实是可以跟所在文件夹名不同，但实际真这样做的话用起来很别扭。因此我们总是应该让声明的包名与其父目录的名称一致。

demo/lib/hello.go

```golang
package lib2

import "fmt"

func Hello() {
  fmt.Printf("Hello")
}
```

demo/main.go

```golang
package main

import "demo/lib"  // 导入路径对应文件夹名

func main() {
  lib2.Hello()     // 调用时对应包名
}
```

访问权限
* 包级私有
* 模块级私有
* 公开

在 Go 1.5 及后续版本中，我们可以通过创建 internal代码包 让一些程序实体仅仅能被当前模块中的其他代码引用。

```golang
package internal   # 包名是固定的 internal

func Hello() {
  // ...
}
```



