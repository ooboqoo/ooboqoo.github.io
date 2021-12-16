# Quick Start


## 安装配置

### 安装

到 https://golang.org/dl/ 下载安装包安装即可。

```bash
$ go version
$ which go
```

### 升级

升级版本时，下载官方最新的安装包直接安装，会自动删除原先老的版本。

### 开发环境

VS Code + Go 扩展。

安装完插件启动 VS Code 时会提示缺少工具，让点击安装，此时安装会失败(被墙了)，可配置代理再重新安装一遍：

```bash
$ export https_proxy=socks5://127.0.0.1:1080  # 必须是 https_proxy，用 http_proxy 不好使
$ code  # 此时再安装就 OK 了
```

为避免日后 `go` 命令的各种网络问题，可以设置下别名

```bash
$ alias go="https_proxy=socks5://127.0.0.1:1080 go"
```

### 环境变量 `GOPATH`

`GOPATH` 可指向多个工作区(目录)，Unix 下用 `,` Windows 下用 `;` 分隔。

```bash
# 打印环境变量
$ go env GOPATH
# 自定义 GOPATH 变量
$ go env -w GOPATH="/Users/gavin/golang"  # 不配则默认为 $HOME/go
# 添加到 PATH 以便于执行新编译的文件
$ export PATH=$PATH:$(go env GOPATH)/bin
```


## 代码结构

### module 版

* 一个 **repository** 可包含 一个 或 多个 module
* 一个 **module** 包含一系列相关的 package，*go.mod* 文件定义了 module 的 metadata
* **package** 是 go 程序的最小组织单位，包含一系列源码

注意：在本地，module 是可以脱离 repository 存在的，但发布代码时 module 必须隶属于某个 repository。

* **module path** 
* **import path** = modulePath + "/path/to/package-xxx"

```golang
import "demo/hello/package-a"
```

### 非 module 版（< 1.13）

绝大多数 GO 程序员都将他们全部的 GO 源代码及依赖放置到单个工作区中，这种代码组织方式跟其他语言开发习惯有所不同。

* Go programmers typically keep all their Go code in a single workspace.
* A workspace contains many version control repositories.
* Each repository contains one or more packages.
* Each package consists of one or more Go source files in a single directory.
* The path to a package's directory determines its import path.



## Hello World

简单的例子介绍开发流程 https://golang.org/doc/code.html

### Your first program

新建 module: _demo/hello_

```bash
$ cd $(go env GOPATH)
$ mkdir demo/hello && cd demo/hello
$ go mod init demo/hello
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
$ go install demo/hello  # demo/hello 为 module path
$ ~/golang/bin/hello     # 运行可执行文件
```

### Your first library

```bash
$ cd ~/golang/demo/hello
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

```bash
$ go build
```

_$HOME/golang/demo/hello/main.go_

```golang
package main

import (
    "fmt"
    "demo/hello/stringutil"
)

func main() {
    fmt.Println(stringutil.Reverse("!oG ,olleH"))
}
```

```bash
$ go run main.go
```

### Remote packages

An _import path_ can describe how to obtain the package source code using a revision control system such as Git. The go tool uses this property to automatically fetch packages from remote repositories. If you include the repository URL in the package's import path, `go get` will fetch, build, and install it automatically.

```golang
package main

import (
    "fmt"
    "demo/hello/stringutil"
    "github.com/google/go-cmp/cmp"
)

func main() {
    fmt.Println(stringutil.Reverse("!oG ,olleH"))
    fmt.Println(cmp.Diff("Hello World", "Hello Go"))
}
```

```bash
# 自动更新 go.mod 文件，下载新依赖，删除没用的依赖
$ go mod tidy
```


### Testing

Go has a lightweight test framework composed of the `go test` command and the testing package.

You write a test by creating a file with a name ending in *_test.go* that contains functions `func TestXxx(t *testing.T)`. The test framework runs each such function; if the function calls a failure function such as `t.Error` or `t.Fail`, the test is considered to have failed.

_$HOME/golang/demo/hello/stringutil/reverse_test.go_

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

```bash
# go test 应该是针对 packge 来跑测试的，直接在 hello 目录跑 `go test` 会找不到用例文件
$ go test demo/hello/stringutil
```

