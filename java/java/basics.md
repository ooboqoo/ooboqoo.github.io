<style>
  td:first-child { color: red; }
</style>
<script>
ooboqoo.contentsRegExp = /H[123]/;  // 定义目录生成级别
</script>

# 基础语法


## 基本概念

### 基本语法

编写 Java 程序时，应注意以下几点: 
  * 大小写敏感 - Java 是大小写敏感的
  * 类名 - 类名采用大驼峰式写法
  * 方法名 - 方法名采用小驼峰式写法
  * 源文件 - 源文件名必须和类名相同，文件名的后缀为 `.java`
  * 主方法入口 - 所有 Java 程序由 `public static void main(String[] args)` 方法开始执行
  * 语句必须以 `;` 结尾，否则编译时报错

### 标识符

类名、变量名以及方法名都被称为标识符，关于标识符，有以下几点需要注意:
  * 所有的标识符都应该以字母 `A-Za-z`，美元符 `$`、或者下划线 `_` 开始
  * 首字符之后可以是字母 `A-Za-z`，美元符 `$`、下划线 `_` 或数字 `0-9` 的任何字符组合
  * 关键字不能用作标识符
  * 标识符是大小写敏感的

注: 从 JDK 1.7 开始标识符开始支持中文，但实际开发中还是不要使用中文。

### 关键字

下面列出了 Java 保留字。这些保留字不能用于常量、变量 和任何标识符的名称。

```text
// 结构体
if else switch case break default
do while for continue
try catch finally throw

// 修饰符
default public protected private  // 访问控制修饰符
static abstract final strictfp    // 非访问控制修饰符

// 类型
byte short int long float double char boolean enum

// 面向对象
class extends implements interface super new this instanceof

// 其他
package import  assert  return  // 没有 function 关键字

// 未使用
goto const

// 陌生的关键字见下表
```

|||
|--------------|------------------------------------------------
| native       | 表示方法用非 java 代码实现
| strictfp     | 浮点数比较使用严格的规则
| throws       | 定义方法可能抛出的异常
| transient    | 修饰不要序列化的字段
| void         | 标记方法不返回任何值
| synchronized | 表示同一时间只能由一个线程访问的代码块
| volatile     | 标记字段可能会被多个线程同时访问，而不做同步

### 注释

Java 支持 单行注释、多行注释 以及 文档注释。

单行注释和多行注释会在编译时去掉，而文档注释会被解析成程序的正式文档，并能包含进如 javadoc 工具生成的文档里。

### 变量

变量是利用声明的方式，将内存中某个内存块保留下来以供程序使用。

执行 `int n = 100;`，该语句定义了变量 n，同时赋值为 100，亦即，JVM 在内存中为变量 n 分配一个“存储单元”，填入值100。

所有的变量在使用前必须声明。声明变量的基本格式如下: 

```text
type identifier [ = value][, identifier [= value] ...] ;
```

Java 语言支持的变量类型有: 类变量 实例变量 和 (方法内的)局部变量。


### 常量

Java 中使用 `final` 关键字来修饰常量，为了便于识别，通常使用大写字母表示常量。

```java
final double PI = 3.1415927;
```

byte、int、long、和 short 都可以用十进制、16进制、二进制以及8进制的方式来表示。

```java
int decimal = 100;
int octal = 0144;
int hexa =  0x64;
```

和其他语言一样，Java 的字符串常量也是包含在两个引号之间的字符序列。字符串常量和字符常量都可以包含任何 Unicode 字符。

```java
char a = '\u0001';
String a = "\u0001";
```

### 语句

语句能够通过创建和操作变量、对变量赋值并控制这些操作的执行流程来描述运算。语句通常会被组织成代码段。

* 声明语句 - 创建某种类型的变量并用标识符为其命名
* 赋值语句 - 将(由表达式产生的)某种类型的数值赋予一个变量。Java中还有一些隐式赋值语法，如 `i++`
* 条件语句 - 根据指定的条件执行两个代码段之一
* 循环语句 - 只要条件为真就不断反复执行代码段中的语句
* 调用和返回语句 - 是改变执行流程和代码组织的另一种方式



