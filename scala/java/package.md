# 包及访问权限控制

为了更好地组织类，Java 提供了包机制，用于解决相同类名问题。

### 包的作用

将一个大型项目中的类分门别类地存到功能类似的程序里，保存到不同的包中，这样的程序代码更易于维护。同时，将类分割开后，不仅可以避免重名冲突，还多了访问权限控制。

1. 把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用。
2. 如同文件夹一样，包也采用了树形目录的存储方式。同一个包中的类名字是不同的，不同的包中的类的名字是可以相同的，当同时调用两个不同包中相同类名的类时，应该加上包名加以区别。因此，包可以避免名字冲突。
3. 包也限定了访问权限，拥有包访问权限的类才能访问某个包中的类。

### 包的定义

包，其实就是文件夹。包名要求全部小写，一般都是公司的名倒着写。  
在 Java 中使用 `package` 关键字来定义包，此语句必须写在文件首行。

#### javac 手动编译说明

```java
package com.demo.util;
public class Message {
  public void print() {
    System.out.println("Hello World!");
  }
}
```

```java
package com.demo.test;
import com.demo.util.*;
public class TestMessage {
  public static void main(String[] args) {
    Message msg = new Message();
    msg.print();
  }
}
```

```bash
$ javac Message.java       # 生成的 class 文件位于当前目录
$ javac -d . Message.java  # 生成的 class 文件位于当前目录下 com/demo 文件夹下，-d 后面代表当前目录的点不能省略
$ javac -d . TestMessage.java  # 必须先编译才能再编译 TestMessage.java，否则提示 com.demo.util 不存在
$ javac -d . *.java            # 手动逐个编译有顺序要求，而使用通配符就可以实现自动编译
$ java com.demo.test.TestMessage  # 手动运行必须这样输入，其他方式都跑不通
```

### 导包

不同包之间要进行互相访问，就需要先导入 `import` 包。

`import` 语句必须位于类定义之前，`package` 语句之后，出现在其他位置编译报错。

```java
import java.io.*;  // 载入 java_installation/java/io 路径下的所有类
```

#### `public class` 与 `class` 的区别

* `public class` 类名必须与文件名一致，一个 java 文件中只能存在一个 公共类
* `class` 类名可以更文件名不一致，一个 java 文件中可以存在多个普通类

如果一个类需要被不同的包访问，那么一定要使用 `public class` 定义。

实际项目中，绝大多数情况下都只会在一个 java 文件中定义一个类，并且类的声明绝大多数使用的是 `public class` 完成的。

#### 导包时通配符的使用 `*`

使用 `import com.demo.util.*` 可以一次性导入 util 下的所有类，比做个导入类方便。相应的涉及到2个问题：

* 性能问题，其实使用 `包.*` 和 `包.类` 的性能是一样的，使用 `包.*` 类加载时也是只加载所需要的类
* 重名问题，如果导入的包中存在同名类，在使用时必须采用 `com.demo.util.Message` 这样使用类的完整名称了

### 系统常见包

|||
|-------------------|----------------------|
| java.lang         | 最基本的包，像 String 这样的包就保存在此包中，无需手动导入
| java.lang.reflect | 反射机制的包，是 java.lang 的子包
| java.util         | 工具包，一些常用的类库、日期操作等都在此包中
| java.text         | 提供了一些文本的处理类库
| java.sql          | 数据库操作包，提供了各种数据库操作的类和接口
| java.net          | 完成网络编程
| java.io           | 输入、输出及文件处理操作
| java.awt          | 抽象窗口工具包 Abstract Window ToolKit，构建和管理应用程序的图形用户界面 GUI
| javax.swing       | 在 awt 基础上开发的新的界面工具包，性能较直接使用 awt 差，但使用更加方便
| java.applet       | 已经淘汰，目前会使用 HTML5 的 Canvas 技术来实现原 Applet 小程序的功能

### jar 命令

在任何一个项目里一定会存在大量的 *.class 文件，交付用户之前需要进行打包压缩，用户最终拿到的是 Java 归档 (Java Archive) 文件 *.jar 。

```bash
$ jar -cvf demo.jar com           # -c 创建新文件 -v 生产标准的压缩信息 -f 指定jar文件名
$ set classpath=.;./demo.jar
$ java com.demo.test.TestMessage  # 先删除 com.demo.util 下内容再运行此命令正常工作
```

### 访问控制权限

| 修饰符    | 当前类 | 同一包内 | 子孙类 | 其他包 |
|-----------|:------:|:--------:|:------:|:------:|
| public    |    Y   |     Y    |    Y   |    Y   |
| protected |    Y   |     Y    |    Y   |    N   |
| default   |    Y   |     Y    |    N   |    N   |
| private   |    Y   |     N    |    N   |    N   |

实际开发中
  * 属性声明主要使用 `private` 权限
  * 方法声明主要使用 `public` 权限，偶尔使用 `protected`
  * 几乎不会用到 `default` 权限

### 命名规范


### 单例设计模式

```java
class Singleton {
  private static Singleton instance = new Singleton();  // 静态属性，供静态方法 getInstance() 调用
  private Singleton() {}                                // 构造方法私有化，禁止外部直接实例化对象
  public void print() {
    System.out.println("Hello");
  }
  public static Singleton getInstance() {                // 通过静态方法获取本类单例对象
    return instance;
  }
}
```

#### 固定实例设计模式

单例设计模式只留下一个类的一个实例化对象，而多例设计模式会定义出多个对象。

```java
class Person {
  private String gender;
  private static final Person MALE = new Person("man");
  private static final Person FEMALE = new Person("woman");
  private Person(String gender) {
    this.gender = gender;
  }
  public String toString() {
    return this.gender;
  }
  public static Sex getInstance(String gender) {
    switch (gender) {
      case "man": return MALE;
      case "woman": return FEMALE;
      default: return null;
    }
  }
}
```

### 源文件声明规则

当在一个源文件中定义多个类，并且还有 `import` 语句和 `package` 语句时，要特别注意这些规则。
  * 一个源文件中只能有一个 public 类
  * 一个源文件可以有多个非 public 类
  * 源文件的名称应该和 public 类的类名保持一致。
  * 如果一个类定义在某个包中，那么 `package` 语句应该在源文件的首行。
  * 如果源文件包含 `import` 语句，那么应该放在 `package` 语句（如果存在 package 语句）和类定义之间。
  * `import` 语句和 `package` 语句对源文件中定义的所有类都有效。在同一源文件中，不能给不同的类不同的包声明。

