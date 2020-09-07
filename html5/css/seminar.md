# CSS 专题


## 垂直方向百分比值使用

### `%` 相关知识总结

https://wattenberger.com/blog/css-percents?ref=sidebar

||||
---------------|-----------|------------------
height         | is a % of | parent’s height
width          | is a % of | parent’s width
top            | is a % of | parent’s height
left           | is a % of | parent’s width
margin-top     | is a % of | parent’s width
margin-left    | is a % of | parent’s width
padding-top    | is a % of | parent’s width
padding-left   | is a % of | parent’s width
translate-top  | is a % of | self’s height
translate-left | is a % of | self’s width

### 规则

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

### 设定固定宽高比

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


## 块级元素垂直居中

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

#### Flex 方案+

<div class="demo">
  <div style="display: flex; height: 100px; border:1px solid gray;">
    <div style="margin: auto; border: 1px solid red;">margin: auto 同时搞定水平、垂直居中
    </div>
  </div>
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



### 表格布局

* 指定行间间距须通过 `td` 中加 `padding` 实现
* `th` 和 `td` 的 `padding` `border` 等值是分别设置的

#### 非表格采用表格布局

采用表格布局比较好的一个场景是，有两列，内容长度不同，但要求高度一致。

```html
<div class="table" style="display: table; table-layout: fixed; width: 100%">
  <div class="tr" style="display: table-row">
    <div class="td" style="display: table-cell;"></div>
    <div class="td" style="display: table-cell;"></div>
  </div>
</div>
```


