# 面向对象

Java 作为一种面向对象语言。支持以下基本概念：多态、继承、封装、抽象、类、对象、实例、方法、重载，本节重点讲对象和类。

一个 Java 程序可以认为是一系列对象的集合，这些对象通过调用彼此的方法来协同工作。

在 Java 中，方法是不可以单独存在的，必须将其放在一个类中才可以。


## 面向对象概念

### 简介

面向对象的程序设计有封装性、继承性、多态性 3个主要特性。
  * 封装性  
    它包含两层含义：
      - 将对象的属性和行为看成一个密不可分的整体
      - 把不需要让外界知道的信息隐藏起来
  * 继承性  
    继承机制大大增强了代码的可复用性，提高了软件的开发效率，降低了错误产生的可能性，也为修改程序提供了便利。  
    被继承的类称为父类或超类，而经继承产生的类称为子类或派生类
  * 多态性  
    Java 中含有方法重载与对象多态两种形式的多态。
    - 方法重载，一个类中允许存在多个重名方法，但方法的参数不同，实现的功能也不同
    - 对象多态，子类对象可以与父类对象进行相互转换，而且根据其使用的子类不同完成的功能也不同

### 类与对象

面向对象是整个 Java 的核心，而类与对象又是支撑整个 Java 面向对象开发的基本概念单元。

#### 基本概念

类可以简单理解为生产对象的图纸。类定义了一个基本的模板，代表着一个共性的特征集合。

#### 类与对象

##### 类定义

类是 Java 中的基本组成元素，所有的 Java 程序一定要被类管理。

类的定义有两种形式：
  * `public class` 定义：类名称必须和文件名称保持一致，否则程序无法编译。一个 .java 文件只能有一个 public calss
  * `class` 定义：类名称可以和文件名不一致，但是生成的 class 文件的名称同类名。一个 .java 文件可以存在多个 calss 定义，编译后会生成多个 class 文件。

类中的属性在 Java 中称为 成员(Field)，而方法在 Java 中使用 Method 来描述。

```java
class 类名称 {
  数据类型 属性(变量);
  public 返回值的数据类型 方法名称(参数1, 参数2) {
    程序语句;
    return 表达式;
  }
}
```

实际开发中，一般都是一个 java 文件基本上只包含一个 public class，不会有其他 class 单独定义。

```java
public class Dog {
  String breed;
  int age;
  String color;
  void barking() { }
  void hungry() { }
  void sleeping() { }
}
```

##### 创建对象

```java
类名称 对象名称 = new 类名称();
```

使用关键字 `new` 来创建一个新的对象。创建对象需要以下三步：
  * 声明：声明一个对象，包括对象名称和对象类型。
  * 实例化：使用关键字 new 来创建一个对象。
  * 初始化：使用 new 创建对象时，会调用构造方法初始化对象。

关键字 `new` 的主要功能就是开辟内存空间(新的堆内存空间)。

每个对象在刚刚实例化后，里面所有属性的内容都是其对应数据类型的默认值，只是设置了属性内容之后，属性才可以保存内容。

对象使用前都必须实例化，如果只是声明了对象但并没有实例化，就会出现空指向异常 NullPointerException。

> **堆内存与栈内存**  
> * 堆内存 heap - 保存每一个对象的属性内容，堆内存用关键字 new 开辟  
> * 栈内存 stack - 保存的是一块堆内存的地址数值，可以把它想象成一个 int 型变量
> 
> 注：根据存储数据的不同，Java 内存通常被划分为5个区域：程序计数器 Program Count Register、本地方法栈 Native Stack、方法区 Methon Area、栈 Stack、堆 Heap。

##### 引用传递

引用传递是整个 Java 的精髓所在，其的核心概念只有一点：一块堆内存空间(保留对象的属性信息)可以同时被多个栈内存共同指向。

> **Java 的垃圾回收机制**

### 封装最佳实践

所有在类中定义的属性都要求使用 `private` 声明，如果属性要被外部所使用，那么按照要求定义相应的 setter getter 方法。

