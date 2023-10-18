# Command Documentation

https://pkg.go.dev/cmd/go


Usage:

```txt
go <command> [arguments]

The commands are:

bug         start a bug report
build       compile packages and dependencies
clean       remove object files and cached files
doc         show documentation for package or symbol
env         print Go environment information
fix         update packages to use new APIs
fmt         gofmt (reformat) package sources
generate    generate Go files by processing source
get         add dependencies to current module and install them
install     compile and install packages and dependencies
list        list packages or modules
mod         module maintenance
run         compile and run Go program
test        test packages
tool        run specified go tool
version     print Go version
vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.
```



```bash
# 拉取包并编译安装  add dependencies to current module and install them
$ go get [-d] [-f] [-t] [-u] [-v] [-fix] [-insecure] [build flags] [packages]
  # -d  download 只下载代码包，不执行安装命令 go install
  # -u  update 更新 package 及其依赖，如不加此选项，默认只安装缺失的依赖而不会去检查更新
  # -v  verbose 打印详细 progress and debug output


$ go get github.com/gin-gonic/gin  # 安装依赖，如果存在依赖则会将此依赖更新到 latest version
$ go get github.com/gin-gonic/gin@none  # @none  从go.mod删除依赖
$ go get -d -u -v ./...  # ./...  代表当前目录下的所有的文件

# 将源码编译为可执行文件
$ go build [-o output] [-i] [build flags] [packages]
  # -a  all 全量重新编译，默认是增量编译
  # -n  not 打印命令但不实际执行
  # -v  verbose 打印 the names of packages
  # -x  打印命令

# 将编译结果放到 GOPATH 的 bin 目录(同时，编译中间文件会被放到 pkg 目录)
$ go install [-i] [build flags] [packages]

# 编译并执行(不会生成可执行文件)
$ go run [build flags] [-exec xprog] package [arguments...]


$ go test [build/test flags] [packages] [build/test flags & test binary flags]


$ go list [-f format] [-json] [-m] [list flags] [build flags] [packages]


$ go mod <command> [arguments]
$ go mod download    # download modules to local cache / 下载 go.mod 文件中记录的所有依赖包
$ go mod edit        # edit go.mod from tools or scripts / 编辑 go.mod 文件
$ go mod graph       # print module requirement graph / 查看现有的依赖结构
$ go mod init        # initialize new module in current directory / 把当前目录初始化为一个新模块
$ go mod tidy        # add missing and remove unused modules / 添加丢失的模块，并移除无用的模块
$ go mod vendor      # make vendored copy of dependencies / 将所有依赖包存到当前目录下的 vendor 目录下
$ go mod verify      # verify dependencies have expected content
                     # 检查当前模块的依赖是否已经存储在本地下载的源代码缓存中，以及检查下载后是否有修改
$ go mod why         # explain why packages or modules are needed / 查看为什么需要依赖某模块


$ go clean [clean flags] [build flags] [packages]


$ go doc [-u] [-c] [package|[package.]symbol[.methodOrField]]


$ go env [-json] [var ...]


```



