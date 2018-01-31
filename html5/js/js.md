# JavaScript


## JavaScript 实现

Javscript 是一种专为与网页交互而设计的脚本语言，一个完整的 JavaScript 实现是由以下 3 个不同部分组成的：

  * 核心 ECMAScript, 由 ECMA-262 定义，描述了该语言的语法和基本对象
  * 文档对象模型 DOM, 描述了处理网页内容的方法和接口
  * 浏览器对象模型 BOM, 描述了与浏览器进行交互的方法和接口

### ECMAScript

ECMA-262 标准的描述如下：

> “ECMAScript 可以为不同种类的宿主环境提供核心的脚本编程能力，因此核心的脚本语言是与任何特定的宿主环境分开进行规定的...”

ECMAScript 并不与任何具体浏览器相绑定，实际上，它也没有提到用于任何用户输入输出的方法（这点与 C
这类语言不同，它需要依赖外部的库来完成这类任务）。

ECMAScript 仅仅是一个描述，定义了脚本语言的所有属性、方法和对象。简单地说，ECMAScript 描述了以下内容：

  * 语法
  * 类型
  * 语句
  * 关键字
  * 保留字
  * 运算符
  * 对象

每个浏览器都有它自己的 ECMAScript 接口的实现，然后这个实现又被扩展，包含了 DOM 和 BOM。

### DOM

DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）。DOM 将把整个页面规划成由节点层级构成的文档。HTML 或 XML 页面的每个部分都是一个节点的衍生物。

DOM 通过创建树来表示文档，从而使开发者对文档的内容和结构具有空前的控制力。用 DOM API 可以轻松地删除、添加和替换节点。

### 1. 为什么 DOM 必不可少

自从 IE 4.0 和 Netscape Navigator 4.0 开始支持不同形态的动态HTML（DHTML），开发者首次能够在不重载网页的情况下修改它的外观和内容。这是 Web 技术的一大飞跃，不过也带来了巨大的问题。Netscape 和微软各自开发自己的 DHTML，从而结束了 Web 开发者只编写一个 HTML 页面就可以在所有浏览器中访问的时期。

业界决定必须要做点什么以保持 Web 的跨平台特性，他们担心如果放任 Netscape 和微软公司这样做，Web 必将分化为两个独立的部分，每一部分只适用于特定的浏览器。因此，负责指定 Web 通信标准的团体 W3C（World Wide Web Consortium）就开始制定 DOM。

### 2. DOM 的各个 level

DOM Level 1 是 W3C 于 1998 年 10 月提出的。它由两个模块组成，即 DOM Core 和 DOM HTML。前者提供了基于 XML 的文档的结构图，以便访问和操作文档的任意部分；后者添加了一些 HTML 专用的对象和方法，从而扩展了 DOM Core。

注意，DOM 不是 JavaScript 专有的，事实上许多其他语言都实现了它。不过，Web 浏览器中的 DOM 已经用 ECMAScript 实现了，现在是 JavaScript 语言的一个很大组成部分。

DOM Level 1 只是一个目标，即规划文档的结构，DOM Level 2 的目标就广泛多了。对原始 DOM 的扩展添加了对鼠标和用户界面事件（DHTML 对此有丰富的支持）、范围、遍历（重复执行 DOM 文档的方法）的支持，并通过对象接口添加了对 CSS（层叠样式表）的支持。由 Level 1 引入的原始 DOM Core 也加入了对 XML 命名空间的支持。

DOM Level 2 引入了几种 DOM 新模块，用于处理新的接口类型：

  * DOM 视图 - 描述跟踪文档的各种视图（即 CSS 样式化之前和 CSS 样式化之后的文档）
  * DOM 事件 - 描述事件的接口
  * DOM 样式 - 描述处理基于 CSS 样式的接口
  * DOM 遍历和范围 - 描述遍历和操作文档树的接口

DOM Level 3 引入了以统一的方式载入和保持文档的方法（包含在新模块 DOM Load and Save）以及验证文档（DOM Validation）的方法，从而进一步扩展了 DOM。在 Level 3 中，DOM Core 被扩展为支持所有的 XML 1.0 特性，包括 XML Infoset、XPath 和 XML Base。

