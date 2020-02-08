# Java 开发环境搭建



## JDK 安装

* JRE 包括 Java 虚拟机 和 Java 程序所需的核心类库等，只需要安装 JRE 即可运行开发好的 Java 程序。
* JDK 提供给 Java 开发人员使用的，除了 JRE 还包含了 Java 的开发工具(如 javac jar 等)

### Windows 安装步骤

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

### macOS 安装步骤

下载安装包直接安装即可。

### 目录说明

```text
|- bin    // 该目录用于存放一些可执行程序
|   |- javac    // 编译器，用于将 .java 源码文件编译为 .class 字节码文件
|   |- java     // 运行工具
|   |- jar      // 打包工具，用于将一组 .class 文件打包成一个 .jar 文件，便于发布
|   |- javadoc  // 文档生成工具
|   \- jdb      // 调试器
|- jre   // 此目录是 Java 运行时环境的根目录，包括 Java 虚拟机，运行时的类包，Java 应用启动器以及一个 bin 目录
|- include    // 由于 JDK 是通过 C 和 C++ 实现的，因此在启动时需要引入一些 C 语言的头文件
|- lib        // Java 类库或库文件，是开发工具使用的归档包文件
\- src.zip    // JDK 核心类的源代码
```

### 其他设置项

```bash
$ java -help        # 查看帮助信息
$ java -D<名>=<值>  # 设置系统属性
       -Duser.language=en -Duser.region=US  # 修改JVM默认语言和国家
       -Dfile-encoding=UTF-8                # 解决终端中文乱码
$ java -X           # 查看或设置非标准选项

# 示例
$ java -Duser.language=en -Xmx1024M com.demo.TestDemo
```

### HelloWorld

创建 HelloWorld.java(**文件名需与类名一致**，包括大小写也要一样，否则编译时报错), 代码如下：

```java
public class HelloWorld {
  // Java 规定一个类的静态 main 方法为固定入口方法
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

$ java HelloWorld.java   # Java 11 新增，支持直接运行一个单文件源码
```



## IntelliJ IDEA

### Ultimate 版优化

Ultimate 版本打开的速度不尽如人意，但是稍作优化，也是可以飞快的。

Ultimate 版本默认安装并打开了大量插件，先全部取消，再根据需要开启部分插件，启动速度明显加快。

对于 Maven 项目，不论是新建还是打开速度都比较慢，后面发现我的 _~/.m2/setting.xml_ 里放了 `<localRepository/>` 将默认值给屏蔽了，导致 IntelliJ 每次都会去网上拉取依赖，试了把这个空条目删了就好了。于是把其他的所有空配置项也都删掉了。



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



## Tomcat

