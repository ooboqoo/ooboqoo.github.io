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

**变量**，CSS 中目前可以称为变量的比较有限，CSS3 中的 `currentColor` 就是变量，非常有用。

**长度单位**，CSS 中的单位有时间单位(如 `s` `ms`)，还有角度单位(`deg` `rad` 等)，但最常见的自然还是长度单位(如 `px` `em` 等)。需要注意的是，诸如 `2%` 后面的百分号不是长度单位，`2%` 本身就是一个完整的值，等效于 `0.02`。

长度单位又可以细分为相对长度单位和绝对长度单位：
  * 相对字体长度单位，如 `em` `ex` 还有 CSS3 的 `rem` 和 `ch` (字符 0 的宽度)
  * 相对视区长度单位，如 `vh` `vw` `vmin` `vmax`
  * 绝对长度单位，最常见的就是 `px`，还有 `pt` `cm` `mm` `pc` 等稍作了解即可

**功能符**，以函数形式指定的值，主要用来表示颜色(`rgba` `hsl`)、背景图片地址(`url`)、元素属性值(`attr`)、计算(`calc`)和过渡效果。

**属性值**，属性冒号后面的所有内容统一称为属性值。如 `1px solid gray` 就可以称为属性值，它是由 "值+关键字+功能符" 构成的。属性值也可以由单一内容构成。

**声明**，属性名加上属性值就是声明。

**声明块**，声明块是花括号 `{}` 包裹的一系列声明。

**规则或规则集**，选择器加声明块就是一个规则集。

**选择器**，选择器就是用来瞄准目标元素的东西，包含 类选择器、ID 选择器、属性选择器、伪类选择器、伪元素选择器。

**关系选择器**，关系选择器是指根据与其他元素的关系选择元素的选择器，包含 后代选择器、相邻后代选择器、兄弟选择器、相邻兄弟选择器。

**@规则**，指的是以 `@` 字符开始的一些规则，像 `@media` `@font-face` `@page` `@support` 等。


## 流、元素、基本尺寸

### 块级元素

常见的块级元素 block-level element 有 `<div>` `<li>` `<table>`。需要注意的是，"块级元素" 和 `display:block` 的元素是不完全等同的，`li {display:list-item}` `table {display:table}` 但它们均是块级元素，因为它们都符合块级元素的基本特征，也就是一个水平流上只能单独显示一个元素。

#### 标记盒子、容器盒子

设计 CSS 时，先有**块级盒子** block-level box 和**内联盒子** inline box，块级盒子负责结构，内联盒子负责内容。

后面出现了 `list-item` 默认要显示项目符号，于是又增加了个附加盒子，学名**标记盒子** marker box，专门用来放圆点、数字这些项目符号。

后来又出现了 `display:inline-block` 元素，穿着 `inline` 的皮藏着 `block` 的心，现有的盒子没法解释，于是又新增一个盒子，最终**每个元素都有两个盒子：外在盒子+内在盒子**，外在盒子负责元素是可以一行显示还是只能换行显示，内在盒子负责宽高、内容呈现等。内在盒子学名叫**容器盒子**。

有了两层盒子，`inline-block` 就很好解释了。遵循这种理解，`display:block` 可以脑补成 `display:block-block`，`display:table` 应该脑补成 `display:block-table`。

### width/height 作用细节

#### width:auto

`width` 的默认值是 `auto`，因为是默认值，所以出镜率不高，但它至少包含了以下4种不同的宽度表现。
  * 充分利用可用空间 fill-available，`<div>` `<p>` 这些元素的宽度默认是 100% 于父级容器的。
  * 收缩与包裹 fit-content，典型代表就是浮动、绝对定位、inline-block 元素或 table 元素，根据内容确定宽度。
  * 收缩到最小 min-content，这个最容易出现在 `table-layout:auto` 的表格中。
  * 超出容器限制 max-content，正常宽度都不会超过父级容器宽度，但也存在一些特殊情况，如内容很长的连续的英文和数字，或者内联元素被设置了 `white-space:nowrap`。

##### 外部尺寸与流体特性

**流动性丢失**

表现为 "外部尺寸" 的块级元素一旦设置了宽度，流动性就丢失了。所谓流动性，并不是看上去的宽度 100% 显示这么简单，而是一种 margin border padding 和内容区域自动分配水平空间的机制。