### 3. 其他 DOM

除了 DOM Core 和 DOM HTML 外，还有其他几种语言发布了自己的 DOM 标准。这些语言都是基于 XML 的，每种 DOM 都给对应语言添加了特有的方法和接口：

  * 可缩放矢量语言（SVG）1.0
  * 数字标记语言（MathML）1.0
  * 同步多媒体集成语言（SMIL）

### 4. Web 浏览器中的 DOM 支持

DOM 在被 Web 浏览器开始实现之前就已经是一种标准了。IE 首次尝试 DOM 是在 5.0 版本中，Netscape 直到 Netscape 6（Mozilla 0.6.0）才引入 DOM 支持。

### BOM

IE 3.0 和 Netscape Navigator 3.0 提供了一种特性 - BOM（浏览器对象模型），可以对浏览器窗口进行访问和操作。使用 BOM，开发者可以移动窗口、改变状态栏中的文本以及执行其他与页面内容不直接相关的动作。使 BOM 独树一帜且又常常令人怀疑的地方在于，它只是 JavaScript 的一个部分，没有任何相关的标准。

BOM 主要处理浏览器窗口和框架，不过通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分。这些扩展包括：

  * 弹出新的浏览器窗口
  * 移动、关闭浏览器窗口以及调整窗口大小
  * 提供 Web 浏览器详细信息的定位对象
  * 提供用户屏幕分辨率详细信息的屏幕对象
  * 对 cookie 的支持
  * IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象

由于没有相关的 BOM 标准，每种浏览器都有自己的 BOM 实现。有一些事实上的标准，如具有一个窗口对象和一个导航对象，不过每种浏览器可以为这些对象或其他对象定义自己的属性和方法。


## JavaScript 使用

HTML 中的脚本必须位于 `<script>` 与 `</script>` 标签之间。脚本可被放置在 HTML 页面的 `<body>` 和 `<head>` 部分中。

### `<script>` 标签

如需在HTML 页面中插入JavaScript，请使用 `<script>` 标签。

那些老旧的实例可能会在 `<script>` 标签中使用 `type="text/javascript"`。现在已经不必这样做了。JavaScript 是所有现代浏览器以及 HTML5 中的默认脚本语言。

```html
<script> alert("My First JavaScript"); </script>
```

### JavaScript 函数和事件

通常，我们需要在某个事件发生时执行代码，比如当用户点击按钮时。

如果我们把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数。

### JavaScript 放置位置

脚本可位于HTML 的 `<body>` 或 `<head>` 部分中，或者同时存在于两个部分中。

最好的做法是把 `<script>` 标签放到 HTML 文档的最后，`</body>` 标签之前，这样能使浏览器更快地加载页面。

### 外部的 JavaScript

也可以把脚本保存到外部文件中。外部文件通常包含被多个网页使用的代码。外部文件的文件扩展名是 `.js`。

如需使用外部文件，请在 `<script>` 标签的 `src` 属性中设置该 .js 文件：

```html
<script src="myScript.js"></script>
```

引用的脚本文件实际运行效果与您在 `<script>` 标签中编写脚本完全一致。

### `<noscript>` 标签

`<noscript>` 标签用以在不支持或禁用 JavaScript 的浏览器中显示替代的内容。

```html
<noscript>本页面需要浏览器支持（启用）JavaScript。</noscript>
```

### JavaScript 应用举例

#### 写入HTML 输出

```js
document.write("<h1>This is a heading</h1>");
document.write("<p>This is a paragraph</p>");
```

提示：您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。

#### 对事件作出反应

```html
<button type="button" onclick="alert('Welcome!')">点击这里</button>
```

`alert()` 函数在 JavaScript 中并不常用，但它对于代码测试非常方便。

#### 改变内容

使用 JavaScript 来处理 HTML 内容是非常强大的功能。

```js
x = document.getElementById("demo")  // 查找元素
x.innerHTML = "Hello JavaScript";    // 改变内容
```

您会经常看到 `document.getElementByID("someID")`，这个方法是 HTML DOM 中定义的。

#### 改变图像

本例会动态地改变 HTML `<image>` 的来源 `src`：

