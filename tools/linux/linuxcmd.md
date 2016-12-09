# Linux 基本命令

## 文件管理

#### `ls` 列出当前目录文件

* `-l` 列出文件详细信息l(list), 该命令有一个默认别名 ll = ls -l
* `-lh` print sizes in human readable format (e.g., 1K 234M 2G)
* `-a` 列出当前目录下所有文件及目录，包括隐藏的a(all)

#### `pwd` 查看当前路径

查看当前所在目录的绝对路经 //print working directory

#### `mkdir` 创建目录

`mkdir –p parent/child/grandson` 递归式去创建一些嵌套目录，如已经存在目录，不会报错

#### `rmdir` 删除空白目录

`rmdir –p d1/d2` 递归式删除一些嵌套目录
`rmdir d1 d2` 删除当前目录下的两个空目录 d1 d2 (中间用空格分隔)

#### `cd` 切换目录

* `cd ../..` 回当前目录的上上级目录
* `cd -` 回上一次所在的目录
* `cd ~ 或 cd` 回当前用户的宿主目录
* `cd ~用户名` 回指定用户的宿主目录

#### `cp` 复制文件或目录

* `cp file1 dir1` 复制文件 file1 到 dir1 目录下
* `cp -r dir1 dir2` 复制目录 dir1 及目录下的项目到 dir2

#### `rm` 删除文件或目录

* `rm -rf 非空目录名` 删除一个非空目录，不提示 `-f`，`-r,-R` 代表递归删除
* `rm -f ./a/*` 删除 a 目录下所有文件，不提示 `-f`

#### `mv` 移动或重命名
* `mv file1.txt file2.txt dir` 将文件 file1.txt, file2.txt 移动到目录 dir 中
* `mv test.log test1.txt` 将文件 test.log 重命名为 test1.txt
* `mv dir1 dir2` 如果目录 dir2 不存在，将目录 dir1 改名为 dir2；否则，将 dir1 移动到 dir2 中

#### `touch` 创建空文件

touch 命令不常用，用来修改文件时间戳，或者新建一个不存在的文件

`touch file1 file2` 创建两个空文件

#### `cat` 查看文件内容

concatenate 把...连在一起，扩展命令 tac 则是最后一行到第一行方向显示出来

* `cat filename ` 一次显示整个文件
* `cat > filename ` 从键盘创建一个文件，
* `cat file1 file2 > file3 ` 将几个文件合并为一个文件

#### `less` 可控分页查看文件 

应该说是 linux 正统查看文件内容的工具，功能极其强大。less 的用法比起 more 更加的有弹性。

#### 文件内容查询 cat, tac, nl, more, less, head, tail, od

`nl` 显示带行号；`head` 只看头几行；`tail` 只看结尾几行；`od` 以二进制的方式读取文件内容

#### `find` 查找文件

`find ./ -type f -name "*.log"` 查找当前目录，以.log结尾的普通文件

#### Which to use: find, locate or whereis

`whereis` 查命令和手册；`locate` 通过数据库快速查找文件；`find` 功能强大的实时查找工具，速度较慢。

#### `grep`

根据字符匹配来查看文件部分内容。global regular expression print

`grep -i "license" GPL-3` 在 GPL-3 文件中查找并输出 license 所在行，大小写不敏感。

#### `ln` 创建链接文件

我们可以将连结视为档案的别名，连结分两种: 硬连结 hard link 与软连结 symbolic link。

`ln –s TARGET LINK_NAME` 建立一个到TARGET的连接


## 文件权限

#### `chown`

```bash
$ chown [-R] owner[:group] {File|Directory}
```

#### `chgrp`

```bash
$ chgrp root /home  # 把 /home 的属组改成 root 组
```

#### `chmod`

```bash
$ chmod 765 file     # 数字方式重新定义权限
$ chmod u=rwx.g+w,o-w file1 file2  # 符号类型改变文件的权限可以采用 = + - 三种方法
```

权限与数字对应关系 r: 4 w: 2 x: 1 -: 0

#### 目录 x 权限的说明

开放目录 r 权限，只能读取目录结构列表而无法读取目录下具体文件，需开放 x 权限，他人才能读取目录下文件。

