# Windows 配置


### hosts 设置

hosts 是电话簿，DNS 是114查号台，404是空号或错号，如果你有了电话簿，就不需要查号，直接拨对方号码，这就是 hosts 的作用。

```bash
# Windows
$ notepad C:\WINDOWS\system32\drivers\etc\hosts  # 改配置
$ ipconfig /flushdns                             # 清操作系统缓存

# Linux
$ vim /etc/hosts
$ sudo systemctl restart NetworkManager
```

```text
127.0.0.1    a.com    # 访问 a.com 时访问映射地址ip 127.0.0.1
```