```html
<script>
function changeImage() {
  var element = document.getElementById('myimage');
  if (element.src.match('bulbon')) element.src = '/i/eg_bulboff.gif';
  else element.src = '/i/eg_bulbon.gif';
}
</script>
<img id="myimage" onclick="changeImage()" src="/i/eg_bulboff.gif">
```

JavaScript 能够改变任意HTML 元素的大多数属性，而不仅仅是图片。

#### 改变样式

改变 HTML 元素的样式，属于改变 HTML 属性的变种。

```js
var x = document.getElementById("demo");  // 找到元素
x.style.color = "#ff0000";                // 改变样式
```

#### 验证输入

JavaScript 常用于验证用户的输入。

```js
if isNaN(x) alert("Not Numeric");
```


## JavaScript 语句

```js
document.getElementById("demo").innerHTML = "Hello World";
```

#### 分号 ;

分号用于分隔 JavaScript 语句。通常我们在每条可执行的语句结尾添加分号。

使用分号的另一用处是在一行中编写多条语句。

在 JavaScript 中，用分号来结束语句是可选的。

#### JavaScript 代码块

块由左花括号开始，由右花括号结束。

块的作用是使语句序列一起执行。

JavaScript 函数是将语句组合在块中的典型例子。

#### JavaScript 对大小写敏感。

#### 空格

JavaScript 会忽略多余的空格。您可以向脚本添加空格，来提高其可读性。

```js
var name="Hello";
var name = "Hello";
```

#### 对代码行进行折行

您可以在文本字符串中使用反斜杠对代码行进行换行。下面的例子会正确地显示：

```js
// 没有反斜杠会被认为是两行代码，其实是将换行转义成字符串内的换行了
document.write("Hello \
World!");
// 不过，您不能像这样折行：
document.write \
("Hello World!");
```

JavaScript 是脚本语言。浏览器会在读取代码时，逐行地执行脚本代码。而对于传统编程来说，会在执行前对所有代码进行编译。

#### JavaScript 注释

注释可用于提高代码的可读性。

单行注释以 `//` 开头。可以将注释添加到一行代码的结尾处。

多行注释以 `/*` 开始，以 `*/` 结尾。

注释可用于阻止代码行的执行（可用于调试）。


## JavaScript 变量

#### 变量

变量是存储信息的容器。

与代数一样，JavaScript 变量可用于存放值，如 `x=2` 和表达式，如 `z=x+y`。

变量可以使用短名称（比如 x 和 y），也可以使用描述性更好的名称（比如 age, sum, totalvolume）。

  * 变量必须以字母开头
  * 变量也能以 `$` 和 `_` 符号开头（不过我们不推荐这么做）
  * 变量名称对大小写敏感（y 和 Y 是不同的变量）

提示：JavaScript 语句和 JavaScript 变量都对大小写敏感。

#### 数据类型

JavaScript 变量有很多种类型，但是现在，我们只关注数字和字符串。

当您向变量分配文本值时，应该用 `"` 或 `'` 包围这个值。

当您向变量赋的值是数值时，不要使用引号。如果您用引号包围数值，该值会被作为文本来处理。

```js
var pi=3.14; var name="Bill Gates";
```

#### 声明变量

在 JavaScript 中创建变量通常称为“声明”变量。我们使用 `var` 关键词来声明变量：

```js
var carname;       // 变量声明之后，该变量是空的，没有值
carname = "Volvo"; // 如需向变量赋值，请使用等号
var carname = "Volvo"; // 不过，您也可以在声明变量时对其赋值
```

提示：一个好的编程习惯是，在代码开始处，统一对需要的变量进行声明。

```js
var name = "Gates", age = 56, job = "CEO"; // 可以在一条语句中声明多个变量，使用逗号分隔变量即可
var name = "Gates", // 声明也可横跨多行
    age = 56,
    job="CEO";
```

#### undefined

在计算机程序中，经常会声明无值的变量。未使用值来声明的变量，其值实际上是 `undefined`。

在执行过以下语句后，变量 carname 的值将是 undefined：

```js
var carname;
```

#### 重新声明 JavaScript 变量

