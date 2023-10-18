# CSS Properties

### CSS Functions

||||
----------------------------|---------------------------------------------------------------------|---
attr(attr-name)             | 获取属性名对应的值，注意属性名不能加引号，否则无效                       | 2
calc(expression)            | Allows you to perform calculations to determine CSS property values | 3
linear-gradient()           | Creates an "image" which represents a linear gradient of colors     | 3
radial-gradient()           | Creates an "image" which represents a radial gradient of colors     | 3
repeating-linear-gradient() | Creates an "image" consisting of repeating gradients                | 3
repeating-radial-gradient() | Automatically repeats the color stops infinitely in both directions | 3
hsl() hsla() rgba() rgb()   |                                                                     | 3

### Color Properties

||||
---------|-------------------------------------------|---
color    | 颜色                                      | 1
opacity  | 子元素的 opacity 无法覆盖父元素的 opacity    | 3

### Background and Border Properties

||||
------------------|----------------------------------------------------------------|---
background        | 各项标准顺序 `color` `image` `repeat` `attachment` `position` `size` `origin` `clip` | 1
background-color  | Specifies the background color of an element | 1
background-image  | 背景图 `none` `url()` element gradient etc.  | 1
background-repeat | `no-repeat` `repeat` `repeat-x` `space` etc. | 1
background-attachment | 背景图是否跟随页面滚动 `scroll`(默认) `fixed` `local` | 1
background-position   | `left` `top` `bottom` `center` `25% 75%;` `right 35% bottom 5px;` etc. | 1
background-size       | 背景图缩放 `contain` `cover` `auto` length percentage(相对背景来说) | 3
background-origin     | 左上角起点 `border-box`(默认) `padding-box` `content-box` `inherit` `initial` `unset` | 3
background-clip       | 填充区域 `border-box` `padding-box`(默认) `content-box`             | 3
background-blend-mode | Specifies the blending mode of each background layer (color/image) | 3
border           | Sets all the border properties in one declaration | 1
border-width     | Sets the width of the four borders | 1
border-style     | Sets the style of the four borders | 1
border-color     | Sets the color of the four borders | 1
border-top       | `border-right` `border-bottom` `border-left` etc. | 1
border-top-width | Sets the width of the top border | 1
border-top-style | Sets the style of the top border | 1
border-top-color | Sets the color of the top border | 1
border-radius    | A shorthand property for setting all the four border-*-radius properties | 3
border-top-left-radius     | Defines the shape of the border of the top-left corner | 3
border-top-right-radius    | Defines the shape of the border of the top-right corner | 3
border-bottom-right-radius | Defines the shape of the border of the bottom-right corner | 3
border-bottom-left-radius  | Defines the shape of the border of the bottom-left corner | 3
border-image        | A shorthand property for setting all the border-image-* properties | 3
border-image-source | Specifies the path to the image to be used as a border | 3
border-image-slice  | Specifies how to slice the border image | 3
border-image-width  | Specifies the widths of the image-border | 3
border-image-outset | Specifies the amount by which the border image area extends beyond the border box | 3
border-image-repeat | Specifies whether the border image should be repeated, rounded or stretched | 3
box-shadow          | Attaches one or more drop-shadows to the box | 3
box-decoration-break | Sets the behaviour of the background and border of an element at page-break, or, for in-line elements, at line-break. | 3

```scss
background-image: url("../../media/examples/a.png"),  // 多张图片用 `,` 分隔
                  url("../../media/examples/b.png");  // b 叠在 a 上面
background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
                  url("../../media/examples/lizard.png");
background-size: 25px 50px;
background-size: 50% 50%;
background-position: right 35% bottom 5px;
```

### Basic Box Properties

