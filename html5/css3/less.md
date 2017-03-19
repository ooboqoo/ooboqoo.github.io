# Less 语法

官方文档：http://lesscss.org/   
中文文档：http://www.lesscss.net/   
一个在线编辑工具：http://winless.org/online-less-compiler （更多见中文文档）

本笔记在中英文文档基础上删减、修改而来。

## 概述 Overview

Less 是 CSS 的超集。

### 变量 Variables

```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;
#header {  color: @light-blue; }

/* 输出 */
#header {
  color: #6c94be; }
```

注意：这里所定义的变量，实质上是“常量”，在同一作用域内允许赋值多次，但只有最后一次赋值才是有效的（会覆盖前面的赋值）。

### 普通混入 Mixins
普通混入指将其他 class / id 的定义完整地拷贝一份，有些类似于继承的概念，但 Less 里有单独的 extend 继承语法。

```less
.bordered {  // 供 mixin 的元素，也可以是 #id，但 tag 不支持
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered;  // 执行 mixin
}
```

### 带参混入器 Parametric Mixins
带参混入器更像是一个函数，下面列了一些重要特性：

* 带参混入器的参数可以是 0 或 多个，但必须带 ()
* 带参混入器自身不会输出到 css
* 参数可以有参数名，也可以没有参数名
* 参数可以带默认值，也可以不带默认值

```less
// A parametric mixin with a default value:
.border-radius-with-default(@radius: 5px) {
    border-radius: @radius;
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
}
#content { .border-radius-with-default; }

/* 输出 */
#content {
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
```

### 嵌套规则 Nested Rules

```less
/* 普通 CSS 的写法： */
#header {  color: black; }
#header .navigation {  font-size: 12px; }
#header .logo {  width: 300px; }

/* Less 中可以采用嵌套简化： */
#header {
  color: black;
  .navigation { font-size: 12px;  }
  .logo { width: 300px;  }
}
```

采用嵌套使代码更加简明，可以很好地体现 HTML 代码结构。

#### 嵌套中的 & 符号
`&` 代表当前选择器的父选择器（指 less 嵌套中的父选择器）

```less
/* 嵌套与伪选择器配合使用 */
 a { text-decoration: none;
      &:hover { border-width: 1px }
}

/* 输出 */
a {  text-decoration: none; }
a:hover {  border-width: 1px; }
// 如果不加 &，输出为 a :hover 即相当于 a *:hover
```

### 指令嵌套及冒泡 Nested Directives and Bubbling

像 media、keyframe 这样的指令也可以跟普通选择器一样进行嵌套。指令与普通选择器不同的地方是，指令最终会被提升到最外层，这就是所谓的冒泡。

```less
.screen-color {
  @media screen {
    color: green;
    @media (min-width: 768px) { color: red; }
  }
  @media tv { color: black; }
}

/* 输出 */
@media screen {
  .screen-color { color: green; } }
@media screen and (min-width: 768px) {
  .screen-color { color: red; } }
@media tv {
  .screen-color { color: black; } }
```

非条件判断指令，如 font-face、keyframes 也会冒泡，但它们的内容不会改变：

```less
#a {
  color: blue;
  @font-face { src: made-up-url; }
  padding: 2px; }

/* 输出 */
#a { color: blue; padding: 2px; }
@font-face { src: made-up-url; }
```

### 运算符 Operations

任何数值、颜色和变量都可以进行运算。  
less 会智能转换单位，但在无法转换，或者转换没有意义的情况下，less 会忽略单位。

```less
/* 不同单位之间智能转换 */
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm
/* 无法转换的情况 */
@incompatible-units: 2 + 5px - 3cm; // result is 4px，忽略单位，取默认单位
/* 转换没有意义的情况 */
@base: 2cm * 3mm; // result is 6cm，对于乘除法，后面的那个操作符的单位没有意义，忽略
/* 变量运算示例 */
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
/* 颜色运算示例 */
color:rgba(0,255,0,0.5)-#111;  // color: #00ee00; alpha值丢失；小于 00 的以 00 计
```

颜色操作提示1：alpha 通道不支持算术运算，若参与运算，alpha 值将丢失。

颜色操作提示2：颜色计算结果超出 00-ff 的范围的时候，超出的不计。

### 转义 Escaping

`~"anything"` 或 `~'anything'` 字符串前加 `~` 符号，字符串将被原样保留，主要用于 css hack。

```less
.weird-element {
    content: ~"^* some horrible but needed css hack"; }

/* 输出 */
.weird-element { content: ^* some horrible but needed css hack; }
```

### 函数 Functions

Less 提供一系列函数用于转换颜色、操作字符以及数学运算，并提供了详细的在线手册。

