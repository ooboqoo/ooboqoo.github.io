# 布局 Layout




## Flexbox

参考资源：  
Flex 布局教程 -- 阮一峰 http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool  
CSS Flexible Box Layout Module Level 1 https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/

布局的传统解决方案，基于盒状模型，依赖 `display` + `position` + `float`。使用时需要注意清除浮动，对于一些特定布局的实现也非常不便。2009年 W3C 提出了 Flex 布局，可以简便、完整、响应式地实现各种页面布局。可以把 `flex` 简单理解为 `float` 的升级版本。

### Flex Box Properties

```less
.box {
  display: flex | inline-flex;
  flex-direction: row (default) ｜ column | row-reverse | column-reverse; // 排列方向
  flex-wrap: nowrap (default) | wrap | wrap-reverse;                      // 折行
  flex-flow: <flex-direction> <flex-wrap>;                                // 前两项的简写
  justify-content: flex-start (default) | flex-end | center |             // 水平对齐
                   space-between (两端对齐) | space-around (等间距) ｜ space-evenly;
  align-items: flex-start | flex-end | center |                           // 垂直对齐-单轴
               baseline (项目的第一行文字的基线对齐) | stretch (default);
  align-content: flex-start | flex-end | center |              // 垂直对齐-多轴 (flex-wrap: wrap)
                 space-between | space-around | space-evenly ｜ stretch (default);
}
```

注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

### Flex Item Properties

```less
.item {
  order: <integer>;            // 定义项目的排列顺序，数值越小，排列越靠前，默认为 0
  flex: none (0 0 auto) | auto (1 1 auto) | <flex-grow> <flex-shrink> <flex-basis>; // 默认值 0 1 auto
  flex-grow: <number>;         // 如果有剩余空间，各项目的扩张系数，默认为 0，即不放大
  flex-shrink: <number>;       // 空间不足时各项目的收缩系数，默认为 1，为 0 时该项不收缩
  flex-basis: <width> | auto;  // 指定项目占用的基准宽度 [注]
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
    // 对单个项目设置特定的对齐方式，覆盖 container 的 align-items
}
```

