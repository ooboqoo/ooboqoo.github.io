# Quick Start

https://www.tutorialspoint.com/go/go_quick_guide.htm


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
$ export https_proxy=socks5://127.0.0.1:1080  # 必须是 https_proxy，不是 http_proxy
```

为避免日后 `go` 命令的各种网络问题，可以设置下别名

```bash
$ alias go="https_proxy=socks5://127.0.0.1:1080 go"
```

【推荐】在 module 使用场景下，更靠谱的方法是配置 `GOPROXY`，就不需要配上面的别名了

```bash
# go1.15 以上用 `|` 替换原来的 `,` 这样兼容的错误场景更多
$ go env -w GOPROXY="https://goproxy.dance.org|https://goproxy.cn|direct"
$ go env -w GOSUMDB="sum.golang.google.cn"
```

### 环境变量 `GOPATH`

* `GOROOT` GO语言安装路径
* `GOPATH` 工作区目录（可指向多个工作区(目录)，Unix 下用 `:`，Windows 下用 `;` 分隔）
    - `pkg` 源码目录
    - `bin` 可执行文件目录

Go 语言项目在其生命周期内的所有操作（编码、依赖管理、构建、测试、安装等）基本上都是围绕着 GOPATH 和工作区进行的。

```bash
# 打印环境变量
$ go env GOPATH

# 自定义 GOPATH 变量
$ go env -w GOPATH="/Users/gavin/golang"  # 不配则默认为 $HOME/go
# 配置多个 GOPATH 目录
$ go env -w GOPATH="/Users/gavin/go:/Users/gavin/dev/go"

# 添加到 PATH 以便于执行新编译的文件
$ export PATH=$PATH:$(go env GOPATH)/bin
```

Each directory listed in GOPATH must have a prescribed structure:

The `src` directory holds source code. *The path below src determines the import path* or executable name. If DIR is a directory listed in the GOPATH, a package with source in DIR/src/foo/bar can be imported as "foo/bar" and has its compiled form installed to "DIR/pkg/GOOS_GOARCH/foo/bar.a". 

*When using modules, GOPATH is no longer used for resolving imports*. However, it is still used to store downloaded source code (in GOPATH/pkg/mod) and compiled commands (in GOPATH/bin).

当 Module 形式的源码不在 GOPATH 目录下时，VSCode 打开包含多个 Module 的目录，gopls 会报以下错误，此时只要打开单个 Module 目录，或在这个父目录下添加 go.work 文件就好。

```txt
gopls was not able to find modules in your workspace.
When outside of GOPATH, gopls needs to know which modules you are working on.
You can fix this by opening your workspace to a folder inside a Go module, or
by using a go.work file to specify multiple modules.
```


## 开发调试

线上(远程)调试工具 https://github.com/go-delve/delve


## 代码组织

https://go.dev/ref/mod

### 代码结构

* 一个 **repository** 可包含 一个或多个 module
* 一个 **module** 包含一系列相关的 package
    - 模块是 *最小发布单位*
    - *go.mod* 文件定义了 module 的 metadata
* **package** 包含一系列源码文件
    - 包是 go 程序的 *最小组织单位*
    - _a package is a way to group functions, and it's made up of all the files in the same directory_
* 一个源码文件包含若干个 functions, types, variables, and constants

注意：在本地，module 是可以脱离 repository 存在的，但发布代码时 module 必须隶属于某个 repository。

```golang
import "demo.dev/hello/package-xxx"
  // repository + module + package
```

#### Workspaces

https://go.dev/blog/get-familiar-with-workspaces

* 一个 **workspace** 约等于一个 monorepo
    - 跟 `GOPATH` 的联系和区别：The `GOPATH` environment variable specifies the location of your workspace
* 主要方便本地多个有联系的模块的协同开发（不需要发布就可以相互看到彼此最新的修改）

Workspaces in Go 1.18 let you work on multiple modules simultaneously without having to edit _go.mod_ files for each module. Each module within a workspace is treated as a main module when resolving dependencies.

Previously, to add a feature to one module and use it in another module, you needed to either publish the changes to the first module, or edit the go.mod file of the dependent module with a `replace` directive for your *local, unpublished module changes*. In order to publish without errors, you had to remove the `replace` directive from the dependent module’s _go.mod_ file after you published the local changes to the first module.

With Go workspaces, you control all your dependencies using a _go.work_ file in the *root* of your *workspace directory*. The _go.work_ file has `use` and `replace` directives that override the individual _go.mod_ files, so there is no need to edit each _go.mod_ file individually.

### 源码文件

命令源码文件
* 独立程序的入口
* 属于 main 包，包含一个无参数无返回的 main 函数
* `go build` 构建后生成可执行文件，生成位置在命令执行目录
* `go install` 安装位置在当前工作区的 _bin 目录_

库源码文件
* 安装生成归档文件（即静态链接库文件），位于当前工作区的 _pkg 目录_

测试源码文件
* 功能测试源码文件 `func TestXxx(t *testing.T) { }`
* 性能（基准）测试源码文件 `func BenchmarkXxx(b *testing.B) { }`
* 示例（样本）测试源码文件 `func ExampleXxx() { // Outpt: xxx }`
    - 测试函数期望输出：放置在函数末尾，用注释行表示，形如 `// Output: xxx`


## Go Modules

A module is a collection of Go packages stored in a file tree with a _go.mod_ file at its root.

* _go.mod_ 即前端的 package.json
* _go.sum_ 即前端的 lock file （Modules record precise dependency requirements and create reproducible builds）

Module模式下
* `$GOPATH` 存储下载的依赖包，默认在 `$GOPATH[0]/pkg/mod` （可通过 `$GOMODCACHE` 修改）
* 依赖包具体 module 都以 `{module_name}@{version_code}` 的目录形式存在
* `go build` `go test` `go run` 等命令会根据 `import` 自动下载并添加依赖到 _go.mod_ 文件中。
* 如需要手动指定依赖版本，可手动修改 _go.mod_ 中的版本号再 build；或者也可以 `go get <package@version>` 来更新依赖


### go.mod 详解

https://github.com/golang/go/wiki/Modules#gomod


### Adding a dependency on a new major version

> Go 中的  v0 和 v1 是不做区分的，从 v2 开始的主版本都以子模块的形式存在

小版本的升级不应该破坏后向兼容性，这种破坏只能在主版本升级时才可以。为了不同的主版本可以并存，Go 的 v1 以外的主版本都是以 *子模块* 的形式存在的。

_hello.go_

```go
package hello

import (
    "rsc.io/quote"
    quoteV3 "rsc.io/quote/v3"
)

func Hello() string {
    return quote.Hello()
}

func Proverb() string {
    return quoteV3.Concurrency()
}
```

