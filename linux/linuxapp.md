# Linux 应用命令



### rsync 远程文件同步

rsync - a fast, versatile, remote (and local) file-copying tool

```bash
Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]
Push: rsync [OPTION...] SRC... [USER@]HOST:DEST

rsync -iurp --chmod=Dgo+x,Fgo+r /media/sf_52web/ /var/www/html/
# -i 显示信息 -u 只更新 -r 递归执行 -p 保存权限信息
# --chmod=CHMOD 更改权限（-p 不能省）
# --delete 删除 SRC 中没有的文件
```

### crond 计划任务服务

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

### ssh 安全远程登录

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

#### scp 安全远程拷贝

scp — secure copy (remote file copy program), scp = ssh + rcp

```
scp [-pr] [ssh options] [[user@]host1:]file1 ... [[user@]host2:]file2
# -p 保留文档存取时间及权限信息，用 -P 指定连接端口，这与 ssh 稍有区别
# -r 递归拷贝

scp file1 file2 centos:/var/www/html  # 同时拷贝多个文件到服务器
```

