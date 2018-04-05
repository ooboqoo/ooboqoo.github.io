# Linux 系统配置

## 基本配置

### 配置文件位置

* /etc/profile.d - 此处配置全局环境变量，添加个 .sh 文件，里面的设置会被 /etc/profile 读取，影响所有用户
* ~/.bash_profile - 保存用户个人配置，只在登录时执行一次配置，此文件会调用 .bashrc，用户个人环境变量可放在此处
* ~/.bashrc - 保存用户个人配置，每开一个命令窗口都会执行一遍，跟终端有关的颜色设置、命令别名等应放此处

#### 时区设置

```bash
$ date                                                     # 查看当前时间
$ ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  # 修改设置
$ shutdown -r 0                                            # 重启使所有应用都使用最新时间设置
```

#### 颜色设置

```bash
# ~/.bashrc
export TERM="xterm-256color"

# ~/.vimrc
set t_Co=256
```

#### 语言设置

```bash
$ locale                   # 查看地域偏好设置
$ export LANG=en_US.UTF-8  # 临时设置环境变量，重新登录失效

# ~/.bash_profile        # 修改配置文件，影响以后每次登录
LANG='en_US.UTF-8'
```

#### 其他偏好配置

```bash
# ~/.bash_profile    # System wide environment and startup programs, for login setup
html='/var/www/html'
cd $html

# ~/.bashrc          # System wide functions and aliases
alias cp='cp -i'
alias ll='ls -lA'

export PS1="\[\e[0;32m\u@\h \W> \e[m\]"  # 自定义提示符 `man bash` 可查看详细说明
  # 最外层的 \[ \] - 如果要用控制字符，务必用\[和\]包裹，否则算行宽度时会出错，导致不换行
  # \u – Username \h – Hostname \w – Full path of the cwd
  # \e[  – Indicates the beginning of color prompt
  # x;ym – Indicates color code. Use the color code values mentioned below.
  # \e[m – indicates the end of color prompt
```

> 这里有详细的终端颜色配置说明 http://misc.flogisoft.com/bash/tip_colors_and_formatting


## 系统服务

实现某种 service 的程序称之为 daemon(守护进程)，启动 daemon 的进程通常会在服务名称之后加个 `d`。

主要分为 stand alone 及 super daemon 两种：

* stand alone daemon 启动脚本在 /etc/init.d/, 配置文件在 /etc/sysconfig/  
* super daemon 的配置文件是 /etc/xinetd.conf, 子 daemon 的配置文件在 /etc/xinetd.d/

`systemctl` 是主要的工具，它融合之前 `service` 和 `chkconfig` 的功能于一体。可以使用它永久性或只在当前会话中启用/禁用服务。`systemctl` 可以列出正在运行的服务状态，`systemd-cgls` 以树形列出正在运行的进程。

| 任务           | 旧指令                       | 新指令
|----------------|------------------------------|-------------------------------------
| 设置开机启动   | chkconfig –level 3 httpd on  | systemctl enable httpd.service
| 取消开机启动   | chkconfig –level 3 httpd off | systemctl disable httpd.service
| 检查服务状态   | service httpd status         | systemctl status httpd.service
| 显示已启动服务 | chkconfig –list              | systemctl list-units –type=service
| 启动服务       | service httpd start          | systemctl start httpd.service
| 停止服务       | service httpd stop           | systemctl stop httpd.service
| 重启服务       | service httpd restart        | systemctl restart httpd.service


```bash
$ systemctl start/stop/restart/status httpd  # 服务操控命令
$ systemctl enable/disable httpd.service     # 开机服务设置

$ systemctl is-enabled httpd                       # 查看某个服务是否开机启动
$ ls /etc/systemd/system/multi-user.target.wants/  # 查看所有开机自启动的服务列表
$ systemctl list-unit-files | grep enabled         # 查看当前启动的服务列表
```

注：开机启动服务就是在当前 runlevel 的配置文件目录建立对应服务配置文件的软链接；禁用服务就是删除此链接。

系统运行级别：systemd 使用比 sysvinit 的运行级更为自由的 target 替代：

* 第 3 运行级用 multi-user.target 替代。另有 runlevel3.target 符号链接指向 multi-user.target
* 第 5 运行级用 graphical.target 替代。另有 runlevel5.target 符号链接指向 graphical.target

### 创建 service 文件

通过自己创建 service 文件可以实现开机自动运行任务的目的。详细配置说明可通过 `man systemd.service` 查看。

/etc/systemd/system/leanote.service

```txt
[Unit]
Description=Leanote Service
After=network.target

[Service]
User=root
WorkingDirectory= /root/leanote/bin
ExecStart=/usr/bin/bash /root/leanote/bin/run.sh

[Install]
WantedBy=multi-user.target
```

```bash
$ systemctl enable leanote.service
$ systemctl start leanote.service
```


## 防火墙管理

官方文档：[RedHat 7 安全指南 - 中文版](https://access.redhat.com/documentation/zh-CN/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html)

FirewallD 提供了动态防火墙管理工具，不需要重启整个防火墙便可应用更改。拥有运行时配置和永久配置选项。它也支持允许服务或者应用程序直接添加防火墙规则的接口。 配置采用图形化管理工具 `firewall-config` 和命令行工具 `firewall-cmd`

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


## 网络管理

iprouter2 已经取代原 net-tools 工具集，具体请参见下表：

 net-tools          | iproute2              | 描述
 ------------------ | --------------------- | ------------
 `arp -na`          | `ip neigh`            | 管理 neighbor / ARP 表
 `ifconfig`         | `ip link`             | 网络设备管理
 `ifconfig -a`      | `ip addr show`        | 与 link 类似，另外还增加了协议有关的管理
 `ifconfig --help`  | `ip [cmd] help`       | 显示帮助
 `ifconfig -s`      | `ip -s link`          | 
 `ifconfig eth0 up` | `ip link set eth0 up` | 
 `ipmaddr   `       | `ip maddr`            | 多播地址管理
 `iptunnel  `       | `ip tunnel`           | 隧道配置
 `netstat   `       | `ss`                  | socket status 接口状态
 `netstat -i`       | `ip -s link`          |    
 `netstat -g`       | `ip maddr`            |      
 `netstat -l`       | `ss -l`               |        
 `netstat -r`       | `ip route`            | 路由管理
 `route add`        | `ip route add`        |       
 `route del`        | `ip route del`        |      
 `route -n`         | `ip route show`       |      
 `vconfig`          | `ip link`             | 

一些常见应用场景：

```bash
$ ip addr add 192.168.0.193/24 dev wlan0  # 为网络接口分配 IP 地址
$ ip addr show dev eth1  # 显示网络接口的 IP 地址
$ ip link set down eht1  # 关闭某个指定的网络接口
$ ip route show          # 查看路由表
$ ss -tp                 # 查看所有 tcp 端口，并显示使用的进程名 
```


## SELinux 管理


