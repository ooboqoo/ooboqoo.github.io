# Java 后端开发

http://docs.oracle.com/javase/specs  
https://javaee.github.io/servlet-spec  



## 学习指南

https://www.oschina.net/question/12_52027 初学 JavaWeb 开发，请远离各种框架，从 Servlet 开始  
https://www.zhihu.com/question/21142149 看完这个就知道该学啥该怎么学了

<h5>学习路径</h5>

1. Java 基础(语言本身、核心开发技术、标准库)
2. Servlet + JSP + JDBC
3. SSM (Spring + SpringMVC + Mybatis)
4. Spring Boot

注：学基础时可以看看廖雪峰的 Java 教程 https://www.liaoxuefeng.com/wiki/1252599548343744



## Java 概述

https://www.oracle.com/java/

<h5>Java 语言发展史</h5>

* 詹姆斯·高斯林 (James Gosling)
* SUN (Stanford University Network，斯坦福大学网络公司)
* Java 咖啡 -> 咖啡生产地 印尼爪哇岛

<h5>Java 语言平台</h5>

* Java SE (Java Platform, Standard Edition) 标准版，面向桌面应用市场
* Java EE (Java Platform, Enterprise Edition) 企业版，面向服务器市场，包含 Servlet、JSP 等
* Java ME (Java Platform, Micro Edition) 移动版，面向消费电子产品市场，就没流行过，跟 Android 不是同一个东东

<h5>Java 语言版本</h5>

https://en.wikipedia.org/wiki/Java_version_history

||||
-----------------|----------|--------
JDK 1.0          | 1996.01 | 
JDK 1.1          | 1997.02 | 
J2SE 1.2         | 1998.12 | Java 2 Platform, Standard Edition
J2SE 1.3         | 2000.05 | 
J2SE 1.4         | 2002.02 | 
J2SE 5.0         | 2004.09 | 为了更好地体现版本的语义性，将版本号由 1.5.0 改成了 5.0
Java SE 6        | 2006.12 | 使用 "Java SE" 替换了 "J2SE"，并删除了版本号尾 ".0"；内部版本号仍沿用 1.6.0
Java SE 7        | 2011.07 | 
Java SE 8 (LTS)  | 2014.03 | 
Java SE 9        | 2017.09 | 以前每 3<sup>+</sup> 年发布一个大版本，从这开始会每6个月出一个主版本
Java SE 10       | 2018.03 | 
Java SE 11 (LTS) | 2018.09 | 
Java SE 17 (LTS) | 2021.09 | 

<h5>Java 语言特点</h5>

Java 并不只是一种语言，它是一个完整的平台，有一个庞大的库。

Java 白皮书中对 Java 特性的描述可用 11 个关键术语进行组织：1 简单性 2 面向对象 3 分布式 4 健壮性 5 安全性 6 体系结构中立 7 可移植性 8 解释型 9 高性能 10 多线程 11 动态性

<h5>JDK vs JRE</h5>

JRE = JVM + Runtime Library  
JDK = JRE + Compiler, debugger, etc.

<h5>JSR、JCP</h5>

JSR 规范：Java Specification Request  
JCP 组织：Java Community Process  

为了保证 Java 语言的规范性，Sun 公司搞了个 JSR 规范，凡是想给 Java 平台加一个功能，大家要先创建一个 JSR。

负责审核 JSR 的组织就是 JCP。

一个 JSR 规范发布时，为了让大家有个参考没，要同时发布一个 参考实现 (RI: Reference Implementation) 和一个 兼容性测试套件(TCK: Technology Compatibility Kit)。RI 只是能跑的示例代码。

<h5>常见误解</h5>

Java 理论上能成为适用于所有平台的通用性编程语言，但在实际中，某些领域其他语言有更出色的表现，比如，Objective C 和后来的 Swift 在 iOS 设备上就有着无可取代的地位。浏览器中的处理几乎完全由 JavaScript 掌控。Windows 程序通常都用 C++ 或 C# 编写。Java 在服务器端编程和跨平台客户端应用领域则很有优势。

<h5>运行过程</h5>

* 编译型 源程序 --编译连接--> 可执行程序EXE --执行--> 操作系统
* Java   源程序 --编译--> 字节码程序 --解释执行--> **解释器** --> 操作系统 

