# Gin / Hertz

https://github.com/gin-gonic/gin  
https://github.com/cloudwego/hertz


## Quick start

```bash
$ mkdir play-gin && cd play-gin
$ go mod init demo/play-gin
$ touch main.go
# coding ... and then
$ go run main.go
```

_main.go_

```go
package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run("127.0.0.1:3000") // 调试时最好指定 127.0.0.1
}                         // 否则监听 0.0.0.0，每次启动调试，防火墙都会询问是否「接受传入网络连接」
```


### 示例 2

https://go.dev/learn/  Tutorials > Developing a web service

```go
package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

// album represents data about a record album.
type album struct {
  ID     string  `json:"id"`
  Title  string  `json:"title"`
  Artist string  `json:"artist"`
  Price  float64 `json:"price"`
}

// albums slice to seed record album data.
var albums = []album{
  {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
  {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
  {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func main() {
  router := gin.Default()
  router.GET("/albums", getAlbums)
  router.GET("/albums/:id", getAlbumByID)
  router.POST("/albums", postAlbums)

  router.Run("localhost:8080")
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
  c.IndentedJSON(http.StatusOK, albums)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
  var newAlbum album

  // Call BindJSON to bind the received JSON to
  // newAlbum.
  if err := c.BindJSON(&newAlbum); err != nil {
    return
  }

  // Add the new album to the slice.
  albums = append(albums, newAlbum)
  c.IndentedJSON(http.StatusCreated, newAlbum)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
  id := c.Param("id")

  // Loop through the list of albums, looking for
  // an album whose ID value matches the parameter.
  for _, a := range albums {
    if a.ID == id {
      c.IndentedJSON(http.StatusOK, a)
      return
    }
  }
  c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
```

一个典型的MVC框架大致的项目结构

```txt
├── conf                    #项目配置文件目录
│   └── config.toml         #大家可以选择自己熟悉的配置文件管理工具包例如：toml、xml等等
├── controllers             #控制器目录，按模块存放控制器（或者叫控制器函数），必要的时候可以继续划分子目录。
│   ├── food.go
│   └── user.go
├── main.go                 #项目入口，这里负责Gin框架的初始化，注册路由信息，关联控制器函数等。
├── models                  #模型目录，负责项目的数据存储部分，例如各个模块的Mysql表的读写模型。
│   ├── food.go
│   └── user.go
├── static                  #静态资源目录，包括Js，css，jpg等等，可以通过Gin框架配置，直接让用户访问。
│   ├── css
│   ├── images
│   └── js
├── logs                    #日志文件目录，主要保存项目运行过程中产生的日志。
└── views                   #视图模板目录，存放各个模块的视图模板，当然有些项目只有api，是不需要视图部分，可以忽略这个目录
    └── index.html
```

### 性能分析

注意：我们只应该在性能测试的时候才在代码中引入pprof

```go
import (
  "net/http"

  "github.com/gin-contrib/pprof"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  pprof.Register(r)
  r.GET("/test", func(c *gin.Context) {
    c.String(http.StatusOK, "test")
  })
  r.Run(":3000")
}
```

```bash
go tool pprof --seconds=20 http://localhost:3000/debug/pprof/goroutine 
  # 更改路径看其他项，如 /debug/pprof/profile
  # 等待 20s 后输入 web 即可看到图形化的函数调用堆栈信息
```


## Hertz

快速开始 + 原理解析 [字节跳动开源 Go HTTP 框架 Hertz 设计实践](/articles/7111645362074419231)

```go
package main

import (
  "context"

  "github.com/cloudwego/hertz/pkg/app"
  "github.com/cloudwego/hertz/pkg/app/server"
  "github.com/cloudwego/hertz/pkg/common/utils"
  "github.com/cloudwego/hertz/pkg/protocol/consts"
)

func main() {
  h := server.Default()

  h.GET("/ping", func(ctx context.Context, c *app.RequestContext) {
    c.JSON(consts.StatusOK, utils.H{"ping": "pong"})
  })

  h.Spin("127.0.0.1:3000")
}
```