### 构造方法

每个类都有构造方法。如果没有显式地为类定义构造方法，Java 编译器将会为该类提供一个默认构造方法。

在创建一个对象的时候，至少要调用一个构造方法。构造方法的名称必须与类同名，一个类可以有多个构造方法。

```java
public class Puppy {
    public Puppy() { }
    public Puppy(String name) { /* 这个构造器仅有一个参数：name */ }
}
```

构造方法的定义原则：
  * 方法名称与类名称相同
  * 没有返回值类型声明
  * 构造方法可以重载
  * 构造方法可以省略，如果省略，编译期会自动添加一个空的构造方法

构造方法与普通方法的差异：
  * 返回值声明：构造方法没有返回值，且没有 void 声明
  * 调用时间：构造方法只会在对象实例化时由系统调用，而普通方法是在对象实例化后通过 "对象.方法" 的形式手动调用
  * 调用次数：构造方法只会在创建对象时执行一次，而普通方法可以调用多次

类定义最佳实践：先编写属性，再写构造方法，最后是普通方法。

方法重载的编写顺序：所有重载的方法按照参数的个数由多到少，或由少到多排列。

对象实例化过程 `Person p = new Person();`：
  1. JVM 会去读取指定路径下的 Person.class 文件，并加载进内存，如有父类会先加载父类
  2. 通过 new 关键字开辟一块堆内存，(根据对象属性的数据类型)分配地址
  3. 调用构造方法对属性进行初始化，如有父类，构造函数中第一行会先调用父类中的构造函数。
  4. 初始化完毕后，将堆内存中的地址值赋给引用变量。

### 匿名对象

如果没有栈内存指向堆内存空间，就是一个匿名对象。

由于匿名对象没有对应的栈内存指向，所有只能使用一次，一次之后就将成为垃圾，等待被 GC 回收释放。

```java
public static void main(String[] args) {
  new Book("Java 开发", 69.8).getInfo();  // 创建对象并立即调用方法，用完立即变垃圾
}
```

### 简单 Java 类

简单 Java 类 是一种在实际开发中使用最多的类定义形式，其有如下基本开发要求：
  * 类名称必须存在意义
  * 类中所有的属性必须 `private` 封装，封装后的属性必须提供 setter getter
  * 类中可以提供任意多个构造方法，但是必须保留一个无参构造方法
  * 类中不允许出现任何输出语句，所有信息输出必须交给被调用处输出
  * 类中需要提供一个取得对象完整信息的方法，暂定为 getInfo()，而且返回 String 型数据。


## 数组

### 基本概念

数组的定义语法：

```java
// 声明并开辟数组的2种方式
数据类型 数组名称[] = new 数据类型 [长度];
数据类型[] 数组名称 = new 数据类型 [长度];

// 声明和开辟数组分步完成
数据类型 数组名称[] = null;
数组名称 = new 数据类型 [长度];

// 数组的静态初始化
数据类型 数组名称[] = {值, 值, 值, ...};
数据类型 数组名称[] = new 数据类型[] {值, 值, 值, ...};
```

当数组开辟空间后，可以采用 `数组名称[下标|索引]` 的形式进行访问。
所有数组的下标都是从 `0` 开始的，如果访问的时候下标越界，就会报数组越界异常 java.lang.ArrayIndexOutOfBoundsException。

```java
int data[] = new int[3];
data[0] = 1;
System.out.println(data[0]);  // 1
System.out.println(data[2]);  // 0
System.out.println(data[4]);  // java.lang.ArrayIndexOutOfBoundsException
```

数组属于引用类型，所以数组的操作过程一定会牵扯到内存的分配问题。数组与对象保存唯一的区别在于：对象中的堆内存保存的是属性，而数组中的堆内存保存的是一组信息。

数组有一个最大的缺点——长度不能被改变，正因如此，实际开发中不会直接使用数组，仅会使用数组的概念(通过类集框架来解决)。

### 二维数组

