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

public String getName() { }        // String.class.getName(); ==> "java.lang.String"
public String getSimpleName() { }  // String.class.getSimpleName(); ==> "String"
public Package getPackage() { return Package.getPackage(this); }
public native Class<? super T> getSuperclass();
public Class<?>[] getInterfaces() { }  // 取得类实现的所有接口

public boolean isEnum() { }
public native boolean isInterface();
public native boolean isArray();

@CallerSensitive  // 反射实例化对象
public T newInstance() throws InstantiationException, IllegalAccessException { }
@CallerSensitive  // 取得全部构造方法
public Constructor<?>[] getConstructors() throws SecurityException { }
@CallerSensitive  // 取得指定参数类型的构造方法
public Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { }
@CallerSensitive
public Method[] getMethods() throws SecurityException { }
@CallerSensitive
public Method getMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException { }
@CallerSensitive  // 取得本类自有成员(变量+常量)
public Field[] getDeclaredFields() throws SecurityException { }
@CallerSensitive  // 取得本类指定名称的成员
public Field getDeclaredField(String name) throws NoSuchFieldException, SecurityException { }
@CallerSensitive  // 取得全部成员(含继承)
public Field[] getFields() throws SecurityException { }
@CallerSensitive  // 
public Field getField(String name) throws NoSuchFieldException, SecurityException { }
```

注：Class 类中最为重要的一个方法就是 `newInstance()`，通过此方法可以利用反射实现 Class 类包装类型的对象实例化操作，也就是说即使不使用 `new` 也能新建对象。但此方法只能调用无参构造方法，如果类中不存在无参构造方法就会报错。

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
public String[] split(String regex, int limit) { }  // "(?i:matcher)" 忽略大小写的写法，详见 Pattern.html
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

public static final InputStream in
public static final PrintStream out
public static final PrintStream err

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

#### java.lang.Integer

```java
public final class Integer extends Number implements Comparable<Integer> { }

@Native public static final int   MIN_VALUE = 0x80000000;
@Native public static final int   MAX_VALUE = 0x7fffffff;

public static int parseInt(String s, int radix) throws NumberFormatException { }
```

#### java.lang.Double

```java
public final class Double extends Number implements Comparable<Double> { }

public static boolean isNaN(double v) { return (v != v); }  // isInfinite(double v) isFinite(double d)
public boolean isNaN() { return isNaN(value); }
public static double parseDouble(String s) throws NumberFormatException { }
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

### java.lang.reflect.Constructor

```java
public final class Constructor<T> extends Executable { }
public Class<?>[] getExceptionTypes() { return exceptionTypes.clone(); }
public int getModifiers() { return modifiers; }  // 修饰符本质上都是数字的加法操作，如 public static = 1 + 8
public String getName() { return getDeclaringClass().getName(); }
public Class<?>[] getParameterTypes() { return parameterTypes.clone(); }
public int getParameterCount() { return parameterTypes.length; }
@CallerSensitive
public T newInstance(Object ... initargs) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException { }
```

```java
String className = "Book";  // 动态类名
Class.forName(className).getConstructor(float.class).newInstance(12.5f);  // 调用有参构造创建实例
```

### java.lang.reflect.Method

```java
public final class Method extends Executable { }
public Class<?> getReturnType() { return returnType; }
public int getParameterCount() { return parameterTypes.length; }
public Class<?>[] getParameterTypes() { return parameterTypes.clone(); }
public Class<?>[] getExceptionTypes() { return exceptionTypes.clone(); }
@CallerSensitive  // 此方法是实现方法反射调用的核心操作
public Object invoke(Object obj, Object... args) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException { }
```

### java.lang.reflect.Field

```java
public final class Field extends AccessibleObject implements Member { }
@CallerSensitive  // 取得指定对象中的成员内容，相当于直接调用成员
public Object get(Object obj) throws IllegalArgumentException, IllegalAccessException { }
@CallerSensitive  // 设置指定对象中的成员内容，相当于直接设置成员内容
public void set(Object obj, Object value) throws IllegalArgumentException, IllegalAccessException { }
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
public void set(int field, int value) { }
public final void set(int year, int month, int date, [int hourOfDay, int minute, [int second]]) { }
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

### java.util.Arrays

```java
public class Arrays { }

