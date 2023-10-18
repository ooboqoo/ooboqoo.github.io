# Redis

https://redis.io  
https://xiaolincoding.com/redis  


## Cheatsheet

### Commands

https://redis.io/commands/?group=server

```nginx
INFO [section]        # Get information and statistics about the server
CONFIG GET parameter  # Get the value of a configuration parameter
MONITOR               # Listen for all requests received by the server in real time
```

https://redis.io/commands/?group=generic

```nginx
DEL key [key ...]      # Delete a key
EXISTS key [key ...]   # Determine if a key exists
TYPE key               # Determine the type stored at key

EXPIRE key seconds [NX|XX|GT|LT]   # Set a key's *time to live* in seconds
PERSIST key   # Remove the expiration from a key
TTL key       # Get the *time to live* for a key in seconds
PTTL key      # Get the *time to live* for a key in milliseconds

SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]  # Incrementally iterate the keys space
KEYS pattern  # Find all keys matching the given pattern
```

https://redis.io/commands/?group=string

```nginx
GETSET key value    # Set the string value of a key and return its old value
MGET key [key ...]              # Get the values of all the given keys
MSET key value [key value ...]  # Set multiple keys to multiple values
```

https://redis.io/commands/?group=list

```nginx
RPUSH key element [element ...]   # Append one or multiple elements to a list
LPUSH key element [element ...]   # Prepend one or multiple elements to a list
RPOP key [count]   # Remove and get the last elements in a list
LPOP key [count]   # Remove and get the first elements in a list

LRANGE key start stop   # Get a range of elements from a list
LTRIM key start stop    # Trim a list to the specified range

BLPOP key [key ...] timeout  # Remove and get the first element, or block until one is available
                             # 从列表表头弹出一个元素，没有就阻塞 timeout 秒，如果 timeout=0 则一直阻塞
BRPOP key [key ...] timeout  # Remove and get the last element, or block until one is available

LMOVE source destination LEFT|RIGHT LEFT|RIGHT
    # Pop an element from a list, push it to another list and return it
BLMOVE source destination LEFT|RIGHT LEFT|RIGHT timeout
    # Pop an element from a list, push it to another list and return it; or block until one is available
```

https://redis.io/commands/?group=hash

```nginx
HSET key field value [field value ...]  # Set the string value of a hash field
HGET key field                          # Get the value of a hash field
HSETNX key field value                  # Set the value of a hash field, only if the field does not exist
HGETALL key                             # Get all the fields and values in a hash
HDEL key field [field ...]              # Delete one or more hash fields
HEXISTS key field                       # Determine if a hash field exists

HMSET key field value [field value ...]  # Set multiple hash fields to multiple values
HMGET key field [field ...]              # Get the values of all the given hash fields

HKEYS key  # Get all the fields in a hash
HVALS key  # Get all the values in a hash
HLEN key   # Get the number of fields in a hash

HSCAN key cursor [MATCH pattern] [COUNT count]  #  Incrementally iterate hash fields and associated values
HRANDFIELD key [count [WITHVALUES]]             # Get one or multiple random fields from a hash
HSTRLEN key field                               # Get the length of the value of a hash field

HINCRBY key field increment   # Increment the integer value of a hash field by the given number
HINCRBYFLOAT key field increment  # Increment the float value of a hash field by the given amount
```

https://redis.io/commands/?group=set


```nginx
SADD key member [member ...]  # Add one or more members to a set
SPOP key [count]              # Remove and return one or multiple random members from a set
SREM key member [member ...]  # Remove one or more members from a set

SCARD key                     # Get the number of members in a set
SMEMBERS key                  # Get all the members in a set
SRANDMEMBER key [count]       # Get one or multiple random members from a set
SISMEMBER key member                # Determine if a given value is a member of a set
SMISMEMBER key member [member ...]  # SISMEMBER 的 M 版本

SSCAN key cursor [MATCH pattern] [COUNT count]  # Incrementally iterate Set elements
SMOVE source destination member                 # Move a member from one set to another

SINTER key [key ...]  # Intersect multiple sets
SUNION key [key ...]  # Add multiple sets
SDIFF key [key ...]   # Subtract multiple sets

SINTERSTORE destination key [key ...]  # 求多个集合的交集，并保持结果到新的 Set
SUNIONSTORE destination key [key ...]  # Add multiple sets and store the resulting set in a key
SDIFFSTORE destination key [key ...]   # Subtract multiple sets and store the resulting set in a key
```

