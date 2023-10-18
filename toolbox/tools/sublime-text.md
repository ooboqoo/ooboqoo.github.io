# Sublime Text 4

[Sublime Text Unofficial Documentation](http://docs.sublimetext.info/en/latest/index.html)   
[Package Control](https://packagecontrol.io/installation)


## 设置

_Preferences.sublime-settings_

```json
{
  "color_scheme": "Garden.tmTheme",
  "draw_white_space": "all",
  "font_size": 13,
  "tab_size": 2,
  "draw_centered": false,
  "rulers": [120],
  "wrap_width": 120,
  "ignored_packages":
  [
    "Vintage",
  ],
}
```

_Package Control.sublime-settings_

```json
{
  "bootstrapped": true,
  "auto_upgrade": false,
  "installed_packages":
  [
    "MarkdownEditing",
    "SideBarEnhancements",
  ]
}
```

### 注册

https://gist.github.com/svmotha/9fae060072bd88d6168e738dd09d85a3

`C:\Windows\System32\drivers\etc\hosts` 或 `/etc/hosts` 添加一行

```txt
0.0.0.0 license.sublimehq.com
```

然后再输入 Twitter license 即可。如果没有上一行配置，sublime 会连接服务器验证，然后就会发现此授权已失效。

https://gist.github.com/opastorello/4d494d627ec9012367028c89cb7a1945

* /Applications/Sublime Text -> Show Package Contents -> Mac OS -> sublime_text
* Edit that file with _Hex Fiend_, replace `80 78 05 00 0f 94 c1` with `c6 40 05 01 48 85 c9`
* `codesign --remove-signature /Applications/Sublime\ Text.app` 此时会被系统拦截，需要允许才能继续



### 颜色主题设置

[Garden 主题文件](/001/Garden.sublime-color-scheme)

#### How to install a Sublime Text theme

`Preferences -> Browse Packages` 进入 Packages 文件夹，新建 Colorsublime-Themes，并将下载的主题文件放入该文件夹。

`Preferences -> Color Scheme -> Colorsublime-Themes` 选择相应的主题即可。或者直接在配置文件里设置 `Preferences -> Settings`

#### 自定义主题的相关文档和资料

如何查看要修改的部分的scope：Windows `ctrl+alt+shift+p`; Mac `ctrl+shift+p`

[Colorsublime How to install a theme](http://colorsublime.com/how-to-install-a-theme)  
[Color Schemes — Sublime Text Unofficial Documentation](http://docs.sublimetext.info/en/latest/reference/color_schemes.html)


## 快捷键列表

屌丝的默认快捷键设置，不谷歌能看懂？

```js
{ "keys": ["ctrl+k", "ctrl+b"], "command": "toggle_side_bar" }
// 的意思是 Hide Side Bar is the sequence Ctrl+K, Ctrl+B (先按Ctrl+K, 再按Ctrl+B)
```

* 默认快键键列表在 `Preferences -> Key Bindings - Default`
* Emmet 默认快键键列表在 `Preferences -> Package Settings -> Emmet -> Key Bindings - Default`
* 用户自定义快键键在 `Preferences -> Key Bindings - User`

#### 如何查找命令并设置快捷键

通过 `Ctrl+Shift+P` 输入相关词查找命令。

如果想设置快键键的话，`` Ctrl+` `` 打开控制台，并输入 `sublime.log_commands(True)` 命令开启“记录命令”功能，再然后记下命令，并到 Key Bindings - User 下绑定自定义快捷键。关闭命令记录功能是 `sublime.log_commands(False)`

```bash
###特色功能
Ctrl+P 查找当前项目中的文件和快速搜索
Ctrl+Shift+P 打开命令面板

###缩进
Ctrl+] 增加缩进
Ctrl+[ 减少缩进

##折叠
ctrl+shift+[ 折叠
ctrl+shift+] 展开

###注释
Ctrl+/ 注释切换 
Ctrl+Shift+/ 块注释切换 

###行操作
Ctrl+Shift+D 复制整行
Ctrl+Shift+K 删除整行
Ctrl+Shift+↑可以移动此行代码，与上行互换
Ctrl+Shift+↓可以移动此行代码，与下行互换
Ctrl+L 选择整行（按住-继续选择下行）
Ctrl+J 合并行（已选择需要合并的多行时）

###选择
Ctrl+D 选词 （反复按快捷键，即可继续向下同时选中下一个相同的文本进行同时编辑）
Alt+F3 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑
Ctrl+鼠标左键 可以同时选择要编辑的多处文本
Ctrl+Shift+A 选择光标位置父标签对儿  // 这个好用，可以不用emmet相应功能了
Ctrl+Shift+M 选择括号内的内容（按住-继续选择父括号）

###快速编辑
alt+shift+w 用标签包裹行或选中项(不需要使用emmet)
Ctrl+Enter 插入行后（快速换行）
Ctrl+Shift+Enter 光标前插入行
Alt+. 闭合当前标签
shift+ctrl+; 移除标签（emmet 插件功能）

###列模式的操作方法
鼠标右键＋Shift  (macOS opt+鼠标左键)  或 鼠标中键
增加选择：Ctrl，减少选择：Alt

###快速移动光标
ctrl+left 移动到词首
ctrl+right 移动到词尾
alt+left 按单词移动
alt+right 按单词右移
alt+- 上一个编辑处
alt+shift+- 下一个编辑处
Ctrl+G 跳转到相应的行
Ctrl+M 光标移动至括号内开始或结束的位置

### MarkdownEditing
shift+Tab 折叠展开当前 Section
```

### 查找替换

||||
|---------------------|---------------|----------------------
| Open search panel   | Ctrl + F | 普通查找（按F3会跳到下个匹配项）
| Incremental search  | Ctrl + I | 增量查找（按F3会添加下个匹配项到选择）
| Open replace panel  | Ctrl + H | 打开替换栏
| Regular expressions | Alt + R  | 是否是正则表达式
| Case sensitive      | Alt + C  | 大小写敏感
| Exact match         | Alt + W  | 完整匹配 Whole word
| Find next           | Enter    | 查找下一项
| Find previous       | Shift + Enter | 向前查找下一项
| Find all            | Alt + Enter   | 查找全部匹配项
| Preserve case       | Alt+A         | 智能调整大小写(碰到驼峰式命名会乱)
| Wrap                |               | 即 wrap around ，是否循环查找匹配项
| In selection        |               | 必须是先选中内容再调出“查找替换”栏才有效，<br>调出替换栏后，再用鼠标选中其他内容，系统还是认原先的选中区域


|||
|---------------|---------------------------------------------
| Ctrl+Shift+F  | Open Find in Files
| F3            | Search forward using most recent pattern
| Shift+F3      | Search backwards using most recent pattern
| Alt+F3        | Select all matches using most recent pattern


## 使用技巧

### 强大的快速搜索 Ctrl+p

The Goto Anything operators are bound to the following shortcuts:

||||
|-----|----------|------------------------------------------------------------------------------------
| `@` | `Ctrl+R` | Searches the active file for the symbol (usually include class and function names)
| `#` | `Ctrl+;` | Performs a fuzzy search and highlights all matches
| `:` | `Ctrl+G` | Goes to the specified

### 强大的命令模式：ctrl+shift+p

使用命令模式可以减少鼠标的使用，提升效率；同时，因为命令模式支持模糊匹配，我们还可以少记些快捷键。

### 多行游标功能

* `Ctrl+D` 连续选中 ctrl+k 跳过一个项目
* `Alt+F3` 全选相应项目并生成多行游标
* `Shift+鼠标右键拖动`

### 屏幕拆分


## 插件

|||
|-------------------- | ---------------------------------------------------
| **Package Control** | 插件管理器 https://sublime.wbond.net/installation
| **IMESupport**      | 输入中文时，输入框总是在最下面，装了这个插件不用设置，一切就会正常工作了
| **SideBarEnhancements** | 侧边栏右键功能增强
| Emmet                   | HTML CSS 快速输入必装插件
| Color Highlighter       | 根据颜色代码直观显示颜色，并带 color picker
| BracketHighlighter      | 默认的匹配标记高亮很扯蛋，所以有了这个插件。
| Git Gutter      | Add a marker in the gutter wherever there is a change made to a file.
| AutoFileName    | 自动添加引用文件名。
| SyncedSideBar   | 可以在侧边栏同步展开编辑文件所在目录的插件。后来发现 右键->Reveal in Side Bar 是个更好的选择
| HTML2Text       | HTML 转 Markdown 插件
| TypeScript      | https://packagecontrol.io/packages/TypeScript

