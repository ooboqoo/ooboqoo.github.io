# Go Modules

https://blog.golang.org/using-go-modules  
https://juejin.im/post/5c9c8c4fe51d450bc9547ba1

A module is a collection of Go packages stored in a file tree with a go.mod file at its root.


## Creating a new module

```bash
$ mkdir hello
$ cd hello
```

_hello.go_

```go
package hello

func Hello() string {
    return "Hello, world."
}
```

*hello_test.go*

```go
package hello

import "testing"

func TestHello(t *testing.T) {
    want := "Hello, world."
    if got := Hello(); got != want {
        t.Errorf("Hello() = %q, want %q", got, want)
    }
}
```

```bash
$ go test   # PASS
$ go mod init       # 初始化模块，即新建 go.mod 文件
$ go test   # PASS
```

如果一个模块包含子模块，子模块是不需要 go.mod 文件的，只需要在根目录放置一份即可。子目录的依赖都会组织在根目录的 go.mod 文件里。


## Adding a dependency

Go Modules 的主要目的，就是方便共享他人代码。

_hello.go_

```go
package hello

import "rsc.io/quote"

func Hello() string {
    return quote.Hello()
}
```

```bash
$ go test  # PASS  此时会自动下载缺失的依赖并更新 go.mod 和 go.sum
```

_go.mod_

```txt
module example.com/hello

go 1.12

require rsc.io/quote v1.5.2
```

安装 rsc.io/quote 的时候，还安装了一些间接依赖，我们可以看下

```bash
$ go list -m all  # 列出当前模块和它的所有依赖
example.com/hello
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
rsc.io/quote v1.5.2
rsc.io/sampler v1.3.0
```

_go.sum_ 文件则记录了更详细的依赖包信息，哈希值用于确保下载的依赖的版本一致性。_go.mod_ 和 _go.sum_ 都应该提交到仓库。

```txt
rsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/QiW4=
rsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9JXDnKaTXpA=
...
```


## Upgrading dependencies

```bash
$ go get golang.org/x/text
go: finding golang.org/x/text v0.3.0
go: downloading golang.org/x/text v0.3.0
go: extracting golang.org/x/text v0.3.0
$ go test  # PASS
```

此时 _go.mod_ 已经变成了

```txt
module example.com/hello

go 1.12

require (
    golang.org/x/text v0.3.0 // indirect
    rsc.io/quote v1.5.2
)
```


## Adding a dependency on a new major version

小版本的升级不应该破话后向兼容性，这种破话只能在主版本升级时才可以。为了不同的主版本可以并存，Go 的 v1 以外的主版本都是以子模块的形式存在的。

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

*hello_test.go*

```go
func TestProverb(t *testing.T) {
    want := "Concurrency is not parallelism."
    if got := Proverb(); got != want {
        t.Errorf("Proverb() = %q, want %q", got, want)
    }
}
```

```bash
$ go test
go: finding rsc.io/quote/v3 v3.1.0
go: downloading rsc.io/quote/v3 v3.1.0
go: extracting rsc.io/quote/v3 v3.1.0
PASS
```

```bash
$ go list -m rsc.io/q...
rsc.io/quote v1.5.2
rsc.io/quote/v3 v3.1.0
```


## Upgrading a dependency to a new major version

```bash
$ go doc rsc.io/quote/v3   # 查看文档
```

步骤 1： 将 quote.Hello() 迁移到 quoteV3.HelloV3()

```go
package hello

import quoteV3 "rsc.io/quote/v3"

func Hello() string {
    return quoteV3.HelloV3()
}

func Proverb() string {
    return quoteV3.Concurrency()
}
```

步骤 2：将重命名的 quoteV3 删掉

```go
package hello

import "rsc.io/quote/v3"

func Hello() string {
    return quote.HelloV3()
}

func Proverb() string {
    return quote.Concurrency()
}
```

```go
$ go test  # PASS
```


## Removing unused dependencies

我们的项目已经不再依赖 rsc.io/quote，但 Go 并不会自动删除 _go.mod_ 中的依赖项，因为构建时 Go 很容易知道缺失了哪些依赖，但要知道一个依赖是否可以被安全移除，需要检查项目中的所有包，构建时显然不合适做此检查，需要手动运行。

```bash
$ go mod tidy
```

## Conclusion

Go modules are the future of dependency management in Go. Module is now available in 1.11 and 1.12.

This post introduced these workflows using Go modules:

* `go mod init` creates a new module, initializing the go.mod file that describes it.
* `go build`, `go test`, and other package-building commands add new dependencies to go.mod as needed.
* `go list -m all` prints the current module’s dependencies.
* `go get` changes the required version of a dependency (or adds a new dependency).
* `go mod tidy` removes unused dependencies.

We encourage you to start using modules in your local development and to add go.mod and go.sum files to your projects.




