# Bash Shell Scripts


## Shell 脚本编程

https://github.com/qinjx/30min_guides/blob/master/shell.md   
http://tldp.org/LDP/abs/html/   
http://linux.vbird.org/linux_basic/0340bashshell-scripts.php

以下资源随便搜的，有时间再看看：   
https://en.wikibooks.org/wiki/Bash_Shell_Scripting （应该不错）   
http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html   
http://arachnoid.com/linux/shell_programming.html


### 脚本示例

#### 最常见 test.sh 示例：

```bash
#!/bin/bash                    # 指定脚本解释器，其他常见的还有 /bin/sh /usr/bin/php
cd ~                           # 常规系统命令
mkdir anydir
cd anydir

for ((i=0; i<10; i++)); do     # 循环体 - 头部
    touch test_$i.txt          # 循环体 - 内容
done                           # 循环体 - 结尾
```

* 脚本文件扩展名一般为 `.sh`，扩展名并不影响脚本执行，见名知义就好，如果采用 PHP 编写脚本，用 `.php` 也不错。
* 脚本文件第一行 `#!` 是个约定的标记，它告诉系统这个脚本需要用哪个解释器来执行。

##### shebang 写法说明

https://en.wikipedia.org/wiki/Shebang_%28Unix%29

```bash
#!/usr/bin/env node
// js codes
```

因为 `node` 不一定总是在 `/usr/bin/node`，但这里又要求指定绝对路径(即不能这样写 `#!node`)，所以一般都采用 `#!/usr/bin/env node`，因为 `env` 的位置都是确定的，使用 `env` 命令来查找 `node`，这样更加灵活。

#### PHP 脚本示例：

```php
#!/usr/bin/php
<?php
for ($i = 0; $i < 10; $i++) {
    echo $i . "\n";
}
```

#### 执行脚本：

```bash
$ /usr/bin/php test.php  # 方式1 作为解释器参数，这种方式其实不需要在第一行指定解释器信息，写了也没用。

$ chmod +x test.php      # 方式2 作为可执行程序，注意，一定要写成 ./test.php，而不是 test.php
$ ./test.php             # 直接写 test.php，系统只会去 PATH 里找，但你的当前目录通常不在 PATH 里
```

### 脚本解析器

#### sh

即 Bourne shell，POSIX (Portable Operating System Interface) 标准的 shell 解释器，它的二进制文件路径通常是 /bin/sh，由 Bell Labs 开发。

CentOS 中的 /bin/sh 是一个指向 /bin/bash 符号链接。在 Debian 或 Ubuntu 下 /bin/sh 并没有指向 /bin/bash，所以原先在 CentOS 下没问题的脚本会出问题，如 `[[ ]]` 判断突然就报错了...

#### bash

Bash 是 Bourne shell 的替代品，属 GNU Project，二进制文件路径通常是 /bin/bash。业界通常混用 bash、sh、和 shell。

#### 高级编程语言

理论上讲，只要一门语言提供了 **解释器** (而不仅是 **编译器**) ，这门语言就可以胜任脚本编程，常见的解释型语言都是可以用作脚本编程的，如 Perl Tcl Python PHP Ruby。Perl 是最老牌的脚本编程语言了，Python 这些年也成了一些 linux 发行版的预置解释器。

编译型语言，只要有解释器，也可以用作脚本编程，如 C shell 是内置的 /bin/csh，Java 有第三方解释器 Jshell。

### 选择脚本编程语言

#### 熟悉 vs 陌生

如果你已经掌握了一门编程语言如 (PHP、Python、Java、JavaScript)，建议你就直接使用这门语言编写脚本程序。

#### 简单 vs 高级

如果你觉得自己熟悉的语言写 shell 脚本实在太啰嗦，你只是想做一些备份文件、安装软件、下载数据之类的事情，学着使用 sh，bash 会是一个好主意。shell 只定义了一个非常简单的编程语言，所以，如果你的脚本程序复杂度较高，或者要操作的数据结构比较复杂，那么还是应该使用 Python、Perl 这样的脚本语言，或者是你本来就已经很擅长的高级语言。因为 sh 和 bash 在这方面很弱。

#### 环境兼容性