public static boolean equals(int[] a, int[] a2) { }  // boolean char byte short long float double Object
public static void fill(float[] a, float val) { }
public static <T> T[] copyOf(T[] original, int newLength) { } // 可设定新长度，裁短，或加长并填充指定类型的默认值
public static int[] copyOfRange(int[] original, int from, int to) { }
public static void sort(short[] a, int fromIndex, int toIndex) { }  // 注1
public static <T> void sort(T[] a, Comparator<? super T> c) { }  // 自定义排序，或对非 Comparable 排序
public static int binarySearch(double[] a, int fromIndex, int toIndex, double key) { }  // 二分法查找
public static String toString(char[] a) { }
public static String deepToString(Object[] a) { }  // 适用多维数组，逐层解析
```

注1：数组实际上分为普通数组和对象数组两类使用情况，普通数组可以直接根据数据的大小关系进行排序，而对象数组，要使用 `sort()` 实现排序就必须实现 Comparable 接口：

#### java.lang.Comparable

```java
public interface Comparable<T> {
    public int compareTo(T o);  // 覆写此方法时只需返回3种结果1(>0) -1(<0) 0
}
```

#### java.util.Comparator

Comparable 接口必须在类定义时实现，如果类定义中没有实现 Comparable，那么还有一个补救的比较器接口 Comparator。

```java
@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
    boolean equals(Object obj);  // 注
}
```

注：正常 `@FunctionalInterface` 只能包含一个抽象方法，但这里定义了两个抽象方法，这样不会有问题的原因在于，所有匿名类都继承自 java.lang.Object，而 Object 类中已经有了 equals() 方法实现，所以实际使用时，只需要覆写 compare() 方法即可。

```java
class Book { public float price; public Book(float price) { this.price = price; } }
Book[] books = new Book[] { new Book(12.5f), new Book(62), new Book(25) };
java.util.Arrays.sort(books, (a, b) -> a.price > b.price ? 1 : -1);  // [12.5, 25, 62]
```

### java.util.Locale

```java
public final class Locale implements Cloneable, Serializable { }
public Locale(String language, String country) { this(language, country, ""); }
public static Locale getDefault() { return defaultLocale; }
```

### java.util.ResourceBundle

```java
public abstract class ResourceBundle { }
@CallerSensitive  // 根据当前默认语言环境取得资源对象
public static final ResourceBundle getBundle(String baseName) { }
@CallerSensitive  // 根据指定的语言环境取得资源对象
public static final ResourceBundle getBundle(String baseName, Locale locale) { }
public final String getString(String key) { return (String) getObject(key); }
```

### java.util.Collection & Map & Stack & Stream

见集合笔记


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

```java
java.text.MessageFormat.format("params = {0}", 12)  // "params = 12"
```


## java.io

整个 java.io 实际上就是五个类(File InputStream OutputStream Reader Wirter)和一个接口(Serializable)。

### java.io.File

File 类中提供的方法并不涉及文件的具体内容，只是针对文件本身的操作。

```java
public class File implements Serializable, Comparable<File> { }
public File(String pathname) { }
public File(String parent, String child) { }

public static final String separator = "" + separatorChar;  // 分隔符 "/" 或 "\\", 注意因历史原因为小写

public boolean createNewFile() throws IOException { }
public boolean exists() { }
public boolean isFile() { }
public boolean isDirectory() { }
public boolean delete() { }
public boolean mkdirs() { }

