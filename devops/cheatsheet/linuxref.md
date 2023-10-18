# Linux 命令速查表


## 命令

```bash
$ rm -rf <dir>   # 删除目录
```

```bash
$ date [+format]  # 查看日期
$ cal             # 日历
```

```
$ uptime  # 开机运行时间
$ w       # display who is logged in and what they are doing

```

查看端口占用

```
# list open files, 需要 root 权限
$ lsof -i:<port> # 查看占用端口的进程
$ lsof abc.txt   # 查看占用文件的进程
$ lsof -c -p <PID> # 查看某个进程占用的文件

# 显示 TCP UDP 的端口和进程等相关信息
$ netstat -tunlp | grep <PORT>  # 查看端口占用情况
  # -t 显示 TCP 相关项目
  # -u 显示 UDP 相关项目
  # -n 拒绝显示别名，能显示数字的全部转化为数字
  # -l 仅列出在监听 Listen 的服务状态
  # -p 显示建立相关链接的程序名
```

查询 DNS 解析（hostname 对应的 IP）

```bash
$ ping baidu.com
$ host goolge.com

$ dig localhost
$ nslookup google.com

# /etc/hosts 中的本地配置对 ping 有效，但其他几个工具可能会跳过本地配置，直接查询 DNS
```

```bash
$ dig ngapps.cn     # 查询 A 记录
$ dig ngapps.cn ns  # 查询 域名服务器
$ dig -h  # 查看完整参数
```

网络知识：套接字 Socket、端口、协议

一个套接字接口构成一个连接的一端，而一个连接可完全由一对套接字接口规定。

大部分涉及到网络的服务都必须打开一个套接字来监听传入的网络请求，而每个服务都使用一个独立的套接字。套接字是和 IP 地址、软件端口和协议结合起来使用的，而端口号对传输控制协议（TCP）和用户数据报协议（UDP）协议都适用，TCP 和 UDP 都可以使用 0 到 65535 之间的端口号进行通信。

以下是端口分配类别：

0 - 1023： 常用端口和系统端口
1024 - 49151： 软件的注册端口
49152 - 65535： 动态端口或私有端口




## 单行脚本

> 把 **命令** 看成是 **函数**，就特别好理解。

```bash
$ command && echo "TRUE" || echo "FALSE"
```


## 语法



## 综合应用

统计项目中 CSS 样式用了多少 `font-size` 属性

```bash
$ grep -r font-size . | wc -l
```

批量删除除了某一个文件以外的所有文件

```bash
$ ls | grep -v myfile.js | xargs rm
```

批量改文件名后缀

```bash
# 示例：批量改 .txt 为 .md
for f in *.txt; do mv -- "$f" "${f%.txt}.md"; done
```

查找删除 node_modules 文件夹

```bash
#       文件名                目录    不进入目录           这个尾巴跟 -exec 是一起的
find . -name "node_modules" -type d -prune -exec rm -rf {} +
```



