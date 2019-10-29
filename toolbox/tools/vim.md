# VIM

http://linux.vbird.org/linux_basic/#part3   
https://zh.wikipedia.org/wiki/ASCII

## 按键说明

Vim Cheat Sheet https://vim.rtorr.com/

### 移动光标

|||
|:----------|:-------------------------------------
| `h` / `←` | 光标左移一个字符
| `j` / `↓` | 光标下移一个字符
| `k` / `↑` | 光标上移一个字符
| `l` / `→` | 光标右移一个字符
| `w` / `W` | 光标右移到下一词首，w 标点符号算单独词，W 标点符号算一个词的一部分
| `e` / `E` | 光标右移到下一词尾
| `b` / `B` | 光标左移到下一词首
| `nh` `nj` `nk` `nl`  | 一次移动 n 行，如 `30j` 一次向下移动 30 行
| `0` / `^` / `[Home]` | 光标移动到行首，`0` 为绝对行首 `^` 为非空白行首
| `$` / `[End]` | 光标移动到行尾
| `n[Space]`    | 光标向右移动 n 个字符
| `n[Enter]`    | 光标下移 n 行
| `G`           | 移动到文件的最后一行
| `nG`          | 移动到第 n 行
| `gg` / `1G`   | 移动到文件的第一行

|||
|:------------|:-------------------------------------
| `fx` / `Fx` | 定位到行内下(F 前)一个 `x` 字符
| `tx` / `Tx` | 定位到行内下(F 前)一个 `x` 字符, 并后退1格
| `;`  / `,`  | 重复前一个 f F t T 操作，`,` 为反向操作

|||
|:-----------|:-------------------------------------
| `%`        | 跳到与当前括号相匹配的括号
| `{`, `}`   | 在段落、函数、块间跳转
| `H`        | 移动到屏幕顶部 High
| `M`        | 移动到屏幕中间 Middle
| `L`        | 移动到屏幕底部 Low

滚动屏幕

|||
|:------------------------|:-------------------------------------
| `zz`                    | 移动屏幕使光标居中
| `[Ctrl]+e` / `[Ctrl]+y` | 滚动一行，光标不动。`e` 可记为 Extra，`y` 就是死计了
| `[Ctrl]+b` / `[Ctrl]+f` | 滚动一屏
| `[Ctrl]+d` / `[Ctrl]+u` | 滚动半屏

### 选择文本

|||
|:-----------|:-------------------------------------
| `v`, `V`   | `v` 是行内选择 Visual Mode；`V` 是行选择 Visual Line Mode
| `[Ctrl]+v` | Visual Block Mode 块选择，按 `i` 或 `a` 进入多光标编辑模式

注：进入多光标编辑模式时，只会在首行显示输入内容，编辑完成后按 esc 键才能看到效果。删除时不会有这样的问题。

