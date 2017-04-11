# MongoDB Native

http://mongodb.github.io/node-mongodb-native/2.2/

## 快速起步 Quick Start

```bash
$ npm install mongodb --save
```

```js
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/demo';

(async function() {
  try {
    const db = await MongoClient.connect(url);
    console.log('Connected successfully to server %s', url);

    const coll = db.collection('documents');
    let docs, result;

    docs = await coll.insertMany([{a: 1}, {a: 2}, {a: 3}]);
    console.log('Inserted 3 documents into the collection');
    // console.log(docs);

    docs = await coll.find({}).toArray().catch(err => console.log('虽然出错了，但程序继续执行！'));
    console.log('Found the following records');

    result = await coll.updateOne({a: 2}, {$set: {b: 1}});
    console.log('Updated the document with the field a equal to 2');

    result = await coll.deleteOne({a: 3});
    console.log('Removed the document with the field a equal to 3');

    await coll.createIndex({'a': 1});
    console.log('Index builded.')

    await db.close();
    console.log('Connection closed.');

  } catch (err) {
    console.error(err.stack);
  }
})();
```


## 集合 Collections

```js
// 创建定长集合
db.createCollection('myCollection', {'capped': true, 'size': 100000, 'max': 5000});
// 创建集合时指定验证规则
db.createCollection('contacts', {'validator': {'$or': [
  {'phone': {'$type': 'string'}},
  {'email': {'$regex': /@mongodb\.com$/}},
  {'status': {'$in': [ 'Unknown', 'Incomplete']}},
]}});
// 给现有集合添加验证规则
db.runCommand({collMod: 'contacts', validator: {$or: [
  {phone: {$type: 'string'}},
  {email: {$regex: /@mongodb\.com$/}},
  {status: {$in: ['Unknown', 'Incomplete']}}
]}, validationLevel: 'moderate', validationAction: 'warn'});
```

创建定长的集合，必须指定大小 size (单位 bytes)，同时还可以指定最大记录数 max (单位 条)。当没有超过 size 但超出 max 时，最老的一条数据会被覆盖。

还可以指定校验，校验失败则拒绝执行操作，根据规定的级别抛出警告或错误。


## 创建索引 Create Indexes

```js
collection.createIndex({dateOfBirth: 1});  // 以 dateOfBirth 字段升序创建索引，1 指升序 -1 降序
collection.createIndex({lastName: -1, dateOfBirth: 1});  // 创建联合索引
collection.createIndex({comments: 'text'});
collection.createIndex({timestamp: 'hashed'});
collection.createIndex({location: '2dsphere'});
collection.createIndex({points: '2d'});
```

### IndexOptions

```js
collection.createIndex({lastName: -1, dateOfBirth: 1}, {unique: true});
collection.createIndex({lastName: 1, firstName: 1}, {partialFilterExpression: {points: {$gt: 5}}});
```


## 增删改查 CRUD Operations

### Insert Documents

```js
db.collection('inserts').insertOne({a: 1})
db.collection('inserts').insertMany([{a: 2}, {a: 3}]);
```

Notice that there’s no need to explicitly create a new inserts collection, as the server will create it implicitly when the first document is inserted.
The method db.createIndex is only necessary when creating non-standard collections, such as capped collections or where parameters other than the defaults are necessary.

### Updating Documents

```js
col.updateOne({a: 3}, {$set: {b: 1}}, {upsert: true});
col.updateMany({a: 2}, {$set: {b: 1}});
```

### Removing Documents

```js
col.deleteOne({a: 1});
col.deleteMany({a: 2});
```

### FindOneAnd*

```js
col.findOneAndUpdate({a: 1}, {$set: {b: 1}}, {returnOriginal: false, sort: [[a, 1]], upsert: true});
col.findOneAndDelete({a: 2});
col.findOneAndReplace({a: 1}, {c: 4});
```

The three methods `findOneAndUpdate`, `findOneAndDelete` and `findOneAndReplace` are special commands which allow the user to update or upsert a document and have the modified or existing document returned. When using these methods, the operation takes a write lock for the duration of the operation in order to ensure the modification is atomic [原子的，不可分割的].

