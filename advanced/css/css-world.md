# CSS 世界


## 概述

那时候的网站前端技术关心的是图片和文字的呈现，所以 CSS2 生来就是为图文展示服务的。

和 CSS 有过亲密接触的人一定听过 **文档流** 这个概念。所谓 "流"，就是 CSS 世界中引导元素排列和定位的一条看不见的 "水流"。

**流体布局** 所谓流体布局，指的是利用元素 "流" 的特性实现的各类布局效果。因为 "流" 本身具有自适应特性，所以 "流体布局" 往往都是具有自适应性的。

`<table>` 的出现比 CSS 还要早，前面提到的 "流影响了整个 CSS 世界"，其中并不包括 `<table>`。

随着移动互联网以及硬件的发展带动 CSS 进入了新的世界。CSS3 的设计初衷是为了实现更丰富、更复杂的网页，所以基本上和 "流" 的关系不大。和 CSS2 相比 CSS3 就是一个全新的世界，更加丰富，更加规范，更加体系化，也更加复杂。


## 专业术语

**属性**，对应的是平常我们交谈时对 CSS 的称谓。

**值**，大多与数字挂钩，CSS 中值的分类非常广泛，如常见的 整数值、数值、百分比值、长度值、颜色值，此外还有字符串值、位置值等类型。在 CSS3 中还有角度值、频率值、时间值等类型。

**关键字**，指的是 CSS 里面很关键的单词，如 `transparent` `solid` `inherit` 等，其中 `inherit` 还可被细分为 "泛关键字"。

**变量**，CSS 中目前可以称为变量的比较有限，CSS3中的 `currentColor` 就是变量，非常有用。

**长度单位**，CSS 中的单位有时间单位(如 `s` `ms`)，还有角度单位(`deg` `rad` 等)，但最常见的自然还是长度单位(如 `px` `em` 等)。需要注意的是，诸如 `2%` 后面的百分号不是长度单位，`2%` 本身就是一个完整的值，等效于 `0.02`。

长度单位又可以细分为相对长度单位和绝对长度单位：
  * 相对字体长度单位，如 `em` `ex` 还有 CSS3 的 `rem` 和 `ch` (字符 0 的宽度)
  * 相对视区长度单位，如 `vh` `vw` `vmin` `vmax`
  * 绝对长度单位，最常见的就是 `px`，还有 `pt` `cm` `mm` `pc` 等稍作了解即可

**功能符**，以函数形式指定的值，主要用来表示颜色(`rgba` `hsl`)、背景图片地址(`url`)、元素属性值(`attr`)、计算(`calc`)和过渡效果。

**属性值**，属性冒号后面的所有内容统一称为属性值。如 `1px solid gray` 就可以称为属性值，它是由 "值+关键字+功能符" 构成的。属性值也可以由单一内容构成。

**声明**，属性名加上属性值就是声明。

**声明块**，声明块是花括号 `{}` 包裹的一些列声明。

**规则或规则集**，选择器加声明块就是一个规则集。

**选择器**，选择器就是用来瞄准目标元素的东西，包含 类选择器、ID 选择器、属性选择器、伪类选择器、伪元素选择器。

**关系选择器**，关系选择器是指根据与其他元素的关系选择元素的选择器，包含 后代选择器、相邻后代选择器、兄弟选择器、相邻兄弟选择器。

**@规则**，指的是以 `@` 字符开始的一些规则，像 `@media` `@font-face` `@page` `@support` 等。



## 流、元素、基本尺寸


## 盒尺寸四大家族

### 激进的 margin 属性

#### margin 与元素尺寸

##### 元素尺寸的相关概念