public long length() { }  // 文件或目录的字节长度，file.length()/1024 + 1 可转为 kb
public String[] list() { }
public File[] listFiles() { }
public File getParentFile() { }
public long lastModified() { }
```

```java
File file = new File("d:\\demo\\test.txt");
file.getParentFile().exists();  // false
file.getParentFile().mkdirs();  // true, 直接 file.mkdirs() 会生成名为 test.txt 的文件夹
file.getParentFile().getParentFile().list();  // ["demo", ...]
file.isFile();         // false
file.createNewFile();  // true
file.isFile();         // true
new SimpleDateFormat("yy-MM-dd HH:mm:ss").format(new Date(file.lastModified()));  // 17-10-08 20:07:01
file.toString();       // "d:\\demo\\test.txt"
```

### java.io.OutputStream

```java
public abstract class OutputStream implements Closeable, Flushable { }

public void close() throws IOException { }
public void flush() throws IOException { }
public abstract void write(int b) throws IOException { }
public void write(byte b[]) throws IOException { }
public void write(byte b[], int off, int len) throws IOException { }
```

#### java.io.FileOutputStream

```java
public class FileOutputStream extends OutputStream { }
public FileOutputStream(File file) throws FileNotFoundException { this(file, false); }
public FileOutputStream(String name, boolean append) throws FileNotFoundException {
    this(name != null ? new File(name) : null, append);
}
```

```java
OutputStream output = new FileOutputStream("d:\\demo\\test.txt");
output.write("Hello World!\r\n".getBytes());
output.close();
```

### java.io.InputStream

```java
public abstract class InputStream implements Closeable { }
public void close() throws IOException { }
// 读取单个字节，读取到文件末尾返回 -1
public abstract int read() throws IOException;
// 将数据读取到字节数组中，返回读取长度
public int read(byte b[]) throws IOException { return read(b, 0, b.length); }
public int read(byte b[], int off, int len) throws IOException { }
```

#### java.io.FileInputStream

```java
public class FileInputStream extends InputStream { }
public FileInputStream(File file) throws FileNotFoundException { }
public FileInputStream(String name) throws FileNotFoundException { }
```

```java
InputStream input = new FileInputStream("d:\\demo\\test.txt");
StringBuffer str = new StringBuffer();
// 逐个读取
int i = 0;
while((i = input.read()) != -1) { str.append(Character.toChars(i)); }
// 批量读取
byte[] data = new byte[4];
int count = 0;
while((count = input.read(data)) != -1) {
    if (count < 4) { str.append(new String(data), 0, count); } else { str.append(new String(data)); }
}
input.close();
```

### java.io.Writer

Writer 类中直接提供了输出字符串数据的方法，这样就不用将字符转成字节数组了。

```java
public abstract class Writer implements Appendable, Closeable, Flushable { }
abstract public void flush() throws IOException;
abstract public void close() throws IOException;
public Writer append(char c) throws IOException { write(c); return this; }
public Writer append(CharSequence csq) throws IOException { }
abstract public void write(char cbuf[], int off, int len) throws IOException {}
public void write(String str) throws IOException { }
```

Writer 是一个抽象类，要针对文件内容进行输出，可以使用 FileWriter 类实现实例化操作。

#### java.io.FileWriter

```java
public class FileWriter extends OutputStreamWriter { }
public FileWriter(File file) throws IOException { }
public FileWriter(String fileName, boolean append) throws IOException { }
```

```java
Writer output = new FileWriter("d:\\demo\\test.txt", true);
output.write("中文输出");
output.close();
```

### java.io.Reader

```java
public abstract class Reader implements Readable, Closeable { }
abstract public void close() throws IOException;
public int read() throws IOException { }
public int read(char cbuf[]) throws IOException { return read(cbuf, 0, cbuf.length); }
public long skip(long n) throws IOException { }  // 跳过指定长度的字符
```

#### java.io.FileReader

```java
public class FileReader extends InputStreamReader { }
public FileReader(File file) throws FileNotFoundException { }
public FileReader(String fileName) throws FileNotFoundException { }
```

读取一个中文字符，InputStream 需读两次，而 Reader 只需读一次。

```java
InputStream input = new FileInputStream("d:\\demo\\test.txt");  // 文件内容：abc中文
input.read();   // 读7次结果：97,98,99,214,208,206,196
Reader reader = new FileReader("d:\\demo\\test.txt");
reader.read();  // 读5次结果：97,98,99,20013,25991
```

### java.io.ByteArrayInputStream & ByteArrayOutputStream

```java
public class ByteArrayInputStream extends InputStream { }
public ByteArrayInputStream(byte buf[], int offset, int length) { }

