<style>
  td:first-child { color: red; }
</style>
<script>
ooboqoo.contentsRegExp = /H[123]/;  // 定义目录生成级别
</script>

# 基础语法

一个 Java 程序可以认为是一系列对象的集合，这些对象通过调用彼此的方法来协同工作。相关概念有：类、对象、方法、实例变量。

### 基本语法

编写 Java 程序时，应注意以下几点：
  * 大小写敏感 - Java 是大小写敏感的
  * 类名 - 类名采用大驼峰式写法
  * 方法名 - 方法名采用小驼峰式写法
  * 源文件 - 源文件名必须和类名相同，文件名的后缀为 `.java`
  * 主方法入口 - 所有 Java 程序由 `public static void main(String []args)` 方法开始执行

### 标识符

类名、变量名以及方法名都被称为标识符，关于标识符，有以下几点需要注意：
  * 所有的标识符都应该以字母 `A-Za-z`，美元符 `$`、或者下划线 `_` 开始
  * 首字符之后可以是字母 `A-Za-z`，美元符 `$`、下划线 `_` 或数字 `0-9` 的任何字符组合
  * 关键字不能用作标识符
  * 标识符是大小写敏感的

### 修饰符

Java 可以使用修饰符来修饰类中方法和属性，主要有两类修饰符：
  * 访问控制修饰符 : `default`, `public` , `protected`, `private`
  * 非访问控制修饰符 : `final`, `abstract`, `strictfp`

### 变量

Java 中主要有如下几种类型的变量
  * 局部变量
  * 类变量（静态变量）
  * 成员变量（非静态变量）

### 关键字

下面列出了 Java 保留字。这些保留字不能用于常量、变量、和任何标识符的名称。

```text
// 结构体
if else switch case break default
do while for continue
try catch finally throw

// 修饰符
default public protected static private
abstract final

// 类型
boolean byte short int long float double char enum

// 面向对象
class extends implements interface super new this

// 
package import instanceof assert return

// 未使用
goto const

// 陌生的关键字见下表
```

|||
|--------------|------------------------------------------------
| native       | 表示方法用非 java 代码实现
| strictfp     | 浮点数比较使用严格的规则
| synchronized | 表示同一时间只能由一个线程访问的代码块
| throws       | 定义方法可能抛出的异常
| transient    | 修饰不要序列化的字段
| void         | 标记方法不返回任何值
| volatile     | 标记字段可能会被多个线程同时访问，而不做同步

### 注释

Java 支持单行以及多行注释(多行注释不支持嵌套)。

```java
/** 文档注释 */
/* 多行注释 */
// 单行注释
```

### 继承

在 Java 中，一个类可以由其他类派生。如果你要创建一个类，而且已经存在一个类具有你所需要的属性或方法，那么你可以将新创建的类继承该类。利用继承的方法，可以重用已存在类的方法和属性，而不用重写这些代码。被继承的类称为超类 super class，派生类称为子类 subclass。

### 接口

在 Java 中，接口可理解为对象间相互通信的协议。接口在继承中扮演着很重要的角色。接口只定义派生要用到的方法，但是方法的具体实现完全取决于派生类。

### 运行过程

* 编译型 源程序 --编译连接--> 可执行程序EXE --执行--> 操作系统
* Java   源程序 --编译--> 字节码程序 --解释执行--> **解释器** --> 操作系统 


## 对象和类

Java 作为一种面向对象语言。支持以下基本概念：多态、继承、封装、抽象、类、对象、实例、方法、重载，本节重点讲对象和类。

### 类定义

一个类可以包含以下类型变量：局部变量、成员变量、类变量

```java
public class Dog {
  String breed;
  int age;
  String color;
  void barking() { }
  void hungry() { }
  void sleeping() { }
}
```

### 构造方法

每个类都有构造方法。如果没有显式地为类定义构造方法，Java 编译器将会为该类提供一个默认构造方法。

