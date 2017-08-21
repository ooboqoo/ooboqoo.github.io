### Maven

`<scope>provided</scope>`- provided 表明该包只在编译和测试的时候用

### Java Web 该怎么学

https://www.zhihu.com/question/21142149 看完这个就知道该学啥该怎么学了。

#### 学什么框架：Spring MVC / Spring Boot + Mybatis

Struts 早过时了，Hibernate 也许可以换 Mybatis 了

Spring MVC 基本可以帮你屏蔽 Servlet 的 API，ORM 则可以帮你屏蔽 JDBC 的 API 了。

#### 学习路径

1、Java 基础
2、Servlet + JSP + JDBC
3、Spring + Mybatis

### Java vs JavaScript

#### 类相关的区别和联系

JS 类内调用 变量 和 类属性是有严格区分的，是否有 this 解析结果是完全不一样的。  
java 类方法内是可以省略 this 使用的

JS 类内定义的静态方法，必须通过类名访问，实例只能在原型链向上查找方法  
Java 类中的静态方法，可以通过实例或者类名访问  

分析：JS 中类名对应的是一个对象，而每个类名又附带了一个专门的原型对象来负责继承；而 Java 中类只对应一块区域。

#### Maven2 与 Ivy 的区别

Maven2,它是一个模块化项目构建工具（Building a Project ）。它能够管理依赖、构建周期、测试、 打包并且在仓库中发布你的制品。它是一个项目构建工具，领先于通常的构建工具（实际上它的第一个版本是在Ant之上的一层）。

apache ivy2　对项目依赖的文件可以进行统一的管理，依赖于ant,它是一个管理（记录、跟踪、解析和报告）项目依赖的工具 (dependency tool)。

Maven 2和Ivy常被放在一起对比，但实际上两者是不同类型的工具。Ivy仅提供依赖管理功能，但是Maven 2是一个软件项目管理综合工具，能够管理构建、报告、文档，以及根据中心化的信息来管理依赖。Ant和Ivy 2.0集成在一起，与Maven 2进行比较才比较合适。