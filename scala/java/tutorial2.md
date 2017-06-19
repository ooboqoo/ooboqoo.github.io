# Java 教程 - 面向对象

## 继承

### 继承的特性

* 子类拥有父类非 private 的属性，方法。
* 子类可以拥有自己的属性和方法，即子类可以对父类进行扩展。
* 子类可以用自己的方式实现父类的方法。
* Java 的继承是单继承，但是可以多重继承。
* 提高了类之间的耦合性（继承的缺点，耦合度高就会造成代码之间的联系）。

### 继承关键字

继承可以使用 `extends` 和 `implements` 这两个关键字来实现继承，而且所有的类都继承于 java.lang.Object。

#### extends

#### implements

#### super 与 this

#### final

```java
public interface A {
    public void eat();
    public void sleep();
}
 
public interface B {
    public void show();
}
 
class SuperClass {
    int i = 50;
}
 
class SubClass extends SuperClass implements A, B {
    int i = 100;
    public void showMessage() {
        System.out.printf("super.i = %d, this.i = %d\n", super.i, this.i);
    }
}
```

### 构造器

子类不能继承父类的构造器（构造方法或者构造函数），但是父类的构造器带有参数的，则必须在子类的构造器中显式地通过 `super` 关键字调用父类的构造器并配以适当的参数列表。
如果父类有无参构造器，则在子类的构造器中用 `super` 调用父类构造器不是必须的，如果没有使用 `super` 关键字，系统会自动调用父类的无参构造器。


## 重写与重载

### 重写 Override

重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。

重写的好处在于子类可以根据需要，定义特定于自己的行为。
重写方法不能抛出新的检查异常或者比被重写方法申明更加宽泛的异常。

**方法的重写规则**

* 参数列表必须完全与被重写方法的相同；
* 返回类型必须完全与被重写方法的返回类型相同；
* 访问权限不能比父类中被重写的方法的访问权限更低。
* 父类的成员方法只能被它的子类重写。
* 声明为 final 的方法不能被重写。
* 声明为 static 的方法不能被重写，但是能够被再次声明。
* 子类和父类在同一个包中，那么子类可以重写父类所有方法，除了声明为 private 和 final 的方法。
* 子类和父类不在同一个包中，那么子类只能够重写父类的声明为 public 和 protected 的非 final 方法。
* 重写的方法不能抛出新的强制性异常，或者比被重写方法声明的更广泛的强制性异常，反之则可以。
* 构造方法不能被重写。
* 如果不能继承一个方法，则不能重写这个方法。

### 重载 Overload

重载 overloading 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同。
每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。
最常用的地方就是构造器的重载。

**重载规则**

* 被重载的方法必须改变参数列表(参数个数或类型或顺序不一样)；
* 被重载的方法可以改变返回类型；
* 被重载的方法可以改变访问修饰符；
* 被重载的方法可以声明新的或更广的检查异常；
* 方法能够在同一个类中或者在一个子类中被重载。
* 无法以返回值类型作为重载函数的区分标准。

### 重写与重载的区别

| 区别点   | 重载方法 | 重写方法
|----------|----------|-----------------------------------------------
| 参数列表 | 必须修改 | 一定不能修改
| 返回类型 | 可以修改 | 一定不能修改
| 异常     | 可以修改 | 可以减少或删除，一定不能抛出新的或者更广的异常
| 访问     | 可以修改 | 一定不能做更严格的限制（可以降低限制）


## 多态

当使用多态方式调用方法时，首先检查父类中是否有该方法，如果没有，则编译错误；如果有，再去调用子类的同名方法。

多态的好处：可以使程序有良好的扩展，并可以对所有类的对象进行通用处理。

```java
abstract class Animal {
    abstract void eat();
}

class Cat extends Animal {
    public void eat() {
        System.out.println("吃鱼");
    }
}

class Dog extends Animal {
    public void eat() {
        System.out.println("吃骨头");
    }
}
```

多态的实现方式
  * 重写：
  * 接口
  * 抽象类和抽象方法

对于多态，可以总结以下几点：
一、使用父类类型的引用指向子类的对象；
二、该引用只能调用父类中定义的方法和变量；
三、如果子类中重写了父类中的一个方法，那么在调用这个方法的时候，将会调用子类中的这个方法；（动态连接、动态调用）;
四、变量不能被重写（覆盖），"重写"的概念只针对方法。