||||
-----------|-----------------------------------------------------------------------------------|---
display    | `block` `inline-block` `table` `flex` `inline-flex` `grid` `list-item`            | 1
position   | `static` `relative` `absolute` `fixed`                                            | 2
top        | Specifies the top position of a positioned element                                | 2
right      | Specifies the right position of a positioned element                              | 2
bottom     | Specifies the bottom position of a positioned element                             | 2
left       | Specifies the left position of a positioned element                               | 2
float      | Specifies whether or not a box should float                                       | 1
clear      | Specifies which sides of an element where other floating elements are not allowed | 1
visibility | 不可见元素还是会占据页面空间                                                      | 2
z-index    | Sets the stack order of a positioned element，只适用于 position 不为 static 的元素  | 2
vertical-align | `length` `%` `sub` `super` `top` `text-top` `middle` `bottom` `text-bottom` 等 | 1
clip           | Clips an absolutely positioned element                       | 2
overflow       | Specifies what happens if content overflows an element's box | 2
overflow-x     | Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area | 3
overflow-y     | Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area | 3
margin        | Sets all the margin properties in one declaration | 1
margin-top    | Sets the top margin of an element    | 1
margin-right  | Sets the right margin of an element  | 1
margin-bottom | Sets the bottom margin of an element | 1
margin-left   | Sets the left margin of an element   | 1
padding       | Sets all the padding properties in one declaration | 1
padding-top   | Sets the top padding of an element     | 1
padding-right | Sets the right padding of an element   | 1
padding-bottom | Sets the bottom padding of an element | 1
padding-left  | Sets the left padding of an element    | 1
width         | Sets the width of an element           | 1
height        | Sets the height of an element          | 1
max-width     | Sets the maximum width of an element   | 2
max-height    | Sets the maximum height of an element  | 2
min-width     | Sets the minimum width of an element   | 2
min-height    | Sets the minimum height of an element  | 2

注：IE10 下 flex 布局须带厂商前缀 `-ms-flexbox`

### Flexible Box Layout

||||
----------------|------------------------------------------------------------------------|---
justify-content | 水平方向对齐 `center` `start` `space-between` `space-around` etc.      | 3
align-content   | 垂直方向对齐 `stretch` `center` `start` etc.                           | 3
align-items     | Specifies the alignment for items inside a flexible container          | 3
align-self      | Specifies the alignment for selected items inside a flexible container | 3
||
flex           | flex-grow flex-shrink flex-basis 三者的简写方式 `auto` `initial`(同 `flex: 0 1 auto;`) `none` | 3
flex-grow      | Specifies how much the item will grow relative to the rest | 3
flex-basis     | Specifies the initial length of a flexible item            | 3
flex-shrink    | Specifies how the item will shrink relative to the rest    | 3
||
flex-direction | Specifies the direction of the flexible items              | 3
flex-flow      | A shorthand property for the flex-direction and the flex-wrap properties | 3
flex-wrap      | Specifies whether the flexible items should wrap or not    | 3
order          | Sets the order of the flexible item, relative to the rest  | 3

```scss
.flex-container {
  display: flex;
  flex-direction: row;
  .flex-item { flex: auto; }
  .raw-item { width: 5rem; }
}
```

### Grid Layout

|||
-----------|-------------------------------------------------------------------------------------------------------
grid       | 
grid-auto-rows    | Specifies a default row size
grid-auto-columns | Specifies a default column size
grid-auto-flow    | Specifies how auto-placed items are inserted in the grid
grid-gap          | A shorthand property for the grid-row-gap and grid-column-gap properties
grid-column-gap   | Specifies the size of the gap between columns
grid-row-gap      | Specifies the size of the gap between rows
grid-template        | A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
grid-template-areas  | Specifies how to display columns and rows, using named grid items
grid-template-columns| Specifies the size of the columns, and how many columns in a grid layout
grid-template-rows   | Specifies the size of the rows in a grid layout
|
grid-area         | `grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end`
grid-row          | A shorthand property for the grid-row-start and the grid-row-end properties
grid-row-end      | Specifies where to end the grid item
grid-row-start    | Specifies where to start the grid item
grid-column       | A shorthand property for the grid-column-start and the grid-column-end properties
grid-column-end   | Specifies where to end the grid item
grid-column-start | Specifies where to start the grid item

### Text Properties

||||
----------------|-------------------------------------------------------------------------------------|---
text-align      | 指定文本水平对齐方式 `left` `right` `center` `justify`。垂直对齐用 `vertical-align`     | 1
text-justify    | `text-align: justify;` 时具体对齐行为 `none` `auto` `inter-word` `inter-character`    | 3
text-align-last | `text-align: justify;` 时最后一行的对齐行为 `right`/`end` `center` `left`/`start`      | 3
||
white-space | 如何处理空白 `normal`不留换 `nowrap`不留不换 `pre`留不换 `pre-line`不留换 `pre-wrap`留换 | 1
word-break  | 是否/如何断行 `normal`(词尾插入换行) `break-all`(单词内插入) `keep-all`(即使中日韩也不换行) `break-word`(仅在单词长度超过行宽时才在单词内插入换行) (换行要先配 white-space) | 3
overflow-wrap | 当一个单词大于行宽时是否插入换行 `normal`(不断) `break-word`(断行) | 3
hyphens       | 当单词内断行时，是否插入连字符 `none` `auto` `manual` | 3
line-break    | 是否/如何在符号处换行，仅适用于 CJK `auto` `loose` `normal` `strict` | 3
||
text-indent    | Specifies the indentation of the first line in a text-block | 1
word-spacing   | Increases or decreases the space between words in a text | 1
letter-spacing | Increases or decreases the space between characters in a text | 1
tab-size       | Specifies the length of the tab-character | 3
||
line-height    | Sets the line height | 1
text-transform | Controls the capitalization of text | 1
text-combine-upright | Specifies the combination of multiple characters into the space of a single character | 3
hanging-punctuation  | Specifies whether a punctuation character may be placed outside the line box | 3

