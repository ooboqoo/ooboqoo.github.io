# CSS 世界 1-4


## 概述

那时候的网站前端技术关心的是图片和文字的呈现，所以 CSS2 生来就是为图文展示服务的。

和 CSS 有过亲密接触的人一定听过 **文档流** 这个概念。所谓 "流"，就是 CSS 世界中引导元素排列和定位的一条看不见的 "水流"。

**流体布局** 所谓流体布局，指的是利用元素 "流" 的特性实现的各类布局效果。因为 "流" 本身具有自适应特性，所以 "流体布局" 往往都是具有自适应性的。

`<table>` 的出现比 CSS 还要早，前面提到的 "流影响了整个 CSS 世界"，其中并不包括 `<table>`。

随着移动互联网以及硬件的发展带动 CSS 进入了新的世界。CSS3 的设计初衷是为了实现更丰富、更复杂的网页，所以基本上和 "流" 的关系不大。和 CSS2 相比 CSS3 就是一个全新的世界，更加丰富，更加规范，更加体系化，也更加复杂。


## 专业术语

**属性**，对应的是平常我们交谈时对 CSS 的称谓。

**值**，大多与数字挂钩，CSS 中值的分类非常广泛，如常见的 整数值、数值、百分比值、长度值、颜色值，此外还有字符串值、位置值等类型。在 CSS3 中还有角度值、频率值、时间值等类型。

**关键字**，指的是 CSS 里面很关键的单词，如 `transparent` `solid` `inherit` 等，其中 `inherit` 等还可被细分为 **泛关键字**。

**变量**，CSS 中目前可以称为变量的比较有限，CSS3 中的 `currentColor` 就是变量，非常有用。

**长度单位**，CSS 中的单位有时间单位(如 `s` `ms`)，还有角度单位(`deg` `rad` 等)，但最常见的自然还是长度单位(如 `px` `em` 等)。需要注意的是，诸如 `2%` 后面的百分号不是长度单位，`2%` 本身就是一个完整的值，等效于 `0.02`。

长度单位又可以细分为相对长度单位和绝对长度单位：
  * 相对字体长度单位，如 `em`(字符 M 的高度) `ex`(字符 x 的高度) 还有 CSS3 的 `rem` 和 `ch` (字符 0 的宽度)
  * 相对视区长度单位，如 `vh` `vw` `vmin` `vmax`
  * 绝对长度单位，最常见的就是 `px`，还有 `pt` `cm` `mm` `pc` 等稍作了解即可

**功能符**，以函数形式指定的值，主要用来表示颜色(`rgba` `hsl`)、背景图片地址(`url`)、元素属性值(`attr`)、计算(`calc`)和过渡效果。

**属性值**，属性冒号后面的所有内容统一称为属性值。如 `1px solid gray` 就可以称为属性值，它是由 "值、关键字、功能符" 构成的。属性值也可以由单一内容构成。

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

假设外部容器的宽度是 0，请问里面的 inline-block 元素的宽度是多少？是 0？不是。在 CSS 世界中，图片和文字的权重要远大于布局，因此，CSS 的设计者显然是不会让 `width:auto` 时宽度变成 0 的，此时所表现的宽度就是 "首选最小宽度"：
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

**height:auto**

`height:auto` 要比 `width:auto` 简单单纯得多，基本就是一个套路：有几个元素盒子，每个多高，然后一加就是最终高度了。

当然，涉及具体场景，就会有其他小故事，比方说元素 float，容器高度就没了，或者是 margin 直接穿过去，高度比预期的矮了，这些其实不是 height 的问题，具体后面对应属性章节会说明。

此外，height:auto 也有外部尺寸特性，但据我所知，其仅存在于绝对定位模型中，也就是 "格式化高度"。