如果你的脚本是提供给别的用户使用，使用 sh 或者 bash，你的脚本将具有最好的环境兼容性，perl 很早就是 linux 标配了，python 这些年也成了一些 linux 发行版的标配，而 macOS 更是默认安装了 perl、python、ruby、php、java 等主流编程语言。


















## Bash Script

Shell script 是利用 shell 的功能所写的程序，将一些 shell 的语法与命令(含外部命令)写在里面，搭配正则表达式、管道命令与数据流重定向等功能，以达到我们所想要的处理目的。

脚本编程的应用：

* 实现自动化管理：自动处理系统日常分析，实现简单入侵检测及响应
* 连续命令处理：系统的服务启动文件都是 .sh 文件，可以批量执行一系列命令

### 变量

http://linux.vbird.org/linux_basic/0320bash.php#variable_var

```bash
$ name="gavin"  # 定义变量，没有前导`$`符号，变量名和等号之间不能有空格（这点可能与常见编程语言都不一样）
$ echo $name    # 使用变量，省掉了可选的花括号，`$nameotherwords` 无法正确解析
$ echo ${name}  # 使用变量，添加了可选的花括号，`${name}otherwords`，推荐用这种方式
$ name="ivan"       # 重定义变量
$ echo $name        # 打印 ivan
$ echo ${name:-123} # "Parameter Expansion" 如果 $name 不存在就返回 123
```

注：引用变量时，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界。

```bash
$ unset work                           # 删除变量；
$ export work                          # 导出为环境变量
$ env                   # 查看环境变量
$ set                   # 查看所有变量(环境变量+自定义变量)
```

#### 变量的设定规则

* 定义变量时，变量与变量内容以一个等号 `=` 来连结，**变量名和等号之间不能有空格**
* 变量名称只能是英文字母与数字，但是开头字符不能是数字
* 变量内容若含有空白字符可使用双引号 `"` 或单引号 `'`，双引号内的特殊字符有效，单引号内的特殊字符作为纯文本处理
* 可用转义字符 `\` 将特殊符号(如 换行, 空格, `$`, `\`, `'` 等)变成一般字符
* 在一串指令的执行中，还需要藉由其他额外的指令所提供的信息时，可以使用反单引号`` `指令` `` 或 `$(指令)`。
* 若该变量需要在其他子程序执行，则需要以 `export` 来使变量变成环境变量，如 `export PATH`。<br>通常大写字符为系统预设变量，自行设定变量可以使用小写字符，方便判断(纯粹依照使用者兴趣与嗜好) 
* 取消变量的方法为用 `unset 变量名称`

#### 变量的有效范围

有父进程与子进程的不同程序关系时，只有环境变量可以被子进程所引用，其他自定义变量内容就不会存在于子进程中，可以通过 `export` 将自定义变量导出为环境变量。如果对环境变量重新赋值但没有 `export`，对其他进程也是不可见的。

变量修改的有效时间：登出后再登入即恢复默认值，也就是说只存在于当前 shell 实例的生命周期内。

#### 用户输入、数组 与 声明

`read` 指令用于接收用户录入信息，格式为：

```bash
$ read [-pt] variableName
  -p  prompt 后面可以接提示信息
  -t  timeout 用于指定等待的秒数，默认一直等待
```

```bash
read -p "Please inout your first name: " firstname
read -p "Please inout your last name: " lastname
echo -e "\nYour full name is: $firstname $lastname"
```

`declare` / `typeset` 两者功能是一样的，用于声明变量的类型

```bash
# Set variable values and attributes.
$ declare [-aAfFgilnrtux] [-p] [name[=value] ...]
  -a ：将后面名为 variable 的变量定义成为数组 (array) 类型
  -i ：将后面名为 variable 的变量定义成为整数数字 (integer) 类型
  -x / +x ：用法与 export 一样，就是将后面的 variable 变成环境变量；+x 用于把变为环境变量的普通变量变回来
  -r ：将变量设定成为 readonly 类型，该变量不可被更改内容，也不能 unset
```

```bash
$ sum=10+30+50
$ echo $sum  # 输出 10+30+50 而非 90，因为默认为 string 类型，而且 bash 中的计算不支持 float
$ var[0]="some words"  # 数组操作演示，目前 bash 只提供一维数组
$ echo ${var[0]}
```

