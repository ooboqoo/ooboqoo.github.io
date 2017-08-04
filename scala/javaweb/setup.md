# IDEA + Maven + Tomcat 开发环境搭建

* IDEA 采用社区版，插件少了更清爽，缺失的支持用 Maven 弥补
* Maven 成熟的构建工具，没有采用 Gradle，会 Maven 了迁移到 Gradle 也很方便。

### Tomcat 设定

> 经试验，Maven 装了 tomcat7 插件后，跟我本地的 Tomcat8.5 没有关系，这里的配置和 Maven 的 server 配置项都不需要

为了构建集成开发环境，需要做额外的配置：
  * 如果端口有冲突，在 server.xml 中修改端口号
  * 为了实现自动部署，需要在 tomcat-users.xml 中配置管理账号

server.xml

```xml
<Connector port="8089" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />  <!-- 原 8080 改 8089 -->
```

tomcat-users.xml

```xml
<tomcat-users>
  <role rolename="manager-script"/>
  <role rolename="manager-gui"/>
  <user username="tomcat" password="tomcat" roles="manager-gui, manager-script"/>
</tomcat-users>
```

### Maven 设置

如果单独安装 Maven 的话，需要先下载解压 Maven，再设定好环境变量，这里直接使用 IDEA 集成的 Maven 插件。

然后在 `C:\Users\Gavin\.m2` 新建 `settings.xml` 并添加以下内容

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  <servers>
    <server>
      <id>Tomcat8.5</id>
      <username>tomcat</username>
      <password>tomcat</password>
    </server>
  </servers>
</settings>
```

### IDEA 创建 Maven 项目

File -> New -> Project... -> Maven -> Create from archetype -> maven-archetype-webapp

#### 安装并配置 tomcat 插件

在 `pom.xml` 添加内容为：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>demo.servlet</groupId>
    <artifactId>hello-server</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
      <dependency>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>tomcat-servlet-api</artifactId>
        <version>8.5.0</version>
        <scope>provided</scope>
      </dependency>
    </dependencies>
    <build>
        <finalName>hello</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>9090</port>
                    <url>http://localhost:8089/manager/text</url>
                    <server>Tomcat8.5</server> <!-- From Maven settings.xml -->
                    <path>/${project.build.finalName}</path>
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
> * `tomcat:deploy` 则会连接指定 Tomcat 实例进行部署，如上例中 8089 上的 Tomcat 实例，此时要求服务器是启动的，且要配置好 url 以及管理账号和密码，否则无法完成部署。
> * 上例中将管理账号和密码放在用户 Maven 配置文件 settings.xml 下，再通过 server 建立联系，这是出于安全性考虑，如果不关心安全性，完全可以去掉 server 字段，而直接使用 username 和 password 字段配置。

#### Jetty 方案

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
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.deploy>deploy</project.deploy>
    <jettyVersion>9.4.6.v20170531</jettyVersion>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.eclipse.jetty</groupId>
      <artifactId>jetty-server</artifactId>
      <version>${jettyVersion}</version>
    </dependency>
  </dependencies>
  <build>
    <finalName>hello-server</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-maven-plugin</artifactId>
        <version>${jettyVersion}</version>
        <configuration>
          <scanIntervalSeconds>10</scanIntervalSeconds>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```