**height:100%**

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
    .c3-height, .c3-max-height {overflow: hidden; transition: all 2s; border: 1px solid red; float: left;}

    .c3-height { height: 20px; }
    .c3-height.auto:hover { height: auto; }
    .c3-height.px60:hover { height: 60px; }

    .c3-max-height { max-height: 20px; }
    .c3-max-height:hover { max-height: 560px; }
  </style>
  <div>.
    <div class="c3-height auto">滑动展开 height:auto<br>:hover {height: auto}<br>行1</div>
    <div class="c3-height px60">滑动展开 height:60px<br>:hover {height: 60px}<br>行1<br>行2</div>
    <div class="c3-max-height">滑动展开 max-height<br>max-height: 560px<br>行1</div>
  </div>
</div>

### 内联元素

在 CSS 世界中，内联元素是最为重要的，涉及的 CSS 属性也非常之多，这些 CSS 属性往往具有继承性，混合在一起会导致 CSS 解析规则非常复杂。这就是内联元素的解析比块级元素解析更难理解的原因——其是多个属性共同作用的结果，需要对内联元素特性，内联盒模型以及当前 CSS 属性都了解，才能明白其中的原因。

就行为表现来看，"内联元素" 的典型特征就是可以和文字在一行显示。

#### 内联盒模型

这里的内容可谓是 CSS 进阶标志知识点，是入门 CSS 开发人员和熟练 CSS 开发人员之间的分水岭，需要反复体会。

```html
<p>这是一行普通的文字，这里有个<em>em</em>标签</p>
```

上面这段很普通的 HTML 实际上包含了很多术语和概念，或者说包含了很多种盒子。
  * 内容区域 content area -- 指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制；对于图片这样的替换元素，内容区域可以看成是元素自身。实际上，内容区域并没有明确的定义，为了学习方便，可以简单地理解为文本选中的区域。
  * 内联盒子 inline box -- 这里的内联盒子实际指的是用来决定元素是内联还是块级的 "外在盒子"，该盒子又可以细分为 "内联盒子" 和 "匿名内联盒子"。
  * 行框盒子 line box -- 每一行就是一个行框盒子。
  * 包含盒子 containing box -- 标签就是一个包含盒子，此盒子由一行一行的行框盒子组成。在 CSS 规范中，并没有 "包含盒子" 的说法，更准确的称呼应该是 "包含块" containing block。

#### 幽灵空白节点

Each line box starts with a zero-width inline box with the element's font and line height properties. We call that imaginary box a "strut".

"幽灵空白节点" 是内联盒模型中非常重要的一个概念，具体指的是：在 HTML5 文档中，内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个 "空白节点" 一样，这个空白节点不占据任何宽度，看不见也无法通过脚本获取，就像幽灵一样，但又确确实实地存在。理解 "幽灵空白节点" 的存在是理解后续很多内联元素为何会这么表现的基础。

<div class="demo">
  <div style="background-color: #cd0000;"><span style="display: inline-block; line-height: 48px;"></span></div>
  <div class="desc">
    试验注意项：这里 span 的 inline-block 必须要有；且必须是是 HTML5 文档类型。<br>
    试验现象：span 的高度是 0，但 div 的高度却不是 0<br>
    调试：当给 span 内添加内容，div 会被撑高。说明 span 没有内容时，div 是被其他元素撑高的
  </div>
</div>


## 盒尺寸四大家族

盒尺寸中的 4 个盒子 content box、padding box、border box 和 margin box 分别对应 CSS 世界中的 content、padding、border 和 margin 属性，我把这 4 个属性称为 "盒尺寸四大家族"。

### 深入理解 content

#### content 与替换元素

通过修改某个属性值呈现的内容就可以被替换的元素就称为 **替换元素**。因此 `img` `object` `video` `iframe` 和表单元素 `textarea` `input` 都是典型的替换元素。

