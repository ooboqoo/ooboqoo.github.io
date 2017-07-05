# CSS 小专题

#### 设定固定宽高比

这时遇到的一个需求：在保持 item 元素宽高比恒定的情况下，使得 item 元素可以和父元素同比缩放。我们知道，如果当 item 元素是图片，同时需要保持的宽高比恰好为图片本身的宽高比时，可以设置 item 的 height 为 auto 即可轻松实现这个需求。然而当 item 元素不是图片或者要保持的宽高比和图片本身的宽高比不同时，就需要点技巧了。

首先需要知道，一个元素的 padding，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，即使对于 padding-bottom 和 padding-top 也是如此。

另外，在计算 Overflow 时，是将元素的内容区域和 Padding 区域一起计算的。换句话说，即使将元素的 overflow 设置为 hidden，“溢出”到 Padding 区域的内容也会照常显示。


```css
.item {
  float: left;
  width: 21%;
  height: 0;
  padding-bottom: 100%; /* 设定宽高等比例 */
}
```

#### 设定强制包含元素内容(容器会被内容撑大)