在创建一个对象的时候，至少要调用一个构造方法。构造方法的名称必须与类同名，一个类可以有多个构造方法。

```java
public class Puppy {
    public Puppy() { }
    public Puppy(String name) { /* 这个构造器仅有一个参数：name */ }
}
```

### 创建对象

使用关键字 `new` 来创建一个新的对象。创建对象需要以下三步：
  * 声明：声明一个对象，包括对象名称和对象类型。
  * 实例化：使用关键字 new 来创建一个对象。
  * 初始化：使用 new 创建对象时，会调用构造方法初始化对象。

```java
public class Puppy {
   int puppyAge;
   public Puppy(String name) {
      System.out.println("小狗的名字是 : " + name); 
   }
 
   public void setAge(int age) {
       puppyAge = age;
   }
 
   public int getAge( ) {
       System.out.println("小狗的年龄为 : " + puppyAge); 
       return puppyAge;
   }
 
   public static void main(String []args) {
      /* 创建对象 */
      Puppy myPuppy = new Puppy("tommy");
      /* 通过方法来设定age */
      myPuppy.setAge(2);
      /* 调用另一个方法获取age */
      myPuppy.getAge();
      /*你也可以像下面这样访问成员变量 */
      System.out.println("变量值 : " + myPuppy.puppyAge); 
   }
}
```

### 源文件声明规则

当在一个源文件中定义多个类，并且还有 `import` 语句和 `package` 语句时，要特别注意这些规则。
  * 一个源文件中只能有一个 public 类
  * 一个源文件可以有多个非 public 类
  * 源文件的名称应该和 public 类的类名保持一致。
  * 如果一个类定义在某个包中，那么 `package` 语句应该在源文件的首行。
  * 如果源文件包含 `import` 语句，那么应该放在 `package` 语句（如果存在 package 语句）和类定义之间。
  * `import` 语句和 `package` 语句对源文件中定义的所有类都有效。在同一源文件中，不能给不同的类不同的包声明。

### 包

包主要用来对类和接口进行分类。当开发 Java 程序时，可能编写成百上千的类，因此很有必要对类和接口进行分类。

包，其实就是文件夹，用于解决相同类名问题。包名要求全部小写，一般都是公司的名倒着写。

### `import` 语句

在 Java 中，如果给出一个完整的限定名，包括包名、类名，那么 Java 编译器就可以很容易地定位到源代码或者类。Import 语句就是用来提供一个合理的路径，使得编译器可以找到某个类。

```java
import java.io.*;  // 载入 java_installation/java/io 路径下的所有类
```


## 基本数据类型

### 内置数据类型

Java 语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

* byte 数据类型是8位、有符号的，以二进制补码表示的整数；最小值 -128（-2^7）；最大值 127（2^7-1）；默认值 0；
* short 数据类型是 16 位、有符号的以二进制补码表示的整数；最小值 -32768（-2^15）； 最大值 32767（2^15 - 1）；
* int 数据类型是32位、有符号的以二进制补码表示的整数；最小值 -2^31； 最大值 2,147,483,647（20亿）（2^31 - 1）；
* long 数据类型是 64 位、有符号的以二进制补码表示的整数；
* float 数据类型是单精度、32位、符合IEEE 754标准的浮点数；浮点数不能用来表示精确的值，如货币；
* double 数据类型是双精度、64 位、符合IEEE 754标准的浮点数；double类型同样不能表示精确的值，如货币；
* boolean 数据类型表示一位的信息；只有两个值：true 和 false；
* char 类型是一个单一的 16 位 Unicode 字符；

实际上，JAVA 中还存在另外一种基本类型 `void`，它也有对应的包装类 java.lang.Void，不过我们无法直接对它们进行操作。

3.3.1 整型

long 数值带后缀 `L` 或 `l`
十六进制数值有前缀 `0x` 或 `0X`
八进制带前缀 `0` 但这种表示法容易让人混淆，尽量避免
二进制带前缀 `0b` 或 `0B`