```css
a {
  display: block;
  width: 100%;    /* 画蛇添足，导致流动性丢失 */
}
```

<div class="demo">
  <style>
  .nav-a {
    display: block;
    margin: 0 10px;
    padding: 9px 10px;
    border-bottom: 1px solid #b70000;
    border-top: 1px solid #de3636;
    color: #fff;
  }
  </style>
  <div class="nav" style="width: 300px; background-color: #cd0000;">
    <a class="nav-a">导航1</a>
    <a class="nav-a">导航2</a>
    <a class="nav-a" style="width: 100%;">导航3 (width:100% 惹的祸)</a>
  </div>
</div>

**格式化宽度**

在默认情况下，绝对定位元素(`absolute` 或 `fixed`)的宽度表现是"包裹性"，宽度由内部尺寸决定，但存在一种特例情况。对于非替换元素，当 left/right 或 top/bottom 对立方位的属性值同时存在的时候，元素的宽度表现为 "格式化宽度"，其宽度大小相对于最近的具有定位特性的祖先元素计算。

```css
div { position: absolute; left: 20px; right: 20px; }
```

##### 内部尺寸与流体特性

**包裹性**

所谓内部尺寸，简单来讲就是元素的尺寸由内部的元素决定，而非由外部的容器决定。

按钮是 CSS 世界中极具代表性的 inline-block 元素，可谓是展示**包裹性**最好的例子，具体表现为：按钮文字越多宽度越宽(**内部尺寸特性**)，但如果文字足够多，则会在容器的宽度处自动换行(**自适应特性**)。

按钮会自动换行？没错，你之所以没印象，可能是因为
  * 实际项目中按钮上的文字个数比较有限，没机会换行。
  * `<button>` 标签按钮才会自动换行，`<input>` 标签按钮，默认 `white-space:pre` 是不会换行的。

```css
.box { text-align: center; }
.content { display: inline-block; text-align: left; }
```