https://redis.io/commands/?group=sorted-set

```nginx
ZADD key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]
    # Add one or more members to a sorted set, or update its score if it already exists
ZREM key member [member ...]  # Remove one or more members from a sorted set
ZPOPMIN key [count]  # Remove and return members with the lowest scores in a sorted set
ZPOPMAX key [count]  # Remove and return members with the highest scores in a sorted set

ZSCORE key member    # Get the score associated with the given member in a sorted set
ZRANK key member     # Determine the index of a member in a sorted set
ZREVRANK key member  # Determine the index of a member in a sorted set, with scores ordered from high to low
ZINCRBY key increment member  # Increment the score of a member in a sorted set

ZCARD key              # Get the number of members in a sorted set
ZCOUNT key min max     # Count the members in a sorted set with scores within the given values
ZLEXCOUNT key min max  # Count the number of members between a given lexicographical range

ZRANGE key min max [BYSCORE|BYLEX] [REV] [LIMIT offset count] [WITHSCORES]
    # Return a range of members in a sorted set
[x] ZREVRANGE key start stop [WITHSCORES]
    # Return a range of members in a sorted set, by index, with scores ordered from high to low
[x] ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
    # Return a range of members in a sorted set, by score
[x] ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
    # Return a range of members in a sorted set, by score, with scores ordered from high to low
[x] ZRANGEBYLEX key min max [LIMIT offset count]
    # Return a range of members in a sorted set, by lexicographical range
[x] ZREVRANGEBYLEX key max min [LIMIT offset count]
    # Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.

ZREMRANGEBYSCORE key min max    # Remove all members in a sorted set within the given scores
ZREMRANGEBYLEX key min max      # Remove all members in a sorted set between the given lexicographical range
ZREMRANGEBYRANK key start stop  # Remove all members in a sorted set within the given indexes

ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
    # Intersect multiple sorted sets and store the resulting sorted set in a new key
ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
    # Add multiple sorted sets and store the resulting sorted set in a new key

ZSCAN key cursor [MATCH pattern] [COUNT count]
    # Incrementally iterate sorted sets elements and associated scores

BZPOPMIN key [key ...] timeout  # Remove and return the member with the lowest score from one or more sorted sets, or block until one is available
BZPOPMAX key [key ...] timeout  # Remove and return the member with the highest score from one or more sorted sets, or block until one is available
```


## 开始

### 简介

https://redis.io/docs/about/

Redis (REmote DIctionary Server) is an open source, *in-memory data structure store* used as a *database, cache, message broker, and streaming engine*. Redis provides data structures such as *strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams*. Redis has built-in *replication, Lua scripting, LRU eviction, transactions*, and different levels of *on-disk persistence*, and provides high availability via Redis Sentinel and automatic partitioning with *Redis Cluster*.

Redis provides access to mutable data structures via a set of commands, which are sent using a *server-client model with TCP sockets* and a simple protocol. So different processes can query and modify the same data structures in a shared way.

You can run atomic operations on these types, like appending to a string; incrementing the value in a hash; pushing an element to a list; computing set intersection, union and difference; or getting the member with highest ranking in a sorted set.

To achieve top performance, Redis works with an in-memory dataset. Depending on your use case, Redis can persist your data either by periodically dumping the dataset to disk or by appending each command to a disk-based log. You can also disable persistence if you just need a feature-rich, networked, in-memory cache.

Redis supports asynchronous replication, with fast non-blocking synchronization and auto-reconnection with partial resynchronization on net split.


