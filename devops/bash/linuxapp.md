# Linux 应用专题

## 应用命令

### `curl` 调试利器

client-side URL transfers

内置的请求发送工具，一般用于模拟请求，测试 API。chrome 开发工具可以直接复制为 curl，很多 API 接口文档直接提供 curl 命令。默认输出 stdout，便于 pipe 到其他命令(常见的一句话安装 `curl xxx | bash`)。

```bash
$ curl "http://www.baidu.com"
  # -i --include    输出包含头部信息
  # -I --head       只显示头部信息
  # -v --verbose    显示详细解析过程，查看网址对应的 IP 很方便

# POST 请求
$ curl -d "param1=value1&param2=value2" "http://www.baidu.com"
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"admin"}' http://localhost:3300/token
  # -d --data     HTTP POST data
  # -G --get      添加 -d 选项后请求默认为 POST，利用这个选项可转回 GET 请求
  # -H --header   定制请求头
  # -X --request  指定请求方法 GET POST 等

# 下载脚本并执行
$ bash <(curl -s http://domain/path/to/script.sh)
$ curl http://domain/path/to/script.sh | bash -s arg1 arg2  # bash supports "-s" to read from stdin
$ curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -  # NodeJS 安装实例

# 作为下载工具使用
$ curl example.com -o com.html example.net -o net.html
$ curl http://{site,host}.host[1-5].com -o "#1_#2"
```

`man bash` 摘取的一些重要注释：
* If the `-s` option is present, or if no arguments remain after option processing, then commands are read from the standard input. 
* A `--` signals the end of options and disables further option processing. Any arguments after the `--` are treated as filenames and arguments. An argument of `-` is equivalent to `--`.

#### HTTPie

https://github.com/jakubroztocil/httpie

HTTPie: a CLI, cURL-like tool for humans. 极好的 curl 替代工具，就是需要单独安装。

### `wget` 下载利器

内置的文件下载工具，支持简单的递归扒站，但不支持 并发、p2p、磁力链接等。

### `rsync` 远程文件同步

rsync - a fast, versatile, remote (and local) file-copying tool  (可以看成是 `cp` 的变异版本)

```bash
Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]
Push: rsync [OPTION...] SRC... [USER@]HOST:DEST

$ rsync -iurp --chmod=Dgo+x,Fgo+r /media/sf_52web/ /var/www/html/
  # -i 显示信息 -u 只更新 -r 递归执行 -p 保存权限信息
  # -a 启用存档模式 -z 传输时启用压缩
  # --chmod=CHMOD 更改权限（-p 不能省）
  # --delete 删除 SRC 中没有的文件
$ rsync -avzP --delete -e 'ssh -i /home/git/.ssh/id_rsa' /opt/project/dist/ dev@host:/opt/www/ 2>&1
```

### `crond` 计划任务服务

```bash
$ systemctl enable crond.service  # 设置 cron 服务开机启动
$ systemctl start crond.service   # 立即启动 cron 服务
$ crontab -e  # 编辑定时任务列表
```

`crontab -e` 命令编辑的是 /var/spool/cron 下对应用户的 cron 文件，也可以直接修改 /etc/crontab 文件。

```txt
分钟  小时  天  月  星期  命令
0-59 0-23 1-31 1-12 0-6 command
*/10 * * * * date               # 每10分钟显示一次时间
```

特殊符号: `*` 代表所有值, `/` 代表“每”, `-` 代表连续的几个值, `,` 用于组合离散的值

### `ssh` 安全远程登录

ssh — OpenSSH SSH client (remote login program)

```bash
$ ssh -p 28379 root@104.128.85.201
```

#### 配置

_~/.ssh/config_

