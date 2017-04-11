# MongoDB 权威指南 P1

https://docs.mongodb.com/manual/reference/method/

## 1. 简介





## 2. 基础知识



### 2.5 MongoDB shell

shell 是一个功能完备的 JavaScript 解析器，可运行任意 JavaScript 程序。

在某行连续三次按下回车键可取消未输入完成的命令，并退回到 `>` 提示符。

能运行任意 JS 程序听上去很酷，不过 shell 真正强大之处在于，它是一个独立的 MongoDB 客户端。

启动时，shell 会连到服务器的 test 数据库，并将数据库连接赋值给全局变量 db。

为了方便习惯使用 SQL shell 的用户，shell 还包含了一些非 JS 语法的扩展，如 `use` 命令。

```js
> db          // 显示当前数据库
 test
> use foobar  // 切换数据库
```

#### 基本操作

```js
> post = {title: 'My Blog Post', content: "Here's my blog post.", date: new Date}
> db.blog.insert(post) // 创建(插入)文档
> db.blog.find()       // shell 最多显示 20 个匹配文档
> db.blog.findOne()    // 只显示第一个匹配文档
> post.comments = []
> db.blog.update({title: 'My Blog Post'}, post)  // 更新文档，第一个参数用于限定条件，第二个参数是新的文档
> db.blog.remove({title: 'My Blog Post'})
```

#### 定制 shell

##### 修改默认连接行为

```text
$ mongo some-host:3000/myDB  # 启动时指定连接的特定 MongoDB 实例
$ mongo --nodb  # 启动时不连接任何数据库
> conn = new Mongo('some-host:3000')  # 随时都可以连接新的 mongod
> db = conn.getDB('myDB')             # 然后确定连接的数据库
```

##### 创建 `.mongorc.js` 配置文件

如果某些脚本会被频繁加载，那么可以添加到用户主目录下的 `.mongorc.js` 文件中，shell 启动会自动运行该脚本。

如果启动 shell 时指定 `--norc` 参数，则可以禁止在启动时加载 `.mongorc.js` 文件。

##### 定制 shell 提示

将 `prompt` 变量设为一个字符串或者函数，就可以重写默认的 shell 提示。

```js
prompt = function() {
  if (typeof db === 'undefined') { return '(nodb)> '; }
  try { db.runCommand({getLastError: 1}); }
  catch (err) { print(err); }
  return db + '> ';
}
```

#### 高级用法

##### 小贴士

对于 MongoDB 特有的功能，shell 内置了帮助文档，可以使用 `help` 命令查看。可以通过 `db.help()` 查看数据库级别的帮助，使用 `db.foo.help()` 查看集合级别的帮助。

如果想知道一个函数是做什么的，可以直接输入函数名，就可以看到相应函数的 JS 源码。

##### 执行脚本

```bash
$ mongo s1.js s2.js s3.js  # shell 会依次执行传入的脚本，然后退出
$ mongo --quiet some-host:3000/foo s1.js s2.js s3.js  # 指定主机 端口 数据库

# 还可以在交互式 shell 中运行脚本
> load('s1.js')
```

脚本中可以访问 db 变量以及其他全局变量，然而，shell 辅助函数 `use` `show` 等不可以在脚本中使用，但都有对应的 JS 函数：

| shell 辅助函数     | 等价函数
|--------------------|-----------------------------
| `use foo`          | `db.getSisterDB('foo')`
| `show dbs`         | `db.getMongo().getDBs()`
| `show collections` | `db.getCollectionNames()`

可以使用脚本将变量注入到 shell。例如，可以在脚本中简单地初始化一些常用的辅助函数，将通用的任务和管理活动自动化。

默认情况下，`load(script.js)` 会在运行 shell 所处目录(`pwd()` 或 `run('pwd')`)中查找脚本，如果不在当前目录，则须指定相对路径或绝对路径。

##### 增强多行编辑

shell 的多行支持非常有限，不可以编辑之前的行，因此，对于大块的代码或者对象，你可能更愿意在编辑器中编辑，这可以通过设置 `EDITOR` 变量来实现：

```js
> EDITOR = ''
> var wap = db.books.findOne({title: 'War and Pease'})
> edit wap  // 修改完成后保存并退出编辑器，变量会被重新解析并加载会 shell
```

##### 集合命名注意事项

如果集合名称中包含保留字或者无效的 JS 属性名，那么就不能以 `db.blog` 这种形式来访问集合了，有以下2种变通方法：

```js
> db.getCollection('version');  // 这个适用面最广
> db['3col']  // 对于无效属性名称也可以采用数组访问语法，但对于 db['version'] 无效
```

### 2.6 数据类型

JSON 是一种简单的数据表示方式，仅包含6种数据类型：null 布尔值 数字 字符串 数组 和 对象。所以 JSON 的表达能力有一定局限。

MongoDB 在保留 JSON 基本键/值对特性的基础上，添加了其他一些数据类型：日期 正则表达式 ObjectId 二进制数据 等。

#### _id 和 ObjectId

MongoDB 中存储的文档必须有一个 `_id` 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象。每个文档都有一个唯一的 `_id`，同一个集合里的文档的 `_id` 不能重复。

ObjectId 是 `_id` 的默认类型。它设计成轻量型的，不同的机器都能用全局唯一的同种方法方便地生成它。MongoDB 没有采用常规的做法(如自增主键)的主要原因是，设计 MOngoDB 的初衷就是用作分布式数据库，所以能够在分片环境中生成唯一的标识符非常重要。