|||
|:------|:-------------------------------
| `aw`  | a word and whitespace after
| `aW`  | a word (including punctuation) and whitespace after
| `ab`  | a block with ()
| `aB`  | a block with {}
| `iw`  | word
| `iW`  | word (including punctuation)
| `ib`  | inner block with ()
| `iB`  | inner block with {}
|||
| `ip`  | current paragraph
| `ap`  | current paragraph and whitespace after
| `i<bracket>` | inside the matching brackets ``` '"`({[< ```
| `a<bracket>` | outside the matching brackets ``` '"`({[< ```
| `it`  | inside XML tag
| `at`  | outside XML tag
| `ii`  | inside indentation level
|||
| `o`   | 当有内容被选中时，在选择块两头跳转

### 查找与替换

https://vim.fandom.com/wiki/Search_and_replace

|||
|:-------------|:----------------------------------------------------------------------
| `/word`      | 向下查找字符串 word
| `?word`      | 向上查找字符串 word
| `\vpattern`  | very magic 模式，regx 表达式中的特殊字符不需要转义了
| `n`, `N`     | `n` 查找下一个，`N` 向前查找，使用 `n` 和 `N` 配合查找是很有帮助的
| `:noh`       | 清理高亮显示 no highlight
| `:n1,n2s/old/new`  | 在 n1 与 n2 行之间查找 old，并用 new 替换 *每行 首次* 出现的 old

```txt
# s substitute 替换；g global 多项匹配; c confirm 须确认
:%s/old/new/gc     # 替换全文中的 "old" 为 "new"，需要确认
:.,+2s/foo/bar/g   # 替换当前行和后2行中的 foo
:s/^/new /           # 在当前行首插入 "new "
:s/green/bright &/g  # 将当前行中所有 "green" 替换为 "bright green"
```

注：在 Visual 模式下直接 `:s/old/new/` 会替换选中部分中所有 "old" 为 "new"。

#### 大小写转换

`\U` 全部转换为大写
`\u` 仅首字母转换为大写
`\L` 全部转换为小写
`\l` 仅首字母转换为小写
`\e` 停止转换工作

```txt
:s/\(.*\) \(.*\)/\U\1\e \2/  # 将第一个词转换为大写形式
:%s/\vset(\w*)/set\u\1/g     # 将 setstate 等形式的字符串全部替换成 setState 这种形式
```

### 剪切、复制、粘贴

#### 正常模式下

|||
|:-----------|:---------------------------------------------------
| `nx`, `nX` | `x` 向后删除(剪切)一个 / n个字符，`X` 向前删除一个字符
| `ndd`      | 删除(剪切)整行 / n行 &nbsp; delete
| `d1G` `dG` `d0` `d$` `dw` | 结合定位符快速删除(剪切)多行或多个字符
| `c`, `C`   | 清除 clear，不会影响寄存器，其他同 `d`。`C` 删除到行尾
| `nyy`      | 复制整行 / 向下复制 n行 &nbsp; yank 拉,拽
| `y1G` `yG` `y0` `y$` `yw` | 结合定位符快速复制多行或多个字符
| `p`, `P`   | `p` 在光标后粘贴，`P` 在光标前粘贴 &nbsp; put
|||
| `:reg`     | 查看所有寄存器的内容
| `"+y`      | 复制到系统剪贴板, `+` 是系统剪贴板的 register 名
| `"+p`      | 粘贴系统剪贴板内容
| `"0p`      | 粘贴最近一次 `y` 的内容, 最近一次 `y` 的内容始终放在 `0` register 内

```txt
格式: [OPERATOR]<NUMBER>[MOTION]
示例:     d        2       w      // 连续删除两个单词
```

注：`x` 不会影响寄存器，操作单位为字符；`d` 为删除(剪切) `c` 为清除，`d` 会使用 `"` 寄存器；`y` 为复杂，会同时使用 `"` `0` 这两个寄存器。

移动行(上述命令的综合应用)

上移一行 `dd`+`kP` 或 `:move -1`  
下移一行 `dd`+`p` 或 `:move +1`

#### 可视化模式下

|||
|:---------|:-------------------------------------
| `<`, `>` | 缩进调整
| `y`      | 复制
| `d`      | 删除
| `~`      | 大小写切换

### 操作

|||
|:------------|:-------------------------------------
| `J`         | 将前后两行拼接成一行 join
| `u`         | 还原。复原前一个操作 undo
| `[Ctrl]+r`  | 重做。重做上一个操作 redo
| `.`, `{n}.` | 再做。小数点符号，重复前一个操作1次/n次

#### 进入编辑模式

|||
|:----------|:-------------------------------------
| `i`, `I`  | 进入插入模式 insert，`i` 在光标处插入，`I` 在行首非空格处开始插入
| `a`, `A`, `ea` | 进入插入模式 append，`a` 在光标后插入，`ea` 在单词末尾插入，`A` 在行尾插入
| `o`, `O`  | `o` 另起一行插入 open，`O` 行前插入
| `r`, `R`  | 进入替换模式 replace
| `[Esc]`   | 退出编辑模式

#### 命令行模式命令

|||
|:----------------|:-------------------------------------
| `:wq!`          | 保存后退出，有异常不提醒 &nbsp; write and quit
| `:w[filename]`  | 将文件另存到 filename
| `: !command`    | 暂时离开 vim 到命令行执行命令。例 `:! ls /home`

#### vim 环境的更改

|||
|:----------|:-------------------------------------
| `:set nu / nonu`        | 显示行号，或取消显示行号
| `:set hlsearch / nohlsearch`     | 查找匹配项高亮显示
| `:set autoindent / noautoindent` | 是否自动缩进
| `:set backup`           | 是否自动备份
| `:syntax on / off`      | 是否显示语法高亮
| `:set bg=dark / light`  | 显示色调选择
| `:set`     | 显示与系统默认值不同的环境参数设置
| `:set all` | 显示系统所有环境参数设置

#### 标签页操作

|||
|:--------------------|:----------------------------------------------
| `gt` `gT` `{n}gt`   | 一般模式下在标签之间跳转，如 `2gt` 跳到第二个标签页
| `:tabp` `:tabn`     | 在标签之间跳转
| `:tabmove {n}`      | 移动当前标签页到某个位置
| `:tabc` `:tabclose` | 关闭当前标签页
| `:tabo` `:tabonly`  | 关闭其他所有标签页
| `:tabe [filepath]`  | 创建空白标签页，或在新标签中打开 filepath
| `:tab help`         | 在新标签页打开帮助文档

#### 锚点操作

|||
|-----------|--------------------------
| `:marks`  | 显示当前文件中设置的所有锚点
| `ma`      | 设置一个叫 a 的锚点
| `` `a ``  | 跳到锚点 a
| `` y`a `` | 复制文本到锚点 a

#### 多窗口操作

|||
|:----------|:-------------------------------------
| `:sp [filename]` / `:vsp`     | 水平分割窗口，如提供 filename 则新窗口显示该文件。`:vsplit` 为垂直分割
| `[Ctrl]+w+` h/j/k/l ←/↓/↑/→ q | 按下该组合键后松开，就可以用方向键在窗口之间移动。`q` 为关闭窗口。


## VSCodeVim

#### 光标操作

因为禁用了 `[Ctrl]+v`，无法通过 Vim 操作进入块编辑模式，所以需要借助 VSCode 自身的多光标功能。

|||
|------------------|---------------------------------------------------
| `[CtrlCmd]+单击` | 添加一个光标(在原有光标点基础上，光标位置任意)
| `[Alt]+拖动`     | 在列方向上添加连续的光标(是新开一块区域，原有光标点取消)
| `opt+cmd+↑ / ↓` | 向上 或 向下添加多个光标， 发现在 INSERT 下无效，要切到 NORMAL 才行
|||
| `[Ctrl]+u`       | 取消一个光标操作，如果是单个光标点就会回退到上次光标位置
|||
| `CtrlCmd+d`       | 增加选中下一个匹配文本
| `CtrlCmd+F2`      | 选中当前页的所有匹配文本

#### 查找替换

不支持 `:%s/\vset(\w*)/set\u\1/g` 之类稍高级点的用法，也许可以通过配置解决，但最简单的用法，要么用 VSCode 自带查找替换功能，要么在编辑器中直接运行 `vim -c "%s/\vset(\w)/set\u\1/g" -c wq  myfile.js`。

#### 配置

```json
{
  "vim.startInInsertMode": true,
  "vim.mouseSelectionGoesIntoVisualMode": false,
  "vim.useCtrlKeys": false,  // 如果开启，就可以使用 Ctrl+V 进入 Visual Block Mode
  "vim.handleKeys": {
    "<D-c>": false,  // 解决 macOS 下复制会跳出插入模式
    "<D-v>": false   // windows 下要相应改成 <C-v>
  },
}
```


## 配置

_/etc/vimrc_ 或 _~/.vimrc_

```txt
set t_Co=256        " 256 color support
set tabstop=4       " The width of a TAB is set to 4. Still it is a \t.

set expandtab       " Expand TABs to spaces
set shiftwidth=2    " Indents will have a width of 2
set softtabstop=2   " Sets the number of columns for a TAB

set list            " Display invisible characters    unset `:set nolist`
set listchars=tab:\|-,trail:~,extends:>,precedes:<  " :help listchars - for details
hi SpecialKey ctermfg=7  " :help hi - for details of highlight
```

`"` 此文件中的双引号为注释符号，set 前面 `:` 有没有都一样，一般都不加。 


## 使用笔记

#### 查看帮助信息

```txt
:h shiftwidth
:help

$ vimtutor  # 直接在命令行敲此命令查看 Vim 自带的教程
```

#### vim 共分3种模式：

* 一般模式，默认模式，移动光标，执行删除、复制、粘贴等操作
* 编辑模式，一般模式下按 `i` `I` `o` `O` `a` `A` `r` `R` 中的任何一个字母后进入编辑模式，按 [Esc] 回到一般模式
* 命令模式，一般模式下按 `:` `/` `?` 中的任何一个进入命令模式

#### vim 环境设置与记录

`~/.viminfo` 记录了操作记录，vim 会自行创建并利用此文件。


## Plugin

手动安装 NERDTree 示例: 

```bash
$ git clone --depth 1 https://github.com/scrooloose/nerdtree.git ~/.vim/bundle/nerdtree
# https://stackoverflow.com/questions/8467424  `printf` has more consistent behavior than `echo -e`
$ printf "set runtimepath^=~/.vim/bundle/nerdtree\nmap <F3> :NERDTreeToggle<cr>" >> ~/.vimrc
```

### NERDTree

进入当前目录的树形界面，通过小键盘"上下"键，能移动选中的目录或文件。目录前面有"+"号，按Enter会展开目录，文件前面是"-"号，按Enter会在右侧窗口展现该文件的内容，并光标的焦点focus右侧。"ctr+w+h"光标focus左侧树形目录，"ctrl+w+l"光标focus右侧文件显示窗口。多次按"ctrl+w"，光标自动在左右侧窗口切换。光标focus左侧树形窗口，按"？"弹出NERDTree的帮助，再次按"？"关闭帮助显示。输入":q"回车，关闭光标所在窗口。

NERDTree 提供了丰富的键盘操作方式来浏览和打开文件，介绍一些常用的快捷键：
  * 和编辑文件一样，通过h j k l移动光标定位
  * 打开关闭文件或者目录，如果是文件的话，光标出现在打开的文件中
  * go 效果同上，不过光标保持在文件目录里，类似预览文件内容的功能
  * i和s可以水平分割或纵向分割窗口打开文件，前面加g类似go的功能
  * t 在标签页中打开
  * T 在后台标签页中打开
  * p 到上层目录
  * P 到根目录
  * K 到同目录第一个节点
  * J 到同目录最后一个节点
  * m 显示文件系统菜单（添加、删除、移动操作）
  * ? 帮助
  * q 关闭


## Vim 8

```bash
$ git clone https://github.com/vim/vim.git
$ cd vim
# 覆盖安装
$ ./configure  --enable-pythoninterp=yes  # 可能缺依赖 yum install ncurses-devel.x86_64
$ make && make install
$ cp src/vim /usr/bin
# 不覆盖安装
$ ./configure --prefix=$HOME/.local && make && make install
$ alias vim='~/.local/bin/vim'
$ echo "alias vim='~/.local/bin/vim'" >> ~/.bashrc

$ vim --version
```


## vimdiff

http://vimdoc.sourceforge.net/htmldoc/diff.html

```bash
$ vimdiff file1 file2 [file3 [file4]]
$ vim -d file1 file2 [file3 [file4]]
```

```txt
]c :        - next difference 下一个差异点
n]c                           跳转到下n个差异点
[c :        - previous difference 上一个差异点

do          - diff obtain 差异点复制到当前文件
dp          - diff put 差异点复制到另一文件
zo          - open folded text 展开折叠的行
zc          - close folded text 重新折叠
:diffupdate - re-scan the files for differences
```

### diff

http://sonack.top/2016/10/Git/how-to-read-git-diff.html