如果重新声明 JavaScript 变量，该变量的值不会丢失：

```js
var carname = "Volvo";
var carname;  // 变量的值依然是 "Volvo"
```

#### 变量的作用域

全局变量 or 局部变量

没有声明直接用的变量默认为全局变量，所以如果没有在函数内部提前使用 `var` 声明而直接使用，就会生成一个全局变量


## JavaScript 数据类型

字符串、数字、布尔、数组、对象、Null、Undefined

#### JavaScript 拥有动态类型（弱类型）

JavaScript 拥有动态类型，这意味着相同的变量可用作不同的类型：

#### 字符串

字符串可以是引号中的任意文本。您可以使用单引号或双引号。

#### 数字

JavaScript 只有一种数字类型。数字可以带小数点，也可以不带：

```js
var x1 = 34.00;  // 使用小数点来写
var x2 = 34;     // 不使用小数点来写
```

极大或极小的数字可以通过科学（指数）计数法来书写：

```js
var y = 123e5;  // 12300000
var z = 123e-5; // 0.00123
```

#### 布尔

布尔（逻辑）只能有两个值：`true` 或 `false`。

#### 数组

下面的代码创建名为 cars 的数组：

```js
var cars=new Array();
cars[0] = "Audi";
cars[1] = "BMW";
cars[2] = "Volvo";

// 或者 (condensed array):
var cars = new Array("Audi", "BMW", "Volvo");

// 或者 (literal array):
var cars = ["Audi","BMW","Volvo"];
```

数组下标是基于零的，所以第一个项目是 `[0]`，第二个是 `[1]`，以此类推。

#### 对象

对象由花括号分隔。在括号内部，对象的属性以键值对的形式 `name: value` 来定义。属性由逗号 `,` 分隔：

```js
var person = {firstname: "Bill", lastname: "Gates", id: 5566};
```

空格和折行无关紧要。声明可横跨多行：

对象属性有两种寻址方式：

```js
name = person.lastname;
name = person["lastname"];
```

#### Undefined 和 Null

`undefined` 这个值表示变量不含有值。可以通过将变量的值设置为 `null` 来清空变量。

#### 声明变量类型

当您声明新变量时，可以使用关键词 `new` 来声明其类型：

```js
var carname = new String;
var x = new Number;
var y = new Boolean;
var cars= new Array;
var person= new Object;
```

JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象。


## JavaScript 对象

JavaScript 中的所有事物都是对象：字符串、数字、数组、日期，等等。对象是拥有属性和方法的数据。

#### 属性和方法

属性是与对象相关的值。方法是能够在对象上执行的动作。

提示：在面向对象的语言中，属性和方法常被称为对象的成员。

#### 创建 JavaScript 对象

JavaScript 中的几乎所有事务都是对象：字符串、数字、数组、日期、函数，等等。

你也可以创建自己的对象。本例创建名为 "person" 的对象，并为其添加了四个属性：

```js
person = new Object();
person.firstname = "Bill";
person.lastname = "Gates";
person.age = 56;
person.eyecolor = "blue";
```

创建新 JavaScript 对象有很多不同的方法，并且您还可以向已存在的对象添加属性和方法。

#### 访问对象的属性

访问对象属性的语法是：`objectName.propertyName`

```js
var message = "Hello World!";
var x = message.length;
```

#### 访问对象的方法

您可以通过下面的语法调用方法：`objectName.methodName()`

```js
var message = "Hello world!";
var x = message.toUpperCase();
```

提示：在面向对象的语言中，使用 camel-case 标记法的函数是很常见的。您会经常看到 `someMethod()` 这样的函数名，而不是
`some_method()`。


## JavaScript 函数

### JavaScript 函数语法

函数就是包裹在花括号中的代码块，前面使用了关键词 `function`：

```js
function functionname() {
  // 这里是要执行的代码
}
```

当调用该函数时，会执行函数内的代码。

可以在某事件发生时直接调用函数（比如当用户点击按钮时），并且可由 JavaScript 在任何位置进行调用。

提示：JavaScript 对大小写敏感。关键词 `function` 必须是小写的，并且必须以与函数名称相同的大小写来调用函数。

### 调用带参数的函数

