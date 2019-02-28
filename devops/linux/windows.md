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


