# SSR 运维篇


## 性能测试

### 压测 Load Limits

https://httpd.apache.org/docs/2.4/en/programs/ab.html

**吞吐率 requests per second (RPS, also known as queries per second or QPS)** 服务器并发处理能力的量化描述，指某个并发数下单位时间内处理的请求数。计算：请求数 / 请求总耗时。

**用户平均请求等待时间 (Time per request (mean))** 每次请求耗时加总 / 请求数。  
**用户平均请求等待时间 (Time per request (mean, across all concurrent requests))** 总请求耗时 / 请求数。


ApacheBench is a tool for benchmarking your HTTP server. It is designed to give you an impression of how your current Apache installation performs. This especially shows you how many requests per second your Apache installation is capable of serving.

`ab` 不仅可以帮我们模拟并发，还能直接生成结果。简单小巧，上手快，可以提供需要的基本性能指标，但没有图形化结果，不能监控。适用于临时紧急任务和简单测试。

使用方式大概如下：

```bash
$ ab -n 100 -c 10 -l -r 'xxxx.html'
    -n 请求量
    -c 并发量
    -r 防止出错退出程序
```

之后慢慢调请求量和并发量，一般可以调整到 -n 12000 -c 12000

在运行之前，建议先设置 `ulimit -n 65535`，这样能避免出现 `socket: Too many open files (24)` 的错误。

一般来说压测的 QPS 是现网高峰 QPS 十倍 应该就挺稳妥的。如果不够？*加钱上机器*啊。

我目前的测试平均值是四核普通单机QPS最好成绩 185，node服务有这样的成绩，一般（微笑，我大node当年靠一手治理高并发横空出道，这点QPS不能满足我的）。


### 性能

https://webpagetest.org/