* **元素尺寸** 或 元素偏移尺寸，即元素的 border box 的尺寸，包含 padding 和 border。对应 jQuery 的 `$().outerWidth()` 和 `$().outerHeight()` 方法，对应 DOM 中的 `offsetWidth` 和 `offsetHeight` 属性。
* **元素内部尺寸** 或 元素可视尺寸，即元素的 padding box 的尺寸，含 padding 不含 border。对应 jQuery 的 `$().innerWidth()` `$().innerHeight()` 方法，对应 DOM 中的 `clientWidth` 和 `clientHeight` 属性。
* **元素外部尺寸** 即元素的 margin box 的尺寸，不仅包含 padding 和 border，还包括 margin。对应 jQuery 的 `$().outerWidth(true)` 和 `$().outerHeight(true)`，无对应 DOM 属性。外部尺寸可能为**负数**。

##### margin 与元素的内部尺寸


##### margin 与元素的外部尺寸

**滚动元素底部留白**

如果容器可以滚动，在 IE 和 Firefox 浏览器下是会忽略 `padding-bottom` 值的，Chrome 等浏览器不会。此时我们可以使用子元素的 `margin-bottom` 来实现滚动容器的底部留白。

**利用 margin 外部尺寸实现等高布局**

由于 `height: 100%` 需要在父级设定具体高度值时才有效，因此我们需要使用其他技巧来实现，方法其实很多，例如使用 `display: table-cell` 布局，左右两栏作为单元格处理，或者使用 `border` 边框来模拟，再或者使用我们这里的 margin 负值实现。

```css
.column-box { overflow: hidden; }
.column-left, .column-right { margin-bottom: -9999px; padding-bottom: 9999px; }
```

<div class="demo">
  <style>
    .column-box { overflow: hidden; }
    .column-left, .column-right { margin-bottom: -9999px; padding-bottom: 9999px; width: 200px; float: left; }
  </style>
  <div class="column-box">
    <div class="column-left" style="background-color: #34538b;">行一<br>行二</div>
    <div class="column-right" style="background-color: #cd0000;">行一</div>
  </div>
</div>

与 `padding` 不同，内联元素垂直方向的 `margin` 是没有任何影响的，既不会影响外部尺寸，也不会影响内部尺寸。

#### margin 的百分比值

和 padding 一样，margin 的百分比值都是相对于宽度计算的，但应用价值相对 padding 较低。

#### 正确看待 margin 合并

1\. 什么是 margin 合并

块级元素的上外边距和下外边距有时会合并为单一外边距，这种现象就是 margin 合并。
  * __块级元素__，但不包括浮动和绝对定位元素
  * 只发生在 __垂直方向__

2\. margin 合并的 3 种场景 

margin 合并有以下 3 种场景
  * 相邻兄弟元素 margin 合并
  * 父级和第一个/最后一个子元素，实际开发中，给我们带来麻烦的多半就是这里的父子 margin 合并
  * 空块级元素的 margin 合并，具有重大意义，但实际开发中不容易碰到问题

<div class="demo">
  <div>
    <div style="margin-top: 30px; border: 1px solid red;">
      子元素设定 `margin-top: 30px` 结果这个 30px 跑到父元素上去了
    </div>
    父元素
  </div>
</div>

那该如何阻止这里父子 margin 合并呢？
  * 对于 `margin-top` 合并，可以进行如下操作
    - 父元素设置为块级格式化上下文元素
    - 父元素设置 `border-top` 或 `padding-top` 值
    - 父元素和第一个子元素之间添加内联元素进行分隔
  * 对于 `margin-bottom` 合并，可以进行如下操作
    - 父元素设置为块级格式化上下文元素
    - 父元素设置 `border-bottom` 或 `padding-bottom` 值
    - 父元素和最后一个子元素之间添加内联元素进行分隔
    - 父元素设置 `height` `min-height` 或 `max-height`

<div class="demo">
  <div>
    <p style="margin: 1em 0;">第一行</p>
    <div style="margin: 1em 0;"></div>
    <p style="margin: 1em 0;">第二行</p>
  </div>
  <div class="desc">此示例中存在多次 margin 合并，首先是 div 的上下 margin 会进行一次合并，然后...</div>
</div>



3\. margin 合并的计算规则

正正取大值，正负值相加，负负最负值

4\. margin 合并的意义


#### 深入理解 margin: auto



#### margin 无效情形


