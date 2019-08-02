# Linux 基本命令

## 文件管理

#### `ls` 列出当前目录文件

* `-l` 列出文件详细信息l(list), 该命令有一个默认别名 ll = ls -l
* `-lh` print sizes in human readable format (e.g., 1K 234M 2G)
* `-a` 列出当前目录下所有文件及目录，包括隐藏的a(all)

#### `pwd` 查看当前路径 print working directory

#### `mkdir` 创建目录

`mkdir –p parent/child/grandson` 递归式去创建一些嵌套目录，如已经存在目录，不会报错

#### `rmdir` 删除空白目录

`rmdir –p d1/d2` 递归式删除嵌套空目录  
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
* `cat > filename ` 从键盘创建一个文件，Ctrl+D 或 Ctrl+C 退出录入，还可以自定义结束符 `cat > test.txt <<EOF`
* `cat file1 file2 > file3 ` 将几个文件合并为一个文件

#### `less` 可控分页查看文件 

应该说是 linux 正统查看文件内容的工具，功能极其强大。less 的用法比起 more 更加的有弹性。

#### cat, tac, nl, more, less, head, tail, od

`nl` 显示带行号  
`head` 只看头几行  
`tail` 只看结尾几行  
`od` 以二进制的方式读取文件内容  octal, decimal, hex, ASCII dump  

#### `find` 查找文件

`find [-H] [-L] [-P] [-D debugopts] [-Olevel] [path...] [expression]`

`find ./ -type f -name "*.log"` 查找当前目录，以 .log 结尾的普通文件。`-type f -name "*.log"` 属于 expression 部分

#### find, locate, whereis, which

`which` 使用的是哪个位置的命令  
`whereis` 查命令和手册  
`locate` 通过数据库快速查找文件  
`find` 功能强大的实时查找工具，速度较慢  

#### `ln` 创建链接文件

我们可以将连结视为档案的别名，连结分两种: 硬连结 hard link 与软连结 symbolic link。

`ln –s TARGET LINK_NAME` 建立一个到 TARGET 的连接


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
$ chmod u=rwx,g+w,o-w file1 file2  # 符号类型改变文件的权限可以采用 = + - 三种方法
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

另外，其实用户如果在系统上操作过一陈子的话，该用户在系统内可能会含有其他文件，可以先执行 find / -user username 查出整个系统内属于 username 的文件，然后再进行删除。

#### `groupadd` 新增用户组

```bash
$ groupadd [-g gid][-r]  # -g 直接指定用户组；-r 新建系统用户组
```

#### groupdel 删除用户组


## 进程管理 17章

||
:-------------:|:-----------------------------------------------------
`&`            | 这个用在一个命令的最后，可以把这个命令放到后台执行
`^Z`           | 将一个正在前台执行的命令放到后台，并且暂停
`jobs`         | 查看当前有多少在后台运行的命令
`ps -ef`       | 列出系统中正在运行的进程 processes snapshot
`fg [%jobnum]` | 将后台中的命令调至前台继续运行
`bg [%jobnum]` | 将当前作业移到后台执行，或将一个后台暂停的任务切换为运行
`kill`         | 发送信号给一个或多个进程（经常用来杀死一个进程）
`top`          | linux下的任务管理器 h 帮助 q 退出 k+PID 结束进程 table of process


## 磁盘管理

#### `df -h` 显示已经挂载的分区列表

df -- display free disk space
  * `-h` 以人类易读的格式展现 K M G
  * `-T` 打印磁盘格式

#### `du -hd1 /home` 统计目录下文件磁盘占用

du -- display disk usage statistics 递归列出某个目录下的所有文件的空间占用
  * `-h` 以人类易读的格式展现 K M G
  * `-d{N} --max-depth=N` 指定递归显示的最大层级 N

## CentOS 安装配置中的其他命令

```
$ less /proc/cpuinfo  # 查看 CPU 信息，通过伪文件系统提供了一种与进程 process 沟通的机制
$ less /proc/meminfo  # 查看内存信息
$ df -h    # 查看文件系统磁盘使用情况 disk space usage of file system
$ ip addr  # 查看 IP 信息，原先的 ifcongfig 将废弃
$ top      # linux下的任务管理器 h 帮助 q 退出 k+PID 结束进程 table of process
```

## `grep` 文本过滤

`grep` global regular expression print，根据字符匹配来查看文件部分内容。

```bash
$ grep [OPTION]... PATTERN [FILE]...  # -n 显示行号 -i 忽略大小写

$ grep -in "license" GPL-3  # 在 GPL-3 文件中查找并输出 license 所在行，大小写不敏感，显示带行号。
$ grep 'test' d*            # 显示所有以 d 开头的文件中包含 test 的行
$ grep 'test' aa bb cc      # 显示在 aa bb cc 文件中包含 test 的行
$ grep '[a-z]\{5\}' aa      # 显示所有包含字符串至少有5个连续小写字母的串
```

文本处理3大命令：gerp 查找, sed 编辑, awk 根据内容分析并处理. http://www.jb51.net/article/54961.htm

* `grep` - 文本过滤器，如果仅仅是过滤文本，使用 grep 效率要比其他的高很多
* `sed` - Stream EDitor，流编辑器，默认只处理模式空间不处理原数据，如果数据是针对行进行处理的，可以使用 sed
* `awk` - 报告生成器，格式化后再显示。如果处理的数据需要生成报告之类的信息，或者数据是按列进行处理的，最好用 awk

AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。AWK 由三位创始人的 Family Name 的首字符组成。

## `less` `man` 操作

man 调用的 less，所以操作都一样的。

| | |
|:-----------:|:----------------------------------------------------
| `d`         | 下翻半页 down
| `u`         | 上翻半页 up
| `/text`     | 在文档中查找 text 按 n 跳到下一个，shift+n 上一个
| `q`         | 退出
| `gg` / `1G` | 跳到文章开头
| `G`         | 跳到文章末尾
| `h`         | 帮助

> Bash 内部命令的帮助用 `help` 查询，外部命令用 `man` manual 查询，使用 `--help` 选项也可以获得信息，但相对简单些。