### BulkWrite

```js
col.bulkWrite([
      {insertOne: {document: {a: 1}}}
    , {updateOne: {filter: {a: 2}, update: {$set: {a: 2}}, upsert: true}}
    , {updateMany: {filter: {a: 2}, update: {$set: {a: 2}}, upsert: true}}
    , {deleteOne: {filter: {c: 1}}}
    , {deleteMany: {filter: {c: 1}}}
    , {replaceOne: {filter: {c: 3}, replacement: {c: 4}, upsert: true}}]
  , {ordered: true, w: 1});
```

### Bulk Write Operations

Bulk operations are split into ordered and unordered bulk operations.

```js

```

### Read Methods

```js
col.find({a: 1}).limit(2).toArray();

```

```js
col.find({}).project({a: 1})                            // Create a projection of field a
col.find({}).skip(1).limit(10)                          // Skip 1 and limit 10
col.find({}).batchSize(5)                               // Set batchSize on cursor to 5
col.find({}).filter({a: 1})                             // Set query on the cursor
col.find({}).comment('add a comment')                   // Add a comment to the query
col.find({}).addCursorFlag('tailable', true)            // Set cursor as tailable
col.find({}).addCursorFlag('oplogReplay', true)         // Set cursor as oplogReplay
col.find({}).addCursorFlag('noCursorTimeout', true)     // Set cursor as noCursorTimeout
col.find({}).addCursorFlag('awaitData', true)           // Set cursor as awaitData
col.find({}).addCursorFlag('exhaust', true)             // Set cursor as exhaust
col.find({}).addCursorFlag('partial', true)             // Set cursor as partial
col.find({}).addQueryModifier('$orderby', {a: 1})       // Set $orderby {a: 1}
col.find({}).max(10)                                    // Set the cursor maxScan
col.find({}).maxScan(10)                                // Set the cursor maxScan
col.find({}).maxTimeMS(1000)                            // Set the cursor maxTimeMS
col.find({}).min(100)                                   // Set the cursor min
col.find({}).returnKey(10)                              // Set the cursor returnKey
col.find({}).setReadPreference(ReadPreference.PRIMARY)  // Set the cursor readPreference
col.find({}).showRecordId(true)                         // Set the cursor showRecordId
col.find({}).snapshot(true)                             // Set the cursor snapshot
col.find({}).sort([['a', 1]])                           // Sets the sort order of the cursor query
col.find({}).hint('a_1')                                // Set the cursor hint
```


## 排序规则 Collations

Collations provide a set of rules which comply with the conventions of a particular language when comparing strings.

Collation 特性允许 MongoDB 用户根据不同的语言定制排序规则。

### 配置参数

```js
collation: {
   locale: <string>,  // 唯一必选项，指定地域，如 zh_CN
   caseLevel: <bool>,
   caseFirst: <string>,
   strength: <int>,
   numericOrdering: <bool>,
   alternate: <string>,
   maxVariable: <string>,
   backwards: <bool>
}
```

### 指定校验规则

```js
db.createCollection('contacts', {'collation': {'locale': 'zh_CN'}});
collection.createIndex({'name': 1}, {'unique': 1}, {'collation': {'locale': 'en_US'}});
```

Any indexes on the new collection also inherit the collation, unless the creation command specifies another collation.

All reading, updating, and deleting methods support collation.


## 投影 Projections

By default, queries return all fields in matching documents. To limit the amount of data that sends to applications, you can include a projection document in the query operation.

The projection document can specify the inclusion of fields or the exclusion of field and has the following form:

```js
{ field1: <value>, field2: <value> ... }  // 0 or false to exclude the field, 1 or true to include it
```

```js
col.find({}, {'name': 1, 'cuisine': 1});              // 返回文档包含 _id name cuisine 三个字段
col.find({}, {'name' : 1, 'cuisine': 1, '_id': 0 });  // 如果不需要 _id 字段，必须显示注明
col.find({}, {'address' : 0});                        // 返回文档包含除 address 外的其他字段
```

## 聚合 Aggregation

## 文本搜索 Text Search

## 地理空间搜索 Geospatial Search

## Database Commands

## GridFS














