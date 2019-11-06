# 响应式设计


## 响应式布局 Responsive Layout

### Desktop First vs Mobile First

Desktop First

* Start writing CSS for the desktop: large screen;
* Then, media queries shrink design to smaller screens.

```css
html { front-size: 20px; }
@media (max-width: 600px) {  // max-width
  html { font-size: 16px; }
}
```

```css
@media (max-width: 600px) {  }  /* CSS2 */
@media (width <= 600px)   {  }  /* MQL4 */
```

Mobile First

* Start writing CSS for mobile devices: small screen;
* Then, media queries expand design to a large desktop screen;
* Forces us to reduce websites and apps to the absolute essentials.

```css
html { front-size: 16px; }
@media (min-width: 600px) {  // min-width
  html { font-size: 20px; }
}
```

```css
@media (min-width: 600px) {  }  /* CSS2 */
@media (width >= 600px)   {  }  /* MQL4 */
```

https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/china 双击图片看大图

<img src="./images/comparison-CN.png" style="width: 50%; float: left;">
<img src="./images/stat-resolution.png" style="width: 50%; float: left;">

![](./images/resolution.png)

### Breakpoints

响应式开发的本质是针对多种屏幕做适配，在实际开发中，通常情况下是对主流的设备适配。

首先，需要掌握几个基本概念：
  * 物理像素 - 设备的屏幕实际像素点，即通常说的设备分辨率
  * 设备独立像素 - 逻辑像素，用于定义应用的 UI
  * 屏幕像素比 devicePixelRatio - 物理像素与设备独立像素的比值

|||
|----------|---------------------------------------------------------
| 375x667  | iPhone7, 6, 6S
| 414x736  | iPhone7P, 6SP, 6P
| 320x568  | iPhone5, 5S, 5C, SE
| 360x640  | Galaxy S7, S6, S5, S4, S3, Note4, Note3, Note2; Mi4, 3
| 768x1024 | iPad 全系列

||||
|------------|---------|--------------------------------------------------
| Mobile     | <= 600  | 320x568  360x640  375x667  480x800
| Tablet     | <= 900  | 720x1280  768x1024
| Laptop     | <= 1200 | 1024x768
| Desktop    | <= 1800 | 1280x800  1280x1024  1366x768  1440x900  1600x900
| Widescreen |         | 1920x1080

利用 SCSS mixin 优化开发体验：

```scss
@mixin mobile {
  @media (max-width: 600px) { @content }
}

html {
  font-size: 62.5%;
  @include mobile {
    font-size: 50%;
  }
}
```

改进版的 mixin (`@mixin` `@if` `@content` `@include`)：

```scss
// 基于 1280 设备设计，其他设备做特别调整
// 没有直接用 px 是允许用户自定义字体大小
// 此处的 em 不受 html 中定义的 rem 影响，直接取自浏览器，只要用户没改就是 16px
@mixin respond($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 37.5em) { @content }  // 600px
  }
  @if $breakpoint == tablet {
    @media (max-width: 56.25em) { @content } // 900px
  }
  @if $breakpoint == laptop {
    @media (max-width: 75em) { @content }    // 1200px
  }
  @if $breakpoint == widescreen {
    @media (min-width: 112.5em) { @content } // 1800px
  }
}

html {
  font-size: 62.5%;           // 1rem=10px
  @include respond(tablet) {
    font-size: 50%;           // 1rem=8px
  }
  @include respond(widescreen) {
    font-size: 75%;           // 1rem=12px
  }
}
```

### 开发调试 DevTools

![](./images/devtools.png)


## 开发响应式页面

### 定义视口 Viewport

在一台 iPhone5 上以下 div 并不会铺满整个屏幕，因为视口的默认宽度是 980 像素。

```html
<div style="width: 320px; height: 320px; background-color: gray;"></div>
```

通过设置 `viewport` 属性，可以调整用户界面的逻辑大小。`viewport` 使得开发者不必过多关心设备的物理分辨率，降低了适配不同尺寸屏幕的难度。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```html
<meta name="viewport" content="initial-scale=1, user-scalable=no, viewport-fit=cover">
```

### 度量基准 `rem`

CSS 中的计量单位包括 `px` `pt` `em` `rem` 等，其中 `em` font size of the element 是相对于当前元素的字体大小的计量单位，而 `rem` font size of the root element 是指相对于根元素的字体的大小。

`rem` 单位主要用于移动 Web 开发，以适配不同尺寸的屏幕。

`rem` 单位是相对于网页根元素的字号大小而定，所以实现 `rem` 布局开发时，首先要做的就是对根元素赋值。

```scss
html {
  // This defines what 1rem is
  font-size: 62.5%; // 1 rem = 10px; 10px/16px = 62.5%
}
```