Java 应用是通过 Java虚拟机(JVM) 来实现跨平台运行的。



## 杂项知识点

<h5>Java 和 JavaScript 下"类"的区别和联系</h5>

JS 类内调用 变量 和 类属性 是有严格区分的，是否有 `this` 解析结果是完全不一样的。  
java 类方法内是可以省略 `this` 使用的。

JS 类内定义的静态方法，必须通过类名访问，实例只能在原型链向上查找方法。  
Java 类中的静态方法，可以通过实例或者类名访问。

分析：JS 中类名对应的是一个对象，而每个类名又附带了一个专门的原型对象来负责继承；而 Java 中类只对应一块区域。

<h5>Maven 与 Gradle</h5>

两者都是项目工具，Maven 是行业标准，Gradle 是后起之秀。Gradle 抛弃了 Maven 的基于 XML 的繁琐配置，取而代之地采用了领域特定语言 Groovy 的配置，大大简化了构建代码的行数。

<h5>JAR 与 WAR</h5>

Java Archive file 通常是开发时要引用的 Java 通用类，打成包便于存放管理。

Web Archive file 是做好一个 Web 应用后，通常是网站，打成包部署到容器中。将 Web 项目以 WAR 的方式导出后，直接放在 Tomcat 容器的 webapps 目录下启动服务，即可运行该项目。



## Web 服务器

> 名词解释：在互联网架构中，  
> **Web服务器**，一般指像 Nginx，Apache 这类服务器，他们主要负责解析静态资源。  
> **应用服务器**，一般指像 Tomcat，Jetty，Resin 这类服务器，主要负责解析动态资源。  
> 一般都是只有 Web 服务器才能被外网访问，应用服务器只能内网访问。

本人比较喜欢 Nginx 跑静态和做反向代理，动态 PHP 还是交给 Apache 处理比较稳定，JSP 就交给 Tomcat 或 Jetty。Nginx 跑静态的能力无与伦比，是目前 Web 服务器里最强的。Nginx 和 Apache、Tomcat 的动静分离配置其实很简单，稳定性也非常好。

### Apache

Apache HTTP Server（简称 Apache）由于其跨平台和安全性，被广泛使用，是最流行的 Web 服务器软件之一。它快速、可靠并且可通过简单的 API 扩充，将 Perl、Python 等解释器编译到服务器中。

Apache 支持许多特性，大部分通过编译模块实现。一些通用的语言接口支持 Perl，Python，Tcl 和 PHP。流行的认证模块包括 mod_access，mod_auth 和 mod_digest。其他的例子有 SSL 和 TLS 支持(mod_ssl)，代理服务器(proxy)，URL重写(mod_rewrite)，定制日志文件(mod_log_config)，以及过滤支持(mod_include 和 mod_ext_filter)。

### Nginx

Nginx（发音同 engine x）是一个网页服务器，能反向代理 HTTP, HTTPS, SMTP, POP3, IMAP 等协议的链接，包含一个负载均衡器和一个 HTTP 缓存。Nginx 官方的测试结果能够支持五万个并行连接，在实际运行中可以支持二万至四万个并行连接。

### Tomcat

Tomcat 是 Apache 下属的 Jakarta 项目开发的一个 *Servlet 容器*，实现了对 Servlet 和 JSP 的支持。Tomcat 本身也内含了一个 HTTP 服务器，故它也可以被视作一个单独的 Web 服务器。

### LAMP

LAMP 是指一组通常一起使用来运行动态网站或者服务器的自由软件名称的首字母缩写：

* Linux 操作系统
* Apache 网页服务器
* MariaDB 或 MySQL 数据库管理系统（或数据库服务器）
* PHP、Perl 或 Python 脚本语言

### Java Web 服务器实战

Tomcat 运行在 JVM 之上，它和 HTTP 服务器一样，绑定 IP 地址并监听 TCP 端口，同时还包含以下职责：管理 Servlet 程序的生命周期；将 URL 映射到指定的 Servlet 进行处理；与 Servlet 程序合作处理 HTTP 请求——根据 HTTP 请求生成 HttpServletResponse 对象并传递给 Servlet 进行处理，将 Servlet 中的 HttpServletResponse 对象生成的内容返回给浏览器。

