# Emacs

https://www.gnu.org/software/emacs/


## 快捷键

### 命令行通用快捷键

注：`Meta` 在 Windows 下就是 `Alt` 按键，在 MAC 下没有 `Meta` 按键，可以到 iTerm2 > Preferences > Profiles > Keys 下将 `option` 键修改为 `Esc+` (修改为 `Meta` 的选项也还在，但提示不推荐了)。如果不改，先按 `esc` 再按其他按键也能起到 `Meta` 键的效果。

||
-----|------------------
C-a  | 跳到行首 Beginning of line
C-e  | 跳到行尾 End of line
C-f  | 右移一个字符 Forward one character
C-b  | 左移一个字符 Back one character
M-f  | 右移一个单词 Forward one word
M-b  | 左移一个单词 Back one word
|
C-p  | 上一行命令 Previous line
C-n  | 下一行命令 Next line
C-r  | 搜索命令历史 Incremental search backward，直接回车执行，按两下 `esc` 保留搜索结果但不执行
|
C-w  | 删除到词首 Kill region(剪切)
M-d  | 删除到词尾 Kill next word
C-u  | 删除至行首
C-k  | 删除至行尾 Kill line
|
C-y  | 粘贴 Yanks last killed text
C-/  | 撤销
`ctrl`+`-` | Undo


其他非 Emacs 但常用的终端快捷键

||
--------|------------------
C-l     | 清屏
C-xC-e  | 开编辑器编辑命令，保存后批量执行

### Emacs

||
----------|------------------
C-xC-s    | Save File
C-x k     | Close File
C-xC-c    | Quit Emacs
C-z       | Suspend Emacs