注意，`max-width` | `min-width` 优先于 `flex-basis` 优先于 `width` 优先于 content(实际内容宽度)  [参考链接](https://www.jianshu.com/p/17b1b445ecd4)

### Flexbox 细节知识点

`margin: auto` 与 `flex: 1` 的区别：添加背景一看就明白了。

去除 inline 元素间的空白，一个 `display: flex;` 就可以搞定，比以前方便太多。

在响应式布局中，从大屏页面逐步向小屏界面进发时，`flex-direction: column;` 和 `margin` 将会是常客。

### Flex 布局实战

```html
<!-- 页面主体 -->
<div class="container">
  <!-- 导航菜单 -->
  <nav>
    <div><a href="#">link1</a></div>
    <div><a href="#">link item 2</a></div>
    <div><a href="#">this is a long link item</a></div>
  </nav>
  <!-- 页面内容主体 -->
  <main>
    <div class="block1">this is block1</div>
    <div class="block2">this is block2</div>
  </main>
  <!-- 侧边栏 -->
  <aside>
    <div class="side1">side 1</div>
    <div class="side2">side 2</div>
  </aside>
</div>
<!-- 页面底部footer -->
<footer>
  copyright C <a href="//www.hujiang.com">hujiang</a>
</footer>
```

```css
body {
  display: flex;      /* 整体设置为flex布局 */
  flex-flow: column;  /* 设置子项的排列方向为垂直排列 */
  margin: 0;
  padding: 0;
  /* 设置最小高度 */
  min-height: 100vh;
  font-size: 2em;
}
.container {
  /* 上部主容器自适应高度 */
  flex: 1;
  /* 主容器内部也采用flex布局，实现导航，内容主体和侧边栏的布局 */
  display: flex;
}

footer {
  /* 固定底部高度 */
  height: 40px;
  background: slategray;
  text-align: center;
}
main { background: gray; }
nav { background: lightgray; }
aside { background: darkgray; }
.side1, .side2 { height: 200px; border:1px solid gray; }
.block1, .block2 { height: 300px; border-bottom:1px solid #fff; }
nav, aside {
  /* 导航和侧边栏固定宽度 */
  width:200px;
  min-width: 200px;
  max-width: 200px;
  height: auto;
}
main { flex: 1;/* 内容自适应宽度 */ }

/* 在屏幕宽度不大于1000px时，隐藏侧边栏 */
@media (max-width: 1000px) {
  aside { display: none; }
}

/* 在屏幕宽度不大于768px时 */
@media(max-width: 768px){
  /* 设置排列方式为垂直排列 */
  .container { flex-direction: column; }
  /* 覆盖前面定义的侧边栏和导航栏的宽度，设置为屏幕宽度 */
  nav, aside { width: 100%; min-width: 100%; max-width: 100%; }
  aside { display: block; }  /* 覆盖在前一个@media中隐藏的侧边栏设置 */
  main { min-width: 90vh; height: 90vh; }  /* 垂直排列之后，手动设置主题内容的高度 */
}
```

## Grid Layout

CSS Grid Layout Module Level 2 https://www.w3.org/TR/2018/WD-css-grid-2-20180804/  
http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是 *一维布局*。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是 *二维布局*。Grid 布局远比 Flex 布局强大。

采用网格布局的区域，称为 **容器 container**。容器内部采用网格定位的子元素，称为 **项目 item**。Grid 布局只对项目生效，不包含项目的子元素。

容器里面的水平区域称为 **行 row**，垂直区域称为 **列 column**。行和列的交叉区域，称为 **单元格 cell**。划分网格的线，称为 **网格线 grid line**。

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。

### 容器属性

```css
/* 3行3列的行内网格布局 */
.grid-container {
  display: inline-grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: 50px 50px 50px;
}
```

<div class="demo">
  <span>foo</span>
  <div class="grid-container">
    <div class="grid-item" style="background-color: #ef342a;">1</div>
    <div class="grid-item" style="background-color: #f68f26;">2</div>
    <div class="grid-item" style="background-color: #4ba946;">3</div>
    <div class="grid-item" style="background-color: #0376c2;">4</div>
  </div>
  <span>bar</span>
  <style>
    .grid-container { display: inline-grid; grid-template-columns: 50px 50px; grid-template-rows: 50px 50px; }
    .grid-item { font-size: 2em; text-align: center; border: 1px solid #e5e4e9; }
  </style>
</div>

注意，设为网格布局以后，容器子元素(项目)的 `float` `display: inline-block` `display: table-cell` `vertical-align` 和 `column-*` 等设置都将失效。

#### 定义行列

`grid-template-columns` 定义每一列的列宽  
`grid-template-rows` 定义每一行的行高  

```css
.grid-container {
  display: grid;
  /* 使用绝对单位 */
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;

  /* 使用百分比 */
  grid-template-columns: 33.33% 33.33% 33.33%;

  /* 使用 repeat() 函数简化重复的值 */
  grid-template-columns: repeat(3, 33.33%);

  /* 使用 auto-fill 关键字动态填充数量 */
  grid-template-columns: repeat(auto-fill, 100px);

  /* 使用 fr 关键字(fraction 片段)表示各列之间的比例关系 */
  grid-template-columns: 150px 1fr 1fr;

  /* minmax() 函数产生一个长度范围 */
  grid-template-columns: 1fr 1fr minmax(100px, 1fr);

  /* auto 关键字 */
  grid-template-columns: 100px auto 100px;

  /* 指定网格线名称 */
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
}
```

#### 定义间隔

`grid-row-gap` 属性设置行与行的间隔(行间距)  
`grid-column-gap` 属性设置列与列的间隔(列间距)  
`grid-gap` 是 `grid-column-gap` 和 `grid-row-gap` 的合并简写形式  

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

.container {
  grid-gap: 20px 20px;
}
```

### 项目属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

`grid-column-start` 左边框所在的垂直网格线  
`grid-column-end` 右边框所在的垂直网格线  
`grid-row-start` 上边框所在的水平网格线  
`grid-row-end` 下边框所在的水平网格线  

`grid-column` 是 `grid-column-start` 和 `grid-column-end` 的合并简写形式  
`grid-row` 是 `grid-row-start` 和 `grid-row-end` 的合并简写形式  

`grid-area` 指定项目放在哪一个区域  

`justify-self` 设置单元格内容的水平位置(左中右)  
`align-self` 设置单元格内容的垂直位置(上中下)  
`place-self` 是 `align-self` 和 `justify-self` 的合并简写形式  

```css
/* 项目占据第2、3格 */
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;

  /* 除了指定为第几个网格线，还可以指定为网格线的名字 */
  grid-column-start: c2;

  /* 使用关键字 span */
  grid-column-start: span 2;
}

.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}

.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: <align-self> <justify-self>;
}
```

<div class="demo">
  <div class="grid-container2">
    <div class="grid-item item-1">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
  </div>
  <style>
    .grid-container2 {
      display: grid;
      grid-template-columns: 50px 50px 50px;
      grid-template-rows: 50px 50px 50px;
    }
    .grid-container2 .item-1 {
      background-color: #ef342a;
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 4;
    }
  </style>
</div>


## Multi-column Layout






