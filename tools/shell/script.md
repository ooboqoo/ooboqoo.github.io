# Shell 脚本编程

https://github.com/qinjx/30min_guides/blob/master/shell.md   
http://tldp.org/LDP/abs/html/

## 认识 Shell 脚本

### 脚本示例

#### 最常见 test.sh 示例：

```bash
#!/bin/sh                      # 指定脚本解释器，这里用 /bin/sh 做解释器，其他常见的还有 #!/bin/bash
cd ~                           # 常规系统命令                                          #!/usr/bin/php
mkdir anydir
cd anydir

for ((i=0; i<10; i++)); do     # 循环体 - 头部
    touch test_$i.txt          # 循环体 - 内容
done                           # 循环体 - 结尾
```

* 脚本文件扩展名一般为 `.sh`，扩展名并不影响脚本执行，见名知意就好，如果采用 PHP 编写脚本，用 `.php` 也不错。
* 脚本文件第一行 `#!` 是个约定的标记，它告诉系统这个脚本需要用哪个解释器来执行。

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

即 Bourne shell，POSIX（Portable Operating System Interface）标准的 shell 解释器，它的二进制文件路径通常是 /bin/sh，由 Bell Labs 开发。CentOS 中的 /bin/sh 是一个指向 /bin/bash 符号链接。

#### bash

Bash 是 Bourne shell 的替代品，属 GNU Project，二进制文件路径通常是 /bin/bash。业界通常混用 bash、sh、和 shell。

#### 高级编程语言

理论上讲，只要一门语言提供了 **解释器**（而不仅是 **编译器**），这门语言就可以胜任脚本编程，常见的解释型语言都是可以用作脚本编程的，如 Perl Tcl Python PHP Ruby。Perl 是最老牌的脚本编程语言了，Python 这些年也成了一些 linux 发行版的预置解释器。

编译型语言，只要有解释器，也可以用作脚本编程，如 C shell 是内置的 /bin/csh，Java 有第三方解释器 Jshell。

### 选择脚本编程语言

#### 熟悉 vs 陌生

如果你已经掌握了一门编程语言（如 PHP、Python、Java、JavaScript），建议你就直接使用这门语言编写脚本程序。

#### 简单 vs 高级

如果你觉得自己熟悉的语言写 shell 脚本实在太啰嗦，你只是想做一些备份文件、安装软件、下载数据之类的事情，学着使用 sh，bash 会是一个好主意。shell 只定义了一个非常简单的编程语言，所以，如果你的脚本程序复杂度较高，或者要操作的数据结构比较复杂，那么还是应该使用 Python、Perl 这样的脚本语言，或者是你本来就已经很擅长的高级语言。因为 sh 和 bash 在这方面很弱。

#### 环境兼容性

如果你的脚本是提供给别的用户使用，使用 sh 或者 bash，你的脚本将具有最好的环境兼容性，perl 很早就是 linux 标配了，python 这些年也成了一些 linux 发行版的标配，而 Mac OS 更是默认安装了 perl、python、ruby、php、java 等主流编程语言。


## bash 脚本编程

### 变量

http://linux.vbird.org/linux_basic/0320bash.php#variable_var

```bash
name="gavin"  # 定义变量，没有前导`$`符号，变量名和等号之间不能有空格（这点可能与常见编程语言都不一样）
echo $name    # 使用变量，方式1: 变量名前加`$`，省掉了可选的花括号，但应付不了 `echo $nameotherwords` 这种场景
echo ${name}  # 使用变量，方式2: 采用 `${ }`，添加了可选的花括号，`${name}otherwords`，推荐用这种方式
name="ivan"   # 重定义变量
echo $name        # 输出 ivan
```

引用变量时，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界

#### 变量的设定规则

* 定义变量时，变量与变量内容以一个等号 `=` 来连结，**变量名和等号之间不能有空格**
* 变量名称只能是英文字母与数字，但是开头字符不能是数字
* 变量内容若含有空白字符可使用双引号 `"` 或单引号 `'`，双引号内的特殊字符保留其原意，单引号内的特殊字符则只按一般字符(纯文字)处理
* 可用转义字符 `\` 将特殊符号(如[Enter], $, \, 空格, '等)变成一般字符
* 在一串指令的执行中，还需要藉由其他额外的指令所提供的信息时，可以使用反单引号`` `指令` ``或`$(指令)`。
* 若该变量需要在其他子程序执行，则需要以 `export` 来使变量变成环境变量： `export PATH` 通常大写字符为系统预设变量，自行设定变量可以使用小写字符，方便判断(纯粹依照使用者兴趣与嗜好) 
* 取消变量的方法为使用 `unset` ：`unset 变量名称`

#### 变量的有效范围

有父进程与子进程的不同程序关系时，只有环境变量可以被子进程所引用，其他自定义变量内容就不会存在与子进程中，可以通过 `export` 将自定义变量导出为环境变量。

变量修改的有效时间：登出后再登入即恢复默认值，也就是说只存在于当前 shell 实例的生命周期内。

#### 用户输入、数组 与 声明

`read` 指令用于接收用于录入信息，格式为：

```bash
$ read [-pt] variableName
  -p 后面可以接提示信息
  -t 用于指定等待的秒数，默认一直等待
```

`declare` / `typeset` 两者功能是一样的，用于声明变量的类型

```bash
$ declare [-aixr] variable
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

### 注释

```bash
# This line is a comment.
echo "hello"  # Comments may also occur following the end of a command.
    # Comments may also follow whitespace at the beginning of a line.
    #+ and the following + sign helps to indicate the line break.
```

sh里没有多行注释，只能每一行加一个#号。如果在开发过程中，遇到大段代码需要临时注释起来，可以把这段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。













## 常用命令

shell 脚本结合系统命令便有了强大的威力，在字符处理领域，有 grep、awk、sed 三剑客，grep 负责找出特定的行，awk 能将行拆分成多个字段，sed 则可以实现更新插入删除等写操作。

撷取命令： cut, grep

排序命令： sort, wc, uniq

双向重导向： tee

字元转换命令： tr, col, join, paste, expand

分割命令： split


