# CSS 小专题

#### 高度百分比讲解

Here are the rules for percentages on vertical items:

* A percentage value on top/bottom padding or margins is relative to the width of the containing block
* A percentage value on height is relative to the height of the containing block (same for min/max height) (前提：父元素明确设定高度)
* A Percentage value on top and bottom values for a positioned element is relative to the height of the containing block
* Percentage values are not allowed on border widths (not even left and right)


#### 根据父元素设定高度

> https://developer.mozilla.org/en-US/docs/Web/CSS/height  
高度百分比生效的条件：父元素明确指定高度 || 元素采用绝对定位
The percentage is calculated with respect to the height of the generated box's containing block. If the height of the containing block is not specified explicitly (i.e., it depends on content height), and this element is not absolutely positioned, the value computes to auto. A percentage height on the root element is relative to the initial containing block.

```html
<!-- 父元素明确指定高度，子元素高度百分比  有效 -->
<div style="width: 300px; height: 500px; background-color: #f00;">
  <div style="width: 50%; height: 10%; background-color: #00f;"></div>
</div>

<!-- 祖父元素明确指定高度，父元素无高度，子元素高度百分比  无效 -->
<div style="width: 300px; height: 500px; background-color: #600;">
  <div>
    <div style="width: 50%; height: 10%; background-color: #00f;"></div>
  </div>
</div>

<!-- 元素指定 position: absolute 后，高度百分比有效，会逐层往上查找基准元素 relative absolute fixed -->
<div style="width: 300px; height: 500px; background-color: #0f0;">
  <div style="width: 25%; height: 10%; background-color: #060"></div>
  <div>
    <div style="position: absolute; width: 50%; height: 100%; border: 1px solid #00f;"></div>
  </div>
</div>
```


#### 设定固定宽高比

需求：在保持 item 元素宽高比恒定的情况下，使得 item 元素可以和父元素同比缩放。

分析：我们知道，如果当 item 元素是图片，同时需要保持宽高比恰好为图片本身的宽高比时，可以设置 item 的 height 为 auto 即可轻松实现这个需求。然而当 item 元素不是图片或者要保持的宽高比和图片本身的宽高比不同时，就需要点技巧了。

技术要点1：一个元素的 `padding`，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，即使对于 `padding-bottom` 和 `padding-top` 也是如此。

技术要点2：在计算 Overflow 时，是将元素的内容区域和 Padding 区域一起计算的。换句话说，即使将元素的 `overflow` 设置为 `hidden`，“溢出”到 Padding 区域的内容也会照常显示。

```css
.item {
  float: left;
  width: 22%;
  height: 0;
  padding-bottom: 22%; /* 设定宽高等比例 */
  margin: 1.5%;
  background-color: #eee;
}
```

```html
<div style="overflow: hidden; border: 1px solid #f00;">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

#### 设定强制包含元素内容(容器会被内容撑大)

父元素添加 `overflow: hidden;` 即可。上面的那个示例中，去掉 `overflow: hidden;` 即可看到效果。

### `box-sizing` 讲解

