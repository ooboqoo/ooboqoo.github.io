# Maven

https://maven.apache.org/

Maven = 包依赖管理工具 + 构建工具

### 安装及配置

下载、解压，并添加 bin 目录到 PATH 环境变量。

```bash
$ mvn -v    # 验证配置是否正确
$ mvn -h    # 查看使用帮助
$ mvn package
$ mvn clean deploy site-deploy 
```

USER_HOME/.m2 目录下的 `settings.xml` 可用于跨项目配置，而每个项目下的 `.mvn` 目录则用于存放特定与项目的配置文件。

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
  <servers>
    <server>
      <id>Tomcat8.5</id>
      <username>tomcat</username>
      <password>tomcat</password>
    </server>
  </servers>
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

一个 Maven 插件是一个单个或者多个目标的集合。

Maven插件的例子有一些简单但核心的插件，像 **Jar 插件**，它包含了一组创建 JAR 文件的目标，**Compiler 插件**，它包含了一组编译源代码和测试代码的目标，或者 **Surefire 插件**，它包含一组运行单元测试和生成测试报告的目标。

一个目标是一个明确的任务，它可以作为单独的目标运行，或者作为一个大的构建的一部分和其它目标一起运行。

目标是 Maven 中的一个工作单元(unit of work)。

目标的例子包括 Compiler 插件中的 compile 目标，它用来编译项目中的所有源文件，或者 Surefire 插件中的 test 目标，用来运行单元测试。

目标通过配置属性进行配置，以用来定制行为。在之前的例子中，我们通过命令行参数 -DgroupId=org.sonatype.mavenbook.ch03 和 -DartifactId=simple 向 Archetype 插件的 create 目标传入了 groupId 和 artifactId 配置参数。


#### 生命周期 Lifecycle

上一节中，我们运行的第二个命令是 `mvn package`。命令行并没有指定一个插件目标，而是指定了一个 Maven 生命周期阶段。一个阶段是在被 Maven 称为“构建生命周期”中的一个步骤。生命周期是包含在一个项目构建中的一系列有序的阶段。Maven 可以支持许多不同的生命周期，但是最常用的生命周期是默认的 Maven 生命周期，这个生命周期中一开始的一个阶段是验证项目的基本完整性，最后的一个阶段是把一个项目发布成产品。

插件目标可以附着在生命周期阶段上。随着 Maven 沿着生命周期的阶段移动，它会执行附着在特定阶段上的目标。每个阶段可能绑定了零个或者多个目标。

#### 坐标 Coordinates

#### 仓库 Repositories

#### 依赖管理 Dependency Management

#### 站点生成和报告 Site Generation and Reporting


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






















