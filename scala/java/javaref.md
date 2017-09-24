<style>
  td:nth-child(2) { color: red; }
  i { color: gray; }
</style>
<script>
(function() {
  var list = document.querySelectorAll('td:nth-child(2)');
  var reg=/\((.*?)\)/;
  for (var i = list.length; i--;) {
    list[i].innerHTML = list[i].innerHTML.replace(reg, '(<i>$1</i>)');
  }
})();
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

收录了完成的方法列表

```java
public class Object { }

public final Class<?> getClass() { }
public int hashCode() { }
public boolean equals(Object obj) { }
protected Object clone() throws CloneNotSupportedException { }
public String toString() { }
public final void notify() { }
public final void notifyAll() { }
public final void wait(long timeout) throws InterruptedException { }
public final void wait(long timeout, int nanos) throws InterruptedException { }
public final void wait() throws InterruptedException { }
protected void finalize() throws Throwable { }
```

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

public char charValue() { }
public final int hashCode() { }
public boolean equals(Object obj) { }
public int compareTo(Character anotherCharacter) { }
public final String toString() { }
```

### java.lang.String

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence { }

public static String join(CharSequence delimiter, CharSequence... elements) { }
public static String format(String format, Object... args) { }

public char charAt(int index) { }
public int codePointAt(int index) { }
public int compareTo(String anotherString) { }
public int compareToIgnoreCase(String str) { }
public boolean contains(CharSequence s) { }
public String concat(String str) { }
public String replace(char oldChar, char newChar) { }
public String replaceFirst(String regex, String replacement) { }
public String replaceAll(String regex, String replacement) { }
public String toLowerCase() { }
public String toUpperCase() { }
public String trim() { }
```

### java.lang.StringBuilder & StringBuffer

StringBuilder 在 JDK5.0 中引入，其前身是 StringBuffer (效率稍低，但多线程安全)，这两个类的 API 是相同的。

```java
public final class StringBuilder implements Serializable, CharSequence { }

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
public long totalMemory() { }  // 可用内存
public long freeMemory() { }   // 空余内存
```

### java.lang.System

```java
public final class System { }

public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length) { }
public static long currentTimeMillis() { }
public static long nanoTime() { }
public static Properties getProperties() { }
public static Map<String,String> getenv() { }
public static void exit(int status) { }
public static void gc() { }  // 效果同 Runtime.getRuntime().gc()
```

### java.lang.Math

```java
public final class Math { }

public static final double E
public static final double PI

public static double toRadians(double angdeg) { }
public static double toDegrees(double angrad) { }
public static double log(double a) { }             // ln(x)
public static double log10(double a) { }
public static double sqrt(double a) { }
public static double ceil(double a) { }
public static double floor(double a) { }
public static double pow(double a, double b) { }
public static int round(float a) { }
public static double random() { }                  // 0-1 之间的随机数
public static int abs(int a) { }
public static long max(long a, long b) { }
public static float min(float a, float b) { }
```

### java.lang.Number








### java.lang.Thread

```java
public class Thread implements Runnable { }

public void start() { }
public static void sleep(long millis) throws InterruptedException { }
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

Random() { }           // 无参构造，使用 System.nanoTime() 的返回值
Random(long seed) { }  // 种子相同，即使实例不同也产生相同的随机数，这样在安全性方面就会存在隐患

public int nextInt() { }
public int nextInt(int bound) { }  // 产生一个不大于指定边界的随机整数
```

### java.util.Date


### java.util.Calendar


### java.util.regex



## java.io



## java.text

### java.text.SimpleDateFormat


### java.text.MessageFormat


## java.net











