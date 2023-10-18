# OpenResty

https://openresty.org/cn/  

OpenResty 是一个基于 Nginx 与 Lua 的高性能 web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理 *超高并发*、扩展性极高的 *动态 web 应用*、web 服务和动态网关。

章亦春创建；2011 年之前由淘宝网赞助，2012 年至 2016 年主要由 Cloudflare 支持；2017 年起主要由 OpenResty 软件基金会和 OpenResty 公司的支持。

OpenResty 通过汇聚各种设计精良的 Nginx 模块（主要由 OpenResty 团队自主开发），从而将 Nginx 有效地变成一个强大的通用 web 应用平台。这样，web 开发人员和系统工程师可以使用 Lua 脚本语言调动 Nginx 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 web 应用系统。

*OpenResty 的目标是让你的 web 服务直接跑在 Nginx 服务内部*，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求，甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应。


## Playground

https://hub.docker.com/r/openresty/openresty

_~/dev/docker/openresty/run.sh_

```bash
#!/bin/bash

NAME=play-openresty
PORT=8088
DIR=~/dev/docker/openresty

docker stop $NAME
docker run -d --rm \
  --name $NAME \
  -p $PORT:8080 \
  -v $DIR/conf.d/:/etc/nginx/conf.d/ \
  -v $DIR/html/:/etc/nginx/html/ \
  openresty/openresty:buster-fat
```

_~/dev/docker/openresty/reload.sh_ 修改完配置，执行下 reload.sh 脚本即可查看配置效果

```bash
#!/bin/bash

docker exec -it play-openresty nginx -s reload
```

_~/dev/docker/openresty/conf.d/default.conf_

```
server {
    listen 8080;

    location /hello {
      default_type text/plain;
      echo hello;                # https://github.com/openresty/echo-nginx-module
    }
}
```

## Directives

https://openresty-reference.readthedocs.io/en/latest/Directives/

Order if Lua Nginx Module Directives

![](https://cloud.githubusercontent.com/assets/2137369/15272097/77d1c09e-1a37-11e6-97ef-d9767035fc3e.png)


## Lua Ngx API

https://openresty-reference.readthedocs.io/en/latest/Lua_Nginx_API/




## Lua

简明教程 https://www.runoob.com/lua/lua-tutorial.html  
权威教程 Programming in Lua https://www.lua.org/pil/  

Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放，其设计目的是为了 *嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能*。


### 基本语法

关键词

```txt
nil    true    false    local
not    and   or     in
if    then    elseif     else    end
for    while    do    repeat    until    break    goto
function    return
```

注释

```lua
-- 单行注释

--[[
多行注释
多行注释
--]]
```

标识符

* 标示符以一个字母或下划线开头，后加上 0 个或多个字母，下划线，数字
* 最好不要使用下划线加大写字母的标示符，因为Lua的保留字也是这样的
* 区分大小写

变量

Lua 中的变量全是全局变量，哪怕是语句块或是函数里，除非用 `local` 显式声明为局部变量。

全局变量不需要声明，访问一个没有初始化的全局变量也不会出错。给一个变量赋值即创建了这个全局变量，而赋值为 `nil` 即相当于删除了变量。

局部变量的作用域为从声明位置开始到所在语句块结束。

运算符

运算符优先级从高到低的顺序

```txt
^
not    - (unary)
*      /       %
+      -
..
<      >      <=     >=     ~=     ==
and
or
```

### 数据类型

Lua 是动态类型语言，变量不要类型定义，只需要为变量赋值。值可以存储在变量中，作为参数传递或结果返回。

Lua 中有 8 个基本类型分别为

|||
|----------|------------------------------------------------------------------------------------
| nil      | 只有值 `nil` 属于该类，表示一个无效值
| boolean  | 包含两个值 `true` `false`，Lua 中只有 `false` 和 `nil` 为 false，其他（如 `0`）都为 `true`
| number   | 表示双精度类型的实浮点数
| string   | 字符串由一对双引号`"x"`或单引号`'x'`来表示，`[[x]]` 表示字符块
| function | 由 C 或 Lua 编写的函数
| userdata | 表示任意存储在变量中的C数据结构
| thread   | 表示执行的独立线路，用于执行协同程序
| table    | 其实是一个 关联数组 associative arrays，数组的索引可以是数字、字符串或表类型


string

在数字字符串上进行算术操作时，Lua 会尝试将字符串转换成一个数字，而字符串连接符为 `..`，另外，可使用 `#` 来计算字符串长度

```lua
print("2" + "6")      -- 8
print("error" + '1')  -- ERROR
print(123 .. 456)        -- 123456
print(type(123 .. 456))  -- string
```

table

```lua
-- 创建一个空的 table
local tbl1 = {}

-- 直接初始表
local tbl2 = {"apple", "pear", "orange", "grape"}

-- 初始索引为 `1`
print(tbl2[1])  -- apple

-- 索引可以为字符串 (table 的本质是一个 关联数组 associative array)
tbl1.foo = "bar"  -- 当索引为字符串类型时的一种简化写法，本质上是一个函数调用 gettable_event(table, index)
tbl1["key"] = "value"
for k, v in pairs(tbl1) do
    print(k .. " : " .. v)
end
```

thread

在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，拥有自己独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西。

线程跟协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停。


### 流程控制

```lua
while(condition)
do
    statements
end
```

```lua
repeat
   statements
until(condition)
```

```lua
for var=exp1,exp2,exp3 do
    statements
end
```

```lua
if(condition)
then
    statements
elseif(condition)
then
    statements
else
    statements
end
```

```lua
optional_function_scope function function_name( argument1, argument2, argument3..., argumentn)
    function_body
    return result_params_comma_separated
end
```

### 字符串


### 协程

在 Lua 中实现异步逻辑可以使用协程（coroutine）和回调函数的方式。以下示例展示了如何使用 coroutine 和 LuaSocket 库发送异步的 HTTP 请求：

```bash
brew install luarocks
luarocks install luasocket
```

```lua
local http = require("socket.http")
local ltn12 = require("ltn12")

-- 异步发送 HTTP 请求
-- TODO: 异步相关代码未调通，以后再补
local function sendHTTPRequest(url, callback)
    local resp = {}

    http.request{
      url = url,
      method = "GET",
      sink=ltn12.sink.table(resp)
    }

    callback(resp)
end

sendHTTPRequest("http://www.baidu.com", function(resp)
    print("收到响应")
    print(resp[1])
end)
```


### I/O


### 错误处理


### 调试





## 常见配置

### 路径末尾没带 `/` 会自动 301

https://stackoverflow.com/questions/15555428/nginx-causes-301-redirect-if-theres-no-trailing-slash

问题：`http://localhost:8080/test` 会自动跳转到 `http://localhost/test/`（把端口信息丢了） 导致出错。

```nginx
server {
    listen 80;
    server_name  localhost;
    absolute_redirect off;           # 阻止跳转

    location / {
        index index.html index.htm;
        try_files $uri $uri/ =404;   # 增加匹配逻辑
    }
}
```








