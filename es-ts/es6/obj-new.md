# ES6 新增内置对象

## 集合 Set

数据结构 Set 它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
// Set 构造函数可以接受一个(类)数组作为参数，用来初始化。
let set = new Set([1, 2, 3, 4, 4]);
let divs = new Set([...document.querySelectorAll('div')]);

// 数组成员去重
array = [...new Set(array)];
array = Array.from(new Set(array));
```

向 Set 加入值的时候，不会发生类型转换，所以 5 和 "5" 是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做 "Same-value equality"，它类似于 `===`，唯一区别是 `NaN` 等于 `NaN`。

### 属性和方法

<div class="dl">
  <h5>set.size <span>-- 返回Set实例的成员总数</span></h5>
  <h5>set.add(value) <span>-- 添加某个值，返回Set结构本身</span></h5>
  <h5>set.delete(value) <span>-- 删除某个值，返回一个布尔值，表示删除是否成功</span></h5>
  <h5>set.has(value) <span>-- 返回一个布尔值，表示该值是否为Set的成员</span></h5>
  <h5>set.clear() <span>-- 清除所有成员，没有返回值</span></h5>
</div>
<div class="dl">
  <h5>set.keys() <span>-- 返回键名的遍历器，因为 Set 结构没有键名只有键值，所以相当于 values() 的别名</span></h5>
  <h5>set.values() <span>-- 返回键值的遍历器</span></h5>
  <h5>set.entries() <span>-- 返回键值对的遍历器，实际为 [value, value]</span></h5>
  <h5>set.forEach(cb, thisArg?) <span>-- 使用回调函数遍历每个成员</span></h5>
</div>

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 `values()` 方法。这意味着，可以省略 `values()` 方法，直接用 `for...of` 循环遍历 Set。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values  // true

for (let x of set) { console.log(x); }  // 使用 for...of 结构遍历
```

扩展运算符 `...` 内部使用 `for...of` 循环，所以也可以用于 Set 结构。因此使用 Set 可以很容易地实现 并集Union、交集Intersect 和差集Difference:

```js
let a = new Set([1, 2, 3]), b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);                        // [1, 2, 3, 4]
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));    // [2, 3]
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));  // [1]
```

如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法:
  * 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构
  * 另一种是利用 Array.from 方法。


## WeakSet

WeakSet 结构与 Set 类似，但它与 Set 有两个区别：首先，WeakSet 的成员只能是对象，而不能是其他类型的值。其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，这也意味着 WeakSet 不可遍历。

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

<div class="dl">
  <h5>weakSet.add(value) <span>-- 向WeakSet实例添加一个新成员</span></h5>
  <h5>weakSet.delete(value) <span>-- 清除WeakSet实例的指定成员</span></h5>
  <h5>weakSet.has(value) <span>-- 返回一个布尔值，表示某个值是否在WeakSet实例之中</span></h5>
</div>

```js
new WeakSet().add(1)        // 报错，只允许添加对象
new WeakSet([[1], [2, 3]])  // 正常，构造函数 WeakSet 可以接受一个(类)数组作为参数
new WeakSet([1, 2])         // 报错

let a = [1,2];
new WeakSet(a)        // 报错
new WeakSet([a])      // 正常
new WeakSet().add(a)  // 正常
```


## 字典 Map

JS 的对象(Object)，本质上是键值对的集合(Hash结构)，但是只能用 "字符串" 当作键，这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是 "键" 的范围不限于字符串，各种类型的值(包括对象)都可以当作键。也就是说，Object 结构提供了"字符串—值"的对应，Map 结构提供了 "值—值" 的对应，是一种更完善的 Hash 结构实现。如果你需要 "键值对" 的数据结构，Map 比 Object 更合适。

```js
// 构造函数 Map 可以接受一个数组作为参数, 该数组的成员是一个个表示键值对的数组。
let map = new Map([['name', '张三'], ['title', 'Author']]);
[['name', '张三'], ['title', 'Author']].forEach(([key, value]) => map.set(key, value));  // 上面代码的普通 js 实现

map.set([1], 55); map.get([1]);  // undefined，前后的两个 [1] 实际是两个不同对象
```

当使用对象作为键名时，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞(clash)的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

### 属性和方法

<div class="dl">
  <h5>map.size <span>-- 返回 Map 结构的成员总数</span></h5>
  <h5>map.get(key) <span>-- 读取 key 对应的值</span></h5>
  <h5>map.set(key, value) <span>-- 设置 key 所对应的键值，然后返回整个 Map 结构</span></h5>
  <h5>map.delete(key) <span>-- 删除某个键，成功返回 true，失败返回 false</span></h5>
  <h5>map.clear() <span>-- 清除所有成员，没有返回值</span></h5>
  <h5>map.has(key) <span>-- 返回一个布尔值，表示某个键是否在 Map 数据结构中</span></h5>
</div>
<div class="dl">
  <h5>map.keys() <span>-- 返回键名的遍历器</span></h5>
  <h5>map.values() <span>-- 返回键值的遍历器</span></h5>
  <h5>map.entries() <span>-- 返回所有成员的遍历器</span></h5>
  <h5>map.forEach(callbackFn[, thisArg]) <span>-- 遍历 Map 的所有成员</span></h5>
</div>

### 与其他数据结构的互相转换

```js
// Map 转为数组
array = [...map];

// 数组转为 Map
map = new Map(array) // 数组要符合 [[key1: value1], [key2, value2]] 这种格式

// Map转为对象
for (let [k, v] of map) { obj[k] = v; }  // Map 的所有键都是字符串才行，如果是对象也能成功，但应该不是所期望的

// 对象转为 Map
for (let key in obj) { map.set(key, obj[key]); }

// Map 转为 JSON
JSON.stringify([...map]);

// JSON 转 Map
let json = JSON.parse(jsonStr);
for (let k of Object.keys(json)) { map.set(k, json[k]); }
```


## WeakMap

WeakMap 结构与 Map 结构基本类似, 唯一的区别是它只接受对象作为键名(null除外, 不接受其他类型的值作为键名, 而且键名所指向的对象, 不计入垃圾回收机制. WeakMap 没有遍历操作, 也没有 size 属性, 无法清空.

<div class="dl">
  <h5>weakMap.get(key) <span>-- 返回 key 对应的值，如果不存在则返回 undefined</span></h5>
  <h5>weakMap.set(key, value) <span>-- 设置 key 所对应的键值，然后返回整个 WeakMap 结构</span></h5>
  <h5>weakMap.delete(key) <span>-- 清除 WeakMap 中 key 对应的键值</span></h5>
  <h5>weakMap.has(key) <span>-- 返回一个布尔值，表示 WeakMap 对象中是否有保存 key 对应的值</span></h5>
</div>
