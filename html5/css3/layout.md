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
  align-content: flex-start | flex-end | center |                         // 垂直对齐-多轴
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


## Multi-column Layout






