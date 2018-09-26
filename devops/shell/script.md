# Shell 脚本编程

https://github.com/qinjx/30min_guides/blob/master/shell.md   
http://tldp.org/LDP/abs/html/   
http://linux.vbird.org/linux_basic/0340bashshell-scripts.php

以下资源随便搜的，有时间再看看：   
https://en.wikibooks.org/wiki/Bash_Shell_Scripting （应该不错）   
http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html   
http://arachnoid.com/linux/shell_programming.html


## 认识 Shell 脚本

### 脚本示例

#### 最常见 test.sh 示例：

```bash
#!/bin/sh                      # 指定脚本解释器，其他常见的还有 /bin/bash /usr/bin/php
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

即 Bourne shell，POSIX (Portable Operating System Interface) 标准的 shell 解释器，它的二进制文件路径通常是 /bin/sh，由 Bell Labs 开发。CentOS 中的 /bin/sh 是一个指向 /bin/bash 符号链接。

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

如果你的脚本是提供给别的用户使用，使用 sh 或者 bash，你的脚本将具有最好的环境兼容性，perl 很早就是 linux 标配了，python 这些年也成了一些 linux 发行版的标配，而 Mac OS 更是默认安装了 perl、python、ruby、php、java 等主流编程语言。
