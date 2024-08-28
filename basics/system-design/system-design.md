# System Design


模拟的是一个和用户 *沟通需求 + 对技术方案 + 交付节奏* 的过程

答题步骤

* 确定问题和设计边界，产出 *需求清单（功能需求 + 技术要求 + ~交付节奏~）*
	- 用户角度的功能性需求（*基础功能 + 扩展功能*）
	- 用户角度的非功能性需求（技术要求）：业务规模、稳定性、性能、安全 等
	- 对技术选型有影响的其他事项确认：实现时考虑的模块、限制 等
	- 交付节奏：用户想要一部到位，还是分期交付
* 基本框架 (最小系统 MVP) *分析业务流程 + 系统组件*
	- 概念设计：梳理业务流程 并分析 系统包含的各个组件及其交互
	- 深入细节：
* 概念设计迭代 (丰富完善设计、中型系统)
	- 逐步增加功能
	- 提升稳定性、安全性
* 加分环节
	- 更多细节
	- 大型系统

碰到陌生服务时询问：
* 您能说下「xxx服务」是怎样一个服务么，它的大概工作流程是怎样的？// 所以出题大概率让实现最常见的服务
* 比设计出一套完美架构更重要的是，*主要考察候选人的沟通能力和解决问题的能力*，所以技术没答好问题不大。

时间分配 （45~60分钟，实际分配的时间取决于问题的复杂程度和面试官的要求）

* 理解问题并确定设计的边界     3~10分钟
* 提出高层级的设计并获得认可  10~15分钟
* 深入设计细节              10~25分钟


## 概述

很多公司都设有系统设计面试，因为这种面试能考验软件工程师日常工作所需的*沟通能力和解决问题的能力*。面试官会考查候选人如何分析一个模糊的问题并一步步解决这个问题；同时，他们还会考查候选人阐述自己想法的能力、与他人讨论的能力、评估及优化系统的能力。

系统设计面试题的*范围都广且模糊*，其答案也是开放的，*不存在标准答案*或正确答案。有多种方案都可行时，需要讲清 trade-off。

面试对象：系统设计通常针对的是*资深工程师*，对初中级工程师则会更多地关注代码能力。

一般来说，系统设计面试的内容（目的）是
* *理解问题域*：面试者需要准确捕捉需求，并需要通过提问把问题域界定清楚
* *概念设计*：提出一个高层次的设计框架，确定系统的各个组件及其交互
* *深入细节*：对系统可能遇到的具体问题和技术挑战的处理，可能涉及对数据管理、网络通信、接口设计、可伸缩性、容错性和安全性等方面的考虑
* *沟通能力*：观察候选人如何表达想法，及与面试官的互动，以确保解决方案的正确性和完整性。沟通能力*将真实反应你以后跟产品沟通时的表现*


系统设计面试通常涉及但不限于以下几个方面
* 分布式系统设计
* 微服务架构
* 数据库设计（关系型和非关系型）
* 缓存策略
* 负载均衡
* API架构
* 消息队列和异步处理
* 云服务和服务提供商
* 安全性考虑
* 容错和灾难恢复

准备系统设计面试时，最好的方法是通过实践和学习现有系统的构建和运作方式。此外，了解一些设计模式、架构模式和技术趋势也很有帮助。

本书重点讨论了 *分布式系统中的常用组件*和*大型Web应用的系统架构*，涵盖了几类常见的典型应用：聊天系统、视频流系统、云盘、支付系统等。


### 面试技巧

通用技术面分：算法 + 系统设计

系统设计更多得考你的是一些基本概念，而不是技术细节。系统设计不像算法（需要解题、调试）那么累，靠嘴皮子吹就行了，反正又不需要实现出来。

答题：先提一个基本的框架，然后再逐步细化

有些面试官在乎你怎么去定义数据和设计API，有些面试官在乎你怎么实现大量用户的使用场景

系统设计是一个很开放的题目，面试官希望你 *从一个比较基础的答案开始（你至少有了一个可行方案），然后根据面试官提的要求或特殊情况，去丰富完善你的设计*。这样你和面试官一直在互动，互动越多你们聊地越开心，你的面试通过几率也就越大。

面试者需要不停地提问，去确定需求。如果面试官一开始让你设计一个推特系统，你在开始设计之前需要问非常多的问题，还有提出很多假设，例如我们要假设有多少个活跃用户，每个用户每天平均发多少个推文，系统需不需要支持用户点赞之类的。因为通常面试只有45分钟，面试官不会真得要你去设计一个很细节的东西，你只要跟面试官达成一个协议。