## 数据类型

基本数据类型不涉及内存分配问题，而引用数据类型需要由开发者为其分配空间。

### 基本数据类型

Java 语言提供了八种基本类型：六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

数据类型      | 大小/位  |  数据范围          | 默认值 | 备注 
-------------|---------|--------------------|--------|----------------------------------
byte 字节     |     8   | -128  ~ 127        |    0   | 有符号的以二进制补码表示的整数
short 短整型  |    16   | -2^15 ~ 2^15-1     |    0   | 有符号的以二进制补码表示的整数
int 整型      |    32   | -2^31 ~ 2^31-1     |    0   | 有符号的以二进制补码表示的整数
long 长整型   |    64   | -2^64 ~ 2^64-1     |    0   | 有符号的以二进制补码表示的整数
float 单精度  |    32   | -3.4E38 ~ 3.4E38   |   0.0  | 单精度、符合 IEEE754 标准的浮点数
double 双精度 |    64   | -1.7E308 ~ 1.7E308 |   0.0  | 双精度、符合 IEEE754 标准的浮点数
char 字符     |    16   | 0 ~ 255            |'\u0000'| 单个 Unicode 字符
boolean 布尔  |    -    | true 或 false      | false  | ||

注1: 浮点数不能用来表示精确的值，如货币。  
注2: double 是保存范围最广的数据类型。  
注3: 对于数字类型，整数默认是 int 小数默认是 double，随着硬件成本降低，像 short float 已很少使用。  
注4: 实际上，JAVA 中还存在一种基本类型 `void`，它也有对应的包装类 java.lang.Void，不过我们无法直接对它进行操作。  
注5: String 类型属于引用类型。

#### 整型

* long 数值带后缀 `L` 或 `l`
* 十六进制数值有前缀 `0x` 或 `0X`
* 八进制带前缀 `0` (这种表示法容易让人混淆，尽量避免使用)
* 二进制带前缀 `0b` 或 `0B`

注: Java *没有无符号 unsigned 形式* 的 int long short 或 byte。  
注: 整数因为存在范围限制，运算可能产生 *溢出* ，溢出不会报异常，但会产生奇怪的结果。  
注: 整数 *除 0* 时编译不会报错，但运行时会报异常。  

```java
// 溢出
int max = Integer.MAX_VALUE;  // 2147483647
System.out.print(max + 1);    // -2147483648

// 整型相除结果还是整型
System.out.println(9 / 5);  // 结果是 1 而不是 1.8
```

#### 浮点型

double 数值的精度是 float 类型的两倍，随着硬件成本的降低，开发一般都用 double。

float 数值须带后缀 `f` 或 `F`，double 是默认的，当然也可以加后缀 `d` 或 `D`。

浮点数虽然表示的范围大，但是浮点数常常无法精确表示。如，浮点数 0.1 在计算机中就 *无法精确表示*，因为十进制的 0.1 换算成二进制是一个无限循环小数，所以只能存储一个 0.1 的近似值。但是，0.5 这个浮点数又可以精确地表示。

注: 在线查询工具 http://www.binaryconvert.com/result_float.html

```txt
9.5f = 2³ x (1 + 0 x 2^-1 + 0 x 2^-2 + 1 x 2^-3 + 1 x 2^-4) 按照 IEEE 754 标准在内存中是这样存储的：

sign(1bit) exponent(8bit)     fraction(23bit)
0          10000010           00110000000000000000000
表示正数    表示指数 130-127=3  表示尾数 0011

注：阶码通常使用移码表示，是符号位取反的补码，目的是为了保证浮点数的机器零为全0
```

浮点数 *强转为整数*，小数部分会被丢掉，如希望四舍五入，可先加 0.5 再强转。如果超出了整型的最大范围，将返回整型的最大值。

