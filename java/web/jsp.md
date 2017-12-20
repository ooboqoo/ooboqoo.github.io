# JSP

## 基本语法

JSP全称Java Server Pages，是一种动态网页开发技术。它使用JSP标签在HTML网页中插入Java代码。JSP文件后缀名为 `.jsp`。

JSP标签有多种功能，比如访问数据库、记录用户选择信息、访问JavaBeans组件等，还可以在不同的网页中传递控制信息和共享信息。

```jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*, java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>一个简单的JSP页面——显示系统时间</title>
</head>
<body>
<%
  SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  String now = df.format(new Date());
%>
当前时间：<%=now%>   <!-- 输出系统时间 -->
</body>
</html>
```

### 指令标识

```jsp
<%@ 指令名 属性1="属性值1" 属性2="属性值2" %>
```

#### page 指令

* `import` - 设置JSP导入的类包
* `contentType` - 设置JSP页面的MIME类型和字符编码
* `session` - 默认为true，表示可以使用session对象
* `buffer` - 用于设置JSP的 `out` 输出对象使用的缓冲区大小，默认 8KB
* `errorPage` - 用于指定处理当前JSP页面异常错误的另一个JSP页面，指定的JSP错误处理页面必须设置 `isErrorPage` 属性为true。如果设置该属性，web.xml文件中定义的任何错误页面都将被忽略。

```jsp
<%@ page import="java.util.*" contentType="text/html; charset=utf-8" errorPage="error/loginError.jsp" %>
```

#### include 指令

通过该指令可以在一个JSP页面中包含另一个JSP页面。该指令是静态包含，也就是说被包含文件中的所有内容会被原样包含到该JSP页面中，即使被包含文件中有JSP代码，在包含时也不会被编译执行。打包成一个文件后才开始编译执行，因此，被包含和包含文件中不能有相同名称的变量。

```jsp
<%@ include file="path/to/file" %>
```

#### taglib 指令

声明该页面中所使用的标签库，并指定标签的前缀。

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```


### 脚本标识

#### JSP表达式

```jsp
<%=表达式%>  // %= 之间不能有空格
```

#### 声明标识

```jsp
<%! 声明变量或方法的代码 %>
```

代码片段与声明标识的区别是：
  * 通过声明标识创建的变量和方法在当前JSP页面中有效，它的生命周期是从创建开始到服务器关闭
  * 代码片段创建的变量和方法，也是在当前JSP页面有效，它的生命周期从页面关闭后就会被销毁

#### 代码片段

```jsp
<% Java代码或脚本代码 %>
```

### 动作标识

#### 包含文件标识 `<jsp:include>`

```jsp
<jsp:include page="url" flush="false" />
```

通过该标识包含文件，会先执行再包含。

`include`指令与 `<jsp:include>`动作标识的区别：
  * 指令标识通过 file 属性指定文件，此属性不支持任何表达式；动作标识通过 page 属性，改属性支持JSP表达式
  * 指令标识先生成完整文件再编译成Java类；动作标识会转发请求到被包含文件，执行完后合入输出内容再继续
  * 指令标识是先合并文件再编译，所以变量名和方法不能重复；而动作标识因为是分别编译执行，不受此限制

#### 请求转发标识 `<jsp:forward>`

```jsp
<jsp:forward page="url" />
```

执行请求转发后，当前页面将不再被执行，而是去执行该标识指定的目标页面。

#### 传递参数标识 `<jsp:param>`

`<jsp:param>` 可以作为其他标识的子标识，用于为其他标识传递参数。

```jsp
<jsp:forward page="modify.jsp">
  <jsp:param name="userId" value="7" />
</jsp:forward>
```

### JSP注释

HTML 和 Java 注释都能按原有预期正常工作，另外加一个特殊的隐藏注释：

```jsp
<%-- 注释内容 --%>  此注释不会出现在 HTML 代码中，而 JSP 也不会执行其中代码
```

HTML 注释对JSP嵌入的代码不起作用，因此可以利用它们生成动态的HTML注释文本：

```jsp
<!-- <%=new Date()%> -->
```


## 内置对象

[javax.servlet.jsp.PageContext](https://docs.oracle.com/javaee/7/api/javax/servlet/jsp/PageContext.html)

JSP提供了由容器实现和管理的内置对象，也可以称之为隐含对象，这些内置对象不需要通过JSP页面编写来实例化，在所有的JSP页面中都可以直接使用，它们起到了简化页面的作用。

JSP定义了9个内置对象，分别为 request response session application out pageContext config page 和 exception。

### request 对象

#### 访问请求参数

```java
String request.getParameter(String pname)  // 如果参数不存在返回 null
```

#### 在作用域中管理属性

在进行请求转发时，需要把一些数据传递到转发后的页面进行处理，这时就需要使用 setAttribute() 方法将数据保存到 request。

```java
request.setAttribute(String name, Object object);  // A页面设置属性
request.getAttribute(String name);  // B页面获取属性
```

#### 获取 cookie

* 通过 request.getCookies() 取得所有cookie对象的集合
* 通过 cookie.getName() 获取cookie的 name
* 通过 cookie.getValue() 获取cookie的 value
* 通过 response.addCookie() 将一个cookie发送到客户端

```java
Cookie[] cookies = request.getCookies();  // javax.servlet.http.Cookie
if (cookies != null) {
    for (int i = 0; i < cookies.length; i++) {
        if (cookies[i].getName().equals("somename")) { /* ... */ }
    }
}
```

#### 解决中文乱码

```java
new String(request.getParameter("name").getBytes("ISO-8859-1"), "UTF-8");
```

#### 获取客户端信息

详见 [javax.servlet.http.HttpServletRequest](https://docs.oracle.com/javaee/7/api/index.html?javax/servlet/http/HttpServletRequest.html)

#### 显示国际化信息

浏览器可以通过 `accept-language` 的HTTP报头向Web服务器指明它所使用的本地语言。request 对象的 getLocale() 和 getLocales() 方法允许JSP开发人员获取这一信息。

```java
java.util.Locale locale = request.getLocale();
String str = "";
switch(locale) {
    case java.util.Locale.US: str = "Hello"; break;
    case java.util.Locale.CHINA: str = "你好"; break;
}
```

### response 对象

```java
// 重定向网页
response.sendRedirect(String path);  // 与转发不同，此法在浏览器实现，浏览器将获得新地址

