# Sublime Text3

[Sublime Text Unofficial Documentation](http://docs.sublimetext.info/en/latest/index.html)   
[Package Control](https://packagecontrol.io/installation)

## 颜色主题设置

[Garden 主题文件](./Garden.tmTheme)

### How to install a Sublime Text theme

`Preferences -> Browse Packages` 进入"Packages"文件夹，并创建"Colorsublime-Themes"，再将下载的主题文件放入该文件夹。

`Preferences -> Color Scheme -> Colorsublime-Themes` 选择相应的主题即可。

### 自定义主题的相关文档和资料

如何查看要修改的部分的scope：`ctrl+alt+shift+p`

[Colorsublime How to install a theme](http://colorsublime.com/how-to-install-a-theme)   
[Color Schemes — Sublime Text Unofficial Documentation](http://docs.sublimetext.info/en/latest/reference/color_schemes.html)

### 解决标记匹配高亮不明显问题

安装 BracketHighlighter 插件即可解决此问题。


## 快捷键列表
<p>屌丝的默认快捷键设置：{ "keys": ["ctrl+k", "ctrl+b"], "command": "toggle_side_bar" } 的意思是 Hide Side Bar is the sequence Ctrl+K, Ctrl+B（先按Ctrl+K, 再按Ctrl+B）不谷歌能看懂？</p>
<p>默认快键键列表在 <code>Preferences -> Key Bindings - Default</code></p>
<p>Emmet 默认快键键列表在 <code>Preferences -> Package Settings -> Emmet -> Key Bindings - Default</code></p>
<p>用户自定义快键键在 <code>Preferences -> Key Bindings - User</code></p>

<h4>如何查找命令并设置快捷键</h4>
<p>通过 <code>ctrl + shift + p</code> 输入相关词查找命令。</p>
<p>如果想设置快键键的话，<code>ctrl+`</code> 打开控制台，并输入 <code>sublime.log_commands(True)</code> 命令开启“记录命令”功能，再然后记下命令，并到 Key Bindings - User 下绑定自定义快捷键。关闭命令记录功能是 <code>sublime.log_commands(False)</code> <a href="http://robdodson.me/sublime-text-2-tips-and-shortcuts/">参考来源</a></p>

<table>
<tr><th>操作</th><th>默认快键键</th><th>自定义快捷键</th></tr>
<tr><td>toggle_side_bar</td><td>["ctrl+k", "ctrl+b"]</td><td>alt+a</td></tr>
<tr><td>emmet wrap_as_you_type</td><td>shift+ctrl+g</td><td>ctrl+alt+t</td></tr>
</table>

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
鼠标右键＋Shift 或 鼠标中键
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
```

### 查找替换

<table>
<tr><td>Open search panel</td><td>Ctrl + F</td><td>普通查找（按F3会跳到下个匹配项）</td></tr>
<tr><td>Incremental search</td><td>Ctrl + I</td><td>增量查找（按F3会添加下个匹配项到选择）</td></tr>
<tr><td>Open replace panel</td><td>Ctrl + H</td><td>打开替换栏</td></tr>
<tr><td>Regular expressions</td><td>Alt + R</td><td>是否是正则表达式</td></tr>
<tr><td>Case sensitive</td><td> Alt + C</td><td>大小写敏感</td></tr>
<tr><td>Exact match</td><td>Alt + W</td><td>完整匹配 Whole word</td></tr>
<tr><td>Find next</td><td>Enter</td><td>查找下一项</td></tr>
<tr><td>Find previous</td><td>Shift + Enter</td><td>向前查找下一项</td></tr>
<tr><td>Find all</td><td>Alt + Enter</td><td>查找全部匹配项</td></tr>
<tr><td>Preserve case</td><td>Alt+A</td><td>智能调整大小写（碰到驼峰式命名会乱）
  <pre>This is this -> (this > that ) -> That is that // 智能调整<br>Replace MySQL by PostgreSQL -> PoSTGreSQL // 乱了</pre></td></tr>
<tr><td>Wrap</td><td></td><td>即 wrap around ，是否循环查找匹配项</td></tr>
<tr><td>In selection</td><td></td><td>必须是先选中内容再调出“查找替换”栏才有效，<br>调出替换栏后，再用鼠标选中其他内容，系统还是认原先的选中区域</td></tr>
</table>

```
Open Find in Files  Ctrl + Shift + F
Search forward using most recent pattern  F3
Search backwards using most recent pattern  Shift + F3
Select all matches using most recent pattern  Alt + F3
```


## 使用技巧

<h3>强大的快速搜索 ctrl+p</h3>
<p>Goto Anything accepts several operators. All of them can be used on their own or after the search term.</p>
<p>The Goto Anything operators are bound to the following shortcuts:</p>
<table>
<tr><th>operator</th><th>shortcut</th><th>description</th></tr>
<tr><td>@</td><td>Ctrl + R</td><td>Searches the active file for the symbol (usually include class and function names)</td></tr>
<tr><td>#</td><td>Ctrl + ;</td><td>Performs a fuzzy search and highlights all matches</td></tr>
<tr><td>:</td><td>Ctrl + G</td><td>Goes to the specified</td></tr>
</table>

### 强大的命令模式：ctrl+shift+p
使用命令模式可以减少鼠标的使用，提升效率；   
同时，因为命令模式支持模糊匹配，我们还可以少记些快捷键。

### 多行游标功能
<ul>
<li>方式1：ctrl+d 连续选中 ctrl+k 跳过一个项目</li>
<li>方式2：alt+f3 全选相应项目并生成多行游标</li>
<li>方式3：shift+鼠标右键拖动</li>
</ul>

### 屏幕拆分


## 插件

 插件           | 描述 
 -------------- | ---------------------------------------------------
**Package Control** | 插件管理器 https://sublime.wbond.net/installation
Emmet           | HTML CSS 快速输入必装插件。
JavaScript Completions | JS 自动补齐支持。
SublimeLinter 3 | JS代码分析与提示，需要加装插件 jshint
HTML-CSS-JS prettify   | This extension gives you a command to format your HTML, CSS and JS
Autoprefixer    | 可以自动帮助添加CSS浏览器前缀
Less            | Less 语法高亮支持。
Color Highlighter      | 根据颜色代码直观显示颜色，并带 color picker
BracketHighlighter     | 默认的匹配标记高亮很扯蛋，所以有了这个插件。
Git Gutter      | Add a marker in the gutter wherever there is a change made to a file.
AutoFileName    | 自动添加引用文件名。
**SideBarEnhancements**    | 侧边栏右键功能增强。
SyncedSideBar   | 可以在侧边栏同步展开编辑文件所在目录的插件。后来发现 右键->Reveal in Side Bar 是个更好的选择
**IMESupport**      | 输入中文时，输入框总是在最下面，装了这个插件不用设置，一切就会正常工作了。
HTML2Text       | HTML 转 Markdown 插件
ConvertToUTF8   | 提供 GBK GB2312 编码支持

### Markdown Editing

重装或者改 theme 时要注意，这个主题是要在其配置文件中单独设定的，如原主题找不到就会一直报错，怎么改主题都不行，好大一个坑。

Markdown.sublime-settings--User

```
{
  "color_scheme": "Packages/Garden.tmTheme",
  "tab_size": 2,
  "draw_centered": false,
  "wrap_width": 120,
  "rulers": [120],
  "line_numbers": true,
}
```

### SublimeLinter

SublimeLinter 是比较好用的一款 linter frame，但是使用过程中发现有2点需要注意：

* 装了tslint，发现不正常工作，不知道怎么回事，最后开启 debug 才发现是 tslint 有错误
* 会在 %appdata%\Sublime Text 3\Packages\User\SublimeLinter 根据theme设定生成特定主题文件，并将这个主题文件设为默认主题文件。

### TSLint

https://github.com/palantir/tslint

版本不同，配置文件不同，要是版本跟配置文件不合（配置项不支持啥的），就会报错，使用 SublimeLinter 时要是不开启 debug 模式，就是静默失败，坑爹。

```js
// 像这样，在最新版基础上修改，最靠谱。要是全部自己列出，换个版本就等着报错吧
{
  "extends": "tslint:latest",
  "rules": {
    "quotemark":[true, "single", "avoid-escape"],
  }
}
```