```java
System.out.println(10.2 * 10.2);  // 结果是 104.039999 而不是 104.04

// 能分析出为啥结果是 5.2 么？答案：先 int 除法运算，然后在转 double 做加法
1.2 + 24 / 5  // 5.2

// 浮点数 除0 完全是合法的
0.0 / 0   // NaN
1.0 / 0   // Infinity
-1.0 / 0  // -Infinity

// 浮点数强转为整数
(int) -12.7         // -12
(int) (12.7 + 0.5)  // 13
(int) 1.2e20;       // 2147483647
```

浮点数比较大小

```java
/** 比较浮点数 */
public class FloatCmp {
  private final static Double EPSILON = 0.0000001;  // 公差

  public static void main(String[] args) {
    double da = 3 * .3333333333;
    double db = 0.99999992857;

    if (da == db) {
      System.out.println("Java considers " + da + "==" + db);
    } else if (equals(da, db, 0.0000001)) {
      System.out.println("Equal within epsilon " + EPSILON);
    } else {
      System.out.println(da + "!=" + db);
    }
  }

  public static boolean equals(double a, double b, double eps) {
    return a == b || Math.abs(a - b) < eps;
  }

  public static boolean equals(double a, double b) {
    return equals(a, b, EPSILON);
  }
}
```

#### 字符型 char

程序中使用单引号 `'` 声明的内容称为字符，每一对单引号里面只能保存一位字符。

在 Java 中英文和中文都统一使用 Unicode 编码。

```java
char c = 'A';
int num = c;   // 字符可以和 int 互相转换(以编码形式出现)
c= '王'
num = c;       // 29579 即 \u738B

// 一些常用编码范围
'A' 65  ~  'Z' 90
'a' 97  ~  'z' 122
'0' 48  ~  '9' 57
```

##### Unicode 转义字符的使用

```java
public class Example014 {
  public static void main(String[] args) {
    // \utest                                                     // 编译报错 [分析1]
    System.out.println("a\u0022.length() + \u0022b".length());    // 输出 2 [分析2]
  }                   // \u0022 是双引号的 Unicode 转义字符
}
```

分析1: Java 允许在注释以及代码中使用 `\u` 开头的 Unicode 转义字符，但要求转义必须有效，否则编译报错。  
分析2: 编译器在将程序解析成各种符号之前，会先将 Unicode 转义字符转换成为它们所表示的字符。

##### 特殊转义字符

Java 语言支持一些特殊的转义字符序列。

||
-------|----------
\n     | 换行 (0x0a)
\r     | 回车 (0x0d)
\f     | 换页符(0x0c)
\b     | 退格 (0x08)
\s     | 空格 (0x20)
\t     | 制表符
\\"    | 双引号
\\'    | 单引号
\\\\   | 反斜杠
\ddd   | 八进制字符 (ddd)
\uxxxx | 16进制 Unicode 字符 (xxxx)

#### 布尔型

George Boole 是19世纪重要的数学家之一。

Java 里面不允许使用 0 或 1 来填充布尔型变量的内容。

### 引用类型

在 Java 中，引用类型的变量非常类似于 C/C++ 的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个特定的类型，比如 Employee、Puppy 等。变量一旦声明后，类型就不能被改变了。

对象、数组都是引用数据类型。

所有引用类型的默认值都是 `null`。

一个引用变量可以用来引用任何与之兼容的类型。

```java
Site site = new Site("Runoob");
```

#### 字符串

和 `char` 类型不同，字符串 `String` 是引用类型，我们用双引号 `"..."` 表示字符串。一个字符串可以存储0个到任意个字符。

从 Java 13 开始，字符串可以用 `"""..."""` 表示多行字符串（Text Blocks）了。多行字符串前面共同的空格会被去掉。

#### 数组

数组一经创建，它的大小就是固定的，可通过 `arr.length` 获取数组长度。创建数组，所有元素初始化为默认值。

Java 会进行边界检查，运行时，如访问越界，就会抛出异常 java.lang.ArrayIndexOutOfBoundsException。

