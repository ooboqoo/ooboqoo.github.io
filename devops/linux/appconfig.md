# Linux 应用配置


## HTTP 服务器

```bash
# 安装软件包
$ yum install httpd php

# 配置开机启动，并先手动启动服务
$ systemctl enable httpd.service
$ systemctl is-enabled httpd    # 可以不带 service
$ systemctl start httpd

# 配置防火墙
$ firewall-cmd --permanent --add-service=http
```


## MySQL 数据库

```bash
$ apt install mysql-server

$ systemctl status mysql  # 查看是否启动
$ systemctl enable mysql  # 配置开机启动
$ systemctl start/stop/restart mysql  # 启动/停止/重启 MySQL


```


## SSH 设置

The SSH protocol (also called Secure Shell) is a method for secure remote login from one computer to another.

```bash
$ firewall-cmd --permanent --add-port=3300/tcp  # 先开放端口，不然下次登不进去了
$ firewall-cmd --permanent --list-port          # 查看永久开放的端口情况
$ vim /etc/ssh/sshd_config  # 修改配置文件(参见下文)
$ systemctl restart sshd    # 重启 SSH 服务
```

*/etc/ssh/sshd_config* 或 *~/.ssh/config*

```bash
# man ssg_config

Port 3300  # Vultr 东京只能用默认 22 端口，改了就连不了了
Protocol 2

AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no

# 防止连接中断: 每 60s 发送一个空包，连续4次没收到响应就认为断了
ServerAliveInterval 60
ServerAliveCountMax 4
```

### RDP Tunnel

RDP(Remote Desktop Protocol)客户端 --外网--> 中转服务器 --内网--> 被控端(无外网IP)

```bash
# RDP客户端
$ ssh -L 1234:192.168.1.10:3389 root@45.33.0.1 -N
  #           被控机内网IP           中转服务器外网IP
  # -L [bind_address:]port:host:hostport  指定转发规则
  # 含义: 所有到本地 1234 端口的流量都由 1.2.3.4 服务器转发到 192.168.1.10:3389
$ mstsc localhost:1234  # Remote Desktop Connection (Microsoft Terminal Services Client)
```

以下方案在 ALIYUN 跑通

```bash
# 受控端
$ ssh 45.33.0.1 -N -R 8989:localhost:3389  # 8989 可任意更换其他端口，中转服务器内部中转用

# RDP客户端
$ ssh 45.33.0.1 -N -L 3389:localhost:8989
$ mstsc localhost
```

RDP客户端 --外网--> 中转服务器 --外网--> 被控端(无外网IP) &nbsp; // reverse SSH tunnel

```bash
# 中转服务器
$ vim /etc/ssh/sshd_config
  # 添加或修改为 GatewayPorts yes
$ systemctl reload ssh.service

# 被控端
$ ssh -R 443:127.0.0.1:8080 root@45.33.0.1 -N
  # 含义: 所有到 45.33.0.1 服务器 443 端口的流量都转发到本机的 8080 端口
$ ssh root@45.33.0.1 -R 443:127.0.0.1:8080 -R 80:127.0.0.1:8080  # 同时转发多个端口
```

### 网页代理

用户电脑 --外网--> 中转服务器 --外网--> 代理服务器(无外网IP) --代理--> 目的网站

```bash
# 中转服务器
$ vim /etc/ssh/sshd_config
  # 添加或修改为 GatewayPorts yes

# 代理服务器执行
$ ssh root@45.33.0.1 -f -N -R 1086

# 用户电脑执行
$ ssh root@45.33.0.1 -N -L 1086:localhost:1086
$ curl --socks5 localhost:1086 http://ifconfig.io  # 验证 socks5 代理设置

# 用户端 Git 设置 https://gist.github.com/laispace/666dd7b27e9116faece6
$ git config --global http.https.github.com.proxy socks5h://localhost:1086  # http://
$ vim ~/.ssh/config                                                         # ssh://
  # Host github.com
  # ProxyCommand nc -X 5 -x localhost:1086 %h %p  # 刚开始 127.0.0.1 不来换成 localhost 好了
  # ProxyCommand connect -S 127.0.0.1:1086 %h %p  # 上面那行 Linux 用，这行在 Windows 下用
$ ALL_PROXY=socks5://localhost:1086 git clone https://github.com/some/one.git  # 单次使用
```

用户电脑(访问外网部分受限) ----> 中转服务器(即代理服务器，可访问受限网站) ----> 目的网站

```bash
# 用户电脑
$ ssh root@45.33.0.1 -f -N -D 1086  # 在本机 1086 端口开 socks5 代理
$ curl --socks5 localhost:1086 http://ifconfig.io  # 验证 socks5 代理设置
```


## ShadowSocks

https://github.com/shadowsocks/shadowsocks/wiki/  
https://shadowsocks.org/en/download/servers.html

```bash
# 安装
$ yum install python-setuptools
$ easy_install pip
$ pip install shadowsocks

# 配置开机自动启动，并先手动启动服务
$ vi /lib/systemd/system/ss.service  # 内容在后面
$ systemctl enable ss.service
$ systemctl start ss.service

# 配置防火墙
$ firewall-cmd --permanent --add-port=443/tcp

# 查看日志
$ less /var/log/shadowsocks.log
```

### GitHub 安装方式

通过以上方法安装的版本是 2.8.2，经过了一年，master 分支上已经有更新，如果想装最新版，可以试试 GitHub 安装方式：

```bash
$ git clone https://github.com/shadowsocks/shadowsocks.git
$ cd shadowsocks
$ python setup.py
```

### 自启动配置文件

Centos7 系统服务脚本目录：/usr/lib/systemd/ 有系统 system 和用户 user 之分，如需要开机没有登陆情况下就能运行的程序，存在系统服务里，即：/lib/systemd/system/ 反之，用户登录后才能运行的程序，存在用户里。服务以 .service 结尾。

```txt
# [Unit] 服务说明
# Description: 服务描述
# After: 服务类别
[Unit]
Description=shadowsocks server
After=network.target

# [Service] 服务运行参数设置
# Type=forking 运行形式为后台运行
# ExecStart 运行命令
# ExecReload 重启命令
# ExecStop 停止命令
# PrivateTmp=True表示给服务分配独立的临时空间
# 注意：[Service] 的启动、重启、停止命令全部要求使用绝对路径
[Service]
Type=forking
ExecStart=/usr/bin/ssserver -p 443 -k myPassword --fast-open -d start
ExecReload=/usr/bin/ssserver -d restart
ExecStop=/usr/bin/ssserver -d stop

# [Install] 服务安装的相关设置
# 设置为多用户，对应原来的 runlevel 3
[Install]
WantedBy=multi-user.target
```

### 多用户配置

创建一个配置文件 `/etc/shadowsocks.json`

```json
{
    "port_password": {
        "8501": "password1",
        "8502": "password2",
        "8503": "password3"
    },
    "method": "aes-256-cfb",
    "fast_open": false,
    "timeout": 300
}
```

然后再更新上面的自启动配置文件：

```txt
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json -d start
```

再配置防火墙：

```bash
$ firewall-cmd --permanent --add-port=8501-8503/tcp
$ firewall-cmd --reload
$ firewall-cmd --list-all
$ firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT_direct 1 -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 30 --hitcount 4 -j REJECT --reject-with tcp-reset
```
