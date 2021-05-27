# Linux 应用配置


## HTTP 服务器

```bash
# 安装软件包
$ yum install httpd php

# 配置开机启动，并先手动启动服务
$ systemctl enable httpd.service
$ systemctl is-enabled httpd    # 可以不带 service
$ systemctl start httpd

# CentOS 配置防火墙 (FirewallD)
$ firewall-cmd --permanent --add-service=http

# Ubuntu 配置防火墙 (UFW https://wiki.ubuntu.com/UncomplicatedFirewall)
$ ufw allow ssh
$ ufw allow 10086
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

服务器配置 */etc/ssh/sshd_config* (配置项说明 `man sshd_config`)

```bash
# man sshd_config

Port 3300  # Vultr 东京只能用默认 22 端口，改了就连不了了

ClientAliveInterval 60
ClientAliveCountMax 4

PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
```

客户端配置 *~/.ssh/config* (配置项说明 `man ssh_config`)

```bash
# 防止连接中断: 每 60s 发送一个空包，连续4次没收到响应就认为断了
ServerAliveInterval 60
ServerAliveCountMax 4
```

### RDP Tunnel

```bash
$ ssh
  # -L local port forwarding
  # -R remote port forwarding
  # -D dynamic port forwarding
  # -N don't start a shell/command
  # -f fork 后台运行
```

RDP(Remote Desktop Protocol)客户端 --外网--> 中转服务器 --内网--> 被控端(无外网IP)

```bash
# RDP客户端
$ ssh -L 1234:192.168.1.10:3389 root@45.33.0.1 -N
  #           被控机内网IP           中转服务器外网IP
  # 含义: 所有到本地 1234 端口的流量都由 45.33.0.1 服务器转发到 192.168.1.10:3389 (这时一个根服务器同一个内网的机子)
$ mstsc localhost:1234  # Remote Desktop Connection (Microsoft Terminal Services Client)
```

RDP客户端 --外网--> 中转服务器 --外网--> 被控端(无外网IP) &nbsp; // reverse SSH tunnel

```bash
# 受控端
$ ssh 45.33.0.1 -N -R 8989:localhost:3389  # 8989 可任意更换其他端口，中转服务器内部中转用
  # 含义: 所有到 45.33.0.1 服务器 8989 端口的流量都转发到本机的 3389 端口

# RDP客户端
$ ssh 45.33.0.1 -N -L 3389:localhost:8989
$ mstsc localhost
```

### 网页代理

用户电脑 --外网--> 中转服务器 --外网--> 代理服务器(无外网IP) --代理--> 目的网站

```bash
# 代理服务器执行
$ ssh root@45.33.0.1 -f -N -R 2086

# 用户电脑执行
$ ssh root@45.33.0.1 -N -L 2086:localhost:2086
$ curl --socks5 localhost:2086 http://ifconfig.io  # 验证 socks5 代理设置

# 用户端 Git 设置 https://gist.github.com/laispace/666dd7b27e9116faece6
$ git config --global http.https.github.com.proxy socks5h://localhost:2086  # http://
$ vim ~/.ssh/config                                                         # ssh://
  # Host github.com
  # ProxyCommand nc -X 5 -x localhost:2086 %h %p  # 刚开始 127.0.0.1 不来换成 localhost 好了
  # ProxyCommand connect -S 127.0.0.1:2086 %h %p  # 上面那行 Linux 用，这行在 Windows 下用
$ ALL_PROXY=socks5://localhost:2086 git clone https://github.com/some/one.git  # 单次使用
```

用户电脑(访问外网部分受限) ----> 中转服务器(即代理服务器，可访问受限网站) ----> 目的网站

```bash
# 用户电脑
$ ssh root@45.33.0.1 -f -N -D 2086  # 在本机21086 端口开 socks5 代理
$ curl --socks5 localhost:2086 http://ifconfig.io  # 验证 socks5 代理设置
```

任意外网用户 --公网--> 中转服务器 ----> 自己在内网搭建的网站

```bash
# 中转服务器
$ vim /etc/ssh/sshd_config
  # 添加或修改为 GatewayPorts yes  # 出于安全考虑，默认不开放此选项，只有中转服务器内部的请求才会被中转
$ systemctl reload ssh.service

# 内网的网站服务器
$ ssh root@45.33.0.1 -R 443:localhost:8080 -R 80:localhost:8080  # 同时转发多个端口
```


## ShadowSocks

https://github.com/shadowsocks/shadowsocks/wiki/  
https://shadowsocks.org/en/download/servers.html

```bash
# 安装
# Debian / Ubuntu
$ apt install python-pip
$ pip install git+https://github.com/shadowsocks/shadowsocks.git@master

# CentOS
$ yum install python-setuptools && easy_install pip
$ pip install git+https://github.com/shadowsocks/shadowsocks.git@master

# 配置开机自动启动，并先手动启动服务
$ vi /lib/systemd/system/ss.service  # 内容在后面
$ systemctl enable ss.service
$ systemctl start ss.service

# 配置防火墙
$ firewall-cmd --permanent --add-port=443/tcp

