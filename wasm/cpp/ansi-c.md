# ANSI C

<script>ooboqoo.contentsRegExp = /H[123]/;</script>

## 起步

### 简介

汇编语言依赖于计算机的内部机器语言，针对特定计算机处理器开发的程序无法移植到另一种计算机上。Ritchie 希望有一种语言能将低级语言的效率、硬件访问能力和高级语言的通用性、可移植性融合在一起，于是开发了 C 语言。C 语言通过 **编译器** 将高级语言翻译成特定计算机的内部语言。

### 编译链接

`cc` 原是 标准 UNIX C 编译器，在 Linux 下指向 `gcc`，在 macOS 下指向 `clang`，他们都支持对 `.c` 文件进行编译。

```bash
$ cc hello.c world.c  # 生成一个名为 a.out 的可执行文件和两个目标代码文件 hello.o 和 world.o
$ cc hello.c world.o  # 如果只更改了 hello.cpp，就不需要再编译 world.c 可以直接用 world.o
```

从源代码到可执行文件，大概要经历这么几个过程
* Coding *编写* 程序并保存到文件中，这个就是程序的 **源代码**
* Preprocessing *预编译* 去除注释、导入头部文件、执行宏替换
* Compiling *编译* 将源代码翻译为主机使用的内部语言——机器语言，输出 **目标代码 object code**
* Linking 将目标代码与其他代码(启动代码、库代码等) *链接* 起来生成 **可执行代码**

常见编译器介绍
* `cc` UNIX C Cimpiler
* `CC` UNIX C++ compiler
* `gcc` GNU C Compiler from the GCC (GNU Compiler Collection)
* `g++` GNU C++ Compiler from the GCC
* `clang` C, C++, and Objective-C Compiler

```bash
# Pretty printing from the AST
$ clang -cc1 ~/t.c -ast-print

# C++
$ clang++ -Wall -std=c++11 test.cc -o test
```

IDE 中相关菜单项介绍
* Compile 编译 -- 对当前打开的文件进行编译
* Build 建立 / Make 生成 -- (递增)编译项目中的所有源代码文件，未作更改的不会重新编译
* Build All 全部建立 -- 重新编译所有的源代码文件
* Link 链接 -- 将编译后的源代码与所需的库代码组合到一起
* Execute 执行 / Run 运行 -- 运行程序
* Debug 调试 -- 以步进方式执行程序

### 内存模型

<img src="https://media.geeksforgeeks.org/wp-content/uploads/memoryLayoutC.jpg"
     style="position: absolute; right: 0; z-index: -1; width: 364px;">

https://www.geeksforgeeks.org/memory-layout-of-c-program/

A typical memory representation of C program consists of following sections.
1. **code segment 代码区** 存放程序执行代码，此区域通常是只读的
2. **data segment 数据区** 存放全局变量和静态变量
  1. **initialized read-only area** 一般常量和字符串常量
  2. **initialized read-write area** 声明并初始化过的全局变量和静态变量
  3. **uninitialized data segment** 只声明而未初始化的全局变量和静态变量
3. **heap 堆** 程序允许中动态分配的内存段，可动态扩张或缩减。地址由低位向高位增长
4. **stack 栈** 存放 automatic variables。地址由高位向低位增长

注：  
BSS(Block Started by Symbol)区 的变量会被系统赋初始值 `0` 。  
局部的字符串常量是存放在全局的常量区还是栈区，不同的编译器有不同的实现。  


```bash
$ cc dummy.c
$ size a.out  # print the size of the sections in an object file
```

### 变量存储类别

C 语言根据 *变量的生存周期* 来划分，可以分为 *静态存储* 方式和 *动态存储*方式。

C语言中 *存储类别* 又分为四类：自动 `auto`、静态 `static`、寄存器的 `register` 和外部的 `extern`。

1. 用关键字 `auto` 定义的变量为自动变量，auto 可以省略，auto 不写则隐含定为“自动存储类别”，属于动态存储方式。
2. 用 `static` 修饰的为静态变量，如果定义在函数内部的，称之为静态局部变量；如果定义在函数外部，称之为静态外部变量。
3. 为了提高效率，C 语言允许将局部变量的值放在 CPU 的寄存器中，这种变量叫“寄存器变量”，用关键字 `register` 作声明。
4. 用 `extern` 声明的变量是外部变量，外部变量的意义是某函数可以调用在该函数之后定义的变量。

**内部变量** 与 **外部变量** (抑或称为局部变量和全局变量)
Variables may be internal to a function, external but known only within a single source file, or visible to the entire program.

```c
void func () {
  static int x = 0;
  x++;
  printf("x=%d\n"; x);
}

int main () {
  func();  // x=1
  func();  // x=2
}
```

```c
void func() {
  register int i;
}
```

```c
// int x;  // 如果存在这行声明，main 内部就可以不用 extern 声明外部变量

int main () {
  extern int x;  // 这里声明使用的是外部变量
  printf("extern x=%d\n", x);
}
int x = 100;
```

### 指针、数组、字符串

数组、字符串、指针 这几个概念揉在一起，特别绕，理解起来还是有难度的，这里做的试验应该能比较清楚地搞懂这几个概念了。  
特别注意： _`arr` 是数组元素 `arr[0]` 的指针，类型为 `int *`，而 `&arr` 是数组本身的指针，类型为 `int (*)[n]`_ 。

```c
int arr[] = {1, 2, 3, 4};
printf("%d, %d \n", arr == &arr[0], arr == &arr);
printf("%lx\n", arr);
printf("%lx\n", arr + 1);
printf("%lx\n", &arr + 1);
/*
1, 1
7ffee6ba6930
7ffee6ba6934  // + 4
7ffee6ba6940  // + 16
*/
```

