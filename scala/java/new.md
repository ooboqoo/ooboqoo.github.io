# Java 新特性

Java 的发展从 1995 年开始经历了许多过程，但是其中有如下4个最具代表性的 JDK 版本。
  * 1995年的 JDK1.0，标志着 Java 正式登场
  * 1998年的 JDK1.2，加入 javax.swing 组件
  * 2005年的 JDK1.5，引入自动装箱与拆箱、可变参数、泛型、枚举、Annotation 等核心特性，并且这些特性一直被广泛使用
  * 2014年的 JDK1.8，引入 Lambda 表达式(函数式编程)，同时针对接口定义也有所增强

### 可变参数

开发中可能会出现这样一种情况：不确定要传递的参数个数。最早的时候，为了解决这个问题，往往需要将多个参数封装为数组。从JDK1.5开始，为了解决这个问题，专门在方法定义上提供了可变参数的概念，语法形式如下：

```java
返回值类型 方法名称(参数类型 ... 变量) { /* 方法体 */ }
```

方法在使用可变参数定义后，调用处可以任意传递多个参数，或者直接传递一个数组。而方法本身对于多个参数的处理都统一使用数组进行接收。

### foreach 循环

从 JDK1.5开始，对于数组循环提供了一种简化的写法：

```java
for (数据类型 变量 : 数组或集合) { /* 循环体 */ }
```

### 静态导入

如果一个类中的方法全部都是 static 类型，那么其他类要引用此类时必须先使用 import 导入所需要的包，再使用 `类名.方法()` 进行调用。而使用静态导入，则不再需要写类名即可直接使用静态方法：

```java
import static 包.类.*;
```

### 泛型

利用对象的多态性可以解决方法参数的统一问题，但是随之而来的是一个新问题：向下转型会存在类转换异常，且编译期无法发现。

Java1.5 引入了泛型机制，泛型本质是**参数化类型**，也就是说变量的类型是一个参数，在使用时再指定为具体类型。

泛型只要指定一次类型，无需向上向下转型，编写代码更方便；同时，指定类型后如有错误，编译期就可发现，更加安全。

```java
calss 类名<泛型标记1, 泛型标记2> {
  // 类内部使用泛型标记来表示类型
}
```

注1：因为历史原因，实例化对象时，允许不指定泛型类型，系统会采用 Object 类型，此时编译器不会报错但会给出警告。  
注2：泛型的类型，只能够是引用类型，不能是基本类型。  
注3：从JDK1.7开始，对泛型操作进行了一些简化，只要在类对象声明时指定了泛型类型，那么实例化对象时不用再重复指定：`Message<Integer> m = new Message();`

#### 类型擦除

Java 的泛型使用了类型擦除机制，以至于 Java 的泛型功能受到限制，只能说是 "伪泛型"。什么叫类型擦除呢？简单的说就是，类型参数只存在于编译期，在运行时，Java 的虚拟机(JVM)并不知道泛型的存在。

类型擦除导致泛型丧失了一些功能，任何在运行期需要知道确切类型的代码都无法工作。

大多数情况下泛型的使用比较简单，但是如果自己编写支持泛型的代码需要对泛型有深入的了解。

#### 通配符

引入泛型技术解决了向下转型所带来的安全隐患，但同时又会产生一个新问题：即便是同一个类，由于设置泛型类型不同，其对象表示的含义也不同，因此不能够直接进行引用传递操作。而在方法定义时，参数类型又不对泛型进行区分，因此需要通配符 `?` 来解决参数传递上造成的新问题。

```java
// 报错，泛型类型不兼容
Message<Double> m = new Message<String>();

// 以下这样重载方法不被允许，报错，因为方法重载只要求参数类型不同，而对泛型不做区分
void foo(Message<String> p) { }
void foo(Message<Integer> p) { }

// 使用通配符 `?` 解决参数传递问题
void foo(Message<?> p) { }
```

##### 无边界通配符

##### 上边界通配符

##### 下边界通配符

#### 泛型接口

泛型不仅可以定义在类中，也可以定义在接口上。定义在接口上的泛型被称为泛型接口。

#### 泛型方法

