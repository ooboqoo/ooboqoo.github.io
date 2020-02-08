# Java 版本变更

https://en.wikipedia.org/wiki/Java_version_history

|||||
-----------------|----------|-|------
JDK 1.0          | 1996.01 | | 
JDK 1.1          | 1997.02 | | 
J2SE 1.2         | 1998.12 | | Java 2 Platform, Standard Edition
J2SE 1.3         | 2000.05 | | 
J2SE 1.4         | 2002.02 | `assert` keyword | 
J2SE 5.0         | 2004.09 | enum, generics, autoboxing etc. | 为了更好地体现版本的语义性，将版本号由 1.5.0 改成了 5.0
Java SE 6        | 2006.12 | @Override in interfaces | 使用 "Java SE" 替换了 "J2SE"，并删除了版本号尾 ".0"；内部版本号仍沿用 1.6.0
Java SE 7        | 2011.07 | diamonds, ARM, multi-catch etc. | 
Java SE 8 (LTS)  | 2014.03 | lambdas, type annotations etc. | 
Java SE 9        | 2017.09 | modules, private methods in interfaces etc. | 以前每 3<sup>+</sup> 年发布一个大版本，从这开始会每6个月出一个主版本
Java SE 10       | 2018.03 | local variable type inference | 
Java SE 11 (LTS) | 2018.09 | local variable syntax for lambda parameters | 
Java SE 17 (LTS) | 2021.09 | | 



## Java 5

引入 泛型、注解、自动装箱与拆箱、枚举、可变参数 等核心特性，并且这些特性一直被广泛使用。

Tiger added a number of significant new language features:

* Generics: provides compile-time (static) type safety for collections and eliminates the need for most typecasts (type conversion)
* Metadata: also called annotations; allows language constructs such as classes and methods to be tagged with additional data, which can then be processed by metadata-aware utilities
* Autoboxing/unboxing: automatic conversions between primitive types (such as int) and primitive wrapper classes (such as Integer)
* Enumerations: the `enum` keyword creates a typesafe, ordered list of values (such as Day.MONDAY, Day.TUESDAY, etc.); previously this could only be achieved by non-typesafe constant integers or manually constructed classes (typesafe enum pattern)
* Varargs: the last parameter of a method can now be declared using a type name followed by three dots (e.g. `void drawtext(String... lines)`); in the calling code any number of parameters of that type can be used and they are then placed in an array to be passed to the method, or alternatively the calling code can pass an array of that type
* Enhanced `for each` loop: the for loop syntax is extended with special syntax for iterating over each member of either an array or any `Iterable`, such as the standard Collection classes
* Improved semantics of execution for multi-threaded Java programs; the new Java memory model addresses issues of complexity, effectiveness, and performance of previous specifications
* Static imports

There were also the following improvements to the standard libraries:

* Automatic stub generation for RMI objects
* The concurrency utilities in package java.util.concurrent
* Scanner class for parsing data from various input streams and buffers

### 静态导入

如果一个类中的方法全部都是 static 类型，那么其他类要引用此类时必须先使用 import 导入所需要的包，再使用 `类名.方法()` 进行调用。而使用静态导入，则不再需要写类名即可直接使用静态方法：

```java
import static 包.类.*;
```



## Java 7

* JVM support for dynamic languages, with the new invokedynamic bytecode under JSR-292, following the prototyping work currently done on the Multi Language Virtual Machine
* Compressed 64-bit pointers
* These small language changes (grouped under a project named Coin):
  * Strings in `switch`
  * Automatic resource management in try-statement
  * Improved type inference for generic instance creation, aka the diamond operator `<>`
  * Simplified varargs method declaration
  * Binary integer literals
  * Allowing underscores in numeric literals
  * Catching multiple exception types and rethrowing exceptions with improved type checking
* Concurrency utilities under JSR 166
* New file I/O library adding support for multiple file systems, file metadata and symbolic links. The new packages are _java.nio.file_, _java.nio.file.attribute_ and _java.nio.file.spi_
* *Timsort* is used to sort collections and arrays of objects instead of merge sort
* Library-level support for elliptic curve cryptography algorithms
* An XRender pipeline for Java 2D, which improves handling of features specific to modern GPUs
* New platform APIs for the graphics features originally implemented in version 6u10 as unsupported APIs
* Enhanced library-level support for new network protocols, including SCTP and Sockets Direct Protocol
* Upstream updates to XML and Unicode
* Java deployment rule sets



## Java 8

Work on features was organized in terms of JDK Enhancement Proposals (JEPs).

