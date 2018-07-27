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
| `tx` / `Tx` | 
| `;`  / `,`  | 重复前一个 f F t T 操作，`,` 为反向操作

|||
|:----------|:-------------------------------------
| `%`       | 跳到与当前括号相匹配的括号
| `{` `}`   | 在段落、函数、块间跳转

滚动屏幕

|||
|:------------------------|:-------------------------------------
| `zz`                    | 移动屏幕使光标居中
| `Ctrl`+`e` / `Ctrl`+`y` | 滚动一行，光标不动。`e` 可记为 Extra，`y` 就是死计了
| `Ctrl`+`b` / `Ctrl`+`f` | 滚动一屏
| `Ctrl`+`d` / `Ctrl`+`u` | 滚动半屏

### 选择文本

|||
|:-----------|:-------------------------------------
| `v`, `V`   | `v` 是行内选择；`V` 是行选择
| `Ctrl`+`v` | Visual Block 块选择，按 `I` 或 `A` 进入多光标编辑模式

注：进入多光标编辑模式时，只会在首行显示输入内容，编辑完成后按 esc 键才能看到效果。想删除的话，会直观很多，选中直接 x。

|||
|:------|:-----------------------
| `o`   | 在选择块两头跳转

|||
|:------|:-----------------------
| `aw`  | a word
| `ab`  | a block with ()
| `aB`  | a block with {}
| `ib`  | inner block with ()
| `iB`  | inner block with {}

#### 查找与替换

|||
|:----------|:-------------------------------------
| `/word`   | 向下查找字符串 word
| `?word`   | 向上查找字符串 word
| `n`, `N`  | `n` 查找下一个，`N` 向前查找，使用 `n` 和 `N` 配合查找是很有帮助的
| `:noh`    | 清理高亮显示 no highlight
| `:n1,n2s/old/new`  | 在 n1 与 n2 行之间查找 old，并用 new 替换 **每行 首次** 出现的 old

```txt
# s substitute 替换；g global 多项匹配; c confirm 须确认
:1,$s/old/new/gc     # 替换全文中的 "old" 为 "new"，需要确认
:s/^/new /           # 在当前行首插入 "new "
:s/green/bright &/g  # 将当前行中所有 "green" 替换为 "bright green"
```

注：在 Visual 模式下直接 `:s/old/new/` 会替换选中部分中所有 "old" 为 "new"。

#### 剪切、复制、粘贴

正常模式下

|||
|:-----------|:-------------------------------------
| `nx`, `nX` | x 向后删除一个 / n个字符，X 向前删除一个字符
| `ndd`      | 删除(剪切)整行 / n行 delete
| `d1G` `dG` `d0` `d$` `dw` | 结合定位符快速删除(剪切)多行或多个字符
| `nyy`      | 复制整行 / 向下复制 n行 yank 拉,拽
| `y1G` `yG` `y0` `y$` `yw` | 结合定位符快速复制多行或多个字符
| `p`, `P`   | p 在光标后粘贴，P 在光标前粘贴

可视化模式下

|||
|:--------|:-------------------------------------
| `<` `>` | 缩进调整
| `y`     | 复制
| `d`     | 删除
| `~`     | 大小写切换

#### 操作

|||
|:-----------|:-------------------------------------
| `J`        | 将前后两行拼接成一行 join
| `u`        | 还原。复原前一个操作 undo
| `[Ctrl]+r` | 重做。重做上一个操作 redo
| `n.`       | 再做。小数点符号，重复前一个操作1次/n次


#### 进入编辑模式

|||
|:----------|:-------------------------------------
| `i`, `I`  | 进入插入模式 insert，`i` 在光标处插入，`I` 在行首非空格处开始插入
| `a`, `A`, `ea` | 进入插入模式 append，`a` 在光标后插入，`ea` 在单词末尾插入，`A` 在行尾插入
| `o`, `O`  | `o` 另起一行插入，`O` 行前插入
| `r`, `R`  | 进入替换模式 replace
| `[Esc]`   | 退出编辑模式

#### 命令行模式命令

|||
|:----------------|:-------------------------------------
| `:wq!`          | 保存后退出，有异常不提醒
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
|:----------|:-------------------------------------
| `:tabe [filepath]` | 创建空白标签页，或在新标签中打开 filepath
| `:tabp` `:tabn`    | 在标签之间跳转
| `gt` `gT` `{i}gt`  | 一般模式下在标签之间跳转
| `:tab help`        | 在新标签页打开帮助文档

#### 多窗口操作

|||
|:----------|:-------------------------------------
| `:sp [filename]` / `:vsplit`  | 水平分割窗口，如提供 filename 则新窗口显示该文件。vsplit 为垂直分割
| `[Ctrl]+w+` h/j/k/l ←/↓/↑/→ q | 按下该组合键后松开，就可以用方向键在窗口之间移动。q 为关闭窗口。


## 配置

```txt
set t_Co=256        " 256 color support
set tabstop=4       " The width of a TAB is set to 4. Still it is a \t.
set shiftwidth=4    " Indents will have a width of 4
set softtabstop=4   " Sets the number of columns for a TAB
set expandtab       " Expand TABs to spaces
set list            " Display invisible characters
set listchars=tab:\|-,trail:~,extends:>,precedes:<  " :help listchars - for details
hi SpecialKey ctermfg=7  " :help hi - for details of highlight
```

`"` 此文件中的双引号为注释符号，set 前面 `:` 有没有都一样，一般都不加。 

## 使用笔记

#### vim 共分3种模式：

* 一般模式，默认模式，移动光标，执行删除、复制、粘贴等操作
* 编辑模式，一般模式下按 `i` `I` `o` `O` `a` `A` `r` `R` 中的任何一个字母后进入编辑模式，按 [Esc] 回到一般模式
* 命令模式，一般模式下按 `:` `/` `?` 中的任何一个进入命令模式

#### vim 环境设置与记录

`~/.viminfo` 记录了操作记录，vim 会自行创建并利用此文件。

`/etc/vimrc` 放置了整体 vim 的设置值，不建议修改此文件。

`~/.vimrc` 一般是不存在的，如果你要配置，得手动创建。

#### 正则替换中的大小写转换

`\U` 全部转换为大写
`\u` 仅首字母转换为大写
`\L` 全部转换为小写
`\l` 仅首字母转换为小写
`\e` 停止转换工作

```
:s/\(.*\) \(.*\)/\U\1\e \2/  // 将第一个词转换为大写形式
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



