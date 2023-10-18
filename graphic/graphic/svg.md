# SVG

## 位图和矢量图

位图由一系列像素组成，对于需要表现丰富色彩的图像，位图很合适，但是放大会造成失真。

矢量图不是由像素定义的，而是由线段和曲线来定义的。相比位图，矢量图具有文件小、缩放不失真的优点。
由于矢量图是用数学方法描述的图，因此不适合表现自然度高、复杂多变的图。

## SVG 容器

```html
<!-- 容器 -->
<svg width="300" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
```

### Viewport and viewBox

视口——飞机上的小窗  视框——望远镜

https://webdesign.tutsplus.com/tutorials/svg-viewport-and-viewbox-for-beginners--cms-30844

```html
<!-- 缩小，视口内显示更多内容，但内容缩小 -->
<svg width="50" height="50" viewBox="0 0 100 100">
  <ellipse cx="50" cy="50" rx="50" ry="50"></ellipse>
</svg>
<!-- 放大 -->
<svg width="50" height="50" viewBox="0 0 25 25">
  <ellipse cx="50" cy="50" rx="50" ry="50"></ellipse>
</svg>
```


## 图形元素


SVG 中预定义了七种形状元素，分别为：矩形 `rect` 圆形 `circle` 椭圆 `ellipse` 线段 `line` 折线 `polyline` 多边形 `polygon` 路径 `path`。

```html
<!-- 矩形 -->
<!-- x,y 左上角坐标 / rx,ry 圆角半径 / width,height 宽度和高度 / style 用于指定样式 -->
<rect x="20" y="20" width="200" height="100" rx="20" ry="40"
      style="fill: #f00; stroke: #00f; stroke-width: 4; opacity: 0.5" />

<!-- 圆形 & 椭圆 -->
<!-- cx,cy 圆心坐标 / r 圆半径 rx,ry 椭圆半径 / width,height 宽度和高度 / style 用于指定样式 -->
<circle cx="160" cy="50" r="20" style="fill: #f00; stroke: #00f; stroke-width: 4;" />
<ellipse cx="240" cy="50" rx="40" ry="20" style="fill: #f00; stroke: #00f;" />

<!-- 线段 -->
<!-- x1,y1 起点坐标 / x2,y2 终点坐标 -->
<line x1="280" y1="20" x2="320" y2="80" style="stroke: #00f; stroke-width: 4;" />

<!-- 多边形 & 折线 -->
<!-- points 包含一系列的点坐标，多边形会将终点和起点相连，而折线则不连 -->
<polygon points="400,20 420,30 420,80 360,80 360,30"
         style="fill: #f00; stroke:#00f; stroke-width:6" />
<polyline points="400,20 420,30 420,80 360,80 360,30"
          style="fill: #f00; stroke:#00f; stroke-width:6"
          transform="translate(80, 0)" />

<!-- 路径 -->
<path d="M520,20 H580 V80 M520,80 C540,20 560,20 560,80"
      style="fill: #ccc; stroke: #000; stroke-width: 2;" />
```

<svg width="960" height="82" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="100" height="60" rx="20" ry="30"
        style="fill: #f00; stroke: #00f; stroke-width: 4; opacity: 0.5" />
  <circle cx="160" cy="50" r="20" style="fill: #f00; stroke: #00f; stroke-width: 4;" />
  <ellipse cx="240" cy="50" rx="40" ry="20" style="fill: #f00; stroke: #00f;" />
  <line x1="280" y1="20" x2="320" y2="80" style="stroke: #00f; stroke-width: 4;" />
  <polygon points="400,20 420,30 420,80 360,80 360,30"
           style="fill: #f00; stroke:#00f; stroke-width:6" />
  <polyline points="400,20 420,30 420,80 360,80 360,30"
            style="fill: #f00; stroke:#00f; stroke-width:6" transform="translate(80, 0)" />
  <path d="M520,20 H580 V80 M520,80 C540,20 560,20 560,80"
        style="fill: #ccc; stroke: #000; stroke-width: 2;" />
</svg>

#### 路径

`<path>` 标签的功能最丰富，其他图形都可以用路径制作出来。与折线类似，也是通过给出一系列点坐标来绘制，具体用法是：给出一个坐标点，在坐标点前面添加一个英文字母，表示是如何运动到此坐标点的。英文字母按照功能可分为五类。

移动类
  * M = moveto - 将画笔移动到指定坐标

直线类
  * L = lineto - 画直线到指定坐标
  * H = horizontal lineto - 画水平直线到指定坐标
  * V = vertical lineto - 画垂直直线到指定坐标

