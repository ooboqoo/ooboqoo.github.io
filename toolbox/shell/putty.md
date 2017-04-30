# putty 使用笔记

## PuTTY 自动登录

### 使用密钥自动登录

参考文章：http://www.laozuo.org/2811.html

##### 第一步、生成密钥
puttygen.exe 可以生成密匙对，但服务器不一定认，所以推荐直接使用 VPS 远程设置密钥，然后下载到本地。   
登陆到 ssh 之后，先输入 `ssh-keygen -t rsa` 生成秘钥对。然后下载 root/.ssh 目录中的 id_rsa 和 id_rsa.pub 到本地保存。

##### 第二步、修改 sshd 配置文件
1. 将 root/.ssh 中的 id_rsa.pub 修改名字为 authorized_keys 并且用 chmod 600 authorized_keys 设置权限。
2. 找到 /etc/ssh/sshd_config，把 RSAAuthentication 和 PubkeyAuthentication 两行前面的#注释去掉，保存并重启 sshd 使更改生效（这步可以省略，因为不去注释，默认也是开的）。

##### 第三步、客户端配置密钥
使用 puttygen.exe 载入密钥并保存为 putty 格式的私钥。

注：使用 puttygen.exe -> Conversions -> Export OpenSSH key 可以将 .ppk 格式的私钥转换回 id_rsa

##### 第四步、设置 putty 认证链接并登录
在 `Setting->Connection->SSH->Auth->Authentication parameters` 下选择秘钥文件。

##### 第五步、再次修改 sshd 配置文件
修改 /etc/ssh/sshd_config 文件中找到 PasswordAuthentication 后面的 yes 改成 no，然后重启 sshd。这样即便他人知道我们的 root 密码也无法登陆，只要保护好本机秘钥文件，你的 VPS 就相对足够安全。

### VPS 重装后的快速恢复

使用 putty 的 pscp 工具 ，或者 linux 的 scp 命令上传秘钥文件到 /root/.ssh，不用设置就可以登录。

```nohighlight
scp -P 28379 "\Program Files\putty\authorized_keys" root@104.128.85.201:/root/.ssh/authorized_keys
```

### 用快捷键方式实现自动登陆

格式: `putty.exe -ssh -P telport -pw password [user@]host`

建立到 putty 执行文件的快捷方式 PuttyBWH, 并将"目标"栏修改为如下内容:

```nohighlight
"D:\Program Files\putty.exe" -ssh -P 28191 -pw qH4NQOej0oBO root@45.78.32.152
```

## 怎样配置和保存设置

1, "Setting->Window->Translation" 下设置字符编码为 UTF-8 可解决中文乱码问题

2, "Setting->Window->Appearance" 下可以修改光标显示方式以及界面字体

3, "Setting->Window->Colours" 下可以修改背景色\前景色, 让眼睛看着更舒服些

4, "Session" Load 某个配置名称, 或输入新名称, 然后点 Save, 让之前的设置生效. 不然关闭后再打开, 原先的设置又变回去了

5, PuTTY 的配置保存在注册表里, 如果需要备份, 可以用 regedit 找到 "HKEY_CURRENT_USER >>Software>>SimonTatham" 右击并选择导出以完成备份。

## 实现 windows 和 linux 互传文件

这里有详细介绍：http://os.51cto.com/art/201103/251081.htm

先用 putty 登入远程主机，然后在 cmd 窗口输入命令：

```nohighlight
 pscp aaa.jpg root@192.168.0.101:/home  // 将aaa.jpg 传到 /home下
```

从 linux 取回文件：

```nohighlight
 pscp root@192.168.0.100:/home/aaa.jpg G:/putty/
```

## ConEmu, cygwin 下设置 ssh 自动登录

`C:\Users\Gavin` 即相当于 linux 下的 `/root` 目录，所有配置文件默认都放在这个文件夹下。

`C:\Users\Gavin\.ssh` 已经配置好自动登录相关密匙和配置，换电脑的话，只需拷贝此文件夹即可。

```txt
.ssh
  |- config   # ssh 配置
  |- id_rsa   # 私秘文件
```

```bash
# See ssh_config(5) for more information.

Host *
     Protocol 2
     TCPKeepAlive yes
     ServerAliveInterval 15
     ServerAliveCountMax 4
     Compression yes
  # persist connection for scp
     ControlPersist 1h
  # multi-link share
     ControlMaster auto
  # ssh will load this key by default, remove the '#' when using other key name
     # IdentityFile ~/.ssh/id_rsa

Host centos
     HostName 104.128.85.201
     Port 28379
     User root

Host jpn
     HostName 45.32.60.84
     Port 3300
     User root
```

完成以上配置后，输入以下命令登录：

```bash
$ ssh centos  # 配置好后，登录就是这么简单
$ ssh -p 28379 root@104.128.85.201  # 在没有配置过的电脑采用密码登录
```


## 使用技巧

##### 如何使用鼠标执行复制和粘贴操作
在 `Setting->Window->Selection` 下设置, 默认是:鼠标左键拖动完成选择+复制, 鼠标右键粘贴

##### 解决 putty 连接频繁断开问题
在 Connection 下设置 keepalive 的秒数，并开启 so_KEEPALIVE

##### putty 全屏模式与退出
"Setting->Window->Behaviour-> Full screen on Alt-Enter" 打钩，就可以用 Alt+Enter 切换全屏了。

##### 解决 putty 上 vim 小键盘不好使的问题
在选项 Terminal->Features 里，找到 Disable application keypad mode，选上就可以了。
