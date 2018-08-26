# 运维笔记

### `npm install` ends with "Killed"

分析：发现该问题是由于内存不足导致的，排查发现服务器未启用 swap

```
$ sudo dd if=/dev/zero of=/var/swap.1 bs=1M count=1024  # 创建文件
$ sudo mkswap /var/swap.1                               # 格式化
$ sudo swapon /var/swap.1                               # 立即启用
$ free -m
$ vim /etc/fstab                                        # 配置开机加载
  # 添加一行 /var/swap.1  none  swap  sw  0  0
```

