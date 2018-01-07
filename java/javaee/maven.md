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

https://maven.apache.org/guides/mini/guide-naming-conventions.html

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


## 构建工具发展史

我们要写一个 Java 程序，一般的步骤也就是编译，测试，打包。这个构建的过程，如果文件比较少，我们可以手动使用 java, javac, jar 命令去做这些事情。但当工程越来越大，文件越来越多，这个事情就不是那么地令人开心了。我们需要把机械的东西交给机器去做。

在 Linux 上，有一个工具叫 make。我们可以通过编写 Makefile 来执行工程的构建。Windows 上相应的工具是 nmake。这个工具写起来比较罗嗦，所以从早期，Java 的构建就没有选择它，而是新建了一个叫做 ant 的工具。ant 的思想和 makefile 比较像。定义一个任务，规定它的依赖，然后就可以通过 ant 来执行这个任务了。下面列出一个 ant 工具所使用的 build.xml:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<project name="HelloWorld" default="run" basedir=".">
  <property name="src" value="src"/>
  <property name="dest" value="classes"/>
  <property name="jarfile" value="hello.jar"/>
  <target name="init">
     <mkdir dir="${dest}"/>
  </target>
  <target name="compile" depends="init">
     <javac srcdir="${src}" destdir="${dest}"/>
  </target>
  <target name="build" depends="compile">
     <jar jarfile="${jarfile}" basedir="${dest}"/>
  </target>
  <target name="test" depends="build">
     <java classname="test.ant.HelloWorld" classpath="${hello_jar}"/>
  </target>
  <target name="clean">
     <delete dir="${dest}" />
     <delete file="${hello_jar}" />
  </target>
</project>
```

可以看到 ant 的构建脚本还是比较清楚的。ant 定义了五个任务，init, compile, build, test, clean。每个任务做什么都定义清楚了。打包之前要先编译，所以通过 depends 来指定依赖的路径。如果在命令行里执行 ant build，那就会先执行 compile，而 compile 又依赖于 init，所以就会先执行 init。看起来很合理，对吧？有了这个东西以后，我们只要一条命令就可以执行编程，打包，测试了。为开发者带来了很大的便利。

```bash
$ ant test
```

但是 ant 有一个很致命的缺陷，那就是没办法管理依赖。我们一个工程，要使用很多第三方工具，不同的工具，不同的版本。每次打包都要自己手动去把正确的版本拷到 lib 下面去，不用说，这个工作既枯燥还特别容易出错。为了解决这个问题，maven 闪亮登场。

（Maven 介绍略）

Maven 已经很好了，可以满足绝大多数工程的构建。那为什么我们还需要新的构建工具呢？第一，Maven是使用 xml 进行配置的，语法不简洁。第二，最关键的，Maven 在约定优于配置这条路上走太远了。就是说，Maven 不鼓励你自己定义任务，它要求用户在 maven 的生命周期中使用插件的方式去工作。使用 Maven 想灵活地定义自己的任务是不行的。基于这个原因，Gradle 做了很多改进。

Gradle 并不是另起炉灶，它充分地使用了 Maven 的现有资源。继承了 Maven 中仓库，坐标，依赖这些核心概念。文件的布局也和 Maven 相同。但同时，它又继承了 ant 中 target 的概念，我们又可以重新定义自己的任务(gradle 中叫做 task)了。


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

最开始的几个元素 `groupId`, `artifactId`, `packaging`, `version` 是 Maven 的坐标(coordinates)，它们唯一标识了一个项目。

`name` 和 `url` 是 POM 提供的描述性元素，它们给人提供了可阅读的名字，将一个项目关联到了项目 web 站点。

最后，`dependencies` 元素定义了一个单独的，测试范围(test-scoped)依赖，依赖于称为 JUnit 的单元测试框架。

注：`<scope>provided</scope>`- provided 表明该包只在编译和测试的时候用

当 Maven 运行的时候，它是根据项目的 pom.xml 里设置的组合来运行的，最上级的 POM 在 Maven 的安装目录，它定义了全局的默认值。可以在项目中输入命令查看实际使用的所有设置项。

```bash
$ mvn help:effective-pom
```

一旦你运行了此命令，你应该能看到一个大得多的 POM，它暴露了 Maven 的默认设置。

