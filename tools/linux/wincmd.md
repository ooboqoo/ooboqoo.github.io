# Windows 命令行

## 常用命令

#### `where` 查找命令位置


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

xterm 开启256色

现在的终端模拟器早就支持256色了，不过默认可能还是8色的。

```
~/.bashrc文件添加
if [ "$TERM" == "xterm" ]; then
export TERM=xterm-256color
fi

$ echo $TERM  // 验证是否设置成功
xterm-256color
```

vim 开启256色支持

编辑 ~/.vimrc 文件，添加 `set t_Co=256` t_Co 即 terminal Color 之意。


## cmder

Yeoman 推荐的，确实好用。

Cmder 是 windows 下的命令行模拟器，不仅能模拟 cmd 而且还自带了 Git Bash，修补了 Bash 的不足，且界面设置也很 sexy。

各选项过一遍，调整下，方便的，其实也不用怎么调整，初始目录、提示符、标题栏、状态栏 等之类的调下就好。

关于提示符：设置在 `config -> user-startup.cmd`，用法见`help prompt`，另外，作者的 cmder.lua 脚本写得有问题，直接删除或改名即可。

配置备份：直接拷贝 config 文件夹没效果，需要 `settings -> export` 然后再导入才有效。

字体颜色设置在 `Features > Colors` 直接是一个颜色面板，很方便。

`Startup > Tasks` 可以设置任务列表，通过勾选默认任务可以设定点击加号出来的任务，而启动时的任务设置在 `Startup`

`` Ctrl+` `` 会调出 cmder，但这会影响到其他编辑器，可以考虑改下快捷键 `Keys & Macro`

### 终端访问外网走代理

```bash
$ set http_proxy=http://127.0.0.1:1080   # bash 的 export 无效，所以用 set
$ set https_proxy=http://127.0.0.1:1080  # http 和 https 需要分别设置
  # 走 ss 代理，此命令只对当前终端有效，且关闭后即失效。
  # 如果希望避免每次都输入，可以在 cmder “Settings -> Environment” 下设置
```
