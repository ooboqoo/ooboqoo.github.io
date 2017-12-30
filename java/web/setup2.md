# 开发环境搭建

* IDEA 采用社区版，插件少了更清爽，缺失的支持用 Maven 弥补
* Maven 成熟的构建工具，没有采用 Gradle，会 Maven 了迁移到 Gradle 也很方便


## 搭建项目框架

### IDEA 创建 Maven 项目

File -> New -> Project... -> Maven -> Create from archetype -> maven-archetype-webapp

这个结构不好，重新调整下目录：

```text
JavaWebDemo
    |- lib
    |- resources      // 右键 Mark Directory as Resources Root
    |- src            // 右键 Mark Directory as Sources Root
    |    \- com.demo
    |         \- HelloWorld.java
    |- webapp         // pom.xml 下 tomcat7 插件下加配置项 <warSourceDirectory>
    |    |- WEB-INF
    |    |    \- web.xml
    |    \- index.jsp
    |- JavaWebDemo.iml
    \- pom.xml
```

### 添加 Maven 依赖和插件

http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/usage.html

在 `pom.xml` 添加内容为：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.demo</groupId>
    <artifactId>java-web-demo</artifactId>
    <packaging>war</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>java-web-demo Maven Webapp</name>
    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <finalName>java-web-demo</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>9090</port>
                    <warSourceDirectory>webapp</warSourceDirectory> <!-- 默认值 src/main/webapp -->
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


## 添加示例内容

### 创建一个 Servlet

创建文件 src/com/demo/HelloServlet.java

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

在 webapp/WEB-INF/web.xml 中注册 Servlet

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

### 添加一个 Filter

创建一个过滤器，实现网站访问计数器功能。

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

web.xml

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

index.jsp

```html
<body>
  欢迎光临，您是本站的第[ <%=application.getAttribute("count")%> ]位访客。
</body>
```

## 自动部署设置

### Tomcat 设定

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

### Maven 设置

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