在调用函数时，您可以向其传递值，这些值被称为参数。

这些参数可以在函数中使用。

您可以发送任意多的参数，由逗号 (,) 分隔：

```js
myFunction(argument1, argument2);
```

当您声明函数时，请把参数作为变量来声明：

```js
function myFunction(var1, var2) { /* 这里是要执行的代码 */ }
```

### 带有返回值的函数

有时，我们会希望函数将值返回调用它的地方。

通过使用 `return` 语句就可以实现，函数会停止执行，并返回指定的值。

注释：整个JavaScript 并不会停止执行，仅仅是函数。JavaScript 将继续从调用函数的地方执行代码。

在您仅仅希望退出函数时，也可使用 `return` 语句，返回值是可选的。

### 局部变量

在函数内部声明的变量是局部变量，只能在函数内部访问它。只要函数运行完毕，本地变量就会被删除。

您可以在不同的函数中使用名称相同的局部变量，因为只有声明过该变量的函数才能识别出该变量。

### 全局变量

在函数外声明的变量是全局变量，网页上的所有脚本和函数都能访问它。

### 变量的生存期

JavaScript 变量的生命期从它们被声明的时间开始。

局部变量会在函数运行以后被删除。全局变量会在页面关闭后被删除。

### 向未声明的 JavaScript 变量来分配值

如果您把值赋给尚未声明的变量，该变量将被自动作为全局变量声明。

```js
carname = "Volvo";  // 将声明一个全局变量 carname，即使它在函数内执行。
```


## JavaScript 运算符

### 算术运算符

`+` 加 `-` 减 `*` 乘 `/` 除 `%` 求余 `++` 累加 `--` 递减

### 赋值运算符

`=` `+=` `-=` `*=` `/=`

### 用于字符串的 `+` 运算符

`+` 运算符用于把文本值或字符串变量连接起来。

```js
txt1 = "What a very";
txt2 = "nice day";
txt3 = txt1 + " " + txt2;  // 语句执行后，变量 txt3 包含的值是 "What a very nice day"
```

对字符串和数字进行加法运算的规则是：如果把数字与字符串相加，结果将成为字符串。

### 比较和逻辑运算符

比较和逻辑运算符用于测试 true 或 false。

#### 比较运算符

比较运算符在逻辑语句中使用，以测定变量或值是否相等。

`==` 等于 `===` 全等（值和类型） `!=` 不等于 `>` 大于 `<` 小于 `>=` 大于或等于 `<=` 小于或等于

#### 逻辑运算符

逻辑运算符用于测定变量或值之间的逻辑。

`&&` and `||` or `!` not

#### 条件运算符

JavaScript 还包含了基于某些条件对变量进行赋值的条件运算符。

```js
variablename = (condition) ? value1 : value2;

greeting = (visitor == "PRES") ? "Dear President " : "Dear ";
```


## 语言结构

### If...Else 语句

```js
if...;
if...else...;
if...else if....else...;
```

### Switch 语句

```js
switch(n) {
  case 1:
    /* 执行代码块 1 */
    break;  // break 用来阻止代码自动地向下一个 case 运行
  case 2:
    /* 执行代码块 2 */
    break;
  default:  // 请使用 default 关键词来规定匹配不存在时做的事情
    /* 代码块 */
}
```

### For 循环

JavaScript 支持不同类型的循环：

  * _for_ \- 循环代码块一定的次数
  * _for/in_ \- 循环遍历对象的属性
  * _while_ \- 当指定的条件为 true 时循环指定的代码块
  * _do/while_ \- 同样当指定的条件为 true 时循环指定的代码块

#### Break 和 Continue 语句

`break` 语句用于跳出循环。

`continue` 用于跳过循环中的一个迭代。

```js
for (i = 0; i < 10; i++) {
  if (i === 3) break;   // 由于这个 if 语句只有一行代码，所以可以省略花括号
  x = x + "The number is " + i + "<br>";
}

for (i = 0; i <= 10; i++) {
  if (i === 3) continue;    // 该例子跳过了值 3
  x = x + "The number is " + i + "<br>";
}
```

#### 标签

