# BASH SHELL 

#### bash 的主要优点

<p>命令记忆history ；自动补全Tab；命令别名alias；作业控制；脚本；通配符</p>

#### 变量功能

为了与自定义变量区分，环境变量通常以大写字符来表示：PATH HOME MAIL SHELL

```
echo $var / ${var}  // 两种显示变量的方式
work="/var/www/html/project/p2file"  // 设定变量时中间不能有空格
unset 删除变量；export 导出为环境变量；env 查看环境变量；set 查看所有变量；locale 显示语系变量
LANG=en_US.UTF-8    // 临时设定语言以支持中文正常显示
```

#### bash 环境配置

用命令设置的命令别名、自定义变量在注销bash后都会失效，要保留设置需要写入配置文件。

/etc/profile 系统整体的设置，会读取 /etc/profile.d/*.sh /etc/sysconfig/i18n 等
~/.bash_profile 用户个人设置，另外会读取 ~/.bashrc < /etc/bashrc  见P323

利用<code>source 或 . </code>.bashrc 可以不用重新登录就使配置文件生效


#### 终端机的环境设置：stty, set
<table class="dataintable"><col style="color:blue" /><col />
  <tr><td>^C</td><td>intr 终止目前的命令 interrupt</td></tr>
  <tr><td>^D</td><td>eof 输入结束（end of file）</td></tr>
  <tr><td>^U</td><td>kill 删除整行命令 erase the current line</td></tr>
</table>

#### 通配符与特殊符号

<table class="dataintable"><col style="color:blue" /><col />
  <tr><td>#</td><td>批注符号，这个最常用在script当中，其后的数据均不执行</td></tr>
  <tr><td>\</td><td>转义符号，用\[Space]在文件名中插入空格，用\[Enter]实现命令换行输入而不立即执行</td></tr>
  <tr><td>|</td><td>管道符号</td></tr>
  <tr><td>;</td><td>连续命令分隔符</td></tr>
  <tr><td>~</td><td>用户的主文件夹</td></tr>
  <tr><td>$</td><td>使用变量前导符</td></tr>
  <tr><td>&</td><td>命令在后台运行</td></tr>
  <tr><td>!</td><td>逻辑运算上的“非”</td></tr>
  <tr><td>/</td><td>路径分隔符</td></tr>
  <tr><td>>,>></td><td>输出重定向，分别是“替换”“追加”。>为标准输出，2>为错误信息输出</td></tr>
  <tr><td><,<<</td><td>输入重定向，< 由文件来替代键盘输入；而<< 设定多行连续输入，遇结束符才结束</td></tr>
  <tr><td>' '</td><td>单引号，不具有变量置换的功能</td></tr>
  <tr><td>" "</td><td>双引号，具有变量置换功能</td></tr>
  <tr><td>` `</td><td>反单引号，包含的命令优先执行，执行结果加入原命令继续执行。$()效果相同，更为推荐使用</td></tr>
  <tr><td>( )</td><td>1命令替换$(cmd) 或 2命令块，重新开一个子shell执行内部命令块 </td></tr>
  <tr><td>{ }</td><td>1变量原型${var} 或 2命令块，在当前shell执行，第一个命令和左括号之间必须要有一个空格</td></tr>
</table>

#### 关于空格的问题

带空格的文件夹处理：1 使用转义'\ ' 2 使用引号。

命令里哪里加空格哪里不加：一般主命令 和 选项命令 以及后面的参数之间都有空格。