// 处理 HTTP 响应头
response.setHeader("Cache-Control", "no-store");   // 禁用缓存
response.setHeader("refresh", "10");               // 设置页面自动刷新
response.setHeader("refresh", "5;URL=login.jsp");  // 5s后自动跳转到其他页面

// 设置输出缓冲
response.setBufferSize(32);  // 缓冲单位 KB，无法更改
```

### session 对象

session 对象存续时长取决于服务器配置，Tomcat 默认为 30 分钟。

通过 session 对象可以存储或读取客户相关的信息，通过 setAttribute() 和 getAttribute() 方法实现。

```java
session.setAttribute("usename", "绿草");
String user = (String)session.getAttribute("usename");  // 返回类型为 Object，需强转或调用 toString()
session.removeAttribute("username");
session.invalidate();  // 被销毁后再调用 session 对象的方法都将报错
session.setMaxInactiveInternal(10000);  // 设置有效期为 10000秒 
```

### application 对象

application 对象用于保存所有应用程序中的公有数据。它在服务器启动时自动创建，在服务器停止时销毁。所有用户都可以共享该 application 对象。

```java
application.getInitParameter(String name);  // 获取应用程序初始化参数，在 web.xml 的 <context-param> 中配置
application.getAttribute(String name);      // 获取某个属性值
```

### out 对象

out 对象最基本的应用就是向客户端输出信息，另一个比较重要的功能就是对缓冲区进行管理。

```java
out.print("不换行");
out.println("换行");
out.flush();
```

### 其他对象

这几个对象实际开发中不常用。

#### 获取会话范围的 pageContext 对象

获取页面上下文的 pageContext 对象是一个比较特殊的对象，通过它可以获取JSP页面的 request response session 等对象，实际开发中很少使用。

#### 读取 web.xml 配置信息的 config 对象

config 对象主要用于取得服务器的配置信息。当一个 Servlet 初始化时，容器把某些信息通过 config 对象传递给这个 Servlet。

```java
config.getServletContext();  // 获取 Servlet 上下文
config.getServletName();     // 
config.getInitParameter();   // 
config.getInitParameterNames();  // 
```

#### 应答或请求的 page 对象

page 对象代表JSP本身，可以看做是 this 关键字的别名。

#### 获取异常信息的 exception 对象

exception 对象用来处理JSP文件执行时发生的所有错误和异常，只有在 page 指令中设置 isErrorPage 属性值为 true 的页面中才可以被使用。


## JavaBean

在JSP网页开发的初级阶段，并没有所谓的框架和逻辑分层概念，JSP网页代码是与业务逻辑代码写在一起的。这种凌乱的代码书写方式，给程序的调试及维护带来了很大的困难，直至 JavaBean 的出现，这一问题才得到了改善。

JavaBean 的产生，使JSP页面中的业务逻辑变得更加清晰。程序中的实体对象和业务逻辑可以单独封装到Java类中，JSP页面通过自身操作JavaBean的动作标识对其进行操作。这样不仅提高了程序的可读性、易维护性，而且还提高了代码的可重用性。

### JavaBean 介绍

JavaBean是特殊的Java类，遵守 JavaBean API 规范。相比其它Java类具有以下特征：
  * 提供一个默认的无参构造函数。
  * 需要被序列化并且实现了 Serializable 接口。
  * 可能有一系列可读写属性。
  * 可能有一系列的 getter 或 setter 方法。

### JSP中应用 JavaBean

JSP页面中主要通过JSP动作标签 `<jsp:useBean>` `<jsp:getProperty>` `<jsp:setProperty>` 来实现对JavaBean对象的操作。

将JavaBean对象应用到JSP页面中，JavaBean的生命周期可以自行进行设置，存在4中范围 page request session 和 application，默认为 page。

```java
package demo.bean;
public class Person {
    private String name;
    private int age;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>注册页</title>
</head>
<body>
添加用户信息
<form action="reg.jsp" method="post">
    姓　名：<input type="text" name="name"><br>
    年　龄：<input type="text" name="age"><br>
    <input type="submit" value="添 加">
</form>
</body>
</html>
```

```html
<%@ page contentType="text/html;charset=UTF-8" %>
<% request.setCharacterEncoding("UTF-8");  // 不然中文乱码 %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>注册成功</title>
</head>
<body>
<jsp:useBean id="person" class="demo.bean.Person" scope="page">
    <jsp:setProperty name="person" property="*" />
</jsp:useBean>
姓　名：<jsp:getProperty property="name" name="person" /><br>
年　龄：<jsp:getProperty property="age" name="person" />
</body>
</html>
```


## 表达式语言


## 标准标签库

类目
+ 数据库操作
+ 综合案例



<script>ooboqoo.contentsRegExp = /H[123]/;</script>
