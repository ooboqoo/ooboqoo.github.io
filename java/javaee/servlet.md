# Servlet

https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServlet.html

## 示例

### Java

```java
package demo.servlet.hello;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        res.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = res.getWriter();
        out.write("<h1>Hello Servlet</h1>");
        out.println("session=" + req.getSession(true).getId());
        out.flush();
        out.close();
    }
}
```

需要在 web.xml 中注册后才能访问到：

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="3.0">
  <display-name>Archetype Created Web Application</display-name>
  <servlet>
    <servlet-name>Hello</servlet-name>
    <servlet-class>demo.servlet.hello.HelloServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Hello</servlet-name>
    <url-pattern>/hello</url-pattern>
  </servlet-mapping>
</web-app>
```

### Kotlin

```kt
package demo.servlet.hello

import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(name = "Home", value = "/home")
class HomeController : HttpServlet() {
    override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        res.contentType = "text/html; charset=utf-8"  // 直接操作属性
        res.writer.println("<h1>你好 Kotlin</h1>")
    }
}
```


## 基础

Servlet 是运行在Web服务器的Java应用程序。与普通Java程序的区别是，Servlet对象主要封装了对HTTP请求的处理，它的运行需要Servlet容器的支持。

### 结构体系

Servlet实质上就是按Servlet规范编写的Java类。

```java
public abstract class HttpServlet extends GenericServlet { }
public abstract class GenericServlet implements Servlet, ServletConfig, Serializable { }
```

### 技术特点 

功能强大、可移植、性能高效、安全性高、可扩展

Servlet对象在容器启动时被初始化，当第一次被请求时，Servlet将其实例化，此时它驻存于内存中。如果存在多个请求，不需要重复实例化。每个请求是一个线程，而不是一个进程，因此，Servlet对请求的处理性能是十分高效的。

### Servlet与JSP的区别

在JSP产生之前，无论是页面设计还是业务逻辑代码都需要编写于Srevlet中。虽然Servlet在功能方面很强大，完全可以满足对Web应用的开发需求，但如果每一句HTML代码都由Servlet的固定方法来输出，则操作会过于复杂。

* 角色不同
* 编程方法不同
  - Servlet代码中，调用Servlet提供的API接口方法对HTTP请求及业务进行处理，对于业务逻辑方面的处理功能更加强大。
  - JSP页面中，通过HTML代码与JSP内置对象实现对HTTP请求及页面的处理，其显示界面的功能更加强大。
* Servlet需要编译后运行
  - Servlet需要在Java编译器编译后才可以运行，如果修改后没有被重新编译，则不能运行在Web容器中。
  - JSP由 JSP Container 对其进行管理，不需要对其编译即可执行。
* 速度不同
  - JSP更改后会自动编译，但效率低于Servlet。

### Servlet 代码结构

```java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {
    public void init() throws ServletException { }
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException { }
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException { }
    public void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException { }
    public void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException { }
    public void destroy() { super.destroy(); }
}
```


## Servlet 开发

### Servlet 创建

创建一个普通的 Java 类，使这个类继承 HttpServlet 类，再通过手动配置 web.xml 文件注册 Servlet 对象。这样操作比较麻烦，通常可以通过 IDE 快捷创建 Servlet。

### Servlet 配置

要使Servlet对象正常运行，需要进行适当的配置，以告知Web容器哪一个请求调用哪一个Servlet对象处理，即注册Servlet。Servlet的配置包含在 web.xml 中，主要通过以下两步进行设置。

#### 声明 Servlet 对象

通过 `<servlet>` 标签声明一个 Servlet 对象。在此标签下包含两个主要子元素，分别为 `<servlet-name>` `<servlet-class>`。其中，`<servlet-name>` 元素用于指定 Servlet 的名称，改名称可以为自定义的名称；`<servlet-class>` 用于指定 Servlet 对象的完整位置，包含对象的包名与类名。

#### 映射 Servlet

在 web.xml 中声明了 Servlet 对象后，需要映射访问 Servlet 的 URL。改操作使用 `<servlet-mapping>` 标签进行配置。`<servlet-mapping>` 标签包含两个子元素 `<servlet-name>` `<url-pattern>`。其中 `<servlet-name>` 元素与 `<servlet>` 标签中的 `<servlet-name>` 元素相对应；`<url-pattern>` 元素用于映射访问 URL。


## 过滤器和监听器

### 过滤器

Servlet过滤器用于拦截客户端(浏览器)与目标资源的请求，并对这些请求进行一定过滤处理再发送给目标资源。

如果在web窗口中部署了过滤器链，也就是部署了多个过滤器，请求会依次按照过滤器顺序进行处理，最后再转交目标资源进行处理。目标资源在处理了经过过滤的请求后，其回应信息再次从最后一个过滤器依次传递到第一个过滤器，最后传送到客户端。

注：使用过滤器并不一定要将请求传递到下一过滤器或目标资源，如果业务逻辑需要，也可以在过滤处理后直接返回信息给客户端。

```text
      |--------- web 服务器 ------------|
 客 --|-> 过 ---> 过 ---> 过 ---> 目    |
 户   |   滤      滤      滤      标    |
 端 <-|-- 器 <--- 器 <--- 器 <--- 资源  |
