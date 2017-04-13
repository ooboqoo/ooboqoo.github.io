# MongoDB 权威指南 P1

https://docs.mongodb.com/manual/reference/method/

## 1. 简介

### 安装

MongoDB 是自包含的，没有系统依赖，你可以随意移动 MongoDB 安装目录。

MongoDB 需要有个目录来保存数据，默认为当前所在磁盘的 `\data\db` 位置，当然也可以通过 `--dbpath` 或配置文件指定。

如果希望输入命令直接启动 MongoDB，须先添加环境变量。

```bash
$ mongod   # 开启 MongoDB Server
$ mongo    # 打开 shell 连接 server 并进行操作
```

### 特点

#### 易于使用

MongoDB 是一个面向文档 document-orientied 的数据库，而不是关系型数据库。不采用关系模型主要是为了获得更好的扩展性。

与关系型数据库相比，面向文档的数据库不再有 "行" row 的概念，取而代之的是更为灵活的 "文档" document 模型。通过在文档中嵌入文档和数组，面向文档的方法能够仅使用一条记录来表现复杂的层次关系，这与使用现代面向对象语言的开发者对数据的看法一致。

另外不再有预定义模式 predefined schema，文档的键 key 和值 value 不再是固定的类型和大小。由于没有固定的模式，根据需要增删字段变得更加容易。

#### 易于扩展

MongoDB 面向文档的数据模型使它能很容易地在多台服务器之间进行数据分割。MongoDB 能自动处理跨集群的数据和负载，自动重新分配文档，以及将用户请求路由到正确的机器上。

#### 丰富的功能

#### 卓越的性能

只要有可能，MongoDB 服务器就会将处理和逻辑交给客户端(通过驱动程序或用户的应用程序代码来实现)，这种精简方式的设计是 MongoDB 能够实现如此高性能的原因之一。


## 2. 基础知识

### 2.1 文档

文档是 MongoDB 的核心概念。文档就是键值对的一个有序集。

文档的键是字符串，除了少数例外情况，键可以使用任意 UTF-8 字符。
  * 键不能含有 `\0` (空字符)，这个字符用于表示键的结尾
  * `.` 和 `$` 具有特殊意义，只能在特定环境下使用

MongoDB 的文档不能有重复的键，例如这种就不行 `{greeting: 'Hello World', greeting: 'Hello MongoDB'}`。

文档中的键/值对是有序的，像 `{x: 1, y: 2}` 与 `{y: 2, x: 1}` 是不同的文档。

### 2.2 集合

集合就是一组文档，如果将 MongoDB 中的一个文档比喻为关系型数据库中的一行，那么一个集合就相当于一张表。

#### 动态模式

集合是动态模式的，这意味着一个集合里面的文档可以是各式各样的，集合里面的文档可以完全不同。

因为集合里面可以放置任何文档，随之而来的一个问题是，还有必要使用多个集合吗？这里有几个重要的原因：
  * 把各种各样的文档不加区分地放在同一个集合里，无论对开发者还是对管理员来说都将是噩梦
  * 在一个集合里查询特定类型的文档在速度上也很不划算
  * 把同种类型的文档放在一个集合里，数据会更加集中，所需磁盘寻道操作更少
  * 创建索引时，需要使用文档的附加结构，在一个集合中只放入一种类型的文档，可以更有效地对集合进行索引

上面这些重要原因促使我们创建一个模式，把相关类型的文档组织在一起，尽管 MongoDB 对此并没有强制要求。

#### 命名

集合使用名称进行标识，集合名可以是满足以下条件的任意 UTF-8 字符串。
  * 不能是空字符串 `''`， 不能包含 `\0` 和 `$` 字符
  * 不能以 `system.` 开头，这是为系统集合保留的前缀

##### 子集合

组织集合的一种惯例是使用 `.` 分隔不同命名空间的子集合，如 `blog.posts` `blog.authors`。

子集合其实就是一种命名约定，为了使组织结构更清晰。

### 2.3 数据库

一个 MongoDB 实例可以承载多个数据库，每个数据库拥有 0个或者多个集合。每个数据库都有独立的权限，即便是在磁盘上，不同的数据库也放置在不同的文件中。

按照经验，我们将有关一个应用程序的所有数据都存储在同一个数据库中。要想在同一个 MongoDB 服务器上存放多个应用程序或者用户数据，就需要使用不同的数据库。

数据库通过名称来标识，数据库名有诸多约束，但只要记住 "数据库最终会变成文件系统里的文件，而数据库名就是相应的文件名" 这一点，也就知道原因了。简单点，统一只使用 ASCII 小写字母和数字，就好了。

