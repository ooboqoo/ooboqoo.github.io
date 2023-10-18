# 少用鼠标

## 高效使用命令行

### terminal

快速移动光标


编辑模式
  * `Ctrl-x Ctrl-e` 进入编辑模式


`history` 历史命令
  * `Ctrl-r` 搜索历史命令 backword
    - 输入 keywords 后再按 Ctrl-r 相当于 next，可显示下一个匹配项
    - 连按两下会出上次搜索记录
    - Ctrl-s 搜索命令 forword
  * [hstr](https://github.com/dvorka/hstr) 是更好的三方增强工具 （`man hstr` 看说明比较清楚）

### git

$HOME/.oh-my-zsh/plugins/git

详细列表可通过 `alias | grep git` 查看

```bash
# 分支
alias gco='git checkout'

# 清理
alias gpristine='git reset --hard && git clean -dffx'

# 提交
alias gc='git commit -v'
alias gc!='git commit -v amend'
alias grbi='git rebase -i'

# 查看日志
alias glo='git log --oneline --decorate'
alias glog='git log --oneline --decorate --graph'
```

### jq

https://stedolan.github.io/jq/tutorial/



## VS Code

https://blog.logrocket.com/learn-these-keyboard-shortcuts-to-become-a-vs-code-ninja/
https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf


### VSCodeVim

默认会占用 [esc] 按钮，调整至 [^ esc] 之后好用很多，毕竟非 Vim 重度用户。(目前想转成 Vim 重度用户，改配置中...)

```json
[
  {
    "key": "ctrl+escape",
    "command": "extension.vim_escape",
    "when": "editorTextFocus && vim.active && !inDebugRepl"
  },
  {
    "key": "escape",
    "command": "-extension.vim_escape",
    "when": "editorTextFocus && vim.active && !inDebugRepl"
  }
]
```


### Copilot

https://github.com/github/copilot-docs/blob/main/docs/visualstudiocode/gettingstarted.md#getting-started-with-github-copilot-in-visual-studio-code

* `⌥ ]` Next
* `⌥ [` Previous
* `Tab` Accept
* `^ Enter` show 10 suggestions
* `Esc` Dismiss an inline suggestion


### Basic editing

* `⌘ X` 剪切
* `⌘ C` 复制
* `⌘ Z` 撤销

，

* `⌥↓` 下移一行
* `⌥↑` 上移一行
* `⇧⌥↓` 向下复制
* `⇧⌥↑` 向上复制

### View

* `⌘ + \` split view
* `⌘ + 1` `⌘ + 2` switch between views
* `⌘ + 0` 跳到 explorer 窗口，然后可以通过上下箭头移动文件，按空格选中，按回车改名


* `⌘ + ▶︎` 跳到行尾
* `⌘ + ◀︎` 跳到行首
* `opt + ▶︎` 跳到词尾
* `opt + ◀︎` 跳到词首

```txt
# Go

`⌘ + p` 打开搜索框
  @ 
  # 
  : 跳到某一行

F12 
opt+F12

F2 重命名
```

### Terminal

* ``⌃` `` Show integrated terminal
* ``⌃⇧` `` Create new terminal
* `⌘C` Copy selection
* `⌘↑ / ↓` Scroll up/down
* `PgUp / PgDn` Scroll page up/down
* `⌘Home / End` Scroll to top/bottom
