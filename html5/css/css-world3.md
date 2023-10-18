# CSS 世界 8-12

## 强大的文本处理能力

CSS 就是凭借自身强大的文本处理和文本展示能力才成为样式布局的标杆语言。CSS 文本处理能力之所以强大，一方面是其基础概念，如块级盒模型和内联盒模型，就是为了让文本可以如文档般自然呈现；还有就是有非常多的与文本处理相关 CSS 属性的支持。

### font-size

**vertical-align**

line-height 的部分类别属性值是相对于 font-size 计算的，vertical-align 百分比值属性值又是相对于 line-height 计算的，于是看上去八竿子打不着的 vertical-align 和 font-size 属性背后其实也有着关联的。

```css
/* 图片垂直居中应用示例 */
p > img {
  width: 16px; height: 16px;
  vertical-align: 25%;        /* 图片垂直居中效果 */
  vertical-align: .6ex;       /* 更好的方案 */
  position: relative; top: 8px;
}
```

**ex em rem**

ex 是字符 x 的高度  
em 完全取决于 M 的字形，em 在传统排版中指一个字模的高度  
rem 即 root em，就是根元素的 em。使用 rem，我们的计算值不会受当前元素 font-size 大小的影响。要想实现带有缩放性质的弹性布局，使用 rem 是最佳策略。

```css
h1 {
  margin-left: 1em;  /* 这里的 1em 计算值跟下面的 2em 相等 */
  font-size: 2em;    /* font-size 写在后面不影响计算 */
}
```

再举个适用于 em 的场景，如果我们使用 SVG 矢量图标，建议设置 SVG 宽高如下。这样，图标始终能和文字保持一致。

```css
svg { width: 1em; height: 1em; }
```

**关键字属性值**

font-size 支持长度值，如 1em，也支持百分比值，如 100%，但不少人可能不清楚 font-size 的关键字属性值：
  * 相对尺寸关键字 - 指相对于当前元素 font-size 计算，实际应用价值不大
    - larger 大一点，是 big 元素的默认 font-size 属性值
    - smaller 小一点，是 small 元素的默认 font-size 属性值
  * 绝对尺寸关键字 - 与当前元素的 font-size 无关，只受浏览器设置的字号影响
    - xx-large 特大，和 h1 元素计算值一样
    - x-large 加大，和 h2 元素计算值一样
    - large 大，和 h3 元素计算值近似(指偏差 1px 以内)
    - medium 中号，是 font-size 的初始值，和 h4 元素计算值一样
    - small 小，和 h5 元素计算值近似
    - x-small 较小，和 h6 元素计算值近似
    - xx-small 特小

**文本隐藏**

桌面 Chrome 浏览器下有个 12px 的字号限制，就是文字的 font-size 计算值不能小于 12px，我猜是因为中文，如宋体，要是小于 12px 就会挤成一团，略丑，Chrome 看不下去，就直接禁用了。

但是如果是 font-size:0，那么文字会被直接隐藏掉。

### font-family

font-family 支持两类属性值，一类是字体名，一类是字体族。

如果字体名包含空格，需要使用引号包起来。

根据我的实践，字体名可以不区分大小写。如果有多个字体设定，从左往右依次寻找本地是否有对应的字体。

字体族分为很多类，MDN 上文档分类如下：
  * serif 衬线字体
  * sans-serif 无衬线字体
  * monospace 等宽字体，如 Consolas  Monaco
  * cursive 手写字体
  * fantasy 奇幻字体
  * system-ui 系统 UI 字体

**衬线字体和无衬线字体**

所谓衬线字体，通俗讲就是笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体。网页中常用的中文衬线字体是 宋体，常用的英文衬线字体有 Times New Roman，Georgia 等。

无衬线字体没有这些额外的装饰，而且笔画的粗细差不多，如中文的 雅黑 字体，英文包括 Arial，Verdana，Tahoma，Helivetica，Calibri 等。

以前人们排正文喜欢使用衬线字体，但是如今，不知是审美疲劳还是人们更加追求简洁干净的缘故，更喜欢使用无衬线字体，如 微软雅黑 或者 苹方 之类的字体。

