# Java 反射机制

https://blog.csdn.net/CSDN2497242041/article/details/101886097

反射是 Java Web 框架设计的灵魂。作为 Java Web 框架中必不可少的反射机制，比如 Spring 的 IOC 控制反转（通过第三方配置文件实现对象的控制）就会经常用到。反射是 Java 中一种强大技术，能够使我们很方便的创建灵活的代码，通过获取配置文件的class 名，这些代码可以在运行时装配，无需在组件之间进行源代码链接，降低了代码的耦合度。但是要注意反射使用不当的话会成本很高。



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