* JSR 335, JEP 126: Language-level support for lambda expressions (officially, lambda expressions; unofficially, closures) under Project Lambda and default methods (virtual extension methods) which allow the addition of methods to interfaces without breaking existing implementations. There was an ongoing debate in the Java community on whether to add support for lambda expressions. Sun later declared that lambda expressions would be included in Java and asked for community input to refine the feature. Supporting lambda expressions also enables functional-style operations on streams of elements, such as MapReduce-inspired transformations on collections. Default methods allow an author of an API to add new methods to an interface without breaking the old code using it. Although it was not their primary intent, default methods also allow multiple inheritance of behavior (but not state).
* JSR 223, JEP 174: Project Nashorn, a JavaScript runtime which allows developers to embed JavaScript code within applications
* JSR 308, JEP 104: Annotation on Java types
* Unsigned integer arithmetic
* JSR 337, JEP 120: Repeating annotations
* JSR 310, JEP 150: Date and time API
* JEP 178: Statically-linked JNI libraries
* JEP 153: Launch JavaFX applications (direct launching of JavaFX application JARs)
* JEP 122: Remove the permanent generation

引入 Lambda 表达式(函数式编程) 与 Functional 接口，

接口定义增强

```java
public interface FilterProcess<T> {
  // JDK 7 仅支持 全局常量 和 抽象方法
  public static final String a = "22";
  boolean process(T t);

  // JDK 8 支持 静态方法 和 默认方法
  static void haha () { /* ... */ }
  default void hehe () { /* ... */ }

  // JDK 9 支持 私有方法
  private void java9() { /* ... */ }
}
```


### 接口定义加强

在 Java 中，接口是解决多继承的主要手段，并且接口由抽象方法和全局常量组成。而这样的设计从 JDK1.8 后开始发生改变，接口中允许定义普通方法和静态方法。

加强接口定义源于实际开发中的一个困境：某一个接口使用非常广泛，可是突然有一天发现，这个接口设计的功能不足，需要扩充一些新的操作方法，并且这些操作方法对于所有的子类实现都是完全相同的。很明显，如果按照原有的开发习惯，那么该方法需要在所有实现接口的子类中重复覆写，这样的设计就显得非常糟糕。对接口的定义限制放宽后，此问题就能得到解决。但实际开发中，开发初期还是应该按照传统的方式编写，确有需要时再考虑使用新特性。

### Lambda 表达式

https://segmentfault.com/a/1190000009186509

Lambda 表达式是 JDK1.8 引入的重要特性。所谓 Lambda 表达式指的是应用在单一抽象方法接口环境下的一种简化定义形式，可以用于解决匿名内部类定义复杂的问题。

```java
interface IMessage {
    public void print();
}
public class Test {
    public static void main(String[] args) {
        foo(() -> System.out.println("lambda"));
    }
    public static void foo(IMessage msg) { msg.print(); }
}
```

#### 引入背景

Java 是面向对象语言，除了原始数据类型之处，Java 中的所有内容都是一个对象。而在函数式语言中，通过定义一个函数并作为参数传递给其它函数就可实现特定的功能。

Lambda 表达式的加入，使得 Java 拥有了函数式编程的能力。在其它语言中，Lambda 表达式的类型是一个函数；但在 Java 中，Lambda 表达式被表示为对象，因此它们必须绑定到被称为功能接口的特定对象类型。

#### 功能接口

在 Java 中，功能接口(Functional interface)指只有一个抽象方法的接口。

* 功能接口只有一个抽象方法，但可以有若干个普通方法和静态方法
* 功能接口上可以使用 `@FunctionalInterface` 来显式注明，没有也一样用，但始终添加 Annotation 是推荐的做法

#### 和匿名类之间的区别

对于匿名类中 `this` 解析为匿名类，而 Lambda 表达式中 `this` 解析为包含写入 Lambda 的类。

### 方法引用

在 Java 中利用对象的引用传递可以实现不同的对象名称操作同一块堆内存空间。而从 JDK1.8 开始，在方法上也支持了引用操作，这样就相当于为方法定义了别名。对于方法引用，Java 一共定义了4种操作形式：
  * 引用静态方法：`类名::静态方法名`
  * 引用某个对象的方法：`实例化对象::普通方法名`
  * 引用特定类型的方法：`特定类::普通方法`
  * 引用构造方法：`类名::new`

### 内建函数式接口

JDK1.8 提供了一个新的开发包 java.util.function，这个包中提供了以下4个核心的函数式接口：
  * 功能型接口 Function，此接口需要接收一个参数，并且返回一个处理结果
  * 消费型接口 Consumer，此接口只负责接收数据，并且不返回处理结果
  * 供给型接口 Supplier，此接口不接收参数，但是可以返回结果
  * 断言型接口 Predicate，进行判断操作

```java
public interface Function<T, R> { public R apply(T t); }
public interface Consumer<T> { public void apply(T t); }
public interface Supplier<T> { public T get(); }
public interface Predicate<T> { public boolean test(T t); }
```

```java
import java.util.function.*;
public class Test {
    public static void main(String[] args) {
        Function<String, Boolean> foo = (str) -> str.length() > 0;
        boolean b = foo.apply("foo");
        System.out.println("b = " + b);
    }
}
```



## Java 9