注意，Java 没有无符号 unsigned 形式的 int long short 或 byte

3.3.2 浮点类型

double 数值的精度是 float 类型的两倍，一般都用 double。

float 数值须带后缀 `f` 或 `F`，double 是默认的，当然也可以加后缀 `d` 或 `D`

正无穷 父无穷 NaN

3.3.3 char

Unicode 转义序列在注释中出现时，可能导致一些隐蔽的问题

### 引用类型

在 Java 中，引用类型的变量非常类似于 C/C++ 的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个特定的类型，比如 Employee、Puppy 等。变量一旦声明后，类型就不能被改变了。

对象、数组都是引用数据类型。

所有引用类型的默认值都是null。

一个引用变量可以用来引用任何与之兼容的类型。

```java
Site site = new Site("Runoob");
```

### 常量

Java 中使用 `final` 关键字来修饰常量，为了便于识别，通常使用大写字母表示常量。

```java
final double PI = 3.1415927;
```

byte、int、long、和 short 都可以用十进制、16进制以及8进制的方式来表示。

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

Java 语言支持一些特殊的转义字符序列。

|||
|----|----------
| \n | 换行 (0x0a)
| \r | 回车 (0x0d)
| \f | 换页符(0x0c)
| \b | 退格 (0x08)
| \s | 空格 (0x20)
| \t | 制表符
| \" | 双引号
| \' | 单引号
| \\\\ | 反斜杠
| \ddd   | 八进制字符 (ddd)
| \uxxxx | 16进制 Unicode 字符 (xxxx)


### 类型转换

整型、实型（常量）、字符型数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。

数据类型转换必须满足如下规则：

1. 不能对 boolean 类型进行类型转换。
2. 不能把对象类型转换成不相关类的对象。
3. 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。
4. 转换过程中可能导致溢出或损失精度，例如：(byte) 188 == -68
5. 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如：(int)-45.89f == -45

#### 自动类型转换

必须满足转换前的数据类型的位数要低于转换后的数据类型

#### 强制类型转换

条件是转换的数据类型必须是兼容的，格式 `(type) value`

#### 隐含强制类型转换

整数的默认类型是 int。浮点型不存在这种情况，因为在定义 float 类型时必须在数字后面跟上 F 或者 f。


## 变量

所有的变量在使用前必须声明。声明变量的基本格式如下：

```text
type identifier [ = value][, identifier [= value] ...] ;
```

Java 语言支持的变量类型有：
  * 类变量：独立于方法之外的变量，用 static 修饰。
  * 实例变量：独立于方法之外的变量，不过没有 static 修饰。
  * 局部变量：类的方法中的变量。


## 修饰符

### 访问控制修饰符

| 修饰符    | 当前类 | 同一包内 | 子孙类 | 其他包 |
|-----------|:------:|:--------:|:------:|:------:|
| public    |    Y   |     Y    |    Y   |    Y   |
| protected |    Y   |     Y    |    Y   |    N   |
| default   |    Y   |     Y    |    N   |    N   |
| private   |    Y   |     N    |    N   |    N   |

### 非访问修饰符

`static` 用来创建类方法和类变量。  
`final` 用来修饰类、方法和变量，final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量。  
`abstract` 用来创建抽象类和抽象方法。  
`synchronized` 和 `volatile` 修饰符，主要用于线程的编程。


## 运算符

计算机的最基本用途之一就是执行数学运算，Java 提供了一套丰富的运算符来操纵变量。

|||
|------------|----------------------------------------
| 算术运算符 | `+` `-` `*` `/` `%` `++` `--`
| 关系运算符 | `==` `!=` `>` `<` `>=` `<=`
| 位运算符   | `&` <code>&#124;</code> `^` `~` `<<` `>>` `>>>`
| 逻辑运算符 | `&&` <code>&#124;&#124;</code> `!`
| 赋值运算符 | `=` `+=` `-=` `/=` `%=` 位赋值运算符：`<<=` `>>=` `&=` `^=` <code>&#124;=</code>
| 其他运算符 | `? :` `instanceof`

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


