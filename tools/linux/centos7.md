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

## 防火墙管理

FirewallD 提供了动态防火墙管理工具，不需要重启整个防火墙便可应用更改。拥有运行时配置和永久配置选项。它也支持允许服务或者应用程序直接添加防火墙规则的接口。

```bash
$ firewall-cmd --add-service=http // 允许http服务通告防火墙
$ firewall-cmd --add-service=ftp  // 暂时开启ftp
$ firewall-cmd --add-port=3128/tcp // 自行加入要開放的Port
$ firewall-cmd --permanent --add-service=http // 在永久配置中添加http服务
$ firewall-cmd --permanent --add-service=ftp // 永久开放ftp
$ firewall-cmd --remove-service=ftp --permanent // 永久关闭ftp
$ firewall-cmd --reload // 重新加载防火墙规则
$ systemctl restart firewalld // 重启整个防火墙服务
$ iptables -L -n | grep 21 //檢視設定是否生效，开启firewalld 的情况下才能查到
$ firewall-cmd --state // 檢查防火牆狀態
$ firewall-cmd --get-service // 在 FirewallD 的服務名稱
$ firewall-cmd --query-service ssh //查詢服務的啟用狀態
$ firewall-cmd --list-all // 查询开启的服务，简单明了
```

## SELinux 管理

## CentOS 7 / RHEL 7 上安装 LAMP + phpMyAdmin

http://cnzhx.net/blog/centos-rhel-install-lamp-phpmyadmin/

## install phpmyadmin on centos 7

By default, centos 7 repository does not contains phpmyadmin package. we need to enable EPEL repository. Find the latest EPEL for centos 7 from [EPEL for Centos 7](http://download.fedoraproject.org/pub/epel/7/x86_64/repoview/epel-release.html).

Step 1 Download and install epel-release-7-x.noarch.rpm file . or install directly by copying the rpm link.

```bash
$ rpm -ivh http://mirrors.opencas.cn/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
```

Step 2 Update repositories by issuing below command.

```bash
$ yum check-update
```

Step 3 Now install phpmyadmin package along with dependencies.

```bash
$ yum -y install phpmyadmin
```

Step 4 After installation, Open /etc/httpd/conf.d/phpMyAdmin.conf file ( Apache config file for phpmyadmin ) and edit as follows.

```bash
# Apache 2.4 // 需要改两处
  <RequireAny>
    # Require ip 127.0.0.1
    # Require ip ::1
    Require all granted
  </RequireAny>
```

Step 5 Restart Apache service.

```bash
$ systemctl restart httpd.service
```

Step 6 Now open http://serverIP/phpmyadmin in your browser. You can login using root as username and mysql root password. 允许 phpMyAdmin 无密码登录:

```php
// 修改 /etc/phpMyAdmin/config.inc.php
$cfg['Servers'][$i]['AllowNoPassword'] = TRUE;
```
