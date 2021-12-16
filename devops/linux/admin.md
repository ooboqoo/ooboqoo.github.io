# Linux 系统管理


## 软件包管理

|               | CentOS                | Ubuntu
|---------------|-----------------------|-------------------
| 更新软件包列表 | 每次运行 yum 时自动执行 | `apt update`
| 从仓库安装软件 | `yum install package` | `apt install package`
| 安装本地软件包 | `rpm -i pkg.rpm`      | `dpkg -i pkg.deb`
| 删除软件包     | `rpm -e package`      | `apt remove package`
| 升级软件包     | `yum update`          | `apt upgrade`
| 升级整个系统   | `yum upgrade`         | `apt dist-upgrade`

```bash
$ apt update             # 更新仓库列表
$ apt upgrade            # 升级现有软件包
$ apt install <pkgname>  # 安装新软件包

$ apt show <pkgname>     # 查看软件包详细信息
$ apt search <pattern>   # 搜索软件包

$ apt check        # 检查是否存在有问题的依赖关系
$ apt purge        # 彻底删除软件包(含配置文件)
$ apt autoremove   # 仅删除不需要再次下载的软件包
$ apt clean        # 删除本地缓存的所有升级包
$ apt autoclean    # 删除本地缓存中无用的软件包
```

### snap

https://snapcraft.io/docs/getting-started

特点：
* 开发者只要打一次包就行，而不像 apt yum 一样要每个发布版本构建软件包
* 提供了沙箱机制以保证安全性，软件与系统之间、软件与软件之间具备一定的隔离

A snap is a bundle of an app and its dependencies that works without modification across many different Linux distributions.

The **snapd** deamon manages the snap environment on the local system. Its installation will include the **snap** tool for interaction with snaps.

A snap's installed applications can be found under `/snap/bin`. Adding `/snap/bin` to your default `$PATH` makes running snaps more convenient.

```bash
$ snap version

# 安装
$ snap install <pkgname>
  # 选择某个 Channel，默认为 stable
  $ sudo snap install --channel=edge vlc   # 从 edge 频道拉取
  $ sudo snap switch --channel=stable vlc  # 改回 stable 频道

# 信息
$ snap [find | search] <pattern>  # 搜索软件包
  $ snap find "media player"  # 从 Snap Store 搜索媒体播放软件
$ snap info <pkgname>             # 查看软件包具体信息
$ snap list                       # 列出本地安装的软件包

# 管理
$ snap refresh <pkgname>  # 手动更新，一般不需要手动操作，会自动更新
$ snap remove <pkgname>
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

$ lsof -i | grep LISTEN  # 查看监听端口
```


## 防火墙管理

### CentOS

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

### Ubuntu

```bash
$ ufw app list
$ ufw allow 'Nginx HTTP'
$ ufw status
```


## 用户管理

#### /etc/passwd, /etc/shadow

/etc/passwd 存储用户账号，实际用户密码在 /etc/shadow

```bash
# /etc/passwd
root    :x     :0  :0  :root    :/root   :/bin/bash
账户名称:伪密码:UID:GID:账户说明:主文件夹:Shell

# /etc/shadow
账号名称:实际密码:最近更改日期:不可更改天数:需重设天数:警告天数:宽限天数:失效日期:保留
```

#### /etc/group, /etc/gshadow

/etc/group 存储组账号，实际账号密码在 /etc/gshadow

```bash
# /etc/group
root      :x     :0  :root,user1
用户组名称:伪密码:GID:组员

# /etc/gshadow
用户组名:密码列:组管理员账号:组员  # 密码列为!表示无合法密码；组员列内容同 /etc/group
```

#### `useradd` 添加用户

```bash
$ useradd [-u UID][-g 初始组][-G 次组][-mM][-c 说明][-d 主文件夹绝对路径][-s shell] 用户名
```

#### `passwd` 设置密码