### Text Decoration Properties

||||
------------------------|------------------------------------------------------|---
text-decoration         | `none` `underline` `overline` `line-through` 等      | 1
text-decoration-color   | Specifies the color of the text-decoration           | 3
text-decoration-style   | Specifies the style of the line in a text decoration | 3
text-decoration-line    | Specifies the type of line in a text-decoration      | 3
text-shadow             | Adds shadow to text                                  | 3
text-underline-position | Specifies the position of the underline which is set using the text-decoration property | 3

### Font Properties

||||
-------------|-------------------------------------------------|---
font         | Sets all the font properties in one declaration | 1
font-family  | Specifies the font family for text | 1
font-size    | Specifies the font size of text    | 1
font-style   | Specifies the font style for text  | 1
font-weight  | Specifies the weight of a font     | 1
@font-face   | A rule that allows websites to download and use fonts other than the "web- safe" fonts | 3
font-variant | Specifies whether or not a text should be displayed in a small-caps font | 1
font-variant-alternates | Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values | 3
font-variant-caps       | Controls the usage of alternate glyphs for capital letters | 3
font-variant-east-asian | Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese) | 3
font-variant-ligatures  | Controls which ligatures and contextual forms are used in textual content of the elements it applies to | 3
font-variant-numeric   | Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers | 3
font-variant-position  | Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font | 3
@font-feature-values   | Allows authors to use a common name in font-variant-alternate for feature activated differently in OpenType | 3
font-feature-settings  | Allows control over advanced typographic features in OpenType fonts | 3
font-size-adjust       | Preserves the readability of text when font fallback occurs | 3
font-stretch           | Selects a normal, condensed, or expanded face from a font family | 3
font-synthesis         | Controls which missing typefaces (bold or italic) may be synthesized by the browser | 3
font-kerning           | Controls the usage of the kerning information (how letters are spaced) | 3
font-language-override | Controls the usage of language-specific glyphs in a typeface | 3

### Writing Modes Properties

||||
-----------------|------------------------------------------------|---
direction        | Specifies the text direction/writing direction | 2
unicode-bidi     | Used together with the directionproperty to set or return whether the text should be overridden to support multiple languages in the same document                   | 2
text-orientation | Defines the orientation of the text in a line  | 3
text-combine-upright | Specifies the combination of multiple characters into the space of a single character | 3
writing-mode     |                                                | 3

### Table Properties

||||
----------------|---------------------------------------------------------|---
border-collapse | 是否折叠表格边框，默认 `separate` 一般都用 `collapse`      | 2
border-spacing  | 配合 `border-collapse: separate;` 使用，指定单元格边框间距 | 2
caption-side    | 指定表格标题位于 `top` 还是 `bottom`                      | 2
empty-cells     | 配合 `border-collapse: separate;` 使用，指明单元格内容为空时的是否显示边框和背景          | 2
table-layout    | 当指定列宽时，默认 `auto` 还是会受内容影响的，如要求浏览器严格按照指定值渲染，就得用 `fixed` | 2

注：非表格元素可通过设置 `display` 属性为 `table` `table-row` `table-cell` 来实现表格布局。

### Lists and Counters Properties

||||
------------------|-------------------------------------------------------|---
list-style        | Sets all the properties for a list in one declaration | 1
list-style-image  | Specifies an image as the list-item marker            | 1
list-style-position | Specifies if the list-item markers should appear inside or outside the content flow | 1
list-style-type   | `disc` `circle` `none` `square` `decimal` `lower-alpha` `upper-roman` 其他            | 1
counter-reset     | Creates or resets one or more counters                | 2
counter-increment | Increments one or more counters                       | 2
counter(name, style)   | 获取计数值       | 2
counters(name, string) | 获取嵌套的计数值 | 2