```c
#include <stdio.h>
int main(int argc, const char *argv[])
{
  int a = 1;
  int *p_a = &a;
  int **pp_a = &p_a;

  printf("p_a\t%lx\n", (long)p_a);
  printf("&pp_a\t%lx\n", (long)pp_a);

  char c = 'c';
  char *p_c = &c;
  char **pp_c = &p_c;

  char *str = "hello"; // 对比上面的 p_c 可发现 str 是指向首个字符 `h` 的指针
  char *p_h = str;     // 其实写成 `char* p_h = str;` 这样更好理解
  char **p_str = &str;

  printf("p_h\t%lx\n",  (long)p_h);
  printf("str\t%lx\n",  (long)str);
  printf("&str\t%lx\n", (long)&str);

  char *arr[] = {"hello", "world"};
  char **p_str1 = arr;
  char **p_str2 = arr + 1; // 指针的 `+ 1` 运算，其实就是取 下一个指针

  char *str1 = arr[0]; // C converts to `*(arr+0)`
  char *(*p_arr)[] = &arr; // 这样写已经很古怪了，然后这样直接就无效 `any = arr;`

  printf("arr\t%lx\n",      (long)arr);
  printf("&arr\t%lx\n",     (long)&arr);
  printf("&p_arr\t%lx\n",   (long)&p_arr);
  printf("p_str1\t%lx\n",   (long)p_str1);
  printf("&p_str1\t%lx\n",  (long)&p_str1);
  printf("p_str2\t%lx\n",   (long)p_str2);
  printf("&str1[0]\t%lx\n", (long)&str[0]);
}
/*
p_a        0x7ffeefbff4dc
&pp_a      0x7ffeefbff4d0    栈由高位往低位增长
p_h           0x100000f28    位于常量区，所以内存位置位于低位
str           0x100000f28
&str       0x7ffeefbff4a8
arr        0x7ffeefbff4f0    `&arr` 与 `arr` 打印是一个效果，但 `arr+1` 和 `&arr+1` 效果就不同了
&arr       0x7ffeefbff4f0    `arr` 是指向 `arr[0]` 的指针，即 `arr == &arr[0]`，而 `&arr` 是数组自身的指针
&p_arr     0x7ffeefbff478
p_str1     0x7ffeefbff4f0
&p_str1    0x7ffeefbff490
p_str2     0x7ffeefbff4f8    arr 里的每个元素占了 8B，一个 int 只占 1B
&str1[0]      0x100000f28
*/
```

### 名词解析

**Libraries 库** are collections of precompiled object files that can be linked to programs. Libraries are usually found in /usr/lib/ in Unix-based systems and end with the extension .a.

**Macros 宏** are similar to variables. They are segments of code that are given a name and whenever the name is used in a function it is replaced by the value set in the macro. Macros are created in the source code by using the syntax `#define MACRO value`.

Machine code, also known as **object code**, is often referred to as “ones and zeros”. It is understood by hardware like the processors in our computers. In order to become usable software, object code needs to be made into an executable file.

**initializer list** `{expression, ...}` 这种形式只能存在于 array struct union enum 定义时，是一种特定的语法结构。C 语言中并不存在 列表字面量 之类的用法。

```c
int a[] = {1, 2, 3, 4};  // OK
a = {1, 2, 3, 4};        // WRONG: Array type `int [4]` is not assignable
```


## Types, Operators, and Expressions

### 2.1 Variable Names

标识符可以是字母 `A-Za-z`、数字 `0-9`、下划线 `_` 组成的字符串，并且第一个字符不能是数字。

* 标识符是严格区分大小写的
* 标识符不能是C语言的关键字
* 通常不要以 `_` 开头，这个一般是保留给库使用的
* 一般变量名(variable names) 全部使用小写，而常量符号(symbolic constants) 全部使用大写
* 标识符的长度最好不要超过 ? 位，当两个标识符前 ? 位相同时会认为是同一个标识符
* 本地变量倾向于使用短的名字(如循环中的 i)，而外部变量 external variables 则倾向于使用更长的、表意的名字

https://www.gnu.org/software/libc/manual/html_node/Reserved-Names.html

In addition to the names documented in this manual, reserved names include all external identifiers (global functions and variables) that begin with an underscore (‘_’) and all identifiers regardless of use that begin with either two underscores or an underscore followed by a capital letter are reserved names. This is so that the library and header files can define functions, variables, and macros for internal purposes without risk of conflict with names in user programs.


### 2.2 Data Types and Sizes

#### 数据类型

C语言中，数据类型可分为：基本数据类型，构造数据类型，指针类型，空类型四大类。

整型 `int` 字符型 `char` 单精度浮点型 `float` 双精度浮点型 `double`。

C语言中不存在字符串变量，字符串只能存在字符数组中。

#### 格式化输出语句

格式化输出语句，也可以说是占位输出，是将各种类型的数据按照格式化后的类型及指定的位置进行显示。

```c
// 格式: printf("输出格式符", 输出项);
printf("整数 %d 小数 %f 字符 %c 字符串 %s", 1, 3.45, 'a', "str");
```



|||
---------|----------------------------------
`char`   | a single byte
`int`    | an integer
`float`  | single-precision floating point
`double` | double-precision floating point
||
`short`  | `short int` 的简写形式
`long`   | `long int` 的简写形式
`long double` | 
||
`signed ~`   | `char` 或 integer
`unsigned ~` | `char` 或 integer

There are only a few basic data types in C: `char` `int` `float` `double`.  
there are a number of qualifiers that can be applied to these basic types. `short` and `long` apply to integers. `signed` or `unsigned` may be applied to char or any interger.Whether plain chars are signed or unsigned is machine-dependent, but printable characters are always positive.

`short` is often 16 bits, `long` 32 bits, and `int` either 16 or 32 bits. Each compiler is free to choose appropriate sizes for its own hardware. The standard headers _limits.h_ and _float.h_ contain symbolic constants for all of these sizes.

```c
#include <stdio.h>
#include <limits.h>
#include <float.h>
int main()
{
  printf("Type\tSize\tMAX\t\t\tMIN\n");
  printf("char\t%d\t%d\t\t\t%d\n", CHAR_BIT / 8, CHAR_MAX, CHAR_MIN);
  printf("int\t%d\t%d\t\t%d\n", (int)sizeof INT_MAX, INT_MAX, INT_MIN);
  printf("long\t%d\t%ld\t%ld\n", LONG_BIT / 8, LONG_MAX, LONG_MIN);
}
/*
Type    Size    MAX                     MIN
char    1       127                     -128
int     4       2147483647              -2147483648
long    8       9223372036854775807     -9223372036854775808
*/
```

