# 常用类库


## java.lang.String

Java 提供了 String 类来创建和操作字符串。

```java
// 获取字符串长度
int len = "www.runoob.com".length();

// 连接字符串
"我的名字是 ".concat("Runoob");
"我的名字是 " + "Runoob";

// 创建格式化字符串
String fs = String.format("浮点型变量的值为 %f, 整型变量的值为 %d, 字符串变量的值为 %s",
                          floatVar, intVar, stringVar);
```

### 字符串比较

```java
"Hello".equals(greeting);
"Hello".equalsIgnoreCase("hello");

// 空串与null串
if (str != null && str.length() != 0);  // `str != null` 不可省略，否则报错
if (str != null && str.equals(""));
```

注：一定不要使用 `==` 运算符比较两个字符串是否相等！这个运算符只能够确定两个字符串是否放置在同一个位置上。


## java.lang.StringBuffer & StringBuilder

当对字符串进行修改的时候，需要使用 StringBuffer 和 StringBuilder 类。

和 String 类不同的是，StringBuffer 和 StringBuilder 类的对象能够被多次修改，并且不产生新的未使用对象。

StringBuilder 类在 Java5 中被提出，它和 StringBuffer 之间的最大不同在于 StringBuilder 的方法不是线程安全的。

由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类。

```java
StringBuffer sBuffer = new StringBuffer("菜鸟教程官网：");
sBuffer.append("www").append(".runoob").append(".com");
System.out.println(sBuffer);
```


## java.lang.Runtime & java.lang.System

### 垃圾回收

`Runtime.getRuntime().gc()` 或 `System.gc()` 可手动触发垃圾回收。

当 JVM 剩余内存空间不足时会触发 GC，如果 Eden 内存空间不足就要进行从回收(Minro Collection)，旧生代空间不足时要进行主回收(Major Collection)，永久代空间不足时会进行完全垃圾回收(Full Collection)。

如果希望在一个对象收尾时执行一些收尾工作，则对象所在的类可以通过 `finalize()` 方法实现，此方法由 Object 类定义。

```java
class Human {
  public Human() {
    System.out.println("呱呱坠地");
  }
  @Override
  protected void finalize() throws Throwable {  // 为什么用 Thrwoable，见注1
    System.out.println("生命终结");
    throw new Exception("此处即使抛出异常也不会打断程序继续执行");
  }
}
```

注1：`finalize()` 方法出现异常或错误都不会导致程序中断，为了强调方法的完善性，这里使用了 Throwable。


### 运行本机可执行程序

```java
Runtime run = Runtime.getRuntime();
Process pro = run.exec("mspaint.exe");
Thread.sleep(2000);
pro.destroy();
```


## java.lang.Object

```java
protected Object clone() throws CloneNotSupportedException { }
```

clone() 是实现克隆的唯一方法，所有类的对象只有调用此方法才可以进行克隆，但是此方法本身使用了 protected 访问权限，这样当在不同的包中产生对象时将无法调用 Object 类中的 clone 方法，因此就需要子类来覆写 clone 方法(但依然调用的是父类中的clone方法)，才可以正常完成克隆操作。

在 Java 中为了区分出哪些类可以被克隆，专门提供了一个 Cloneable 接口，也就是说要克隆对象的类必须实现 Cloneable 接口。但是 `Cloneable` 接口没有任何方法，所以这个接口属于标识接口，用于表示一种能力。

```java
// 定义可克隆对象操作要点
// 1. 定义类时实现 Cloneable 接口
// 2. 在类中覆写 clone() 方法
class Book implements Cloneable {
  private String title;
  private double price;
  public Book(String title, double price) {
    this.title = title;
    this.price = price;
  }
  @Override
  public Object clone() throws CloneNotSupportedException {
    return super.clone();
  }
}
public class TestDemo {
  public static void main(String[] args) throws Exception {
    Book bookA = new Book("Java开发", 99);
    Book bookB = bookA.clone();
  }
}
```

## Math & Random & Number

### java.lang.Math

Java 的 Math 包含了用于执行基本数学运算的属性和方法，如初等指数、对数、平方根和三角函数。Math 的方法都被定义为 static 形式，通过 Math 类可以在主函数中直接调用。

在整个 Math 类中有一个方法需要为读者特别说明，那就是四舍五入的操作：

```java
// 注意 0.5 和 -0.5 的处理结果
Math.round(0.5);  // 0.51 -> 1; 0.5 -> 1; 0.49 -> 0; -0.49 -> -0; -0.5 -> -0; -0.51 -> -1;
```

### java.util.Random

在 Java 中，随机数的产生取决于种子，随机数和种子之间的关系遵循以下两个规则：
    1. 种子不同，产生不同的随机数。
    2. 种子相同，即使实例不同也产生相同的随机数。

