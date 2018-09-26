# Bash Shell Scripts


## Bash Script

Shell script 是利用 shell 的功能所写的程序，将一些 shell 的语法与命令(含外部命令)写在里面，搭配正则表达式、管道命令与数据流重定向等功能，以达到我们所想要的处理目的。

脚本编程的应用：

* 实现自动化管理：自动处理系统日常分析，实现简单入侵检测及响应
* 连续命令处理：系统的服务启动文件都是 .sh 文件，可以批量执行一系列命令

### 变量

http://linux.vbird.org/linux_basic/0320bash.php#variable_var

```bash
name="gavin"  # 定义变量，没有前导`$`符号，变量名和等号之间不能有空格（这点可能与常见编程语言都不一样）
echo $name    # 使用变量，方式1: 变量名前加`$`，省掉了可选的花括号，但应付不了 `echo $nameotherwords` 这种场景
echo ${name}  # 使用变量，方式2: 采用 `${ }`，添加了可选的花括号，`${name}otherwords`，推荐用这种方式
name="ivan"   # 重定义变量
echo $name      # 打印 ivan
echo ${name:-123} # "Parameter Expansion" 如果 $name 不存在就返回 123
```

注：引用变量时，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界。

#### 变量的设定规则

* 定义变量时，变量与变量内容以一个等号 `=` 来连结，**变量名和等号之间不能有空格**
* 变量名称只能是英文字母与数字，但是开头字符不能是数字
* 变量内容若含有空白字符可使用双引号 `"` 或单引号 `'`，双引号内的特殊字符保留其原意，单引号内的特殊字符则只按一般字符(纯文字)处理
* 可用转义字符 `\` 将特殊符号(如 换行, 空格, `$`, `\`, `'` 等)变成一般字符
* 在一串指令的执行中，还需要藉由其他额外的指令所提供的信息时，可以使用反单引号`` `指令` ``或`$(指令)`。
* 若该变量需要在其他子程序执行，则需要以 `export` 来使变量变成环境变量，如 `export PATH`。<br>通常大写字符为系统预设变量，自行设定变量可以使用小写字符，方便判断(纯粹依照使用者兴趣与嗜好) 
* 取消变量的方法为用 `unset 变量名称`

#### 变量的有效范围

有父进程与子进程的不同程序关系时，只有环境变量可以被子进程所引用，其他自定义变量内容就不会存在于子进程中，可以通过 `export` 将自定义变量导出为环境变量。如果对环境变量重新赋值但没有 `export`，对其他进程也是不可见的。

变量修改的有效时间：登出后再登入即恢复默认值，也就是说只存在于当前 shell 实例的生命周期内。

#### 用户输入、数组 与 声明

`read` 指令用于接收用于录入信息，格式为：

```bash
$ read [-pt] variableName
  -p 后面可以接提示信息
  -t 用于指定等待的秒数，默认一直等待
```

```bash
read -p "Please inout your first name: " firstname
read -p "Please inout your last name: " lastname
echo -e "\nYour full name is: $firstname $lastname"
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

#### Parameter Expansion

|                      | 参数存在并非 null  | 参数存在但是 null | 参数不存在
|----------------------|--------------------|-------------------|-------------
| `${parameter:-word}` | ${parameter}       | word              | word
| `${parameter-word}`  | ${parameter}       | null              | word
| `${parameter:=word}` | ${parameter}       | assign word       | assign word
| `${parameter=word}`  | ${parameter}       | null              | assign word
| `${parameter:?word}` | ${parameter}       | error, exit       | error, exit
| `${parameter?word}`  | ${parameter}       | null              | error, exit
| `${parameter:+word}` | word               | null              | null
| `${parameter+word}`  | word               | word              | null


### 注释

```bash
# This line is a comment.
echo "hello"  # Comments may also occur following the end of a command.
    # Comments may also follow whitespace at the beginning of a line.
    #+ and the following + sign helps to indicate the line break.
