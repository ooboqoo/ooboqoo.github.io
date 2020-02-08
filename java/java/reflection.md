# 反射、注解、泛型





## 反射

https://blog.csdn.net/CSDN2497242041/article/details/101886097

反射是 Java Web 框架设计的灵魂。作为 Java Web 框架中必不可少的反射机制，比如 Spring 的 IOC 控制反转（通过第三方配置文件实现对象的控制）就会经常用到。反射是 Java 中一种强大技术，能够使我们很方便的创建灵活的代码，通过获取配置文件的class 名，这些代码可以在运行时装配，无需在组件之间进行源代码链接，降低了代码的耦合度。但是要注意反射使用不当的话会成本很高。


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




## 注解

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






## 泛型

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






## 枚举

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