[/devops/#!deploy/tomcat.md](/devops/#!deploy/tomcat.md)

### IntelliJ IDEA

#### Ultimate 版

Run -> Edit Configurations -> + -> Tomcat Server -> Local -> Name: Tomcat8.5

注1：要确保勾选了 Plugins -> Tomcat and TomEE Integration，不然看不到 Tomcat Server 设置项。  
注2：JDK 和 Tomcat 需要先提前安装好。

#### Community 版

IntelliJ IDEA Community 版不开发 Tomcat 插件，需要安装社区的 Smart Tomcat 插件。

* Settings -> Plugins 搜索并安装 Smart Tomcat
* Run -> Edit Configurations -> Smart Tomcat 进行配置
  * 设置 "Deployment Directory" 为源码中 webapp 目录，如 path/to/project/JavaWebDemo/src/main/webapp
  * 设置 "Context Path" 为 / 或其他指定 URL 根路径
  * 修改 "Server Port" 为 3000 或其他端口

完成配置后，点击右上角或左下角的 "运行 Run" 按钮即可启动项目，修改代码后点击 "重新运行 Rerun" 按钮重启即可。

### VS Code

安装插件 Tomcat for Java

在添加 Tomcat Server 时，在 macOS 下用 brew 安装的 Tomcat 要选择 tomcat/{version}/libexec 目录。

### Maven

不使用 IDE 的 Tomcat 插件，使用 Maven 的 Tomcat 插件也是可以的。当然不使用插件也不会太麻烦，拷贝 WAR 文件到 Tomcat 的 webapps 目录重启 Tomcat 就好。

#### Tomcat 设定

安装 tomcat7-maven-plugin 后，虽然可以启动插件自带的 Tomcat 7 进行调试，但若想部署到目标环境测试，还需作以下配置：
  * 如果端口有冲突，在 server.xml 中修改端口号
  * 为了实现自动部署，需要在 tomcat-users.xml 中配置管理账号

_{TomcatDirectory}/conf/server.xml_

```xml
<!-- 为防冲突，原 8080 改 3000 -->
<Connector port="3000" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```

_{TomcatDirectory}/conf/tomcat-users.xml_

```xml
<tomcat-users>
  <role rolename="manager-script"/>
  <role rolename="manager-gui"/>
  <user username="tomcat" password="tomcat" roles="manager-gui, manager-script"/>
</tomcat-users>
```

#### 自动部署配置

在 _～/.m2/settings.xml_ 里添加 Tomcat Server 的账号密码信息

```xml
<server>
  <id>Tomcat9</id>
  <username>tomcat</username>
  <password>tomcat</password>
</server>
```

在项目 Maven 配置文件 _pom.xml_ 中添加部署信息

```xml
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat7-maven-plugin</artifactId>
  <version>2.2</version>
  <configuration>
    <port>8080</port>
    <url>http://localhost:3000/manager/text</url>
    <server>Tomcat9</server> <!-- From Maven settings.xml -->
    <path>/${project.build.finalName}</path>
  </configuration>
</plugin>
```

注1: 实际 `tomcat:deploy` 部署时，要求服务器是开着的，否则无法完成部署。

注2: 管理账号和密码放在用户 Maven 配置文件 settings.xml 下，再通过 server 字段建立联系，是出于安全性考虑，如果不关心安全性，完全可以去掉 server 字段，而直接使用 username 和 password 字段配置。

### 配置热部署

https://www.cnblogs.com/a8457013/p/7866536.html

热部署可以使得修改代码后，无须重启服务器，就可以加载更改的代码。

第1种：修改服务器配置，使得 IDEA 窗口失去焦点时，更新类和资源

Run -> Edit Configuration -> Tomcat Server -> Tomcat8.5 对以下两个 Tab 页进行配置：
  * Deployment 确保是 "XXX.war exploded"
  * Server 将 "On 'Update' action" "On frame deactivation" 两项都设为 "update classes and resources"

优点：简单

缺点：
  * 基于 JVM 提供的热加载仅支持方法块内代码修改
  * 只在 Debug 模式下有效
  * 只在 IDEA 失去焦点时才会触发热加载，相对加载速度缓慢

第2种：使用 springloaded jar 包，对 Spring 系列框架支持好(不含Spring Boot)  
第3种：使用 spring-boot-devtools 提供的开发者工具，只支持 Spring Boot 项目，支持成员级别的修改热部署。  
第4种：使用 Jrebel 插件实现热部署，强大，对各类框架支持，收费。



## Maven 项目示例

### 搭建项目框架

File -> New -> Project... -> Maven -> Create from archetype -> maven-archetype-webapp

在 _pom.xml_ 添加内容为：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.demo</groupId>
  <artifactId>java-web-maven</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>java-web-maven Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <finalName>java-web-maven</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.2</version>
        <configuration>
          <port>9090</port>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

点击右侧 Maven Projects 打开面板，再点击 reimport All Maven Projects

随便修改下 index.jsp 里的内容，然后点击 Maven 面板里 `Plugins > tomcat7 > tomcat7:run` 就能启动服务器查看效果了。

> **关于 tomcat7-maven-plugin**
> * `tomcat7:run` 启动的是插件内嵌 Tomcat，上例中的 9090 就是用来配置内嵌 Tomcat 服务器的。
> * `tomcat:deploy` 则会连接指定 Tomcat 实例进行部署，此时要求服务器是启动的，且要配置好 url 以及管理账号和密码，否则无法完成部署。

### 添加示例内容

#### 创建 Servlet

创建文件 _src/main/java/com/demo/HelloServlet.java_

```java
package com.demo;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    response.setContentType("text/html");
    response.setStatus(HttpServletResponse.SC_OK);
    response.getWriter().println("<h1>Hello Servlet</h1>");
    response.getWriter().println("session=" + request.getSession(true).getId());
  }
}
```

在 _src/main/webapp/WEB-INF/web.xml_ 中注册 Servlet

```xml
<servlet>
  <servlet-name>Hello</servlet-name>
  <servlet-class>com.demo.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
  <servlet-name>Hello</servlet-name>
  <url-pattern>/hello/*</url-pattern>
</servlet-mapping>
```

#### 添加 Filter

创建一个过滤器，实现网站访问计数器功能。

_src/main/java/com/demo/CountFilter.java_

```java
package com.demo;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CountFilter implements Filter {
  private int count;

  public void init(FilterConfig config) {
    String param = config.getInitParameter("count");
    count = Integer.valueOf(param);
  }

  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
      throws ServletException, IOException {
    count++;
    ServletContext context = ((HttpServletRequest)req).getSession().getServletContext();
    context.setAttribute("count", count);
    chain.doFilter(req, resp);
  }

  public void destroy() { }
}
```

_src/main/webapp/WEB-INF/web.xml_

```xml
<filter>
  <filter-name>CountFilter</filter-name>
  <filter-class>com.demo.CountFilter</filter-class>
  <init-param>
    <param-name>count</param-name>
    <param-value>5000</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>CountFilter</filter-name>
  <url-pattern>/index.jsp</url-pattern>
</filter-mapping>
```

_src/main/webapp/index.jsp_

```html
<%@ page contentType="text/html;charset=UTF-8" %>
<body>
  欢迎光临，您是本站的第[ <%=application.getAttribute("count")%> ]位访客。
</body>
```


