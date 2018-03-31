# REST API

http://www.ruanyifeng.com/blog/2014/05/restful_api.html  
https://blog.philipphauer.de/restful-api-design-best-practices/

越来越多的人开始意识到，网站即软件，而且是一种新型的软件。这种 "互联网软件" 采用客户端/服务器模式，建立在分布式体系上，通过互联网通信，具有高延时、高并发等特点。

RESTful架构，就是目前最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便，正得到越来越多网站的采用。

REST 模式的 Web 服务相比另外两种主流方案 SOAP 和 XML-RPC 来讲更加简洁。

REST 这个词，是 Roy Thomas Fielding 在他 2000 年的博士论文中提出的：

> 我这篇文章的写作目的，就是想在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。

## 理解 RESTful 架构

REST，即 Representational State Transfer 的缩写，翻译为 "表现层状态转化"。如果一个架构符合 REST 原则，就称它为 RESTful 架构。

### 资源 Resources

REST 的名称省略了主语，"表现层"其实指的是 "资源" Resources 的"表现层"。

所谓"资源"，就是网络上的一个实体，它可以是一段文本、一张图片。你可以用一个URI（统一资源定位符）指向它。

### 表现层 Representation

"资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"。比如，文本可以用 txt 格式 或者 JSON 格式表现；图片可以用 JPG 格式 或者 PNG 格式表现。

URI 只代表资源的实体，不代表它的形式。严格地说，有些网址最后的 ".html" 后缀名是不必要的，因为这个后缀名表示格式，属于"表现层"范畴，而 URI 应该只代表"资源"的位置。它的具体表现形式，应该在 HTTP 请求的头信息中用 Accept 和 Content-Type 字段指定，这两个字段才是对"表现层"的描述。

### 状态转化 State Transfer

访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。

互联网通信协议 HTTP 协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

客户端用到的手段，只能是 HTTP 协议。具体来说，就是 HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源。

## Rest 模式的四种操作

GET 操作是安全的。所谓安全是指不管进行多少次操作，资源的状态都不会改变。比如我用 GET 浏览文章，不管浏览多少次，那篇文章还在那，没有变化。

PUT，DELETE 操作是幂等的。所谓幂等是指不管进行多少次操作，结果都一样。比如我用 PUT 修改一篇文章，然后再做同样的操作，每次操作后的结果并没有不同，DELETE 也是一样。顺便说一句，因为 GET 操作是安全的，所以它自然也是幂等的。

POST 操作既不是安全的，也不是幂等的，比如常见的 POST 重复加载问题：当我们多次发出同样的 POST 请求后，其结果是创建出了若干的资源。

安全和幂等的意义在于：当操作没有达到预期的目标时，我们可以不停的重试，而不会对资源产生副作用。从这个意义上说，POST 操作往往是有害的，但很多时候我们还是不得不使用它。

还有一点需要注意的就是，创建操作可以使用 POST，也可以使用 PUT，区别在于 POST 是作用在一个集合资源之上的，而 PUT 操作是作用在一个具体资源之上。

### 避免混淆 GET 和 POST

两者都能向服务器发送数据。GET 用来告诉服务器需要获取哪些内容（uri+query），向静态页面（uri）请求直接返回文件内容，向动态页面请求时可以提供查询参数 query 以获得相应内容。POST 用来向服务器提交内容，主要是为了提交，而不是为了请求内容。


## RESTful API 设计指南

### 协议

API 与用户的通信协议，总是使用 HTTPs 协议。

### 域名

```text
https://api.example.com    应该尽量将 API 部署在专用域名下
https://example.org/api/   如果确定 API 很简单，才考虑放在主域名下
```

### 版本

URI vs Request Parameter vs Media Type   
在 RESTful API 领域，关于如何做版本控制，目前业界比较主流的有 3 种做法：

```text
https://api.example.com/v1/foo                  直观，但版本号与资源之间并无直接关系
https://api.example.com/foo?ver=1               上一方案的变体，相对折中的方案
Accept: vnd.example-com.foo+json; version=1.0   把不同版本理解成资源的不同表现形式，缺点是不直观
```

### 路径

在 RESTful 架构中，每个网址代表一种资源，所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的 "集合"，所以 API 中的名词也应该使用复数。

### HTTP 动词

常用的HTTP动词有下面五个

```text
GET     SELECT  从服务器获取资源（一项或多项）
POST    CREATE  在服务器新建一个资源。
PUT     UPDATE  在服务器更新资源（客户端提供改变后的完整资源）
PATCH   UPDATE  在服务器更新资源（客户端提供改变的属性）
DELETE  DELETE  从服务器删除资源
```

还有两个不常用的 HTTP 动词。

```text
HEAD     获取资源的元数据。
OPTIONS  获取信息，关于资源的哪些属性是客户端可以改变的。
```

### 信息过滤

如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果。下面是一些常见的参数:

```text
?limit=10                指定返回记录的数量
?offset=10               指定返回记录的开始位置
?page=2&per_page=100     指定第几页以及每页的记录数
?sortby=name&order=asc   指定返回结果按照哪个属性排序以及排序顺序
?animal_type_id=1        指定筛选条件
```

### 状态码

```text
200 OK -                   [GET]             服务器成功返回用户请求的数据，该操作是幂等的
201 CREATED                [POST/PUT/PATCH]  新建或修改数据成功。
202 Accepted               [*]               表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT             [DELETE]          删除数据成功
400 INVALID REQUEST        [POST/PUT/PATCH]  请求有错误，该操作是幂等的
401 Unauthorized           [*]               认证失败（令牌、用户名、密码错误）
403 Forbidden              [*]               没有权限
404 NOT FOUND              [*]               请求针对的记录不存在，该操作是幂等的
406 Not Acceptable         [GET]             请求的格式不可得，如请求 JSON 格式但只有 XML 格式
410 Gone                   [GET]             请求的资源被永久删除
422 Unprocesable entity    [POST/PUT/PATCH]  创建对象时验证失败
500 INTERNAL SERVER ERROR  [*]               服务器发生错误，用户无法判断发出的请求是否成功
```

### 错误处理

如果状态码是 4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 error 作为键名，出错信息作为键值即可。

```json
{"error": "Invalid API key"}
```

### 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

```text
GET    /collection       返回资源对象的列表（数组）
GET    /collection/:id   返回单个资源对象
POST   /collection       返回新生成的资源对象
PUT    /collection/:id   返回完整的资源对象
PATCH  /collection/:id   返回完整的资源对象
DELETE /collection/:id   返回一个空文档
```

### Hypermedia API

RESTful API 最好做到 Hypermedia，即返回结果中提供链接，连向其他 API 方法，使得用户不查文档，也知道下一步应该做什么。

Hypermedia API 的设计被称为 HATEOAS。Github 的 API 就是这种设计 https://api.github.com/ 。

### 其他

API的身份认证应该使用OAuth 2.0框架。

服务器返回的数据格式，应该尽量使用JSON，避免使用XML。
