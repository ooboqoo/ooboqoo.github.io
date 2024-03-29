# DDD UL

<style>code.language-plaintext {background-color: rgb(255,245,235) !important;border:1px solid rgb(254,212,164);border-radius: 8px;padding:12px;}</style>


极客时间
* DDD实战课 https://time.geekbang.org/column/intro/238?tab=catalog
* 当中台遇上DDD，我们该如何设计微服务 https://www.infoq.cn/article/7qgxyp4jh3-5pk6lydww


## 什么是 DDD

> 计算机科学领域的任何问题都可以通过增加一个间接的*中间层*来解决。 <sub>程序员的自我修养</sub>   
> All problems in computer science can be solved by another level of indirection. <sub>David Wheeler</sub>

技术的目的是实现真实世界的业务需求。

软件工程 = 把业务需求实现为计算机程序 = 把人类语言*翻译*为计算机语言

### 一个关于法国人和德国人的寓言

一个不懂德语的法国人和一个不懂法语的德国人如何交流
1. 德国人学习法语 或 法国人学习德语
2. 德国人和法国人一起学习英语  *计算机科学的思路，英语 <--> DDD UL*
3. 找一个翻译  *管理学的思路，产品经理*，产品经理岗位出现时间跟 DDD 出现的时间大体相同

```txt
           法国人 <---------------------       各种中间语言       -----------------------> 德国人
业务需求（自然语言）---------------------- UML --- DDD UL --- DSL ------------------------ 编程语言
                 （偏向自然语言，易于理解，学习成本低 <--> 偏向编程语言：精确性高，容易转化成代码）

```

* UML 统一建模语言 Unified Modeling Language，1997年
* DDD UL 通用(统一)语言 Ubiquitous Language，2004年
* DSL 领域特定语言 Domain Specific Language，含 正则表达式、SQL、HTML 等

### 什么是 DDD

DDD = 领域模型 + 问题空间 + 解决方案空间

```txt
业务需求/PRD -- 问题空间 --> 领域模型 -- 解决方案空间 --> 编程语言
法语 --------- 法英词典 --->  英语 ---- 英德词典 ------> 德语
```

* 领域模型 DDD UL - 
* 问题空间 Problem Space - 通过事件风暴活动识别出 子域、界限上下文、实体、聚合
* 解决方案空间 Solution Space - 微服务拆分、集成、应用架构、编码

### DDD 解决什么问题



## 领域建模 - DDD 的两个过程

> **康威定律 Conway's Law**      （康威定律在架构领域的地位，相当于牛顿三大定律在物理学中的地位）  
> 任何组织在设计一套系统时，所交付的设计方案在结构上都与该组织的沟通结构保持一致。  
> Any organization that designs a system(defined broadly) will produce a design whose structure is a copy of the organization's communication structure.

DDD 的两个过程：战略设计 和 战术设计

* 战略设计 - 子域和限界上下文的划分、边界、交互关系
* 战术设计 - 子域和限界上下文内部的分析和设计

```txt
  问题空间      |  解决方案空间
子域/界限上下文  |  微服务划分      \
上下文映射      |  微服务集成       |- 战略设计(偏向软件架构)
---------------+----------------------------------------
领域模型        |  应用架构         |- 战术设计(偏向编码实现)
基本元素        |  Domain层代码    /
```

注：DDD UL 只是 埃里克·埃文斯 Eric Evans 个人发明的一种语言，虽然语法设计抽象地很好，但千万不要强行过分解读。

### 战略设计 - 子域

语境 Context

* **语言 Language** - 人类语言是人类进行沟通*交流*的工具；计算机语言是人与计算机交流的工具
* **语境 Context** - 同一个词在不同语境中意思可能完全不同，任何语言的理解都离不开语境
* **子域 Subdomain** - 子域就是 UL 的语境，不同的子域下有不同的 UL 方言

划分子域

* DDD的第一件事情就是找到不同的语境 - *划分子域*
* 子域是问题空间的概念
* 子域和团队的关系
* 子域可以继续划分为更细粒度的子域（子子域）

子域类型

* **核心域**(Core Domain) - 业务成功的主要因素和公司的核心竞争力，资源需要重点投入
* **支撑子域**(Supporting Subdomain) - 有定制开发需求，可以考虑外包，如 CRM、ERP
* **通用子域**(Generic Subdomain) - 没有定制开发需求，可以考虑采购现成产品，如 人事管理系统