# 查看日志
$ less /var/log/shadowsocks.log
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
ExecStart=/usr/local/bin/ssserver -p 443 -k myPassword --fast-open -d start
ExecReload=/usr/local/bin/ssserver -d restart
ExecStop=/usr/local/bin/ssserver -d stop

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
    "fast_open": true,
    "timeout": 300
}
```

然后再更新上面的自启动配置文件：

```txt
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks.json -d start
```

再配置防火墙：

```bash
$ firewall-cmd --permanent --add-port=8501-8503/tcp
$ firewall-cmd --reload
$ firewall-cmd --list-all
$ firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT_direct 1 -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 30 --hitcount 4 -j REJECT --reject-with tcp-reset
```


## V2Ray

https://www.v2ray.com/

> 两会期间碰到上不去或特别慢，请自觉关机一段时间，不然 IP 过几天就爆。

### 主机选择

检查 IP 是否被封(选能用的) https://ipcheck.need.sh/  
查看路由详情(选速度快的) https://tools.ipip.net/traceroute.php  

搬瓦工查看 IP 是否被封 https://kiwivm.64clouds.com/main-exec.php?mode=blacklistcheck  
如果被封就申请更换 https://bwh88.net/ipchange.php  

### 服务器

```bash
# https://github.com/v2fly/fhs-install-v2ray
$ bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
$ vim /usr/local/etc/v2ray/config.json
$ systemctl start v2ray
$ systemctl status v2ray
```

#### 基本设置

```json
{
  "log": {
    "loglevel": "warning",
    "access": "none",  // 这项最好不要配，占用磁盘空间+有暴露访问记录风险
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [{
    "port": 10086,  
    "protocol": "vmess",
    "streamSettings": {
      "network": "kcp"  // 可能更快，也可能彻底被封或不稳定
    },
    "settings": {
      "clients": [
        {
          "id": "bcfb353f-57ad-4478-8c86-101fa56a1e1c",
          "alterId": 4  // 使用的 alterID 数量
        }
      ]
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
}
```

防火墙开通端口

```bash
$ ufw allow 10086:10088/tcp
```

#### 开启 BBR 加速

```bash
# 检查内核是否已开启 BBR
$ sysctl net.ipv4.tcp_available_congestion_control
net.ipv4.tcp_available_congestion_control = bbr cubic reno
# 查看当前配置
$ sysctl net.ipv4.tcp_congestion_control
# 如果不是 bbr 就设置 TCP BBR
$ echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
$ echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
$ sysctl -p
```

#### 配置动态端口

```json
{
  "inbounds": [{
    // ...
    // 动态改变通信的端口，对抗对长时间大流量端口的限速封锁，也可能更快被封
    "detour": {
        "to": "vmess-detour-10000"
    }
  }],
  "inboundDetour": [
    {
      "protocol": "vmess",
      "port": "10000-10020",
      "tag": "vmess-detour-10000",
      "settings": {},
      "allocate": {
        "strategy": "random",
        "concurrency": 3,
        "refresh": 5
      },
      "streamSettings": {
        "network": "kcp"
      }
    }
  ]
}
```

### 客户端

Windows https://github.com/2dust/v2rayN/releases  
Android https://github.com/2dust/v2rayNG/releases  
macOS https://github.com/yanue/V2rayU/releases  
iOS 需要到美区购买下载 shadowrocket、kitsunebi 之类应用

### WebSocket + TLS

https://toutyrater.github.io/advanced/wss_and_web.html

当下科学上网的方式无非两种，一种是 *加密流量*，一种是 *伪装流量*。SS 和 V2Ray 的 VMess 都用的加密模式。加密模式将网络流量加密封装成没有任何特征的数据包。从墙的角度看，你的流量就是未知的流量，虽然墙不知道你里面的内容是什么，但没有特征是最大的特征，它可以通过判断数据量的大小，根据时政需要进行阻断干扰。而另一种就是伪装流量，就是全部伪装成正常的 HTTPS 流量，互联网上普通的 HTTPS 流量是海量的，想要从正常的海量数据中区分出伪装流量是有很大难度的，墙不会贸然地去阻断你。

_/etc/v2ray/config.json_

```json
{
  "inbounds": [{
    "port": 10099,
    "protocol": "vmess",
    // 就改下这里就好
    "streamSettings": {
      "network": "ws",
      "wsSettings": {
        "path": "/socket"
      }
    },
    "settings": {
      "clients": [
        {
          "id": "xxxxxxxxxxxxx",
          "alterId": 4
        }
      ]
    }
  }]
}
```

_/etc/nginx/conf/conf.d/v2ray.conf_

```
  server {
    listen 443 ssl http2;
    listen [::]:443 http2;
    server_name s1.ngapps.cn;
    # 证书配置参考 Nginx 笔记
    ssl_certificate      /etc/letsencrypt/live/s1.ngapps.cn/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/s1.ngapps.cn/privkey.pem;

    # 将流量代理到 v2ray
    location /socket {
      if ($http_upgrade != "websocket") {
        return 404;
      }
      proxy_redirect off;
      proxy_pass http://127.0.0.1:10099;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header Host $http_host;
      # Show real IP in v2ray access.log
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
```


## Trojan

### 辅助工具

IP 被墙检测及解决办法(SSR中文网) https://ssr.tools/772  
候选供应商(要是封杀厉害就买现成的) https://justmysocks.net/  

伪装设置完整度检测 https://whoer.net/

路由查看 `traceroute`，话说不怎么会用。




