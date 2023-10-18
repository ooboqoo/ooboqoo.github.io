# Serverless


## 云计算的演进过程

云计算经历了 IDC -> IaaS -> PaaS -> Serverless/FaaS 的发展历程

<img src="https://miro.medium.com/max/1018/1*g-3sIos1ekWYdP2rXODj9Q.png" />
<img src="https://www.combell.com/en/blog/files/2017/09/SaaS.jpg" width=430/>

* IaaS (Infrastructure as a Service, 基础设施即服务) - 给你一台云主机(虚拟机)，操作系统你自己装，如 Azure VM
* PaaS (Platform as a Service, 平台即服务) - 操作系统有了，你自己装应用，如 Google App Engine
  - FaaS (Function as a Service, 函数即服务) - 面向微服务开发者，你给代码剩下的我全包(免运维)，如 AWS Lambda
    + 传统PaaS vs FaaS：PaaS 提供镜像，FaaS 提供代码。FaaS 比 传统PaaS 又少了一步打镜像的操作
* SaaS (Software as a Service, 软件即服务) - 面向用户，给你软件直接用，如 Office 365

<img src="images/serverless.webp" />


## FaaS 简介

https://www.zhihu.com/question/357717742/answer/926367671

lambda computation, faas function as a service, serverless 讲的是同一个东西

Serverless 是云计算发展到一定阶段的必然产物。云计算作为普惠科技，发展到最后一定是绿色科技（最大程度利用资源，减少空闲资源浪费），大众科技（成本低，包括学习成本及使用成本）的产品，而 Serverless 将很好地诠释这些！

* Serverless 就是你给我一段代码或应用，我负责帮你运行
* 不是说不需要服务器，而是你不需要关心服务器，服务器的运维对你是透明的
* 是基于 *事件驱动* 的编程范型，有请求的时候你的代码才会运行
* 把高可用、高并发做到对用户透明
* 资源又是弹性的，按请求使用量收费。只有运行才收钱，资源利用率100%。
* 其底层的计算平台一般为轻量计算比如容器

Serverless 主要有以下四个特点
* 无需部署管理基础设施：*无服务计算并不代表真的没有服务器，而是不需要管理部署服务器*
* 自动扩容：不用考虑扩容 和 容量规划，底层的服务会自动实现按需扩容
* 按需付费：按照时间和使用量付费，避免为闲置计算资源付费
* 高度可靠和安全：基于高可用架构开发，可用性高

应用场景
* 每个请求都由一个单独的计算实例来处理（实例隔离）
* Web应用应该是无状态的，如果需要共享状态，可以存储到 Redis 或者数据库中
* 每次调用的请求处理完毕后，计算环境会被冻结，这段时间内没有CPU资源，所以不能运行后台进程

典型的应用架构

前端：CDN + 对象存储
前端 + API Gateway + Web应用（FaaS）+ 数据库

Function URLs 提供 HTTP 入口，但不支持自定义域名
提供 CORS 支持，浏览器发来 Option 请求，可以根据配置返回响应结果而不会触发 FaaS 实例运行


## Firecracker

https://github.com/firecracker-microvm/firecracker

Codesandbox实战分享 https://codesandbox.io/post/how-we-clone-a-running-vm-in-2-seconds





## 轻服务对前端的影响

狼叔

https://segmentfault.com/a/1190000039184240
https://segmentfault.com/a/1190000039017794
https://mp.weixin.qq.com/s/oIeitNc4dpG2c3UkEzQJWg

整体看，Node.js 社区还是非常健康且与时俱进的。Serverless 借着云原生这波基建升级，逐渐走入更多开发者的视野中。低运维，甚至是0运维，对前端来讲是致命诱惑的。Node.js 被吐槽最多的运维问题，在 Serverless 时代没有了，且Serverless 容器跑的最多的示例都是 Node.js 环境。以前的说法是“所有云厂商都爱 Node.js”，现在要改成了“所有 Serverless 厂商和开发者都爱 Node.js”了。

通过 ESM 改善开发者体验。在 iMove 开发过程中，我们探索了 ESM 在浏览器中直接运行的能力，无需本地安装 npm 模块。这是极其轻量的做法，结合Vite，以及很多CJS转 ESM 服务，可以看到当下很多研发模式都会被废弃，比如本地开发，WebIDE 等等。如果在浏览器直接可以运行，为啥还要做那些浪费时间且毫无意义的事儿呢？

当然，在浏览器直接可以运行是改善开发者体验的一部分，配套设施要跟上，比如直接在浏览器修改代码并编译保存，是不是想想就很美好？如果再结合 Vercel（next.js 母公司）的做法，将 Serverless 和 CI/CD、Git hooks 进行集成，页面托管到 Serverless 平台，无需关心运维。是的，只要有一个浏览器，就可以满足前端的所有开发的时代，很快就可以实现。


## Node.js 的优势

https://www.zhihu.com/question/357717742/answer/926367671

Node.js 对 Serverless 环境友好，大部分 FaaS 都是以 JS 为主（80% 以上的阿里云FaaS函数都是用NodeJS写的）。

Serverless 时代 Node.js 做web开发未来会成为行业主流，会成为中小公司的偏前台应用开发场景取代 PHP/Java 的首选解决方案。

任何技术都不是万能的，要看场景。NodeJS 做后端开发只适合做业务应用维度的偏前端的后端工作，理论上可以取代所有 PHP 现有功能。但无法取代复杂场景的 Java 擅长的各种分布式高并发领域，也无法取代 Go/C++ 擅长的高性能分布式网络开发，也无法取代大数据、人工智能、运维相关领域的 Python 后端开发。

Serverless 时代的研发模式，伯克利大学某学者曾给出了一个非常有趣的定义 Serverless = FaaS + BaaS，未来传统 web 后端开发会承担 BaaS 维度的各种服务开发，而业务应用开发都采用 NodeJS 并部署在各云厂商的 FaaS 上。未来前后端的分界点是写业务应用还是BaaS服务。未来不会再有存粹的前端程序员，而是「web应用开发工程师」，大量市场上的 PHP 程序员和部分 JavaWeb 程序员会被淘汰转行成为 web应用开发工程师。

### 冷启动

Serverless 需要去下载应用代码来执行，所以应用代码包越大应用启动时间越长。当然你可以通过预留模式来解决冷启动问题。

冷启动对 Node.js 的影响很小，一个相对复杂的 Node.js 应用打包出来的文件大概 10M 左右，端到端冷启动时间在百毫秒级别。

### IO密集

FaaS 上最适合的场景之一是web应用，是 IO 密集型的，二 NodeJS 非常适合 IO 密集型应用。

### 单进程

Serverless 会根据请求的情况，弹性伸缩多个实例来响应请求，屏蔽了 Node.js 单进程的问题。

### 其他

* 框架多
* 易用、学习成本多
* 快速开发。在这个十个产品死十个的年代，快速开发推出市场非常重要，不然死了弄那么好的性能也白费。



## NestJS

https://docs.nestjs.com/

Node.js 很多框架写写 BFF 还不错，写完整应用可能还得上 Java 的 Sprint，真要选一个 JS 的那推荐 nest.js。




