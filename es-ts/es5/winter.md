# 重学前端


## 类型

**运行时类型** 是代码实际执行过程中我们用到的类型。所有的类型数据都会属于 7 个类型之一：Undefined Null Boolean String Number Symbol Object。

```js
undefined = true
console.log(undefined)  // undefined
null = true  // Error
```

```js
1 / +0 === Infinity
1 / -0 === -Infinity
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
```

```js
function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
  const bufView = new Uint16Array(buf)
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}
```

```js
const obj = {
  value: [1, 2, 3, 4],
  [Symbol.iterator] () {
    let index = 0
    let self = this
    return {
      next () {
        return {
          value: self.value[index++],
          done: index > self.value.length
        }
      }
    }
  }
}
for (let v of obj) console.log(v)
```

Symbol 函数比较特殊，直接用 new 调用它会抛出错误，但它仍然是 Symbol 对象的构造器。

`.` 运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。

`parseInt` 还支持 0 开头的数字作为 8 进制前缀，这是很多错误的来源。所以在任何环境下，都建议传入 parseInt 的第二个参数。

对象到 String 和 Number 的转换都遵循 *先拆箱再转换* 的规则。拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型。如果 valueOf 和 toString 都不存在，或者没有返回基本类型，则会产生类型错误 TypeError。

有一个说法是：程序 = 算法 + 数据结构，运行时类型包含了所有 JavaScript 执行时所需要的数据结构的定义，所以我们要对它格外重视。


## 对象

### 基于原型的面向对象

对象这一概念在人类的幼儿期形成，这远远早于我们编程逻辑中常用的值、过程等概念。在幼年期，我们总是先认识到某一个苹果能吃（这里的某一个苹果就是一个对象），继而认识到所有的苹果都可以吃（这里的所有苹果，就是一个类），再到后来我们才能意识到三个苹果和三个梨之间的联系，进而产生数字“3”（值）的概念。

面向对象分
* 基于类
* 基于原型

在实现了对象基本特征的基础上, 我认为，JavaScript 中对象独有的特色是：对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。比如，JavaScript 允许运行时向对象添加属性，这就跟绝大多数基于类的、静态的对象设计完全不同。

JavaScript 对象的两类属性对 JavaScript 来说，属性并非只是简单的名称和值，JavaScript 用一组特征（attribute）来描述属性（property）。先来说第一类属性，数据属性。第二类属性是访问器（getter/setter）属性。

### 模拟基于类的面向对象

因为一些公司的政治原因，JavaScript 推出之时，管理层就要求它去模仿 Java。所以，JavaScript 创始人 Brendan Eich 在“原型运行时”的基础上引入了 new、this 等语言特性，使之“看起来语法更像 Java”，而 Java 正是基于类的面向对象的代表语言之一。

从 ES6 开始，JavaScript 提供了 class 关键字来定义类，尽管，这样的方案仍然是基于原型运行时系统的模拟，但是它修正了之前的一些常见的“坑”，统一了社区的方案，这对语言的发展有着非常大的好处。

Brendan 更是曾透露过，他最初的构想是一个拥有基于原型的面向对象能力的 scheme 语言（但是函数式的部分是另外的故事）。

在 JavaScript 之前，原型系统就更多与高动态性语言配合，并且多数基于原型的语言提倡运行时的原型修改，我想，这应该是 Brendan 选择原型系统很重要的理由。

原型系统的“复制操作”有两种实现思路：一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；另一个是切实地复制对象，从此两个对象再无关联。

原型系统可以说相当简单，我可以用两条概括：如果所有对象都有私有字段 `[[prototype]]`，就是对象的原型；读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

#### ES6 中的类

基于类的编程方式成为了 JavaScript 的官方编程范式。类的写法实际上也是由原型运行时来承载的，逻辑上 JavaScript 认为每个类是有共同原型的一组对象，类中定义的方法和属性则会被写在原型对象之上。

### 宿主对象与内置对象


我们日常工作中，接触到的主要 API，几乎都是由今天所讲解的这些对象提供的。理解这些对象的性质，我们才能真正理解我们使用的 API 的一些特性。

JavaScript 中的对象分类

我们可以把对象分成几类。

宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。

原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

#### 宿主对象

JavaScript 宿主对象千奇百怪，但是前端最熟悉的无疑是浏览器环境中的宿主了。在浏览器环境中，我们都知道全局对象是 window，window 上又有很多属性，如 document。实际上，这个全局对象 window 上的属性，一部分来自 JavaScript 语言，一部分来自浏览器环境。


#### 内置对象

