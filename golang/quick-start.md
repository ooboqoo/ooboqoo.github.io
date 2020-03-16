# Quick Start

* [Getting Started](https://golang.org/doc/install) - 安装教程
* [How to write Go code](https://golang.org/doc/code.html) - 简单的例子讲解开发流程

## 安装配置

### 安装

到 https://golang.org/dl/ 下载安装包安装即可。

### 开发环境

VS Code + Go 扩展。

安装完插件启动 VS Code 时会提示缺少工具，让点击安装，此时安装会失败(被墙了)，可通过命令行再重新安装一遍：

```bash
# 先将 SS 设为全局代理，然后
$ set http_proxy=127.0.0.1:1080   # Linux 用 export
$ go get -u -v github.com/ramya-rao-a/go-outline
$ go get -u -v <其他分析工具>
```

还有一种更激进更终极的解决方法是，直接在 .bash_profile 中配好代理，然后 `Ctrl+Shif+P` 并 `Go: Install/Update Tools`。


## 代码结构 Code organization

### 概览 Overview

* Go programmers typically keep all their Go code in a single workspace.
* A workspace contains many version control repositories.
* Each repository contains one or more packages.
* Each package consists of one or more Go source files in a single directory.
* The path to a package's directory determines its import path.

绝大多数 GO 程序员都将他们全部的 GO 源代码及依赖放置到单个工作区中，这种代码组织方式跟其他语言开发习惯有所不同。

### 工作区 Workspaces

```txt
myworkspace
  |- bin
  |  |- hello                          # command executable
  |  \- outyet                         # command executable
  \- src
     |- github.com/golang/example
     |  |- .git
     |  |- hello        # 应用1
     |  |  \- hello.go                 # command source
     |  |- outyet       # 应用2
     |  |  |- main.go                  # command source
     |  |  \- main_test.go             # test source
     |  \- stringutil   # 公共库
     |     |- reverse.go               # package source
     |     \- reverse_test.go          # test source
     |- golang.org/x/image
     |     |- .git
     |     \- bmp
     |        |- reader.go             # package source
     |        \- writer.go             # package source
     \- many more repositories and packages
```

### 环境变量 `GOPATH`

环境变量 `GOPATH` 指向工作区，默认为 Unix `$HOME/go` 或 Windows `%USERPROFILE%\go`。

`GOPATH` 可指向多个工作区(目录)，Unix 下用 `,` Windows 下用 `;` 分隔。

```bash
$ go env GOPATH  # 打印环境变量
$ export PATH=$PATH:$(go env GOPATH)/bin  # 便于执行新编译的文件
```

### Import paths

An _import path_ is a string that uniquely identifies a package. A package's _import path_ corresponds to its location inside a workspace or in a remote repository.

### Your first program

```bash
$ mkdir $(go env GOPATH)/src/github.com/ooboqoo/hello
```

_hello.go_

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world.")
}
```

```bash
$ go install github.com/ooboqoo/hello
$ ~/go/bin/hello  # 运行可执行文件
```

### Your first library

```bash
$ mkdir ~/go/src/github.com/ooboqoo/stringutil
```

_reverse.go_

```go
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

_~/go/src/github.com/ooboqoo/hello/hello.go_

```go
package main

import (
    "fmt"
    "github.com/ooboqoo/stringutil"
)

func main() {
    fmt.Println(stringutil.Reverse("!oG ,olleH"))
}
```

### Package names

每个源文件的第一个语句必须是 `package <packagename>` 以声明代码所属包名。

一个可执行文件必须使用 `package main`

### Testing

Go has a lightweight test framework composed of the go test command and the testing package.

You write a test by creating a file with a name ending in *_test.go* that contains functions `func TestXxx(t *testing.T)`. The test framework runs each such function; if the function calls a failure function such as `t.Error` or `t.Fail`, the test is considered to have failed.

```bash
$ go test go.demo/stringutil
```

### Remote packages

An _import path_ can describe how to obtain the package source code using a revision control system such as Git. The go tool uses this property to automatically fetch packages from remote repositories. If you include the repository URL in the package's import path, `go get` will fetch, build, and install it automatically.










