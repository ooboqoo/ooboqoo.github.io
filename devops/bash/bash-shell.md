# Bash Shell

http://www.gnu.org/software/bash/manual/html_node/index.html


## Basic Shell Features

### Shell Syntax

#### Shell Operation

以下是 Bash 执行命令的基本流程：

1. Reads its input from a file (Shell Scripts), or from the user’s terminal.
2. Breaks the input into words and operators. Alias expansion is performed by this step.
3. Parses the tokens into simple and compound commands.
4. Performs the shell expansions, breaking the expanded tokens into lists of filenames + commands + arguments.
5. Performs any necessary redirections and removes the redirection from the argument list.
6. Executes the command.
7. Optionally waits for the command to complete and collects its exit status.

#### Quoting

Quoting is used to remove the special meaning of certain characters or words to the shell.

||
-------|--------------
 `\`   | 转义单个字符
 `''`  | 单引号内的所有内容都会被认为是普通字符串
 `""`  | 双引号内的字符串仅 `$` <code>\`</code> `\` 保留特殊含义

#### Comments

`#` 及其后(在同一行内)的内容被视为注释

### Shell Commands

### Shell Functions

### Shell Parameters

### Shell Expansions

### Redirections

### Executing Commands

### Shell Scripts


#### 常用快捷键

|||
|-----------|------------------
| ctrl+r    | 搜索命令历史
| ctrl+l    | 清屏
| ctrl+a    | 跳到行首
| ctrl+e    | 跳到行尾


#### 变量功能

为了与自定义变量区分，环境变量通常以大写字符来表示：PATH HOME MAIL SHELL

```bash
$ echo $var / ${var}                   # 两种显示变量的方式
$ work="/var/www/html/project/p2file"  # 设定变量时中间不能有空格, CMD 下要以 set 开头，而 Bash 下不带 set
$ unset work                           # 删除变量；
$ export work                          # 导出为环境变量
$ env                   # 查看环境变量
$ set                   # 查看所有变量(环境变量+自定义变量)
```

#### bash 环境配置

终端内用命令设置的别名、变量在注销 bash 后都会失效，若想保留设置得写入配置文件。自定义配置一般修改 `~/.bashrc`。

`/etc/profile` (仅 login shell 读取) 系统整体设置，这个文件内部又会去读取 `/etc/profile.d/*.sh` `/etc/sysconfig/i18n` 等配置文件。这个配置文件会根据用户 UID 来决定很多重要的变量数据，所以最好不要修改这个文件。

`~/.bash_profile` (仅 login shell 读取) 用户个人设置，这个文件会读取 `~/.bashrc` 的内容。

`~/.bashrc` 对于像在图形界面下调用终端这种不需要登录 (non-login) 的情况，系统会跳过 `/etc/profile` `~/.bash_profile` 直接来读这个文件。此文件内部又会读取 `/etc/bashrc` 的内容。

利用 `source ~/.bashrc` 或 `. ~/.bashrc` 可以不用重新登录就使配置文件生效。

注意：在设定 `PATH` 变量时，Linux 下用的 `:` 分隔各路径，而 Windows 用的是 `;`

#### 终端机的环境设置

`stty` 命令用来设置终端 setting tty，一般都不用修改默认配置，但可以用 `stty -a` 来查看终端按键定义。  
`set` 命令则是 bash 用来配置一些 bash 自己特有的终端设置值的。

| | |
|:-----:|--------------------------------------------
| `^C`  | intr 终止目前的命令 interrupt
| `^D`  | eof 输入结束（end of file）
| `^U`  | kill 删除整行命令 erase the current line

#### 通配符与特殊符号

在 bash 的操作环境中有一个非常有用的功能，那就是通配符 wildcard，它使我们处理数据更加方便。

| | |
|:------:|----------------------------------------------------------------------------------------
| `*`    | 代表 0个到无穷多个字符
| `?`    | 代表单个字符
| `[]`   | 代表一个字符，如 `[abc]` 表示abc其中的一个字符；`[0-9]` 代表数字 `[^ab]` 表示ab字符以外的任意字符

```bash
$ ls /etc/cron*    # 找出以 cron 开头的文件
$ ls /etc/*[0-9]*  # 找出至少包含单个数字的文件
$ ls /etc/[^a-z]*  # 找出不是小写字母开头的文件
```

bash 中常见的特殊符号汇总：