## 前端专区

在前端面试中，系统设计题目通常侧重于考察候选人对于构建前端应用程序架构的理解，包括性能优化、可维护性、用户体验和安全性等方面。

1. 设计一个高性能的前端应用架构
如何组织文件和组件？
如何管理状态（例如使用 Redux 或 Context API）？
如何对项目进行模块化以提高复用性？

2. 设计一个响应式网站
你会如何适配不同大小的屏幕和设备？
如何保证网站在移动端和桌面端都有良好的体验？

3. 构建一个单页应用（SPA）
考虑路由管理、状态管理等。
如何实现懒加载和代码分割来减小初始加载时间？
如何处理SPA的SEO问题？

4. 构建一个前端安全策略
如何防范XSS、CSRF和其他安全威胁？
如何安全地处理用户数据？

5. 设计一个前端监控系统
如何监控前端性能（FP、FCP、LCP等指标）？
如何捕捉并上报JavaScript错误？

6. 实现高可用的前端应用
如何设计一个可靠的前端应用来抵御服务故障？
前端如何与后端的故障转移机制结合？

7. 创建一个实时应用（如聊天应用）
如何设计数据流和状态更新机制？
如何保证消息的顺序性和实时性？

8. 设计前端缓存策略
如何优化资源的加载和缓存？
Service Workers和PWA（渐进式Web应用）在这里扮演什么角色？


## 分布式系统通用知识

大型系统的通用非功能性需求
* 系统组件：负载均衡服务、Web服务器(处理HTTP请求)、应用服务(实现业务逻辑)、缓存系统、数据库
* 高性能
	- 高并发：负载均衡、可伸缩、缓存、数据库分库分表
	- 低延迟
* 健壮性（高可用）
	- 监控告警：
	- 网络安全：操作鉴权、抗攻击（DDoS、SQL注入、XSS）
	- 灾备与恢复：
* 可扩展
	- 横向伸缩，弹性

数据的一致性

* 消息队列 - 解耦组件
* 缓存


数据库
* 纵向扩展 与 横向扩展
* 关系型数据库 与 NoSQL
* 主从复制
* 读副本
* 一致性模型
* 数据库分片



## 短链接服务  _easy_

### 理解问题并确定设计的边界

通过提问理清需求

```txt
基础功能
* 能生成一个 shortURL
* 访问 shortURL 时跳转到 originalURL

附加功能
* 能够修改 originalURL
* 能够自定义 shortURL
* 数据统计

技术要求(业务规模)
* 每天要生成1一亿个URL
```

### 提出高层级的设计并获得认可

通过分析业务流程
* URL缩短流程：输入longURL -》 查询是否已在库里 -》 如果没有就生成 shortURL -》 记录到数据库
* URL重定向流程：用户请求 shortURL -》 负载均衡转发请求到服务器 -》 查找缓存 -》 数据库读取 -》 返回 longURL

得出基本的服务组件框架
* 负载均衡
* Web服务
* 缓存服务
* 数据库 （中大型系统用关系型数据库，小系统一个 Redis 就搞定嘞）

前端/API设计：POST + GET

存储：通过哈希表来存储 `shortURL -> longURL`

短化算法：哈希函数 或 自定义输入

### 深入细节

#### 跳转

301 永久跳转（其他请求会转为GET）
308 永久跳转（请求原样保留）

如果短链跳转地址可更改 （为了不影响*浏览器缓存和SEO*，所以我们希望尽量使用301跳转，所以通过选项来支持该配置类型）
302 临时跳转
307 临时跳转

301 VS 302
* 301的优点：浏览器会缓存，搜索引擎会将排名权益给长URL
* 302的优点：允许修改长URL地址，方便提供数据分析服务（跟踪点击率和点击来源）

#### 其他

数据模型：少量直接存内存，多了放关系数据库 `id+shortURL+longURL`

哈希函数：哈希值长度的估算、哈希冲突解决

### 加分环节

如果有时间可以进入加分环节

* 安全：针对DOS攻击，增加限流器
* 服务器伸缩：因为无状态所以简单增减机器就行
* 数据库扩展：数据库复制和分片
* 数据分析
* 大型系统其他概念：可用性、一致性、可靠性


## 如何设计 Twitter  _medium_