```css
.counter { counter-reset: countername 2; }
.counter::before, .counter::after { content: counter(countername); counter-increment: countername; }
/* 结果：输出 34 */
```

### Transform Properties

||||
--------------------|-----------------------------------------------------------|---
transform           | Applies a 2D or 3D transformation to an element           | 3
transform-origin    | Allows you to change the position on transformed elements | 3
transform-style     | Specifies how nested elements are rendered in 3D space    | 3
perspective         | Specifies the perspective on how 3D elements are viewed   | 3
perspective-origin  | Specifies the bottom position of 3D elements              | 3
backface-visibility | Defines whether or not an element should be visible when not facing the screen | 3

### Animation Properties

||||
--------------------------|---------------------------------------------------------------------------------|---
@keyframes                | 定义整个动画中的关键帧(顺序见示例)，动画名采用小驼峰形式(ID区分大小写)                  | 3
|||
animation                 | 指定所有动画配置项(不含 `animation-play-state` `animation-fill-mode`)的快捷属性     | 3
animation-name            | Specifies the name of the @keyframes animation          | 3
animation-duration        | 指定一个动画循环的时长(秒或毫秒)，如 `6s` `120ms`           | 3
animation-timing-function | 定义动画关键帧切换的执行节奏                               | 3
|||
animation-delay           | 指定动画等待时长，当为负数时，如 `-2s`，会跳过前 2s 的动画                           | 3
animation-iteration-count | 指定动画播放次数，也可以无限播放 `infinite`                 | 3
animation-direction       | `normal` `reverse`(倒着放) `alternate`(播放多次时切换顺序放) `alternate-reverse`  | 3
animation-fill-mode       | 指定动画前后样式 `none` `forwards`(播放后保留) `backwards`(等待期展示第一帧) `both` | 3
animation-play-state      | 通过此属性控制动画 播放`running` 或 暂停`paused`            | 3


```css
/* name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state */
animation: slidein 3s ease-in 1s 2 reverse both paused;

/* 演示地址 https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function */
/* Keyword values */   /*  慢快慢   缓起     缓停      比ease更缓     常速    一步到位 等到最后才一步到位 */
animation-timing-function: ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end;
/* Function values */
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1) | steps(4, end) | frames(10);
/* Multiple animations */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);
```

`cubic-bezier(x1,y1,x2,y2)` P0(0,0) P1(x1,y1) P2(x2,y2) P3(1,1) 组成的三次贝塞尔曲线，x1,x2 代表时间，取值范围 [0, 1]，y1,y2 不受限制。

### Transitions Properties

||||
---------------------------|---------------------------------------------------------------------|---
transition                 | A shorthand property for setting the four transition properties     | 3
transition-property        | Specifies the name of the CSS property the transition effect is for | 3
transition-duration        | Specifies how many seconds or milliseconds a transition effect takes to complete | 3
transition-timing-function | Specifies the speed curve of the transition effect                  | 3
transition-delay           | Specifies when the transition effect will start                     | 3

### Basic User Interface Properties

||||
-----------|-------------------------------------------------------------------------------|---
box-sizing | width height 值是否包含 padding+margin，可选 `content-box` `border-box` IE8+支持 | 3
content    | Used with the :before and :after pseudo-elements, to insert generated content | 2
cursor     | 定制光标样式，不支持动态gif <span class="mark">[注1]</span>              | 2
resize     | Specifies whether or not an element is resizable by the user          | 3
nav-index  | Specifies the tabbing order for an element                            | 3
nav-left   | Specifies where to navigate when using the arrow-left navigation key  | 3
nav-right  | Specifies where to navigate when using the arrow-right navigation key | 3
nav-up     | Specifies where to navigate when using the arrow-up navigation key    | 3
nav-down   | Specifies where to navigate when using the arrow-down navigation key  | 3
outline    | Sets all the outline properties in one declaration                    | 2
outline-color  | Sets the color of an outline | 2
outline-style  | Sets the style of an outline | 2
outline-width  | Sets the width of an outline | 2
outline-offset | Offsets an outline, and draws it beyond the border edge              | 3
text-overflow  | 指明当内容超出容器时如何显示，最常见用法：<span class="mark">[注2]</span> | 3
ime-mode       | Controls the state of the input method editor for text fields        | 3

```css
注1  cursor: url(one.svg), url(two.svg) 5 5, progress;  // 自定义光标好多高级玩法
注2  .container { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
```

