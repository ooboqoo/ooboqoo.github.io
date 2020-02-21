# 包、模块、访问权限

类是 Java 中组织代码的基本单元，这一节学习 Java 是如何组织类的。


## 包

为了更好地组织类，Java 提供了包机制，用于解决类名冲突。

包实际上属于 Java 定义的一种 *命名空间*。一个类总是属于某个包，类名只是一个简写，完整的类名是 `包名.类名`。

定义类时，我们需要在第一行声明这个类属于哪个包。没有定义包名的类，它使用的是默认包，但这样非常容易引起类名冲突。

包可以是多层结构，用 `.` 隔开，如 `java.util`，但要注意的是，*包没有父子关系* ，`java.util` 和 `java.util.zip` 是不同的包，两者没有任何继承关系。使用 `import java.util.*;` 导入 `java.util` 包时，并不会导入 `java.util.zip` 下的类。


### 包的作用

1. *包可以避免类名冲突*，同一个包中的类名不能重复，不同包中的类名可以相同。
2. 把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用，*有利于代码的可维护性*。
3. *增加了一层访问权限控制*。

### 包的定义

包名只能用 小写字母、数字 和 `_` `.`，但不能以数字开头，不能使用 `-`。

包名会对应到储存目录，如果含 `.` 就会拆分成多级目录。

为了避免包名冲突，推荐使用倒置的公司域名，如 `org.apache.commons.log`。

在 Java 中使用 `package` 关键字来定义包，此语句必须写在文件首行。

```java
package com.example;
public class Person {
}
```

### _.java_ 源文件规则

* 一个源文件中只能有一个 `public` 类，可以没有 `public` 类，但实际没这么用的。
* 一个源文件可以有多个非 `public` 类，但出现非 `public` 类的几率并不高。
* 文件名必须和 `public` 类名保持一致。
* 如果一个类定义在某个包中，那么 `package` 语句应该是源文件的首行(注释除外)。
* 如果源文件包含 `import` 语句，那么应该放在 `package` 语句和类定义之间。
* `import` 语句和 `package` 语句对源文件中定义的所有类都有效。在同一源文件中，不能给不同的类不同的包声明。

实际项目中，绝大多数情况下都只会在一个源文件中定义一个类，且这个类就是 `public` 类。

### 手动编译

当存在多个包时，手动编译还是会有些麻烦，实际开发时都是交由 IDE 自动处理。

```bash
$ javac -d ../bin pkg1/Person.java pkg2/Person.java
```

```txt
package_demo
  \- src
      |- pkg1/Person.java
      \- pkg2/Person.java

package_demo
  |- src\...
  \- bin
      |- pkg1/Person.class
      \- pkg2/Person.class
```



## 访问权限

### 类的访问权限

类的访问权限只有两种：public(带 `public`) 和 package-private(不带修饰符)，故类名前不支持 `protected` `private` 修饰符。

接口的访问权限同类。

### 类成员的访问权限

类与类之间的可能关系、及对权限的影响：
* 位于同一个包内：除 `private` 外的成员都能访问。
* 位于不同的包内：如无继承关系仅能访问 `public` 成员，如有继承关系则还能访问 `protected` 成员。
* 位于同一个源文件内：对访问权限无影响，按同包处理。
* 嵌套关系：拥有完全的访问权限。
* 继承或间接继承某个类(即 祖先 和 子孙 的关系)：同包按同包权限处理，不同包看 `protected`。

以上各种关系根据访问权限不同可以分成4组，权限罗列如下：

| 修饰符     | 当前类  | 同包     | 不同包 + 子孙类  | 不同包  |
|-----------|:------:|:--------:|:--------------:|:------:|
| public    |    Y   |     Y    |    Y           |    Y   |
| protected |    Y   |     Y    |    Y           |    N   |
| 无        |    Y   |     Y    |    N           |    N   |
| private   |    Y   |     N    |    N           |    N   |

实际开发中字段声明主要使用 `private` 权限。

方法声明主要使用 `public` 权限，偶尔使用 `protected`。如果需要使用 `private`，推荐放到最后定义。

如果不确定是否需要 `public`，就不声明为 `public`，即 *尽可能少地暴露对外的字段和方法*。

*把方法定义为包级权限有助于测试*，测试类和被测试类位于同一个包，测试代码就可以访问被测试类中除 `private` 外的所有方法。



## 使用包

