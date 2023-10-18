# 服务发现 与 服务网格


## 服务发现

微服务的框架体系中，服务发现是不能不提的一个模块。

以前，客户端的某个接口需要调用服务A-N，客户端必须要知道所有服务的网络位置。以往的做法是将信息放在配置文件中，或者有些配置在数据库中。

但这样就带出几个问题(总结下就是：服务多了，配置很麻烦，问题多多)：
* 需要配置N个服务的网络位置，加大配置的复杂性
* 服务的网络位置变化，都需要改变每个调用者的配置
* 集群的情况下，难以做负载均衡(反向代理的方式除外)

既然有这些问题，那么服务发现就是解决这些问题的。在客户端和各服务之间插入了一个服务发现模块。服务A-N把当前自己的网络位置注册到服务发现模块，服务发现就以 K-V 的方式记录下来，K 一般就是服务名，V 就是 IP:PORT。服务发现模块定时轮询查看这些服务能不能访问，即健康检查。客户端在调用服务时，先跑去服务发现模块查询各服务的网络位置，然后再调用各服务。这样就解决了前面的问题，客户端完全不需要记录这些服务的网络位置，客户端和服务端完全解耦。


### ZooKeeper

 Zookeeper –Apache Zookeeper is a distributed key-value store which can be used as the basis to implement service discovery. Mostly a common-purpose distributed key/value store used for service-discovery in conjunction.

### Eureka

Eureka – A service discovery tool, the architecture is primarily client/server, with clients mainly using embedded SDK to register and discover services. A service locator used as part of Netflix's load balancers and failovers.

### ETCD

中文入门介绍 https://www.jianshu.com/p/f68028682192  
https://github.com/etcd-io/etcd  


### Consul

https://www.consul.io/intro/index.html

Consul is a service discovery framework with a REST interface and some features such as health checking, service segmentation with its own internal distributed key-value store. Consul includes service discovery, but also rich health checking, locking, Key/value, multi-datacenter federation, an event system.



## 服务网格

### 什么是 Service Mesh

> Service Mesh 通常是一组轻量级的网络代理程序，这些网络代理程序就部署在用户的应用程序旁边，而应用的代码感知不到他们的存在。—— William Morgan

总体来说，Service Mesh 的 *本质* 就是在应用程序旁边启动一个独立的进程，作为代理应用程序所有出口入口流量的 *代理程序*。

在这种情况下，应用程序只需要关心它服务的内容和它依赖的内容，它的 *服务发现、服务治理、服务安全* 完全被代理程序所接管。

### 为什么需要 Service Mesh

服务框架的构建理念是一个持续演进的过程。

小规模系统一般直接使用单体模式开发，一个服务即是一个应用。

随着业务规模的增长，单体应用的维护困难、迭代缓慢、扩展性差等问题就会暴露出来，这个时候就需要对单体应用进行拆解，将整个系统拆解为微服务架构。

而随着微服务架构的演进，整个系统又会出现语言碎片化，协议碎片化等问题，业务上也很可能会产生自定义分流、统一安全控制等新需求，这个时候就可以向服务网格的方向演进。