```

#### 创建与配置过滤器

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

#### 应用示例

##### 字符编码过滤器

```java
9.2
```

### 监听器

Servlet 中定义了一些事件，可以针对这些事件来编写相关的事件监听器，从而对事件作出响应处理。

Servlet监听器可以监听由于Web应用中状态改变而引起的Servlet容器产生的相应事件，然后接受并处理这些事件。

|          Listener 接口          |     Event 类
|---------------------------------|------------------------------
| ServletContextListener          | ServletContextEvent
| ServletContextAttributeListener | ServletContextAttributeEvent
| HttpSessionListener             | HttpSessionEvent
| HttpSessionActivationListener   | HttpSessionEvent
| HttpSessionAttributeListener    | HttpSessionBindingEvent
| HttpSessionBindingListener      | HttpSessionBindingEvent
| ServletRequestListener          | ServletRequestEvent
| ServletRequestAttributeListener | ServletRequestAttributeEvent

#### Servlet 上下文监听

Servlet 上下文监听可以监听 ServletContext 对象的创建、删除以及属性添加、删除和修改操作，该监听器需要用到如下两个接口：

```java


```

创建监听器：

```java
public class MyContentListener implements ServletContextListener { }
```

注册监听器：

```xml
<listener>
  <listener-class>com.demo.listener.MyContentListener</listener-class>
</listener>
```

#### HTTP 会话监听


#### Servlet 请求监听

#### 示例-统计在线人数



## Servlet 3.0 新特性

### 新增注解

新增注释是Servlet3.0中的重大革新之一。通过使用注释就无须在web.xml文件中对Servlet或者过滤器进行配置。新增的注释有 `@WebServlet` `@WebFilter` `@WebListener` `@WebInitParam` 等。

#### `@WebServlet`

|||||
|-------------------------|----------------|-------------------|----------------------------------------
| `name`                  | String         | `<servlet-name>`  | 名字，如没有显式指定则为类的全限定名
| `value` / `urlPatterns` | String[]       | `<url-pattern>`   | URL匹配模式
| `loadOnStartup`         | int            | `load-on-startup` | 加载顺序
| `initParams`            | WebInitParam[] | `init-param`      | 初始化参数
| `asyncSupported`        | boolean        | `async-supported` | 是否支持异步操作模式
| `description`           | String         | `description`     | 描述信息
| `displayName`           | String         | `display-name`    | 显式名

#### `@WebFilter`

|||||
|-------------------------|----------------|-------------------|----------------------------------------
| `filterName`            | String         | `<filter-name>`  | 名字，如没有显式指定则为类的全限定名
| `value` / `urlPatterns` | String[]       | `<url-pattern>`   | URL匹配模式
| `servletNames`          | String[]       |                   | 指定过滤器将应用于哪些 Servlet
| `initParams`            | WebInitParam[] | `init-param`      | 初始化参数
| `asyncSupported`        | boolean        | `async-supported` | 是否支持异步操作模式
| `description`           | String         | `description`     | 描述信息
| `displayName`           | String         | `display-name`    | 显式名
| `dispatcherTypes`       | DispatcherType |                   | 指定过滤器转发模式，具体取值包括<br> `ASYNC` `ERROR` `FORWARD` `INCLUDE` `REQUEST`

```java
@WebFilter(filterName="char", urlPatterns="/*")
public class CharFilter implements Filter { }
```

#### `@WebListener`

可以使用 `@WebListener` 来标注一个实现 ServletContextListener ServletContextAttributeListener ServletRequestListener ServletRequestAttributeListener HttpSessionListener 和 HttpSessionAtrributeListener 的类。

`@WebListener` 注释有一个 value 可选属性，用于描述监听器信息。

```java
@WebListener("description here")
public class MyContentListener implements ServletContextListener {}
```

#### `@WebInitParam`

改注释等价于 web.xml 中的 `<init-param>` 子标签，该注释通常不单独使用，而是配合 `@WebServlet` 或 `@WebFilter` 使用。

||||||
|---------------|--------|------|----------------|----------
| `name`        | String | 必填 | `<param-name>` | 参数名
| `value`       | String | 必填 | `param-value`  | 参数值
| `description` | String | 可选 | `description`  | 参数描述

```java
@WebServlet(name="SimpleServlet", urlPatterns={"/simple"},
        initParams={ @WebInitParam(name="username", value="tom") })
public class SimpleServlet extends HttpServlet { }
```

### 对文件上传的支持

在 Servlet3.0 之前处理文件上传是一件非常麻烦的事情，而现在则可以非常方便地实现文件的上传，只需要做以下两点：
  * 添加 `@MultipartConfig` 注释
  * 从 request 对象中获取 Part 文件对象

`@MultipartConfig` 注释需要标注在 `@WebServlet` 注释之上，其具有的属性如下：

||||
|---------------------|--------|------------------------------------------------------
| `fileSizeThreshold` | int    | 当数据量大于该值时，内容将被写入文件
| `location`          | String | 存放生成的文件地址
| `maxFileSize`       | long   | 允许上传的文件最大值，默认为 -1，即不做限制
| `maxRequestSize`    | long   | 针对该 multipart/form-data 请求的最大数量，默认为 -1

除了要配置 `@MultipartConfig` 注解之外，还需要两个重要的方法 `getPart()` `getParts()`。

上传文件用 javax.servlet.http.Part 对象来表示，Part 接口提供了处理文件的简易方法，如 `write()` `delete()`。

P192 示例

### 异步处理

异步处理是 Servlet3.0 最重要的内容之一。




