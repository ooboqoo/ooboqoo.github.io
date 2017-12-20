# Servlet

## Java

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

## Kotlin

Kotlin 写 Servlet 会方便很多：

```kt
package demo.servlet.hello

import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(name = "Home", value = "/home")
class HomeController : HttpServlet() {
    override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        res.contentType = "text/html; charset=utf-8"
        res.writer.println("<h1>你好 Kotlin</h1>")
    }
}
```
