# 开发环境搭建


## Tomcat

[/devops/#!deploy/tomcat.md](/devops/#!deploy/tomcat.md)


## IntelliJ IDEA CE

### 创建 JavaWeb 工程

Create New Project -> Java Enterprise -> √ Web Application -> JavaWebDemo

建好后项目目录结构如下：

```text
JavaWebDemo       经过后续步骤最终变成：  JavaWebDemo
    |- src                                    |- resources
    |- web                                    |    \- config
    |    \- index.jsp                         |         \- main.properties
    \- JavaWebDemo.iml                        |- src
                                              |    \- com.demo
                                              |         |- HelloServlet
                                              |         \- CountFilter
                                              |- web
                                              |    \- index.jsp
                                              \- JavaWebDemo.iml
```

### 配置 Tomcat

Run -> Edit Configurations -> + -> Tomcat Server -> Local -> Name: Tomcat8.5

注1：要确保勾选了 Plugins -> Tomcat and TomEE Integration，不然看不到 Tomcat Server 设置项。  
注2：JDK 和 Tomcat 需要先提前安装好。

#### CE 版配置

IntelliJ IDEA Community 版不开发 Tomcat 插件，需要安装社区的 Smart Tomcat 插件。

* Settings -> Plugins 搜索并安装 Smart Tomcat
* Run -> Edit Configurations -> Smart Tomcat 进行配置
  * 设置 "Deployment Directory" 为源码中 webapp 目录，如 path/to/project/JavaWebDemo/src/main/webapp
  * 设置 "Context Path" 为 / 或其他指定 URL 根路径
  * 修改 "Server Port" 为 3000 或其他端口

完成配置后，点击右上角或左下角的 "运行 Run" 按钮即可启动项目，修改代码后点击 "重新运行 Rerun" 按钮重启即可。

#### 4种配置热部署的方法

https://www.cnblogs.com/a8457013/p/7866536.html

热部署可以使得修改代码后，无须重启服务器，就可以加载更改的代码。

第1种：修改服务器配置，使得IDEA窗口失去焦点时，更新类和资源

Run -> Edit Configuration -> Tomcat Server -> Tomcat8.5 对以下两个Tab页进行配置：
  * Deployment 确保是 "XXX.war exploded"
  * Server 将 "On 'Update' action" "On frame deactivation" 两项都设为 "update classes and resources"

优点：简单

缺点：
  * 基于JVM提供的热加载仅支持方法块内代码修改
  * 只在 Debug 模式下有效
  * 只在IDEA失去焦点时才会触发热加载，相对加载速度缓慢

第2种：使用 springloaded jar 包，对 Spring 系列框架支持好(不含Spring Boot)  
第3种：使用 spring-boot-devtools 提供的开发者工具，只支持 Spring Boot 项目，支持成员级别的修改热部署。  
第4种：使用 Jrebel 插件实现热部署，强大，对各类框架支持，收费。


### 添加示例内容

#### 添加一个 Servlet

```java
package com.demo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "HelloServlet", urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("<h1>Hello Servlet</h1>");
        response.getWriter().println("session=" + request.getSession(true).getId());
    }
}
```

#### 添加一个 Filter

创建一个过滤器，实现网站访问计数器功能。

scr -右键-> New -> Package -> com.demo -右键-> New -> Filter -> CountFilter

```java
package com.demo;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ResourceBundle;

@WebFilter(filterName = "CountFilter", urlPatterns = {"/index.jsp"})
public class CountFilter implements Filter {
    ResourceBundle rb = ResourceBundle.getBundle("config/main");
    private int count = new Integer(rb.getString("count"));

    public void destroy() { }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws ServletException, IOException {
        count++;
        ServletContext context = ((HttpServletRequest)req).getSession().getServletContext();
        context.setAttribute("count", count);
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException { }
}
```

resources/config/main.properties &nbsp; // resources 为 "Resources Root"

```txt
count=6000
```

index.jsp

```html
<%@ page contentType="text/html;charset=UTF-8" %>
<body>
  欢迎光临，您是本站的第[ <%=application.getAttribute("count")%> ]位访客。
</body>
```

### 调试+打包

https://www.jetbrains.com/help/idea/developing-a-java-ee-application.html#d123323e460



## VS Code






## Maven 开发环境搭建

### 搭建项目框架

#### IDEA 创建 Maven 项目

File -> New -> Project... -> Maven -> Create from archetype -> maven-archetype-webapp

这个模板比较老了，目录结构也不太理想，放这里过一遍便于理解一些老的项目。

#### 添加 Maven 依赖和插件

http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/usage.html

在 `pom.xml` 添加内容为：

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
            <version>3.8.1</version>
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

#### 创建一个 Servlet

创建文件 src/main/java/com/demo/HelloServlet.java

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

在 src/main/webapp/WEB-INF/web.xml 中注册 Servlet

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

#### 添加一个 Filter

创建一个过滤器，实现网站访问计数器功能。

src/main/java/com/demo/CountFilter.java

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

src/main/webapp/WEB-INF/web.xml

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

src/main/webapp/index.jsp

```html
<%@ page contentType="text/html;charset=UTF-8" %>
<body>
  欢迎光临，您是本站的第[ <%=application.getAttribute("count")%> ]位访客。
</body>
```

### 自动部署设置

#### Tomcat 设定

安装 tomcat7-maven-plugin 后，虽然可以启动插件自带的 tomcat7 进行调试，但若想部署到目标环境测试，还需作以下配置：
  * 如果端口有冲突，在 server.xml 中修改端口号
  * 为了实现自动部署，需要在 tomcat-users.xml 中配置管理账号

apache-tomcat-8.5.16/conf/server.xml

```xml
<Connector port="8089" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />  <!-- 为防冲突，原 8080 改 8089 -->
```

apache-tomcat-8.5.16/conf/tomcat-users.xml

```xml
<tomcat-users>
    <role rolename="manager-script"/>
    <role rolename="manager-gui"/>
    <user username="tomcat" password="tomcat" roles="manager-gui, manager-script"/>
</tomcat-users>
```

#### Maven 设置

在项目 Maven 配置文件 pom.xml 中添加部署相关信息：

```xml
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>
    <version>2.2</version>
    <configuration>
        <port>8080</port>
        <url>http://localhost:8089/manager/text</url>
        <server>Tomcat8.5</server> <!-- From Maven settings.xml -->
        <path>/${project.build.finalName}</path>
    </configuration>
</plugin>
```

然后在 `C:\Users\Gavin\.m2` 新建 `settings.xml` 并添加以下内容：

```xml
<server>
    <id>Tomcat8.5</id>
    <username>tomcat</username>
    <password>tomcat</password>
</server>
```

注1：上例中将管理账号和密码放在用户 Maven 配置文件 settings.xml 下，再通过 server 字段建立联系，是出于安全性考虑，如果不关心安全性，完全可以去掉 server 字段，而直接使用 username 和 password 字段配置。

注2：配置好后，实际 `tomcat:deploy` 部署时，要求服务器是开着的，否则无法完成部署。
