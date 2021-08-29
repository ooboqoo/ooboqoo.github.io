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
`bool`   | 布尔值          true or false, one byte
`byte`   | 有符号字节      A signed byte
`i16`    | 16位有符号整数  A 16-bit signed integer
`i32`    | 32位有符号整数  A 32-bit signed integer
`i64`    | 64位有符号整数  A 64-bit signed integer
`double` | 64位浮点数      A 64-bit floating point number
`binary` | 二进制串        A byte array
`string` | 编码无关的字符串 An encoding-agnostic text or binary string

注：因为很多目标语言不支持 unsigned integer，所以 Thrift 选择不提供这些无符号整数类型。

### 容器类型 `list` `map` `set`

* `list<T>` An ordered list of elements of type T. May contain duplicates.
* `set<T>` An unordered set of *unique* elements of type T.
* `map<T,U>` A map of strictly unique keys of type T to values of type U.

容器里存放的类型可以是任何 service 以外的有效 Thrift 类型，包含 struct 和 exception

### 结构体 `struct`

`struct`s are the basic building blocks in a Thrift IDL. A struct is composed of fields; each field has a unique integer identifier, a type, a name and an optional default value.

```thrift
struct Tweet {
  1: i32 userId;                            // must have a unique, positive integer identifier
  2: required string userName;              // may be marked as `required` or `optional`
  16: optional string language = "english"  // 默认值
}
```

### 异常 `exception`

Thrift 支持自定义异常，语法跟 struct 类似

```thrift
exception NotFound {
  1: string message,
}
```

### 自定义类型 `typedef`

```thrift
typedef i32 Integer  // 末尾不带 `;`
```


### 枚举 `enum`

```thrift
enum TweetType {
  TWEET,
  RETWEET = 2,    // 可选的 ',' 或 ';'
  DM = 0xa,
  REPLY
}                  // 末尾不带 `;`
```

### 服务 `service`

```thrift
service UserService {
  User query_user(1: i32 user_id) throws (1: NotFound not_found),  // throws
  User add_user(1: User user);  // 接口定义之间的分隔符可以是 `,` 或 `;`
}
```


## 其他

### 注释 `//` `/* */` `#`

Thrift IDL支持 C/C++ 风格的 `//`，`/* */` 注释，也支持 Python 风格的 `#` 注释。

### 命名空间 `namespace`

Thrift 支持 C++ 风格的命名空间，等同于 Java、Python 中 package 的概念。

```thrift
namespce java com.example.project  // 转换成 `package com.example.project`
namespace js com.example.project
```

### 导入 `include`

```thrift
include "tweet.thrift"  // 文件名要用 `"` 包起来；末尾不需要 `;`

struct TweetSearchResult {
  1: list<tweet.Tweet> tweets;  // 使用时需要带文件名前缀，如这里的 `tweet`
}
```

### 常量 `const`

```thrift
const i32 INT_CONST = 1234;  // `;` 是可选的
const map<string,string> MAP_CONST = {"hello": "world", "goodnight": "moon"}  // JSON 表示法
```


## 代码生成

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

