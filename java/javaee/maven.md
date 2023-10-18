# Maven

https://maven.apache.org/guides/getting-started/index.html

Maven = 包依赖管理工具 + 构建工具；通过约定(默认配置)来减小使用的复杂度。


## Maven Getting Started Guide

https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html

### Maven in 5 Minutes

Install Maven

```bash
brew install maven
```

Creating a Project

```bash
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

注：`-D<name>=<value>` 这种格式不是 Maven 定义的，它其实是 Java 用来设置系统属性的方式，可以通过 `java -help` 查看具体说明。Maven 的 bin 目录下的脚本文件仅仅是把属性传入 `java` 而已。

```bash
cd my-app
mvn package
java -cp target/my-app-1.0-SNAPSHOT.jar com.mycompany.app.App
```

### Standard Directory Layout

这是 Maven 规定的默认目录结构，是强制的，当然，如有特殊需求可在 pom.xml 中覆盖此默认设置。

```txt
root
  |- src          Contains all of the source material for building the project
  |  |- main        Main build artifact
  |  |  |- java       Application/Library sources  存放我们自己编写的 Java 类
  |  |  |- resources  Application/Library resources  存放 classpath 资源文件
  |  |  |- filters    Resource filter files
  |  |  \- webapp     Web application sources
  |  |- test        Unit test code and resources
  |  |  |- java       Test sources  存放 JUnit 或 TestNG 的 Java 测试类
  |  |  |- resources  Test resources
  |  |  \- filters    Test resource filter files
  |  |- it          Integration Tests (primarily for plugins)
  |  |- assembly    Assembly descriptors
  |  \- site        Site
  |- target/      Output of the build
  |- pom.xml      Project's Project Object Model, the core of a project's configuration in Maven
  |- LICENSE.txt  Project's license
  |- NOTICE.txt   Notices and attributions required by libraries that the project depends on
  \- README.txt   Project's readme
```

注：如果使用的是 IntelliJ IDEA 在根目录还会多出 _.idea/_ 和 _YourProjectName.iml_ ；如果是 Eclipse 会多出 _.settings/_ 、_.classpath_ 和 _.project_ ；如果是 VS Code 则还会在 Eclipse 基础上多出 _.vscode/_ 。


### Introduction to the POM

> 可类比前端的 package.json  
> 项目添加依赖时，可以先在 https://mvnrepository.com/ 中查找依赖包，然后直接拷贝配置信息即可。

Maven 运行时会到项目对象模型(POM，即项目根目录下的 _pom.xml_ 文件)中查看项目信息，如 项目类型、名称、构建定义 等。

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

`name` 和 `url` 是 POM 提供的描述性元素，它们提供了可阅读的信息，将一个项目关联到了项目 web 站点。

最后，示例中的 `dependencies` 元素定义了一个单独的测试范围(test-scoped)依赖，依赖于称为 JUnit 的单元测试框架。

注：`<scope>provided</scope>`- provided 表明该包只在编译和测试的时候用

当 Maven 运行的时候，它是根据项目的 pom.xml 里设置的组合来运行的，最上级的 POM 在 Maven 的安装目录，它定义了全局的默认值。可以在项目中输入命令查看实际使用的所有设置项。

```bash
$ mvn help:effective-pom
```

一旦你运行了此命令，你应该能看到一个大得多的 POM，它暴露了 Maven 的默认设置。



## 构建工具发展史：Ant+Ivy vs Maven vs Gradle

我们写 Java 程序，一般的步骤就是编译，测试，打包。这个构建的过程，如果文件比较少，可以手动使用 `java` `javac` `jar` 命令完成。但当工程越来越大，文件越来越多，手动构建就不太可行了，我们需要构建工具来自动化这些工作。

Linux 下有一个工具叫 `make`，我们可以通过编写 _Makefile_ 来执行工程的构建。Windows 下相应的工具是 `nmake`。这个工具写起来比较罗嗦，所以 Java 从一开始就没有选择它，而是新搞了个 Apache Ant 工具。定义一个任务，规定它的依赖，然后就可以通过 `ant` 来执行这个任务了。下面是一个 `ant` 示例配置文件 _build.xml_ 。

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
    <!-- TODO -->
  </target>
  <target name="clean">
     <delete dir="${dest}"/>
  </target>
</project>
```

可以看到 Ant 的构建脚本还是比较清晰的。定义了5个任务，init, compile, build, test, clean。每个任务做什么也都定义清楚了。打包之前要先编译，所以通过 depends 来指定依赖的路径。如果在命令行里执行 `ant build`，就会先执行 compile，而 compile 又依赖 init，所以会先执行 init。只要一条命令 `ant test` 就可以执行编译、打包、测试，为开发者带来了很大便利。

但 Ant 有一个很致命的缺陷，那就是没办法管理依赖。我们一个工程，要使用很多第三方工具，不同的工具，不同的版本。手动拷贝依赖的 jar 文件到 lib 目录既枯燥还特别容易出错。为了解决这个问题，Ant 一般会搭配 Ivy 使用，由 Ivy 负责依赖管理功能。搭配两套工具才能跑起来还是有些不方便，于是又有了 Apache Maven。Maven 介绍略...

