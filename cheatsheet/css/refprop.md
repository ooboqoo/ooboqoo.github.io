# CSS Properties 


## CSS Functions

| Function | Description | CSS
|----------|-------------|------------
| `attr()` | Returns the value of an attribute of the selected element | 2
| `calc()` | Allows you to perform calculations to determine CSS property values | 3
| `linear-gradient()` | Creates an "image" which represents a linear gradient of colors | 3
| `radial-gradient()` | Creates an "image" which represents a gradient of colors radiating from the center of the gradient | 3
| `repeating-linear-gradient()` | Creates an "image" consisting of repeating gradients | 3
| `repeating-radial-gradient()` | Similarly to radial-gradient(), but it automatically repeats the color stops infinitely in both directions | 3


## Color Properties

| Property | Description | CSS
|----------|-------------|----------
| color    | Sets the color of text | 1
| opacity  | 子元素的 opacity 无法覆盖父元素的 opacity | 3


## Background and Border Properties

| Property | Description | CSS
|----------|-------------|----------
| background | A shorthand property for setting all the background properties in one declaration <span class="mark">[注1]</span> | 1
| background-color | Specifies the background color of an element | 1
| background-image | Specifies one or more background images for an element | 1
| background-repeat | Sets how a background image will be repeated | 1
| background-size | Specifies the size of the background image(s) | 3
| background-clip | Specifies the painting area of the background | 3
| background-position | Specifies the position of a background image | 1
| background-origin | Specifies where the background image(s) is/are positioned | 3
| background-attachment | Sets whether a background image is fixed or scrolls with the rest of the page | 1
| background-blend-mode | Specifies the blending mode of each background layer (color/image) | 3
| border | Sets all the border properties in one declaration | 1
| border-width | Sets the width of the four borders | 1
| border-style | Sets the style of the four borders | 1
| border-color | Sets the color of the four borders | 1
| border-top | Sets all the top border properties in one declaration | 1
| border-top-width | Sets the width of the top border | 1
| border-top-style | Sets the style of the top border | 1
| border-top-color | Sets the color of the top border | 1
| border-right | Sets all the right border properties in one declaration | 1
| border-right-width | Sets the width of the right border | 1
| border-right-style | Sets the style of the right border | 1
| border-right-color | Sets the color of the right border | 1
| border-bottom | Sets all the bottom border properties in one declaration | 1
| border-bottom-width | Sets the width of the bottom border | 1
| border-bottom-style | Sets the style of the bottom border | 1
| border-bottom-color | Sets the color of the bottom border | 1
| border-left | Sets all the left border properties in one declaration | 1
| border-left-width | Sets the width of the left border | 1
| border-left-style | Sets the style of the left border | 1
| border-left-color | Sets the color of the left border | 1
| border-radius | A shorthand property for setting all the four border-*-radius properties | 3
| border-top-left-radius | Defines the shape of the border of the top-left corner | 3
| border-top-right-radius | Defines the shape of the border of the top-right corner | 3
| border-bottom-right-radius | Defines the shape of the border of the bottom-right corner | 3
| border-bottom-left-radius | Defines the shape of the border of the bottom-left corner | 3
| border-image | A shorthand property for setting all the border-image-* properties | 3
| border-image-source | Specifies the path to the image to be used as a border | 3
| border-image-slice | Specifies how to slice the border image | 3
| border-image-width | Specifies the widths of the image-border | 3
| border-image-outset | Specifies the amount by which the border image area extends beyond the border box | 3
| border-image-repeat | Specifies whether the border image should be repeated, rounded or stretched | 3
| box-shadow | Attaches one or more drop-shadows to the box | 3
| box-decoration-break | Sets the behaviour of the background and border of an element at page-break, or, for in-line elements, at line-break. | 3

注1：`background` 各项标准顺序 `image` `position` `size` `repeat` `origin` `clip` `attachment` `color`


## Basic Box Properties

