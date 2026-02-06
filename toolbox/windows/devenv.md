# 搭建开发环境


## 科学上网

https://github.com/2dust/v2rayN


## 终端

> 能在 wsl 下操作的就在 wsl 下操，目录可以切到 windows 的目录的
> 必须要在 Windows 下开发的，终端先用 PowerShell，碰到缺命令时，再 bash 切到 wsl 下操作

* WindowsTerminal
* WSL + oh-my-zsh
* PowerShell + on-my-posh3

待参考文章
* https://zhuanlan.zhihu.com/p/137595941
* https://zhuanlan.zhihu.com/p/272082726


## Windows Terminal

https://github.com/microsoft/terminal

Windows Terminal 是一个图形界面，用于跑 cmd、PowerShell、bash 等「命令行 Shell」。


## PowerShell

* PowerShell 是基于 *.NET 对象* 的现代 Shell（不是 cmd 的升级版）（是 .NET API 的命令行外壳）
* PowerShell 默认给你保留了大量 bash alias（ls / cp / mv / rm 都能用）

| Bash            | PowerShell
|-----------------|------------------------|
| 一切都是文本流    | 一切是对象流（.NET对象）
| 管道传字符串      | 管道传对象
| 命令是程序        | 命令大多是 Cmdlet（`动词-名词`）
| 脚本能力强        | 脚本能力非常强

PowerShell 管道里的是「对象」，如 `Get-Process` 返回进程对象，这是 PowerShell 跟 cmd / bash 的本质分水岭。


一些非常有用的 Tips
* 遇到命令先 `Get-Help Get-ChildItem -Examples`
* 善用 `Get-Member` 查看命令有哪些属性和方法 `ls | Get-Member`
* Tab 自动补全，及其强，参数也能补全 `ls -<Tab>`
* `Ctrl+R` 搜索历史

### 安装 PowerShell7

https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows

Windows 自带的是 *Windows PowerShell 5.x（通常指 5.1）*，建议安装最新的 *PowerShell 7（简称 PS 7）*。

```powershell
winget install --id Microsoft.PowerShell --source winget
```

### 必要设置

设置常用 alias (.ps1)

```powershell
Set-Alias ll Get-ChildItem
Set-Alias grep Select-String
```

### oh-my-posh

https://ohmyposh.dev/docs/installation/windows

```
# 安装 oh-my-posh3，手动安装，不要用 winget 安装，安装路径不一样，问题多
# winget install JanDeDobbeleer.OhMyPosh --source winget

# 安装字体 (选个简单的主题就不需要这玩意了)
oh-my-posh font install meslo

# Windows Terminal 配置字体 `"face": "MesloLGM Nerd Font"`

# 配置启动 oh-my-posh
notepad $PROFILE
    # 报错就先执行
    New-Item -Path $PROFILE -Type File -Force
    # 填入一下内容
    oh-my-posh init pwsh | Invoke-Expression
```

配置主题

注意：PS7 和 PS5 是可以共用 on-my-posh 的，但两者需要单独配置 `$PROFILE` 文件。

```powershell
notepad $PROFILE
```

```txt
oh-my-posh init pwsh --config 'C:\Users\gavin\AppData\Local\Programs\oh-my-posh\themes\huvix.omp.json' | Invoke-Expression
```


### Bash -> PowerShell 高频命令对照

基础文件操作

| Bash       | PowerShell
|------------|------------------------|
| ls         | ls / Get-ChildItem
| ls -la     | ls -Force
| cd         | cd
| pwd        | pwd / Get-Location
| cp a b     | cp a b
| mv a b     | mv a b
| rm a       | rm a
| rm -rf dir | rm dir -Recurse -Force
| mkdir dir  | mkdir dir

查看文件内容

| Bash        | PowerShell
|-------------|---------------------------------|
| cat file    | cat file
| less file   | less file
| tail -f log | Get-Content log -Wait
| head -n 10  | Get-Content file -TotalCount 10





## WSL






### FAQ

【Q】 如何重启
【A】 先关闭 `wsl --shutdown` 再启动

【Q】 WSL 在后台跑耗性能么
【A】 




## 开发软件安装

Git

手动下载安装 https://git-scm.com/download/win

Bun

```powershell

```


Python + uv

```powershell
irm https://astral.sh/uv/install.ps1 | iex
# 安装完成后重开一个 pwsh
uv --version
```

make

```powershell
# 先安装 Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
irm https://community.chocolatey.org/install.ps1 | iex

# 再安装 make
choco install make -y
make --version
```




## 其他软件

https://www.zhihu.com/question/469450888/answer/1899922634814255321

Snipaste



