# CSS3

CSS3 对原有 CSS 规范进行了增补，并分成了不同的模块。以下列出了最重要的一些 CSS3 模块：

* 选择器 - Selectors
* 盒模型 - Box Model
* 背景和边框 - Backgrounds and Borders
* Image Values and Replaced Content
* 文字特效 - Text Effects
* 变形 - 2D/3D Transformations
* 动画 - Animations
* 多栏 - Multiple Column Layout
* 用户界面 - User Interface

现代浏览器已实现了大多数 CSS3 属性。
- - - 

## 重点新属性摘要

[Mozilla CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

#### CSS3 Background and Borders 背景和边框

##### border-radius

```
border-radius: [length|%]/[length|%]{1-4} |initial|inherit;
border-top-left-radius
border-top-right-radius
border-bottom-right-radius
border-bottom-left-radius
```

```less
border-radius: 15px 50px 30px 5px;  // 只指定 1 / 2 / 3 个值的情况同 border
border-radius: 50px/15px;  // 创建椭圆形的圆角
```

##### border-image

```
border-image: source slice [width] [outset] repeat;
border-image-source
border-image-slice: [ number|% ]{1,4} && fill?; 数值不能带单位 px
border-image-width
border-image-outset:
border-image-repeat: stretch|repeat|round; 默认 stretch - 拉升，常用 round - 重复且取整
```

The `border-image-slice` CSS property divides the image specified by border-image-source in nine regions: the four corners, the four edges and the middle. It does this by specifying 4 inwards offsets(top right bottom left).

```less
border-image: url(border.png) 30% round;
```

##### background

```
background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment
background-clip
background-image
background-origin
background-size
```
```less
background: url(img_flwr.gif) right bottom/25% no-repeat, url(paper.gif) left top repeat;  // 多图
```

#### CSS3 Colors 颜色

CSS supports color names, hexadecimal and RGB colors.  
In addition, CSS3 also introduces: RGBA colors, HSL colors, HSLA colors, opacity.

#### CSS3 Web Fonts 自定义字体

The @font-face CSS at-rule allows authors to specify online fonts to display text on their web pages.

```less
@font-face {
   font-family: myFirstFont;
   src: url(sansation_light.woff);  // woff 是目前 2017 最佳选择字体
}
@font-face {  // You must add another @font-face rule containing descriptors for bold text
   font-family: myFirstFont;
   src: url(sansation_bold.woff);
   font-weight: bold;
}
div { font-family: myFirstFont; }  // 使用字体
```

偶尔可以玩玩英文字体，中文字体文件一般很大就算了。字体资源参考后面的资源部分内容。

#### CSS3 Gradients 渐变

注意：渐变创建的是 image 而非 color

##### linear-gradient / repeating-linear-gradient

```
background / background-image: linear-gradient([<direction>,]? <color-stop> [, <color-stop>]+ );  
repeating-linear-gradient([<angle>|to <side-or-corner>,]? <color-stop> [, <color-stop>]+ )
```

`color-stop`: This value is comprised of a `color` value, followed by an optional stop position (either a percentage between 0% and 100% or a `length` along the gradient axis).

```less
background: linear-gradient(to bottom right, red, yellow);  // 向右下线性渐变
background-image: linear-gradient(-90deg, red, yellow);  // 角度线性渐变
background: linear-gradient(red, yellow, green);  // 多色线性渐变
background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));  // 透明色线性渐变
background: repeating-linear-gradient(red, yellow 10%, green 20%);  // 重复线性渐变
```

##### radial-gradient / repeating-radial-gradient
```
radial-gradient([circle || <extent-keyword>]? [at <position>,]? <color-stop> [,<color-stop>]+ )
repeating-radial-gradient
```

`<extent-keyword>`: closest-side / closest-corner / farthest-side / farthest-corner

```less
background: radial-gradient(red, yellow, green);
background-image: radial-gradient(red 5%, yellow 15%, green 60%);
background: radial-gradient(farthest-corner at 45px 75%, red, rgba(0, 0, 255, 0) 50%, black);
background: repeating-radial-gradient(red, yellow 10%, green 15%);  // 重复放射渐变
```

#### CSS3 Shadow Effects 阴影

##### box-shadow

```less
/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
/* inset | offset-x | offset-y | color */
box-shadow: inset 5em 1em gold;
/* Any number of shadows, separated by commas */
box-shadow: 3px 3px red, -1em 0 0.4em olive;
```

##### text-shadow

```less
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
/* color | offset-x | offset-y | blur-radius */
text-shadow: #CCC 1px 0 10px;
```

#### CSS3 Transforms 变形

Property | Description
-- | --
transform | Applies a 2D or 3D transformation to an element
transform-origin | Allows you to change the position on transformed elements
transform-style | Specifies how nested elements are rendered in 3D space
perspective | Specifies the perspective on how 3D elements are viewed
perspective-origin | Specifies the bottom position of 3D elements
backface-visibility | Defines whether or not an element should be visible when not facing the screen

```less
transform: translate(50px, 100px);  // translate(x,y) 偏移 translateX(n) translateY(n)
transform: rotate(-20deg);  // 旋转
transform: scale(0.5, 3);  // scale(x,y) 缩放 scaleX(n) scaleY(n)
transform: skew(20deg, 10deg);  // skew(x-angle,y-angle) 扭曲 skewX(angle) skewY(angle)
/* matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY()) */
transform: matrix(1, -0.3, 0, 1, 0, 0);  // 矩阵
```

```
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)  Defined a 3D transformation, using a 4x4 matrix of 16 values
translate3d(x,y,z) translateX(x) translateY(y) translateZ(z)
scale3d(x,y,z) scaleX(x) scaleY(y) scaleZ(z)
rotate3d(x,y,z,angle) rotateX(angle) rotateY(angle) rotateZ(angle)
perspective(n)
```

#### CSS3 Transitions 过渡

```less
transition-property: width;
transition-duration: 2s;
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n);
transition-delay: 1s;
transition: width 2s linear 1s;  // 上面几项的简写
transition: width 2s, height 2s, transform 4s;  // 可以同时指定多个属性，且分别指定时长
```

采用渐变要考虑到对性能的影响，尽量避免对会导致页面重构的属性应用渐变，如 padding margin font-size 等。

#### CSS3 Animations 动画

```html
<style>
div { width: 100px; height: 100px; background-color: red; position: relative; }
.animate {
  animation-name: example;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* animation: example 5s linear 2s infinite alternate; */
}
@keyframes example {
  0%   {background-color:red; left:0px; top:0px;}  /* 也可用 from */
  25%  {background-color:yellow; left:200px; top:0px;}
  50%  {background-color:blue; left:200px; top:200px;}
  75%  {background-color:green; left:0px; top:200px;}
  100% {background-color:red; left:0px; top:0px;}  /* 也可用 to */
}
</style>
<div class="animate"></div>
```

#### CSS3 Flexbox 柔性布局

参考资源： 
[Flex 布局教程 -- 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) +
[CSS Flexible Boxes Layout specification -- W3C](http://www.w3.org/TR/css3-flexbox/)

布局的传统解决方案，基于盒状模型，依赖 `display` + `position` + `float`。 2009年，W3C 提出了 Flex 布局，可以简便、完整、响应式地实现各种页面布局。可以把 `flex` 简单理解为 `float` 的升级版本。

##### Flex Box Properties

```less
.box {
  display: flex | inline-flex;
  flex-direction: row (default) | row-reverse | column | column-reverse;  // 排列方向
  flex-wrap: nowrap (default) | wrap | wrap-reverse;                      // 折行
  flex-flow: <flex-direction> <flex-wrap>;                                // 前两项的简写
  justify-content: flex-start (default) | flex-end | center |             // 水平对齐
                   space-between (两端对齐) | space-around (等间距);
  align-items: flex-start | flex-end | center |                           // 垂直对齐-单轴
               baseline (项目的第一行文字的基线对齐) | stretch (default);
  align-content: flex-start | flex-end | center |                         // 垂直对齐-多轴
                 space-between | space-around | stretch (default);
}
```

注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

##### Flex Item Properties

```less
.item {
  order: <integer>;             // 定义项目的排列顺序，数值越小，排列越靠前，默认为 0
  flex: none (0 0 auto) | auto (1 1 auto) |  // flex-grow, flex-shrink, and flex-basis 三者的简写形式
        [<flex-grow> <flex-shrink> <flex-basis>]; // 默认值 0 1 auto
  flex-grow: <number>;         // 如果有剩余空间，各项目的扩张系数，默认为 0，即不放大
  flex-shrink: <number>;       // 空间不足时各项目的收缩系数，默认为 1，为 0 时该项不收缩
  flex-basis: <width> | auto;  // 指定项目占用的基准宽度 [注1]
  align-self: auto | flex-start | flex-end | // 对单个项目设置特定的对齐方式，覆盖 container 的 align-items
              center | baseline | stretch;
}
```

注1：`max-width` | `min-width` 优先于 `flex-basis` 优先于 `width` 优先于 content(实际内容宽度)  [参考链接](https://www.jianshu.com/p/17b1b445ecd4)

#### Media Query 媒体查询

媒体查询中最常用的媒体特性:

```
width / min-width / max-width
height / min-height / max-height
device-width / min-device-width / max-device-width
device-height / min-device-height / max-device-height
orientation
```

提示: 目前最流行的媒体特性是 `max-device-width`(用于创建手机版网站)、`max-width`(用于针对窗口宽度设定不同的样式)和 `orientation`(用于根据平板电脑或iPad的横向或竖向来改变布局)。

注: 不理解媒体查询的浏览器(如IE8)会忽略这些新样式。

```less
@media (max-width: 568px) { ... }
@media (min-width: 400px) and (max-width: 700px) { ... }
```

替换整个样式表:

```html
<head>
  <link rel="stylesheet" media="(min-width: 568.01px)" href="standard.css">
  <link rel="stylesheet" media="(max-width: 568px)" href="small_styles.css">
  <!--[if lt IE 9]><link rel="stylesheet" href="standard.css"><![endif]-->
</head>
```

## 网络资源

* [picturefill](https://github.com/scottjehl/picturefill): A responsive image polyfill for &lt;picture&gt;, srcset, sizes, and more
* [-prefix-free](http://leaverou.github.io/prefixfree): 浏览器加载时自动添加厂商前缀
* [Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor): 渐变在线调试工具
* [CSS Gradient Background Maker](http://tinyurl.com/ms-gradient): 微软的渐变在线调试工具
* [REM-unit-polyfill](https://github.com/chuckcarpenter/REM-unit-polyfill): 为 IE8 提供 rem 单位支持
* http://caniuse.com : 当查找一个 CSS3 特性的浏览器支持情况
* [3D transforms](http://css3.bradshawenterprises.com/transforms/#css3dtransforms): 3D 变形示例
* [Font Squirrel](http://www.fontsquirrel.com) 它提供了大概1000种免费使用的字体
* [Google Fonts](http://www.google.com/fonts) 谷歌提供的在线 Web 字体解决方案
* [Modernizr]()


## 教程笔记

### 使用 CSS3

因为 CSS3 还在微调中，所以它与 HTML5 一样，都存在兼容性问题。因此，每一位网站开发者都要自己决定使用什么，不使用什么，以及如何做好不同用户体验之间的衔接工作。在打算在网站中使用CSS3之前，你有三个选择。

选择一：用能用的。如果某个功能得到了所有浏览器的支持，自然就可以放心使用，如 word-wrap 属性。  
选择二：将 CSS3 功能作为增强。这个选择的中心思想，就是利用 CSS3 来添加装饰，即使用户的浏览器不支持也无伤大雅。比如 border-radius 属性。  
选择三：Modernizr

先声明一个常规属性，再用更高级的属性覆盖（老浏览器能展示基础效果，而新浏览器能提供增强的显示效果），通过这种方式可以实现最大的兼容性，但在某些情况下，覆盖样式属性也不能奏效，因为需要以组合的方式来设置属性。要解决这个问题，可以使用 Modernizr。

在页面加载完 Modernizr 后，它会迅速检测一批 HTML5、JavaScript 和 CSS3 功能的支持情况。然后，为 `<html>` 元素应用一大堆类，如果列出的类名中包含某个功能，说明浏览器支持该功能。如果表示相应功能的类名前缀为“no-”，那说明浏览器不支持该功能。

```css
/* 为所有标题设置样式，无论浏览器是否支持CSS3 */
header { background-color: #7695FE; }
/* 为支持 border-radius 属性的浏览器设置样式 */
.borderradius header { border: thin #336699 solid; border-radius: 25px; }
/* 为不支持 border-radius 属性的浏览器设置样式 */
.no-borderradius header { border: 5px #336699 double; }
```

#### 有开发商前缀的特定于浏览器的样式

制定CSS标准的人在引入新功能时，经常会遭遇“蛋和鸡”的困局。为了让一项功能臻于完美，他们需要听到浏览器开发商和Web设计人员的反馈。但是，为了得到这些反馈，必须先让浏览器开发商和Web设计人员实现还不够完美的功能。这样就会形成一个试验和反馈循环，经过反复多次修订，最终定案。在此期间，无论是功能的语法还是实现，都会发生变化。于是不可避免地会导致非常现实的风险：某些Web设计人员会学习这些新功能，然后将其用在自己的网站中，而将来标准万一有变化，就可能导致网站无法使用。为了避免这种风险，浏览器开发商使用了一种叫做开发商前缀（vendor prefix）的办法，即为还在开发中的CSS属性和功能加上特定浏览器实现的前缀。

### CSS3 与响应式 Web 设计

#### 媒体查询

通过媒体查询，可以让网站根据窗口大小或设备的不同，无缝地在不同的样式集之间切换。媒体查询是移动Web开发的基本技术。它还可以确保网站能够自适应浏览器窗口大小的变化。比如，窗口缩小时隐藏布局中的一栏，或者把导航链接从页面顶部转移到页面一侧。这种自适应可以归结为现在广为流行的一个设计理念：响应式设计。

注意: 只有媒体查询不足以将常规网站转换成移动友好的网站。考虑到用户体验，你可能还得把内容切分成小块（减少滚动），去掉那些在触摸屏上难以控制的效果和交互手段（如弹出菜单）。

##### 媒体类型

CSS 的制定者们在 CSS2.1 中尝试解决过多设备的问题，当时引入了所谓的“媒体类型”。 media 属性已难以胜任当今各种移动上网设备的需要，但通过它提供打印样式表还是个不错的方式。

```html
<link rel="stylesheet" media="print" href="print_styles.css">
```

##### 媒体查询与视频

`<source>` 元素用于指定 `<video>` 元素播放的媒体文件，通过添加 media 属性，可以限制某些设备只能下载对应的文件。你可以针对移动用户将视频重新编码。

```html
<video controls width="400" height="300">
<source src="butterfly_mobile.mp4" type="video/mp4" media="(max-device-width: 480px)">
<source src="butterfly.mp4" type="video/mp4">
</video>
```

#### 关于单位 em rem px 以及各自的使用场景

[何时使用 Em 与 Rem](http://webdesign.tutsplus.com/zh-hans/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984): 正确认识和使用 rem em px 的“正确”指引（绝非半桶水写的似是而非的教程）。

##### 关于网页缩放
以前的定义是，em 是相对单位，而 px 是绝对单位，em 支持缩放，而 px 不支持缩放。很多文章的建议是用 em，但这种说法完全已经过时，现代浏览器中 em px 都支持缩放，已经没有差别。

##### rem 与 em 的精髓
Rem 单位提供最伟大的力量并不仅仅是他们提供一致尺寸而不是继承。相反，它给了我们一个途经去获取用户的偏好来影响网站中每一处使用 rem 的元素大小，而不再是使用固定的 px 单位。使用 rem 单位的主要目的应该是确保无论用户如何设置自己的浏览器，我们的布局都能调整到合适大小。

有一个比较普遍的误解，认为 em 单位是相对于父元素的字体大小。事实上，根据 W3C 标准，它们是相对于使用 em 单位的元素的字体大小。父元素的字体大小可以影响 em 值，但这种情况的发生，纯粹是因为继承。

em 单位的主要目的应该是允许保持在一个特定的设计元素范围内的可扩展性。设计组件比如按钮，菜单和标题可能会有自己明确的字体大小。 当你修改字体大小的时候，你希望整个组件都适当缩放，这时使用 em 是最佳选择。

##### 正确理解 rem 与 em
使用 em 和 rem 单位可以让我们的设计更加灵活，能够控制元素整体放大缩小，而不是固定大小。

主要区别：Em 和 rem 单位之间的区别是浏览器根据谁来转化成 px 值，理解这种差异是决定何时使用哪个单元的关键。

* rem 和 em 单位是由浏览器基于你的设计中的字体大小计算得到的像素值。
* em 单位基于使用他们的元素的字体大小。
* rem 单位基于 html 元素的字体大小。
* em 单位可能受任何继承的父元素字体大小影响
* rem 单位可以从浏览器字体设置中继承字体大小。
* 使用 em 单位受继承影响，继承效果只能被明确的字体单位覆盖，比如 px,vw

##### rem 与 em 的使用场景

* 使用 em 单位应根据组件的字体大小而不是根元素的字体大小。
* 在不需要使用em单位，并且需要根据浏览器的字体大小设置缩放的情况下使用rem。
* 使用 rem 单位，除非你确定你需要 em 单位，包括对字体大小。
* 媒体查询中使用 rem 单位
* 不要在多列布局中使用 em 或 rem -改用 %。
* 不要使用 em 或 rem，如果缩放会不可避免地导致要打破布局元素。

**重要提示:**

一些设计师使用结合 rem 单位的方式给 html 元素设置了一个固定的 px 单位。这是很普遍的做法，所以改变 html 元素的字体大小时，可以使整个页面做相应调整，我强烈反对种做法，因为它重写了用户设置的浏览器字体大小。更夸张的说，这剥削了用户自行调整以获得最佳视觉效果的能力。

如果您确实需要更改 html 元素的字体大小，那么就使用 em，rem 单位，这样根元素的值还会是用户浏览器字体大小的乘积。这将允许您通过更改您的 html 元素的字体大小，调整你的设计，但仍会保留用户的浏览器设置的效果。

> **小贴士**  
> 创建布局时，往往要以像素为单位更方便，但部署时应使用 rem 单位。  
> 一个站点最初设计可以专注于最常见的默认浏览器中字体大小 16px。  
> 你可以使用预处理比如 Stylus / Sass / Less，来自动转换单位或 PostCSS 之类的插件。  
> 或者，您可以使用 PXtoEM 手动做您的转换。

##### 认识手机的像素

最新的高分辨率设备引入了一个比例，叫像素比（pixel ratio）。比如，所有 iPad 都会报告自己的宽度是768，但 iPad3 的物理像素宽度其实两倍于此。所以网页开发人员不必关注手机实际的物理像素，可以像平时一样使用 px

#### 理解视口

苹果公司在推出 iPhone 的时候，为了让 iPhone 的小屏幕尽可能完整显示当时的网站，发明了“视口”这个概念。当时的网站设计师还不知道什么是响应式设计呢。有了视口的概念之后，iPhone 上的 Safari 浏览器就可以显示更多的网页内容，而不仅仅是显示网页的一个角落。这个能缩小显示网页的区域，就叫视口。

视口这种技术是权衡折衷的产物。它可以保证网页在手机上看起来更像在桌面浏览器中的样子。可这样一来，网页中的文字就小得难以辨认了。用户滚动页面的操作减少了，但放大缩小的操作增加了。用户能更容易找到网页中自己关注的部分，但要阅读其中的内容就会比较麻烦。

注意 苹果引入视口的概念后，所有移动开发者也都认同了这个做法。唯一的区别就是设定多大的视口，以及显示页面的多大部分。

如果你开发的网站只针对桌面浏览器，那不用管设备的视口。视口的默认设置会确保网站在超小的屏幕上也能显示得有模有样（尽管用户可能并不会觉得缩小后的网站非常方便）。可是，如果你想做的就是响应式设计，就是要设计一个真正的、移动设备友好的网站，那就得修改视口的设置。你得告诉浏览器不要自动执行视口缩放，很简单，只要像下面这样在页面的 `<head>` 部分加一个 `<meta>` 元素即可：

```html
<meta name="viewport" content="initial-scale=1">
```