泛型除了可以应用在类上，也可以应用在方法上。在方法上定义泛型时，这个方法不一定非要在泛型类中定义。

```java
public static <K, V> void foo(K k, V v) {
    System.out.println(k.getClass().getSimpleName());
    System.out.println(v.getClass().getSimpleName());
}
public static void main(String[] args) {
    foo(5, "generic");
}
```

### 枚举

枚举是 JDK1.5 增加的一个主要特性，利用枚举可以**简化多例设计模式的定义**。

`enum` 关键字与 `class` 和 `interface` 地位相同，其一样有成员变量、方法、可以实现一个或多个接口，也可以有构造器。

```java
enum Color {         // 定义枚举类
  RED, GREEN, BLUE   // 表示此处为实例化对象
}
public class Test {
    public static void main(String[] args) {
        Color c = Color.GREEN;                // 直接取得枚举对象
        System.out.println(c.toString());
        switch(c) {
            case RED: System.out.println("红"); break;
            case GREEN: System.out.println("蓝"); break;
            case BLUE: System.out.println("绿");
        }
    }
}
```

#### 定义其他结构

```java
enum Color {
    RED("红"), GREEN("绿"), BLUE("蓝");  // 定义枚举对象，必须写在首行
    private String title;                        // 自定义属性
    Color(String title) { this.title = title; }  // 构造方法不能是 public，默认 private
    public String toString() { return this.title; } }
public class Test {
    public static void main(String[] args) {
        Color c = Color.GREEN;
        System.out.println(c.toString());
    }
}
```


### Annotation

JDK1.5 引入了注解技术，Annotation 是 Java 中较为复杂的技术，当然，不是使用复杂，而是定义开发非常复杂。要想使用注解，需要容器的支持才能正常工作。

Java SE 里为了方便用户编写代码，提供了3种最为基础的定义： `@Override` `@Deprecated` `@SuppressWarnings`。

#### 注解产生背景

假设有一套程序，由于某些操作需要连接3个不同的服务器，那么此时对于程序的实现就可能有以下3种方式：
  * 方式一：将所有与配置相关的内容直接写到代码中
      - 优点：代码编写方便
      - 缺点：如果服务器地址变更或配置信息增多，则代码维护困难
  * 方式二：将配置项单独抽取为配置文件
      - 优点：代码维护方便，配置信息变更时不需要改代码
      - 缺点：将一些对用户无用的配置信息暴露给用户，用户维护麻烦而且容易改错配置导致程序错误
  * 方式三：将配置信息写在程序里，但利用一些明显的标记来区分配置信息与程序
      - 优点：不再需要单独定义配置文件，可以减少代码数量
      - 缺点：需要容器支持，开发难度较高

以上列出的3种使用方式实际上也是软件开发的演变过程。现代开发中方式二和三使用最为广泛。

#### 准确覆写 `@Override`

当进行方法覆写时，可以添加 `@Override` 注解，如果无法在父类中找到可覆写方法，编译时就会报错。这样可避免代码键入错误。

#### 声明过期操作 `@Deprecated`

在项目初期，可能有一个 foo() 方法非常完善并在大量的项目代码中使用，但后来随着开发技术的发展，foo() 逐步展现出不足和问题，此时有两种解决方案：
  * 方案一：直接取消 foo() 方法，并给出新的 bar() 方法
  * 方案二：在新版开发包中保留 foo() 方法，同时通过某种途径告诉开发者此方法有问题，并提供了更好的 bar() 方法

很明显，方案二会更加合适，此时就可以使用 `@Deprecated` 注解来声明过期的不建议使用的方法。

```java
@Deprecated
public void oldPrint() {
    System.out.println("此方法将会在下一版本中删除");
}
```

#### 压制警告 `@SuppressWarnings`

如果使用了不安全的操作，程序在编译中一定会出现安全警告，而很多情况下，开发者已经明确地知道这些警告信息却执意使用，此时重复的警告就显得太烦了，此时可以使用 `@SuppressWarnings` 来压制警告。

```java
@SuppressWarnings({"deprecation"})
public static void foo() {
  oldPrint();
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