* 如何设计 Facebook 的 news feed 系统
* 如何设计 Instagram 的 feed 系统
* 如何设计 Twitter 时间线 （Twitter timeline）

### ChatGPT

Twitter 的核心功能
* 用户可以发布140字以内的消息（推文）
* 用户可以看到他们关注的人的推文（feed流 / 时间线）
* 用户可以关注用户

答题主要需要考虑的点
* 功能需求：发布和获取推文，关注用户，时间线/Feed，推文包含媒体文件等
* 非功能需求：系统的可扩展性、一致性、可用性、延迟要求等
* 高级架构设计：定义系统的核心组件，如前端、API服务、消息队列、存储层(数据库)、缓存系统等
* API设计：`POST /tweets` 创建新推文，`GET /tweets/:id` 获取推文
* 数据库设计：用户表、推文表、用户关系表等，讨论如何分配主键、如何索引以优化查询
* 数据模型：使用关系数据库存储用户信息，使用NoSQL数据库或分布式文件系统来存储推文和媒体内容
* 扩展性：如何利用分布式系统来保证服务的高扩展，包括数据分片、读写分离、缓存策略等
* 一致性和可用性
* 容错和故障转移：如何确保系统是健壮的，包括备份、复制 和 自动恢复机制 等
* 安全性：如何保护系统免受攻击，如 身份验证、限流、防止注入等
* 性能和缩放策略：如何处理高负载，如使用负载均衡器、读写分离、数据分区、缓存常用数据 等


1. *Define the Scope & Requirements*: First, you'd want to define the exact features that are being requested for this version of 'Twitter'. Core functionalities usually include:
	- User Management (sign up, sign in, profiles)
	- Tweeting (posting short messages)
	- Timeline/Feed (viewing tweets from followed users)
	- Following/Followers (managing connections between users)
	- Notifications (for new tweets, follows, etc.)
2. *High-level System Architecture*: Describe the various components of the system, including:
	* Load Balancers: To distribute the traffic across servers.
	* Web Servers: To handle HTTP requests.
	* Application Servers: To handle the logic of tweets, timelines, and following.
	* Caching System: To reduce database load for frequent operations.
	* Database Servers: For user data, tweets storage, and the relationships between users.
3. *Database Design*: Consider the type of database to use (SQL vs. NoSQL), schema design, indexing strategies, and data partitioning for scalability.
	- User: UserID, Username, Email, PasswordHash, etc.
	- Tweet: TweetID, UserID, Content, Timestamp
	- User Follows: FollowerID, FolloweeID
4. *APIs*: You'd outline the RESTful services for different actions. Examples include:
	- `POST /tweets`: To create a new tweet.
	- `GET /users/{user_id}/feed`: To get the tweet feed for a user.
	- `POST /users/{user_id}/follow`: To follow another user.
5. *Scalability*: Systems like Twitter experience huge loads and therefore need strategies to handle this. Ways to handle loads include:
	- Horizontal scaling: Using more machines.
	- Sharding/partitioning: Dividing the database to distribute the load.
	- Caching: Using something like Redis to cache frequent reads.
	- Load balancing: Distribute traffic to prevent any single point of overload.
6. *Data Consistency and Replication* 数据一致性和备份: Decide on the level of consistency required. Twitter likely can tolerate eventual consistency to a degree, meaning not all users need to see tweets at the exact same time.
7. *Fault Tolerance and Redundancy* 容错和冗余: There should be backup systems and mechanisms for failover to ensure the service remains up even when individual components fail.
8. *Security Considerations*: Secure authentication and authorization are key, as well as preventing common vulnerabilities like SQL injection and XSS attacks.
9. *Monitoring and Telemetry*: Implement systems for monitoring the health and performance of the service as well as tracking of errors or anomalies.

With these basics outlined, your interviewer will most likely start to delve into each component, asking you to expand on how exactly you would implement them, what technologies you would use, and why. They may also introduce new requirements or constraints, like how to handle a sudden spike in traffic or 'trending topics' functionality, and you'd need to explain how you'd accommodate those as well.



### 理解问题并确定设计的边界

* 这是一个移动端应用还是网页应用
* 它有哪些重要功能 - *用户能发布帖子，并看到好友发布的帖子* + 推荐系统
* 一个用户可以有多少个好友 - 5000个
* 网络流量是多少 - 1000万DAU
* 可以发布图片和视频么，还是只有文本

### 初步设计