```less
@base: #f04615;
@width: 0.5;
.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%); }

/* 输出 */
.class {
  width: 50%;
  color: #f6430f;
}
```

### 命名空间及存取 Namespaces and Accessors

(Not to be confused with CSS @namespace or namespace selectors).

有时候，出于组织代码的目的，或者为了提供一些封装，你会希望将你的 mixins 组合在一起，在 Less 中做到这一点非常直观。

```less
#bundle {  // 定义一个命名空间
  @color: orange;
  .button {
    display: block;
    border: 1px solid black;
  }
  .tab { ... }
}

/* 存取示例 */
#header a {
  #bundle &gt; .button;  // 正常调用
  color: #bundle &gt; @color;  // 调用出错
}
```

请注意，命名空间内部声明的变量的作用域仅限于命名空间内，外部调用无效。（这种设计跟 JS 的闭包设计是一样的）

### 作用域 Scope

Less 中的作用域与编程语言中的作用域概念非常相似。首先会在当前作用域查找，如果没找到，编译器就会逐级向上查找。

```less
@var: red;
#page {
  #header { color: @var; }
  @var: white;  // 声明位于使用语句后面，一样有效
}
```

提示：变量和 mixins 的声明可以放在调用的后面，也就是说可以先用再声明。这种机制称为 Lazy Loading

### 注释 Comments

Less 在 CSS 的“块注释”基础上增加了“单行注释”功能，但单行注释在编译时会忽略。

```less
/* 我会被编译 */
// 我不会被编译
```

### 导入 Importing
```less
@import "library";  // library.less 后缀可省略
@import "typo.css";  // 导入 css 文件时，后缀不可省略
```

### 代码规范 Less standards

* Two spaces for indentation, never tabs, and always use proper indentation
* Multiple-line formatting (one property and value per line)
* For multiple, comma-separated selectors, place each selector on its own line
* Double quotes only, never single quotes
* Always put a space after a property's colon (e.g., `display: block;` and not `display:block;`)
* End _all_ lines with a semi-colon
* Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes. This is important to do in your own code as well for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks)
* When using HTML in your examples, use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags with _no trailing slash_)
* Separate words in variable and mixin names using dash (e.g., `@long-variable-name` or `.my-favourite-mixin`)

## 变量 Variables

### 概述 Overview

变量通过为你提供一种在单个地方管理变量值的方法让你的代码变得更容易维护。

### 变量插值 Variable Interpolation

使用变量管理值是变量最常见的使用方式，另外，它们还可以用在其他地方，如选择器名、属性名、URLs 以及 @import 语句中。

当变量不是作为值来引用，而是作为字符串来使用时，就是变量插值，使用格式稍微有点区别：`@{ variableName }`

### 选择器中的变量 Selectors

```less
@my-selector: banner; // Variables
.@{my-selector} {  // Usage
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

/* 输出 */
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

### URL 中的变量 URLs

```less
// Variables
@images: "../img";

// Usage
body { background: url("@{images}/image.png"); }
```

### @import 语句中的变量 Import Statements

```less
// Variables
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

### 属性名中的变量 Properties

```less
@property: color;
.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}

// Compiles to:
.widget {
  color: #0ee;
  background-color: #999;
}
```

### 变量名中的变量 Variable Names

还可以使用变量来定义变量名：

```less
@fnord:  "I am fnord.";
@var:    "fnord";
content: @@var;

// Which compiles to:
content: "I am fnord.";
```

### 延迟加载 Lazy Loading

变量是延迟加载的，在使用前不一定要预先声明。

当重复定义一个变量时，只会使用最后定义的变量（后面的会覆盖前面的）。

如果当前作用域没有该变量，Less 会逐级向上搜索，这个行为类似于 CSS 的行为。

```less
@var: 0;
.class {
  @var: 1;
  .brass { @var: 2; three: @var; @var: 3; }
  one: @var;
}

/* 输出 */
.class { one: 1; }
.class .brass { three: 3; }
```

### 变量的默认值 Default Variables

有时候你会用到变量的预设值 -- 让你能够在没有设置变量的情况下能够使用预设值。这一特性并不是不可或缺，因为在 Less 中允许先使用再定义变量。

## 继承 Extend

### 经典用法 Classic Use Case

```less
.animal {
  background-color: black;
  color: white;
}
.bear {
  &:extend(.animal);
  background-color: brown;
}

/* 输出 */
.animal, .bear {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown;
}
```

### 减小 CSS 尺寸 Reducing CSS Size

使用 Mixins 会复制所有定义，而 Extend 只会将选择器添加到基类，可以减小 CSS 尺寸。

采用 mixins 的方案