我们在移动端 Web 开发的时候，虽然设备的默认中文字体不一样，但都是无衬线字体，都挺好看，因此没有必要特别指定中文字体，否则说不定会画蛇添足，直接：

```css
body { font-family: sans-serif; }  /* 移动端没必要特别指定中文字体 */
```

**等宽字体**

所谓等宽字体，一般是针对英文字体而言的。据我所知，东亚字体应该都是等宽的，但英文字体就不一定了，非等宽字体，iii 与 MMM 所占宽度相差甚大。

等宽字体利于代码呈现。对于写代码的人来说，无论是什么语言，易读是第一位的，使用等宽字体，我们阅读起来会更轻松舒服。因此，一般编辑器使用的字体或者 Web 上需要呈现源代码的字体都是等宽字体。

`ch` 和 em rem ex 一样，是 CSS 中和字符相关的相对单位。和 ch 相关的字符是阿拉伯数字 `0`，1ch 表示一个 0 字符的宽度。这个单位看起来有些鸡肋，但如果和等宽字体在一起使用，就可以发挥不一样的威力。

注：em 是 font-size 的计算值，ch 是字体中 0 的宽度；修改 font-family 两者都会变动；当使用等宽字体时，1em == 2ch

**常见中文字体名**

虽然一些常见中文字体，如宋体、微软雅黑等，直接使用中文名作为属性值也能生效，但有些是没有效果的，因此我们一般都使用英文名。下面是整理的一些常见字体的英文名。

```txt
Win
宋体 SimSun   黑体 SimHei      微软雅黑 Microsoft Yahei   微软正黑体 Microsoft JhengHei
楷体 KaiTi    新宋体 NSimSum   仿宋 FangSong

Mac
苹方 PingFang SC       华文黑体 STHeiti   华为楷体 STKaiti   华文宋体 STSong
兰亭黑 Lantinghei SC   手札体-简 Hannotate SC
```

### font-weight  font-style  font-variant

**font-weight**

font-weight 表示字重，通俗点讲，就是表示文字的粗细程度。

```txt
平常用得最多的属性值：  normal  bold                          # normal 同 400  bold 同 700
相对于父级元素的属性值：lighter  bolder                       # 根据分段取 100 400 700 900
字重的精细控制：100  200  300  400  500  600  700  800  900   # 值都是固定的，不存在 550 这种用法
```

很多人会发现，font-weight 无论设置 300 400 500 还是 600，文字的粗细都没有变化，只有到 700 的时候才会加粗下，感觉浏览器好像不支持这些数值。实际上，所有这些数值关键字，浏览器都是支持的，之所以没有看到变化，是因为我们的系统里面缺乏对应粗细的字体。尤其是做桌面端项目，大部分用户都是使用 Windows 系统，而 Win 系统下中文字体粗细就一个型号，因此，最终效果就只有 CSS 层面的 "加粗" 和 "正常尺寸" 两种表现。

**font-style**

font-style 的属性值就三个 normal italic oblique。

italic 和 oblique 都表示 "斜体" 的意思，区别在于，italic 是使用当前字体的斜体字体，而 oblique 只是单纯地让文字倾斜。当使用 italic 时，如果使用的字体没有斜体字体，那么会被解析为 oblique。之所以会专门为一个字体设计倾斜字体，是因为单纯倾斜的时候不好看。再加上没有斜体字体时 italic 表现会和 oblique 一致，所以实际开发中没有任何理由使用 oblique。(注：MDN 上说法有点不一样，在 win 和 mac 下看了下，italic 和 oblique 没啥区别)

<div class="demo">
  <p>
    <span style="font-family: Georgia;">Georgia normal</span>
    <span style="font-family: Georgia; font-style: oblique;">Georgia oblique</span>
    <span style="font-family: Georgia; font-style: italic;">Georgia italic</span>
  </p>
</div>

**font-variant**

使用 CSS 实现小体型大写字母，即大小跟小写字母一样，但样式是大写。中文根本不适用，英文估计也没啥使用场景。

### font

**缩写用法**

font 属性的完整语法如下，注意，font-size 和 font-family 两者是必需的。

```
[ [font-style || font-variant || font-weight]? font-size [ / line-height]? font-family ]
```