基本类型 Boolean String Number Symbol Object
基础功能和数据结构 Array Date RegExp Promise Proxy Map WeakMap Set WeakSet Function
错误类型 Error EvalError RangeError ReferenceError SyntaxError TypeError URIError
二进制操作 ArrayBuffer SharedArrayBuffer DataView
带类型的数组 Float32Array Float64Array Int8Array Int16Array Int32Array UInt32Array UInt16Array UInt32Array UInt8ClampedArray

四个用于当作命名空间的对象：Atomics JSON Math Reflect


## 执行

### 宏观任务和微观任务

我们首先应该形成一个感性的认知：一个 JavaScript 引擎会常驻于内存中，它等待着我们（宿主）把 JavaScript 代码或者函数传递给它执行。

在 ES3 和更早的版本中，JavaScript 本身还没有异步执行代码的能力，这也就意味着，宿主环境传递给 JavaScript 引擎一段代码，引擎就把代码直接顺次执行了，这个任务也就是宿主发起的任务。但是，在 ES5 之后，JavaScript 引入了 Promise，这样，不需要浏览器的安排，JavaScript 引擎本身也可以发起任务了。由于我们这里主要讲 JavaScript 语言，那么采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。

有了宏观任务和微观任务机制，我们就可以实现 JavaScript 引擎级和宿主级的任务了，例如：Promise 永远在队列尾部添加微观任务。setTimeout 等宿主 API，则会添加宏观任务。

```js
var r = new Promise(function(resolve, reject){
    console.log("a");
    resolve()
});
setTimeout(()=>console.log("d"), 0)
r.then(() => console.log("c"))
console.log("b")
```

### 闭包和执行上下文

因为这部分术语经历了比较多的版本和社区的演绎，所以定义比较混乱，这里我们先来理一下 JavaScript 中的概念。

执行上下文在 ES3 中，包含三个部分。scope：作用域，也常常被叫做作用域链。variable object：变量对象，用于存储变量的对象。this value：this 值。

在 ES5 中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子。lexical environment：词法环境，当获取变量时使用。variable environment：变量环境，当声明变量时使用。this value：this 值。

在 ES2018 中，执行上下文又变成了这个样子，this 值被归入 lexical environment，但是增加了不少内容。lexical environment：词法环境，当获取变量或者 this 值时使用。variable environment：变量环境，当声明变量时使用。code evaluation state：用于恢复代码执行位置。Function：执行的任务是函数时使用，表示正在被执行的函数。ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。Realm：使用的基础库和内置对象实例。Generator：仅生成器上下文有这个属性，表示当前生成器。


```js
void function() {
  var a;
  // code...
}(); 
```

### this 与执行上下文

实际上从运行时的角度来看，this 跟面向对象毫无关联，它是与函数调用时使用的表达式相关。

这个设计来自 JavaScript 早年，通过这样的方式，巧妙地模仿了 Java 的语法，但是仍然保持了纯粹的“无类”运行时设施。

在 JavaScript 标准中，为函数规定了用来保存定义时上下文的私有属性 `[[Environment]]`。当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的 `[[Environment]]`。

JavaScript 用一个栈来管理执行上下文，这个栈中的每一项又包含一个 Lexical Enviornment 链表。当函数调用时，会入栈一个新的执行上下文，函数调用结束时，执行上下文被出栈。

而 this 则是一个更为复杂的机制，JavaScript 标准定义了 `[[thisMode]]` 私有属性，有三个取值。
* lexical：表示从上下文中找 this，这对应了箭头函数。
* global：表示当 this 为 undefined 时，取全局对象，对应了普通函数。
* strict：当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined。

### Completion Record

语句是任何编程语言的基础结构，与 JavaScript 对象一样，JavaScript 语句同样具有“看起来很像其它语言，但是其实一点都不一样”的特点。

```js
function foo () {
  try {
    console.log('a')
    return 1
  } finally {
    console.log('b')
    // return 2
  }
}
```

JavaScript 正是依靠语句的 Completion Record 类型，方才可以在语句的复杂嵌套结构中，实现各种控制。

语句块本身并不复杂，我们需要注意的是语句块内部的语句的 Completion Record 的 `[[type]]` 如果不为 normal，会打断语句块后续的语句执行。


## 文法

文法是编译原理中对语言的写法的一种规定，一般来说，文法分成词法和语法两种。

我们先来看一看 JavaScript 的词法定义。JavaScript 源代码中的输入可以这样分类：
* WhiteSpace 空白字符
* LineTerminator 换行符
* Comment 注释
* Token 词
  * IdentifierName 标识符名称，典型案例是我们使用的变量名，注意这里关键字也包含在内了。
  * Punctuator 符号，我们使用的运算符和大括号等符号。
  * NumericLiteral 数字直接量，就是我们写的数字。
  * StringLiteral 字符串直接量，就是我们用单引号或者双引号引起来的直接量。
  * Template 字符串模板，用反引号` 括起来的直接量。



















