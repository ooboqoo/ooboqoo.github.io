# 3 ECMAScript 基本概念

## 3.1 ECMAScript 语法
ECMAScript 的语法很容易掌握，因为它借用了 Java、C 和 Perl 语言的语法。

### 3.1.1 区分大小写
与 Java 一样，变量、函数名、运算符以及其他一切东西都是区分大小写的。

### 3.1.2 标识符
所谓标识符，就是指变量、函数、属性的名字，或者函数的参数。须遵守以下规则：

* 第一个字符必须是一个字母、下划线 `_` 或一个美元符号 `$`；
* 其他字符可以是字母、下划线、美元符号或<b>数字</b>

按照惯例，ECMAScript标识符采用驼峰大小写格式，也就是第一个字母小写，剩下的每个单词的首字母大写。

### 3.1.5 语句以分号 `;` 结尾

Java、C 和 Perl 都要求每行代码以分号（;）结束才符合语法。ECMAScript 则允许开发者省略分号。如果没有分号，则由解析器确定语句的结尾。虽然语句结尾的分号不是必需的，但我们<b>建议任何时候都不要省略它</b>，因为：

* 加上分号可以避免很多错误（例如不完整的输入）；
* 开发人员可以放心地通过删除多余的空格来压缩ES代码（代码行结尾处没有分号会导致压缩错误）；
* 加上分号也会在某些情况下增进代码性能，因为这样解析器就不必再花时间推测应该在哪里插入分号了。

```js
if (false)
alert("test");  // 换行写有效，不会被认为是2条代码，即本例不会弹出窗口，但应该避免这种写法
```

### 3.1.3 注释

ECMAScript 的注释与 Java、C 和 PHP 语言的注释相同。有两种类型的注释：

```js
// 单行注释 - 以双斜杠开头

/*
 * 多行注释 - 以单斜杠和星号开头，以星号和单斜杠结尾
 */

/*!
 * 文件注释 - 按照惯例，可以在 /* 后加 ！来表示文件注释，放在文件开头说明文件信息
 */

/**
 * 文档注释 - 如果用 JSDoc 来自动生成 API 文档，那么必须严格以 /** 开头，/* /*** 这些都不行
 */ 
```

### 括号表示代码块
从 Java 中借鉴的另一个概念是代码块。代码块表示一系列应该按顺序执行的语句，这些语句被封装在花括号 `{}` 之间。

### 3.1.4 严格模式
ES5 引入了严格模式的概念，在严格模式下，ES3中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误。

要在整个脚本中启用严格模式，可以在顶部添加代码；也可以通过在函数内部的上方包含这条编译指示，指定函数在严格模式下执行。
```js
"use strict";
```

## 3.2 关键字和保留字

### 关键字

ECMA-262 定义了 ECMAScript 支持的一套关键字（keyword）。

这些关键字标识了 ECMAScript 语句的开头和/或结尾。关键字是保留的，不能用作变量名或函数名。

下面是 ECMAScript 关键字的完整列表（debugger为ES5新增）：
`break case catch continue debugger* default delete do else finally for function if in instanceof new return switch this throw try typeof var void while with`

**注意：** 如果把关键字用作变量名或函数名，可能得到诸如 "Identifier Expected" 这样的错误消息。

### 保留字

ECMA-262 定义了 ECMAScript 支持的一套保留字（reserved word）。

保留字在某种意思上是为将来的关键字而保留的单词。因此保留字不能被用作变量名或函数名。

ES5 中保留字的完整列表如下：
`abstract boolean byte char class const debugger double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile`

ES5 非严格模式下的保留字缩减为以下这些：
`class const enum export extende import super`

ES5 严格模式下的保留字在非严格模式的基础上增加：
`implements interface let package private protected public static yield eval* arguments*`

ES3 中如果将保留字用作变量名或函数名，那么除非将来的浏览器实现了该保留字，否则很可能收不到任何错误消息。  
ES5 对使用关键字和保留字的规则进行了少许修改，关键字和保留字虽然仍然不能作为标识符使用，但现在可以用作对象的属性名。  
ES5 在严格模式下，eval 和 arguments 这两个名字不能作为标识符或属性名，但是在非严格模式下不会抛出错误。

## 3.3 变量

### 变量是弱类型的
与 Java 和 C 不同，ECMAScript 中的变量无特定的类型，定义变量时只用 `var` 运算符，可以将它初始化为任意值。因此，可以随时改变变量所存数据的类型（但请尽量避免这样做）。

### 声明变量
ECMAScript 中的变量是用 `var` 运算符（variable 的缩写）加变量名定义的。

```js
var test = "hi";  // 定义变量并初始化，由于ECMAScript是弱类型的，无需明确的类型声明
var test;         // 变量并不一定要初始化，未经初始化的变量会保存一个特殊值 undefined
var test2 = "hello", age = 25;  // 一个 var 语句可以定义多个变量，且不必具有相同的类型
var test = "hi"; test = 55;     // 变量可以存放不同类型的值，这是弱类型变量的优势。
```