### Multi-column Layout Properties

||||
------------------|-------------------------------------------------------------------|---
columns           | A shorthand property for setting column-width and column-count    | 3
column-count      | Specifies the number of columns an element should be divided into | 3
column-rule       | A shorthand property for setting all the column-rule-* properties | 3
column-rule-color | Specifies the color of the rule between columns          | 3
column-rule-style | Specifies the style of the rule between columns          | 3
column-rule-width | Specifies the width of the rule between columns          | 3
column-fill       | Specifies how to fill columns                            | 3
column-gap        | Specifies the gap between the columns                    | 3
column-span       | Specifies how many columns an element should span across | 3
column-width      | Specifies the width of the columns                       | 3
break-after       | Specifies the page-, column-, or region-break behavior after the generated box  | 3
break-before      | Specifies the page-, column-, or region-break behavior before the generated box | 3
break-inside      | Specifies the page-, column-, or region-break behavior inside the generated box | 3
widows            | Sets the minimum number of lines that must be left at the top of a page when a page break occurs inside an element | 2

### Paged Media

||||
------------------|---------------------------------------------------|---
orphans           | Sets the minimum number of lines that must be left at the bottom of a page when a page break occurs inside an element | 2
page-break-after  | Sets the page-breaking behavior after an element  | 2
page-break-before | Sets the page-breaking behavior before an element | 2
page-break-inside | Sets the page-breaking behavior inside an element | 2

### Generated Content for Paged Media

||||
-------|----------------------------------------------------------|---
marks  | Adds crop and/or cross marks to the document             | 3
quotes | Sets the type of quotation marks for embedded quotations | 2

### Filter Effects Properties

||||
----------|-------------------------------------------------------------------------------------------------|---
filter    | Defines effects (e.g. blurring or color shifting) on an element before the element is displayed | 3

### Image Values and Replaced Content

||||
------------------|----------------------------------------------------------------|---
image-orientation | Specifies a rotation in the right or clockwise direction that a user agent applies to an image (This property is likely going to be deprecated and its functionality moved to HTML) | 3
image-rendering   | Gives a hint to the browser about what aspects of an image are most important to preserve when the image is scaled | 3
image-resolution  | Specifies the intrinsic resolution of all raster images used in/on the element | 3
object-fit        | 替换元素如何填充到容器 `fill`(拉升填充，默认) `contain`(包含，留白) `cover`(覆盖) `none`(原尺寸) `scale-down`(contain/none 取最小值) | 3
object-position   | 替换元素的定位设置，值参考 `background-position` | 3

注：在理解 `object-fit` 和 `object-position` 的时候，可以或多或少映射 `background-size` 和 `background-position`。

### Masking Properties

||||
------|-------------|---
mask  | mask-type   | 3

### Speech Properties

||||
---------------|----------------------------------------------------------------------------|---
mark           | A shorthand property for setting the mark-before and mark-after properties | 3
mark-after     | Allows named markers to be attached to the audio stream | 3
mark-before    | Allows named markers to be attached to the audio stream | 3
phonemes       | Specifies a phonetic pronunciation for the text contained by the corresponding element | 3
rest           | A shorthand property for setting the rest-before and rest-after properties | 3
rest-after     | Specifies a rest or prosodic boundary to be observed after speaking an element's content | 3
rest-before    | Specifies a rest or prosodic boundary to be observed before speaking an element's content | 3
voice-balance  | Specifies the balance between left and right channels | 3
voice-duration | Specifies how long it should take to render the selected element's content | 3
voice-pitch    | Specifies the average pitch (a frequency) of the speaking voice | 3
voice-pitch-range | Specifies variation in average pitch | 3
voice-rate     | Controls the speaking rate | 3
voice-stress   | Indicates the strength of emphasis to be applied | 3
voice-volume   | Refers to the amplitude of the waveform output by the speech synthesises | 3

### Marquee Properties

||||
-------------------|------------------------------------------|---
marquee-direction  | Sets the direction of the moving content | 3
marquee-play-count | Sets how many times the content move     | 3
marquee-speed      | Sets how fast the content scrolls        | 3
marquee-style      | Sets the style of the moving content     | 3

<style>
  td:first-child { color: #f33; white-space: nowrap; }
</style>
<script>
  var url = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  var links = [].slice.call(document.querySelectorAll('td:first-child'));
  links.forEach(function (link) {
    link.innerHTML = '<a href="' + url + link.innerText + '">' + link.innerText + '</a>';
  });
</script>