* JSR 376: Modularization of the JDK under Project Jigsaw (Java Platform Module System)
* JEP 222: JShell: The Java Shell (a Java REPL)
* JEP 295: Ahead-of-time compilation
* JEP 268: XML catalogs
* JEP 266: More concurrency updates. It includes a Java implementation of Reactive Streams, including a new Flow class that included the interfaces previously provided by Reactive Streams
* JEP 193: Variable handles: define a standard means to invoke the equivalents of various java.util.concurrent.atomic and sun.misc.Unsafe operations
* JEP 282: jlink: The Java Linker: create a tool that can assemble and optimize a set of modules and their dependencies into a custom run-time image. It effectively allows to produce a fully usable executable including the JVM to run it
* JavaDB was removed from JDK
* JEP 263: HiDPI graphics: automatic scaling and sizing
* JEP 254: Compact Strings
* JEP 213: Milling Project Coin
  * Allow @SafeVargs on private instance methods
  * Allow effectively-final variables to be used as resources in the try-with-resources statement
  * Allow diamond with anonymous classes if the argument type of the inferred type is denotable
  * Complete the removal, begun in Java SE 8, of underscore from the set of legal identifier names
  * Support for private methods in interfaces


集合 List、Set、Map 都添加了 `of` `copyOf` 方法。`copyOf` 方法会先判断来源集合是不是 `AbstractImmutableList` 类型的，如果是，就直接返回，否则调用 `of` 创建一个新的集合。

```java
var list = List.of("Java", "Python", "C");
var copy = List.copyOf(list);
System.out.println(list == copy);  // true

var list = new ArrayList<String>();
var copy = List.copyOf(list);
System.out.println(list == copy);  // false
```

Stream 增加了4个新方法

Optional 增强

InputStream 增强



JDK 目录结构变化

```txt
JDK8:  bin/  db/  include/  jre/  lib/
JDK9:  bin/  xx   include/  xx    lib/  conf/  jmods/  legal/
```

JShell 工具，对初学者可能比较有用

模块化

多版本兼容 JAR 包


钻石操作符升级

```java
Map<String, String> map = new HashMap<String, String>();

// JDK 7 后面的数据类型可省略
Map<String, String> map = new HashMap<>();

// JDK 9 添加了匿名内部类的功能
Map<String, String> map = new HashMap<>() {
  // todo...
}
```

异常处理

```java
@Test
public void test() {
  InputStreamReader reader = null;
  try {
    reader = new InputStreamReader(System.in);
    reader.read();
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    if (reader != null) {
      try {
        reader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}

// JDK 7
@Test
public void test() {
  try (InputStreamReader reader = new InputStreamReader(System.in)) {
    reader.read();
  } catch (IOException e) {
    e.printStackTrace();
  }
}

// JDK 9
@Test
public void test() {
  InputStreamReader reader = new InputStreamReader(System.in);
  try (reader) {
    reader.read();
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```


特殊标示符增加限制

```java
String _ = "";  // JDK 9 开始非法
```


## Java 10

* JEP 286: Local-variable type inference
* JEP 317: Experimental Java-based JIT compiler. This is the integration of the Graal dynamic compiler for the Linux x64 platform
* JEP 310: Application class-data sharing. This allows application classes to be placed in the shared archive to reduce startup and footprint for Java applications
* JEP 322: Time-based release versioning
* JEP 307: Parallel full GC for G1
* JEP 304: Garbage-collector interface
* JEP 314: Additional Unicode language-tag extensions
* JEP 319: Root certificates
* JEP 312: Thread-local handshakes
* JEP 316: Heap allocation on alternative memory devices
* JEP 313: Remove the native-header generation tool – javah
* JEP 296: Consolidate the JDK forest into a single repository

本地变量类型推断

```java
var str = "Hello";  // 类型推断
String str = "Hello";
```



## Java 11

* JEP 309: Dynamic class-file constants
* JEP 318: Epsilon: a no-op garbage collector
* JEP 323: Local-variable syntax for lambda parameters
* JEP 331: Low-overhead heap profiling
* JEP 321: HTTP client (standard)
* JEP 332: Transport Layer Security (TLS) 1.3
* JEP 328: Flight recorder
* JEP 333: ZGC: a scalable low-latency garbage collector (Experimental)
* JavaFX, Java EE and CORBA modules have been removed from JDK
* JEP 335: Deprecated the Nashorn JavaScript engine
* Unicode 10.0.0 support (while current version is Unicode 11.0.0, it's only in Java 12)

内嵌 HttpClient API，以前需要通过 Maven 添加依赖引入

增加了一系列的字符串处理方法

```java
" ".isBlank();  // true

"  abc ".strip();          // 去除首尾空格
"  abc ".stripTrailing();  // 去除尾部空格
"  abc ".stripLeading();   // 去除首部空格

"abc".repeat(3);  // "abcabcabc"
"a\nb\nc".lines().count();  // 3
```



## Java 13


