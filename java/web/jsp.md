# JSP

## 概述

JSP（全称Java Server Pages）是由 Sun Microsystems 公司倡导和许多公司参与共同创建的一种使软件开发者可以响应客户端请求，而动态生成 HTML、XML 或其他格式文档的Web网页的技术标准。
JSP 技术是以 Java 语言作为脚本语言的，JSP 网页为整个服务器端的 Java 库单元提供了一个接口来服务于HTTP的应用程序。
JSP文件后缀名为 *.jsp 。

JSP全称Java Server Pages，是一种动态网页开发技术。它使用JSP标签在HTML网页中插入Java代码。标签通常以<%开头以%>结束。
JSP是一种Java servlet，主要用于实现Java web应用程序的用户界面部分。网页开发者们通过结合HTML代码、XHTML代码、XML元素以及嵌入JSP操作和命令来编写JSP。
JSP通过网页表单获取用户输入数据、访问数据库及其他数据源，然后动态地创建网页。
JSP标签有多种功能，比如访问数据库、记录用户选择信息、访问JavaBeans组件等，还可以在不同的网页中传递控制信息和共享信息。

JSP 基于Java Servlet API，因此，JSP拥有各种强大的企业级Java API，包括JDBC，JNDI，EJB，JAXP等等。
JSP页面可以与处理业务逻辑的 Servlet 一起使用，这种模式被Java servlet 模板引擎所支持。



```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>一个简单的JSP页面——显示系统时间</title>
</head>
<body>
<%
  Date date = new Date(); //获取日期对象
  SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //设置日期时间格式
  String today = df.format(date); //获取当前系统日期
%>
当前时间：<%=today%>   <!-- 输出系统时间 -->
</body>
</html>
```

### 指令标识

```jsp
<%@ 指令名 属性1="属性值1" 属性2="属性值2" %>
```

#### page 指令

`import` - 设置JSP导入的类包  
`contentType` - 设置JSP页面的MIME类型和字符编码  
`session` - 默认为true，表示可以使用session对象  
`buffer` - 用于设置JSP的 `out` 输出对象使用的缓冲区大小，默认 8KB  
`errorPage` - 用于指定处理当前JSP页面异常错误的另一个JSP页面，指定的JSP错误处理页面必须设置 `isErrorPage` 属性为true。如果设置该属性，web.xml文件中定义的任何错误页面都将被忽略。

```jsp
<%@ page import="java.util.*" contentType="text/html; charset=utf-8" errorPage="error/loginError.jsp" %>
```

#### include 指令

通过该指令可以在一个JSP页面中包含另一个JSP页面。该指令是静态包含，也就是说被包含文件中的所有内容会被原样包含到改JSP页面中，即使被包含文件中有JSP代码，在包含时也不会被编译执行。因为统一执行，被包含和包含文件中不能有相同名称的变量。

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
<%= 表达式%>  // %= 之间不能有空格
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


### JSP注释

HTML 和 Java 注释都能按原有预期正常工作，另外加一个特殊的隐藏注释：

```jsp
<%-- 注释内容 --%>  此注释不会出现在 HTML 代码中，而 JSP 也不会执行其中代码
```

HTML 注释对JSP嵌入的代码不起作用，因此可以利用它们构成动态的HTML注释文本：

```jsp
<!-- <%=new Date()%> -->
```


## 内置对象

对象速查表


### request 对象


### response 对象


### session 对象


### application 对象


### out 对象


### 其他对象




## JavaBean


## 表达式语言


## 标准标签库



