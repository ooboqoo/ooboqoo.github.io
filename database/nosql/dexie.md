# Dexie.js

http://dexie.org

```js
const db = new Dexie('MyFriendDB')
db.version(1).stores({
  friends: '++id,name,age'
})

async function main () {
  const id = await db.friends.add({name: 'Foo', age: 42})
  const friends = await db.friends.where('age').between(40, 65).toArray()
  console.log('Found friends: ' + JSON.stringify(friends, null, 2))
  await db.delete()  // So you can experiment again and again...
}
```

### 版本兼容 Database Versioning

http://dexie.org/docs/Tutorial/Design#database-versioning

每次更新 `stores` 定义，如添加表，改变索引等，都得往上加版本号，而且老的版本定义要保留，要是没有保留，碰到老的版本的数据就会 upgrade 失败。

```js
db.version(1).stores({
  foo1: 'id,x,y,z',
  foo2: 'id,x,y,z',
  foo3: 'id,x,y,z'
});
// Delete index 'y' on 'foo1':
db.version(2).stores({
  foo1: 'id,x,z'  // 只需要定义修改部分，其他部分可以省略
});
// Add index 'x2' on 'foo2':
db.version(3).stores({
  foo2: 'id, x, x2, y, z'
});
// Drop table 'foo3':
db.version(4).stores({foo3: null});
```

```js
var db = new Dexie('FriendsDB')
db.version(1).stores({friends: '++id,name'})
db.version(2).stores({friends: '++id,name,shoeSize'})
db.version(3).stores({friends: '++id,shoeSize,firstName,lastName'}).upgrade(function(t) {
  // An upgrade function for version 3 will upgrade data based on version 2.
  return t.friends.toCollection().modify(function(friend) {
    // Modify each friend:
    friend.firstName = friend.name.split(' ')[0]
    friend.lastName = friend.name.split(' ')[1]
    delete friend.name
  })
})
```

### 事务

```js
db.transaction('rw', db.friends, async () => {
  if ((await db.friends.where('name').equals('Josephine').count()) === 0) {
    let id = await db.friends.add({name: 'Josephine', age: 21})
    alert (`Addded friend with id ${id}`)
  }
  let youngFriends = await db.friends.where('age').below(25).toArray()
  alert ('My young friends: ' + JSON.stringify(youngFriends))
}).catch(e => { alert(e.stack || e) })
```

