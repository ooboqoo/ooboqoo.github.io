# ECMAScript 语法

https://developer.mozilla.org/en-US/docs/Web/JavaScript  
https://www.amazon.cn/JavaScript高级程序设计-泽卡斯/dp/B007OQQVMY  
http://www.ecma-international.org/ecma-262/5.1/

## 语句 Statements

### 变量和函数声明 Declarations and Functions

|||
--------|------------------------------------------------------------------------------------
`var`   | 声明一个(函数级作用域)变量，声明变量时可同时对变量进行赋值，ES6 下应使用 let 替代
`const` | 声明一个常量，声明时需立即赋值，后续无法修改，ES6新增
`let`   | 声明一个块级作用域的变量，声明变量时可同时赋值，ES6新增
|
`function`       | 声明一个函数
`function*`      | 声明一个 Generators 函数，ES6新增
`async function` | 声明一个 async 函数，ES2017新增
`class`          | 声明一个类，ES6新增
|
`return`         | 指定函数返回值

### 流程控制及其他 Control flow, Iterations and Others

|||
--------------------|---------------------------------------------------------------------------------------------
`[label:] { }`      | 程序块由一对大括号分隔，程序块内可包含多条语句，程序块前可以添加 "标签"，供程序控制确定位置
`break [label];`    | 终止并跳出当前程序块，如指定 "标签"，可指定调出的程序块级别
`continue [label];` | 终止本次迭代，继续执行下次迭代，通过 "标签" 可指定操作的迭代层级
`;`                 | 空语句，当没有语句时，需要使用 `;` 注明结尾
`if...else`         | if 语句，详见示例
`switch`            | switch 语句，详见示例
`throw`             | 抛出一个用户自定义异常，会被调用栈中最近的一层 catch 捕获，如果没有进行捕获处理，程序就会终止
`try...catch`       | try...catch...finally 语句用于捕获内部代码异常，下方有简单示例，详细使用请查文档
|
`for`        | `for ([initialization]; [condition]; [final-expression]) statement`
`for...in`   | `for (key in object) { ... }` 不保证迭代顺序，用于遍历**对象的可遍历属性** enumerable properties
`for...of`   | `for (value of iterable) { ... }` 迭代按顺序执行，只遍历 iterable object 无法用于普通对象
`while`      | `while (condition) statement` 先判断再执行
`do...while` | `do statement while (condition);` 先执行再判断
|
`debugger` | 用于在代码中开启调试，调试开启时会自动中断，调试未开启则沉默
`export`   | ES6新增，用于设定模块导出内容
`import`   | ES6新增，用于导入外部模块内容


```js
if (condition1)
  statement1  // 只有一个语句时，是不需要花括号包裹的，但最佳实践要求统一加花括号
else if (condition2) {  // 此处加了大括号，可不加
  statement2
} else statementN       // 语句跟 else 是否同行都无所谓，但这样不是规范的用法

for (; ;) { }  // 这是个死循环，当不提供判断语句时会一直执行下去

switch (expression) {
  case value1:
    //Statements executed when the result of expression matches value1
    [break;]            // 不加 break; 就会继续往下执行，如不加，要添加注释，告诉别人是故意不加的
  case value2:
    //Statements executed when the result of expression matches value2
    [break;]
  ...
  default:
    //Statements executed when none of the values match the value of the expression
}

try {
   throw 'myException'; // generates an exception
} catch (e) {
   console.error(e);    // 输出 myException
} finally {
   console.log('end')   // 不管 try 块内代码是否成功，都会执行此代码
}
```

```js
// for...in  &  for...of
Object.prototype.objCustom = function () { }
Array.prototype.arrCustom = function () { }
let iterable = [3, 5, 7]
iterable.foo = 'hello'
for (let i in iterable) { console.log(i) }            // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) { console.log(i) }  // logs 0, 1, 2, "foo"
}
for (let i of iterable) { console.log(i) }            // logs 3, 5, 7
```


## 表达式和操作符 Expressions and Operators

### 基本表达式 Primary expressions

|||
------------|-------------------------------------------------------------------
`this`      | 指向函数执行环境 execution context，具体确定很复杂，需根据环境判断
`function`  | 声明一个函数表达式
`class`     | 声明一个类表达式，ES6新增
`function*` | 声明一个 Generator 函数表达式，ES6新增
`yield`     | The yield keyword is used to pause and resume a generator function ES6新增
`yield*`    | The yield* expression is used to delegate to another generator or iterable object. ES6新增
`async function` | 声明一个 async 函数，ES2017新增
`await`          | 用于 async 函数内部，表示一个异步等待，ES2017新增
`[]`             | 数组字面量
`{}`             | 对象字面量
`/ab+c/i`        | 正则字面量
`()`             | 分组操作符，用于修改运算符优先级