Java 中二维数组就是一维数组的数组。二维数组内各数组长度可以不一致，但大多数情况下，我们都会使用 MxN 的二维数组。

实际开发中，包装类 `ArrayList` 比数组更为常用。_java.util.Arrays_ 则提供了大量操作数组的工具方法。

```java
int[] arr1 = new int[5];                        // 只创建数组
int[] arr2 = new int[] { 68, 79, 91, 85, 62 };  // 创建并赋值
int[] arr3 = { 68, 79, 91, 85, 62 };            // 创建并赋值(最简化的写法)
```

### 类型转换

整型、实型(常量)、字符型数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。

数据类型转换必须满足如下规则: 

1. 不能对 boolean 类型进行类型转换。
2. 不能把对象类型转换成不相关类的对象。
3. 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。
4. 转换过程中可能导致溢出或损失精度，例如: (byte) 188 == -68
5. 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如: (int)-45.89f == -45

#### 自动类型转换

如果不会损失信息，必要时数值会被自动提升为高级的数据类型。必须满足转换前的数据类型的位数要低于转换后的数据类型。

#### 强制类型转换

条件是转换的数据类型必须是兼容的，格式 `(type) value`

大范围的整数向小范围的整数强转时，高位字节直接被扔掉，仅保留了低位字节。

```java
// 强制类型转换的类型溢出问题
int num = 130;
byte x = (byte) num;  // x = -126
```

#### 隐含强制类型转换

整数的默认类型是 int。浮点型不存在这种情况，因为在定义 float 类型时必须在数字后面跟上 F 或者 f。

```java
byte num = 100;
```


## 运算符

计算机的最基本用途之一就是执行数学运算，Java 提供了一套丰富的运算符来操纵变量。

|||
|------------|----------------------------------------
| 算术运算符 | `+` `-` `*` `/` `%` `++` `--`
| 关系运算符 | `==` `!=` `>` `<` `>=` `<=`
| 位运算符   | `&`按位与 <code>&#124;</code>按位或 `^`异或 `~`取反 `<<`左移 `>>`右移 `>>>`无符号右移
| 逻辑运算符 | `&`与 `&&`短路与 <code>&#124;</code>或 <code>&#124;&#124;</code>短路或 `!`非
| 赋值运算符 | `=` `+=` `-=` `/=` `%=` 位赋值运算符: `<<=` `>>=` `&=` `^=` <code>&#124;=</code>
| 其他运算符 | `? :` `()` `instanceof`

注: `&` 和 `|` 同时出现中逻辑运算和位运算中，通过操作数的类型很容易区分。  
注: 对 `byte` 和 `short` 类型进行移位时，会先转换为 `int` 再进行位移。  
注: 浮点数运算和整数运算相比，只能进行加减乘除这些数值计算，不能做位运算和移位运算。  

```java
-8 >> 1   // -4
-8 >>> 1  // 2147483644
```

### 运算符优先级

| 类别 |      操作符       | 关联性
|------|-------------------|-----------------
| 后缀 | `()` `[]` `.`     | 左到右
| 一元 | `+` `-` `!` `~`   | 右到左
| 乘性 | `*` `/` `%`       | 左到右
| 加性 | `+` `-`           | 左到右
| 移位 | `>>` `>>>` `<<`   | 左到右
| 关系 | `>` `>=` `<` `<=` | 左到右
| 相等 | `==` `!=`         | 左到右
| 按位与   | `&`           | 左到右
| 按位异或 | `^`           | 左到右
| 按位或   | <code>&#124;</code> | 左到右
| 逻辑与   | `&&`          | 左到右
| 逻辑或   | <code>&#124;&#124;</code> | 左到右
| 条件     |  `? :`        | 右到左
| 赋值 | `=` `+=` `-=` `*=` `/=` `%=` `>>=` `<<=` `&=` `^=` <code>&#124;=</code> | 右到左
| 逗号 | `,`               | 左到右

注: 没有必要死记优先级，使用 `()` 改变优先级可能是更好的办法。