#### shell script 中的默认变量

```bash
$ /etc/init.d/syslog restart  # 原理：syslog 是一个可执行脚本文件，restart 是其第一个参数
```

当执行一个脚本文件时，脚本文件中可用的变量：

```bash
$ /path/to/scriptname opt1 opt2 opt3 opt4  # 所执行的脚本指令
        $0             $1   $2   $3   $4   # 脚本中相对应的变量
```

另外，脚本中还有一些可调用的特殊变量：

|||
|-------|-----------
| `$#`  | 参数个数
| `$@`  | 完整的参数内容，代表 `"$1" "$2" "$3" "$4"`
| `$*`  | 完整的参数内容，代表 `"$1c$2c$3c$4"` 其中 c 为分隔符，默认为空格

`shift` 用来移动参数变量：

```bash
echo "Total parameter number is ==> $#"  # 此处假设执行是输入了4个参数，则这里应该是 4
shift 3
echo "Total parameter number is ==> $#"  # 此处输出为 1
```

#### 环境变量

为了与自定义变量区分，环境变量通常以大写字符来表示：PATH HOME MAIL SHELL

### 其他语法

|||
|---------|---------------------------------------------------------------------------------
| `.`     | 与 `source` 命令一样，从文件中读取并执行命令。
| `:`     | 该命令什么都不做，但执行后会返回一个正确的退出代码，即 exit 0。比如用在 if 语句中。
| `( )`   | 在子 shell 中执行命令块（多个命令组合组成的命令组）。
| `{ }`   | 在当前 shell 中执行命令块，<br>注意：`()` 里面两边可以不使用空格，但 `{` 后必须使用空格，且最后一个命令需要以 `;` 结尾，表示命令结束。<br> 如：`A=123;(A=abc;echo $A);echo $A` `A=123;{ A=abc;echo $A;};echo $A`
| `[ ]`   | `[]` 比较符号与 `test` 命令一样，用于比较值以及检查文件类型。
| `[[ ]]` | `[[]]` 可以说是 `[]` 的增强版，它能够将多个 `test` 命令支持的测试组合起来，<br>如：`[[ (-d "$HOME") && (-w "$HOME") ]]`
| `(( ))` | 专门来做数值运算，如果表达式求值为 0，则设置退出状态为 1；如果求值为非 0 值，则设置为 0。算术只对整数进行。<br>如：`i=99;((i++));echo $i` `echo $((2**3))` <br>注意：使用 (( )) 时，不需要空格分隔各值和运算符，使用 [] 和 [[ ]] 时需要用空格分隔各值和运算符。

### 执行方式的区别

```bash
$ source ./sh02.sh  # 方式1 将脚本导入到当前进程执行，脚本中修改的变量影响当前环境
$ . ./sh02.sh
$ ./sh02.sh         # 方式2 会新开一个子进程执行，脚本中设定的变量在当前环境不可用
$ bash sh02.sh
```

### 善用判断式

#### `test` 命令

```bash
$ test -e /dmtsai && echo "exist" || echo "Not exist"  # 具体用法见 man test
```

```bash
# 判断空字符串(可以含空格)
$ empty_str="  "
$ test -z $(echo ${empty_str}) && echo "empty" || echo "not empty"
$ [[ -z "${empty_str// }" ]] && echo "empty" || echo "not empty"  # ${var/pattern/string}
```

#### 利用判断符号 `[]`

判断符号等同于 `test` 命令，只是以一种更为直观的形式展现。

```bash
$ [ -z "$HOME" ]; echo $?
$ [ "$HOME" == "$MALL" ]
```

使用中括号必须要特别注意，因为中括号用在很多地方，包括通配符和正则表达式，所以用做判断式时有特殊的规定：

* 中括号内的每个组件都需要有 *空格* 来分隔
* 中括号中的变量和常量，最好用 *双引号* 括起来

### 条件判断

命令执行成功返回 `0`，也就是说 `0` 对应的是 `True`，而在其他编程语言中，一般 `0` 代表 `False`，其实在 bash 的算术运算中，`0` 对应的也是 `False`，所以记牢命令返回码的特殊性就好了。

