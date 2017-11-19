# Deferred &amp; Promise &amp; Callbacks &amp; queue

## Deferred

http://api.jquery.com/category/deferred-object/

deferred 对象 和 promise 对象的关系：

```js
deferred = { notify(), notifyWith(), resolve(), resolveWith(), reject(), rejectWith() };
promise = { state(), always(), catch(), then(), promise(), progress(), done(), fail() }；
deferred = jQuery.extend(deferred, promise);
```

deferred 对象的状态应该由其创建者控制，而应该避免使用者改变 deferred 对象的状态，因此仅提供给用户 promise 对象是推荐的做法。

### API

|||
|------------------------------|----------------------
| `$e.promise([type] [,target])` | 
| `$.Deferred()` | 
| `$.when()`     | 
|||
| `deferred.state()`    | 返回 deferred 对象的当前状态 `"pending"` `"resolved"` `"rejected"`
| `deferred.then()`     | 会返回一个新的 promise 对象
| `deferred.catch()`    | `deferred.then(null, fn)` 的别名
| `deferred.progress()` | `notify` 或 `notifyWith` 触发，resolved 或 rejected 之后就不会再触发
| `deferred.done()`     | `deferred.done(doneCallbacks [, doneCallbacks ])` 参数可以是函数或函数组成的数组
| `deferred.fail()`     | `deferred.fail(failCallbacks [, failCallbacks ])` 执行时以添加顺序执行
| `deferred.always()`   | 相当于执行 `deferred.done(fn); deferred.fail(fn);`
| `deferred.promise()`  | 返回 deferred 对象对应的 promise 对象
|||
| `deferred.notify()` | 
| `deferred.notifyWith()` | 
| `deferred.resolve()` | 
| `deferred.resolveWith()` | 
| `deferred.reject()` | 
| `deferred.rejectWith()` | 

```js
// $e.promise() 用法示例
$("<div>").promise().done(function(arg1) {
  alert( this === div && arg1 === div );  // true
});
```

#### `p.then()` 详解

V1.7 的使用格式 `deferred.then(doneCallbacks, failCallbacks [, progressCallbacks ])`  
v1.8 的使用格式 `deferred.then(doneFilter [, failFilter ] [, progressFilter ])`

v1.8 开始，`.pipe()` 方法被废弃，由 `.then()` 取代，而原 `.then()` 功能由 `.done()` `.fail()` `.progress()` 分担。

```js
var defer = $.Deferred(),
  filtered = defer.then(null, function(value) { return value * 3; });
defer.reject(6);
filtered.fail(function(value) { alert( "Value is ( 3*6 = ) 18: " + value ); });
```


### 源码解读

```js
jQuery.extend(
  Deferred: function(func) { /* 见后 */ },   // function func(deferred) { } 参数是一个 deferred 对象
  when: function (singleValue) { }
);

function Deferred(func) {
  var tuples = [
    // action,  add listener, callbacks,               .then handlers, argument index, [final state]
    ["notify",  "progress", $.Callbacks("memory"),      $.Callbacks("memory"),      2],
    ["resolve", "done",     $.Callbacks("once memory"), $.Callbacks("once memory"), 0, "resolved"],
    ["reject",  "fail",     $.Callbacks("once memory"), $.Callbacks("once memory"), 1, "rejected"]
  ],
  state = "pending",
  promise = {  // 注意各方法体内 deferred promise this 三者之间的区别和联系
    state: function () { return state; },
    always: function () { deferred.done(arguments).fail(arguments); return this; },
    "catch": function (fn) { return promise.then(null, fn); },
    then: function (onFulfilled, onRejected, onProgress) { /* 见后 */ },
    promise: function (obj) { return obj ? jQuery.extend(obj, promise) : promise; }
  },
  deferred = {};
  jQuery.each(tuples, function(i, tuple) {
    var list = tuple[2],
      stateString = tuple[5];
    promise[tuple[1]] = list.add;  // 此时 add 函数体内的 self != this
    if (stateString) {
      list.add(
        function() { state = stateString; },
        tuples[0][2].lock,      tuples[0][3].lock
        tuples[3-i][2].disable, tuples[3-i][3].disable,
      );
    }
    list.add(tuple[3].fire);

    deferred[tuple[0]] = function() {
      deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
      return this;
    };
    deferred[tuple[0] + "With"] = list.fireWith;
  });

  promise.promise(deferred);  // Make the deferred a promise
  if (func) { func.call(deferred, deferred); }  // Call given func if any
  return deferred;
}
```

