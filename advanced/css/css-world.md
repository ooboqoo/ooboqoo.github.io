# CSS 世界


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


#### 深入理解 margin: auto



#### margin 无效情形