## 循环结构

```java
while ( 布尔表达式 ) {
  //循环内容
}

do {
  //代码语句
} while (布尔表达式);

for(初始化; 布尔表达式; 更新) {
  //代码语句
}

// Java5 引入了一种主要用于数组的增强型 for 循环。
for(声明语句 : 表达式)
{
   //代码句子
}

// break 用于终止循环
// continue 用于跳过本次循环，直接进入下一轮循环 
```

```java
public class Test {
    public static void main(String args[]) {
        int[] numbers = {10, 20, 30, 40, 50};

        for (int x : numbers) {
            System.out.print(x);
            System.out.print(",");
        }
        System.out.print("\n");
        String[] names = {"James", "Larry", "Tom", "Lacy"};
        for (String name : names) {
            System.out.print(name);
            System.out.print(",");
        }
    }
}
```


## 分支结构

```java
if (布尔表达式 1) {
   // 如果布尔表达式 1的值为 true 执行代码
} else if (布尔表达式 2) {
   // 如果布尔表达式 2的值为 true 执行代码
} else if (布尔表达式 3) {
   // 如果布尔表达式 3的值为 true 执行代码
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


## Number & Math 类

Java 语言为每一个内置数据类型提供了对应的包装类。所有的包装类（Integer、Long、Byte、Double、Float、Short）都是抽象类 Number 的子类。

当内置数据类型被当作对象使用的时候，编译器会把内置类型装箱为包装类。相似的，编译器也可以把一个对象拆箱为内置类型。Number 类属于 java.lang 包。

```java
Integer x = 5;
x =  x + 10;
System.out.println(x); 
```

Java 的 Math 包含了用于执行基本数学运算的属性和方法，如初等指数、对数、平方根和三角函数。Math 的方法都被定义为 static 形式，通过 Math 类可以在主函数中直接调用。


## Character 类

Java 语言为内置数据类型 char 提供了包装类 Character 类。Character 类提供了一系列方法来操纵字符。

```java
Character ch = new Character('a');
Character ch = 'a';
```


## String 类

Java 提供了 String 类来创建和操作字符串。

String 类有 11 种构造方法，这些方法提供不同的参数来初始化字符串。

```java
// 获取字符串长度
int len = "www.runoob.com".length();

// 连接字符串
"我的名字是 ".concat("Runoob");
"我的名字是 " + "Runoob";

// 创建格式化字符串
String fs = String.format("浮点型变量的的值为 " +
                          "%f, 整型变量的值为 " +
                          " %d, 字符串变量的值为 " +
                          " %s", floatVar, intVar, stringVar);
```


### 字符串比较

```java
"Hello".equals(greeting);
"Hello".equalsIgnoreCase("hello");

// 空串与null串
if (str != null && str.length() != 0);  // `str != null` 不可省略，否则报错
if (str != null && str.equals(""));
```

一定不要使用 `==` 运算符比较两个字符串是否相等！这个运算符只能够确定两个字符串是否放置在同一个位置上。

## StringBuffer 和 StringBuilder 类

当对字符串进行修改的时候，需要使用 StringBuffer 和 StringBuilder 类。
和 String 类不同的是，StringBuffer 和 StringBuilder 类的对象能够被多次的修改，并且不产生新的未使用对象。
StringBuilder 类在 Java5 中被提出，它和 StringBuffer 之间的最大不同在于 StringBuilder 的方法不是线程安全的（不能同步访问）。
由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类。然而在应用程序要求线程安全的情况下，则必须使用 StringBuffer 类。

```java
StringBuffer sBuffer = new StringBuffer("菜鸟教程官网：");
sBuffer.append("www");
sBuffer.append(".runoob");
sBuffer.append(".com");
System.out.println(sBuffer);  
```

### 3.7 输入输出

```java
import java.util.*;

public class InputTest {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        // get first input
        System.out.print("What is your name? ");
        String name = in.nextLine();

