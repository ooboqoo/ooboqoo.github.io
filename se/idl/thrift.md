# Thrift

https://github.com/facebook/fbthrift

教程 http://diwakergupta.github.io/thrift-missing-guide/

IDL标准 https://thrift.apache.org/docs/idl.html

Thrift is a serialization and RPC framework for service communication. Most services at Facebook are written using Thrift for RPC, and some storage systems use Thrift for serializing records on disk.

At a high level, Thrift is three major things
* A Code Generator 代码生成引擎
* A Serialization Framework 序列化框架
* An RPC Framework









## 数据类型

### 基本数据类型

|||
---------|-----------------------------------------
`bool`   | 布尔值          true or false
`byte`   | 有符号字节      A signed byte
`i16`    | 16位有符号整数  A 16-bit signed integer
`i32`    | 32位有符号整数  A 32-bit signed integer
`i64`    | 64位有符号整数  A 64-bit signed integer
`double` | 64位浮点数      A 64-bit floating point number
`binary` |                A byte array
`string` | 编码无关的字符串 An encoding-agnostic text or binary string

注：因为很多目标语言不支持 unsigned integer，所以 Thrift 选择不提供这些无符号整数类型。

### 容器类型 `list` `map` `set`

* `list<t1>` An ordered list of elements of type t1. May contain duplicates.
* `set<t1>` An unordered set of unique elements of type t1.
* `map<t1,t2>` A map of strictly unique keys of type t1 to values of type t2.

### 结构体 `struct`



### 枚举 `enum`


### 异常 `exception`

Thrift 支持自定义异常，语法跟 struct 类似

```thrift
exception NotFound {
  1: string message,
}
```






### 自定义类型 `typedef`

```thrift
typedef i32 Integer
```


### 服务 `service`

```thrift
service UserService {
  User query_user(1: i32 user_id) throws (1: NotFound not_found),
  User add_user(1: User user);  // 接口定义之间的分隔符可以是 `,` 或 `;`
}
```



## 其他

### 注释 `//` `/* */` `#`

Thrift IDL支持 C/C++ 风格的 `//`，`/*，*/` 注释，也支持 Python 风格的 `#` 注释。

### 命名空间 `namespace`

Thrift 支持 C++ 风格的命名空间，等同于 Java、Python 中 package 的概念。

```thrift
namespace js com.example.project
```

### 导入 `include`

```thrift
include "tweet.thrift"  // 文件名要用 `"` 包起来；末尾不需要 `;`

struct TweetSearchResult {
  1: list<tweet.Tweet> tweets;  // 需要带 `tweet` 前缀
}
```

### 常量 `const`

```thrift
const i32 INT_CONST = 1234;  // `;` 是可选的
const map<string,string> MAP_CONST = {"hello": "world", "goodnight": "moon"}  // JSON 表示法
```








## 生成代码

```bash
brew install thrift
thrift -r --gen js example.thrift
```

```thrift
// example.thrift

namespace cpp thrift.example
namespace java thrift.example

enum TweetType {
    TWEET,
    RETWEET = 2,
    DM = 0xa,
    REPLY
}

struct Location {
    1: required double latitude;
    2: required double longitude;
}

struct Tweet {
    1: required i32 userId;
    2: required string userName;
    3: required string text;
    4: optional Location loc;
    5: optional TweetType tweetType = TweetType.TWEET;
    16: optional string language = "english";
}

typedef list<Tweet> TweetList

struct TweetSearchResult {
    1: TweetList tweets;
}

exception TwitterUnavailable {
    1: string message;
}

const i32 MAX_RESULTS = 100;

service Twitter {
    void ping(),
    bool postTweet(1:Tweet tweet) throws (1:TwitterUnavailable unavailable),
    TweetSearchResult searchTweets(1:string query);
    oneway void zip()
}
```