```bash
$ passwd  # 给自己改密码，用户自己改会要求输入原密码，而 root 给自己或用户改都不需输入原密码
$ passwd username  # 管理员给 username 设置密码
```

#### `usermod` 修改账户设置

可以通过直接修改账户配置文件修改。该命令参数基本同 useradd

#### `userdel` 删除账户

```bash
$ userdel [-r] username  # -r 连同用户的主文件夹也一起删除
```

通常，我们要删除一个账号，可以手动将 /etc/passwd /etc/shadow 里面的该账号取消即可。

另外，其实用户如果在系统上操作过一陈子的话，该用户在系统内可能会含有其他文件，可以先执行 find / -user username 查出整个系统内属于 username 的文件，然后再进行删除。

#### `groupadd` 新增用户组

```bash
$ groupadd [-g gid][-r]  # -g 直接指定用户组；-r 新建系统用户组
```

#### groupdel 删除用户组


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

### 设置定时任务

Linux 系统通常都使用 cron 设置定时任务，但是 Systemd 也有这个功能，而且优点显著。

**单元 Unit** 是 Systemd 的最小功能单位，是单个进程的描述。一个个小的单元互相调用和依赖，组成一个庞大的任务管理系统。

由于 Systemd 要做的事情太多，导致单元有很多不同的种类，大概一共有12种。举例来说，Service 单元负责后台服务，Timer 单元负责定时器，Slice 单元负责资源的分配。

每个单元都有一个单元描述文件，它们分散在三个目录:
  * __/lib/systemd/system__ 系统默认的单元文件
  * __/etc/systemd/system__ 用户安装的软件的单元文件
  * __/usr/lib/systemd/system__ 用户自己定义的单元文件

```bash
# 查看所有 Timer 单元
$ systemctl list-unit-files --type timer

# 查看所有正在运行的定时器
$ systemctl list-timers

# 创建定时器，具体可参考 /lib/systemd/system/certbot.timer 和 /lib/systemd/system/certbot.service
$ vim /usr/lib/systemd/system/mytimer.timer

# 控制命令
$ systemctl start   mytimer.timer  # 启动定时器
$ systemctl stop    mytimer.timer  # 关闭定时器
$ systemctl status  mytimer.timer  # 查看定时器状态
$ systemctl enable  mytimer.timer  # 设置开机自启动
$ systemctl disable mytimer.timer  # 取消开机自启动

# 日志命令
$ journalctl -u mytimer.timer
```

### cron

> 对程序猿来说，这个还是简单好用

`crontab` 供用户控制计划任务。

`crond` 是 Linux 下用来周期性地执行某种任务或等待处理某些事件的一个守护进程，与 Windows 下的计划任务类似。`crond` 进程每分钟会定期检查是否有要执行的任务，如果有要执行的任务，则自动执行该任务。

Linux下的任务调度分为两类：系统任务调度和用户任务调度。
* 系统任务调度为系统周期性所要执行的工作，比如写缓存数据到硬盘、日志清理等。配置信息在 `/etc/crontab`。
* 用户任务调度为用户定期要执行的工作，不如用户数据备份、定时邮件提醒等。用户可以使用 crontab 工具来定制自己的计划任务。所有用户定义的 crontab 文件都保存在 `/var/spool/cron/crontabs/<用户名>` 文件中

```bash
crontab <filename>  # 拷贝一份文件来初始化用户配置，不提供就直接根据输入内容创建
crontab -r          # 删除当前用户的配置文件
crontab -e   # 编辑当前用户的定时任务列表（约等于编辑用户配置文件）
crontab -l   # 列出当前用户的定时任务列表（约等于显示用户配置文件）
```

crontab 编辑辅助工具 https://crontab.guru/

```txt
# 每分钟在当前控制台打印日期（实际试验时，通过 w 或 who 命令查看当前实际 TTY）
*/1 * * * *  /bin/echo `date` > /dev/pts/0
```


