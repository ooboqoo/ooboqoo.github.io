# Hello World (基本开发流程)

https://golang.org/doc/code


## Your first program

新建 module: _demo.dev/hello_

```bash
$ cd $(go env GOPATH)  # 此示例中将默认的 ~/go 修改成了 ~/golang
$ mkdir demo.dev/hello && cd demo.dev/hello
$ go mod init demo.dev/hello
```

新建 package: _main_ (Executable commands must always use package _main_)

_main.go_

```golang
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

```bash
$ go run .  # 立即运行命令
```

```bash
# 安装并运行
$ go install demo.dev/hello  # 可执行文件名为模块名的末尾部分，如，这里的 demo.dev/hello 安装后为 hello
$ ~/golang/bin/hello         # 运行可执行文件

# 上面两个命令还可以简化为
$ go install  # 因为在模块内操作，模块名可省略
$ hello       # 因为已经配置好 PATH 变量了，路径可省
```


## Your first library

```bash
$ cd ~/golang/demo.dev/hello
$ mkdir stringutil
```

_reverse.go_

```golang
package stringutil

func Reverse(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}
```

_main.go_

```golang
package main

import (
    "fmt"
    "hello.demo.dev/stringutil"
)

func main() {
    fmt.Println(stringutil.Reverse("!oG ,olleH"))
}
```

```bash
$ go run .
```


## Remote packages

An _import path_ can describe how to obtain the package source code using a revision control system such as Git. The go tool uses this property to automatically fetch packages from remote repositories. If you include the repository URL in the package's import path, `go get` will fetch, build, and install it automatically.

```golang
package main

import (
    "fmt"
    "demo.dev/hello/stringutil"
    "github.com/google/go-cmp/cmp"
)

func main() {
    fmt.Println(stringutil.Reverse("!oG ,olleH"))
    fmt.Println(cmp.Diff("Hello World", "Hello Go"))
}
```

```bash
$ go mod tidy  # 自动更新 go.mod 文件，下载新依赖，删除没用的依赖
$ go run .
```


## Testing

Go has a lightweight test framework composed of the `go test` command and the testing package.

You write a test by creating a file with a name ending in *_test.go* that contains functions `func TestXxx(t *testing.T)`. The test framework runs each such function; if the function calls a failure function such as `t.Error` or `t.Fail`, the test is considered to have failed.

_~/golang/demo.dev/hello/stringutil/reverse_test.go_

```golang
package stringutil

import "testing"

func TestReverseRunes(t *testing.T) {
    cases := []struct {
        in, want string
    }{
        {"Hello, world", "dlrow ,olleH"},
        {"Hello, 世界", "界世 ,olleH"},
        {"", ""},
    }
    for _, c := range cases {
        got := Reverse(c.in)
        if got != c.want {
            t.Errorf("ReverseRunes(%q) == %q, want %q", c.in, got, c.want)
        }
    }
}
```

```txt
usage: go test [build/test flags] [packages] [build/test flags & test binary flags]
'Go test' automates testing the packages named by the import paths.
```

```bash
# go test 应该是针对 packge 来跑测试的，直接在 hello 目录跑 `go test` 会找不到用例文件
$ go test demo.dev/hello/stringutil
```