<div class="demo">
  <style>
    .box { float: left; width: 200px; margin: 10px; padding: 10px; background-color: #cd0000; text-align: center; }
    .content { display: inline-block; text-align: left; color: #fff; }
  </style>
  <div class="box"><p class="content">文字内容</p></div>
  <div class="box"><p class="content">文字内容-新增文字-新增文字-新增文字-新增文字</p></div>
  <div style="clear: both;"></div>
  <div class="desc">包裹性在实际开发中的应用：文字少的时候居中显示，文字超过一行居左显示</div>
</div>

**首选最小宽度**

假设外部容器的宽度是 0，请问里面的 inline-block 元素的宽度时多少？是 0？不是。在 CSS 世界中，图片和文字的权重要远大于布局，因此，CSS 的设计者显然是不会让 `width:auto` 时宽度变成 0 的，此时所表现的宽度就是 "首选最小宽度"：
  * CJK文字最小宽度为每个汉字的宽度
  * 西方文字最小宽度由特定的连续的英文字符单元决定

<div class="demo">
  <style>
.ao { display: inline-block; width: 0; font-size: 14px; line-height: 18px; }
.ao::before { content: attr(title); outline: 2px solid #cd0000; font-family: Consolas,monospace; }
/* 这里使用了 attr 是为了规避双引号被 marked 自动转义问题 */
  </style>
  <span class="ao" title="love你love"></span>
</div>

**最大宽度**

最大宽度实际等同于包裹性元素设置 `withe-space:nowrap` 声明后的宽度。如果内部没有块级元素或者块级元素没有设定宽度值，则最大宽度实际上是最大的连续内联盒子的宽度。

#### 宽度分离原则与 box-sizing

width 是作用在 "内在盒子" 上的，这个内在盒子由很多部分构成：content box + padding box + border box + margin box。

所谓宽度分离原则，就是 CSS 中的 width 属性不与影响宽度的 `padding` `border`(有时也含 `margin`)属性并存。

```css
/* 没有分离，最终的宽度可能是 102px */
.box { width: 100px; border: 1px solid; }

/* 宽度分离，宽度值确定 */
.father { width: 100px; }
.son { margin: 0 20px; padding: 20px; border: 1px solid; }
```

使用宽度分离原则需要多使用一层标签，而 `box-sizing` 的出现可以避免此问题，它可以改变 width 属性的作用细节。

```css
.box1 { box-sizing: content-box; }  /* 默认值 */
.box2 { box-sizing: padding-box; }  /* Firefox 曾支持过 */
.box3 { box-sizing: border-box; }   /* 全线支持 */
.box4 { box-sizing: margin-box; }   /* 从未支持过，基于...等理由，没有存在的价值 */
```

有的同行觉得默认的 `box-sizing:content-box` 有点反人类，因此进行全局重置，我是不喜欢这种做法的。我一向推崇的是充分利用元素本身的特性来实现我们想要的效果，足够简单纯粹。

在我看来，box-sizing 被发明出来最大的初衷应该是解决替换元素宽度自适应的问题。如 `<textarea>` 是替换元素，尺寸由内部元素决定，无论其 display 为 inline 还是 block，我们只能通过 width 设定让尺寸 100% 自适应父容器。于是 width/border 和 padding 注定要共存，同时还要整体宽度 100% 自适应容器。

```css
/* 不合理的重置 */
* { box-sizing: border-box }
/* 更合理的重置 */
input, textarea, img, video, object { box-sizing: border-box; }
```

#### height

##### height:auto

`height:auto` 要比 `width:auto` 简单单纯得多，基本就是一个套路：有几个元素盒子，每个多高，然后一加就是最终高度了。

淡然，涉及具体场景，就会有其他小故事，比方说元素 float 容器高度就没了，或者是 margin 直接穿过去，高度比预期的矮了，这些其实不是 height 的问题，具体后面对应属性章节会说明。

此外，height:auto 也有外部尺寸特性，但据我所知，其仅存在于绝对定位模型中，也就是 "格式化高度"。

##### height:100%

height 和 width 还有一个比较明显的区别就是对百分比单位的支持。对于 height 属性，如果父元素 height 为 auto，只要子元素在文档流中，其百分比值完全就被忽略。

为何父级元素没有具体高度值的时候，height:100% 会无效？要明白其中的原因要先了解浏览器渲染的基本原理。首先，先下载文档内容，加载头部的样式资源(如果有的话)，然后按照自上而下、自外而内的顺序渲染 DOM 内容。... 那么问题来了，为何宽度支持，高度就不支持呢？规范中其实给出了答案。如果包含块的高度没有显式指定(即高度由内容决定)，并且该元素不是绝对定位，则计算值为 auto，`'auto' * 100 / 100 = NaN` 大概就是这么个意思，算不了。而 width 的行为，规范中并未明确规定，浏览器实际都是按照包含块的真实计算值来作为百分比计算的基数。

> 个人感觉，这里作者用 NaN 的说法还是有点不合适，尺寸自上而下、自外而内计算，这没错，宽度就是这么确定的。而对于高度，正常都是根据内容来确定的，所以才没办法计算。而作者所反驳的，如果高度可计算会陷入死循环，其实说的也没问题。
> 或者更准确地说，宽度是自外向内确定的(除了包裹性这些特例)而高度更多时候是自内向外确定的...

高度百分比生效的条件 https://developer.mozilla.org/en-US/docs/Web/CSS/height  
  * 父元素明确指定高度，此时以指定高度为计算基准
  * 元素采用绝对定位，此时会逐层往上查找基准元素 relative absolute fixed

另外需要注意的是，绝对定位元素的百分比计算和非绝对定位元素的百分比计算是有区别的，绝对定位元素的宽高百分比是相对于 padding box 的，而非绝对定位元素则是相对于 content box 计算的。

 百分比计算 | 绝对定位元素            | 非绝对定位元素
------------|-------------------------|-----------------------------------------------------
宽度计算    | 定位元素的 padding box  | 父元素的 content box
高度计算    | 定位元素的 padding box  | 父元素的 content box (父元素无明确高度时设置项无效)

<div class="demo">
  <style>
  .wh-outer {
    position: relative;
    width: 500px;
    margin: 10px;
    padding: 10px;
    border: 15px solid gray;
    background-color: #eea;
    background-clip: content-box;
  }
  .wh-absolute {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
  }
  .wh-static {
    width: 100%;
    height: 100%;
    border: 1px solid green;
  }
  </style>
  <div class="wh-outer">
    <div class="wh-absolute">
      我是绝对定位元素，宽高百分比是相对于 padding box 计算的
    </div>
    <div class="wh-static">
      我是非绝对定位元素，宽高百分比是相对于 content box 计算的
    </div>
    <p>。。。</p>
  </div>
</div>

### min-width/max-width min-height/max-height

#### 为流体而生的 min-width/max-width

新手可能更多地会写 width/height 定死的砖头式布局，min-width/max-width 就没有任何出现的价值，随着 CSS 技能深入，能够兼顾还原性的同时还兼顾扩展性和适配性之后，min-width/max-width 才会用得越来越多。

```css
/* 既满足大屏的大气，又满足笔记本的良好显示 */
.container { min-width: 1200px; max-width: 1400px; }

/* 公众号文章中，避免图片在移动端展示过大影响体验 */
img { max-width: 100%; height: auto !important }  /* 这里 height 的设定是必须的，以保持图片宽高比例 */
```

#### 与众不同的初始值

width/height 的默认值是 `auto`；max-width/max-height 的初始值是 `none`；虽然 MDN 和 W3C WiKi 的文档上都显示 min-width/min-height 的初始值是 `0`，但是根据我的分析和测试，所有浏览器中的 min-width/min-height 的初始值是 `auto`。具体分析过程如下：
  * 证明 min-* 的 auto 为合法值，且预设值就是 auto
  * 证明初始值不是 0，设置初始值为 0 再修改值时 transition 有动画，而不预先设置值就没有动画效果

```html
<body style="min-width: auto; max-width: auto;">
document.body.style.minWidth  // 输出 'auto'
document.body.style.maxWidth  // 输出 ''
```

```css
.box { transition: min-height .3s; min-height: 0; }  /* 此时有动画效果，去掉 min-height 设置就没动画 */
.box:hover { min-height: 300px; }
```

#### 超越 !important 超越 max-*

max-width 与 width 并存时，max-width 完全碾压 width 设置，即使 width 带了 `!important`  
max-width 与 min-width 并存并起冲突时，min-width 设置碾压 max-width 设置  

#### 任意高度元素的展开收起动画技术

“展开收起” 效果是网页中比较常见的一种交互形式，通常的做法是控制 display 属性在 none 和其他值之间切换，虽说功能可以实现，但是效果略显生硬，所以就会有这样的需求——希望元素展开收起时能有明显的高度滑动效果。传统实现可以使用 jQuery 的 slideUp() 和 slideDown() 方法，但是移动端 CSS3 动画支持良好，首选 CSS。

首选方案是 height + overflow:hidden，但很多时候我们展开的元素内容是动态的，因此 height 使用的是默认值 auto，因为 auto 是关键字值，不是数字，无法形成 0px 到 auto 的过渡动画。

这里再推荐 max-height 的方案，选一个比展开内容高度大的值，此方案不足之处是，存在一个 "效果延迟"，所以选一个足够安全的最小值是此方案的关键。

> Chrome 67 实测不是延迟执行，而是动画会加速执行(动画时长成比例缩短)，就是延迟部分会被自动抹掉

```css
  .element { height: 0; overflow: hidden; transition: height .25s; }
  .element.active { height: auto; } /* 没有动画效果 */

  .element { max-height: 0; overflow: hidden; transition: height .25s; }
  .element.active { max-height: 666px; } /* 动画时长成比例缩短 */
```

<div class="demo">
  <style>
    .d311-height, .d311-max-height {overflow: hidden; transition: all 2s; border: 1px solid red; float: left;}

    .d311-height { height: 20px; }
    .d311-height.auto:hover { height: auto; }
    .d311-height.px60:hover { height: 60px; }

    .d311-max-height { max-height: 20px; }
    .d311-max-height:hover { max-height: 560px; }
  </style>
  <div>.
    <div class="d311-height auto">滑动展开 height:auto<br>:hover {height: auto}<br>行1<br>行2</div>
    <div class="d311-height px60">滑动展开 height:60px<br>:hover {height: 60px}<br>行1<br>行2</div>
    <div class="d311-max-height">滑动展开 max-height<br>max-height: 560px<br>行1<br>行2</div>
  </div>
</div>


### 内联元素




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


#### 深入理解 margin:auto



#### margin 无效情形