| Property | Description | CSS
|----------|-------------|----------
| display | Specifies how a certain HTML element should be displayed | 1
| position | Specifies the type of positioning method used for an element (static, relative, absolute or fixed) | 2
| top | Specifies the top position of a positioned element | 2
| right | Specifies the right position of a positioned element | 2
| bottom | Specifies the bottom position of a positioned element | 2
| left | Specifies the left position of a positioned element | 2
| float | Specifies whether or not a box should float | 1
| clear | Specifies which sides of an element where other floating elements are not allowed | 1
| visibility | 不可见元素还是会占据页面空间 | 2
| z-index | Sets the stack order of a positioned element | 2
| vertical-align | `length` `%` `sub` `super` `top` `text-top` `middle` `bottom` `text-bottom` 等 | 1
| clip | Clips an absolutely positioned element | 2
| overflow | Specifies what happens if content overflows an element's box | 2
| overflow-x | Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area | 3
| overflow-y | Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area | 3
| margin | Sets all the margin properties in one declaration | 1
| margin-top | Sets the top margin of an element | 1
| margin-right | Sets the right margin of an element | 1
| margin-bottom | Sets the bottom margin of an element | 1
| margin-left | Sets the left margin of an element | 1
| padding | Sets all the padding properties in one declaration | 1
| padding-top | Sets the top padding of an element | 1
| padding-right | Sets the right padding of an element | 1
| padding-bottom | Sets the bottom padding of an element | 1
| padding-left | Sets the left padding of an element | 1
| width | Sets the width of an element | 1
| height | Sets the height of an element | 1
| max-width | Sets the maximum width of an element | 2
| max-height | Sets the maximum height of an element | 2
| min-width | Sets the minimum width of an element | 2
| min-height | Sets the minimum height of an element | 2


## Flexible Box Layout

| Property | Description | CSS
|----------|-------------|----------
| align-content | Specifies the alignment between the lines inside a flexible container when the items do not use all available space | 3
| align-items | Specifies the alignment for items inside a flexible container | 3
| align-self | Specifies the alignment for selected items inside a flexible container | 3
| flex | Specifies the length of the item, relative to the rest | 3
| flex-basis | Specifies the initial length of a flexible item | 3
| flex-direction | Specifies the direction of the flexible items | 3
| flex-flow | A shorthand property for the flex-direction and the flex-wrap properties | 3
| flex-grow | Specifies how much the item will grow relative to the rest | 3
| flex-shrink | Specifies how the item will shrink relative to the rest | 3
| flex-wrap | Specifies whether the flexible items should wrap or not | 3
| justify-content | Specifies the alignment between the items inside a flexible container when the items do not use all available space | 3
| order | Sets the order of the flexible item, relative to the rest | 3


## Text Properties

| Property | Description | CSS
|----------|-------------|----------
| line-height | Sets the line height | 1
| text-align | Specifies the horizontal alignment of text | 1
| text-indent | Specifies the indentation of the first line in a text-block | 1
| white-space | `normal` 不留换 `nowrap` 不留不换 `pre` 留不换 `pre-line` 不留换 `pre-wrap` 留换 | 1
| word-wrap | `normal` `break-word` 如果一个长单词换行后还是无法放下则打断，默认不打断，中日韩CJK始终都打断的 | 3
| word-break | `normal` `break-all` `keep-all` 打断任何单词以填满行尾 | 3
| word-spacing | Increases or decreases the space between words in a text | 1
| letter-spacing | Increases or decreases the space between characters in a text | 1
| tab-size | Specifies the length of the tab-character | 3
| text-transform | Controls the capitalization of text | 1
| text-justify | Specifies the justification method used when text-align is "justify" | 3
| text-align-last | Describes how the last line of a block or a line right before a forced line break is aligned when text-align is "justify" | 3
| line-break | Specifies how/if to break lines | 3
| hyphens | Sets how to split words to improve the layout of paragraphs | 3
| overflow-wrap | Specifies whether or not the browser may break lines within words in order to prevent overflow (when a string is too long to fit its containing box) | 3
| text-combine-upright | Specifies the combination of multiple characters into the space of a single character | 3
| hanging-punctuation | Specifies whether a punctuation character may be placed outside the line box | 3


## Text Decoration Properties

| Property | Description | CSS
|----------|-------------|----------
| text-decoration | `none` `underline` `overline` `line-through` 等 | 1
| text-decoration-color | Specifies the color of the text-decoration | 3
| text-decoration-style | Specifies the style of the line in a text decoration | 3
| text-decoration-line | Specifies the type of line in a text-decoration | 3
| text-shadow | Adds shadow to text | 3
| text-underline-position | Specifies the position of the underline which is set using the text-decoration property | 3


## Font Properties

| Property | Description | CSS
|----------|-------------|----------
| font | Sets all the font properties in one declaration | 1
| font-family | Specifies the font family for text | 1
| font-size | Specifies the font size of text | 1
| font-style | Specifies the font style for text | 1
| font-weight | Specifies the weight of a font | 1
| @font-face | A rule that allows websites to download and use fonts other than the "web- safe" fonts | 3
| font-variant | Specifies whether or not a text should be displayed in a small-caps font | 1
| font-variant-alternates | Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values | 3
| font-variant-caps | Controls the usage of alternate glyphs for capital letters | 3
| font-variant-east-asian | Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese) | 3
| font-variant-ligatures | Controls which ligatures and contextual forms are used in textual content of the elements it applies to | 3
| font-variant-numeric | Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers | 3
| font-variant-position | Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font | 3
| @font-feature-values | Allows authors to use a common name in font-variant-alternate for feature activated differently in OpenType | 3
| font-feature-settings | Allows control over advanced typographic features in OpenType fonts | 3
| font-size-adjust | Preserves the readability of text when font fallback occurs | 3
| font-stretch | Selects a normal, condensed, or expanded face from a font family | 3
| font-synthesis | Controls which missing typefaces (bold or italic) may be synthesized by the browser | 3
| font-kerning | Controls the usage of the kerning information (how letters are spaced) | 3
| font-language-override | Controls the usage of language-specific glyphs in a typeface | 3


