# Tomcat 服务器

http://tomcat.apache.org/tomcat-8.5-doc/index.html

### 安装配置

1. 下载并配置好 JRE 或 JDK
2. 下载 Tomcat http://tomcat.apache.org
3. 安装 解压即可
4. 设置环境变量 `CATALINA_HOME` 为 `D:\Program Files\Java\apache-tomcat-8.5.16`

### 启动服务器

CMD 终端输入以下两行中的任意一行命令即可启动服务器，注意不要关闭终端。

```text
$ cd %CATALINA_HOME%
$ bin\startup.bat
$ bin\catalina.bat start
```

在浏览器输入 http://localhost:8080 看到 Tomcat 界面就说明一切正常

可通过快捷键 `Ctrl+C` 或运行命令 `bin\shutdown.bat` 来关闭服务器

### Tomcat 服务器的目录结构

```text
tomcat
  |- bin      存放启动和停止服务器的命令
  |- conf     存放服务器的各种配置文件
  |- lib      存放服务器所需的各种 JAR 文件，及第三方依赖
  |- logs     存放日志文件
  |- temp     存放服务器运行时的临时文件
  |- webapps  存放 javaWeb 应用的目录
  \- work     存放由 JSP 生成的 Servlet 文件
```

### Hello World

在 webapps 目录下新建立以下目录结构：

```text
demo
  |- WEB-INF
  |   |- classes
  |   |- lib
  |   |- web.xml
  \- index.jsp
```

web.xml (其他项目拷贝一个，只保留最外层的 web-app 即可)

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
  version="3.1"
  metadata-complete="true">
</web-app>
```

index.jsp (就是标准的 HTML，偷懒只写了内容，当然也可以是 index.html)

```html
<h1>Hello World</h1>
```

### WEB-INF 目录介绍

WEB-INF 目录是 Java Web 应用的安全目录，所谓安全，就是客户端无法访问，只有服务端可以访问该目录。

```text
WEB-INF
 |- classes  用以放置 *.class 文件
 |- lib      第三方 jar 包
 \- web.xml  项目配置文件
```
