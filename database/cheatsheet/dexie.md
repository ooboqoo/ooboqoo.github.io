# Dexie.js API


## Dexie

An instance of this class represents an indexedDB database connection.

|||
|-------------------------------|------------------------------------------------------------
| constructor(dbName, options?) | `var db = new Dexie(databaseName, options)`

Static Properties and Methods

|||
|----------------------|-----------------------------------------------------------------------
| Dexie.delete(dbName) | 删除数据库
| Dexie.exists(dbName) | 返回 `Promise<boolean>`，这个方法似乎没有用处，因为 `db.open()` 会自动处理各种情况
| Dexie.deepClone(obj) | 深拷贝 but still lets any instance of Date or custom classes keep their prototypal structure
| Dexie.async(func)    | Declare an async function without the need for a transpiler

Properties

|||
|---------|------------------------------------------------------------
| db.name    | The database name
| db[table]  | Each object store defined in `version().stores()` gets a Table instance named by the object store
| db.tables  | Javascript Array containing all Table instances
| db.verno   | Version of current database

Methods

|||
|-------------|------------------------------------------------------------
| db.version(versionNumber)    | Specify the database schema for a certain version
| db.on(eventType, subscriber) | Subscribe to events
| db.table(storeName)          | Returns an object store to operate on
| db.transaction(mode, tables[s], callback) | Start a database transaction
| db.open()   | Open database and make it start functioning
| db.close()  | Close the database
| db.delete() | Delete the database
| db.isOpen() | Returns true if database is open
| db.hasFailed() | Returns true if database failed to open
| db.backendDB() | Returns the native IDBDatabase instance
| db.vip() | Enable on(‘ready’) subscribers to use db before open() is complete

```js
db.transaction('rw', db.friends, db.pets, async ()=>{
  const friend = await db.friends.get({name: "David"})
  ++friend.age
  await db.friends.put(friend)
}).catch(err => { console.error(err.stack) })
```


## Table

Properties

|||
|--------|------------------------------------------------------------
| name   | The name of the object store represented by this Table instance.
| schema | The table schema of this object store.

Events

|||
|------------------|------------------------------------------------------------
| hook(‘creating’) | Atomic CRUD hook called when object is about to be created in db.
| hook(‘reading’)  | Atomic CRUD hook called when object has been read from db and is about to be delivered to caller.
| hook(‘updating’) | Atomic CRUD hook called when object is about to be modified in db.
| hook(‘deleting’) | Atomic CRUD hook called when object is about to be deleted from db.

Methods

|||
|------------------------------|------------------------------------------------------------
| table.get(primaryKey, cb?)   | 查到 resolve(item)，查不到 resolve(undefined)，如果提供了 cb 返回值为 cb 的返回值
| table.get({key1: val1, kye2...}, cb?) | 不仅可以通过 primaryKey 查询，还支持 key 查询
| table.add(item, key?)        | 添加对象到 store，返回 resolve(key) 或 reject(err)
| table.bulkAdd(items, keys?)  | 批量添加对象 item[]，返回 resolve(lastKey) 或 reject(err)。失败项不会影响其他项结果
| table.delete(primaryKey)     | 删除对象，返回 resolve(undefined) 或 reject(err)
| table.bulkDelete(keys)       | 批量删除对象
| table.put(item, key?)        | 更新(如果对象存在)或添加(如果对象不存在)对象，resolve(key)
| table.bulkPut(items, keys?)  | 如果批量操作中有失败项，如果在 transaction 上 catch 了成功项会保留，否则全部失败
| table.update(key, changes)   | 更新对象，成功 resolve(1)，一样或失败 resolve(0)
| table.clear()                | 清空表内容
|||
| table.toArray()              | 参见 collection.toArray()
| table.toCollection()         | 返回 Collection
| table.reverse()              | 返回 primaryKey 倒序排序的 Collection
| table.orderBy(index)         | 返回经排序后的 Collection，index 只能是 primaryKey 或 建了索引的 key
|||
| table.count()                | 参见 Collection.count()
| table.each()                 | 参见 Collection.each()
| table.filter(filterFunction)   | 返回过滤后的 Collection
| table.offset(n)                | Return a Collection ordered by primary key, 跳过前面的 n 条记录
| table.limit(n)                 | Return a Collection ordered by primary key, 只返回最前面的 n 条记录
| table.where(indexOrPrimaryKey) | 返回 WhereClause
| table.where(keyArray)          | 返回 WhereClause
| table.where({key1: val1, key2...}) | 返回 Collection
|||
| defineClass(structure) | Define a javascript constructor function and map to this table.
| table.mapToClass(constructor, structure?)  | 所有返回的对象都是 Object.create(constructor.prototype)+浅拷贝 处理后的对象


## WhereClause

