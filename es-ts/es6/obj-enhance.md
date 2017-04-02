# ES6 对象增强

## 对象 Object

### 属性简写

ES6 允许直接写入 **变量和函数**，作为对象的属性和方法。

```js
let name = 'gavin', obj;
obj = {
  name,                             // 只写变量名，值会自动抓取
  age: 32,                          // 常规属性定义写法
  getName() { return this.name; }   // 方法不需要搞成 getName: () => { } 这种形式
}

// 这种写法用于函数的返回值，将会非常方便。
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

// CommonJS 模块输出变量，就非常合适使用简洁写法。
var ms = Object.create(null);
function getItem(key) { return key in ms ? ms[key] : null; }
function setItem(key, value) { ms[key] = value; }
module.exports = { getItem, setItem };

// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
var cart = {
  _wheels: 4,
  get wheels() { return this._wheels; },
  set wheels(value) { this._wheels = value; }
}

// 简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。
var obj = {
  class() { }  // class 是关键字，但这里不会报错，因为简写的属性名总是以字符串形式处理
};
```

### 属性名表达式

使用字面量方式定义对象，ES5 中只能使用 "标识符" 定义属性，而 ES6 则增加了用 "表达式" 作为对象的属性名的方式。

```js
obj.foo = true;         // 表示符
obj['a' + 'bc'] = 123;  // 表达式

// 以下使用的 属性名表达式 是 ES6 新增的，ES5 不支持
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
  ['h'+'ello']() { return 'hi'; }
};

// 注意，属性名表达式与简洁表示法，不能同时使用，会报错
let foo = 'bar', bar = 'abc', baz = { [foo] }; // 报错，{[foo]} -> {'bar'}，简写只支持变量，不支持字符串
let foo = 'bar', baz = { [foo]: 'abc'};        // 正确
```

### 新增属性和方法

<div class="dl">
<h5 class="es6">Object.is(value1, value2) <span>-- 同值相等，与 `===` 全等基本相同，区别是 `+0` `-0` 不等，`NaN` 自等</span></h5>
<h5 class="es6">Object.assign(target, src1, ...) <span>-- 对象合并，将一个或多个对象的自有可遍历属性复制到 target</span></h5>
<h5 class="es6">Object.setPrototypeOf(obj) <span>-- 设置对象的原型，即 `[[Prototype]]` 属性，此操作执行性能底下，尽量通过新建对象解决</span></h5>
<h5 class="es6">object.\_\_proto\_\_ <span>-- 对象实例属性，指向对象的原型对象，本质上属于内部属性，应避免使用</span></h5>
<h5 class="es6">Object.getOwnPropertySymbols(obj) <span>-- 返回一个数组，包含对象的所有自有以 Symbol 类型为键名的属性</span></h5>
</div>


## 函数 Function

### 方法的 `name` 属性

方法的 name 属性返回函数名。取值函数会在方法名前加 "get"，存值函数会在方法名的前加 "set"。

还有两种特殊情况：bind 方法创建的函数，会在函数名前加 "bound"，Function 构造函数创建的函数，返回 "anonymous"。

如果对象的方法是一个 Symbol 值，那么 name 属性返回的是这个 Symbol 值的描述。

```js
var person = {
  sayName() { console.log(this.name); },
  get firstName() { return "Nicholas"; }
};
person.sayName.name   // "sayName"
Object.getOwnPropertyDescriptor(person, 'firstName').get.name  // "get firstName"

(new Function()).name // "anonymous"
(function doSomething() { }).bind().name // "bound doSomething"

const key1 = Symbol('description'), key2 = Symbol();
let obj = {
  [key1]() { },
  [key2]() { },
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

