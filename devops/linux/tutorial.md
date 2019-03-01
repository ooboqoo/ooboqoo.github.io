# Linux 学习笔记

Ubuntu is probably better for Linux beginners because it’s easier to set up and use.  
Debian is probably better for experienced users who want full control.  
CentOS is probably better for businesses who want a more stable and secure Linux distro.


## 目录结构

http://www.pathname.com/fhs/

|          | shareable                  | unshareable
|----------|----------------------------|--------------------
| static   | /usr  /opt                 | /etc  /boot
| variable | /var/mail  /var/spool/news | /var/run  /var/lock

```txt
bin    用户命令目录 contains the essential user binaries (programs)
sbin   系统管理命令(供超级用户使用)目录 contains essential system administration binaries

usr    用户应用(程序)目录(存放稳定的文件) contains applications and files used by users
etc    配置文件目录 contains system-wide configuration files
var    存放经常变更的数据文件, 与 /usr 目录相对应, 当 /var 不能独立作为一个分区时也可以链接到 /usr/var
opt    可选应用目录, add-on application software packages
srv    存放对外提供的服务内容 contains "data for services provided by the system"
tmp    临时文件目录, 下次启动时当前创建的文件可能已经被谁谁谁删除了

home   存放各用户目录 contains each user’s data files and user-specific configuration files
root   root 用户专有的用户目录

media  可插拔设备
mnt    以前用于挂载临时文件系统

dev    设备目录 Linux exposes devices as files
  |- sda     SATA 磁盘
  |- random  虚拟设备, 生成随机数
  |- null    虚拟设备, 写入的内容直接丢弃
proc   contains special files that represent system and process information
run    gives applications a standard place to store transient files they require like sockets and process IDs

boot   启动文件目录
lib    contains libraries needed by the essential binaries in the /bin and /sbin folder
lost+found
```

```txt
/usr
  |- local     主要存放那些手动安装的软件, 它和 /usr 目录具有类似的目录结构
  |- bin       几乎所有用户命令, 另外一些命令在 /bin 或 /usr/local/bin
  |- sbin      根文件系统不必要的系统管理命令，例如多数服务程序
  |- include   C语言的头文件
  |- lib       Libraries
  |- share     Architecture-independent data, 如 man info doc 文档目录就在这
  |- src       可放一些源码, only for reference purposes

/var    包括系统一般运行时要改变的数据
  |- log      日志文件目录
  |- lib      Variable state information 系统正常运行时要改变的文件
  |- lock     (-> /run/lock) 许多程序遵循在 /var/lock 中产生一个锁定文件标明对某设备或文件的占用
  |- tmp      Temporary files preserved between system reboots
  |- spool    Application spool data
  |- local    Variable data for /usr/local
  |- opt      Variable data for /opt

dev    设备目录 Linux exposes devices as files
  |- sda     SATA 磁盘
  |- random  虚拟设备, 生成随机数
  |- null    虚拟设备, 写入的内容直接丢弃
```




