# Command Documentation

```bash
# 拉取包并编译安装
$ go get [-d] [-f] [-t] [-u] [-v] [-fix] [-insecure] [build flags] [packages]
  # -d  download 只下载代码包，不执行安装命令 go install
  # -u  update 更新 package 及其依赖，默认只安装缺失的依赖而不会去检查 move更新
  # -v  verbose 打印详细 progress and debug output

$ go get -d -u -v ./...
  # ./...  代表当前目录下的所有的文件

# 将源码编译为可执行文件
$ go build [-o output] [-i] [build flags] [packages]
  # -a  all 全量重新编译，默认是增量编译
  # -n  not 打印命令但不实际执行
  # -v  verbose 打印 the names of packages
  # -x  打印命令

# 将编译结果放到 GOPATH 的 bin 目录(同时，编译中间文件会被放到 pkg 目录)
$ go install [-i] [build flags] [packages]
  # -i 把依赖也一并安装了

# 编译并执行(不会生成可执行文件)
$ go run [build flags] [-exec xprog] package [arguments...]


$ go test [build/test flags] [packages] [build/test flags & test binary flags]


$ go list [-f format] [-json] [-m] [list flags] [build flags] [packages]


$ go mod <command> [arguments]
$ go mod download    download modules to local cache
$ go mod edit        edit go.mod from tools or scripts
$ go mod graph       print module requirement graph
$ go mod init        initialize new module in current directory
$ go mod tidy        add missing and remove unused modules
$ go mod vendor      make vendored copy of dependencies
$ go mod verify      verify dependencies have expected content
$ go mod why         explain why packages or modules are needed


$ go clean [clean flags] [build flags] [packages]


$ go doc [-u] [-c] [package|[package.]symbol[.methodOrField]]


$ go env [-json] [var ...]


```