```java
数据类型[][] 数组名称 = new 数据类型[行数][列数];
数据类型[][] 数组名称 = new 数据类型[][] { {值, ...}, {值,值,值}, {} };
```

```java
int[][] data = new int[][] { {1,2,3}, {9,8,7,6} };
System.out.println(data[1][3]);
```

多维数组可以看成是数组的数组。实际开发中很少使用多维数组。

### 数组操作方法

```java
// 数组复制
System.arraycopy(源数组名称，源数组复制开始索引，目标数组名称，目标数组复制开始索引，长度);
// 数组排序
java.util.Arrays.sort(数组名称);
// 遍历
double[] myList = {1.9, 2.9, 3.4, 3.5};
for (double element : myList) {
   System.out.println(element);
}
```

#### Arrays 类

`java.util.Arrays` 类能方便地操作数组，它提供的所有方法都是静态的。具有以下功能：
  * 给数组赋值：通过 `fill` 方法。
  * 对数组排序：通过 `sort` 方法,按升序。
  * 比较数组：通过 `equals` 方法比较数组中元素值是否相等。
  * 查找数组元素：通过 `binarySearch` 方法能对排序好的数组进行二分查找法操作。

### 对象数组

```java
类名称[] 对象数组名称 = new 类名称[长度];
类名称[] 对象数组名称 = new 类名称[] {实例化对象, 实例化对象, ...};
```

```java
public class Test {
    public static void main(String[] args) {
        Book[] books = new Book[3];
        Book[] books2 = new Book[] {new Book(), new Book() };
        books2[0].name = "新书名";
        System.out.println(books[1]);        // null
        System.out.println(books2[0].name);  // 新书名
        System.out.println(books2[1].name);  // 默认书名
    }
}

class Book {
    String name = "默认书名";
}
```


## String 类

String 类应用非常广泛，且比较特殊 —— String 本身属于引用数据类型，但它可以像基本数据类型那样直接赋值。

### 实例化

String 类有两种实例化方式，具体差异后续说明。

```java
String str = "";              // 直接赋值
String str = new String("");  // 通过构造函数新建

// 特殊的 String 构造函数
public String(String str) { /* */ }  // 在构造函数里依然要接收一个 String 类对象
```

String 类的两种对象实例化方式的区别(结合下面字符串比较部分学习)：
  * 直接赋值，只会开辟一块堆内存空间，并且会自动保存到对象池中供下次重复使用。
  * 构造方法，会开辟两块堆内存空间，其中有一块空间将成为垃圾，并且不会自动入池，但是用户可以使用 `intern()` 手工入池。

```java
// 手动入池演示
String stra = new String("hello").intern();
String strb = "hello";
System.out.println(stra == strb);  // true
```

### 字符串比较

```java
String a = "123";
String b = "123";
String m = new String(a);
String n = new String("123");
System.out.println(a == b);  // true，字符串常量[分析1] + 常量池概念[分析2]
System.out.println(a == m);  // false
System.out.println(a == n);  // false
System.out.println(a.equals(n));  // true
```

`==` 是 Java 提供的关系运算符，主要的功能是进行数值相等判断，如果用在对象上，则只会对内存地址的数值进行比较。

String 对象的 `equals()` 方法专门负责进行字符串内容的比较，实际开发中字符串的比较都通过 `equals()` 方法完成。

分析1：Java 中的字符串常量实际上是作为 String 类的匿名对象的形式存在的。

分析2：在 JVM 的底层实际上会存在一个对象池(不一定只保存 String 对象)，当代码中使用了直接赋值的方式定义一个 String 对象时，会将此字符串对象所使用的匿名对象入池保存。如果后续还有其他 String 类对象也采用了直接赋值的方式，并且设置了同样的内容时，将不会开辟新的堆内存空间，而是使用已有的对象进行引用的分配。这种设计模式为共享设计模式。

### 字符串一旦定义则不可改变

修改字符串，如 `str += "hello"`，实际上会新建一个字符串，并将新字符串的地址赋给变量，也就是说，原字符串不会改变(如果没有其它引用就会变为垃圾)，改变的只是对象的引用关系。正因为此特性，如果对字符串进行频繁的修改，会产生大量的垃圾，在开发中应该严格禁止。

