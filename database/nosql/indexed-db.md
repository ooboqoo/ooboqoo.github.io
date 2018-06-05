# IndexedDB

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

IndexedDB is a Web API for storing large data structures within browsers and indexing them for high-performance searching. Like an SQL-based RDBMS, IndexedDB is a transactional database system. However, it uses JavaScript objects rather than fixed columns tables to store data.

Note: IndexedDB API is powerful, but may seem too complicated for simple cases. If you'd prefer a simple API, try libraries such as localForage, dexie.js, ZangoDB and JsStore that make IndexedDB more programmer-friendly.

* [localForage](https://github.com/localForage/localForage): A Polyfill providing a simple name:value syntax for client-side data storage, which uses IndexedDB in the background, but falls back to WebSQL and then localStorage in browsers that don't support IndexedDB.
* [Dexie.js](http://www.dexie.org/): A wrapper for IndexedDB that allows much faster code development via nice, simple syntax.

IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. This API uses indexes to enable high performance searches of this data. While DOM Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data. IndexedDB provides a solution.

* IndexedDB 是浏览器端(客户端)的数据库
* IndexedDB 是基于对象的 NoSQL 数据库(对象存储 + 事务 + 请求 + 异步)
* IndexedDB 同样具有跨域限制

IndexedDB 存储在几个重要方面表现得很像本地存储。最重要的是，一个 IndexedDB 数据库属于某个个人，使用特定的电脑和特定的浏览器，访问特定的网站。任何一项有变化（比如切换浏览器，用另一个账号登录，或者换用手机访问），网页都会对应一个新的 IndexedDB 数据库。

学习 IndexedDB 可能会让人怯步。首先，标准很复杂(一些苛刻的开发者用丑陋来形容)。Web 开发者负责创建数据库，构建它的数据表，并且给它们填充数据。其次，IndexedDB 使用异步模式，这意味着数据库任务在后台运行，不会阻塞代码运行或锁定页面。缺点就是这种更复杂的模式会让代码分散到不同地方。比如，开始一个数据库任务的代码和处理这个任务结果的代码不在一个地方。要理出这些代码块的执行顺序并且理解它们如何组合到一起，还是要花点精力的。

### Is IndexedDB Right for My Application

> From: [Introduction to IndexedDB: The In-Browser Database](http://www.codemag.com/article/1411041)

The first place you might look when attempting to persist data on the client is HTML5 local storage. Local storage enjoys widespread browser adoption and features a ridiculously easy-to-use API. The simplicity has its advantages, but liabilities are found in its inability to support complex search strategies, store large sets of data, and provide transactional support.

IndexedDB is a database. So when you’re trying to make a decision about the client, consider how you might select a database as a persistence medium on the server. Questions you may ask yourself to help determine if a client-side database is right for your application include:

* Do your users access your application with browsers that support the IndexedDB API?
* Do you need to store a significant amount of data on the client?
* Do you need to quickly locate individual data points within a large set of data?
* Does your architecture require transactional support on the client?

总结：localStroage 够用的话，就不用 IndexedDB，如果决定采用 IndexedDB，那么原生 API 也不是最佳选择，可以考虑使用 localForage 或 Dexie.js 代码更加简洁高效。


## IndexedDB 使用

### 创建一个 IndexedDB 数据库

```js
const request = indexedDB.open('myDatabase', 1)  // 数据库不存在会先创建
request.addEventListener('success', e => console.log("连接数据库成功"))
request.addEventListener('error', e => console.log("连接数据库失败"))
```

### 创建一个对象仓库

创建完数据库之后，我们还需要有对象仓库(object store)。对象仓库是 IndexedDB 的基础，类似于 MySQL 中表的概念。

>创建对象仓库只能在 `upgradeneeded` 事件中，而 `upgradeneeded` 事件只会在版本号更新的时候触发。IndexedDB API 中不允许数据库中的对象仓库在同一版本中发生变化。

```js
const request = indexedDB.open('myDatabase', 2);
request.addEventListener('upgradeneeded', e => {
  const db = e.target.result
  const store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false})
  console.log('创建对象仓库成功')
})
```

### 创建事务

简单来说事务就是用来保证数据库操作要么全部成功，要么全部失败的一个限制。

```js
const request = indexedDB.open('myDatabase', 2)
request.addEventListener('success', e => {
  const db = e.target.result
  const tx = db.transaction('Users', 'readwrite')  // or 'readonly'
})
```

### 操作数据

|||
|----------|---------------
| add(doc) | 增加数据
| put(doc) | 增加或修改数据
| get(primaryKey) | 获取数据
| delete(primaryKey) | 删除数据

```js
const db = e.target.result

const tx = db.transaction('Users', 'readwrite')
tx.oncomplete = event => console.log('事务完成，以下操作才是真的成功')
tx.onerror = event => console.log('事务出错，成功修改项也会回滚')

const store = tx.objectStore('Users')
// 新增数据
const reqAdd = store.add({'userId': 1, 'userName': '李白', 'age': 24})
reqAdd.addEventListener('success', e => console.log('保存成功'))
// 获取数据
const reqGet = store.get(1)
reqGet.addEventListener('success', e => console.log(this.result.userName))
// 删除数据
const reqDelete = store.delete(1)
reqDelete.addEventListener('success', e => console.log('删除数据成功'))
```

### 使用游标

使用 `get()` 方法只能获取到一条记录，如果想要同时获取多条数据，我们可以使用游标。

```js
const store = tx.objectStore('Users')
const range = IDBKeyRange.bound(1,10)
const req = store.openCursor(range, 'next')
req.addEventListener('success', e => {
  const cursor = this.result
  if (cursor) {
    console.log(cursor.value.userName)
    cursor.continue()
  } else {
    console.log('检索结束')
  }
})
```

### 索引

创建索引，注意修改 Schema 后版本号要往上加。

```js
const request = indexedDB.open('myDatabase', 3)
request.addEventListener('upgradeneeded', e => {
  const db = e.target.result
  const store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false})
  const idx = store.createIndex('ageIndex', 'age', {unique: false})
})
```

使用索引

```js
const db = e.target.result
const tx = db.transaction('Users','readwrite')
const store = tx.objectStore('Users')
const index = store.index('ageIndex')
const req = index.openCursor(IDBKeyRange.lowerBound(20), 'next')
req.addEventListener('success', e => {
  const cursor = e.target.result;
  if (cursor) {
    console.log(cursor.value.age)
    cursor.continue()
  } else {
    console.log('检索结束')
  }
})
```


## Demo

```js
export const indexedDBProvider = {
  options: {prefix: 'SavStorage', version: 1},
  tr: null,
  setDB (options) {
    this.options = Object.assign(this.options, options)
  },
  openDB () {
    const dbName = this.options.prefix + 'Database'
    const storeName = this.options.prefix + 'Store'
    const version = this.options.version
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, version)

      request.onupgradeneeded = (event) => {
        const db = request.result
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName)
        }
      }

      request.onerror = (event) => {
        console.error(event.currentTarget.error.message)
        reject(event.currentTarget.error)
      }

      request.onsuccess = () => {
        const db = request.result
        db.onerror = (event) => { console.error('indexDB error: ', event.target.errorCode) }
        const tr = (fn) => {
          return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite')
            const store = tx.objectStore(storeName)
            const query = fn(store)
            query.onsuccess = function () { resolve(this.result) }
            query.onerror = function (event) { reject(event) }
          })
        }
        resolve(tr)
      }
    })
  },
  async getTr () {
    if (!this.tr) { this.tr = await this.openDB() }
  },

  async set (key, value) { await this.getTr(); return this.tr(store => store.put(value, key)) },
  async get (key) { await this.getTr(); return this.tr(store => store.get(key)) },
  async getAll () { await this.getTr(); return this.tr(store => store.getAll()) },
  async getAllKeys () { await this.getTr(); return this.tr(store => store.getAllKeys()) },
  async remove (key) { await this.getTr(); return this.tr(store => store.delete(key)) },
  async keys () { await this.getTr(); return this.tr(store => store.getAllKeys()) },
  async has (key) {
    let keys = await this.keys()
    for (let k of keys) { if (k === key) { return true } }
    return false
  }
}
```