### 实操

安装

```bash
$ apt install redis-server  # 安装
$ redis-server              # 启动 Server
$ redis-cli                 # 启动 CLI
```

```bash
$ docker pull redis:7
$ docker run --name redis -d -p 6379:6379 redis:7
```

```txt
> ping
PONG
> set server:name "my redis"
OK
> get server:name
"my redis"
```

### Node.js

* https://github.com/redis/node-redis
* https://github.com/luin/ioredis

```bash
$ npm install redis
```

```js
const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => console.log('Redis client connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))

client.set('my key', 'my test value', redis.print)
client.get('my key', (error, result) => {
  if (error) { console.log(error); throw error }
  console.log('GET result ->' + result)
})
```


## Data types

https://redis.io/docs/data-types/

Redis 提供了多种数据类型来支持不同的业务场景，比如 String(字符串)、Hash(哈希)、 List (列表)、Set(集合)、Zset(有序集合)、Bitmaps（位图）、HyperLogLog（基数统计）、GEO（地理信息）、Stream（流），并且对数据类型的操作都是原子性的，因为执行命令由单线程负责的，不存在并发竞争的问题。

* String 类型的应用场景：缓存对象、常规计数、分布式锁、共享 session 信息 等。
* List 类型的应用场景：消息队列（但是有两个问题：1. 生产者需要自行实现全局唯一 ID；2. 不能以消费组形式消费数据）等。
* Hash 类型：缓存对象、购物车 等。
* Set 类型：聚合计算（并集、交集、差集）场景，比如点赞、共同关注、抽奖活动 等。
* Zset 类型：排序场景，比如排行榜、电话和姓名排序 等。
* BitMap（2.2 版新增）：二值状态统计的场景，比如签到、判断用户登陆状态、连续签到用户总数 等；
* HyperLogLog（2.8 版新增）：海量数据基数统计的场景，比如百万级网页 UV 计数 等；
* GEO（3.2 版新增）：存储地理位置信息的场景，比如滴滴叫车；
* Stream（5.0 版新增）：消息队列，相比于基于 List 类型实现的消息队列，有这两个特有的特性：自动生成全局唯一消息ID，支持以消费组形式消费数据。

### Key

键名是 binary safe 的 (我理解就是啥类型都可以)，可以是字符串(含空字符串)、甚至是一个 JPEG 文件。Memcached 只支持 `String` 类型作为键名，在 Redis 中 `String` 也是最自然的选择。

键名最大支持到 512M，但太长占内存，也很影响查询效率。当然，过于追求短也没必要，需要 find the right balance.

`object-type:id` 是推荐的命名方式，如 `user:1000` `comment:4321:reply.to` `comment:4321:reply-to`

### String

#### 内部实现

value 最大容量 512M

底层数据结构实现主要是 int 和 SDS (简单动态字符串)

#### 常用指令

基本操作

```nginx
> SET name gavin
OK
> GET name
"gavin"
> EXISTS name
(integer) 1
> STRLEN name
(integer) 5
> DEL name
(integer) 1
```

批量操作

```nginx
> MSET name gavin age 18
OK
> MGET name age
1) "gavin"
2) "18"
```

计数器

```nginx
> SET count 0
OK
> INCR count
(integer) 1
> INCRBY count 5
(integer) 6
> DECR count
(integer) 5
> DECRBY count 10
(integer) -5
```

过期

```nginx
# 设置已存在的 key 的过期时间
> EXPIRE name 60  # name 60s 过期
(integer) 1
# 查看还有多久过期
> TTL name
(integer) 33
> TTL name
(integer) -2  # 过期后始终返回 -2
> GET name    # 过期返回 nil
(nil)

# 设置 key-value 时，指定过期时间
> SET name gavin EX 60
OK
```

不存在就插入

```nginx
# not exists
> SETNX name gavin
(integer) 1
```

#### 应用场景

缓存对象