        // get second input
        System.out.print("How old are you? ");
        int age = in.nextInt();

        // display output on console
        System.out.println("Hello, " + name + ". Next year, you'll be " + (age + 1));
    }
}
```

System.out.print() 输出之后不换行  
System.out.println() 输出之后换行

## 数组

```text
// 声明数组
dataType[] arrayRefVar;

// 创建数组
arrayRefVar = new dataType[arraySize];

// 声明 + 创建(字面量法)
dataType[] arrayRefVar = {value0, value1, ..., valuek};
```

```java
double[] myList = new double[2];
myList[0] = 5.6;
myList[1] = 4.5;
// 计算所有元素的总和
double total = 0;
for (int i = 0; i < size; i++) {
   total += myList[i];
}
System.out.println("总和为： " + total);
```

### 遍历

```java
double[] myList = {1.9, 2.9, 3.4, 3.5};
// 打印所有数组元素
for (double element : myList) {
   System.out.println(element);
}
```

### 多维数组

多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数组，其每一个元素都是一个一维数组。

```java
String str[][] = new String[3][4];
str[0][0] = "00";
```

### Arrays 类

java.util.Arrays 类能方便地操作数组，它提供的所有方法都是静态的。具有以下功能：
  * 给数组赋值：通过 `fill` 方法。
  * 对数组排序：通过 `sort` 方法,按升序。
  * 比较数组：通过 `equals` 方法比较数组中元素值是否相等。
  * 查找数组元素：通过 `binarySearch` 方法能对排序好的数组进行二分查找法操作。


## 日期时间

java.util 包提供了 Date 类来封装当前的日期和时间。 

```java
Date()               // 使用当前日期和时间来初始化对象
Date(long millisec)  // 参数是从1970年1月1日起的毫秒数
```

### 获取当前日期时间

```java
Date date = new Date();
System.out.println(date.toString());
```

### 格式化

```java
import java.util.*;
import java.text.*;
// ...
Date dNow = new Date();
SimpleDateFormat ft = new SimpleDateFormat ("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
System.out.println("Current Date: " + ft.format(dNow));

System.out.printf("年-月-日格式：%tF%n", dNow); 
```

### 休眠 sleep 

```java
import java.util.*;
  
public class SleepDemo {
   public static void main(String args[]) {
      try { 
         System.out.println(new Date( ) + "\n"); 
         Thread.sleep(1000*3);   // 休眠3秒
         System.out.println(new Date( ) + "\n"); 
      } catch (Exception e) { 
          System.out.println("Got an exception!"); 
      }
   }
}
```

### 测量时间

```java
import java.util.*;
  
public class DiffDemo { 
   public static void main(String args[]) {
      try {
         long start = System.currentTimeMillis( );
         System.out.println(new Date( ) + "\n");
         Thread.sleep(5*60*10);
         System.out.println(new Date( ) + "\n");
         long end = System.currentTimeMillis( );
         long diff = end - start;
         System.out.println("Difference is : " + diff);
      } catch (Exception e) {
         System.out.println("Got an exception!");
      }
   }
}
```


## 正则表达式

Java 正则表达式和 Perl 的是最为相似的。java.util.regex 包主要包括以下三个类：
* Pattern 类：pattern 对象是一个正则表达式的编译表示。Pattern 类没有公共构造方法。要创建一个 Pattern 对象，你必须首先调用其公共静态编译方法，它返回一个 Pattern 对象。该方法接受一个正则表达式作为它的第一个参数。
* Matcher 类：Matcher 对象是对输入字符串进行解释和匹配操作的引擎。与 Pattern 类一样，Matcher 也没有公共构造方法。你需要调用 Pattern 对象的 matcher 方法来获得一个 Matcher 对象。
* PatternSyntaxException：PatternSyntaxException 是一个非强制异常类，它表示一个正则表达式模式中的语法错误。

```java
import java.util.regex.*;
 
class RegexExample {
   public static void main(String args[]){
      String content = "I am noob from runoob.com.";
      String pattern = ".*runoob.*";
 
      boolean isMatch = Pattern.matches(pattern, content);
      System.out.println("字符串中是否包含了 'runoob' 子字符串? " + isMatch);
   }
}
```

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {
    private static final String REGEX = "foo";
    private static final String INPUT = "fooooooooooooooooo";
    private static Pattern pattern = Pattern.compile(REGEX);
    private static Matcher matcher;

    public static void main(String args[]) {
        matcher = pattern.matcher(INPUT);

        System.out.println("Current REGEX is: " + REGEX);
        System.out.println("Current INPUT is: " + INPUT);

        System.out.println("lookingAt(): " + matcher.lookingAt());
        System.out.println("matches(): " + matcher.matches());
    }
}
```


## 方法

在前面几个章节中我们经常使用到 `System.out.println()`，那么它是什么呢？`println()` 是一个方法，`System` 是系统类，`out` 是标准输出对象。这句话的用法是调用系统类 System 中的标准输出对象 out 中的方法 println()。

### 方法的定义

```text
修饰符 返回值类型 方法名(参数类型 参数名) {
    ...
    方法体
    ...
    return 返回值;
}
```

```java
static float interest(float principal, int year){...}
```

### 方法调用 和 void

### 方法的重载

方法重载就是一个类的两个方法拥有相同的名字，但是有不同的参数列表。Java 编译器根据方法签名判断哪个方法应该被调用。
方法重载可以让程序更清晰易读。执行密切相关任务的方法应该使用相同的名字。
重载的方法必须拥有不同的参数列表。你不能仅仅依据修饰符或者返回类型的不同来重载方法。

### 变量作用域

局部变量必须声明才可以使用。
方法的参数范围涵盖整个方法。参数实际上是一个局部变量。
for循环的初始化部分声明的变量，其作用范围在整个循环。

### 命令行参数的使用

```java
public class CommandLine {
   public static void main(String args[]) { 
      for (int i=0; i<args.length; i++) {
         System.out.println("args[" + i + "]: " + args[i]);
      }
   }
}
```

### 构造方法

当一个对象被创建时候，构造方法用来初始化该对象。构造方法和它所在类的名字相同，但构造方法没有返回值。

### 可变参数

JDK 1.5 开始，Java支持传递同类型的可变参数给一个方法。在方法声明中，在指定参数类型后加一个省略号(...) 。
一个方法中只能指定一个可变参数，它必须是方法的最后一个参数。任何普通的参数必须在它之前声明。

```java
public static void printMax(double... numbers) {
    if (numbers.length == 0) {
        System.out.println("No argument passed");
        return;
    }
    // ...
    System.out.println("The max value is " + result);
}
```

### finalize() 方法

Java 允许定义这样的方法，它在对象被垃圾收集器析构(回收)之前调用，这个方法叫做 finalize( )，它用来清除回收对象。


## Stream、File 和 IO



## Scanner 类

java.util.Scanner 是 Java5 的新特征，我们可以通过 Scanner 类来获取用户的输入。



## 异常处理

### 捕获异常

使用 try 和 catch 关键字可以捕获异常。try/catch 代码块放在异常可能发生的地方。

```java
try {
   // 程序代码
} catch(ExceptionName e1) {
   //Catch 块
}
```

### 多重捕获块

```java
try {
   // 程序代码
} catch(异常类型1 异常的变量名1) {
  // 程序代码
} catch(异常类型2 异常的变量名2) {
  // 程序代码
} catch(异常类型2 异常的变量名2) {
  // 程序代码
} finally {
  // 程序代码
}
```

### throws/throw 关键字

一个方法可以声明抛出多个异常，多个异常之间用逗号隔开。

```java
import java.io.*;
public class className {
   public void withdraw(double amount) throws RemoteException, InsufficientFundsException {
       // Method implementation
   }
   //Remainder of class definition
}
```

### 声明自定义异常