```less
.my-inline-block() {
  display: inline-block;
  font-size: 0;
}
.thing1 { .my-inline-block; }
.thing2 { .my-inline-block; }

/* 输出 */
.thing1 {
  display: inline-block;
  font-size: 0;  }
.thing2 {
  display: inline-block;
  font-size: 0;  }
```

采用 extend 的方案

```less
.my-inline-block {
  display: inline-block;
  font-size: 0;
}
.thing1 { &:extend(.my-inline-block); }
.thing2 { &:extend(.my-inline-block); }

/* 输出 */
.my-inline-block, .thing1, .thing2 {
  display: inline-block;
  font-size: 0;
}
```

### 分组(更高级的mixin) Combining Styles / A More Advanced Mixin

另一种用法是作为 mixin 的替代，mixins 只能用于简单选择器，当你有两个选择器要使用相同的 CSS 时，可以采用 extend 实现分组功能。

```less
li.list > a {
  /* list styles */ }
button.list-style {
  &:extend(li.list > a);
}

/* 输出 */
li.list > a,
button.list-style {
  /* list styles */
}
```

## Mixins

Mixin 负责将现有样式定义“掺入”当前定义。您可以 mix-in 类选择器 及 id 选择器。

```less
.a, #b { color: red; }
.mixin-class { .a(); }
.mixin-id { #b(); } 

/* 输出 */
.a, #b { color: red; }
.mixin-class { color: red; }
.mixin-id { color: red; }
```

```less
.a(); 
.a;  // 使用 mixins 括号是可选的，两者效果一样
```

### 阻止输出Mixin本身 Not Outputting the Mixin

如果 Mixin 只用于供调用而不需要单独输出到 CSS 中，那么可以通过加括号来阻止编译输出。

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}

/* 输出 */
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}

```

### Mixins中的选择器 Selectors in Mixins

Mixin 中不仅可以定义属性，而且还可以包含选择器。

```less
.my-hover-mixin() {
  background-color: #ccc;
  &:hover { border: 1px solid red; }
  .inner {color: black;}
}
button { .my-hover-mixin(); }

/* 输出 */
button { background-color: #ccc; }
button:hover { border: 1px solid red; }
button .inner { color: black; }

```

### 命名空间 Namespaces

如果你需要混入复杂选择器中定义的属性，你可以通过嵌套多层 id 或者 class 来调用。

```less
#outer {
  .inner { color: red; }
}
.c {
  #outer > .inner;
}
// 多层嵌套调用时 > 符号以及 空白 都可以省略

// 以下几种调用都是合法有效的
#outer > .inner;
#outer > .inner();
#outer .inner;
#outer .inner();
#outer.inner;
#outer.inner();
```

这种用法的效果相当于我们熟知的命名空间，你可以把 mixins 放到一个id选择器里面，这样可以确保它不会跟其他的库冲突。

```less
#my-library {
  .my-mixin() { color: black; }
}
// which can be used like this
.class {
  #my-library > .my-mixin();
}
```

### 带生效条件的命名空间 Guarded Namespaces

If namespace have a guard, mixins defined by it are used only if guard condition returns true. Namespace guard is evaluated exactly the same way as guard on mixin, so next two mixins work the same way:

```less
#namespace when (@mode=huge) {
  .mixin() { /* */ }
}
#namespace {
  .mixin() when (@mode=huge) { /* */ }
}
```

The default function is assumed to have the same value for all nested namespaces and mixin. Following mixin is never evaluated, one of its guards is guaranteed to be false:

```less
#sp_1 when (default()) {
  #sp_2 when (default()) {
    .mixin() when not(default()) { /* */ }
  }
}
```

### !important 关键字 The !important keyword

在调用mixin 时加上 !important 关键字，可以使 mixin 里面的所有属性都继承 !important：

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant { .foo(); }
.important {
  .foo() !important; // 调用时加了 !important 关键字
}

/* 输出 */
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

## Parametric Mixins

Mixins can also take arguments, which are variables passed to the block of selectors when it is mixed in.

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius; }

/* 使用 */
#header { .border-radius(4px); }
.button { .border-radius(6px); }
// 参数不能省略，否则报错
```

Parametric mixins can also have default values for their parameters:

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius; }

/* 使用 */
#header { .border-radius; }
// 因为设置了默认参数，所以不传参不会报错
// And it will include a 5px border-radius.
```

You can also use parametric mixins which don't take parameters. This is useful if you want to hide the ruleset from the CSS output, but want to include its properties in other rulesets:

```less
.wrap() {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}
pre { .wrap }