```
> SET user:1 '{"name":"gavin","age":18}'  # 直接缓存整个JSON对象
> MSET user:1:name gavin user:1:age 18    # 进行拆分后使用 MSET MGET 操作
```

常规计数

```
> SET article:read_count:1234 1000
```

共享 Session 信息

我们开发后台管理系统时，会采用 Session 来保存用户会话(登录)状态，这些 Session 会被保存在服务器上，但这只适用用单系统应用，如果是分布式系统，则需要借助 Redis 来统一管理 Session 信息。

分布式锁

* 加锁
  - 如果 key 不存在，则显示插入成功，可以用来表示加锁成功；
  - 如果 key 存在，则会显示插入失败，可以用来表示加锁失败
* 解锁
  - 先判断加锁的客户端是否为自己，是才能删；要保证 判断+解锁 两个操作的原子性（采用 事务 transaction 实现）


```
SET lock_key <unique_value> NX PX 10000
  # lock_key     分布式锁名称
  # unique_value 客户端唯一标识
  # NX           不存在时才允许设置操作
  # PX 1000      设置过期时间为 10s，避免客户端发生异常而无法释放锁
```

### List

Redis lists are implemented via Linked Lists. 优点：写时间复杂度 `O(1)`，缺点：读复杂度为 `O(n)`，如果底层用数组实现，那么优缺点倒一倒。Accessing an element by index is very fast in lists implemented with an Array (constant time indexed access) and not so fast in lists implemented by linked lists (where the operation requires an amount of work proportional to the index of the accessed element)

List 是简单的字符串列表，按照插入顺序排序，可以从头部或尾部向 List 列表添加元素。

列表的最大长度为 `2^32 - 1`，即 40亿个元素。

对于 aggregate data typ，如 Streams, Sets, Sorted Sets and Hashes 等，空元素的创建和删除都由 Redis 自动完成。

应用场景

Capped lists，如，用户发布的最新10条推特消息

```
> rpush mylist 1 2 3 4 5
(integer) 5
> ltrim mylist 0 2
OK
> lrange mylist 0 -1
1) "1"
2) "2"
3) "3"
```

Queue 消息队列

```
# 展示通过 BRPOP 和 BLPOP 避免 polling

> lpush myqueue 1 2 3 4 5
(integer) 5
> brpop myqueue 5
1) "myqueue"        # BRPOP 支持监听多个 list，故会返回 list 名  two-element array since [key,value]
2) "1"
> 略...
> brpop myqueue 5
1) "myqueue"
2) "5"
> brpop myqueque 5   # 5s 后超时返回
(nil)
(5.02s)

> brpop myqueque 500  # 然后另开窗口 lpush myqueue 6
1) "myqueue"
2) "6"
(10.23s)
```

### Hash

应用场景

缓存对象

购物车：以用户 id 为 key，商品 id 为 field，商品数量为 value，恰好构成了购物车的3个要素

```
> hset user:1000 name gavin age 18
(integer) 2
> hget user:1000 name
"gavin"
> hget user:1000 age
"18"

> hgetall user:1000
1) "name"
2) "gavin"
3) "age"
4) "18"
> hmget user:1000 name age no-such-field
1) "gavin"
2) "18"
3) (nil)

> hincrby user:1000 age 1
(integer) 19
```

### Set

Redis Sets are unordered collections of strings. Set 类型是一个无序并唯一的键值集合，它的存储顺序不会按照插入的先后顺序进行存储。

一个集合最多可以存储 2^32-1 个元素。概念和数学中个的集合基本类似，可以交集，并集，差集等等，所以 Set 类型除了支持集合内的增删改查，同时还支持多个集合取交集、并集、差集。

应用场景：点赞、共同关注、抽奖活动