在 `pkg4` 中想使用 `pkg1.Person` 类，有2种写法
* 使用时直接写出完整类名
* 先 `import pkg1.Pserson;` 然后使用 `Person` 类

```java
package pkg4;

import pkg1.Person;              // 1. 导入包中的一个类
import pkg2.*;                   // 2. 导入包内定义的所有类

public class Main {
  public static void main(String[] args) {
    var p1 = new Person();
    var p2 = new Girl();
    var p3 = new pkg3.Person();  // 3. 不导包，直接给出完整类名
  }
}

```

注：如果需要同时使用两个不同包中的相同类名的类，那么只能导入其中一个，另一个必须写完整类名。

### 编译器如何查找类

Java 编译器最终编译出的 _.class_ 文件只使用完整类名，当编译器遇到一个类名称时：
* 如果是完整类名，就直接根据完整类名查找类
* 如果是简单类名，按下面的顺序依次查找
  * 查找当前包
  * 查找 `import` 的包是否包含这个类
  * 查找 _java.lang_ 包是否包含这个类
* 如果按照上面的规则还无法确定类就编译报错

从上面的过程中可以看出，编译器会自动帮我们导入两个包：_java.lang_ 和 当前类所在的包。

注：自动导入的是 _java.lang_ 包，并不包含 _java.lang.reflect_ 包，它们是不同的两个包。

### 静态导入

还有一种 `import static` 的语法，即静态导入，可以导入一个类的静态字段和静态方法。当然，实际很少使用。

```java
// 导入 System类 的所有静态字段和静态方法:
import static java.lang.System.*;

public class Main {
  public static void main(String[] args) {
    out.println("Hello, world!");
  }
}
```



## `classpath` 与 JAR 包

### `classpath` 的作用

`classpath` 是 JVM 用到的一个环境变量，它用来指示 JVM 如何搜索类(即 _.class_ 文件)。

Java 是编译型语言，源码是 _.java_ 文件，而编译后的 _.class_ 文件才是真正可以被 JVM 执行的字节码。JVM 加载类时，通过 `classpath` 配置的 *目录集合* 搜索相应的类文件。

### 设置 `classpath`

在 Windows 系统，目录间用 `;` 分隔，在 Linux 系统，目录间用 `:` 分隔。带空格的目录用 `""` 括起来。

`classpath` 的设定有两种方法：在系统环境变量中设置，或在启动 JVM 时通过参数传入。

```bash
$ export classpath=path1:path2  # 设置环境变量，不推荐，会污染系统环境
$ java -cp . com.example.Hello  # 推荐，传参还可用 -classpath 或 --class-path
```
如果没有设置环境变量，也没有传参，那么默认 `classpath` 为 `.` (即当前目录)。在 IDE 中运行 Java 程序，IDE 会根据项目设置自动传入正确的 `-cp` 参数。

另外，网上说的要把 JVM 自带的 _rt.jar_ (包含 `String` `ArrayList` 等核心类) 放入 `classpath` 的说法是不对的，完全多余。

### JAR 包

交付项目时，如果我们直接将编译后的目录发给客户，肯定不合适，将目录打个 zip 包，变成一个文件就方便多了。_.jar_ 文件就是这么一个文件，我们可以手动打 zip 包，然后将后缀 _.zip_ 改成 _.jar_ 就完成 JAR 包制作了。

JAR 包还可以包含一个特殊的 _META-INF/MANIFEST.MF_ 纯文本文件，可以指定 `Main-Class` 等信息。JVM 会自动读取这个文件，如果存在 `Main-Class`，启动时就无需手动指定主类了。

JAR 包还可以包含其他 JAR 包，这时就要在 _META-INF/MANIFEST.MF_ 里配置 `classpath` 信息。

当然，在实际项目中我们不可能手动编写 _META-INF/MANIFEST.MF_ 文件，也不可能手动打包，构建工具可以帮我们搞定。

```bash
jar -cvf hello.jar pkg1 pkg2   # -c 创建新文件 -v 生产标准的压缩信息 -f 指定jar文件名
java -cp hello.jar pkg1.Hello  # 运行 hello.jar 里的 pkg1/Hello.class 类

Java -jar hello.jar  # 如果包里的 META-INF/MANIFEST.MF 指定了主类就可以这样直接启动
```


## 模块

Java 9 引入了模块(Module)。

https://www.liaoxuefeng.com/wiki/1252599548343744/1281795926523938