可以用下列语句给语句加标签，以便以后调用：`label: statement` 例如：`start: i = 5;`

`break` 和 `continue` 语句仅仅是能够跳出当前循环的语句。通过添加 label 可以控制跳出循环的层级。

```js
var iNum = 0;
outermost:
for (var i=0; i&lt;10; i++) {
  for (var j=0; j&lt;10; j++) {
    if (i == 5 && j == 5) break outermost;
    iNum++;
  }
}
alert(iNum)  // 输出 "55"
```

### JavaScript 错误 - throw、try 和 catch

* `try` 语句 - 测试代码块的错误。
* `catch` 语句 - 处理错误。
* `throw` 语句 - 创建自定义错误。

##### 错误一定会发生

当 JavaScript 引擎执行 JavaScript 代码时，会发生各种错误：

可能是语法错误，通常是程序员造成的编码错误或错别字。

可能是拼写错误或语言中缺少的功能（可能由于浏览器差异）。

可能是由于来自服务器或用户的错误输出而导致的错误。

当然，也可能是由于许多其他不可预知的因素。

##### JavaScript 抛出错误

当错误发生时，当事情出问题时，JavaScript 引擎通常会停止，并生成一个错误消息。

描述这种情况的技术术语是：JavaScript 将_抛出_一个错误。

##### JavaScript 测试和捕捉

`try` 语句允许我们定义在执行时进行错误测试的代码块。

`catch` 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。

JavaScript 语句 `try` 和 `catch` 是成对出现的。

#### 语法

```js
try {
  // 在这里运行代码
} catch(err) {
  // 在这里处理错误
}
```

在下面的例子中，我们故意在 try 块的代码中写了一个错字。

catch 块会捕捉到 try 块中的错误，并执行代码来处理它。

```js
function message() {
  try {
    adddlert("Welcome guest!");
  } catch(err) {
    txt = "There was an error on this page.\n\n";
    txt += "Error description: " + err.message + "\n\n";
    txt += "Click OK to continue.\n\n";
    alert(txt);
  }
}
```

### Throw 语句

throw 语句允许我们创建自定义错误。

正确的技术术语是：创建或 _抛出异常_(exception)。

如果把 throw 与 try 和 catch 一起使用，那么您能够控制程序流，并生成自定义的错误消息。

异常可以是 JavaScript 字符串、数字、逻辑值或对象。

本例检测输入变量的值。如果值是错误的，会抛出一个异常（错误）。catch 会捕捉到这个错误，并显示一段自定义的错误消息：

```html
<script>
  function myFunction() {
    try {
      var x = document.getElementById("demo").value;
      if (x == "") throw "empty";
      if (isNaN(x)) throw "not a number";
      if (x > 10) throw "too high";
      if (x < 5) throw "too low";
    } catch (err) {
      var y = document.getElementById("mess");
      y.innerHTML = "Error: " + err + ".";
    }
  }
</script>
<h1>My First JavaScript</h1>
<p>Please input a number between 5 and 10:</p>
<input id="demo" type="text">
<button type="button" onclick="myFunction()">Test Input</button>
<p id="mess"></p>
```

请注意，如果 getElementById 函数出错，上面的例子也会抛出一个错误。

### with 语句

使用 `with` 语句，在存取对象属性和方法时就不用重复指定参考对象。在 With 语句块中，凡是 JavaScript 不识别的属性和方法都和该语句块指定的对象有关。语法格式如下：

```js
with Object {
  Statements
}
```

对象指明了当语句组中对象缺省时的参考对象，这里我们用较为熟悉的 document 对象举例。

```js
with (document) {
  write("您好 !");
  write("&lt;br&gt;这个文档的标题是 : \"" + title + "\".");
  write("&lt;br&gt;这个文档的 URL 是: " + URL);
  write("&lt;br&gt;现在您不用每次都写出 document 对象的前缀了 !");
}
```

这样，您在使用 document 的方法和属性时就可以去掉 Document 前缀。

请注意程序中的 title 和 URL 均是 Document 对象的属性，一般情况下应写作 document.title 和 document.URL 使用 with 语句，您只需指定一次参考对象。

<script>ooboqoo.contentsRegExp = /H[123]/;</script>