### 左结合表达式 Left-hand-side expressions

|||
--------------|--------------------------------------------
`obj.prop`    | 属性操作符
`obj['prop']` | 属性操作符
`new`         | 新建一个构造函数的实例
`new.target`  | 用于构造函数内部，指向构造函数自身，ES6新增
`super`       | 在子类中调用父类构造函数，ES6新增
`...obj`      | 扩展符，仅适用于 iterable objects，ES6新增

### 一元操作符 Unary operators

只能操作一个值的操作符叫做 "一元操作符"。一元运算符只有一个参数。

|||
---------|--------------------------------------------
`delete` | 删除开发者自定义的对象属性或方法
`void`   | 对任何值都返回 undefined，常见用法 `<a href="javascript:void();">click me</a>`
`typeof` | 确定目标所属的原始值类型，引用类型和 null 都返回 "object"
|
`+` | 一元加，对数值没影响，非数值调用 Number() 进行数值转换
`-` | 一元减，对数值取负，非数值先转换为数值后再取负值
`~` | 位操作取反
`!` | 逻辑操作取反
|
`A++` | 后递增，先计算表达式再增，4个递增/减操作符都会对非数值先进行数值转换
`A--` | 后递减，先计算表达式再减
`++A` | 前递增，先增再计算表达式
`--A` | 前递减，先减再计算表达式

`void` 运算符通常用于避免输出不应该输出的值，`<a href="javascript:void(window.open('about:blank'))">click me</a>`

```js
void 5  // undefined
void(5) // undefined
```

```js
// 递增/减运算符类型转换试验：
let i = '5', j = '5';
'5' === i--;  // false, i: 4，数值转换永远是个坑，尽量要避免  // 原因分析，实际效果 '5' === 5
```

### 位运算符

按位取反 <code>~</code>  按位左移`<<`  按位右移 `>>`  无符号右移 `>>>`  按位与 `&`  按位或 `|`  按位异或 `^`

```js
// 取反：先改符号，值加1
~"15.12"   // -16

// 取整
15.6 | 0  // 15
-15.6 | 0 // -15

// 乘除 2
-8 << 1  // -16
-8 >>> 1 // 2147483644
-8 >> 1  // -4
```

### 算术运算符 Arithmetic operators

|||
-----|--------------------------------------------
`+`  | 加
`-`  | 减
`/`  | 除
`*`  | 乘
`%`  | 求余
`**` | 乘方，求幂，ES2016新增

### 关系操作符 Relational operators

|||
-------------|--------------------------------------------
`in`         | 确定一个属性是否存在与对象中 `'toString' in {}; // returns true`
`instanceof` | 确定一个对象的原型链上是否存在某构造函数的原型 `object instanceof constructor`
`<`          | 小于
`>`          | 大于
`<=`         | 小于等于
`>=`         | 大于等于

* 两个数的比较运算，比较方式与算术比较运算相同
* 字符串与字符串比较，逐个取出字符按字符代码比较
* 字符串与数值比较，字符串会转换成数值再进行比较，如果字符串无法转换成数值，就统一返回 false

```js
'25' > '3' // true
'a' < 3;   // false
'a' >= 3;  // false
```

### 等号操作符 Equality operators

|||
------|--------------------------------------------
`==`  | 相等，，判断前会进行类型转换，糟粕慎用
`!=`  | 不相等，判断前会进行类型转换，糟粕慎用
`===` | 全等，，判断不进行类型转换
`!==` | 不全等，判断不进行类型转换

#### 类型转换规则

http://es5.github.io/#x11.9.3

`==` 和 `!=` 两个操作符会先将被操作对象转换成同一类型后再进行全等比较。  
`<` `<=` `>` `>=` 这四个操作符则会先将被操作对象转换成原始值类型，然后再转换成相同类型进行比较。

类型转换遵循以下规则：
  * 转布尔值 `false` 的几种情况 `0`, `-0`, `NaN`, `undefined`, `null`, `""`, `document.all`
  * boolean 转成 number，`false` 为 `0`，`true` 为 `1`
  * string 跟 number 比，string 转 number
  * Object 跟原始值类型比，会调用对象 `valueOf()` 或 `toString()` 方法(先 `valueOf` 后 `toString`; 先自身方法后原型链)

