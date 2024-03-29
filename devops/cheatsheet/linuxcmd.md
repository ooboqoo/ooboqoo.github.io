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
* `cp -R dir1 dir2` 复制目录 dir1 及目录下的项目到 dir2

```bash
$ ls dir1            # dir3
$ cp -R dir1 dir2    # 结果为 dir2/dir1
$ cp -R dir1/* dir2  # 结果为 dir2/dir3
```

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

#### 查看文件 `cat` `tac` `nl` `more` `less` `head` `tail` `od`

`nl` 显示带行号  
`head` 只看头几行  
`tail` 只看结尾几行  
`od` 以二进制的方式读取文件内容  octal, decimal, hex, ASCII dump  

#### `find` 查找文件

`find [-H] [-L] [-P] [-D debugopts] [-Olevel] [path...] [expression]`

`find ./ -type f -name "*.log"` 查找当前目录，以 .log 结尾的普通文件。`-type f -name "*.log"` 属于 expression 部分

#### 查找命令 `which` `whereis` `locate` `find`

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

#### 目录的 `x` 权限说明

开放目录 `r` 权限，只能读取目录结构列表而无法读取目录下具体文件，需开放 `x` 权限，他人才能读取目录下文件。



## 进程管理 17章

|||
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

`df` -- display free disk space
  * `-h` 以人类易读的格式展现 K M G
  * `-T` 打印磁盘格式

#### `du -hd1 /home` 统计目录下文件磁盘占用

`du` -- display disk usage statistics 递归列出某个目录下的所有文件的空间占用
  * `-h` 以人类易读的格式展现 K M G
  * `-d{N} --max-depth=N` 指定递归显示的最大层级 N
  * `-s` 等同于 `-d 0`，只查看指定的 entry 的 size



## 其他命令

```
$ less /proc/cpuinfo  # 查看 CPU 信息，通过伪文件系统提供了一种与进程 process 沟通的机制
$ less /proc/meminfo  # 查看内存信息
$ df -h    # 查看文件系统磁盘使用情况 disk space usage of file system
$ ip addr  # 查看 IP 信息，原先的 ifcongfig 将废弃
$ top      # linux下的任务管理器 h 帮助 q 退出 k+PID 结束进程 table of process
```