虽然 Tomcat 也可以认为是 HTTP 服务器，但通常它仍然会和 Nginx 配合在一起使用。*动静态资源分离* ，运用 Nginx 的反向代理功能分发请求：所有动态资源的请求交给 Tomcat，而静态资源的请求（如图片、视频、CSS、JavaScript文件等）则直接由 Nginx 返回给浏览器，这样就能大大减轻 Tomcat 的压力。*负载均衡* ，当业务压力增大时，可能一个 Tomcat 的实例不足以处理，那么这时可以启动多个 Tomcat 实例进行水平扩展，而 Nginx 的负载均衡功能可以把请求通过算法分发到各个不同的实例进行处理。



## Java Web 项目之前后端分离

Java Web 项目为什么要放弃 JSP，为什么要前后端解耦？ http://blog.csdn.net/piantoutongyang/article/details/65446892

前后端分离已成为互联网项目开发的标准方式，通过 Nginx + [Node.js +] Tomcat 的方式有效地进行解耦，并且前后端分离会为以后的大型分布式架构、弹性计算架构、微服务架构、多端化服务 (多种客户端，如：浏览器，车载终端，安卓，iOS 等) 打下坚实的基础。这个步骤是系统架构从猿进化成人的必经之路。

其核心是，前端 HTML 页面通过 AJAX 调用后端的 Restful API 接口并使用 JSON 数据进行交互。

### 术业有专攻

以前的 Java Web 项目大多数都是 Java 程序员又当爹又当妈。随着时代的发展，渐渐前后端的界限分的越来越明确。正所谓术业有专攻，一个人如果什么都会，那么他毕竟什么都不精。

后端追求的是：三高(高并发，高可用，高性能)，安全，存储，业务等等。主要精力放在 Java 基础，设计模式，JVM 原理，Spring + SpringMVC 原理及源码，Linux，MySQL 事务隔离与锁机制，MongoDB，HTTP/TCP，多线程，分布式架构(Dubbo，Dubbox，Spring Cloud)，弹性计算架构，微服务架构(Spring Boot + Zookeeper + Docker + Jenkins)，Java 性能优化，以及相关的项目管理等等。

前端追求的是：页面表现，速度流畅，兼容性，用户体验等等。主要精力放在 HTML5，CSS3，Jquery，Angular.js，Bootstrap，React，Vue，Webpack，Less / Sass，Gulp，Node.js，V8 引擎，JavaScript 多线程，模块化，面向切面编程，设计模式，浏览器兼容性，性能优化等等。

### 强耦合的痛点

#### 性能瓶颈