```
> sadd news:1000:tags 1 2 5 77
(integer) 4
> sadd news:1000:tags 66
(integer) 1
> smembers news:1000:tags
1) "1"
2) "2"
3) "5"
4) "66"
5) "77"

> sadd tag:1:news 1000 1008
(integer) 2
> sadd tag:5:news 1000 1005 1006 1008
(integer) 4
> sinter tag:1:news tag:5:news
1) "1000"
2) "1008"
> sdiff tag:1:news tag:5:news
(empty array)
> sdiff tag:5:news tag:1:news
1) "1005"
2) "1006"
> sunion tag:1:news tag:5:news
1) "1000"
2) "1005"
3) "1006"
4) "1008"

> scard tag:5:news
(integer) 4
> spop tag:5:news
"1006"
> scard tag:5:news
(integer) 3
```

### Zset

Sorted sets are a data type which is similar to a mix between a Set and a Hash.

A sorted set is a set as well, every element in a sorted set is associated with a floating point value, called the score (this is why the type is also similar to a hash, since every element is mapped to a value).

Zset 类型（有序集合类型）相比于 Set 类型多了一个排序属性 score（分值），对于有序集合 Zset 来说，每个存储元素相当于有两个值组成的，一个是有序集合的元素值，一个是排序值。

Implementation note: Sorted sets are implemented via a dual-ported data structure containing both a skip list and a hash table, so every time we add an element Redis performs an `O(log(N))` operation.

应用场景：排行榜、电话姓名排序

```
> zadd weekend 6 Saturday 7 Sunday
(integer) 2
> zrange weekend 0 -1
1) "Saturday"
2) "Sunday"
> zrange weekend 0 -1 withscores
1) "Saturday"
2) "6"
3) "Sunday"
4) "7"
> zrevrange weekend 0 -1
1) "Sunday"
2) "Saturday"
```

学生成绩排名

```
> zadd student 90 gavin 98 yola 80 ivan 85 jack 88 john
(integer) 5
> zrange student 0 -1
1) "ivan"
2) "jack"
3) "john"
4) "gavin"
5) "yola"
> zrevrange student 0 2
1) "yola"
2) "gavin"
3) "john"
```


## 典型应用场景

*Real-time data store*

Redis' versatile in-memory data structures enable building data infrastructure for real-time applications that require low latency and high-throughput.

*Caching & session storage*

Redis' speed makes it ideal for caching database queries, complex computations, API calls, and session state.

*Streaming & messaging*

The stream data type enables high-rate data ingestion, messaging, event sourcing, and notifications.

### Redis 作为 MySQL 缓存

Redis 单机的 QPS 能轻松破 10w，而 MySQL 单机的 QPS 很难破 1w。




## 数据持久化

Redis 的读写操作都在内存中进行，重启后内存中的数据就会丢失，那为了保证内存中的数据不丢失，Redis 实现了数据持久化的机制，把数据存储到磁盘，重启后从磁盘恢复原有的数据。

Redis 共有三种数据持久化的方式：

* AOF 日志 (Append Only File)：每执行一条写操作命令，就把该命令以追加的方式写入到一个(硬盘中的)文件里
* RDB 快照 (Redis Database)：将某一时刻的内存数据，以二进制的方式写入磁盘
* 混合持久化方式：Redis 4.0 新增，集成了 AOF 和 RBD 的优点

### AOF 重写

当 AOF 文件的大小超过所设定的阈值后，Redis 就会启用 AOF 重写机制，来压缩 AOF 文件。

重写时会读取当前数据库中的所有键值对，然后将每一个键值对用一条命令记录到新的 AOF 文件。

```txt
// 重写前有两条记录
set name foo
set name bar

// 重写后只需要保留最新的一条记录就行
set name bar
```

重写有一个 bgrewriteaof 子进程负责。重写期间，Redis 执行完一个写命令之后，会同时将这个写命令写入到 「AOF 缓冲区」和 「AOF 重写缓冲区」。重写完成后，主进程会将「AOF 重写缓冲区」的数据追加到新的 AOF 文件。

### RBD 写时复制