| | |
|:------:|---------------------------------------------------------------------------------------------
| `#`    | 批注符号，这个最常用在 script 当中，其后的数据均不执行
| `\`    | 转义符号，用`\[Space]`在文件名中插入空格，用`\[Enter]`实现一次输入多行命令(换行而不立即执行)
| <code> &#124; </code> | 管道符号
| `;`    | 连续命令分隔符
| <code> ~ </code>      | 用户的主文件夹
| `$`    | 使用变量时的前导符，使用变量的两种格式 `$varname` `${varname}`，定义变量不能加此 `$`
| `&`    | 命令在后台运行, 如 `http-server &`
| `!`    | 逻辑运算上的“非”
| `/`    | 路径分隔符
| `>` , `>>`  | 输出重定向，分别是“替换” “追加”。标准输出用 `>` `>>`，标准错误输出用 `2>` `2>>`
| `<` , `<<`  | 输入重定向，`<` 由文件来替代键盘输入；而 `<<` 用于自定义多行连续输入时的 **结束符**
| `' '`  | 单引号，不具有变量置换的功能
| `" "`  | 双引号，具有变量置换功能
| `` ` ` ``   | 反单引号，包含的命令优先执行，执行结果加入原命令继续执行。`$()`效果相同，更为推荐使用
| `( )`  | 1. 命令替换 `$(cmd)` 或<br> 2. 命令块，重新开一个子 shell 执行内部命令块
| `{ }`  | 1. 变量原型 `${var}` 或<br> 2. 命令块，在当前 shell 执行，第一个命令和左括号之间必须要有一个空格<br> 3. 扩展表达式，`echo file.{png,jpg}` 展开成 file.png file.jpg; `echo {1..5}` 展开成 1 2 3 4 5

```bash
$ find /home -name .bashrc > list_right 2> list_error  # 将 stdout stderr 分别存到不同文件
$ find /home -name .bashrc 2> /dev/null                # 利用垃圾桶黑洞设备将错误信息丢弃(不显示错误信息)
$ find /home -name .bashrc > list 2> &1                # 当 stdout stderr 输出到同一个文件时应该这么写
$ find /home -name .bashrc > list 2> list  # 这种写法不能说错误，但这样两个数据流同时往一个文件写会造成顺序错乱

$ cat > catfile << "eofdd"
> This is a test.
> eofdd  # 由于有上面的设定，回车就会结束，而不需要输入 [Ctrl]+D，结果不含本行，注意，如果前面有空格则无效
```

#### 关于空格的问题

带空格的文件夹处理：1 使用转义'\ ' 2 使用引号。

命令里哪里加空格哪里不加：一般主命令 和 选项命令 以及后面的参数之间都有空格。

#### 一次输入多个命令

想一次执行多个指令，一种方法是采用 shell 脚本，而又一个方法是，一次性输入多个指令。

* `;` 不考虑指令间的相关性，连续执行指令
* `&&` 前一个指令执行成功才执行下一个指令
* `||` 前一个指令执行失败才执行下一个指令

##### 指令回传值

`?` 是一个特殊变量。这个变量代表的是上一个命令的回传值。也就是说，当我们运行某些命令的时候，这些命令都会回传一个运行后的代码。成功回传值为 0，否则就会回传错误代码。我们可以用 `$?` 在下个命令中读取上个命令的回传值。

回传值为 `&&` 和 `||` 的使用提供了依据。

#### `|` & `xargs` & `-`

管道是实现 “将前面的标准输出作为后面的标准输入” xargs 则是实现 “将标准输入作为命令的参数”

* 管道命令仅处理 stdout，对于 stderr 则直接忽略。
* 管道命令必须要支持 stdin 作为输入。
* 管道命令须直接跟在管道符号 `|` 后面。

很多命令不支持 `|` 管道来传递信息，所以有了 `xargs` 将 stdin 转换为 参数对这些命令提供支持。

```bash
$ find /sbin -perm +700 | ls -l         # 错误，ls 不属于管道命令
$ find /sbin -perm +700 | xargs ls -l   # 正确

$ echo "--help" | cat             # 显示 --help
$ echo "--help" | xargs cat       # 显示 cat 的详细帮助信息
```

管道符后不加 xargs 相当于先将 xargs 后面的命令回车执行一下，再由该命令从 stdin 读入管道符前面命令执行的结果内容；   
加上 xargs 相当于直接从键盘输入管道符前面命令执行的结果内容再回车，总结一下，就是回车的先后顺序不太一样。

在管道命令当中，常常会使用到前一个指令的 stdout 作为这次的 stdin，某些指令需要用到文件名来进行处理时，可以利用减号 `-` 来指明选项的结束，也就是告诉 bash 后续的输入应作为参数处理。

```bash
$ mkdir /tmp/homeback
$ tar -cvf - /home | tar -xvf - -C /tmp/homeback
```

A `--` signals the end of options and disables further option processing. Any arguments after the `--` are treated as filenames and arguments. An argument of `-` is equivalent to `--`.

### 命令行选项

```bash
# 长选项和其参数之间只能有 `=` 不能出现空格
$ npm ls --depth=0   # 不带空格，工作正常
# 错误用法
$ npm ls --depth= 0  # xx 选项和参数间带空格，无效

$ git bash --depth 1  # ok
$ git bash --depth=1  # ok
$ git bash --depth1   # xx

# 短选项和其参数之间的空格可选
$ du -d 1  # ok
$ du -d1   # ok
# 在带参情况下，每个选项前都要带 `-`
$ du -d1 -h  # ok
$ du -hd1    # ok
$ du -d1h    # xx
$ du -d1 h   # xx
$ du -d1-h   # xx

# 在 bash 里 `"` 和 `'` 如预期工作，双引号有变量置换功能，而单引号没有，但在 win 下好像有点问题
$ git commit -m 'abc de'  # win 下的提交记录为 `'abc de'`
$ git commit -m "abc de"  # win 下的提交记录为 `abc de`
```

> [命令行命令中短选项与长选项之间的差别](https://www.quora.com/Why-do-command-line-tools-have-a-short-version-and-a-long-version-for-options)  
> 早期只有短选项这种形式，长选项是后来才加入的。
> 短选项，只有一个字符，`-` 后可以跟多个设定项，方便录入，但可读性不强，对用户要求高。
> 长选项录入不便，但易读，适合在脚本中使用。
> 必要时，可以在最后一个选项后录入 `--` 或 `-`，用于告诉解析器选项结束，后面的是其他参数内容。


