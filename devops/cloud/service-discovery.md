# 服务注册与发现





## 什么是服务发现

微服务的框架体系中，服务发现是不能不提的一个模块。

以前，客户端的某个接口需要调用服务A-N，客户端必须要知道所有服务的网络位置。以往的做法是将信息放在配置文件中，或者有些配置在数据库中。

但这样就带出几个问题(总结下就是：服务多了，配置很麻烦，问题多多)：
* 需要配置N个服务的网络位置，加大配置的复杂性
* 服务的网络位置变化，都需要改变每个调用者的配置
* 集群的情况下，难以做负载均衡(反向代理的方式除外)

既然有这些问题，那么服务发现就是解决这些问题的。在客户端和各服务之间插入了一个服务发现模块。服务A-N把当前自己的网络位置注册到服务发现模块，服务发现就以 K-V 的方式记录下来，K 一般就是服务名，V 就是 IP:PORT。服务发现模块定时轮询查看这些服务能不能访问，即健康检查。客户端在调用服务时，先跑去服务发现模块查询各服务的网络位置，然后再调用各服务。这样就解决了前面的问题，客户端完全不需要记录这些服务的网络位置，客户端和服务端完全解耦。


## ZooKeeper

 Zookeeper –Apache Zookeeper is a distributed key-value store which can be used as the basis to implement service discovery. Mostly a common-purpose distributed key/value store used for service-discovery in conjunction.

## Eureka

Eureka – A service discovery tool, the architecture is primarily client/server, with clients mainly using embedded SDK to register and discover services. A service locator used as part of Netflix's load balancers and failovers.

## ETCD

中文入门介绍 https://www.jianshu.com/p/f68028682192  
https://github.com/etcd-io/etcd  


## Consul

https://www.consul.io/intro/index.html

Consul is a service discovery framework with a REST interface and some features such as health checking, service segmentation with its own internal distributed key-value store. Consul includes service discovery, but also rich health checking, locking, Key/value, multi-datacenter federation, an event system.


