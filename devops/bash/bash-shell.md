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

#### 字符串 Quoting

Quoting is used to remove the special meaning of certain characters or words to the shell.

||
|-------|----------------------------------------------------
| `\`   | 转义单个字符
| `''`  | 单引号内的所有内容都会被认为是普通字符串
| `""`  | 双引号内的字符串仅 `$` <code>\`</code> `\` 保留特殊含义

```bash
# Escape Character
# 没有用引号包裹的 \ 表示保留紧随字符的字面意义，当用在行尾时取消换行执行功能
$ echo $HOME\n\n12\\3       # 打印 /Users/gavinnn12\3

# Single Quotes    ''
# 单引号内的所有内容都会被认为是普通字符串，字符串内无法出现 '
$ echo '$HOME\n\n12\\3'     # 打印 $HOME\n\n12\\3

# Double Quotes    ""
# 双引号内的字符串仅 $ ` \ 保留特殊含义，\ 仅在 $ ` " \ newline 前才被认为是转义符
$ echo "$HOME\n\n12\\3"     # 打印 /Users/gavin\n\n12\3

# ANSI-C Quoting    $''
# 根据 ANSI C 标准处理特殊字符，如 \b \n \t \nnn \xHH
$ echo $'$HOME\n\n12\\3'    # 打印 $HOME<空行>12\3

# Locale-Specific Translation    $""
# 当 locale 是 C 或 POSIX 时会忽略前置 $
$ echo $"$HOME\n\n12\\3"
```

#### 注释 Comments

`#` 及其后(在同一行内)的内容被视为注释。在交互模式下注释(默认)无效。

没有多行注释。如需临时注释大段代码，可以用一对花括号括起来，定义成一个函数，以起到和注释一样的效果。

### Shell Commands

#### 简单命令 Simple Commands

命令分隔(结束)符 `;` `newline`

#### 管道 Pipelines

```bash
[time [-p]] [!] command1 [ | or |& command2 ] …
```

管道符 `|` `|&` (`|&` 会同时传递 stderr，即相当于 `2>&1` 的简写)  

#### 命令串 Lists of Commands

A list is a sequence of one or more pipelines separated by one of the operators `;` `&` `&&` `||`, and optionally terminated by one of `;` `&` `newline`.

`&` 开子 shell 执行命令(即后台执行)  
`&&` 前个命令成功才会持续后一个命令  
`||` 前一个命令失败才执行后一个命令  
`;` 不考虑指令间的相关性，连续执行指令

#### 复合命令 Compound Commands

##### 循环结构 Looping Constructs

```bash
# until
until test-commands; do consequent-commands; done
# while
while test-commands; do consequent-commands; done
# for
for name [ [in [words ...] ] ; ] do commands; done
# for
for (( expr1 ; expr2 ; expr3 )) ; do commands ; done  # ) ; 中间的空格不能省
# break  continue
```

不定循环

```bash
while [[ "$yn" != "yes" -a "yn" != "YES" ]]
do
  read -p "Please input yes/YES to stop this program: " yn
done

until [ "$yn" != "yes" -o "yn" != "YES" ]
do
  read -p "Please input yes/YES to stop this program: " yn
done
```

固定循环

```bash
users=$(cut -d ':' -f1 /etc/passwd)
for username in $users
do
  id $username
done

for char in a b c; do echo $char; done
for (( i=1; i<5; i++ )) ; do echo $i; done
```

##### 条件结构 Conditional Constructs

```bash
# if
if test-commands; then
  consequent-commands;
[elif more-test-commands; then
  more-consequents;]
[else alternate-consequents;]
fi
# case
case word in
  [ [(] pattern [| pattern]...) command-list ;;]...
esac
# select
select name [in words ...]; do commands; done
```

```bash
(( expression ))  # let "expression"
[[ expression ]]
( expression )
! expression
expression1 && expression2
expression1 || expression2
```

```bash
if [[ $(diff package.json ../package.json) != '' ]]; then
  cp -f package.json ../package.json
  npm install
fi
```

```bash
if [ 1=1 ]; then echo 1=1; echo true; fi
```

```bash
echo -n "Enter the name of an animal: "
read ANIMAL
echo -n "The $ANIMAL has "
case $ANIMAL in
  horse | dog | cat) echo -n "four";;
  man | kangaroo ) echo -n "two";;
  *) echo -n "an unknown number of";;
esac
echo " legs."
```

##### Grouping Commands

```bash
( list )   # 新开一个 subshell 来执行命令
{ list; }  # 在当前 shell 执行命令，list 后面必须带 `;` 或 `newline`
```

#### Coprocesses & GNU Parallel

```bash
coproc [NAME] command [redirections]
```

`parallel`  can replace `xargs` or feed commands from its input sources to several different instances of Bash.

```bash
ls | parallel mv {} destdir
```

### Shell Functions

Shell functions are a way to group commands for later execution using a single name for the group. They are executed just like a "regular" command. Shell functions are executed in the current shell context; no new process is created to interpret them.

```bash
# 格式1  省略 function 关键字
name () compound-command [ redirections ]
# 格式2  使用 function 关键字
function name [()] compound-command [ redirections ]
# 删除函数定义
$ unset -f name
```

