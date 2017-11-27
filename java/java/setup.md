# Java 简介及开发环境搭建

Java 语言规范是描述 Java 语言的官方文档，可以从网站 http://docs.oracle.com/javase/specs 上阅读或下载。

## 概述

#### Java 语言发展史

* 詹姆斯·高斯林 (James Gosling)
* SUN (Stanford University Network，斯坦福大学网络公司)
* Java 咖啡 -> 咖啡生产地 印尼爪哇岛

#### Java 语言平台

* J2SE(Java 2 Platform Standard Edition) 标准版
  * 为开发普通桌面和商务应用程序提供的解决方案，是其他两者的基础
* J2EE(Java 2 Platform Enterprise Edition) 企业版
  * 为开发企业级应用提供的一套解决方案，包含 Servlet Jsp 等，主要针对于 Web 应用程序开发
* J2ME(Java 2 Platform Micro Edition) 移动版
  * 为开发电子消费产品和嵌入式设备提供的解决方案，已经没什么市场了

#### Java 语言版本

* JAVA SE 5.0 (1.5.0) Tiger     老虎
* JAVA SE 5.1 (1.5.1) Dragonfly 蜻蜓
* JAVA SE 6.0 (1.6.0) Mustang   野马
* JAVA SE 7.0 (1.7.0) Dolphin   海豚

#### Java 语言特点

Java 并不只是一种语言，它是一个完整的平台，有一个庞大的库。

Java 白皮书中对 Java 特性的描述可用 11 个关键术语进行组织：
  * 1 简单性 2 面向对象 3 分布式 4 健壮性 5 安全性
  * 6 体系结构中立 7 可移植性 8 解释型 9 高性能 10 多线程 11 动态性

#### 常见误解

Java 理论上能成为适用于所有平台的通用性编程语言，但在实际中，某些领域其他语言有更出色的表现，比如，Objective C 和后来的 Swift 在 iOS 设备上就有着无可取代的地位。浏览器中的处理几乎完全由 JavaScript 掌控。Windows 程序通常都用 C++ 或 C# 编写。Java 在服务器端编程和跨平台客户端应用领域则很有优势。

#### 运行过程

* 编译型 源程序 --编译连接--> 可执行程序EXE --执行--> 操作系统
* Java   源程序 --编译--> 字节码程序 --解释执行--> **解释器** --> 操作系统 

Java 应用是通过 Java虚拟机(JVM) 来实现跨平台运行的。


## 开发环境搭建

### JRE 与 JDK

* JRE 包括 Java 虚拟机 和 Java 程序所需的核心类库等，只需要安装 JRE 即可运行开发好的 Java 程序。
* JDK 提供给 Java 开发人员使用的，除了 JRE 还包含了 Java 的开发工具(如 javac jar 等)

### JDK 的下载和安装过程

* 下载并安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) &nbsp; // 所有内容都在一个文件夹下，绿色便携，所以要进行下一步配置
* 配置环境变量：
  * 变量名：`JAVA_HOME` 变量值：`D:\Program Files\Java\jdk1.8.0_131` &nbsp; // 根据实际安装目录配置
  * 变量名：`CLASSPATH` 变量值：`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;` &nbsp; // 记得前面有个 `.`
  * 变量名：`Path` 变量值：`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`

```bash
# 验证配置是否正确
$ java            # 输出命令帮助
$ javac -version  # 输出版本号
```

注1：设置环境变量后，不需要重启操作系统，重启下命令行就好了。  
注2：`Path` 变量中的内容是按顺序读取的，会影响搜寻结果。  
注3：JVM 默认会先在当前目录查找类文件，找不到才去 `CLASSPATH` 所列目录查找。

#### JDK 安装路径下的目录解释

```text
|- bin    // 该目录用于存放一些可执行程序
|   |- javac.exe    // java编译器
|   |- java.exe     // java运行工具
|   |- jar.exe      // 打包工具
|   \- javadoc.exe  // 文档生成工具
|- db    // db目录是一个小型、Java实现、开源的数据库管理系统
|        // 在学习 JDBC 时，不再需要额外地安装一个数据库软件，选择直接使用JavaDB即可
|- jre   // 此目录是 Java 运行时环境的根目录，包括 Java 虚拟机，运行时的类包，Java应用启动器以及一个bin目录
|- include    // 由于 JDK 是通过 C 和 C++ 实现的，因此在启动时需要引入一些 C 语言的头文件
|- lib        // Java 类库或库文件，是开发工具使用的归档包文件
\- src.zip    // JDK 核心类的源代码
```

### 安装库源文件和文档

库源文件在 JDK 中以一个压缩 src.zip 的形式发布，须解压后才能访问：

```bash
$ mkdir javasrc && cd javasrc
$ jar xvf jdk/src.zip          # 也可以采用其他解压工具 
```

文档包含在一个压缩文件中，它是一个独立于 JDK 的压缩文件，可以从 oracle 网站下载。

### Java API 使用方法

* __谷歌搜索__
  可以通过谷歌搜索快速查找，如搜索 String java 8 出来第一条就是 https://docs.oracle.com/javase/8/docs/api/java/lang/String.html

* __逐级导航查找__
  逐级导航进入文档，步骤：左上选择包，左下选择类，最后在右侧查看具体文档。

* __网址直达__
  如知道查询类的位置，也可以直接修改网址进入，如想查询 Scanner 类的文档，修改上面 URL 后面的部分为 java/uitl/Scanner.html 即可。

应该慢慢熟悉最常用的包 java.lang java.util java.io java.awt java.swing 有个大概印象之后查询起来会更加得心应手。

### 使用集成开发环境 IDEA

新建项目：File -> New -> Project from Existing Sources...  
运行调试：Run -> Run As -> Java Application

修改 JVM 配置：Run -> Edit Configurations... -> Defaults -> Application -> VM options

### 其他设置项

```bash
$ java -help        # 查看帮助信息
$ java -D<名>=<值>  # 设置系统属性
       -Duser.language=en -Duser.region=US  # 修改JVM默认语言和国家
       -Dfile-encoding=UTF-8                # 解决终端中文乱码
$ java -X           # 查看或设置非标准选项

$ java -Duser.language=en -Xmx1024M com.demo.TestDemo
```


## HelloWorld

创建 HelloWorld.java(**文件名需与类名一致**，包括大小写也要一样，否则编译时报错), 代码如下：

```java
public class HelloWorld {
    public static void main(String[] args) {  // 也可以写成 String args[]，但不常见
        System.out.println("Hello World");
    }
}
```

执行命令

```bash
$ javac HelloWorld.java  # 必须带后缀
$ java HelloWorld        # 不能带后缀，否则报错：找不到或无法加载主类 HelloWorld.class

$ javac -encoding UTF-8 XX.java  # 如果碰到编码问题报错，就使用参数解决
```