```java
public class Test {
    public static void main(String[] args) {
        Animal a = new Cat();
        Cat b = new Cat();
        a.eat();                     // 吃鱼
        b.eat();                     // 吃鱼
        System.out.println(a.name);  // animal
        System.out.println(b.name);  // cat
    }
}

abstract class Animal {
    public String name = "animal";
    abstract void eat();
}

class Cat extends Animal {
    public String name = "cat";
    public void eat() {
        System.out.println("吃鱼");
    }
}
```


## 抽象类

在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，并不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。

抽象类除了不能实例化对象之外，类的其它功能依然存在，成员变量、成员方法和构造方法的访问方式和普通类一样。

由于抽象类不能实例化对象，所以抽象类必须被继承，才能被使用。也是因为这个原因，通常在设计阶段决定要不要设计抽象类。

父类包含了子类集合的常见的方法，但是由于父类本身是抽象的，所以不能使用这些方法。

在 Java 中抽象类表示的是一种继承关系，一个类只能继承一个抽象类，而一个类却可以实现多个接口。

**抽象类总结规定**

1. 抽象类不能被实例化(初学者很容易犯的错)，如果被实例化，就会报错，编译无法通过。只有抽象类的非抽象子类可以创建对象。
2. 抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。
3. 抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。
4. 构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法。
5. 抽象类的子类必须给出抽象类中的抽象方法的具体实现，除非该子类也是抽象类。


## 封装

### 封装的优点

1. 良好的封装能够减少耦合。
2. 类内部的结构可以自由修改。
3. 可以对成员变量进行更精确的控制。
4. 隐藏信息，实现细节。

### 实现Java封装的步骤

1. 修改属性的可见性来限制对属性的访问（一般限制为 private）
2. 对每个值属性提供对外的公共方法访问，用于对私有属性的访问，通常这些方法被称为 getter 和 setter 方法。


## 接口

接口 Interface，在 JAVA 中是一个抽象类型，是抽象方法的集合。一个类通过继承接口的方式，从而来继承接口的抽象方法。

接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。类描述对象的属性和方法。接口则包含类要实现的方法。
除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。

### 接口与类的区别：

* 接口不能用于实例化对象。
* 接口没有构造方法。
* 接口中所有的方法必须是抽象方法。
* 接口不能包含成员变量，除了 static 和 final 变量。
* 接口不是被类继承了，而是要被类实现。
* 接口支持多重继承。

### 接口的实现

当类实现接口的时候，类要实现接口中所有的方法。否则，类必须声明为抽象的类。
类使用 `implements` 关键字实现接口。在类声明中，`implements` 关键字放在 `class` 声明后面。

### 接口的继承

一个接口能继承另一个接口，和类之间的继承方式比较相似。接口的继承使用 extends 关键字，子接口继承父接口的方法。

```java
// 文件名: Sports.java
public interface Sports {
  public void setHomeTeam(String name);
  public void setVisitingTeam(String name);
}
 
// 文件名: Football.java
public interface Football extends Sports {
  public void homeTeamScored(int points);
  public void visitingTeamScored(int points);
  public void endOfQuarter(int quarter);
}
```


## 包 package 

为了更好地组织类，Java 提供了包机制，用于区别类名的命名空间。

**包的作用**

1. 把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用。
2. 如同文件夹一样，包也采用了树形目录的存储方式。同一个包中的类名字是不同的，不同的包中的类的名字是可以相同的，当同时调用两个不同包中相同类名的类时，应该加上包名加以区别。因此，包可以避免名字冲突。
3. 包也限定了访问权限，拥有包访问权限的类才能访问某个包中的类。

### 创建包

创建包的时候，你需要为这个包取一个合适的名字。之后，如果其他的一个源文件包含了这个包提供的类、接口、枚举或者注释类型的时候，都必须将这个包的声明放在这个源文件的开头。

包声明应该在源文件的第一行，每个源文件只能有一个包声明，这个文件中的每个类型都应用于它。如果一个源文件中没有使用包声明，那么其中的类，函数，枚举，注释等将被放在一个无名的包 unnamed package 中。

通常使用小写的字母来命名避免与类、接口名字的冲突。

### `import` 关键字

为了能够使用某一个包的成员，我们需要在 Java 程序中明确导入该包。使用 `import` 语句可完成此功能。
如果在一个包中，一个类想要使用本包中的另一个类，那么该包名可以省略。

### package 的目录结构
