# WebStorm &amp; PHPStorm 使用笔记

## 安装与设置

### 破解

到[IntelliJ IDEA 注册码](http://idea.qinxi1992.cn/) 查找最新可用 License server 来在线激活软件。

### 常见设置项

<pre>
取消显示打印分割线: Show right margin
字体设置: Editor -> Colors&amp;Fonts -> Font Font
拼写检查: inspections -> spelling -> Typo

</pre>

### 快键键设置

<pre>
----------- WebStorm 快捷键 -----------
## 缩进
自动缩进(当前行或选择块)  Ctrl+Alt+I
减少缩进                  Shift+Tab

## 注释
行注释切换   Ctrl+/
块注释切换   Ctrl+Shift+/

### 行操作
复制整行 Ctrl+Shift+D (修改)
删除整行 Ctrl+Shift+K (修改)
上移行   Ctrl+Shift+↑ (与块换了下)
下移行   Ctrl+Shift+↓ (与块换了下)
上移块   Alt+Shift+↑  (与行换了下)
下移块   Alt+Shift+↓  (与行换了下)

## 提示
快速查看定义 Ctrl+Shift+I
快速查看文档 Ctrl+Q
</pre>

## 使用技巧


## 应用专题






## PHPStorm 的一些设置项

现在把一些使用技巧记录下来,免得到时候忘了再查:
1,从版本控制系统创建项目:
CVS -> Checkout from Version Control

2, 关联DOC文档:
右键External Librariese -> Configure PHP include paths

3, 去掉波浪线:
settings -> Editor -> Colors & Fonts -> General -> TYPO->Effects

4, 显示行号:
settings -> Editor->Appearance->Show line numbers 

5,远程或本地同步文件:
Tools -> Deploments -> Configuration

6, 去掉右上角浏览器图标:
settings -> tools -> WebBrowsers

7, 添加VIM插件:
settings->editor ->plugins->browse repositories ->搜索VIM

8,启动的时候不打开工程文件
Settings->General去掉Reopen last project on startup.

9, 取消自动保存
appearance -> system settings -> save file的两个选项 去掉

10, 将编辑的文件加星号标识:
settings -> editor -> editor tabs -> 勾选 mark modifed tabs…

11, 添加扩展名高亮显示:
settings -> editor -> file types  

<h2>各类技巧</h2>

<h3>配置 FTP 快速同步代码</h3>
<p>在Webstorm/Phpstorm中操作ftp能找到原来版本控制的感觉。唯一的缺点是打开链接要稍费时间。</p>
<pre>设置的入口有两处，    
a. Tools -&gt; Deployment -&gt; configruation   
b. File -&gt; Settings -&gt; Deployment -&gt; configruation
</pre>

<h3>PhpStorm 超强语言模板的支持</h3>
<p>讲述了language injection的用法  快捷键 Alt+Enter</p>
<pre>http://www.cnblogs.com/jikey/p/3489003.html</pre>

