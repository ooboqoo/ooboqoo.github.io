# CSS Snippets

https://atomiks.github.io/30-seconds-of-css/


## Layout

### 垂直方向百分比值使用

#### 规则

Here are the rules for percentages on vertical items:

* `margin-top` `margin-bottom` `padding-top` `padding-bottom` 的百分比值是基于父元素的 **width** 来计算的
* `height` `min-height` `max-height` 的高度是基于外层元素的 **height** 来计算的
  * 高度百分比生效的条件 https://developer.mozilla.org/en-US/docs/Web/CSS/height
    * 父元素明确指定高度，此时以指定高度为计算基准
    * 元素采用绝对定位，此时会逐层往上查找基准元素 relative absolute fixed
* `border-width` 属性不支持百分比

```html
<!-- 父元素明确指定高度，子元素高度百分比  有效 -->
<div style="width: 200px; height: 100px; background-color: #f99;">Parent
  <div style="width: 50%; height: 50%; border: 1px solid #00f;">Child 有效</div>
</div>
<!-- 祖父元素明确指定高度，父元素无高度，子元素高度百分比  无效 -->
<div style="width: 300px; height: 150px; background-color: #9f9;">Grand
  <div style="background-color: #f99;">Parent
    <div style="width: 50%; height: 50%; border: 1px solid #00f;">Child 无效</div>
  </div>
</div>
<!-- 元素指定 position: absolute 后，高度百分比有效，会逐层往上查找基准元素 relative absolute fixed -->
<div style="position: relative; width: 400px; height: 150px; background-color: #ff9;">Grand
  <div style="background-color: #f99;">Parent
    <div style="position: absolute; width: 50%; height: 50%; border: 1px solid #00f;">Child 有效</div>
  </div>
</div>
```

<div class="demo">
  <!-- 父元素明确指定高度，子元素高度百分比  有效 -->
  <div style="width: 200px; height: 100px; background-color: #f99;">Parent
    <div style="width: 50%; height: 50%; border: 1px solid #00f;">Child 有效</div>
  </div>
  <!-- 祖父元素明确指定高度，父元素无高度，子元素高度百分比  无效 -->
  <div style="width: 300px; height: 150px; background-color: #9f9;">Grand
    <div style="background-color: #f99;">Parent
      <div style="width: 50%; height: 50%; border: 1px solid #00f;">Child 无效</div>
    </div>
  </div>
  <!-- 元素指定 position: absolute 后，高度百分比有效，会逐层往上查找基准元素 relative absolute fixed -->
  <div style="position: relative; width: 400px; height: 150px; background-color: #ff9;">Grand
    <div style="background-color: #f99;">Parent
      <div style="position: absolute; width: 50%; height: 50%; border: 1px solid #00f;">Child 有效</div>
    </div>
  </div>
</div>

注：CSS3 中引入了 `vh` 单位，表示视窗 viewport 的百分之一高度，所以任何元素定义了 `styles="height: 100vh;"` 就能撑满屏幕。IE9 开始才支持 `vh` `vw` `rem` 这几个单位。

#### 设定固定宽高比

需求：在保持 item 元素宽高比恒定的情况下，使得 item 元素可以和父元素同比缩放。

分析：我们知道，如果当 item 元素是图片，同时需要保持宽高比恰好为图片本身的宽高比时，可以设置 item 的 height 为 auto 即可轻松实现这个需求。然而当 item 元素不是图片或者要保持的宽高比和图片本身的宽高比不同时，就需要点技巧了。

技术要点1：一个元素的 `padding`，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，即使对于 `padding-bottom` 和 `padding-top` 也是如此。

技术要点2：在计算 Overflow 时，是将元素的内容区域和 Padding 区域一起计算的。换句话说，即使将元素的 `overflow` 设置为 `hidden`，“溢出”到 Padding 区域的内容也会照常显示。

```css
.constant-ratio {
  float: left;
  width: 22%;
  height: 0;
  padding-bottom: 22%; /* 设定宽高等比例 */
  margin: 1.5%;
  background-color: #eee;
}
```

```html
<div style="overflow: hidden; border: 1px solid #fcc;">
  <div class="constant-ratio">item1</div>
  <div class="constant-ratio">item2</div>
</div>
```

<div class="demo">
  <div style="overflow: hidden; border: 1px solid #fcc;">
    <div class="constant-ratio">item1</div>
    <div class="constant-ratio">item2</div>
  </div>
  <style>
    .constant-ratio {
      float: left;
      width: 22%;
      height: 0;
      padding-bottom: 22%;
      margin: 15px;
      background-color: #eee;
    }
  </style>
</div>


### 块级元素垂直居中

#### Flex 布局方案

```css
.vertical-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px; height: 200px; border: 1px solid gray;
}
.vertical-flex > div { width: 100px; border: 1px solid red; }
```

```html
<div class="vertical-flex">
  <div style="align-self: flex-start;">flex-start</div>
  <div>center</div>
  <div style="align-self: flex-end;">flex-end</div>
</div>
```