```c
// C99 中的 bool 类型，C99 之前没有布尔类型，0 为假，非 0 为真
#include <stdbool.h>
// #define false 0
// #define true  1
// #define bool  _Bool
int main() {
  bool flag = true;
}
```

### 2.3 Contants 常量

C 语言的 编译期常量 可以分为 直接常量(也叫 字面量) 和 符号常量(如 `#define PI 3.14`)。

An integer constant (整型常量) like `1234` is an `int`. A long constant is written with a terminal `l` or `L`, as in `1234L`; an integer too big to fit into an `int` will also be taken as a `long`. Unsigned constants are written with a termianl `u` or `U`, and suffix `ul` or `UL` indicates `unsigned long`.

```c
int i = 1234;
long l2 = 123L;
char a = 97U;
unsigned long ul = 123UL;
```

Floating-point constants (实型常量) contain a decimal point `123.4` or an exponent or both `1.234e-2`; their type is `double`, unless suffixed. The suffixes `f` or `F` indicate a `float` constant; `l` or `L` indicate a `long double`.

The value of an integer can be specified in octal or hexadecimal instead of decimal. A leading zero `0` on an integer constant means octal; a leading `0x` or `0X` means hexadecimal. For example, decimal `31` can ben written as `037` in octal and `0x1f` `0X1F` in hex. Octal and hexadecimal constants may also be followed by `L` to make them `long` and `U` to make them `insigned`: `0XFUL` is an `unsigned long` constant with value `15` decimal.

A character contant(字符常量) is an integer. Certain characters can be represented in character and string constants by escape sequences(转义字符) like `\n`.

```c
// char
'0' == 48;
'\013' == '\xb';
'\0' == 0;  // the numeric value of null character is just 0
```

A constant expression is an expression that involves only constants. Such expressions may be evaluated during compilation rather than run-time.

```c
#define PI 3.14  // 是表达式不是语句，所以没有结尾的分号
```

A **string constant**(字符串常量), or **string literal**, is a sequence of zero or more characters surrounded by double quotes, as `"I am s string"`. The qyites are not part of the string, but serve only to delimit it. String constants can be concatenated at compile time.

Technically, a string constant is an array of characters. The internal representation of a string has a null character `'\0'` at the end, so the physical storage required is one more than the number of characters written between the quotes.

```c
// 下面两种写法是等效的，多个空格分隔的字符串会在编译期连在一起
char * s1 = "hello," " world!"
            "hey gavin";
char * s2 = "hello, world!hey gavin";
```

```c
sizeof 'a';  // 4
sizeof "a";  // 2
strlen("a"); // 1
```

There is one other kind of constant, the **enumeration constant**. Enumerations(枚举) provide a convenient way to associate constant values with names, an better alternative to `#define`. An enumeration is a list of constant integer values, the first name in an `enum` has value `0`, the next `1`, and so on.

```c
// enum
enum boolean { NO, YES };
enum colors { RED = 1, GREEN = 1, BLUE };  // 值可以相同，但名字不能重复，多个 enum 之间也是这种关系
```

### 2.4 Declarations

All variables must be declared before use. A declaration specifies a type, and contains a list of one or more variables of that type.

```c
char c, line[1000];
```

If the variable in question is not automatic, the initialization is done once only, conceptually before the program starts executing, and the initializer must be a constant expression. `external` and `static` variables are initialized to zero by default. `auto` variables for which there is no explicit initializer have undefined (i.e., garbage) values.

```c
int arr[2];
printf("%d", arr[0]);  // 每次打印内容随机
```

The qualifier `const` can be applied to the declaration of any variable to specify that its value will not be changed. The `const` declaration can also be used with array arguments, to indicate that the function does not change that array.

```c
const char msg[] = "warning: "; // msg[2] = 'a'; 报错，这里的数组就是不能改了的，跟 JS 里不一样
int strlen(const char[]);       // 声明函数内部不会修改传入的数组
```

### 2.7 Type Conversions

#### 自动类型转换

自动转换发生在不同数据类型运算时，在编译的时候自动完成。

字节小的可以向字节大的自动转换: `char` -> `int` -> `double`

#### 强制类型转换

强制类型转换是通过定义类型转换运算来实现的。其一般形式为：`(数据类型) (表达式)`

在使用强制转换时应注意以下问题：
* 数据类型和表达式都必须加括号，如把 `(int)(x/2+y)` 写成 (int)x/2+y 则成了把 x 转换成 int 之后再除 2 再与 y 相加了。
* 转换后不会改变原数据的类型及变量值，只在本次运算中临时性转换。
* 强制转换后的运算结果不遵循四舍五入原则。

```c
printf("2.55取整后为%d\n", (int)2.55);  // 2
```

### 2.5 Operators

#### 2.5 Arithmetic Operators 算术运算符

`+` `-` `*` `/` `%`

```c
printf("%d\n", 5 / 2);    // 2      // 如果相除的两个数都是整数，则结果也为整数，小数部分省略
printf("%d\n", 5.1 % 3);  // error  // 只能对整数进行取余运算
printf("%d\n", -10 % 3);  // -1     // 取余运算后的符号取决于被模数的符号
printf("%d\n", 10 % -3);  // 1
```

#### 2.6 Relational and Logical Operators 关系运算符、逻辑运算符

关系表达式的值是“真”和“假”，C 语言中用整数 `1` 和 `0` 表示。

```c
printf("%d\n", 3 < 4);  // 1
printf("%d\n", 3 == 4); // 0
```

Expressions connected by `&&` or `||` are evaluated left to right, and evaluation stops as soon as the truth or falsehood of the result is known.

The unary negation operator `!` converts a non-zero operand into `0`, and a zero operand into `1`.

```c
if (!valid);
if (valid == 0);
```

#### 2.8 Increment and Decrement Operators

`++` `--`

#### 2.9 Bitwise Operators

```txt
&   bitwise AND              与
|   bitwise inclusive OR     或
^   bitwise exclusive OR     亦或
<<  left shift               左移位
>>  right shift              右移位
~   one's complement(unary)  补(反转)
```

