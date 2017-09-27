<style>#md h3 a, #md h4 a { border-bottom: none; }</style>

<script>
  var api = "https://docs.oracle.com/javase/8/docs/api/";
  document.querySelectorAll('#md h3, #md h4').forEach(function(header) {
    var text = header.innerText;
    if (/java\./.test(text)) {
      var arr = text.split(" ", 1)[0].split(".");
      header.innerHTML = "<a href='" + api + arr.join('/') + ".html'>" + text + "</a>";
    }
  });
</script>

# Java API 精选

https://docs.oracle.com/javase/8/docs/api/

### Java 关键字

```text
基本类型 byte short int long float double char boolean
结构 if else  for do while break continue  switch case default  try catch finally
修饰 abstract static final public protected private
类级 class interface extends implements throws  enum
方法级 super this new throw void return native
包级 package import
多线程 synchronized
其他 assert instanceof null
待确定 strictfp transient volatile
保留字 const goto
```


## java.lang

### java.lang.Object

收录了完整的方法列表。

```java
public class Object { }

public boolean equals(Object obj) { }
public int hashCode() { }
public String toString() { }
public final Class<?> getClass() { }
public final void notify() { }     // 唤醒等待队列中的第一个进程
public final void notifyAll() { }  // 唤醒所有等待队列中进程，大家开始正常竞争锁资源
public final void wait() throws InterruptedException { }  // 使当前线程进入WAITING状态，进入等待(锁)队列
public final void wait(long timeout) throws InterruptedException { }  // 进入TIMED_WAITING状态
public final void wait(long timeout, int nanos) throws InterruptedException { }
protected Object clone() throws CloneNotSupportedException { }
protected void finalize() throws Throwable { }
```

### java.lang.Class

```java
public final class Class<T> implements java.io.Serializable, GenericDeclaration, Type, AnnotatedElement{}

public static Class<?> forName(String className) throws ClassNotFoundException { }
  // Class.forName("java.util.Date") ==> class java.util.Date

public String getName() { }        // String.class.getName(); ==> "java.lang.String"
public String getSimpleName() { }  // String.class.getSimpleName(); ==> "String"
```

注：获取 Class 对象 https://docs.oracle.com/javase/tutorial/reflect/class/classNew.html  
注：关于 `a.getClass()` 和 `A.class`: `A.class` 在编译期处理，效率更高。注意 `Class` 类没有 `class` 的属性。

### java.lang.Character

```java
public final class Character implements java.io.Serializable, Comparable<Character> { }

public static boolean isLetter(char ch) { }
public static boolean isDigit(char ch) { }
public static boolean isWhitespace(char ch) { }
public static boolean isUpperCase(char ch) { }
public static boolean isLowerCase(char ch) { }
public static char toUpperCase(char ch) { }
public static char toLowerCase(char ch) { }
public static int compare(char x, char y) { }
public static String toString(char c) { }

public boolean equals(Object obj) { }
public int compareTo(Character anotherCharacter) { }
public char charValue() { }
public final int hashCode() { }
public final String toString() { }
```

### java.lang.String

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence { }

public static String join(CharSequence delimiter, CharSequence... elements) { }
public static String format(String format, Object... args) { }

public boolean contains(CharSequence s) { }
public char charAt(int index) { }
public int codePointAt(int index) { }
public int compareTo(String anotherString) { }
public int compareToIgnoreCase(String str) { }
public String concat(String str) { }
public String replace(char oldChar, char newChar) { }  // replace 没有正则的用法，对应正则的 replaceAll
public String replace(CharSequence target, CharSequence replacement) { }
public String trim() { }
public String toLowerCase() { }
public String toUpperCase() { }

public boolean matches(String regex) { } // 判断字符串是否符合正则表达式结构 "12y".matches("\\d+") ==> false
public String replaceAll(String regex, String replacement) { }    // 将满足正则的内容全部替换为新内容
public String replaceFirst(String regex, String replacement) { }  // 将满足正则的首个内容替换为新内容
public String[] split(String regex, int limit) { }
```

```java
String.format("hi, %s %s%n%d", "gavin", "wang", 28);  // "hi, gavin wang\r\n28"
String.join(",", "gavin", "wang", "me")               // "gavin,wang,me"
new String("g1G2g3").replaceAll("(?i)g\\d", "h0");    // "h0h0h0"
```

### java.lang.StringBuilder & StringBuffer

StringBuilder 在 JDK5.0 中引入，其前身是 StringBuffer (效率稍低，但多线程安全)，这两个类的 API 是相同的。

```java
public final class StringBuilder implements java.io.Serializable, CharSequence { }

public int length() { }
public StringBuilder append(String str) { }
public StringBuilder insert(int offset, String str) { }
public StringBuilder delete(int start, int end) { }
public char charAt(int index) { }
public int codePointAt(int index) { }
public int indexOf(String str, int fromIndex) { }
public String substring(int start, int end) { }  // 含 start 不含 end
```

### java.lang.Runtime

```java
public class Runtime { }

public static Runtime getRuntime() { }  // Runtime 采用了单例设计模式，通过此方法取得本类实例化对象

public Process exec(String command) throws IOException { }
public void gc() { }           // 执行垃圾回收
public long maxMemory() { }    // 最大可用内存
public long totalMemory() { }  // 虚拟机实际申请内存
public long freeMemory() { }   // 空余内存
```

### java.lang.System

```java
public final class System { }

public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length) { }
public static long currentTimeMillis() { }
public static long nanoTime() { }
public static void exit(int status) { }
public static void gc() { }  // 效果同 Runtime.getRuntime().gc()
public static Properties getProperties() { }
public static Map<String,String> getenv() { }
```

### java.lang.Math

```java
public final class Math { }