大多数项目在 Java 后端都是分了三层，控制层(Controller / Action），业务层(Service / Manage)，持久层(DAO)。

正常的互联网架构，是都要拆开的，你的web服务器集群，你的应用服务器集群+文件服务器集群+数据库服务器集群+消息队列集群+缓存集群等等。

#### JSP 痛点

1. 动态资源和静态资源全部耦合在一起，服务器压力大，一旦服务器出现状况，前后台一起玩完。
2. UI 出图后，前端将设计图切成 HTML，再由后端将 HTML 套成 JSP 页面，出错率较高，修改问题时需要双方协同，效率低下。
3. JSP 必须要在支持 Java 的 Web 服务器里运行，无法使用 Nginx，性能提不上来。
4. 第一次请求 JSP，必须要在 Web 服务器中编译成 Servlet，第一次运行较慢。
5. 每次请求 JSP 都是访问 Servlet 输出 HTML 页面，效率没有直接使用 HTML 高。
6. JSP 内有较多标签和表达式，前端工程师在修改页面时会捉襟见肘，遇到很多痛点。
7. 如果 JSP 中的内容很多，页面响应会很慢，因为是同步加载。
8. 需要前端工程师使用 Java 的 IDE，以及需要配置各种后端的开发环境，你们有考虑过前端工程师的感受吗。


### 前后端解耦

#### 开发模式的改变

#### 请求方式的改变


### 前后端分离的优势

1. 可以实现真正的前后端解耦，前端服务器使用 nginx。前端/WEB服务器放的是css，js，图片等静态资源(甚至还可以css，js)放到特定的文件服务器，前端服务器负责控制页面引用&跳转&路由，前端页面异步调用后端的接口，后端/应用服务器使用tomcat(可看成一个数据提供者)，加快整体响应速度。
2. 发现bug，可以快速定位是谁的问题，不会出现互相踢皮球的现象。
3. 在大并发情况下，我可以同时水平扩展前后端服务器。
4. nginx支持页面热部署，不用重启服务器，前端升级更无缝。
5. 增加代码的维护性&易读性（前后端耦在一起的代码读起来相当费劲）。
6. 提升开发效率，因为可以前后端并行开发，而不是像以前的强依赖。
7. 在nginx中部署证书，外网使用https访问，并且只开放443和80端口，其他端口一律关闭(防止黑客端口扫描)，内网使用http，性能和安全都有保障。
8. 前端大量的组件代码得以复用，组件化，提升开发效率，抽出来！


### 注意点

1. JSP 在大型外网 Java Web 项目中已被淘汰，但对于初学者来说，JSP、Servlet 等相关的 Java Web 基础还是要掌握牢的。
2. 对于既可以前端做也可以后端做的逻辑，我建议是放到前端。类似于数据校验这种则前后端都要做。



## Node.js vs Java

https://developer.51cto.com/art/201908/602203.htm

看到 Node.js 异步IO、事件回调、前后台统一语言 等厉害特性后，某后端架构师对 Node.js 进行系统学习后做的总结对比，感觉看了有很大启发，按照此笔记进行整理更新，对了解 Node.js 和 Java 知识体系很有帮助。

### 语言

Node.js 的 JavaScript 灵活、面向过程、单进程单线程执行。Node.js 主打的异步 IO 事件回调使其更适合服务器编程，其单进程单线程的特质使得开发变得简单。得益于社区的活跃语言高速发展，但整体上 JavaScript 向企业级应用语法转型稍显缓慢。(动态语言语法灵活、单进程单线程、异步IO、学习门槛低、开发简单)

相比之下，Java 是面向对象的，具备了面向对象的全部特征，经历了20年的发展沉淀越发的强大、稳健。与 Nodejs 相比 Java 是个在各个领域作精作深的技术巨人，然而也正因如此，学习 Java 的成本要比 Node.js 高很大一个台阶，每一个小的技术方面都能找到很厚的一本书来。面对异步 IO 事件回调的新技术 Java 也在其新的 SDK 中提供支持与时俱进，相关 Java 的开源项目也及时跟进。(面向对象、成熟、强大、学习门槛高)

对比项          | Node.js                           | Java
---------------|-----------------------------------|---------------------------------------
函数式编程      | 支持                               | Java 8 引入 Lambda 表达式支持函数式编程
类、接口、抽象类 | ES6 引入了类的概念，不支持接口和抽象类 | 支持，依赖接口降低耦合
封装、继承、多态 | 基于原型的继承                      | 支持
异常            | 支持，V8 不会优化含 try/catch 的函数导致影响性能 | 支持
注解、反射、泛型 | 不支持                             | 支持
数据结构与算法   | 不够完善                           | 比较稳定完善
事件回调与异步IO | 支持，杀手锏能力。<br>Linux 下采用线程池与阻塞IO模拟异步IO；<br>Windows 下有内核异步IO方案 IOCP | 1.4 NIO 工具包实现同步非阻塞IO；1.7 NIO2.0 支持异步IO
进程、线程      | 单进程单线程模式，开发成本低。<br>高效CPU利用需要部署多个进程。<br>单进程带来的可靠性问题通过负载均衡、自杀重启提升 | 支持多线程、并发控制，较为复杂，相对单进程可靠性更高更灵活
网络编程、Web开发 | 搭建网络服务器方便，本身就是一个好的 Web 开发框架 | 社区提供专业的网络编程框架及Web开发框架
扩展             | 支持 C++ 扩展                    | 支持 C++ 及其他可被 JVM 执行语言编写的扩展

### 框架

好的框架可以去除很多不必要的重复工作，当然也带来了额外的学习成本。 Node.js 由于发展时间较短学习成本相对较低，开发人员更容易了解到更多底层实现，但也容易出现稳定性、兼容性等问题。Java 三方开源框架大都已被大量使用，成熟稳定，提供强大能力的同时做了很好的封装分层，开发人员付出较高的学习成本后更多的是傻瓜式使用。

对比项      | Node.js                           | Java
-----------|-----------------------------------|------------------------------------------------
数据库      | 针对不同数据库引入不同驱动模块        | 针对不同数据库引入不同驱动模块 或使用 Mybatis 等框架
MVC框架    | Express，KOA                       | SpringMVC
前端模版    | EJS，Jade                         | Velocity
REST开发    | Restify                          | JAX-RS，Axis2，Cetia4
WebSocket  | Socket.IO                         | Netty 是异步的、事件驱动的网络应用程序框架和工具包
日志管理    | Log4js 简单易用，Winston 则更强大    | Log4j，Slf4j
HTTP调用    | Request                           | HttpClient
异步流程控制 | 内置                              | asyn4j 是异步方法调用框架，基于消费者和生产者模式
定时任务    | Cron 小巧，Later 强大               | Quartz
其他框架    | 社区活跃，但也存在不稳定、不可靠等问题 | 各场景都有很多成熟稳定的开源框架

### 产品化

对比项     | Node.js                           | Java
----------|-----------------------------------|---------------------------------------
编码规范   | ESLint                            | CheckStyle, FindBug, Code Formatter
包管理     | NPM                               | MAVEN
构建       | Grunt, Gulp                       | MAVEN
部署       | 脚本方式启停进程部署，pm2 进程容灾重启 | Web 项目打包成 WAR 部署到容器的指定目录下，<br>去除流量后重启
系统监控   | 暂缺资料                            | JVM 虚拟机提供各项指标的监控接口，<br>基于此接口实现了很多成熟的监控工具
性能分析   | 内存快照分析                        | 基于 JVM 的工具 API 实现有多种性能分析工具，<br>支持分析 CPU耗时分布、CPU调用链、CPU热点、<br>内存分布、内存热点、线程阻塞等
稳定性    | 受制于单线程设计，稳定性需要引入多进程来解决，<br>限制较大，耗资源 | 传统的多线程、多进程、多机、多机房，灵活稳定
安全性    | 动态语言的灵活性导致编码时容易出现安全问题 | 相对脚本语言较安全，漏洞经过多年分析与解决

### 执行引擎

Node.js 选择了 V8 这个最快的 JavaScript 引擎，但因为 V8 专门针对浏览器设计，严重限制了 Node.js 在服务器领域施展拳脚。V8 引擎的创始人和技术都来自于 Java 虚拟机，使用了部分 Java 虚拟机技术适配浏览器业务。相比直线 JVM 更加成熟完善，当然也相对更复杂沉重。

<table>
  <thead><tr><th width="100"></th><th width="360">V8</th><th>JVM</th></tr></thead>
  <tr>
    <td>内存限制</td>
    <td>专为浏览器设计，最大内存占用 64位 1.4GB 32位 0.7GB，新生代分布对应位最大 32M 和 16M。不能灵活地使用内存</td>
    <td>可以结合系统的内存情况按需要设置，并且可以根据业务对内存的需求灵活调优</td>
  </tr>
  <tr>
    <td>垃圾回收</td>
    <td>模仿 JVM 的分代回收。新生代晋升条件固定，复制回收。老生代标记清除回收。</td>
    <td>普遍分代回收，有多种垃圾回收算法可供选择，每个回收算法有多种参数可以配置调优</td>
  </tr>
  <tr>
    <td>内存监控分析</td>
    <td>process 下支持查看内存概括；<br>os 支持查询内存使用情况；<br>--trace_gc 可打印垃圾回收日志；<br>内存快照</td>
    <td>提供 C++ 和 Java 接口查询详细的 JVM 内存机系统内存信息；可以通过启动参数打印回收日志；可以通过 jstat 命令实时查看；可以通过 jmap 或者多种工具 dump 内存；可以通过 memoryAnalyzer 等多种工具分析内存比对内存</td>
  </tr>
  <tr>
    <td>扩展性</td>
    <td>为浏览器设计，扩展性相对较差，体系还不够完善</td>
    <td>技术体系较深，提供多种接口方便三方扩展开发</td>
  </tr>
</table>

### 其他

对比项     | Node.js                           | Java
----------|-----------------------------------|---------------------------------------
测试框架   | Jest 等                            | JUnit TestNG jMock
应用场景   | 服务器编程，擅长高并发IO密集性项目     | 服务器编程、大数据、企业开发、Android
开发者来源 | 部分是试水后端的前端，部分是被一步IO吸引的后端 | 基本是后端开发