`>>>` 逻辑右移，左边直接补 0。`>>` 算术右移，符号位保持不变，其他右移，并根据符号位补 0 或 1。

三元运算符也是短路运算。



## 程序逻辑控制

一般来说程序的结构包含顺序结构、选择结构、循环结构 3 种。

### 循环结构

循环结构选择：
  * while 循环，在不确定循环次数，但是确定循环结束条件的情况下使用
  * for 循环，确定循环次数的情况下使用

```java
while (循环判断) {
  循环内容;
  修改循环结束条件;
}

do {
  循环内容;
  修改循环结束条件;
} while (循环判断);

for(初始化; 循环判断; 更新计数器) {
  // 循环内容
}

// Java5 引入了一种主要用于数组的增强型 for 循环。
for(声明语句 : 表达式) {
  // 循环内容
}

// break 用于终止循环
// continue 用于跳过本次循环，直接进入下一轮循环
// 当需要跳出或结束多重循环时，可通过 label 实现，不过完全可以避免使用标签
public class Main {
  public static void main(String[] args) {
    OUT: for (int i = 1;; i++) {
      for (int j = i;; j++) {
        if (i > 2) break OUT;
        if (j > 3) break;
        System.out.printf("%d, %d\n", i, j);
      }
    }
  }
}
```

注：最佳实践，计数器变量定义在 for 循环内部，否则破坏了变量应该把访问范围缩到最小的原则。  
注：最佳实践，循环体内部不修改计数器，计数器的初始化、判断条件、每次循环后的更新条件统一放到 for() 语句中可以一目了然。

```java
import java.util.Arrays;

public class Main {
  public static void main(String args[]) {
    int[] numbers = {10, 20, 30, 40, 50};
    for (int x : numbers) {
      System.out.printf("%d,", x);
    }
    System.out.print("\n");
    String[] names = {"James", "Larry", "Tom", "Lacy"};
    System.out.println(Arrays.toString(names));
  }
}
```

### 分支结构

```java
if (布尔表达式 1) {
    // 如果布尔表达式 1 的值为 true 执行代码
} else if (布尔表达式 2) {
    // 如果布尔表达式 2 的值为 true 执行代码
} else if (布尔表达式 3) {
    // 如果布尔表达式 3 的值为 true 执行代码
} else {
    // 如果以上布尔表达式都不为 true 执行代码
}

switch (expression) {
    case value:
       // 语句
       break;  // 可选
    case value:
       // 语句
       break;  // 可选
    // 你可以有任意数量的 case 语句
    default:  // 可选
       // 语句
}
```

注：当 if 语句中只有一行代码时，可以省略 `{}`，但不建议这么做。  
注：引用类型判断内容相等要使用 `equals()`，注意避免 `NullPointerException`。  

```java
public class Main {
  public static void main(String[] args) {
    int n = 50;
    if (n >= 60)
      System.out.println("及格了");
      System.out.println("恭喜你"); // 注意这条语句不是if语句块的一部分，恭喜你掉坑里了
    System.out.println("END");
  }
}
```

```java
if (str != null && str.equals("hello")) {
  System.out.println("hello");
}
```

#### switch 表达式

从 Java 12 开始支持 switch 表达式语法，不但不需要 `break`，还可以直接返回值。

```java
public class Main {
  public static void main(String[] args) {
    String fruit = "orange";
    int opt = switch (fruit) {
      case "apple" -> 1;
      case "pear", "mango" -> 2;
      default -> {
        int code = fruit.hashCode();
        yield code; // yield 的用法，在复杂语句中返回值
      }
    };
    System.out.println("opt = " + opt);
  }
}
```

### 输入和输出

```java
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in); // 创建Scanner对象
    System.out.print("Input your name: "); // 打印提示
    String name = scanner.nextLine(); // 读取一行输入并获取字符串
    System.out.print("Input your age: "); // 打印提示
    int age = scanner.nextInt(); // 读取一行输入并获取整数
    System.out.printf("Hi, %s, you are %d\n", name, age); // 格式化输出
  }
}
```