## Writing Modes Properties

| Property | Description | CSS
|----------|-------------|----------
| direction | Specifies the text direction/writing direction | 2
| unicode-bidi | Used together with the directionproperty to set or return whether the text should be overridden to support multiple languages in the same document | 2
| text-orientation | Defines the orientation of the text in a line | 3
| text-combine-upright | Specifies the combination of multiple characters into the space of a single character | 3
| writing-mode | | 3


## Table Properties

| Property | Description | CSS
|----------|-------------|----------
| border-collapse | 是否折叠表格边框，默认 `separate` 一般都用 `collapse` | 2
| border-spacing | 配合 `border-collapse: separate;` 使用，指定单元格边框间距 | 2
| caption-side | 指定表格标题位于 `top` 还是 `bottom` | 2
| empty-cells | 配合 `border-collapse: separate;` 使用，指明单元格内容为空时的是否显示边框和背景 | 2
| table-layout | 当指定列宽时，默认 `auto` 还是会受内容影响的，如要求浏览器严格按照指定值渲染，就得用 `fixed` | 2

注：非表格元素可通过设置 `display` 属性为 `table` `table-row` `table-cell` 来实现表格布局。

## Lists and Counters Properties

| Property | Description | CSS
|----------|-------------|----------
| list-style | Sets all the properties for a list in one declaration | 1
| list-style-image | Specifies an image as the list-item marker | 1
| list-style-position | Specifies if the list-item markers should appear inside or outside the content flow | 1
| list-style-type | `disc` `circle` `none` `square` `decimal` `lower-alpha` `upper-roman` 其他 | 1
| counter-reset | Creates or resets one or more counters | 2
| counter-increment | Increments one or more counters | 2


## Animation Properties

| Property | Description | CSS
|----------|-------------|----------
| @keyframes | Specifies the animation code | 3
| animation | A shorthand property for all the animation properties (except animation-play-state and animation-fill-mode) | 3
| animation-delay | Specifies a delay for the start of an animation | 3
| animation-direction | Specifies whether or not the animation should play in reverse on alternate cycles | 3
| animation-duration | Specifies how many seconds or milliseconds an animation takes to complete one cycle | 3
| animation-fill-mode | Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay) | 3
| animation-iteration-count | Specifies the number of times an animation should be played | 3
| animation-name | Specifies the name of the @keyframes animation | 3
| animation-play-state | Specifies whether the animation is running or paused | 3
| animation-timing-function | Specifies the speed curve of an animation | 3


## Transform Properties

| Property | Description | CSS
|----------|-------------|----------
| transform | Applies a 2D or 3D transformation to an element | 3
| transform-origin | Allows you to change the position on transformed elements | 3
| transform-style | Specifies how nested elements are rendered in 3D space | 3
| perspective | Specifies the perspective on how 3D elements are viewed | 3
| perspective-origin | Specifies the bottom position of 3D elements | 3
| backface-visibility | Defines whether or not an element should be visible when not facing the screen | 3


## Transitions Properties

| Property | Description | CSS
|----------|-------------|----------
| transition | A shorthand property for setting the four transition properties | 3
| transition-property | Specifies the name of the CSS property the transition effect is for | 3
| transition-duration | Specifies how many seconds or milliseconds a transition effect takes to complete | 3
| transition-timing-function | Specifies the speed curve of the transition effect | 3
| transition-delay | Specifies when the transition effect will start | 3


## Basic User Interface Properties

| Property | Description | CSS
|----------|-------------|----------
| box-sizing | Tells the browser what the sizing properties (width and height) should include | 3
| content | Used with the :before and :after pseudo-elements, to insert generated content | 2
| cursor | Specifies the type of cursor to be displayed | 2
| resize | Specifies whether or not an element is resizable by the user | 3
| nav-index | Specifies the tabbing order for an element | 3
| nav-left | Specifies where to navigate when using the arrow-left navigation key | 3
| nav-right | Specifies where to navigate when using the arrow-right navigation key | 3
| nav-up | Specifies where to navigate when using the arrow-up navigation key | 3
| nav-down | Specifies where to navigate when using the arrow-down navigation key | 3
| outline | Sets all the outline properties in one declaration | 2
| outline-color | Sets the color of an outline | 2
| outline-style | Sets the style of an outline | 2
| outline-width | Sets the width of an outline | 2
| outline-offset | Offsets an outline, and draws it beyond the border edge | 3
| text-overflow | 指明当内容超出容器时如何显示，最常见用法：<span class="mark">[注1]</span> | 3
| ime-mode | Controls the state of the input method editor for text fields | 3

