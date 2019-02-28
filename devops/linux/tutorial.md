# Linux 学习笔记

Ubuntu is probably better for Linux beginners because it’s easier to set up and use.  
Debian is probably better for experienced users who want full control.  
CentOS is probably better for businesses who want a more stable and secure Linux distro.


## 目录结构

http://www.pathname.com/fhs/

```txt
bin    用户命令目录 contains the essential user binaries (programs)
sbin   系统管理命令(供超级用户使用)目录 contains essential system administration binaries

usr    用户应用(程序)目录(存放稳定的文件) contains applications and files used by users
var    存放经常变更的数据文件, 与 /usr 目录相对应
etc    配置文件目录 contains system-wide configuration files
srv    contains "data for services provided by the system"
opt    可选应用目录, 如临时安装某个软件的 Beta 版可扔这里
tmp    临时文件目录, 随时可能被谁谁谁删除

home   存放各用户目录 contains each user’s data files and user-specific configuration files
root   root 用户专有的用户目录

dev    设备目录 Linux exposes devices as files
  |- sda     SATA 磁盘
  |- random  虚拟设备, 生成随机数
  |- null    虚拟设备, 写入的内容直接丢弃
proc   contains special files that represent system and process information
run    gives applications a standard place to store transient files they require like sockets and process IDs

media  可插拔设备
mnt    以前用于挂载临时文件系统
boot   启动文件目录
sys
lib    contains libraries needed by the essential binaries in the /bin and /sbin folder
lost+found
```

```txt
/usr
  |- local     主要存放那些手动安装的软件, 它和 /usr 目录具有类似的目录结构
  |- bin       几乎所有用户命令, 另外一些命令在 /bin 或 /usr/local/bin
  |- sbin      根文件系统不必要的系统管理命令，例如多数服务程序
  |- include   C编程语言的头文件
  |- lib       程序或子系统的不变的数据文件 library
  |- share
  |- man info doc

/var    包括系统一般运行时要改变的数据
  |- lib      系统正常运行时要改变的文件
  |- log      日志文件目录
  |- tmp      
  |- spool    
  |- local        /usr/local 中安装的程序的可变数据
  |- lock     许多程序遵循在 /var/lock 中产生一个锁定文件标明对某设备或文件的占用
  |- 
  |- 

dev    设备目录 Linux exposes devices as files
  |- sda     SATA 磁盘
  |- random  虚拟设备, 生成随机数
  |- null    虚拟设备, 写入的内容直接丢弃
```