```

sh 里没有多行注释，只能每一行加一个#号。如果在开发过程中，遇到大段代码需要临时注释起来，可以把这段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

### 其他语法

|||
|--------|---------------------------------------------------------------------------------
| `.`     | 与 `source` 命令一样，从文件中读取并执行命令。
| `:`     | 该命令什么都不做，但执行后会返回一个正确的退出代码，即 exit 0。比如用在 if 语句中。
| `( )`   | 在子 shell 中执行命令块（多个命令组合组成的命令组）。
| `{ }`   | 在当前 shell 中执行命令块，<br>注意：`()` 里面两边可以不使用空格，但 `{` 后必须使用空格，且最后一个命令需要以 `;` 结尾，表示命令结束。<br> 如：`A=123;(A=abc;echo $A);echo $A` `A=123;{ A=abc;echo $A;};echo $A`
| `[ ]`   | `[]` 比较符号与 `test` 命令一样，用于比较值以及检查文件类型。
| `[[ ]]` | `[[]]` 可以说是 `[]` 的增强版，它能够将多个 `test` 命令支持的测试组合起来，<br>如：`[[ (-d "$HOME") && (-w "$HOME") ]]`
| `(( ))` | 专门来做数值运算，如果表达式求值为 0，则设置退出状态为 1；如果求值为非 0 值，则设置为 0。算术只对整数进行。<br>如：`i=99;((i++));echo $i` `echo $((2**3))` <br>注意：使用 (( )) 时，不需要空格分隔各值和运算符，使用 [] 和 [[ ]] 时需要用空格分隔各值和运算符。

#### Brace expansion

```bash
ls file{1,2,3,4,5}.txt    # 等效于：
ls file1.txt file2.txt file3.txt file4.txt file5.txt
```

#### 数值运算

```bash
echo $((1 + 2 * 3))   # 格式：$((计算式))
```

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

#### 利用判断符号 `[]`

判断符号等同于 `test` 命令，只是以一种更为直观的形式展现。

```bash
$ [ -z "$HOME" ]; echo $?
$ [ "$HOME" == "$MALL" ]
```

使用中括号必须要特别注意，因为中括号用在很多地方，包括通配符和正则表达式，所以用做判断式时有特殊的规定：

* 中括号内的每个组件都需要有空格键来分隔
* 中括号中的变量和常量，最好用双引号括起来

### 条件判断

命令执行成功返回 `0`，也就是说 `0` 对应的是 `true`，而在其他编程语言中，一般 `0` 代表 `false`，其实在 bash 的算术运算中，`0` 对应的也是 `false`，所以记牢命令返回码的特殊性就好了。

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

### 循环

#### 不定循环

```bash
while [ "$yn" != "yes" -a "yn" != "YES" ]
do
  read -p "Please input yes/YES ti stop this program: " yn
done

until [ "$yn" != "yes" -o "yn" != "YES" ]
do
  read -p "Please input yes/YES ti stop this program: " yn
done
```

#### 固定循环

```bash
users=$(cut -d ':' -f1 /etc/passwd)
for username in $users
do
  id $username
done

for (( i=1; i<5; i++ )) do
  echo $i
done
```

### 调试

```bash
$ bash [-nvx] script.sh
  # -n: 不要执行 script, 经查询语法的问题
  # -v: 在执行 script 前先在屏幕上输出 script 内容
  # -x: 将使用到的 script 内容显示到屏幕上，这是很有用的内容
```


## 常用命令

shell 脚本结合系统命令便有了强大的威力，在字符处理领域，有 grep、awk、sed 三剑客，grep 负责找出特定的行，awk 能将行拆分成多个字段，sed 则可以实现更新插入删除等写操作。

撷取命令： cut, grep

排序命令： sort, wc, uniq

双向重导向： tee

字元转换命令： tr, col, join, paste, expand

分割命令： split


