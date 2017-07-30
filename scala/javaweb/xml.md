# XML




## IDEA + Maven + Tomcat 开发环境搭建

* IDEA 采用社区版，插件少了更清爽，缺失的支持用 Maven 弥补
* Maven 成熟的构建工具，没有采用 Gradle，会 Maven 了迁移到 Gradle 也很方便

### Tomcat 设定

> 经试验，Maven 装了 tomcat7 插件后，跟我本地的 Tomcat8.5 没有关系，这里的配置和 Maven 的 server 配置项都不需要

为了构建集成开发环境，需要做额外的配置：
  * 如果端口有冲突，在 server.xml 中修改端口号
  * 为了实现自动部署，需要在 tomcat-users.xml 中配置管理账号

```xml
  <role rolename="manager-script"/>
  <role rolename="manager-gui"/>
  <user username="tomcat" password="tomcat" roles="manager-gui, manager-script"/>
```

### Maven 设置

如果单独安装 Maven 的话，需要先下载解压 Maven，再设定好环境变量，这里直接使用 IDEA 继承的 Maven 插件。


然后在 C:\Users\Gavin\.m2 新建 settings.xml 并添加以下内容

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

### IDEA 创建 Maven 项目

File -> New -> Project... -> Maven -> Create from archetype -> maven-archetype-webapp

#### 安装并配置 tomcat 插件

在 pom.xml 添加内容为：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>demo.servlet</groupId>
    <artifactId>hello-server</artifactId>
    <version>1.0-SNAPSHOT</version>
    <build>
        <finalName>hello</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>8080</port>
                    <url>http://localhost:8080/manager/text</url>
                    <server>Tomcat8.5</server>
                    <path>/${project.build.finalName}</path>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

点击右侧 Maven Projects 打开面板，再点击 reimport All Maven Projects

随便修改下 index.jsp 里的内容，然后点击 Maven 面板里的 Execute Maven Goal，然后输入命令 `tomcat7:run` 就能自动启动服务器了。