替换元素除了内容可替换这一特性以外，还有以下一些特性：
  * 内容的外观不受页面上的 CSS 的影响，
  * 有自己的尺寸，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸(不含边框)是 300px*150px，如 `video` `iframe` `canvas` 等，也有少部分替换元素为 0px，如 `img`，而表单元素的替换元素尺寸则和浏览器有关，无明显规律。
  * 在很多 CSS 属性上有自己的一套表现规则，如 vertical-align: baseline，对非替换元素，就是字符 x 的下边缘，而在替换元素中，基线被定义成了元素的下边缘。

所有的替换元素都是内联水平元素，默认的 `display` 为 inline 或 inline-block。

**替换元素的尺寸计算规则**

我个人将替换元素的尺寸从内而外分为 3 类：固有尺寸、HTML尺寸 和 CSS尺寸。
  * 固有尺寸指的是替换内容原本的尺寸，像图片、视频作为独立文件存在时，都是有着自己的宽度和高度的，而表单类替换元素，默认的 font-size padding margin 属性值全部使用 px 作为单位(因此尺寸是固定的)
  * HTML尺寸，即 HTML 原生属性确定的值，如 img 的 width height; input 的 size; textarea 的 cols rows
  * CSS尺寸，特指可以通过 width height 或者 max-width min-width max-height min-height 设置的尺寸

这三种尺寸的权重关系为 CSS尺寸 > HTML尺寸 > 固有尺寸

video canvas iframe 等元素在无实际内容时，固有尺寸都是 300x150，但 img 元素却是个例外，各个浏览器下的表现并不一致，IE 下为 28x30 Chrome 下是 0x0 Firefix 下是 0x22。

> Web 开发的时候，为了提高加载性能和节约带宽，首屏以下的图片就会通过滚屏加载的方式异步加载，然后，这个即将被异步加载的图片为了布局稳健、体验良好，往往会使用一张透明的图片占位，如 `<img src="transparent.png">`，其实，这个透明的占位图片也是多余的资源，直接 `<img>` 再配合CSS样式 `img { visibility: hidden; } img[src] { visibility: visible; }` 就可以实现一样的效果。注意，这里的 `<img>` 直接没有 `src` 属性，而不是 `src=""`，`src=""` 在很多浏览器下依然会有请求(Edge 会 CH FF 不会)，而且请求的是当前页面数据。

另外一个需要注意的地方是，Firefox 下，没有 src 的 `<img>` 不是替换元素，而是一个普通的内联元素，像 `img { width: 200px; height: 150px; }` 这样的样式设置没有任何效果。为了浏览器的一致性，推荐始终添加一条 `img { display: inline-block; }`，这个既能修复 Firefox 的特殊情况，又不会对其他浏览器的图片表现造成影响。

CSS 世界中的替换元素的固有尺寸有一个很重要的特性，那就是：我们无法改变这个替换元素的固有尺寸。那么为什么 img 上的 width height 会影响图片的尺寸呢？那是因为图片内容默认的适配方式是 `object-fit: fill`。

```css
div::before {
  content: url(1.jpg);
  display: block;
  width: 200px; height: 200px; /* 如果图片的尺寸是 400*400，那么显示的还是 400*400 */
}
```

**替换元素和非替换元素的距离有多远，就是 `src` 或 `content` 那一点**

使用 CSS 技术强化 alt 效果示例（示例略）。当我们点击按钮给图片添加 src 地址时，图片从普通元素变成替换元素，原本都还支持的 ::before ::after 此时全部失效，此时再 hover 图片，是不会有任何信息出现的。于是就非常巧妙地增强了图片还没加载时的信息展示体验。

替换元素之所以为替换元素，就是因为其内容可替换，内容对应的 CSS 属性是 content。所以从理论层面讲，content 属性决定了一个元素是不是替换元素。

Chrome 的渲染表现可帮助我们更好地理解替换元素，Chrome 中所有元素都支持 content 属性，而其他浏览器仅在 ::before ::after 伪元素中才支持。

Chrome 下使用 content 改变图片内容：`img:hover { content: url(laugh-tear.png) }` ... 然后，还有一点需要说明下，content 属性改变的仅仅是视觉呈现，当我们以右键或其他形式保存这张图片的时候，所保存的还是原来 src 对应的图片。