public static final double E
public static final double PI

public static int round(float a) { }               // 0.5 -> 1; -0.5 -> 0
public static double ceil(double a) { }
public static double floor(double a) { }
public static double pow(double a, double b) { }
public static double sqrt(double a) { }
public static long max(long a, long b) { }
public static float min(float a, float b) { }
public static int abs(int a) { }
public static double random() { }                  // 0 ~ 1 之间的随机数
public static double toRadians(double angdeg) { }
public static double toDegrees(double angrad) { }
public static double log(double a) { }             // ln(x)
public static double log10(double a) { }
```

### java.lang.Number

包含以下子类：
* Byte, Short, Integer, Long, Float, Double, BigDecimal, BigInteger,
* AtomicInteger, AtomicLong, LongAccumulator, LongAdder, DoubleAccumulator, DoubleAdder

```java
public abstract class Number implements java.io.Serializable { }
```

#### java.math.BigInteger

```java
public class BigInteger extends Number implements Comparable<BigInteger> { }
```

#### java.math.BigDecimal

```java
public class BigDecimal extends Number implements Comparable<BigDecimal> { }
```

### java.lang.Thread

```java
public class Thread implements Runnable { }

public static native void sleep(long millis) throws InterruptedException { } // 使当前线程进入BLOCKED状态

public enum State {NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED}

public void start() { }
public final void setPriority(int newPriority) { }
public final int getPriority() { }
public final void setName(String name) { }
public final String getName() { }
public StackTraceElement[] getStackTrace() { }
```


## java.util

### java.util.Random

```java
public class Random implements Serializable { }

Random() { }           // 无参构造，使用 System.nanoTime() 的返回值作为种子
Random(long seed) { }  // 种子相同，即使实例不同也产生相同的随机数，这样在安全性方面就会存在隐患

public int nextInt() { }
public int nextInt(int bound) { }  // 产生一个不大于指定边界的随机整数
```


### java.util.Date

Date 下原有格式转换等功能已经移到 SimpleDateFormat。

```java
public class Date implements java.io.Serializable, Cloneable, Comparable<Date> { }

public Date() { this(System.currentTimeMillis()); }
public Date(long date) { fastTime = date; }

public long getTime() { }
```

### java.util.Calendar

Calendar 类可以将取得的时间精确到毫秒，并且其可以分别取得日期时间数字，这样就可以直接进行各种日期时间的计算操作。

```java
public abstract class Calendar implements Serializable, Cloneable, Comparable<Calendar> { }  // 抽象类

public final static int YEAR = 1;
public final static int MONTH = 2;
public final static int DAY_OF_MONTH = 5;
public final static int DAY_OF_WEEK = 7;
public final static int HOUR = 10;
public final static int HOUR_OF_DAY = 11;  // (24小时制)小时
public final static int MINUTE = 12;
public final static int SECOND = 13;
public final static int MILLISECOND = 14;  // 10:04:15.250 PM -> 250

public static Calendar getInstance() { }

public int get(int field) { }
public boolean before(Object when) { }
public boolean after(Object when) { }
```

```java
Calendar c = Calendar.getInstance();
c.set(Calendar.YEAR, 2012);
c.get(Calendar.YEAR);              // 2012
c.before(Calendar.getInstance());  // true
Calendar.getInstance().get(Calendar.MONTH) + 1;  // 获取当前月份
```

### java.util.regex.Pattern & Matcher

实际使用情况来讲，只有很少情况才会利用 java.util.regex 包中的 Pattern 或 Matcher 类操作正则，大部分情况下都会考虑使用 java.lang.String 类中提供的方法来简化正则的操作。

```java
public final class Pattern implements java.io.Serializable { }  // 定义要使用的表达式对象

public static final int CASE_INSENSITIVE, MULTILINE, COMMENTS, ...

public static Pattern compile(String regex, int flags) { }  // 该类构造方法为private，必须用此方法取得实例
public static boolean matches(String regex, CharSequence input) { }

public Matcher matcher(CharSequence input) { }
public String[] split(CharSequence input, int limit) { }
public String toString() { return pattern; }
```

```java
public final class Matcher implements MatchResult { }  // 进行正则与指定内容的匹配操作

public boolean matches() { }  // 是否(完整)匹配
public boolean find() { }     // 执行单次(部分)匹配
public String replaceAll(String replacement) { }
public String replaceFirst(String replacement) { }

public Matcher reset() { }
public Matcher reset(CharSequence input) { text = input; return reset(); }  // 替换待匹配内容并重置
public int start() { }  // 上次匹配的起始位置，如未进行过匹配抛 IllegalStateException("No match available")
public int end() { }    // 上次匹配的结束位置
```

```java
Pattern pattern = Pattern.compile("\\d+", Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
Matcher matcher = pattern.matcher("A12bc\nde345f");
boolean matchFound = matcher.find();  // 执行3次结果：true (lastmatch=12); true (lastmatch=345); false
matcher.reset("46").matches();  // true
```


## java.text

### java.text.SimpleDateFormat

```java
public abstract class DateFormat extends Format { }

public final String format(Date date) { }
public Date parse(String source) throws ParseException { }

public class SimpleDateFormat extends DateFormat { }

public SimpleDateFormat(String pattern) { }
```

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
sdf.format(sdf.parse("2017-9-31 00:11:22"));  // "2017-10-01 00:11:22"
```

### java.text.MessageFormat

```java
public class MessageFormat extends Format { }

public static String format(String pattern, Object... arguments) { }

public Object[] parse(String source) throws ParseException { }
```


## java.io


## java.net










