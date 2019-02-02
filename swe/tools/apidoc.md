# API 文档工具

使用 API-Blueprint 编写 API 文档 http://www.jianshu.com/p/d39c3553e25a  
Swagger - 前后端分离后的契约 http://www.cnblogs.com/whitewolf/p/4686154.html  
https://github.com/apiaryio/api-blueprint  


## 综述

### 前后端分离

按照现在的趋势，前后端分离几乎已经是业界对开发和部署方式所达成的一种共识。

通常，前后端分别有着自己的开发流程，构建工具，测试等。做前端的谁也不会想要用 Maven 或者 Gradle 作为构建工具，同样的道理，做后端的谁也不会想要用 Grunt 或者 Gulp 作为构建工具。前后端仅仅通过接口来协作，这个接口可能是JSON 格式的 RESTFul 的接口，也可能是 XML 的，重点是后台只负责数据的提供和计算，而完全不处理展现。而前端则负责拿到数据，组织数据并展现的工作。这样结构清晰，关注点分离，前后端会变得相对独立并松耦合。

但是这种想法依然还是很理想化，前后端集成往往还是一个很头痛的问题。比如在最后需要集成的时候，我们才发现最开始商量好的数据结构发生了变化，而且这种变化往往是在所难免的，这样就会增加大量的集成时间。

归根结底，还是前端或者后端感知到变化的时间周期太长，不能“及时协商，尽早解决”，最终导致集中爆发。怎么解决这个问题呢？我们需要提前协商好一些契约，并将这些契约作为可以被测试的中间产品，然后前后端都通过自动化测试来检验这些契约，一旦契约发生变化，测试就会失败。不过，仅仅靠纪律是不够的，还需要通过工具的辅助来提高效率。

### RESTful API 设计工具比较

https://medium.com/@clsource/swagger-vs-raml-vs-api-blueprint-daccab31f0f2

* Swagger：可以通过编码的注释自动生成文档，个人觉得这种方式并不是很好。
* RAML：是一种 RESTful API 建模语言(RESTful API Modeling Language)，是一种类 YAML 语言。
* API Blueprint：采用类 Markdown 语法，社区提供了大量跨越API整个周期的惊奇的工具。

当我新建 API 时，会采用设计优先的方式，即，先编写 API 文档然后再用代码实现。我碰到过很多项目，文档不是很规范，或者文档是二等公民，这些项目的协作很是让人头痛。所以 Swagger 并不是很好的选择，而 RAML 已经被 YAML1.2 取代，而 YAML 已被 JSON 碾压，所以也不是合适的选择。因此本文重点介绍 API Blueprint。


## API Blueprint

如果你正在使用 markdown 来编写 api 文档的话，API Blueprint 一定会成为你的更好的选择。

API Blueprint 是一套基于 markdown 的 API 描述语言规范，如果你按照它的规范来编写你的 API 文档的话，你就可以享受到配套的工具服务了。

### 语法和例子

### 配套工具

#### 编辑器插件

[Sublime Text Plugin](https://github.com/apiaryio/api-blueprint-sublime-plugin)

#### 生成静态 HTML

文档可通过工具实时生成 html 网页

```bash
$ npm -g install aglio
$ aglio -i foo.md -o bar.html  # 转换成静态HTML文档
$ aglio -i foo.md -s           # Run a live preview server on http://localhost:3000/
```

如果配合 GitHub 或者自己搭建的 git 服务器，可以使用 hook 等方式自动化文档的发布。

#### Mock 服务

文档可通过工具生成可调用样例接口，此类工具有 api-mock 和 drakov 等。

```bash
$ npm -g install drakov
$ drakov -f apiary.md -p 3000
```


## 接口设计


软件接口设计中的版本兼容问题处理 https://blog.csdn.net/phoenixhdf/article/details/80513075  
如何优雅的管理APP多个接口版本 https://www.cnblogs.com/luciferZ/p/6945509.html  

### 接口版本

小迭代以参数 `ver` 形式标识版本，大迭代以路径 `api.com/v2/list` 或子域名区分

小改动或者新加功能的，数据库结构和API程序一般是可以兼容多版本的，所以不用强制升级，可以做到多版本共存。
尽量采用数据库层面新增字段和API的方式，应用程序层面就可以兼容了。
如果是大改动，底层数据结构都不兼容，那只能提示强制升级了。如果是强制升级，就不会有多版本共存的问题了，
也不会有多套数据库，也不会存在数据同步的问题。 

### 区分客户端

添加 `platform` 字段区分

### 参数优化

Java 中参数处理行为

```java
// key 不存在时
jsonObject.get("key")             // null
(String) jsonObject.get("key")    // null
jsonObject.get("key").toString()  // 异常
jsonObject.getString("key")       // 异常
```



