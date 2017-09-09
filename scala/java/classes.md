# 常用类库


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
