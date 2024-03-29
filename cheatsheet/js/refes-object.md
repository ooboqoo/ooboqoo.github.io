<style>
.deprecated::before { content: 'X'; margin-right: 4px; padding: 1px 3px; font:bolder 12px sans-serif; color: white; background: red; }
.es3::before, .es5::before, .es6::before, .esn::before, .es::before {
  margin-right: 1em; padding: 1px 3px; font-size: .5em; color: #fff; border-radius: .25em; }
.es3::before { content: "ES3"; background-color: #0c3; }
.es5::before { content: "ES5"; background-color: #9c0; }
.es6::before { content: "ES6"; background-color: #c30; }
.es::before  { background-color: #c3c; }
.esn::before { content: "ES+"; }
.es16::before { content: "16"; }
.es17::before { content: "17"; }
.es18::before { content: "18"; }
.es19::before { content: "19"; }
.es20::before { content: "20"; }
.es21::before { content: "21"; }
.es22::before { content: "22"; }
.es23::before { content: "23"; }
h2 { text-align: center; }
#md .dl::before { content: ""; }
#md .dl h5 { width: initial; color: #2824bd; }
#md .dl h5 > a { color: red; text-decoration: none; border-bottom-width: 0; }
</style>

# JavaScript 内置对象参考手册

内置对象(内置构造函数对象+内置单体对象)的属性和方法，通过内置对象访问；  
构造函数定义的属性，初始化时会在每个实例中产生一份副本，每个实例都使用其自有的属性；  
原型中的属性和方法，可以通过实例查找原型链读取到（读取而非复制）。

历年新特性
* 新特性 https://github.com/tc39/proposals/blob/main/finished-proposals.md
* 支持情况 https://node.green/


## Object

<div class="dl">
<h5 class="es3">Object.prototype <span>-- 通过该属性为所有 Object 类型的对象添加公共属性</span></h5>
</div>
<div class="dl">
<h5 class="es5">Object.create(proto[, propertiesObject]) <span>-- 新建对象，通过指定原型对象和属性来创建一个新的对象</span><span class="mark">[注1]</span></h5>
<h5 class="es6">Object.assign(target, src1, ...) <span>-- 对象合并，将一个或多个对象的自有可遍历属性复制到 target</span></h5>
<h5 class="es6">Object.is(value1, value2) <span>-- 同值相等，与 `===` 全等基本相同，区别是 `+0` `-0` 不等，`NaN` 自等</span></h5>
<h5 class="es5">Object.keys(obj) <span>-- 返回一个数组，包含指定对象的所有自有可遍历属性的名称</span></h5>
<h5 class="es es17">Object.values(obj) <span>-- 返回一个数组，包含指定对象的所有自有可遍历属性的值</span></h5>
<h5 class="es es17">Object.entries(obj) <span>-- 返回一个数组，包含指定对象的所有自有可遍历属性的键值对 `[[k1,v1], ...]`</span></h5>
<h5 class="es es19">Object.fromEntries(entries) <span>-- 将包含一系列键值对的数组转成一个对象</span></h5>
<h5 class="es es22">Object.hasOwn(prop) <span>-- 较实例方法 `hasOwnProperty` 更为安全</span></h5>
</div>
<div class="dl">
<h5 class="es6"><i class="deprecated"></i>object.__proto__ <span>-- 对象实例属性，指向对象的原型对象，本质上属于内部属性，应避免使用</span><span class="mark">[注2]</span></h5>
<h5 class="es3">object.constructor <span>-- 指向构造函数(该属性位于对象的原型上)</span></h5>
</div>
<div class="dl">
<h5 class="es3">object.valueOf() <span>-- 返回指定对象的原始值类型，很少显式调用，当期望得到原始值时系统会自动调用</span></h5>
<h5 class="es3">object.toString() <span>-- 只会简单返回 `'[object Array]'` `'[object Number]'` 等，除了类型判断，其他情况都需重写</span></h5>
<h5 class="es3">object.toLocaleString() <span>-- 调用 toString()</span></h5>
<h5 class="es3">object.isPrototypeOf(obj) <span>-- 检查对象是否在 obj 的原型链上</span></h5>
<h5 class="es3">object.hasOwnProperty(prop) <span>-- 检测属性是自身的还是继承的</span></h5>
<h5 class="es3">object.propertyIsEnumerable(prop) <span>-- 判断对象的属性是否可枚举</span></h5>
</div>

以下都属于语言内部的方法，会调用 ES6 新增的 Reflect 对象上对应方法，但调用前可能会做一定预处理。

<div class="dl">
<h5 class="es5">Object.getPrototypeOf(obj) <span>-- 返回指定对象的原型对象</span></h5>
<h5 class="es6">Object.setPrototypeOf(obj) <span>-- 设置对象的原型，即 `[[Prototype]]` 属性</span><span class="mark">[注3]</span></h5>
<h5 class="es5">Object.getOwnPropertyNames(obj) <span>-- 返回一个数组，包含对象所有自有属性(可枚举+不可枚举)</span></h5>
<h5 class="es6">Object.getOwnPropertySymbols(obj) <span>-- 返回一个数组，包含对象的所有自有以 Symbol 类型为键名的属性</span></h5>
<h5 class="es5">Object.defineProperty(obj, prop, descriptor) <span>-- 给对象添加一个属性并指定该属性的配置</span><span class="mark">[注4]</span></h5>
<h5 class="es5">Object.defineProperties(obj, props) <span>-- 给对象添加多个属性并分别指定它们的配置 `{prop1: descriptor1, ...}`</span></h5>
<h5 class="es5">Object.getOwnPropertyDescriptor(obj, prop) <span>-- 返回指定对象上一个自有属性对应的属性描述符</span></h5>
<h5 class="es es17">Object.getOwnPropertyDescriptors(obj) <span>-- 返回指定对象上所有自有属性的属性描述符</span></h5>
<h5 class="es5">Object.freeze(obj) <span>-- 冻结对象：不能增减属性，不能配置属性，不能修改属性值</span></h5>
<h5 class="es5">Object.seal(obj) <span>-- 封闭对象：不能增删或配置属性，但还能修改现有对象属性的值</span></h5>
<h5 class="es5">Object.preventExtensions(obj) <span>-- 禁止扩展，即不能再添加新属性</span></h5>
<h5 class="es5">Object.isFrozen(obj) <span>-- 确认是否冻结</span></h5>
<h5 class="es5">Object.isSealed(obj) <span>-- 确认是否封闭</span></h5>
<h5 class="es5">Object.isExtensible(obj) <span>-- 确认是否可扩展（即是否能够添加属性）</span></h5>
</div>
<div class="dl">
<h5 class="es5">descriptor.configurable <span>-- 定义属性是否可配置，一旦设置为 false，不能重新配置，属性也不能删除，默认值 false</span></h5>
<h5 class="es5">descriptor.enumerable <span>-- 定义属性是否可遍历，默认值 false</span></h5>
<h5 class="es5">descriptor.value <span>-- 如果提供，会重新设置属性值，仅存在于 data descriptor</span></h5>
<h5 class="es5">descriptor.writable <span>-- 定义属性是否可修改，默认值 false，仅存在于 data descriptor</span></h5>
<h5 class="es5">descriptor.get <span>-- 设定 getter，默认值 undefined，仅存在于 accessor descriptor</span></h5>
<h5 class="es5">descriptor.set <span>-- 设定 setter，默认值 undefined，仅存在于 accessor descriptor</span></h5>
</div>

```js
descriptor: {
  configurable, enumerable,
  ...data desccriptor: {value, writable},
  ...accessor descriptor: {get, set}      // data 和 accessor 两者互斥
}
```

[注1]：可以通过 `map = Object.create(null);` 创建没有附加属性和方法的纯净对象，可避免使用 `hasOwnProperty()`。

[注2]：虽然 ES6 将广泛使用的 `__proto__` 引入了标准(仅在附录里提到要求浏览器都部署，对其他运行环境没要求)，只是为了不同平台间的兼容性，正常我们应该使用 `Object.getPrototypeOf()`。

[注3]：该方法用来替代有争议的 `object.__proto__` 属性，但还是无法回避修改原型的执行性能问题，如非必要请新建对象。

[注4]：ES5 中 getter 和 setter 的用法：

```js
// es5
Object.defineProperty(a, 'bar', {
  get: function() { return this.foo; },
  set: function(str) { this.foo = str; }
});
// es6
var a = {
  get foo () { return this.name; },
  set foo (str) { this.name = str; }
};
```


## Function

<div class="dl">
<h5 class="es3">Function(arg1, arg2, ..., body)<span>-- 构造函数，用于创建函数对象。带不带 new 效果一样。</span></h5>
<h5 class="es3">Function.prototype <span>-- 构造函数的原型对象 `{constructor, __proto__}`</span></h5>
</div>
<div class="dl">
<h5 class="es3">arguments <span>-- a local variable available within all non-arrow functions, an array-like object</span></h5>
<h5 class="es3">arguments.length <span>-- 调用函数时实际传入的参数个数。而 Function.length 为函数定义时的形参个数</span></h5>
<h5 class="es3"><i class="deprecated"></i>arguments.callee <span>-- 指向当前函数，严格模式下被禁用，有缺陷，但似乎又没办法完全弃用</span></h5>
</div>
<div class="dl">
<h5 class="es3">function.length <span>-- 获取函数的形参个数</span></h5>
<h5 class="es6">function.name <span>-- 获取函数的名称</span></h5>
<h5 class="es6"><i class="deprecated"></i>function.caller <span>-- 保存着对调用当前函数的函数的引用，用于替代被废弃的 arguments.caller</span><span class="mark">[注1]</span></h5>
</div>
<div class="dl">
<h5 class="es3">function.apply(thisArg, argsArray?) <span>-- 设定 this 值后执行，参数以数组形式传入</span></h5>
<h5 class="es3">function.call(thisArg, arg1, arg2, ...) <span>-- 设定 this 值后执行，参数以列表形式传入</span></h5>
<h5 class="es5">function.bind(thisArg, arg1?, ...) <span>-- 创建一个新函数(绑定函数)，原函数 this 被替换，还可预先设置部分参数</span></h5>
<h5 class="es3">function.toString() <span>-- 获取函数源码的字符串，重写</span></h5>
</div>

```js
// 跟 `eval` 一样，存在安全和性能问题
// unlike eval, the Function constructor creates functions which execute in the global scope only.
// Function 和 new Function() 等效
var foo = Function('a', 'b, c', 'return a + b + c');  // 运行时求值
```

注1：在非严格模式下可以通过 `foo.caller` `foo.arguments.caller` 读到调用栈上其他函数的信息，出于安全性考虑已经被废弃，在严格模式下都被禁用。
```js
function foo(a, b) { bar(); }
function bar() { console.log(foo.arguments, bar.caller); }
```


## Array

数组是类似列表的对象，在原型中提供了一些遍历以及改变其中对象的方法。

<div class="dl">
<h5 class="es3">Array.prototype <span>-- 可以通过该属性给 Array类型 添加公共属性</span></h5>
<h5 class="es5">Array.isArray(value) <span>-- 确定某个值是不是数组</span></h5>
<h5 class="es6">Array.from(arrayLike, mapFn?, thisArg?) <span>-- 根据 arrayLike 创建一个数组。`arrayLike`: An iterable or array-like object</span></h5>
<h5 class="es esn">Array.fromAsync(arrayLike, mapFn?, thisArg?) <span>-- </span></h5>
<h5 class="es6">Array.of(element0, e1?, ..., eN?) <span>-- 创建一个新数组<br>用于替代 <code>Array(arrayLength)</code> <code>Array(element0, element1[, ..., elementN])</code></span></h5>
</div>
<div class="dl">
<h5 class="es3">array.constructor <span>-- 返回创建此数组的函数的引用</span></h5>
<h5 class="es3">array.length <span>-- 设置或返回数组中元素的数目</span></h5>
</div>
<div class="dl">
<h4>Mutator methods -- 修改数组本身</h4>
<h5 class="es3">array.pop() <span>-- 从数组末尾移除最后一项，然后返回移除的项</span></h5>
<h5 class="es3">array.push(item1, item2, ...) <span>-- 在数组尾部添加1个或多个元素，返回新数组的 <code>length</code></span></h5>
<h5 class="es3">array.shift() <span>-- 移除数组中的第一个项并返回该项</span></h5>
<h5 class="es3">array.unshift(item1, item2, ...) <span>-- 在数组前端添加1个或多个元素，返回新数组的 <code>length</code></span></h5>
<h5 class="es3">array.splice(start, deleteCount?, item1?, ...) <span>-- 在给定位置删除若干元素并添加一些元素，返回包含被删除元素的数组</span></h5>
<h5 class="es3">array.sort((a, b) => number) <span>-- 按升序排列数组(默认都当<span style="color: blue;">字符串</span>比较, 故 10 在 2 前面)，可自定义比较函数</span></h5>
<h5 class="es3">array.reverse() <span>-- 反转数组项的顺序</span></h5>
<h5 class="es6">array.copyWithin(target: number, start?, end?) <span>-- 在数组<i>内部</i>浅拷贝其中一段到另一个位置，返回修改后的数组</span></h5>
<h5 class="es6">array.fill(value, start?, end?) <span>-- 给指定位置填充数值，返回修改后的数组</span></h5>

<h4>Accessor methods -- 只返回信息，不修改数组本身</h4>
<h5 class="es es22">array.at(index) <span>-- 支持负数索引 index allowing for positive and negative integers</span></h5>
<h5 class="es3">array.concat(arrayOrValue, ...) <span>-- 返回由当前数组和其它数组或值组成的新数组</span></h5>
<h5 class="es3">array.slice(begin?, end?) <span>-- 抽取数组中的一段元素组成一个新数组(不含 end 位置的值)，方法可将类数组转成数组</span></h5>
<h5 class="es5">array.indexOf(item, from?) <span>-- 返回给定元素能在数组中找到的第一个索引值，否则返回-1</span></h5>
<h5 class="es5">array.lastIndexOf(item, from?) <span>-- 返回给定元素能在数组中找到的最后一个索引值，否则返回-1</span></h5>
<h5 class="es6">array.includes(item, from?) <span>-- 是否存在查找项，返回 ture 或 false</span></h5>
<h5 class="es6">array.find((element, index, array) => boolean, thisArg?) <span>-- 返回首个通过测试函数检测的元素值，都失败返回 undefined</span></h5>
<h5 class="es6">array.findIndex(cb, thisArg?) <span>-- 返回首个通过测试函数检测的元素索引，都失败返回 -1</span></h5>
<h5 class="es es23">array.findLast(callbackFn, thisArg) <span>-- </span></h5>
<h5 class="es es23">array.findLastIndex(callbackFn, thisArg) <span>-- </span></h5>
<h5 class="es3">array.join(separator?) <span>-- 根据提供的分隔符字符串，返回包含所有数组项的字符串</span></h5>
<h5 class="es3">array.toString() <span>-- 返回一个由所有数组元素组合而成的字符串，重写</span></h5>
<h5 class="es3">array.toLocaleString() <span>-- 返回一个由所有数组元素组合而成的本地化后的字符串，重写</span></h5>
<h5 class="es6">array.keys() <span>-- returns a new Array Iterator object</span></h5>
<h5 class="es6">array.values() <span>-- returns a new Array Iterator object</span></h5>
<h5 class="es6">array.entries() <span>-- returns a new Array Iterator object</span></h5>
<h5 class="es es19">array.flat(depth=1) <span>-- a new array with all sub-array elements concatenated into it recursively up to the specified depth</span></h5>
<h5 class="es es19">array.flatMap(callbackFn, thisArg?) <span>-- 等效于 `arr.map(...args).flat()`</span></h5>
<h5 class="es esn">array.with(index, value) <span>-- change the value of a given index, and returns a new array</span></h5>
<h5 class="es esn">array.toSpliced(start, deleteCount, item1, …, itemN) <span>-- the copying version of the `splice()`</span></h5>
<h5 class="es esn">array.toReversed() <span>-- the copying version of the `reverse()`</span></h5>
<h5 class="es esn">array.toSorted() <span>-- the copying version of the `sort()`</span></h5>

<h4>Iteration methods -- 遍历方法，<small>为了可读性和可维护性，不要在遍历过程中对原数组进行修改</small></h4>
<h5 class="es5">array.forEach((current, index, array) => void, thisArg?) <span>-- 对数组中的每一项（非 empty）运行给定函数，没有返回值</span></h5>
<h5 class="es5">array.map(cb, thisArg?) <span>-- 返回一个由回调函数的返回值组成的新数组</span></h5>
<h5 class="es5">array.filter(cb, thisArg?) <span>-- 对每一项运行给定函数，返回由 true 项组成的新数组</span></h5>
<h5 class="es5">array.every(cb, thisArg?) <span>-- 对每一项运行给定函数，每项都 true 才返回 true</span></h5>
<h5 class="es5">array.some(cb, thisArg?) <span>-- 对每一项运行给定函数，只要有一项 true 就返回 true</span></h5>
<h5 class="es5">array.reduce(cb, initialValue?) <span>-- 从左到右为每个元素执行回调，并将上次返回值传给下次，返回最后一次的返回值</span></h5>
<h5 class="es5">array.reduceRight((acc, val, idx, arr) => { return acc + val; }, initialValue?) <span>-- 从右到左...</span></h5>
</div>

https://gist.github.com/rauschma/f7b96b8b7274f2e2d8dab899803346c3

```js
// 避免这些用法，有很大缺陷。另外注意，数组各方法对空位的处理逻辑很不一致
const arr1 = Array(7);  // 声明一个长度为7的数组 [empty x 7] // forEach() 会跳过 empty 项，其他场景不会
const arr2 = Array(7, 1);  // 新建数组 [7, 1]

// 新建数组应该用下面这两种方式
const arr3 = Array.from({length: 7});  // [undefined, ..., undefined]
const arr4 = Array.of(7);  // [7]
```

```js
// empty 项目行为测试

const arr = Array(5) // [empty x 5]
arr[1] = 1           // [empty, 1 empty x 3]
arr['2'] = undefined // [empty, 1, undefined, empty x 2]
arr[3] = 3           // [empty, 1, undefined, 3, empty]
delete arr[3]        // [empty, 1, undefined, empty x 2]
arr.map((v, i) => i) // [empty, 1, 2, empty x 2]
arr.forEach((v, i) => console.log(i))    // 1 2
for (const i in arr) { console.log(i) }  // 1 2
for (const v of arr) { console.log(v) }  // undefined 1 undefined x 3
```

```js
var arr = ['c', 'd']; arr.unshift('e', 'f');  // 4; arr: [ 'e', 'f', 'c', 'd' ] 注意观察顺序
['a'].concat('b', ['c', 'd'])  // [ 'a', 'b', 'c', 'd' ] 参数可以是多个值或数组
['a', 'b', 'c', 'd'].copyWithin(0, 2, 4)  // [ 'c', 'd', 'c', 'd' ]
Array.from(['a', 'b'].entries())  // [ [ 0, 'a' ], [ 1, 'b' ] ]
```

## <span class="es6">Set</span>

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

<div class="dl">
  <h5>set.size <span>-- 返回 Set 实例的成员总数</span></h5>
  <h5>set.add(value) <span>-- 添加某个值，返回 Set 结构本身</span></h5>
  <h5>set.delete(value) <span>-- 删除某个值，返回一个布尔值，表示删除是否成功</span></h5>
  <h5>set.has(value) <span>-- 返回一个布尔值，表示该值是否为 Set 的成员</span></h5>
  <h5>set.clear() <span>-- 清除所有成员，没有返回值</span></h5>
</div>
<div class="dl">
  <h5>set.keys() <span>-- 返回键名的遍历器，因为 Set 结构没有键名只有键值，所以相当于 values() 的别名</span></h5>
  <h5>set.values() <span>-- 返回键值的遍历器</span></h5>
  <h5>set.entries() <span>-- 返回键值对的遍历器，实际为 [value, value]</span></h5>
  <h5>set.forEach(cb, thisArg?) <span>-- 使用回调函数遍历每个成员</span></h5>
</div>

[注] 遍历器可通过 `Array.from()` 转成数组，这样就可以使用诸多数组方法了。

## <span class="es6">WeakSet</span>

WeakSet 结构与 Set 类似，但它与 Set 有两个区别：
  * WeakSet 的成员只能是对象，而不能是其他类型的值。
  * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，这也意味着 WeakSet 不可遍历。

<div class="dl">
  <h5>weakSet.add(value) <span>-- 向 WeakSet 实例添加一个新成员</span></h5>
  <h5>weakSet.delete(value) <span>-- 清除 WeakSet 实例的指定成员</span></h5>
  <h5>weakSet.has(value) <span>-- 返回一个布尔值，表示某个值是否在 WeakSet 实例之中</span></h5>
</div>

```js
let a = ['a'], b = ['b'], s = new Set(), ws = new WeakSet()
s.add(a); ws.add(b)
a = b = undefined   // 然后通过点击 Chrome Performance 的垃圾桶按钮触发垃圾回收
console.log(s, ws)  // Set(1) {Array(1)}   WeakSet {}
```

## <span class="es6">Map</span>

Object 结构提供了 "字符串—值" 的对应，Map 结构提供了 "值—值" 的对应，是一种更完善的 Hash 结构实现。

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


## <span class="es6">WeakMap</span>

WeakMap 结构与 Map 结构基本类似，唯一的区别是它只接受对象作为键名(null除外)，不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。WeakMap 没有遍历操作，也没有 size 属性；无法清空。

<div class="dl">
  <h5>weakMap.get(key) <span>-- 返回 key 对应的值，如果不存在则返回 undefined</span></h5>
  <h5>weakMap.set(key, value) <span>-- 设置 key 所对应的键值，然后返回整个 WeakMap 结构</span></h5>
  <h5>weakMap.delete(key) <span>-- 清除 WeakMap 中 key 对应的键值</span></h5>
  <h5>weakMap.has(key) <span>-- 返回一个布尔值，表示 WeakMap 对象中是否有保存 key 对应的值</span></h5>
</div>


## Boolean

<div class="dl">
<h5 class="es3">boolean.valueOf() <span>-- 返回 Boolean 对象的原始值</span></h5>
<h5 class="es3">boolean.toString() <span>-- 把逻辑值转换为字符串</span></h5>
</div>


## Number

<div class="dl">
<h5 class="es6">Number.isNaN(value) <span>-- 与全局 isNaN() 不同的是，对非数值不会先调用 Number() 进行转换，直接返回 false</span></h5>
<h5 class="es6">Number.isFinite(value) <span>-- 检查数值是否非无穷，与全局 isFinite() 不同的是，对非数值直接返回 false</span></h5>
<h5 class="es6">Number.isInteger(value) <span>-- 判断一个值是否为整数，注意 `3.0` 也被认为是整数，因为整数和浮点数用的同样的储存方法</span></h5>
<h5 class="es6">Number.parseInt(string, radix?) <span>-- Number.parseInt === parseInt; // true</span></h5>
<h5 class="es6">Number.parseFloat(string) <span>-- Number.parseFloat === parseFloat; // true</span></h5>
<h5 class="es6">Number.isSafeInteger(testValue) <span>-- JS能准确表示的整数范围在 -2^53 到 2^53 之间(不含两个端点)</span></h5>
</div>
<div class="dl">
<h5 class="es3">number.toExponential(fractionDigits?) <span>-- 把对象的值转换为指数计数法，小数点保留(0-20 含)位</span></h5>
<h5 class="es3">number.toFixed(digits?) <span>-- 把数字转换为字符串，结果的小数点后有指定位数的数字</span></h5>
<h5 class="es3">number.toPrecision(length?) <span>-- 把数字格式化为指定的精度 `toPrecision(2): 5.123 -> 5.1 0.0123 -> 0.012`</span></h5>
<h5 class="es3">number.toString(radix?) <span>-- 把数字转换为字符串，使用指定的基数(2-36 含)</span></h5>
<h5 class="es3">number.toLocaleString(locales?, options?) <span>-- 把数字转换为字符串，使用本地数字格式顺序</span></h5>
<h5 class="es3">number.valueOf() <span>-- 返回一个 Number 对象的基本数字值</span></h5>
</div>
<div class="dl">
<h5 class="es3">Number.MAX_VALUE <span>-- `1.7976931348623157e+308`</span></h5>
<h5 class="es3">Number.MIN_VALUE <span>-- `5e-324` 注意该值是正的</span></h5>
<h5 class="es3">Number.NaN</h5>
<h5 class="es3">Number.NEGATIVE_INFINITY <span>-- `-Infinity`</span></h5>
<h5 class="es3">Number.POSITIVE_INFINITY <span>-- `Infinity`</span></h5>
<h5 class="es6">Number.EPSILON <span>-- 极小的常量，实质是一个可以接受的误差范围</span></h5>
<h5 class="es6">Number.MAX_SAFE_INTEGER <span>-- `=== Math.pow(2, 53) - 1`</span></h5>
<h5 class="es6">Number.MIN_SAFE_INTEGER <span>-- `=== -2 ** 53 + 1`</span></h5>
</div>

```js
['10', '10', '10', '10', '10'].map(parseInt)  // [10, NaN, 2, 3, 4]
```

## <span class="es es20">BigInt</span>

<div class="dl">

</div>


## String

数组相关的方法略

<div class="dl">
<h5 class="es3">String.fromCharCode(num1, num2, …) <span>-- </span></h5>
<h5 class="es3">String.fromCodePoint(num1, num2, …) <span>-- </span></h5>
<h5 class="es6">String.raw`templateString` / String.raw(strings, sub1, sub2, ...) <span>-- is a tag function of template literals</span></h5>
</div>
<div class="dl">
<h5 class="es3">string.length <span>-- 返回字符串的长度</span></h5>
</div>
<div class="dl">
<h5 class="es3">string.localeCompare(compareString, locales, options) <span>-- </span></h5>
<h5 class="es3">string.substring(index1, index2?) <span>-- 返回指定的两个下标之间的子字符串。不含 index2 位置的字符</span></h5>
<h5 class="es3">string.substr(start, length?) <span>-- 从指定位置摘取指定长度的子字符串</span></h5>
</div>
<div class="dl">
<h5 class="es6">string.startsWith(searchString, position) <span>-- </span></h5>
<h5 class="es6">string.endsWith(searchString, endPosition) <span>-- </span></h5>
<h5 class="es6">string.repeat(count) <span>-- </span></h5>
<h5 class="es3">string.match(regexp) <span>-- 使用正则表达式对象匹配字符串并返回数组，无匹配为 null</span><span class="mark">[注1]</span></h5>
<h5 class="es es20">string.matchAll(regexp) <span>-- </span></h5>
<h5 class="es3">string.replace(regexp|substr, newSubstr|function) <span>-- 返回替换后的新字符串，注意，原字符串不会变</span></h5>
<h5 class="es es21">string.replaceAll(pattern, replacement) <span>-- </span></h5>
<h5 class="es3">string.search(regexp) <span>-- 返回索引位置，找不到为 -1</span></h5>
<h5 class="es3">string.split(separator?, limit?) <span>-- 返回数组，支持字符串和正则</span></h5>
</div>
<div class="dl">
<h5 class="es3">string.charAt(index) <span>-- 返回给定位置的那个字符</span></h5>
<h5 class="es3">string.charCodeAt(index) <span>-- 返回给定位置字符的字符编码 `[0,65535]`</span></h5>
<h5 class="es3">string.codePointAt(index) <span>-- 返回给定位置字符的字符编码 `[0, 0x10FFFF]`</span></h5>
</div>
<div class="dl">
<h5 class="es3">string.toUpperCase() <span>-- 将字符串转换成大写并返回新字符串</span></h5>
<h5 class="es3">string.toLowerCase() <span>-- 将字符串转换成小写并返回新字符串</span></h5>
</div>
<div class="dl">
<h5 class="es5">string.trim() <span>-- 删除前置和后缀的所有空格并返回处理后的新字符串</span></h5>
<h5 class="es es19">string.{trimStart, trimLeft}() <span>-- 删除前置的所有空格并返回处理后的新字符串</span></h5>
<h5 class="es es19">string.{trimEnd, trimRight}() <span>-- 删除后缀的所有空格并返回处理后的新字符串</span></h5>
<h5 class="es es17">string.padStart(length [, padString]) <span>-- 如果字符串小于指定长度就在前面用指定字符串填充</span></h5>
<h5 class="es es17">string.padEnd(length [, padString]) <span>-- 如果字符串小于指定长度就在后面用指定字符串填充</span></h5>
<h5 class="es5">string.normalize(form?) <span>-- </span></h5>
</div>
<div class="dl">
<h5 class="es3"><i class="deprecated"></i>string.anchor(name) <span>-- 创建一个名为 name 的锚</span></h5>
<h5 class="es3"><i class="deprecated"></i>string.link(url) <span>-- 根据提供的url创建一个链接</span></h5>
</div>

注1: `string.match()` 的三种用法 `string.match(/regexp/)` `string.match(/regexp/g)` `string.match() /*无参*/`  
注2: `'abc.jar'.substr(-4) == '.jar'` `'abc.jar'.substring(-4) == 'abc.jar'` `'abc.jar'.slice(-4) == '.jar'`

```js
'8'.padStart(2, '0')  // '08'
'abc'.padStart(6, '123456')  // 123abc
```


## <span class="es6">Symbol</span>

<div class="dl">
<h5>Symbol(key?) <span>-- 新建一个 symbol 并返回，注意，此函数返回的是原始值类型，所以不是构造函数，前面不能有 `new`</span></h5>
</div>
<div class="dl">
<h5>Symbol.for(key) <span>-- 查找并返回key对应的symbol，如找不到则新建一个symbol并返回</span><span class="mark">[注1]</span></h5>
<h5>Symbol.keyFor(symbol) <span>-- 查找并返回symbol对应的key，找不到返回 undefined (跟 Symbol.for() 对应，与 Symbol() 无关)</span></h5>
<h5>symbol.toString() <span>-- 返回symbol的字符串表示，重写的方法 `Symbol("desc").toString(); // "Symbol(desc)"`</span></h5>
</div>

Well-known Symbols
* their purpose is to serve as "protocols" for certain built-in JavaScript operations
* In MDN and other sources, well-known symbol values are stylized by prefixing `@@`

<div class="dl">
<h5>Symbol.hasInstance <span>-- </span></h5>
<h5>Symbol.isConcatSpreadable <span>-- </span></h5>
<h5>Symbol.iterator <span>-- </span></h5>
<h5>Symbol.match <span>-- </span></h5>
<h5>Symbol.prototype <span>-- </span></h5>
<h5>Symbol.replace <span>-- </span></h5>
<h5>Symbol.search <span>-- </span></h5>
<h5>Symbol.species <span>-- </span></h5>
<h5>Symbol.split <span>-- </span></h5>
<h5>Symbol.toPrimitive <span>-- </span></h5>
<h5>Symbol.unscopables <span>-- </span></h5>
</div>

[注1]：`Symbol.for()` 与 `Symbol()` 都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

```js
const PRIVATE_PROP = Symbol('private_prop');
class ClassWithPrivateProps {
  constructor () {
    this[PRIVATE_PROP] = 'private prop';
  }
}
```


## RegExp

<div class="dl">
<h5 class="es3">RegExp() <span>-- `new RegExp(pattern, flags?)` 用字面量太长时可通过构造函数传 string 解决(注意 \ 要+1，两头 / 去掉)</span></h5>
</div>
<div class="dl">
<h5 class="es3">regexp.lastIndex <span>-- 下次匹配开始的字符串索引位置，只有设置了 g 标志时才有效</span></h5>
<h5 class="es3">regexp.global <span>-- </span></h5>
<h5 class="es3">regexp.ignoreCase <span>-- </span></h5>
<h5 class="es3">regexp.multiline <span>-- </span></h5>
<h5 class="es es18">regexp.dotAll <span>-- </span></h5>
<h5 class="es es22">regexp.hasIndices <span>-- </span></h5>
<h5 class="es3">regexp.source <span>-- </span></h5>
<h5 class="es es22">regexp.flags <span>-- </span></h5>
</div>
<div class="dl">
<h5 class="es3">regexp.exec(str) <span>-- 检索字符串中指定的值。返回找到的值，并确定其位置</span></h5>
<h5 class="es3">regexp.test(str) <span>-- 检索字符串中指定的值。返回 true 或 false</span></h5>
<h5 class="es3">regexp.toString() <span>-- 返回一个字符串，即该正则对象的字面量。</span></h5>
</div>

```js
var reg = /abc/g;
reg.test('abcd'); // true    reg.lastIndex = 3
reg.test('abcd'); // false   reg.lastIndex = 0
reg.test('abcd'); // true

/(ab)(cd)/g.exec('abcdef'); // ["abcd", "ab", "cd", index: 0, input: 'abcdef', groups: undefined]
```


## Math

<div class="dl">
<h5 class="es">Math.E Math.LN2 Math.LN10 Math.LOG2E Math.LOG10E Math.PI Math.SQRT1_2 Math.SQRT2</h5>
</div>
<div class="dl">
<h5 class="es3">Math.min(x, y, z,...) <span>-- 确定一组数值中的最小值</span></h5>
<h5 class="es3">Math.max(x, y, z,...) <span>-- 确定一组数值中的最大值</span></h5>
<h5 class="es3">Math.ceil(x) <span>-- 执行向上取整</span></h5>
<h5 class="es3">Math.floor(x) <span>-- 执行向下取整, 即不超过 x 的最大整数 `Math.floor(-3.5) // -4`</span></h5>
<h5 class="es3">Math.round(x) <span>-- 执行四舍五入 `Math.round(x) = Math.floor(x + 0.5);  // 0.5 -> 1; -0.5 -> 0`</span></h5>
<h5 class="es3">Math.random() <span>-- 返回 0 到 1 之间的随机数 `[0, 1)`</span></h5>
<h5 class="es3">Math.abs(x) <span>-- absolute 绝对值 `|x|`</span></h5>
<h5 class="es3">Math.sqrt(x) <span>-- square root 平方根 <code>x<sup>0.5</sup></code></span></h5>
<h5 class="es3">Math.pow(base, exponent) <span>-- power 幂, base 的 exponent 次方, <code>base<sup>exponent</sup></code></span></h5>
<h5 class="es3">Math.exp(x) <span>--  <code>e<sup>x</sup></code></span></h5>
<h5 class="es3">Math.log(x) <span>-- 即 ln(x), <code>e<sup>y</sup>=x</span></code></h5>
<h5 class="es3">Math.sin(x) Math.cos(x) Math.tan(x) Math.asin(x) Math.acos(x) Math.atan(x) Math.atan2(y, x)</h5>
<h5 class="es6">Math.sinh(x) <span>-- 返回x的双曲正弦（hyperbolic sine）</span></h5>
<h5 class="es6">Math.cosh(x) <span>-- 返回x的双曲余弦（hyperbolic cosine）</span></h5>
<h5 class="es6">Math.tanh(x) <span>-- 返回x的双曲正切（hyperbolic tangent）</span></h5>
<h5 class="es6">Math.asinh(x) <span>-- 返回x的反双曲正弦（inverse hyperbolic sine）</span></h5>
<h5 class="es6">Math.acosh(x) <span>-- 返回x的反双曲余弦（inverse hyperbolic cosine）</span></h5>
<h5 class="es6">Math.atanh(x) <span>-- 返回x的反双曲正切（inverse hyperbolic tangent）</span></h5>
<h5 class="es6">Math.trunc() <span>-- </span></h5>
<h5 class="es6">Math.sign() <span>-- 判断一个数到底是正数、负数、还是零。正数+1；负数-1；0返回0；-0返回-0;其他返回NaN</span></h5>
<h5 class="es6">Math.cbrt() <span>-- 计算一个数的立方根</span></h5>
<h5 class="es6">Math.clz32() <span>-- </span></h5>
<h5 class="es6">Math.imul() <span>-- </span></h5>
<h5 class="es6">Math.fround() <span>-- </span></h5>
<h5 class="es6">Math.hypot() <span>-- </span></h5>
<h5 class="es6">Math.expm1() <span>-- </span></h5>
<h5 class="es6">Math.log1p() <span>-- </span></h5>
<h5 class="es6">Math.log10() <span>-- </span></h5>
<h5 class="es6">Math.log2() <span>-- </span></h5>
</div>


## Date

<div class="dl">
<h5 class="es3">Date.prototype <span>-- 使您有能力向对象添加公共属性和方法。</span></h5>
<h5 class="es3">Date.length <span>-- 值是 7。这是该构造函数可接受的参数个数。</span></h5>
</div>
<div class="dl">
<h5 class="es3">Date() <span>-- 以 <b>字符串</b> 形式返回当前的日期和时间。</span></h5>
<h5 class="es3">Date.now() <span>-- 返回调用这个方法时的日期和时间的 <b>毫秒数</b>。</span></h5>
<h5 class="es3">Date.parse(dateString) <span>-- 返回 1970年1月1日午夜 到指定日期（字符串）的 <b>毫秒数</b>。</span></h5>
<h5 class="es3">Date.UTC(year, month[, ...]) <span>-- 根据世界时返回 1970年1月1日 到指定日期的 <b>毫秒数</b>。</span></h5>
</div>
<div class="dl">
<h5 class="es3">date.valueOf() <span>-- 返回 Date 对象的原始值。</span></h5>
<h5 class="es3">date.toString() <span>-- 把 Date 对象转换为字符串。</span></h5>
<h5 class="es3">date.toLocaleString() <span>-- 根据本地时间格式，把 Date 对象转换为字符串。</span></h5>
<h5 class="es3">date.toDateString() <span>-- 把 Date 对象的日期部分转换为字符串。</span></h5>
<h5 class="es3">date.toTimeString() <span>-- 把 Date 对象的时间部分转换为字符串。</span></h5>
<h5 class="es3">date.toLocaleDateString() <span>-- 根据本地时间格式，把 Date 对象的日期部分转换为字符串。</span></h5>
<h5 class="es3">date.toLocaleTimeString() <span>-- 根据本地时间格式，把 Date 对象的时间部分转换为字符串。</span></h5>
<h5 class="es3">date.toISOString() <span>-- '2024-01-17T07:41:59.580Z'</span></h5>
<h5 class="es3">date.toUTCString() <span>-- 根据世界时，把 Date 对象转换为字符串。</span></h5>
</div>
<div class="dl">
<h5 class="es3">date.getTime() <span>-- 返回 1970 年 1 月 1 日至今的毫秒数。</span></h5>
<h5 class="es3">date.setTime() <span>-- 以毫秒设置 Date 对象。</span></h5>
<h5 class="es3">date.getFullYear() <span>-- 从 Date 对象以四位数字返回年份。</span></h5>
<h5 class="es3">date.setFullYear() <span>-- 设置 Date 对象中的年份（四位数字）。</span></h5>
<h5 class="es3">date.getMonth() <span>-- 从 Date 对象返回月份 (<span style="color: red;">0 ~ 11</span>)。</span></h5>
<h5 class="es3">date.setMonth() <span>-- 设置 Date 对象中月份 (0 ~ 11)。</span></h5>
<h5 class="es3">date.getDate() <span>-- 从 Date 对象返回一个月中的某一天 (1 ~ 31)。</span></h5>
<h5 class="es3">date.setDate() <span>-- 设置 Date 对象中月的某一天 (1 ~ 31)。</span></h5>
<h5 class="es3">date.getHours() <span>-- 返回 Date 对象的小时 (0 ~ 23)。</span></h5>
<h5 class="es3">date.setHours() <span>-- 设置 Date 对象中的小时 (0 ~ 23)。</span></h5>
<h5 class="es3">date.getMinutes() <span>-- 返回 Date 对象的分钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.setMinutes() <span>-- 设置 Date 对象中的分钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.getSeconds() <span>-- 返回 Date 对象的秒数 (0 ~ 59)。</span></h5>
<h5 class="es3">date.setSeconds() <span>-- 设置 Date 对象中的秒钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.getDay() <span>-- 从 Date 对象返回一周中的某一天 (0 ~ 6)。</span></h5>
<h5 class="es3">date.getMilliseconds() <span>-- 返回 Date 对象的毫秒(0 ~ 999)。</span></h5>
<h5 class="es3">date.setMilliseconds() <span>-- 设置 Date 对象中的毫秒 (0 ~ 999)。</span></h5>
<h5 class="es3">date.getTimezoneOffset() <span>-- 返回本地时间与格林威治标准时间 (GMT) 的分钟差。</span></h5>
<h5 class="es3">date.getUTCDate() <span>-- 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。</span></h5>
<h5 class="es3">date.getUTCDay() <span>-- 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。</span></h5>
<h5 class="es3">date.getUTCMonth() <span>-- 根据世界时从 Date 对象返回月份 (0 ~ 11)。</span></h5>
<h5 class="es3">date.getUTCFullYear() <span>-- 根据世界时从 Date 对象返回四位数的年份。</span></h5>
<h5 class="es3">date.getUTCHours() <span>-- 根据世界时返回 Date 对象的小时 (0 ~ 23)。</span></h5>
<h5 class="es3">date.getUTCMinutes() <span>-- 根据世界时返回 Date 对象的分钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.getUTCSeconds() <span>-- 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.getUTCMilliseconds() <span>-- 根据世界时返回 Date 对象的毫秒(0 ~ 999)。</span></h5>
<h5 class="es3">date.setUTCDate() <span>-- 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。</span></h5>
<h5 class="es3">date.setUTCMonth() <span>-- 根据世界时设置 Date 对象中的月份 (0 ~ 11)。</span></h5>
<h5 class="es3">date.setUTCFullYear() <span>-- 根据世界时设置 Date 对象中的年份（四位数字）。</span></h5>
<h5 class="es3">date.setUTCHours() <span>-- 根据世界时设置 Date 对象中的小时 (0 ~ 23)。</span></h5>
<h5 class="es3">date.setUTCMinutes() <span>-- 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.setUTCSeconds() <span>-- 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。</span></h5>
<h5 class="es3">date.setUTCMilliseconds() <span>根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。</span></h5>
</div>

```js
new Date(value)
new Date(dateString)
new Date(year, monthIndex, day?, hours?, minutes?, seconds?, milliseconds?)
```


## <span class="es6">Promise</span>

<div class="dl">
  <h5>promise.then(onFulfilled, onRejected) <span>-- 为 Promise 实例添加状态改变时的回调函数</span></h5>
  <h5>promise.catch(onRejected) <span>-- 是 `.then(null, onRejected)` 的别名，用于指定发生错误时的回调函数</span></h5>
  <h5 class="es es18">promise.finally(onFinally) <span>-- 不管是成功还是失败，只要状态确定就会执行</span></h5>
  <h5>Promise.resolve(value) <span>-- 将现有对象转为 Promise 对象</span></h5>
  <h5>Promise.reject(reason) <span>-- 返回一个新的 Promise 实例，该实例的状态为 rejected</span></h5>
  <h5>Promise.all(iterable) <span>-- 将多个 Promise 实例包装成一个新的 Promise 实例，返回数组或首个 reject 值</span></h5>
  <h5 class="es es20">Promise.allSettled(iterable) <span>-- 返回 `Promise<{status 'fulfilled'|'rejected'; value: any; reason: any}[]>`</h5>
  <h5>Promise.race(iterable) <span>-- 返回率先<i>改变</i>的 Promise 实例的返回值</span></h5>
  <h5 class="es es21">Promise.any(iterable) <span>-- 返回率先<i>成功</i>的 Promise 实例的返回值</span></h5>
</div>

```js
const p = new Promise(function(resolve, reject) {
  resolve('Success!');
}).then(function(value) {
  console.log(value);
});
```

```js
const p1 = Promise.all([1, 2, 3, Promise.resolve(444)]);
const p2 = Promise.all([1, 2, 3, Promise.reject(555)]);

setTimeout(() => {
  console.log(p1); // Promise { <state>: "fulfilled", <value>: Array[4] }
  console.log(p2); // Promise { <state>: "rejected", <reason>: 555 }
});
```

## JSON

JSON is a syntax for serializing objects, arrays, numbers, strings, booleans, and `null`.

<div class="dl">
  <h5>JSON.parse(text, reviver) <span>-- </h5>
  <h5>JSON.stringify(value, replacer, space) <span>-- </h5>
</div>

```js
const replacer = (key, value) => typeof value === "bigint" ? value.toString() : value;
const data = { number: 1, big: 18014398509481982n };
const stringified = JSON.stringify(data, replacer);
console.log(stringified); // {"number":1,"big":"18014398509481982"}
```

```js
const reviver = (key, value) => (key === "big" ? BigInt(value) : value);
const payload = '{"number":1,"big":"18014398509481982"}';
const parsed = JSON.parse(payload, reviver);
console.log(parsed); // { number: 1, big: 18014398509481982n }
```


## <span class="es6">Generator</span>

<div class="dl">
  <h5>generator.next(value?) <span>-- 返回一个 `{value, done}` 对象，可选参数用于往生成器输入信息</span></h5>
  <h5>generator.return(value?) <span>-- 返回给定的 value 值，并将生成器状态改成 done: true，返回值跟生成器内定义的 return 无关</span></h5>
  <h5>generator.throw(exp?) <span>-- 向生成器内抛出一个错误，如果在生成器内被捕获，会返回一个 yield，否则生成器状态变成 closed</span></h5>
</div>


## <span class="es6">Reflection / Proxy</span>

通过 `Proxy` 可以创建附加了功能拦截的新对象，可以通过添加拦截器来更改系统的默认行为。

```js
var proxy = new Proxy(target, handler);
target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  }
});
```

`Reflect` 只是一个内置对象，不是构造函数，提供了一个读取系统默认方法的接口。同 `Math` 一样，所含方法都是静态方法。

<table>
<tr><th>Proxy Trap</th><th>Overrides the Behavior Of</th><th>Default Behavior</th></tr>
<tr><td><code>get</code></td><td>Reading a property value</td><td><code>Reflect.get()</code></td></tr>
<tr><td><code>set</code></td><td>Writing to a property</td><td><code>Reflect.set()</code></td></tr>
<tr><td><code>has</code></td><td>The <code>in</code> operator</td><td><code>Reflect.has()</code></td></tr>
<tr><td><code>deleteProperty</code></td><td>The <code>delete</code> operator</td><td><code>Reflect.deleteProperty()</code></td></tr>
<tr><td><code>getPrototypeOf</code></td><td><code>Object.getPrototypeOf()</code></td><td><code>Reflect.getPrototypeOf()</code></td></tr>
<tr><td><code>setPrototypeOf</code></td><td><code>Object.setPrototypeOf()</code></td><td><code>Reflect.setPrototypeOf()</code></td></tr>
<tr><td><code>isExtensible</code></td><td><code>Object.isExtensible()</code></td><td><code>Reflect.isExtensible()</code></td></tr>
<tr><td><code>preventExtensions</code></td><td><code>Object.preventExtensions()</code></td><td><code>Reflect.preventExtensions()</code></td></tr>
<tr><td><code>getOwnPropertyDescriptor</code></td><td><code>Object.getOwnPropertyDescriptor()</code></td><td><code>Reflect.getOwnPropertyDescriptor()</code></td></tr>
<tr><td><code>defineProperty</code></td><td><code>Object.defineProperty()</code></td><td><code>Reflect.defineProperty</code></td></tr>
<tr><td><code>ownKeys</code></td><td><code>Object.keys</code>, <code>Object.getOwnPropertyNames()</code>, <code>Object.getOwnPropertySymbols()</code></td>
<td><code>Reflect.ownKeys()</code></td></tr>
<tr><td><code>apply</code></td><td>Calling a function</td><td><code>Reflect.apply()</code></td></tr>
<tr><td><code>construct</code></td><td>Calling a function with <code>new</code></td><td><code>Reflect.construct()</code></td></tr>
</table>

```js
const handler = {
  getPrototypeOf()    { /* A trap for Object.getPrototypeOf */ },
  setPrototypeOf()    { /* A trap for Object.setPrototypeOf */ },
  isExtensible()      {   /* A trap for Object.isExtensible */ },
  preventExtensions() { /* A trap for Object.preventExtensions */ },
  getOwnPropertyDescriptor() { /* A trap for Object.getOwnPropertyDescriptor */ },
  defineProperty()    { /* A trap for Object.defineProperty */ },
  has()               { /* A trap for the in operator */ },
  get()               { /* A trap for getting property values */ },
  set()               { /* A trap for setting property values */ },
  deleteProperty()    { /* A trap for the delete operator */ },
  ownKeys()           { /* A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols */ },
  apply()             { /* A trap for a function call */ },
  construct()         { /* A trap for the new operator */ }
}
```

<div class="dl">
  <h5>Reflect.get(target, propertyKey, receiver?) <span>-- 可选的 receiver 参数可指定 getter 里的 this 的值</span></h5>
  <h5>Reflect.get(target, propertyKey, value, receiver?) <span>-- 可选的 receiver 参数可指定 getter 里的 this 的值</span></h5>
  <h5>Reflect.ownKeys(target) <span>-- <small>Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))</small></span></h5>
  <h5>Reflect.has(target, propertyKey) <span>-- works like <code>in</code> operator</span></h5>
  <h5>Reflect.apply(target, thisArgument, argumentsList) <span>-- </span></h5>
  <h5>Reflect.construct(target, argumentsList[, newTarget]) <span>-- <small>new target(...args)</small></span></h5>
  <h5>Reflect.defineProperty(target, propertyKey, attributes) <span>-- </span></h5>
  <h5>Reflect.deleteProperty(target, propertyKey) <span>-- </span></h5>
  <h5>Reflect.getOwnPropertyDescriptor(target, propertyKey) <span>-- </span></h5>
  <h5>Reflect.getPrototypeOf(target) <span>-- </span></h5>
  <h5>Reflect.setPrototypeOf(target, prototype) <span>-- </span></h5>
  <h5>Reflect.preventExtensions(target) <span>-- </span></h5>
  <h5>Reflect.isExtensible(target) <span>-- </span></h5>
</div>


## Globals

在模块化趋势下，全局属性和方法都将逐步移入各模块（全局对象），当然为了后向兼容，这些属性和方法还会保留。

<div class="dl">
  <h5 class="es3">Infinity NaN undefined null(literal)</h5>
</div>
<div class="dl">
  <h5 class="es3">isNaN() <span>-- 检查某个值是否是数字</span></h5>
  <h5 class="es3">isFinite() <span>-- 检查某个值是否为有穷大的数</span></h5>
  <h5 class="es3">parseInt() <span>-- 解析一个字符串并返回一个整数</span></h5>
  <h5 class="es3">parseFloat() <span>-- 解析一个字符串并返回一个浮点数</span></h5>
  <h5 class="es3">encodeURI() <span>-- 把字符串编码为 URI，针对整个 URI 设计的，故不会处理 `;` `,` `/` `?` `:` `@` `&` `=` `+` `$` 这些字符</span></h5>
  <h5 class="es3">encodeURIComponent() <span>-- 把字符串编码为 URI 组件，会处理 `?` `=` 等 encodeURI 不处理的特殊字符</span></h5>
  <h5 class="es3">decodeURI() <span>-- 解码某个编码的 URI</span></h5>
  <h5 class="es3">decodeURIComponent() <span>-- 解码一个编码的 URI 组件</span></h5>
  <h5 class="es3">eval() <span>-- 解析执行传入的字符串</span></h5>
</div>
<div class="dl">
  <h5 class="es3">Object</h5>
  <h5 class="es3">Function</h5>
  <h5 class="es3">Boolean</h5>
  <h5 class="es6">Symbol</h5>
  <h5 class="es3">Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError</h5>
</div>
<div class="dl">
  <h5 class="es3">Array</h5>
</div>
<div class="dl">
  <h5 class="es3">String</h5>
  <h5 class="es3">RegExp</h5>
</div>
<div class="dl">
  <h5 class="es3">Number</h5>
  <h5 class="es3">Math</h5>
  <h5 class="es3">Date</h5>
</div>


## <span class="es es17">Atomics</span>

The `Atomics` object provides atomic operations as static methods. They are used with `SharedArrayBuffer` objects.

<div class="dl">
  <h5>Atomics.add() <span>-- </span></h5>
  <h5>Atomics.and() <span>-- </span></h5>
  <h5>Atomics.compareExchange() <span>-- </span></h5>
  <h5>Atomics.exchange() <span>-- </span></h5>
  <h5>Atomics.load() <span>-- </span></h5>
  <h5>Atomics.or() <span>-- </span></h5>
  <h5>Atomics.store() <span>-- </span></h5>
  <h5>Atomics.sub() <span>-- </span></h5>
  <h5>Atomics.xor() <span>-- </span></h5>
</div>
<div class="dl">
  <h5>Atomics.wait() <span>-- </span></h5>
  <h5>Atomics.notify() <span>-- </span></h5>
  <h5>Atomics.isLockFree(size) <span>-- </span></h5>
</div>

<script>
// 定义目录生成级别
ooboqoo.contentsRegExp = /H[12]/;

//设置到 developer.mozilla.org 的查询链接
(function(){
  var list = document.querySelectorAll(".dl > h5"),
      reg=/^[a-zA-Z0-9._]+\(?/g,
      html, text, link,
      prefix = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/';
  for (var i = 0, length = list.length; i < length; i++){
    reg.lastIndex = 0;
    html = list[i].innerHTML;
    text = reg.exec(html);
    if (text === null) { continue; }
    text = text[0];
    link = text.replace('.prototype', '').replace('.', '/').replace('(', '');
    list[i].innerHTML = '<a href="' + prefix + link + '">' + text + '</a>' +
      html.substr(reg.lastIndex).replace(/\) *\<span/, '<span style="color: red;">)</span> <span');
  }
})();
</script>