虽然 Java 提供了可以修改内容的字符串操作类(StringBuffer StringBuilder)，但从实际使用经验来讲，开发中如果定义字符串，90% 的情况下使用的都会是 String，而如果只是进行简单的字符串修改(可能只修改一两次)，那么对于产生的垃圾问题也就没有必要过于在意。

### String 类的常用方法

略


## `this` 关键字

在 Java 中 `this` 可以完成3件事情：调用本类属性、调用本类方法、表示当前对象。

### 调用本类属性

在一个类的定义的方法中可以直接访问类中的属性，但是很多时候有可能会出现方法参数名称与属性名称重复的情况，所以此时就需要利用 `this.属性` 的形式明确指出要调用的是类中的属性而不是方法的参数。为了减少不必要的麻烦，在类中访问属性是不管是否有重名的变量，统一加上 `this`。

### 调用本类方法

`this` 除了访问类中的属性，也可以进行类中方法的调用。除了调用普通方法，还可以利用 `this()` 的形式实现一个类中多个构造方法的互相调用。

通过 `this()` 语法，可以很好地解决构造方法中代码重复的问题，但使用中须注意两点限制：

* 使用 `this();` 时，必须是构造方法的首行。
* 构造方法互相调用时，一定要保留调用的出口，即，不允许出现循环调用的情况。

## 对象比较

对象比较的操作有如下4个特点：
* 本类接收自己的引用，再与本类当前对象(this)进行比较
* 为了避免产生 NullPointerException，应该增加一个 null 的判断
* 为了防止浪费性能的情况出现(要判断的属性会多)，可以增加地址数值的判断
* 进行属性的依次比较，如果属性全部相同，这返回 true 否则 false

```java
class Book {
  private String title;
  private double price;
  public Book(String title, double price) {
    this.title = title;
    this.price = price;
  }
  public boolean compare(Book book) {
    if (book == null) { return false; }
    if (book == this) { return true; }
    if (this.title.equals(book.title) && this.price == book.price) { return true; }
    else { return false; }
  }
}
```


## `static` 关键字

### 定义属性

一个类的主要组成就是属性和方法，而每一个对象都分别拥有各自的属性内容，如果类中的某个属性希望定义为公共属性，则可以在声明属性前加上 `static` 关键字。

> **常用内存区域**  
> 在 Java 中主要存在4块内存空间，这些内存空间的名称及作用如下
>   * 栈内存空间，保存所有的对象名称(更准确的说是保存引用的堆内存空间的地址)
>   * 堆内存空间，保存每个对象的具体属性内容
>   * 全局数据区，保存 static 类型的属性
>   * 全局代码区，保存所有的方法定义

通过 `static` 属性定义的属性将成为公共属性，也就是说，任何一个对象修改了此属性的内容都将影响其他对象。

非 `static` 属性必须产生实例化对象才可以访问，但 `static` 属性不受实例化对象的控制，可以通过类名直接调用。

### 定义方法

使用 `static` 定义的方法也可以在没有实例化对象产生的情况下通过类名进行调用。

`static` 方法不能直接访问非 `static` 属性或方法，只能调用 `static` 属性或方法。

### 主方法

Java 中主方法的组成单元介绍：
  * `public` 主方法是程序的开始，所以这个方法对任何操作都一定是可见的，所以必须使用 public
  * `static` 证明此方法由类名称调用
  * `void` 主方法是一切执行的开始点，一直存在直到执行完毕
  * `main` 系统规定的方法名称，不能修改
  * `String args[]` 指的程序运行时传递的参数，格式为 `java 类名 参数1 参数2 参数3`

## 代码块

在程序编写中可以直接使用 `{}` 定义一段语句，根据此部分定义的位置以及声明的关键字的不同，代码块一共可以分为4种：普通代码块、构造块、静态块、同步代码块(等待多线程时)。