Redis 提供了两个命令来生成 RDB 文件，分别是 save 和 bgsave，他们的区别就在于是否在「主线程」里执行：
* 执行 save 命令，会在主线程生成 RDB 文件，如果写入 RDB 文件的时间太长，会阻塞主线程
* 执行 bgsave 命令，会创建一个子进程来生成 RDB 文件，这样可以避免主线程的阻塞

写时复制技术 (Copy-On-Write, COW) 技术。。。


## Redis 集群

### 主从复制

### 哨兵模式

### 切片

Redis Cluster 方案采用哈希槽（Hash Slot），来处理数据和节点之间的映射关系。

### 集群脑裂




## 缓存设计

### 缓存失效 Cache Problems

缓存雪崩 cache avalanche *大量缓存数据同时过期*

大量缓存数据在同一时间过期（失效）时，如果此时有大量的用户请求，都无法在 Redis 中处理，于是全部请求都直接访问数据库，从而导致数据库的压力骤增，严重的会造成数据库宕机，从而形成一系列连锁反应，造成整个系统崩溃，这就是缓存雪崩。

可以将缓存失效时间随机打散，降低缓存集体失效的概率。

<image src="./images/redis-cache-miss.webp" width=396 />

缓存击穿 cache breakdown *某个热点数据过期*

我们的业务通常会有几个数据会被频繁地访问，这就是热点数据。如果缓存中的某个热点数据过期了，此时大量请求访问该热点数据，就无法从缓存中读取，直接访问数据库，数据库很容易被高并发的请求冲垮，这就是缓存击穿的问题。

应对缓存击穿可以采取前面说到两种方案：
* 互斥锁方案（Redis 中使用 setNX 方法设置一个状态位，表示这是一种锁定状态），保证同一时间只有一个业务线程请求缓存，未能获取互斥锁的请求，要么等待锁释放后重新读取缓存，要么就返回空值或者默认值。
* 不给热点数据设置过期时间，由后台异步更新缓存，或者在热点数据准备要过期前，提前通知后台线程更新缓存以及重新设置过期时间；


缓存穿透 cache penetration *数据库中也没有数据*

当用户访问的数据，既不在缓存中，也不在数据库中，导致请求在访问缓存时，发现缓存缺失，再去访问数据库是，发现数据库中也没有要访问的数据，没办法构建缓存数据。那么当有大量请求过来时，数据库的压力剧增，这就是缓存穿透。

导致缓存穿透的原因有
* 业务误操作删除了数据库中的数据
* 黑客恶意攻击，故意大量访问某些读取不存在的数据的业务

应对缓存穿透的常见方案有
* 入参校验，如果判断出是非法请求，直接返回错误
* 设置空值或默认值，当线上业务发现缓存穿透现象时，可以针对查询的数据，在缓存中设置一个空值或默认值
* 使用布隆过滤器快速判断数据是否存在，避免通过查询数据库来判断数据是否存在

### 缓存策略 Caching Strategies

常见的缓存更新策略有 Cache Aside 旁路缓存、Read/Write Through (读穿/写穿)、Write Back (写回) 3种策略。

实际开发中，Redis 和 MySQL 都用的是 旁路缓存 策略，另外两种策略应用不了。

Cache Aside（旁路缓存）策略是最常用的，应用程序直接与「数据库、缓存」交互，并负责对缓存的维护，该策略又可以细分为「读策略」和「写策略」。

旁路缓存写步骤：先更新数据库中的数据，再删除缓存中的数据。

<image src="./images/cache-aside.webp" width=366 />

读写穿策略中，应用程序只和缓存交互，不再和数据库交互，相当于更新数据库的操作由缓存自己代理了。但我们常见的分布式缓存组件(memcached, redis)都不提供写入数据库和自动加载数据的功能。

Write Back（写回）策略在更新数据的时候，只更新缓存，同时将缓存数据设置为脏的，然后立马返回，并不会更新数据库。对于数据库的更新，会通过批量异步更新的方式进行。Write Back 特别适合写多的场景。但问题也很明显，数据不是强一致的，而且会有数据丢失的风险。





