后续定义样式时，原来用 `px` 的地方全部用 `rem` 替换，某些特别小的值除外。

```scss
.footer__copyright {
  width: 80%;
  float: right;
  padding-top: 2rem;           // 正常全部用 rem，20px 改成 2rem
  border-top: 1px solid gray;  // 此处还有 1px
  font-size: 1.4rem;
}
```

这样，后续要适配不同屏，只要改 `rem` 一个地方就好。

```scss
html {
  font-size: 62.5%;  // 1rem=10px
  @media (max-width: 56.25em) {    // width <= 900px
    font-size: 50%;  // 1rem=8px
  }
  @media (min-width: 112.5em) {    // width >= 1800px
    font-size: 75%;  // 1rem=12px
  }
}
```

### 媒体查询 Media Queries

采用媒体查询，可以给不同的设备应用不同的样式。这样在编写 CSS 的时候，先定义统一的样式，然后再根据不同的设备优化展示效果，从而使得在不同设备上都能得到更好的用户体验。

```scss
.wrapper {
  padding-top: 50px;
  background: #fff;
}
@media screen and (min-width: 640px) {  // width >= 640px 的屏幕
  .wapper {
    width: 480px;
    margin: 0 auto;
  }
}
```

媒体查询有两种用法，一个是定义在 CSS 中，另一种是直接定义在页面的 `link` 元素中，采用 `media` 属性，在这种情形下，引用的 CSS 资源始终会加载，并由 `media` 属性中定义的条件来决定引用的样式是否生效。

```html
<link rel="stylesheet" media="(max-width: 800px)" href="example.css">
```


## 响应式图片 Responsive Images

The goal of responsive images is to serve the *right image* to the *right screen size* and device, in order to avoid downloading unnecessary large images on smaller screens.

* Resolution Switching - 小屏用低分辨率图片
* Density Switching - 高分屏用 @2x @3x 高分辨率图片
* Art Direction - 根据不同的屏幕选择不同的图片，如 portrait 和 landscape 用不同图片

### In HTML

不支持 `srcset` 属性的老版浏览器会正常显示 `src` 指定的图片，所以不存在兼容性问题。

在线示例 https://webkit.org/demos/srcset/

```html
<img src="image-1x.png" srcset="image-1x.png 1x, image-2x.png 2x, image-3x.png 3x">  x 语法最先支持
<img src="small.jpg" srcset="medium.jpg 1000w, large.jpg 2000w" alt="">              w 语法后支持
```

精讲示例1

How to use the `srcset` attribute on the `<img>` and `<source>` elements, together with density descriptors;  
How and why to use the `<picture>` element for art direction;  
How to write media queries in HTML.

```html
<picture class="footer__logo">
    <source srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x"
            media="(max-width: 37.5em)">
    <img src="img/logo-green-2x.png" srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x" alt="">
</picture>
```

精讲示例2

How to allow the browser to decide the best image to download, using the `srcset` attribute, width descriptors, and the `sizes` attribute of the `<img>` element.

```html
<img srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
     sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
     src="img/nat-1-large.jpg" alt="photo">
```

### In CSS

How to implement responsive images in CSS;  
How to use resolution media queries to target high-resolution screens with 2x.  
How to combine multiple conditions in media queries.

Units https://developer.mozilla.org/en-US/docs/Web/CSS/resolution

|||
|--------|-------------------------------------------------------------------
| `dpi`  | Represents the number of *dots per inch*. Screens typically contains 72 or 96 dots per inch
| `dpcm` | Represents the number of *dots per centimeter*. 1dpcm ≈ 2.54dpi
| `dppx` | Represents the number of *dots per px* unit.
| `x`    | Alias for dppx. Due to the 1:96 fixed ratio of CSS `in` to CSS `px`, *1x == 96dpi*

```scss
.header {
  background-image: url(../img/hero-small.jpg);

  // `and` 是与  `,` 是或
  @media only screen and (min-resolution: 192dpi) and (min-width: 37.5em),            // Standard
         only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em), // Safari only
         only screen and (min-width: 125em) {
    background-image: url(../img/hero.jpg);
  }
}
```

```scss
@mixin bg-image($url) {
  background-image: url($url);
  @media (min-resolution: 2dppx) {
    backgrond-image: url($url + "@2x.png");
  }
  @media (-webkit-min-device-pixcel-ratio: 2) {
    backgrond-image: url($url + "@2x.png");
  }
  @media (min-resolution: 3dppx) {
    backgrond-image: url($url + "@3x.png");
  }
  @media (-webkit-min-device-pixcel-ratio: 3) {
    backgrond-image: url($url + "@3x.png");
  }
}

.box {
  @include bg-image("logo")
  background-size: 30px 18px;
}
```