Bash 中的 `if` `then` 等都是单独的 *commands*，结构体是由这些命令组成的，知道这一点对理解结构体的写法会很有帮助。

#### if...then

```bash
if command1 ; then
   command2
fi
```

```bash
if [ "$1" == "hello" ]; then
  echo "Hello, how are you ?"
elif ["$1" == "" ]; then
  echo "You MUST input parameters, ex> {$0 someword}"
else
  echo "The only parameter is 'hello', ex> {$0 hello}"
fi
```

#### case...esac

```bash
case $1 in
  "one")
    echo "Your choice is ONE"
    ;;
  "two")
    echo "Your choice is TWO"
    ;;
  *)
    echo "Usage $0 {one|tow}"
    ;;
esac
```

#### function

```bash
function printit() {
  echo "Your choice is $1"  # 这个指向的是函数的第1个参数
}
printit $2                  # 这个指向的是脚本的第2个参数
```

### 调试

```bash
$ bash [-nvx] script.sh
  # -n: 不要执行 script, 只查询语法的问题
  # -v: 在执行 script 前先在屏幕上输出 script 内容
  # -x: 将使用到的 script 内容显示到屏幕上，这是很有用的内容
```


## FAQ

### set -e

```bash
set -ex             # 用法1：单独用 set 指令配置参数
#!/bin/bash -ex     # 用法2：直接在首行指定参数  在 `bash build.sh` 下无效；`./build.sh` 生效
```

```bash
# Exit immediately if pipeline/list/(compound command) returns non-zero status
# reference https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e

# Print a trace of simple commands, for commands, case commands, select commands,
# and arithmetic for commands and their arguments or associated word lists
# after they are expanded and before they are executed.
# 打印简单命令、for命令、case命令、select命令、算术for命令 及其参数或相关词表，在展开后、执行前的信息。
set -x
```

实例展示 `-x` 参数的效果，会输出 `+ 实际bash脚本指令`，更易调试

```bash
npm run build
cp -RL package.json package-lock.json src/index.js idl output
```

```txt
$ bash build.sh

> centaurus-bff@0.1.0 build /Users/gavin/dev/Centaurus/centaurus-bff
> rm -rf ./output && tsc

cp: package-lock.json: No such file or directory

```

```txt
$ bash build.sh
+ npm run build

> centaurus-bff@0.1.0 build /Users/gavin/dev/Centaurus/centaurus-bff
> rm -rf ./output && tsc

+ cp -RL package.json package-lock.json src/index.js idl output
cp: package-lock.json: No such file or directory
```

### built-in commands

```txt
builtin, !, %, ., :, @, [, {, }, alias, alloc, bg, bind, bindkey, break, breaksw, builtins, case, cd, chdir, command, complete, continue, default, dirs, do, done, echo, echotc, elif, else, end, endif, endsw, esac, eval, exec, exit, export, false, fc, fg, filetest, fi, for, foreach, getopts, glob, goto, hash, hashstat, history, hup, if, jobid, jobs, kill, limit, local, log, login, logout, ls-F, nice, nohup, notify, onintr, popd, printenv, printf, pushd, pwd, read, readonly, rehash, repeat, return, sched, set, setenv, settc, setty, setvar, shift, source, stop, suspend, switch, telltc, test, then, time, times, trap, true, type, ulimit, umask, unalias, uncomplete, unhash, unlimit, unset, unsetenv, until, wait, where, which, while
```

查看内置命令的帮助信息要用 `help xxx` 而不是 `xxx --help`，另外，在 ZSH 下面没有 `help` 内置指令，需要先切到 bash 下才行。

判断一个命令是否是内置指令，可以通过 `type xxx` 来查看。

### 常用命令

shell 脚本结合系统命令便有了强大的威力，在字符处理领域，有 grep、awk、sed 三剑客，grep 负责找出特定的行，awk 能将行拆分成多个字段，sed 则可以实现更新插入删除等写操作。

撷取命令： cut, grep

排序命令： sort, wc, uniq

双向重导向： tee

字元转换命令： tr, col, join, paste, expand

分割命令： split