使用 font 缩写会破坏部分属性的继承性，例如，页面的行高为 20px，当使用 `font: 30px sans-serif` 后，行高 line-height 就会被重置为 normal。

**关键字属性值**

```
font: caption | icon | menu | message-box | small-caption | status-bar
```

目前非常多网站的通用 font-family 直接就是

```css
html { font-family: 'Microsoft YaHei'; }
```

这样做的问题是，到了 Mac 下原本默认的漂亮字体就不能用了，改进下，我们可以使用标准的系统字体关键字

```css
html { font-family: system-ui; }
```

但目前只有 Chrome 56+ 支持，而且 system-ui 指的是 调色板标题 对应关键字 small-caption 使用的字体。

压轴的总在最后，显然还有个更好的方法就是使用这里的 font 关键字，这是标准属性。简简单单的几个声明就可以让各个系统使用各自引以为傲的字体。

```css
html { font: menu; } body { font-size: 16px; }
```

### @font-face

虽然说 CSS3 新世界中才出现真正意义上的变量 var，但实际上，在 CSS 世界中已经出现了本质上就是变量的东西，@font-face 规则就是其中之一。@font-face 本质上就是一个定义字体或字体集的变量，这个变量不仅仅是简单地自定义字体，还包括字体重命名、默认字体样式设置等。

@font-face 规则支持的 CSS 属性有 `font-family` `src` `font-style` `font-weight` `unicode-range` `font-variant` `font-stretch` 和 `font-feature-settings`。

```css
@font-face {
  font-family: ICON;  /* 字体变量名，名称可以随意取 */
  /* format 功能符的作用是让浏览器提前知道字体的格式，以决定是否需要加载 */
  src: url(icon.woff2) format(woff2), url(icon.woff) format(woff), url(icon.ttf);
  font-style: normal;  /* 如没有同字体名的多字体设置，这就是多余的 */
  font-weight: normal; /* 如没有同字体名的多字体设置，这就是多余的 */
  unicode-range: U+0025-00FF; /* 让特定范围的字符使用指定的字体 */
}
```

同名字体的多字体设置示例：

```css
@font-face { font-family: I; font-style: normal; src: local(FZYaoti); }
@font-face { font-family: I; font-style: italic; src: local(FZShuTi); }
```

#### @font-face 与字体图标技术

从面向未来的角度讲，字体图标技术的使用会越来越边缘化，因为和 SVG 技术相比，其唯一的优势就是兼容一些老的 IE 浏览器。SVG 图标同样是矢量的，同样颜色可控，但资源占用更少，加载体验更好，呈现效果更佳，更加符合语义，我个人是非常推崇 SVG 图标的。

所谓字体，本质上是字符集和图形的一种映射关系。

当我们使用工具生成图标字体的时候，无论是在线工具还是本地工具，其中间的媒介都是 SVG 图标，但是并不是所有的 SVG 图标都可以，根据我的经验，最好满足下面 3 点：
  * 纯路径，纯矢量，不要有 base64 内联图形
  * 使用填充而非描边，也尽量避免使用一些高级的路径填充覆盖技巧
  * 宽高最好都大于 200，因为生成字体时，坐标值会四舍五入，尺寸过小会导致坐标取值偏差较大，最终生成的图标不够精致

有人可能会问，我可不可以把映射字符直接写在页面中，而不是放在 :before 伪元素中？从技术实现角度来讲是完全可行的，但并不建议这么做，原因有两点：
  * 不好维护，如果以后字符映射关系改变，而图标是散布在各个页面中的，改动会很麻烦
  * 从语义角度考虑，图标字符往往是不包含任何意义的，应该没必要让搜索引擎知道，也无须让辅助设备读取，而伪元素恰好有这样的功能。

### 文本的控制

CSS 有很多属性专门用来对文本进行控制，由于这些属性的作用机制往往是基于内联盒模型的，因此对于内联块状元素同样也有效果，这就使得这些 CSS 属性作用范围更广了，甚至可以影响布局。

#### text-indent

text-indent 就是对文本进行缩进控制，实际用得比较多的是 负值隐藏文本内容。

```html
<h1 class="logo">CSS 世界</h1>
<style>.logo { width: 120px; background: url(logo.png); text-indent: -120px; }</style>
```

#### letter-spacing

