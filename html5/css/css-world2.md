# CSS 世界 5-7

## 内联元素与流

块级元素负责结构，内联元素接管内容。

### 字母 x

字母 x 在 CSS 世界中扮演了一个重要的角色。在各种内联相关模型中，凡是涉及垂直方向的排版或者对齐的，都离不开最基本的基线 **baseline**。字母 x 的下边缘(线)就是我们的基线。

![](https://upload.wikimedia.org/wikipedia/commons/3/39/Typography_Line_Terms.svg)

CSS 中有一个概念叫做 **x-height**，指的就是字母 x 的高度。另外几个相关的名词：
  * ascender height - 上行线高度
  * cap height - 大写字母高度
  * median - 中线
  * descender height - 下行线高度

CSS 中有些属性值的定义就和这个 x-height 有关，最典型的代表就是 vertical-align:middle。CSS 中 middle 指的是基线往上 1/2 x-height 高度的地方，也可以简单地理解为 x 交叉点的位置。注意，middle 跟上面的 median 是不同的。由此可见，`vertical-align:middle` 并不是绝对地垂直居中对齐。

`ex` 是 CSS 中一个相对单位，指的是小写字母 x 的高度，就是 x-height。em px 这类单位的主要作用是限定元素的尺寸，但是，由于字母 x 受字体等 CSS 属性影响大，不稳定，因此 ex 不太适合用来限定元素的尺寸。ex 的价值就在其副业上——不受字体和字号影响的内联元素的垂直居中对齐效果，根本就不用 vertical-align:middle 出场。

```css
.icon-arrow {
  display: inline-block;
  width: 20px; height: 1ex;
  background: url(arrow.png) no-repeat center;
}
```

### 内联元素的基石 line-height

#### 内联元素的高度之本 line-height

对于非替换元素的纯内联元素，其可视高度完全由 line-height 决定。对于文本这样的纯内联元素，line-height 就是计算高度的基石，用专业的说法就是指定了用来计算行框盒子高度的基础高度。

通常，line-height 的高度作用细节都是使用 **行距** 和 **半行距** 来解释的... 在 CSS 中，"行距" 分散在当前文字的上方和下方，也就是即使是第一行文字，其上方也是有 "行距" 的，只不过这个行距的高度仅仅是完整行距高度的一半，因此也被称为 "半行距"。

> Chrome 68 实测，当选中非首行时行距都在文字上方，选中第一行没有 "半行距"，段首和段尾各有一个 "半行距"，但不在选中范围内。增加一个 span 的 line-height 值，确实又是行上方、下方同时增长的。所以，作者这里说的上下平分没有问题，但同时注意，选中文字时的阴影范围是在行上方取行高的。

```txt
行距 = line-height - font-size
```

学习基础理论知识的好处之一就是可以更准确地进行技术实践，比方说这里，我们知道 "半行距" 的位置和范围，就可以更准确地帮助我们还原设计。设计师往往会对各个元素的距离间隙标注地很清晰，但是，设计师不是开发人员，他们并没有把网页中无处不在的行间距考虑在内，所有与文字相关的间距都是从文字的上边缘和下边缘开始标注的。除非我们全局行高设置为 line-height:1，否则这些标注的距离和我们使用 margin 间距都是不一致的。但是我们理解了半行距，就能根据标注获取准确的间距值。

因为 line-height 几乎无处不在的继承特性... line-height 还是整个 CSS 世界高度体系的基石。

#### 为什么 line-height 可以让内联元素 "垂直居中"

行高可以实现 "垂直居中" 的原因在于 CSS 中行距的上下等分机制。说 "近似" 是因为文字字形的垂直中线位置普遍要比真正的 "行框盒子" 的垂直中线位置低。

```css
/* 单行文字垂直居中 */
.title { line-height: 30px; }  /* 一行搞定 */

/* 多行文字垂直居中 */
.box { line-height: 120px; background-color: #f0f3f9; }
.content { display: inline-block; line-height: 20px; vertical-align: middle; }
```

#### 深入 line-height 的各类属性值

line-height 的默认值是 normal，还支持数值、百分比值以及长度值。

很多人会认为 normal 应该对应一个具体的行高值，实际上 normal 是一个和 font-family 有着密切关联的变量值，可以粗略地看成是 1.2，也就是说，改变字体会影响到 line-height 的计算值。

乍一看，似乎 line-height:1.5  line-height:150%  line-height:1.5em 这三种用法是一模一样的，实际上，line-height:1.5 和另外两个有一点儿不同，那就是 **继承** 细节有所差别。如果使用数值作为属性值，那么所有的子元素继承的都是这个值；但是，如果使用百分比或者长度值作为属性，那么所有的子元素继承的是最终的计算值。

关于 line-height 重置的讨论... 如果使用的是长度值，我建议直接 20px，排版时候计算很方便。如果随大流使用的是数值，我建议最好使用方便计算的行高值，不妨使用 1.5。

```css
body { line-height: 150%; }
input, button { line-height: inherit; }
```

注意，在 CSS 中，计算行高时，行高值一定不要向下舍入，而要向上舍入，如 14x1.42857 非常接近 20px，但最终浏览器还是会以 19px 呈现，而 14x1.42858 则如预期显示 20px。

> Chrome 68 实测可以实现比四舍五入更精细的变化效果(border: 1px solid 然后 Alt + 上下键调整看效果)

#### 内联元素 line-height 的大值特性

请问下面两组设置，假如文字就一行，最后 .box 元素的高度是多少？答案都是 96px。解题关键：幽灵空白节点 + 继承

```css
.box { line-height: 96px; }
.box span { line-height: 20px; }

.box { line-height: 20px; }
.box span { line-height: 96px; }
```

### line-height 的好朋友 vertical-align

为什么说他俩是好朋友，因为凡是 line-height 起作用的地方 vertical-align 也一定起作用，只是很多时候，vertical-align 默默地在背后起作用，你没有感觉到而已。

```css
.box { line-heihgt: 32px; }
.box > span { font-size: 24px; }
```

上例中，如果只有一行文本，最终的高度是多少？很多人一定认为是 32px，而事实上要大那么几像素，原因就是 vertical-align 在背后下了黑手(P132 图5-25 一看就懂)。

抛开 inherit 这类全局属性值不谈，我把 vertical-align 属性值分为以下 4 类：
  * 线类，如 `baseline`(默认值)  top  middle  bottom
  * 文本类，如 text-top  text-bottom
  * 上标下标类，如 sub  super
  * 数值百分比类，如 20px  2em  20%

实际上数值百分比应该是两类，这里之所以把他们合在一起是因为他们有不少共性，包括"都带数字"和"行为表现一致"。

由于是相对于字母 x 的下边缘对齐，而中文和部分英文字形的下边缘要低于字母 x 的下边缘，因此，会给人感觉文字是明显偏下的，一般都会进行调整。

负值全部都是往下偏移，正值全部都是往上偏移，而且数值大小全部都是相对于基线位置计算的，因此 vertical-align:baseline  vertical-align:0 的效果是一样的。

在 CSS 世界中，凡是百分比值，均是需要一个相对计算的值，例如，margin 和 padding 是相对于宽度计算的，line-height 是相对于 font-size 计算的，而这里的 vertical-align 属性的百分比值则是相对于 line-height 的计算值计算的。实际开发中，line-height 的计算值都是相对固定并且已知的，因此使用具体的数值反而更方便，所以实际开发中百分比值很少使用。

很多新手会问：为什么有时设置了 vertical-align 却没有任何作用？因为 vertical-align 起作用是有前提条件的：只能应用于内联元素以及 display 值为 table-cell 的元素。

**图片底部间隙案例**

现象：任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高。

分析：图片作为替换元素其基线是自身的下边缘，默认和基线(也就是这里的字母 x 的下边缘)对齐，字母 x 往下的行高产生的多余的间隙就嫁祸到图片下面，让人以为是图片产生的间隙。实际上，是 幽灵空白节点 line-height vertical-align 属性共同作用的结果。

解决：要清除该间隙，方法很多
  * 图片块状化 display: block
  * 容器 line-height 足够小 line-height: 0
  * 容器 font-size 足够小，此方法要想生效，需要容器的 line-height 属性值和当前 font-size 相关
  * 图片设置其他 vertical-align 属性值，设置为 top middle bottom 中的任意一个都是可以的

<div class="demo">
  <style>
    .d533-box { border: 1px solid #ccc; width: 320px; }
    .d533-box img { background-color: #ee0; }
  </style>
  <div class="d533-box"><span style="border: 1px solid #f00; font-size: 24px; display: inline-block;">x</span>
    <img src="" width=64 height=64>
  </div>
</div>

#### 深入理解 vertical-align 属性值

https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align

**inline-block 与 baseline**

vertical-align 属性的默认值 baseline 在文本之类的内联元素那里就是字符 x 的下边缘，对于替换元素则是替换元素的下边缘。但是，如果是 inline-block 元素，则规则要复杂了：一个 inline-block 元素，如果里面没有内联元素，或者 overflow 不是 visible，则该元素的基线就是其 margin 底边缘，否则其基线就是元素里面最后一行内联元素的基线。

背景小图标与文字对齐的案例，略。

**top 与 bottom**

顾名思义，vertical-align:top 就是垂直上边缘对齐，具体定义如下：
  * 内联元素，元素顶部和当前行框盒子的顶部对齐
  * table-cell 元素，元素顶 padding 边缘和表格行的顶部对齐

vertical-align:bottom 声明与此类似。

内联元素的上下边缘对齐的这个 "边缘" 是当前 "行框盒子" 的上下边缘，并不是块状容器的上下边缘。

虽然同属线性类属性值，但是 top/bottom 和 baseline/middle 却是完全不同的两个帮派，前者看齐看边缘看行框盒子，而后者是和字符 x 打交道，注意区分。

**middle 与近似垂直居中**

> Aligns the middle of the element with the baseline plus half the x-height of the parent.

* 内联元素，元素的垂直中心点和行框盒子基线往上 1/2 x-height 处对齐
* table-cell 元素，单元格填充盒子相对于外面的表格行居中对齐

<div class="demo">
  <style>
  .d534-box {
    position: relative;
    width: 180px;
    line-height: 128px;
    background-color: #f0f3f9;
    font-size: 32px;
  }
  .d534-wrap {
    display: inline-block;
    line-height: 0;
    color: red;
    position: relative;
  }
  .d534-wrap::before, .d534-box::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 1px solid;
  }
  .d534-box::after {
    color: green;
  }
  .d534-box img {
    width: 96px;
    height: 96px;
    border: 1px solid #333;
    vertical-align: middle;
  }
  </style>
  <div class="d534-box"><span class="d534-wrap"><img src=""></span>x</div>
</div>

**text-top 和 text-bottom**

* vertical-align:text-top  盒子的顶部和父级内容区域的顶部对齐
* vertical-align:text-bottom  盒子的底部和父级内容区域的底部对齐

何为父级内容区域，<span style="background-color: #ccc;">带底色部分就是</span>

这两个属性值虽然理论上强大，但没啥实际使用价值。

**sub 和 super**

* vertical-align:supper  提高盒子的基线到父级合适的上标基线位置
* vertical-align:sub  提高盒子的基线到父级合适的下标基线位置

```css
sub { vertical-align: sub; font-size: smaller; }
sup { vertical-align: super; font-size: smaller; }
```

**小结**

vertical-align 属性值的理解可以说是 CSS 世界中的最难点。首先，需要深入了解内联盒模型；其次，不同属性值定义完全不同；同时，最终表现与字符 x，line-height，font-size， font-family 属性密切相关，如果要通透，需要对这些属性都有比较深入的了解，因此，本章的内容是值得反复研读的。

#### 基于 vertical-align 属性的水平垂直居中弹框

最后，推荐一个我自己觉得非常棒的 vertical-align 属性实践，就是使用纯 CSS 实现大小不固定的弹框，永远居中的效果。

http://demo.cssworld.cn/5/3-10.php

```html
<div class="container">
  <div class="dialog">
    <div class="content">内容占位</div>
  </div>
</div>
<style>
  .content { width: 240px; height: 120px; padding: 20px; }
</style>
```

```css
.container {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0,0,0,.5), none;
  text-align: center;
  white-space: nowrap;
  z-index: 99;
}
.container:after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.dialog {
  display: inline-block;
  vertical-align: middle;
  border-radius: 6px;
  background-color: #fff;
  text-align: left;
  white-space: normal;
}
```

按照初衷，块级元素负责布局，内联元素设置内容。但是，这里的弹框居中却是把块级元素内联化，利用一些内联属性实现垂直居中效果，这也是不得已而为之，因为 vertical-align 等内联属性确实比块级属性强悍，也正因为 CSS 世界在布局上的弱势，后来多栏布局、弹性盒子布局以及格栅布局一个一个都出来补强了。


## 流的破坏与保护

有时候我们希望有一些特殊的布局表现，如文字环绕效果，或元素固定在某一个位置，要实现这样的效果，正常的流就有些捉襟见肘。因此 CSS 中有一类属性，专门通过破坏正常的流来实现一些特殊的样式表现。

### 魔鬼属性 float

#### 本质与特性

在早期，复杂布局都是用 table 实现的，而 float 属性只是为了实现文字环绕效果。

浮动属性用来布局非常符合现实世界的认知，就像搭积木，把元素定宽定高，再通过浮动一个一个堆积起来，理论上一个 float:left 声明几乎就可以把整个页面结构都弄出来，而且内联元素的间隙问题、margin 合并问题都没有，对于新手，不知道多开心。

乍一看，float 好像也能满足我们布局页面的需求，但实际上，这种砌砖头式的布局方式缺少弹性，布局的容错性很糟糕。...说这么多就是要告诉大家：浮动是魔鬼，少砌砖头、少浮动，要更多地去挖掘 CSS 世界本身的 "流动性" 和 "自适应性"，以构建能够适用于各种环境的高质量的网页布局。

我们在开发移动端时，不可避免要面对各种设备尺寸的问题，加上横竖屏切换，其可变的外部环境非常之多，尤其在初期，很多人有这样的想法：固定宽度 320px，然后左右留白；抑或是 320px布局，然后根据比例缩放整个页面以填满屏幕宽度。这些想法最大的问题在于思维方式还是刚式思维。记住，CSS 设计的初衷就是表现如水流，富有弹性，"砖头式思维" 是逆道而行，绝不可取。

如果进一步深究，"刚"式思维的主要原因还在于开发人员对 CSS 的了解不够深入，没有能够了解到其表层属性之下更深入的流动性和自适应性。好在 CSS3 出现了类似 flex 弹性盒子布局这种更表层、更上层、更浅显、更直白的 CSS 属性，以另外一种更加简单的方式让大家不得不以自适应的方式去实现布局。

纯浮动布局容错性差，容易出现比较严重的布局问题，还有就是，float 本身就是魔鬼属性，容易出现意料之外的情况，这里的意料之外除了 float 属性自身特性(如父元素高度坍塌)导致的布局问题外，还包括诸多兼容性问题。

float 属性的种种表现归根结底还是由于自身各种特性导致的，float 的特性：
  * 包裹性
  * 块状化并格式化上下文，元素一旦 float 不为 none，其 display 计算值就是 block 或 table
  * 破坏文档流，这是该属性的万恶之源，也是其立命之本，是其作用机制之所在
  * 没有任何 margin 合并

#### 作用机制

float 属性有个著名的特性表现，就是会让父元素的高度塌陷，大多数场景下，这种特性会影响 "正常的" 布局。float 属性的原本作用只是为了实现文字环绕效果，所以让父元素高度坍塌是符合预期的，但后面 float 被大量用来布局，显然，布局的时候是不需要父元素坍塌的，于是高度坍塌这种特性反而成为了 float 属性一个不得不重视的坑。

高度坍塌只是让跟随的内容可以和浮动元素在一个水平线上，但这只是实现 环绕效果的条件之一，要想实现真正的环绕效果，就需要另外一个平时大家不太在意的特性，那就是 "行框盒子和浮动元素的不可重叠性"，也就是，行框盒子如果和浮动元素的垂直高度有重叠，则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠。

<div class="demo" style="height: 100px; overflow: hidden;">
  <style>
.d612-father {
    height: 64px; width: 25%;
    float: left; margin-left: 20px;
    border: 1px solid #444;
}
.d612-father img {
    width: 60px; height: 64px;
}
  </style>
  <div class="d612-father">
    <div><img src=""></div>
    (没有float)我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~
  </div>
  <div class="d612-father">
    <div style="float: left;"><img src=""></div>
    (float:left)我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~
  </div>
</div>

了解 float 属性的作用机制可以让我们知道一些意外场景发生的原因以及如何快速对症下药。

#### float 与流体布局

我们可以利用 float 破坏 CSS 正常流的特性，实现两栏或多栏的自适应布局。

```css
.father { overflow: hidden; }
.father .left-nav { width: 60px; float: left; }
.father .content { margin-left: 70px; }
```

### float 的天然克星 clear

官方对 clear 属性的解释是：元素盒子的边不能和前面的浮动元素相邻。虽然有些拗口，但是有一点可以体会出来，就是设置了 clear 属性值的元素自身如何如何，而不是让 float 元素如何如何。我对 clear 属性的理解是这样的：
  * `none` 默认值，允许存在左右浮动元素
  * `left` 左侧不允许出现浮动元素
  * `right` 右侧不允许出现浮动元素
  * `both` 两侧都不允许出现浮动元素

实际使用的都是 clear:both，而 left 和 right 这两属性值几乎无人问津，因为能用后两者的地方，都能用 clear:both 替代...

clear 属性只有块级元素才有效，而 ::after 等伪元素默认都是内联元素，这就是借助伪元素清除浮动影响时需要设置 display 属性值的原因。

```css
.clear::after { content: ''; display: table; clear: both; }
```

另外需要注意的是，clear:both 只能在一定程度上消除浮动的影响，要想完美地去除浮动元素的影响，还需要使用其他 CSS 属性。

<div class="demo">
  <style>
.d622-father {
    height: 64px; width: 180px;
    border: 1px solid #444;
}
.d622-float {
    float:left;
}
.d622-float img {
    width: 60px; height: 64px;
}
  </style>
  <div style="width: 220px;">
    <div class="d622-father">
      <div class="d622-float">
          <img src="">
      </div>
      我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~
    </div>
    <div>虽然你很帅，但是我对你不感兴趣。</div>
  </div>

  <div class="desc">虽然 .father 父元素设置了 clear:both 来阻止浮动对后面元素的影响，但是最后错位依然发生了。</div>
</div>

### CSS 世界的结界 BFC

BFC 块级格式化上下文 block formatting context，IFC 内联格式化上下文 inline formatting context，IFC 作用和影响比较隐晦，不作介绍，重点介绍 BFC。

关于 BFC 各种特性什么的，说起来很啰嗦，而我喜欢用 "CSS 世界的结界" 这种称谓概括 BFC 特性。"结界" 这个词大家应该都理解，指通过一些特定的手段形成的封闭空间，里面的人出不去，外面的人进不来，具有极强的防御力。BFC 的特性表现如出一辙。

BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外面的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素的布局和定位，这显然有违 **BFC 元素的子元素不会影响外部元素**的设定。

那什么时候会触发 BFC 呢？常见的情况如下：
  * html 根元素
  * `float` 的值不为 `none`
  * `overflow` 的值为 `auto` `scroll` 或 `hidden`
  * `display` 的值为 `table-cell` `table-caption` 或 `inline-block`
  * `position` 的值不为 `relative` 和 `static`

换言之，只要元素符合上面任意一个条件，就无须使用 clear:both 属性去清除浮动的影响了。

#### BFC 与流体布局

BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实现更健壮、更智能的自适应布局。

<div class="demo">
  <style>
.d632-father {
    height: 64px; width: 180px;
    border: 1px solid #444;
}
.d632-float {
    float:left;
}
.d632-float img {
    width: 60px; height: 64px;
}
  </style>
  <div style="height: 100px; overflow: hidden;">
  <div style="width: 220px; float: left;">
    <div class="d632-father">
      <div class="d632-float">
          <img src="">
      </div>
      <p>我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~</p>
    </div>
  </div>
  <div style="width: 220px; float: left;">
    <div class="d632-father">
      <div class="d632-float">
          <img src="">
      </div>
      <p style="overflow: hidden;">(overflow:hidden)我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~</p>
    </div>
  </div>
  <div style="width: 220px; float: left;">
    <div class="d632-father">
      <div class="d632-float">
          <img src="" style="margin-right: 10px;">
      </div>
      <p style="overflow: hidden;">(overflow:hidden)我是帅哥，好巧啊，我也是帅哥，原来看这本书的人都是帅哥~</p>
    </div>
  </div>
  </div>
  <div class="desc">
    例1 图 float:left 例2 图 float:left 字 overflow:hidden 例3 图 float:left;margin-right:10px 字 overflow:hidden<br>
    例3 中添加了空隙，没有在字上添加 margin-left 是因为，其值必须是浮动元素的宽度加间隙的大小
  </div>
</div>

和基于纯流体特性实现的两栏或多栏自适应布局相比，基于 BFC 特性的自适应布局有如下优点：
  * 自适应内容由于封闭而更健壮，容错性更强
  * 自适应内容自动填满浮动以外区域，无须关心浮动元素宽度，可以整站大规模应用

```css
.left { float: left; }
.right { float: right; } /* .left .right 要在 .bfc 之前，如果是 .left .bfc .right 这顺序，.right 会另起行 */
.bfc { overflow: hidden; }  /* overflow 属性是用来开启 BFC 的最完美属性了，唯一不足是会隐藏溢出内容 */
```

<div class="demo" style="overflow: hidden;">
  <style>
    .left { width: 200px; float: left; background-color: aqua; }
    .bfc { overflow: hidden; background-color: green; }
    .right { width: 300px; float: right; background-color:blueviolet; }
  </style>
  <div class="left">.left</div>
  <div class="right">.right</div>
  <div class="bfc">.bfc</div>
  <div class="left">.left</div>
  <div class="bfc">.bfc</div>
  <div class="right">.right</div>
</div>

有了 BFC 自适应布局，纯流体特性布局基本似乎没有了存在价值，但实际为什么没有如此呢？理论上，任何 BFC 元素和 float 元素相遇的时候，都可以实现自动填充的自适应布局，但是，由于绝大多数的触发 BFC 的属性自身有一些古怪的特性，所以，实际操作的时候，能兼顾流体特性和 BFC 特性来实现无敌自适应布局的属性并不多。

### 最佳结界 overflow

要想彻底清除浮动的影响，最适合的属性不是 clear 而是 overflow。一般使用 overflow:hidden，利用 BFC 的结界特性彻底解决浮动对外部或兄弟元素的影响。虽然有很多其他 CSS 声明也能清除浮动，但基本上都会让元素的宽度表现为 "包裹性"，也就是会影响原来的样式布局，而 overflow:hidden 声明不会影响元素原先的流体特性或宽度表现，因此在我看来是最佳结界。不过话说回来，overflow 属性原本的作用制定了块容器元素的内容溢出时是否需要裁剪，也就是说结界只是衍生出来的特性，裁剪才是其本职工作。

#### overflow 裁剪边界 border box

一个设置了 overflow:hidden 声明的元素，假设同时存在 border 属性和 padding 属性，则当子元素内容超出容器宽高限制时，裁剪的边界是 border box 的内边缘，而非 padding box 的内边缘。

这里顺便探讨下一个很经典的不兼容问题，即 Chrome 浏览器下，如果容器可滚动(假设是垂直滚动)，则 padding-bottom 也算在滚动尺寸之内，而 IE 和 Firefox 则会忽略 padding-bottom，即，当设置很大的 padding-bottom 时，Chrome 滚动到底部能看到很大的一块空白，而 IE 和 Firefox 下没有这块空白。正因为存在此不兼容问题，实际开发中要尽量避免滚动容器设置 padding-bottom 值，除了样式表现不一致外，还会导致 `scrollHeight` 值不一样，这往往会给开发带来难以察觉的麻烦。

#### overflow-x 与 overflow-y

如果 overflow-x 和 overflow-y 属性中的一个值设置为 visible 而另外一个设置为 scroll、auto 或 hidden，则 visible 的样式表现会如同 auto。也就是说，除非 overflow-x 和 overflow-y 的属性值都是 visible，否则 visible 会被当成 atuo 来解析。换句话说，永远不可能实现一个方向溢出裁剪或滚动，而另一个方向内容溢出显示的效果。

#### overflow 与滚动条

HTML 中有两个标签是默认可以产生滚动条的，一个是根元素 `<html>`，另一个是文本域 `<textarea>`。

在 PC 端，所有浏览器的滚动条均来自 `html` 而非 `body` 标签。在 PC 端窗体滚动高度可以使用 `document.documentElement.scrollTop` 获取，但在移动端可能就要使用 `document.body.scrollTop` 获取。

在 PC 端，尤其是 Windows 下，几乎所有浏览的滚动栏都会占据宽度，目前都是 17px。在移动端，滚动条一般采用悬浮模式，不会占据可用宽度。滚动栏占据宽度的特性有时候会给我们的布局带来不小的麻烦。

如我们希望实现一个表格头固定、表格主体可以滚动的效果，常见的实现方法是使用双 `<table>`，表头是一个独立的 `<table>`，主体也是一个独立的 `<table>`，放在一个 overflow:auto 的元素中，如果滚动条不出现，两个表格可以完美对齐，但是一旦滚动条出现，主体表格可用宽度被压缩，表格列往往就无法完美对齐了。常用的解决方法有两种：一种是 table 元素使用固定的宽度值，但是距离右侧预留 17px 的间隙；另一种就是表格的最后一列不设定宽度，而前面的列都定死宽度。

当然，滚动栏占据宽度的特性的最大问题就是页面加载的时候水平居中的布局可能会产生晃动。这里分享一个可以让页面滚动条不发生晃动的小技巧(最终的效果，出滚动条时会盖在 body 上面，页面不会发生晃动)：

```css
html { overflow-y: scroll; } /* for IE8 任何时候都显示滚动条，简单粗暴 */
:root { overflow-y: auto; overflow-x: hidden; }  /* 滚动条来自这里的 auto */
:root body { position: absolute; }
body { width: 100vw; overflow: hidden; }
```

滚动条是可以自定义的，IE 浏览器的自定义效果比原生的还难看，就只说说支持 -webkit- 前缀的浏览器...

#### overflow 与锚点定位

我所知道的基于 URL 地址的锚链实现锚点跳转的方法有两种：`<a name="xxx">` 或 使用标签的 `id` 属性。

```html
<a href="#1">发展历程</a>
<a name="1"></a>             <!-- a 标签 + name 属性，正统用法 -->
<h2 id="1">发展历程</h2>      <!-- HTML 标签会显得更加干净 -->
```

下面两种情况可以触发锚点定位行为的发生
  * URL 地址中的锚链与锚点元素对应并有交互行为
  * 可 focus 的锚点元素处于 focus 状态

```html
<a href="#">返回顶部</a>
```

两种锚点定位方法的行为表现还是有差异的，"URL 地址锚链定位" 是让元素定位在浏览器窗体的上边缘；而 "focus 锚点定位" 是让元素在浏览器窗体范围内显示即可，不一定是在上边缘。

锚点定位行为的发生，本质上是通过改变 **容器** 滚动高度或者宽度来实现的。而且定位行为的发生是由内而外的，"由内而外" 指的是，普通元素和窗体同时可滚动的时候，会由内而外触发所有可滚动窗体的锚点定位行为。

对于 overflow:hidden 的元素，无论你鼠标怎么滚，都没有滚动行为发生，但该元素依然是可滚动的，如果发生锚点定位，就发现滚动发生了。overflow:hidden 与 overflow:auto overflow:scroll 的差别就在于有没有那个滚动条。

**实现选项卡切换效果**

...这一技术只适用于高度固定的选项卡效果，如各大网站首页经常出现的幻灯片广告切换效果等...

### float 的兄弟 position:absolute

我一直认为 position:absolute 和 float:left/right 是兄弟关系，都兼具 块状化、包裹性、破坏性 等特性，不少布局场合甚至可以相互替代。

#### absolute 的包含块

包含块 containing block 就是元素用来计算和定位的一个框。普通元素的百分比宽度是相对于父元素的 content box 宽度计算的，而绝对定位元素的宽度是相对于第一个 position 不为 static 的祖先元素计算的。

对于包含块的计算规则，规范是有明确定义的：
  * 根元素被称为 "初始包含块"，其尺寸等同于浏览器可视窗口大小
  * position:relative/static 的元素，包含块由其最近的块容器祖先盒的 content box 边界形成
  * positon:fixed 元素的包含块是 "初始包含块"
  * position:absolute 元素的包含块由最近的 position 不为 static 的祖先元素建立

和常规元素相比，absolute 绝对定位元素的包含块有以下3个明显差异
  * 内联元素也可以作为包含块所在的元素
  * 包含块所在的元素不是父级块元素，而是最近的 position 不为 static 的祖先元素或根元素
  * 边界是 **padding box** 而不是 **content box**

<div class="demo">
  <style>
    .d651-box {
      position: relative;
      border: 10px solid #8bc34a;
      padding: 10px;
      background: #00b0e8;
      background-clip: content-box;
    }
    .d651-content {
      position: absolute;
      background: rgba(255, 193, 7, .75);
      top: 0; left: 0;
    }
  </style>
  <div class="d651-box"> 123 <div class="d651-content">456<br>789<br>123</div></div>
  <div class="desc">边界是 padding box 而不是 content box 也不是 border box</div>
</div>

对于绝对定位元素，**height:100%** 和 **height:inherit** 是不一样的，height:100% 是第一个具有定位属性值的祖先元素的高度，而 height:inherit 则是单纯地继承父元素的高度，在某些场景下非常好用。

绝对定位元素的包裹性中的"宽度自适应性"其实也是相对于包含块来表现的。绝对定位元素默认的最大宽度就是包含块的宽度。

**tip 案例说明**

http://demo.cssworld.cn/6/5-1.php  http://demo.cssworld.cn/6/5-2.php

要修复此问题其实很简单，只要改变默认的宽度显示类型，添加 `withe-space: nowrap` 即可

#### 具有相对特性的无依赖绝对定位 position:absolute + margin

虽然 absolute 破坏正常的流来实现自己的特性表现，但本身还是受普通的流体元素布局、位置甚至一些内联相关属性影响的。

absolute 定位效果实现完全不需要父元素设置 position 为 relative 或其他什么属性就可以实现，我把这种没有设置 left/top/right/bottom 属性值的绝对定位称为 "无依赖绝对定位"。很多场景下无依赖绝对定位要比使用 left/top 之类属性定位要实用和强大很多，因为除了代码更简洁外，还有一个很棒的特性，就是 "相对定位特性"。"无依赖绝对定位" 本质上就是 "相对定位"，仅仅是不占据 CSS 流的尺寸空间而已。**相对性** 和 **不占据空间** 这两个特性在实际开发的时候非常有用。

**各类图标定位**

我们经常会在导航右上方增加一个 NEW 或 HOT 这样的小图标。要实现在导航文字右上方的定位很简单，直接对图标元素进行样式设定就可以了，原纯文字导航的样式完全不需要修改。

```css
.icon-x { position: absolute; margin: -6px 0 0 2px; width: 28px; height: 11px; background: url(x.gif) }
```

一个简简单单的 positon:absolute，然后通过 margin 属性进行定位，效果即达成。设想一下，如果给父元素设置 position:relative 然后 right/top 定位，文字长度一旦发生变化，CSS 代码就要重新调整，维护成本显然要高很多。

**超越常规布局的排版**

<div class="demo">
  <style>
    .d652-regist-box { width: 356px; margin-left: auto; margin-right: auto; border: 1px solid #eee; }
    .d652-regist-group { margin: 10px 0; overflow: hidden; }
    .d652-regist-label { width: 70px; padding-top: 5px; float: left; }
    .d652-regist-star { position: absolute; margin-left: -1em; color: #f30; }
    .d652-regist-remark { position: absolute; margin: 10px 0 0 10px; color: #666; }
    .d652-regist-warn { padding-left: 16px; color: #be0000; }
    .d652-icon-warn {
      position: absolute; margin-left: -18px;
      width: 16px; height: 20px;
      background: url(/images/6/warn.gif) no-repeat center; background: #f00;
    }
  </style>
  <div class="d652-regist-box">
    <div class="d652-regist-group">
      <label class="d652-regist-label"><span class="d652-regist-star">&lowast;</span>邮箱</label>
      <div class="d652-regist-cell">
        <input type="email" class="d652-regist-input">
        <span class="d652-regist-remark d652-regist-warn"><i class="d652-icon-warn"></i>邮箱格式不准确（示意）</span>
      </div>
    </div>
    <div class="d652-regist-group">
      <label class="d652-regist-label"><span class="d652-regist-star">&lowast;</span>密码</label>
      <div class="d652-regist-cell">
        <input type="password" class="regist-input">
        <span class="d652-regist-remark">请输入6-16位密码，不能使用空格</span>
      </div>
    </div>
    <div class="d652-regist-group">
      <i class="d652-regist-label"></i>
      <div class="d652-regist-cell">
        <a href="javascript:" class="regist-btn">立即注册</a>
      </div>
    </div>
  </div>
</div>

上例是一个常见的注册表单，为了保证视觉舒适，我们往往会让表单水平居中对齐。初步的，width:356px;margin:auto; 就可实现。但是开发中往往还有提示或报错等交互效果。有一种做法是提示信息放在输入框的下面，但这样做会带来一种不好的体验，那就是提示信息出现和隐藏的时候，整个容器的高度会突然变化；还有一种做法就是在输入框的后面(即右边)显示，但是为了让默认状态下表单水平居中，外面容器的宽度不是很大，因此如果在后面显示，就会有宽度不够的问题。如果我们使用 "无依赖绝对定位"，那这个问题就不再是问题了。

```css
.remark { position: absolute; margin-left: 10px; }
```

更为关键的是，提示信息的位置智能跟随输入框。与容器设置 position:relative 再通过 left 属性实现的定位相比，其代码更简洁，容错性更强，维护成本更低。

此外，页面中的星号也是典型的 "无依赖绝对定位"，自身绝对定位，然后通过 margin-left 负值偏移实现，从而保证所有输入信息头左对齐，同时又不会影响原先的布局。

**深入 "无依赖绝对定位"**

虽然说元素 position:absolute 后的 display 计算值都是块状的，但是其定位的位置和没有设置 absolute 时的位置相关。

```html
<h3>标题<span class="follow">span</span>.。.。.</h3>
<h3>标题<div class="follow">div</div>.。.。.</h3>
```

标题后面分别跟了一个 span 和 div，当添加样式 .follow { position: absolute; } 后，看到的效果还和没有添加绝对定位样式时一样，一个在后面，一个在下面。

<div class="demo">
  <style>.d651-follow { position: absolute; }</style>
  <h3>标题<span class="d651-follow">span</span>.。.。.</h3>
  <h3>标题<div class="d651-follow">div</div>.。.。.</h3>
</div>

#### absolute 与 overflow

如果 overflow 所在元素不是定位元素，同时此绝对定位元素和 overflow 容器之间也没有定位元素，则 overflow 无法对 absolute 所在元素进行裁剪。如果 overflow 的属性值不是 hidden 而是 auto 或者 scroll，即使绝对定位元素高度比 overflow 元素高宽还要大，也都不会出现滚动条。

#### absolute 与 clip

CSS 世界中有些属性或者特性必须和其他属性一起使用才有效，比方说裁剪属性 clip。clip 属性想要起作用，元素必须是绝对定位或者固定定位，也就是 position 必须是 absolute 或 fixed。

```css
clip: rect(top, right, bottom, left)
```

多数人认为 clip 是个冷门属性，作用不大，但在以下两种场景下具有不可替代的地位
  * fixed 固定定位的裁剪
  * 最佳可访问性隐藏

clip 隐藏仅仅是决定了哪部分是可见的，非可见部分无法响应点击事件等。然后，虽然视觉上隐藏，但是元素的尺寸依然是原本的尺寸，在 IE 和 Firefox 中抹掉了不可见区域尺寸对布局的影响，而 Chrome 则保留了。

#### absolute 的流体特征

当 absolute 遇到 left/top/right/bottom 属性的时候，absolute 元素才真正变成绝对定位元素。如果我们仅设置了一个方向的绝对定位，如水平方向绝对定位，那垂直方向依然保持相对特性。

当一个绝对定位元素，其对立定位方向属性同时有具体定位数值的时候，流体特性就发生了。设置了对立定位属性的绝对定位元素的表现神似普通的 div 元素，无论设置 padding 还是 margin，其占据的空间一直不变，变化的就是 content box 的尺寸，这就是典型的流体表现特性。

绝对定位元素宽高自适应于包含块(就是那个 position 非 static 的元素)，绝对定位元素的这种流体特性比普通元素要更强大，普通元素流体特性只有一个方向，默认是水平方向，但绝对定位元素可以让垂直方向和水平方向同时保持流动性。在垂直方向也保持流动性对布局非常有价值。

当绝对定位元素处于流体状态的时候，各个盒模型相关属性的解析和普通流体元素都是一模一样的，margin 负值可以让元素的尺寸更大，margin:auto 可以让绝对定位元素保持居中。

```css
.element {
  width: 300px; height: 200px;
  position: absolute; left: 0; right: 0; top: 0; bottom: 0;
  margin: auto;
}

/* 以下两种垂直居中方法可以直接淘汰 */
.element {
  width: 300px; height: 200px;
  position: absolute; left: 50%; top: 50%;
  margin-left: -150px; margin-right: -100px;
}
.element {
  width: 300px; height: 200px;
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}
```

### position:realtive 才是大哥

如果说 float 和 absolute 是同父异母的兄弟关系，那么 position:ralative 则是 absolute 的亲大哥，管着 absolute 避免其到处惹是生非。

虽然说 relative/absolute/fixed 都能对 absolute 的包裹性和定位产生限制，但只有 relative 可以让元素依然保持在正常的文档流中。

relative 的定位有两大特性：相对自身 + 无侵入。无侵入的意思是，当 relative 进行定位偏移的时候，一般情况下不会影响周围元素的布局。[margin 和 relative 定位偏移对比示例](http://demo.cssworld.cn/6/6-1.php)。

relative 的定位还有另外两点值得一提：相对定位元素的 left/top/right/bottom 的百分比值是相对于包含块计算的，而不是自身。虽然定位位移是相对自身的，但是百分比值的计算不是。

"relative 的最小化影响原则" 是我自己总结的一套更好地布局实践的原则，主要分为以下两部分：
  * 尽量不要使用 relative，如果想定位某些元素，看看能否使用 "无依赖的绝对定位"
  * 如果场景受限，一定要使用 relative，则该 relative 务必最小化

```html
<div style="position: relative;">  <!-- 日后不敢随便删 -->
  <img src="icon.png" style="position: absolute; top: 0; right: 0;">
  <p>内容</p>
</div>

<!-- relative 的最小化影响原则 -->
<div>
  <div style="position: relative;"> <!-- 日后大胆删 -->
    <img src="icon.png" style="position: absolute; top: 0; right: 0;">
  </div>
  <p>内容</p>
</div>
```

一个普通元素变成相对定位元素，看似没什么变化，实际上元素的层叠顺序提高了，会导致一些绝对定位浮层无论怎么设置 z-index 都会被其他元素覆盖。

relative 的最小化影响原则不仅规避了复杂场景可能出现样式问题的隐患，从日后维护角度讲也更方便... 从这一点可以看出来，项目代码越来越臃肿、冗余，归根结底还是一开始实现项目的人的技术水平和能力火候还不到。实现时洋溢着灿烂的笑容没什么好得意的，能够让日后维护甚至其他人接手项目维护的时候也洋溢着灿烂的笑容，那才是真厉害。

### 强悍的 position:fixed 固定定位

position:fixed 固定定位元素的 "包含块" 是根元素，我们可以将其近似看成 `<html>` 元素。


## CSS 世界的层叠规则

**层叠上下文** stacking context，可以理解为一种 "层叠结界"，自成一个小世界。  
**层叠水平** stacking level，决定了同一个层叠上下文中元素在 z 轴上的显示顺序。  
层叠顺序 stacking orderr，表示元素发生层叠时有着特定的垂直显示顺序。层叠上下文和层叠水平是概念，而层叠顺序是规则。

在 CSS2 中，层叠顺序规则如下：

```txt
后
 | 层叠上下文 background/border                           // 装饰
 | 负 z-index
 | block 块状水平盒子                                     // 布局
 | float 浮动盒子
 | inline 水平盒子(inline / inline-block / inline-table)  // 内容
 | z-index:auto 和 z-index:0
\| 正 z-index
前
```

当元素发生层叠的时候，其覆盖关系遵循两条准则：谁大谁上 + 后来居上

### 层叠上下文

层叠上下文元素有如下特性
  * 层叠上下文的层叠水平要比普通元素高
  * 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文
  * 每个层叠上下文和兄弟元素独立，也就是说，层叠变化时只需要考虑后代元素
  * 每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中

和块状格式化上下文一样，层叠上下文也基本上是由一些特定的 CSS 属性创建的
  * 天生派 - 页面根元素天生具有层叠上下文，称为根层叠上下文
  * 正统派 - z-index 值为数值(不含 auto)的定位元素
  * 扩招派 - 其他 CSS3 属性，如 flex

CSS3 新世界的出现除了带来了新属性，还对过去的很多规则发出了挑战，其中对层叠上下文规则的影响显得特别突出。
  * 元素为 flex 布局元素(父元素 display:flex|inline-flex) 同时 z-index 不为 auto
  * 元素的 opacity 值不是 1
  * 元素的 transform 值不是 none
  * 元素 mix-blend-mode 值不是 normal
  * 元素的 filter 值不是 none
  * 元素的 isolation 值是 isolate
  * 元素的 will-change 属性值为上面 2-6 的任意一个
  * 元素的 -webkit-overflow-scrolling 设为 touch

### z-index

在 CSS2 世界中，z-index 属性只有和定位元素(position 不为 static)在一起的时候才有作用，可以是正数也可以是负数。

随着 CSS3 新世界的到来，z-index 已经并非只对定位元素有效，flex 盒子的子元素也可以设置 z-index 属性。

元素一旦成为定位元素，其 z-index 就会自动生效，即默认的 auto，也就是 0 级别。而不支持 z-index 的层叠上下文元素天然是 z-index:auto 级别。

可访问性隐藏：z-index 负值可以隐藏元素，只需要层叠上下文内的某一个父元素加个背景色就可以。

#### 不犯二准则

准则内容如下：对于非浮层元素，避免设置 z-index 值，z-index 值没有任何道理需要超过2。这是一条经验准则，可以有效降低日后遇到 z-index 样式问题的风险。

我从业这么多年，遇到很多复杂的与定位相关的交互场景，但 z-index 最多止步于2。

这里的不犯二准则，并不包括那些在页面上飘来飘去的元素定位，弹框、出错提示、一些下拉效果等都不受这一准则限制。对于这些 JS 驱动的浮层组件，我会借助 "层级计数器" 来管理。

所谓层级计数器，实际上就是一段 JS 脚本，会遍历所有 body 处于现实状态的子元素，并得到最大 z-index 值，和默认 z-index 做比较。如果超出，则显示的组件的 z-index 自动加1。默认的 z-index 值我习惯设成 9。

```js
Array.from(document.all)
  .map(e => +window.getComputedStyle(e).zIndex || 0)
  .reduce((acc, val) => val > 999 ? acc : Math.max(acc, val), 9)
```

页面上主体元素遵循 z-index "不犯二"准则，浮层元素 z-index "层级计数器"双管齐下，从此和 z-index 问题说拜拜。