```c
// & is often used to mask off some set of bits
n = n & 0177;  // 只保留后 7 位，0177 即 01111111

// | is used to turn bits on
int SET_ON = 0x3;  // 将后两位设为 1
0x4 | SET_ON;      // 7 即 00000111
```

The shift operators `<<` and `>>` perform left and right shifts of their left operand by the number of bit positions given by the right operand, which *must be nonnegative*. 

```c
printf("%d\n", -1 << 2);  // warning: shifting a negative signed value is undefined
printf("%d\n",  8 >> 2);  //  2
printf("%d\n", -8 >> 2);  // -2
```

```c
/* get n bits from position p */
unsigned getbits(unsigned x, int p, int n)
  return (x >> (p+1-n)) & ~(~0 << n);
```

#### 2.10 Assignment Operators and Expressions 赋值运算符

赋值运算符分为 **简单赋值运算符** 和 **复合赋值运算符**。复合赋值运算符由简单赋值符 `=` 加其它运算符构成 `+=` `-=` `*=` `/=` `%=`。

#### 2.11 Conditional Expressions 三目运算符

```c
printf("%s", 4 >= 3 ? "yes" : "no");
```

### 2.12 Precedence and Order of Evaluation

|||
---------------------------------------------------------|--------------
`()` `[]` `->` `.`                                       | left to right
`!` `~` `++` `--` `+` 正 `-` 负 `*`取值 `&`取址 `sizeof`   | right to left
`*` `/` `%`                                              | left to right
`+` 加 `-` 减                                            | left to right
`<<` `>>`                                                | left to right
`<` `<=` `>` `>=`                                        | left to right
`==` `!=`                                                | left to right
`&`                                                      | left to right
`^`                                                      | left to right
`\|`                                                     | left to right
`&&`                                                     | left to right
`\|\|`                                                   | left to right
`? :`                                                    | right to left
`=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `\|=` `<<=` `>>=` | right to left
`,`                                                      | left to right

```c
// 除了上面规定的优先级顺序，还有很多语言没有做规定的情况，此时代码间不应该依赖特定的调用顺序
x = f() + g();  // f may be evaluated before g or vice versa
printf("%d %d\n", ++n, power(2, n)); // WRONG
```


## Control Flow

### 3.1 Statements and Blocks

An **expression** becomes a **statement** when it is followed by a *semicolon*.

Braces `{ }` are used to group declarations and statements together into a **compound statement**, or **block**, so that they are syntactically equivalent to a single statement.

```c
// 用 `,` 分隔还算一个表达式，`,` 的性质跟其他运算符 `+` `*` 等没有本质区别
expr1, expr2, expr3

// 带 `;` 的表达式就成了语句
expression;

// `{ }` 可以将多个语句转成一个复合语句
{
  expr1;
  expr2;
}
```

### 3.2 Conditional

```txt
if (expression)
  statement                        // 可以是 `expression;` 或 `{ expr1; expr2; ... }`