Random 类的默认种子(无参构造)是 System.nanoTime() 的返回值(JDK1.5版本以前默认种子是 System.currentTimeMillis() 的返回值)，这个值是距离某一个固定时间点的纳秒数，不同操作系统和硬件有不同的固定时间点，也就是不同的操作系统纳秒值是不同的，而同一操作系统的纳秒值也会不同，随机数自然也就不同了。

### java.lang.Number

Java 语言为每一个内置数据类型提供了对应的包装类。所有的包装类(Byte、Short、Integer、Long、Float、Double)都是抽象类 Number 的子类。

当内置数据类型被当作对象使用的时候，编译器会把内置类型装箱为包装类。相似的，编译器也可以把一个对象拆箱为内置类型。

```java
Integer x = 5;
x =  x + 10;
System.out.println(x);
```

#### 大整数操作类 BigInteger


#### 大小数操作类 BigDecimal


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
SimpleDateFormat ft = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
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


## 反射机制

反射是 Java 中最为重要的特性，几乎所有的开发框架以及应用技术中都是基于反射技术的应用。

### 取得类实例对象

取得类实例是进行反射控制的前提。

```java
实例名.getClass();
类名.class;
Class.forName("java.util.Date");
```

注1: `.class` 这种用法是 Syntax 而不是属性; 在编译期处理, 效率比 `a.getClass()` 高; 且这种用法也适用于原始值类型, 如 `boolean.class`.

### 反射实例化对象

```java
public class Test {
    public static void main(String[] args) throws Exception {
        Book book = Book.class.newInstance();
        System.out.println(book.getClass().getSimpleName());
    }
}

class Book {
    public float price;
    public Book() { this(100f); }
    public Book(float price) { this.price = price; }
}
```

利用 `new` 进行对象的实例化操作是最正统的做法，但利用 `new` 实例化对象时需要明确地指定类的构造方法，所以 `new` 是造成耦合的最大元凶，所以要想对代码进行解耦，首先要解决的就是关键字 `new` 实例化对象的操作。

```java
interface Fruit { void eat(); }
class Apple implements Fruit { public void eat() { System.out.println("eat apple"); } }
class Orange implements Fruit { public void eat() { System.out.println("eat orange"); } }

// 应用示例
class Factory {
    public static Fruit getInstance(String className) {
        Fruit f = null;
        try { f = (Fruit) Class.forName(className).newInstance(); } catch (Exception e) { }
        return f;
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        Factory.getInstance("Apple").eat();
    }
}
```

### 使用反射调用构造

`newInstance()` 方法要求类中必须提供无参构造方法，当类中只提供有参构造方法时，就必须通过 java.lang.reflect.Constructor 类来实现对象的反射实例化操作。

实际开发中，还是尽量使用无参构造进行反射操作，这也与之前讲解的简单 Java 类的开发原则类似。

```java
String className = "Book";  // 动态类名
Class.forName(className).getConstructor(float.class).newInstance(12.5f);  // 调用有参构造创建实例
```

### 反射调用方法

### 反射调用成员


## 国际化

### 使用 Locale 类定义语言环境

### 利用 ResourceBundle 读取资源文件

#### 资源文件

* 资源文件一般都是以 `key=value` 的形式保存文本信息
* 资源文件必须以 `.properties` 作为文件后缀
* 资源文件的命名规范应该与类名相同，即每个单词的首字母必须大写(貌似没有此限制啊)
* 资源文件必须保存在 CLASSPATH 目录下，也就是说资源文件可以保存在包中
* 读取资源文件时，规则同类文件，需要加上包名，但不能带后缀 `.properties`
* 资源文件中的中文内容必须转换为 UNICODE 编码

```text
# 注释内容 Messages.properties
demo.info = "\u8BFE\u7A0B"kechengzhongwen
withParam = params1 = {0}, params2 = {1}
```

#### 资源读取

```java
import java.util.ResourceBundle;
public class Test {
    public static void main(String[] args) throws Exception {
        ResourceBundle rb = ResourceBundle.getBundle("Messages");
        System.out.println(rb.getString("demo.info"));  // 输出："课程"kechengzhongwen
        System.out.println(MessageFormat.format(rb.getString("withParam"), 12, "str")); // 占位符使用
    }
}
```

#### 多资源读取

* 多语言资源文件命名格式：文件名_语言编码_国家编码.properties
* 使用 ResourceBundle 类读取时只输入文件名称，具体的语言编码和国家编码都由程序自己分辨
* 当同时存在公共资源(没有设置语言和国家编码)和具体语言资源文件(设置了语言和国家编码)，会优先读取具体语言资源文件内容，对于具体资源文件中不存在的属性，则还是会读取公共资源文件内容。