public class ByteArrayOutputStream extends OutputStream { }
public ByteArrayOutputStream(int size) { }  // 指定数组长度，默认32，数组可根据需要自动增长
public synchronized byte toByteArray()[] { return Arrays.copyOf(buf, count); }
public synchronized int size() { return count; }
public synchronized String toString() { return new String(buf, 0, count); }
```

### java.io.PrintStream & PrintWriter

```java
public class PrintStream extends FilterOutputStream implements Appendable, Closeable { }
private void write(String s) { }  // private
public void print(boolean b) { write(b ? "true" : "false"); }
public void print(char c) { write(String.valueOf(c)); }
public void print(int i) { write(String.valueOf(i)); }  // long float double 同
public void print(char s[]) { write(s); }
public void print(Object obj) { write(String.valueOf(obj)); }
public void println() { newLine(); }
```

### java.io.BufferedReader

```java
public class BufferedReader extends Reader { }
public BufferedReader(Reader in) { this(in, defaultCharBufferSize); }
public String readLine() throws IOException { return readLine(false); }
```

### java.util.Scanner

实际开发中，只要操作的是文本数据，输出时使用打印流，输入时使用扫描流(也可用缓冲字符输入流)。

```java
public final class Scanner implements Iterator<String>, Closeable { }
public Scanner(InputStream source) { }
public Scanner(Readable source) { }
public Scanner(File source) throws FileNotFoundException { }
public Scanner(Path source) throws IOException { }
public Scanner(String source) { }

public boolean hasNext() { }  // This method may block while waiting for input to scan.
public boolean hasNext(Pattern pattern) { }  // 支持使用正则表达式来进行格式验证
public boolean hasNext(String pattern)  { return hasNext(patternCache.forName(pattern)); }
public String next() { }
public boolean hasNextLine() { }  // Byte Short Int Long Float Double Boolean BigInteger BigDecimal
public String nextLine() { }  // Byte Short Int Long Float Double Boolean BigInteger BigDecimal
public Scanner useDelimiter(String pattern) { }  // 设置读取的分隔符
```

```java
Scanner scan = new Scanner(System.in);
System.out.print("请输入内容：");
if (scan.hasNext()) { System.out.println("输入内容：" + scan.next()); }
scan.close();
```

### java.io.ObjectOutputStream & java.io.ObjectInputStream

```java
public class ObjectOutputStream extends OutputStream implements ObjectOutput, ObjectStreamConstants { }
public ObjectOutputStream(OutputStream out) throws IOException { }  // 指定输出流
public final void writeObject(Object obj) throws IOException { }    // 序列化对象
```

```java
public class ObjectInputStream extends InputStream implements ObjectInput, ObjectStreamConstants { }
public final Object readObject() throws IOException, ClassNotFoundException { }
```

```java
// 序列化对象并保存到文件中
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("d:\\demo\\test.ser"));
oos.writeObject(new Date());
oos.close();

// 从外部文件读入内容并反序列化成对象
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("d:\\demo\\test.ser"));
Object obj = ois.readObject();
Date d = (Date) obj;  // 强制向下转型存在隐患，最好利用反射机制来进行操作
ois.close();
```


## java.net

### java.net.ServerSocket

```java
public class ServerSocket implements java.io.Closeable { }
public ServerSocket(int port) throws IOException { this(port, 50, null); }  // 开辟一个监听端口
public Socket accept() throws IOException { }  // 接收客户端连接，等待时会阻塞代码执行
public void close() throws IOException { }
```

### java.net.Socket

```java
public class Socket implements java.io.Closeable { }
public Socket(String host, int port) throws UnknownHostException, IOException { }
public OutputStream getOutputStream() throws IOException { }
public InputStream getInputStream() throws IOException { }
```