```js
function then(onFulfilled, onRejected, onProgress) {

}
```


## Callback

http://api.jquery.com/jQuery.Callbacks/

库内部用的模块，主要用于支持 `$.ajax()` 和 `$.Deferred()`

* memory 模式用于支持 promise，fire 之后进入 locked 状态，还可以继续 add
* once 模式 fire 过一次就进入 disabled 状态，add 不会有任何实际动作

### 源码解读

```js
/** @params {string} options 是以空格分隔的配置项：once memory unique stopOnFalse */
jQuery.Callbacks = function (options) {
  options = createOptions(options);  // 将 'once memory' 转换成 {once:true, memory:true}
  var
    firing, // 是否正在执行回调函数
    memory, // .fire(args) 或 .fireWith(context, args) 中的执行信息会赋值给此 memory 变量，用于支持 promise
    fired,  // 是否已经执行过。deferred 对象一旦 resolve 或 reject 这项就一直为 true
    locked, // once 和 memory 模式下，只能有一次 fire
    list = [],  // 存储回调函数，一次 fire 会有 list.lenght * queue.length 次函数执行
    queue = [], // memory 选项开启时，用于存放执行数据 [context, args]
    firingIndex = -1, // 执行中的回调函数在 list 中的指针 (modified by add/remove as needed)
    fire = function () { /* 见后 */ },
    self = {
      add: function () { /* 见后 */ },
      remove: function () { /* 见后 */ },
      empty: function () { if (list) { list = []; } return this; },
      disable: function () { // 禁 .fire() 和 .add()
        locked = queue = [];
        list = memory = "";
        return this; },
      lock: function () {    // 禁 .fire(), 但 deferred 的 .add() 依然有效
        locked = queue = [];
        if ( !memory && !firing ) { list = memory = ""; }
        return this;
      },
      fireWith: function (context, args) {
        if (!locked) { queue.push([context, args]); if (!firing) { fire(); } }
        return this;
      },
      fire: function () { self.fireWith(this, arguments); return this; },  // self == this true

      has: function (fn) { return fn ? jQuery.inArray( fn, list ) > -1 : list.length > 0; },
      disabled: function () { return !list; },
      locked: function () { return !!locked; },
      fired: function () { return !!fired; }
    };
    return self;
}
```

```js
function fire() {
  locked = locked || options.once;
  fired = firing = true;
  for ( ; queue.length; firingIndex = -1) {
    memory = queue.shift();
    while (++firingIndex < list.length) {
      if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse ) {
        firingIndex = list.length;
        memory = false;  // forget the data so .add doesn't re-fire
      }
    }
  }
  if (!options.memory) { memory = false; }  // Forget the data if we're done with it
  firing = false;
  if (locked) {
    if (memory) { list = []; } else { list = ""; }
  }
}

function add() {
  if (list) {
    if (memory && !firing) { firingIndex = list.length - 1; queue.push(memory); }

    (function add(args) {
      jQuery.each(args, function(_, arg) {
        if (jQuery.isFunction(arg)) {
          if (!options.unique || !self.has(arg)) { list.push(arg); }
        } else if (arg && arg.length && jQuery.type(arg) !== "string") {
          add(arg);  // Inspect recursively
        }
      });
    })(arguments);

    if (memory && !firing) { fire(); }
  }
  return this;
}

function remove() {
  jQuery.each(arguments, function(_, arg) {
    var index;
    while ((index = jQuery.inArray(arg, list, index)) > -1) {
      list.splice(index, 1);
      if (index <= firingIndex) { firingIndex--; }  // 这种情况会出现么？
    }
  });
  return this;
}
```



## queue