代码块本身有许多破坏程序结构的操作，所以在编写实际代码的过程中，并不建议使用代码块。

```java
public class Test {
    public static void main(String[] args) {
        {                                      // 普通代码块
            int num = 10;  // 局部变量
        }
        int num = 100;     // 全局变量
        new Book();
        new Book();
    }
    static {
        System.out.println("静态块会先于主方法执行");  // [分析1]
    }
}

class Book {
    public Book() {
        System.out.println("构造方法");
    }
    {                                          // 构造块
        System.out.println("类中的构造块，每次实例化对象时都会执行，且先于构造方法执行");
    }
    static {                                   // 静态块
        System.out.println("类中的静态块会先于构造块执行，且只执行一次");
    }
}
```

分析1：因为静态块会先于主方法执行，所以在 JDK1.7 之前，可以使用静态块来代替主方法，但 JDK1.7 开始要求必须定义主方法。


## 内部类

### 基本概念

所谓内部类指的就是在一个类的内部继续定义其他内部结构类的情况。

内部类就是将类的定义放到另外一个类定义的内部，也就是说，类中除了属性和方法外，也可以定义属于自己内部的结构体。这样做的最大缺点在于：破坏了类的结构性。但这样做最大好处是可以轻松地访问外部类中的私有属性。

#### 在外部直接产生内部类实例

内部类编译生成的 class 文件名的形式为 `Outer$Inner.class`，内部类实例化语法如下：

```java
外部类.内部类 对象 = new 外部类().new 内部类();
```

由于内部类需要使用外部类中的属性，而所有属性只有在对象实例化之后才会分配空间，所以在实例化内部类对象时首先要实例化外部类对象。

```java
class Outer {
  private String msg = "Hello World!";
  class Inner {
    public void print() {
      System.out.println(Outer.this.msg);  // 可以直接通过 msg 访问外部类私有属性，但这样写更规范
    }
  }
}

public TestDemo {
  public static void main(String[] args) {
    Outer.Inner in = new Outer().new Inner();
    in.print();
  }
}
```

### 使用 `static` 定义内部类

如果一个内部类使用 `static` 定义，那么它只能访问外部类中的 `static` 操作，相当于定义了一个外部类。

### 在方法中定义内部类

内部类理论上可以在类的任意位置上进行定义，包括在代码块中，或在普通方法中。而在开发过程中，在普通方法里面定义内部类的情况是最多的。

在 JDK1.7 以及之前的版本中，方法中定义的内部类如果想要访问方法的参数或方法定义的变量，在参数或变量前一定要加上 `final` 标记，但从 JDK1.8 开始取消了这一限制，主要是为 Lambda 编写方便。

```java
class Outer {
  private String msg = "Hello World!";
  public void foo(final int num) {
    final double score = 99.9;
    class Inner {
      public void print() {
        System.out.println(Outer.this.msg);
        System.out.println(num);
        System.out.println(score);
      }
    }
    new Inner().print();
  }
}
```

### 匿名内部类

匿名类因为没有名字，所以只能使用一次，它通常用来简化代码编写。

使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口。

使用匿名内部类的目的，是在某个地方想对某个类有特殊的实现。

JDK1.8 开始匿名类的用法可以用 Lambda 写法替换。

```java
class Outer {
  private String msg = "Hello World!";
  public void foo(final int num) {
    final double score = 99.9;
    // 匿名内部类写法
    new Inner() {
      public void print() {
        System.out.println(Outer.this.msg);
        System.out.println(num);
        System.out.println(score);
      }
    }.print();
    // Lambda 写法
    ((Inner) () -> {
        System.out.println(Outer.this.msg);
        System.out.println(num);
        System.out.println(score);
    }).print();
  }
};

Interface Inner {
  public void print();
}
```


## 链表

> 程序开发的三大基本功：程序逻辑 + 数据结构 + SQL语言

保存数据首选数组，但数组有一个缺点——长度固定不可改变，当保存的内容长度不确定时，就可以利用链表结构来代替数组的使用。




