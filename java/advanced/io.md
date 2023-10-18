# Java IO 编程


## 文件操作类 File


## 字节流与字符流

java.io.File 只能操作文件，不能操作文件的内容，操作文件内容必须依靠流来完成。

流的基本操作形式：
  1. 通过 File 类定义一个要操作文件的路径
  2. 通过字节流或字符流的子类对象为父类对象实例化
  3. 进行数据的读、写操作
  4. 数据流属于资源操作，资源操作必须关闭

### 字节输出流 OutputStream

```java
public interface AutoCloseable {  // since 1.7
    void close() throws Exception;
}
public interface Closeable extends AutoCloseable {  // since 1.5
    public void close() throws IOException;
}
public abstract class OutputStream implements Closeable, Flushable {
    // ...
    public void close() throws IOException { }
}
```

观察 OutputStream 类定义可以发现它同时实现了 Closeable 和 Flushable 两个父接口，而从 1.7 开始 Closeable 接口又继承了 AutoCloseable 接口。

在实际开发中会有许多开发者忘记关闭资源，导致其他线程无法打开资源进行操作，所以 Java 提供了自动关闭操作的支持，只要使用以下格式，在操作完成后系统会自动调用 close() 释放资源。

```java
try (AutoCloseable接口子类名 对象 = new AutoCloseable接口子类名()) {
    调用方法;  // 可能会出异常
} catch (异常类型 对象) {
    异常处理;
} ... [finally {
    异常处理的统一出口;
}]
```

虽然 Java 提供了这种自动关闭操作的支持，不过仍有不少开发者愿意手动调用 close() 方法，这个由读者自行选择。

OutputStream 本身是一个抽象类，如果需要进行文件操作，可以使用 FileOutputStream 子类来完成操作。

```java
OutputStream output = new FileOutputStream("d:\\demo\\test.txt");
output.write("Hello World!\r\n".getBytes());
output.close();
```

### 字节输入流 InputStream

### 字符输出流 Writer

### 字符输入流 Reader

### 字节流与字符流的区别

以文件操作为例，字节流与字符流最大的区别是：字节流直接与终端文件进行数据交互，字符流需要将数据经过缓冲区处理。使用 OutputStream 输出数据，即使最后没有关闭输出流，内容也可以正常输出，而使用 Writer 输出，如果没有 flush() 或 close() 数据就可能停留在缓冲区，不会输出到文件。

在实际开发中，对字节数据处理时比较多的，例如图片、音乐等。而字符流最大的好处是它可以进行中文的有效处理。在开发中，如果要处理中文时优先考虑字符流，如果没有中文问题，建议使用字节流。


## 转换流

虽然字节流与字符流表示两种不同的数据流操作，但是这两种流彼此间是可以实现互相转换的，而要实现这样的转换可以通过 InputStreamReader OutputStreamWriter 两个类。

```java
public class InputStreamReader extends Reader { public InputStreamReader(InputStream in) { } }
public class OutputStreamWriter extends Writer { public OutputStreamWriter(OutputStream out) { } }
```

FileWriter 继承 OutputStreamWriter 继承 Writer  
FileReader 继承 InputStreamReader 继承 Reader

通过继承结构可以发现，FileWriter 与 FileReader 都是转换流的子类，也就证明所有要读取的文件数据都是字节数据，所有的字符都是在内存中处理后形成的。


## 内存流

在流的操作中除了进行文件的输入与输出操作之外，还可以针对内存进行同样的操作。

* 字节内存流：ByteArrayInputStream ByteArrayOutputStream
* 字符内存流：CharArrayReader CharArrayWriter

```java
InputStream in = new ByteArrayInputStream("abc中文".getBytes());
ByteArrayOutputStream out = new ByteArrayOutputStream();
int i;
while((i = in.read()) != -1) { out.write(i); }
out.toByteArray();  // byte[7] { 97, 98, 99, -42, -48, -50, -60 }
out.toString()      // "abc中文"
```


## 打印流

OutputStream 要求输出类型为字节类型，如果要输出 int double java.util.Date 等常用类型都需要将其转换为字节后才可以输出。为了解决这问题，java.io 包中又提供了一组打印流方便用户的输出操作。

```java
PrintStream p = new PrintStream("d:\\demo\\test.txt");
p.println(5);
p.println("line2");
p.close();
```


