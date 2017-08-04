# Maven

https://maven.apache.org/

Maven = 包依赖管理工具 + 构建工具；通过约定(默认配置)来减小使用的复杂度。

### 安装及配置

下载、解压，并添加 bin 目录到 PATH 环境变量。

```bash
$ mvn -v    # 验证配置是否正确
$ mvn -h    # 查看使用帮助
$ mvn package
$ mvn clean deploy site-deploy 
```

USER_HOME/.m2 目录下的 `settings.xml` 可用于跨项目配置，而每个项目下的 `.mvn` 目录则用于存放特定于项目的配置文件。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <usePluginRegistry/>
  <offline/>
  <pluginGroups/>
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>
```

### 核心概念

#### 插件和目标 Plugins and Goals

一个 Maven 插件是单个或者多个目标的集合。

Maven 插件的例子有一些简单但核心的插件，像 **Jar 插件**，它包含了一组创建 JAR 文件的目标，**Compiler 插件**，它包含了一组编译源代码和测试代码的目标，或者 **Surefire 插件**，它包含一组运行单元测试和生成测试报告的目标。

一个目标是一个明确的任务，它可以作为单独的目标运行，或者作为一个大的构建的一部分和其它目标一起运行。

目标是 Maven 中的一个工作单元(unit of work)。

目标的例子包括 Compiler 插件中的 compile 目标，它用来编译项目中的所有源文件，或者 Surefire 插件中的 test 目标，用来运行单元测试。

目标通过配置属性进行配置，以用来定制行为。在之前的例子中，我们通过命令行参数 `-DgroupId=org.sonatype.mavenbook.ch03` 和 `-DartifactId=simple` 向 Archetype 插件的 create 目标传入了 groupId 和 artifactId 配置参数。


#### 生命周期 Lifecycle

上一节中，我们运行的第二个命令是 `mvn package`。命令行并没有指定一个插件目标，而是指定了一个 Maven 生命周期阶段。一个阶段是在被 Maven 称为“构建生命周期”中的一个步骤。生命周期是包含在一个项目构建中的一系列有序的阶段。Maven 可以支持许多不同的生命周期，但是最常用的生命周期是默认的 Maven 生命周期，这个生命周期中一开始的一个阶段是验证项目的基本完整性，最后的一个阶段是把一个项目发布成产品。

插件目标可以附着在生命周期阶段上。随着 Maven 沿着生命周期的阶段移动，它会执行附着在特定阶段上的目标。每个阶段可能绑定了零个或者多个目标。

#### 坐标 Coordinates

项目对象模型 POM 是一个项目的声明性描述。当 Maven 运行一个目标的时候，每个目标都会访问定义在项目 POM 里的信息。

POM 为项目命名，提供了项目的一组唯一标识符(坐标)，他们可以用来唯一标识一个项目，一个依赖，或者一个插件。

```text
groupId:artifactId:packaging:version
groupId:artifactId:version             # 默认 packaging 为 jar
```

```xml
<groupId>org.apache.tomcat.maven</groupId>
<artifactId>tomcat7-maven-plugin</artifactId>
<packaging>jar</packaging>
<version>2.2</version>
```

* groupId - 团体标识，约定采用创建这个项目的组织域名的倒序形式
* artifactId - 项目标识
* packaging - 项目的打包格式，4个里面仅这一项是可省略的，默认为 jar
* version - 项目的某个版本，后缀带 SNAPSHOT 标记的意思是处于开发中

#### 仓库 Repositories

Maven 仓库的标准是按照下面的目录格式来存储构件，相对于仓库的根目录：http://repo1.maven.org/maven2/

```text
/<groupId>/<artifactId>/<version>/<artifactId>-<version>.<packaging>
```

Maven 从远程仓库下载构件和插件到你本机上，存储在你的本地 Maven 仓库里，以后就不用再下载了，因为 Maven 会首先在本地仓库查找插件。

#### 依赖管理 Dependency Management

Maven 支持了传递性依赖(transitive dependencies)，你只需要在 pom.xml
 中加上你直接依赖的那些库，Maven 会隐式地把这些库间接依赖的库也加入到你的项目中。

如 JUnit 插件，Maven 不只是下载 JUnit 的 JAR 文件，它同时为这个 JUnit 依赖下载了一个 POM 文件。Maven 同时下载构件和 POM 文件的这种行为，对 Maven 支持传递性依赖来说非常重要。

当你把项目的构件安装到本地仓库时，你会发现在和 JAR 文件同一目录下，Maven 发布了一个稍微修改过的 pom.xml 的版本。

#### 站点生成和报告 Site Generation and Reporting

```bash
$ mvn site
```

会在 target/site 目录下生成一个项目 web 站点，载入其中的 index.html 就能看到项目站点的基本情况。


## Maven 实战

### 创建一个简单的项目

```bash
$ mvn archetype:generate -DgroupId=org.apache.maven.archetypes -DartifactId=maven-archetype-webapp
```

`-D<name>=<value>` 这种格式不是 Maven 定义的，它其实是 Java 用来设置系统属性的方式，可以通过 `java -help` 查看
Java 的解释。Maven 的 bin 目录下的脚本文件仅仅是把属性传入 Java 而已。

在一个 Java 项目中，Java 类放在 src/main/java 下面，而 classpath 资源文件放在 src/main/resources 下面。

我们项目的测试用例放在 src/test 下。在这个目录下面，src/test/java 存放像使用 JUnit 或者 TestNG 这样的 Java 测试类。目录 src/test/resources 下存放测试 classpath 资源文件。

### 构建一个项目

```bash
$ mvn install
```

### 项目对象模型 POM

当 Maven 运行的时候它向项目对象模型(POM)查看关于这个项目的信息。POM 回答类似这样的问题：这个项目是什么类型的？这个项目的名称是什么？这个项目的构建有自定义么？

`pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>demo.servlet</groupId>
  <artifactId>hello-server</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>HelloServer Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