发帖：用户发布帖子，数据被写入缓存和数据库，并被推送到好友的消息墙
构建消息墙：按照时间倒序聚合好友的帖子

API设计
* 发布 `POST /v1/me/feed  {content, auth_token}`
* 拉流 `GET /v1/me/feed  {auth_token}`

发帖功能实现
* 用户端：（浏览器或APP）调用 API 发布帖子
* 负载均衡：把流量分配到WEB服务器
* WEB服务器：将请求从定向到不同的内部服务
* 帖子服务：将帖子持久化到数据库和缓存中
* 广播服务（Fanout Service）：将帖子推送给好友
* 通知服务：告知好友有新内容，并发送推送通知

消息墙功能实现
* 用户：发送请求拉取信息
* 负载均衡
* WEB服务器
* 消息流服务：从缓存中拉取信息流
* 缓存服务


### 深入细节

#### Web 服务器

除了与客户端通信外，Web服务器也用于验证用户身份和限流。系统限制一段时间内用户可以发布的帖子数量，对于阻止发布垃圾信息和滥用内容很重要。

#### 广播服务

广播是把一个帖子发送给所有好友的过程。有两种广播模型：写广播（也叫推送模型）和 读广播（也加拉取模型）。

推送模型
* 优点：时效性高
* 缺点：如果好友很多会出现热键问题(Hotkey Problem); 对不活跃用户预计算会耗费资源

拉取模型的优缺点正好反一反。

我们可以采用混合方案，以利用这两个方法的优点，避开缺点。因为快速获取信息流很重要，我们对大部分用户使用推送模型。对于名人，我们让粉丝按需拉取新内容来避免系统过载。一致性哈希可以帮我们更均匀地分配请求/数据，它是一个减轻热键问题的有用技术。

#### 缓存架构

缓存分为5层
1. news feed 层：信息流 ID
2. 内容层：「热点内容」+「常规内容」，储存每条帖子的内容，热点内容会单独缓存
3. 社交图谱层：「粉丝」+ 「关注的人」
4. 操作层：「点赞」+「回复」+「其他」
5. 计数器层：「点赞数」+「回复数」+「其他计数」


## 网络爬虫

爬虫类型
* 搜索引擎索引：这是最常见的使用场景，爬虫收集网页并为搜索引擎创建本地索引
* 网页存档：如，很多国家图书馆运行爬虫来存档网站
* 网络挖掘：如，金融公司使用爬虫来获取关键公司的股东会议信息和年报，从而了解他们的动向
* 网络监控：监控互联网上的版权和商标侵权行为

爬虫开发的复杂性取决于我们想要支持的爬虫规模。

一个好的爬虫应该具备
* 高性能：需要通过并行化来高效爬取信息
* 健壮性：网络上充满了陷进，糟糕的HTML页面、无响应的服务器、宕机、恶意链接等都很常见
* 礼貌性：爬虫不应该在很短的时间间隔内对一个网站发送太多的请求
* 可扩展性：只需要做很少的更改就能支持新的内容类型

### 理解问题并确定设计的边界

```txt
基础功能
* 搜索引擎索引
* 保存的内容仅包含HTML页面

扩展功能
* 需要考虑新增或者有更新的网页
* 忽略有重复内容的网页

技术要求(业务规模)
* 每月收集10亿个网页
* 爬取的数据需要保存5年
```

### 提议高层级的设计并获得认可

爬虫工作流程

1. 将 「种子URL」 添加到 「URL Frontier」 中
2. HTML下载器从 「URL Frontier」中获取 URL列表
3. 存储内容（如果内容重复就丢弃）
4. 链接提取器从 HTML 页面中提取链接
5. 将新抓取的链接放到「URL Frontier」中 (已抓取过的链接忽略)

相关组件

* URL Frontier：用来存储即将下载的URL的组件叫URL前线，我们可以把它看作一个先进先出队列
* HTML下载器
* 内容存储
* 链接存储
* 链接提取器

### 深入细节

* 深度优先搜索 DFS 与 广度优先搜索
* URL Frontier （任务管理）
	- 礼貌性：从同一个主机每次只下载一个网页，同一个网站下的任务放到单独队列，并由特定下载线程 worker 负责
	- 优先级：我们可能还需要基于网页的排名、网络流量、更新频率等对URL进行排序以便优先处理某些网页
	- 新鲜度：
	- 数据存储：因为数据量大，所以需要结合内存和硬盘混合存储
