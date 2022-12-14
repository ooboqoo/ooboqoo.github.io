# 运维笔记

### `npm install` ends with "Killed"

分析：发现该问题是由于内存不足导致的，排查发现服务器未启用 swap。swap 相当于 Win 下的虚拟内存，一般情况下是建议开启的，但鉴于 swap file 或 swap partition 会加速 SSD 的老化，所以才默认没有开启。

```
$ sudo dd if=/dev/zero of=/var/swap.1 bs=1M count=1024  # 创建文件
$ sudo mkswap /var/swap.1                               # 格式化
$ sudo swapon /var/swap.1                               # 立即启用
$ free -m
$ vim /etc/fstab                                        # 配置开机加载
  # 添加一行 /var/swap.1  none  swap  sw  0  0

# 其他有用的命令
$ swapon    # 检查 swap 使用情况
$ free -m   # 检查 swap 使用情况
$ df -h     # 检查磁盘使用情况(看剩余空间)

# 示例2
$ sudo fallocate -l 2G /var/swapfile  # 新建一个 swap 文件并立即分配空间 fallacate = f + allocate
$ sudo 600 /var/swapfile              # 出于安全考虑，应禁止其他用户读取 swap 文件
$ sudo mkswap /var/swapfile           # 将文件格式化成 swap 格式
$ sudo swapon /var/swapfile           # 立即启用新建 swap 文件
```

### `find` 删除过期文件

```bash
# 查找 30 天内没修改过的文件
$ find /var/log -type f -mtime +30 -print

# 删除 30 天内没修改过的文件(以下三选一)
$ find /var/log -type f -mtime +30 -delete
```

#### `find` 用法

```
find [-H] [-L] [-P] [-D debugopts] [-Olevel] [starting-point...] [expression]
```

An expression is composed of a sequence of things: Tests, Actions, Global options, Positional options, Operators.

```
# TESTS
  +n     for greater than n,
  -n     for less than n,
   n      for exactly n.

  -atime  Last Access Time
  -ctime  Last Change Time
  -mtime  Last Modify Time

  -{a,c,m}time <n>       n * day
  -{a,c,m}newer <file>   compare with file
  -{a,c,m}min <n>        n * minutes

  -type
  -name
```

```
# ACTIONS
  -delete
  -exec command ;
  -exec command {} +
```






