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

很多人会认为 normal 应该对应一个具体的行高值，实际上 normal 是一个和 font-family 有着密切关联的变量值，也就是说，改变字体会影响到 line-height 的计算值。

乍一看，似乎 line-height:1.5  line-height:150%  line-height:1.5em 这三种用法是一模一样的，实际上，line-height:1.5 和另外两个有一点儿不同，那就是 **继承** 细节有所差别。如果使用数值作为属性值，那么所有的子元素继承的都是这个值；但是，如果使用百分比或者长度值作为属性，那么所有的子元素继承的是最终的计算值。

关于 line-height 重置的讨论... 如果使用的是长度值，我建议直接 20px，排版时候计算很方便。如果随大流使用的是数值，我建议最好使用方便计算的行高值，不妨使用 1.5。

```css
body { line-height: 150%; }
input, button { line-height: inherit; }
```

注意，在 CSS 中，计算行高时，行高值一定不要向下舍入，而要向上舍入，如 14x1.42857 非常接近 20px，但最终浏览器还是会以 19px 呈现，而 14x1.42858 则如预期显示 20px。

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

抛开 inherit 这类全局属性值不谈，我把 vertical-align 属性值分为以下4类：
  * 线类，如 baseline(默认值)  top  middle  bottom
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

**inline-block 与 baseline**

vertical-align 属性的默认值 baseline 在文本之类的内联元素那里就是字符 x 的下边缘，对于替换元素则是替换元素的下边缘。但是，如果是 inline-block 元素，则规则要复杂了：一个 inline-block 元素，如果里面没有内联元素，或者 overflow 不是 visible，则该元素的基线就是其 margin 底边缘，否则其基线就是元素里面最后一行内联元素的基线。

背景小图标与文字对其的案例，略。

**top 与 bottom**

顾名思义，vertical-align:top 就是垂直上边缘对齐，具体定义如下：
  * 内联元素，元素顶部和当前行框盒子的顶部对齐
  * table-cell 元素，元素顶 padding 边缘和表格行的顶部对齐

vertical-align:bottom 声明与此类似。

内联元素的上下边缘对齐的这个 "边缘" 是当前 "行框盒子" 的上下边缘，并不是块状容器的上下边缘。

虽然同属线性类属性值，但是 top/bottom 和 baseline/middle 却是完全不同的两个帮派，前者看齐看边缘看行框盒子，而后者是和字符 x 打交道，注意区分。

**middle 与近似垂直居中**

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

浮动属性用来布局非常符合现实世界的认知，就像搭积木，把元素一个一个定宽定高，通过浮动一个一个堆积起来，理论上一个 float:left 声明几乎就可以把整个页面结构都弄出来，而且内联元素的间隙问题、margin 合并问题都没有，对于新手，不知道多开心。

乍一看，float 好像也能满足我们布局页面的需求，但实际上，这种砌砖头式的布局方式缺少弹性，布局的容错性很糟糕。...说这么多就是要告诉大家：浮动是魔鬼，少砌砖头、少浮动，要更多地去挖掘 CSS 世界本身的 "流动性" 和 "自适应性"，以构建能够适用于各种环境的高质量的网页布局。

我们在开发移动端时，不可避免要面对各种设备尺寸的问题，加上横竖屏切换，其可变的外部环境非常之多，尤其在初期，很多人有这样的想法：固定宽度 320px，然后左右留白；抑或是 320px布局，然后根据比例缩放整个页面以 100% 填满屏幕宽度。这些想法最大的问题在于思维方式还是"刚"式思维。记住，CSS 设计的初衷就是表现如水流，富有弹性，"砖头式思维"是逆道而行，是绝不可取的。

如果进一步深究，"刚"式思维的主要原因还在于开发人员对 CSS 的了解不够深入，没有能够了解到其表层属性之下更深入的流动性和自适应性。好在 CSS3 出现了类似 flex 弹性盒子布局这种更表层、更上层、更浅显、更直白的 CSS 属性，以另外一种更加简单的方式让大家不得不适应的方式去实现布局。

纯浮动布局容错性差，容易出现比较严重的布局问题，还有就是，float 本身就是魔鬼属性，容易出现意料之外的情况，这里的意料之外除了 float 属性自身特性(如父元素高度坍塌)导致的布局问题外，还包括诸多兼容性问题。

float 属性的种种归根结底还是由于自身各种特性导致的，float 的特性：
  * 包裹性
  * 块状化并格式化上下文，元素一旦 float 不为 none，其 display 计算值就是 block 或 table
  * 破坏文档流，这时该属性的万恶之源，也是其立命之本，是其作用机制之所在
  * 没有任何 margin 合并

#### 作用机制

float 属性有个著名的特性表现，就是会让父元素的高度塌陷，大多数场景下，这种特性会影响 "正常的" 布局。float 属性的原本作用只是为了实现文字环绕效果，所以让父元素高度坍塌是符合预期的，但后面 float 被大量用来布局，显然，布局的时候是不需要父元素坍塌的，于是高度坍塌这种特性反而成为了 float 属性一个不得不重视的坑。

高度坍塌只是让跟随的内容可以和浮动元素在一个水平线上，但这只是实现 "环绕效果" 的条件之一，要想实现真正的 "环绕效果"，就需要另外一个平时大家不太在意的特性，那就是 "行框盒子和浮动元素的不可重叠性"，也就是，行框盒子如果和浮动元素的垂直高度有重叠，则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠。

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

至此，浮动作用的基本机制算是介绍完了，那么了解 float 属性的作用机制有什么用呢？很有用，除了下一节会着重介绍基于 float 属性的流体布局之外，很有很有用的一点就是让我们一下子知道一些意外场景发生的原因以及如何快速对症下药。

#### float 与流体布局

我们可以利用 float 破坏 CSS 正常流的特性，实现两栏或多栏的自适应布局。

```css
.father { overflow: hidden; }
.father .left-nav { width: 60px; float: left; }
.father .content { margin-left: 70px; }
```

### float 的天然克星 clear

官方对 clear 属性的解释是，元素盒子的边不能和前面的浮动元素相邻。虽然有些拗口，但是有一点可以体会出来，就是设置了 clear 属性值的元素自身如何如何，而不是让 float 元素如何如何。我对 clear 属性的理解是这样的：
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

  <div class="desc">虽然 .father 父元素的最后设置了 clear:both 来阻止浮动对后面元素的影响，但是最后错位依然发生了</div>
</div>

## CSS 世界的结界 BFC























## CSS 世界的层叠规则