不仅如此，使用 content 属性，我们还可以让普通标签元素变成替换元素：`h1 { content: url(logo.png) }`... 此外，虽然视觉上文字被替换了，但是屏幕阅读设备阅读的还是文字内容，搜索引擎 SEO 抓取的还是原始的文本信息，因此，对页面的可访问性等没有任何影响。看起来这是一个完美的文字换图方案，但是还有些局限，使用 content 生成的图片，是无法设置图片尺寸的，为了解决高分屏的图片清晰度问题，建议配合 SVG 矢量图片使用。

**content 与替换元素关系剖析**

在 CSS 世界中，我们把 content 属性生成的对象称为 "匿名替换元素"，对，content 属性生成的内容都是替换元素。也正是这个原因，content 属性生成的内容和普通元素内容才会有很多不同的特性表现：
  * 使用 content 生成的文本是无法选中、无法复制的，好像设置了 user-select:none 一般。同时，无法被屏幕阅读设备读取，也无法被搜索引擎抓取。
  * content 动态生成值无法获取。content 是一个非常强大的 CSS 属性，其中一个就是计数器效果，可以自动累加数值，但此时 content 对应的具体数值是无法获取的 `window.getComputedStyle(dom, "::after").content // counter(icecream)`

#### content 内容生成技术

在实际项目中，content 属性几乎都是用在 ::before ::after 这两个伪元素中，因此，"content 内容生成技术" 有时候也称为 "::before ::after 伪元素技术"。

```css
.clear { content: ''; display: table; clear: both; }  /* 很多人用 content: '.' 其实完全没必要 */
```

**字符内容生成**

content 字符内容生成就是直接写入字符内容，中英文都可以，比较常见的应用就是配合 @font-face 规则实现图标字体效果。

除常规字符之外，我们还可以插入 Unicode 字符，比较经典的就是插入换行符来实现某些布局或者效果。

<div class="demo">
  <style>
dot {
  display: inline-block; 
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -.25em;
  overflow: hidden;
}
dot::before {
  display: block;
  content: '...\A..\A.';
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}
@keyframes dot {
  33% { transform: translateY(-2em); }
  66% { transform: translateY(-1em); }
}
  </style>
  正在加载中<dot>...</dot>
  <div class="desc">
    IE6 至 IE9 浏览器下是静态的点点点，支持 animation 动画的浏览器下则会出现打点的 loading 动画效果
    <ul>
      <li>为什么使用 `<dot>` 元素 - 自定义元素，方便向下兼容，IE8等低版本浏览器不认识自定义标签，就会乖乖显示里面默认的3个点，对我们的 CSS 代码完全忽略</li>
      <li>3个点在第一行的目的在于兼容 IE9 浏览器，因为 IE9 浏览器认识 `<dot>` 以及 `::before` 但是不支持 `animation`，所以为了 IE9 也能正常显示静态的3个点，故而把3个点放在第一行。</li>
    </ul>
  </div>
</div>

**图片生成**

content 图片生成指的是直接用 url 功能符显示图片。url 功能符中的图片地址不仅可以是常见的 png jpg 还可以是 ico svg 以及 base64URL地址，但不支持 CSS3 渐变背景图。

虽然支持的图片格式多，但是实际项目中，content 图片生成用得并不多，主要原因在于图片的尺寸不好控制。所以伪元素中的图片更多的是使用 background-image 模拟。在不需要控制图片尺寸时，直接使用 content:url() 倒是可以省不少 CSS 代码。

```css
a[target="_blank"]:after {
  content: url(data:image/gif;base64,R0lGODlhBQAFAIABAM0AAAAAACH5BAEAAAEALAAAAAAFAAUAAAIHRIB2eKuOCgA7);
}
a[target="_blank"]:after {
  content: ''; display: inline-block; width: 6px; height: 6px; background: url(blank.gif);
}
```