注：详细的格式化参数请参考JDK文档 [java.util.Formatter](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Formatter.html#syntax)



## 程序结构

### 主方法

Java 中主方法的组成单元介绍：
  * `public` 主方法是程序的开始，所以这个方法对任何操作都一定是可见的，所以必须使用 public
  * `static` 证明此方法由类名称调用
  * `void` 主方法是一切执行的开始点，一直存在直到执行完毕
  * `main` 系统规定的方法名称，不能修改
  * `String args[]` 指的程序运行时传递的参数，格式为 `java 类名 参数1 参数2 参数3`

### 代码块

在程序编写中可以直接使用 `{}` 定义一段语句，根据此部分定义的位置以及声明的关键字的不同，代码块一共可以分为4种：普通代码块、构造块、静态块、同步代码块(等待多线程时)。

代码块本身有许多破坏程序结构的操作，所以在编写实际代码的过程中，并不建议使用代码块。

```java
public class Test {
    public static void main(String[] args) {
        {                                      // 普通代码块
            int num = 10;  // 局部变量
        }
        int num = 100;     // 全局变量
        new Book();
        new Book();
    }
    static {
        System.out.println("静态块会先于主方法执行");  // [分析1]
    }
}

class Book {
    public Book() {
        System.out.println("构造方法");
    }
    {                                          // 构造块
        System.out.println("类中的构造块，每次实例化对象时都会执行，且先于构造方法执行");
    }
    static {                                   // 静态块
        System.out.println("类中的静态块会先于构造块执行，且只执行一次");
    }
}
```

分析1：因为静态块会先于主方法执行，所以在 JDK1.7 之前，可以使用静态块来代替主方法，但 JDK1.7 开始要求必须定义主方法。



## 操作数据

### 数组

#### 基本概念

数组的定义语法：

```java
// 声明并开辟数组的2种方式
数据类型 数组名称[] = new 数据类型 [长度];
数据类型[] 数组名称 = new 数据类型 [长度];

// 声明和开辟数组分步完成
数据类型 数组名称[] = null;
数组名称 = new 数据类型 [长度];

// 数组的静态初始化
数据类型 数组名称[] = {值, 值, 值, ...};
数据类型 数组名称[] = new 数据类型[] {值, 值, 值, ...};
```

当数组开辟空间后，可以采用 `数组名称[下标|索引]` 的形式进行访问。
所有数组的下标都是从 `0` 开始的，如果访问的时候下标越界，就会报数组越界异常 java.lang.ArrayIndexOutOfBoundsException。

```java
int data[] = new int[3];
data[0] = 1;
System.out.println(data[0]);  // 1
System.out.println(data[2]);  // 0
System.out.println(data[4]);  // java.lang.ArrayIndexOutOfBoundsException
```

数组属于引用类型，所以数组的操作过程一定会牵扯到内存的分配问题。数组与对象保存唯一的区别在于：对象中的堆内存保存的是属性，而数组中的堆内存保存的是一组信息。

数组有一个最大的缺点——长度不能被改变，正因如此，实际开发中不会直接使用数组，仅会使用数组的概念(通过类集框架来解决)。

#### 二维数组

```java
数据类型[][] 数组名称 = new 数据类型[行数][列数];
数据类型[][] 数组名称 = new 数据类型[][] { {值, ...}, {值,值,值}, {} };
```

```java
int[][] data = new int[][] { {1,2,3}, {9,8,7,6} };
System.out.println(data[1][3]);
```

多维数组可以看成是数组的数组。实际开发中很少使用多维数组。

#### 数组操作方法

```java
// 数组复制
System.arraycopy(源数组名称，源数组复制开始索引，目标数组名称，目标数组复制开始索引，长度);
// 数组排序
java.util.Arrays.sort(数组名称);
// 遍历
double[] myList = {1.9, 2.9, 3.4, 3.5};
for (double element : myList) {
   System.out.println(element);
}
```

#### Arrays 类

`java.util.Arrays` 类能方便地操作数组，它提供的所有方法都是静态的。具有以下功能：
  * 给数组赋值：通过 `fill` 方法。
  * 对数组排序：通过 `sort` 方法,按升序。
  * 比较数组：通过 `equals` 方法比较数组中元素值是否相等。
  * 查找数组元素：通过 `binarySearch` 方法能对排序好的数组进行二分查找法操作。

#### 对象数组

```java
类名称[] 对象数组名称 = new 类名称[长度];
类名称[] 对象数组名称 = new 类名称[] {实例化对象, 实例化对象, ...};
```

```java
public class Test {
    public static void main(String[] args) {
        Book[] books = new Book[3];
        Book[] books2 = new Book[] {new Book(), new Book() };
        books2[0].name = "新书名";
        System.out.println(books[1]);        // null
        System.out.println(books2[0].name);  // 新书名
        System.out.println(books2[1].name);  // 默认书名
    }
}

class Book {
    String name = "默认书名";
}
```


### String 类

String 类应用非常广泛，且比较特殊 —— String 本身属于引用数据类型，但它可以像基本数据类型那样直接赋值。

#### 实例化

String 类有两种实例化方式，具体差异后续说明。

```java
String str = "";              // 直接赋值
String str = new String("");  // 通过构造函数新建

// 特殊的 String 构造函数
public String(String str) { /* */ }  // 在构造函数里依然要接收一个 String 类对象
```

String 类的两种对象实例化方式的区别(结合下面字符串比较部分学习)：
  * 直接赋值，只会开辟一块堆内存空间，并且会自动保存到对象池中供下次重复使用。
  * 构造方法，会开辟两块堆内存空间，其中有一块空间将成为垃圾，并且不会自动入池，但是用户可以使用 `intern()` 手工入池。

```java
// 手动入池演示
String stra = new String("hello").intern();
String strb = "hello";
System.out.println(stra == strb);  // true
```

#### 字符串比较

```java
String a = "123";
String b = "123";
String m = new String(a);
String n = new String("123");
System.out.println(a == b);  // true，字符串常量[分析1] + 常量池概念[分析2]
System.out.println(a == m);  // false
System.out.println(a == n);  // false
System.out.println(a.equals(n));  // true
```

`==` 是 Java 提供的关系运算符，主要的功能是进行数值相等判断，如果用在对象上，则只会对内存地址的数值进行比较。

String 对象的 `equals()` 方法专门负责进行字符串内容的比较，实际开发中字符串的比较都通过 `equals()` 方法完成。

分析1：Java 中的字符串常量实际上是作为 String 类的匿名对象的形式存在的。

分析2：在 JVM 的底层实际上会存在一个对象池(不一定只保存 String 对象)，当代码中使用了直接赋值的方式定义一个 String 对象时，会将此字符串对象所使用的匿名对象入池保存。如果后续还有其他 String 类对象也采用了直接赋值的方式，并且设置了同样的内容时，将不会开辟新的堆内存空间，而是使用已有的对象进行引用的分配。这种设计模式为共享设计模式。

#### 字符串一旦定义则不可改变

修改字符串，如 `str += "hello"`，实际上会新建一个字符串，并将新字符串的地址赋给变量，也就是说，原字符串不会改变(如果没有其它引用就会变为垃圾)，改变的只是对象的引用关系。正因为此特性，如果对字符串进行频繁的修改，会产生大量的垃圾，在开发中应该严格禁止。

虽然 Java 提供了可以修改内容的字符串操作类(StringBuffer StringBuilder)，但从实际使用经验来讲，开发中如果定义字符串，90% 的情况下使用的都会是 String，而如果只是进行简单的字符串修改(可能只修改一两次)，那么对于产生的垃圾问题也就没有必要过于在意。

#### String 类的常用方法

略



### 链表

> 程序开发的三大基本功：程序逻辑 + 数据结构 + SQL语言

保存数据首选数组，但数组有一个缺点——长度固定不可改变，当保存的内容长度不确定时，就可以利用链表结构来代替数组的使用。