letter-spacing 具有以下一些特性：
  * 继承性
  * 默认值是 normal 而不是 0
  * 支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列(IE 最多只能完全重叠，无法反向排列)
  * 默认左对齐的情况下，无论值如何设置，第一个字符的位置一定是纹丝不动的
  * 支持小数值，即使 0.1px 也是支持的

<div class="demo">
  <style>
    .d862-title { width: 8em; margin: auto; white-space: nowrap; letter-spacing: -100px; }
    .d862-title:hover { animation: textIn 1s both; }
    @keyframes textIn {
      0% {letter-spacing: -100px; }
      60% {letter-spacing: 5px; }
      100% {letter-spacing: 0; }
    }
  </style>
  <div class="d862-title">我是标题文字内容</div>
</div>

#### word-spacing

word-spacing 和 letter-spacing 名称类似，其特性也有很多共通之处
  * 都具有继承性
  * 默认值都是 normal 而不是 0
  * 都支持负值，都可以让字符重叠。但对于 inline-block 和 inline-table 元素存在兼容性差异，IE 和 FireFox 下不会重叠
  * 都支持小数值，如 word-spacing:.5px
  * 间隔算法都会受到 text-align:justify 两端对齐的影响

letter-spacing 作用于所有字符，而 word-spacing 仅作用于空格字符。注意，是作用在 "空格" 上，而不是字面意义上的 "单词"。有空格就有效，可以是 Space 键敲出来的空格(U+0020)，也可以是换行符产生的空格(U+0020)，还可以是 Tab 键敲出来的空格(U+0009)，抑或是 `&nbsp;` 非换行空格(U+00A0)。

#### word-break 与 word-wrap

```
word-break: normal | break-all | keep-all
word-wrap: normal | break-word             # CSS3 中叫 overflow-wrap
```

word-break:break-all 的作用是所有的都换行，毫不留情，一点儿空隙都不放过。而 word-wrap:break-word 则带有怜悯之心，如果这一行文字有可以换行的点，如空格或 CJK 之类的，就不打英文单词或字符的主意了，在这些换行点换行，因此容易出现一片片空白区域的情况。

