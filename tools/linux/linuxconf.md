# Linux 系统配置

## 基本配置

时区设置

```bash
date                                                     # 查看当前时间
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  # 修改设置
shutdown -r 0                                            # 重启使所有应用都使用最新时间设置
```

语言设置

```bash
locale                   # 查看地域偏好设置
export LANG=en_US.UTF-8  # 临时设置环境变量，重新登录失效
# ~/.bash_profile        # 修改配置文件，影响以后每次登录
LANG='en_US.UTF-8'
```

其他偏好配置

```bash
# ~/.bash_profile    # System wide environment and startup programs, for login setup
html='/var/www/html'
cd $html

# ~/.bashrc          # System wide functions and aliases
alias cp='cp -i'
alias ll='ls -lA'
```


## 系统服务

### CentOS 6

实现某种service的程序称之为 daemon(守护进程)，主要分为 stand alone 及 super daemon两种

super daemon 由xinetd(extended Internet services daemon)统一管理，连接机制分单/多线程

daemon 根据工作形态不同可分为 signal-daemon 和 interval-control

启动daemon的进程通常会在服务名称之后加个d，提示是daemon

stand alone daemon 启动脚本在 /etc/init.d/, 配置文件在 /etc/sysconfig/  
super daemon 主daemon的配置文件是/etc/xinetd.conf, 子daemon的配置文件在 /etc/xinetd.d/

利用/etc/init.d/*来启动/关闭/查看stand alone daemon，也可以使用 service命令 (一个智能调用脚本)

可通过chkconfig设置开机启动

```
netstat -lnp // 找出所有的有监听网络的服务
service --status-all // 查看所有的服务状态
/etc/init.d/rsyslog status|start|stop|restart // 直接调用脚本控制服务
service [service name] (start|stop|restart|...)</code> // 通过service命令控制
chkconfig --list [服务名]</code> // 显示目前的各项服务，<code>chkconfig --list | grep '3:on'</code>
chkconfig [--level [0123456]] [服务名] [on|off]</code> // 设置某个服务在该level下启闭
chkconfig --level 345 atd on // 设置后要下次启动才生效，可以先手动启动服务
```

### CentOS 7

 CentOS 7 使用 systemd 代替 sysvinit 来管理 Service。

1、systemd 的服务管理程序：

`systemctl` 是主要的工具，它融合之前 service 和 chkconfig 的功能于一体。可以使用它永久性或只在当前会话中启用/禁用服务。systemctl 可以列出正在运行的服务状态，systemd-cgls 以树形列出正在运行的进程。

2、如何启动/关闭、启用/禁用服务？

```bash
$ systemctl start/stop/restart/status httpd  # 服务操控命令
$ systemctl enable/disable httpd.service     # 开机服务设置

$ systemctl is-enabled httpd                 # 查看某个服务是否开机启动
$ ls /etc/systemd/system/multi-user.target.wants/  # 查看所有开机自启动的服务列表
$ systemctl list-unit-files | grep enabled         # 查看当前启动的服务列表
```

注：开机启动服务就是在当前 runlevel 的配置文件目录建立对应服务配置文件的软链接；禁用服务就是删除此链接。

系统运行级别：systemd 使用比 sysvinit 的运行级更为自由的 target 替代：

* 第 3 运行级用 multi-user.target 替代。另有 runlevel3.target 符号链接指向 multi-user.target
* 第 5 运行级用 graphical.target 替代。另有 runlevel5.target 符号链接指向 graphical.target


## 防火墙设置

官方文档：[RedHat 7 安全指南 - 中文版](https://access.redhat.com/documentation/zh-CN/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html)

centos 7中防火墙是一个非常的强大的功能了，但对于centos 7中在防火墙中进行了升级了，下面我们一起来详细的看看关于centos 7中防火墙使用方法。
FirewallD 提供了支持网络/防火墙区域(zone)定义网络链接以及接口安全等级的动态防火墙管理工具。它支持 IPv4, IPv6 防火墙设置以及以太网桥接，并且拥有运行时配置和永久配置选项。它也支持允许服务或者应用程序直接添加防火墙规则的接口。 以前的 system-config-firewall/lokkit 防火墙模型是静态的，每次修改都要求防火墙完全重启。这个过程包括内核 netfilter 防火墙模块的卸载和新配置所需模块的装载等。而模块的卸载将会破坏状态防火墙和确立的连接。
相反，firewall daemon 动态管理防火墙，不需要重启整个防火墙便可应用更改。因而也就没有必要重载所有内核防火墙模块了。不过，要使用 firewall daemon 就要求防火墙的所有变更都要通过该守护进程来实现，以确保守护进程中的状态和内核里的防火墙是一致的。另外，firewall daemon 无法解析由 ip*tables 和 ebtables 命令行工具添加的防火墙规则。
守护进程通过 D-BUS 提供当前激活的防火墙设置信息，也通过 D-BUS 接受使用 PolicyKit 认证方式做的更改。


#### firewallcmd 替代 iptables


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