曲线类
  * C = curveto - 贝塞尔曲线。。
  * S = shorthand/smooth curveto - 贝塞尔曲线。。
  * Q = quadratic Bezier curveto - 贝塞尔曲线。。
  * C = shorthand/smooth quadratic Bezier curveto - 贝塞尔曲线。。

弧线类
  * A = elliptical arc - 画椭圆曲线到指定坐标

闭合类
  * Z = closepath - 绘制一条直线连接终点和起点，用来封闭图形

注：**上述命令都是用大写英文字母表示，表示坐标系中的绝对坐标。也可用小写英文字母，表示的是相对坐标**。

### 文字

文字用 `<text>` 标签，如果其中部分文字要单独定义样式，用 `<tspan>` 隔离。

```html
<!-- x,y 左上角坐标 / dx,dy 平移距离 / textLength 文字宽度 / rotate 旋转角度-->
<text x="10" y="10" dx="-12" dy="4" rotate="30" textLength="200">
  I love <tspan fill="red">D3</tspan>
</text>
```

<svg width="960" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="958" height="22" fill="#eee" stroke="#f00" stroke-width="1" />
  <text x="10" y="10" dx="-12" dy="4" rotate="30" textLength="200">I love <tspan fill="red">D3</tspan></text>
</svg>

### 样式

定义样式的3种方式：
  * 使用 CSS 选择器定义样式
  * 元素上分项定义样式
  * 元素上使用 style 统一定义样式

常见的样式有以下这些：
  * `fill` - 填充色，文字颜色也用这个
  * `stroke` - 轮廓线颜色
  * `stroke-width` - 轮廓线宽度
  * `stroke-linecap` - 轮廓线端点样式
  * `stroke-dasharray` - 虚线样式
  * `opacity` - 透明度
  * `font-family` - 字体
  * `font-size` - 字体大小
  * `font-weight` - 字体粗细
  * `font-style` - 字体样式
  * `text-decoration` - 字体修饰，下划线等

```html
<style>.linestyle { stroke: red; stroke-width: 2; }</style>
<svg width="960" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <line class="linestyle" x1="10" y1="4" x2="100" y2="4" />
  <line x1="10" y1="9" x2="100" y2="9" stroke="green" stroke-width="4" />
  <line x1="10" y1="16" x2="100" y2="16" style="stroke: blue; stroke-width: 6" />
</svg>
```

<style>.linestyle { stroke: red; stroke-width: 2; }</style>
<svg width="960" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <line class="linestyle" x1="10" y1="4" x2="100" y2="4" />
  <line x1="10" y1="9" x2="100" y2="9" stroke="green" stroke-width="4" />
  <line x1="10" y1="16" x2="100" y2="16" style="stroke: blue; stroke-width: 6" />
</svg>

### 标记

标记 marker 能贴附于 `<path>` `<line>` `<polyline>` `<polygon>` 元素上。最典型的应用就是给线段添加箭头。

标记在 `<defs></defs>` 中定义，`<defs>` 用于定义可重复利用的图形元素。

* `viewBox` - 坐标系区域
* `refX`, `refY` - viewBox 内的基准点，绘制时此点在直线端点上
* `markerUnits` - 标记大小的基准(决定是否跟随宿主缩放)，strokeWidth(缩放) 或 userSpaceOnUse(不缩放)
* `markerWidth`, `markerHeight` - 标识的大小
* `orient` - 绘制方向，auto 或具体角度值
* `id` - 标识的引用 id

```html
<svg width="960" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12"
            viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#000" />
    </marker>
    <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
  <line x1="30" y1="30" x2="100" y2="30" stroke="red" stroke-width="2" marker-end="url(#Triangle)" />
  <path d="M20,70 T80,100 T160,80 T200,90" fill="white" stroke="red" stroke-width="6"
        marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)" />
</svg>
```

<svg width="960" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12"
            viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#000" />
    </marker>
    <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
  <line x1="30" y1="30" x2="100" y2="30" stroke="red" stroke-width="2" marker-end="url(#Triangle)" />
  <path d="M20,70 T80,100 T160,80 T200,90" fill="white" stroke="red" stroke-width="6"
        marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)" />
</svg>



### 滤镜


### 渐变


## 编辑器

https://css-tricks.com/tools-visualize-edit-svg-paths-kinda/

#### 在线编辑器

https://github.com/SVG-Edit/svgedit  
http://editor.method.ac/  

#### 在线优化

http://petercollingridge.appspot.com/svg-editor

#### 在线路径生成

可以考虑把下面两个项目的优点合并下，自己造个轮子  
http://jxnblk.com/paths/?d=M32%200%20L0%2032%20L32%2064  
https://codepen.io/anthonydugois/pen/mewdyZ  
