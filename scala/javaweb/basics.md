# 基础知识

## 杂项知识点

#### Maven 与 Gradle

虽然两者都是项目工具，但是 Maven 现在已经是行业标准，Gradle是后起之秀，很多人对他的了解都是从 android studio 中得到的，Gradle 抛弃了 Maven 的基于 XML 的繁琐配置，取而代之的采用了领域特定语言 Groovy 的配置，大大简化了构建代码的行数。

#### Jar 与 War

Java Archive file 通常是开发时要引用通用(JAVA)类，打成包便于存放管理；

Web Archive file 是做好一个(web)应用后，通常是网站，打成包部署到容器中。
将 web 项目以 war 的方式导出后，直接放在 tomcat 容器的 webapps下启动服务，即可运行该项目。




## HTTP 服务器

本人比较喜欢 nginx 跑静态和做负载反向代理，动态 php 还是交给 apache 处理比较稳定，jsp 就交给 tomcat、resin 或 jboss。nginx 跑静态的能力是无与伦比的，是目前 web 服务器里最强的。nginx 和 apache、tomcat、resin 的动静分离配置其实很简单，就几句配置，稳定性也非常好。

### Apache HTTP Server

Apache HTTP Server（简称Apache）是 Apache 软件基金会的一个开放源代码的网页服务器软件，可以在大多数电脑操作系统中运行。由于其跨平台和安全性，被广泛使用，是最流行的Web服务器软件之一。它快速、可靠并且可通过简单的 API 扩充，将 Perl／Python 等解释器编译到服务器中。

Apache 支持许多特性，大部分通过编译的模块实现。这些特性从服务器端的编程语言支持到身份认证方案。一些通用的语言接口支持 Perl，Python，Tcl 和 PHP。流行的认证模块包括 mod_access，mod_auth 和 mod_digest。其他的例子有 SSL 和 TLS 支持（mod_ssl），代理服务器（proxy）模块，很有用的URL重写（由 mod_rewrite 实现），定制日志文件（mod_log_config），以及过滤支持（mod_include 和 mod_ext_filter）。

1996年4月以来，Apache 一直是 Internet 上最流行的 HTTP 服务器：1999年5月它在 57% 的网页服务器上运行，到了2005年7月这个比例上升到了 69%。在2005年11月最风光的时候达到接近 70% 的市占率，不过在部分拥有大量域名的主机域名商转换为 微软IIS 平台后，Apache 市占率近年来呈现些微下滑。同时搜索引擎巨擘 Google 自己的网页服务器平台 GWS 推出后（也可说是一种修改版的 Apache），再加上 nginx、Lighttpd 等轻量化网页服务器软件在市场上有一些能见度，这些因素都反应在整体网页服务器市占率的消长，Apache 的市占率就随之滑落。根据Netcraft 在2009年12月的最新统计数据，Apache 的市占率已经降为 53.67％，IIS 降为 18.26％，谷歌网页服务器 13.53％，nginx 8.75％。

### Nginx

Nginx（发音同engine x）是一个网页服务器，它能反向代理 HTTP, HTTPS, SMTP, POP3, IMAP 的协议链接，以及一个负载均衡器和一个 HTTP 缓存。

Nginx在官方测试的结果中，能够支持五万个平行连接，而在实际的运作中，可以支持二万至四万个平行链接。

自 PHP-5.3.3 起，PHP-FPM 加入到了 PHP 核心，编译时加上 --enable-fpm 即可提供支持。 PHP-FPM 以守护进程在后台运行，Nginx 响应请求后，自行处理静态请求，PHP 请求则经过 fastcgi_pass 交由 PHP-FPM 处理，处理完毕后返回。 Nginx 和 PHP-FPM 的组合，是一种稳定、高效的 PHP 运行方式，效率要比传统的 Apache 和 mod_php 高出不少。

### mod_php、CGI、FastCGI 与 PHP-FPM

mod_php 是在 lamp 体系中最常使用的工作方式，在这种模式下，php 被编译为 apache 的一个内置模块，在启动时加载。当有一个 php 请求过来时，直接在 httpd 进程里完成 php 的解析运行，将结果返回。

CGI 通用网关接口 Common Gateway Interface 是一段程序（可以是Python脚本，PERL脚本，C或者C++程序等）。普通 CGI 的工作流程：apache 收到用户请求，并把请求提交给 CGI 程序，CGI 程序根据请求提交的参数作相应处理，然后输出标准的 html 语句返回给 apache。

web server 收到请求后，会启动对应的 CGI 程序，譬如 PHP 解析器，然后 PHP 解析器会解析 php.ini 文件，初始化执行环境，然后处理请求，返回结果再推出进程。每个请求都需要执行初始化的过程，明显存在性能问题，所有就有了 FastCGI，FastCGI 会先开启一个 master，解析配置文件，初始化执行环境，然后再启动多个 worker，当请求过来时，就传递给 worker 去处理，效率明显提高。

FastCGI 在运行过程中，如果修改了配置文件，必须重启 FastCGI 进程，PHP-FPM（FastCGI Process Manager）就是为解决这个问题而生的，当配置文件修改后，会启动新的 FastCGI 进程来处理新请求，而原有的进程在完成所有响应后再关闭，实现了平滑重启。

Apache 或 Nginx 都可以搭配 PHP-FPM 来实现 PHP 解析。

### Apache Tomcat

Tomcat 是由 Apache 软件基金会下属的 Jakarta 项目开发的一个 **Servlet容器**，按照 Sun Microsystems 提供的技术规范，实现了对 Servlet 和 JavaServer Page (JSP) 的支持。Tomcat 本身也内含了一个 HTTP 服务器，它也可以被视作一个单独的 Web 服务器。Apache Tomcat 包含了一个配置管理工具，也可以通过编辑 XML 格式的配置文件来进行配置。

Tomcat 的 Servlet 引擎通常与 Apache 或者其他 Web 服务器一起工作。除了用于开发过程中的调试以及那些对速度和事务处理只有很小要求的用户，很少会将 Tomcat 单独作为 Web 服务器。但随着版本的更新，正有越来越多的用户将其单独作为 Web 服务器用以那些对速度和可靠性有较高要求的环境中。

### LAMP

LAMP 是指一组通常一起使用来运行动态网站或者服务器的自由软件名称首字母缩写：
  * Linux，操作系统
  * Apache，网页服务器
  * MariaDB 或 MySQL，数据库管理系统（或者数据库服务器）
  * PHP Perl 或 Python，脚本语言

## JavaWeb 基础

Tomcat 运行在 JVM 之上，它和 HTTP 服务器一样，绑定 IP 地址并监听 TCP 端口，同时还包含以下指责：管理 Servlet 程序的生命周期将 URL 映射到指定的 Servlet 进行处理与 Servlet 程序合作处理 HTTP 请求——根据 HTTP 请求生成 HttpServletResponse 对象并传递给 Servlet 进行处理，将 Servlet 中的 HttpServletResponse 对象生成的内容返回给浏览器虽然 Tomcat 也可以认为是 HTTP 服务器，但通常它仍然会和 Nginx 配合在一起使用：动静态资源分离——运用 Nginx 的反向代理功能分发请求：所有动态资源的请求交给 Tomcat，而静态资源的请求（例如图片、视频、CSS、JavaScript文件等）则直接由 Nginx 返回到浏览器，这样能大大减轻 Tomcat 的压力。负载均衡，当业务压力增大时，可能一个 Tomcat 的实例不足以处理，那么这时可以启动多个 Tomcat 实例进行水平扩展，而 Nginx 的负载均衡功能可以把请求通过算法分发到各个不同的实例进行处理