```js
table.where(indexOrPrimKey).equals(key)
table.where(indexOrPrimKey).equalsIgnoreCase(key)
table.where(indexOrPrimKey).notEqual(key)

table.where(indexOrPrimKey).above(lowerBound)
table.where(indexOrPrimKey).aboveOrEqual(lowerBound)
table.where(indexOrPrimKey).below(upperBound)
table.where(indexOrPrimKey).belowOrEqual(upperBound)
table.where(indexOrPrimKey).between(lowerBound, upperBound, includeLower=true, includeUpper=false)
table.where(indexOrPrimKey).inAnyRange(ranges, options: {includeLowers, includeUpper})

table.where(indexOrPrimKey).anyOf(array)  // or
table.where(indexOrPrimKey).anyOf(key1, key2, keyN, ...)
table.where(indexOrPrimKey).anyOfIgnoreCase(array)  // or
table.where(indexOrPrimKey).anyOfIgnoreCase(key1, key2, keyN, ...)
table.where(indexOrPrimKey).noneOf([key1, key2, keyN, ...])

table.where(indexOrPrimKey).startsWith(prefix)
table.where(indexOrPrimKey).startsWithAnyOf(array)  // or
table.where(indexOrPrimKey).startsWithAnyOf(str1, str2, strN, ...)
table.where(indexOrPrimKey).startsWithIgnoreCase(prefix)
table.where(indexOrPrimKey).startsWithAnyOfIgnoreCase(array)  // or
table.where(indexOrPrimKey).startsWithAnyOfIgnoreCase(str1, str2, strN, ...)
```

```js
db.customers.where('age').inAnyRange([[0, 18], [65, Infinity]]).modify({Rebate: 1/2})
```


## Collection

集合与表的区别：表是实际存在数据库中的，而集合只是一个临时的对象集合，通过执行 WhereClause 或 Table 的一些方法取得。

Represents a collection of database objects. Note that it will not contain any objects by itself. Instead, it yields a preparation for how to execute a DB query. A query will be executed when calling methods that returns a Promise, such as toArray(), keys(), count() or each().

|||
|-------------------------------|------------------------------------------------------------
| col.delete() | 将集合中的对象从数据库中删除，返回删除条数 resolve(n)
| col.modify() | Modify all objects in the collection with given properties or function.
| col.distinct() | Remove duplicates of items with same primary key
| col.each() | Execute query and call a function for each item
| col.eachKey() | Execute query on the index or primary key being used and call a function for each key
| col.eachPrimaryKey() | Execute query on the index and call a function for each primary key that corresponds to the index.
| col.eachUniqueKey() | Execute query on the index or primary key being used and call a function for each unique key
| col.keys() | Retrieve an array containing all keys of the collection (index or primary key depending on where() clause)
|||
| col.and(filter) | 返回 this 以支持连缀写法
| col.or() | Logical OR operation
| col.clone() | Clone the query before manipulating it further
| col.sortBy() | Execute query and get an array with the results sorted by given property
| col.reverse() | Reverse the order of items.
| col.desc() | Sort in descending order
|||
| col.filter() | Filter objects
| col.first() | Get the first item in the collection
| col.last() | Get the last item in the collection
| col.limit() | Limit the result to given number of items
| col.offset() | Ignore N items before given offset and return the rest
|||
| col.primaryKeys() | Retrieve an array containing all primary keys of the collection
| col.raw() | Don’t filter results through reading hooks
| col.count() | Get the number of items in the collection
| col.toArray() | Execute query and get an array with the results sorted by the index used in the where() clause
| col.uniqueKeys() | Retrieve an array containing all unique keys of the collection (index or primary key depending on where() clause)
| col.until() | Ignores items occurring after given filter returns true.

```js
db.friends
  .where("name").equalsIgnoreCase("david")
  .or("shoeSize").above(40)
  .sortBy("shoeSize")
```


## MSIC

### Version

|||
|-----------------------------------|------------------------------------------------------------
| version.stores(schemaDefinition)  | Specify the database schema (object stores and indexes) for a certain version.
| version.upgrade(upgraderFunction) | Specify an upgrade function for upgrading between previous version to this one.

### TableSchema

Schema Syntax

|||
|---------|--------------------------------
| `++`    | Auto-incremented primary key
| `&`     | Unique index
| `*`     | Multi-entry index
| `[A+B]` | Compound index or primary key

Detail: Primary keys are implicitly marked as unique.

NOTE: Unlike SQL, you don’t need to specify all properties but only the one you wish to index.

WARNING: Never index properties containing images, movies or large (huge) strings. Store them in IndexedDB, yes! but just don’t index them!

```js
/**
 * @param {string} name
 * @param {IndexSpec} primKey
 * @param {IndexSpec[]} indexes
 * @param {Object} instanceTemplate
 */
function TableSchema(name, primKey, indexes, instanceTemplate) {
  this.name = name;
  this.primKey = primKey;
  this.indexes = indexes;
  this.instanceTemplate = instanceTemplate;
  this.mappedClass = null;
}
```

```js
var db = new Dexie("MyDB");
db.version(1).stores({friends: "++id,name"});
alert ("Primary key: " + db.friends.schema.primKey.keyPath); // Will alert ("id");
```




<style>#article em {color:#333} td:first-child{color:red;}</style>
<script>
(function() {
  var list = document.querySelectorAll('td:first-child'),
      reg=/\((.+?)\)/g;
  for (var i = 0, length = list.length; i < length; i++) {
    list[i].innerHTML = list[i].innerHTML.replace(reg, '(<span style="color: #666;">$1</span>)')
  }
})();
</script>

