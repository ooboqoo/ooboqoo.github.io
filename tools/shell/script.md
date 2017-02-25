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

```bash
name="gavin"  # 定义变量，没有前导`$`符号，变量名和等号之间不能有空格（这点可能与常见编程语言都不一样）
echo $name    # 使用变量 - 方式1: 变量名前加 `$`，省掉了可选的花括号，但应付不了 `echo $nameotherwords` 这种场景
echo ${name}  # 使用变量 - 方式2: 采用 `${ }`，添加了可选的花括号，`${name}otherwords`，推荐用这种方式
name="ivan"   # 重定义变量
echo $name        # 输出 ivan
```

* 定义变量时，没有前导的 `$` 符号，**变量名和等号之间不能有空格**
* 引用变量时，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界

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
