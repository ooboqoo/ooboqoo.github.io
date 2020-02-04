# Java 开发环境搭建




## 开发环境搭建

### JRE 与 JDK

* JRE 包括 Java 虚拟机 和 Java 程序所需的核心类库等，只需要安装 JRE 即可运行开发好的 Java 程序。
* JDK 提供给 Java 开发人员使用的，除了 JRE 还包含了 Java 的开发工具(如 javac jar 等)

### Windows 安装 JDK

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

### macOS 安装 JDK

下载安装包直接安装即可。

### JDK 安装路径下的目录解释

```text
|- bin    // 该目录用于存放一些可执行程序
|   |- javac.exe    // 编译器
|   |- java.exe     // 运行工具
|   |- jar.exe      // 打包工具
|   \- javadoc.exe  // 文档生成工具
|- db    // db目录是一个小型的、Java实现的、开源的数据库管理系统
|        // 在学习 JDBC 时，不再需要额外地安装一个数据库软件，选择直接使用 JavaDB 即可
|- jre   // 此目录是 Java 运行时环境的根目录，包括 Java 虚拟机，运行时的类包，Java 应用启动器以及一个 bin 目录
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

### 在线文档查询

* _谷歌搜索_ 可以通过谷歌搜索快速查找，如搜索 String java 9 出来第一条就是
  https://docs.oracle.com/javase/8/docs/api/java/lang/String.html
* _逐级导航查找_ 逐级导航进入文档，步骤：左上选择包，左下选择类，最后在右侧查看具体文档
* _网址直达_ 如知道查询类的位置，也可以直接修改网址进入，如 java/uitl/Scanner.html

应该慢慢熟悉最常用的包 java.lang java.util java.io 有个大概印象之后查询起来会更加得心应手。

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



## IntelliJ IDEA




## VSCode

VSCode 安装语言支持包后，对于纯粹的 Java 语言练习，要比 IDEA 要好用很多。

* 通过 `cmd + shift + p` 选 "Java: Create Java Project" 新建项目，在项目里写代码能获得诸多 IDE 自动化便利
* 简单试验直接在 `src` 目录下新建 `.java` 文件练习，他们在 `default` 这个 package 下，保存后会自动编译到 `bin` 目录
* 如果要写多个相关的 `.java` 文件，那就要新建一个模块 `package`，即在 src 目录下新建一个目录，便于代码组织
* 运行文件要 `cd bin` 后再 `java mypackage.MyClass`，或者也可以 `java -cp bin mypackage.MyClass`
* 调试(运行)文件也可以直接按 F5，VSCode 会自动拼接参数，但要先配置好 launch.json

_launch.json_

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Current File",
      "request": "launch",
      "mainClass": "${file}"
    },
    {
      "type": "java",
      "name": "Debug App",
      "request": "launch",
      "mainClass": "app.App",
      "projectName": "play-compiler"
    }
  ]
}
```

### Eclipse Java 项目结构

```
|- .settings
|  \- org.eclipse.jdt.core.prefs
|- bin                // 字节码文件
|  \- app
|     \- App.class
|- lib                // 放项目依赖的 JAR 文件
|- src                // 源码
|  \- app
|     \- App.java
|- .classpath         // XML 配置 .class 文件路径信息
\- .project           // XML 项目配置信息
```
