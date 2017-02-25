# VIM

## 按键说明

移动光标的方法

| | |
|:----------|:-------------------------------------
| `h` / `←` | 光标左移一个字符
| `j` / `↓` | 光标下移一个字符
| `k` / `↑` | 光标上移一个字符
| `l` / `→` | 光标右移一个字符
| `nh` `nj` `nk` `nl`  | 一次移动 n 行，如 `30j` 一次向下移动 30 行
| `0` / `^` / `[Home]` | 光标移动到行首
| `$` / `[End]` | 光标移动到行尾
| `n[Space]`    | 光标向右移动 n 个字符
| `G`           | 移动到文件的最后一行
| `nG`          | 移动到第 n 行
| `gg` / `1G`   | 移动到文件的第一行
| `n[Enter]`    | 光标下移 n 行

查找与替换

| | |
|:----------|:-------------------------------------
| `/word`   | 向下查找字符串word
| `?word`   | 向上查找字符串word
| `n`, `N`  | n查找下一个，N向前查找，使用n和N配合查找是很有帮助的
| `:n1,n2s/old/new`  | 在 n1 与 n2 行之间查找 old，并用 new 替换 **每行 首次** 出现的 old
| `:1,$s/old/new/gc` | s substitute 替换；g global 多项匹配; c confirm 须确认

删除、复制与粘贴

| | |
|:-----------|:-------------------------------------
| `nx`, `nX` | x 向后删除一个 / n个字符，X 向前删除一个字符
| `ndd`      | 删除整行 / n行 delete
| `d1G` `dG` `d0` `d$` `dw` | 结合定位符快速删除多行或多个字符
| `nyy`      | 复制整行 / 向下复制 n行 yank 拉,拽
| `y1G` `yG` `y0` `y$` `yw` | 结合定位符快速复制多行或多个字符
| `p`, `P`   | p 在光标后粘贴，P 在光标前粘贴

操作

| | |
|:-----------|:-------------------------------------
| `J`        | 将前后两行拼接成一行 join
| `u`        | 还原。复原前一个操作 undo
| `[Ctrl]+r` | 重做。重做上一个操作 redo
| `n.`       | 再做。小数点符号，重复前一个操作1次/n次


进入插入或替换的编辑模式

| | |
|:----------|:-------------------------------------
| `i`, `I`  | 进入插入模式 insert
| `r`, `R`  | 进入替换模式 replace
| `[Esc]`   |  退出编辑模式

命令行模式命令

| | |
|:----------|:-------------------------------------
| `:wq!`    |  保存后退出，有异常不提醒
| `:w[filename]` | 将文件另存到filename
| `:!command`    | 暂时离开vi到命令行执行命令。例 :! ls /home

vi 环境的更改

| | |
|:----------|:-------------------------------------
| `:set nu / nonu`        | 显示行号，或取消显示行号
| `:set hlsearch / nohlsearch`     | 查找匹配项高亮显示
| `:set autoindent / noautoindent` | 是否自动缩进
| `:set backup`           | 是否自动备份
| `:syntax on / off`      | 是否显示语法高亮
| `:set bg=dark / light`  | 显示色调选择
| `:set`     | 显示与系统默认值不同的环境参数设置
| `:set all` | 显示系统所有环境参数设置

块操作

| | |
|:-----------|:-------------------------------------
| `v`, `V`   | v是字符选择，将光标经过的地方反白选择；V是行选择
| `[Ctrl]+v` | 块选择，可以用长方形的方式选择数据
| `y` | 复制反白选择内容
| `d` | 删除反白内容

多窗口操作

| | |
|:----------|:-------------------------------------
| `:sp[filename]` / `:vsplit` | 水平分割窗口，如提供 filename 则新窗口显示该文件。vsplit 为垂直分割
| `[Ctrl]+w+`                 | 按下该组合键后松开，就可以用方向键在窗口之间移动。


## 配置

```bash
$ vim ~/.vimrc
```

```txt
set tabstop=4       " The width of a TAB is set to 4. Still it is a \t.
set shiftwidth=4    " Indents will have a width of 4
set softtabstop=4   " Sets the number of columns for a TAB
"set expandtab      " Expand TABs to spaces
set list            " Display invisible characters
set listchars=tab:\|-,trail:~,extends:>,precedes:<  " :help listchars - for details
hi SpecialKey ctermfg=7  " :help hi - for details of highlight
```