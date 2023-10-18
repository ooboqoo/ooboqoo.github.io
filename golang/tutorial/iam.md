# IAM 项目开发实战

https://time.geekbang.org/column/article/378127


## 课前准备

### 语言简介

#### 产生背景

软件开发的新挑战
* 多核硬件架构
* 超大规模分布式计算集群
* Web模式导致的前所未有的开发规模和更新速度

#### 特点
* 追求极致的简单，Go 只有 25 个关键字（C 37个，C++ 84个），且一直坚持不新增关键字
* 高效，强类型语言，跟 Java 不同的是，Go 在支持垃圾回收的同时也提供了直接的通过指针来访问
* 生产力：只支持组合不支持继承

#### 应用程序入口

* 必须是 main 包 `package main`
* 必须是 main 方法 `func main()`
* 文件名 *不*一定 是 `main.go`

与其他主要编程语言的差异
* `main` 函数不支持任何返回值，通过 `os.Exit` 来返回状态
* `main` 函数不支持传入参数，在程序中直接通过 `os.Args` 获取命令行参数

```go
package main
import (
  "fmt"
  "os"
)
func main() {
  fmt.Println(os.Args)
  os.Exit(-1)  // exit status 255
}
```

### 项目简介

IAM系统 (Identity & Access Management) 主要完成认证和授权功能。
* 认证 authentication，缩写 authn：用来判断是否是平台的合法用户，例如用户名和密码就是认证的一种方式
* 授权 authorization，缩写 authz：用来判断，是否可以访问平台的某类资源。

认证和授权 2个功能可以抽象成一个系统，这个系统名我起名为IAM。类似于 AWS 的 IAM，腾讯云的CAM 和 阿里云的RAM。

建议你参考下腾讯云的CAM以协助你理解：https://cloud.tencent.com/document/product/599/40011。


IAM能和网关结合使用吗，还是必须二选一呢
* *网关* 做的是 *接口鉴权*，也就是哪个用户/密钥可以访问哪个接口
* *IAM* 做的是 *资源鉴权*，例如淘宝中的iphone资源等


为什么选择 MongoDB 作为日志数据分析展示库
1. mongodb带有数据聚合功能，在某些场景下可以实现复杂的数据统计
2. 而且字段增减随意，查询方便
3. IAM系统授权日志量不大，场景也不复杂，再加上，这里是想展示mongodb的教学，所以就采用了mongo

在做项目的时候，项目间通信经常使用的是kafka这类消息队列，后台会经常用搜索功能，这部分数据都会放在了ES中如搜索，日志或者后台系统的一些搜索。IAM系统中使用了Redis做消息队列，使用了MongoDB去进行存储和查询，这些是我目前想到不一样的技能点。

### 环境准备

#### MariaDB

IAM 会把 REST 资源的定义信息存储在关系型数据库中，关系型数据库我选择了 MariaDB。

```bash
$ docker run --name mariadb -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=iam666 mariadb:10.6
```
```bash
$ brew install mysql
$ mysql -h127.0.0.1 -uroot -piam666
```

#### Redis

在 IAM 系统中，由于 iam-authz-server 是从 iam-apiserver 拉取并缓存用户的密钥 / 策略信息的，因此同一份密钥 / 策略数据会分别存在 2 个服务中，这可能会出现数据不一致的情况。数据不一致会带来一些问题，例如当我们通过 iam-apiserver 创建了一对密钥，但是这对密钥还没有被 iam-authz-server 缓存，这时候通过这对密钥访问 iam-authz-server 就会访问失败。为了保证数据的一致性，我们可以使用 Redis 的发布订阅 (pub/sub) 功能进行消息通知。同时，iam-authz-server 也会将授权审计日志缓存到 Redis 中，所以也需要安装 Redis key-value 数据库。

```bash
$ docker run --name redis -d -p 6379:6379 redis:6.2
```