```bash
$ foo () {
> echo line1
> echo line2
> }
# foo () { echo line1; echo line2; }
$ foo  # 打印 line1\nline2

$ unset -f foo
$ foo  # command not found
```

`local`

```bash
func1 () {
  local var='func1 local'
  func2
}
func2 () {
  echo "In func2, var = $var"  # var 的值为 'func1 local'
}
var=global
func1
```

### Shell Parameters

```
name=[value]
```

#### Positional Parameters

```bash
foo () { echo $1 ${10}; }           # $ 仅适用于1位数字时，${} 则一直适用
foo a1 a2 a3 a4 a5 a6 a7 a8 a9 a10  # 打印 a1 a10
```

#### Special Parameters

下面是一些特殊参数，这些参数都是只读的

|||
|------|---------------------------
| `$*` | the positional parameters, starting from one.
| `$@` | 
| `$#` | 
| `$?` | 
| `$-` | 
| `$$` | 当前 shell 进程的 ID
| `$!` | 
| `$0` | the name of the shell or shell script
| `$_` | 文档看不太懂, 实测是最近一次控制台打印的值

### Shell Expansions

The order of expansions is: brace expansion; tilde expansion, parameter and variable expansion, arithmetic expansion, and command substitution (done in a left-to-right fashion); word splitting; and filename expansion.

#### Brace Expansion

```bash
$ echo a{d,c,b}e  # 打印 ade ace abe
```

#### Tilde Expansion

```bash
$ echo ~/foo  # $HOME/foo
$ ~gavin/foo  # /user/gavin/foo
$ ~+/foo      # $PWD/foo
```

#### Shell Parameter Expansion

|                      | 参数存在并非 null | 参数存在但是 null | 参数不存在
|----------------------|------------------|------------------|-------------
| `${parameter:-word}` | ${parameter}     | word             | word
| `${parameter-word}`  | ${parameter}     | null             | word
| `${parameter:=word}` | ${parameter}     | assign word      | assign word
| `${parameter=word}`  | ${parameter}     | null             | assign word
| `${parameter:?word}` | ${parameter}     | error, exit      | error, exit
| `${parameter?word}`  | ${parameter}     | null             | error, exit
| `${parameter:+word}` | word             | null             | null
| `${parameter+word}`  | word             | word             | null

```bash
$ string=01234567890abcdefgh
$ echo ${string:7}      # 7890abcdefgh
$ echo ${string:7:2}    # 78
$ echo ${string:7:-2}   # 7890abcdef
$ echo ${string: -7}    # bcdefgh
$ echo ${string: -7:-2} # bcdef

$ set -- 01234567890abcdefgh
$ echo ${1:7}           # 7890abcdefgh

$ array[0]=01234567890abcdefgh
$ echo ${array[0]:7}    # 7890abcdefgh

$ array=(0 1 2 3 4 5 6 7 8 9 0 a b c d e f g h)
$ echo ${array[@]:7:2}  # 7 8
```

#### Command Substitution

`$(command)` or `` `command` ``

```bash
$ echo pwd $(pwd)    # pwd /root
```

#### Arithmetic Expansion

`$(( expression ))`

```bash
$ echo $((1 + 9/2))  # 5
```

Process Substitution

Word Splitting

Filename Expansion

### Redirections

`>` `>|` `<` `>>` `<<` `<>` `<<<`

3.6.1 Redirecting Input  
3.6.2 Redirecting Output  
3.6.3 Appending Redirected Output  
3.6.4 Redirecting Standard Output and Standard Error  
3.6.5 Appending Standard Output and Standard Error  
3.6.6 Here Documents  
3.6.7 Here Strings  
3.6.8 Duplicating File Descriptors  
3.6.9 Moving File Descriptors  
3.6.10 Opening File Descriptors for Reading and Writing

### Executing Commands

3.7.1 Simple Command Expansion  
3.7.2 Command Search and Execution  
3.7.3 Command Execution Environment  
3.7.4 Environment  
3.7.5 Exit Status  
3.7.6 Signals


## Shell Builtin Commands


## Shell Variables


## Bash Features


## Job Control


## Command Line Editing

### vi 模式

https://github.com/pkrumins/bash-vi-editing-mode-cheat-sheet/

Bash 默认用的 emacs 模式(该模式下快捷键参考 Emacs 笔记)，必要时可切换到 vi 模式。

```bash
$ set -o vi     # 切换默认的 emacs 模式到 vi 模式
$ set -o emacs  # 切换回默认的 emacs 模式
```

默认 vi 模式下无法区分当前处于编辑模式还是正常模式，可通过设置 Readline 的配置 _.inputrc_ 解决:

```
# requires >= Bash 4.3
set show-mode-in-prompt on
```

在正常模式按 `v` 可输入大段命令并在保存时执行，默认用的 nano 编辑器，可设置 `EDITOR=vim` 或 `VISUAL=vi` 换成 vim。

在 emacs 模式下按 `C-xC-e` 也可输入大段命令，具体参阅 man 中的 edit-and-execute-command 部分。


## 待整理

### Shell Scripts

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
| `{ }`  | 1. 变量原型 `${var}` 或<br> 2. 命令块，在当前 shell 执行，第一个命令和左括号之间必须要有一个空格<br> 3. 扩展表达式

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


