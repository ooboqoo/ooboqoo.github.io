# Centos 7

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

## SSH 设置

```bash
$ firewall-cmd --permanent --add-port=3300/tcp  # 先开放端口，不然下次登不进去了
$ firewall-cmd --permanent --list-port          # 查看永久开放的端口情况
$ vim /etc/ssh/sshd_config  # 修改配置文件
$ systemctl restart sshd    # 重启 SSH 服务
```

```bash
# Vultr 东京只能用默认 22端口，改了就连不了了，比较坑
Port 3300
Protocol 2

AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
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

### github 安装方式

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