### 命名变量

变量名需要遵守两条简单的规则：

* 第一个字符必须是字母、下划线 `_` 或美元符号 `$`
* 余下的字符可以是下划线、美元符号或任何字母或数字字符

### 变量声明不是必须的

ECMAScript 另一个有趣的方面（也是与大多数程序设计语言的主要区别），是在使用变量之前不必声明。解释程序遇到未声明过的标识符时，**会用该变量名创建一个全局变量**，并将其初始化为指定的值。

这是该语言的便利之处，不过如果不能紧密跟踪变量，这样做也很危险。最好的习惯是像使用其他语言一样，总是声明所有变量。  
ES5 在严格模式下给未声明的变量赋值会导致抛出 ReferenceError 错误。

## 3.6 语句

ECMA-262 规定了一组语句(也称为流控制语句)，语句定义了 ES 中主要的语法，语句通常使用一个或多个关键字来完成任务。

### 3.6.1 if 语句
<pre> if (<i>condition</i>) statement1 else statement2</pre>
<pre>
 if (<i>condition1</i>) statement1
 else if (<i>condition2</i>) statement2
 else statement3
</pre>

业界普遍推崇的最佳实践是始终使用代码块，即使要执行的只有一行代码，因为这样可以消除人们的误解。

### 3.6.2 do-while 语句
do-while 语句是后测试循环。这意味着在计算表达式之前，至少会执行循环主体一次。
<pre> do {statement} while (<i>expression</i>);</pre>

### 3.6.3 while 语句
while 语句是前测试循环，退出条件是在执行循环内部的代码之前计算的。
<pre> while (<i>expression</i>) statement</pre>

### 3.6.4 for 语句
for 语句是前测试循环，而且在进入循环之前，能够初始化变量，并定义循环后要执行的代码。  
for 语句存在极大的灵活性，因此它也是 ES 中最常用的一个语句。
<pre> for (<i>initialization; expression; post-loop-expression</i>) statement</pre>

注意：*post-loop-expression* 之后不能写分号，否则无法运行。

注意：for 循环的变量初始化表达式需要带 `var` 关键字，不然会生成一个全局变量。因为 ES 没有块级概念，所有循环执行完后计数变量会保留在当前作用域内。

for 语句和 while语句可相互转换，for循环只是把与循环有关的代码集中在了一个位置。

### 3.6.5 for-in 语句
for-in 语句是是一种精准的迭代语句，可以用于枚举对象的属性。

<pre> for (<i>property</i> in <i>expression</i>) statement</pre>

```js
for (var propName in window) {  // 这里同样会生成新变量，加 var 以尽量避免全局变量污染
  document.writeln(propName);
}
```

**注意：**ECMAScript对象的属性没有顺序，因此，通过 for-in 循环输出的属性名顺序是不可预测的。

### 3.6.6 label 语句
<pre> <i>label</i> : statement</pre>

```js
  start : i = 5;
```

加标签的语句一般都要与循环语句配合使用，即为循环中的 break 或 continue 提供一个跳出点。

### 3.6.7 break 和 continue 语句
break 和 continue 语句用于在循环中精确地控制代码的执行。

其中 break 语句会立即退出整个循环，强制继续执行循环后面的语句。  
而 continue 语句只是退出当前单步循环，但退出后会从循环顶部继续执行下步循环。

#### 与有标签的语句一起使用
break 语句和 continue 语句都可以与 label 语句联合使用，返回代码中的特定位置。这种联合使用的情况多发生在循环嵌套的情况下。

```js
var iNum = 0;
outermost:
for (var i=0; i < 10; i++) {
  for (var j=0; j < 10; j++) {
    if (i == 5 && j == 5) { break outermost; }
    iNum++;
  }
}
alert(iNum);  // 输出 "55"
```

虽然联用 break、continue 和 label 语句能够执行复杂的操作，但如果过度使用，也会给调试代码带来麻烦。我们建议如果使用label语句，一定要使用描述性的标签，同时不要嵌套太多层循环。

### 3.6.9 with 语句

with 语句用于设置代码作用域到特定对象中。

在 with 语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询设定的对象中是否有同名的属性。如果发现了同名属性，就以对象属性的值作为变量的值。

<pre> with (<i>expression</i>) statement</pre>

```js
var sMessage = "hello";
with(sMessage) {
  alert(toUpperCase());  // 输出 "HELLO"
}
```

**警告：**由于大量使用 with 语句会导致性能下降，同时也会给调试代码造成困难，因此在开发大型应用程序时，不建议使用。

ES5 严格模式下禁止使用 with 语句。

### 3.6.9 switch 语句

switch 语句是 if 语句的兄弟语句。

