# Servlet API

## javax.servlet

### javax.servlet.Servlet

```java
public interface Servlet { }

public void init(ServletConfig config) throws ServletException;
public ServletConfig getServletConfig();
public String getServletInfo();
// service 是最主要的方法，当客户端请求到来时，容器将调用此方法对请求进行处理
public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException;
public void destroy();
```

### javax.servlet.ServletConfig

```java
public interface ServletConfig { }

public String getServletName();
public String getInitParameter(String name);
public ServletContext getServletContext();
public Enumeration<String> getInitParameterNames();
```

### javax.servlet.ServletRequest

```java
public interface ServletRequest { }

public String getContextPath();
public Object getAttribute(String name);

public Locale getLocale();
public boolean isSecure();
public ServletContext getServletContext();
public BufferedReader getReader() throws IOException;

public String getScheme();
public String getServerName();
public int getServerPort();
```

注：仅部分 API

### javax.servlet.ServletResponse

```java
public interface ServletResponse { }

public ServletOutputStream getOutputStream() throws IOException;
public PrintWriter getWriter() throws IOException;

public String getContentType();
public void setContentType(String type);
public String getCharacterEncoding();
public void setCharacterEncoding(String charset);
public Locale getLocale();
public void setLocale(Locale loc);
```

注：仅部分 API

### javax.servlet.GenericServlet

GenericServlet 类是一个抽象类，分别实现了 Servlet 和 ServletConfig 接口。该类实现了除 `service()` 之外的其他方法，在创建 Servlet 对象时，可以继承 GenericServlet 类来简化程序中的代码。

```java
public abstract class GenericServlet implements Servlet, ServletConfig, java.io.Serializable { }
```


## javax.servlet.http

### javax.servlet.http.HttpServlet

GenericServlet 类实现了 javax.servlet.Servlet 接口，为程序的开发提供了方便，但在实际开发中，大多数的应用都是使用 Servlet 处理HTTP请求，所以直接继承 GenericServlet 仍然不是很方便。

HttpServlet 类仍然是一个抽象类，实现了 `service()` 方法，并针对 HTTP1.1 中定义的7种请求类型提供了相应的方法 `doGet()` `doPost()` `doPut()` `doDelete()` `doHead()` `doTrace()` `doOptions()`，需要开发人员在使用过程中根据实际需要进行重写。

```java
public abstract class HttpServlet extends GenericServlet { }

protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException { }
protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException { }
protected void doPut(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException { }
protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException { }
```

### javax.servlet.http.HttpServletRequest

```java
public interface HttpServletRequest extends ServletRequest { }

public Cookie[] getCookies();
public String getMethod();
public String getQueryString();
public String getRequestURI();        // 返回主机名到请求参数之间的字符串形式
public StringBuffer getRequestURL();  // 注意返回类型，另此URL不包含请求参数
public String getServletPath();
public HttpSession getSession(boolean create);
```

### javax.servlet.http.HttpServletResponse

```java
public interface HttpServletResponse extends ServletResponse { }

public void setHeader(String name, String value);
public void addHeader(String name, String value);
public String getHeader(String name); 
public Collection<String> getHeaders(String name); 
public Collection<String> getHeaderNames();

public void setStatus(int sc, String sm);
public int getStatus();
public void addCookie(Cookie cookie);
public void sendError(int sc, String msg) throws IOException;
public void sendRedirect(String location) throws IOException;
```
