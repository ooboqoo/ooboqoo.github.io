# CSS 基础

## CSS 概述

* CSS 指层叠样式表(Cascading Style Sheets)
* 样式定义如何显示 HTML 元素
* 把样式添加到 HTML4.0 中，是为了解决内容与表现分离的问题
* 样式通常存储在样式表中
* 多个样式定义可层叠为一

### 样式解决了一个普遍的问题

HTML 标签原本被设计为用于定义文档内容。文档布局由浏览器来完成，而不使用任何的格式化标签。

由于两种主要的浏览器(Netscape 和 IE)不断地将新的 HTML 标签和属性(比如字体标签和颜色属性)添加到 HTML 规范中，创建文档内容清晰地独立于文档表现层的站点变得越来越困难。为了解决这个问题，万维网联盟(W3C)在 HTML4.0 之外创造出样式(Style)。

### 样式表极大地提高了工作效率

通过仅仅编辑一个简单的 CSS 文档，外部样式表使你有能力同时改变站点中所有页面的布局和外观。

由于允许同时控制多重页面的样式和布局，CSS 可以称得上 WEB 设计领域的一个突破。

### 多重样式将层叠为一个

样式表允许以多种方式规定样式信息。样式可以规定在单个的 HTML 元素中，在 HTML 页的头元素中，或在一个外部的 CSS 文件中。甚至可以在同一个 HTML 文档内部引用多个外部样式表。

#### 层叠次序

当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式呢？一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。

1. 浏览器缺省设置
2. 外部样式表
3. 内部样式表 `<head><style type="text/css">div { color: #fff; }</style></head>`
4. 内联样式 `<div style="color: #fff;"></div>`


## CSS 语法

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明。  
选择器通常是您需要改变样式的 HTML 元素。每条声明由一个属性和一个值组成。

```text
selector { property: value; declaration2; ... declarationN }
```

```css
h1 { color: red; font-size: 14px; }
```


### 值的不同写法和单位

除了英文单词 `red`，我们还可以使用十六进制的颜色值 `#ff0000`：`p { color: #ff0000; }`

为了节约字节，我们可以使用 CSS 的缩写形式：`p { color: #f00; }`

我们还可以通过两种方法使用 RGB 值：`p { color: rgb(255, 0, 0); }` `p { color: rgb(100%, 0%, 0%); }`

请注意，当使用 RGB 百分比时，即使当值为 0 时也要写百分比符号。但是在其他的情况下就不需要这么做了。比如说，当尺寸为 0 像素时，0 之后不需要使用 px 单位，因为 0 就是 0，无论单位是什么。

### 记得写引号

提示：如果值为若干单词，则要给值加引号：`p { font-family: "sans serif"; }`

### 多重声明

提示：如果要定义不止一个声明，则需要用分号将每个声明分开。最后一条规则是不需要加分号的，因为分号在英语中是一个分隔符号，不是结束符号。然而，大多数有经验的设计师会在每条声明的末尾都加上分号，这么做的好处是，当你从现有的规则中增减声明时，会尽可能地减少出错的可能性。就像这样：`p { text-align: center; color: red; }`

### 空格和大小写

是否包含空格不会影响 CSS 在浏览器的工作效果，同样，与 XHTML 不同，**CSS 对大小写不敏感**。不过存在一个例外：如果涉及到与 HTML 文档一起工作的话，**class 和 id 名称对大小写是敏感的**。


## CSS 高级语法

### 选择器的分组

你可以对选择器进行分组，这样，被分组的选择器就可以分享相同的声明。用逗号将需要分组的选择器分开。

`h1, h2, h3, h4, h5, h6 { color: green; }`

### 继承及其问题

根据 CSS，子元素从父元素继承属性，元素的子元素也一样。

如果你不希望 "Verdana, sans-serif" 字体被所有的子元素继承，又该怎么做呢？比方说，你希望段落的字体是 Times。没问题。创建一个针对 p 的特殊规则，这样它就会摆脱父元素的规则：

```css
body { font-family: Verdana, sans-serif; }
td, ul, ol, ul, li, dl, dt, dd { font-family: Verdana, sans-serif; }
p { font-family: Times, "Times New Roman", serif; }
```

### 派生选择器

通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁。

在 CSS1 中被称为上下文选择器(contextual selectors)，在 CSS2 中，它们称为派生选择器。

比方说，你希望列表中的 strong 元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：

```html
<style>li strong {font-style: italic; font-weight: normal;}</style>
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong></p>
<ol><li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li></ol>
```

### id 选择器

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。id 选择器以 "#" 来定义。

```css
#sidebar { border: 1px dotted #000; padding: 10px; }
```

注意：id 属性只能在每个 HTML 文档中出现一次。

#### id 选择器和派生选择器

在现代布局中，id 选择器常常用于建立派生选择器。

```css
#sidebar p { font-style: italic; }
```

id 的元素只能在文档中出现一次，而 id 选择器作为派生选择器可以被使用很多次：

```css
#sidebar h2 {... }
#sidebar p {... }
```

### 类选择器

在 CSS 中，类选择器以一个点号显示：

```css
.center {text-align: center}
```

注意：类名的第一个字符不能使用数字！它无法在 Mozilla 或 Firefox 中起作用。

和 id 一样，class 也可被用作派生选择器：

```css
.fancy td {... }
```

元素也可以基于它们的类而被选择：

```css
td.fancy {... }
```

### 属性选择器

可以为拥有指定属性的 HTML 元素设置样式，而不仅限于 class 和 id 属性。

注：只有在规定了 !DOCTYPE 时，IE7 和 IE8 才支持属性选择器。

#### 属性选择器

下面的例子为带有 title 属性的所有元素设置样式：

```css
[title] { color: red; }
```

#### 属性和值选择器

下面的例子为 title="W3School" 的所有元素设置样式：

```css
[title=W3School] { border: 5px solid blue; }  /* 值两边的引号一般不写 */
```

#### 属性和值选择器 - 多个值

下面的例子为包含指定值的 title 属性的所有元素设置样式。适用于由空格分隔的属性值：

```css
[title~=hello] { color:red; }
```

下面的例子为带有包含指定值的 lang 属性的所有元素设置样式。适用于由连字符分隔的属性值：

```css
[lang|=en] { color:red; }
```

### 设置表单的样式

属性选择器在为不带有 class 或 id 的表单设置样式时特别有用：

```css
input[type="text"] {... }  
input[type="button"] {... }
```


## 如何创建 CSS

插入样式表的方法有三种：

### 外部样式表

当样式需要应用于很多页面时，外部样式表将是理想的选择。你可以通过改变一个文件来改变整个站点的外观。

```html
<head><link rel="stylesheet" href="mystyle.css" /></head>
```

样式表应该以 .css 扩展名进行保存，文件不能包含任何的 html 标签。

```css
hr {color: sienna;}  
p {margin-left: 20px;}
```

不要在属性值与单位之间留有空格，如 “margin-left: 20 px” 仅在 IE6 中有效，在 Firefox 或 Netscape 中无效。

### 内部样式表

当单个文档需要特殊的样式时，就应该使用内部样式表。

```html
<head>
<style type="text/css">
    hr {color: sienna;} p {margin-left: 20px;}
</style>
</head>
```

### 内联样式

由于要将表现和内容混杂在一起，内联样式会损失掉样式表的许多优势，请慎用这种方法。

要使用内联样式，你需要在相关的标签内使用样式 `style` 属性。

```html
<p style="color: sienna; margin-left: 20px">This is a paragraph</p>
```