**开启闭合符号生成**

稍作了解即可

```css
.ask { quotes: '提问："' '"' }
.ask::before { content: open-quote; }
.ask::after { content: close-quote; }
```

**attr 属性值内容生成**

```css
.icon::before { content: attr(data-title); }  /* 注意，属性值名称千万不要加引号，否则无效 */
```

**content 计数器**

计数器效果可以说是 content 部分的重中之重，因为此功能非常强大、实用，且不具有可替代性，甚至可以实现连 JS 都不好实现的效果。(内容比较多，细节知识点先跳过...)

**混合使用上述内容**

各种 content 内容生成语法是可以混合在一起使用的，举例如下

```css
a::after { content: "(" attr(href) ")" };
q::before { content: open-quote url(1.jpg); }
.cunter::before { content: counters(wangxiaoer, '-') '. '; }
```

### 温和的 padding 属性

#### padding 与元素的尺寸

很多人可能有这样的误区，认为设置了 box-sizing:border-box，元素尺寸就不会变化。大多数情况下是这样的，但是，如果 padding 值足够大，那么 width 也无能为力了。

```css
.box { width: 80px; padding: 20px 60px; box-sizing: border-box; }
/* 此时 width 会无效，最终宽度为 60*2=120px，里面的内容表现为 "首选最小宽度"，即为 0 */
```

上述尺寸表现是对具有块状特性的元素而言的，对于内联元素(不包括图片等替换元素)表现则有些许不同。很多前端同事有这么个错误的认识：内联元素的 padding 只会影响水平方向，不会影响垂直方向。其实不是，内联元素的 padding 在垂直方向同样会影响布局，影响视觉表现。只是因为内联元素没有可视宽度和可视高度的说法(clientHeight 和 clientWidth 永远是 0)，垂直方向的行为表现完全受 line-height 和 vertical-align 的影响，视觉上并没有改变和上一行下一行内容的间距，因此，给我们的感觉就会是垂直 padding 没有起作用。如果我们给内联元素加个背景色或者边框，自然就看到效果了。

