# CSS 编码规范 - Mark Otto

[codeguide](http://codeguide.co/#css-syntax) / 
[中文文档 - bootcss.com](http://codeguide.bootcss.com/#css) / 
[中文文档 - ZoomZhao](http://zoomzhao.github.io/code-guide/) 本笔记在以上内容基础上整理而成。


### 语法

* 用两个空格来代替制表符 tab -- 这是保证代码在各种环境下保持一致展现的唯一方式。
* 为选择器分组时，每行只能放置一个选择器。（个人认为 Sass 的配置更为合理）
* 为使代码易读，在每个声明块的左花括号前添加一个空格。
* 声明块的右花括号应当单独成行。
* 每条声明语句的冒号 `:` 后面应插入一个空格。
* 为了获得更准确的错误报告，每条声明都应该独占一行。
* 所有声明语句都应当以分号结尾。
* 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格，如 `box-shadow`。
* 但不要在 `rgb()`、`rgba()`、`hsl()`、`hsla()` 或 `rect()` _内部_ 的逗号后面插入空格。
* 对于属性值或颜色参数，省略小于 1 的小数前面的 0，例如，`.5` 代替 `0.5`；`-.5px` 代替 `-0.5px`。
* 十六进制值应该全部小写，如 `#fff`。小写字符更易于分辨。
* 尽量使用简写形式的十六进制值，例如，用 `#fff` 代替 `#ffffff`。
* 始终为选择器中的属性添加双引号，例如，`input[type="text"]`。
* 避免为 0 值指定单位，例如，用 `margin: 0;` 代替 `margin: 0px;`。

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

### 声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

1. 定位 Positioning
2. 盒模型 Box model
3. 排版 Typographic
4. 外观 Visual

由于定位可以从正常的文档流中移除元素，并且还能覆盖盒模型的相关样式，因此排在首位。  
盒模型排在第二位，因为它决定了组件的尺寸和位置。  
其他属性只在组件 _内部_ 起作用或者是不影响前两组属性，因此排在后面。  
完整的属性列表及其排列顺序请参考 [Recess](http://twitter.github.com/recess)。

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```

### 不要使用 `@import`

与 `<link>` 标签相比，`@import` 指令要慢很多，不光增加了 HTTP 请求次数，还会导致不可预料的问题。替代办法有以下几种：

*   使用多个 `<link>` 元素
*   通过 Sass 或 Less 之类的 CSS 预处理器将多个 CSS 文件编译为一个文件
*   使用其他打包器合并 CSS 文件

### 媒体查询的位置

尽量将媒体查询放在相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的案例。

```css
.element { ... }
.element-selected { ... }

@media (min-width: 480px) {
  .element { ...}
  .element-selected { ... }
}
```

### 带厂商前缀的属性

当使用厂商前缀属性时，通过缩进使每个属性的值在垂直方向对齐，以便于多行编辑。

```css
/* Prefixed properties */
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
          box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```

### 单条声明的声明块

在一个声明块中 **只包含一条声明** 的情况下，为了易读性和快速编辑可以考虑移除其中的换行。

因为在 CSS 校验器报错时，行号与错误声明还是能保证一一对应的。

```
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

### 简写形式的属性声明

应当尽量限制使用简写形式的属性声明，因为简写属性需要显式地设置所有的值，这会给属性值带来不必要的覆盖从而引起意外的副作用。常见的滥用情况如下：

*   `padding`
*   `margin`
*   `font`
*   `background`
*   `border`
*   `border-radius`

```css
/* Bad example */
.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}

/* Good example */
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```

### Less 和 Sass 中的嵌套

避免非必要的嵌套。可以使用嵌套并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套。

```css
// Without nesting
.table > thead > tr > th { … }
.table > thead > tr > td { … }

// With nesting
.table > thead > tr {
  > th { … }
  > td { … }
}
```

### Less 和 Sass 中的运算符

为了提高代码可读性，在数学运算外加一层括号，并用空格分隔值、变量、运算符。

```css
// Bad example
.element {
  margin: 10px 0 @variable*2 10px;
}

// Good example
.element {
  margin: 10px 0 (@variable * 2) 10px;
}
```

### 注释

代码是由人编写并维护的。请确保你的代码能够自描述、注释良好并且易于他人理解。好的代码注释能够传达上下文关系和代码目的。不要简单地重申组件或 class 名称。

对于较长的注释，务必书写完整的句子；对于一般性注解，可以书写简洁的短语。

```css
/* Bad example */
/* Modal header */
.modal-header {
  ...
}

/* Good example */
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
  ...
}
```

### Class 命名

* class 名称中只能出现小写字符和破折号 `-`。破折号用于类名间的分隔符。
* 避免过度使用简写。`.btn` 代表 _button_，但是 `.s` 不能表达任何意思。
* class 名称应当尽可能短，并且意义明确。
* 使用有意义的名称，而不要用纯表现形式的名称。
* 命名时使用最近的父节点或者父 class 作为前缀。
* 使用 `.js-*` class 来标识行为(与样式相对)，但不要将这些 class 包含到 CSS 文件中。

这些规则在创建 Sass 和 Less 变量名时同样有用。

```css
/* Bad example */
.t { ... }
.red { ... }
.header { ... }

/* Good example */
.tweet { ... }
.important { ... }
.tweet-header { ... }
```

### 选择器

* 对于通用元素，使用 “类” 而不用 “组合元素选择器” 来选择元素，这样利于渲染性能的优化。
* 避免少用属性选择器，如，`[class^="..."]`，这会影响浏览器性能。
* 选择器要尽可能短，每个组合选择器的选择器条目应该尽量控制在 3 个以内。
* **只**在必要的情况下使用后代选择器，如，没有使用带前缀 classes 的情况。

> 扩展阅读：
>
> * [Scope CSS classes with prefixes](http://markdotto.com/2012/02/16/scope-css-classes-with-prefixes/)
> * [Stop the cascade](http://markdotto.com/2012/03/02/stop-the-cascade/)

```css
/* Bad example */
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }

/* Good example */
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ... }
```

### 代码组织

* 以组件为单位组织代码。
* 制定一个一致的注释层级结构。
* 使用一致的空白来分割代码块，这样做在查看大的文档时更有优势。
* 当使用多个 CSS 文件时，通过组件而不是页面来区分他们。页面会被重新排列组合，而组件是可以移动的。

```css
/*
 * Component section heading
 */

.element { ... }

/*
 * Component section heading
 *
 * Sometimes you need to include optional context for the entire component. Do that up here if it's important enough.
 */

.element { ... }

/* Contextual sub-component or modifer */
.element-heading { ... }
```

### 编辑器配置

根据以下的设置来配置你的编辑器，来避免常见的代码不一致和丑陋的 diffs。

  * 使用两个空格来代替制表符。
  * 保存文件时删除尾部的空白字符。
  * 设置文件编码为 UTF-8。
  * 在文件结尾添加一个空白行。

参照本文档将这些设置添加到项目的 `.editorconfig` 文件中。可参照 [Bootstrap 中的 `.editorconfig` 文件](https://github.com/twbs/bootstrap/blob/master/.editorconfig)。更多信息请参考 [about EditorConfig](http://editorconfig.org)。

### 附表 - 属性顺序

recess 可以自动调整属性排列顺序，输出的文件就基本符合本规范了，不过发现处理 calc 函数时会出错。

```bash
npm install -g recess
recess --compile src.css > new.css
```

https://github.com/twitter/recess/blob/master/lib/lint/strict-property-order.js#L36

```
// css property order
'position', 'top', 'right', 'bottom', 'left', 'z-index'

'display', 'float', 'width', 'height', 'max-width', 'max-height', 'min-width', 'min-height'

'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'

'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'
'margin-collapse'
'margin-top-collapse', 'margin-right-collapse', 'margin-bottom-collapse', 'margin-left-collapse'

'overflow', 'overflow-x', 'overflow-y', 'clip', 'clear'

'font', 'font-family', 'font-size', 'font-smoothing', 'osx-font-smoothing', 'font-style', 'font-weight'

'hyphens'  // 设置如何分割单词以改善该段的布局
'src'

'line-height', 'letter-spacing', 'word-spacing', 'color'
'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-rendering'
'text-size-adjust', 'text-shadow', 'text-transform'
'word-break', 'word-wrap', 'white-space', 'vertical-align'

'list-style', 'list-style-type', 'list-style-position', 'list-style-image'

'pointer-events', 'cursor'

'background', 'background-attachment', 'background-color', 'background-image'
'background-position', 'background-repeat', 'background-size'

'border', 'border-collapse'
'border-top', 'border-right', 'border-bottom', 'border-left'
'border-color', 'border-image'
'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'
'border-spacing'
'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'
'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'
'border-radius',
'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius'
'border-radius-topright', 'border-radius-bottomright', 'border-radius-bottomleft', 'border-radius-topleft'

'content', 'quotes'
'outline', 'outline-offset'
'opacity', 'filter', 'visibility'
'size', 'zoom', 'transform'

'box-align', 'box-flex', 'box-orient', 'box-pack', 'box-shadow', 'box-sizing', 'table-layout'

'animation', 'animation-delay', 'animation-duration', 'animation-iteration-count'
'animation-name', 'animation-play-state', 'animation-timing-function', 'animation-fill-mode'

'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'

, 'background-clip'
, 'backface-visibility'
, 'resize'
, 'appearance'
, 'user-select'
, 'interpolation-mode'
, 'direction'
, 'marks'
, 'page'
, 'set-link-source'
, 'unicode-bidi'
, 'speak'
```