<div class="demo" style="display: flex; justify-content: space-around;">
  <style>.d864-p { width: 300px; padding: 5px; background-color: #f0f3f9; font-size: 14px; }</style>
  <div>
    <strong>word-break:break-all</strong>
    <p class="d864-p" style="word-break: break-all;">如果您在阅读过程中有任何疑问或者发现表述不严谨的地方，欢迎去官方论坛http://bbs.cssworld.cn进行反馈与交流。</p>
  </div>
  <div>
    <strong>word-wrap: break-word;</strong>
    <p class="d864-p" style="word-wrap: break-word;">如果您在阅读过程中有任何疑问或者发现表述不严谨的地方，欢迎去官方论坛http://bbs.cssworld.cn进行反馈与交流。</p>
  </div>
</div>

#### white-space

white-space 属性声明了如何处理元素内的空白字符，这类空白字符包括 Space 空格键 Enter 回车键 Tab 制表符键 产生的空白。

* normal 合并空白字符和换行符
* pre 空白字符不合并，并且内容只在有换行符的地方换行
* nowrap 该值和 normal 一样会合并空白字符，但不允许文本环绕
* pre-wrap 空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕
* pre-line 合并空白字符，但只在有换行符的地方换行，允许文本环绕

属性     |  换行 New lines |  空格和制表 Spaces and tabs |  文本环绕 Text wrapping
---------|-----------------|-----------------------------|------------
normal   | 合并 Collapse   | 合并 Collapse               | 环绕 Wrap
nowrap   | 合并 Collapse   | 合并 Collapse               | 不环绕 No wrap
pre      | 保留 Preserve   | 保留 Preserve               | 不环绕 No wrap
pre-wrap | 保留 Preserve   | 保留 Preserve               | 环绕 Wrap
pre-line | 保留 Preserve   | 合并 Collapse               | 环绕 Wrap

<div class="demo column">
  <p style="width: 60%; white-space: pre-line;">第一行，这里跟了十个空格          ，注意查看前面有没有一块空格

这是第三行，上面一行随便打了几个空格
这是第四行，我要把这行搞得很长很长很长很长很长很长很长很长很长很长，看下自动换行情况</p>
  <div class="desc" style="width: 40%;"><br>打开 devtool 修改 white-space 值查看效果</div>
</div>

#### text-align

常见的左中右对齐没什么好说的，这里只讲一下 text-align: justify 两端对齐。

因为 CSS 是母语为英语的人发明的，所以在早期的时候，对中文或者其他东亚语言并没有考虑地那么细致，从 text-align:justify 上就可见一斑，IE 浏览器一直无法让中文两端对齐，而 Chrome Firefox 则可以。就最终的渲染表现来看，Chrome 等浏览器应该对文本内容进行了算法区分，对 CJK 文本使用 letter-spacing 间隔算法，而对非 CJK 文本使用 word-spacing 间隔算法，但 IE 就一个 word-spacing 间隔算法。不过好在 IE 有个私有的 text-justify 可以实现中文两端对齐。

```css
.justify { text-align: justify; text-justify: inter-ideograph; }
```

在默认设置下，text-align:justify 要想有两端对齐的效果，需要满足两点：一是有分隔点，如空格；二是要超过一行，此时非最后一行内容会两端对齐。

#### text-decoration

text-decoration:underline 可以给内联文本增加下划线，但是如果对细节要求较高，就会发现下划线经常和文字粘连在一起，此时可以借助 border 属性来解决。

text-decoration 除了支持下划线，还支持上划线 overline 和中划线 line-through，还支持同时设置多个属性。

```css
a { text-decoration:none; border-bottom:1px solid; } /* 使用 border 解决与文字粘连问题 */
a { text-decoration: underline overline; } /* 支持同时设置多个属性 */
```

#### text-transform

text-transform 也是为因为字符设计的，要么全大写 uppercase 要么全小写 lowercase，似乎没什么值得挖掘的，但有一些场景使用它却会有一本万利的效果。

身份证输入：我国的身份证最后一位有可能是字母 X，且各种场合都是指定必须大写，如果我们设置 `input { text-transform: uppercase; }`，那么就算我们敲进去的是小写 x，显示时也是大写的。

验证码输入：图形验证码其实一般都是不区分大写的，如果图形验证码只出现大写，但允许输入小写，那么使用 CSS 转一下可以消除用户惴惴不安的心。

### ::first-letter 与 ::first-line

::first-letter 使用中还是有很多梗的，啪啦啪啦...

电商产品经常会有价格，价格前面一般都有一个 ￥ 符号，且这个符号的样式比较特殊。通常的做法是套一层 span，但这里的 ::first-letter 其实来得更巧妙。


## 元素的装饰与美化

### color

CSS1 的时候只支持 16 个基本颜色关键字，到 CSS2 也只新增了一个关键字 orange，到 CSS3 一下子增加了 100 多个颜色关键字。所有 CSS3 新增的颜色关键字原生 IE8 浏览器并不支持，我们总是使用 IE 兼容模式去测试低版本 IE 浏览器，但不总是准确的，其中之一就是颜色。实际开发中使用颜色关键字的机会不多。

color:transparent 原生 IE8 浏览器不支持，会使用默认颜色代替。不要拿兼容模式下的测试结果说事。

currentColor 变量是个好东西，可以使用当前 color 计算值，但同样的，只有 IE9+ 才支持。实际上，很多属性默认就是 currentColor 的表现，如 border text-shadow box-shadow 等。

CSS 世界的 color 属性支持十六进制颜色和 rgb 颜色。十六进制颜色是用的最多的颜色格式，书写快，渲染性能高。

rgb 格式除了支持数值，还支持百分比，如 rgb(100%, 0%, 20%)。数值格式只能是整数，不能是小数，否则无效。

CSS3 新增了 hsl rgba hsla 三种颜色格式。在取色器中，hsl 颜色非常管用，有助于迅速选取我们想要的颜色值，或者根据现有颜色得到近似色。

最后说下还有 "系统颜色" 关键字这个东东...

### background

background 大部分有意思的内容都是在 CSS3 中才出现的。如多背景、背景尺寸 background-size、背景初始定位盒子 background-origin、背景剪切盒子 background-clip 等。

IE8 浏览器支持 base64 图片，可以节约一个网络请求，但其渲染性能不高，大尺寸图片慎用。

如果想用 background-image 实现鼠标光标经过变换图片的效果，则务必将这两张图片合并在一张图上，除了减少请求外，主要是出于交互体验考虑。如果图片不合在一起，鼠标光标经过时，就会去请求另外一张图片，如果这个图片没有被缓存，容易出现原图片消失的情况，即，原图被换，但新图还没拉下来，就出现了短时间的空白。

**与众不同的百分比计算方式**

```txt
positionX = (容器宽度 - 图片宽度) * percentX
positionY = (容器高度 - 图片高度) * percentY
```

**background-color 背景色永远是最低的**

background 无论是单背景图还是多背景图，背景色一定是在最底下的位置。为了及时准确反馈用户的点击行为，我们会在链接或按钮元素上增加 :active 样式，通常的思路是 :active 时变换下背景色，但这样有一个很大的问题，即每个按钮的背景色都是不一样的，那岂不是要写很多个 :active 样式？此时我们可以试试使用背景图片代替背景色(代码如下)，因为背景色一定是在最底下的位置，所以这里的 background-image 一定是覆盖在按钮等元素背景色之上的，不会影响按钮原来的背景色。

```css
a[href]:active, button:active {
  background-image: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.5));
}
```

IE9 浏览器不支持背景渐变，不过也是有手段可以做兼容的，那就是使用 IE 私有的滤镜...

有些人并不清楚如何将数值转换成十六进制，可以这样处理 `(n).toString(16)`

## 元素的显示与隐藏

使用 CSS 让元素不可见的方法很多，剪裁、定位到屏幕外、明度变化等都是可以的。虽然它们肉眼不可见，但背后却在多个维度上都有差别。下面是我总结的一些比较好的隐藏实践。

* 如果希望元素不可见，同时不占据空间，辅助设备无法访问，同时不渲染，可以使用 `<script>` 标签隐藏。浏览器只会处理 `<script type="text/javascript">` 的内容，对于如 `<script type="text/html">` 之类的内容是不会进行解析的。内容获取可使用 `script.innerHTML`，获取到的内容为文本而非DOM树，如果使用 HTML5 的 `<template>` 则可以获取 DOM 树，所以，对新浏览器来说，`<template>` 才是更好的选择。

* 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但资源有加载，DOM 可访问，这可以直接使用 `display:none` 隐藏。

* 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但显隐的时候可以有 transition 淡入淡出效果，则可以使用 `.hidden {position: absolute; visibility: hidden;}`

* 如果希望元素不可见，不能点击，辅助设备无法访问，但占据空间保留，则可以使用 `visibility:hidden` 隐藏。

* 如果希望元素不可见，不能点击，不占据空间，但键盘可以访问，则可以使用 clip 剪裁隐藏 `.clip {position: absolute; clip: rect(0 0 0 0);}`

* 如果希望元素不可见，不能点击，但占据空间，且键盘可访问，则可以试试 relative 隐藏。例如，如果条件允许，也就是和层叠上下文之间存在设置了背景色的父元素，则也可以使用更友好的 z-index 负值隐藏。`.lower {position: relative; z-index: -1;}`

* 如果希望元素不可见，但可以点击，而且不占据空间，这可以使用透明度。`.opacity {position: absolute; opacity: 0; filter: Alpha(opacity=0);}`

* 如果单纯希望元素看不见，但位置保留，依然可以点可以选，则直接让透明度为 0。`.opacity {opacity: 0; filter: Alpha(opacity=0);}`

读者可以根据实际的隐藏场景选择合适的隐藏方法。不过，实际开发场景千变万化，上面罗列的实践不足以覆盖全部情形。例如，在标签受限的情况下希望隐藏某文字，可能适用 text-indent 缩进是最友好的方法。如果希望显示的时候可以加一个 transition 动画，就可能要使用 max-height 进行隐藏了。

### display

display 可以说是 web 显隐交互中出场频率最高的一种隐藏方式，是真正意义上的隐藏，干净利落。人们对它的认识也比较准确，无法点击，无法使用屏幕阅读器等辅助设备访问，占据的空间消失。很多人的认识仅局限于此，实际上 display:none 还有其他故事。

**display:none 与 background-image 图片加载**

在 Firefox 下，display:none 的元素的 background-image 图片是不加载的，包括父元素 display:none 也是如此；如果是 Chrome 和 Safari 则要分情况，如父元素 display:none，图片不加载，如本身背景图所在的元素隐藏，这图片依旧会加载；而 IE 在任何情况下都会去请求图片资源。实际开发时，如头图轮播切换效果，那些默认需要隐藏的图片作为背景图藏在隐藏元素的子元素上，微小的改动就可以明显提升页面的加载体验，可以说是非常实用的小技巧。

另外，如果不是 background-image 图片，而是 img 元素，这设置 display:none 在所有浏览器下依旧都会请求图片资源。

**天然的隐藏元素**

HTML 中很多标签和属性天然 display:none，如 `<style>` `<script>` 和 HTML5 的 `<dialog>` 元素。如果这些元素在 body 内，设置 display:block 是可以让内联 CSS 和 JS 代码直接在页面中显示的；如果再设置 contenteditable="true"，在有些浏览器(如 Chrome)下甚至可以直接实时编辑预览页面的样式。

还有一些属性也是天然 display:none 的，例如 `<input type="hidden" name="id" value="1">`

HTML5 中新增了 hidden 这个布尔属性，可以让元素天生 display:none 隐藏 `<div hidden>看不见我</div>`。IE11 和其他现代浏览器都支持，如果要兼容桌面端，那么加下 `[hidden] { display: none; }`。

display:none 显隐控制并不会影响 CSS3 animation 动画的实现，但是会影响 CSS3 transition 过渡效果执行，因此 transition 往往和 visibility 属性走得比较近。

### visibility

有些人简单的认为 display:none 和 visibility:hidden 两个隐藏的区别就在于 display:none 隐藏后的元素不占据任何空间，而 visibility:hidden 隐藏的元素空间依旧保留。实际上并没有这么简单。

**visibility 的继承性**

父元素设置 visibility:hidden，子元素也会看不见，究其原因是继承性，子元素继承了 visibility:hidden，但是，如果子元素设置了 visibility:visible，则子元素又会显示出来。这个和 display 隐藏有着质的区别。

```html
<ul style="visibility: hidden;">
  <li style="visibility: visible;">列表1</li>
  <li>列表2</li>
  <li style="visibility: visible;">列表3</li>
  <li>列表4</li>
</ul>
```

上例中 列表1 和 列表3 依然会显示而不是隐藏。

这种 visibility:visible 后代可见的特性，在实际开发的时候非常有用...

**visibility 与 CSS 计数器**

visibility:hidden 不会影响计数器的计数，这和 display:none 完全不一样。

**visibility 与 transition**

CSS3 transition 支持的属性中有 visibility 但并没有 display。由于 transition 可以延时执行，因此和 visibility 配合可以使用纯 CSS 实现 hover 延时效果，由此提升我们的交互体验。

<div class="demo">
  <style>
    .d1021 td a {display: block;}
    .d1021-list {width: 80px; position: absolute; visibility: hidden; border: 1px solid #ccc; background: #fff;}
    .d1021 td:hover .d1021-list {visibility: visible; transition: visibility 0s .2s;}
    .d1021-list a {padding: 5px 10px; color: #333;}
    .d1021-list a:hover {background-color: #f5f5f5;}
  </style>
  <table class="d1021">
    <tr><td>栏目1</td><td>栏目2</td><td><a href>操作▾</a><div class="d1021-list"><a href>编辑</a><a href>删除</a></div></td></tr>
    <tr><td>栏目1</td><td>栏目2</td><td><a href>操作▾</a><div class="d1021-list"><a href>编辑</a><a href>删除</a></div></td></tr>
  </table>
</div>

visibility 除了和 transition 友好外，其在 Javascript 侧也更加友好。存在这样的场景：我们需要隐藏元素进行尺寸和位置的获取，以便对交互布局进行精准定位，此时，建议使用 visibility 隐藏 `.hidden { position: absolute; visibility:hidden; }`。原因是，我们可以准确计算出元素的尺寸和位置，如果使用 display:none，则无论是尺寸还是位置都会是 0，计算就会不准确。

## 用户界面样式

用户界面样式指的是 CSS 世界中用来帮助用户进行界面交互的一些 CSS 样式，主要有 outline 和 cursor 等属性。

### outline

outline 表示元素的轮廓，语法和 border 属性非常类似，分宽度、类型和颜色，支持的关键字和属性值与 border 属性一模一样。两者表现也类似，都是给元素的外面画框。但是，两者设计的作用却大相径庭。

outline 是一个和用户体验密切相关的属性，与 focus 状态以及键盘访问关系密切。在桌面端网页，对于按钮或者链接，我们通常使用鼠标点击去完成操作。但是世事难料，总会存在用户只能使用键盘访问网站的情况。好在所有浏览器原生就有键盘访问网页的能力，对于按钮或者链接，通常的键盘操作是：Tab 键按次序不断 focus 控件元素，包括链接、按钮、输入框等表单元素，或者 focus 设置了 tabindex 的普通元素，按 Shift+Tab 组合键反方向访问。注意，重点来了，在默认状态下，对处于 focus 状态的元素，浏览器会通过虚框或者外发光的形式区分和提示。这种虚框或者外发光效果是非常有必要的，否则用户根本就不知道自己当前聚焦在哪个元素上。元素聚焦后，再按下回车键，就相当于鼠标点击了这个元素，从而可以前往我们想去的目的地(如 a 链接)，或者执行我们想要的交互效果(如按钮)。以上就是我们的键盘访问过程。

在实际开发的时候，有时候需要让普通元素有类似控件元素的 outline 效果。例如，基于原生的单复选框模拟单复选框，或者为了规避 submit 类型按钮 UI 很难完全一致的问题，我们会使用 label 元素来移花接木。此时虽然样式上完美了，但却留下了一个键盘可访问性的问题：当我们使用 Tab 键在页面上遍历元素的时候，focus 的是隐藏的原生按钮，因为原生按钮被隐藏，用户无法看到 outline 效果。此时我们需要额外增加一层 CSS 代码，让 label 把键盘 focus 状态也一起代言了：

```css
input:focus + label {
  outline: 1px dotted Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
```

outline 是本书介绍到现在出现的第一个真正意义上的不占据任何空间的属性。这就注定了 outline 要脱离其设计初衷，在其他方面大显神通。

**头像裁剪的矩形镂空效果**

```css
.crop-area {
  position: absolute;
  left: 88px; top: 56px;
  outline: 256px solid #000;
  outline: 256px solid rgba(0,0,0,.5);
  background: url(about:blank);
  background: linear-gradient(to top, transparent, transparent);
  filter: alpha(opacity=50);
  cursor: move;
}
:root .crop-area {
  filter: none;
}
```

http://demo.cssworld.cn/11/1-1.php

**自动填满屏幕剩余空间的应用技巧**

### cursor

#### 琳琅满目的 cursor 属性值

#### 自定义光标

自定义光标很实用。解决兼容性问题只是自定义光标的作用之一，最大的作用其实还是根据业务需要对光标进行更为彻底的自定义。

```css
.example { cursor: url(one.svg), url(two.svg) 5 5, progress; }
```

## 流向的改变

可能会有人认为 CSS 世界中的内容始终是自左往右、自上而下排列的，其实，流向是可以轻易颠覆和改变的。

### direction 与 unicode-bidi

<div class="demo" >
  <style style="display: block;" contenteditable="true">.d1211 { direction: rtl; }  /\* 直接在此编辑看效果 \*/</style>
  <div class="d1211"><button>确定</button> <button>取消</button></div>
  <div class="desc">桌面端 "确认" 在前 "取消" 在后；移动端为方便单手操作 "取消" 在前 "确认" 在后</div>
</div>

细心的读者可能注意到了，direction 属性似乎只能改变图片或者按钮的呈现顺序，但对纯字符内容(尤其中文)好像并没有什么效果，但实际上，我们也是可以指定中文每个字符都反向呈现的，方法就是借助 unicode-bidi

### writing-mode

前面也提到了，虽然创造 writing-mode 的本意是文本布局，但是，其带来的文档流向的改变，不仅改变了我们多年来正常额 CSS 认知，同时可以巧妙地实现很多意想不到的需求和效果。