/* 输出 */
pre {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```

### Mixins with Multiple Parameters

多个参数可以用分号 `;` 或者逗号 `,` 分割，但是推荐使用分号分割。因为逗号有两个意思：它可以解释为 mixins 参数分隔符或者 css 列表分隔符，使用逗号作为 mixin 的参数分隔符就无法创建用逗号分割的 css 列表。正因为此原因，编译器优先选用分号作为分隔符。如果编译器在 mixin 调用或者声明中看到至少一个分号，它就会假设参数是由分号分割的，而所有的逗号都属于 css 列表:

*   两个参数，并且每个参数都是逗号分割的列表：.name(1,2,3;something, ele)；
*   三个参数，并且每个参数都包含一个数字：.name(1,2,3)；
*   显式使用分号告诉编译器参数是一个逗号分割的 css 列表：.name(1,2,3;)；
*   用逗号分割的默认值：.name(@param1: red, blue)。？？？

定义多个具有相同名称和参数数量的 mixins 是合法的。符合条件的 mixins 的属性都会应用进来。

```less
.mixin(@color) { color-1: @color; }
.mixin(@color; @padding: 2px) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin:2px) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div { .mixin(#008000); }

/* 输出 */
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2px;
}
// 同时调用了 .mixin(@color) 和 .mixin(@color; @padding: 2px)
// 如果有多个 .mixin(@color)，每个.mixin(@color) 定义的属性都会应用进来
// 但 .mixin(@color; @padding) 就不符合了
```

### Named Parameters

A mixin reference can supply parameters values by their names instead of just positions. Any parameter can be referenced by its name and they do not have to be in any special order:

```less
.mixin(@color:black; @margin:10px; @padding:20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}

// compiles into:
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

### The @arguments Variable

@arguments has a special meaning inside mixins, it contains all the arguments passed, when the mixin was called. This is useful if you don't want to deal with individual parameters:

```less
.box-shadow(@x:0; @y:0; @blur:1px; @color:#000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}

// Which results in:
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

### Advanced Arguments and the @rest Variable

You can use ... if you want your mixin to take a variable number of arguments. Using this after a variable name will assign those arguments to the variable.

```less
.mixin(...) {        // matches 0-N arguments
.mixin() {           // matches exactly 0 arguments
.mixin(@a: 1) {      // matches 0-1 arguments
.mixin(@a: 1; ...) { // matches 0-N arguments
.mixin(@a; ...) {    // matches 1-N arguments
// Furthermore:
.mixin(@a; @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}
```

### 模式匹配 Pattern-matching

Sometimes, you may want to change the behavior of a mixin, based on the parameters you pass to it. Let's start with something basic:

```less
.mixin(@s; @color) { ... }
.class {
  .mixin(@switch; #888);
}

```

Now let's say we want .mixin to behave differently, based on the value of @switch, we could define .mixin as such:

```less
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

// Now, if we run:
@switch: light;
.class {
  .mixin(@switch; #888);
}
// We will get the following CSS:
.class {
  color: #a2a2a2;
  display: block;
}
```

Where the color passed to .mixin was lightened. If the value of @switch was dark, the result would be a darker color.

Here's what happened:

The first mixin definition didn't match because it expected dark as the first argument.

The second mixin definition matched, because it expected light.

The third mixin definition matched because it expected any value.

Only mixin definitions which matched were used. Variables match and bind to any value. Anything other than a variable matches only with a value equal to itself.

We can also match on arity, here's an example:

```less
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}
```

Now if we call .mixin with a single argument, we will get the output of the first definition, but if we call it with two arguments, we will get the second definition, namely @a faded to @b.

## Import Directives

在标准的CSS中，@import 必须在所有其他类型的规则之前，但 Less 中并无此限制。

### 文件扩展名 File Extensions

导入时，Less 会根据文件扩展名作出不同操作：

*   如果文件名带 .css 后缀，文件被作为 css 文件导入，即原封不动地复制进来；
*   如果文件名不带后缀，或者是其他后缀（不管是不是less），都被作为less文件导入。

```less
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a less file
@import "foo.css";  // statement left in place, as-is
```

当然，也可以通过下节介绍的的选项来改变默认行为。

### Import Options

```less
Less offers several extensions to the CSS @import CSS at-rule to provide more flexibility over what you can do with external files.
Syntax: @import (keyword) "filename";

The following import directives have been implemented:

reference: use a Less file but do not output it
inline: include the source file in the output but do not process it
less: treat the file as a Less file, no matter what the file extension
css: treat the file as a CSS file, no matter what the file extension
once: only include the file once (this is default behavior)
multiple: include the file multiple times
optional: continue compiling when file is not found
More than one keyword per @import is allowed, you will have to use commas to separate the keywords:
Example: @import (optional, reference) "foo.less";
```

## Mixin Guards