在比较时，`==` `!=` 两个运算符还遵守下列规则：
  * 值 `null` 和 `undefined` 相等
  * 不会对 `null` 和 `undefined` 进行类型转换
  * `NaN` 跟任何值都不相等，甚至 `NaN` 都不等于 `NaN`
  * 对象跟对象比，不会进行类型转换，如果指向的不是同一个对象，就返回 false

表达式       | 值    | 表达式              | 值    | 表达式                    | 值
-------------|-------|---------------------|-------| --------------------------|----------
`false == 0` | true  | `null == undefined` | true  | `({1: 1}) == {1: 1}`      | false
`true == 1`  | true  | `NaN == NaN`        | false | `[1] == 1` / `['1'] == 1` | true
`true == 2`  | false | `undefined == 0`    | false | `({1: 1}) == 1`           | false
`"5" == 5`   | true  | `null == 0`         | false | `({1: 1}) == "[object Object]"` | true

注：`true == 2` 类型转换后成 `1 == 2` 所以结果是 `false`

### 操作符优先级与结合性

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

P  | Operator type                | Associativity | Individual operators
---|------------------------------|---------------|---------------------
21 | Grouping                     | n/a           | `(exp)`
20 | Member Access                | left-to-right | `obj.prop`
20 | Computed Member Access       | left-to-right | `obj['prop']`
20 | new (with argument list)     | n/a           | `new Class(arg)`
19 | Function Call                | left-to-right | `foo()`
19 | new (without argument list)  | right-to-left | `new constructor`
18 | Postfix Increment            | n/a           | `i++`
18 | Postfix Decrement            | n/a           | `i--`
17 | Logical NOT                  | right-to-left | `!exp`
17 | Bitwise NOT                  | right-to-left | `~ …`
17 | Unary Plus                   | right-to-left | `+ …`
17 | Unary Negation               | right-to-left | `- …`
17 | Prefix Increment             | right-to-left | `++ …`
17 | Prefix Decrement             | right-to-left | `-- …`
17 | typeof                       | right-to-left | `typeof …`
17 | void                         | right-to-left | `void …`
17 | delete                       | right-to-left | `delete …`
17 | await                        | right-to-left | `await …`
16 | Exponentiation               | right-to-left | `… ** …`
15 | Multiplication               | left-to-right | `… * …`
15 | Division                     | left-to-right | `… / …`
15 | Remainder                    | left-to-right | `… % …`
14 | Addition                     | left-to-right | `… + …`
14 | Subtraction                  | left-to-right | `… - …`
13 | Bitwise Left Shift           | left-to-right | `… << …`
13 | Bitwise Right Shift          | left-to-right | `… >> …`
13 | Bitwise Unsigned Right Shift | left-to-right | `… >>> …`
12 | Less Than                    | left-to-right | `… < …`
12 | Less Than Or Equal           | left-to-right | `… <= …`
12 | Greater Than                 | left-to-right | `… > …`
12 | Greater Than Or Equal        | left-to-right | `… >= …`
12 |in                            | left-to-right | `… in …`
12 | instanceof                   | left-to-right | `… instanceof …`
11 | Equality                     | left-to-right | `… == …`
11 | Inequality                   | left-to-right | `… != …`
11 | Strict Equality              | left-to-right | `… === …`
11 | Strict Inequality            | left-to-right | `… !== …`
10 | Bitwise AND                  | left-to-right | `… & …`
9  | Bitwise XOR                  | left-to-right | `… ^ …`
8  | Bitwise OR                   | left-to-right | <code>… &#124; …</code>
7  | Logical AND                  | left-to-right | `… && …`
6  | Logical OR                   | left-to-right | <code>… &#124;&#124; …</code>
5  | Nullish coalescing           | right-to-left | `… ?? …`
4  | Conditional                  | right-to-left | `… ? … : …`
3  | Assignment                   | right-to-left | `=` `+=` `-=` `**=` `*=` `/=` `%=`
3  |                              |               | `<<=` `>>=` `>>>=` `&=` `^=` <code>&#124;=</code>
2  | yield                        | right-to-left | `yield …`
2  | yield*                       | right-to-left | `yield* …`
1  | Spread                       | n/a           | `... …`
0  | Comma / Sequence             | left-to-right | `… , …` 