### 战略设计 - 限界上下文 Bounded Context

界限上下文 是 子域 对应的解决方案空间概念，一个子域会对应一个界限上下文。但界限上下文也经常作为问题空间的概念混用。

界限上下文的边界也是通用语言的边界，即 *限界上下文 == 一个语言的边界*

* 一个团队（Two-Pizza Team，5~10人）拥有同一种语言
* 根据微服务理论，通常一个微服务对应一个限界上下文
* 综上可得 *一个团队 == 一个微服务*，符合康威定律

### 战略设计 - 上下文映射 Context Map

上下文映射表示 *两个界限上下文之间的集成关系* 以及团队间的动态关系，也代表两个通用语言之间的转译过程

上下文映射的 *常见设计错误是直接把内部模型暴露出去*

贝佐斯7条 https://coolshell.cn/articles/5701.html

1) 所有团队的程序模块都要以通过 Service Interface 方式将其数据与功能开放出来。
2) 团队间的程序模块的信息通信，都要通过这些 *接口*。
3) 除此之外没有其它的通信方式。其他形式一概不允许：不能使用直接链结程序、不能直接读取其他团队的数据库、不能使用共享内存模式、不能使用别人模块的后门、等等，唯一允许的通信方式只能是能过调用 Service Interface。
4) 任何技术都可以使用。比如：HTTP、Corba、Pubsub、自定义的网络协议、等等，都可以，Bezos不管这些。
5) 所有的Service Interface，毫无例外，都必须从骨子里到表面上设计成能对外界开放的。也就是说，团队必须做好规划与设计，以便未来把接口开放给全世界的程序员，没有任何例外。
6) 不这样的做的人会被炒鱿鱼。
7) 谢谢，祝你有个愉快的一天！

> 微服务更多是关于组织和团队，而不是技术 <sub>微服务设计</sub>

### 战术设计 - 基本元素

<img src="https://oe9nbfytu.qnssl.com/c/f50492b7f0b9ee8006f1fd3bf4c465af" width="512" />

**实体 Entity** = 唯一身份标识 + 可变性（状态 + 行为）

**值对象 Value Object** = 将一个值用对象的方式进行表述，来表达一个具体的固定不变的概念。需要将值对象看成*不变对象*，不要给它任何身份标识估，还应该尽量避免像实体对象一样的复杂性。

**领域事件 Domain Event** 是一条记录，记录着界限上下文中发生的对业务产生重要影响的事情。*领域事件 = 事件发布 + 事件存储 + 事件分发 + 事件处理*。领域事件通常由界限上下文中的 聚合（Aggregate）发布。

### 战术设计 - 聚合 Aggregate

聚合是领域对象的显式分组，旨在支持领域模型的行为和不变性，同时充当一致性和事务性边界。我们把一些关联性极强、生命周期一致的实体、值对象放到一个聚合里（高内聚、低耦合）

聚合是由一个或多个实体组成，其中一个实体被称为 **聚合根 Aggregate Root**，**根实体 Root Entity** 控制着所有聚集在其中的其他元素。

聚合内部要保证业务的强一致性。


## 问题空间实践 - 事件风暴

* 实践教程 /wiki/wikcnA68hDZ50jeneHrPjFvMNcg
* 实操案例 /docs/doccnGZSHNKUjNXNhyKxaMYUlFh
* 白板工具 https://miro.com/app/dashboard

事件风暴是一项 Workshop 活动，领域专家与开发团队通过头脑风暴的形式，对业务达成共识。事件风暴应该由产品经理主导。

*目标：建立统一语言，识别领域模型，划分子域和限界上下文*

### 识别领域事件

*事件是对结果进行建模*，以过去发生的事件追溯系统的数据和行为，从而进行合适的建模。

领域事件具备几个特征
* 具有业务意义：是「问题」不是「解决方案」；是「业务」不是「系统」
* 过去时，eg “XXX已XXX”
* 时序性，按照每个事件在领域中发生的时间先后顺序从左到右排列

### 识别命令

命令通常是某个用户操作，命令的执行导致领域事件的发生。

*「xx用户」对「xx实体」进行「xx操作」导致「xx事件」发生*

