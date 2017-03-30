# CentOS 6.5 建站笔记

### 第一步 安装服务

```bash
$ yum install httpd vsftpd mysql mysql-server php php-mysql
```

### 第二步 设置开机启动

```bash
$ chkconfig httpd on   # 配置 HTTP 服务开机启动
$ chkconfig vsftpd on  # 配置 FTP 服务开机启动
$ chkconfig mysqld on  # 配置 MySQL 服务开机启动
$ chkconfig            # 检查服务配置状态，确认以上服务的 2、3、4、5 为 on
```

### 第三步 启动服务

```bash
$ service httpd start   # 启动HTTP服务
$ service vsftpd start  # 启动FTP服务
$ service mysqld start  # 启动MySQL服务
```

### 第四步 配置 FTP 服务

```bash
$ vi /etc/vsftpd/vsftpd.conf  # 找到 anonymous_enable=YES 更改为 NO
$ service vsftpd restart      # 重启使刚才的配置生效
```

### 第五步 配置 HTTP 服务

```bash
$ vi /etc/httpd/conf/httpd.conf  # 配置 httpd 服务
$ /etc/init.d/httpd restart      # 重启httpd
```

### 第六步 配置基本安全策略

```bash
$ getsebool -a | grep ftp  # 列出所有 selinux 全部 ftp 策略
$ setsebool allow_ftpd_full_access on  # 允许FTP完全访问
$ iptables -I INPUT -p tcp --dport 80 -j ACCEPT  # 在头部插入防火墙规则，放行到达 80 端口的 tcp 包
$ iptables -I INPUT -p tcp --dport 21 -j ACCEPT  # 接受所有要到达服务器 21 端口的 tcp 包
$ modprobe ip_conntrack_ftp  # 载入 IP 连线跟踪模块。
```


> 注意：记住最后这一步的基本安全策略配置在重启后全部失效，你需要重新配置一遍。当然通过修改 selinux 和 iptables 的配置文件或 `service iptables save` 是可以保持这些策略的。但你应该清晰的认识到一个问题：一个服务器应该总是保持开启状态的，如果服务器重启了，那么只有两种可能，一种是在你的控制之下，一种不在你的控制之下，当服务器重启事件不在你的控制之下时，那么你应该认识到这是很危险的情况，那么刚才那些“放行”的策略应该完全失效而不是继续保持才对。也正因为如此，我想这可能是 CentOS 这样做的其中一个原因。

2015/12/31 实际遇到 ftp 无法上传文件, 通过以下方法解决：

```bash
$ setsebool -P ftp_home_dir on  # -P 代表设置值会写入磁盘，重启后继续生效
```


#### 其他观点：Linux 下为何要关闭  SELinux

SELinux 提供了比默认 ugo+rwx 更详细的权限控制。绝大多数业务服务器上不需要 SELinux，因为基本上都是用负载均衡设备做流量分发，对外仅开放了仅有的几个端口。虚拟化使用越来越广泛，不同类型应用分布在不同服务器上，并没有不同服务间权限隔离的必要性。SELinux 带来的附加安全性和使用复杂性上不成比例，性价比不高。

不懂怎么用，关了一了百了，懂怎么用的不想折腾，还是关了一了百了。

### 第七步 配置 SSH

```bash
$ less /var/log/secure     # SSH 服务的登录日志在这里
$ vi /etc/ssh/sshd_config  # 配置文件地址，修改好后要重启服务
```

### 第八步 其他配置

```bash
$ vi /etc/sysconfig/clock  # 更改时区 - 添加 ZONE=Asia/Shanghai
$ ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  #更改时区 - 通过链接文件方式更改时区 
$ vi /etc/sysconfig/i18n 添加 LANG=en_US.UTF-8  # 字符编码调成 UTF-8 以正常显示中文
```

### 第九步 系统备份

2016/3/28 发现搬瓦工后台可以保存两个永久系统备份，有空的时候，重新装好系统并备份下。