ObjectId 使用 12字节的存储空间，是一个由 24个十六进制数字组成的字符串。
  * 时间戳提供了秒级别的唯一性
  * 主机唯一标识，通常是机器主机名的散列值 hash
  * 进程标识 PID
  * 计数器，一秒钟最多允许有 16 777 216 个不同的 ObjectId

```text
58 | ec | a3 | 2d | 71 | b3 | 43 | 6f | e8 | fc | 84 | fe
      时间戳      |    机器码    |   PID   |   计数器
```

如果插入文档时没有 `_id` 键，系统会自动帮你创建一个，可以由 MongoDB 服务器来做这件事，但通常会在客户端由驱动程序完成。这一做法非常好地体现了 MongoDB 哲学：能交给客户端驱动程序做的事情就不要交给服务器来做。将工作交由客户端来处理，就减轻了数据库宽展的负担。


## 3. 增删改

### 3.1 插入并保存文档

```js
> db.foo.insert({bar: 'baz'});
> db.foo.insertMany([{_id: 0}, {_id: 1}, {_id: 2}]);
```

`insertMany()` 方法只能将多个文档插入到一个集合，不能在单次请求中将多个文档批量插入到多个集合中。要是只导入原始数据，可以使用命令行工具 `mongoimport`，而不是批量插入。

如果在执行批量插入的过程中有一个文档插入失败，那么在这个文档之前的所有文档都会成功插入到集合中，而这个文档以及之后的所有文档都插入失败。

```js
> db.foo.insertMany([{_id: 0}, {_id: 1}, {_id: 0}, {_id: 2}]);  // 只成功插入前两项，其它失败
```

插入数据时，MongoDB 只对数据进行最基本的检查：检查文档是否有 `_id` 字段，没有就自动加一个，检查大小是否超出了 16M。

由于 MongoDB 只进行最基本的检查，所以插入非法数据很容易。不过，主流语言的驱动程序都会在将数据插入到数据库之前做大量的数据校验。

### 3.2 删除文档

删除数据是永久性的，不能撤销，也无法恢复。

```js
> db.foo.remove();  // 会删除集合中所有文档，但不会删除集合本身，也不会删除集合的元信息
> db.mailing.list.remove({'opt-out': true});  // 有选择地删除 mailing.list 集合中 opt-out 为 true 的人
> db.foo.drop();  // 当需要清空一个包含很多文档的集合时，remove 效率就很低了，而 drop 直接删除整个集合就非常快
```

### 3.3 更新文档

#### 文档替换

```js
db.people.update({_id: ObjectId('58ecddb9a65a35c77e1e7efb')}, {username: 'joe'});  // 完整替换，但 _id 不会变
```

#### 使用修改器

使用修改器，可以实现对文档的部分更新。

使用修改器时，`_id` 的值不能改变(注意，整个文档替换时可以改变 _id)，除此另无约束。

```js
> db.foo.insert({url: 'www.example.com', pageviews: 52})
> db.foo.update({url: 'www.example.com'}, {$inc: {pageviews: 2}})  // 部分修改
> db.foo.findOne({url: 'www.example.com'})
{
        "_id" : ObjectId("58ece0c8a65a35c77e1e7efc"),
        "url" : "www.example.com",
        "pageviews" : 54
}
```

常用修改器：
  * $set -- 指定一个字段的值，如果这个字段不存在则新建它 {$set {book: 'War and Peace'}
  * $unset -- 删除一个键 {$unset: {book: 1}}
  * $inc -- 增加已有键的值，如果该键不存在则创建它 {$inc: {score: 5}}
  * $push -- 向已有数组末尾加入一个元素，如果没有就新建一个数组 {$put {comments: 'lalala'}}
  * $pop -- 从数组末尾删除一个元素
  * $pull -- 会将所有数组中的匹配项删除

#### update 选项

```js
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>, 默认 false
     multi: <boolean>, 默认 false
     writeConcern: <document>,
     collation: <document>
   }
)
```

upsert 是一种特殊的更新，要是没有找到符合更新条件的文档，就会以这个条件和更新文档为基础创建一个新的文档。

默认情况下，更新只对符合匹配条件的第一个文档执行操作，如果需要更新所有匹配的文档，则须设置 multi 选项为 true

#### 返回被更新的文档

调用 getLastError 仅能获得关于更新的有限信息，并不能返回被更新的文档。可以通过 `findAndModify` 命令得到被更新的文档，这对于操作队列以及执行其他需要进行原子性取值和赋值的操作来说，十分方便。

```js
db.collection.findAndModify({
    query: <document>,
    sort: <document>,
    remove: <boolean>,
    update: <document>,
    new: <boolean>,     // 默认返回更新之前的文档内容，指定为 true 则返回更新后的文档内容
    fields: <document>,
    upsert: <boolean>,
    bypassDocumentValidation: <boolean>,
    writeConcern: <document>,
    collation: <document>
});
```

### 3.4 写入安全机制

写入安全 Write Concern 是一种客户端设置，用于控制写入的安全级别。默认情况下，插入、删除和更新都会一直等待数据库响应(是否成功)，然后才会继续执行。通常，遇到错误时，客户端会抛出一个异常。

一些选项可用于精确控制需要应用程序等待的内容。两种最基本的写入安全机制是应答式写入 acknowledge write 和 非应答式写入 unacknowledged write。应答式写入时默认方式，而非应答式写入不返回任何响应，无法知道写入是否成功。

对于一些不是特别重要的数据(比如日志)可以使用非应答式写入。尽管非应答式写入不返回数据库错误，但是这不代表应用程序不需要做错误检查。


## 4. 查询