步骤
1. 参与者在事件周围添加新的卡片
2. 添加事件之间的因果关系
  * 实线箭头：强一致，表示事件会同时发生
  * 虚线箭头：弱一致（最终一致），表示允许一段时间后再发生
3. 对所有的事件的触发原因达成一致

### 寻找聚合

聚合是一组相关的领域对象，聚合帮助我们简化复杂的对象网络，逐步做到“高内聚，低耦合”。

聚合把命令和领域事件通过实体/聚合关联起来，命令在实体/聚合上执行并产生领域事件，实体是命令执行和事件触发的数据载体。

聚合设计的经验规则
* 在聚合边界内保护业务规则不变性
* 聚合要设计得小巧
* 只能通过标识符引用其他聚合
* 使用最终一致性更新其他聚合

聚合和事务一致性的关系
* 对于要求实时一致性的，实体合并到同一个聚合的边界之内
* 对于允许等待时间更新的，分成不同的聚合，采用最终一致性
* 实时一致性还是最终一致性，是由业务而不是技术决定的

### 边界划分

将业务划分为多个子业务，并识别出核心业务。

一个聚合可能是最小颗粒度的子域。我们常合并业务相关性很高的聚合成一个子域。

### 为什么事件风暴会失败(应注意规避的点)

* 产品经理的骄傲
  - 法国人：我们有法语这么优雅而严谨的语言，为什么要去说粗鄙的英语
* 程序员的骄傲
  - 德国人：那群法国人在说什么？他们对德国技术的厉害之处一无所知
  - 法国人在努力翻译成英语的时候，不要突然跳出来讨论德语的问题
* 程序员对技术不够自信
  - 程序员应该抱有这样的信念：只要业务想清楚了，技术肯定能实现
  - 避免在事件风暴过程中讨论任何技术细节问题


## 解决方案空间实践 - 从领域模型到系统架构到最终代码

### 划分微服务


### 微服务集成


### 应用架构

应用架构设计的目标：分离系统内的业务代码和技术代码

实际代码包含：业务逻辑代码（DDD的领域模型） + 技术相关代码 + 胶水代码，这3类代码的隔离程度越高越好

技术相关代码，如：数据库访问、数据库事务、远程服务调用、文件读写、网页展示、多线程处理 等

应用架构原则：以领域模型代码为中心，领域模型代码不应依赖其他部分的代码（DIP依赖反转原则）

两张重要的架构图

<img src="https://static001.geekbang.org/resource/image/e4/aa/e4021a5e5b214b3da812d11de6da10aa.jpeg" height="360" />


#### 分层架构

<img src="https://static001.geekbang.org/resource/image/88/c7/8890e3dff9465a166fa0216138f9a9c7.png" height="333" />


### 具体编码

1:1映射，连名字都不要改，充分保持一致

|||
--------|--------------------
实体    | `struct`
命令    | `func`
值对象   | `const`
领域服务 | `interface` + `struct`
领域事件 | `struct`
聚合    | `package`

领域对象与代码对象映射清单

 层  | 聚合 | 领域对象名称        | 领域类型 |  包名                       | 类名            | 方法名
-----|-----|--------------------|---------|---------------------------|------------------|---------
应用层 | /    | 认证并获取人员信息 | 应用服务 | leave.app.servie          |                  | 
领域层 | 请假  | 请假单           | 聚合根   | leave.domain.leave.entity | Leave            | 
领域层 | 请假  | 创建请假信息      | 命令    |  leave.domain.leave.entity | Leave            | createLeaveInfo
领域层 | 请假  | 审批规则         | 值对象   | leave.domain.leave.entity | LeaveApprovalRule | 

读写操作

TODO

数据库访问层

TODO


## 其他

适用范围
* 适用：问题空间复杂度高，常见于 *互联网+* 领域，如 电子商务、互联网金融 等
* 不适用：解决方案空间复杂度高，常见于 *互联网原生* 领域，如 短视频、VR/AR 等

为什么DDD会失败

想象一本书叫《法英德词典》，这本书会不会有人买？Evans 的《领域驱动设计》就是这样一本书，对产品经理尤其不友好。整个互联网上的DDD相关资料对产品经理都非常不友好。缺少了产品经理，DDD逐步变成了程序员的自言自语。