```ini
Host *
    Protocol 2
    TCPKeepAlive yes
    ServerAliveInterval 60
    ServerAliveCountMax 4
    Compression yes

  # Enable persistent connection multiplexing
    ControlMaster auto
    ControlPath ~/.ssh/tmp/%r@%h:%p  # not work in Windows!
    ControlPersist 1h

  # ssh will load this key by default, remove the '#' when using other key name
    # IdentityFile ~/.ssh/id_rsa

# Connect the host using "ssh centos"
Host centos
    HostName 104.128.85.201
    Port 28379
    User root
```

#### `scp` 安全远程拷贝

scp — secure copy (remote file copy program), scp = ssh + rcp, copies files between hosts on a network.

```bash
$ scp [-pr] [ssh options] [[user@]host1:]file1 ... [[user@]host2:]file2
  # -p 保留文档存取时间及权限信息，用 -P 指定连接端口，这与 ssh 稍有区别
  # -r 递归拷贝

$ scp file1 file2 centos:/var/www/html  # 同时拷贝多个文件到服务器
```

## 应用专题

### 文件监控

tail - output the last part of files

```bash
$ tail -f filename  # 监控文件变化，文件有更新就会打印出来
```

watch - execute a program periodically, showing output fullscreen

```bash
$ watch src cp -uvf src des  # 每隔2秒执行一次复制，这是个简易的实时文件同步命令
```

### 查看日志

通过查看屏幕上面的错误信息与日志文件的错误信息，几乎可以解决大部分的 Linux 问题！如：

1. 解决系统方面的错误
2. 解决网络服务的问题
3. 过往事件记录簿。

日志文件大本营位于 `/var/log/`。

日志查看常用命令：`nl` 显示带行号；`head` 只看头几行；`tail` 只看结尾几行

### 压缩打包

使用 `gzip` 和 `zip` 压缩，优先用 `gzip`，但 `gzip` 打包的文件其他操作系统不一定兼容，跨操作系统分享文件就用 `zip`。

`gzip` 是设计成针对单文件操作的，一般都是搭配 `tar` 命令使用。

```bash
$ gzip filename.ext       # 压缩后生成 filename.ext.gz，原文件会被删除
$ gzip file1 file2 subdir/   # 压缩多个文件并生成相应数量的 .gz 文件，目录会被忽略
$ gunzip filename.ext.gz  # 解压文件，原文件会被删除

$ zip -r filename file1, file2, subdir  # 压缩文件 file1 file2 及 subdir 目录下内容到 filename.zip
$ unzip -d output/ filename.zip         # 解压内容到 output 目录
```

使用 `tar` 新建存档文件

```bash
$ tar -cvf filename.tar files directories  # 打包文档
$ tar -tvf foo.tar  # 列出存档内容
$ tar -xvf foo.tar  # 取出存档内容
$ tar -czvf foo.tgz foo.tar  # 调用 gzip 压缩存档文件 foo.tar，生成 foo.tgz
$ tar -xzvf foo.tgz  # 解压并取出存档内容
```

常用参数

```bash
$ tar 
  # -r 追加文件到档案文件末尾
  # -t 列出档案文件内容
  # -u 更新文件，如果找不到，就追加到档案末尾
  # -v verbose 打印详细信息
  # -f 使用档案文件或设备，这个选项通常是必选的

$ zip -q -r -e -m -o '\user\someone\someDir\someFile.zip' '\users\someDir'
  # -q 不显示压缩进度状态
  # -r 将所有的子目录内容都打包。注：不指定只打包子目录本身，而不含子目录下内容
  # -e 压缩文件需要加密，终端稍后会提示输入密码
  # -m 压缩完删除原文件

$ unzip -v test.zip  # 查看压缩文件目录，但不解压
  # -v 查看压缩文件目录不解压
  # -z 只显示注解不解压
  # -t 测试文件有无损坏但不解压

$ unzip -nj -x -d /tmp test.zip
  # -d 指定解压目录
  # -n 不覆盖已存在的文件
  # -o 强制覆盖已存在的文件
  # -x 解压时排除特定文件
  # -j 不重建文档的目录结构，解压到同一目录下
```
