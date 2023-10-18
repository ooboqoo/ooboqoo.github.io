# Emacs and vi modes in Bash

常用快捷键

* `C-a` 跳到行首
* `C-e` 跳到行尾
* `C-u` 删除至行首；macOS 下删除整行
* `C-w` 删除到词首
* `C-xC-e` 开编辑器编辑命令


## GUN Readline

https://en.wikipedia.org/wiki/GNU_Readline

GNU Readline is a software library that provides in-line editing and history capabilities for interactive programs with a command-line interface, such as Bash.

Readline supports both Emacs and vi editing modes, which determine how keyboard input is interpreted as editor commands.

```
$ set -o vi     # 切 vi 模式
$ set -o emacs  # 切 Emacs 模式（默认）
```

## Emacs Editing Mode

* Readline Cheat Sheet https://readline.kablamo.org/emacs.html

If you are an emacs user, you will find it most useful to think of emacs editing mode as *a simplified emacs with a single, one-line window*. All of the basic commands are available for cursor motion, cut-and-paste, and search.

### Meta 键

* Windows 下就是 `Alt` 按键
* macOS 下没有 `Meta` 按键，先按 `esc` 再按其他键也能起到 `Meta` 键的效果
* iTerm2 下可以到 iTerm2 > Preferences > Profiles > Keys 下将 `option` 键修改为 `Esc+`

NOTE: `C-` = hold control, `M-` = hold meta (where meta is usually the `alt` or escape key).

### 光标移动 Moving

||||
-----------|-----------------|----------------------------
`C-a` (Home) | *a*head         | 跳到行首 Beginning of line
`C-e` (End)  | *e*nd           | 跳到行尾 End of line
C-f (→)      | *f*orward-char  | 右移一个字符 Move cursor forward
C-b (←)      | *b*ackward-char | 左移一个字符 Move cursor backward
`M-f`        | *f*orward-word  | 右移一个单词 Forward one word
`M-b`        | *b*ackward-word | 左移一个单词 Back one word

### 历史查询 History

||||
--------|--------------------|-----------------------------------------------------
C-p (↑) | *p*revious         | 上一行命令 Previous line, previous command in history
C-n (↓) | *n*ext             | 下一行命令 Next line, next command in history
`C-r`   | *r*everse-i-search | 搜索命令历史，按多次 C-r 可依次往前查询

### 内容编辑 Changing Text

||||
------|----------|--------------------------------------------------------------------
C-d   | *d*elete | 删除一个字符；当无输入时，sends an `EOF` which closes the current shell
DEL   |          | 回退（删除）一个字符

### 剪切粘贴 Killing and Yanking

'cut' and 'paste' are more recent jargon for 'kill' and 'yank'.

"kill" is another word for "delete", it is the standard term used in the readline library doc for an "undoable" deletion.

||||
------|----------|------------------------------------------------------------
`C-w` | *w*ord   | 删除到词首 Kill region
M-d   | wor*d*   | 删除到词尾 Kill next word
`C-u` |          | 删除至行首 Kill the line before the cursor, add to clipboard
`C-k` | *k*ill   | 删除至行尾 Kill the line after the cursor, add to clipboard
|
C-y  | *y*ank | 粘贴 Retrieve last item killed

|||
-------|------------------------
C-/    | 撤销 Undo
C-gC-/ | 重做 Redo

### 自动补全 Completing

|||
-----|----------------------------
TAB  | 常规补全

### 多行编辑

|||
----------|---------------------------------
`C-xC-e`  | 开编辑器编辑命令

### 其他

||||
-----|----------|---------------------------------------------------
C-c  | *c*lose  | 给当前程序发送 `SIGINT` which aborts and closes it
C-l  | c*l*ear  | 清屏


