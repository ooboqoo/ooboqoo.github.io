# Windows 命令行


## 常用命令

https://ss64.com/nt/

```bash
$ explorer  # 资源管理器
$ start iexplore  # 打开 IE，注意直接打 iexplore 没用，而且注意最后不带 r
$ notepad   # 打开记事本
$ calc      # 计算器
$ regedit   # 注册表编辑器

$ where     # 查找命令位置
$ ipconfig  # 显示本机网络信息
$ netstat -n  # 查看端口占用

$ start /b 服务名  # 在后台运行服务
$ mklink /h <destination> <source>  # 带 /h 建立硬连接，不带则建立软连接

$ tasklist  # 获取当前任务列表
$ taskkill /f /im notepad.exe /t  # 强制结束记事本及其子进程
```

#### `mstsc` 远程桌面

远程登陆首先要创建用户，其次要赋予用户远程登陆的权限，而且电脑要开启远程登陆。

`mstsc` 是 windows 自带的远程桌面连接工具，需用 ip 来进行连接，然后输入用户名和密码才能进入。当然对方的电脑需要允许远程，设置方法是对方 “我的电脑”--“属性”--“远程” 中勾选远程协助和远程桌面两个复选框就可以了，特别是 “允许用户远程连接到此计算机” 一定要选上，在其中也可以设置允许远程的用户。

#### `cmd`

按住 Shit 键，右键可以找到 "点击此处打开命令提示符"

## 使用变量

```bash
set "name=张三"
echo %name%
```

cmder 设置变量在 `Startup -> Environment`


## Git Bash

##### 右键点击 xterm 标题栏可设置项:

字体，前景色，背景色，终端选择等

##### Git/etc/bash.bashrc 设置:

* 调整终端颜色
* 开启 DIR_COLORS 项目，并设置 Git/etc/DIR_COLORS
* 自定义 prompt

##### Git Bash 的不足

* 在使用中，一些要求在 cmd 环境下操作的命令无法使用
* 无法显示进度条等内容

#### 开启 xterm 终端 256色 和 终端下 vim 256色

相同的 colorschema, vim 和 gvim 的颜色差距还是很大的，因为 gvim 使用 X 的颜色，而 vim 只能使用终端提供的颜色，所以造成了二者的显示差异。

##### xterm 开启256色

现在的终端模拟器早就支持256色了，不过默认可能还是8色的。

```
~/.bashrc文件添加
if [ "$TERM" == "xterm" ]; then
export TERM=xterm-256color
fi

$ echo $TERM  // 验证是否设置成功
xterm-256color
```

##### vim 开启256色支持

编辑 ~/.vimrc 文件，添加 `set t_Co=256` t_Co 即 terminal Color 之意。


## Cmder

Cmder 把 ConEmu，Git for Windows 和 clink 打包在一起，让你无需配置就能使用一个真正干净的 Linux 终端！她甚至还附带了漂亮的 monokai 配色主题。作为一个压缩档的存在, 解压即用。

It is based on ConEmu with major config overhaul, comes with a Monokai color scheme, amazing clink (further enhanced by clink-completions) and a custom prompt layout.

### 项目文档结构

```txt
Cmder
  |- bin          # 此处可放自己的命令文件，用于在终端内调用
  |- config       # 配置文件都放在这，不应该去修改 vendor 下的配置文件
  |- icons        # 图标文件
  |- vendor       # Cmder 整合的项目
  |    |- conemu-maximus5
  |    |    \- ConEmu.xml      # 这个文件保存了 ConEmu 的完整配置，换电脑时复制这个就行
  |    |- clink                # 
  |    |- clink-completions    # 
  |    |- git-for-windows      # 
  |    |- psmodules            # PowerShell 模块目录
  |    |- cmder_exinit         # Cmder 初始化脚本
  |    |- clink.lua            # clink 初始化脚本
  |    |- init.bat             # cmd 初始化脚本
  |    \- profile.ps1          # PowerShell 初始化脚本
  \- Cmder.exe
```

### 配置

参考文档：http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/

Cmder 是 windows 下的命令行模拟器，不仅能模拟 cmd 而且还自带了 Git Bash，修补了 Bash 的不足，且界面设置也很 sexy。

各选项过一遍，调整下，方便的，其实也不用怎么调整，初始目录、提示符、标题栏、状态栏 等之类的调下就好。

#### 中文乱码

在 `Settings > Startup > Environment` 中添加一行

```bash
set LC_ALL=en_US.UTF-8
```

#### 修改提示符

`vendor/clik.lua` 配置的自定义 prompt 功能增强会导致终端字符宽度计算问题，建议将颜色定义的东西全部去掉。原因分析：应该是 bash 中的 `\[ \]` 无法使用，因为原 `\e` 这里用的 `\x1b`。另外，作者的 cmder.lua 脚本写得有问题，直接删除或改名即可。

目前用的 prompt 配置文件 config/prompt.lua

```lua
local function set_prompt_filter()
    local cmder_prompt = "\x1b[0;32m{cwd}\x1b[0m $ "
    clink.prompt.value = string.gsub(cmder_prompt, "{cwd}", clink.get_cwd())
end
clink.prompt.register_filter(set_prompt_filter, 1)
```

#### 字体颜色

字体颜色设置在 `Features > Colors` 直接是一个颜色面板，很方便。

#### 任务列表

`Startup > Tasks` 可以设置任务列表，通过勾选默认任务可以设定点击加号出来的任务，而启动时的任务设置在 `Startup`

#### 系统相关

* 快捷键：`` Ctrl+` `` 会调出 cmder，但这会影响到其他编辑器，可以考虑改下快捷键 `Keys & Macro`，如改为 `` Win+` ``
* 任务栏图标：固定到任务栏，tabs 图标不显示 -- 通过 exe 创建快捷方式，然后再将快捷方式固定到任务栏即可
* 添加到右键菜单：`Cmder.exe /REGISTER ALL`
* 管理员权限：右键任务栏图标 -> 右键 Cmdeer.exe -> 以管理员身份运行

#### 配置备份

备份可以直接拷贝 vendor\conemu-maximus\ConEmu.xml，或者执行 `settings -> export` 然后再导入。

#### 其他

`Ctrl+Tab` 在标签中切换；`Ctrl+num` 切换到 num 数字对应的标签页。

### 问题解决

[Aliases do not work under Win10 1703](https://github.com/cmderdev/cmder/issues/1325)

### 终端访问外网走代理

```bash
$ set http_proxy=http://127.0.0.1:1080   # bash 下用 export，Win 下用 set
$ set https_proxy=http://127.0.0.1:1080  # http_proxy 不来的话再试下 https_proxy ALL_PROXY
  # 走 ss 代理，此命令只对当前终端有效，且关闭后即失效。
  # 如果希望避免每次都输入，可以在 cmder “Settings -> Environment” 下设置
```