```css
// 注1
.container { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
```

## Multi-column Layout Properties

| Property | Description | CSS
|----------|-------------|----------
| columns | A shorthand property for setting column-width and column-count | 3
| column-count | Specifies the number of columns an element should be divided into | 3
| column-rule | A shorthand property for setting all the column-rule-* properties | 3
| column-rule-color | Specifies the color of the rule between columns | 3
| column-rule-style | Specifies the style of the rule between columns | 3
| column-rule-width | Specifies the width of the rule between columns | 3
| column-fill | Specifies how to fill columns | 3
| column-gap | Specifies the gap between the columns | 3
| column-span | Specifies how many columns an element should span across | 3
| column-width | Specifies the width of the columns | 3
| break-after | Specifies the page-, column-, or region-break behavior after the generated box | 3
| break-before | Specifies the page-, column-, or region-break behavior before the generated box | 3
| break-inside | Specifies the page-, column-, or region-break behavior inside the generated box | 3
| widows | Sets the minimum number of lines that must be left at the top of a page when a page break occurs inside an element | 2


## Paged Media

| Property | Description | CSS
|----------|-------------|----------
| orphans | Sets the minimum number of lines that must be left at the bottom of a page when a page break occurs inside an element | 2
| page-break-after | Sets the page-breaking behavior after an element | 2
| page-break-before | Sets the page-breaking behavior before an element | 2
| page-break-inside | Sets the page-breaking behavior inside an element | 2


## Generated Content for Paged Media

| Property | Description | CSS
|----------|-------------|----------
| marks | Adds crop and/or cross marks to the document | 3
| quotes | Sets the type of quotation marks for embedded quotations | 2


## Filter Effects Properties

| Property | Description | CSS
|----------|-------------|----------
| filter | Defines effects (e.g. blurring or color shifting) on an element before the element is displayed | 3


## Image Values and Replaced Content

| Property | Description | CSS
|----------|-------------|----------
| image-orientation | Specifies a rotation in the right or clockwise direction that a user agent applies to an image (This property is likely going to be deprecated and its functionality moved to HTML) | 3
| image-rendering | Gives a hint to the browser about what aspects of an image are most important to preserve when the image is scaled | 3
| image-resolution | Specifies the intrinsic resolution of all raster images used in/on the element | 3
| object-fit | Specifies how the contents of a replaced element should be fitted to the box established by its used height and width | 3
| object-position | Specifies the alignment of the replaced element inside its box | 3


## Masking Properties

| Property | Description | CSS
|----------|-------------|----------
| mask | 3 | mask-type | 3


## Speech Properties

| Property | Description | CSS
|----------|-------------|----------
| mark | A shorthand property for setting the mark-before and mark-after properties | 3
| mark-after | Allows named markers to be attached to the audio stream | 3
| mark-before | Allows named markers to be attached to the audio stream | 3
| phonemes | Specifies a phonetic pronunciation for the text contained by the corresponding element | 3
| rest | A shorthand property for setting the rest-before and rest-after properties | 3
| rest-after | Specifies a rest or prosodic boundary to be observed after speaking an element's content | 3
| rest-before | Specifies a rest or prosodic boundary to be observed before speaking an element's content | 3
| voice-balance | Specifies the balance between left and right channels | 3
| voice-duration | Specifies how long it should take to render the selected element's content | 3
| voice-pitch | Specifies the average pitch (a frequency) of the speaking voice | 3
| voice-pitch-range | Specifies variation in average pitch | 3
| voice-rate | Controls the speaking rate | 3
| voice-stress | Indicates the strength of emphasis to be applied | 3
| voice-volume | Refers to the amplitude of the waveform output by the speech synthesises | 3

## Marquee Properties

| Property | Description | CSS
|----------|-------------|----------
| marquee-direction | Sets the direction of the moving content | 3
| marquee-play-count | Sets how many times the content move | 3
| marquee-speed | Sets how fast the content scrolls | 3
| marquee-style | Sets the style of the moving content | 3

<style>
  td:first-child { color: #f33; white-space: nowrap; }
  span.mark { display: inline-block; float: right; background-color: initial; font-size: small; }
</style>
<script>
  var url = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  var links = [].slice.call(document.querySelectorAll('td:first-child'));
  links.forEach(function (link) {
    link.innerHTML = '<a href="' + url + link.innerText + '">' + link.innerText + '</a>';
  });
</script>