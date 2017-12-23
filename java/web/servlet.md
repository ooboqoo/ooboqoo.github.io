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




## Servlet 3.0 新特性

### 新增注解



### 对文件上传的支持



### 异步处理