```bash
$ docker exec -it redis bash
# redis-cli
> set test 1
OK
> get test
```

```bash
$ redis-cli -h 127.0.0.1 -p 6379 -a 'iam666' # 连接 Redis，-h 指定主机，-p 指定监听端口，-a 指定登录密码
```

#### MongoDB

```bash
$ docker run --name mongodb -d -p 27017:27017 -v my-mongo-data:/data/db mongo:6
```

```bash
$ brew install mongosh
$ mongosh
test> use admin
admin> db.createUser({user:'iam',pwd:'iam666',roles:['dbOwner']})
```

```bash
$ mongosh --quiet mongodb://iam:iam666@localhost:27017/iam_analytics
```

#### 一键部署

直接拉网友的镜像先跑起，后面再研究手动部署。

```bash
$ docker pull mjcjm/centos-go-project:v1
$ docker run -d -it --name centos-iam --privileged=true mjcjm/centos-go-project:v1 /usr/sbin/init
```

## 规范设计



## 基础功能开发




## 服务开发



### 命令行客户端

我们发现像 K8S 等项目都带了一个命令行工具，如 `kubectl`，这样有两个好处：
1. 实现自动化：可以通过在脚本中调用 xxxctl 工具，实现自动化
2. 提高效率：通过将应用的功能封装成命令和参数，方便运维、开发人员在 Linux 服务器上调用

常见的客户端有
1. 前端，包括浏览器和手机APP。面向最终用户，使用体验最好。
2. SDK，供开发者调用。是封装了 API 接口的一系列函数集合，减少开发者工作量。
3. CLI，供运维或者开发人员在服务器上直接执行，或者在自动化脚本中调用。
4. 其他终端，如智能音箱、第三方应用，脚本 等。

通过学习 kubectl、istioctl、etcdctl 这些优秀的命令行工具，可以发现一个大型系统的命令行工具，通常具有下面这些特点：
1. 支持命令和子命令，命令 / 子命名有自己独有的命令行参数。
2. 支持一些特殊的命令。如 completion 命令可以输出 bash/zsh 自动补全脚本；version 命令输出客户端和服务端版本(如有)。
3. 支持全局 option，作为所有命令及子命令的命令行参数。
4. 支持 -h/help，可以打印 xxxctl 的帮助信息。
5. 支持 help 命令，打印命令 / 子命令的帮助信息。

#### iamctl 简介

IAM 项目参考 kubectl，实现了命令行工具 iamctl。iamctl 集成了很多功能，我们可以通过 iamctl 子命令来使用这些功能。例如，我们可以通过 iamctl 对用户、密钥和策略进行 CRUD 操作；可以设置 iamctl 自动补全脚本；可以查看 IAM 系统的版本信息。甚至，你还可以使用 `iamctl new` 命令，快速创建一个 iamctl 子命令模板。

iamctl 使用了 `cobra`、`pflag`、`viper` 包来构建，每个子命令又包含了一些基本的功能，例如短描述、长描述、使用示例、命令行选项、选项校验等。iamctl 命令可以加载不同的配置文件，来连接不同的客户端。iamctl 通过 SDK 调用、REST API 调用两种方式来调用服务端 API 接口。

#### iamctl 代码结构

iamctl 工具的 main 函数位于 iamctl.go 文件中。命令的实现存放在 `internal/iamctl/cmd/cmd.go` 文件中。iamctl 的命令统一存放在 `internal/iamctl/cmd` 目录下，每个命令都是一个 Go 包，包名即为命令名，具体实现存放在 `internal/iamctl/cmd/<命令>/<命令>.go` 文件中。如果命令有子命令，则子命令的实现存放在 `internal/iamctl/cmd/<命令>/<命令>_<子命令>.go` 文件中。使用这种代码组织方式，即使是在命令很多的情况下，也能让代码井然有序，方便定位和维护代码。



## 服务测试




## 服务部署