* HTML 下载器
* 健壮性
* 可扩展性
* 检测和避免有问题的内容

### 加分项

* 服务端渲染
* 过滤掉低质量的网页
* 数据库分库分表
* 横向扩展：大范围的爬取，保持服务器无状态是关键
* 大型系统通用：可用性、一致性、可靠性
* 数据分析



## 聊天系统  _hard_

### 理解需求

* 一对一聊天，消息的传输延时低
* 小型群组聊天（最多100人）
* 展示在线状态
* 支持多设备，即同一个账号可以同时登录多个设备
* 推送通知
* 系统规模：聊天应用支持 5000万 DAU




## 电商平台



## 通知系统

初步设计


细节设计




## 设计云盘


## 监控和告警系统

初步设计
* 基本原理
* 数据模型
* 高层级设计

细节设计
* 指标数据的收集
* 扩展系统
* 查询服务
* 存储层
* 告警系统
* 可视化系统




## 视频分享系统

初步设计
* 视频上传流程
* 视频流式传输流程

细节设计
* 视频转码
* 有向无环图模型
* 视频转码架构
* 系统优化
* 错误处理


## 支付系统


初步设计
* 收款流程
* 复式记账系统
* 托管支付页面
* 付款流程
* 实时卖家仪表板

细节设计
* 重试和幂等
* 同步支付 和 异步支付
* 一致性
* 处理支付失败
* 支付安全


## 搜索自动补全系统



## 限流器 DDoS

在 HTTP 的世界里，限流器限制的是客户端在一定时间内被允许发送的请求数量。

API 网关是一个完全托管的服务，支持流量限制、SSL终止、身份验证、IP地址白名单、静态内容服务等。

使用限流器的好处
* 预防 DoS 攻击引起的资源耗尽问题
* 降低成本：对于使用付费的第三方API的公司来说尤为明显
* 预防服务器过载，可以使用限流器来过滤机器人或者用户不当操作所造成的过量请求

### 理解问题并确定设计的边界

```txt
基本功能
* 准确限制过量请求
* 灵活支持多种限流规则：基于 IP 地址、用户 ID、及其他属性

扩展功能/条件
* 作为独立服务运行
* 运行在分布式环境中，可以在多个服务器或进程间共享
* 限流需要通知用户   // 返回 429

业务规模/技术要求
* 服务于大公司，必须能处理大量请求
* 低延时，不能拖慢HTTP响应时间
* 占用内存少
* 高容错：限流器出现问题不能影响整个系统
```

### 提议高层级的设计并获得认可

原理：使用一个计数器来记录有多少请求是同一个用户、同一个IP地址 等发来的。如果计数器的值超出设定的阈值，就拦截请求。

计数器存储：数据存到硬盘在速度上无法达到要求，内存上的缓存速度快且支持基于时间的过期策略。实际可通过 Redis 的 `INCR` 和 `EXPIRE` 命令实现。

流程

1. 客户端将请求发送给限流器中间件
2. 限流器中间件在 Redis 对应的桶中获取计数器并检查其值是否达到了阈值
    - 如果达到阈值，请求将被拒绝
    - 如果没有，系统增加计数器的值并保存在 Redis 中

### 深入细节设计

#### 流量限制算法

* 代币桶算法 Token Bucket
* 漏桶算法 Leaking Bucket
* 固定窗口计数器算法 Fixed Window Counter
* 滑动窗口日志算法 Sliding Window Log
* 滑动窗口计数器算法 Sliding Window Counter

#### 流量限制规则

流量限制规则存储在硬盘上，工作进程经常从硬盘上读取规则并将其存储到缓存中。

当限流器收到请求后，会加载规则，并结合计数器和上次请求的时间戳，做出是否拦截的决定。

#### 限流行为

```txt
HTTP/1.1 429 Too Many Requests

Date: Sun, 02 Apr 2023 16:04:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Connection: close
Retry-After: 3600
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 168493
X-RateLimit-Retry-After: 3600    // 被限流后需要等待多少秒才能继续发送请求而不被拦截
```

### 加分项

* 分布式系统中的限流器
* 性能优化
* 监控

客户端如何限制被限流
* 使用客户端缓存，避免频繁地调用API
* 理解流量限制，不要在短时间内发送太多请求
* 添加代码以捕获异常或错误，使客户端可以优雅地从异常中恢复
* 在重试逻辑中添加足够的退避时间

