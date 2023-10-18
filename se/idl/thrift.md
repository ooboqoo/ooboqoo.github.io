# Thrift

Apache Thrift https://thrift.apache.org/docs/idl.html   
FBThrift https://github.com/facebook/fbthrift   
教程 http://diwakergupta.github.io/thrift-missing-guide/   


Thrift is a serialization and RPC framework for service communication. Most services at Facebook are written using Thrift for RPC, and some storage systems use Thrift for serializing records on disk.

At a high level, Thrift is three major things
* A Code Generator 代码生成引擎
* A Serialization Framework 序列化框架
* An RPC Framework 用于微服务间通信的 RPC 框架

Apache Thrift VS FBThrift：Apache Thrift 最早也是 FB 开源的，但后来 FB 又另起炉灶搞了套新的。两者的核心内容是一样的，简单来说，FBThrift功能更多更强，性能也更好。


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

`struct`s are the basic building blocks in a Thrift IDL. A struct is composed of fields; each field has *a unique integer identifier*, *a type*, *a name* and *an optional default value*.

关于修改定义
* 字段编号 和 字段类型 不能变更
* 字段名修改，在 RPC 通信场景下改字段名无影响但须关注生成的代码的变更导致的影响；在序列化场景下。。。
* 修改默认值应该改不坏啥。

```thrift
struct Tweet {
  1: i32 userId;                            // must have a unique, positive integer identifier
  2: required string userName;              // may be marked as `required` or `optional`
  16: optional string language = "english"  // 默认值
}
```

* `required`: must exist on read, must be set on write
* `optional`: may or may not be set, entirely optional
* default: may not exist on read, always written (unless it is a null pointer)


Q: Is safe to rename a field in Thrift IDL? [Link](https://stackoverflow.com/questions/52882370/is-safe-to-rename-a-field-in-thrift-idl)  
A: Yes it is 100% safe. *Thrift only deals with field IDs internally*. The *names of a struct as well as method argument names are used to generate field names in the generated code only*. They do not even go over the wire.   
Furthermore, it is a recommended way *to deprecate fields*. Even in the case where a field is fully retired, one *should comment it out but leave it in the IDL to prevent the numeric field ID from being accidentally reused*.

```thrift
struct Tweet {
  2: required string deprecatedUserName;  // 通过加字段前缀来废弃字段
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
namespace java com.example.project  // 转换成 `package com.example.project`
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


## 最佳实践

https://tomsoir.medium.com/thrift-types-best-practice-2bb902b11076

#### 方法的请求参数和返回参数都应该定义为结构体

Service interfaces should use a struct for the response type, even when the output can take the elementary type that thrift supports.

Fields cannot change type, so it’s impossible to change the return type of a method once it’s been defined. Changing fields in a returned struct is possible to do compatible though. Make sure to follow the rules for structs here too.

```thrift
service A {
  // Bad
  int32 get_something()

  // Good
  SomeResultType get_something()
}
```

#### Never reuse field IDs

This applies to structs, parameter lists, and exceptions.

You must never reuse a field ID as this is essentially changing the type of a field which is not a compatible change.
To prevent this from happening over time, leave obsoleted fields around in your thrift file as either a comment or a renamed field.

#### Everything is `optional`

所有的字段都应该是 `optional` 的，即便是 id 这类看似必须的，其实也可能修改类型（也就意味着要换插槽）。唯一性的保证应该交由业务代码来保证，而不是靠 Thrift 传输层来保证。

Yes, it means everything. This includes fields like thing_id, user_id, or any fields that cannot possibly be empty. This best-practice is counterintuitive indeed. For folks coming from a database world, it would be unthinkable that how would an RPC query being processed if nothing inside the request is populated (since they are all optional).

First, your “this field cannot be possibly empty” is a real concern. The catch here is that your application should check that no matter what. The RPC protocol itself, however, is a bad place to check this constraint, for many reasons.

RPC is about wire transmission. It should be agnostic of what is required by a particular query.

Required is forever, even in unit tests, as thrift object refuses to be useable if a required field is not filled. So you’d need to fill in dummy values even you just want to test the processing logic on something else.

It is almost always that you’d later found that, what you think is required is not that required. There is always a different way of fetching information than one primary id.

It is almost always that you’d upgrade the system and change the field type/format. Say you put down the primary_key to a DB as a required field, and it can be an i32. Making perfect sense at the moment. However, if you want to upgrade the primary key format (say from i32 to i64), you’d be forced to introduce a new field instead, as you cannot change field type for backward compatibility reason. Your application can adapt, but the protocol still needs to populate both old and new as they are required. This will become an unnecessary burden or tech debt that you cannot get rid of.

#### 完善的注释

https://dev.evernote.com/doc/reference/NoteStore.html#Struct_RelatedQuery

```bash
thrift -gen HTML your_file.thrift
```


## 变更管理 Version Compatibility

https://tomsoir.medium.com/thrift-types-best-practice-2bb902b11076


#### 如何 deprecate 一个 field



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
