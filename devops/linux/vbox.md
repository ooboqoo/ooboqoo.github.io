# VirtualBox 使用笔记


## 安装 CentOS

### 虚拟机安装

1. 安装虚拟机，没有出现64位选项，所以 centos7 跟本没法装，经过百度，发现是 BIOS 里 CPU 虚拟支持没开
2. 先装的 minimal 版本，发现啥都木有，然后重新下普通版
3. 普通版里有各种套餐，选网络服务基础版+PHP 其他以后再装
4. 使用一段时间后磁盘占用容量：/boot 112M; /root 1.9G; swap 0M
5. 虚拟机时间设置以及网络连接设置
6. 软件自带详细的说明手册，不懂查手册给力
7. 重装恢复：控制 -> 注册

### NAT 方式下 putty 连接虚拟机

1. 设置虚拟机端口转发规则: {主机端口：2222 子系统端口：22}
2. putty连接设置：127.0.0.1:2222

### 文件共享

共享文件功能需要安装扩展包的，具体见手册 Guest Additions

```bash
mount -t vboxsf [-o OPTIONS] sharename mountpoint
# 不指定 mountpoint 的话，已经自动挂载到了 /media/sf_52web
```


## 安装 Win7

[Windows Thin PC](http://download.microsoft.com/download/C/D/7/CD789C98-6C1A-43D6-87E9-F7FDE3806950/ThinPC_110415_EVAL_x86fre.iso) 是 Windows 7 的轻量级版本，于 2011 年发布，主要面向虚拟桌面基础架构消费者(企业用户)。


## 虚拟机不同网络连接方式解析

VMWare 提供了三种工作模式，它们是 bridged(桥接模式)、NAT(网络地址转换模式)和 host-only(主机模式)。

### 1. bridged(桥接模式)

该模式下虚拟出来的操作系统就像是局域网中的一台独立主机，虚拟系统和宿主机器就像连接在同一个Hub上的两台电脑。需要手工为虚拟系统配置IP地址、子网掩码，而且
还要和宿主机器处于同一网段，这样虚拟系统才能和宿主机器进行通信。

这种方式最简单，直接将虚拟网卡桥接到一个物理网卡上面，和linux下一个网卡绑定两个不同地址类似，实际上是将网卡设置为混杂模式，从而达到侦听多个IP的能力。

如果想利用VMWare在局域网内新建一个虚拟服务器，为局域网用户提供网络服务，就应该选择bridged模式。但对于想进行种种网络实验的朋友这种模式是不太适合
的，因为你无法对虚拟机的网络进行控制，它直接出去了。

### 2. NAT(网络地址转换模式)

使用NAT模式，就是让虚拟系统借助NAT(网络地址转换)功能，通过宿主机器所在的网络来访问公网。NAT模式下的虚拟系统是作为主机网络下的子网络存在的，因此局
域网中的其他主机无法访问虚拟机（通过“设置端口映射”可以解决部分问题），而虚拟机访问其他主机不受影响。

采用NAT模式最大的优势是虚拟系统接入互联网非常简单，你不需要进行任何其他的配置，只需要宿主机器能访问互联网即可。但缺点是网络内其他机器不能访问虚拟机。

NAT方式的IP地址配置方法是由VMware的虚拟DHCP服务器中分配一个IP，vmware自带了nat服务，提供了从vmnet8到外网的地址转换。

### 3. host-only (主机模式)

在这种模式下，所有的虚拟系统是可以相互通信的，但虚拟系统和真实的网络是被隔离开。（虚拟系统和宿主机器系统是可以相互通信的，相当于这两台机器通过双绞线互连。）

这应该是最为灵活的方式，有兴趣的话可以进行各种网络实验。和nat唯一的不同的是，没有地址转换服务，因此只能访问到主机。


## NAT 方式下 FTP 部署

### FTP协议有两种工作方式：主动式（PORT）和被动式（PASV）

命令连接：客户端端口N(>1024) --连接请求--》服务器(默认21端口) --接受--》建立一命令链路

PORT数据连接：客户端发送PORT请求并监听P 端口--》服务器从20 端口连接P 端口--》建立数据链路

PASV数据连接：客户端发送PASV请求--》服务器开启P 端口--》客户端连接服务器P 端口--》建立数据链路

两种方式的命令链路连接方法相同，而数据链路的建立方法就完全不同。

主动FTP对FTP服务器的管理和安全很有利，但对客户端的管理不利。因为FTP服务器企图与客户端的高位随机端口建立连接，而这个端口很有可能被客户端的防火墙阻塞掉。相反被动FTP对客户端有利，对服务器端不利。

### 在 NAT 模式下强上 ftp 过程

显然因为 ftp 数据传输原理，NAT 模式并不适合架设 ftp，但貌似桥接方式稳定性不如 NAT，然后各种查资料，搞定，过程如下：

```bash
connect_from_port_20=YES　　// 这句的意思是POST模式下使用20端口，修改数值后vsftpd无法启动　
pasv_min_port=8888          // 修改配置文件 /etc/vsftpd/vsftpd.conf
pasv_max_port=8889          // 设置被动模式的端口范围，注意数值要大于1024
# firewall-cmd --permanent --add-port=8888-8889/tcp  // 防火墙开放端口
# systemctl restart vsftpd.service　   // 重启ftp服务
# firewall-cmd --reload  // 重新加载防火墙规则
最后虚拟机设置端口映射：ftp: 2121 - 21；ftpPASV: 8888 - 8888, 8889 - 8889
```

后记：照理说，客户端用 PORT 模式，然后再端口映射 20端口就可以连通，但是不行，具体见 “感受 VMware
NAT 对应用层协议的影响”，对20、21这种特定端口，NAT 会做智能对待，结果反而不对了。

增补：设置好后，PhpStorm 竟然还是无法下载目录，然后打开 IE，发现在 IE 下面无法访问，不折腾，直接桥接。
