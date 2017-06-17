<style>
  td:first-child { color: red; }
</style>
<script>
ooboqoo.contentsRegExp = /H[12]/;  // 定义目录生成级别
</script>


# Java 教程

## 概述

### 简介

Java SE 标准版
Java EE 企业版
Java ME 移动版

### 开发环境配置

* 下载 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* 配置环境变量：
  * 变量名：`JAVA_HOME` 变量值：`D:\Program Files\Java\jdk1.8.0_131`  //根据实际安装目录配置
  * 变量名：`CLASSPATH` 变量值：`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;` //记得前面有个"."
  * 变量名：`Path` 变量值：`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`


## HelloWorld

创建 HelloWorld.java(**文件名需与类名一致**), 代码如下：

```java
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World");
    }
}
```

执行命令

```bash
$ javac HelloWorld.java  # 必须带后缀
$ java HelloWorld        # 不能带后缀
```


## 基础语法

一个 Java 程序可以认为是一系列对象的集合，而这些对象通过调用彼此的方法来协同工作。先关概念有：类、对象、方法和实例变量。

### 基本语法

编写 Java 程序时，应注意以下几点：
  * 大小写敏感 - Java 是大小写敏感的
  * 类名 - 类名采用大驼峰式写法
  * 方法名 - 方法名采用小驼峰式写法
  * 源文件 - 源文件名必须和类名相同，文件名的后缀为 `.java`
  * 主方法入口 - 所有 Java 程序由 `public static void main(String []args)` 方法开始执行

### 标识符

类名、变量名以及方法名都被称为标识符，关于标识符，有以下几点需要注意：
  * 所有的标识符都应该以字母 `A-Za-z`，美元符 `$`、或者下划线 `_` 开始
  * 首字符之后可以是字母 `A-Za-z`，美元符 `$`、下划线 `_` 或数字的任何字符组合
  * 关键字不能用作标识符
  * 标识符是大小写敏感的

### 修饰符

Java 可以使用修饰符来修饰类中方法和属性，主要有两类修饰符：
  * 访问控制修饰符 : `default`, `public` , `protected`, `private`
  * 非访问控制修饰符 : `final`, `abstract`, `strictfp`

### 变量

Java中主要有如下几种类型的变量
  * 局部变量
  * 类变量（静态变量）
  * 成员变量（非静态变量）

### 关键字

下面列出了 Java 保留字。这些保留字不能用于常量、变量、和任何标识符的名称。

```text
// 结构体
if else switch case break default
do while for continue
try catch finally throw

// 修饰符
abstract final public static private protected

// 类型
boolean byte short int long float double char enum

// 面向对象
class extends implements interface new super this

// 
package import instanceof assert return

// 未使用
goto const

// 陌生的关键字见下表
```

|||
|--------------|------------------------------------------------
| native       | 表示方法用非java代码实现
| strictfp     | 浮点数比较使用严格的规则
| synchronized | 表示同一时间只能由一个线程访问的代码块
| throws       | 定义方法可能抛出的异常
| transient    | 修饰不要序列化的字段
| void         | 标记方法不返回任何值
| volatile     | 标记字段可能会被多个线程同时访问，而不做同步

### 注释

Java 支持单行以及多行注释。

### 继承

在J ava 中，一个类可以由其他类派生。如果你要创建一个类，而且已经存在一个类具有你所需要的属性或方法，那么你可以将新创建的类继承该类。利用继承的方法，可以重用已存在类的方法和属性，而不用重写这些代码。被继承的类称为超类 super class，派生类称为子类 subclass。

### 接口

在 Java 中，接口可理解为对象间相互通信的协议。接口在继承中扮演着很重要的角色。接口只定义派生要用到的方法，但是方法的具体实现完全取决于派生类。

### 运行过程

* 编译型 源程序 --编译连接--> 可执行程序EXE --执行--> 操作系统
* Java   源程序 --编译--> 字节码程序 --解释执行--> **解释器** --> 操作系统 


## 对象和类





