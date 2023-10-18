# 微服务


## 服务架构演进

单体开发 -> SOA(Service Oriented Architecture) -> 微服务


SOA Conceptual Model

```
                  <-- Publish -- Service Provider <--
Service Registry                                     | Bind
                  <-- Find ----- Service Consumer  --
```


SOA
* 共同的治理和标准
* 专注于业务功能重用
* 通信使用企业服务总线 ESB

微服务
* 模块化
* 独立部署
* 异构化



## Spring Cloud

* 消息中心：Stream, Bus
* 配置中心：Git, SVN, ZooKeeper
* 认证授权中心：Security, Oauth, JWT
* 缓存中心：
* 文档中心：Swagger
* 服务注册与发现：Eureka, Consul, ZooKeeper
* 网关路由：Zuul, Gateway
* 服务调用：Ribbon, Feign, Hystrix
* 链路监控中心：监控 Actuctor, Admin; 链路监控 Sleuth, Zipkin


## 微服务与无服务器架构

就是拼装平台提供的不同服务来实现业务。不需要自己搭服务器，大大减轻了运维成本，且可实现高可用和可扩展性。

无服务化异步工作(修改前后非常相似)

```
# 改造前
客户端 ---> 服务器 ---> 队列 ---> 负责异步处理的 Worker --> DB
# 改造后
客户端 ---> 服务器 ---> 事件 ---> Lambda Worker --> DB
```

只要将事件和Lambda绑定后，产生事件就会有相应Worker来执行。

无服务化同步工作

```
# 改造前
客户端 ---> 负载均衡 ---> 应用服务器(Web框架)       --> DB
# 改造后
客户端 ---> API 网关 ---> Lambda Worker (Web框架) --> DB
```


最终架构

```
客户端 ---> API Gateway ---> Lambda (Flask, Express.js, Spring ...) ---> DB
                               \--异步处理--> SNS ---> Lambda --------/     Cache(redis, memcache)
```

常见问题
* 应用有状态。无服务化是没法处理的，需要把状态剥离到一些共享存储中，如 RDB、NoSQL、ObjectStorage、NFS
* 测试的时候加载好慢。测试时都是 **冷启动**，所以慢，正常跑的时候更多的是 **热启动**，会快很多，另外还可以通过 **预热** 优化
* 代码分开带来的一些问题。


```
         /--静态资源-->  CDN           ---> S3 存储桶(客户端网站应用框架)
客户端(浏览器) --API-->   API Gateway   ---> Lambda ---> DB
                   (缓存、认证授权、流量管理)  把一些通用逻辑从 Lambda 中抽离到 API网关处理
```