```js
switch (expression) {
  case value1: statement1;
    break;
  case value2: statement2;
    break;
//  ......
  default: statement3;
}
```

通过为每个 case 后面都添加一个 break 语句，就可以避免同时执行多个 case 代码的情况。如果确实需要混合几种情形，不要忘了在代码中添加注释，说明你有意省略了 break 关键字。

```js
switch (i) {
  case 25:      // 合并两种情形
  case 35:
    alert("25 or 35"); break;
  case 45:
    alert("45"); break;
  default:
    alert("other");
}
```

ECMAScript 中 switch 语句与其他语言中不同的地方在于：

* 可以在 switch 语句中使用任何数据类型（在很多其他语言中只能使用数值），无论是字符串还是对象。
* 每个 case 的值不一定是常量，可以是变量，甚至是表达式。

```js
var num = 25;
switch (true) {    // 传递的是 true，因为每个 case 值都可以返回一个布尔值
  case num < 0:
    alert("Less than 0.");
    break;   
  case num >= 0 && num <= 20:
    alert("Between 0 and 20.");
    break;
  default:
    alert("More than 20.")
}
```

注意：switch 语句在比较值时使用的是全等操作符，因此不会发生类型转换（例如，"10" 不等于10）

## 3.7 函数

函数对任何语言来说都是一个核心的概念。通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。

ES 中的函数使用 function 关键字来声明，后跟一组参数以及函数体。

```js
function functionName(arg0, arg1, ..., argN) {
  statements
}
```

函数可以通过 return 语句后跟要返回的值来实现返回值，如果没有指定，默认返回 undefined。  
函数执行中如果碰到 return 语句，会立即跳出，而不会再执行后续语句。

### 3.7.1 理解参数

ES 函数的参数与大多数其他语言中的函数的参数有所不同。ES函数不介意传递进来多少个参数，也不在乎传进来参数是什么数据类型。之所以会这样，原因是 ES 中的参数在内部是用一个数组来表示的。函数接收到的始终都是这个数组（这个数组可以不包含任何元素），而不关心数组中包含哪些参数。实际上，在函数体内可以通过 arguments 对象来访问这个参数数组，从而获取传递给函数的每一个参数。

arguments 对象只是与数组类似，但并不是 Array 的实例。可以使用方括号语法访问它的每一个元素（arguments[0] arguments[1] ... ），使用 length 属性来确定传递进来多少个参数。

arguments 对象的存在使得形参不再重要，命名的参数只提供便利，但不是必需的。

ES5 严格模式下无法更改 arguments 对象内容，即使通过形参修改也是无效的。

#### 关于 arguments 对象 与 形参 的关系

```js
function doAdd(num1, num2) {

  // num1 与 argumets[0] 始终保持同步，哪怕是定义新对象
  num1=[12,34];
  document.writeln(typeof arguments[0]);  // 输出 object

  // num2 与 arguments[1] 无法保持同步，只不过是两个没有联系的变量
  num2 = arguments[1] = [56];      // 建立联系
  num2= [78];
  document.writeln(num2);          // 输出 78
  document.writeln(arguments[1]);  // 输出 56，说明没有同步，如果只是修改对象的一个属性，两者是同步的，但这只是因为两个变量存放的是对同一个对象的引用，与“始终保持同步”不是一个概念。

  // length 只是一个普通属性成员，不像数组中的 length 更新会导致数组结构变化
  document.writeln(arguments.length);    // 即使设置了argumets[1]，length依然是1
  arguments.length = 2;
  document.writeln(arguments.length);    // 输出 2，说明 length 只是一个普通属性成员
}

doAdd(8);  // 只传入一个参数，然后具体输出备注在函数定义中
```

通过上述试验，个人给出以下观点（以上例分析）

* 调用函数时，初始化arguments对象，并将形参 num1 作为别名绑定到 arguments[0] 上，从而确保始终保持同步
* 调用函数时，初始化arguments对象，并将其 length 属性值设置为1，这个值不会像 Array 中那样会自动更新
* 调用函数时，形参 num2 只相当于定义了一个局部变量，并没有作为别名绑定到 arguments[1]，即使后续在函数内部设置了 arguments[1]，因为没有在初始化时实现绑定，所以两者无法保持同步。

### parameter和argument的区别

简略描述为：parameter = 形参(formal parameter)， argument = 实参(actual parameter)

### 3.7.2 没有重载

在多数其他语言中，可以为一个函数编写两个定义，只要这两个定义的签名（接受的参数的类型和数量）不同即可。在ES中函数不能像传统意义上那样实现重载。如果ES中定义了两个名字相同的函数，这该名字只属于后定义的函数，也就是说前面的定义被覆盖了。

但因为ES对传入的参数没有限制，可以通过检查传入函数的类型和数量来作出不同的反应，从而模仿重载功能。
