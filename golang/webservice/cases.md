# 应用场景


### 命令行

https://github.com/spf13/cobra


### 文件上传

文件上传常规做法是服务端签名，前端上传。 [TOS RESTFull API 参考](wiki/wikcnfItA1wvKRe7v2gaQk87ppc#QPmsFf)


### 消息队列中间件

消息队列的三大应用场景：异步、解耦、削峰

消息队列的三大问题
* 系统复杂性：重复消费、消息丢失、顺序消费，如何解决...
* 数据一致性：这个其实是分布式服务的共性问题，用分布式事务可解
* 可用性：怎么保证高可用...

目前市面上主流的消息队列中间件主要有：RocketMQ、Kafka 以及 ActiveMQ、RabbitMQ 等





