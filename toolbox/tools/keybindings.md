# 快捷键绑定

## 多个编辑器快捷键对比：

|  功能        |  现用快捷键   |    Sublime3   |    VS Code   |   IntelliJ
| ----------- | ------------- | ------------- | ------------ | ---------------
| 向下复制行   | Ctrl+Shift+D  |     same      | Shift+Alt+Dn |    Ctrl+D
| 删除当前行   | Ctrl+Shift+K  |     same      |     same     |    Ctrl+Y
| 上移一行     | Ctrl+Shift+Up |     same      |    Alt+Up    | Ctrl+Shift+Up 语句<br>Alt+Shift+Up 行
| 下移一行     | Ctrl+Shift+Dn |     same      |    Alt+Dn    | Ctrl+Shift+Dn 语句<br>Alt+Shift+Dn 行
| 合并行       | Ctrl+Shift+J  |    Ctrl+J     |     N/A      |     same
| 添加光标     |     Alt+BL    |    Ctrl+BL    |     same     |     same
| 向上添加光标 |     Alt+Up    |   Shift+BR    | Ctrl+Shift+Alt+Up |     N/A
| 向下添加光标 |     Alt+Dn    |   Shift+BR    | Ctrl+Shift+Alt+Dn |     N/A
| 增加缩进     |     Ctrl+]    |     same      |     same     |     Tab
| 减少缩进     |     Ctrl+[    |     same      |     same     |   Shift+Tab
| 折叠代码块   | Ctrl+Shift+{  |     same      |     same     | same 前选到代码块开始处
| 展开代码块   | Ctrl+Shift+}  |     same      |     same     | same 前选到代码块结尾处
| 行注释切换   |     Ctrl+/    |     same      |     same     |     same
| 格式化代码   |               |               | Shift+Alt+F  | Ctrl+Alt+L
| 命令面板     | Ctrl+Shift+P  |     same      |     same     | Ctrl+Shift+A
| 命令面板     | Ctrl+Shift+O  |      ?        |     same     | ?
| 快速搜索     |     Ctrl+P    |     same      |     same     | Navigate Menu
| 切换终端     |     Ctrl+`    |     same      |     same     |   Alt+F12
| 重命名       |       F2      |               |     same     | Shift+F6

快速跳转、选择类快键键可减少鼠标操作，更多操作请查询 "转到" 或 "Navigate" 目录

|  功能        |  现用快捷键   |    Sublime3   |    VS Code   |   IntelliJ
| ----------- | ------------- | ------------- | ------------ | ---------------
| 跳到匹配括号 |               |               | Ctrl+Shift+\ | 
| 跳到上次光标 |               |               |   Alt+Left   | Ctrl+Shift+BackSpace


## IntelliJ 专有快键键

https://www.jetbrains.com/help/idea/keyboard-shortcuts-you-cannot-miss.html

|||
| --------- | ---------------
| Alt+Enter | 
| Ctrl+J    | 

|||
| ------------- | -----------
| 开关左侧文件树 |  Alt+1
| 跳到导航条     |  Alt+Home
| 切换到左侧Tab  |  Alt+Left
| 切换到右侧Tab  |  Alt+Right

|||
| ------ | --------------------------------------------
| Ctrl+P | 查询方法的参数类型，快速查看重载列表
| Ctrl+B / Ctrl+Click | 跳转到声明处 GoTo
| Ctrl+U | 跳转到父类 Super Method
| Ctrl+W | 递进式选择代码块 Extend Selection
| Ctrl+Q | 快速查看文档 Quick Documentation
| F4     | 跳到源码 Jump to Source
| Ctrl+Shift+I  | 快速查看定义 Quick Definition
| Alt+Insert    | 快速插入，常用
| Shift+Shift   | 
| Shift+F10     | Run
| Shift+F9      | Debug
| Ctrl+N        | 快速查找类
| Ctrl+Shift+N  | 快速查找文件
| Ctrl+H        | 查看继承关系(Navigate -> Type Hierarchy)


## VS Code 专有快捷键

快速修复 TSLint 语法小错误 `Shift+Alt+F` 或 `F1 / Ctrl+Shift+P  > fix` 

### Basic Editing

|  Key               | Command           | Command id
| ------------------ | ----------------- | --------------------------------
| `Shift+Ctrl+K`     | Delete Line       | editor.action.deleteLines
| `Ctrl+Enter`       | Insert Line Below | editor.action.insertLineAfter
| `Shift+Ctrl+Enter` | Insert Line Above | editor.action.insertLineBefore
| `Alt+Down`         | Move Line Down    | editor.action.moveLinesDownAction
| `Alt+Up`           | Move Line Up      | editor.action.moveLinesUpAction
| `Shift+Alt+Down`   | Copy Line Down    | editor.action.copyLinesDownAction
| `Shift+Alt+Up`     | Copy Line Up      | editor.action.copyLinesUpAction
| `Ctrl+Shift+Alt+Down`   | Column Select Down    | cursorColumnSelectDown
| `Ctrl+Shift+Alt+Up`     | Column Select Up      | cursorColumnSelectUp
| `Ctrl+]`           | Indent Line       | editor.action.indentLines
| `Ctrl+[`           | Outdent Line      | editor.action.outdentLines
| `Ctrl+/`           | Toggle Line Comment | editor.action.commentLine
| `Ctrl+Delete`      | 删除一个单词        | 

### Rich Languages Editing

|  Key               | Command           | Command id
| ------------------ | ----------------- | ----------
| `Ctrl+Space`       | Trigger Suggest   | editor.action.triggerSuggest
| `Shift+Ctrl+Space` | Trigger Parameter Hints | editor.action.triggerParameterHints
| `Shift+Alt+F`      | Format Code       | editor.action.format
| `F12`              | Go to Definition  | editor.action.goToDeclaration
| `Alt+F12`          | Peek Definition 弹窗 | editor.action.previewDeclaration
| `Ctrl+K F12`       | Open Definition to the Side | editor.action.openDeclarationToTheSide
| `Ctrl+.`           | Quick Fix         | editor.action.quickFix
| `Shift+F12`        | Show References   | editor.action.referenceSearch.trigger
| `F2`               | Rename Symbol     | editor.action.rename

### Navigation

|  Key               | Command           | Command id
| ------------------ | ----------------- | ----------
| `Ctrl+G`           | Go to Line...     | workbench.action.gotoLine
| `Ctrl+P`           | Go to File..., Quick Open | workbench.action.quickOpen
| `Ctrl+Shift+O`     | Go to Symbol...   | workbench.action.gotoSymbol
| `Ctrl+Shift+M`     | Show Problems     | workbench.actions.view.problems
| `Ctrl+Shift+P`     | Show All Commands | workbench.action.showCommands
| `Alt+Left`         | Go Back           | workbench.action.navigateBack
| `Alt+Right`        | Go Forward        | workbench.action.navigateForward
| `Ctrl+Shift+\`     | 在匹配括号中跳转  | 

### Display

|  Key         | Command            | Command id
| ------------ | ------------------ | ----------
| `Ctrl+B`     | Toggle SideBar     | 
| `F11`        | Toggle Full Screen | workbench.action.toggleFullScreen
| `Ctrl++`     | Zoom in            | workbench.action.zoomIn
| `Ctrl+-`     | Zoom out           | workbench.action.zoomOut
| `Ctrl+Shift+F` | Show Search      | workbench.view.search

### Debug

|  Key         | Command            | Command id
| ------------ | ------------------ | ----------
| `F9`         | Toggle Breakpoint  | editor.debug.action.toggleBreakpoint
| `F5`         | Continue / Pause / Start
| `Shift+F5`   | Stop               | workbench.action.debug.stop
| `F11`        | Step Into          | workbench.action.debug.stepInto
| `Shift+F11`  | Step Out           | workbench.action.debug.stepOut
| `F10`        | Step Over          | workbench.action.debug.stepOver

### Side by side editing

|  Key         | Command            | Command id
| ------------ | ------------------ | ----------
| `Ctrl+Tab`   | 切换标签页         | 
| `Ctrl+1`     | 切换到第一栏       | 
| `Ctrl+2`     | 切换到第二栏       | 
| `Ctrl+单击` `Ctrl+\`  | 在右栏打开         | 
| `Ctrl+双击`  | 新开一栏打开文件   | 


## 系统快捷键

| 功能       | 快捷键
| --------- | -------------
| 切换最大化 | F11
| 查找       | Ctrl+F
| 替换       | Ctrl+H
