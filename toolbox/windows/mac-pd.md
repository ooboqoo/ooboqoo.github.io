# Mac + Parallel Desktop


## Parallel

### 网络配置

1. 网络模式选择默认的「共享网络 Shared Network」
2. 新增端口映射 2222 -》22

### headless 模式

在 Parallels Desktop GUI 里：

1. 选中你要运行的虚拟机
2. 打开 Configure（配置）
3. 进入 Options → Startup & Shutdown
4. 选择：
    * Custom
    * 在 Startup View 选项里选择 Headless
    * 启用 “Start automatically” 或设置在 Mac 启动时自动运行（可选）

这样 VM 就可以在后台运行，而不会弹出窗口。


## windows 启用 OpenSSH Server

Windows 打开「PowerShell 管理员」

安装 OpenSSH Server

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

启动 SSH 服务 + 设置开机自启

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

确认 sshd 服务状态（状态应为 Running）

```powershell
Get-Service sshd
```

配置防火墙

```powershell
# 删除旧的错误规则（如果有）
Get-NetFirewallRule -DisplayName "*SSH*" | Remove-NetFirewallRule

# 新建最稳妥的规则
New-NetFirewallRule `
  -Name "Allow-SSH-22" `
  -DisplayName "Allow SSH 22" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 22 `
  -Action Allow `
  -Profile Any
```

后续如果碰到 ssh 连不上的情况，还可以直接关闭防火墙试试

```powershell
netsh advfirewall set allprofiles state off
```

### 配置秘钥登录

### 配置 sshd

明确启用公钥认证

```powershell
notepad C:\ProgramData\ssh\sshd_config
```

找到这一行，去掉 # 号

```txt
#PubkeyAuthentication yes
```

### 添加公钥

首先确定登录的用户是否是 Administrators 组成员
* 如果是，添加公钥到 C:\ProgramData\ssh\administrators_authorized_keys 文件
* 如果不是，添加公钥到 ~/.ssh/authorized_keys

### macOS 端设置

略


## macOS 端连接

```bash
# 使用密码登录
ssh -p 2222 你的windows用户名@127.0.0.1

# 使用秘钥登录
ssh -i ~/.ssh/id_ed25519 -p 2222 你的windows用户名@127.0.0.1
```

### 启动直接开 pwsh

```powershell
notepad C:\ProgramData\ssh\sshd_config
```

填入以下内容（注意，需要先安装 PowerShell 7）

```txt
ForceCommand "C:\Program Files\PowerShell\7\pwsh.exe"
```

然后重启 SSH 服务

```powershell
Restart-Service sshd
```