## System 类对 IO 的支持

System 类与 IO 有关的3个对象常量：

```java
public final static InputStream in = null;   // 键盘数据输入
public final static PrintStream out = null;  // 显示器上信息输出
public final static PrintStream err = null;  // 显示器上错误输出
```

```java
InputStream in = System.in;
StringBuffer buf = new StringBuffer();
System.out.print("请输入数据：");
int temp;
while((temp = in.read()) != -1) {  // 英文工作正常，中文乱码，解决见 BufferedReader
    if (temp == '\n') break;
    buf.append((char) temp);
}
System.out.println("输入数据为：" + buf);
```


## 字符缓冲流 BufferedReader

为了可以进行网站数据的输入操作，最好的做法是采用缓冲区的方式对输入的数据进行暂存，而后程序可以利用输入流一次性读取内容，这样就可以避免输入中文时的读取错乱问题。

* 字符缓冲区流：BufferedReader BufferedWriter
* 字节缓冲区流：BufferedInputStream BufferedOutputStream

其中最为重要的是 BufferedReader 类，如果要处理中文数据，字符流是最方便的。

```java
BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));  // 需用到转换流
System.out.print("请输入数据：");
String str = buf.readLine();      // 以回车作为换行
System.out.println("输入的内容：" + str);
```

问：为什么不使用 BufferedInputStream? 答：因为字符流方便处理中文，并且支持 String 返回。

```java
BufferedReader buf = new BufferedReader(new FileReader("d:\\demo\\test.txt"));
String str = null;
while ((str = buf.readLine()) != null) { System.out.println(str); }
buf.close();
```


## 扫描流 Scanner

从 JDK1.5 开始增加了一个 java.util.Scanner 的程序类，利用这个类可以方便地实现数据的输入操作。

在 JDK1.5 之前如果要进行数据的输入操作，使用 java.io.BufferedReader 类是最方便的，但是 BufferedReader 类会存在以下两个问题：读取数据时返回类型只有 String 类型；所有的分隔符都是固定的。

```java
Scanner scan = new Scanner(System.in);
System.out.print("请输入成绩：");
String prompt = "输入的不是数字，请重新输入：";
while(!scan.hasNextDouble() && !prompt.equals(scan.next())) { System.out.print(prompt); }
double score = scan.nextDouble();
System.out.println("输入内容：" + score);
```

Scanner 类中除了支持各种常用的数据类型外，也可以在输入数据时使用正则表达式来进行格式验证。

```java
if (scan.hasNext("\\d{4}-\\d{2}-\\d{2}")) {  }  // 生日正则校验 2017-10-10
```

利用 Scanner 可以实现文件数据的读取操作，在读取前可以使用 useDelimiter() 方法设置指定的读取分隔符。

```java
Scanner scan = new Scanner(new FileInputStream("d:\\demo\\test.txt"));
scan.useDelimiter("\n");
while (scan.hasNext()) { System.out.println(scan.next()); }
scan.close();
```

> 实际开发中，只要操作的是文本数据，输出时使用打印流，输入时使用扫描流(也可用缓冲字符输入流)。

## 对象序列化

对象序列化的本质实际上就是将内存中所保存的对象数据转换为二进制数据流进行传输的操作。但是并不是所有类的对象都可以直接进行序列化操作，要被序列化的对象所在类必须实现 java.io.Serializable 接口。

```java
public interface Serializable { }  // 该接口没有任何内容，它只是一个标识接口，表示一种能力
```

### 实现序列化与反序列化

实现了 Serializable 接口后并不意味着对象可以实现序列化操作，还需要以下两个类的支持：
* java.io.ObjectOutputStream 将对象序列化为指定格式的二进制数据
* java.io.ObjectInputStream 将序列化的二进制对象信息转换回对象内容

### `transient` 关键字

对象最有意义的内容就是对象的属性信息，所以在默认情况下，序列化的是对象的属性信息。如果某些属性的内容不需要被保存，就可以通过 `transient` 关键字类定义。实际开发中很少用到此关键字。

```java
class Book implements Serializable {
    private transient String title;  // 此属性不会被序列化，一圈转出再转回后，值会变成 null
    private double price;
    public Book(String title, double price) { this.title = title; this.price = price;  }
    public String toString() { return "书名：" + this.title + ", 价格: " + this.price; }
}
```