<div class="demo">
  <style>
    .d421-padding { padding: 20px; background-color: #cd0000; color: #fff; cursor: pointer;}
  </style>
  行1 其他一些文字<br>
  行首<a class="d421-padding">链接</a>行尾<br>
  行2 其他一些文字
  <div class="desc">
    padding 尺寸虽然有效，但对上下元素的原本布局没有任何影响，仅仅是垂直方向发生了层叠
  </div>
</div>

CSS 中还有很多其他场景或属性会出现这种不影响其他元素布局而是出现层叠效果的现象。如 relative 元素的定位、盒阴影 box-shadow 以及 outline 等。其分为两类：一类是纯视觉层叠，不影响外部尺寸(如 box-shadow outline)；另一类则会影响外部尺寸(如 padding)。区分的方式很简单，如果父容器 overflow:auto，层叠区域超出父容器的时候，没有滚动条出现，就是纯视觉的，否则就不是。

应用示例：增加链接点击区域；内联元素(而非标题栏)设置 padding-top 避免标题栏被固定导航栏覆盖

#### padding 的百分比值

和 margin 属性不同，padding 属性是不支持负值的。padding 支持百分比值，但是和 height 等属性的百分比计算规则有些差异：百分比值无论是水平方向还是垂直方向均是相对于宽度计算的。

```css
/* 利用 padding 百分比计算规则实现头图自适应 */
.box { padding: 10% 50%; position:relative; }
.box img { position: absolute; width: 100%; height: 100%; left: 0; top: 0; }
```

上述百分比值是应用在具有块状特性的元素上的，如果是内联元素，则
  * 同样相对于宽度计算
  * 默认的高度和宽度细节有差异
  * padding 会断行

<div class="demo">
  <style>
    .d422-box { width: 87px; border: 2px dashed #cd0000; }
    .d422-span { padding: 25%; background-color: gray }
  </style>
  <div class="d422-box">
    <span class="d422-span">内有文字若干</span>
  </div>
  <div class="desc">
    现象描述："内有"两字不见了，"文字"两字居右显示了，背景区域非矩形，背景色宽度和外部容器宽度不一致等。
  </div>
</div>

#### 标签元素内置的 padding

`<button>` 中 padding 与高度计算在不同浏览器下千差万别，这就是我们平时很少使用原生按钮而使用 `<a>` 标签来模拟的原因。但是表单中，有时候按钮是自带交互行为的，所以比 `<a>` 更好的方案是用 `<label>`

```html
<label>按钮<button></button></label>
<style>
  button { position: absolute; clip: rect(0 0 0 0); }
  label { display: inline-block; line-height: 20px; padding: 10px; }
</style>
```

#### padding 与图形绘制

padding 和 background-clip 配合，可以在有限的标签下实现一些 CSS 图形绘制效果，这里抛砖引玉，举两例

<div class="demo">
  <i class="d424-icon-menu"></i>
  <i class="d424-icon-dot"></i>
  <style>
.d424-icon-menu {
  display: inline-block;
  width: 70px; height: 8px;
  padding: 20px 0;
  border-top: 8px solid; border-bottom: 8px solid;
  background-color: currentColor;
  background-clip: content-box;
}
.d424-icon-dot {
  display: inline-block;
  width: 25px; height: 25px;
  padding: 10px;
  border: 10px solid;
  border-radius: 50%;
  background-color: currentColor;
  background-clip: content-box;
}
  </style>
</div>

### 激进的 margin 属性

#### margin 与元素尺寸

##### 元素尺寸的相关概念

* **元素尺寸** 或 元素偏移尺寸，即元素的 border box 的尺寸，包含 padding 和 border。对应 jQuery 的 `$().outerWidth()` 和 `$().outerHeight()` 方法，对应 DOM 中的 `offsetWidth` 和 `offsetHeight` 属性。
* **元素内部尺寸** 或 元素可视尺寸，即元素的 padding box 的尺寸，含 padding 不含 border。对应 jQuery 的 `$().innerWidth()` `$().innerHeight()` 方法，对应 DOM 中的 `clientWidth` 和 `clientHeight` 属性。
* **元素外部尺寸** 即元素的 margin box 的尺寸，不仅包含 padding 和 border，还包括 margin。对应 jQuery 的 `$().outerWidth(true)` 和 `$().outerHeight(true)`，无对应 DOM 属性。外部尺寸可能为**负数**。

##### margin 与元素的内部尺寸

对于 padding，元素设定了 width 或者保持 "包裹性" 的时候，会改变元素可视尺寸；但是对于 margin 则相反，元素设定了 width 值或者保持 "包裹性" 的时候，margin 对尺寸没有影响，只有元素是 "充分利用可用空间" 状态的时候，margin 才可以改变元素的可视尺寸。

```css
.father { width: 300px; margin: 0 -20px; }  /* margin 对可视尺寸无影响 */
.father { width: 300px; } .son { margin: 0 -20px; } /* margin 影响元素可视尺寸 */
```

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

#### 深入理解 margin:auto

margin:auto 的填充规则如下：
  * 如果一侧定值，一侧 auto，则 auto 为剩余空间大小
  * 如果两侧均是 auto，则平分剩余空间

如果想让某个块状元素右对齐，脑子里不要就一个 float:right，很多时候，margin-left:auto 才是最佳的实践，浮动毕竟是个"小魔鬼"。我甚至可以这么说，margin 属性的 auto 计算就是为块级元素的左中右对齐而设计的，和内联元素使用 text-align 控制左中右对齐正好遥相呼应！

触发 margin:auto 计算有一个前提条件，就是 width 或 height 为 auto 时，元素是具有对应方向的自动填充特性的。正常情况下，元素的高度没有自动填充特性，所以 margin:auto 无法垂直居中。当元素为绝对定位时，则可以实现垂直居中:

```css
.father { width: 300px; height: 150px;  }
.son {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 200px; height: 100px;
  margin: auto;
}
```

由于绝对定位元素的格式化高度即使父元素 height:auto 也是支持的，因此，其应用场景可以相当广泛，绝对定位下的margin:auto 居中是我用的最频繁的块级元素垂直居中对齐方式，比 top:50% 然后 margin 负一半元素高度的方法要好使很多。

#### margin 无效情形

因为 margin 属性的诸多特异性，所以，我们在实际开发的时候，经常会遇到设置的 margin 无效的情形，这里我罗列一下，希望大家遇到类似的问题知道原因以及如何对症下药。

* display:inline 的非替换元素的垂直 margin 是无效的，对于内联替换元素，垂直 margin 有效，并且没有 margin 合并的问题
* 表格的 tr 和 td 元素，或者 display:table-cell table-row 的元素的 margin 都是无效的。如果计算值是 table-caption table inline-table 则没有此问题，可以通过 margin 控制外间距，甚至 ::first-letter 伪元素也可以解析 margin
* margin 合并发生时，改变其中一个 margin 值有可能看不到任何效果
* 绝对定位元素非定位方位的 margin 值看不出效果
* 定高容器的子元素的 margin-bottom 或者宽度定死的子元素的 margin-right 的定位看不出来效果
* ...

### 功勋卓越的 border 属性

CSS 世界中很多大受欢迎的属性之所以受欢迎，并不是因为其本职工作做的很好，而是衍生出来的特性可以用来解决很多棘手的问题。border 就是典型代表之一，我总是称赞 border 功勋卓著，正是因为 border 属性在图形构建、体验优化以及网页布局这几块大放异彩，同时保证其良好的兼容性和稳定性才得此殊荣。

border-width 不支持百分比值，直接声明无效。另外像 outline box-shadow text-shadow 等也都是不支持百分比值的。

border-style 默认值为 none

border-color 的默认值是 color 的色值

#### border 与透明边框技巧

**右下方 background 定位的技巧**

```css
/* 在距离右边缘 50px 的位置设置一个背景图片，技术关键点在 transparent 和 100% */
.box { border-right: 50px solid transparent; background-position: 100% 50%; }
```

**优雅地增加可点击区域大小**

```css
/* 通过透明 border 增加可点击区域大小，提升移动端体验 */
.icon-clear { width: 16px; height: 16px; border: 11px solid transparent; }
```

**三角等图形绘制**

即使在移动端，使用 CSS 的 border 属性绘制三角形等图形仍是性价比最高的方式。

```css
div { width: 0; border: 10px solid; border-color: #f30 transparent transparent; } /* 朝下的等腰三角形 */
```

#### border 与图形构建

只要是与三角形或者梯形相关的图形，都可以使用 border 属性来模拟。

<div class="demo" style="display: flex;">
  <div class="d445-border"></div>
  <div class="d445-border2"></div>
  <style>
    .d445-border { width: 10px; height: 0; border: 10px solid; border-color: #f30 #00f #396 #0f0; }
    .d445-border2 {
      width: 0; height: 0; border-style: solid;
      border-width: 20px 10px; border-color: #f30 #00f transparent transparent;
    }
  </style>
</div>

#### border 等高布局技术

margin+padding 可以实现等高布局，同样，border 属性也可以实现等高布局。

```css
.box { border-left: 150px solid #333; background-color: #f0f3f9; }
.box > nav { width: 150px; margin-left: -150px; float: left; }
.box > section { overflow: hidden; }
```

左侧深色背景区域是由 border-left 属性生成的，元素边框高度总是和元素自身高度保持一致，因此可以巧妙的实现等高布局。

border 等高布局只能满足2~3栏的情况，一旦栏目过多，则建议使用 table-cell 等高布局或者 margin 负值等高布局。
