# Windows 配置


### hosts 设置

DNS 是 114 查号台，404 是空号，如果你有了电话簿就不需要查号，直接拨对方号码即可，这就是 _hosts_ 的作用。

```bash
# Windows
$ notepad C:\WINDOWS\system32\drivers\etc\hosts  # 改配置
$ ipconfig /flushdns                             # 清操作系统缓存

# Linux
$ vim /etc/hosts
$ sudo systemctl restart NetworkManager
```

```text
127.0.0.1    a.com              # 访问 a.com 时访问映射地址ip 127.0.0.1
127.0.0.1    abc.com def.com    # 多个网址映射到一个 IP 时可这么写
```


### 定时任务跑 .sh 脚本

只要 Windows 下安装了 Cygwin 就可执行 .sh 脚本。搜索并打开任务计划程序，按提示设置即可。

如果只是开机启动还有个更简单的方法: Win+R, 然后将脚本扔进去就行。

_runtask.sh_

```bash
#!/bin/bash
printf "abc123\n" >> /d/test.txt
```

