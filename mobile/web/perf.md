# 前端性能优化

性能卓越的网站往往可以给访问者留下良好的印象，因此更容易积累庞大的用户和受众群体，这是关乎网站成败的关键因素之一。

## 常用网站性能优化指标

对于网站性能指标最直接的印象可能是网站的响应速度，因为这是访问者最直观真实的体验。

网站访问的过程从用户输入网站域名开始，通过 DNS 解析找到目标服务器，目标服务器收到请求后执行服务器即数据库等一系列操作，并将响应数据经过互联网发送给用户浏览器，最终由浏览器处理并完成网页的渲染呈现。

### 资源请求与加载阶段

> Chrome DevTools > Network > Timing 可看到用户访问网站发送资源请求的全过程

```txt
Resource Scheduling   资源调度阶段
  Queueing   排队

Connection Start   建立连接阶段
  Stalled   等待
  Proxy negotiation   代理协商
  DNS Lookup   DNS 查询
  Initial connection   初始连接 - TCP 握手 和 协商 SSL (下面的 SSL 时间包含在这部分时间内)
  SSL   SSL 握手

Request/Response   请求/响应阶段
  ServiceWorker Preparation   (如果有 ServiceWorker 则由其负责资源响应)
  Request to ServiceWorker
  Request sent   发送请求
  Waiting (TTFB)   等待初始响应
  Content Download   完成数据接收
```

Timing breakdown phases explained

* __Queueing__ - The browser queues requests when:
  * There are higher priority requests, 如图片请求就可能会被推迟下载.
  * There are already **6** TCP connections open for this origin. Applies to HTTP/1.0 and HTTP/1.1 only.
  * The browser is briefly allocating space in the disk cache
* __Stalled__ - The request could be stalled for any of the reasons described in Queueing.
* __DNS Lookup__ - The browser is resolving the request's IP address.
* __Proxy negotiation  __ - The browser is negotiating the request with a proxy server.
* __Request sent__ The request is being sent.
* __ServiceWorker Preparation__ The browser is starting up the service worker.
* __Request to ServiceWorker__ The request is being sent to the service worker.
* __Waiting (TTFB)__ The browser is waiting for the first byte of a response. TTFB stands for Time To First Byte. This timing includes 1 round trip of latency and the time the server took to prepare the response.
* __Content Download__. The browser is receiving the response.
* __Receiving Push__. The browser is receiving data for this response via HTTP/2 Server Push.
* __Reading Push__. The browser is reading the local data previously received.

为了实现网站的快速响应，首先需要考虑的就是减少资源访问及加载阶段所消耗的时间。使用 HTTP 1.0/1.1 协议时，每个域同时最多只能有 6 个 TCP 连接，因此可通过**划分子域**的方式，将多个资源分布在不同子域上用来减少请求队列的等待时间。然后，划分子域并不是一劳永逸的方式，多个子域意味着更多的 DNS 查询时间。通常把域名拆分为 3 到 5 个比较合适。

如果能够使用 **CDN 服务**来托管静态资源，对网站的性能提升更大。

HTTP 是一个无状态的面向连接的协议，即每个 HTTP 请求都是独立的。然而无状态并不代表 HTTP 不能保持 TCP 连接，`Keep-Alive` 正是 HTTP 协议中保持 TCP 连接非常重要的一个属性。在 HTTP1.1 协议中，`Keep-Alive` 默认打开，使得通信双方在完成一次通信后仍然保持一定时长的连接，因此浏览器可以在一个单独的连接上进行多个请求，有效地降低建立 TCP 请求所消耗的时间。

HTTP2.0 协议提供了单个 TCP 连接**多路复用**的能力，极大地提高了 Web 应用的性能。

TTFB 所消耗的时间，更多体现在服务器的处理能力上，通常认为不应超过 200ms。可以设置 CDN 加速以减少客户端到服务器的网络距离，也可以设置服务器缓存并通过文件头设置 `Expires` 或 `Cache-Control` 来控制缓存。在处理访问静态资源的性能优化上，上述方法尤其重要。

### 网页渲染阶段

> Chrome DevTools > Performance 可查看页面渲染过程中各阶段的时间消耗情况

网站响应速度的快慢，不仅限于网站资源加载的速度，网页渲染速度和JS的运行速度同样直接影响着网站的整体性能，这一点在重度交互的网站应用中体现地愈发充分。

#### 浏览器渲染过程





### 脚本执行速度

JavaScript 脚本的执行速度是一个涵盖知识点非常多的话题。可以通过 jsPref 提供的基于 Benchmark 运行的共享测试用例，来了解并比较不同代码段的性能。


## 雅虎军规

(此部分参见独立资料)


## 性能优化工具


## HTTP 协议头缓存


## 资源按需加载


## 不同网络类型的优化


## Nginx 配置 Combo 合并请求

