一般来说一个 POM 文件会复杂得多：定义多个依赖，自定义插件行为。

最开始的几个元素 groupId, artifactId, packaging, version 是 Maven 的坐标(coordinates)，它们唯一标识了一个项目。

name 和 url 是 POM 提供的描述性元素，它们给人提供了可阅读的名字，将一个项目关联到了项目 web 站点。

最后，dependencies 元素定义了一个单独的，测试范围(test-scoped)依赖，依赖于称为 JUnit 的单元测试框架。

当 Maven 运行的时候，它是根据项目的 pom.xml 里设置的组合来运行的，最上级的 POM 在 Maven 的安装目录，它定义了全局的默认值。可以在项目中输入命令查看实际使用的所有设置项。

```bash
$ mvn help:effective-pom
```

一旦你运行了此命令，你应该能看到一个大得多的 POM，它暴露了 Maven 的默认设置。

## Jetty + Maven 开发标准 WebApp

http://blog.csdn.net/tomato__/article/details/37927813

### 使用 archetype 创建项目

### 创建一个 Servlet

创建文件 src/main/java/org/example/HelloServlet.java

```java
package org.example;

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

在 src/main/webapp/WEB-INF/web.xml 中注册 Servlet

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<web-app
   xmlns="http://java.sun.com/xml/ns/javaee"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
   metadata-complete="false"
   version="3.0">

  <servlet>
    <servlet-name>Hello</servlet-name>
    <servlet-class>org.example.HelloServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Hello</servlet-name>
    <url-pattern>/hello/*</url-pattern>
  </servlet-mapping>
</web-app>
```

### 配置 POM

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <groupId>org.example</groupId>
  <artifactId>hello-world</artifactId>
  <version>0.1-SNAPSHOT</version>
  <packaging>war</packaging>
  <name>Jetty HelloWorld WebApp</name>

  <properties>
      <jettyVersion>9.4.6.v20170531</jettyVersion>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.eclipse.jetty</groupId>
      <artifactId>jetty-server</artifactId>
      <version>${jettyVersion}</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
   
  <build>
    <plugins>
      <plugin>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-maven-plugin</artifactId>
        <version>${jettyVersion}</version>
      </plugin>
    </plugins>
  </build>

</project>
```

### 构建和运行 Web 应用

```bash
$ mvn jetty:run
```

### 构建一个 WAR 文件

```bash
$ mvn package
```