另外，一些数据库名是保留的，可以直接访问这些有特殊语义的数据库。
  * admin -- 从身份验证的角度来讲，这是 "root" 数据库
  * local -- 这个数据库永远都不可以复制
  * config -- 分片设置时，分片信息会存储在 config 数据库中

把数据库名添加到集合名前，得到集合的完全限定名，即命名空间 namespace。如，要使用 cms 数据库中的 blog.posts 集合，这个集合的命名空间就是 cms.blog.posts。(shell 里直接输入不行，具体用法待补充)

### 2.4 MongoDB shell

shell 是一个功能完备的 JavaScript 解析器，可运行任意 JavaScript 程序。

能运行任意 JS 程序听上去很酷，不过 shell 真正强大之处在于，它是一个独立的 MongoDB 客户端。

启动时，shell 默认会连到服务器的 test 数据库，并将数据库连接赋值给全局变量 `db`。

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
> prompt = function() {
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
> EDITOR = 'notepad'
> var wap = db.books.findOne({title: 'War and Pease'})
> edit wap  // 修改完成后保存并退出编辑器，变量会被重新解析并加载会 shell
```

##### 集合命名注意事项

如果集合名称中包含保留字或者无效的 JS 属性名，那么就不能以 `db.blog` 这种形式来访问集合了，有以下2种变通方法：

```js
> db.getCollection('version');  // 这个适用面最广
> db['3col']  // 对于无效属性名称也可以采用数组访问语法，但对于 db['version'] 无效
```

### 2.5 数据类型

JSON 是一种简单的数据表示方式，仅包含 6种数据类型：null 布尔值 数字 字符串 数组 和 对象。故 JSON 表达能力有一定局限。

MongoDB 在保留 JSON 基本键/值对特性的基础上，添加了其他一些数据类型：日期 正则表达式 ObjectId 二进制数据 等。

#### _id 和 ObjectId

MongoDB 中存储的文档必须有一个 `_id` 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象。每个文档都有一个唯一的 `_id`，同一个集合里的文档的 `_id` 不能重复。

ObjectId 是 `_id` 的默认类型。不同的机器都能用全局唯一的同种方法方便地生成它。MongoDB 没有采用常规的做法(如自增主键)的主要原因是，设计 MongoDB 的初衷是用作分布式数据库，所以能够在分片环境中生成唯一的标识符非常重要。

ObjectId 使用 12字节的存储空间，是一个由 24个十六进制数字组成的字符串。
  * 时间戳提供了秒级别的唯一性
  * 主机唯一标识，通常是机器主机名的散列值 hash
  * 进程标识 PID
  * 计数器，一秒钟最多允许有 16 777 216 个不同的 ObjectId

```text
58 | ec | a3 | 2d | 71 | b3 | 43 | 6f | e8 | fc | 84 | fe
      时间戳      |    机器码    |   PID   |   计数器
```

如果插入文档时没有 `_id` 键，系统会自动帮你创建一个，可以由 MongoDB 服务器来做这件事，但通常会在客户端由驱动程序完成。这一做法非常好地体现了 MongoDB 哲学：能交给客户端驱动程序做的事情就不要交给服务器来做。将工作交由客户端来处理，就减轻了数据库扩展的负担。


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

插入数据时，MongoDB 只对数据进行最基本的检查：检查文档是否有 `_id` 字段(没有会自动添加)，检查大小是否超出了 16M。

由于只进行最基本的检查，所以插入非法数据很容易。不过，主流语言的驱动程序都会在将数据插入到数据库之前做大量的数据校验。

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
db.people.update({_id: ObjectId('58ecddb9a65a35c77e1e7efb')}, {username: 'joe'});
  // 完整替换，但 _id 没指定就不会变
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

一些选项可用于精确控制需要应用程序等待的内容。两种最基本的写入安全机制是应答式写入 acknowledge write 和 非应答式写入 unacknowledged write。应答式写入是默认方式，而非应答式写入不返回任何响应，无法知道写入是否成功。

对于一些不是特别重要的数据(比如日志)可以使用非应答式写入。尽管非应答式写入不返回数据库错误，但是这不代表应用程序不需要做错误检查。


## 4. 查询

### 4.1 find 简介

```js
> db.c.find()                        // 等同于 find({})
> db.c.find({age: 27, name: 'joe'})  // 指定多个查询限制条件
> db.c.findOne()                     // 只返回第一个匹配文档

// 指定需要返回的键
> db.c.find({}, {name: 1, email: 1}) // 只返回集合中的 name email _id 这几个字段
> db.c.find({}, {name: 1, _id: 0})   // 只返回集合中的 name 字段
> db.c.find({}, {email: 0})          // 返回集合中除 email 字段外的其他字段
```

### 4.2 查询条件

查询不仅能像前面说的精确匹配，还能匹配更加复杂的条件，比如范围、OR子句和取反。

`$lt` `$lte` `$gt` `$gte` 就是全部的值比较操作符，分别对应 `<` `<=` `>` `>=`。可以组合使用以便查找一个范围的值。

`$ne` 表示不相等，区别与前 4个比较操作符的地方是，它能用于所有数据类型。

`$in` `$or` 是两种 OR 查询操作符，`$in` 与条件数组配合使用，而 `$or` 则更为通用。

`$not` 是元条件句，可以用在任何其他条件之上。与正则表达式联合使用时极为有用，用来查找那些与特定模式不匹配的文档。

> 使用普通的 AND 型查询时，第一个条件应该尽可能少地匹配文档，而 OR 型查询则相反，应该尽可能多地匹配文档，这样才是最高效的。


```js
> db.users.find({age: {$gte: 18, $lte: 30}})  // 查找 18-30岁(含)之间的人
> db.users.find({name: {$ne: 'joe'}})         // 查找 name 不为 joe 的人
> db.raffle.find({ticket: {$in: [725, 542, 930]}})  // 查找中奖的人，中奖号为 725 542 930
> db.users.find(user_id: {$in: [12345, 'joe']})     // 可以指定不同类型的条件和值
> db.raffle.find({$or: [{ticket: 725}, {winner: true}]})
```

### 4.3 特定类型查询

#### null

`null` 类型的行为有点奇怪，它不仅能匹配自身，而且还会匹配不包含这个键的文档。

```js
> db.c.find({z: {$eq: null, $exists: true}})  // 匹配值为 null 的文档，但不匹配不存在的文档
```

#### 正则表达式

正则表达式能够灵活有效地匹配字符串。建议在查询中使用正则前，现在 shell 中检查下语法，确保匹配与设想的一致。

#### 查询数组

可以通过普通的方式来匹配数组元素：

```js
> db.food.find({fruit: 'banana'})  // 能够匹配 {fruit: ['apple', 'banana', 'peach']}
```

如果需要通过多个元素来匹配数组，就要用 `$all` 了。

```js
> db.food.find({fruit: {$all: {'apple', 'banana'}}})  // 注意匹配项的顺序无关紧要
> db.food.find({fruit: ['apple', 'banana']}) // 这是精确匹配，注意区分
```

如果想查询数组特定位置的元素，需使用 key.index 语法指定下标

```js
> db.food.find({fruit.2: 'peach'})  // 匹配第三项
```

`$size` 用来查询特定长度的数组

```js
> db.food.find({fruit: {$size: 3}})
```

`$slice` 返回时，仅返回字段对应数组的一个子集

```js
> db.food.find({}, {fruit: {$slice: -1}})  // 返回文档中，fruit 字段内容为 ['peach']
```

有时我们希望返回与查询条件相匹配的任意一个数组元素，就可以使用 `$` 操作符

```js
> db.food.find({fruit: 'apple'}, {'fruit.$': 1}})  // 返回文档 {_id: 123456 , fruit: ['apple']}
```

另外，数组比较特殊一点的是，只要数组中有一个元素与查询条件相匹配，那么就算匹配成功，这与普通的匹配是有所区别的。

正因为如此，在可能包含数组的文档上应用范围查询时，推荐使用 `min()` 和 `max()`，使用 `$gt` `$lt` 非常影响效率，因为会逐项尝试。

```js
> db.number.find({x: {$gt: 10, $lt: 20}})  // 匹配 {x: [5, 25]} 成功，这一点比较特殊
```

#### 查询内嵌文档

有两种方式可以查询内嵌文档：查询整个文档，或者只针对其键/值对进行查询。

```js
> db.people.insert({name: {first: 'Joe', last: 'Schmoe'}, age: 45})
> db.people.find(name: {first: 'Joe', last: 'Schmoe'})         // 查询整个文档
> db.people.find({'name.first': 'Joe', 'name.last': 'Schmoe'}) // 匹配特定键值，注意此处键名的引号不能省
```

正因为 MongoDB 中可以用 `.` 点操作符来进入内嵌文档内部查询，所以，插入文档时，键名中不能包含 `.`，因为在 URL 中 `.` 是常用合法字符，所以将 URL 作为键名时经常会碰到此类问题。

### 4.4 $where 查询

键值对是一种表达能力非常好的查询方式，但是依然有些需求它无法表达。这是 `$where` 就闪亮登场了，用它可以在查询中执行任意的 JS 代码。也正因为如此，在非不得已的情况下可才使用。

```js
> db.foo.find({$where: 'this.credits == this.debits'})
> db.foo.find({$where: 'obj.credits == obj.debits'})
> db.foo.find({$where: function () { return this.credits == obj.debits; }})
```

### 4.5 游标

数据库使用游标返回 find 的执行结果。客户端对游标的实现通常能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他一些强大的操作。

要想从 shell 中创建一个游标，可以新建一个变量，并将查询结果赋值给这个变量。在 shell 中，如果游标没有赋值给变量，则会自动迭代并显示查询文档内容。

```js
> var cursor = db.collection.find();
> obj = cursor.next();  // 通过游标的 next() 方法迭代结果
> cursor.hasNext();     // 检查是否还有数据
```

调用 find 时，shell 并不立即查询数据库，而是等待真正开始要求获得结果时才发送查询。

几乎每个游标对象的方法都会返回游标本身以支持链式调用。

查询执行后，shell 会立刻获取前 100 个结果或者前 4M 数据(两者较小者)，这样下次调用next 就不比再次连接服务器了，当客户端用光第一组结果后，shell 会在一次通过 getMore 请求从服务器提取更多结果。

#### limit skip 和 sort

最常用的查询选项就是限制返回结果的数量、忽略一定数量的结果以及排序。所有这些选项须在查询发送前指定。

```js
> db.stock.find({desc: 'mp3'}).limit(50).skip(50).sort(price: -1)
```

用 skip 略过少量的文档还是不错的，但是要是数量多的话，就会变得很慢，通常都可以找到其他更好的方法来实现分页。

#### 高级查询选项

有一些选项可以对查询进行封装，例如，假设我们执行一个排序：

```js
> var cursor = db.foo.find({foo: 'bar'}).sort({x: 1})
```

实际会转换成

```js
> var cursor = db.foo.find({$query: {foo: 'bar'}, $orderby: {x: 1}})
```


绝大多数驱动程序都提供了辅助函数，用于向查询中添加各种选项，一些常用选项有：
  * $maxscan : integer -- 指定本次查询中扫描文档数量的上限
  * $min : document -- 强制指定一次索引扫描的下边界
  * $max : document -- 强制指定一次索引扫描的上边界

#### 获取一致结果 (快照)

如果结果集比较大，MongoDB 可能会多次返回同一个文档，这个是由存储机制导致的(集合修改后，如果原先分配的空间不足以存储的话，会挪到集合末尾，这样当游标移动到集合末尾时，又会返回原先的文档)。

应对这个问题的方法就是对查询进行快照 snapshot。如果使用了这个选项，查询就在 `_id` 索引上遍历执行，可以保证每个文档只被返回一次。快照会使查询变慢，所以应该只在必要时使用。

```js
> db.foo.find().snapshot()
```

#### 游标生命周期

看待游标有两种角度：客户端的游标以及客户端游标表示的数据库游标。前面讨论的都是客户端游标，接下来看看服务器端发生了什么。

在服务器端，游标消耗内存和其他资源。游标遍历完成后，或者客户端发来消息要求终止，数据库将会释放这些资源。

另外，如果客户端游标已经不在作用域了，驱动程序会向服务器发送销毁游标的消息。如果游标超出 10分钟，服务器也会自动销毁游标。如果有特殊需要，那么多数驱动程序都实现了 immortal 函数或类似机制，来告诉数据库不要让游标超时，这时，必须关注游标的销毁以及时释放资源。

### 4.6 数据库命令

有一种特殊的查询类型叫做数据库命令。通常只使用 shell 辅助函数就可以了，但是了解他们底层的命令很有帮助。

在 shell 中运行 `db.listCommands()` 可以看到所有的数据库命令。

```js
> db.test.drop()  // shell 的辅助函数 drop() 实际封装了数据库命令 drop
> db.runCommand({drop: 'test'})
```

数据库命令总会返回一个包含 `ok` 键的文档，如果命令执行失败，文档中会包含一个 `errmsg` 字段。

MongoDB 中的命令被实现为一种特殊类型的查询，这些特殊的查询会在 $cmd 集合上执行。runCommand 辅助函数最终会转换成

```js
> db.$cmd.findOne({drop: 'test'});
```

