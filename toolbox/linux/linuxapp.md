# Linux 应用专题

## 应用命令

### `curl` 调试利器

内置的请求发送工具，一般用于模拟请求，测试 API。chrome 开发工具可以直接复制为 curl，很多 API 接口文档直接提供 curl 命令。默认输出 stdout，便于 pipe 到其他命令(常见的一句话安装 `curl xxx | bash`)。

```bash
$ curl "http://www.baidu.com"      # 下载文件到本地
$ curl -i "http://www.baidu.com"   # 显示全部信息
$ curl -l "http://www.baidu.com"   # 只显示头部信息
$ curl -v "http://www.baidu.com"   # 显示get请求全过程解析，查看网址对应的 IP 很方便

# POST 请求
$ curl -d "param1=value1&param2=value2" "http://www.baidu.com"
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"admin"}' http://localhost:3300/token

# 下载脚本并执行
$ bash <(curl -s http://domain/path/to/script.sh)
$ curl http://domain/path/to/script.sh | bash -s arg1 arg2  # bash supports "-s" to read from stdin
$ curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -  # NodeJS 安装实例
```

`man bash` 摘取的一些重要注释：
* If the `-s` option is present, or if no arguments remain after option processing, then commands are read from the standard input. 
* A `--` signals the end of options and disables further option processing. Any arguments after the `--` are treated as filenames and arguments. An argument of `-` is equivalent to `--`.

### `wget` 下载利器

内置的文件下载工具，支持简单的递归扒站，但不支持 并发、p2p、磁力链接等。

### `rsync` 远程文件同步

rsync - a fast, versatile, remote (and local) file-copying tool

```bash
Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]
Push: rsync [OPTION...] SRC... [USER@]HOST:DEST

rsync -iurp --chmod=Dgo+x,Fgo+r /media/sf_52web/ /var/www/html/
# -i 显示信息 -u 只更新 -r 递归执行 -p 保存权限信息
# --chmod=CHMOD 更改权限（-p 不能省）
# --delete 删除 SRC 中没有的文件
```

### `crond` 计划任务服务

```bash
systemctl enable crond.service  # 设置 cron 服务开机启动
systemctl start crond.service   # 立即启动 cron 服务
crontab -e  # 编辑定时任务列表
```

`crontab -e` 命令编辑的是 /var/spool/cron 下对应用户的 cron 文件，也可以直接修改 /etc/crontab 文件。

```bash
分钟  小时  天  月  星期  命令
0-59 0-23 1-31 1-12 0-6 command
*/10 * * * * date               # 每10分钟显示一次时间
```

特殊符号: `*` 代表所有值, `/` 代表“每”, `-` 代表连续的几个值, `,` 用于组合离散的值

### `ssh` 安全远程登录

ssh — OpenSSH SSH client (remote login program)

```bash
ssh -p 28379 root@104.128.85.201
```

#### 配置

```ini
# ~/.ssh/config
# accelerate login process
GSSAPIAuthentication no

# persist connection for scp, is seems not work
ControlPersist 4h

# multi-link share, just a try, it seems not work
ControlMaster auto

# after these configuration, can connect the host by "ssh centos"
Host centos
HostName 104.128.85.201
Port 28379
# IdentityFile ~/.ssh/id_rsa  # ssh will load this key by default
User root
```

#### `scp` 安全远程拷贝

scp — secure copy (remote file copy program), scp = ssh + rcp

```
scp [-pr] [ssh options] [[user@]host1:]file1 ... [[user@]host2:]file2
# -p 保留文档存取时间及权限信息，用 -P 指定连接端口，这与 ssh 稍有区别
# -r 递归拷贝

scp file1 file2 centos:/var/www/html  # 同时拷贝多个文件到服务器
```

## 应用专题

### 文件监控

tail - output the last part of files

```bash
tail -f filename  # 监控文件变化，文件有更新就会打印出来
```

watch - execute a program periodically, showing output fullscreen

```bash
watch src cp -uvf src des  # 每隔2秒执行一次复制，这是个简易的实时文件同步命令
```

### 查看日志

通过查看屏幕上面的错误信息与日志文件的错误信息，几乎可以解决大部分的 Linux 问题！如：

1. 解决系统方面的错误
2. 解决网络服务的问题
3. 过往事件记录簿。

日志文件大本营位于 `/var/log/`。

日志查看常用命令：`nl` 显示带行号；`head` 只看头几行；`tail` 只看结尾几行