Maven 已经很好了，可以满足绝大多数工程的构建。那为什么我们还需要新的构建工具呢？第一，Maven 使用 xml 进行配置，语法不简洁；第二，也是最关键的，Maven 在约定优于配置这条路上走太远了。Maven 不鼓励你自己定义任务，它要求用户在 Maven 的生命周期中使用插件的方式去工作。使用 Maven 很难灵活地自定义任务。基于这个原因，Gradle 做了很多改进。

Gradle 并不是另起炉灶，它充分地使用了 Maven 的现有资源。继承了 Maven 中仓库，坐标，依赖这些核心概念。文件的布局也和 Maven 相同。但同时，它又继承了 Ant 中 target 的概念，我们又可以重新定义自己的任务(Gradle 中叫做 task)了。



## Nexus

Sonatype 公司的 [Nexus Repository Manager](https://help.sonatype.com/repomanager3) 是一个仓库管理套件，也可用于搭建 Maven 私有仓库，它极大的简化了本地内部仓库的维护和外部仓库的访问。Nexus 不仅支持 *Maven Repositories* 还支持 *npm Registry*，Go Repositories，CoCoaPods Repositories 等诸多 Repository Formats。

### Nexus vs Maven

[Apache Maven](http://maven.apache.org/) is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information.

Historically Nexus Repository Manager started as *a repository manager supporting the Maven repository format* and it continues to include excellent support for users of Apache Maven, Apache Ant/Ivy, Gradle and others.

Maven Central Repository is managed by Sonatype.

Nexus 在服务器端管理各个仓库，而 Maven 负责从客户端访问仓库。

### Repository Manager Concepts

https://help.sonatype.com/repomanager3/repository-manager-concepts

**Repository Formats**

The different repositories use different technologies to store and expose the components in them to client tools. This defines a repository format and as such is closely related to the tools interacting with the repository.

For example, the Maven repository format relies on a specific directory structure defined by the identifiers of the components and a number of XML formatted files for metadata. Component interaction is performed via plain HTTP commands and some additional custom interaction with the XML files.

Other repository formats use databases for storage and REST API interactions, or different directory structures with format specific files for the metadata.

### Nexus 仓库类型

* hosted —— 宿主仓库，通常我们会部署自己的构件到这一类型的仓库，如公司的二方仓库
* proxy —— 代理仓库，代理仓库会从远程仓库(如 Maven 中央仓库)下载并缓存构件
* group —— 仓库组，用来合并多个 hosted / proxy 仓库，只要引入一个仓库组就可使用多个仓库

nexus 3.13 自带的部分仓库的说明：

maven-central：代理仓库，该仓库代理Maven中央仓库，策略为release，因此只会下载和缓存中央仓库中的发布版本的构件。
maven-releases： 宿主仓库，策略为release，用来部署组织内部的发布版本的构件。
maven-snapshots：宿主仓库，策略为snapshots，用来部署组织内部的快照版本的构件。
maven-public：仓库组，包含了以上3个仓库

### 搭建私有仓库

* 节省外网带宽，降低中央仓库负荷
* 加速 Maven 构建
* 建立公司内部公用仓库

Nexus 预定义了 3 个本地仓库：Releases, Snapshots, 3rd Party。



## Maven 安装与配置

### 安装

Windows：下载、解压，并添加 bin 目录到 PATH 环境变量。

```bash
$ brew install maven  # macOS 下使用 brew 更为方便
$ mvn -v
```

```bash
$ mvn -h    # 查看使用帮助
$ mvn package
$ mvn clean deploy site-deploy
```

### 配置

http://maven.apache.org/ref/3.6.3/maven-settings/settings.html

_~/.m2/settings.xml_ 可用于跨项目配置，而每个项目下的 `.mvn` 目录则用于存放特定于项目的配置文件。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd">
  <!-- IMPORTANT: 这里只是罗列了一级配置类目，如果不需要修改，千万不要往配置文件拷贝这些空类目，会覆盖默认设置!! -->
  <localRepository/>
  <interactiveMode/>
  <usePluginRegistry/>
  <offline/>
  <proxies/>
  <servers/>
  <mirrors/>
  <profiles/>
  <activeProfiles/>
  <pluginGroups/>
</settings>
```

### 阿里云镜像

https://help.aliyun.com/document_detail/102512.html

在 `<mirrors></mirrors>` 标签中添加 mirror 子节点:

```xml
<mirror>
  <id>aliyun-central</id>
  <mirrorOf>central</mirrorOf>
  <name>Aliyun Central</name>
  <url>https://maven.aliyun.com/repository/central</url>
</mirror>
<mirror>
  <id>aliyun-jcenter</id>
  <mirrorOf>jcenter</mirrorOf>
  <name>Aliyun Jcenter</name>
  <url>https://maven.aliyun.com/repository/jcenter</url>
</mirror>
```

如果想使用其它代理仓库,可在 `<repositories></repositories>` 节点中加入对应的仓库使用地址。以使用spring代理仓为例：

```xml
<repository>
  <id>spring</id>
  <url>https://maven.aliyun.com/repository/spring</url>
  <releases>
    <enabled>true</enabled>
  </releases>
  <snapshots>
    <enabled>true</enabled>
  </snapshots>
</repository>
```



## Maven 核心概念

### 插件和目标 Plugins and Goals

一个 Maven 插件是单个或者多个目标的集合。像 **Jar 插件** 包含了一组创建 JAR 文件的目标；**Compiler 插件** 包含了一组编译源代码和测试代码的目标；**Surefire 插件** 它包含一组运行单元测试和生成测试报告的目标。

一个目标是一个明确的任务，它可以作为单独的目标运行，或者作为一个大的构建的一部分和其它目标一起运行。目标是 Maven 中的一个工作单元(unit of work)。如，Compiler 插件中的 compile 目标，它用来编译项目中的所有源文件，或者 Surefire 插件中的 test 目标，用来运行单元测试。

目标通过配置属性进行配置，以用来定制行为。在之前的例子中，我们通过命令行参数 `-DgroupId=org.sonatype.mavenbook.ch03` 和 `-DartifactId=simple` 向 Archetype 插件的 create 目标传入了 groupId 和 artifactId 配置参数。

```bash
# clean the project, copy dependencies, and package the project, executed in sequence
mvn clean dependency:copy-dependencies package
```

### 生命周期 Lifecycle

上一节中，我们运行的第二个命令是 `mvn package`。命令行并没有指定一个插件目标，而是指定了一个 Maven 生命周期阶段。一个阶段是在被 Maven 称为“构建生命周期”中的一个步骤。生命周期是包含在一个项目构建中的一系列有序的阶段。Maven 可以支持许多不同的生命周期，但是最常用的生命周期是默认的 Maven 生命周期。

插件目标可以附着在生命周期阶段上。随着 Maven 沿着生命周期的阶段移动，它会执行附着在特定阶段上的目标。每个阶段可能绑定了零个或者多个目标。

#### Maven Phases

Although hardly a comprehensive list, these are the most common default lifecycle phases executed.

* **validate**: validate the project is correct and all necessary information is available
* **compile**: compile the source code of the project
* **test**: test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed
* **package**: take the compiled code and package it in its distributable format, such as a JAR.
* **integration-test**: process and deploy the package if necessary into an environment where integration tests can be run
* **verify**: run any checks to verify the package is valid and meets quality criteria
* **install**: install the package into the local repository, for use as a dependency in other projects locally
* **deploy**: done in an integration or release environment, copies the final package to the remote repository for sharing with other developers and projects.

There are two other Maven lifecycles of note beyond the default list above. They are

* **clean**: cleans up artifacts created by prior builds
* **site**: generates site documentation for this project

Phases are actually mapped to underlying goals. The specific goals executed per phase is dependant upon the packaging type of the project. For example, package executes jar:jar if the project type is a JAR, and war:war if the project type is - you guessed it - a WAR.

#### Built-in Lifecycle Bindings

Default Lifecycle Bindings - Packaging jar / par / rar / war

Phase                  | plugin:goal
-----------------------|-------------------------
process-resources      | resources:resources
compile                | compiler:compile
process-test-resources | resources:testResources
test-compile           | compiler:testCompile
test                   | surefire:test
package                | jar:jar or par:par or rar:rar or war:war
install                | install:install
deploy                 | deploy:deploy

### 坐标 Coordinates

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

### 仓库 Repositories

Maven 仓库按照下面的目录格式来存储构件(注：中央仓库的根目录为 https://repo1.maven.org/maven2/)

```text
/<groupId>/<artifactId>/<version>/<artifactId>-<version>.<packaging>
```

如果 Maven 没有在本地仓库找到构件，会自动从远程仓库下载构件到本地仓库，一旦下载完成后直接从本地仓库取用。

### 依赖管理 Dependency Management

Maven 支持传递性依赖(transitive dependencies)，你只需要在 _pom.xml_ 中加入直接依赖的库，而不需要关心这些库的依赖。如 JUnit 插件，Maven 不只是下载 JUnit 的 JAR 文件，同时为这个 JUnit 依赖下载了一个 POM 文件。Maven 通过分析这个 POM 文件来获取 JUnit 的依赖。

当你把项目的构件安装到本地仓库时，你会发现在 JAR 文件所处目录下，Maven 发布了一个稍微修改过的 _pom.xml_ 版本。

### 站点生成和报告 Site Generation and Reporting

`mvn site` 会在 target/site 目录下生成一个项目 web 站点，载入其中的 index.html 就能看到项目站点的基本情况。



## 问题排查

如果添加了依赖，但还是报找不到 JAR 包，可以将 _～/.m2/repository_ 下相应的包并删除，然后再更新项目试试。如果构件在下载中途出错，Maven 可能会认为本地仓库中已经存在完整版本。

