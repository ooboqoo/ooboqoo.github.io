# SSM


## 概述

关于 Java Web 结构和 SSM 框架的理解 https://blog.csdn.net/khxu666/article/details/79913151

### SSM

SSH vs SSM

* SSH 即 Spring + Struts + Hibernate 组合，目前已被 SSM 技术栈取代。
* SSM 即 Spring + SpringMVC + Mybatis 组合。

SSM

* Spring 是容器框架，管理各种 Java Bean (mapper、service、controller)，事务控制。通过 IOC 和 AOP 降低耦合性。
* SpringMVC 是表现层框架，DispatcherServlet 承担中介或前台的职责，将请求通过 HandlerMapping 去匹配 Controller。
* MyBatis 是持久层框架，是对 JDBC 的封装，负责和数据库打交道。

Java Web 常见的三层结构

* 表现层：Web 层，常见的框架有 SpringMVC、Struts2。
* 业务层：Service 层，专注于业务逻辑的实现。
* 持久层：DAO 层，常见的框架是 Hibernate、MyBatis。负责与数据库的交互，封装数据库的访问细节。

当 Web 容器(如 Tomcat) 接收到浏览器请求后，根据不同的请求创建相应的 Servlet(控制器) 对请求进行处理和转发，控制器调用业务层处理逻辑，逻辑层向持久层发送请求，持久层与数据库交互，后将结果返回给业务层，业务层将处理逻辑发送给控制器，控制器再调用视图展现数据。


### Spring 家族介绍

https://spring.io/

* Spring 是一个轻量级的容器框架，自 2003 年发布以来一直引领业界潮流。其核心是 控制反转(IOC) 和 面向切面(AOP)。
* SpringMVC 是一个 WEB 开发框架，取代了 Struts2。
* Spring Boot 是为了简化 Spring 应用的创建、运行、调试、部署等而出现的，让开发者无需过多关注 XML 配置。
* Spring Cloud 是一个微服务框架。

### 学习路线

https://blog.csdn.net/CSDN2497242041/article/details/102023839

1. Spring
2. SpringMVC
3. Mybatis
4. Maven
5. Log4j  日志系统
6. JUnit 单元测试
7. SpringMVC 如何返回 JSON 格式的数据
8. SpringMVC 使用注解代替复杂的 XML 配置文件