## 用户管理

#### /etc/passwd /etc/shadow

/etc/passwd 存储用户账号，实际用户密码在 /etc/shadow

```bash
# /etc/passwd
root    :x     :0  :0  :root    :/root   :/bin/bash
账户名称:伪密码:UID:GID:账户说明:主文件夹:Shell

# /etc/shadow
账号名称:实际密码:最近更改日期:不可更改天数:需重设天数:警告天数:宽限天数:失效日期:保留
```

#### /etc/group /etc/gshadow

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

另外，其实用户如果在系统上操作过一陈子的话，该用户在系统内可能会含有其他文件，可以先执行 find / -user uname 查出整个系统内属于 uname 的文件，然后再进行删除。

#### `groupadd` 新增用户组

```bash
$ groupadd [-g gid][-r]  # -g 直接指定用户组；-r 新建系统用户组
```

#### groupdel 删除用户组


## 进程管理 17章

<table class="dataintable"><col style="color:blue" /><col />
<tr><td>&</td><td>这个用在一个命令的最后，可以把这个命令放到后台执行</td></tr>
<tr><td>^Z</td><td>将一个正在前台执行的命令放到后台，并且暂停</td></tr>
<tr><td>jobs</td><td>查看当前有多少在后台运行的命令</td></tr>
<tr><td>ps -ef</td><td>列出系统中正在运行的进程 processes snapshot</td></tr>
<tr><td>fg [%jobnum]</td><td>将后台中的命令调至前台继续运行</td></tr>
<tr><td>bg [%jobnum]</td><td>将一个在后台暂停的命令，变成继续执行</td></tr>
<tr><td>kill</td><td>发送信号给一个或多个进程（经常用来杀死一个进程）</td></tr>
</table>


## CentOS 安装配置中的其他命令

```
$ less /proc/cpuinfo  # 查看 CPU 信息，通过伪文件系统提供了一种与进程 process 沟通的机制
$ less /proc/meminfo  # 查看内存信息
$ df -h    # 查看文件系统磁盘使用情况 disk space usage of file system
$ ip addr  # 查看 IP 信息，原先的 ifcongfig 将废弃
$ top      # linux下的任务管理器 h 帮助 q 退出 k+PID 结束进程 table of process
```

## `grep` 命令及正则表达式详解

## `less` `man` 操作
<table class="dataintable"><col style="color:blue" /><col />
<tr><td>d</td><td>下翻半页 down</td></tr>
<tr><td>u</td><td>上翻半页 up</td></tr>
<tr><td>/text</td><td>在文档中查找text 按n跳到下一个，shift+n上一个</td></tr>
<tr><td>q</td><td>退出</td></tr>
<tr><td>gg / 1G</td><td>跳到文章开头</td></tr>
<tr><td>G</td><td>跳到文章末尾</td></tr>
<tr><td>h</td><td>帮助</td></tr>
</table>


## 认识系统服务

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

## CentOS 7 新变化

#### CentOS7 的 Services 使用了systemd 来代替 sysvinit 管理

1、systemd的服务管理程序：  
systemctl是主要的工具，它融合之前service和chkconfig的功能于一体。可以使用它永久性或只在当前会话中启用/禁用服务。  
systemctl可以列出正在运行的服务状态，systemd-cgls以树形列出正在运行的进程。
2、如何启动/关闭、启用/禁用服务？

```
服务控制：<code>systemctl start/stop/restart/status postfix.service</code>
开机服务设置：<code>systemctl enable/disable postfix.service</code>
查看服务是否开机启动：systemctl is-enabled postfix.service;echo $?
查看已启动的服务列表：systemctl list-unit-files|grep enabled
```

说明：

启用服务就是在当前runlevel的配置文件目录建立对应服务配置文件的软链接；禁用服务就是删除此链接。

系统运行级别：systemd使用比sysvinit的运行级更为自由的target替代。第3运行级用multi-user.target替代。第5运行级用graphical.target替代。runlevel3.target和runlevel5.target分别是指向 multi-user.target和graphical.target的符号链接。

#### ip 替代 ifconfig

#### firewallcmd 替代 iptables

