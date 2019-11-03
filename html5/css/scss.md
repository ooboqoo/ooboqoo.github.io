# Sass & SCSS

<script>ooboqoo.contentsRegExp=/H[123]/</script>

https://sass-lang.com/guide 核心特性(Variables Nesting Modules Mixins Extend Operators)介绍  
http://sass-lang.com/documentation 详细文档

## 1. 概述

#### Install Sass

```bash
$ npm install -g sass
$ sass --watch input.scss output.css  # 监视文件变化，如果依赖了其他文件，其他文件变化时也会触发编译
$ sass --watch app/sass:dist/css      # 监视目录变化，输入输出之间用 `:` 分隔
```

#### Sass vs SCSS

Sass 的原生语法不用花括号和分号，靠缩进和换行来分隔选择符与属性，简洁但可读性。

而 SCSS 即 Sassy CSS，语法添加了花括号和分号，与 CSS 的风格保持了一致，SCSS 语法更受欢迎。

SCSS 是 CSS 的超集，所有 CSS 都是有效的 SCSS。

```scss
body
  color: $primary-color
```
```scss
body {
  color: $primary-color;
}
```

#### 编码 Encoding

Sass follows the [CSS spec](http://www.w3.org/TR/2013/WD-css-syntax-3-20130919/#determine-the-fallback-encoding) to determine the encoding of a stylesheet.

It will include a `@charset` declaration if and only if the output file contains non-ASCII characters.

```scss
@charset "utf-8";  // 出现中文时加这个以防异常
```


## 2. SassScript

In addition to the plain CSS property syntax, Sass supports a small set of extensions called SassScript. SassScript allows properties to use variables, arithmetic, and extra functions. SassScript can be used in any property value.

SassScript can also be used to generate selectors and property names, which is useful when writing mixins. This is done via interpolation.

### 2.1 变量 Variables

变量以 `$` 开头，多个单词之间推荐用 `-` 分隔。变量的引入为样式编辑带来了巨大的便利。

* Sass 的变量是有作用域的，划分依据以 `{}` 来划分
* 基于历史原因，`-` `_` 是等效的，但应该使用 `-`

```scss
$text-color: #222;
$header-height: 60px;

#header {
  color: $text-color;
  height: $header-height;
}
```

#### 2.1.1 局部变量与全局变量

Variables are only available within the level of nested selectors where they’re defined. If they’re defined outside of any nested selectors, they’re available everywhere. They can also be defined with the !global flag, in which case they’re also available everywhere.

```
$width: 5em;                  // 位于选择符外的是全局变量
#main {
    width: $width;
}

@mixin button-style {
    $btn-bg-color: lightblue;  // 局部变量
    color: $btn-bg-color;
}

#main {
  $width: 5em !global;         // 添加 !global 将局部变量转换成全局变量
  width: $width;
}
```

#### 2.1.2 关于变量的一些试验

```scss
$width: 1em;
#main1 {
  width: $width;  // 1em
}
$width: 2em;
#main2 {
  width: $width;  // 2em
}
#main3-1 {
  $width: 3em !default;    // `!default` 的相关介绍在 #3.8
  width: $width;  // 2em
}
#main3-2 {
  $width: null;            // `null` 对 `!default` 的影响
  $width: 3em !default;
  width: $width;  // 3em
}
#main4 {
  $width: 4em;
  width: $width;  // 4em
}
#main5 {
  width: $width;  // 2em
}
```

### 2.2 插值 Interpolation `#{}`

可以使用 `#{}` 在 selectors and property names 中插入变量。

虽然在 property values 中直接使用变量是最方便的，但也可以采用插值实现特殊的用法 -- 插值周边的运算符都会被当做普通文本。

```scss
$name: foo;
$attr: border;
$font-size: 12px;
$line-height: 30px;
p.#{$name} {
  #{$attr}-color: blue;
  font: #{$font-size}/#{$line-height};  // 运算符都被当做普通文本
  font-size: $font-size / $line-height;
}

// 输出：
p.foo {
  border-color: blue;
  font: 12px/30px;
  font-size: 0.4; }
```


### 2.3 数据类型 Data Types

SassScript supports seven main data types:

* numbers (e.g. `1.2`, `13`, `10px`)
* strings of text, with and without quotes (e.g. `"foo"`, `'bar'`, `baz`)
* colors (e.g. `blue`, `#04a3f9`, `rgba(255, 0, 0, 0.5)`)
* booleans (e.g. `true`, `false`)
* nulls (e.g. `null`)
* lists of values, separated by spaces or commas (e.g. `1.5em 1em 0 2em`, `Helvetica, Arial, sans-serif`)
* maps from one value to another (e.g. `(key1: value1, key2: value2)`)

SassScript also supports all other types of CSS property value, such as Unicode ranges and `!important` declarations. However, it has no special handling for these types. They’re treated just like unquoted strings.

#### Strings

CSS 中字符串可以同时使用 `""` `''` 或不带引号使用，Sass 中也完全一样，Sass 不会去转换格式。

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message('.header');

// 输出：
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

#### Lists

Lists are how Sass represents the values of CSS declarations like `margin: 10px 15px 0 0` or `font-face: Helvetica, Arial, sans-serif`. Lists are just a series of other values, separated by either spaces or commas. In fact, individual values count as lists too: they’re just lists with one item.

On their own, lists don’t do much, but the SassScript [**list functions**](http://sass-lang.com/documentation/Sass/Script/Functions.html#list-functions) make them useful. The `nth` function can access items in a list, the `join` function can join multiple lists together, and the `append` function can add items to lists. The `@each` directive can also add styles for each item in a list.

#### Maps

```scss
$map: (
  key: value,
  other-key: other-value
);
```

Sass 中的 map 与 json 格式有几分相似，最大的不同是，map 使用 `()` 来包裹，另外需要注意的是

* There are a lot of functions to let you manipulate maps
* Last key/value pair in a map can optionally be followed by an extra comma
* Keys must be unique
* Keys and values can be any Sass type, including lists and other maps.


### 2.4 运算符 Operators

http://sass-lang.com/documentation/file.SASS_REFERENCE.html#operations

All types support equality operations (`==` and `!=`). In addition, each type has its own operations that it has special support for.

#### Number Operations
#### Color Operations
#### String Operations
#### Boolean Operations
#### List Operations

#### 2.4 小括号 Parentheses

```scss
p {
  width: 1em + 2em * 3;    // 7em
  width: 1em + (2em * 3);  // 7em
  width: (1em + 2em) * 3;  // 9em
}
```


### 2.5 函数 Functions

#### 7.1 内置函数

```scss
p {
  color: darken(#800, 20%);             // 调暗 darken($color, $amount), $amount: 0%--100%
  color: lighten(hsl(0, 0%, 0%), 30%);  // 调亮 lighten($color, $amount), $amount: 0%--100%
  color: transparentize(#fefefe, 1);    // 调透明度 transparentize($color, $amount)
  color: opacify(#fefefe, .5);          // 调透明度 opacify($color, $amount), $amount: 0--1
}
```

#### 7.2 自定义函数 `@function`

```scss
@function sum($left, $right) {
  @return $left + $right;
}

@function em($pixels, $context: 16px) {
  @return ($pixels / $context) * 1em;
}

@function col-width($columns: 12, $page-width: 100%, $gap: 1%) {
  @return ($page-width - $gap * ($columns -1)) / $columns;
}

font-size: em(20px);    // 输出 font-size: 1.25em;
```



SassScript defines some useful functions that are called using the normal CSS function syntax.
See [this page](http://sass-lang.com/documentation/Sass/Script/Functions.html) for a full list of available functions.

```scss
p {
  // 调用方式1：简介，最常用
  color: hsl(0, 100%, 50%);                                 // red
  // 调用方式2：带参数名称，麻烦，但使用灵活，在特定情况下使用
  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);  // red
}
```

Named arguments can be passed in any order, and arguments with default values can be omitted. Since the named arguments are variable names, underscores and dashes can be used interchangeably.



### 2.7 `&` in SassScript

Just like when it’s used in selectors, `&` in SassScript refers to the current parent selector. It’s a comma-separated list of space-separated lists.

If there is no parent selector, the value of & will be null. This means you can use it in a mixin to detect whether a parent selector exists.

```sass
.foo.bar .baz.bang, .bip.qux {
  $selector: &;  // ((".foo.bar" ".baz.bang"), ".bip.qux")
}
```

### 2.8 Variable Defaults: `!default`

You can assign to variables if they aren’t already assigned by adding the `!default` flag to the end of the value. This means that if the variable has already been assigned to, it won’t be re-assigned, but if it doesn’t have a value yet, it will be given one. Variables with `null` values are treated as unassigned by `!default`.

### 2.9 注释

同其他语言一样，可以使用单行注释和多行注释，多行注释格式为 CSS 原生支持，会输出到 CSS 文件中，单行注释为 Sass 增强功能，不会输出到 css 文件。

```scss
/* 多行注释，会输出到 css 文件 */

/*
 * 多行注释，会输出到 css 文件
 */

/*! 多行注释 - 文件注释，即使选择 compressed 模式输出，也会保留，很适合放版权信息 */

// 单行注释不会输出到 css 文件
```

多行注释还支持插值：

```scss
$version: "1.2.3";
/* This CSS is generated by My Snazzy Framework version #{$version}. */    // 插值符号 #{}
```




## 3. 嵌套 Nesting

### 3.1 Nested Rules

Sass 使得编写样式也可以像 HTML 一样实现嵌套，比 CSS 的语法更加直观，但过深的嵌套不利于维护，应该避免。

```scss
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```

将编译成：

```css
#main {
  width: 97%; }
  #main p, #main div {
    font-size: 2em; }
    #main p a, #main div a {
      font-weight: bold; }
  #main pre {
    font-size: 3em; }
```

### 3.2 自定义父选择器位置  Referencing Parent Selectors: `&`

嵌套编译时，默认父选择器会放在最前面且后面有空格分隔，但有时，这种组合不是我们想要的，`&` 符号提供了控制父选择器位置的途径。另外，`&` 必须作为单独的选择符或者作为前缀使用，但不能出现在其他位置。

```scss
a {
  text-decoration: none;
  &:hover { text-decoration: underline; }  // 1 常见用法
  body.firefox & { font-weight: normal; }  // 2 还可以出现在其他位置
}

#main {
  &-sidebar { border: 1px solid; }         // 3 还可以带后缀使用，但像 sidebar-& 这样就不会解析，原样输出
}
```

### 3.3 Nested Properties

CSS 本身的一些属性如 font border 等相当于起了 “命名空间” 的作用，在 Sass 中你可以采用嵌套的写法避免逐条输入。

CSS has quite a few properties that are in “namespaces” for instance, font-family, font-size, and font-weight are all in the font namespace. In CSS, if you want to set a bunch of properties in the same namespace, you have to type it out each time. Sass provides a shortcut for this: just write the namespace once, then nest each of the sub-properties within it. For example:

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

The property namespace itself can also have a value. For example:

```scss
.funky {
  font: 20px/24px fantasy {
    weight: bold;
  }
}
```

is compiled to:

```css
.funky {
  font: 20px/24px fantasy;
    font-weight: bold;
}
```


## 4. 模块 Modules/Partials




## 5. 混入 Mixins

注：Sass 的写法还支持简写 `=` 换 `@mixin`, `+` 换 `@include`，但 SCSS 下并不支持。

### 5.1 定义 `@mixin`

### 5.2 使用 `@include`

### 5.3 参数 Arguments

```scss
// 1 普通混入
@mixin warning {
  background-color: orange;
  color: #fff;
}

.warning-button {
  @include warning;
  padding: 8px 12px;
}

// 2 带参混入
@mixin rounded($radius) {
  border-radius: $radius;
}

// 3 带参混入 - 默认值
@mixin box($radius: 6px, $border: 1px solid #000) {
  @include round($radius);
  border: $border;
}

// 4 带参混入 - 扩展符号
@mixin box-shadow($shadows...) {    // 通过附加扩展符号，可以实现多参传入
  box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
}

#header {
  @include box($border: 1px solid #fff, $radius: 12px)  // 参数顺序可以随意
  @include box($border: 1px solid #fff)                 // 可以省略参数(前提是省略参数带默认值)
  @include box-shadow(2px 0 4px #999, 1px 1px 6px $secondary-color);
}
```

### 5.4 插槽 `@content`

```scss
@mixin apply-to-ie6 {
  * html { @content; }
}
@include apply-to-ie6 {
  body { font-size: 125% }
}

// 最终输出的效果
* html {
  body { font-size: 125%; }
}
```


## 6. 扩展 Extend/Inheritance

### Placeholder Selectors: `%foo`

`%类名` 符号用来创建专用于 @extend 的类，其本身不会输出的 css 文件中。

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
}

.notice {
  @extend %extreme;
}

// 输出:
#context a.notice {
  color: blue; }
```



## 8. 指令 Directives

Sass supports all CSS3 **@-rules**, as well as some additional Sass-specific ones known as “**directives**”. These have various effects in Sass, detailed below. See also **control directives** and **mixin directives**.

### 4.1 @import

CSS 原生支持 `@import`，但其缺点是，每次 inport 都会产生一个 HTTP 请求，而 Sass 则会将这些部件编译到一个文件内。

Sass 不仅支持导入自己的 scss 文件，同时也支持 CSS 的原生 `@import` 指令（这种情况下，css 文件不会被嵌入进来）：

```scss
// 以下情况都会以 css 规则处理 --- 也就是不做处理，原样保留
@import url(foo);               // url()
@import "http://";              // 文件名以 http:// 开头
@import "filename.css";         // 文件名后缀为 .css，注意，不带后缀使用的 css 文件还是会被编译到一起的
@import "style-screen" screen;  // 带媒体查询
```

Sass 还支持插值啊什么的

```scss
@mixin google-font($font) {
  $font: unquote($font);
  @import url(https://fonts.googleapis.com/css?family=#{$font})  // #{$font} 
}
@include google-font("Titllium+web");

// 输出
@import url(https://fonts.googleapis.com/css?family=Titllium+web);
h1 { font-family: "Tillium Web"; }
```

#### 4.1.1 部件 Partials

If you have a SCSS or Sass file that you want to import but don’t want to compile to a CSS file, you can add an underscore to the beginning of the filename. This will tell Sass not to compile it to a normal CSS file. You can then import these files without using the underscore.

部件可以将 css 编辑工作模块化。部件默认以下划线`_`开头，如 `_variables.scss`。部件不会单独输出 CSS 文件。

```scss
// 在其他文件中导入 _variables.scss
@import "variables";  // 不需要前面的下划线，也不用扩展名，解析器会自动处理
```

#### 4.1.2 Nested `@import`

Although most of the time it’s most useful to just have `@import`s at the top level of the document, it is possible to include them within CSS rules and `@media` rules.

### 4.2 `@media`

@media directives in Sass behave just like they do in plain CSS, with one extra capability: they can be nested in CSS rules. If a @media directive appears within a CSS rule, it will be bubbled up to the top level of the stylesheet, putting all the selectors on the way inside the rule.

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {  // @media 会自动冒泡到最外层
    width: 500px;
  }
}

// 输出
.sidebar { width: 300px; }
@media screen and (orientation: landscape) {
  .sidebar { width: 500px; }
}
```


### 4.3 `@extend`

使用 `@mixin` 会复制所有定义，而 `@extend` 只会将选择器添加到基类，可以减小 CSS 尺寸。

`@extend` works by inserting the extending selector anywhere in the stylesheet that the extended selector appears.

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
.success {
  @extend .message;
  border-color: green;
}
.error {
  @extend .message;
  border-color: red;
}

// 输出
.message, .success, .error {  // 
  border: 1px solid #ccc;
  padding: 10px;
  color: #333; }
.success {
  border-color: green; }
.error {
  border-color: red; }
```

#### 4.3.2 Multiple Extends

```scss
.error {
  background-color: #fdd;
}
.attention {
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}

// 输出
.error, .seriousError {
  background-color: #fdd; }
.attention, .seriousError {
  background-color: #ff0; }
.seriousError {
  border-width: 3px; }
```

#### 4.3.3 Chaining Extends

```scss
.error {
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
}

// 输出
.error, .seriousError, .criticalError {
  background-color: #fdd; }
.seriousError, .criticalError {
  border-width: 3px; }
.criticalError {
  position: fixed; }
```

#### 4.3.5 `@extend`-Only Selectors

就像 `#` `.` 分别作为 id 和 class 的前缀一样，sass 定义了 `%` 来表示仅供继承的特殊类，其自身不会输出到 css。

```
a.important%forextend1 %forextend2 {
  color: yellow;
}
.notice {
  @extend %forextend2;
  .again {
    @extend %forextend1;
  }
}

// 输出
.notice a.important.again .notice {
  color: yellow; }
```

#### 4.3.6 可选继承标志 The `!optional` Flag

如果 `@extend` 执行失败，就会报错，而添加 `!optional` 可使其忽略继承失败。

```scss
a.important {
  @extend .notice !optional;  // 存在 .notice 就继承否则忽略
}
```