else if (expression) {
  statement
else
  statement
```

```txt
switch(expression) {
  case const-expr: statements       // 这里是 statements 指多个语句
  case const-expr: statements
  default: statements
}
```

在使用switch语句时还应注意以下几点：
  * 在 case 后的各常量表达式的值不能相同，否则会报错
  * 在 case 子句后如果没有 `break;` 会一直往后执行一直到遇到 `break;`
  * switch 后面的表达式语句只能是整型或者字符类型
  * 在 case 后，允许有多个语句，可以不用 `{}` 括起来
  * 各 case 和 default 子句的先后顺序可以变动，而不会影响程序执行结果
  * default 子句可以省略不用

```c
switch (i) {
  default:
    printf("default 位置可以随便放，当然正常应该放最后");
    break;
  case 33:
    printf("OK");
}
```

### 3.5 Loops

```txt
while(expression)
  statement
```

```txt
do
  statement
while (expression);
```

```txt
for (expr1; expr2; expr3)
  statement
```

```c
break;    // 跳出当前整个循环
continue; // 结束本次循环开始下一次循环
```

`for` 结构的相关说明
  * 表达式1 和 表达式3 可以是一个简单表达式也可以是(以逗号分割的多个表达式组成的)复杂表达式
  * 表达式2 一般是关系表达式或逻辑表达式，但也可以是数值表达式或字符表达式，只要其值非零，就执行循环体。
  * 各表达式中的变量一定要在 for 循环之前定义

### 3.8 Goto and Labels

goto 语句是一种无条件分支语句。goto 语句通常不用，因为它会造成程序层次不清，不易读不易维护。

C provides the infinitely-abusable(无限滥用的) `goto` statement, and labels to branch to.

The scope of a label is the entire function(所以标签都不带缩进).

```c
int main() {
  for (;;) {
    for (;;) {
      if (error) goto error;  // 特殊使用场景示例：利用 goto 跳出多层循环
    }
  }
error:
  cleanup();
}
```


## Functions and Program Structure

### 4.1 Basics of Functions

函数就是实现代码逻辑的一个小的单元。C 程序就是执行主函数 main 里的代码，也可以说这个主函数就是 C 语言中的唯一入口。

```txt
return-type function-name(argument declarations)
{
  declarations and statements
}

// 最简化版的函数定义可以是这样的
dummy() {}
```

定义函数注意项
* 数据类型说明可省略，默认是 int 类型函数
* 函数名称遵循标识符命名规范
* 自定义函数尽量放在 main 函数之前，否则需先声明 `[数据类型说明] 函数名称 ([参数])`

A program is just a set of definitions of variables and functions. Communication between the functions is by arguments and values returned by the functions, and through external variables. The functions can occur in any order in the source file, and the source program can be split into multiple files, so long as no function is split.

```c
double sum, atof(char[]);  // sum 是一个 double 变量，而 atof 是一个返回 double 的函数
```

函数的形参 arguments 和实参 parameters 具有以下特点：
* 形参只有在被调用时才分配内存单元，在调用结束时，即刻释放所分配的内存单元。因此，形参只有在函数内部有效。
* 实参可以是常量、变量、表达式、函数等，在进行函数调用时，它们都必须具有确定的值，以便把这些值传送给形参。
* 在参数传递时，实参和形参在数量上，类型上，顺序上应严格一致，否则会发生类型不匹配的错误。

函数的返回值要注意以下几点：
* 函数的值只能通过 return 语句返回主调函数。return 语句的一般形式为： `return 表达式;` 或 `return (表达式);`
* 函数值的类型和函数定义中函数的类型应保持一致。如果两者不一致，则强转为函数返回类型
* 没有返回值的函数，返回类型为 void


### 4.3 External Variables 外部变量

A C program consists of a set of external objects, which are either variables or functions. The adjective "external" is used in constrast to "internal", which describes the arguments and variables defined inside functions. *External variables are defined outside of any function*, and are thus potentially available to many functions. Functions themselves are always external, because *C does not allow functions to be defined inside other functions*.

If a large number of variables must be shared among functions, external variables are more convenient and efficient than long argument lists. However, this reasoning should be applied with some caution, for it can have a bad effect on program structure, and lead to programs with too many data connections between functions.

### 4.4 Scope Rules

The functions and external variables that make up a C program need not all be compiled at the same time; the source text of the program may be ketpt in serveral files, and previously compiled routines may be loaded from lobraries.

There must *be only one definition of an external variable among all the files* that make up the source program; other files may contain `extern` declarations to access it.

```c
// file1.c 定义外部变量
int sp;  // 这个 definition 会实际影响 run-time 行为
double val[10];  // 内存是在这里分配的
```

```c
// file2.c 使用外部变量
extern int sp;  // 这个 declaration 只影响 compiler，对实际 run-time 行为无影响
extern double val[];  // 此处数组长度是可选的，因为这里不涉及分配内存
```

运行主函数 `main()` 时，所有的外部变量都已经初始化好了，所以 `$ cc file1.c file2.c` 时文件的顺序无关紧要。

### 4.5 Header Files

为什么要头文件：每个源文件都要 `extern` 声明所有用到的、在其他文件中定义的外部变量，是不是很麻烦？现在将位于不同源文件中的声明整合到一起，大家在文件头部 `#include` 下这一个头文件就就搞定了。

一个项目中用几个头文件合适：可能有人会问，我只关注头文件中的部分内容，这样全部塞到一起真的好么？实际维护多个头文件还是很麻烦的，对于中小规模的项目，一个头文件是最佳选择，碰到大型项目，那就具体问题具体分析吧。

```c
// calc.h
#define NUMBER '0'
void push(double);
double pop(void);

// main.c
#include <stdio.h>
#include "calc.h"
#define MAXOP 100
int main() {
  //...
}

// stack.c
#include <stdio.h>
#include "calc.h"
#define MAXVAL 100
int sp = 0;
double val[MAXVAL];
void push(double) { /* ... */ }
```

### 4.6 Static Variables

* `static` 可以将 external variables (包含函数名) 的作用域限制在同一文件内
* `static` 可以将 automatic variables 持久存储

我们发现上面 stack.c 中的 sp 和 val 只在本文件内使用，其他文件中并不会用到，为了让其他文件中也是使用 val 来命名变量，我们可以通过 `static` 修饰符将变量的作用域范围限定在本文件内。

```c
// stack.c 修改版
#include <stdio.h>
#include "calc.h"
#define MAXVAL 100  // 这个天然就以文件为单位的，编译(预处理)完就不存在了
static int sp = 0;  // 外部变量加了 static 就将作用域限定在文件内部了
static double val[MAXVAL];
void push(double) { /* ... */ }
```

```c
// 记录并返回函数被调用次数
int count()
{
  static int i = 10;  // 加了 static 变量的内存位置就不在栈中了，首次调用时会初始化
  return ++i;
}

printf("%d\n", count());  // 11
printf("%d\n", count());  // 12
```

### 4.7 Register Variables

`register` 告诉编译器，这个变量被频繁用到，至于怎么优化你编译器自己看着办。

The `register` declaration can only be applied to automatic variables and to the formal parameters of a function.

对于实际大型项目没多大现实意义，`register` 被 C++ 给废了。

### 4.11 The C Preprocessor

#### File Inclusion

#### Macro Substitution

差不多就是一个全局查找替换功能，最大的区别是，被替换对象要是一个独立 token，如定义了 `YES` 则 `"YES"` `YESMAN` 都不受影响。

A definition has the form:

```c
#define name replacement text
```

It calls for a macro substitution of the simplest kind -- subsequent occurrences of the token `name` will be replaced by the `replacement text`.

```c
#define forever for (;;)

// 支持传参 define macros with arguments
#define max(A, B) ((A) > (B) ? (A) : (B))
max(i++, j++);  /* WRONG */ /* 替换后最大那一项会执行两次 */

// 注意添加括号以保证保留原有求值顺序
#define square(x) x * x  /* WRONG */
square(z + 1); /* 会替换成不是你所期望的 */ square(z + 1 * z + 1);
```

#### Conditional Inclusion

It is possible to control preprocessing itself with conditional statements that are evaluated during preprocessing.

```c
#if !defined(HDR)
#define HDR

/* contents of hdr.h go here */

#endif
```

```c
// 上面第一行还提供了简写用法  #ifdef 和 #ifndef
#ifndef(HDR)
```

A similar style can be used to avoid including files multiple times.

```c
#if SYSTEM == SYSV
  #define HDR "sysv.h"
#elif SYSTEM == MSDOS
  #define HDR "msdos.h"
#else
  #define HDR "default.h"
#endif

#include HDR  // 根据不同的 SYSTEM 值导入不同的文件
```


## Pointers and Arrays

A pointer is a variable that *contains the address* of a variable.  
Pointers and arrays are closely related.  
理解指针的关键在于两个字 *内存*，一切变量操作都是操作内存块，`*p` 就是操作 `p` 变量(也对应了一个内存区块)记录的地址所对应的内存区块(另外一个内存区块)。

### 5.1 Pointers and Addresses

A pointer is a group of cells (often four or eight) that can *hold an address*.

The unary operator `&` only applies to objects in memory: variables and array elements. It cannot be applied to expressions, constants, or `register` variables.

The unary operator `*` is the indirection or dereferencing operator; when applied to a pointer, it accesses the object the pointer points to.

Every pointer *points to a specific data type*.

```c
int x = 1, y = 2, z[10];
int *ip;  // ip is a pointer to int, or we can say *ip have a value of int

ip = &x;     // ip now points to x
y = *ip;     // y is now 1
*ip = 0;     // x is now 0
ip = &z[0];  // ip now points to z[0]

++*ip;
(*ip)++;  // 这里的括号不能省，因为 * 和 ++ 都是右结合的
```

### 5.2 Pointers and Function Arguments

Since *C  passes arguments to functions by value*, there is no direct way for the called function to alter a variable in the calling function. Pointer arguments enable a function to access and change objects in the function that called it.

其实 C 里的指针，跟 JS 里的引用还是非常相近的两个概念。在 JS 中函数内的副作用是一种反模式，但各有千秋，一个注重可维护性，一个注重性能。高级语言适合大项目，开发效率高、可维护性好；而低级语言注重运行效率，但开发效率低。没有最好的语言，只有适用于特定领域的语言。

```c
int x = 1, y = 2;
void xx_swap(int x, int y) { /* 这里不管你怎么搞，外面的 x 和 y 的值都不会变 */ }
void swap(int *px, int *py) {/* 这个就能实现外面的 x 和 y 的值的交换，这个比 JS 里引用的概念还要厉害些 */
  int temp = *px;
  *px = *py;  // 这完完全全就是直接在操纵内存块
  *py = temp;
}
swap(&x, &y);  // 调用的时候得传递地址哦，但是还是传的值，只不过这个值是内存地址，而不是地址所对应内存块中的内容
```

### 5.3 Pointers and Arrays

By definition, the value of a variable or expression of type array is the address of element zero of the array, i.e. the name of an array is a synonym 同义词 for the location of the initial element.

Rather more surprising is the fact that a reference to `a[i]` can also be written as `*(a+i)`. In evaluating `a[i]`, C converts it to `*(a+i)` immediately, the two forms are equivalent.

There is one difference between an array name and a pointer that must be kept in mind. A pointer is a variable, so `pa=a` and `pa++` are legal. But *an array name is not a variable*, constructions like `a=pa` and `a++` are illegal.

When an array name is passed to a function, what is passed is the location of the initial element, within the called function, this argument is a local variable, and so an array name parameter is a pointer.

```c
// 根据定义，这两者是等效的
int *pa = &a[0];
int *pa = a;

pa[i] 等效于 *(pa+i)
&a[i] 等效于 a+i

// 以下两种数组形参的写法也是等效的，选用那种形式，可以根据情况选择
bar(char s[]) { char a = s[1]; }
bar(char *s) { char a = *(a+1); }

// 传递子数组 subarray
bar(&s[2]);
bar(s+2);  // 然后函数内还可以 s[-2] 访问函数外的那个 s[0]


// 数组名不是变量名，但传递到函数内，就是局部变量了
a++;  /* WRONG */
foo(int *pa) {
  pa++;  /* OK */
}
```

### 5.9 Pointers vs. Multi-demensional Arrays

多维数组的定义格式

```txt
数据类型 数组名称[常量表达式1][常量表达式2]...[常量表达式n];`
```

多维数组的初始化与一维数组的初始化类似也是分两种

```txt
数据类型 数组名称[常量表达式1][常量表达式2]...[常量表达式n] = {{值1,..,值n},...,{值1,..,值n}};

数据类型 数组名称[常量表达式1][常量表达式2]...[常量表达式n];
数组名称[下标1][下标2]...[下标n] = 值;
```

```c
int arr[][2] = {{0, 1}, {2, 3}, {4, 5}};

int r, c;
for (r = 0; r < 3; r++) {
  for (c = 0; c < 2; c++)
    printf("%d ", arr[r][c]);
  printf("\n");
}
```

Newcomers to C are sometimes confused about the difference between *a two-dimensional array* and *an array of pointers*.

```c
int a[10][20];  // 二维数组，立即分配 200 个 int 的连续空间
int *b[10];     // 存放 10 个指针的一维数组
```

### 数组

数组是一块连续的、大小固定并且里面的数据类型一致的内存空间。

C语言中的数组初始化有三种形式

```
数据类型 数组名称[长度n] = {元素1,元素2…,元素n};
数据类型 数组名称[]     = {元素1,元素2…,元素n};

数据类型 数组名称[长度n];
数组名称[0] = 元素1;
...;
数组名称[n-1] = 元素n;
```

注意：
  * C 语言的数组长度一经声明，长度无法改变，并且 C 语言并不提供计算数组长度的方法
  * 数组的下标均以 `0` 开始
  * 数组在初始化的时候，数组内元素的个数不能大于声明的数组长度
  * 第一种初始化方式，元素个数小于数组的长度时，多余的数组元素初始化为 `0`
  * 声明数组但未初始化时，静态 static 和外部 extern 类型的元素值 `0`，自动 auto 类型的元素值不确定

遍历数组

C语言没有检查数组长度改变或者数组越界的机制，如数组越界，编译运行都不报错，但结果不可控。

```c
int arr[] = {1, 2, 3};
int i;
for (i = 0; i < 4; i++)  // 当 i 为 3 时，运行不会报错，值随机
{
  printf("%d\n", arr[i]);
}
```

### 字符串

在 C 语言中，是没有办法直接定义字符串数据类型的，但是我们可以使用数组来定义我们所要的字符串。一般有以下两种格式：

```c
char 字符串名称[长度] = "字符串值";
char 字符串名称[长度] = {'字符1', '字符2', ..., '字符n', '\0'};
```

注意:
  * `[]` 中的长度是可以省略不写的
  * 第2种方式最后一个元素必须是 `'\0'` 表示字符串的结束标志
  * 第2种方式不支持中文

在输出字符串的时候要使用：`printf("%s", 字符数组名字);` 或者 `puts(字符数组名字);`。

### 5.10 Command-line Arguments

additionally, the standard requires that `argv[argc]` be a null pointer.

A common convention for C programs on UNIX systems is that an argument that begins with a minus sign introduces an optional flag or parameter.

### 5.11 Pointers to Functions

In C, *a function itself is not a variable*, but it is possible to define pointers to functions, which can be assigned, placed in arrays, passed to functions, returned by functions, and so on.

Since they are known to be functions, the `&` operator is not necessary, in the same way that it is not needed before an array name.

```c
void printline(char *str) {
  printf("%s\n", str);
}

void hello(void (*printline)(char *)) {
  printline("hello");
}

int main () {
  hello(printline);
}
```

### 5.12 Complicated Declarations

```c
int *f();  // `f` is a function returning pointer to `int`
int (*f)();  // `pf` is a pointer to function returning `int`
```

## Structures

Structures help to organize complicated data, particularly in large programs, because they permit a group of related variables to be treated as a unit instead of as separate entities.

A **structure member** or **tag** and an ordinary variable can have the same name without conflict, since they can always be distinguished by context.

```c
struct point {  // structure tag
  int x;        // member
  int y;
};              // 带 ;

struct point pt = {0, 0};  // 初始化时可以直接这么写，后面就得逐个对成员赋值了
pt.x = 1;
pt.y = 1;
```

*A struct declaration defines a type*, it describes a template or the shape of a structure.

The right brace that terminates the list of members may be followed by a list of variables, just as for any basic type.

```c
struct { int type; ... } x, y, z;
x.type = 1;
```

### 6.2 Structures and Functions

```c
struct point makepoint(int x, int y)
{
  struct point temp;
  temp.x = x;
  temp.y = y;
  return temp;
}

// add two points
struct point addpoint(struct point p1, struct point p2)
{
  p1.x += p2.x;  // p1 还是传递的值，所以直接改 p1 不会对外部参数影响
  p1.y += p2.y;
  return p1;
}
```

If a large structure is to be passed to a function, it is generally more efficient to pass a pointer than to *copy* the whole structure. Structure pointers are just like pointers to ordinary variables.

Pointers to structures are so frequently used that an alternative notation is provided as a *shorthand*. If `p` is a pointer to a structure, then `p->member_of_struct` refers to the particular member.

The structure operators `.` and `->`, together with `()` for function calls and `[]` for subscripts, are at the top of the precedence hierarchy and thus bind very tightly.

```c
struct point top = makepoint(1, 1);
struct point *p_top = &top;

printf("top: { x: %d, y: %d }\n", (*p_top).x, (*p_top).y);
printf("top: { x: %d, y: %d }\n", p_top->x, p_top->y);
```

### 6.3 Arrays of Structures

案例：统计一个 xx.c 源文件中出现的关键字数量。

```c
struct key {
  char *word;
  int count;
};

struct key keytable[] = {
  // 这里的 key.word 要以升序排列，对特定 key 进行操作时需要用 binsearch 来查找下标
  { "char", 0 },
  { "double", 0 },
  "int", 0,
  "long", 0,      // 单组的 {} 是可选的，这其实也揭示了 struct 在内存中的真实情况
  // ...
};
```

C provides a *compile-time* unary operator called `sizeof` that can be used to compute the size of any object. Strictly `sizeof` produces an unsigned integer value whose type, `size_t`, is defined in the header `<stddef.h>`.

A `sizeof` can not be used in a `#if` line, because the preprocessor does not parse `type` names. But the expression in the `#define` is not evaluated by the preprocessor, so the code here is legal.

```c
// 利用宏来自动计算数组的长度
#define NKEYS (sizeof keytable / sizeof(struct key))  // 或
#define NKEYS (sizeof keytable / sizeof keytab[0])
```

### 6.5 Self-referential Structures

案例：统计一个文件中每个词出现的次数。因为文件里到底存在哪些词事先是不清楚的，原先基于数组的操作，从算法效率上看已经无法胜任了，这里需要用到树这种数据结构。

```c
struct tnode {  // tree node
  char *word;
  int count;
  struct tnode *left;
  struct tnode *right;
};
// 
```

It is illegal for a structure to contain an instance of itself, but declare a member to be a pointer to this type is totally legal.

```c
// wfc.c -- word frequency count
#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAXWORD 100

struct tnode {  // tree node
  char *word;
  int count;
  struct tnode *left;
  struct tnode *right;
};
struct tnode *addtree(struct tnode *, char *);
void treeprint(struct tnode *);
int getword(char *, int);

int main()
{
  // todo
}

// add a node with w, at or below p
struct tnode *addtree(struct tnode *p, char *w)
{
  int cond;
  if (p == NULL) {
    p = talloc();
    p->word = strdup(w);
    p->count = 1;
    p->left = p->right = NULL;
  } else if ((cond = strcmp(w, p->word)) == 0)
    p->count++;
  else if (cond < 0)
    p->left = addtree(p->left, w);
  else
    p->right = addtree(p-right, w);
  return p;
}

// make a tnode
struct tnode *talloc(void)
{
  return (struct tnode *) malloc(sizeof(struct tnode));
}

// make a duplicate of s
char *strdup(char *s)
{
  char *p;
  p = (char *) malloc(strlen(s)+1);
  if (p != NULL)
    strcpy(p, s);
  return p;
}

// in-order print of tree *p
void treeprint(struct tnode *p)
{
  if (p == NULL) return;
  treeprint(p->left);
  printf("%4d %s\n", p-count, p->word);
  treeprint(p->right);
}
```

### 6.7 Typedef

C provides a facility called `typedef` for creating new data type names. For example, the declaration `typedef int Length;` makes the name `Length` a synonym 同义词 for int.

Syntactically, `typedef` is like the storage calsses `extern` `static` ect. We have used *capitalized names* for `typedef`s to make them stand out.

`typedef` is like `#define`, except it is interpreted by the compiler.

Besides purely aesthetic 审美的 issues, there are two main reasons for using typedefs.
* to parameterize a program against portability problems, e.g. `size_t` `ptrdiff_t`.
* to provide better documentation for a program.

```c
typedef char *String;

String s = "`String` now is the synonym for `char *`";
```

```c
typedef struct tnode *Treeptr;
typedef struct tnode { /* member declarations */ } Treenode;

Treenode any = { /* members */ };

Treeptr talloc(void)
{
  return (Treeptr) malloc(sizeof(Treenode));
}
```

### 6.8 Unions

Unions provide a way to manipulate different kinds of data in a single area of storage. A union is a single variable that can legitimately hold any one of several types.

It is the programmer's responsibility to keep track of which type is currently stored in a union, members of a union are accessed as `union_name.member` or `union_name->member` just as for structures.

I effect, a union is a structure in which all members have offset zero from the base, the structure is big enough to hold the "widest" member. The same operations are permitted on unions as on structures: assignment to or copying as a unit, taking the address, and accessing a member.

A union may only be initialized with a value of the type of its first member.

```c
union u_tag {
  int ival;
  float fval;
  char *sval;
} u = { 1 };

printf("%d\n", u.ival);  // 1
u.sval = "a string";
printf("%d, %s\n", u.ival, u.sval);  // 4002, a string

union u_tag *pu = &u;
printf("%s\n", pu->sval);
```

### 6.9 Bit-fields

The usual way this is done is to define a set of "masks" corresponding to the relevant bit position, as in

```c
#define KEYWORD  01  // 0000 0001
#define EXTERNAL 02  // 0000 0010
#define STATIC   04  // 0000 0100
// 或
enum { KEYWORD = 01, EXTERNAL = 02, STATIC = 04 };
```

The numbers must be powers of 2. Then accessing the bits becomes a matter of "bit-fiddling" with the shifting, masking, and complementing operators.

```c
flags |= EXTERNAL | STATIC;     // turn on the EXTERNAL and STATIC bits in flags
flags &= ~(EXTERNAL | STATIC);  // turn them off
if ((flags & (EXTERNAL | STATIC)) == 0)  // is true if both bits are off
```

Although these idioms are readily mastered, as an alternative C offers the capability of defining and accessing fields within a word directly rather than by bitwise logical operators. A *bit-field* or *field* for shot, is a set of adjacent bits within a single implementation and access is based on structures. Almost everything about fields is implementation-dependent.

```c
struct {
  unsigned int is_keyword : 1;  // the number following the colon represents the field width in bits
  unsigned int is_extern  : 1;
  unsigned int is_static  : 1;
} flags;

flags.is_extern = flags.is_static = 1;  // turn the bits on
flags.is_extern = flags.is_static = 1;  // turn the bits off
if (flags.is_extern == 0 && flags.is_static == 0)  // test them
```


## Input and Output

### 7.1 Standard Input and Output

Many programs read only one input stream and write only one output stream; for such programs, input and output with `getchar` `putchar`, and `printf` may be entirely adequate, and is certainly enough to get started.

`int getchar(void)` returns the next input character each time it is called, or `EOF` when it encounters end of file. The symbolic constant `EOF` is defined in `<stdio.h>`, which value is typically -1.

`int putchar(int)` puts the character on the *standard output*, which is by default the screen. It returns the character written, or `EOF` if an error occurs.

```bash
# Shell 自带的一些跟输入输出相关的功能
$ myprogram <infile.txt
$ otherprogram | myprogram

$ myprogram | anotherprogram
$ myprogram >outfile.txt

# 示例：利用 cat 可以为一些没有文件读取功能的程序提供便利
$ cat any.c | myecho
```

```c
#include <stdio.h>
#include <ctype.h>

main()
{
  int c;
  wihle ((c = getchar()) != EOF)
    putchar(tolower(c));
}
```

### 7.5 File Acess

`cat` is used for printing files on the screen, and as a general-purpose input collector for programs that do not have the capability of accessing files by name.


```c
#include <stdio.h>
int main()
{
  FILE *fp;  // fp is a pointer to a FILE, called the file pointer
  char *name = "";
  char *mode = "";  // "r" read  "w" write  "a" append  "b" binary
  fp = fopen(name, mode);
}
```

### 7.6 Error Handling

If the output is going into a file or into another program via a pipline, the error message goes onto `stdout` will disappearing down a pipeline or into an output file. Output written on `stderr` normally appears on the screen even if the standard output is redirected.

Function `exit()` terminates program execution when it is called. `exit` calls `fclose` for each open output file to flush out any buffered output. Within `main`, `return expr` is equivalent to `exit(expr)`. `exit` has the advantage that it can be called from other functions.

`int ferror(FILE *fp)` returns non-zero if an error occurred on the stream fp. `int feof(FILE *fp)` is analogous to `ferror`, it returns non-zero if end-of-file has occurred on the specified file.

```c
// cat: concatenate files, version 2
#include <stdio.h>
#include <stdlib.h>

int main(int argc, const char *argv[])
{
  FILE *fp;
  void filecopy(FILE *, FILE *);
  const char *prog = argv[0];

  if (argc == 1)
    filecopy(stdin, stdout);
  else
    while (--argc)
      if ((fp = fopen(*++argv, "r")) == NULL) {
        fprintf(stderr, "%s: can't open %s\n", prog, *argv);
        exit(1);
      } else {
        filecopy(fp, stdout);
        fclose(fp);
      }
  if (ferror(stdout)) {
    fprintf(stderr, "%s: error writing stdout\n", prog);
    exit(2);
  }
  exit(0);
}

void filecopy(FILE *ifp, FILE *ofp)
{
  int c;
  while ((c = getc(ifp)) != EOF)
    putc(c, ofp);
}
```


## The UNIX System Interface


The UNIX operationg system provides its services through a set of *system calls*, which are in effect functions within the operating system that may be called by user programs.

### 8.1 Input and Output

```c
#include <fcntl.h>
int fd;
int open(char *name, int flags, int perms);

fd = open(name, flags, perms);  // flags: O_RDONLY, O_WRONLY, O_EDWR

int creat(char *name, int perms);
```

### 8.2 File System

In the UNIX file system, there are nine bits of permission information associated with a file that control read, write and execute access for the owner of the file, for the owner's group, and for all others. Thus a three-digit octal number is convenient for specifying the permissions.

```txt
permission: 0755    111 101 101
// read, write, and execute permission for the owner
// read and execute permission for the group and everyone else
```

A directory is a file that contains a list of filenames and some indication of where they are located.

### 8.3 Storage Allocation

allocation 分配
alignment 对齐
free 释放