<div class="demo">
  <div class="vertical-flex">
    <div style="align-self: flex-start;">flex-start</div>
    <div>center</div>
    <div style="align-self: flex-end;">flex-end</div>
  </div>
  <style>
    .vertical-flex {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 400px; height: 200px; border: 1px solid gray;
    }
    .vertical-flex div { width: 100px; border: 1px solid red; }
  </style>
</div>

#### `table-cell` 方案

注：`vertical-align` 只在两种环境内有效：
  * To vertically align an inline element's box inside its containing line box.
  * To vertically align the content of a cell in a table.

```css
.vertical-table-cell {
  display: table-cell;
  vertical-align: middle;
  width: 100px; height: 100px; border: 1px solid red;
}
```

```html
<div class="vertical-table-cell" style="vertical-align: top;">top</div>
<div class="vertical-table-cell">middle</div>
<div class="vertical-table-cell" style="vertical-align: bottom;">bottom</div>
```

<div class="demo">
  <div class="vertical-table-cell" style="vertical-align: top;">top</div>
  <div class="vertical-table-cell">middle</div>
  <div class="vertical-table-cell" style="vertical-align: bottom;">bottom</div>
  <style>
    .vertical-table-cell {
      display: table-cell;
      vertical-align: middle;
      width: 100px; height: 100px; border: 1px solid red;
    }
  </style>
</div>

### 强制包含元素内容

父元素添加 `overflow: hidden;` 即可。上面的那个示例中，去掉 `overflow: hidden;` 即可看到效果。

### `box-sizing`


### 表格布局

* 指定行间间距须通过 `td` 中加 `padding` 实现
* `th` 和 `td` 的 `padding` `border` 等值是分别设置的

#### 非表格采用表格布局

```html
<div class="table" style="display: table; table-layout: fixed; width: 100%">
  <div class="tr" style="display: table-row">
    <div class="td" style="display: table-cell;"></div>
  </div>
</div>
```

#### 表格中 `min-width` `max-width` 无效

https://www.w3.org/TR/CSS21/tables.html#propdef-table-layout

"In CSS 2.1, the effect of 'min-width' and 'max-width' on tables, inline tables, table cells, table columns, and column groups is undefined."

To enforce the width, you may try to change the table-layout property to "fixed".


## Visual

### Triangle

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

<div class="demo">
  <div class="triangle"></div>
  <style>
  .triangle {
    width: 0;
    height: 0;
    border-top: 20px solid #333;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
  }
  </style>
</div>

### Truncate text

当文本过长时隐藏超出部分，并在尾部添加 …

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```

<div class="demo">
  <p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
  <style>
  .truncate-text { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 200px; }
  </style>
</div>

对 -webkit- 私有前缀支持良好的浏览器还可以实现多行文字打点效果

```css
.truncate-text-rows-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

<div class="demo">
  <p class="truncate-text-rows-2">If I exceed one line's width, I will be truncated in the second line.</p>
  <style>
  .truncate-text-rows-2 {
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
    width: 200px;
  }
  </style>
</div>



### Reset all styles

```css
.reset-all-styles { all: initial; }
```

CSS 中的默认值：常用的 `initial` `default` `auto` 或者 `inherit`，但具体设置项差异较大，拿 `display` 举例

```html
<style>div { display: inline-block; }</style>
<div style="display: block;">
  <div style="display: initial;">initial 无效值</div>
  <div style="display: default;">default 无效值</div>
  <div style="display: inherit;">inherit 有效值</div>
  <div style="display: auto;">无效但能清除 inline 设置项。CH 报告此值无效，IE9 下 DOM 树中直接不体现。</div>
</div>
```

### System font stack

优先使用系统默认字体，使界面更接近原生体验。

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```


## Interactivity

### Disable selection

```css
.unselectable {
  user-select: none;
}
```

### Sibling fade

```css
span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}
.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```

<div class="demo">
  <div class="sibling-fade">
    <span>Item 1</span><span>Item 2</span><span>Item 3</span>
    <span>Item 4</span><span>Item 5</span><span>Item 6</span>
  </div>
  <style>
    .sibling-fade span { padding: 0 1rem; transition: opacity 0.2s; }
    .sibling-fade:hover span:not(:hover) { opacity: 0.5; }
  </style>
</div>


## Mobile

### Hairline border

在高分屏实现 1个物理像素的细线。

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}
@media (min-resolution: 2dppx) {
  .hairline-border { box-shadow: 0 0 0 .5px; }
}
@media (min-resolution: 3dppx) {
  .hairline-border { box-shadow: 0 0 0 .33333333px; }
}
@media (min-resolution: 4dppx) {
  .hairline-border { box-shadow: 0 0 0 .25px; }
}
```


## Animation

### Donut spinner

```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```

<div class="demo">
  <div class="donut"></div>
  <style>
    @keyframes donut-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .donut {
      display: inline-block;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #7983ff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: donut-spin 1.2s linear infinite;
    }
  </style>
</div>


## Other

#### 重要特性的浏览器兼容性

||
---------|-----------------------
rgba     | IE9+
Flexbox  | IE11+ (IE10+ `-ms-`)

